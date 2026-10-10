import prisma from '@/lib/prisma';

export default async function DeliveryPage() {
  const courierListings = await prisma.listing.findMany({
    where: { status: 'ACTIVE', category: { slug: 'delivery' } },
    orderBy: [{ viewsCount: 'desc' }, { createdAt: 'desc' }],
    take: 12,
    include: {
      images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      user: { select: { shopName: true, fullName: true, isKycVerified: true } },
    },
  });

  const deliveryServices = courierListings.map((l) => ({
    id: l.id,
    title: l.title,
    price: `৳ ${Number(l.price).toLocaleString('en-IN')}`,
    description: l.description,
    image: l.images[0]?.url || '/assets/categories/cat_delivery.jpg',
    seller: {
      name: l.user.shopName || l.user.fullName,
      verified: l.user.isKycVerified,
    },
    location: l.city || 'Bangladesh',
    specs: (l.attributes as Record<string, string>) || {},
  }));

  return (
    <main className="w-full flex-grow flex flex-col items-center bg-surface-container-lowest pb-16">
      
      {/* Delivery Hero Section */}
      <section className="w-full bg-[#064e3b] dark:bg-[#021f17] pt-16 pb-20 relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-tertiary rounded-full blur-[100px]"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span className="material-symbols-outlined text-tertiary dark:text-[#D4AF37] text-6xl mb-4 drop-shadow-lg icon-fill">local_shipping</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif drop-shadow-md">
            Fast & Reliable Delivery
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Send parcels, documents, or move heavy furniture anywhere in Bangladesh with trusted logistics partners.
          </p>

          {/* Quick Quote Form */}
          <form className="max-w-4xl mx-auto flex flex-col md:flex-row bg-surface p-2 rounded-2xl shadow-xl gap-2">
            <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-tertiary/30">
              <span className="material-symbols-outlined text-outline mr-3">location_on</span>
              <input type="text" placeholder="Pickup Area (e.g. Gulshan)" className="w-full bg-transparent border-none focus:outline-none text-on-surface" />
            </div>
            <div className="hidden md:block w-px h-8 bg-outline-variant/50 self-center mx-2"></div>
            <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-tertiary/30">
              <span className="material-symbols-outlined text-outline mr-3">pin_drop</span>
              <input type="text" placeholder="Drop-off Area (e.g. Dhanmondi)" className="w-full bg-transparent border-none focus:outline-none text-on-surface" />
            </div>
            <div className="hidden md:block w-px h-8 bg-outline-variant/50 self-center mx-2"></div>
            <div className="w-full md:w-40 flex items-center bg-surface-container-lowest px-4 py-3 rounded-xl border border-transparent focus-within:border-tertiary/30">
              <span className="material-symbols-outlined text-outline mr-3">scale</span>
              <select className="w-full bg-transparent border-none focus:outline-none text-on-surface">
                <option>Up to 1kg</option>
                <option>1kg - 5kg</option>
                <option>5kg - 20kg</option>
                <option>Heavy Load</option>
              </select>
            </div>
            <button type="button" className="bg-tertiary hover:bg-tertiary/90 text-white dark:bg-[#D4AF37] dark:text-black dark:hover:bg-yellow-500 font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95">
              Get Quote
            </button>
          </form>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">Available Courier Services</h2>
            <p className="text-on-surface-variant">Compare rates and delivery times.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline">filter_list</span>
            <select className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-sm focus:outline-none">
              <option>All Services</option>
              <option>Same Day Delivery</option>
              <option>Inter-city</option>
              <option>International</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryServices.length === 0 && (
            <div className="col-span-full bg-surface rounded-2xl border border-outline-variant/30 p-10 text-center">
              <p className="font-bold text-on-surface">No courier services listed yet</p>
              <p className="text-sm text-on-surface-variant mt-1">Check back soon — new partners are added regularly.</p>
            </div>
          )}
          {deliveryServices.map((service) => (
            <div key={service.id} className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 p-6 flex flex-col group hover:border-tertiary hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/30 flex-shrink-0 relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" /* eslint-disable-line @next/next/no-img-element */ />
                </div>
                <div className="bg-tertiary/10 text-tertiary font-bold px-3 py-1 rounded-lg text-lg">
                  {service.price}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-on-surface mb-1 group-hover:text-tertiary transition-colors">{service.title}</h3>
              <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{service.description}</p>
              
              <div className="bg-surface-container rounded-xl p-4 mb-6 mt-auto">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-on-surface-variant">Provider:</span>
                  <span className="font-bold text-on-surface flex items-center gap-1">
                    {service.seller?.name} 
                    {service.seller?.verified && <span className="material-symbols-outlined text-[16px] text-[#064e3b] icon-fill">verified</span>}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-on-surface-variant">Location:</span>
                  <span className="font-medium text-on-surface">{service.location}</span>
                </div>
                {Object.entries(service.specs || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant">{key}:</span>
                    <span className="font-medium text-on-surface">{value as string}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-surface-container-high hover:bg-tertiary hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-black text-on-surface font-bold py-3 rounded-xl transition-colors border border-outline-variant/30 hover:border-transparent flex items-center justify-center gap-2 active:scale-95">
                Book Courier <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </button>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
