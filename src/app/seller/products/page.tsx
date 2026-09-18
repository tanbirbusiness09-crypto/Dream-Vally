"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductsInventoryPage() {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    { id: 'PRD-101', name: 'Premium Cotton Panjabi', category: 'Clothing', price: '1200', stock: 15, status: 'Active' },
    { id: 'PRD-102', name: 'Leather Wallet Brown', category: 'Accessories', price: '850', stock: 0, status: 'Out of Stock' },
    { id: 'PRD-103', name: 'Silk Saree Blue', category: 'Clothing', price: '4500', stock: 5, status: 'Active' },
    { id: 'PRD-104', name: 'Denim Jacket XL', category: 'Clothing', price: '2100', stock: 2, status: 'Low Stock' },
    { id: 'PRD-105', name: 'Summer T-Shirt', category: 'Clothing', price: '450', stock: 50, status: 'Active' },
    { id: 'PRD-106', name: 'Wireless Earbuds', category: 'Electronics', price: '1500', stock: 0, status: 'Draft' },
  ];

  const openBarcode = (product: any) => {
    setSelectedProduct(product);
    setShowBarcodeModal(true);
  };

  return (
    <div className="pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inventory Management</h2>
          <p className="text-on-surface-variant text-sm mt-1">Manage all your products, stock, and barcodes.</p>
        </div>
        <Link href="/seller/add-product" className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-medium hover:bg-[#00513e] transition-colors shadow-sm">
          + Add Product
        </Link>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container/50">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input type="text" placeholder="Search products..." className="w-full sm:w-64 px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            <select className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm">
              <option>All Categories</option>
              <option>Clothing</option>
              <option>Electronics</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="px-4 py-2 rounded-lg border border-outline-variant bg-surface text-sm font-medium hover:bg-surface-container transition-colors">
              Export CSV
            </button>
            <button className="px-4 py-2 rounded-lg border border-outline-variant bg-surface text-sm font-medium hover:bg-surface-container transition-colors">
              Bulk Edit
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold w-10">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                </th>
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">SKU / ID</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-on-surface divide-y divide-outline-variant/50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="p-4">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-variant rounded-md flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-on-surface-variant">{product.id}</td>
                  <td className="p-4 font-medium">৳ {product.price}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={product.stock === 0 ? 'text-red-500 font-semibold' : 'font-medium'}>{product.stock}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      product.status === 'Out of Stock' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-surface-variant text-on-surface-variant'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openBarcode(product)} className="p-1.5 text-on-surface-variant hover:text-primary transition-colors tooltip relative group" title="Print Barcode">
                      🖨️
                    </button>
                    <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors tooltip relative group" title="Edit">
                      ✏️
                    </button>
                    <button className="p-1.5 text-on-surface-variant hover:text-red-500 transition-colors tooltip relative group" title="Delete">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant flex items-center justify-between text-sm text-on-surface-variant bg-surface-container/30">
          <div>Showing 1 to 6 of 6 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-outline-variant disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 rounded border border-outline-variant bg-primary text-on-primary">1</button>
            <button className="px-3 py-1 rounded border border-outline-variant disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Barcode Modal Overlay */}
      {showBarcodeModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container">
              <h3 className="font-bold text-lg text-foreground">Print Barcode</h3>
              <button onClick={() => setShowBarcodeModal(false)} className="text-on-surface-variant hover:text-foreground">✕</button>
            </div>
            <div className="p-8 flex flex-col items-center">
              <p className="text-sm font-medium mb-4 text-center">{selectedProduct.name}</p>
              
              {/* Mock Barcode Generation */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center mb-6">
                <div className="flex h-16 w-64 justify-between px-2 mb-2">
                  {/* Mock Barcode lines */}
                  {Array.from({length: 40}).map((_, i) => (
                    <div key={i} className={`bg-black h-full ${Math.random() > 0.5 ? 'w-1' : 'w-0.5'} ${Math.random() > 0.8 ? 'w-2' : ''}`}></div>
                  ))}
                </div>
                <p className="font-mono text-sm font-bold tracking-[0.2em] text-black">{selectedProduct.id}</p>
                <p className="text-xs font-bold text-black mt-1">৳ {selectedProduct.price}</p>
              </div>

              <div className="w-full flex gap-3">
                <button onClick={() => setShowBarcodeModal(false)} className="flex-1 py-2.5 rounded-lg border border-outline-variant text-sm font-medium hover:bg-surface-container transition-colors">
                  Cancel
                </button>
                <button onClick={() => { alert('Printing...'); setShowBarcodeModal(false); }} className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-bold hover:bg-[#00513e] transition-colors shadow-sm flex justify-center items-center gap-2">
                  🖨️ Print Labels
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
