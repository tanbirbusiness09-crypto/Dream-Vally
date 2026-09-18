"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function PostMatrimonyProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Form State
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 4;

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Basic validation before going to next step
    const form = document.getElementById('matrimony-form') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setErrorMsg("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!photoPreview) {
      setErrorMsg("Please upload at least one photo before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Profile Created Successfully!");
      window.location.href = '/matrimony';
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#064e3b] dark:text-[#D4AF37] font-serif mb-2">Create Your Matrimony Profile</h1>
          <p className="text-on-surface-variant">Take the first step towards finding your perfect life partner.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 relative">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <span key={step} className={`text-xs font-bold ${currentStep >= step ? 'text-[#064e3b] dark:text-[#D4AF37]' : 'text-outline-variant'}`}>
                Step {step}
              </span>
            ))}
          </div>
          <div className="w-full bg-surface-variant rounded-full h-2">
            <div 
              className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-surface rounded-2xl shadow-lg border border-outline-variant/30 p-6 md:p-10">
          <form id="matrimony-form" onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
            
            {/* STEP 1: Personal Details */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-[#064e3b] dark:text-[#D4AF37] border-b border-outline-variant/20 pb-3 mb-6">Personal Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Full Name</label>
                    <input type="text" required placeholder="e.g. Farhan Ahmed" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Gender</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all">
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Date of Birth</label>
                    <input type="date" required className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Height</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all">
                      <option value="">Select Height</option>
                      <option>5' 0"</option><option>5' 1"</option><option>5' 2"</option>
                      <option>5' 3"</option><option>5' 4"</option><option>5' 5"</option>
                      <option>5' 6"</option><option>5' 7"</option><option>5' 8"</option>
                      <option>5' 9"</option><option>5' 10"</option><option>5' 11"</option>
                      <option>6' 0"</option><option>6' 1"</option><option>6' 2"+</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-on-surface mb-2">Marital Status</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all">
                      <option value="">Select Status</option>
                      <option>Never Married</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Background */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-[#064e3b] dark:text-[#D4AF37] border-b border-outline-variant/20 pb-3 mb-6">Education, Career & Background</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Highest Education</label>
                    <input type="text" required placeholder="e.g. BSc in Computer Science" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Profession / Occupation</label>
                    <input type="text" required placeholder="e.g. Software Engineer" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Religion</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all">
                      <option value="">Select Religion</option>
                      <option>Islam</option><option>Hinduism</option><option>Christianity</option><option>Buddhism</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Sect / Caste (Optional)</label>
                    <input type="text" placeholder="e.g. Sunni, Syed, etc." className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Monthly Income (Optional)</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all">
                      <option value="">Select Range</option>
                      <option>Below 30,000 BDT</option><option>30,000 - 50,000 BDT</option>
                      <option>50,000 - 100,000 BDT</option><option>Above 100,000 BDT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Current City</label>
                    <input type="text" required placeholder="e.g. Dhaka" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Family & Preferences */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-[#064e3b] dark:text-[#D4AF37] border-b border-outline-variant/20 pb-3 mb-6">Family & Partner Preferences</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-2">Family Type</label>
                      <select required className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all">
                        <option value="">Select Type</option>
                        <option>Nuclear Family</option>
                        <option>Joint Family</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-2">Father's Occupation</label>
                      <input type="text" placeholder="e.g. Businessman, Retired Govt Officer" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">About Me (Bio)</label>
                    <textarea required rows={4} placeholder="Write a few lines about your personality, hobbies, and values..." className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all resize-none"></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Partner Preferences</label>
                    <textarea required rows={3} placeholder="What kind of partner are you looking for? (e.g. age range, education, personality traits)" className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-[#064e3b]/30 focus:border-[#064e3b] outline-none transition-all resize-none"></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Photos */}
            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-[#064e3b] dark:text-[#D4AF37] border-b border-outline-variant/20 pb-3 mb-6">Profile Photos</h2>
                
                <p className="text-sm text-on-surface-variant mb-6">
                  Profiles with photos get up to 10x more responses. Upload at least one recent, clear photo. 
                </p>

                {errorMsg && (
                  <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span> {errorMsg}
                  </div>
                )}

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload}
                />

                {!photoPreview ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-[#064e3b]/30 rounded-2xl flex flex-col items-center justify-center bg-[#064e3b]/5 hover:bg-[#064e3b]/10 transition-colors cursor-pointer group mb-4"
                  >
                    <span className="material-symbols-outlined text-[40px] text-[#064e3b]/50 group-hover:text-[#064e3b] transition-colors mb-2">add_photo_alternate</span>
                    <span className="text-[#064e3b] font-bold">Click to Upload Photos</span>
                    <span className="text-xs text-on-surface-variant mt-1">JPG, PNG (Max 5MB)</span>
                  </div>
                ) : (
                  <div className="relative w-full md:w-64 h-64 rounded-2xl overflow-hidden shadow-md mb-4 group">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined">delete</span> Remove
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="bg-surface-container-high p-4 rounded-xl flex gap-3 items-start">
                  <span className="material-symbols-outlined text-[#D4AF37]">security</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    <strong>Privacy & Security:</strong> Your photos are safe with us. We use advanced security measures to protect your privacy. Only verified users can view full-size images.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex items-center justify-between border-t border-outline-variant/20 pt-6">
              {currentStep > 1 ? (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl font-bold text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
                </button>
              ) : (
                <div></div> // Empty div for flex spacing
              )}

              {currentStep < totalSteps ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl font-bold text-black bg-[#D4AF37] hover:bg-yellow-500 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                >
                  Next Step <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl font-bold text-white bg-[#064e3b] hover:bg-[#064e3b]/90 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 border border-transparent hover:border-[#D4AF37]/50 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">sync</span> Submitting...
                    </>
                  ) : (
                    <>
                       Submit Profile <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
