import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// POST /api/offers - Buyer makes an offer on a listing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Login required to make an offer' }, { status: 401 });
    }

    const body = await request.json();
    const { listingId, offerAmount, note } = body;
    const amount = Number(offerAmount);

    if (!listingId || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Valid listingId and offerAmount required' }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, userId: true, status: true, title: true },
    });
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    if (listing.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'This listing is not accepting offers' }, { status: 400 });
    }
    if (listing.userId === userId) {
      return NextResponse.json({ error: 'You cannot make an offer on your own listing' }, { status: 400 });
    }

    const offer = await prisma.offer.create({
      data: {
        offerAmount: amount,
        note: typeof note === 'string' && note.trim() ? note.trim().slice(0, 500) : null,
        listingId: listing.id,
        buyerId: userId,
        sellerId: listing.userId,
      },
      select: { id: true, offerAmount: true, status: true, createdAt: true },
    });

    return NextResponse.json({ success: true, offer }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to submit offer', message }, { status: 500 });
  }
}

// GET /api/offers - Offers received on the logged-in seller's listings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const offers = await prisma.offer.findMany({
      where: { sellerId: userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        listing: { select: { id: true, title: true, price: true } },
        buyer: { select: { id: true, fullName: true, phoneNumber: true } },
      },
    });

    return NextResponse.json({ source: 'database', data: offers });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch offers', message }, { status: 500 });
  }
}
