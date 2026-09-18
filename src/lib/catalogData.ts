export interface ProductSeller {
  name: string;
  avatar: string;
  verified: boolean;
  memberSince: string;
  rating: number;
  reviewsCount: number;
  responseTime: string;
  phone: string;
  location: string;
  totalAds: number;
}

export interface CatalogProduct {
  id: string;
  categoryId: string;
  categoryName: string;
  subCategory?: string;
  title: string;
  price: string;
  numericPrice: number;
  regularPrice?: string;
  savings?: string;
  condition: 'Brand New' | 'Like New' | 'Used' | 'Refurbished';
  location: string;
  city: string;
  country: 'Bangladesh' | 'Saudi Arabia';
  postedTime: string;
  viewsCount: number;
  rating: number;
  reviewsCount: number;
  badge?: { label: string; className: string };
  images: string[];
  description: string;
  specs: Record<string, string>;
  features: string[];
  seller: ProductSeller;
  warranty?: string;
  deliveryAvailable: boolean;
  isHotDeal?: boolean;
  likesCount: number;
  isLiked?: boolean;
}

export interface CatalogCategory {
  id: string;
  name: string;
  bnName: string;
  description: string;
  iconName: string;
  image: string;
  accentColor: string;
  subCategories: string[];
  itemCount: number;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'mobiles',
    name: 'Mobiles & Tablets',
    bnName: 'মোবাইল ও ট্যাবলেট',
    description: 'Certified smartphones, iPhones, smartwatches & accessories',
    iconName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    accentColor: 'from-blue-600 to-indigo-600',
    subCategories: ['Apple iPhone', 'Samsung Galaxy', 'Xiaomi & Redmi', 'Google Pixel', 'OnePlus', 'Tablets & iPads', 'Smartwatches'],
    itemCount: 428,
  },
  {
    id: 'electronics',
    name: 'Electronics & Computers',
    bnName: 'ইলেকট্রনিক্স ও কম্পিউটার',
    description: 'Laptops, MacBooks, 4K TVs, cameras & gaming consoles',
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    accentColor: 'from-emerald-600 to-teal-600',
    subCategories: ['Apple MacBooks', 'Gaming Laptops', 'DSLR & Mirrorless Cameras', 'Smart TVs', 'PC Components', 'Audio & Headphones'],
    itemCount: 312,
  },
  {
    id: 'vehicles',
    name: 'Cars & Vehicles',
    bnName: 'গাড়ি ও যানবাহন',
    description: 'Sedans, SUVs, luxury motorbikes & electric scooters',
    iconName: 'Car',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    accentColor: 'from-amber-600 to-orange-600',
    subCategories: ['Toyota Sedans', 'SUVs & 4x4', 'Yamaha & Honda Bikes', 'Electric Vehicles', 'Car Parts & Accessories'],
    itemCount: 194,
  },
  {
    id: 'property',
    name: 'Property & Real Estate',
    bnName: 'প্রপার্টি ও রিয়েল এস্টেট',
    description: 'Luxury apartments, duplex villas, office spaces & commercial plots',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    accentColor: 'from-rose-600 to-pink-600',
    subCategories: ['Apartments for Rent', 'Apartments for Sale', 'Commercial Office Space', 'Duplex & Villas', 'Residential Plots'],
    itemCount: 156,
  },
  {
    id: 'fashion',
    name: 'Fashion & Luxury',
    bnName: 'ফ্যাশন ও লাইফস্টাইল',
    description: 'Traditional wear, luxury watches, sneakers & jewelry',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    accentColor: 'from-purple-600 to-violet-600',
    subCategories: ['Luxury Watches', 'Men Panjabi & Suits', 'Designer Sarees', 'Branded Sneakers', 'Leather Bags & Wallets'],
    itemCount: 280,
  },
  {
    id: 'home',
    name: 'Home Living & Furniture',
    bnName: 'হোম ও ফার্নিচার',
    description: 'Solid teak furniture, interior decor, kitchen appliances',
    iconName: 'Sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    accentColor: 'from-yellow-600 to-amber-700',
    subCategories: ['Living Room Sofas', 'Dining Sets', 'Bed & Mattresses', 'Kitchen & Cookware', 'Air Conditioners & Refrigerators'],
    itemCount: 220,
  },
  {
    id: 'pets',
    name: 'Pets & Animals',
    bnName: 'পোষা প্রাণী',
    description: 'Vaccinated Persian cats, purebred dogs, exotic birds & aquariums',
    iconName: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    accentColor: 'from-teal-600 to-cyan-600',
    subCategories: ['Persian Cats & Kittens', 'Puppies & Dogs', 'Exotic Birds & Budgies', 'Aquarium Fishes', 'Pet Food & Accessories'],
    itemCount: 94,
  },
  {
    id: 'services',
    name: 'Local Services & Repair',
    bnName: 'লোকাল সার্ভিসেস',
    description: 'Home repair, electronics servicing, AC maintenance & tutoring',
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    accentColor: 'from-cyan-600 to-blue-700',
    subCategories: ['AC Servicing & Repair', 'Electrical & Plumbing', 'Home Deep Cleaning', 'Electronics Technician', 'IELTS & Tutors'],
    itemCount: 110,
  },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'mob-1',
    categoryId: 'mobiles',
    categoryName: 'Mobiles & Tablets',
    subCategory: 'Apple iPhone',
    title: 'iPhone 15 Pro Max (256GB, Natural Titanium)',
    price: '৳ 1,38,000',
    numericPrice: 138000,
    regularPrice: '৳ 1,55,000',
    savings: '৳ 17,000 (11% OFF)',
    condition: 'Brand New',
    location: 'Gulshan 2, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    postedTime: '2 hours ago',
    viewsCount: 1480,
    rating: 4.9,
    reviewsCount: 142,
    badge: { label: '🔥 Best Seller', className: 'bg-emerald-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=85',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=1000&q=85',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=1000&q=85',
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1000&q=85',
    ],
    description: `Original Apple iPhone 15 Pro Max 256GB in pristine Natural Titanium finish. Factory unlocked, single physical SIM with dual eSIM capability. Includes full retail box, original braided USB-C woven cable, and official warranty card. Battery health is 100%. Tested with 3uTools with a 100% genuine component score.`,
    specs: {
      'Brand': 'Apple',
      'Model': 'iPhone 15 Pro Max',
      'Storage': '256GB',
      'RAM': '8GB unified',
      'Display': '6.7" Super Retina XDR OLED, 120Hz ProMotion',
      'Chipset': 'Apple A17 Pro (3nm)',
      'Color': 'Natural Titanium',
      'Battery Health': '100% (Cycle count: 8)',
      'SIM Status': 'Factory Unlocked (Physical SIM + eSIM)',
      'Warranty': 'Official 1-Year Apple International Warranty',
    },
    features: [
      'Grade A+ Brand New condition with zero scratches',
      'Full original box and accessories matching IMEI',
      'Direct inspection available at our Gulshan store',
      'Express courier delivery across Bangladesh with Cash on Delivery & Escrow',
      '7 Days money-back replacement guarantee',
    ],
    seller: {
      name: 'Gadget Studio BD',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      verified: true,
      memberSince: 'March 2021',
      rating: 4.9,
      reviewsCount: 284,
      responseTime: 'Under 10 mins',
      phone: '+880 1711-987654',
      location: 'Gulshan 2, Dhaka',
      totalAds: 38,
    },
    warranty: 'Official 1-Year Apple Warranty',
    deliveryAvailable: true,
    isHotDeal: true,
    likesCount: 384,
  },
  {
    id: 'mob-2',
    categoryId: 'mobiles',
    categoryName: 'Mobiles & Tablets',
    subCategory: 'Samsung Galaxy',
    title: 'Samsung Galaxy S24 Ultra 5G (12/512GB, Titanium Gray)',
    price: '৳ 1,22,000',
    numericPrice: 122000,
    regularPrice: '৳ 1,35,000',
    savings: '৳ 13,000 (10% OFF)',
    condition: 'Like New',
    location: 'GEC Circle, Chattogram',
    city: 'Chattogram',
    country: 'Bangladesh',
    postedTime: '5 hours ago',
    viewsCount: 960,
    rating: 4.8,
    reviewsCount: 88,
    badge: { label: '⚡ Hot Deal', className: 'bg-amber-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1000&q=85',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1000&q=85',
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1000&q=85',
    ],
    description: `Barely used Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3 chipset and Galaxy AI features. Flawless flat display with anti-reflective glass. Integrated S-Pen included with zero latency. Original 45W fast charger bundled.`,
    specs: {
      'Brand': 'Samsung',
      'Model': 'Galaxy S24 Ultra',
      'Storage': '512GB UFS 4.0',
      'RAM': '12GB LPDDR5X',
      'Camera': '200MP Quad Camera with 5x Optical Zoom',
      'Color': 'Titanium Gray',
      'Condition': 'Like New (Used for only 3 weeks)',
      'Warranty': 'Official Samsung Bangladesh Warranty till Dec 2026',
    },
    features: [
      'Galaxy AI Live Translate & Circle to Search active',
      'Screen protector installed since day 1',
      'Includes Spigen Tough Armor protective case',
      'Cash on Delivery with open-box verification',
    ],
    seller: {
      name: 'Tanvir Ahmed',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      verified: true,
      memberSince: 'January 2022',
      rating: 4.8,
      reviewsCount: 46,
      responseTime: 'Within 15 mins',
      phone: '+880 1819-234567',
      location: 'Chattogram',
      totalAds: 12,
    },
    warranty: '10 Months Brand Warranty Remaining',
    deliveryAvailable: true,
    isHotDeal: true,
    likesCount: 290,
  },
  {
    id: 'elec-1',
    categoryId: 'electronics',
    categoryName: 'Electronics & Computers',
    subCategory: 'Apple MacBooks',
    title: 'Apple MacBook Pro 16" M3 Max (36GB RAM / 1TB SSD)',
    price: '৳ 3,45,000',
    numericPrice: 345000,
    regularPrice: '৳ 3,75,000',
    savings: '৳ 30,000 (8% OFF)',
    condition: 'Brand New',
    location: 'Dhanmondi, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    postedTime: '1 day ago',
    viewsCount: 2150,
    rating: 5.0,
    reviewsCount: 64,
    badge: { label: '👑 Pro Rig', className: 'bg-purple-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&q=85',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000&q=85',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1000&q=85',
    ],
    description: `Powerhouse MacBook Pro 16-inch featuring the high-tier Apple M3 Max processor with 14-core CPU and 30-core GPU. Liquid Retina XDR display with up to 1600 nits peak brightness. Ideal for 8K video editing, AI model fine-tuning, and 3D rendering. Factory sealed in box with 140W USB-C Power Adapter and MagSafe 3 cable.`,
    specs: {
      'Brand': 'Apple',
      'Model': 'MacBook Pro 16-inch',
      'Processor': 'Apple M3 Max (14-core CPU, 30-core GPU)',
      'Memory': '36GB Unified Memory',
      'Storage': '1TB Superfast SSD',
      'Display': '16.2" Liquid Retina XDR (3456 x 2234)',
      'Color': 'Space Black (Anodization Seal against fingerprints)',
      'Battery Life': 'Up to 22 hours',
    },
    features: [
      'Factory sealed brand new unit with Apple care eligibility',
      'Zero throttling under prolonged heavy engineering workloads',
      'Six-speaker sound system with force-cancelling woofers',
      'Complimentary laptop sleeve & MagSafe cable protector',
    ],
    seller: {
      name: 'Mac Store Pro BD',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      verified: true,
      memberSince: 'September 2020',
      rating: 5.0,
      reviewsCount: 310,
      responseTime: 'Under 5 mins',
      phone: '+880 1715-667788',
      location: 'Dhanmondi, Dhaka',
      totalAds: 54,
    },
    warranty: '1 Year Apple Official Warranty',
    deliveryAvailable: true,
    isHotDeal: true,
    likesCount: 512,
  },
  {
    id: 'elec-2',
    categoryId: 'electronics',
    categoryName: 'Electronics & Computers',
    subCategory: 'DSLR & Mirrorless Cameras',
    title: 'Sony Alpha A7 IV Mirrorless Camera (Body + 28-70mm Lens)',
    price: '৳ 2,15,000',
    numericPrice: 215000,
    regularPrice: '৳ 2,35,000',
    savings: '৳ 20,000 (9% OFF)',
    condition: 'Like New',
    location: 'Al Olaya, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    postedTime: '3 hours ago',
    viewsCount: 780,
    rating: 4.9,
    reviewsCount: 52,
    badge: { label: '📷 Cinema Grade', className: 'bg-rose-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?w=1000&q=85',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=85',
    ],
    description: `Full-frame 33MP Exmor R CMOS sensor camera with BIONZ XR processing. Shutter count is only 2,800. Includes Sony FE 28-70mm f/3.5-5.6 OSS lens, two genuine Sony NP-FZ100 batteries, 128GB V90 high-speed SD card, and dual charger.`,
    specs: {
      'Brand': 'Sony',
      'Model': 'Alpha A7 IV (ILCE-7M4)',
      'Sensor': '33 Megapixels 35mm Full-Frame Exmor R CMOS',
      'Video Recording': '4K 60p 10-bit 4:2:2 All-Intra & S-Cinetone',
      'Autofocus': '759 phase-detection points with Real-time Eye AF',
      'Shutter Count': '2,810 cycles',
      'Includes': 'Body, Lens, 2x Batteries, Dual Charger, 128GB V90 Card',
    },
    features: [
      'Pristine condition with sensor completely spotless',
      'Dual card slots supporting CFexpress Type A & UHS-II SD',
      'Direct hand-to-hand delivery in Riyadh or shipping across KSA',
    ],
    seller: {
      name: 'Fahad Al-Otaibi',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80',
      verified: true,
      memberSince: 'June 2022',
      rating: 4.9,
      reviewsCount: 38,
      responseTime: 'Under 20 mins',
      phone: '+966 50 123 4567',
      location: 'Riyadh, Saudi Arabia',
      totalAds: 8,
    },
    warranty: '6 Months Seller Guarantee',
    deliveryAvailable: true,
    likesCount: 210,
  },
  {
    id: 'veh-1',
    categoryId: 'vehicles',
    categoryName: 'Cars & Vehicles',
    subCategory: 'Toyota Sedans',
    title: 'Toyota Camry Hybrid 2023 (LE Edition, Pearl White)',
    price: '৳ 46,50,000',
    numericPrice: 4650000,
    regularPrice: '৳ 49,00,000',
    savings: '৳ 2,50,000 (5% OFF)',
    condition: 'Like New',
    location: 'Banani, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    postedTime: '6 hours ago',
    viewsCount: 3400,
    rating: 5.0,
    reviewsCount: 34,
    badge: { label: '🚗 Verified Inspection', className: 'bg-emerald-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000&q=85',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1000&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=85',
    ],
    description: `Direct import 2023 Toyota Camry Hybrid with auction grade 4.5A. Only 18,500 km driven. Features Toyota Safety Sense 2.5+, lane keep assist, adaptive radar cruise control, and leather seats with dual-zone climate control. Fuel economy exceeds 20 km/liter in city traffic.`,
    specs: {
      'Brand': 'Toyota',
      'Model': 'Camry Hybrid LE',
      'Year': '2023',
      'Mileage': '18,500 km',
      'Transmission': 'e-CVT Automatic',
      'Engine': '2.5L 4-Cylinder Hybrid Synergy Drive',
      'Fuel Type': 'Octane + Hybrid Electric',
      'Auction Grade': '4.5 / 5.0 (Certified)',
    },
    features: [
      '100% accident-free certified by independent third-party automotive inspector',
      'Registration updated till Dec 2026',
      'First party owner with comprehensive insurance',
      'Test drive available at Banani showroom',
    ],
    seller: {
      name: 'Premier Auto Gallery',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
      verified: true,
      memberSince: 'February 2019',
      rating: 5.0,
      reviewsCount: 195,
      responseTime: 'Under 10 mins',
      phone: '+880 1712-334455',
      location: 'Banani, Dhaka',
      totalAds: 42,
    },
    warranty: '3 Years Hybrid Battery Guarantee',
    deliveryAvailable: false,
    likesCount: 640,
  },
  {
    id: 'veh-2',
    categoryId: 'vehicles',
    categoryName: 'Cars & Vehicles',
    subCategory: 'Yamaha & Honda Bikes',
    title: 'Yamaha YZF R15M V4 (Metallic Grey, Quick Shifter)',
    price: '৳ 5,80,000',
    numericPrice: 580000,
    regularPrice: '৳ 6,10,000',
    savings: '৳ 30,000',
    condition: 'Brand New',
    location: 'Mirpur 10, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    postedTime: '12 hours ago',
    viewsCount: 1650,
    rating: 4.8,
    reviewsCount: 78,
    badge: { label: '🏍️ Racing DNA', className: 'bg-blue-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1000&q=85',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1000&q=85',
    ],
    description: `Brand new Yamaha R15M Version 4 with dual-channel ABS, Traction Control System (TCS), Quick Shifter, and upside-down golden USD front forks. Y-Connect Bluetooth smartphone connectivity active. Includes 2 free servicing vouchers from authorized Yamaha dealer.`,
    specs: {
      'Brand': 'Yamaha',
      'Model': 'YZF R15M V4',
      'Engine Displacement': '155cc Liquid-cooled 4-valve VVA',
      'Max Power': '18.4 PS @ 10,000 RPM',
      'Brakes': 'Dual Channel ABS (Front & Rear Disc)',
      'Features': 'Quickshifter + Traction Control + Y-Connect',
      'Color': 'Signature Metallic Grey & Blue',
    },
    features: [
      '0 km showroom condition, ready for 2-year or 10-year BRTA registration',
      'Includes original helmet, toolkit, and bike cover',
      'Bank EMI and installment options available with 0% interest',
    ],
    seller: {
      name: 'Speed Motors BD',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      verified: true,
      memberSince: 'August 2021',
      rating: 4.8,
      reviewsCount: 112,
      responseTime: 'Under 15 mins',
      phone: '+880 1913-778899',
      location: 'Mirpur, Dhaka',
      totalAds: 26,
    },
    warranty: '2 Years Yamaha Official Engine Warranty',
    deliveryAvailable: true,
    likesCount: 420,
  },
  {
    id: 'prop-1',
    categoryId: 'property',
    categoryName: 'Property & Real Estate',
    subCategory: 'Apartments for Sale',
    title: 'Luxury 4BHK South-Facing Apartment in Bashundhara R/A (2,450 Sqft)',
    price: '৳ 2,45,00,000',
    numericPrice: 24500000,
    regularPrice: '৳ 2,65,00,000',
    savings: '৳ 20,00,000 (Special Offer)',
    condition: 'Brand New',
    location: 'Block I, Bashundhara R/A, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    postedTime: '1 day ago',
    viewsCount: 4120,
    rating: 5.0,
    reviewsCount: 22,
    badge: { label: '🏢 Ready Flat', className: 'bg-emerald-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=85',
    ],
    description: `Stunning ready-to-move apartment on the 7th floor of an ultra-modern 10-story building. Fully south-facing with unblocked panoramic views. Features 4 master bedrooms, 4 attached luxury bathrooms with Spanish tiles, modern modular kitchen, servant room with bath, and 2 dedicated parking bays.`,
    specs: {
      'Area': '2,450 Sq. Ft.',
      'Bedrooms': '4 Master Beds',
      'Bathrooms': '5 Baths (4 Attached + 1 Servant)',
      'Floor': '7th Floor (Total 10)',
      'Facing': 'Direct South (Maximum light & ventilation)',
      'Parking': '2 Dedicated Covered Car Parking',
      'Building Features': 'Dual 8-passenger Lifts, 100% Full Power Generator Backup, Rooftop Swimming Pool & Gym',
    },
    features: [
      'Rajuk approved plan with complete legal title deeds verified',
      '24/7 CCTV surveillance and security guards',
      'Ready for immediate utility connections (Titas Gas & DESCO)',
      'Convenient proximity to Apollo/Evercare Hospital and North South University',
    ],
    seller: {
      name: 'Elite Living Properties',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      verified: true,
      memberSince: 'May 2018',
      rating: 5.0,
      reviewsCount: 88,
      responseTime: 'Under 30 mins',
      phone: '+880 1713-445566',
      location: 'Bashundhara, Dhaka',
      totalAds: 19,
    },
    deliveryAvailable: false,
    likesCount: 870,
  },
  {
    id: 'fash-1',
    categoryId: 'fashion',
    categoryName: 'Fashion & Luxury',
    subCategory: 'Luxury Watches',
    title: 'Rolex Submariner Date 41mm (Cerachrom Bezel, Oystersteel)',
    price: '৳ 14,80,000',
    numericPrice: 1480000,
    regularPrice: '৳ 16,00,000',
    savings: '৳ 1,20,000',
    condition: 'Brand New',
    location: 'King Fahd Road, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    postedTime: '4 hours ago',
    viewsCount: 1890,
    rating: 5.0,
    reviewsCount: 45,
    badge: { label: '💎 Certified Authentic', className: 'bg-emerald-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1000&q=85',
    ],
    description: `Brand new in box Rolex Submariner Date reference 126610LN with black dial and Cerachrom unidirectional rotating ceramic bezel. Unworn condition with original protective stickers intact. Full collector set includes green presentation box, warranty card dated 2024, green chronometer seal, and instruction booklets.`,
    specs: {
      'Brand': 'Rolex',
      'Model': 'Submariner Date (126610LN)',
      'Case Size': '41mm Oystersteel',
      'Movement': 'Rolex Calibre 3235 Automatic Chronometer',
      'Power Reserve': '70 Hours',
      'Water Resistance': '300 meters / 1,000 feet',
      'Crystal': 'Scratch-resistant Sapphire with Cyclops date magnifier',
    },
    features: [
      'Certified authentic with matching serial number and NFC warranty card',
      'Rolex 5-year international transferable guarantee active',
      'Secure escrow payment supported with insured courier in Saudi Arabia and worldwide',
    ],
    seller: {
      name: 'Chronos Riyadh Luxury',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      verified: true,
      memberSince: 'October 2019',
      rating: 5.0,
      reviewsCount: 142,
      responseTime: 'Under 10 mins',
      phone: '+966 54 987 6543',
      location: 'Riyadh, Saudi Arabia',
      totalAds: 22,
    },
    warranty: '5-Year Rolex Factory Warranty',
    deliveryAvailable: true,
    likesCount: 950,
  },
  {
    id: 'pet-1',
    categoryId: 'pets',
    categoryName: 'Pets & Animals',
    subCategory: 'Persian Cats & Kittens',
    title: 'Purebred Doll-Face Persian Kitten (3 Months, Triple Coat)',
    price: '৳ 22,000',
    numericPrice: 22000,
    regularPrice: '৳ 26,000',
    savings: '৳ 4,000',
    condition: 'Brand New',
    location: 'Uttara Sector 7, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    postedTime: '8 hours ago',
    viewsCount: 1320,
    rating: 4.9,
    reviewsCount: 56,
    badge: { label: '🐾 Vaccinated', className: 'bg-teal-600 text-white' },
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&q=85',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1000&q=85',
    ],
    description: `Adorable purebred doll-face Persian kitten with silky snow-white triple coat and copper eyes. Very playful, affectionate, and fully litter-box trained. Has received first vaccination shot and deworming. Parents on site for inspection.`,
    specs: {
      'Breed': 'Doll-Face Persian',
      'Age': '3 Months',
      'Coat': 'Triple Snow White',
      'Vaccination': '1st Core Shot Done (Health Card Provided)',
      'Dewormed': 'Yes (Twice)',
      'Diet': 'Royal Canin Mother & Babycat Kibble',
    },
    features: [
      'Includes vaccination book signed by registered veterinarian',
      'Free starter pack: 1kg cat food + feeding bowl + litter scoop',
      'Home delivery available within Dhaka metropolitan city',
    ],
    seller: {
      name: 'Feline Friends BD',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
      verified: true,
      memberSince: 'January 2023',
      rating: 4.9,
      reviewsCount: 74,
      responseTime: 'Under 15 mins',
      phone: '+880 1714-556677',
      location: 'Uttara, Dhaka',
      totalAds: 15,
    },
    deliveryAvailable: true,
    likesCount: 780,
  },
  {
    id: 'home-1',
    categoryId: 'home',
    categoryName: 'Home Living & Furniture',
    subCategory: 'Living Room Sofas',
    title: 'Solid Chittagong Teak (Segun) 6-Seater Luxury Sofa Set (3+2+1)',
    price: '৳ 92,000',
    numericPrice: 92000,
    regularPrice: '৳ 1,10,000',
    savings: '৳ 18,000 (16% OFF)',
    condition: 'Brand New',
    location: 'Panthapath, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    postedTime: '10 hours ago',
    viewsCount: 1140,
    rating: 4.8,
    reviewsCount: 39,
    badge: { label: '🪵 100% Solid Segun', className: 'bg-amber-700 text-white' },
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=85',
    ],
    description: `Crafted from seasoned Chittagong Teak (100% Original Shegun Wood) with hand-carved royal floral motifs. High-density Turkish foam cushions with premium stain-resistant velvet upholstery. Lacquer finish with lifetime anti-termite guarantee.`,
    specs: {
      'Wood Type': '100% Seasoned Chittagong Teak Wood',
      'Configuration': '6 Seater (3 Seater + 2 Seater + 1 Single Armchair + Center Table)',
      'Foam': 'High-Density Orthopedic Foam (10 Year Shape Guarantee)',
      'Fabric': 'Imported Turkish Water-Repellent Velvet',
      'Finish': 'Italian High-Gloss Polyurethane Lacquer',
    },
    features: [
      'Includes matching carved glass-top center tea table',
      '10-year structural termite & wood warranty',
      'Free doorstep delivery and assembly inside Dhaka city',
    ],
    seller: {
      name: 'Heritage Wood Craft',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
      verified: true,
      memberSince: 'March 2020',
      rating: 4.8,
      reviewsCount: 120,
      responseTime: 'Under 20 mins',
      phone: '+880 1817-665544',
      location: 'Panthapath, Dhaka',
      totalAds: 34,
    },
    warranty: '10-Year Wood Warranty',
    deliveryAvailable: true,
    likesCount: 340,
  },
];

// Helper Functions
export function getAllCategories(): CatalogCategory[] {
  return CATALOG_CATEGORIES;
}

export function getAllProducts(): CatalogProduct[] {
  return CATALOG_PRODUCTS;
}

export function getProductById(id: string): CatalogProduct | undefined {
  if (!id) return CATALOG_PRODUCTS[0];
  const cleaned = id.trim().toLowerCase();
  
  // Direct ID match
  const match = CATALOG_PRODUCTS.find((p) => p.id.toLowerCase() === cleaned);
  if (match) return match;

  // Partial match
  if (cleaned.startsWith('mob') || cleaned.startsWith('m') || cleaned.includes('iphone') || cleaned.includes('samsung')) {
    if (cleaned.includes('s24') || cleaned.includes('samsung') || cleaned === 'mob-2' || cleaned === 'm2') {
      return CATALOG_PRODUCTS[1];
    }
    return CATALOG_PRODUCTS[0];
  }
  if (cleaned.startsWith('elec') || cleaned.startsWith('e') || cleaned.includes('mac') || cleaned.includes('dell')) {
    if (cleaned.includes('sony') || cleaned.includes('camera') || cleaned === 'elec-2' || cleaned === 'e2') {
      return CATALOG_PRODUCTS[3];
    }
    return CATALOG_PRODUCTS[2];
  }
  if (cleaned.startsWith('veh') || cleaned.startsWith('v') || cleaned.includes('camry') || cleaned.includes('bike') || cleaned.includes('r15')) {
    if (cleaned.includes('r15') || cleaned.includes('bike') || cleaned === 'veh-2' || cleaned === 'v2') {
      return CATALOG_PRODUCTS[5];
    }
    return CATALOG_PRODUCTS[4];
  }
  if (cleaned.startsWith('prop') || cleaned.startsWith('pr') || cleaned.includes('flat') || cleaned.includes('apartment')) {
    return CATALOG_PRODUCTS[6];
  }
  if (cleaned.startsWith('fash') || cleaned.includes('watch') || cleaned.includes('rolex')) {
    return CATALOG_PRODUCTS[7];
  }
  if (cleaned.startsWith('pet') || cleaned.includes('cat') || cleaned.includes('kitten')) {
    return CATALOG_PRODUCTS[8];
  }
  if (cleaned.startsWith('home') || cleaned.includes('sofa') || cleaned.includes('furniture')) {
    return CATALOG_PRODUCTS[9];
  }

  return CATALOG_PRODUCTS[0];
}

export function getRelatedProducts(categoryId: string, currentProductId: string): CatalogProduct[] {
  const sameCategory = CATALOG_PRODUCTS.filter(
    (p) => p.categoryId === categoryId && p.id !== currentProductId
  );
  if (sameCategory.length >= 3) return sameCategory.slice(0, 4);
  return CATALOG_PRODUCTS.filter((p) => p.id !== currentProductId).slice(0, 4);
}
