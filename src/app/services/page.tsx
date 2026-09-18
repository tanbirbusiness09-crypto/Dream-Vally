import { MOCK_DATA } from '@/lib/data';
import Link from 'next/link';

export default function LocalServicesPage({
  searchParams,
}: {
  searchParams: { q?: string; location?: string; category?: string };
}) {
  let services = MOCK_DATA.products.filter(p => p.categoryId === 'services');
  
  // If we don't have enough local services in mock data, let's create a richer local demo set
  const demoServices = services.length > 0 ? services : [
    { id: 's1', title: 'Professional Plumber', price: '৳ 500/hr', description: 'Expert in all plumbing repairs.', location: 'Dhaka', seller: { name: 'Rahim Ali', verified: true, joined: '2020' }, rating: 4.8, reviews: 124, specs: { Category: 'Plumbing' } },
    { id: 's2', title: 'AC Servicing & Repair', price: '৳ 1000/service', description: 'Gas refill, cleaning, and maintenance.', location: 'Chattogram', seller: { name: 'CoolTech BD', verified: true, joined: '2019' }, rating: 4.9, reviews: 89, specs: { Category: 'Appliance Repair' } },
    { id: 's3', title: 'Home Tutor (Math & Physics)', price: '৳ 8000/mo', description: 'Class 9-12. Experience: 5 years.', location: 'Dhaka', seller: { name: 'Sajid Hasan', verified: false, joined: '2022' }, rating: 4.5, reviews: 34, specs: { Category: 'Education' } },
    { id: 's4', title: 'Electrician (House Wiring)', price: '৳ 400/hr', description: 'Short circuit fix, new wiring.', location: 'Sylhet', seller: { name: 'Kamal Electric', verified: true, joined: '2021' }, rating: 4.7, reviews: 56, specs: { Category: 'Electrical' } },
  ];

  const query = searchParams.q?.toLowerCase();
  if (query) {
    // In a real app we would filter the demoServices here
  }

  return (
    <main className="w-full flex-grow flex flex-col items-center bg-surface-container-lowest pb-16">
      
      {/* Services Hero Section */}
      <section className="w-full bg-[#064e3b] dark:bg-[#021f17] pt-16 pb-20 relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -bottom-20 left-1/2 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[120px] -translate-x-1/2"></div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span className="material-symbols-outlined text-[#D4AF37] text-6xl mb-4 drop-shadow-lg">engineering</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif drop-shadow-md">
            Hire Trusted Professionals
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            From plumbers and electricians to tutors and designers. Find the best local service providers near you.
          </p>

          {/* Search Bar */}
          <form className="max-w-3xl mx-auto flex flex-col md:flex-row bg-surface p-2 rounded-2xl shadow-xl gap-2">
            <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-[#064e3b]/30">
              <span className="material-symbols-outlined text-outline mr-3">search</span>
              <input type="text" placeholder="What service do you need?" className="w-full bg-transparent border-none focus:outline-none text-on-surface" />
            </div>
            <div className="hidden md:block w-px h-8 bg-outline-variant/50 self-center mx-2"></div>
            <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-[#064e3b]/30">
              <span className="material-symbols-outlined text-outline mr-3">location_on</span>
              <input type="text" placeholder="Your City or Area" className="w-full bg-transparent border-none focus:outline-none text-on-surface" />
            </div>
            <button type="button" className="bg-[#D4AF37] hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95">
              Search
            </button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-white/60 text-sm py-1.5">Popular:</span>
            {['AC Repair', 'Plumber', 'Electrician', 'Home Tutor', 'Pest Control'].map((tag) => (
              <button key={tag} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-1.5 rounded-full transition-colors border border-white/20">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 flex flex-col md:flex-row gap-8">
        
        {/* Categories Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 p-5 sticky top-[96px]">
            <h3 className="font-bold text-lg text-on-surface mb-4">Service Categories</h3>
            <div className="flex flex-col gap-1">
              {[
                { name: 'Appliance Repair', icon: 'kitchen', count: 42 },
                { name: 'Plumbing', icon: 'plumbing', count: 28 },
                { name: 'Electrical', icon: 'electric_bolt', count: 35 },
                { name: 'Education & Tutors', icon: 'school', count: 89 },
                { name: 'Cleaning Services', icon: 'cleaning_services', count: 15 },
                { name: 'Beauty & Salon', icon: 'face_retouching_natural', count: 22 },
                { name: 'IT & Freelancers', icon: 'computer', count: 110 }
              ].map((cat) => (
                <button key={cat.name} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-[#064e3b] transition-colors group text-left">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                    <span className="font-medium text-sm group-hover:font-bold">{cat.name}</span>
                  </div>
                  <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Services List */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">Top Professionals</h2>
              <p className="text-on-surface-variant">Verified experts ready to help.</p>
            </div>
            <select className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20">
              <option>Highest Rated</option>
              <option>Nearest to me</option>
              <option>Price (Low to High)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoServices.map((service) => (
              <div key={service.id} className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 hover:border-[#064e3b]/50 hover:shadow-md transition-all overflow-hidden flex flex-col group">
                
                {/* Header (Profile & Rating) */}
                <div className="p-5 border-b border-outline-variant/20 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center overflow-hidden border border-outline-variant/30">
                      <span className="material-symbols-outlined text-2xl text-on-surface-variant">person</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface flex items-center gap-1">
                        {service.seller?.name}
                        {service.seller?.verified && <span className="material-symbols-outlined text-[16px] text-[#064e3b] icon-fill">verified</span>}
                      </h4>
                      <p className="text-xs text-on-surface-variant">Active since {service.seller?.joined || '2023'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                      <span className="font-bold text-on-surface">{(service as any).rating || '4.5'}</span>
                    </div>
                    <span className="text-xs text-on-surface-variant underline cursor-pointer">{(service as any).reviews || '20'} reviews</span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#064e3b] dark:text-[#D4AF37] group-hover:underline cursor-pointer">{service.title}</h3>
                    <span className="bg-surface-container-high text-on-surface font-bold px-2.5 py-1 rounded-lg text-sm whitespace-nowrap ml-2">
                      {service.price}
                    </span>
                  </div>
                  
                  <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center gap-4 mt-auto mb-5 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span> {service.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">category</span> {(service.specs as any)?.Category || 'General'}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold py-2.5 rounded-xl transition-colors active:scale-95">
                      View Profile
                    </button>
                    <button className="flex-1 bg-[#064e3b] text-white hover:bg-[#064e3b]/90 font-bold py-2.5 rounded-xl transition-colors active:scale-95 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">chat</span> Contact
                    </button>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
