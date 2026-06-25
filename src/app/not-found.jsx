"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RxQuestionMarkCircled,
  RxArrowLeft,
  RxDashboard,
} from "react-icons/rx";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] flex items-center justify-center p-6 text-slate-800 dark:text-slate-100">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Visual Architectural Accent */}
        <div className="relative mx-auto w-20 h-20 bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[20px] flex items-center justify-center shadow-sm">
          <RxQuestionMarkCircled className="w-10 h-10 text-[#1E3A8A] dark:text-blue-400" />
          <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-full text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
            404
          </div>
        </div>

        {/* Content Structure */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Resource Page Not Found
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            The treatment record, clinical metric parameter, or directory route
            you are attempting to look up does not exist or has been moved.
          </p>
        </div>

        {/* Action Controls Interface */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-[8px] transition-all active:scale-95 inline-flex items-center justify-center gap-1.5"
          >
            <RxArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-[#1E3A8A] text-white rounded-[8px] shadow-xs hover:bg-opacity-95 transition-all active:scale-95 inline-flex items-center justify-center gap-1.5"
          >
            <RxDashboard className="w-3.5 h-3.5" /> Return Dashboard
          </Link>
        </div>

        {/* Minimal Footer Info */}
        <p className="text-[10px] text-slate-400/60 font-mono">
          SYSTEM_ROUTE_EXCEPTION_HANDLER
        </p>
      </div>
    </div>
  );
}
