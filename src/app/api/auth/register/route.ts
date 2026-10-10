import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, UserRole, MarketRegion } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// POST /api/auth/register - Create a new user account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phoneNumber, password, role } = body;

    if (!fullName || !phoneNumber || !password) {
      return NextResponse.json(
        { error: 'fullName, phoneNumber and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check existing
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          ...(email ? [{ email }] : []),
          { phoneNumber },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email or phone already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const isSeller = role === 'SELLER';

    const user = await prisma.user.create({
      data: {
        fullName,
        email: email || null,
        phoneNumber,
        passwordHash,
        role: isSeller ? UserRole.SELLER : UserRole.BUYER,
        primaryMarket: MarketRegion.BD,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to register', message },
      { status: 500 }
    );
  }
}
