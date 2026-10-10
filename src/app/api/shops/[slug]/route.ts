import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/shops/[slug] - Public shop profile + active listings (by slug or user id)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ shopSlug: slug }, { id: slug }],
        role: { in: ['SELLER', 'VERIFIED_MERCHANT', 'ADMIN'] },
      },
      select: {
        id: true,
        fullName: true,
        shopName: true,
        shopSlug: true,
        shopDescription: true,
        shopLogo: true,
        shopBanner: true,
        sellerRating: true,
        totalReviews: true,
        isKycVerified: true,
        city: true,
        address: true,
        createdAt: true,
        _count: { select: { listings: { where: { status: 'ACTIVE' } } } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
    }

    const listings = await prisma.listing.findMany({
      where: { userId: user.id, status: 'ACTIVE' },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 60,
    });

    return NextResponse.json({
      source: 'database',
      shop: {
        id: user.id,
        name: user.shopName || user.fullName,
        handle: user.shopSlug ? `@${user.shopSlug}` : '@shop',
        slug: user.shopSlug,
        description: user.shopDescription,
        logo: user.shopLogo,
        banner: user.shopBanner,
        rating: user.sellerRating,
        reviewsCount: user.totalReviews,
        isVerified: user.isKycVerified,
        location: [user.address, user.city].filter(Boolean).join(', ') || 'Bangladesh',
        joinedDate: user.createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        listingCount: user._count.listings,
      },
      listings,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch shop', message }, { status: 500 });
  }
}
