"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, CheckCircle2, AlertCircle, Store, MapPin, FileText } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

interface ProfileData {
  fullName: string;
  email: string | null;
  phoneNumber: string;
  avatarUrl: string | null;
  role: string;
  shopName: string | null;
  shopSlug: string | null;
  shopDescription: string | null;
  shopLogo: string | null;
  shopBanner: string | null;
  city: string | null;
  address: string | null;
  isKycVerified: boolean;
}

export default function SellerSettingsPage() {
  const { update: updateSession } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [shopLogo, setShopLogo] = useState<string | null>(null);
  const [shopBanner, setShopBanner] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [shopSlug, setShopSlug] = useState<string | null>(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then(({ user }: { user: ProfileData }) => {
        setFullName(user.fullName || '');
        setShopName(user.shopName || '');
        setShopDescription(user.shopDescription || '');
        setCity(user.city || '');
        setAddress(user.address || '');
        setShopLogo(user.shopLogo);
        setShopBanner(user.shopBanner);
        setAvatarUrl(user.avatarUrl);
        setShopSlug(user.shopSlug);
        setRole(user.role);
      })
      .catch(() => setError('Could not load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          shopName,
          shopDescription,
          shopLogo,
          shopBanner,
          avatarUrl,
          city,
          address,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Save failed');
        return;
      }

      // Refresh session so layout header picks up new shop name
      await updateSession({ shopName, role });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-12 max-w-3xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-3 border-b border-border/60">
        <h1 className="text-xl font-bold text-foreground tracking-tight">Shop Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Edit your shop profile, branding and contact information
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branding: Logo + Banner */}
        <div className="bg-card border border-border/60 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Store className="w-4 h-4 text-primary" />
            Shop Branding
          </div>
          <p className="text-[11px] text-muted-foreground -mt-2">
            {shopSlug ? `Shop URL: /shop/${shopSlug}` : 'Shop URL will be generated after saving'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUpload
              label="Shop Logo"
              value={shopLogo}
              onChange={setShopLogo}
              aspect="aspect-square"
              hint="Square image works best (min 200×200)"
            />
            <ImageUpload
              label="Cover / Banner Photo"
              value={shopBanner}
              onChange={setShopBanner}
              aspect="aspect-[3/1]"
              hint="Wide banner recommended (min 1200×400)"
            />
          </div>
        </div>

        {/* Profile */}
        <div className="bg-card border border-border/60 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <FileText className="w-4 h-4 text-primary" />
            Profile
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm font-bold text-foreground" htmlFor="fullName">Your Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm font-bold text-foreground" htmlFor="avatar">Profile Photo</label>
              <ImageUpload
                label=""
                value={avatarUrl}
                onChange={setAvatarUrl}
                aspect="aspect-square"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-label-sm font-bold text-foreground" htmlFor="shopName">Shop Name</label>
            <input
              id="shopName"
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="e.g. Dream Fashion"
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-label-sm font-bold text-foreground" htmlFor="shopDesc">Shop Description</label>
            <textarea
              id="shopDesc"
              rows={4}
              value={shopDescription}
              onChange={(e) => setShopDescription(e.target.value)}
              placeholder="Tell buyers what your shop offers..."
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y"
            />
          </div>
        </div>

        {/* Location */}
        <div className="bg-card border border-border/60 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            Location & Contact
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm font-bold text-foreground" htmlFor="city">City / District</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Dhaka"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-label-sm font-bold text-foreground" htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. House 12, Road 5, Gulshan"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>

          {role && (
            <p className="text-[11px] text-muted-foreground">
              Account role: <span className="font-semibold text-foreground">{role}</span>
              {role === 'VERIFIED_MERCHANT' && (
                <span className="ml-2 text-emerald-600 font-semibold">✓ Verified Merchant</span>
              )}
            </p>
          )}
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-sm font-bold transition-all shadow-xs disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
