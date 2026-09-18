'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Zap, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { JobItem, CandidateProfile } from '@/lib/jobsData';

interface EasyApplyModalProps {
  job: JobItem | null;
  profile: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (jobId: string) => void;
}

export default function EasyApplyModal({
  job,
  profile,
  isOpen,
  onClose,
  onSubmitApplication,
}: EasyApplyModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phoneNumber, setPhoneNumber] = useState('+880 1712-345678');
  const [email, setEmail] = useState('shakil.ahmed@example.com');
  const [yearsExperience, setYearsExperience] = useState('4');
  const [expectedSalary, setExpectedSalary] = useState('1,35,000');
  const [noticePeriod, setNoticePeriod] = useState('Immediate / 15 Days');
  const [selectedResume, setSelectedResume] = useState<'default' | 'uploaded'>('default');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmitApplication(job.id);
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        onClose();
      }, 1800);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200 dark:border-outline-variant/40 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-outline-variant/30 flex items-center justify-between bg-gray-50/60 dark:bg-surface-container/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                Easy Apply to {job.company.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{job.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-surface-container text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        {!isSuccess && (
          <div className="px-5 py-2.5 bg-white dark:bg-surface-container-low border-b border-gray-100 dark:border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-gray-500">
            <span className={step >= 1 ? 'text-emerald-600 font-bold' : ''}>1. Contact Info</span>
            <span className="text-gray-300 dark:text-gray-600">➔</span>
            <span className={step >= 2 ? 'text-emerald-600 font-bold' : ''}>2. Resume & Questions</span>
            <span className="text-gray-300 dark:text-gray-600">➔</span>
            <span className={step >= 3 ? 'text-emerald-600 font-bold' : ''}>3. Review</span>
          </div>
        )}

        {/* Success Screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Application Submitted!
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
              Your profile and resume were sent directly to the hiring team at <strong>{job.company.name}</strong>.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" /> Added to your Applied Jobs list
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            {/* STEP 1: Contact Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-surface-container rounded-2xl border border-gray-100 dark:border-outline-variant/20">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{profile.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{profile.headline}</p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">📍 {profile.location}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-xs sm:text-sm bg-gray-50 dark:bg-surface-container rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Phone country code & mobile number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full text-xs sm:text-sm bg-gray-50 dark:bg-surface-container rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Resume & Screening Questions */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Select Resume
                  </label>
                  <div className="space-y-2">
                    <label 
                      onClick={() => setSelectedResume('default')}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        selectedResume === 'default'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-sm'
                          : 'bg-gray-50 dark:bg-surface-container border-gray-200 dark:border-outline-variant/30 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <p className="text-xs font-bold">Shakil_Ahmed_Resume_2026.pdf</p>
                          <p className="text-[10px] text-gray-400">Updated 4 days ago • 145 KB</p>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center">
                        {selectedResume === 'default' && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                      </span>
                    </label>

                    <label
                      onClick={() => setSelectedResume('uploaded')}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        selectedResume === 'uploaded'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-sm'
                          : 'bg-gray-50 dark:bg-surface-container border-gray-200 dark:border-outline-variant/30 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <UploadCloud className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs font-bold">Upload alternative resume</p>
                          <p className="text-[10px] text-gray-400">DOC, DOCX, PDF (Max 5MB)</p>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        {selectedResume === 'uploaded' && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Years of Relevant Experience
                    </label>
                    <input
                      type="text"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Notice Period
                    </label>
                    <input
                      type="text"
                      value={noticePeriod}
                      onChange={(e) => setNoticePeriod(e.target.value)}
                      className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Expected Monthly Salary (BDT)
                  </label>
                  <input
                    type="text"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(e.target.value)}
                    className="w-full text-xs bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2 border border-gray-200 dark:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-surface-container rounded-2xl p-4 border border-gray-100 dark:border-outline-variant/30 space-y-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Review Application Summary
                  </h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Applicant:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{profile.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{email}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{phoneNumber}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Experience:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{yearsExperience} years</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Expected CTC:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">৳{expectedSalary} / mo</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Resume:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedResume === 'default' ? 'Shakil_Ahmed_Resume_2026.pdf' : 'Uploaded File'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
                  By clicking Submit Application, your Dreamvally profile and resume will be shared directly with {job.company.name}.
                </p>
              </div>
            )}

            {/* Step Navigation Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-outline-variant/30">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-container transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s + 1) as 2 | 3)}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
