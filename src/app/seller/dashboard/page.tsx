import React from 'react';
import Link from 'next/link';

export default function SellerDashboardPage() {
  // Mock verification state
  const isVerified = false;

  return (
    <div className="space-y-6">
      
      {/* Verification Banner */}
      {!isVerified && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-500 text-xl">⚠️</span>
            <div>
              <h3 className="text-yellow-800 dark:text-yellow-400 font-bold text-sm">Action Required: Verify Your Identity</h3>
              <p className="text-yellow-700 dark:text-yellow-300/80 text-xs mt-1">Your shop is currently hidden from buyers. Complete the verification process to publish your shop.</p>
            </div>
          </div>
          <Link href="/seller/verification" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap">
            Verify Now
          </Link>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-primary-container text-on-primary-container rounded-2xl p-8 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back, Dream Fashion! 👋</h2>
          <p className="opacity-90">Here's what's happening with your shop today.</p>
        </div>
        <Link href="/seller/add-product" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-[#00513e] transition-colors shadow-md hidden md:block">
          + Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "৳ 45,200", change: "+12%", trend: "up", icon: "💰" },
          { title: "Active Orders", value: "18", change: "+4", trend: "up", icon: "📦" },
          { title: "Total Products", value: "124", change: "", trend: "neutral", icon: "🏷️" },
          { title: "Low Stock Items", value: "3", change: "-2", trend: "down", icon: "⚠️" },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="text-3xl">{stat.icon}</div>
              {stat.change && (
                <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-on-surface-variant text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Orders Chart / Table */}
        <div className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>
            <Link href="/seller/orders" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-on-surface-variant text-sm">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-on-surface">
                {[
                  { id: "#ORD-001", product: "Cotton Panjabi (L, Blue)", date: "Today, 10:23 AM", price: "৳ 1,200", status: "Pending" },
                  { id: "#ORD-002", product: "Leather Wallet", date: "Yesterday", price: "৳ 850", status: "Processing" },
                  { id: "#ORD-003", product: "Silk Saree", date: "Oct 24, 2024", price: "৳ 4,500", status: "Shipped" },
                  { id: "#ORD-004", product: "Denim Jacket", date: "Oct 22, 2024", price: "৳ 2,100", status: "Delivered" },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-outline-variant/50 hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4">{order.product}</td>
                    <td className="py-4 text-on-surface-variant">{order.date}</td>
                    <td className="py-4 font-medium">{order.price}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-6">Top Selling Products</h3>
          <div className="space-y-4">
            {[
              { name: "Exclusive Silk Saree", sales: 42, stock: 15 },
              { name: "Men's Premium Panjabi", sales: 28, stock: 4 },
              { name: "Leather Wallet", sales: 19, stock: 0 },
              { name: "Summer T-Shirt Combo", sales: 14, stock: 50 },
            ].map((prod, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-outline-variant hover:border-primary/50 transition-colors">
                <div>
                  <h4 className="font-medium text-sm text-foreground">{prod.name}</h4>
                  <p className="text-xs text-on-surface-variant mt-1">{prod.sales} Sales</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    prod.stock > 10 ? 'bg-surface-container text-on-surface' :
                    prod.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {prod.stock > 0 ? `${prod.stock} in stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
