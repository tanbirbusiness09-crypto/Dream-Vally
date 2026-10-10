import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// POST /api/orders - Buyer places an escrow order on a listing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Login required to place an order' }, { status: 401 });
    }

    const body = await request.json();
    const { listingId, shippingAddress, contactPhone, quantity } = body;
    const qty = Math.max(1, Number(quantity) || 1);

    if (!listingId || typeof shippingAddress !== 'string' || !shippingAddress.trim() || typeof contactPhone !== 'string' || !contactPhone.trim()) {
      return NextResponse.json({ error: 'listingId, shippingAddress and contactPhone are required' }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, userId: true, status: true, title: true, price: true, stock: true },
    });
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    if (listing.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'This listing is not available' }, { status: 400 });
    }
    if (listing.userId === userId) {
      return NextResponse.json({ error: 'You cannot order your own listing' }, { status: 400 });
    }
    if (listing.stock < qty) {
      return NextResponse.json({ error: `Only ${listing.stock} in stock` }, { status: 400 });
    }

    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
    const totalAmount = Number(listing.price) * qty;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        totalAmount,
        status: 'PENDING_PAYMENT',
        shippingAddress: shippingAddress.trim().slice(0, 300),
        contactPhone: contactPhone.trim().slice(0, 30),
        buyerId: userId,
        sellerId: listing.userId,
        items: {
          create: [{ quantity: qty, unitPrice: listing.price, listingId: listing.id }],
        },
      },
      select: { orderNumber: true, totalAmount: true, status: true, createdAt: true },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to place order', message }, { status: 500 });
  }
}

// GET /api/orders - Orders placed by the logged-in buyer
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { buyerId: userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        items: { include: { listing: { select: { id: true, title: true, images: { take: 1, orderBy: { sortOrder: 'asc' as const } } } } } },
      },
    });

    return NextResponse.json({ source: 'database', data: orders });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch orders', message }, { status: 500 });
  }
}
