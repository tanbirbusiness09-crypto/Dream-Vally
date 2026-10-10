"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Globe2,
  DollarSign,
  Truck,
  Sparkles,
  Info,
  X,
  Layers,
  ArrowLeft,
  Boxes,
  ShieldCheck,
  Tag
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
    <div className="max-w-6xl mx-auto pb-20 space-y-7 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-emerald-950/20 via-emerald-900/10 to-transparent p-6 sm:p-7 rounded-3xl border border-emerald-900/20 dark:border-white/10 backdrop-blur-md">
        <div>
          <Link
            href="/seller/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-[#00895e] mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Inventory Hub</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            List a New Product
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Publish your items with multi-market pricing, rich photos, and variant stock control.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => alert('Product saved as Draft!')}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container font-semibold text-xs sm:text-sm text-foreground transition-all"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Product successfully published to Dreamvally Marketplace!');
              window.location.href = '/seller/products';
            }}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00895e] to-[#064e3b] hover:from-[#00744f] hover:to-[#043e2e] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Publish Listing</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Column: Main Form (8 Cols) */}
        <div className="lg:col-span-8 space-y-7">
          
          {/* 1. Basic Information */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#00895e]" />
                <span>Basic Information</span>
              </h2>
              <span className="text-xs text-muted-foreground font-semibold">* Required fields</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="e.g. Exclusive Embroidered Cotton Panjabi - Festive Edition"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                >
                  <option value="Clothing & Fashion">Clothing &amp; Fashion</option>
                  <option value="Electronics & Mobiles">Electronics &amp; Mobiles</option>
                  <option value="Laptops & Computers">Laptops &amp; Computers</option>
                  <option value="Vehicles & Motors">Vehicles &amp; Motors</option>
                  <option value="Properties & Real Estate">Properties &amp; Real Estate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Brand / Manufacturer
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Dream Fashion / Apple / Yamaha"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                Detailed Product Description *
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe material, specifications, sizing guide, authenticity guarantees, and box contents..."
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e] resize-y"
              />
            </div>
          </div>

          {/* 2. Target Market Selection */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#00895e]" />
                <span>Market Region &amp; Currency</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Both', label: '🌐 Dual Market (BD & SA)', desc: 'Available to customers in Bangladesh and Saudi Arabia' },
                { id: 'BD', label: '🇧🇩 Bangladesh Only', desc: 'Domestic orders only with BDT (৳) pricing' },
                { id: 'SA', label: '🇸🇦 Saudi Arabia Only', desc: 'Gulf region orders with SAR (﷼) pricing' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTargetMarket(m.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    targetMarket === m.id
                      ? 'border-[#00895e] bg-[#00895e]/10 ring-2 ring-[#00895e]/20'
                      : 'border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  <p className="font-extrabold text-xs text-foreground">{m.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Variants & Pricing Matrix */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-[#00895e]" />
                  <span>Variants, Pricing &amp; Stock Matrix</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Manage distinct size/color combinations with individual stock levels</p>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#00895e] font-bold text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add Variant</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-outline-variant/60 text-muted-foreground text-[11px] uppercase font-bold">
                    <th className="pb-2">Size / Spec</th>
                    <th className="pb-2">Color / Model</th>
                    <th className="pb-2">Price (৳ / ﷼)</th>
                    <th className="pb-2">Stock</th>
                    <th className="pb-2">SKU Code</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  {variants.map((v, idx) => (
                    <tr key={v.id}>
                      <td className="py-2.5 pr-2">
                        <input
                          type="text"
                          defaultValue={v.size}
                          placeholder="e.g. L / 128GB"
                          className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs font-bold"
                        />
                      </td>
                      <td className="py-2.5 pr-2">
                        <input
                          type="text"
                          defaultValue={v.color}
                          placeholder="e.g. Blue"
                          className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs font-bold"
                        />
                      </td>
                      <td className="py-2.5 pr-2">
                        <input
                          type="number"
                          defaultValue={v.price}
                          className="w-24 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs font-bold"
                        />
                      </td>
                      <td className="py-2.5 pr-2">
                        <input
                          type="number"
                          defaultValue={v.stock}
                          className="w-20 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs font-bold"
                        />
                      </td>
                      <td className="py-2.5 pr-2">
                        <input
                          type="text"
                          defaultValue={v.sku}
                          className="w-28 font-mono px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs"
                        />
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => removeVariant(v.id)}
                          disabled={variants.length === 1}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg disabled:opacity-40"
                          title="Remove variant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Media, Shipping & Inspection (4 Cols) */}
        <div className="lg:col-span-4 space-y-7">
          
          {/* Media Upload Area */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">Product Gallery</h3>
              <span className="text-[11px] text-muted-foreground font-semibold">{images.length}/5 Photos</span>
            </div>

            {/* Drop Zone */}
            <div
              onClick={handleSimulateAddImage}
              className="border-2 border-dashed border-outline-variant rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-surface hover:bg-surface-container/60 hover:border-[#00895e] transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#00895e]/10 text-[#00895e] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-foreground">Click to Add Images</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG, WebP up to 5MB</p>
            </div>

            {/* Thumbnail Gallery Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-surface-container group cursor-pointer ${
                    primaryImageIndex === i ? 'border-[#00895e] ring-2 ring-[#00895e]/20' : 'border-outline-variant'
                  }`}
                  onClick={() => setPrimaryImageIndex(i)}
                >
                  <Image src={img} alt="Product image" fill className="object-cover" />
                  {primaryImageIndex === i && (
                    <span className="absolute top-1 left-1 bg-[#00895e] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(i);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              Click any photo to set it as the primary cover image.
            </p>
          </div>

          {/* Logistics & Delivery Options */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-2 border-b border-outline-variant/60 pb-3">
              <Truck className="w-4 h-4 text-[#00895e]" />
              <span>Logistics &amp; Escrow</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                Estimated Delivery Window
              </label>
              <select
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
              >
                <option value="1-2 Days">1-2 Days (Express Express)</option>
                <option value="2-3 Days">2-3 Days (Standard Delivery)</option>
                <option value="3-5 Days">3-5 Days (Inter-District / Gulf)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                Shipping Fee (৳ / ﷼)
              </label>
              <input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                disabled={freeShipping}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e] disabled:opacity-50"
              />
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={freeShipping}
                onChange={(e) => setFreeShipping(e.target.checked)}
                className="rounded accent-[#00895e] w-4 h-4"
              />
              <span className="text-xs font-bold text-foreground">Free Shipping for Buyer</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={escrowInspection}
                onChange={(e) => setEscrowInspection(e.target.checked)}
                className="rounded accent-[#00895e] w-4 h-4"
              />
              <span className="text-xs font-bold text-foreground">Enable Dreamvally Escrow Protection</span>
            </label>
          </div>

        </div>

      </div>

    </div>
  );
}
