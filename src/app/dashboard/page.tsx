"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Store, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const name = session?.user?.name || 'My Account';
  const email = session?.user?.email || '';
  const role = (session?.user as { role?: string } | undefined)?.role || '';
  const isSeller = role === 'SELLER' || role === 'VERIFIED_MERCHANT' || role === 'ADMIN';
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() || 'U';
  const memberSince = new Date().getFullYear();

  if (status === 'loading') {
    return (
      <main className="w-full flex-grow flex items-center justify-center bg-surface-container-lowest">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </main>
    );
  }

  return (
    <main className="w-full flex-grow flex flex-col bg-surface-container-lowest">
      {/* Dashboard Header */}
      <section className="bg-primary-container text-on-primary-container py-8 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center text-2xl font-bold">
              {initials}
            </div>
            <div>
              <h1 className="text-headline-md font-bold">{name}</h1>
              <p className="text-body-md opacity-90">
                {email || 'No email'} • Member since {memberSince}
                {role && <span className="ml-2 font-semibold">({role})</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {!isSeller && (
              <Link
                href="/seller/register"
                className="bg-emerald-700 text-white hover:bg-emerald-800 transition-all px-5 py-2.5 rounded-xl font-bold shadow-sm flex items-center gap-2"
              >
                <Store className="w-4 h-4" /> Become a Seller
              </Link>
            )}
            <Link href="/post-ad" className="bg-primary text-on-primary hover:bg-surface hover:text-primary transition-all px-6 py-2.5 rounded-xl font-bold shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined">add_circle</span> Post New Ad
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto w-full py-8 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden sticky top-[96px]">
            <div className="flex flex-col py-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-5 py-3 bg-primary/10 text-primary font-bold border-r-4 border-primary">
                <span className="material-symbols-outlined">dashboard</span> Dashboard
              </Link>
              <Link href="/categories" className="flex items-center gap-3 px-5 py-3 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-medium">
                <span className="material-symbols-outlined">campaign</span> My Ads
              </Link>
              <Link href="/chat" className="flex items-center gap-3 px-5 py-3 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-medium">
                <span className="material-symbols-outlined">chat</span> Messages
                <span className="ml-auto bg-error text-on-error text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
              </Link>
              <Link href="/categories?badge=deals" className="flex items-center gap-3 px-5 py-3 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-medium">
                <span className="material-symbols-outlined">favorite</span> Saved Ads
              </Link>
              <div className="h-px bg-outline-variant/30 my-2 mx-4"></div>
              {isSeller ? (
                <>
                  <Link href="/seller/dashboard" className="flex items-center gap-3 px-5 py-3 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-medium">
                    <span className="material-symbols-outlined">storefront</span> Seller Dashboard
                  </Link>
                  <Link href="/seller/settings" className="flex items-center gap-3 px-5 py-3 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-medium">
                    <span className="material-symbols-outlined">person</span> Edit Shop Profile
                  </Link>
                </>
              ) : (
                <Link href="/seller/register" className="flex items-center gap-3 px-5 py-3 text-emerald-700 hover:bg-emerald-50 transition-colors font-semibold">
                  <span className="material-symbols-outlined">storefront</span> Become a Seller
                </Link>
              )}
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-3 px-5 py-3 text-error hover:bg-error/10 transition-colors font-medium mt-2 text-left cursor-pointer"
              >
                <span className="material-symbols-outlined">logout</span> Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Become a Seller CTA (Buyers only) */}
          {!isSeller && status === 'authenticated' && (
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-title-md">Start selling on Dreamvally</h3>
                  <p className="text-sm text-white/85 mt-0.5">
                    Open your shop, reach thousands of buyers — free to start.
                  </p>
                </div>
              </div>
              <Link
                href="/seller/register"
                className="shrink-0 bg-white text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-bold transition-colors"
              >
                Open My Shop
              </Link>
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-outline-variant/30 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl">
                <span className="material-symbols-outlined">campaign</span>
              </div>
              <div>
                <p className="text-body-sm text-on-surface-variant font-bold uppercase tracking-wide">Active Ads</p>
                <p className="text-headline-md font-bold text-on-surface">2</p>
              </div>
            </div>
            <div className="bg-surface border border-outline-variant/30 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center text-2xl">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <div>
                <p className="text-body-sm text-on-surface-variant font-bold uppercase tracking-wide">Total Views</p>
                <p className="text-headline-md font-bold text-on-surface">1,248</p>
              </div>
            </div>
            <div className="bg-surface border border-outline-variant/30 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-error/10 text-error rounded-full flex items-center justify-center text-2xl">
                <span className="material-symbols-outlined">chat</span>
              </div>
              <div>
                <p className="text-body-sm text-on-surface-variant font-bold uppercase tracking-wide">Unread Msgs</p>
                <p className="text-headline-md font-bold text-on-surface">3</p>
              </div>
            </div>
          </div>

          {/* Active Ads List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-title-lg font-bold text-on-surface">Your Active Ads</h2>
              <Link href="/categories" className="text-primary font-bold text-label-md hover:underline">View All</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-surface border border-outline-variant/30 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
                <Image src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop" alt="iPhone" width={96} height={96} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-title-md text-on-surface mb-1">iPhone 13 Pro Max</h3>
                  <p className="text-primary font-bold mb-2">৳ 85,000</p>
                  <p className="text-label-sm text-on-surface-variant flex items-center justify-center sm:justify-start gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 450 views</p>
                </div>
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none bg-surface-container text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container px-4 py-2 rounded-lg font-bold text-label-md transition-colors text-center">Edit</button>
                  <button className="flex-1 sm:flex-none bg-error/10 text-error hover:bg-error/20 px-4 py-2 rounded-lg font-bold text-label-md transition-colors text-center">Delete</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
