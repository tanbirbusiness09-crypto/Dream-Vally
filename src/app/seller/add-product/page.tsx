"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  UploadCloud,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  Truck,
  Globe2,
  Boxes,
  Tag,
  DollarSign,
  X
} from 'lucide-react';

interface Variant {
  id: number;
  size: string;
  color: string;
  price: number;
  stock: number;
  sku: string;
}

export default function AddProductPage() {
  const [productTitle, setProductTitle] = useState('');
  const [category, setCategory] = useState('Clothing & Fashion');
  const [brand, setBrand] = useState('');
  const [targetMarket, setTargetMarket] = useState<'Both' | 'BD' | 'SA'>('Both');
  const [description, setDescription] = useState('');
  
  // Media Uploads State
  const [images, setImages] = useState<string[]>([
    '/assets/products/prod_mens_panjabi.jpg',
  ]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

  // Dynamic Variants
  const [variants, setVariants] = useState<Variant[]>([
    { id: 1, size: 'L', color: 'Royal Blue', price: 1850, stock: 15, sku: 'DV-PANJ-BLU-L' },
    { id: 2, size: 'XL', color: 'Royal Blue', price: 1850, stock: 9, sku: 'DV-PANJ-BLU-XL' },
  ]);

  // Shipping
  const [deliveryDays, setDeliveryDays] = useState('2-3 Days');
  const [shippingFee, setShippingFee] = useState(60);
  const [freeShipping, setFreeShipping] = useState(false);
  const [escrowInspection, setEscrowInspection] = useState(true);

  const addVariant = () => {
    const nextId = Date.now();
    setVariants([
      ...variants,
      {
        id: nextId,
        size: '',
        color: '',
        price: 1850,
        stock: 10,
        sku: `DV-${Date.now().toString().slice(-4)}`,
      },
    ]);
  };

  const removeVariant = (id: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((v) => v.id !== id));
    }
  };

  const handleSimulateAddImage = () => {
    const sampleImages = [
      '/assets/products/prod_iphone15.jpg',
      '/assets/products/prod_macbook_m2.jpg',
      '/assets/products/prod_yamaha_r15.jpg',
      '/assets/products/prod_toyota_corolla.jpg',
    ];
    const next = sampleImages[images.length % sampleImages.length];
    setImages([...images, next]);
  };

  const handleRemoveImage = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
      if (primaryImageIndex >= images.length - 1) {
        setPrimaryImageIndex(0);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-4 animate-in fade-in duration-200">
      
      {/* 1. Compact Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/seller/products"
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Back to Products"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Add New Product
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 ml-6">
            Create a new listing with multi-market pricing, variants, and high-res media.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => alert('Product saved as Draft!')}
            className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg border border-border/70 hover:bg-muted font-medium text-xs text-foreground transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Product successfully published to Dreamvally Marketplace!');
              window.location.href = '/seller/products';
            }}
            className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Publish Product</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Form Fields (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* 1. Basic Information */}
          <div className="bg-card border border-border/60 rounded-xl p-4 sm:p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Basic Details</span>
              </h2>
              <span className="text-[11px] text-muted-foreground">* Required fields</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Product Title *
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="e.g. Exclusive Embroidered Cotton Panjabi"
                className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Clothing & Fashion">Clothing & Fashion</option>
                  <option value="Electronics & Mobiles">Electronics & Mobiles</option>
                  <option value="Laptops & Computers">Laptops & Computers</option>
                  <option value="Vehicles & Motors">Vehicles & Motors</option>
                  <option value="Properties & Real Estate">Properties & Real Estate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Brand / Manufacturer
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Dream Fashion / Apple"
                  className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Product Description *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe material, specifications, sizing details, warranty, and package contents..."
                className="w-full px-3 py-2 rounded-lg border border-border/70 bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y"
              />
            </div>
          </div>

          {/* 2. Target Market Selection */}
          <div className="bg-card border border-border/60 rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Market Region & Currency</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'Both', label: 'Dual Market (BD & SA)', desc: 'Available in Bangladesh & Saudi Arabia' },
                { id: 'BD', label: 'Bangladesh Only', desc: 'Domestic orders only with BDT (৳) pricing' },
                { id: 'SA', label: 'Saudi Arabia Only', desc: 'Gulf region orders with SAR pricing' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTargetMarket(m.id as any)}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    targetMarket === m.id
                      ? 'border-emerald-600 bg-emerald-500/10'
                      : 'border-border/70 hover:bg-muted/50'
                  }`}
                >
                  <p className="font-semibold text-xs text-foreground">{m.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Variants & Pricing Matrix */}
          <div className="bg-card border border-border/60 rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Variants & Inventory Matrix</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Variant</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground text-[10px] uppercase font-semibold">
                    <th className="pb-1.5">Size / Spec</th>
                    <th className="pb-1.5">Color / Model</th>
                    <th className="pb-1.5">Price</th>
                    <th className="pb-1.5">Stock</th>
                    <th className="pb-1.5">SKU</th>
                    <th className="pb-1.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-xs">
                  {variants.map((v) => (
                    <tr key={v.id}>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          defaultValue={v.size}
                          placeholder="e.g. L / 128GB"
                          className="w-full px-2.5 py-1 rounded border border-border/70 bg-background text-xs font-medium"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          defaultValue={v.color}
                          placeholder="e.g. Blue"
                          className="w-full px-2.5 py-1 rounded border border-border/70 bg-background text-xs font-medium"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="number"
                          defaultValue={v.price}
                          className="w-20 px-2.5 py-1 rounded border border-border/70 bg-background text-xs font-medium"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="number"
                          defaultValue={v.stock}
                          className="w-16 px-2.5 py-1 rounded border border-border/70 bg-background text-xs font-medium"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          defaultValue={v.sku}
                          className="w-24 font-mono px-2 py-1 rounded border border-border/70 bg-background text-xs"
                        />
                      </td>
                      <td className="py-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeVariant(v.id)}
                          className="p-1 text-muted-foreground hover:text-rose-600 rounded transition-colors"
                          title="Remove variant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Media & Shipping (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Media Upload Area */}
          <div className="bg-card border border-border/60 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">Product Photos</h3>
              <span className="text-[11px] text-muted-foreground">{images.length}/5 photos</span>
            </div>

            {/* Drop Zone */}
            <div
              onClick={handleSimulateAddImage}
              className="border border-dashed border-border/80 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-1.5">
                <UploadCloud className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-foreground">Click to Add Images</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG, WebP up to 5MB</p>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-lg overflow-hidden border bg-muted cursor-pointer ${
                    primaryImageIndex === i ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-border'
                  }`}
                  onClick={() => setPrimaryImageIndex(i)}
                >
                  <Image src={img} alt="Product" fill className="object-cover" sizes="80px" />
                  {primaryImageIndex === i && (
                    <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[8px] font-bold px-1 rounded shadow">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(i);
                    }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Click photo to set as cover image.
            </p>
          </div>

          {/* Shipping & Delivery */}
          <div className="bg-card border border-border/60 rounded-xl p-4 shadow-xs space-y-3">
            <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Logistics & Fulfillment</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Estimated Delivery Window
              </label>
              <select
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="1-2 Days">1-2 Days (Express Courier)</option>
                <option value="2-3 Days">2-3 Days (Standard Delivery)</option>
                <option value="3-5 Days">3-5 Days (Inter-District / Gulf)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Shipping Fee
              </label>
              <input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                disabled={freeShipping}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={freeShipping}
                onChange={(e) => setFreeShipping(e.target.checked)}
                className="rounded border-border text-emerald-600 focus:ring-emerald-500"
              />
              <span>Offer Free Delivery</span>
            </label>

            <div className="pt-2 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px]">Dreamvally Escrow protection enabled</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
