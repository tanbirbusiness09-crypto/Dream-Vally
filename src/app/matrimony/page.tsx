"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Search,
  Filter,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Globe2,
  Users,
  ChevronDown,
  X,
  UserPlus,
  SlidersHorizontal,
} from "lucide-react";
import MatrimonyHero from "@/components/matrimony/MatrimonyHero";
import MatrimonyProfileCard from "@/components/matrimony/MatrimonyProfileCard";
import BiodataModal from "@/components/matrimony/BiodataModal";
import MatrimonyTrustAndHowItWorks from "@/components/matrimony/MatrimonyTrustAndHowItWorks";
import { MATRIMONY_PROFILES, type MatrimonyProfile } from "@/lib/matrimonyData";

export default function MatrimonyPage() {
  // Main Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [lookingFor, setLookingFor] = useState<"all" | "bride" | "groom">("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [selectedReligion, setSelectedReligion] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedProfession, setSelectedProfession] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [ksaExpatOnly, setKsaExpatOnly] = useState(false);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"recommended" | "age-asc" | "age-desc" | "newest">("recommended");

  // Interaction States
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  const [interestSentIds, setInterestSentIds] = useState<string[]>([]);
  const [activeBiodata, setActiveBiodata] = useState<MatrimonyProfile | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle Shortlist/Favorite
  const handleToggleFavorite = (id: string) => {
    setFavoritedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Send Direct Interest with Feedback
  const handleSendInterest = (id: string) => {
    if (!interestSentIds.includes(id)) {
      setInterestSentIds((prev) => [...prev, id]);
    }
  };

  // Reset All Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setLookingFor("all");
    setSelectedAgeRange("all");
    setSelectedReligion("all");
    setSelectedDistrict("all");
    setSelectedProfession("all");
    setVerifiedOnly(false);
    setKsaExpatOnly(false);
    setSelectedMaritalStatus("all");
    setSortBy("recommended");
  };

  // Filtered & Sorted Profiles List
  const filteredProfiles = useMemo(() => {
    return MATRIMONY_PROFILES.filter((profile) => {
      // 1. Search Query (Name, ID, Profession, Location)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = profile.name.toLowerCase().includes(q);
        const matchCode = profile.code.toLowerCase().includes(q);
        const matchProf = profile.profession.toLowerCase().includes(q);
        const matchLoc = profile.location.toLowerCase().includes(q);
        const matchDist = profile.district.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchProf && !matchLoc && !matchDist) {
          return false;
        }
      }

      // 2. Gender / Looking For
      if (lookingFor !== "all" && profile.gender !== lookingFor) {
        return false;
      }

      // 3. Age Range
      if (selectedAgeRange !== "all") {
        if (selectedAgeRange === "18-25" && (profile.age < 18 || profile.age > 25)) return false;
        if (selectedAgeRange === "26-30" && (profile.age < 26 || profile.age > 30)) return false;
        if (selectedAgeRange === "31-35" && (profile.age < 31 || profile.age > 35)) return false;
        if (selectedAgeRange === "36+" && profile.age < 36) return false;
      }

      // 4. Religion
      if (selectedReligion !== "all" && profile.religion !== selectedReligion) {
        return false;
      }

      // 5. District / Expat City
      if (selectedDistrict !== "all") {
        if (selectedDistrict === "Saudi Arabia") {
          if (!profile.isKsaExpat) return false;
        } else {
          if (profile.district !== selectedDistrict && !profile.location.includes(selectedDistrict)) {
            return false;
          }
        }
      }

      // 6. Profession
      if (selectedProfession !== "all") {
        if (!profile.profession.toLowerCase().includes(selectedProfession.toLowerCase())) {
          return false;
        }
      }

      // 7. Verified Only
      if (verifiedOnly && !profile.verified) {
        return false;
      }

      // 8. KSA Expat Only
      if (ksaExpatOnly && !profile.isKsaExpat) {
        return false;
      }

      // 9. Marital Status
      if (selectedMaritalStatus !== "all" && profile.maritalStatus !== selectedMaritalStatus) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "age-asc") return a.age - b.age;
      if (sortBy === "age-desc") return b.age - a.age;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0; // Default recommended
    });
  }, [
    searchQuery,
    lookingFor,
    selectedAgeRange,
    selectedReligion,
    selectedDistrict,
    selectedProfession,
    verifiedOnly,
    ksaExpatOnly,
    selectedMaritalStatus,
    sortBy,
  ]);

  const activeFiltersCount = [
    lookingFor !== "all",
    selectedAgeRange !== "all",
    selectedReligion !== "all",
    selectedDistrict !== "all",
    selectedProfession !== "all",
    verifiedOnly,
    ksaExpatOnly,
    selectedMaritalStatus !== "all",
    searchQuery.trim() !== "",
  ].filter(Boolean).length;

  return (
    <main className="w-full min-h-screen bg-[#fafcfb] dark:bg-background flex flex-col">
      
      {/* 1. HERO SECTION WITH FLOATING QUICK MATCHMAKER WIDGET */}
      <MatrimonyHero
        lookingFor={lookingFor}
        setLookingFor={setLookingFor}
        selectedAgeRange={selectedAgeRange}
        setSelectedAgeRange={setSelectedAgeRange}
        selectedReligion={selectedReligion}
        setSelectedReligion={setSelectedReligion}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        onSearch={() => {
          const listElement = document.getElementById("profiles-section");
          if (listElement) listElement.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. MAIN PROFILES DIRECTORY & FILTERING SECTION */}
      <section id="profiles-section" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setLookingFor("all");
              setKsaExpatOnly(false);
              setSelectedProfession("all");
              setVerifiedOnly(false);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              lookingFor === "all" && !ksaExpatOnly && selectedProfession === "all" && !verifiedOnly
                ? "bg-[#064e3b] text-white shadow-xs"
                : "bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#00895e]"
            }`}
          >
            All Profiles (সকল বায়োডাটা)
          </button>

          <button
            type="button"
            onClick={() => setLookingFor("bride")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              lookingFor === "bride"
                ? "bg-[#064e3b] text-white shadow-xs"
                : "bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#00895e]"
            }`}
          >
            👰 Brides (পাত্রী)
          </button>

          <button
            type="button"
            onClick={() => setLookingFor("groom")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              lookingFor === "groom"
                ? "bg-[#064e3b] text-white shadow-xs"
                : "bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#00895e]"
            }`}
          >
            🤵 Grooms (পাত্র)
          </button>

          <button
            type="button"
            onClick={() => {
              setKsaExpatOnly(true);
              setSelectedProfession("all");
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              ksaExpatOnly
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-amber-500"
            }`}
          >
            🇸🇦 Saudi Arabia Expats (কেএসএ প্রবাসী)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedProfession("Doctor");
              setKsaExpatOnly(false);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedProfession === "Doctor"
                ? "bg-[#064e3b] text-white shadow-xs"
                : "bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#00895e]"
            }`}
          >
            🩺 Doctors & Medical
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedProfession("Engineer");
              setKsaExpatOnly(false);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedProfession === "Engineer"
                ? "bg-[#064e3b] text-white shadow-xs"
                : "bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#00895e]"
            }`}
          >
            💻 Engineers & IT
          </button>

          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              verifiedOnly
                ? "bg-[#064e3b] text-white shadow-xs"
                : "bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#00895e]"
            }`}
          >
            🛡️ 100% Verified Only
          </button>
        </div>

        {/* 2-Column Layout: Filter Sidebar (Left) & Profiles Grid (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Comprehensive Filter Sidebar                                 */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
            <div className="rounded-3xl bg-white dark:bg-surface-container-low border border-gray-200/80 dark:border-white/10 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#00895e] dark:text-emerald-400" />
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Refine Biodatas
                  </h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Keyword & Profile ID Search */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Search by Keyword / ID
                </label>
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Doctor, BUET, DV-B204..."
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Gender Radio */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Looking For (প্রার্থী)
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 dark:bg-white/5 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setLookingFor("all")}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      lookingFor === "all" ? "bg-white dark:bg-surface-container text-[#00895e] shadow-xs" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setLookingFor("bride")}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      lookingFor === "bride" ? "bg-white dark:bg-surface-container text-[#00895e] shadow-xs" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Bride
                  </button>
                  <button
                    type="button"
                    onClick={() => setLookingFor("groom")}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      lookingFor === "groom" ? "bg-white dark:bg-surface-container text-[#00895e] shadow-xs" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Groom
                  </button>
                </div>
              </div>

              {/* Age Range Select */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Age Range (বয়সসীমা)
                </label>
                <select
                  value={selectedAgeRange}
                  onChange={(e) => setSelectedAgeRange(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                >
                  <option value="all">Any Age</option>
                  <option value="18-25">18 - 25 Years</option>
                  <option value="26-30">26 - 30 Years</option>
                  <option value="31-35">31 - 35 Years</option>
                  <option value="36+">36+ Years</option>
                </select>
              </div>

              {/* Profession Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Profession (পেশা)
                </label>
                <select
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                >
                  <option value="all">All Professions</option>
                  <option value="Doctor">Doctor / Physician</option>
                  <option value="Engineer">Engineer / Software</option>
                  <option value="Banker">Banker / Finance</option>
                  <option value="Teacher">Lecturer / Teacher</option>
                  <option value="Business">Business / Entrepreneur</option>
                  <option value="Architect">Architect / Design</option>
                </select>
              </div>

              {/* District / Expat City */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Location (জেলা / প্রবাস)
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                >
                  <option value="all">All Districts & Cities</option>
                  <option value="Dhaka">Dhaka (ঢাকা)</option>
                  <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Khulna">Khulna (খুলনা)</option>
                  <option value="Saudi Arabia">🇸🇦 Saudi Arabia Expatriate</option>
                </select>
              </div>

              {/* Marital Status */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Marital Status (বৈবাহিক অবস্থা)
                </label>
                <select
                  value={selectedMaritalStatus}
                  onChange={(e) => setSelectedMaritalStatus(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                >
                  <option value="all">Any Status</option>
                  <option value="Never Married">Never Married (অবিবাহিত)</option>
                  <option value="Divorced">Divorced (ডিভোর্সড)</option>
                  <option value="Widowed">Widowed (বিধবা/বিপত্নীক)</option>
                </select>
              </div>

              {/* Verified Toggle Checkbox */}
              <label className="flex items-center gap-2.5 pt-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#00895e] cursor-pointer"
                />
                <span>Only NID Verified Profiles</span>
              </label>

              {/* KSA Expat Toggle Checkbox */}
              <label className="flex items-center gap-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={ksaExpatOnly}
                  onChange={(e) => setKsaExpatOnly(e.target.checked)}
                  className="h-4 w-4 rounded accent-amber-600 cursor-pointer"
                />
                <span>Only Saudi Arabia Expats 🇸🇦</span>
              </label>

            </div>
          </aside>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Profile Feed Header & Cards Grid                            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-9 space-y-5">
            
            {/* Control Bar: Match count & Sort Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-surface-container-low border border-gray-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-sm text-gray-900 dark:text-white">
                  {filteredProfiles.length} Biodatas Found
                </span>
                {activeFiltersCount > 0 && (
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    {activeFiltersCount} Filters Active
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Drawer Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/10 text-xs font-bold text-gray-700 dark:text-gray-200"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filters ({activeFiltersCount})</span>
                </button>

                <label htmlFor="sort-select" className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                  Sort By:
                </label>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-3 pr-7 py-1.5 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00895e] cursor-pointer"
                  >
                    <option value="recommended">Recommended Matches</option>
                    <option value="newest">Newest Profiles</option>
                    <option value="age-asc">Age: Low to High</option>
                    <option value="age-desc">Age: High to Low</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Profiles Grid */}
            {filteredProfiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProfiles.map((profile) => (
                  <MatrimonyProfileCard
                    key={profile.id}
                    profile={profile}
                    isFavorited={favoritedIds.includes(profile.id)}
                    onToggleFavorite={handleToggleFavorite}
                    isInterestSent={interestSentIds.includes(profile.id)}
                    onSendInterest={handleSendInterest}
                    onViewBiodata={(p) => setActiveBiodata(p)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-surface-container-low border border-gray-200/80 dark:border-white/10 space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shadow-xs">
                  <Search className="h-8 w-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    No matching biodatas found
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Try broadening your age range, location, or clearing some of the selected filters.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="py-2 px-5 rounded-full bg-[#064e3b] hover:bg-[#00744f] text-white text-xs font-bold shadow-sm transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* 3. HOW IT WORKS, TRUST ARCHITECTURE & SUCCESS STORIES */}
      <MatrimonyTrustAndHowItWorks />

      {/* 4. INTERACTIVE DETAILED BIODATA MODAL */}
      <BiodataModal
        profile={activeBiodata}
        isOpen={activeBiodata !== null}
        onClose={() => setActiveBiodata(null)}
        isFavorited={activeBiodata ? favoritedIds.includes(activeBiodata.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isInterestSent={activeBiodata ? interestSentIds.includes(activeBiodata.id) : false}
        onSendInterest={handleSendInterest}
      />

      {/* Mobile Filter Sheet Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="w-full sm:max-w-md bg-white dark:bg-[#07241c] rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Filter Profiles</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Filters Content */}
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-gray-500 uppercase">Age Range</label>
                <select
                  value={selectedAgeRange}
                  onChange={(e) => setSelectedAgeRange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5"
                >
                  <option value="all">Any Age</option>
                  <option value="18-25">18 - 25 Years</option>
                  <option value="26-30">26 - 30 Years</option>
                  <option value="31-35">31 - 35 Years</option>
                  <option value="36+">36+ Years</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-500 uppercase">Location</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5"
                >
                  <option value="all">All Locations</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Saudi Arabia">🇸🇦 Saudi Arabia Expats</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-500 uppercase">Profession</label>
                <select
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5"
                >
                  <option value="all">All Professions</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Banker">Banker</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-1/2 py-2.5 rounded-xl border border-gray-300 font-bold"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#064e3b] text-white font-bold"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
