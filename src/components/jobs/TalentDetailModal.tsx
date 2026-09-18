'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  MapPin, 
  Star, 
  Heart, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  GraduationCap, 
  ExternalLink, 
  Globe, 
  Share2,
  CheckCircle2,
  Check
} from 'lucide-react';
import { TalentProfile } from '@/lib/talentData';

interface TalentDetailModalProps {
  talent: TalentProfile | null;
  isOpen: boolean;
  onClose: () => void;
  isLiked: boolean;
  likesCount: number;
  onToggleLike: (talentId: string, e: React.MouseEvent) => void;
  onHire: (talent: TalentProfile) => void;
  origin?: { x: number; y: number; scaleX: number; scaleY: number } | null;
}

export default function TalentDetailModal({
  talent,
  isOpen,
  onClose,
  isLiked,
  likesCount,
  onToggleLike,
  onHire,
  origin,
}: TalentDetailModalProps) {
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

  const handleHireClick = () => {
    if (!talent) return;
    setIsClosing(true);
    setTimeout(() => {
      onHire(talent);
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

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 overflow-hidden ${
        isClosing ? 'animate-mac-backdrop-out' : 'animate-mac-backdrop-in'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-3xl bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200 dark:border-outline-variant/40 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col ${
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
        {/* macOS Window Controls (Red / Yellow / Green) */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <button 
            type="button" 
            onClick={handleClose} 
            aria-label="Close" 
            className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 flex items-center justify-center group/dot transition-transform active:scale-90"
            title="Close"
          >
            <X className="w-2 h-2 text-black/70 opacity-0 group-hover/dot:opacity-100 transition-opacity" />
          </button>
          <button 
            type="button" 
            onClick={handleClose} 
            aria-label="Minimize" 
            className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-transform active:scale-90"
            title="Minimize" 
          />
          <span className="w-3 h-3 rounded-full bg-[#27C93F]" title="Maximize" />
        </div>

        {/* Modal Close Button (Top Right) */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Cover Photo & Profile Banner */}
        <div className="relative h-44 sm:h-52 w-full bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 flex-shrink-0">
          <Image
            src={talent.coverImage}
            alt={talent.name}
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

          {/* Availability badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {talent.availability} • {talent.workPreference}
          </div>
        </div>

        {/* 2. Candidate Identity Header */}
        <div className="px-6 pb-5 pt-0 relative border-b border-gray-100 dark:border-outline-variant/30 flex-shrink-0 bg-white dark:bg-surface-container-low">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 mb-4 gap-4">
            {/* Avatar */}
            <div className="relative self-start">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-3xl border-4 border-white dark:border-surface-container-low shadow-xl overflow-hidden bg-gray-100 dark:bg-surface-container ring-4 ring-emerald-500/80">
                <Image
                  src={talent.avatar}
                  alt={talent.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              {talent.isOpenToWork && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-white dark:border-gray-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" /> Open to Work
                </span>
              )}
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              {/* Love / Like button */}
              <button
                onClick={(e) => onToggleLike(talent.id, e)}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                  isLiked
                    ? 'bg-red-500 text-white border-red-500 shadow-sm'
                    : 'bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-gray-300 border-gray-200 dark:border-outline-variant/40 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : 'text-red-500'}`} />
                <span>{likesCount} Loves</span>
              </button>

              {/* Hire button */}
              <button
                onClick={() => onHire(talent)}
                type="button"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-xl shadow-md transition-all"
              >
                <Briefcase className="w-4 h-4" />
                Hire {talent.name.split(' ')[0]}
              </button>
            </div>
          </div>

          {/* Name & Headline */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {talent.name}
              </h2>
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              {talent.title}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
              {talent.headline}
            </p>

            {/* Quick Meta Row */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {talent.location}
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {talent.rating} Rating ({talent.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                💰 {talent.rateOrSalary}
              </span>
              <span>
                🏆 {talent.completedProjects}+ Projects Completed
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-outline-variant/30">
              {talent.portfolioUrl && (
                <a
                  href={talent.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" /> Portfolio
                </a>
              )}
              {talent.githubUrl && (
                <a
                  href={talent.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              )}
              {talent.linkedinUrl && (
                <a
                  href={talent.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.55a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 3. Scrollable Profile Details */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* About Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
              About
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {talent.about}
            </p>
          </div>

          {/* Skills Grid */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2.5">
              Verified Skills & Endorsements
            </h3>
            <div className="flex flex-wrap gap-2">
              {talent.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40"
                >
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Work Experience
            </h3>
            <div className="space-y-4">
              {talent.workHistory.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-surface-container border border-gray-100 dark:border-outline-variant/30 space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                      {item.role}
                    </h4>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.company}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Education
            </h3>
            <div className="space-y-3">
              {talent.education.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-surface-container border border-gray-100 dark:border-outline-variant/20">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{edu.institution}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Bottom Sticky Action Bar */}
        <div className="p-4 bg-gray-50 dark:bg-surface-container/60 border-t border-gray-100 dark:border-outline-variant/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Interested in hiring?</span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">{talent.rateOrSalary}</span>
          </div>

          <button
            onClick={handleHireClick}
            type="button"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Briefcase className="w-4 h-4" />
            Hire {talent.name}
          </button>
        </div>
      </div>
    </div>
  );
}
