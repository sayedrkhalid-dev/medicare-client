"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DashboardAside from "./DashboardAside";
import DashboardNavbar from "./DashboardNavbar";
import DashboardFooter from "./DashboardFooter";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // Dynamic Workspace Labeling based on Route segment
  const workspaceTitle = pathname?.startsWith("/dashboard/admin")
    ? "Admin Workspace"
    : pathname?.startsWith("/dashboard/doctor")
      ? "Doctor Workspace"
      : "Patient Workspace";

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020617]">
      {/* Primary Application Global Marketing Head Navigation */}
      <Navbar />

      <div className="flex-1 flex bg-white dark:bg-[#020617] text-slate-600 dark:text-slate-400 font-sans antialiased overflow-visible">
        {/* Permanent Sticky Independent Internal Scroll Sidebar */}
        <DashboardAside />

        {/* Main Structural Layout Canvas */}
        <div className="flex-1 min-h-screen flex flex-col min-w-0 overflow-visible">
          {/* Top Integrated Header Unit */}
          <header className="sticky top-0 z-20 flex flex-col shrink-0 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md border-b border-[#E6F0FA] dark:border-slate-900/60">
            {/* Context User Header Line */}
            <div className="h-20 px-8 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
                  Secure Environment
                </span>
                <h1 className="text-[16px] font-bold text-slate-900 dark:text-white tracking-tight">
                  {workspaceTitle}
                </h1>
              </div>
            </div>

            {/* Injected Context Pathing Breadcrumbs */}
            <DashboardNavbar />
          </header>

          {/* Dynamic Inner Component Workspace Viewport */}
          <main className="flex-1 md:p-2 bg-slate-50/50 dark:bg-[#020617] overflow-visible">
            <div className="max-w-7xl mx-auto space-y-8">{children}</div>
          </main>

          {/* Minimalist Dashboard Footer Baseline */}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}
