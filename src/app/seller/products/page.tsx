"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  QrCode,
  Printer,
  Edit3,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Download,
  LayoutGrid,
  List,
  X,
  DollarSign,
  Loader2
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

export default function ProductsInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
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
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ---- Load own listings from database ----
  const mapListing = (l: {
    id: string;
    title: string;
    price: number | string;
    stock: number;
    sku?: string | null;
    status: string;
    targetMarket: string;
    currency?: string;
    viewsCount: number;
    createdAt: string;
    images?: { url: string }[];
    category?: { name?: string } | null;
  }): Product => ({
    id: l.id,
    name: l.title,
    category: l.category?.name || 'Uncategorized',
    price: Number(l.price),
    currency: l.currency === 'SAR' ? 'SAR' : 'BDT',
    stock: l.stock,
    sku: l.sku || '—',
    status:
      l.status === 'DRAFT'
        ? 'Draft'
        : l.status === 'ARCHIVED'
        ? 'Draft'
        : l.stock === 0
        ? 'Out of Stock'
        : l.stock <= 5
        ? 'Low Stock'
        : 'Active',
    image: l.images?.[0]?.url || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image',
    market: l.targetMarket === 'BOTH' ? 'Both' : l.targetMarket === 'SA' ? 'SA' : 'BD',
    sales: 0,
    views: l.viewsCount,
    lastUpdated: timeAgo(new Date(l.createdAt)),
  });

  const timeAgo = (d: Date) => {
    const mins = Math.floor((Date.now() - d.getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return d.toLocaleDateString();
  };

  const loadProducts = () => {
    fetch('/api/listings?mine=true')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const data = Array.isArray(json.data) ? json.data : [];
        setProducts(data.map(mapListing));
      })
      .catch(() => setLoadError('Could not load products from database'))
      .finally(() => setLoading(false));
  };

  const retryLoad = () => {
    setLoading(true);
    setLoadError('');
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleToggleSelectOne = (id: string) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Bulk actions (persisted to DB)
  const statusToApi = (s: Product['status']): string =>
    s === 'Draft' ? 'DRAFT' : 'ACTIVE';

  const patchListing = async (id: string, payload: Record<string, unknown>) => {
    const res = await fetch(`/api/listings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || 'Update failed');
    }
    return res.json();
  };

  const handleBulkStatusChange = async (newStatus: Product['status']) => {
    const ids = [...selectedProductIds];
    try {
      for (const id of ids) {
        await patchListing(id, { status: statusToApi(newStatus) });
      }
      setProducts(prev =>
        prev.map(p => (ids.includes(p.id) ? { ...p, status: newStatus } : p))
      );
      showToast(`Updated ${ids.length} products to "${newStatus}"`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Bulk update failed');
    }
    setSelectedProductIds([]);
  };

  const handleBulkDelete = async () => {
    const ids = [...selectedProductIds];
    try {
      for (const id of ids) {
        await patchListing(id, { status: 'ARCHIVED' });
      }
      setProducts(prev => prev.filter(p => !ids.includes(p.id)));
      showToast(`Archived ${ids.length} items from inventory`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Bulk archive failed');
    }
    setSelectedProductIds([]);
  };

  // Single Delete → archive in DB (keeps order history intact)
  const handleDeleteProduct = async (id: string) => {
    try {
      await patchListing(id, { status: 'ARCHIVED' });
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirmId(null);
      showToast('Product removed from inventory');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  // Quick Edit Save → PATCH to database
  const handleSaveQuickEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEditProduct) return;
    try {
      await patchListing(quickEditProduct.id, {
        title: quickEditProduct.name,
        price: quickEditProduct.price,
        stock: quickEditProduct.stock,
        status: statusToApi(quickEditProduct.status),
        targetMarket: quickEditProduct.market,
      });
      setProducts(prev =>
        prev.map(p => (p.id === quickEditProduct.id ? quickEditProduct : p))
      );
      setQuickEditProduct(null);
      showToast('Product details saved to database!');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const formatPrice = (val: number, cur: 'BDT' | 'SAR') => {
    return `${cur === 'BDT' ? '৳' : 'SAR'} ${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="pb-12 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-950 text-white px-4 py-2.5 rounded-lg shadow-xl border border-emerald-500/30 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Compact Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Products & Inventory
            </h1>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {products.length} Products
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your catalog, multi-market stock levels, and instant pricing updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
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
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 hover:bg-muted font-medium text-xs transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </button>

          <Link
            href="/seller/add-product"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Compact Stat Summary Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-card border border-border/60 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Total Products</span>
            <span className="text-lg font-bold text-foreground mt-0.5 block">{stats.total}</span>
            <span className="text-[11px] text-muted-foreground">{stats.totalStockCount} units in stock</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Low Stock</span>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5 block">{stats.lowStock}</span>
            <span className="text-[11px] text-muted-foreground">Under 3 units left</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Out of Stock</span>
            <span className="text-lg font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">{stats.outOfStock}</span>
            <span className="text-[11px] text-muted-foreground">Unavailable to buyers</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <XCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Inventory Value</span>
            <span className="text-lg font-bold text-foreground mt-0.5 block">৳ {Math.round(stats.totalValue / 1000)}k+</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{stats.active} Active listings</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Main Product Table & Filter Card */}
      <div className="bg-card border border-border/60 rounded-xl shadow-xs overflow-hidden">
        
        {/* Status Filter Tabs */}
        <div className="border-b border-border/60 px-4 pt-1 flex items-center gap-1 overflow-x-auto scrollbar-none bg-muted/20">
          {[
            { id: 'All', label: 'All Products', count: stats.total },
            { id: 'Active', label: 'Active', count: stats.active },
            { id: 'Low Stock', label: 'Low Stock', count: stats.lowStock },
            { id: 'Out of Stock', label: 'Out of Stock', count: stats.outOfStock },
            { id: 'Draft', label: 'Drafts', count: stats.drafts },
          ].map(tab => {
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`flex items-center gap-1.5 pb-2.5 pt-2 px-3 border-b-2 font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive 
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search, Filters & View Switcher */}
        <div className="p-3 border-b border-border/60 flex flex-col md:flex-row items-center justify-between gap-2.5 bg-muted/10">
          
          {/* Search Box */}
          <div className="flex-1 w-full md:max-w-md relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Product Name, SKU, or ID..."
              className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-border/70 bg-background text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Controls: Category, Market, Sort, View Toggle */}
          <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Markets</option>
              <option value="BD">BD (Bangladesh)</option>
              <option value="SA">SA (Saudi Arabia)</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc')}
              className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-asc">Stock: Low to High</option>
              <option value="stock-desc">Stock: High to Low</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-border/70 p-0.5 bg-background">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1 rounded-md transition-colors ${viewMode === 'table' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedProductIds.length > 0 && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-xs animate-in fade-in">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {selectedProductIds.length} item(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkStatusChange('Active')}
                className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 text-xs transition-colors"
              >
                Set Active
              </button>
              <button
                onClick={() => handleBulkStatusChange('Draft')}
                className="px-2.5 py-1 rounded-md bg-muted text-foreground font-medium hover:bg-muted/80 text-xs transition-colors"
              >
                Set Draft
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-medium hover:bg-rose-700 text-xs transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Loading / Error state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">Loading products from database...</p>
          </div>
        )}
        {!loading && loadError && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <p className="text-xs text-muted-foreground">{loadError}</p>
            <button onClick={retryLoad} className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700">
              Retry
            </button>
          </div>
        )}

        {/* View Mode: Table */}
        {!loading && !loadError && (viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Market</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-muted-foreground">
                      <Package className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
                      <p className="font-semibold text-sm text-foreground">No products found</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Try adjusting your filters or search keywords.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const isSelected = selectedProductIds.includes(p.id);
                    return (
                      <tr key={p.id} className={`hover:bg-muted/30 transition-colors ${isSelected ? 'bg-muted/20' : ''}`}>
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectOne(p.id)}
                            className="rounded border-border"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border/60 bg-muted shrink-0">
                              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-semibold text-foreground truncate block max-w-xs">{p.name}</span>
                              <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                                <span className="font-mono">{p.sku}</span>
                                <span>•</span>
                                <span>{p.sales} sales</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">{p.category}</td>
                        <td className="p-3 font-semibold text-foreground">{formatPrice(p.price, p.currency)}</td>
                        <td className="p-3">
                          <span className={`font-semibold ${p.stock === 0 ? 'text-rose-600' : p.stock <= 3 ? 'text-amber-600' : 'text-foreground'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : p.status === 'Low Stock'
                              ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                              : p.status === 'Out of Stock'
                              ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                              : 'bg-muted text-muted-foreground border border-border'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-[11px] font-medium text-muted-foreground">
                            {p.market === 'Both' ? 'BD & SA' : p.market === 'BD' ? 'Bangladesh' : 'Saudi Arabia'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setBarcodeModalProduct(p)}
                              title="Print Barcode"
                              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setQuickEditProduct(p)}
                              title="Quick Edit"
                              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(p.id)}
                              title="Delete Product"
                              className="p-1.5 text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 rounded-md transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
          /* View Mode: Grid */
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-card border border-border/60 rounded-xl p-3 space-y-2.5 hover:border-border transition-colors">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    p.status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-black/60 text-white'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-foreground truncate">{p.name}</h3>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatPrice(p.price, p.currency)}</span>
                    <span className="text-[11px] text-muted-foreground">{p.stock} in stock</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                  <span className="text-[11px] font-mono text-muted-foreground">{p.sku}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setBarcodeModalProduct(p)}
                      className="p-1 text-muted-foreground hover:text-foreground"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setQuickEditProduct(p)}
                      className="p-1 text-muted-foreground hover:text-foreground"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-1 text-muted-foreground hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Barcode Modal */}
      {barcodeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-card border border-border/60 rounded-xl p-5 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <h3 className="font-bold text-sm text-foreground">Thermal Barcode Tag</h3>
              <button onClick={() => setBarcodeModalProduct(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="border border-border/80 rounded-lg p-4 bg-white text-black text-center font-mono space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Dreamvally Logistics</div>
              <div className="font-bold text-xs truncate">{barcodeModalProduct.name}</div>
              <div className="text-lg font-black tracking-widest bg-gray-100 py-3 rounded">
                ||| | |||| | ||||| ||||
              </div>
              <div className="text-xs font-bold">{barcodeModalProduct.sku}</div>
              <div className="text-xs text-gray-700 font-bold">{formatPrice(barcodeModalProduct.price, barcodeModalProduct.currency)}</div>
            </div>
            <button
              onClick={() => {
                showToast("Barcode printed to thermal queue");
                setBarcodeModalProduct(null);
              }}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Label</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Edit Modal */}
      {quickEditProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <form onSubmit={handleSaveQuickEdit} className="bg-card border border-border/60 rounded-xl p-5 max-w-md w-full space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <h3 className="font-bold text-sm text-foreground">Quick Edit Product</h3>
              <button type="button" onClick={() => setQuickEditProduct(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Product Title</label>
              <input
                type="text"
                value={quickEditProduct.name}
                onChange={(e) => setQuickEditProduct({ ...quickEditProduct, name: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Price</label>
                <input
                  type="number"
                  value={quickEditProduct.price}
                  onChange={(e) => setQuickEditProduct({ ...quickEditProduct, price: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Stock Units</label>
                <input
                  type="number"
                  value={quickEditProduct.stock}
                  onChange={(e) => setQuickEditProduct({ ...quickEditProduct, stock: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Status</label>
                <select
                  value={quickEditProduct.status}
                  onChange={(e) => setQuickEditProduct({ ...quickEditProduct, status: e.target.value as Product['status'] })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs"
                >
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Target Market</label>
                <select
                  value={quickEditProduct.market}
                  onChange={(e) => setQuickEditProduct({ ...quickEditProduct, market: e.target.value as Product['market'] })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs"
                >
                  <option value="Both">Both (BD & SA)</option>
                  <option value="BD">Bangladesh</option>
                  <option value="SA">Saudi Arabia</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
              <button
                type="button"
                onClick={() => setQuickEditProduct(null)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-card border border-border/60 rounded-xl p-5 max-w-sm w-full space-y-3.5 shadow-xl text-center">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Remove from Inventory?</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Are you sure you want to delete this listing? Buyers won&apos;t be able to view or purchase this item.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium"
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
