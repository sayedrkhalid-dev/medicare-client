"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RxDashboard,
  RxCalendar,
  RxReader,
  RxStar,
  RxExit,
  RxGear,
  RxChevronLeft,
  RxChevronRight,
  RxPerson,
  RxFileText,
  RxEnvelopeOpen,
  RxCardStack,
} from "react-icons/rx";
import { LuShieldAlert } from "react-icons/lu";

// Central navigation mapping configuration matching your structures perfectly
const navigationConfig = {
  admin: {
    portalLabel: "Admin Portal",
    primary: [
      { label: "Overview", href: "/dashboard/admin", icon: RxDashboard },
      {
        label: "User Management",
        href: "/dashboard/admin/users",
        icon: RxPerson,
      },
      {
        label: "Doctor Applications",
        href: "/dashboard/admin/doctor-applications",
        icon: RxEnvelopeOpen,
      },
      {
        label: "Doctor Management",
        href: "/dashboard/admin/doctors",
        icon: RxReader,
      },
      {
        label: "Appointments",
        href: "/dashboard/admin/appointments",
        icon: RxCalendar,
      },
      {
        label: "Payments",
        href: "/dashboard/admin/payments",
        icon: RxCardStack,
      },
      {
        label: "Prescriptions",
        href: "/dashboard/admin/prescriptions",
        icon: RxFileText,
      },
      { label: "Reviews", href: "/dashboard/admin/reviews", icon: RxStar },
    ],
    administrative: [
      { label: "Settings", href: "/dashboard/admin/settings", icon: RxGear },
    ],
  },
  doctor: {
    portalLabel: "Doctor Portal",
    primary: [
      { label: "Overview", href: "/dashboard/doctor", icon: RxDashboard },
      { label: "Profile", href: "/dashboard/doctor/profile", icon: RxPerson },
      {
        label: "Applications",
        href: "/dashboard/doctor/applications",
        icon: RxPerson,
      },
      {
        label: "Schedule Management",
        href: "/dashboard/doctor/schedules",
        icon: RxCardStack,
      },
      {
        label: "My Appointments",
        href: "/dashboard/doctor/appointments",
        icon: RxCalendar,
      },
      {
        label: "Prescriptions",
        href: "/dashboard/doctor/prescriptions",
        icon: RxFileText,
      },
      { label: "My Reviews", href: "/dashboard/doctor/reviews", icon: RxStar },
    ],
    administrative: [
      { label: "Settings", href: "/dashboard/doctor/settings", icon: RxGear },
    ],
  },
  patient: {
    portalLabel: "Patient Portal",
    primary: [
      {
        label: "Overview",
        href: "/dashboard/patient/overview",
        icon: RxDashboard,
      },
      {
        label: "My Prescriptions",
        href: "/dashboard/patient/my-prescriptions",
        icon: RxFileText,
      },
      {
        label: "My Appointments",
        href: "/dashboard/patient/my-appointments",
        icon: RxCalendar,
      },
      {
        label: "Payment History",
        href: "/dashboard/patient/payment-history",
        icon: RxReader,
      },
      {
        label: "My Reviews",
        href: "/dashboard/patient/my-reviews",
        icon: RxStar,
      },
    ],
    administrative: [
      {
        label: "Settings",
        href: "/dashboard/patient/my-settings",
        icon: RxGear,
      },
    ],
  },
};

export default function DashboardAside() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Determine current active config branch by checking path root prefix
  const currentRole = pathname?.startsWith("/dashboard/admin")
    ? "admin"
    : pathname?.startsWith("/dashboard/doctor")
      ? "doctor"
      : "patient";

  const currentNav = navigationConfig[currentRole];
  const primaryLinks = currentNav.primary;
  const administrativeLinks = currentNav.administrative;

  const getBaseStyles = (isActive, isDestructive, isEmergency) => `
    flex items-center rounded-[12px] transition-all duration-300 active:scale-[0.98] group relative overflow-hidden
    ${isCollapsed ? "justify-center p-3 mx-auto w-12 h-12" : "px-4 py-3 w-full"}
    ${
      isEmergency
        ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
        : isDestructive
          ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          : isActive
            ? "bg-[#1E3A8A] text-white dark:bg-slate-800"
            : "text-slate-600 dark:text-slate-400 hover:bg-[#E6F0FA] dark:hover:bg-slate-900 hover:text-[#1E3A8A] dark:hover:text-white"
    }
  `;

  const renderLink = ({ label, href, icon: Icon }, isDestructive = false) => {
    // Matches exact link path, or subroutes under that specific sub-panel module
    const isActive =
      pathname === href ||
      (href !== `/dashboard/${currentRole}` && pathname?.startsWith(href));

    return (
      <Link
        key={href}
        href={href}
        title={isCollapsed ? label : undefined}
        className={getBaseStyles(isActive, isDestructive, false)}
      >
        <Icon
          className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 shrink-0 ${
            isActive
              ? "text-white"
              : isDestructive
                ? "text-rose-600"
                : "text-slate-400 group-hover:text-inherit"
          }`}
        />
        <span
          className={`text-[14px] font-medium tracking-tight whitespace-nowrap transition-all duration-300 ease-in-out block ${
            isCollapsed
              ? "opacity-0 max-w-0 translate-x-4 pointer-events-none ml-0"
              : "opacity-100 max-w-xs translate-x-0 ml-3"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <aside
      className={`flex flex-col h-screen sticky top-0 left-0 bg-white dark:bg-[#020617] border-r border-[#E6F0FA] dark:border-slate-900 z-30 shrink-0 select-none transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Identity Header */}
      <div className="h-20 flex items-center border-b border-[#E6F0FA] dark:border-slate-900 shrink-0 px-6 overflow-hidden">
        <Link href="/" className="flex flex-col select-none">
          <span className="text-[18px] font-bold tracking-tight text-[#1E3A8A] dark:text-white whitespace-nowrap transition-all duration-300">
            {isCollapsed ? "MC" : "MediCare"}
          </span>
          <span
            className={`text-[9px] font-bold uppercase tracking-widest text-[#008080] dark:text-[#3cd1c2] whitespace-nowrap transition-all duration-300 ease-in-out block ${
              isCollapsed
                ? "opacity-0 max-w-0 max-h-0 overflow-hidden"
                : "opacity-100 max-w-xs max-h-4 mt-0.5"
            }`}
          >
            {currentNav.portalLabel}
          </span>
        </Link>
      </div>

      {/* Scrollable Navigation Body */}
      <div className="h-[calc(100vh-160px)] overflow-y-auto py-6 flex flex-col gap-6 custom-panel-scrollbar overflow-x-hidden px-2">
        <div className="flex flex-col gap-1">
          <div
            className={`flex items-center mb-2 transition-all duration-300 ${
              isCollapsed ? "justify-center px-0" : "justify-between px-4"
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap transition-all duration-300 ease-in-out block ${
                isCollapsed
                  ? "opacity-0 max-w-0 overflow-hidden"
                  : "opacity-100 max-w-xs"
              }`}
            >
              Main Menu
            </span>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-[#E6F0FA] dark:hover:bg-slate-900 transition-all active:scale-95 layout-toggle-btn shrink-0"
              title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
            >
              {isCollapsed ? (
                <RxChevronRight className="w-4 h-4 shrink-0" />
              ) : (
                <RxChevronLeft className="w-4 h-4 shrink-0" />
              )}
            </button>
          </div>

          {primaryLinks.map((link) => renderLink(link))}
        </div>

        {/* Support & Settings Group */}
        <div className="flex flex-col gap-1 mt-auto">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 whitespace-nowrap transition-all duration-300 ease-in-out block px-4 ${
              isCollapsed
                ? "opacity-0 max-w-0 overflow-hidden"
                : "opacity-100 max-w-xs"
            }`}
          >
            Preferences
          </span>

          <button
            title={isCollapsed ? "Emergency Support" : undefined}
            onClick={() => console.log("Emergency line request initiated")}
            className={getBaseStyles(false, false, true)}
          >
            <LuShieldAlert className="w-5 h-5 animate-pulse text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span
              className={`text-[14px] font-medium tracking-tight whitespace-nowrap transition-all duration-300 ease-in-out block ${
                isCollapsed
                  ? "opacity-0 max-w-0 translate-x-4 pointer-events-none ml-0"
                  : "opacity-100 max-w-xs translate-x-0 ml-3"
              }`}
            >
              Emergency Support
            </span>
          </button>

          {administrativeLinks.map((link) => renderLink(link))}
        </div>
      </div>

      {/* Static Footer Section */}
      <div className="p-4 border-t border-[#E6F0FA] dark:border-slate-900 shrink-0 mt-auto px-2">
        {renderLink({ label: "Sign Out", href: "/logout", icon: RxExit }, true)}
      </div>
    </aside>
  );
}
