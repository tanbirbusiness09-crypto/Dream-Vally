import { PrismaClient, UserRole, MarketRegion, Currency, ItemCondition, ListingStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS } from '../src/lib/catalogData';

const prisma = new PrismaClient();

function mapCondition(c: string): ItemCondition {
  switch (c) {
    case 'Brand New': return 'BRAND_NEW';
    case 'Like New': return 'LIKE_NEW';
    case 'Refurbished': return 'REFURBISHED';
    default: return 'USED';
  }
}

function mapCurrency(country: string): Currency {
  return country === 'Saudi Arabia' ? 'SAR' : 'BDT';
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
}

async function main() {
  console.log('🌱 Seeding Dreamvally database...');

  // 1. Demo users (sellers)
  const demoHash = await bcrypt.hash('demo1234', 10);
  const demoSeller = await prisma.user.upsert({
    where: { phoneNumber: '+8801711000001' },
    update: { passwordHash: demoHash },
    create: {
      email: 'demo@dreamvally.com',
      phoneNumber: '+8801711000001',
      passwordHash: demoHash,
      fullName: 'Demo Seller',
      role: UserRole.VERIFIED_MERCHANT,
      primaryMarket: MarketRegion.BOTH,
      isPhoneVerified: true,
      isKycVerified: true,
      shopName: 'Dream Fashion',
      shopSlug: 'demo-shop-123',
      shopDescription: 'Official demo shop for Dreamvally marketplace',
      country: 'Bangladesh',
      city: 'Dhaka',
      division: 'Dhaka',
      sellerRating: 4.9,
      totalReviews: 148,
    },
  });

  const saSeller = await prisma.user.upsert({
    where: { phoneNumber: '+966500000001' },
    update: { passwordHash: demoHash },
    create: {
      email: 'riyadh@dreamvally.com',
      phoneNumber: '+966500000001',
      passwordHash: demoHash,
      fullName: 'Gadget Studio Riyadh',
      role: UserRole.SELLER,
      primaryMarket: MarketRegion.SA,
      isPhoneVerified: true,
      shopName: 'Gadget Studio SA',
      shopSlug: 'gadget-studio-sa',
      country: 'Saudi Arabia',
      city: 'Riyadh',
    },
  });

  // 2. Categories
  const categoryMap: Record<string, string> = {};
  for (const [i, cat] of CATALOG_CATEGORIES.entries()) {
    const created = await prisma.category.upsert({
      where: { slug: cat.id },
      update: { name: cat.name, description: cat.description, iconName: cat.iconName, imageUrl: cat.image, sortOrder: i },
      create: {
        name: cat.name,
        slug: cat.id,
        description: cat.description,
        iconName: cat.iconName,
        imageUrl: cat.image,
        sortOrder: i,
      },
    });
    categoryMap[cat.id] = created.id;
  }

  // 2b. Delivery category (dedicated /delivery page) + service & courier listings
  const deliveryCat = await prisma.category.upsert({
    where: { slug: 'delivery' },
    update: {},
    create: {
      name: 'Delivery & Courier',
      slug: 'delivery',
      description: 'Courier, parcel and logistics services',
      iconName: 'local_shipping',
      imageUrl: '/assets/categories/cat_delivery.jpg',
      sortOrder: CATALOG_CATEGORIES.length,
    },
  });
  const servicesCat = await prisma.category.findUnique({ where: { slug: 'services' } });

  const extraListings = [
    // Local services (shown on /services)
    ...(servicesCat
      ? [
          { sku: 'SVC-PLUMBER', catId: servicesCat.id, title: 'Professional Plumber', price: 500, description: 'Expert in all plumbing repairs, leakage fixing and pipe installation across Dhaka.', city: 'Dhaka', attrs: { Category: 'Plumbing', Rate: '/hr', Experience: '8+ years' } },
          { sku: 'SVC-AC', catId: servicesCat.id, title: 'AC Servicing & Repair', price: 1000, description: 'Gas refill, cleaning, and full maintenance for all AC brands.', city: 'Chattogram', attrs: { Category: 'Appliance Repair', Rate: '/service', Experience: '6+ years' } },
          { sku: 'SVC-TUTOR', catId: servicesCat.id, title: 'Home Tutor (Math & Physics)', price: 8000, description: 'Class 9-12 students. 5 years of experienced teaching.', city: 'Dhaka', attrs: { Category: 'Education', Rate: '/mo', Experience: '5 years' } },
          { sku: 'SVC-ELECTRICIAN', catId: servicesCat.id, title: 'Electrician (House Wiring)', price: 400, description: 'Short circuit fix, new wiring and fan/light installation.', city: 'Sylhet', attrs: { Category: 'Electrical', Rate: '/hr', Experience: '10 years' } },
        ]
      : []),
    // Courier services (shown on /delivery)
    { sku: 'DLV-STEADFAST', catId: deliveryCat.id, title: 'Steadfast Courier — Same Day Dhaka', price: 80, description: 'Lightning same-day parcel delivery inside Dhaka metro with live tracking.', city: 'Dhaka', attrs: { 'Delivery Time': 'Same Day', Coverage: 'Dhaka Metro' } },
    { sku: 'DLV-PATHAO', catId: deliveryCat.id, title: 'Pathao Courier — Nationwide Parcel', price: 60, description: 'Reliable nationwide courier with cash-on-delivery support for e-commerce.', city: 'Dhaka', attrs: { 'Delivery Time': '1-2 Days', Coverage: 'All Districts' } },
    { sku: 'DLV-REDX', catId: deliveryCat.id, title: 'RedX — E-commerce Fulfillment', price: 70, description: 'Warehouse pickup and delivery for online sellers with return handling.', city: 'Dhaka', attrs: { 'Delivery Time': '1-3 Days', Coverage: 'Nationwide' } },
    { sku: 'DLV-SUNDARBAN', catId: deliveryCat.id, title: 'Sundarban Courier — Heavy Parcel', price: 120, description: 'Trusted courier for documents and heavy parcels across Bangladesh.', city: 'Dhaka', attrs: { 'Delivery Time': '2-3 Days', Coverage: 'Nationwide' } },
  ];

  for (const ex of extraListings) {
    const listing = await prisma.listing.upsert({
      where: { sku: ex.sku },
      update: {},
      create: {
        title: ex.title,
        slug: slugify(ex.title),
        description: ex.description,
        price: ex.price,
        stock: 20,
        sku: ex.sku,
        condition: 'BRAND_NEW' as ItemCondition,
        status: ListingStatus.ACTIVE,
        targetMarket: MarketRegion.BD,
        deliveryAvailable: true,
        attributes: ex.attrs as object,
        country: 'Bangladesh',
        city: ex.city,
        userId: demoSeller.id,
        categoryId: ex.catId,
      },
    });
    const imgCount = await prisma.listingImage.count({ where: { listingId: listing.id } });
    if (imgCount === 0) {
      await prisma.listingImage.create({
        data: {
          listingId: listing.id,
          url: ex.sku.startsWith('DLV-')
            ? '/assets/categories/cat_delivery.jpg'
            : '/assets/categories/cat_services.jpg',
          isPrimary: true,
          sortOrder: 0,
        },
      });
    }
  }

  // 3. Listings from catalog products
  for (const prod of CATALOG_PRODUCTS) {
    const userId = prod.country === 'Saudi Arabia' ? saSeller.id : demoSeller.id;
    const categoryId = categoryMap[prod.categoryId];
    if (!categoryId) {
      console.warn(`⚠️ No category for ${prod.id} (${prod.categoryId})`);
      continue;
    }

    const listing = await prisma.listing.upsert({
      where: { sku: `CAT-${prod.id.toUpperCase()}` },
      update: {},
      create: {
        title: prod.title,
        slug: slugify(prod.title),
        description: prod.description,
        price: prod.numericPrice,
        currency: mapCurrency(prod.country),
        isNegotiable: true,
        stock: 5,
        sku: `CAT-${prod.id.toUpperCase()}`,
        condition: mapCondition(prod.condition),
        status: ListingStatus.ACTIVE,
        targetMarket: prod.country === 'Saudi Arabia' ? MarketRegion.SA : MarketRegion.BD,
        deliveryAvailable: prod.deliveryAvailable,
        attributes: prod.specs as object,
        country: prod.country,
        city: prod.city,
        area: prod.location,
        viewsCount: prod.viewsCount,
        likesCount: prod.likesCount,
        userId,
        categoryId,
      },
    });

    // Images (only create if none exist)
    const imgCount = await prisma.listingImage.count({ where: { listingId: listing.id } });
    if (imgCount === 0) {
      await prisma.listingImage.createMany({
        data: prod.images.map((url, idx) => ({
          listingId: listing.id,
          url,
          isPrimary: idx === 0,
          sortOrder: idx,
        })),
      });
    }
  }

  // 3b. Rich listings — every category needs 6+ active products so home sections are full
  type RichListing = {
    sku: string;
    cat: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    stock: number;
    condition: ItemCondition;
    city: string;
    area?: string;
    views: number;
    likes: number;
    images: string[];
    deliverable: boolean;
    attrs?: Record<string, string>;
  };

  const richListings: RichListing[] = [
    // Mobiles & Gadgets (2 existing → 6)
    { sku: 'RICH-MOB-01', cat: 'mobiles', title: 'Samsung Galaxy A55 5G (8/256GB, Awesome Blue)', description: 'Official Bangladesh set with 1-year warranty, 5000mAh battery and 50MP OIS camera.', price: 38999, originalPrice: 44999, discountPercent: 13, stock: 12, condition: 'BRAND_NEW', city: 'Dhaka', views: 3800, likes: 95, images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1000&q=85'], deliverable: true, attrs: { Brand: 'Samsung' } },
    { sku: 'RICH-MOB-02', cat: 'mobiles', title: 'Xiaomi Redmi Note 13 Pro (8/256GB, Obsidian Black)', description: '200MP camera, 67W turbo charging and AMOLED display. PTA approved with box.', price: 27499, originalPrice: 31999, discountPercent: 14, stock: 20, condition: 'BRAND_NEW', city: 'Chattogram', views: 2900, likes: 88, images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1000&q=85'], deliverable: true, attrs: { Brand: 'Xiaomi' } },
    { sku: 'RICH-MOB-03', cat: 'mobiles', title: 'Realme 12 Pro+ 5G (12/512GB, Navigator Beige)', description: 'Periscope telephoto camera, Snapdragon 7s Gen 2 and 67W fast charge. Sealed pack.', price: 44999, stock: 8, condition: 'BRAND_NEW', city: 'Sylhet', views: 2100, likes: 61, images: ['/assets/categories/cat_mobiles.jpg'], deliverable: true, attrs: { Brand: 'Realme' } },
    { sku: 'RICH-MOB-04', cat: 'mobiles', title: 'Apple Watch Series 9 (GPS, 45mm, Midnight)', description: 'Blood oxygen and ECG tracking with double-tap gesture. Brand new with 1-year warranty.', price: 46500, originalPrice: 52000, discountPercent: 11, stock: 6, condition: 'BRAND_NEW', city: 'Dhaka', views: 3300, likes: 112, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85'], deliverable: true, attrs: { Brand: 'Apple' } },
    // Electronics & Laptops (2 existing → 6)
    { sku: 'RICH-ELC-01', cat: 'electronics', title: 'HP Pavilion 15 Laptop (Core i7-13th Gen, 16GB/512GB)', description: 'Full HD IPS display, backlit keyboard and 10-hour battery. 2-year onsite warranty.', price: 89900, originalPrice: 96500, discountPercent: 7, stock: 5, condition: 'BRAND_NEW', city: 'Dhaka', views: 2700, likes: 74, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&q=85'], deliverable: true, attrs: { Brand: 'HP' } },
    { sku: 'RICH-ELC-02', cat: 'electronics', title: 'Dell XPS 14 Creator Laptop (Core Ultra 7, 32GB/1TB)', description: 'OLED 3K touchscreen for creators with RTX 4050 graphics. Premium aluminium build.', price: 168000, stock: 3, condition: 'BRAND_NEW', city: 'Chattogram', views: 1900, likes: 57, images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1000&q=85'], deliverable: true, attrs: { Brand: 'Dell' } },
    { sku: 'RICH-ELC-03', cat: 'electronics', title: 'Asus ROG Strix G16 Gaming Laptop (i9, RTX 4060)', description: '240Hz display, 16GB DDR5 RAM and Liquid Metal cooling for high-FPS gaming.', price: 215000, originalPrice: 235000, discountPercent: 9, stock: 4, condition: 'BRAND_NEW', city: 'Dhaka', views: 4100, likes: 130, images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'], deliverable: true, attrs: { Brand: 'Asus' } },
    { sku: 'RICH-ELC-04', cat: 'electronics', title: 'Canon EOS R50 Mirrorless (RF-S 18-45mm Kit)', description: '24MP APS-C sensor with 4K video and eye-tracking AF. Perfect for content creators.', price: 78500, originalPrice: 84000, discountPercent: 7, stock: 6, condition: 'BRAND_NEW', city: 'Sylhet', views: 1600, likes: 47, images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=85'], deliverable: true, attrs: { Brand: 'Canon' } },
    // Vehicles (2 existing → 6)
    { sku: 'RICH-VEH-01', cat: 'vehicles', title: 'Toyota Axio 2016 (Registered 2018, 42,000 km)', description: 'Fresh import with clean interior, full service history and no accident record.', price: 2450000, stock: 1, condition: 'USED', city: 'Dhaka', views: 3500, likes: 90, images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1000&q=85'], deliverable: false, attrs: { Brand: 'Toyota' } },
    { sku: 'RICH-VEH-02', cat: 'vehicles', title: 'Mitsubishi Pajero Sport 2015 (4WD, Diamond Edition)', description: 'Full-time 4WD SUV with leather seats, sunroof and fresh engine oil service.', price: 4200000, stock: 1, condition: 'USED', city: 'Dhaka', views: 2800, likes: 71, images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=85'], deliverable: false, attrs: { Brand: 'Mitsubishi' } },
    { sku: 'RICH-VEH-03', cat: 'vehicles', title: 'Honda CB Shine 125 (2022, 8,500 km, Single Owner)', description: 'Well-maintained commuter bike with new tyres and valid fitness up to 2026.', price: 138000, originalPrice: 150000, discountPercent: 8, stock: 1, condition: 'USED', city: 'Gazipur', views: 2400, likes: 66, images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1000&q=85'], deliverable: false, attrs: { Brand: 'Honda' } },
    { sku: 'RICH-VEH-04', cat: 'vehicles', title: 'Yamaha FZ-S V4 (2023, Single Owner, 3,200 km)', description: 'Barely used sport commuter with ABS, MRF tyres and all papers ready for transfer.', price: 198000, stock: 1, condition: 'USED', city: 'Chattogram', views: 2000, likes: 58, images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1000&q=85'], deliverable: false, attrs: { Brand: 'Yamaha' } },
    // Property (1 existing → 6)
    { sku: 'RICH-PRP-01', cat: 'property', title: '2BHK Apartment in Dhanmondi (1,150 Sqft, 3rd Floor)', description: 'Lift, generator and parking facility in a quiet residential road near Dhanmondi 27.', price: 3650000, stock: 1, condition: 'USED', city: 'Dhaka', area: 'Dhanmondi', views: 3100, likes: 74, images: ['/assets/products/prod_3bhk_flat.jpg'], deliverable: false, attrs: { Type: 'Apartment' } },
    { sku: 'RICH-PRP-02', cat: 'property', title: 'Commercial Shop Space in Gulshan-1 (650 Sqft, Main Road)', description: 'High foot-traffic corner shop ideal for boutique, cafe or showroom with gas line.', price: 5200000, stock: 1, condition: 'USED', city: 'Dhaka', area: 'Gulshan', views: 1800, likes: 40, images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=85'], deliverable: false, attrs: { Type: 'Commercial' } },
    { sku: 'RICH-PRP-03', cat: 'property', title: 'Residential House in Mirpur-10 (5 Katha, 2 Storey)', description: 'Family home with modern fittings, roof garden and 20ft road access. Clear title.', price: 8900000, stock: 1, condition: 'USED', city: 'Dhaka', area: 'Mirpur', views: 2600, likes: 62, images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=85'], deliverable: false, attrs: { Type: 'House' } },
    { sku: 'RICH-PRP-04', cat: 'property', title: 'Land Plot in Savar (2 Katha, 20ft Road Facing)', description: 'Ready residential plot with mutated deed, electricity and water nearby.', price: 3450000, stock: 1, condition: 'USED', city: 'Dhaka', area: 'Savar', views: 1500, likes: 38, images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85'], deliverable: false, attrs: { Type: 'Land' } },
    { sku: 'RICH-PRP-05', cat: 'property', title: '3BHK Duplex in Bashundhara R/A (2,000 Sqft, Rooftop)', description: 'East-facing duplex with servant quarter, two balconies and community park view.', price: 7850000, originalPrice: 8200000, discountPercent: 4, stock: 1, condition: 'USED', city: 'Dhaka', area: 'Bashundhara', views: 2200, likes: 55, images: ['/assets/products/prod_3bhk_flat.jpg'], deliverable: false, attrs: { Type: 'Duplex' } },
    // Fashion & Luxury (1 existing → 6)
    { sku: 'RICH-FSH-01', cat: 'fashion', title: 'Cotton Three-Piece Eid Collection (All Sizes)', description: 'Breathable cotton three-piece with embroidered dupatta. Size S to XXL available.', price: 2450, originalPrice: 3200, discountPercent: 23, stock: 30, condition: 'BRAND_NEW', city: 'Dhaka', views: 3900, likes: 145, images: ['/assets/products/prod_mens_panjabi.jpg'], deliverable: true, attrs: { Material: 'Cotton' } },
    { sku: 'RICH-FSH-02', cat: 'fashion', title: 'Handloom Jamdani Saree (Premium, Woven in Rupganj)', description: 'Authentic handwoven Jamdani with floral motifs. Comes with matching blouse piece.', price: 12500, stock: 9, condition: 'BRAND_NEW', city: 'Dhaka', area: 'Narayanganj', views: 3200, likes: 121, images: ['/assets/products/prod_mens_panjabi.jpg'], deliverable: true, attrs: { Material: 'Handloom Cotton' } },
    { sku: 'RICH-FSH-03', cat: 'fashion', title: "Men's Panjabi — Eid Special (Silk Blend, Navy)", description: 'Premium silk-blend panjabi with contrast placket. Perfect for Eid and weddings.', price: 3850, originalPrice: 4600, discountPercent: 16, stock: 22, condition: 'BRAND_NEW', city: 'Chattogram', views: 2800, likes: 97, images: ['/assets/products/prod_mens_panjabi.jpg'], deliverable: true, attrs: { Material: 'Silk Blend' } },
    { sku: 'RICH-FSH-04', cat: 'fashion', title: 'Titan Leather Formal Watch (Silver, Water Resistant)', description: 'Stainless steel strap with sapphire-coated glass. 2-year international warranty.', price: 5600, originalPrice: 6500, discountPercent: 14, stock: 15, condition: 'BRAND_NEW', city: 'Dhaka', views: 2100, likes: 70, images: ['https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1000&q=85'], deliverable: true, attrs: { Brand: 'Titan' } },
    { sku: 'RICH-FSH-05', cat: 'fashion', title: 'Casio G-Shock GA-2100 (Carbon Core, Black)', description: 'Shock-resistant analog-digital watch with world time. Box and card included.', price: 14200, stock: 7, condition: 'BRAND_NEW', city: 'Sylhet', views: 4400, likes: 160, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85'], deliverable: true, attrs: { Brand: 'Casio' } },
    // Home & Furniture (1 existing → 6)
    { sku: 'RICH-HOM-01', cat: 'home', title: 'L-Shape Fabric Sofa Set (5 Seater, Charcoal Grey)', description: 'Kiln-dried hardwood frame with stain-resistant fabric and high-density foam.', price: 42500, originalPrice: 52000, discountPercent: 18, stock: 4, condition: 'BRAND_NEW', city: 'Dhaka', views: 3600, likes: 118, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85'], deliverable: true, attrs: { Type: 'Sofa Set' } },
    { sku: 'RICH-HOM-02', cat: 'home', title: '6-Seater Dining Table (Sheesham Wood, Walnut Finish)', description: 'Solid wood dining set with cushioned chairs. Free delivery and assembly in Dhaka.', price: 31000, stock: 6, condition: 'BRAND_NEW', city: 'Chattogram', views: 2400, likes: 79, images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=85'], deliverable: true, attrs: { Type: 'Dining Set' } },
    { sku: 'RICH-HOM-03', cat: 'home', title: 'Recliner Lounge Chair (Brown Leatherette, Single)', description: 'Smooth 180-degree recline with footrest and cup holder. 10-year frame warranty.', price: 18900, originalPrice: 23500, discountPercent: 20, stock: 8, condition: 'BRAND_NEW', city: 'Dhaka', views: 1700, likes: 52, images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=85'], deliverable: true, attrs: { Type: 'Recliner' } },
    { sku: 'RICH-HOM-04', cat: 'home', title: 'Teak Wood Bookshelf (5 Tier, Hand-Carved)', description: 'Seasoned Chittagong teak with anti-termite treatment. Holds 150+ books.', price: 14500, stock: 5, condition: 'BRAND_NEW', city: 'Sylhet', views: 1300, likes: 41, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85'], deliverable: true, attrs: { Type: 'Shelf' } },
    { sku: 'RICH-HOM-05', cat: 'home', title: 'Queen Size Bed with Storage (Engineered Wood, Walnut)', description: 'Hydraulic storage bed with padded headboard. Mattress not included.', price: 26800, originalPrice: 31000, discountPercent: 14, stock: 7, condition: 'BRAND_NEW', city: 'Dhaka', views: 2000, likes: 63, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85'], deliverable: true, attrs: { Type: 'Bed' } },
    // Pets (1 existing → 6)
    { sku: 'RICH-PET-01', cat: 'pets', title: 'Golden Retriever Puppy (Vaccinated, 2 Months)', description: 'Champion-line golden retriever puppies with first vaccine and deworming done.', price: 18500, originalPrice: 22000, discountPercent: 16, stock: 3, condition: 'BRAND_NEW', city: 'Dhaka', views: 4200, likes: 176, images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&q=85'], deliverable: false, attrs: { Breed: 'Golden Retriever' } },
    { sku: 'RICH-PET-02', cat: 'pets', title: 'Labrador Puppy (Black, KC Registered)', description: 'Friendly black Labrador pups ready for new homes. Health certificate provided.', price: 16000, stock: 4, condition: 'BRAND_NEW', city: 'Chattogram', views: 2700, likes: 84, images: ['/assets/categories/cat_pets.jpg'], deliverable: false, attrs: { Breed: 'Labrador' } },
    { sku: 'RICH-PET-03', cat: 'pets', title: 'Persian Cat Kitten (White, Litter Trained, 2.5 Months)', description: 'Vaccinated white Persian kitten raised at home. Parents available for viewing.', price: 14000, originalPrice: 16500, discountPercent: 15, stock: 2, condition: 'BRAND_NEW', city: 'Sylhet', views: 3400, likes: 132, images: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1000&q=85'], deliverable: false, attrs: { Breed: 'Persian' } },
    { sku: 'RICH-PET-04', cat: 'pets', title: 'German Shepherd Puppy (9 Weeks, Dewormed)', description: 'Active German Shepherd pups with erect ears and strong bone structure.', price: 19500, stock: 3, condition: 'BRAND_NEW', city: 'Dhaka', views: 2300, likes: 72, images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&q=85'], deliverable: false, attrs: { Breed: 'German Shepherd' } },
    { sku: 'RICH-PET-05', cat: 'pets', title: 'Premium Dog Food 20kg (Chicken & Rice Formula)', description: 'Adult dog food with real chicken as first ingredient. Sealed factory packaging.', price: 6800, originalPrice: 7900, discountPercent: 14, stock: 25, condition: 'BRAND_NEW', city: 'Dhaka', views: 1900, likes: 58, images: ['/assets/categories/cat_pets.jpg'], deliverable: true, attrs: { Brand: 'PetLife' } },
    // Local Services (4 existing → 6)
    { sku: 'RICH-SVC-01', cat: 'services', title: 'Wedding Photography & Videography (Full Day)', description: '4K cinematic coverage with drone shot, same-day teaser and edited full film.', price: 25000, stock: 10, condition: 'BRAND_NEW', city: 'Dhaka', views: 1700, likes: 49, images: ['/assets/categories/cat_services.jpg'], deliverable: false, attrs: { Category: 'Photography', Rate: '/event' } },
    { sku: 'RICH-SVC-02', cat: 'services', title: 'House Painting Service (Full Home, Materials Included)', description: 'Professional painters with Asian Paints materials. 5-year emulsion warranty.', price: 12000, stock: 10, condition: 'BRAND_NEW', city: 'Chattogram', views: 1300, likes: 36, images: ['/assets/categories/cat_services.jpg'], deliverable: false, attrs: { Category: 'Home Improvement', Rate: '/project' } },
    // Delivery & Courier (4 existing → 6)
    { sku: 'RICH-DLV-01', cat: 'delivery', title: 'eCourier — Nationwide Parcel with COD', description: 'Cash-on-delivery service covering all 64 districts with 2-3 day standard delivery.', price: 70, stock: 999, condition: 'BRAND_NEW', city: 'Dhaka', views: 2600, likes: 67, images: ['/assets/categories/cat_delivery.jpg'], deliverable: true, attrs: { 'Delivery Time': '2-3 Days', Coverage: 'All Districts' } },
    { sku: 'RICH-DLV-02', cat: 'delivery', title: 'Paperfly — Inside Dhaka Express (3 Hours)', description: 'Ultra-fast intra-Dhaka delivery with live rider tracking and parcel insurance.', price: 65, stock: 999, condition: 'BRAND_NEW', city: 'Dhaka', views: 2100, likes: 55, images: ['/assets/categories/cat_delivery.jpg'], deliverable: true, attrs: { 'Delivery Time': '3 Hours', Coverage: 'Inside Dhaka' } },
  ];

  for (const r of richListings) {
    const categoryId = r.cat === 'delivery' ? deliveryCat.id : categoryMap[r.cat];
    if (!categoryId) {
      console.warn(`⚠️ No category for ${r.sku} (${r.cat})`);
      continue;
    }
    const listing = await prisma.listing.upsert({
      where: { sku: r.sku },
      update: {},
      create: {
        title: r.title,
        slug: slugify(r.title),
        description: r.description,
        price: r.price,
        ...(r.originalPrice ? { originalPrice: r.originalPrice } : {}),
        ...(r.discountPercent ? { discountPercent: r.discountPercent } : {}),
        stock: r.stock,
        sku: r.sku,
        condition: r.condition,
        status: ListingStatus.ACTIVE,
        targetMarket: MarketRegion.BD,
        deliveryAvailable: r.deliverable,
        ...(r.attrs ? { attributes: r.attrs as object } : {}),
        country: 'Bangladesh',
        city: r.city,
        ...(r.area ? { area: r.area } : {}),
        viewsCount: r.views,
        likesCount: r.likes,
        userId: demoSeller.id,
        categoryId,
      },
    });
    const imgCount = await prisma.listingImage.count({ where: { listingId: listing.id } });
    if (imgCount === 0) {
      await prisma.listingImage.createMany({
        data: r.images.map((url, idx) => ({
          listingId: listing.id,
          url,
          isPrimary: idx === 0,
          sortOrder: idx,
        })),
      });
    }
  }

  // 4. Demo buyer + orders (so seller Orders/Dashboard show real DB data)
  const buyer = await prisma.user.upsert({
    where: { phoneNumber: '+8801711000099' },
    update: {},
    create: {
      email: 'buyer@dreamvally.com',
      phoneNumber: '+8801711000099',
      passwordHash: demoHash,
      fullName: 'Rakib Hasan',
      role: UserRole.BUYER,
      primaryMarket: MarketRegion.BD,
      country: 'Bangladesh',
      city: 'Dhaka',
    },
  });

  const demoListings = await prisma.listing.findMany({
    where: { userId: demoSeller.id, status: 'ACTIVE' },
    select: { id: true, price: true },
    take: 6,
    orderBy: { createdAt: 'asc' },
  });

  const orderTemplates = [
    { daysAgo: 0, qty: 1, status: 'PAID_ESCROW' as const },
    { daysAgo: 1, qty: 2, status: 'SHIPPED' as const },
    { daysAgo: 2, qty: 1, status: 'DELIVERED' as const },
    { daysAgo: 3, qty: 1, status: 'COMPLETED' as const },
    { daysAgo: 5, qty: 3, status: 'COMPLETED' as const },
    { daysAgo: 6, qty: 1, status: 'CANCELLED' as const },
  ];

  for (const [i, tpl] of orderTemplates.entries()) {
    const listing = demoListings[i % demoListings.length];
    if (!listing) break;
    const orderNumber = `ORD-DEMO-${1000 + i}`;
    const createdAt = new Date(Date.now() - tpl.daysAgo * 24 * 60 * 60 * 1000);
    const total = Number(listing.price) * tpl.qty;

    await prisma.order.upsert({
      where: { orderNumber },
      update: { createdAt },
      create: {
        orderNumber,
        totalAmount: total,
        status: tpl.status,
        shippingAddress: 'House 42, Road 11, Banani, Dhaka',
        contactPhone: '+8801711000099',
        buyerId: buyer.id,
        sellerId: demoSeller.id,
        createdAt,
        items: {
          create: [{ quantity: tpl.qty, unitPrice: listing.price, listingId: listing.id }],
        },
      },
    });
  }

  const counts = {
    users: await prisma.user.count(),
    categories: await prisma.category.count(),
    listings: await prisma.listing.count(),
    images: await prisma.listingImage.count(),
    orders: await prisma.order.count(),
  };
  console.log('✅ Seed complete:', counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
