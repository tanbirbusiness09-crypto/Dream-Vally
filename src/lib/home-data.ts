// Server-side data access for the home page (direct Prisma queries)
import prisma from '@/lib/prisma';

export interface HomeCategory {
  id: string;
  name: string;
  bnName: string;
  image: string;
  count: string;
  path: string;
}

export interface HomeProduct {
  id: string;
  title: string;
  price: string;
  rating: string;
  reviews: string;
  badge: { label: string; className: string } | null;
  image: string;
}

export interface FlashDeal {
  id: string;
  title: string;
  dealPrice: string;
  regularPrice: string;
  discount: string | null;
  image: string;
  location: string;
  claimed: number;
  badge: string;
}

export interface ShowcaseProduct {
  id: string;
  categoryId: string;
  title: string;
  price: string;
  regularPrice?: string;
  image: string;
  rating: string;
  reviews: string;
  location: string;
  condition: string;
  badge: { label: string; className: string } | null;
}

export interface HomeShowcase {
  id: string;
  title: string;
  bnTitle: string;
  subtitle: string;
  iconName: string;
  accentColor: string;
  viewAllPath: string;
  products: ShowcaseProduct[];
}

const BN_NAMES: Record<string, string> = {
  mobiles: 'মোবাইল ও গ্যাজেট',
  electronics: 'ইলেকট্রনিক্স',
  vehicles: 'গাড়ি ও বাইক',
  property: 'জমি ও ফ্ল্যাট',
  fashion: 'ফ্যাশন ও লাক্সারি',
  home: 'হোম ও ফার্নিচার',
  pets: 'পোষা প্রাণী',
  services: 'সার্ভিস ও সেবা',
  delivery: 'ডেলিভারি',
};

const CATEGORY_PATHS: Record<string, string> = {
  property: '/property',
  services: '/services',
  delivery: '/delivery',
};

const SHOWCASE_META: Record<
  string,
  { title: string; bnTitle: string; subtitle: string; iconName: string; accentColor: string }
> = {
  mobiles: {
    title: 'Mobiles & Gadgets',
    bnTitle: 'মোবাইল ও গ্যাজেট',
    subtitle: 'Explore certified smartphones, smartwatches & accessories',
    iconName: 'Smartphone',
    accentColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
  },
  electronics: {
    title: 'Electronics & Laptops',
    bnTitle: 'কম্পিউটার ও ইলেকট্রনিক্স',
    subtitle: 'High performance laptops, cameras & smart home appliances',
    iconName: 'Laptop',
    accentColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50',
  },
  vehicles: {
    title: 'Vehicles & Motorbikes',
    bnTitle: 'গাড়ি ও মোটরসাইকেল',
    subtitle: 'Verified cars, sports bikes and commuter two-wheelers',
    iconName: 'Car',
    accentColor: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50',
  },
  property: {
    title: 'Property & Real Estate',
    bnTitle: 'জমি ও ফ্ল্যাট',
    subtitle: 'Apartments, luxury duplexes, commercial offices and land plots',
    iconName: 'Home',
    accentColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
  },
  fashion: {
    title: 'Fashion & Luxury',
    bnTitle: 'ফ্যাশন ও লাক্সারি',
    subtitle: 'Ethnic wear, watches, jewelry and premium accessories',
    iconName: 'Sparkles',
    accentColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
  },
  home: {
    title: 'Home & Furniture',
    bnTitle: 'হোম ও ফার্নিচার',
    subtitle: 'Handcrafted furniture, decor and living essentials',
    iconName: 'Home',
    accentColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/50',
  },
  pets: {
    title: 'Pets & Animals',
    bnTitle: 'পোষা প্রাণী',
    subtitle: 'Healthy pets, feed and accessories from trusted sellers',
    iconName: 'PawPrint',
    accentColor: 'text-orange-500 bg-orange-50 dark:bg-orange-950/50',
  },
  services: {
    title: 'Local Services',
    bnTitle: 'সার্ভিস ও সেবা',
    subtitle: 'Plumbers, electricians, tutors and trusted professionals',
    iconName: 'Briefcase',
    accentColor: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/50',
  },
  delivery: {
    title: 'Delivery & Courier',
    bnTitle: 'ডেলিভারি',
    subtitle: 'Compare courier rates and book parcels nationwide',
    iconName: 'Truck',
    accentColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
  },
};

const CONDITION_LABEL: Record<string, string> = {
  BRAND_NEW: 'Brand New',
  LIKE_NEW: 'Like New',
  REFURBISHED: 'Refurbished',
  USED: 'Used',
};

function categoryPath(slug: string): string {
  return CATEGORY_PATHS[slug] || `/categories?id=${slug}`;
}

const listingInclude = {
  images: { orderBy: { sortOrder: 'asc' as const }, take: 1 },
  user: { select: { sellerRating: true, totalReviews: true, shopName: true, fullName: true } },
  category: { select: { id: true, name: true, slug: true } },
};

type ListingRow = {
  id: string;
  title: string;
  price: unknown;
  originalPrice: unknown;
  discountPercent: number | null;
  viewsCount: number;
  likesCount: number;
  city: string | null;
  area: string | null;
  condition: string;
  currency: string;
  images: { url: string }[];
  user: { sellerRating: number; totalReviews: number; shopName: string | null; fullName: string };
  category: { id: string; name: string; slug: string };
};

function money(n: number): string {
  return `৳ ${Math.round(n).toLocaleString('en-IN')}`;
}

function toShowcaseProduct(l: ListingRow, withDiscount: boolean): ShowcaseProduct {
  const price = Number(l.price);
  const original = l.originalPrice ? Number(l.originalPrice) : null;
  return {
    id: l.id,
    categoryId: l.category.slug,
    title: l.title,
    price: money(price),
    regularPrice: withDiscount && original && original > price ? money(original) : undefined,
    image: l.images[0]?.url || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image',
    rating: l.user.sellerRating.toFixed(1),
    reviews: String(l.user.totalReviews),
    location: l.city || l.area || 'Bangladesh',
    condition: CONDITION_LABEL[l.condition] || 'Used',
    badge:
      withDiscount && l.discountPercent && l.discountPercent > 0
        ? { label: `-${l.discountPercent}%`, className: 'bg-rose-500 text-white' }
        : null,
  };
}

export async function getHomeCategories(): Promise<HomeCategory[]> {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { listings: { where: { status: 'ACTIVE' } } } } },
  });
  return categories.map((c) => ({
    id: c.slug,
    name: c.name,
    bnName: BN_NAMES[c.slug] || c.name,
    image: c.imageUrl || '/assets/categories/cat_electronics.jpg',
    count: `${c._count.listings} Ads`,
    path: categoryPath(c.slug),
  }));
}

export async function getPopularProducts(limit = 6): Promise<HomeProduct[]> {
  const listings = (await prisma.listing.findMany({
    where: { status: 'ACTIVE' },
    orderBy: [{ viewsCount: 'desc' }, { createdAt: 'desc' }],
    take: limit,
    include: listingInclude,
  })) as unknown as ListingRow[];

  return listings.map((l) => ({
    id: l.id,
    title: l.title,
    price: money(Number(l.price)),
    rating: l.user.sellerRating.toFixed(1),
    reviews: String(l.user.totalReviews),
    badge:
      l.discountPercent && l.discountPercent > 0
        ? { label: `-${l.discountPercent}% Off`, className: 'bg-[#00895e] text-white' }
        : { label: 'Trending', className: 'bg-teal-600 text-white' },
    image: l.images[0]?.url || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image',
  }));
}

export async function getFlashDeals(limit = 3): Promise<FlashDeal[]> {
  const listings = (await prisma.listing.findMany({
    where: { status: 'ACTIVE', images: { some: {} } },
    orderBy: [{ likesCount: 'desc' }, { viewsCount: 'desc' }],
    take: limit,
    include: listingInclude,
  })) as unknown as ListingRow[];

  return listings.map((l) => {
    const price = Number(l.price);
    const original = l.originalPrice ? Number(l.originalPrice) : null;
    const pct = l.discountPercent && l.discountPercent > 0 ? l.discountPercent : null;
    return {
      id: l.id,
      title: l.title,
      dealPrice: money(price),
      regularPrice: original && original > price ? money(original) : money(price),
      discount: pct ? `-${pct}%` : null,
      image: l.images[0]?.url || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image',
      location: l.city || l.area || 'Bangladesh',
      claimed: Math.min(95, 45 + (l.likesCount % 50)),
      badge: pct ? 'Hot Deal' : 'Trending',
    };
  });
}

export async function getHomeShowcases(limit = 4, perCategory = 6): Promise<HomeShowcase[]> {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { listings: { where: { status: 'ACTIVE' } } } } },
  });
  const withListings = categories.filter((c) => c._count.listings > 0).slice(0, limit);

  const showcases: HomeShowcase[] = [];
  for (const cat of withListings) {
    const listings = (await prisma.listing.findMany({
      where: { status: 'ACTIVE', categoryId: cat.id },
      orderBy: [{ viewsCount: 'desc' }, { createdAt: 'desc' }],
      take: perCategory,
      include: listingInclude,
    })) as unknown as ListingRow[];
    if (listings.length === 0) continue;

    const meta = SHOWCASE_META[cat.slug] || {
      title: cat.name,
      bnTitle: BN_NAMES[cat.slug] || cat.name,
      subtitle: cat.description || `Browse ${cat.name} listings`,
      iconName: 'Sparkles',
      accentColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
    };

    showcases.push({
      id: cat.slug,
      ...meta,
      viewAllPath: categoryPath(cat.slug),
      products: listings.map((l) => toShowcaseProduct(l, true)),
    });
  }
  return showcases;
}
