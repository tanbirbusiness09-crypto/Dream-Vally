'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Users, 
  Bookmark, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { JobItem } from '@/lib/jobsData';

interface JobCardProps {
  job: JobItem;
  isSaved: boolean;
  isApplied: boolean;
  onSelect: (job: JobItem) => void;
  onToggleSave: (jobId: string, e: React.MouseEvent) => void;
  onEasyApply: (job: JobItem, e: React.MouseEvent) => void;
}

export default function JobCard({
  job,
  isSaved,
  isApplied,
  onSelect,
  onToggleSave,
  onEasyApply,
}: JobCardProps) {
  return (
    <div
      onClick={() => onSelect(job)}
      className="group bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/85 dark:border-outline-variant/30 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 cursor-pointer relative"
    >
      {/* Featured / Hiring Badge */}
      {job.featuredBadge && (
        <div className="absolute top-3 right-3 sm:right-4 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
          <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
          {job.featuredBadge}
        </div>
      )}

      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Company Avatar */}
        <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-gray-100 dark:border-outline-variant/40 bg-gray-50 dark:bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
          <Image
            src={job.company.logo}
            alt={job.company.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>

        {/* Core Job Details */}
        <div className="flex-1 min-w-0 pr-16 sm:pr-24">
          {/* Job Title */}
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {job.title}
          </h3>

          {/* Company Name & Verification */}
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 font-medium mt-0.5">
            <span className="font-semibold text-gray-800 dark:text-gray-200">{job.company.name}</span>
            {job.company.verified && (
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 inline-block" />
            )}
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-gray-500 dark:text-gray-400">{job.company.industry}</span>
          </div>

          {/* Location & Work Mode Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {job.location}
            </span>
            <span className="bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-gray-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
              {job.workMode}
            </span>
            <span className="bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-gray-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
              {job.jobType}
            </span>
          </div>

          {/* Salary Badge */}
          <div className="mt-2.5">
            <span className="inline-block text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
              💰 {job.salary}
            </span>
          </div>

          {/* Skills Match Indicator */}
          {job.skillsMatched && job.skillsMatched.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                Your profile matches:
              </span>
              {job.skillsMatched.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-medium bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/40"
                >
                  {skill}
                </span>
              ))}
              {job.skillsMatched.length > 3 && (
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                  +{job.skillsMatched.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Bottom Social Proof & Applicant Stats */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-outline-variant/30 text-[11px] text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              {job.postedTime}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-gray-400" />
              {job.applicantsCount} applicants
            </span>
            {job.connectionsCount && (
              <span className="text-blue-600 dark:text-blue-400 font-medium hidden sm:inline-flex items-center gap-1">
                • {job.connectionsCount} connections work here
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons (Bottom / Mobile Responsive) */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-outline-variant/20">
        <div className="flex items-center gap-2">
          {isApplied ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Applied
            </span>
          ) : job.easyApply ? (
            <button
              onClick={(e) => onEasyApply(job, e)}
              type="button"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              Easy Apply
            </button>
          ) : (
            <button
              onClick={() => onSelect(job)}
              type="button"
              className="inline-flex items-center gap-1 bg-gray-100 dark:bg-surface-container hover:bg-gray-200 text-gray-800 dark:text-gray-200 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all"
            >
              View Role
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => onSelect(job)}
            type="button"
            className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-2 py-1 rounded-lg transition-colors hidden sm:inline-block"
          >
            Details
          </button>
        </div>

        {/* Save / Bookmark Button */}
        <button
          onClick={(e) => onToggleSave(job.id, e)}
          type="button"
          title={isSaved ? "Saved" : "Save Job"}
          className={`p-2 rounded-xl border transition-all ${
            isSaved
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 shadow-sm'
              : 'bg-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-gray-200/80 dark:border-outline-variant/40 hover:border-gray-300'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 dark:fill-emerald-400' : ''}`} />
        </button>
      </div>
    </div>
  );
}
