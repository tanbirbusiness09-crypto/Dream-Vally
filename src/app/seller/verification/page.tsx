"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  UploadCloud,
  Building2,
  UserCheck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
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
    <div className="max-w-4xl mx-auto pb-20 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-emerald-900/10 to-transparent p-6 sm:p-7 rounded-3xl border border-amber-500/20 dark:border-white/10 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KYC Trust &amp; Safety</span>
              </span>
              <span className="text-xs text-muted-foreground font-semibold">Bangladesh &amp; Saudi Standards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Merchant Verification &amp; Trust Badge
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              Complete standard KYC to receive your Golden Verified Merchant badge, higher search ranking, and instant buyer checkouts.
            </p>
          </div>

          <div className="p-3 bg-surface-container rounded-2xl border border-outline-variant text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">Verified Trust Badge</span>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#00895e]">
              <BadgeCheck className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>Verified Seller</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Step Progress Stepper */}
      <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          
          {[
            { step: 1, title: 'Seller Profile', icon: UserCheck },
            { step: 2, title: 'Document Upload', icon: FileText },
            { step: 3, title: 'Payout Account', icon: CreditCard },
          ].map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div
                key={s.step}
                className="flex flex-col items-center text-center relative z-10 cursor-pointer"
                onClick={() => !isSubmitted && setCurrentStep(s.step as any)}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                    isCompleted
                      ? 'bg-[#00895e] text-white'
                      : isCurrent
                      ? 'bg-[#00895e] text-white ring-4 ring-[#00895e]/20'
                      : 'bg-surface-container text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`text-xs mt-2 font-bold ${
                    isCurrent ? 'text-foreground' : 'text-muted-foreground'
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
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-[#00895e] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-foreground">KYC Submitted for Review</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
              Your business and identity documents have been encrypted and submitted to the Dreamvally Compliance Team. Approval typically takes 12–24 business hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant max-w-sm mx-auto text-xs text-left space-y-1.5">
            <p className="font-bold text-foreground">Submission Reference: <span className="font-mono text-[#00895e]">KYC-DF-2026-904</span></p>
            <p className="text-muted-foreground">Notification will be sent via SMS &amp; Email upon verification.</p>
          </div>

          <div className="pt-2">
            <Link
              href="/seller/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00895e] text-white font-bold text-xs shadow-md"
            >
              <span>Back to Seller Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: Seller Profile Type */}
          {currentStep === 1 && (
            <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-extrabold text-base text-foreground flex items-center gap-2 border-b border-outline-variant/60 pb-3">
                <UserCheck className="w-4 h-4 text-[#00895e]" />
                <span>Select Seller Account Type</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setSellerType('individual')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    sellerType === 'individual'
                      ? 'border-[#00895e] bg-[#00895e]/5 ring-2 ring-[#00895e]/20'
                      : 'border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  <p className="font-extrabold text-sm text-foreground">Personal / Individual Seller</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Selling pre-owned personal goods, boutique clothing, or hobby items. Requires National ID (NID) or Passport.
                  </p>
                </div>

                <div
                  onClick={() => setSellerType('business')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    sellerType === 'business'
                      ? 'border-[#00895e] bg-[#00895e]/5 ring-2 ring-[#00895e]/20'
                      : 'border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-sm text-foreground">Registered Business / Brand</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700">Recommended</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Official retail shop, enterprise brand, or registered trade firm. Requires Trade License or CR Certificate.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                    Authorized Legal Representative Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                    Registered Store / Brand Name *
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#00895e] hover:bg-[#00744f] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <span>Continue to Documents</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Document Upload */}
          {currentStep === 2 && (
            <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-extrabold text-base text-foreground flex items-center gap-2 border-b border-outline-variant/60 pb-3">
                <FileText className="w-4 h-4 text-[#00895e]" />
                <span>Upload Identity &amp; Legal Registration</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                    National ID (NID) / Iqama / Passport Number *
                  </label>
                  <input
                    type="text"
                    value={nidNumber}
                    onChange={(e) => setNidNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-outline-variant rounded-2xl p-6 text-center hover:border-[#00895e] bg-surface cursor-pointer group transition-all">
                    <UploadCloud className="w-6 h-6 text-[#00895e] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-foreground">Upload NID (Front Side)</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG or PDF up to 5MB</p>
                    <span className="mt-2 inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Sample_nid_front.jpg attached</span>
                  </div>

                  <div className="border-2 border-dashed border-outline-variant rounded-2xl p-6 text-center hover:border-[#00895e] bg-surface cursor-pointer group transition-all">
                    <UploadCloud className="w-6 h-6 text-[#00895e] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-foreground">Upload NID (Back Side)</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG or PDF up to 5MB</p>
                    <span className="mt-2 inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Sample_nid_back.jpg attached</span>
                  </div>
                </div>

                {sellerType === 'business' && (
                  <div className="pt-2 space-y-3">
                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                      Valid Trade License / CR (Commercial Registration) No. *
                    </label>
                    <input
                      type="text"
                      value={tradeLicenseNo}
                      onChange={(e) => setTradeLicenseNo(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                    />
                    <div className="border-2 border-dashed border-outline-variant rounded-2xl p-6 text-center hover:border-[#00895e] bg-surface cursor-pointer group transition-all">
                      <UploadCloud className="w-6 h-6 text-[#00895e] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-foreground">Upload Trade License Copy</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Current fiscal year renewal certificate (PDF/JPG)</p>
                      <span className="mt-2 inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Trade_license_2026.pdf attached</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-xs font-bold text-foreground hover:bg-surface-container flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-[#00895e] hover:bg-[#00744f] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <span>Continue to Payouts</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payout Accounts */}
          {currentStep === 3 && (
            <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-extrabold text-base text-foreground flex items-center gap-2 border-b border-outline-variant/60 pb-3">
                <CreditCard className="w-4 h-4 text-[#00895e]" />
                <span>Merchant Payout &amp; Banking Details</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                    Preferred Payout Channel *
                  </label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                  >
                    <option value="bKash Merchant">bKash Merchant (Instant Settlement 🇧🇩)</option>
                    <option value="Nagad Business">Nagad Business (Instant Settlement 🇧🇩)</option>
                    <option value="BRAC Bank Corporate">BRAC Bank Corporate (EFT/NPSB)</option>
                    <option value="City Bank Ltd">City Bank Ltd (Direct Deposit)</option>
                    <option value="Al Rajhi Bank (KSA)">Al Rajhi Bank (IBAN / Mada 🇸🇦)</option>
                    <option value="Saudi National Bank (SNB)">Saudi National Bank (SNB 🇸🇦)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                      Account / Wallet Holder Name *
                    </label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                      Account Number / IBAN *
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                      required
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant flex items-start gap-3 text-xs text-muted-foreground">
                  <Lock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p leading-relaxed>
                    Your banking information is 256-bit encrypted and only used to credit escrow funds upon completed delivery confirmations.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-xs font-bold text-foreground hover:bg-surface-container flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#00895e] to-[#064e3b] hover:from-[#00744f] hover:to-[#043e2e] text-white text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Submit for Verification</span>
                </button>
              </div>
            </div>
          )}

        </form>
      )}

    </div>
  );
}
