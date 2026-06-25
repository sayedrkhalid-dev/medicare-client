"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { RxActivityLog, RxChevronDown } from "react-icons/rx";

export default function AppointmentTrends({ chartData }) {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent client-side layout hydration mismatches inside Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback analytical trend logs mapping monthly healthcare data points
  const data = chartData || [
    { month: "Jan", appointments: 2, virtualVisits: 1 },
    { month: "Feb", appointments: 4, virtualVisits: 2 },
    { month: "Mar", appointments: 3, virtualVisits: 4 },
    { month: "Apr", appointments: 7, virtualVisits: 3 },
    { month: "May", appointments: 5, virtualVisits: 6 },
    { month: "Jun", appointments: 9, virtualVisits: 5 },
  ];

  if (!isMounted) {
    return (
      <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm h-[380px] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#1E3A8A] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm w-full">
      {/* Header Matrix Controllers */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-0.5">
          <h3 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">
            Consultation Activity Volume
          </h3>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Analytical breakdown comparing physical and digital care track logs.
          </p>
        </div>

        {/* Time Window Dropdown Filter Trigger */}
        <button className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium tracking-tight rounded-[12px] border border-[#E6F0FA] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95">
          <span>Last 6 Months</span>
          <RxChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Legend Information Row */}
      <div className="flex gap-4 mb-6 text-[11px] font-bold uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
          <span className="text-slate-600 dark:text-slate-400">
            In-Person Care
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#008080] dark:bg-[#3cd1c2]" />
          <span className="text-slate-600 dark:text-slate-400">
            Telemedicine
          </span>
        </div>
      </div>

      {/* Recharts Analytics Visualization Area */}
      <div className="h-64 w-full text-[12px] font-medium">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              {/* Primary Classic Blue Gradient Assignment */}
              <linearGradient
                id="colorAppointments"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
              </linearGradient>
              {/* Secondary Teal Accent Gradient Assignment */}
              <linearGradient id="colorVirtual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#008080" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#008080" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E6F0FA"
              className="dark:stroke-slate-800/40"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              stroke="#94A3B8"
            />
            <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" />

            {/* Custom Interactive Tooltip Window */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderRadius: "12px",
                border: "none",
                color: "#fff",
                backdropFilter: "blur(4px)",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{
                fontWeight: "bold",
                marginBottom: "4px",
                color: "#94A3B8",
              }}
            />

            {/* Area Line Layers */}
            <Area
              type="monotone"
              dataKey="appointments"
              stroke="#1E3A8A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAppointments)"
            />
            <Area
              type="monotone"
              dataKey="virtualVisits"
              stroke="#008080"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVirtual)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
