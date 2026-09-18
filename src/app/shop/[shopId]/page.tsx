"use client";

import React, { use } from 'react';
import Link from 'next/link';
import ListingCard from '@/components/layout/ListingCard';

export default function ShopStorefrontPage({ params }: { params: Promise<{ shopId: string }> }) {
  // Mock unwrapping params using React.use for Next.js 15
  const unwrappedParams = use(params);
  const { shopId } = unwrappedParams;

  // Mock Shop Data
  const shopData = {
    name: "Dream Fashion",
    handle: "@dreamfashion",
    description: "Your one-stop shop for premium quality clothing and fashion accessories. We deliver the best ethnic and western wear all over Bangladesh.",
    joinedDate: "October 2024",
    rating: "4.8",
    reviewsCount: 124,
  };

  // Mock Products using existing ListingCard props structure
  const shopProducts = [
    {
      id: "1",
      title: "Premium Cotton Panjabi",
      price: "1200",
      location: "Mirpur, Dhaka",
      postedTime: "2 hours ago",
      image: "https://via.placeholder.com/300?text=Panjabi"
    },
    {
      id: "2",
      title: "Silk Saree",
      price: "4500",
      location: "Mirpur, Dhaka",
      postedTime: "1 day ago",
      image: "https://via.placeholder.com/300?text=Saree"
    },
    {
      id: "3",
      title: "Denim Jacket",
      price: "2100",
      location: "Mirpur, Dhaka",
      postedTime: "3 days ago",
      image: "https://via.placeholder.com/300?text=Jacket"
    },
    {
      id: "4",
      title: "Leather Wallet",
      price: "850",
      location: "Mirpur, Dhaka",
      postedTime: "1 week ago",
      image: "https://via.placeholder.com/300?text=Wallet"
    }
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Shop Banner Header */}
      <div className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-primary-container to-tertiary relative overflow-hidden">
          {/* Mock Banner Pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 sm:flex sm:items-end sm:space-x-5 pb-8">
            <div className="relative inline-block h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-surface border-4 border-surface p-2 shadow-xl shrink-0">
              <div className="w-full h-full bg-primary-container text-on-primary-container rounded-full flex items-center justify-center text-4xl font-bold">
                DF
              </div>
            </div>
            
            <div className="mt-6 sm:mt-0 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                <h1 className="text-3xl font-extrabold text-foreground truncate">{shopData.name}</h1>
                <p className="text-on-surface-variant font-medium mt-1">{shopData.handle}</p>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button className="inline-flex justify-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-on-primary bg-primary hover:bg-[#00513e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1 pb-8">
            <h1 className="text-2xl font-bold text-foreground truncate">{shopData.name}</h1>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Shop Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4">About Shop</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {shopData.description}
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="text-lg">⭐</span>
                  <span className="font-semibold text-foreground">{shopData.rating}</span>
                  <span>({shopData.reviewsCount} Reviews)</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="text-lg">📅</span>
                  <span>Joined {shopData.joinedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="text-lg">📍</span>
                  <span>Verified Location</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-on-surface hover:text-primary transition-colors flex justify-between"><span>All Products</span> <span className="text-on-surface-variant bg-surface-container px-2 rounded-full text-xs py-0.5">24</span></Link></li>
                <li><Link href="#" className="text-on-surface hover:text-primary transition-colors flex justify-between"><span>Men's Fashion</span> <span className="text-on-surface-variant bg-surface-container px-2 rounded-full text-xs py-0.5">15</span></Link></li>
                <li><Link href="#" className="text-on-surface hover:text-primary transition-colors flex justify-between"><span>Women's Fashion</span> <span className="text-on-surface-variant bg-surface-container px-2 rounded-full text-xs py-0.5">6</span></Link></li>
                <li><Link href="#" className="text-on-surface hover:text-primary transition-colors flex justify-between"><span>Accessories</span> <span className="text-on-surface-variant bg-surface-container px-2 rounded-full text-xs py-0.5">3</span></Link></li>
              </ul>
            </div>
          </div>

          {/* Shop Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">All Items</h2>
              <select className="px-4 py-2 border border-outline-variant rounded-lg bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ListingCard
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    location={product.location}
                    postedTime={product.postedTime}
                    image={product.image}
                  />
                  {/* Subtle hover overlay to click to product detail */}
                  <Link href={`/product/${product.id}`} className="absolute inset-0 z-10"></Link>
                </div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center">
               <nav className="flex items-center gap-2">
                 <button className="px-4 py-2 border border-outline-variant rounded-lg bg-surface text-sm text-on-surface-variant disabled:opacity-50">Previous</button>
                 <button className="px-4 py-2 border border-primary rounded-lg bg-primary text-on-primary text-sm font-medium">1</button>
                 <button className="px-4 py-2 border border-outline-variant rounded-lg bg-surface text-sm hover:bg-surface-container transition-colors">2</button>
                 <button className="px-4 py-2 border border-outline-variant rounded-lg bg-surface text-sm hover:bg-surface-container transition-colors">Next</button>
               </nav>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
