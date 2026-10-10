import { NextRequest, NextResponse } from 'next/server';
import { CATALOG_PRODUCTS } from '@/lib/catalogData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/listings/[id] - Fetch a single listing by DB id or catalog id (mob-1, elec-1...)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        if (prisma?.listing) {
          const listing = await prisma.listing.findFirst({
            where: {
              OR: [{ id }, { slug: id }, { sku: `CAT-${id.toUpperCase()}` }],
            },
            include: {
              images: { orderBy: { sortOrder: 'asc' } },
              category: true,
              user: {
                select: {
                  id: true,
                  fullName: true,
                  shopName: true,
                  shopSlug: true,
                  sellerRating: true,
                  isKycVerified: true,
                },
              },
            },
          });

          if (listing) {
            // Increment view count (fire and forget)
            prisma.listing
              .update({ where: { id: listing.id }, data: { viewsCount: { increment: 1 } } })
              .catch(() => {});

            return NextResponse.json({ source: 'database', data: listing });
          }
        }
      } catch (dbError) {
        console.warn('DB single listing query failed, falling back to catalog', dbError);
      }
    }

    // Fallback: catalog static data (supports legacy ids like mob-1)
    const catalog = CATALOG_PRODUCTS.find((p) => p.id === id);
    if (catalog) {
      return NextResponse.json({ source: 'catalog_cache', data: catalog });
    }

    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch listing', message },
      { status: 500 }
    );
  }
}

// PATCH /api/listings/[id] - Owner-only update (quick edit: title, price, stock, status, market)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const listing = await import('@/lib/prisma').then((m) =>
      m.default.listing.findUnique({ where: { id }, select: { id: true, userId: true } })
    );

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    if (listing.userId !== userId) {
      return NextResponse.json({ error: 'Not allowed — you do not own this listing' }, { status: 403 });
    }

    const body = await request.json();
    const data: Record<string, unknown> = {};
    if (typeof body.title === 'string' && body.title.trim()) data.title = body.title.trim();
    if (body.price !== undefined && Number.isFinite(Number(body.price))) data.price = Number(body.price);
    if (body.stock !== undefined && Number.isFinite(Number(body.stock))) data.stock = Math.max(0, Number(body.stock));
    if (typeof body.status === 'string') {
      const allowed = ['ACTIVE', 'DRAFT', 'SOLD', 'EXPIRED', 'PENDING_REVIEW', 'ARCHIVED'];
      if (allowed.includes(body.status)) data.status = body.status;
    }
    const marketMap: Record<string, string> = { Both: 'BOTH', BD: 'BD', SA: 'SA', BOTH: 'BOTH' };
    if (typeof body.targetMarket === 'string' && marketMap[body.targetMarket]) {
      data.targetMarket = marketMap[body.targetMarket];
    }
    if (typeof body.description === 'string') data.description = body.description;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { prisma } = await import('@/lib/prisma');
    const updated = await prisma.listing.update({
      where: { id },
      data,
      include: { images: true, category: true },
    });

    return NextResponse.json({ success: true, listing: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to update listing', message }, { status: 500 });
  }
}
