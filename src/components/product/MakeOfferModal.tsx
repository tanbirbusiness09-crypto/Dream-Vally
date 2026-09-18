'use client';

import React, { useState, useEffect } from 'react';
import { X, DollarSign, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { CatalogProduct } from '@/lib/catalogData';

interface MakeOfferModalProps {
  product: CatalogProduct;
  isOpen: boolean;
  onClose: () => void;
}

export default function MakeOfferModal({
  product,
  isOpen,
  onClose,
}: MakeOfferModalProps) {
  const [offerPrice, setOfferPrice] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [note, setNote] = useState('');
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
      }, 340);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 340);
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

  if (!isRendered) return null;

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
        className={`relative w-full max-w-md bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200 dark:border-outline-variant/40 shadow-2xl overflow-hidden my-6 ${
          isClosing ? 'animate-mac-close' : 'animate-mac-open'
        }`}
        style={{
          '--origin-x': '0px',
          '--origin-y': '200px',
          '--origin-scale-x': 0.2,
          '--origin-scale-y': 0.1,
        } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with macOS Window Controls */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-outline-variant/30 flex items-center justify-between bg-gray-50/70 dark:bg-surface-container/30">
          <div className="flex items-center gap-3">
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

            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Make an Offer
              </h3>
              <p className="text-[11px] text-gray-500 truncate max-w-[200px]">{product.title}</p>
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

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Offer Sent to Seller!
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
              <strong>{product.seller.name}</strong> will receive an SMS and app alert with your proposed price of <strong>৳ {offerPrice}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-surface-container border border-gray-100 dark:border-outline-variant/30 flex items-center justify-between text-xs">
              <span className="text-gray-500">Asking Price:</span>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-300">{product.price}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Your Offer Price (৳) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 125000"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 17..."
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Note to Seller (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="I am ready to buy today with cash payment..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl p-3 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending Offer...' : 'Send Offer to Seller'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
