'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Briefcase, 
  CheckCircle2, 
  Send, 
  Building2, 
  DollarSign, 
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { TalentProfile } from '@/lib/talentData';

interface HireCandidateModalProps {
  talent: TalentProfile | null;
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number; scaleX: number; scaleY: number } | null;
}

export default function HireCandidateModal({
  talent,
  isOpen,
  onClose,
  origin,
}: HireCandidateModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [engagementType, setEngagementType] = useState<'fulltime' | 'contract' | 'freelance'>('fulltime');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
    } else if (isRendered) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRendered && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRendered, isClosing]);

  if (!isRendered || !talent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
      }, 2000);
    }, 800);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 overflow-hidden ${
        isClosing ? 'animate-mac-backdrop-out' : 'animate-mac-backdrop-in'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-lg bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200 dark:border-outline-variant/40 shadow-2xl overflow-hidden my-6 ${
          isClosing ? 'animate-mac-close' : 'animate-mac-open'
        }`}
        style={{
          '--origin-x': `${origin?.x ?? 0}px`,
          '--origin-y': `${origin?.y ?? 250}px`,
          '--origin-scale-x': origin?.scaleX ?? 0.15,
          '--origin-scale-y': origin?.scaleY ?? 0.08,
        } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with macOS Window Controls */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-outline-variant/30 flex items-center justify-between bg-gray-50/70 dark:bg-surface-container/30">
          <div className="flex items-center gap-3">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5 mr-1">
              <button 
                type="button" 
                onClick={handleClose} 
                className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 flex items-center justify-center group/dot transition-transform active:scale-90"
                title="Close"
              >
                <X className="w-2 h-2 text-black/70 opacity-0 group-hover/dot:opacity-100 transition-opacity" />
              </button>
              <button 
                type="button" 
                onClick={handleClose} 
                className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-transform active:scale-90"
                title="Minimize" 
              />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" title="Maximize" />
            </div>

            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Hire Inquiry for {talent.name}
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{talent.title}</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-surface-container text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Hire Offer Dispatched!
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
              Your inquiry has been sent directly to <strong>{talent.name}</strong>. You will receive an SMS and email notification once they review your offer.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" /> Direct Candidate Connection
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Candidate Mini Card */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-surface-container rounded-2xl border border-gray-100 dark:border-outline-variant/30">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white shadow-sm flex-shrink-0">
                <Image
                  src={talent.avatar}
                  alt={talent.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{talent.name}</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{talent.rateOrSalary} • {talent.workPreference}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Tech Ltd"
                  className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2.5 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Your Name / Recruiter
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2.5 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2.5 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1700-000000"
                  className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2.5 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Engagement Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Engagement Model
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fulltime', label: 'Full-Time' },
                  { id: 'contract', label: 'Contract / Project' },
                  { id: 'freelance', label: 'Freelance / Part-time' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEngagementType(item.id as any)}
                    className={`py-2 px-1 text-center text-xs font-bold rounded-xl border transition-all ${
                      engagementType === item.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500 shadow-sm'
                        : 'bg-gray-50 dark:bg-surface-container text-gray-600 dark:text-gray-300 border-gray-200 dark:border-outline-variant/30 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Offered Compensation */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Proposed Compensation / Budget (BDT or USD)
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={`Expected: ${talent.rateOrSalary} (or your custom offer)`}
                className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2.5 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Message / Project details */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Role Details & Project Requirements
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project, role responsibilities, tech stack, and expected start timeline..."
                className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl p-3 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <span>Sending Offer...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Hire Offer to {talent.name.split(' ')[0]}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
