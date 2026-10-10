import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/user/profile - Current user + shop profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUserId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        avatarUrl: true,
        role: true,
        primaryMarket: true,
        isPhoneVerified: true,
        isKycVerified: true,
        nationalId: true,
        nidFrontUrl: true,
        nidBackUrl: true,
        tradeLicenseUrl: true,
        kycSubmittedAt: true,
        shopName: true,
        shopSlug: true,
        shopDescription: true,
        shopLogo: true,
        shopBanner: true,
        sellerRating: true,
        totalReviews: true,
        country: true,
        division: true,
        district: true,
        city: true,
        address: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch profile', message }, { status: 500 });
  }
}

// PATCH /api/user/profile - Update profile / shop / verification docs
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();

    // Whitelist only allowed fields
    const data: Record<string, unknown> = {};
    const allowedScalar = [
      'fullName',
      'avatarUrl',
      'shopName',
      'shopDescription',
      'shopLogo',
      'shopBanner',
      'nationalId',
      'nidFrontUrl',
      'nidBackUrl',
      'tradeLicenseUrl',
      'country',
      'division',
      'district',
      'city',
      'address',
    ] as const;

    for (const key of allowedScalar) {
      if (key in body) data[key] = body[key] === '' ? null : body[key];
    }

    // KYC submission timestamp when documents are attached
    if ('nidFrontUrl' in body || 'tradeLicenseUrl' in body) {
      if (body.nidFrontUrl || body.tradeLicenseUrl) {
        data.kycSubmittedAt = new Date();
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: sessionUserId },
      data,
      select: {
        id: true,
        fullName: true,
        shopName: true,
        shopSlug: true,
        shopDescription: true,
        shopLogo: true,
        shopBanner: true,
        avatarUrl: true,
        role: true,
        isKycVerified: true,
        nidFrontUrl: true,
        nidBackUrl: true,
        tradeLicenseUrl: true,
        kycSubmittedAt: true,
        city: true,
        address: true,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to update profile', message }, { status: 500 });
  }
}
