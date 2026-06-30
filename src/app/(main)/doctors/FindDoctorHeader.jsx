"use client";

import React from "react";
import { FiSearch, FiGrid, FiList, FiSliders } from "react-icons/fi";

export default function FindDoctorHeader({
  searchInput,
  setSearchInput,
  handleApplyTextFilters,
  viewMode,
  setViewMode,
  setIsMobileAsideOpen, // Trigger to open the drawer modal
}) {
  return (
    <div className="mb-10 p-6 rounded-2xl border backdrop-blur-md border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm animate-scaleIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Find & Book Specialists
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Search through our vetted network of medical professionals and book
            appointments instantly.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {/* Mobile Filter Drawer Button (Hidden on Desktop) */}
          <button
            type="button"
            onClick={() => setIsMobileAsideOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <FiSliders size={14} className="text-teal-500" />
            Filters
          </button>

          {/* View Mode Switches */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm border border-slate-200/60 dark:border-slate-800"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <FiGrid size={14} />
              Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm border border-slate-200/60 dark:border-slate-800"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <FiList size={14} />
              List
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleApplyTextFilters} className="flex gap-3">
        <div className="flex-1 relative">
          <FiSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by doctor name, email, specialization or keywords..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-bold text-sm rounded-xl transition-all hover:opacity-90 active:scale-98 cursor-pointer shadow-sm shrink-0"
        >
          Search
        </button>
      </form>
    </div>
  );
}
