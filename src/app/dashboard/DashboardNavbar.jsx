"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxChevronRight, RxHome } from "react-icons/rx";

export default function DashboardNavbar() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    if (!pathname)
      return [{ label: "Dashboard", href: "/dashboard", isLast: true }];

    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      // Clean string formatting (e.g., "doctor-applications" -> "Doctor Applications")
      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        label: label === "Dashboard" ? "Dashboard" : label,
        href,
        isLast: index === segments.length - 1,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="h-12 w-full bg-white dark:bg-[#020617] border-b border-[#E6F0FA] dark:border-slate-900/60 flex items-center px-6 justify-between select-none overflow-visible">
      <div className="flex items-center gap-2 text-[14px] font-medium tracking-tight">
        <Link
          href="/dashboard"
          className="text-slate-400 hover:text-[#1E3A8A] dark:hover:text-white transition-colors p-1 rounded-md"
        >
          <RxHome className="w-4 h-4" />
        </Link>

        {breadcrumbs.map((crumb) => (
          <div key={crumb.href} className="flex items-center gap-2">
            <RxChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 shrink-0" />

            {crumb.isLast ? (
              <span className="font-bold text-slate-800 dark:text-white px-1">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-slate-400 hover:text-[#1E3A8A] dark:hover:text-white transition-colors px-1"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
