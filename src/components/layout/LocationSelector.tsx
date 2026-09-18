"use client";

import { useState, useRef, useEffect } from 'react';

export default function LocationSelector({ 
  variant = 'navbar' 
}: { 
  variant?: 'navbar' | 'searchbar' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All of Bangladesh');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locations = [
    'All of Bangladesh',
    // Dhaka Division
    'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail',
    // Chattogram Division
    'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chattogram', 'Comilla', "Cox's Bazar", 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati',
    // Rajshahi Division
    'Bogura', 'Joypurhat', 'Naogaon', 'Natore', 'Chapabawabganj', 'Pabna', 'Rajshahi', 'Sirajganj',
    // Khulna Division
    'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira',
    // Barishal Division
    'Barguna', 'Barishal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
    // Sylhet Division
    'Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet',
    // Rangpur Division
    'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon',
    // Mymensingh Division
    'Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (loc: string) => {
    setSelectedLocation(loc);
    setIsOpen(false);
  };

  if (variant === 'searchbar') {
    return (
      <div className="relative" ref={dropdownRef}>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex items-center gap-1 cursor-pointer hover:bg-surface-container px-2 py-1.5 rounded-lg transition-colors text-on-surface-variant whitespace-nowrap group"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">location_on</span>
          <span className="text-body-md font-bold group-hover:text-primary transition-colors">{selectedLocation}</span>
          <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">arrow_drop_down</span>
        </div>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-lg z-50 overflow-hidden py-2">
            <h3 className="px-4 py-2 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20 mb-1">Select City</h3>
            <div className="max-h-64 overflow-y-auto">
              {locations.map((loc) => (
                <div 
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className={`px-4 py-2 text-body-md cursor-pointer hover:bg-primary-container/20 transition-colors ${selectedLocation === loc ? 'text-primary font-bold bg-primary/5' : 'text-on-surface'}`}
                >
                  {loc}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Navbar variant
  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center text-white bg-white/12 hover:bg-white/20 px-3 py-1.5 h-10 rounded-full cursor-pointer transition-colors border border-white/25 gap-1.5 text-xs sm:text-[13px] font-bold select-none"
      >
        <span className="material-symbols-outlined text-[18px] text-[#D4AF37]">
          location_on
        </span>
        <span className="text-xs sm:text-[13px] font-bold text-white truncate max-w-[120px]">{selectedLocation}</span>
        <span className="material-symbols-outlined text-[16px] text-white/70">arrow_drop_down</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-lg z-50 overflow-hidden py-2">
          <h3 className="px-4 py-2 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20 mb-1">Select City</h3>
          <div className="max-h-64 overflow-y-auto">
            {locations.map((loc) => (
              <div 
                key={loc}
                onClick={() => handleSelect(loc)}
                className={`px-4 py-2 text-body-md cursor-pointer hover:bg-primary-container/20 transition-colors ${selectedLocation === loc ? 'text-primary font-bold bg-primary/5' : 'text-on-surface'}`}
              >
                {loc}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
