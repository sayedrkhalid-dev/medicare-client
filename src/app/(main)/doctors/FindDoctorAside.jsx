"use client";

import React from "react";
import { FiFilter, FiDollarSign, FiX } from "react-icons/fi";

export default function FindDoctorAside({
  filters,
  setFilters,
  handleClearFilters,
  specializationsList,
  isOpen, // Boolean state for mobile drawer
  setIsMobileAsideOpen, // Function to close the drawer
}) {
  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileAsideOpen(false)}
      />

      {/* Drawer Container: Absolute slide-out layout on mobile, clean static layout panel on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-80 max-w-[calc(100vw-3rem)] p-6 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl transition-transform duration-300 ease-out transform lg:translate-x-0 lg:static lg:z-0 lg:w-full lg:rounded-2xl lg:border lg:backdrop-blur-md lg:bg-white/70 lg:dark:bg-slate-900/40 lg:shadow-sm lg:h-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Block inside Drawer/Aside */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <FiFilter className="text-teal-500" />
            Filter Criteria
          </h2>

          <div className="flex items-center gap-4">
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-rose-500 dark:text-rose-400 hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
            {/* Close Close button visible ONLY on mobile */}
            <button
              type="button"
              onClick={() => setIsMobileAsideOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* Inner Filtering Options Wrapper using high-density custom scrollbars */}
        <div className="flex-1 overflow-y-auto pr-1 mt-6 space-y-6 custom-panel-scrollbar">
          {/* Specializations Section */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              Specialization
            </label>
            <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1 custom-panel-scrollbar">
              {specializationsList.map((spec) => {
                const isSelected = filters.specialization === spec;
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        specialization: isSelected ? "" : spec,
                        page: 1,
                      }))
                    }
                    className={`text-left text-xs px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400 font-bold shadow-sm"
                        : "bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-950/60 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fee Range Inputs */}
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              Consultation Fee (USD)
            </label>
            <div className="space-y-2">
              <div className="relative">
                <FiDollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={14}
                />
                <input
                  type="number"
                  placeholder="Min Fee ($)"
                  value={filters.minFee || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minFee: e.target.value,
                      page: 1,
                    }))
                  }
                  className="w-full pl-8 pr-3 py-2 text-xs border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div className="relative">
                <FiDollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={14}
                />
                <input
                  type="number"
                  placeholder="Max Fee ($)"
                  value={filters.maxFee || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxFee: e.target.value,
                      page: 1,
                    }))
                  }
                  className="w-full pl-8 pr-3 py-2 text-xs border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
