"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SellerRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    shopName: '',
    shopCategory: '',
    shopDescription: '',
    businessAddress: '',
    agreedToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    // Mock API Call here
    console.log("Submitting Seller Data:", formData);
    alert("Shop Created Successfully! Redirecting to dashboard...");
    router.push('/seller/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Start Selling with Stitch</h1>
        <p className="text-lg text-on-surface-variant">
          Reach thousands of customers. Open your shop today and start growing your business with zero upfront costs.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-outline-variant">
        
        {/* Stepper Header */}
        <div className="bg-surface-container px-8 py-6 border-b border-outline-variant">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step === item ? 'bg-primary text-on-primary ring-4 ring-primary-container' :
                  step > item ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'
                }`}>
                  {step > item ? '✓' : item}
                </div>
                <span className="text-xs mt-2 font-medium text-on-surface-variant hidden sm:block">
                  {item === 1 && 'Personal Info'}
                  {item === 2 && 'Shop Details'}
                  {item === 3 && 'Branding'}
                  {item === 4 && 'Finish'}
                </span>
              </div>
            ))}
          </div>
          {/* Progress Bar */}
          <div className="mt-4 h-2 w-full bg-surface-variant rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Full Name</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="+880 1XXXXXXXXX" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Shop Details */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6">Shop Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Shop Name</label>
                  <input required type="text" name="shopName" value={formData.shopName} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="e.g. Dream Fashion" />
                  <p className="text-xs text-on-surface-variant mt-1">This is how your shop will appear to buyers.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Primary Category</label>
                  <select required name="shopCategory" value={formData.shopCategory} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                    <option value="">Select a category</option>
                    <option value="clothing">Clothing & Fashion</option>
                    <option value="electronics">Electronics</option>
                    <option value="handicrafts">Handicrafts & Arts</option>
                    <option value="food">Groceries & Food</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Business Address</label>
                  <textarea required name="businessAddress" value={formData.businessAddress} onChange={handleChange} rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="123 Market Street, City, ZIP" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Branding */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6">Shop Branding</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Shop Logo (Optional)</label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface hover:bg-surface-container transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <p className="text-sm text-on-surface font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-on-surface-variant mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Shop Description</label>
                  <textarea name="shopDescription" value={formData.shopDescription} onChange={handleChange} rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="Tell your customers what your shop is about..." />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Finish */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary-container text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">You're almost there!</h2>
                <p className="text-on-surface-variant mt-2">Review your details and agree to our terms to open your shop.</p>
              </div>

              <div className="bg-surface-container rounded-xl p-5 mb-6 space-y-3 text-sm">
                <div className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-on-surface-variant">Shop Name:</span>
                  <span className="font-semibold text-foreground">{formData.shopName || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-on-surface-variant">Category:</span>
                  <span className="font-semibold text-foreground capitalize">{formData.shopCategory || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Contact:</span>
                  <span className="font-semibold text-foreground">{formData.email || 'N/A'}</span>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 border border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
                <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} className="mt-1 w-5 h-5 rounded text-primary focus:ring-primary" />
                <span className="text-sm text-on-surface-variant leading-relaxed">
                  I agree to the <Link href="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>. I understand that I am responsible for all products listed in my shop.
                </span>
              </label>
            </div>
          )}

          {/* Form Actions */}
          <div className="mt-10 pt-6 border-t border-outline-variant flex items-center justify-between">
            {step > 1 ? (
              <button type="button" onClick={prevStep}
                className="px-6 py-2.5 rounded-lg border border-outline-variant text-on-surface font-medium hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
                Back
              </button>
            ) : <div></div>}
            
            {step < 4 ? (
              <button type="button" onClick={nextStep}
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Continue
              </button>
            ) : (
              <button type="submit" disabled={!formData.agreedToTerms}
                className={`px-8 py-3 rounded-lg font-bold text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  formData.agreedToTerms ? 'bg-primary hover:bg-[#00513e] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' : 'bg-outline-variant cursor-not-allowed'
                }`}>
                Create My Shop
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
