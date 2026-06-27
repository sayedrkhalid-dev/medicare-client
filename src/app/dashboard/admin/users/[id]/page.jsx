"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxPerson,
  RxEnvelopeClosed,
  RxClock,
} from "react-icons/rx";
import { LuShieldAlert } from "react-icons/lu";

const usersDatabase = {
  "USR-9021": {
    name: "Eleanor Vance",
    email: "e.vance@gmail.com",
    role: "Patient",
    status: "Active",
    joinedDate: "2025-03-14",
    totalAppointments: 6,
    lastLogin: "2026-06-25 14:32",
  },
  "USR-4412": {
    name: "Dominic Snyder",
    email: "d.snyder@yahoo.com",
    role: "Patient",
    status: "Suspended",
    joinedDate: "2025-11-02",
    totalAppointments: 0,
    lastLogin: "2026-02-10 09:11",
  },
};

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const user = usersDatabase[id] || usersDatabase["USR-9021"];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Return Pathway Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to User Configuration Index</span>
        </button>

        <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1 border border-[#E6F0FA] dark:border-slate-800 rounded-md">
          {id} Index Handle
        </span>
      </div>

      {/* User Portfolio Metadata Architecture */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 dark:border-slate-900 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-[#E6F0FA] dark:border-slate-800 flex items-center justify-center text-slate-400">
              <RxPerson className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-900 dark:text-white leading-tight">
                {user.name}
              </h2>
              <span className="text-[12px] font-semibold text-slate-400 inline-flex items-center gap-1 mt-0.5">
                <RxEnvelopeClosed className="w-3.5 h-3.5" /> {user.email}
              </span>
            </div>
          </div>

          <span
            className={`self-start sm:self-center px-2.5 py-1 rounded-md text-[11px] font-black tracking-wider uppercase ${
              user.status === "Active"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20"
                : "bg-rose-50 text-rose-600 dark:bg-rose-950/20"
            }`}
          >
            Status: {user.status}
          </span>
        </div>

        {/* Structural Analytical Ratios Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-[13px] font-medium">
          <div className="p-4 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px]">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              System Security Authorization
            </span>
            <span className="text-slate-800 dark:text-white font-bold text-[14px] mt-1 block">
              {user.role} Profile
            </span>
          </div>

          <div className="p-4 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px]">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              Created Timestamp
            </span>
            <span className="text-slate-800 dark:text-white font-bold text-[14px] mt-1 block font-mono">
              {user.joinedDate}
            </span>
          </div>

          <div className="p-4 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px]">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              Platform Engagement Base
            </span>
            <span className="text-slate-800 dark:text-white font-bold text-[14px] mt-1 block">
              {user.totalAppointments} Consultation Items
            </span>
          </div>
        </div>
      </div>

      {/* Account Safety Control Interventions */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-[14px]">
          <LuShieldAlert className="w-4 h-4" />
          <span>Administrative Control Node Interventions</span>
        </div>
        <p className="text-[12px] font-medium text-slate-400 leading-relaxed max-w-2xl">
          Modifying configuration boundaries restricts or authorizes system
          dashboard operations immediately. Proceed with strict structural
          intent.
        </p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => console.log("State toggle requested for user node")}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 rounded-[8px] text-[12px] font-bold transition-colors"
          >
            {user.status === "Active"
              ? "Suspend Account Access"
              : "Reinstate Active Access"}
          </button>
        </div>
      </div>
    </div>
  );
}
