"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Download,
  Printer,
  Calendar,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  Copy,
  Check,
  ShoppingBag,
  ChevronDown
} from 'lucide-react';

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  market: 'BD' | 'SA';
  items: OrderItem[];
  totalAmount: number;
  currency: 'BDT' | 'SAR';
  paymentMethod: string;
  paymentStatus: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  courier?: string;
  trackingNumber?: string;
  createdAt: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerName: 'Arafat Rahman',
    phone: '+880 1712-345678',
    address: 'House 14, Road 7, Banani',
    city: 'Dhaka',
    market: 'BD',
    items: [
      {
        name: 'Exclusive Embroidered Cotton Panjabi',
        image: '/assets/products/prod_mens_panjabi.jpg',
        quantity: 1,
        price: 1850,
      },
    ],
    totalAmount: 1910,
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
    <div className="pb-12 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-200">
      
      {/* 1. Compact Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Orders & Fulfillment
            </h1>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {orders.length} Total Orders
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track customer orders, generate shipping slips, and manage dispatch status.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
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
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 hover:bg-muted font-medium text-xs transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Main Order Table & Filter Card */}
      <div className="bg-card border border-border/60 rounded-xl shadow-xs overflow-hidden">
        
        {/* Status Pipeline Tabs */}
        <div className="border-b border-border/60 px-4 pt-1 flex items-center gap-1 overflow-x-auto scrollbar-none bg-muted/20">
          {[
            { id: 'All', label: 'All Orders', count: counts.all },
            { id: 'Pending', label: 'Pending', count: counts.pending },
            { id: 'Processing', label: 'Processing', count: counts.processing },
            { id: 'Shipped', label: 'Shipped', count: counts.shipped },
            { id: 'Delivered', label: 'Delivered', count: counts.delivered },
            { id: 'Cancelled', label: 'Cancelled', count: counts.cancelled },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 pb-2.5 pt-2 px-3 border-b-2 font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search & Market Filter */}
        <div className="p-3 border-b border-border/60 flex flex-col md:flex-row items-center justify-between gap-2.5 bg-muted/10">
          <div className="flex-1 w-full md:max-w-md relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, Customer name, Phone, or Item..."
              className="w-full pl-8 pr-4 py-1.5 rounded-lg border border-border/70 bg-background text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Markets (BD & SA)</option>
              <option value="BD">Bangladesh Orders</option>
              <option value="SA">Saudi Arabia Orders</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-muted/30 border-b border-border/60 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="p-3">Order Details</th>
                <th className="p-3">Customer & Location</th>
                <th className="p-3">Items Summary</th>
                <th className="p-3">Amount & Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <ShoppingBag className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
                    <p className="font-semibold text-sm text-foreground">No orders found</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Try switching status tabs or resetting search keywords.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    
                    {/* Order Details */}
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <span className="font-mono text-xs font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">
                          {order.id}
                        </span>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {order.createdAt}
                        </p>
                        <span className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                          order.market === 'BD' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {order.market === 'BD' ? 'BD' : 'SA'}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">{order.customerName}</p>
                        <button
                          onClick={() => copyPhone(order.id, order.phone)}
                          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-emerald-600 font-mono transition-colors"
                          title="Click to copy phone"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{order.phone}</span>
                          {copiedPhoneId === order.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-2.5 h-2.5 opacity-50" />
                          )}
                        </button>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[180px]" title={order.address}>
                          <MapPin className="w-3 h-3 inline mr-1 text-muted-foreground" />
                          {order.address}, {order.city}
                        </p>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="p-3">
                      <div className="space-y-1.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="relative w-7 h-7 rounded overflow-hidden bg-muted shrink-0 border border-border/60">
                              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="28px" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate max-w-[160px]">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount & Method */}
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground">
                          {order.currency === 'BDT' ? '৳' : 'SAR'} {order.totalAmount.toLocaleString()}
                        </p>
                        <span className="inline-block text-[10px] font-medium px-1.5 py-0.2 rounded bg-muted text-foreground">
                          {order.paymentMethod}
                        </span>
                        <p className="text-[10px] text-emerald-600 font-semibold">{order.paymentStatus}</p>
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="p-3">
                      <div className="space-y-1">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                          className={`text-xs font-semibold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
                            order.status === 'Pending' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30' :
                            order.status === 'Processing' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30' :
                            order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30' :
                            order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' :
                            'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        {order.trackingNumber && (
                          <p className="font-mono text-[10px] text-muted-foreground truncate max-w-[130px]" title={order.trackingNumber}>
                            Trk: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition-colors"
                        title="Print Packing Slip / Invoice"
                      >
                        <Printer className="w-3 h-3 text-emerald-600" />
                        <span>Slip</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-2.5 px-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground bg-muted/10">
          <span>Showing {filteredOrders.length} of {orders.length} orders</span>
          <span className="font-medium text-[11px]">Dreamvally Escrow Protected</span>
        </div>

      </div>

      {/* Printable Invoice / Packing Slip Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white text-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200 border border-gray-300">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
              <div>
                <h2 className="text-lg font-bold text-emerald-900 tracking-tight">DREAMVALLY MARKETPLACE</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Commercial Delivery Packing Slip</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-gray-900">{selectedInvoiceOrder.id}</span>
                <p className="text-xs text-gray-500">{selectedInvoiceOrder.createdAt}</p>
              </div>
            </div>

            {/* Bill To & Ship To */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-[10px] font-bold uppercase text-gray-400">Customer (Recipient)</p>
                <p className="font-bold text-gray-900 mt-0.5">{selectedInvoiceOrder.customerName}</p>
                <p className="text-gray-600 mt-0.5">{selectedInvoiceOrder.phone}</p>
                <p className="text-gray-600 mt-0.5">{selectedInvoiceOrder.address}, {selectedInvoiceOrder.city}</p>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-[10px] font-bold uppercase text-gray-400">Merchant (Shipper)</p>
                <p className="font-bold text-gray-900 mt-0.5">Dream Fashion Store</p>
                <p className="text-gray-600 mt-0.5">Verified Seller ID: DF-1049</p>
                <p className="text-gray-600 mt-0.5">Courier: {selectedInvoiceOrder.courier || 'Dreamvally Escrow Dispatch'}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2">Item Description</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedInvoiceOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2 font-medium">{item.name}</td>
                      <td className="p-2 text-center font-bold">{item.quantity}</td>
                      <td className="p-2 text-right font-bold">
                        {selectedInvoiceOrder.currency === 'BDT' ? '৳' : 'SAR'} {item.price.toLocaleString()}
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
                <p className="text-lg font-bold text-emerald-900">
                  {selectedInvoiceOrder.currency === 'BDT' ? '৳' : 'SAR'} {selectedInvoiceOrder.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setSelectedInvoiceOrder(null);
                }}
                className="flex-1 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
