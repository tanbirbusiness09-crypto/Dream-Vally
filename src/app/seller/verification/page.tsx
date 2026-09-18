"use client";

import React, { useState } from 'react';

export default function SellerVerificationPage() {
  const [accountType, setAccountType] = useState('individual');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, this would send data to the backend
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto pb-12 pt-8">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-10 text-center shadow-sm">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⏳</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Verification Under Review</h2>
          <p className="text-on-surface-variant mb-6 leading-relaxed">
            Thank you for submitting your documents. Our team is currently reviewing your identity and business information. 
            This process usually takes 1-2 business days. You will be notified via email once approved.
          </p>
          <button onClick={() => window.location.href = '/seller/dashboard'} className="px-6 py-2.5 rounded-lg border border-outline-variant text-on-surface font-medium hover:bg-surface-container transition-colors">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Identity & Business Verification</h2>
        <p className="text-on-surface-variant text-sm mt-2">
          To maintain a secure marketplace, all sellers must verify their identity before their shop can go live.
          Please provide the following legal documents.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Account Type Selection */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">1. Seller Type</h3>
          <div className="flex gap-4">
            <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
              accountType === 'individual' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:bg-surface-container'
            }`}>
              <input 
                type="radio" 
                name="accountType" 
                value="individual" 
                checked={accountType === 'individual'} 
                onChange={(e) => setAccountType(e.target.value)}
                className="text-primary focus:ring-primary"
              />
              <div>
                <span className="font-semibold text-foreground block">Individual / Personal</span>
                <span className="text-xs text-on-surface-variant">I am selling as an individual (NID required)</span>
              </div>
            </label>
            <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
              accountType === 'business' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:bg-surface-container'
            }`}>
              <input 
                type="radio" 
                name="accountType" 
                value="business" 
                checked={accountType === 'business'} 
                onChange={(e) => setAccountType(e.target.value)}
                className="text-primary focus:ring-primary"
              />
              <div>
                <span className="font-semibold text-foreground block">Registered Business</span>
                <span className="text-xs text-on-surface-variant">I have a registered company (Trade License required)</span>
              </div>
            </label>
          </div>
        </div>

        {/* Identity Documents */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">2. Identity Documents</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">National ID (NID) or Passport *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center bg-surface hover:bg-surface-container transition-colors cursor-pointer">
                  <span className="text-2xl mb-2">🪪</span>
                  <p className="text-sm font-medium">Upload Front Side</p>
                  <p className="text-xs text-on-surface-variant mt-1">Max 5MB (JPG/PNG/PDF)</p>
                </div>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center bg-surface hover:bg-surface-container transition-colors cursor-pointer">
                  <span className="text-2xl mb-2">🪪</span>
                  <p className="text-sm font-medium">Upload Back Side</p>
                  <p className="text-xs text-on-surface-variant mt-1">Max 5MB (JPG/PNG/PDF)</p>
                </div>
              </div>
            </div>

            {accountType === 'business' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-on-surface mb-2">Valid Trade License *</label>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center bg-surface hover:bg-surface-container transition-colors cursor-pointer">
                  <span className="text-2xl mb-2">📄</span>
                  <p className="text-sm font-medium">Upload Trade License</p>
                  <p className="text-xs text-on-surface-variant mt-1">Must be valid for the current year (PDF/JPG)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">3. Payout Details</h3>
          <p className="text-sm text-on-surface-variant mb-5">Where should we send your earnings?</p>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">Bank Name / MFS (bKash/Nagad)</label>
              <select required className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select Bank / MFS</option>
                <option>bKash</option>
                <option>Nagad</option>
                <option>City Bank</option>
                <option>BRAC Bank</option>
                <option>Islami Bank</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Account Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Name on account" />
                {accountType === 'business' && (
                  <p className="text-xs text-on-surface-variant mt-1">Must match your Trade License name.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Account Number</label>
                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Account or Mobile Number" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-outline-variant">
          <button type="submit" className="px-8 py-3 rounded-lg bg-primary text-on-primary font-bold hover:bg-[#00513e] transition-colors shadow-lg">
            Submit for Verification
          </button>
        </div>

      </form>
    </div>
  );
}
