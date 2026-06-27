"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  RxPerson,
  RxReader,
  RxEnvelopeOpen,
  RxCalendar,
  RxCardStack,
  RxArrowTopRight,
  RxActivityLog,
} from "react-icons/rx";
import { getAllUsers } from "@/services/users/user.service";

const user = await getAllUsers();
console.log(user);

export default function AdminDashboardHome() {
  // Static structured mock values mirroring the specific dashboard data fields
  const platformSummaryWidgets = [
    {
      title: "Total Users",
      value: "14,820",
      description: "Registered platform users",
      href: "/dashboard/admin/users",
      icon: RxPerson,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Doctors",
      value: "412",
      description: "Verified active medical staff",
      href: "/dashboard/admin/doctors",
      icon: RxReader,
      iconColor: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
    },
    {
      title: "Pending Applications",
      value: "27",
      description: "Credentials awaiting verification",
      href: "/dashboard/admin/doctor-applications",
      icon: RxEnvelopeOpen,
      iconColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      badge: "Action Required",
    },
    {
      title: "Total Appointments",
      value: "3,894",
      description: "All-time consultations booked",
      href: "/dashboard/admin/appointments",
      icon: RxCalendar,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
      title: "Revenue",
      value: "$68,410",
      description: "Gross transaction processing",
      href: "/dashboard/admin/payments",
      icon: RxCardStack,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Structural Module Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[22px] font-bold tracking-tight text-slate-900 dark:text-white">
            System Infrastructure Analytics
          </h2>
          <p className="text-[13px] font-medium text-slate-400 mt-0.5">
            Real-time platform summaries, verification bottlenecks, and
            financial tracking parameters.
          </p>
        </div>
        <div className="text-[12px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-md select-none">
          Live Connection Stable
        </div>
      </div>

      {/* Core Grid Matrix containing your 5 explicit widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {platformSummaryWidgets.map((widget) => {
          const IconComponent = widget.icon;
          return (
            <Link
              key={widget.title}
              href={widget.href}
              className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden active:scale-[0.99]"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {widget.title}
                  </span>
                  <div
                    className={`p-2.5 rounded-[12px] ${widget.bgColor} ${widget.iconColor} transition-transform duration-300 group-hover:scale-105 shrink-0`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-[26px] font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {widget.value}
                  </h3>
                  <p className="text-[12px] font-medium text-slate-400 mt-1 leading-snug">
                    {widget.description}
                  </p>
                </div>
              </div>

              {/* Conditional Alert Pinning for pending work queues */}
              {widget.badge && (
                <div className="absolute top-0 right-14 bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-b-md">
                  {widget.badge}
                </div>
              )}

              <div className="mt-5 pt-3 border-t border-slate-50 dark:border-slate-900/60 flex items-center gap-1.5 text-[12px] font-bold text-[#1E3A8A] dark:text-[#3cd1c2] opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Manage Module</span>
                <RxArrowTopRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Sub-Layout System Operations Map Placements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 flex flex-col min-h-[340px]">
          <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-900 pb-4">
            <RxActivityLog className="w-4 h-4 text-slate-400" />
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Critical Logs & Pending Operations Pipeline
            </h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-100 dark:border-slate-900 rounded-[12px] mt-4">
            <p className="text-[13px] font-semibold text-slate-400 max-w-sm">
              The next sequential tasks involve configuring the individual
              sub-module listing frames.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 flex flex-col min-h-[340px]">
          <div className="pb-4 border-b border-slate-50 dark:border-slate-900">
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Verification Load
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-900 rounded-[12px] mt-4 text-[13px] font-medium text-slate-400">
            Node activity indicators.
          </div>
        </div>
      </div>
    </div>
  );
}
