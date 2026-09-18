'use client';

import React from 'react';
import Image from 'next/image';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  Users, 
  Bookmark, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  DollarSign, 
  Share2, 
  Check, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { JobItem } from '@/lib/jobsData';

interface JobDetailModalProps {
  job: JobItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  isApplied: boolean;
  onToggleSave: (jobId: string) => void;
  onEasyApply: (job: JobItem) => void;
}

export default function JobDetailModal({
  job,
  isOpen,
  onClose,
  isSaved,
  isApplied,
  onToggleSave,
  onEasyApply,
}: JobDetailModalProps) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200 dark:border-outline-variant/40 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Close */}
        <div className="relative p-5 sm:p-6 border-b border-gray-100 dark:border-outline-variant/30 flex items-start justify-between gap-4 bg-gray-50/50 dark:bg-surface-container/30">
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border border-gray-200/80 dark:border-outline-variant/40 bg-white dark:bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src={job.company.logo}
                alt={job.company.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 mt-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{job.company.name}</span>
                {job.company.verified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                )}
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span>{job.location}</span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{job.workMode}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 mt-2">
                <span>{job.postedTime}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{job.applicantsCount} applicants</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-surface-container text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Header Ribbon */}
        <div className="px-5 sm:px-6 py-3.5 bg-white dark:bg-surface-container-low border-b border-gray-100 dark:border-outline-variant/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {isApplied ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Application Submitted
              </span>
            ) : (
              <button
                onClick={() => onEasyApply(job)}
                type="button"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                {job.easyApply ? 'Easy Apply' : 'Apply on Company Site'}
              </button>
            )}

            <button
              onClick={() => onToggleSave(job.id)}
              type="button"
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-surface-container text-gray-700 dark:text-gray-300 border-gray-200 dark:border-outline-variant/40 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Job link copied to clipboard!");
              }
            }}
            type="button"
            className="p-2.5 rounded-xl border border-gray-200 dark:border-outline-variant/40 hover:bg-gray-50 dark:hover:bg-surface-container text-gray-500 dark:text-gray-300 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Key Job Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 dark:bg-surface-container p-3 rounded-xl border border-gray-100 dark:border-outline-variant/20">
              <span className="text-[10px] uppercase font-bold text-gray-400">Salary</span>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">{job.salary}</p>
            </div>
            <div className="bg-gray-50 dark:bg-surface-container p-3 rounded-xl border border-gray-100 dark:border-outline-variant/20">
              <span className="text-[10px] uppercase font-bold text-gray-400">Job Type</span>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">{job.jobType}</p>
            </div>
            <div className="bg-gray-50 dark:bg-surface-container p-3 rounded-xl border border-gray-100 dark:border-outline-variant/20">
              <span className="text-[10px] uppercase font-bold text-gray-400">Experience</span>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">{job.experienceLevel}</p>
            </div>
            <div className="bg-gray-50 dark:bg-surface-container p-3 rounded-xl border border-gray-100 dark:border-outline-variant/20">
              <span className="text-[10px] uppercase font-bold text-gray-400">Workplace</span>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">{job.workMode}</p>
            </div>
          </div>

          {/* Recruiter Card */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-emerald-300 dark:border-emerald-800 flex-shrink-0">
                <Image
                  src={job.recruiter.avatar}
                  alt={job.recruiter.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">Hiring Team</span>
                <p className="text-xs font-bold text-gray-900 dark:text-white">{job.recruiter.name}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{job.recruiter.title}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">⚡ {job.recruiter.responseTime}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Direct message dialog opened for ${job.recruiter.name}`)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-surface-container text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Message
            </button>
          </div>

          {/* About the Job */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">About the Role</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Qualifications */}
          {job.requirements && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Requirements & Qualifications</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0 stroke-[2.5]" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits & Perks */}
          {job.benefits && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Benefits & Perks</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* About Company */}
          <div className="pt-4 border-t border-gray-100 dark:border-outline-variant/30">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">About {job.company.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {job.company.followers} • {job.company.size} • {job.company.industry}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
