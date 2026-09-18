"use client";

import React, { useState } from 'react';

export default function OrderManagementPage() {
  const [activeTab, setActiveTab] = useState('All');

  const orders = [
    { id: '#ORD-001', date: 'Today, 10:23 AM', customer: 'Rahul Hasan', item: 'Cotton Panjabi (L)', total: '৳ 1200', status: 'Pending', address: 'Mirpur 10, Dhaka' },
    { id: '#ORD-002', date: 'Yesterday', customer: 'Sadia Islam', item: 'Leather Wallet Brown', total: '৳ 850', status: 'Processing', address: 'Dhanmondi, Dhaka' },
    { id: '#ORD-003', date: 'Oct 24, 2024', customer: 'Kamrul Zaman', item: 'Silk Saree Blue', total: '৳ 4500', status: 'Shipped', address: 'Uttara, Dhaka' },
    { id: '#ORD-004', date: 'Oct 22, 2024', customer: 'Nabila Haque', item: 'Denim Jacket XL', total: '৳ 2100', status: 'Delivered', address: 'Gulshan, Dhaka' },
    { id: '#ORD-005', date: 'Oct 20, 2024', customer: 'Asif Rahman', item: 'Summer T-Shirt', total: '৳ 450', status: 'Cancelled', address: 'Banani, Dhaka' },
  ];

  const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className="pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Order Management</h2>
          <p className="text-on-surface-variant text-sm mt-1">Track, process, and manage customer orders.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-outline-variant px-2 bg-surface-container/30">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-on-surface-variant hover:text-foreground hover:border-outline-variant'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex justify-between items-center gap-4 bg-surface">
          <input type="text" placeholder="Search by Order ID or Customer..." className="w-full sm:w-80 px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          <button className="px-4 py-2 rounded-lg border border-outline-variant bg-surface text-sm font-medium hover:bg-surface-container transition-colors whitespace-nowrap">
            Export Invoices
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Order details</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-on-surface divide-y divide-outline-variant/50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    No orders found in this category.
                  </td>
                </tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container/30 transition-colors group">
                  <td className="p-4">
                    <div className="font-medium text-foreground">{order.id}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{order.date}</div>
                    <div className="text-sm mt-1">{order.item}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5 max-w-[150px] truncate" title={order.address}>{order.address}</div>
                  </td>
                  <td className="p-4 font-medium">{order.total}</td>
                  <td className="p-4">
                    <select 
                      defaultValue={order.status}
                      className={`text-xs font-semibold rounded-full px-3 py-1.5 border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="px-3 py-1.5 rounded text-xs font-medium border border-outline-variant text-on-surface hover:bg-surface-container transition-colors">
                      Print Slip
                    </button>
                    <button className="px-3 py-1.5 rounded text-xs font-medium border border-primary text-primary hover:bg-primary/10 transition-colors">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
