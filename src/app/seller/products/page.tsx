"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  QrCode,
  Printer,
  Edit3,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Download,
  LayoutGrid,
  List,
  Sparkles,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Boxes,
  DollarSign,
  Tag,
  Globe2,
  Share2,
  Layers,
  ShoppingBag,
  MoreVertical,
  Minus
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: 'BDT' | 'SAR';
  stock: number;
  sku: string;
  status: 'Active' | 'Low Stock' | 'Out of Stock' | 'Draft';
  image: string;
  market: 'BD' | 'SA' | 'Both';
  sales: number;
  views: number;
  lastUpdated: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'PRD-101',
    name: 'Exclusive Embroidered Cotton Panjabi',
    category: 'Clothing & Fashion',
    price: 1850,
    currency: 'BDT',
    stock: 24,
    sku: 'DV-PANJ-01',
    status: 'Active',
    image: '/assets/products/prod_mens_panjabi.jpg',
    market: 'Both',
    sales: 142,
    views: 1240,
    lastUpdated: '10 mins ago',
  },
  {
    id: 'PRD-102',
    name: 'iPhone 15 Pro Max (256GB Titanium)',
    category: 'Electronics & Mobiles',
    price: 138000,
    currency: 'BDT',
    stock: 3,
    sku: 'DV-IP15-TI',
    status: 'Low Stock',
    image: '/assets/products/prod_iphone15.jpg',
    market: 'Both',
    sales: 28,
    views: 3120,
    lastUpdated: '1 hour ago',
  },
  {
    id: 'PRD-103',
    name: 'Apple MacBook Air M2 (16GB / 512GB)',
    category: 'Laptops & Computers',
    price: 124000,
    currency: 'BDT',
    stock: 0,
    sku: 'DV-MAC-M2',
    status: 'Out of Stock',
    image: '/assets/products/prod_macbook_m2.jpg',
    market: 'BD',
    sales: 19,
    views: 890,
    lastUpdated: 'Yesterday',
  },
  {
    id: 'PRD-104',
    name: 'Yamaha R15 V4 Racing Blue Special',
    category: 'Vehicles & Motors',
    price: 595000,
    currency: 'BDT',
    stock: 2,
    sku: 'DV-YAM-R15',
    status: 'Low Stock',
    image: '/assets/products/prod_yamaha_r15.jpg',
    market: 'BD',
    sales: 5,
    views: 4520,
    lastUpdated: '2 days ago',
  },
  {
    id: 'PRD-105',
    name: 'Luxury 3BHK Apartment - Gulshan 2',
    category: 'Properties & Real Estate',
    price: 38500000,
    currency: 'BDT',
    stock: 1,
    sku: 'DV-GLS-APT',
    status: 'Active',
    image: '/assets/products/prod_3bhk_flat.jpg',
    market: 'Both',
    sales: 0,
    views: 6730,
    lastUpdated: '3 days ago',
  },
  {
    id: 'PRD-106',
    name: 'Toyota Corolla Cross Hybrid 2024',
    category: 'Vehicles & Motors',
    price: 4650000,
    currency: 'BDT',
    stock: 0,
    sku: 'DV-TYT-CRS',
    status: 'Draft',
    image: '/assets/products/prod_toyota_corolla.jpg',
    market: 'SA',
    sales: 0,
    views: 410,
    lastUpdated: '4 days ago',
  },
];

export default function ProductsInventoryPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc'>('newest');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  
  // Modals
  const [barcodeModalProduct, setBarcodeModalProduct] = useState<Product | null>(null);
  const [quickEditProduct, setQuickEditProduct] = useState<Product | null>(null);
  const [viewProductDetails, setViewProductDetails] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter(p => p.status === 'Active').length;
    const lowStock = products.filter(p => p.status === 'Low Stock').length;
    const outOfStock = products.filter(p => p.status === 'Out of Stock').length;
    const drafts = products.filter(p => p.status === 'Draft').length;
    const totalStockCount = products.reduce((acc, p) => acc + p.stock, 0);
    const totalValue = products.reduce((acc, p) => acc + (p.price * (p.stock || 1)), 0);
    return { total, active, lowStock, outOfStock, drafts, totalStockCount, totalValue };
  }, [products]);

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
        const matchesMarket =
          selectedMarket === 'All' || p.market === selectedMarket || p.market === 'Both';
        return matchesSearch && matchesCategory && matchesStatus && matchesMarket;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'stock-asc') return a.stock - b.stock;
        if (sortBy === 'stock-desc') return b.stock - a.stock;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedMarket, sortBy]);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Inline Quick Stock Stepper
  const handleAdjustStock = (id: string, delta: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + delta);
          let newStatus = p.status;
          if (newStock === 0) newStatus = 'Out of Stock';
          else if (newStock <= 3) newStatus = 'Low Stock';
          else if (p.status !== 'Draft') newStatus = 'Active';
          return { ...p, stock: newStock, status: newStatus };
        }
        return p;
      })
    );
    showToast(`Stock updated!`);
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedProductIds.includes(p.id)));
    setSelectedProductIds([]);
    showToast(`${selectedProductIds.length} products deleted`);
  };

  const handleBulkStatusChange = (status: 'Active' | 'Draft') => {
    setProducts(prev =>
      prev.map(p => (selectedProductIds.includes(p.id) ? { ...p, status } : p))
    );
    setSelectedProductIds([]);
    showToast(`${selectedProductIds.length} products set to ${status}`);
  };

  // Single Delete
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
    showToast('Product successfully removed');
  };

  // Quick Edit Save
  const handleSaveQuickEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEditProduct) return;
    setProducts(prev =>
      prev.map(p => (p.id === quickEditProduct.id ? quickEditProduct : p))
    );
    setQuickEditProduct(null);
    showToast('Product details saved!');
  };

  const formatPrice = (val: number, cur: 'BDT' | 'SAR') => {
    return `${cur === 'BDT' ? '৳' : '﷼'} ${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="pb-16 max-w-7xl mx-auto space-y-7 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-[#064e3b] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#D4AF37]/40 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-emerald-950/20 via-emerald-900/10 to-transparent p-6 rounded-3xl border border-emerald-900/20 dark:border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/60 dark:border-emerald-700/50">
              <Boxes className="w-3.5 h-3.5 text-[#00895e] dark:text-emerald-400" />
              Seller Inventory Hub
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Dreamvally BD &amp; SA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            Products &amp; Inventory Management
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Real-time multi-market stock control, automated barcode labels, and instant pricing updates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + 
                ["ID,Name,Category,Price,Stock,Status,SKU"].join(",") + "\n" +
                products.map(p => `"${p.id}","${p.name}","${p.category}","${p.price}","${p.stock}","${p.status}","${p.sku}"`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "dreamvally_inventory.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              showToast("CSV report exported!");
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container font-semibold text-sm transition-all shadow-xs"
          >
            <Download className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <Link
            href="/seller/add-product"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00895e] to-[#064e3b] hover:from-[#00744f] hover:to-[#043e2e] text-white font-bold text-sm transition-all shadow-md shadow-emerald-800/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Products */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden group hover:border-[#00895e]/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Total Products</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00895e] dark:text-emerald-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-foreground">{stats.total}</span>
            <span className="text-xs text-muted-foreground font-medium">({stats.totalStockCount} in stock)</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{stats.active} Active listings ready</span>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Low Stock Alert</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">{stats.lowStock}</span>
            <span className="text-xs text-muted-foreground font-medium">items under 3 units</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-bold">
            <span>Restock required soon</span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden group hover:border-rose-500/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">Out of Stock</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">{stats.outOfStock}</span>
            <span className="text-xs text-muted-foreground font-medium">unavailable for sale</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-rose-700 dark:text-rose-400 font-bold">
            <span>Customers cannot order</span>
          </div>
        </div>

        {/* Total Stock Value */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Inventory Valuation</span>
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-foreground">
              ৳ {stats.totalValue > 1000000 ? `${(stats.totalValue / 100000).toFixed(1)} Lakh` : stats.totalValue.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground font-semibold">
            <span>Dual market estimated value</span>
          </div>
        </div>

      </div>

      {/* Main Inventory Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Status Filter Tabs */}
        <div className="border-b border-outline-variant/70 px-4 sm:px-6 pt-3 flex items-center gap-2 overflow-x-auto scrollbar-none bg-surface-container/30">
          {[
            { id: 'All', label: 'All Products', count: stats.total },
            { id: 'Active', label: 'Active', count: stats.active, color: 'text-emerald-600' },
            { id: 'Low Stock', label: 'Low Stock', count: stats.lowStock, color: 'text-amber-600' },
            { id: 'Out of Stock', label: 'Out of Stock', count: stats.outOfStock, color: 'text-rose-600' },
            { id: 'Draft', label: 'Drafts', count: stats.drafts, color: 'text-gray-500' },
          ].map(tab => {
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`flex items-center gap-2 pb-3 pt-2 px-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#00895e] text-[#00895e] dark:text-emerald-400'
                    : 'border-transparent text-on-surface-variant hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  isActive 
                    ? 'bg-[#00895e]/15 text-[#00895e] dark:text-emerald-300' 
                    : 'bg-surface-variant/80 text-on-surface-variant'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search, Filters & View Switcher */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/70 flex flex-col md:flex-row items-center justify-between gap-3.5 bg-surface-container/20">
          
          {/* Left: Search Box */}
          <div className="flex-1 w-full md:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Product Name, SKU, or Barcode ID..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-[#00895e] placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Controls: Filters, Sort, View Toggle */}
          <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-end">
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00895e]"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            {/* Market Filter */}
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="px-3 py-2 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00895e]"
            >
              <option value="All">All Markets (BD &amp; SA)</option>
              <option value="BD">🇧🇩 Bangladesh</option>
              <option value="SA">🇸🇦 Saudi Arabia</option>
              <option value="Both">🌐 Dual Market</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00895e]"
            >
              <option value="newest">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-asc">Stock: Low to High</option>
              <option value="stock-desc">Stock: High to Low</option>
            </select>

            {/* View Switcher: Table vs Grid */}
            <div className="flex items-center bg-surface-container rounded-xl p-1 border border-outline-variant">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table' ? 'bg-[#00895e] text-white shadow-xs' : 'text-on-surface-variant hover:text-foreground'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-[#00895e] text-white shadow-xs' : 'text-on-surface-variant hover:text-foreground'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Floating Bulk Action Bar (When items selected) */}
        {selectedProductIds.length > 0 && (
          <div className="bg-emerald-900 text-white px-5 py-3 flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                {selectedProductIds.length}
              </span>
              <span className="text-sm font-bold">
                {selectedProductIds.length} items selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkStatusChange('Active')}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs font-bold transition-all"
              >
                Set Active
              </button>
              <button
                onClick={() => handleBulkStatusChange('Draft')}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs font-bold transition-all"
              >
                Set Draft
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedProductIds([])}
                className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content View: Table Mode */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-surface-container/60 border-b border-outline-variant text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded accent-[#00895e] w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Product Info</th>
                  <th className="p-4">SKU / Barcode</th>
                  <th className="p-4">Market</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Level</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50 text-sm">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-on-surface-variant">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="font-bold text-base text-foreground">No products found</p>
                      <p className="text-xs text-muted-foreground mt-1">Try adjusting your search query or status filter.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const isSelected = selectedProductIds.includes(product.id);
                    return (
                      <tr
                        key={product.id}
                        className={`hover:bg-surface-container/40 transition-colors group ${
                          isSelected ? 'bg-emerald-500/5' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(product.id)}
                            className="rounded accent-[#00895e] w-4 h-4 cursor-pointer"
                          />
                        </td>

                        {/* Product Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/60 shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                onError={(e: any) => {
                                  e.currentTarget.src = '/assets/categories/cat_electronics.jpg';
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-foreground text-sm leading-snug line-clamp-1 group-hover:text-[#00895e] transition-colors">
                                {product.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] font-semibold text-muted-foreground bg-surface-container px-2 py-0.5 rounded-md">
                                  {product.category}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                  {product.views} views • {product.sales} sold
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* SKU / Barcode */}
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <span className="font-mono text-xs font-bold text-foreground bg-surface-variant/40 px-2 py-0.5 rounded">
                              {product.sku}
                            </span>
                            <p className="text-[10px] text-muted-foreground font-mono">{product.id}</p>
                          </div>
                        </td>

                        {/* Market Badge */}
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            product.market === 'Both'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300/60'
                              : product.market === 'BD'
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300/60'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300/60'
                          }`}>
                            {product.market === 'Both' ? '🌐 Dual (BD+SA)' : product.market === 'BD' ? '🇧🇩 Bangladesh' : '🇸🇦 Saudi'}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="p-4 font-black text-foreground">
                          {formatPrice(product.price, product.currency)}
                        </td>

                        {/* Stock with Stepper (+ / -) */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
                              <button
                                onClick={() => handleAdjustStock(product.id, -1)}
                                className="p-1 hover:bg-surface-container text-muted-foreground hover:text-foreground rounded-l"
                                title="Decrease Stock"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className={`px-2.5 py-0.5 font-bold text-xs min-w-[32px] text-center ${
                                product.stock === 0 ? 'text-rose-600' : product.stock <= 3 ? 'text-amber-600' : 'text-foreground'
                              }`}>
                                {product.stock}
                              </span>
                              <button
                                onClick={() => handleAdjustStock(product.id, 1)}
                                className="p-1 hover:bg-surface-container text-muted-foreground hover:text-foreground rounded-r"
                                title="Increase Stock"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                            product.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                              : product.status === 'Low Stock'
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
                              : product.status === 'Out of Stock'
                              ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
                              : 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              product.status === 'Active' ? 'bg-emerald-500 animate-pulse' :
                              product.status === 'Low Stock' ? 'bg-amber-500' :
                              product.status === 'Out of Stock' ? 'bg-rose-500' : 'bg-gray-400'
                            }`} />
                            {product.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setViewProductDetails(product)}
                              className="p-2 text-on-surface-variant hover:text-[#00895e] hover:bg-surface-container rounded-lg transition-colors"
                              title="Quick Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setBarcodeModalProduct(product)}
                              className="p-2 text-on-surface-variant hover:text-[#00895e] hover:bg-surface-container rounded-lg transition-colors"
                              title="Barcode &amp; QR Label"
                            >
                              <QrCode className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setQuickEditProduct(product)}
                              className="p-2 text-on-surface-variant hover:text-[#00895e] hover:bg-surface-container rounded-lg transition-colors"
                              title="Quick Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(product.id)}
                              className="p-2 text-on-surface-variant hover:text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid Card View */
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-surface border border-outline-variant/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col group"
              >
                <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black border backdrop-blur-md ${
                      product.status === 'Active' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' :
                      product.status === 'Low Stock' ? 'bg-amber-950/80 text-amber-300 border-amber-500/50' :
                      product.status === 'Out of Stock' ? 'bg-rose-950/80 text-rose-300 border-rose-500/50' :
                      'bg-gray-900/80 text-gray-300 border-gray-600'
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md">
                      {product.market === 'Both' ? '🌐 Dual' : product.market}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground">{product.category}</span>
                    <h3 className="font-bold text-foreground text-sm line-clamp-1 mt-0.5">{product.name}</h3>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">SKU: {product.sku}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/50">
                    <span className="text-base font-black text-foreground">{formatPrice(product.price, product.currency)}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">Stock:</span>
                      <span className={`font-black text-xs ${product.stock === 0 ? 'text-rose-500' : 'text-foreground'}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setBarcodeModalProduct(product)}
                      className="flex-1 py-2 rounded-xl border border-outline-variant hover:bg-surface-container text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" /> Barcode
                    </button>
                    <button
                      onClick={() => setQuickEditProduct(product)}
                      className="flex-1 py-2 rounded-xl bg-[#00895e] text-white hover:bg-[#00744f] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(product.id)}
                      className="p-2 rounded-xl border border-outline-variant hover:bg-rose-500/10 text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination & Status Footer */}
        <div className="p-4 border-t border-outline-variant/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant bg-surface-container/30">
          <div>
            Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> of{' '}
            <span className="font-bold text-foreground">{products.length}</span> products
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant disabled:opacity-50 hover:bg-surface font-semibold">
              Previous
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[#00895e] text-white font-bold">1</span>
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant disabled:opacity-50 hover:bg-surface font-semibold">
              Next
            </button>
          </div>
        </div>

      </div>

      {/* ================= MODALS ================= */}

      {/* 1. Barcode & QR Label Modal */}
      {barcodeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container/50">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#00895e]" />
                <h3 className="font-bold text-base text-foreground">Print Barcode &amp; Label</h3>
              </div>
              <button
                onClick={() => setBarcodeModalProduct(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center">
              {/* Printable Sticker Label Card */}
              <div id="printable-label" className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-md text-black flex flex-col items-center w-full max-w-xs text-center space-y-3">
                <div className="border-b border-gray-200 pb-2 w-full">
                  <p className="text-[10px] tracking-widest font-black uppercase text-emerald-800">DREAMVALLY MARKETPLACE</p>
                  <p className="text-xs font-bold text-gray-900 truncate max-w-[240px] mx-auto mt-0.5">{barcodeModalProduct.name}</p>
                </div>

                {/* Simulated High-Res Code-128 Barcode */}
                <div className="py-2 flex flex-col items-center">
                  <div className="flex h-14 w-56 items-stretch justify-center gap-[2.5px] px-1 bg-white">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-black ${
                          i % 5 === 0 ? 'w-[4px]' : i % 3 === 0 ? 'w-[2.5px]' : 'w-[1.5px]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-mono text-xs font-black tracking-[0.25em] text-gray-900 mt-1.5">
                    {barcodeModalProduct.sku}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200 w-full flex items-center justify-between px-2">
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Price</p>
                    <p className="text-sm font-black text-emerald-800">
                      {formatPrice(barcodeModalProduct.price, barcodeModalProduct.currency)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Market</p>
                    <p className="text-xs font-black text-gray-800">
                      {barcodeModalProduct.market === 'Both' ? 'BD & SA' : barcodeModalProduct.market}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Standard 50mm x 30mm thermal sticker label format. Compatible with Zebra &amp; Xprinter barcode printers.
              </p>

              <div className="w-full flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setBarcodeModalProduct(null)}
                  className="flex-1 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold hover:bg-surface-container"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setBarcodeModalProduct(null);
                    showToast('Label sent to printer!');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#00895e] text-white font-bold text-sm hover:bg-[#00744f] flex items-center justify-center gap-2 shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  Print Label
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Quick Edit Modal */}
      {quickEditProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container/50">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#00895e]" />
                <h3 className="font-bold text-base text-foreground">Quick Edit Product</h3>
              </div>
              <button
                onClick={() => setQuickEditProduct(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuickEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">Product Title</label>
                <input
                  type="text"
                  value={quickEditProduct.name}
                  onChange={(e) => setQuickEditProduct({ ...quickEditProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">Category</label>
                  <select
                    value={quickEditProduct.category}
                    onChange={(e) => setQuickEditProduct({ ...quickEditProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                  >
                    <option value="Clothing & Fashion">Clothing &amp; Fashion</option>
                    <option value="Electronics & Mobiles">Electronics &amp; Mobiles</option>
                    <option value="Laptops & Computers">Laptops &amp; Computers</option>
                    <option value="Vehicles & Motors">Vehicles &amp; Motors</option>
                    <option value="Properties & Real Estate">Properties &amp; Real Estate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">Market</label>
                  <select
                    value={quickEditProduct.market}
                    onChange={(e) => setQuickEditProduct({ ...quickEditProduct, market: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                  >
                    <option value="Both">🌐 Dual (BD &amp; SA)</option>
                    <option value="BD">🇧🇩 Bangladesh</option>
                    <option value="SA">🇸🇦 Saudi Arabia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">Price ({quickEditProduct.currency})</label>
                  <input
                    type="number"
                    value={quickEditProduct.price}
                    onChange={(e) => setQuickEditProduct({ ...quickEditProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">Stock Count</label>
                  <input
                    type="number"
                    value={quickEditProduct.stock}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      let st = quickEditProduct.status;
                      if (count === 0) st = 'Out of Stock';
                      else if (count <= 3) st = 'Low Stock';
                      else if (st !== 'Draft') st = 'Active';
                      setQuickEditProduct({ ...quickEditProduct, stock: count, status: st });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">SKU Code</label>
                  <input
                    type="text"
                    value={quickEditProduct.sku}
                    onChange={(e) => setQuickEditProduct({ ...quickEditProduct, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">Status</label>
                  <select
                    value={quickEditProduct.status}
                    onChange={(e) => setQuickEditProduct({ ...quickEditProduct, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                  >
                    <option value="Active">Active</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setQuickEditProduct(null)}
                  className="flex-1 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00895e] text-white font-bold text-sm hover:bg-[#00744f] shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Quick View Drawer / Modal */}
      {viewProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-56 w-full bg-surface-container">
              <Image
                src={viewProductDetails.image}
                alt={viewProductDetails.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setViewProductDetails(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  {viewProductDetails.category}
                </span>
                <h2 className="text-xl font-bold text-foreground mt-2">{viewProductDetails.name}</h2>
                <p className="font-mono text-xs text-muted-foreground mt-1">ID: {viewProductDetails.id} | SKU: {viewProductDetails.sku}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-surface-container/60 border border-outline-variant/60 text-center">
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold">Price</p>
                  <p className="text-base font-black text-foreground mt-0.5">{formatPrice(viewProductDetails.price, viewProductDetails.currency)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold">Stock</p>
                  <p className="text-base font-black text-foreground mt-0.5">{viewProductDetails.stock}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold">Total Views</p>
                  <p className="text-base font-black text-foreground mt-0.5">{viewProductDetails.views}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    const prod = viewProductDetails;
                    setViewProductDetails(null);
                    setQuickEditProduct(prod);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#00895e] text-white font-bold text-sm hover:bg-[#00744f]"
                >
                  Edit Product
                </button>
                <button
                  onClick={() => setViewProductDetails(null)}
                  className="py-2.5 px-5 rounded-xl border border-outline-variant font-semibold text-sm hover:bg-surface-container"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Delete Listing?</h3>
              <p className="text-xs text-muted-foreground mt-1.5">
                This item will be removed from your catalog and will no longer appear on Dreamvally marketplace.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
