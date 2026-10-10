"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export default function PostAdPage() {
  const router = useRouter();
  const [categorySlug, setCategorySlug] = useState('');
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('new');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load categories from database
  useEffect(() => {
    let cancelled = false;
    fetch('/api/categories')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled && Array.isArray(json?.data)) setCategories(json.data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !price || !categorySlug) {
      setError('Title, price and category are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          categorySlug,
          location,
          condition,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Failed to post ad');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/product/${json.listing.id}`);
      }, 1200);
    } catch {
      setError('Network error — please try again');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="w-full flex-grow flex flex-col items-center justify-center bg-surface-container-lowest py-16 px-4">
        <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-4" />
        <h2 className="text-headline-md text-on-surface mb-2">Ad Published!</h2>
        <p className="text-body-md text-on-surface-variant">Redirecting to your listing...</p>
      </main>
    );
  }

  return (
    <main className="w-full flex-grow flex flex-col items-center bg-surface-container-lowest py-10">
      <div className="max-w-3xl w-full px-margin-mobile md:px-margin-desktop">
        <h1 className="text-headline-md font-headline-md text-on-surface mb-2">Post a New Ad</h1>
        <p className="text-body-lg text-on-surface-variant mb-8">Fill in the details below to publish your advertisement.</p>

        <form onSubmit={handleSubmit} className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 p-6 sm:p-8 flex flex-col gap-6">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="category">Select Category *</label>
            <select
              id="category"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface cursor-pointer"
              required
            >
              <option value="">Choose a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Title & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface" htmlFor="title">Ad Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. iPhone 13 Pro Max 128GB"
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface" htmlFor="price">Price (৳) *</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 85000"
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
                required
                min="1"
              />
            </div>
          </div>

          {/* Condition */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface">Condition *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="new"
                  checked={condition === 'new'}
                  onChange={() => setCondition('new')}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
                <span className="text-body-md text-on-surface">New</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  checked={condition === 'used'}
                  onChange={() => setCondition('used')}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
                <span className="text-body-md text-on-surface">Used</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="description">Description *</label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item, features, and reason for selling..."
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface resize-y"
              required
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="location">Location *</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface cursor-pointer"
              required
            >
              <option value="">Select District</option>
              {['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh', 'Cox\'s Bazar', 'Narayanganj', 'Gazipur'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="border-t border-outline-variant/30 pt-6 mt-4 flex justify-end gap-4">
            <Link href="/" className="px-6 py-3 rounded-xl text-body-md font-bold text-on-surface-variant hover:bg-surface-container transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-8 py-3 rounded-xl text-body-md font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Publishing...' : 'Post Ad'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
