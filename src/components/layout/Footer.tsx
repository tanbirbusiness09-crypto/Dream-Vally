"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on all seller portal pages
  if (pathname?.startsWith('/seller')) {
    return null;
  }

  return (
    <>
      <footer className="bg-[#064e3b] dark:bg-[#021f17] w-full max-w-full overflow-hidden border-t-[4px] border-[#D4AF37]/80 font-sans text-white/90 transition-colors">
        
        {/* Massive Logo Section */}
        <div className="w-full max-w-full overflow-hidden pt-12 pb-8 px-6 md:px-12 flex justify-center items-center">
          <img
            alt="Dreamvally Logo"
            className="w-full max-w-2xl md:max-w-3xl h-24 md:h-36 object-contain"
            src="/logo-dark-transparent.png"
          />
        </div>

        <hr className="border-white/10 m-0" />

        {/* Content Section */}
        <div className="w-full px-6 md:px-12 flex flex-col md:flex-row">
          
          {/* Newsletter & Socials (Left Column) */}
          <div className="w-full md:w-1/3 lg:w-1/4 py-12 md:pr-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-body-lg font-bold mb-6 text-white tracking-wide">Newsletter</h3>
              <form className="relative w-full border-b border-white/30 pb-2 mb-3 group focus-within:border-[#D4AF37] transition-colors">
                <input 
                  type="email" 
                  placeholder="monemail@mail.com" 
                  className="w-full bg-transparent border-none outline-none text-body-md text-white placeholder:text-white/40 p-0 focus:ring-0"
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#D4AF37] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">I ACCEPT THE CONDITIONS</p>
            </div>
            
            <div className="flex gap-4 mt-12 md:mt-0">
              <a href="#" aria-label="Instagram" className="text-white/60 hover:text-[#D4AF37] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-white/60 hover:text-[#D4AF37] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/60 hover:text-[#D4AF37] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* Link Columns (Right Side) */}
          <div className="w-full md:w-2/3 lg:w-3/4 py-12 md:pl-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              
              <div className="flex flex-col gap-5">
                <h4 className="text-body-lg font-bold text-white tracking-wide">Categories</h4>
                <div className="flex flex-col gap-3">
                  <Link href="/categories?id=electronics" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Electronics</Link>
                  <Link href="/categories?id=vehicles" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Vehicles</Link>
                  <Link href="/categories?id=properties" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Properties</Link>
                  <Link href="/categories?id=delivery" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Delivery</Link>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-body-lg font-bold text-white tracking-wide">Company</h4>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">About Us</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Careers</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Press & Media</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Contact</Link>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-body-lg font-bold text-white tracking-wide">Help</h4>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">FAQ</Link>
                  <Link href="/seller/register" className="text-body-sm font-bold text-[#D4AF37] hover:text-white hover:underline underline-offset-4 transition-all">Become a Seller</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Selling Guide</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Trust & Safety</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Support Center</Link>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-body-lg font-bold text-white tracking-wide">Legal</h4>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Privacy Policy</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Terms of Service</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Cookie Policy</Link>
                  <Link href="#" className="text-body-sm text-white/70 hover:text-[#D4AF37] hover:underline underline-offset-4 transition-all">Refunds</Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        <hr className="border-white/10 m-0" />

        {/* Bottom Bar */}
        <div className="w-full py-6 px-6 md:px-12 bg-[#022c22] dark:bg-[#01120d] transition-colors">
          <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">
            COPYRIGHT DREAMVALLY 2024
          </p>
        </div>
      </footer>
      
      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden border-t border-outline-variant dark:border-outline/30 bg-surface/95 backdrop-blur-md dark:bg-inverse-surface/95 shadow-lg flex justify-around items-center px-4 py-2 pb-safe-bottom">
        <Link href="/" className="flex flex-col items-center justify-center bg-primary-container dark:bg-primary/20 text-on-primary-container dark:text-primary rounded-2xl px-4 py-1.5 scale-95 duration-150 transition-all">
          <span className="material-symbols-outlined icon-fill">home</span>
          <span className="text-label-sm font-label-sm mt-1 font-bold">Home</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1.5 hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-xl transition-all">
          <span className="material-symbols-outlined">search</span>
          <span className="text-label-sm font-label-sm mt-1">Search</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1.5 hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-xl transition-all">
          <span className="material-symbols-outlined">campaign</span>
          <span className="text-label-sm font-label-sm mt-1">My Ads</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1.5 hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-xl transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="text-label-sm font-label-sm mt-1">Profile</span>
        </Link>
      </nav>
      
      {/* FAB for Mobile (Post Ad) */}
      <Link href="/post-ad" className="md:hidden fixed bottom-24 right-4 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary p-4 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.25)] z-40 active:scale-95 transition-all flex items-center justify-center border border-outline-variant/20">
        <span className="material-symbols-outlined font-bold text-[28px]">add</span>
      </Link>
    </>
  );
}
