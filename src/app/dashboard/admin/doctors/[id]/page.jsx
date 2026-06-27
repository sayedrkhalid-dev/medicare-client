"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxCalendar,
  RxEnvelopeClosed,
  RxIdCard,
  RxStarFilled,
  RxCheckCircled,
  RxCrossCircled,
  RxActivityLog,
} from "react-icons/rx";

// Mock collection matching parent index schemas
const doctorsDatabase = {
  "DOC-2941": {
    name: "Dr. Marcus Vance",
    specialty: "Neurology",
    email: "m.vance@medicare.org",
    phone: "+1 (555) 234-5678",
    licenseNumber: "LIC-883921-MD",
    rating: 4.9,
    appointmentsCount: 142,
    isAvailable: true,
    joinedDate: "2024-01-15",
    bio: "Board-certified neurologist specializing in neurodegenerative disorders and advanced clinical electrophysiology with over a decade of continuous clinical operations.",
    education: "Johns Hopkins University School of Medicine",
  },
  "DOC-1024": {
    name: "Dr. Amara Patel",
    specialty: "Pediatrics",
    email: "a.patel@medicare.org",
    phone: "+1 (555) 876-5432",
    licenseNumber: "LIC-441029-MD",
    rating: 4.8,
    appointmentsCount: 310,
    isAvailable: false,
    joinedDate: "2024-08-22",
    bio: "Dedicated pediatrician focused on developmental milestone tracking and preventative neonatological care programs.",
    education: "Harvard Medical School",
  },
};

export default function DoctorDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const doctor = doctorsDatabase[id] || doctorsDatabase["DOC-2941"]; // Fallback for placeholder consistency

  const [isAvailable, setIsAvailable] = useState(doctor.isAvailable);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Navigation & Structural Context Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to Roster Matrix</span>
        </button>

        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1 border border-[#E6F0FA] dark:border-slate-800 rounded-md">
          Node Node: {id}
        </span>
      </div>

      {/* Main Profile Identity Panel */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-50 dark:border-slate-900/60">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[22px] font-black tracking-tight text-slate-900 dark:text-white">
                {doctor.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                {doctor.specialty}
              </span>
            </div>
            <p className="text-[13px] font-medium text-slate-400 mt-1">
              {doctor.education}
            </p>
          </div>

          <div className="flex items-center gap-4 select-none">
            <div className="text-right">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Availability Flag
              </span>
              <span
                className={`text-[13px] font-bold ${isAvailable ? "text-emerald-500" : "text-slate-400"}`}
              >
                {isAvailable ? "Active Intake" : "Suspended Duty"}
              </span>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${isAvailable ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${isAvailable ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>

        {/* Core Profile Operational Stats Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-center gap-4">
            <RxStarFilled className="w-8 h-8 text-amber-500" />
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Aggregate Rating
              </span>
              <span className="text-[16px] font-black text-slate-800 dark:text-white">
                {doctor.rating} / 5.0
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-center gap-4">
            <RxActivityLog className="w-8 h-8 text-[#1E3A8A] dark:text-[#3cd1c2]" />
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Total Bookings
              </span>
              <span className="text-[16px] font-black text-slate-800 dark:text-white">
                {doctor.appointmentsCount} Patient Visits
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-center gap-4">
            <RxCalendar className="w-8 h-8 text-purple-500" />
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Platform Tenure
              </span>
              <span className="text-[16px] font-black text-slate-800 dark:text-white">
                {doctor.joinedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Documentation & Technical Metadata Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
          <h3 className="text-[14px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Clinical Bio & Overview
          </h3>
          <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {doctor.bio}
          </p>
        </div>

        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
          <h3 className="text-[14px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Metadata Parameters
          </h3>
          <div className="space-y-3 font-medium text-[13px]">
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2">
              <span className="text-slate-400 inline-flex items-center gap-1.5">
                <RxEnvelopeClosed className="w-4 h-4" /> Email
              </span>
              <span className="text-slate-700 dark:text-slate-200 font-semibold">
                {doctor.email}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2">
              <span className="text-slate-400 inline-flex items-center gap-1.5">
                <RxIdCard className="w-4 h-4" /> License Key
              </span>
              <span className="text-slate-700 dark:text-slate-200 font-mono font-bold text-[12px]">
                {doctor.licenseNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
