"use client";

import React, { useState } from 'react';

export default function AddProductPage() {
  const [variants, setVariants] = useState([{ id: 1, size: 'M', color: 'Red', price: '1200', stock: '10' }]);

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), size: '', color: '', price: '', stock: '' }]);
  };

  const removeVariant = (id: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Add New Product</h2>
          <p className="text-on-surface-variant text-sm mt-1">Fill in the details to list your product.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface font-medium hover:bg-surface-container transition-colors">
            Save as Draft
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-medium hover:bg-[#00513e] transition-colors shadow-sm">
            Publish Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-5">Basic Information</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Product Title</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Premium Cotton Panjabi" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Category</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Clothing</option>
                    <option>Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Brand</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Brand Name (Optional)" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Description</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Detailed product description..."></textarea>
              </div>
            </div>
          </div>

          {/* Variants & Pricing */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-foreground">Variants & Pricing</h3>
              <button onClick={addVariant} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                <span>+</span> Add Variant
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Header row for variants */}
              <div className="grid grid-cols-12 gap-3 text-xs font-medium text-on-surface-variant uppercase px-2">
                <div className="col-span-3">Size</div>
                <div className="col-span-3">Color</div>
                <div className="col-span-3">Price (৳)</div>
                <div className="col-span-2">Stock</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {variants.map((variant, index) => (
                <div key={variant.id} className="grid grid-cols-12 gap-3 items-center bg-surface-container p-2 rounded-lg border border-outline-variant/50">
                  <div className="col-span-3">
                    <input type="text" defaultValue={variant.size} placeholder="e.g. XL" className="w-full px-3 py-2 rounded-md border border-outline-variant bg-surface text-sm" />
                  </div>
                  <div className="col-span-3">
                    <input type="text" defaultValue={variant.color} placeholder="e.g. Black" className="w-full px-3 py-2 rounded-md border border-outline-variant bg-surface text-sm" />
                  </div>
                  <div className="col-span-3">
                    <input type="number" defaultValue={variant.price} placeholder="0.00" className="w-full px-3 py-2 rounded-md border border-outline-variant bg-surface text-sm" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" defaultValue={variant.stock} placeholder="0" className="w-full px-3 py-2 rounded-md border border-outline-variant bg-surface text-sm" />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => removeVariant(variant.id)} disabled={variants.length === 1} className="text-red-500 hover:text-red-700 disabled:opacity-50">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Media & Settings */}
        <div className="space-y-8">
          
          {/* Media */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Product Images</h3>
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface hover:bg-surface-container transition-colors cursor-pointer mb-4">
              <span className="text-3xl mb-2">📸</span>
              <p className="text-sm font-medium text-primary">Click to upload</p>
              <p className="text-xs text-on-surface-variant mt-1">or drag and drop</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Mock Uploaded Images */}
              <div className="aspect-square bg-surface-variant rounded-lg border border-outline-variant"></div>
              <div className="aspect-square bg-surface-variant rounded-lg border border-outline-variant"></div>
              <div className="aspect-square border-2 border-dashed border-outline-variant rounded-lg flex items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-container">+</div>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 text-center">First image is the cover.</p>
          </div>

          {/* Delivery & Shipping */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Shipping</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Delivery Time</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                  <option>1-3 Days</option>
                  <option>3-5 Days</option>
                  <option>7+ Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Shipping Charge (৳)</label>
                <input type="number" defaultValue={60} className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
