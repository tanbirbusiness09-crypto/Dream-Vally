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

    // If DATABASE_URL is set and prisma is loaded, query PostgreSQL
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        if (prisma && prisma.listing) {
        const whereClause: any = {
          status: 'ACTIVE',
        };

        if (category && category !== 'all') {
          whereClause.category = { slug: category };
        }
        if (market && market !== 'All') {
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
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch listings', message: error?.message },
      { status: 500 }
    );
  }
}

// POST /api/listings - Create a new listing / ad in database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, categoryId, location, phone, condition } = body;

    if (!title || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: title, price, and categoryId are required' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/prisma');
      if (prisma && prisma.listing) {
        const newListing = await prisma.listing.create({
          data: {
            title,
            slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
            description: description || '',
            price: Number(price),
            categoryId,
            condition: condition || 'USED',
            city: location || 'Dhaka',
            userId: body.userId || 'demo-user-id',
          },
        });

        return NextResponse.json({ success: true, listing: newListing }, { status: 201 });
      }
    }

    // Mock response when DB is in development setup
    return NextResponse.json(
      {
        success: true,
        message: 'Listing received (Mock Mode - Connect DATABASE_URL to persist)',
        data: { id: `PRD-${Date.now()}`, title, price, categoryId, location, phone },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create listing', message: error?.message },
      { status: 500 }
    );
  }
}
