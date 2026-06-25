import React from "react";
import Link from "next/link";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#020617] border-t border-[#E6F0FA] dark:border-slate-900/60 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none overflow-visible shrink-0 text-[13px] font-medium text-slate-400">
      <div>
        <span>&copy; {currentYear} </span>
        <span className="font-bold text-slate-700 dark:text-slate-300">
          MediCare Connect
        </span>
        <span className="hidden sm:inline"> &bull; Platform Dashboard</span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/terms"
          className="hover:text-[#008080] dark:hover:text-[#3cd1c2] transition-colors"
        >
          Terms of Service
        </Link>
        <Link
          href="/privacy"
          className="hover:text-[#008080] dark:hover:text-[#3cd1c2] transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/support"
          className="hover:text-[#008080] dark:hover:text-[#3cd1c2] transition-colors"
        >
          Support Desk
        </Link>
      </div>
    </footer>
  );
}
