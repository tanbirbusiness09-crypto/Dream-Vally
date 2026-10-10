import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/categories - Categories from database
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        iconName: true,
        imageUrl: true,
        _count: { select: { listings: { where: { status: 'ACTIVE' } } } },
      },
    });
    return NextResponse.json({
      source: 'database',
      data: categories.map((c) => ({ ...c, listingCount: c._count.listings, _count: undefined })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch categories', message }, { status: 500 });
  }
}
