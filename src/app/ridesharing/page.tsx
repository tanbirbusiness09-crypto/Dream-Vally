import Link from 'next/link';

export default function RideSharingPage() {
  // We can mock ridesharing data if it doesn't exist, or just use generic products for now
  // and pretend they are rides. Wait, let's create a custom static list of rides for the demo.
  
  const demoRides = [
    { id: 'r1', driver: 'Ahmed Ali', from: 'Dhaka', to: 'Sylhet', time: '10:00 AM, Tomorrow', seats: 3, price: '৳ 800', vehicle: 'Toyota Axio', rating: 4.8 },
    { id: 'r2', driver: 'Farhan Rahman', from: 'Dhaka', to: 'Chattogram', time: '08:30 PM, Today', seats: 2, price: '৳ 1,200', vehicle: 'Honda Vezel', rating: 4.9 },
    { id: 'r3', driver: 'Kamrul Hasan', from: 'Sylhet', to: 'Dhaka', time: '07:00 AM, Monday', seats: 4, price: '৳ 700', vehicle: 'Nissan Bluebird', rating: 4.5 },
    { id: 'r4', driver: 'Tanvir Ahmed', from: 'Rajshahi', to: 'Dhaka', time: '02:00 PM, Today', seats: 1, price: '৳ 1,000', vehicle: 'Toyota Corolla', rating: 4.7 },
  ];

  return (
    <main className="w-full flex-grow flex flex-col items-center bg-surface-container-lowest pb-16">
      
      {/* Ride Sharing Hero Section */}
      <section className="w-full bg-[#064e3b] dark:bg-[#021f17] pt-16 pb-24 relative overflow-hidden transition-colors">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span className="material-symbols-outlined text-[#D4AF37] text-6xl mb-4 drop-shadow-lg">directions_car</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif drop-shadow-md">
            Find Your Next Ride
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Share rides with verified drivers. Travel safely, comfortably, and affordably across Bangladesh.
          </p>

          {/* Ride Search Bar */}
          <form className="max-w-5xl mx-auto flex flex-col md:flex-row bg-surface p-2 rounded-2xl shadow-xl gap-2">
            <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-[#064e3b]/30">
              <span className="material-symbols-outlined text-outline mr-3">trip_origin</span>
              <input 
                name="from"
                type="text" 
                placeholder="Leaving From..." 
                className="w-full bg-transparent border-none focus:outline-none text-on-surface"
              />
            </div>
            <div className="hidden md:block w-px h-8 bg-outline-variant/50 self-center mx-2"></div>
            <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-[#064e3b]/30">
              <span className="material-symbols-outlined text-outline mr-3">pin_drop</span>
              <input 
                name="to"
                type="text" 
                placeholder="Going To..." 
                className="w-full bg-transparent border-none focus:outline-none text-on-surface"
              />
            </div>
            <div className="hidden md:block w-px h-8 bg-outline-variant/50 self-center mx-2"></div>
            <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-[#064e3b]/30">
              <span className="material-symbols-outlined text-outline mr-3">calendar_month</span>
              <input 
                name="date"
                type="date" 
                className="w-full bg-transparent border-none focus:outline-none text-on-surface text-sm"
              />
            </div>
            <button type="submit" className="bg-[#D4AF37] hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95">
              Search Rides
            </button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop -mt-8 relative z-20 flex flex-col gap-5">
        
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-2xl font-bold text-on-surface">Available Rides</h2>
          <select className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20">
            <option>Earliest Departure</option>
            <option>Lowest Price</option>
          </select>
        </div>

        {demoRides.map((ride) => (
          <div key={ride.id} className="bg-surface rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/30 hover:border-[#064e3b]/50 transition-all p-5 sm:p-6 group flex flex-col md:flex-row gap-6">
            
            {/* Driver Profile */}
            <div className="flex flex-col items-center justify-center border-r border-outline-variant/20 pr-6 min-w-[120px]">
              <div className="w-16 h-16 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center mb-2 overflow-hidden">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">person</span>
              </div>
              <p className="font-bold text-on-surface text-center">{ride.driver}</p>
              <div className="flex items-center text-[#D4AF37] text-sm mt-1">
                <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                <span className="font-bold ml-1">{ride.rating}</span>
              </div>
            </div>

            {/* Ride Details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-on-surface-variant mb-1">FROM</span>
                  <span className="text-lg font-bold text-[#064e3b] dark:text-[#D4AF37]">{ride.from}</span>
                </div>
                
                <div className="flex-1 flex items-center justify-center relative px-4">
                  <div className="w-full h-px bg-outline-variant/50 absolute top-1/2"></div>
                  <span className="material-symbols-outlined bg-surface text-outline px-2 relative z-10 text-[18px]">east</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-on-surface-variant mb-1">TO</span>
                  <span className="text-lg font-bold text-[#064e3b] dark:text-[#D4AF37]">{ride.to}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1 text-on-surface-variant bg-surface-container py-1 px-3 rounded-full border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> {ride.time}
                </span>
                <span className="flex items-center gap-1 text-on-surface-variant bg-surface-container py-1 px-3 rounded-full border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[16px]">directions_car</span> {ride.vehicle}
                </span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-col items-end justify-center border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 pl-0 md:pl-6 min-w-[140px]">
              <span className="text-xs font-bold text-on-surface-variant mb-1">PRICE PER SEAT</span>
              <span className="text-2xl font-bold text-on-surface mb-1">{ride.price}</span>
              <span className="text-sm text-error font-medium mb-4">{ride.seats} seats left</span>
              
              <button className="w-full bg-[#064e3b] text-white py-2.5 rounded-xl font-bold hover:bg-[#064e3b]/90 transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-2">
                Book Seat <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

          </div>
        ))}

      </section>
    </main>
  );
}
