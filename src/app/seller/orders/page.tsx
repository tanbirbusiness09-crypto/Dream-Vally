"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ChevronRight,
  MapPin,
  Phone,
  Copy,
  Check,
  FileText,
  X,
  CreditCard,
  QrCode,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  market: 'BD' | 'SA';
  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  currency: 'BDT' | 'SAR';
  paymentMethod: 'bKash' | 'Nagad' | 'Mada' | 'Visa' | 'Cash on Delivery';
  paymentStatus: 'Paid (Escrow)' | 'Paid (Online)' | 'Unpaid (COD)';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  courier?: string;
  createdAt: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerName: 'Kamrul Hasan',
    phone: '+880 1711-234567',
    address: 'House 42, Road 11, Dhanmondi',
    city: 'Dhaka',
    market: 'BD',
    items: [
      {
        name: 'Exclusive Silk Embroidered Panjabi',
        image: '/assets/products/prod_mens_panjabi.jpg',
        quantity: 1,
        price: 3700,
      },
    ],
    totalAmount: 3760,
    currency: 'BDT',
    paymentMethod: 'bKash',
    paymentStatus: 'Paid (Escrow)',
    status: 'Pending',
    createdAt: 'Today, 10:23 AM',
  },
  {
    id: 'ORD-9820',
    customerName: 'Sultan Al-Otaibi',
    phone: '+966 50 123 4567',
    address: 'King Fahd Rd, Al Olaya',
    city: 'Riyadh',
    market: 'SA',
    items: [
      {
        name: 'iPhone 15 Pro Max (Titanium 256GB)',
        image: '/assets/products/prod_iphone15.jpg',
        quantity: 1,
        price: 4450,
      },
    ],
    totalAmount: 4475,
    currency: 'SAR',
    paymentMethod: 'Mada',
    paymentStatus: 'Paid (Online)',
    status: 'Processing',
    courier: 'SMSA Express',
    trackingNumber: 'SMSA-9820-KSA',
    createdAt: 'Today, 08:15 AM',
  },
  {
    id: 'ORD-9819',
    customerName: 'Tanvir Ahmed',
    phone: '+880 1819-876543',
    address: 'Agrabad Commercial Area',
    city: 'Chittagong',
    market: 'BD',
    items: [
      {
        name: 'Yamaha R15 V4 Carbon Parts',
        image: '/assets/products/prod_yamaha_r15.jpg',
        quantity: 2,
        price: 4250,
      },
    ],
    totalAmount: 8600,
    currency: 'BDT',
    paymentMethod: 'Nagad',
    paymentStatus: 'Paid (Escrow)',
    status: 'Shipped',
    courier: 'Steadfast Courier',
    trackingNumber: 'STDF-883192',
    createdAt: 'Yesterday, 04:30 PM',
  },
  {
    id: 'ORD-9818',
    customerName: 'Farhan Kabir',
    phone: '+880 1912-345678',
    address: 'Sector 3, Uttara',
    city: 'Dhaka',
    market: 'BD',
    items: [
      {
        name: 'Premium Leather Executive Wallet',
        image: '/assets/products/prod_mens_panjabi.jpg',
        quantity: 1,
        price: 1450,
      },
    ],
    totalAmount: 1510,
    currency: 'BDT',
    paymentMethod: 'Visa',
    paymentStatus: 'Paid (Online)',
    status: 'Delivered',
    courier: 'Pathao Courier',
    trackingNumber: 'PTH-092144',
    createdAt: 'Oct 22, 2026',
  },
  {
    id: 'ORD-9817',
    customerName: 'Mehedi Hasan',
    phone: '+880 1611-998877',
    address: 'Chawkbazar, Kotwali',
    city: 'Chittagong',
    market: 'BD',
    items: [
      {
        name: 'Summer Casual T-Shirt Combo',
        image: '/assets/products/prod_mens_panjabi.jpg',
        quantity: 1,
        price: 650,
      },
    ],
    totalAmount: 710,
    currency: 'BDT',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Unpaid (COD)',
    status: 'Cancelled',
    createdAt: 'Oct 20, 2026',
  },
];

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  // Tab Counts
  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === 'Pending').length,
      processing: orders.filter((o) => o.status === 'Processing').length,
      shipped: orders.filter((o) => o.status === 'Shipped').length,
      delivered: orders.filter((o) => o.status === 'Delivered').length,
      cancelled: orders.filter((o) => o.status === 'Cancelled').length,
    };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = activeTab === 'All' || order.status === activeTab;
      const matchesMarket = selectedMarket === 'All' || order.market === selectedMarket;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.phone.toLowerCase().includes(q) ||
        order.items.some((item) => item.name.toLowerCase().includes(q));
      return matchesTab && matchesMarket && matchesSearch;
    });
  }, [orders, activeTab, selectedMarket, searchQuery]);

  // Update Status
  const handleUpdateStatus = (id: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const copyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhoneId(id);
    setTimeout(() => setCopiedPhoneId(null), 2000);
  };

  return (
    <div className="pb-16 max-w-7xl mx-auto space-y-7 animate-in fade-in duration-300">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-950/20 via-indigo-900/10 to-transparent p-6 sm:p-7 rounded-3xl border border-blue-900/20 dark:border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-300/60 dark:border-blue-700/50">
              <ShoppingBag className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Order Pipeline &amp; Logistics
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Dual Market Fulfillment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Customer Orders Management
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Track customer orders, generate thermal packing slips, and update courier tracking codes.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => {
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                ['OrderID,Customer,Phone,City,Total,Status,PaymentMethod'].join(',') +
                '\n' +
                orders
                  .map(
                    (o) =>
                      `"${o.id}","${o.customerName}","${o.phone}","${o.city}","${o.totalAmount}","${o.status}","${o.paymentMethod}"`
                  )
                  .join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', 'dreamvally_orders.csv');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Main Order Table Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Status Pipeline Tabs */}
        <div className="border-b border-outline-variant/70 px-4 sm:px-6 pt-3 flex items-center gap-2 overflow-x-auto scrollbar-none bg-surface-container/30">
          {[
            { id: 'All', label: 'All Orders', count: counts.all },
            { id: 'Pending', label: 'Pending', count: counts.pending, color: 'text-amber-600' },
            { id: 'Processing', label: 'Processing', count: counts.processing, color: 'text-blue-600' },
            { id: 'Shipped', label: 'Shipped', count: counts.shipped, color: 'text-purple-600' },
            { id: 'Delivered', label: 'Delivered', count: counts.delivered, color: 'text-emerald-600' },
            { id: 'Cancelled', label: 'Cancelled', count: counts.cancelled, color: 'text-rose-600' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 pt-2 px-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#00895e] text-[#00895e] dark:text-emerald-400'
                    : 'border-transparent text-on-surface-variant hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-black ${
                    isActive
                      ? 'bg-[#00895e]/15 text-[#00895e] dark:text-emerald-300'
                      : 'bg-surface-variant/80 text-on-surface-variant'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search & Market Filter */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/70 flex flex-col md:flex-row items-center justify-between gap-3.5 bg-surface-container/20">
          <div className="flex-1 w-full md:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, Customer name, Phone, or Item..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-[#00895e] placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00895e]"
            >
              <option value="All">All Markets (BD &amp; SA)</option>
              <option value="BD">🇧🇩 Bangladesh Orders</option>
              <option value="SA">🇸🇦 Saudi Arabia Orders</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-surface-container/60 border-b border-outline-variant text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">
                <th className="p-4">Order Details</th>
                <th className="p-4">Customer &amp; Location</th>
                <th className="p-4">Items Summary</th>
                <th className="p-4">Amount &amp; Method</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50 text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground">
                    <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="font-bold text-base text-foreground">No orders found</p>
                    <p className="text-xs text-muted-foreground mt-1">Try switching tabs or resetting your search filter.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container/40 transition-colors group">
                    
                    {/* Order Details */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-black text-foreground bg-surface-variant/40 px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {order.createdAt}
                        </p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.market === 'BD' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                        }`}>
                          {order.market === 'BD' ? '🇧🇩 BD' : '🇸🇦 SA'}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="font-bold text-foreground text-sm">{order.customerName}</p>
                        <button
                          onClick={() => copyPhone(order.id, order.phone)}
                          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-[#00895e] font-mono transition-colors"
                          title="Click to copy phone"
                        >
                          <Phone className="w-3 h-3 text-[#00895e]" />
                          <span>{order.phone}</span>
                          {copiedPhoneId === order.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-2.5 h-2.5 opacity-50" />
                          )}
                        </button>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[200px]" title={order.address}>
                          <MapPin className="w-3 h-3 inline mr-1 text-muted-foreground" />
                          {order.address}, {order.city}
                        </p>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="p-4">
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-variant/50">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate max-w-[180px]">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount & Method */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="font-black text-foreground text-base">
                          {order.currency === 'BDT' ? '৳' : '﷼'} {order.totalAmount.toLocaleString()}
                        </p>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container text-foreground border border-outline-variant">
                          {order.paymentMethod}
                        </span>
                        <p className="text-[10px] text-emerald-600 font-bold">{order.paymentStatus}</p>
                      </div>
                    </td>

                    {/* Status Stepper Select */}
                    <td className="p-4">
                      <div className="space-y-1.5">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                          className={`text-xs font-bold rounded-xl px-3 py-1.5 border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00895e] transition-all ${
                            order.status === 'Pending' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30' :
                            order.status === 'Processing' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30' :
                            order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30' :
                            order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' :
                            'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
                          }`}
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="Processing">⚙️ Processing</option>
                          <option value="Shipped">🚚 Shipped</option>
                          <option value="Delivered">✅ Delivered</option>
                          <option value="Cancelled">❌ Cancelled</option>
                        </select>
                        {order.trackingNumber && (
                          <p className="font-mono text-[10px] text-muted-foreground truncate max-w-[140px]" title={order.trackingNumber}>
                            Trk: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-outline-variant hover:bg-surface-container text-xs font-bold text-foreground transition-all"
                          title="Print Packing Slip / Invoice"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#00895e]" />
                          <span>Slip</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant/70 flex items-center justify-between text-xs text-muted-foreground bg-surface-container/30">
          <span>Showing {filteredOrders.length} of {orders.length} orders</span>
          <span className="font-semibold">Dreamvally Logistics Escrow Protected</span>
        </div>

      </div>

      {/* 3. Printable Invoice / Packing Slip Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-gray-900 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 border border-gray-300">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-emerald-900 tracking-tight">DREAMVALLY MARKETPLACE</h2>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Commercial Delivery Packing Slip</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-base font-black text-gray-900">{selectedInvoiceOrder.id}</span>
                <p className="text-xs text-gray-500">{selectedInvoiceOrder.createdAt}</p>
              </div>
            </div>

            {/* Bill To & Ship To */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-[10px] font-black uppercase text-gray-400">Customer (Recipient)</p>
                <p className="font-bold text-gray-900 mt-1">{selectedInvoiceOrder.customerName}</p>
                <p className="text-gray-600 mt-0.5">{selectedInvoiceOrder.phone}</p>
                <p className="text-gray-600 mt-0.5">{selectedInvoiceOrder.address}, {selectedInvoiceOrder.city}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-[10px] font-black uppercase text-gray-400">Merchant (Shipper)</p>
                <p className="font-bold text-gray-900 mt-1">Dream Fashion Store</p>
                <p className="text-gray-600 mt-0.5">Verified Seller ID: DF-1049</p>
                <p className="text-gray-600 mt-0.5">Courier: {selectedInvoiceOrder.courier || 'Dreamvally Escrow Dispatch'}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedInvoiceOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td className="p-3 font-medium">{item.name}</td>
                      <td className="p-3 text-center font-bold">{item.quantity}</td>
                      <td className="p-3 text-right font-black">
                        {selectedInvoiceOrder.currency === 'BDT' ? '৳' : '﷼'} {item.price.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Summary */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <p>Payment: <span className="font-bold text-gray-900">{selectedInvoiceOrder.paymentMethod}</span></p>
                <p>Status: <span className="font-bold text-emerald-700">{selectedInvoiceOrder.paymentStatus}</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Grand Total Amount</p>
                <p className="text-xl font-black text-emerald-900">
                  {selectedInvoiceOrder.currency === 'BDT' ? '৳' : '﷼'} {selectedInvoiceOrder.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setSelectedInvoiceOrder(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 flex items-center justify-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Packing Slip</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
