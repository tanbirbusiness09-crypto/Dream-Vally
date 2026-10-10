import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

async function uniqueShopSlug(base: string): Promise<string> {
  let slug = base || 'shop';
  let exists = await prisma.user.findUnique({ where: { shopSlug: slug }, select: { id: true } });
  let i = 1;
  while (exists) {
    slug = `${base}-${i++}`;
    exists = await prisma.user.findUnique({ where: { shopSlug: slug }, select: { id: true } });
  }
  return slug;
}

// POST /api/seller/register - Promote logged-in BUYER → SELLER with shop info
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { shopName, shopDescription, shopCategory, businessAddress, city } = body;

    if (!shopName || !shopName.trim()) {
      return NextResponse.json({ error: 'Shop name is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: sessionUserId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.role === 'SELLER' || user.role === 'VERIFIED_MERCHANT' || user.role === 'ADMIN') {
      return NextResponse.json(
        { error: 'You are already a seller', shopSlug: user.shopSlug },
        { status: 409 }
      );
    }

    // Check shop name uniqueness loosely (warn only via slug uniqueness)
    const slug = await uniqueShopSlug(slugify(shopName));

    const updated = await prisma.user.update({
      where: { id: sessionUserId },
      data: {
        role: 'SELLER',
        shopName: shopName.trim(),
        shopSlug: slug,
        shopDescription: shopDescription?.trim() || null,
        ...(businessAddress ? { address: businessAddress.trim() } : {}),
        ...(city ? { city: city.trim() } : {}),
      },
      select: {
        id: true,
        fullName: true,
        role: true,
        shopName: true,
        shopSlug: true,
        shopDescription: true,
      },
    });

    return NextResponse.json({ success: true, user: updated }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to register seller', message },
      { status: 500 }
    );
  }
}
