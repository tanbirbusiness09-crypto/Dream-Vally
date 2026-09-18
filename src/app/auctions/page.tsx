import { MOCK_DATA } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

export default function AuctionsPage() {
  const demoAuctions = [
    { id: 'a1', title: 'Antique 19th Century Gold Pocket Watch', currentBid: '৳ 1,50,000', endsIn: '02:15:30', image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&q=80', bids: 24, seller: 'Royal Antiques' },
    { id: 'a2', title: 'Signed Cricket Bat (Shakib Al Hasan)', currentBid: '৳ 45,000', endsIn: '05:45:10', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80', bids: 12, seller: 'Sports Memorabilia BD' },
    { id: 'a3', title: 'Original Jogen Chowdhury Painting', currentBid: '৳ 5,20,000', endsIn: '12:00:00', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80', bids: 38, seller: 'Art Gallery Dhaka' },
    { id: 'a4', title: 'Vintage Royal Enfield Classic 350', currentBid: '৳ 3,10,000', endsIn: '00:45:00', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80', bids: 18, seller: 'Classic Motors' },
  ];

  return (
    <main className="w-full flex-grow flex flex-col items-center bg-surface-container-lowest pb-16">
      
      {/* Auctions Hero Section */}
      <section className="w-full bg-[#111111] pt-16 pb-20 relative overflow-hidden transition-colors">
        {/* Luxury Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-32 left-1/2 w-[800px] h-[800px] bg-[#D4AF37] rounded-full blur-[150px] -translate-x-1/2 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-error rounded-full blur-[100px] opacity-10"></div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span className="material-symbols-outlined text-[#D4AF37] text-6xl mb-4 drop-shadow-lg icon-fill">gavel</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-wide drop-shadow-md">
            Exclusive Live Auctions
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Bid on rare antiques, collectibles, and premium items. Secure your dream item before the clock runs out.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#D4AF37] hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined">local_fire_department</span> View Hot Auctions
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-3 rounded-xl transition-all active:scale-95">
              How it Works
            </button>
          </div>
        </div>
      </section>

      {/* Live Auctions Grid */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12">
        
        <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-error rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <h2 className="text-3xl font-bold text-on-surface font-serif">Live Right Now</h2>
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]">
              <option>Ending Soonest</option>
              <option>Highest Bid</option>
              <option>Most Bids</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoAuctions.map((auction) => (
            <div key={auction.id} className="bg-surface rounded-2xl shadow-md border border-outline-variant/30 hover:border-[#D4AF37] hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] transition-all overflow-hidden group flex flex-col">
              
              {/* Image & Timer */}
              <div className="relative h-60 w-full overflow-hidden">
                <img 
                  src={auction.image} 
                  alt={auction.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Timer Pill */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg">
                  <span className="material-symbols-outlined text-[16px] text-error animate-pulse">timer</span>
                  {auction.endsIn}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Current Highest Bid</p>
                  <p className="text-2xl font-bold text-[#D4AF37] drop-shadow-md">{auction.currentBid}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-on-surface leading-tight mb-2 group-hover:text-[#064e3b] dark:group-hover:text-[#D4AF37] transition-colors">
                  {auction.title}
                </h3>
                
                <div className="flex justify-between items-center text-sm text-on-surface-variant mb-6 mt-auto">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">gavel</span> {auction.bids} Bids
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span> {auction.seller}
                  </span>
                </div>

                <button className="w-full bg-[#111111] dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-black transition-colors active:scale-95 flex items-center justify-center gap-2 border border-transparent">
                  Place Bid <span className="material-symbols-outlined text-[18px]">keyboard_double_arrow_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
