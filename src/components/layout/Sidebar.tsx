import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden sticky top-[96px]">
        {/* Header */}
        <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant/30 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">tune</span>
          <h3 className="font-bold text-lg text-on-surface">Filters</h3>
        </div>

        <div className="p-5">
          {/* Condition Filter */}
          <div className="mb-8 border-b border-outline-variant/20 pb-6">
            <h4 className="font-bold text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">
              Condition
            </h4>
            <div className="flex flex-col gap-3">
              <label className="group flex items-center justify-between cursor-pointer p-2 -mx-2 rounded-lg hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border-2 border-outline rounded bg-surface checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                      defaultChecked
                    />
                    <span className="material-symbols-outlined absolute text-on-primary text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100 left-[2px] top-[2px]">
                      check
                    </span>
                  </div>
                  <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">
                    Used
                  </span>
                </div>
                <span className="text-label-sm bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant">
                  84
                </span>
              </label>
              <label className="group flex items-center justify-between cursor-pointer p-2 -mx-2 rounded-lg hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border-2 border-outline rounded bg-surface checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                      defaultChecked
                    />
                    <span className="material-symbols-outlined absolute text-on-primary text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100 left-[2px] top-[2px]">
                      check
                    </span>
                  </div>
                  <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">
                    New
                  </span>
                </div>
                <span className="text-label-sm bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant">
                  46
                </span>
              </label>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-8 border-b border-outline-variant/20 pb-6">
            <h4 className="font-bold text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">
              Price Range
            </h4>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline font-bold">
                  ৳
                </span>
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full pl-7 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
                />
              </div>
              <span className="text-outline-variant">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline font-bold">
                  ৳
                </span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full pl-7 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-6">
            <h4 className="font-bold text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">
              Categories
            </h4>
            <div className="flex flex-col gap-1">
              <Link
                href="/categories"
                className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-primary-container/10 transition-colors bg-primary/5 border border-primary/20"
              >
                <span className="text-body-md font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    grid_view
                  </span>{' '}
                  All Categories
                </span>
              </Link>
              <Link
                href="/categories?id=mobiles"
                className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container transition-colors"
              >
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-primary transition-colors">
                    smartphone
                  </span>{' '}
                  Mobiles
                </span>
                <span className="material-symbols-outlined text-[18px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/categories?id=electronics"
                className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container transition-colors"
              >
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-primary transition-colors">
                    tv
                  </span>{' '}
                  Electronics
                </span>
                <span className="material-symbols-outlined text-[18px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/categories?id=vehicles"
                className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container transition-colors"
              >
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-primary transition-colors">
                    directions_car
                  </span>{' '}
                  Vehicles
                </span>
                <span className="material-symbols-outlined text-[18px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>

          <button className="w-full bg-primary text-on-primary hover:bg-primary-fixed-dim hover:text-on-primary-fixed-variant transition-all px-4 py-3 rounded-xl text-body-md font-bold shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-4">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>{' '}
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
