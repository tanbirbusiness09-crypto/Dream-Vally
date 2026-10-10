import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// PATCH /api/seller/orders - Update order status (seller-owned orders only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { orderNumber, status } = body;
    const allowed = [
      'PENDING_PAYMENT',
      'PAID_ESCROW',
      'SHIPPED',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'COMPLETED',
      'CANCELLED',
    ];
    if (!orderNumber || !allowed.includes(status)) {
      return NextResponse.json({ error: 'Invalid orderNumber or status' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { orderNumber } });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (order.sellerId !== userId) {
      return NextResponse.json({ error: 'Not allowed — not your order' }, { status: 403 });
    }

    const updated = await prisma.order.update({
      where: { orderNumber },
      data: { status: status as never },
    });
    return NextResponse.json({ success: true, order: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to update order', message }, { status: 500 });
  }
}

// GET /api/seller/orders - Orders for the logged-in seller
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const where = {
      sellerId: userId,
      ...(statusFilter && statusFilter !== 'All' ? { status: statusFilter as never } : {}),
    };

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          buyer: { select: { id: true, fullName: true, email: true, avatarUrl: true } },
          items: {
            include: {
              listing: {
                select: {
                  id: true,
                  title: true,
                  price: true,
                  city: true,
                  images: { orderBy: { sortOrder: 'asc' }, take: 1 },
                },
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      source: 'database',
      total,
      page,
      limit,
      data: orders,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch orders', message }, { status: 500 });
  }
}
