'use client';

import React, { useState, useMemo } from 'react';
import { TALENT_PROFILES, TalentProfile } from '@/lib/talentData';
import TalentCard from '@/components/jobs/TalentCard';
import TalentDetailModal from '@/components/jobs/TalentDetailModal';
import HireCandidateModal from '@/components/jobs/HireCandidateModal';
import TalentFilterBar from '@/components/jobs/TalentFilterBar';
import { 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Zap, 
  Heart, 
  FilterX, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';

export default function JobsPage() {
  // Profiles Data with live state for Likes
  const [talents, setTalents] = useState<TalentProfile[]>(TALENT_PROFILES);

  // Search, Filter & Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('loved');

  // Modals state
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number; scaleX: number; scaleY: number } | null>(null);

  // Helper to calculate exact viewport-relative delta and scale from clicked button
  const calculateOrigin = (e?: React.MouseEvent, targetModalWidth = 768, targetModalHeight = 650) => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 250, scaleX: 0.15, scaleY: 0.08 };
    }
    if (e && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const deltaX = btnCenterX - vw / 2;
      const deltaY = btnCenterY - vh / 2;
      const modalW = Math.min(vw * 0.92, targetModalWidth);
      const modalH = Math.min(vh * 0.88, targetModalHeight);
      const scaleX = Math.max(0.08, Math.min(0.45, rect.width / modalW));
      const scaleY = Math.max(0.04, Math.min(0.35, rect.height / modalH));
      return {
        x: Math.round(deltaX),
        y: Math.round(deltaY),
        scaleX: Number(scaleX.toFixed(3)),
        scaleY: Number(scaleY.toFixed(3)),
      };
    }
    return { x: 0, y: 250, scaleX: 0.15, scaleY: 0.08 };
  };

  // Handle Giving Love (Like ❤️)
  const handleToggleLike = (talentId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTalents((prev) =>
      prev.map((item) => {
        if (item.id === talentId) {
          const wasLiked = !!item.isLiked;
          return {
            ...item,
            isLiked: !wasLiked,
            likesCount: wasLiked ? item.likesCount - 1 : item.likesCount + 1,
          };
        }
        return item;
      })
    );
  };

  // Open Full Profile View Modal with origin
  const handleViewProfile = (talent: TalentProfile, e?: React.MouseEvent) => {
    const origin = calculateOrigin(e, 768, 650);
    setClickOrigin(origin);
    setSelectedTalent(talent);
    setIsDetailModalOpen(true);
  };

  // Open Hire Inquiry Modal with origin
  const handleOpenHire = (talent: TalentProfile, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const origin = calculateOrigin(e, 512, 580);
    setClickOrigin(origin);
    setSelectedTalent(talent);
    setIsDetailModalOpen(false);
    setIsHireModalOpen(true);
  };

  // Filter & Search Logic
  const filteredTalents = useMemo(() => {
    let list = [...talents];

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.headline.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Category Filter
    if (activeCategory === 'immediate') {
      list = list.filter((t) => t.availability.toLowerCase().includes('immediate'));
    } else if (activeCategory === 'loved') {
      list = list.filter((t) => t.likesCount >= 200);
    } else if (activeCategory !== 'all') {
      list = list.filter((t) => t.category === activeCategory);
    }

    // Sorting
    if (sortBy === 'loved') {
      list.sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      list.sort((a, b) => b.experienceYears.localeCompare(a.experienceYears));
    }

    return list;
  }, [talents, searchQuery, activeCategory, sortBy]);

  // Active selected talent with current like state
  const currentSelectedTalent = useMemo(() => {
    if (!selectedTalent) return null;
    return talents.find((t) => t.id === selectedTalent.id) || selectedTalent;
  }, [talents, selectedTalent]);

  return (
    <main className="w-full min-h-screen bg-gray-50/60 dark:bg-[#07130e] text-gray-900 dark:text-gray-100 pb-24 transition-colors">
      
      {/* 1. Hero Header Section */}
      <section className="w-full bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white pt-12 pb-14 px-4 relative overflow-hidden">
        {/* Subtle background radial glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-emerald-200 border border-white/20 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Verified Professional Talent Marketplace
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Hire Top Talent & Verified Professionals
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Browse LinkedIn-style candidate profiles, give love ❤️, view complete work portfolios, and hire the top engineers, designers & marketers directly.
          </p>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>2,400+ Active Profiles</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Background Verified</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Direct Hire & No Middleman Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Candidate Directory Container */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Filter & Search Bar */}
        <TalentFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredTalents.length}
        />

        {/* Candidate Profiles Grid */}
        {filteredTalents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredTalents.map((talent) => (
              <TalentCard
                key={talent.id}
                talent={talent}
                isLiked={!!talent.isLiked}
                likesCount={talent.likesCount}
                onToggleLike={handleToggleLike}
                onViewProfile={handleViewProfile}
                onHire={handleOpenHire}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200 dark:border-outline-variant/30 p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-surface-container text-gray-400 flex items-center justify-center mx-auto">
              <FilterX className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              No candidates found matching your criteria
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Try adjusting your search terms, role keyword, or reset the filters to see all available talent.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* ================= MODALS ================= */}
      {/* 1. Full LinkedIn Candidate Profile Modal */}
      <TalentDetailModal
        talent={currentSelectedTalent}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isLiked={currentSelectedTalent ? !!currentSelectedTalent.isLiked : false}
        likesCount={currentSelectedTalent ? currentSelectedTalent.likesCount : 0}
        onToggleLike={handleToggleLike}
        origin={clickOrigin}
        onHire={(talent) => {
          setIsDetailModalOpen(false);
          setIsHireModalOpen(true);
        }}
      />

      {/* 2. Direct Hire Inquiry Modal */}
      <HireCandidateModal
        talent={currentSelectedTalent}
        isOpen={isHireModalOpen}
        origin={clickOrigin}
        onClose={() => setIsHireModalOpen(false)}
      />
    </main>
  );
}
