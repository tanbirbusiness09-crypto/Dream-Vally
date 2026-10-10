// Client-side API helpers for Dreamvally frontend
// Maps DB (Prisma) listing shape → frontend CatalogProduct shape

import type { CatalogProduct, ProductSeller } from './catalogData';

interface DbListingImage {
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface DbListingUser {
  id: string;
  fullName: string;
  shopName: string | null;
  sellerRating: number;
  isKycVerified: boolean;
}

interface DbListingCategory {
  id: string;
  name: string;
  slug: string;
}

export interface DbListing {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  currency: 'BDT' | 'SAR' | 'USD';
  condition: string;
  status: string;
  targetMarket: string;
  deliveryAvailable: boolean;
  attributes: Record<string, string> | null;
  country: string;
  city: string | null;
  area: string | null;
  viewsCount: number;
  likesCount: number;
  createdAt: string;
  images: DbListingImage[];
  category: DbListingCategory;
  user: DbListingUser;
}

const CONDITION_LABEL: Record<string, CatalogProduct['condition']> = {
  BRAND_NEW: 'Brand New',
  LIKE_NEW: 'Like New',
  REFURBISHED: 'Refurbished',
  USED: 'Used',
};

const CURRENCY_SYMBOL: Record<string, string> = {
  BDT: '৳',
  SAR: '﷼',
  USD: '$',
};

export function formatPrice(price: number | string, currency: string): string {
  const n = typeof price === 'string' ? Number(price) : price;
  const sym = CURRENCY_SYMBOL[currency] ?? '৳';
  return `${sym} ${n.toLocaleString('en-IN')}`;
}

export function mapListingToProduct(listing: DbListing): CatalogProduct {
  const priceNum = typeof listing.price === 'string' ? Number(listing.price) : listing.price;
  const sortedImages = [...listing.images].sort((a, b) => a.sortOrder - b.sortOrder);
  const seller: ProductSeller = {
    name: listing.user.shopName || listing.user.fullName,
    avatar: '',
    verified: listing.user.isKycVerified,
    memberSince: '',
    rating: listing.user.sellerRating,
    reviewsCount: 0,
    responseTime: '',
    phone: '',
    location: listing.area || listing.city || '',
    totalAds: 0,
  };

  return {
    id: listing.id,
    categoryId: listing.category.slug,
    categoryName: listing.category.name,
    title: listing.title,
    price: formatPrice(priceNum, listing.currency),
    numericPrice: priceNum,
    condition: CONDITION_LABEL[listing.condition] ?? 'Used',
    location: listing.area || listing.city || listing.country,
    city: listing.city || '',
    country: listing.country === 'Saudi Arabia' ? 'Saudi Arabia' : 'Bangladesh',
    postedTime: new Date(listing.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    viewsCount: listing.viewsCount,
    rating: listing.user.sellerRating,
    reviewsCount: 0,
    images: sortedImages.length > 0 ? sortedImages.map((i) => i.url) : ['/assets/categories/cat_electronics.jpg'],
    description: listing.description,
    specs: (listing.attributes as Record<string, string>) ?? {},
    features: [],
    seller,
    deliveryAvailable: listing.deliveryAvailable,
    likesCount: listing.likesCount,
  };
}

export interface FetchListingsParams {
  category?: string;
  search?: string;
  market?: string;
  city?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export async function fetchListings(params: FetchListingsParams = {}): Promise<{
  products: CatalogProduct[];
  total: number;
  source: string;
}> {
  const qs = new URLSearchParams();
  if (params.category && params.category !== 'all') qs.set('category', params.category);
  if (params.search) qs.set('search', params.search);
  if (params.market && params.market !== 'All') qs.set('market', params.market);
  if (params.city && params.city !== 'all') qs.set('city', params.city);
  if (params.sortBy) qs.set('sortBy', params.sortBy);
  if (params.page) qs.set('page', String(params.page));
  qs.set('limit', String(params.limit ?? 50));

  const res = await fetch(`/api/listings?${qs.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Listings API failed: ${res.status}`);
  const json = await res.json();

  // DB rows → CatalogProduct; catalog_cache rows already match
  const products =
    json.source === 'database'
      ? (json.data as DbListing[]).map(mapListingToProduct)
      : (json.data as CatalogProduct[]);

  return { products, total: json.total, source: json.source };
}

export async function createListing(input: {
  title: string;
  description?: string;
  price: number;
  categoryId: string;
  location?: string;
  condition?: string;
  userId?: string;
}): Promise<{ success: boolean; listing?: { id: string; title: string }; message?: string }> {
  const res = await fetch('/api/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to create listing');
  return json;
}

export async function fetchListingById(id: string): Promise<CatalogProduct | null> {
  const res = await fetch(`/api/listings/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Listing API failed: ${res.status}`);
  const json = await res.json();
  if (json.source === 'database') return mapListingToProduct(json.data as DbListing);
  return json.data as CatalogProduct;
}
