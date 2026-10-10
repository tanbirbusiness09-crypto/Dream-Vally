"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function SellerRegistrationPage() {
  const router = useRouter();
  const { data: session, status, update: updateSession } = useSession();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    shopName: '',
    shopCategory: '',
    businessAddress: '',
    shopDescription: '',
    agreedToTerms: false
  });

  // Redirect to login if not authenticated, or to dashboard if already a seller
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.replace('/login?callbackUrl=/seller/register');
      return;
    }
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role === 'SELLER' || role === 'VERIFIED_MERCHANT' || role === 'ADMIN') {
      router.replace('/seller/dashboard');
    }
  }, [status, session, router]);

  // Prefill identity from session (derived, no setState needed)
  const sessionName = session?.user?.name || '';
  const sessionEmail = session?.user?.email || '';
  const fullNameValue = formData.fullName || sessionName;
  const emailValue = formData.email || sessionEmail;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setError('Please agree to the Terms and Conditions.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/seller/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: formData.shopName,
          shopDescription: formData.shopDescription,
          shopCategory: formData.shopCategory,
          businessAddress: formData.businessAddress,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.replace('/login?callbackUrl=/seller/register');
          return;
        }
        setError(json.error || 'Registration failed — try again');
        return;
      }

      // Refresh session so role/shopSlug/shopName propagate
      await updateSession({
        role: json.user?.role,
        shopName: json.user?.shopName,
        shopSlug: json.user?.shopSlug,
      });
      router.push('/seller/dashboard');
    } catch {
      setError('Network error — check connection and try again');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
        <p className="text-xs text-muted-foreground font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-8 px-4 sm:px-6">
      
      {/* Back to marketplace */}
      <div className="w-full max-w-xl mb-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-xl bg-card rounded-xl shadow-xs border border-border/70 overflow-hidden">
        
        {/* Compact Header */}
        <div className="p-4 sm:p-5 border-b border-border/60 bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                Register as a Seller
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Join Dreamvally and start selling across Bangladesh and Saudi Arabia.
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Step {step} of 4
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-3 flex items-center gap-1.5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  step >= item ? 'bg-emerald-600' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mx-4 sm:mx-5 mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Personal Information</h2>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={fullNameValue}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                  placeholder="e.g. Tanvir Ahmed"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                  <input
                    required
                    readOnly
                    type="email"
                    name="email"
                    value={emailValue}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-muted/50 text-xs font-medium text-muted-foreground focus:outline-none cursor-not-allowed" 
                    placeholder="seller@dreamvally.com"
                    title="Email comes from your account"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Shop Details */}
          {step === 2 && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shop Details</h2>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Shop / Store Name</label>
                <input
                  required
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                  placeholder="e.g. Dream Fashion Hub"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Primary Category</label>
                <select
                  required
                  name="shopCategory"
                  value={formData.shopCategory}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select a category</option>
                  <option value="clothing">Clothing & Fashion</option>
                  <option value="electronics">Electronics & Mobiles</option>
                  <option value="laptops">Laptops & Computers</option>
                  <option value="vehicles">Vehicles & Motors</option>
                  <option value="realestate">Properties & Real Estate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Business Address</label>
                <textarea
                  required
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y" 
                  placeholder="Plot 12, Road 4, Banani, Dhaka"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Branding */}
          {step === 3 && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Store Branding & Bio</h2>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Store Description / Tagline</label>
                <textarea
                  name="shopDescription"
                  value={formData.shopDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y" 
                  placeholder="Tell buyers about your products, quality guarantees, and dispatch speed..."
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Logo & cover photo upload available later in <span className="font-semibold">Seller Settings</span>.
              </p>
            </div>
          )}

          {/* STEP 4: Review & Agreement */}
          {step === 4 && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Review & Confirmation</h2>
              <div className="bg-muted/40 rounded-lg p-3 space-y-1.5 text-xs border border-border/60">
                <div className="flex justify-between border-b border-border/50 pb-1">
                  <span className="text-muted-foreground">Shop Name:</span>
                  <span className="font-semibold text-foreground">{formData.shopName || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-1">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-semibold text-foreground capitalize">{formData.shopCategory || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="font-semibold text-foreground">{emailValue || 'N/A'}</span>
                </div>
              </div>

              <label className="flex items-start gap-2 p-3 border border-border/70 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-muted-foreground">
                  I agree to the Dreamvally Seller Agreement and Terms of Service.
                </span>
              </label>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={submitting}
                className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
              >
                Back
              </button>
            ) : <div />}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={submitting}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors shadow-xs disabled:opacity-60"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {submitting ? 'Creating...' : 'Open My Shop'}
              </button>
            )}
          </div>

        </form>
      </div>

    </div>
  );
}
