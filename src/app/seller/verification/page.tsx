"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  UploadCloud,
  UserCheck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  Check
} from 'lucide-react';

export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [sellerType, setSellerType] = useState<'individual' | 'business'>('business');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('John Doe');
  const [shopName, setShopName] = useState('Dream Fashion Store');
  const [nidNumber, setNidNumber] = useState('1994829104821');
  const [tradeLicenseNo, setTradeLicenseNo] = useState('TRD-DHK-2024-9912');
  
  // Payout
  const [payoutMethod, setPayoutMethod] = useState('bKash Merchant');
  const [accountNumber, setAccountNumber] = useState('01711-234567');
  const [accountHolder, setAccountHolder] = useState('Dream Fashion');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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

      {/* 2. Compact Step Indicator */}
      <div className="bg-card border border-border/60 rounded-xl p-3 shadow-xs">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[
            { step: 1, title: 'Seller Type', icon: UserCheck },
            { step: 2, title: 'Documents', icon: FileText },
            { step: 3, title: 'Payout Account', icon: CreditCard },
          ].map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div
                key={s.step}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => !isSubmitted && setCurrentStep(s.step as any)}
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
      {isSubmitted ? (
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">KYC Submitted for Review</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
              Your business and identity documents have been submitted to the Dreamvally Compliance Team. Review typically takes 12–24 business hours.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-muted border border-border max-w-xs mx-auto text-xs text-left space-y-1">
            <p className="font-semibold text-foreground">Reference: <span className="font-mono text-emerald-600">KYC-DF-2026-904</span></p>
            <p className="text-[11px] text-muted-foreground">Notification will be sent via SMS & Email upon approval.</p>
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
                  <div className="border border-dashed border-border/80 rounded-lg p-4 text-center hover:bg-muted/30 cursor-pointer transition-colors">
                    <UploadCloud className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-foreground">Upload NID (Front)</p>
                    <p className="text-[10px] text-muted-foreground">JPG, PNG or PDF up to 5MB</p>
                    <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded">nid_front.jpg attached</span>
                  </div>

                  <div className="border border-dashed border-border/80 rounded-lg p-4 text-center hover:bg-muted/30 cursor-pointer transition-colors">
                    <UploadCloud className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-foreground">Upload NID (Back)</p>
                    <p className="text-[10px] text-muted-foreground">JPG, PNG or PDF up to 5MB</p>
                    <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded">nid_back.jpg attached</span>
                  </div>
                </div>

                {sellerType === 'business' && (
                  <div className="pt-2 space-y-2 border-t border-border/60">
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Trade License / Commercial CR Number *
                    </label>
                    <input
                      type="text"
                      value={tradeLicenseNo}
                      onChange={(e) => setTradeLicenseNo(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border/70 bg-background text-xs font-mono font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="border border-dashed border-border/80 rounded-lg p-3 text-center hover:bg-muted/30 cursor-pointer transition-colors">
                      <UploadCloud className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <p className="text-xs font-medium text-foreground">Upload Trade License Copy</p>
                      <p className="text-[10px] text-muted-foreground">Current renewal certificate (PDF/JPG)</p>
                      <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded">trade_license_2026.pdf attached</span>
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
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Submit for Verification</span>
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
