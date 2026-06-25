import React from "react";
import { RxCalendar, RxCardStack, RxStar, RxHeart } from "react-icons/rx";

export default function PatientStats({ statsData }) {
  // Fallback defaults if props are not fully loaded from the API backend
  const data = statsData || {
    upcomingAppointments: 3,
    newPendingRequests: 1,
    totalPayments: 1240.5,
    paymentTargetLimit: 2000.0, // Used for the design system progress tracking bar
    favoriteDoctorsCount: 5,
    reviewCount: 12,
  };

  // Calculate percentage of limit covered for the progress bar visual rule
  const spendPercentage = Math.min(
    (data.totalPayments / data.paymentTargetLimit) * 100,
    100,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {/* 1. Upcoming Appointments */}
      <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
              Upcoming Appointments
            </span>
            <p className="text-[24px] font-bold text-slate-900 dark:text-white tracking-tight leading-none pt-1">
              {String(data.upcomingAppointments).padStart(2, "0")}
            </p>
          </div>
          <div className="p-3 bg-[#E6F0FA] dark:bg-slate-800 text-[#1E3A8A] dark:text-white rounded-[12px]">
            <RxCalendar className="w-5 h-5" />
          </div>
        </div>

        {/* Micro Badge Status Context */}
        <div className="mt-4 flex items-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            +{data.newPendingRequests} New Pending
          </span>
        </div>
      </div>

      {/* 2. Total Payments */}
      <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
              Total Payments
            </span>
            <p className="text-[24px] font-bold text-slate-900 dark:text-white tracking-tight leading-none pt-1">
              $
              {data.totalPayments.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="p-3 bg-[#E6F0FA] dark:bg-slate-800 text-[#1E3A8A] dark:text-white rounded-[12px]">
            <RxCardStack className="w-5 h-5" />
          </div>
        </div>

        {/* Progress Bar Display Mapping */}
        <div className="mt-4 space-y-1.5">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1E3A8A] dark:bg-slate-400 h-full transition-all duration-500"
              style={{ width: `${spendPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <span>Limit Cap</span>
            <span>{Math.round(spendPercentage)}% Reached</span>
          </div>
        </div>
      </div>

      {/* 3. Favorite Doctors */}
      <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
              Favorite Specialists
            </span>
            <p className="text-[24px] font-bold text-slate-900 dark:text-white tracking-tight leading-none pt-1">
              {String(data.favoriteDoctorsCount).padStart(2, "0")}
            </p>
          </div>
          <div className="p-3 bg-[#E6F0FA] dark:bg-slate-800 text-rose-600 dark:text-rose-400 rounded-[12px]">
            <RxHeart className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
            Quick-book options active
          </span>
        </div>
      </div>

      {/* 4. Review Count (Accent Heavyweight Block) */}
      <div className="bg-[#1E3A8A] dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md">
        {/* Subtle decorative feedback backdrop for the accent card */}
        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/[0.04] dark:text-slate-800/20 pointer-events-none select-none">
          <RxStar className="w-32 h-32" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-200 dark:text-slate-400 block">
                Submitted Reviews
              </span>
              <p className="text-[24px] font-bold text-white tracking-tight leading-none pt-1">
                {String(data.reviewCount).padStart(2, "0")}
              </p>
            </div>
            <div className="p-3 bg-white/10 dark:bg-slate-800 text-white dark:text-[#3cd1c2] rounded-[12px] backdrop-blur-sm">
              <RxStar className="w-5 h-5 fill-current" />
            </div>
          </div>

          <p className="text-[12px] text-slate-200 dark:text-slate-400 mt-4 font-medium tracking-tight">
            Thank you for helping improve our care.
          </p>
        </div>
      </div>
    </div>
  );
}
