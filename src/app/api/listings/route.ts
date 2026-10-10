import { NextRequest, NextResponse } from 'next/server';
import { CATALOG_PRODUCTS } from '@/lib/catalogData';

// GET /api/listings - Fetch listings with search, category, location, and market filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const market = searchParams.get('market');
    const city = searchParams.get('city');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const mine = searchParams.get('mine') === 'true';

    // If DATABASE_URL is set and prisma is loaded, query PostgreSQL
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        if (prisma && prisma.listing) {
        // mine=true → session seller's own listings (all statuses incl. DRAFT, excl. ARCHIVED soft-deleted)
        if (mine) {
          const { getServerSession } = await import('next-auth');
          const { authOptions } = await import('@/lib/auth');
          const session = await getServerSession(authOptions);
          const userId = (session?.user as { id?: string } | undefined)?.id;
          if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
          }
          const ownWhere = { userId, status: { not: 'ARCHIVED' as const } };
          const [ownTotal, ownListings] = await Promise.all([
            prisma.listing.count({ where: ownWhere }),
            prisma.listing.findMany({
              where: ownWhere,
              include: {
                images: { orderBy: { sortOrder: 'asc' } },
                category: true,
              },
              orderBy: { createdAt: 'desc' },
            }),
          ]);
          return NextResponse.json({
            source: 'database',
            mine: true,
            total: ownTotal,
            data: ownListings,
          });
        }

        const whereClause: import('@prisma/client').Prisma.ListingWhereInput = {
          status: 'ACTIVE',
        };

        if (category && category !== 'all') {
          whereClause.category = { slug: category };
        }
        if (market === 'BD' || market === 'SA') {
          whereClause.targetMarket = { in: [market, 'BOTH'] };
        }
        if (city && city !== 'all') {
          whereClause.city = { contains: city, mode: 'insensitive' };
        }
        if (search) {
          whereClause.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
        }

        const [totalCount, listings] = await Promise.all([
          prisma.listing.count({ where: whereClause }),
          prisma.listing.findMany({
            where: whereClause,
            include: {
              images: true,
              category: true,
              user: {
                select: {
                  id: true,
                  fullName: true,
                  shopName: true,
                  sellerRating: true,
                  isKycVerified: true,
                },
              },
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy:
              sortBy === 'price_low'
                ? { price: 'asc' }
                : sortBy === 'price_high'
                ? { price: 'desc' }
                : { createdAt: 'desc' },
          }),
        ]);

        return NextResponse.json({
          source: 'database',
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          data: listings,
        });
        }
      } catch (dbError) {
        console.warn('Database query skipped or connecting...', dbError);
      }
    }

    // Graceful fallback to rich catalog data if DB is not configured yet
    let results = [...CATALOG_PRODUCTS];
    if (category && category !== 'all') {
      results = results.filter((p) => p.categoryId === category);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (city && city !== 'all') {
      results = results.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
    }

    const total = results.length;
    const paginated = results.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      source: 'catalog_cache',
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: paginated,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch listings', message },
      { status: 500 }
    );
  }
}

// POST /api/listings - Create a new listing / ad in database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, categoryId, categorySlug, location, condition } = body;

    if (!title || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: title and price are required' },
        { status: 400 }
      );
    }
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: true, message: 'Mock mode — DATABASE_URL not set', data: { id: `PRD-${Date.now()}` } },
        { status: 201 }
      );
    }

    const { prisma } = await import('@/lib/prisma');
    if (!prisma?.listing) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    // Resolve user: session → body.userId → demo seller
    let userId = body.userId as string | undefined;
    try {
      const { getServerSession } = await import('next-auth');
      const { authOptions } = await import('@/lib/auth');
      const session = await getServerSession(authOptions);
      const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
      if (sessionUserId) userId = sessionUserId;
    } catch {
      // no session — continue with fallback
    }

    if (!userId) {
      const demo = await prisma.user.findFirst({
        where: { email: 'demo@dreamvally.com' },
        select: { id: true },
      });
      userId = demo?.id;
    }
    if (!userId) {
      return NextResponse.json({ error: 'No user available to own this listing' }, { status: 400 });
    }

    // Resolve category: by id or slug; fallback to first category
    let resolvedCategoryId = categoryId as string | undefined;
    if (!resolvedCategoryId) {
      const cat = await prisma.category.findFirst({
        where: categorySlug ? { slug: categorySlug } : {},
        select: { id: true },
      });
      resolvedCategoryId = cat?.id;
    }
    if (!resolvedCategoryId) {
      const firstCat = await prisma.category.findFirst({ select: { id: true } });
      resolvedCategoryId = firstCat?.id;
    }
    if (!resolvedCategoryId) {
      return NextResponse.json({ error: 'No categories in database — run npm run db:seed' }, { status: 400 });
    }

    // Default image: category image (every listing must show a real image on home/cards)
    const catRow = await prisma.category.findUnique({
      where: { id: resolvedCategoryId },
      select: { imageUrl: true },
    });

    // Map simple condition values → enum
    const conditionMap: Record<string, string> = {
      new: 'BRAND_NEW',
      used: 'USED',
      BRAND_NEW: 'BRAND_NEW',
      LIKE_NEW: 'LIKE_NEW',
      USED: 'USED',
      REFURBISHED: 'REFURBISHED',
    };

    // Optional fields from add-product form
    const images: string[] = Array.isArray(body.images)
      ? body.images.filter((u: unknown) => typeof u === 'string' && u).slice(0, 5)
      : [];
    const stock = Number.isFinite(Number(body.stock)) ? Math.max(0, Number(body.stock)) : 1;
    const sku = typeof body.sku === 'string' && body.sku.trim() ? body.sku.trim() : undefined;
    const marketMap: Record<string, string> = { Both: 'BOTH', BD: 'BD', SA: 'SA', BOTH: 'BOTH' };
    const targetMarket = (marketMap[body.targetMarket] || 'BD') as never;
    const deliveryFee =
      Number.isFinite(Number(body.deliveryFee)) && Number(body.deliveryFee) > 0
        ? Number(body.deliveryFee)
        : null;
    const status = body.status === 'DRAFT' ? 'DRAFT' : 'ACTIVE';

    const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newListing = await prisma.listing.create({
      data: {
        title,
        slug: `${slugBase}-${Date.now()}`,
        description: description || '',
        price: Number(price),
        categoryId: resolvedCategoryId,
        condition: (conditionMap[condition] || 'USED') as never,
        city: location || 'Dhaka',
        country: 'Bangladesh',
        status,
        userId,
        stock,
        ...(sku ? { sku } : {}),
        targetMarket,
        deliveryAvailable: deliveryFee !== null || !!body.freeShipping,
        deliveryFee: body.freeShipping ? 0 : deliveryFee,
        ...(body.attributes && typeof body.attributes === 'object'
          ? { attributes: body.attributes }
          : {}),
        images: images.length
          ? {
              create: images.map((url, idx) => ({
                url,
                isPrimary: idx === 0,
                sortOrder: idx,
                altText: title,
              })),
            }
          : catRow?.imageUrl
          ? {
              create: [{ url: catRow.imageUrl, isPrimary: true, sortOrder: 0, altText: title }],
            }
          : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json({ success: true, listing: newListing }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create listing', message },
      { status: 500 }
    );
  }
}
