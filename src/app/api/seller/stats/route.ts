import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function requireSession() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;
  return user;
}

// GET /api/seller/stats - Real dashboard stats for the logged-in seller
export async function GET() {
  try {
    const user = await requireSession();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const sellerId = user.id;
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 6);
    startOfWeek.setHours(0, 0, 0, 0);

    const [totalListings, activeListings, draftListings, lowStockCount, orderAgg, weekOrders, recentOrders, allListings, topListings] =
      await Promise.all([
        prisma.listing.count({ where: { userId: sellerId } }),
        prisma.listing.count({ where: { userId: sellerId, status: 'ACTIVE' } }),
        prisma.listing.count({ where: { userId: sellerId, status: 'DRAFT' } }),
        prisma.listing.count({ where: { userId: sellerId, status: 'ACTIVE', stock: { lte: 5 } } }),
        prisma.order.aggregate({
          where: { sellerId },
          _sum: { totalAmount: true },
          _count: true,
        }),
        prisma.order.findMany({
          where: { sellerId, createdAt: { gte: startOfWeek } },
          select: { createdAt: true, totalAmount: true },
        }),
        prisma.order.findMany({
          where: { sellerId },
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            buyer: { select: { fullName: true, city: true } },
            items: {
              take: 1,
              include: { listing: { select: { title: true, images: { take: 1, orderBy: { sortOrder: 'asc' } } } } },
            },
          },
        }),
        prisma.listing.findMany({
          where: { userId: sellerId },
          select: { id: true, title: true, price: true, stock: true, status: true, viewsCount: true, targetMarket: true },
        }),
        prisma.listing.findMany({
          where: { userId: sellerId, status: 'ACTIVE' },
          orderBy: { viewsCount: 'desc' },
          take: 4,
          select: {
            title: true,
            stock: true,
            viewsCount: true,
            price: true,
            images: { take: 1, orderBy: { sortOrder: 'asc' }, select: { url: true } },
          },
        }),
      ]);

    // Aggregate views + total stock
    const totalViews = allListings.reduce((sum, l) => sum + l.viewsCount, 0);
    const totalStock = allListings.reduce((sum, l) => sum + l.stock, 0);

    // Last 7 days chart buckets (day labels Sat..Fri style: weekday short names)
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const buckets = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return { key: d.toISOString().slice(0, 10), label: dayLabels[d.getDay()], amount: 0 };
    });
    for (const o of weekOrders) {
      const key = o.createdAt.toISOString().slice(0, 10);
      const b = buckets.find((x) => x.key === key);
      if (b) b.amount += Number(o.totalAmount);
    }
    const maxAmount = Math.max(...buckets.map((b) => b.amount), 1);
    const weeklyChart = buckets.map((b) => ({
      day: b.label,
      amount: `৳ ${b.amount >= 1000 ? (b.amount / 1000).toFixed(0) + 'k' : b.amount.toFixed(0)}`,
      raw: b.amount,
      height: `${Math.max(8, Math.round((b.amount / maxAmount) * 100))}%`,
    }));

    const totalRevenue = Number(orderAgg._sum.totalAmount || 0);
    const ordersCount = orderAgg._count;
    const avgOrderValue = ordersCount > 0 ? Math.round(totalRevenue / ordersCount) : 0;

    return NextResponse.json({
      source: 'database',
      stats: {
        totalListings,
        activeListings,
        draftListings,
        lowStockCount,
        totalStock,
        totalViews,
        ordersCount,
        totalRevenue,
        avgOrderValue,
        // escrow balance = revenue (demo simplification)
        availableBalance: totalRevenue,
        sellerRating: user.sellerRating,
        totalReviews: user.totalReviews,
        isKycVerified: user.isKycVerified,
        shopName: user.shopName,
        shopSlug: user.shopSlug,
      },
      weeklyChart,
      topListings: topListings.map((l) => ({
        name: l.title,
        stock: l.stock,
        views: l.viewsCount,
        image: l.images[0]?.url || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image',
      })),
      recentOrders: recentOrders.map((o) => ({
        id: o.orderNumber,
        product: o.items[0]?.listing?.title || 'Order',
        image: o.items[0]?.listing?.images[0]?.url || null,
        customer: o.buyer.fullName,
        location: o.buyer.city || '—',
        amount: Number(o.totalAmount),
        status: o.status,
        createdAt: o.createdAt,
      })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch stats', message }, { status: 500 });
  }
}
