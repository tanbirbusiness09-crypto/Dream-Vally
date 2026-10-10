"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, AlertCircle } from 'lucide-react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  UserCheck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  Check
} from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

interface ProfileData {
  fullName: string;
  shopName: string | null;
  nationalId: string | null;
  nidFrontUrl: string | null;
  nidBackUrl: string | null;
  tradeLicenseUrl: string | null;
  isKycVerified: boolean;
  kycSubmittedAt: string | null;
}

export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [sellerType, setSellerType] = useState<'individual' | 'business'>('business');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [nidFront, setNidFront] = useState<string | null>(null);
  const [nidBack, setNidBack] = useState<string | null>(null);
  const [tradeLicenseUrl, setTradeLicenseUrl] = useState<string | null>(null);

  // Payout (local only — not persisted yet)
  const [payoutMethod, setPayoutMethod] = useState('bKash Merchant');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  // Load existing profile
  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(({ user }: { user: ProfileData }) => {
        setFullName(user.fullName || '');
        setShopName(user.shopName || '');
        setNidNumber(user.nationalId || '');
        setNidFront(user.nidFrontUrl);
        setNidBack(user.nidBackUrl);
        setTradeLicenseUrl(user.tradeLicenseUrl);
        setAccountHolder(user.shopName || '');
        setHasSubmitted(!!user.kycSubmittedAt);
        setIsVerified(user.isKycVerified);
        if (user.isKycVerified) setHasSubmitted(true);
      })
      .catch(() => setError('Could not load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sellerType === 'business' && !tradeLicenseUrl) {
      setError('Trade license upload is required for registered businesses.');
      return;
    }
    if (!nidFront) {
      setError('NID front side upload is required.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          shopName,
          nationalId: nidNumber,
          nidFrontUrl: nidFront,
          nidBackUrl: nidBack,
          tradeLicenseUrl: sellerType === 'business' ? tradeLicenseUrl : null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Submission failed');
        return;
      }
      setHasSubmitted(true);
    } catch {
      setError('Network error — try again');
    } finally {
      setSubmitting(false);
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
    <div className="max-w-3xl mx-auto pb-12 space-y-4 animate-in fade-in duration-200">
      
      {/* 1. Compact Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Seller Identity & Verification
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <BadgeCheck className="w-3 h-3 text-emerald-600" />
              <span>KYC Standard</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Submit your legal identity and payment account details to verify your store.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 bg-muted rounded-lg border border-border text-xs flex items-center gap-1.5 font-medium text-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Verification</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* 2. Compact Step Indicator */}
      <div className="bg-card border border-border/60 rounded-xl p-3 shadow-xs">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[
            { step: 1, title: 'Seller Type', icon: UserCheck },
            { step: 2, title: 'Documents', icon: FileText },
            { step: 3, title: 'Payout Account', icon: CreditCard },
          ].map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div
                key={s.step}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => !hasSubmitted && setCurrentStep(s.step as 1 | 2 | 3)}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-500/20'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    isCurrent ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Form Wizard Content */}
      {hasSubmitted ? (
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
            isVerified ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
          }`}>
            {isVerified ? <CheckCircle2 className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              {isVerified ? 'Your Store is Verified!' : 'KYC Submitted for Review'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
              {isVerified
                ? 'Your identity has been confirmed. You now enjoy full seller privileges.'
                : 'Your identity documents have been submitted to the Dreamvally Compliance Team. Review typically takes 12–24 business hours.'}
            </p>
          </div>

          {/* Document status */}
          <div className="p-3 rounded-lg bg-muted border border-border max-w-xs mx-auto text-xs text-left space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">NID Front</span>
              {nidFront ? <span className="text-emerald-600 font-semibold">✓ Attached</span> : <span className="text-muted-foreground">—</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">NID Back</span>
              {nidBack ? <span className="text-emerald-600 font-semibold">✓ Attached</span> : <span className="text-muted-foreground">—</span>}
            </div>
            {sellerType === 'business' && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Trade License</span>
                {tradeLicenseUrl ? <span className="text-emerald-600 font-semibold">✓ Attached</span> : <span className="text-muted-foreground">—</span>}
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/seller/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* STEP 1: Seller Profile Type */}
          {currentStep === 1 && (
            <div className="bg-card border border-border/60 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Account Type</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSellerType('individual')}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                    sellerType === 'individual'
                      ? 'border-emerald-600 bg-emerald-500/10'
                      : 'border-border/70 hover:bg-muted/50'
                  }`}
                >
                  <p className="font-semibold text-xs text-foreground">Individual Seller</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    For individual creators or personal shops. Requires National ID (NID) or Passport.
                  </p>
                </div>

                <div
                  onClick={() => setSellerType('business')}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                    sellerType === 'business'
                      ? 'border-emerald-600 bg-emerald-500/10'
                      : 'border-border/70 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xs text-foreground">Registered Business</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700">Recommended</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    For verified enterprises and retail brands. Requires Trade License or Commercial CR.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Representative Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Store / Brand Name *
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Continue to Documents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Document Upload */}
          {currentStep === 2 && (
            <div className="bg-card border border-border/60 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Identity & Business Documents</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    National ID / Iqama / Passport Number *
                  </label>
                  <input
                    type="text"
                    value={nidNumber}
                    onChange={(e) => setNidNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-mono font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ImageUpload
                    label="NID (Front) *"
                    value={nidFront}
                    onChange={setNidFront}
                    aspect="aspect-[3/2]"
                    hint="JPG or PNG up to 5MB — all corners visible"
                  />
                  <ImageUpload
                    label="NID (Back)"
                    value={nidBack}
                    onChange={setNidBack}
                    aspect="aspect-[3/2]"
                    hint="JPG or PNG up to 5MB"
                  />
                </div>

                {sellerType === 'business' && (
                  <div className="pt-2 space-y-2 border-t border-border/60">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-foreground">
                          Trade License Copy *
                        </span>
                        <ImageUpload
                          label=""
                          value={tradeLicenseUrl}
                          onChange={setTradeLicenseUrl}
                          aspect="aspect-[3/2]"
                          hint="Current renewal certificate (JPG/PNG/PDF image)"
                        />
                      </div>
                      <div className="flex items-end">
                        <p className="text-[11px] text-muted-foreground pb-3">
                          Required for registered businesses. Upload the latest renewal certificate showing license number, issue and expiry dates.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Continue to Payout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payout Accounts */}
          {currentStep === 3 && (
            <div className="bg-card border border-border/60 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payout & Banking Details</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Payout Channel *
                  </label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="bKash Merchant">bKash Merchant (Instant Settlement BD)</option>
                    <option value="Nagad Business">Nagad Business (Instant Settlement BD)</option>
                    <option value="BRAC Bank Corporate">BRAC Bank Corporate (EFT/NPSB BD)</option>
                    <option value="City Bank Ltd">City Bank Ltd (Direct Deposit BD)</option>
                    <option value="Al Rajhi Bank (KSA)">Al Rajhi Bank (IBAN / Mada SA)</option>
                    <option value="Saudi National Bank (SNB)">Saudi National Bank (SNB SA)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Account / Wallet Holder Name *
                    </label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Account Number / IBAN *
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-mono font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted border border-border flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">Banking information is encrypted and used solely for escrow payouts.</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors shadow-xs disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{submitting ? 'Submitting...' : 'Submit for Verification'}</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </form>
      )}

    </div>
  );
}
