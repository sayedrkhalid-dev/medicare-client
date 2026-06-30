"use client";

import React, { useState, useEffect } from "react";
import {
  RxDashboard,
  RxPerson,
  RxCardStack,
  RxCalendar,
  RxFileText,
  RxStar,
  RxChevronRight,
} from "react-icons/rx";

import { getMyDoctorProfile } from "@/services/doctors/doctor.service";

export default function DoctorOverviewPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local state for appointments queue matching your UI breakdown
  const [appointments, setAppointments] = useState([
    {
      id: "apt_01",
      patientName: "Rahim Uddin",
      time: "09:30 AM",
      type: "Follow-up",
      status: "Completed",
    },
    {
      id: "apt_02",
      patientName: "Sultana Razia",
      time: "11:15 AM",
      type: "New Consultation",
      status: "In Progress",
    },
    {
      id: "apt_03",
      patientName: "Aishee Rahman",
      time: "01:00 PM",
      type: "Report Check",
      status: "Pending",
    },
  ]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        // Call the profile service function
        const response = await getMyDoctorProfile();
        // Assuming your API returns data directly or inside a data object (e.g., response.data)
        setProfile(response || response);
      } catch (err) {
        console.error("Error fetching doctor data profile:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center">
        <div className="text-[16px] font-semibold text-[#008080] dark:text-[#3CD1C2] animate-pulse">
          Loading Medicare Portal...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center">
        <div className="p-6 rounded-[20px] bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-white/30 text-center">
          <p className="text-[16px] font-semibold text-rose-600 dark:text-rose-400">
            {error || "Profile not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] text-[#1E3A8A] transition-colors duration-300 dark:bg-[#020617] dark:text-[#FFFFFF] overflow-x-hidden">
      {/* --- Ambient Micro-Glow Layering --- */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E6F0FA]/40 dark:bg-slate-900/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#008080]/5 dark:bg-[#008080]/3 blur-3xl pointer-events-none" />

      {/* --- Global Content Bound Wrapper --- */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-8 lg:py-12 relative z-10">
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Doctor Portal / Overview
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-[10px] ${
                  profile.status === "APPROVED"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                    : profile.status === "SUSPENDED"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
                }`}
              >
                {profile.status || "PENDING"}
              </span>
            </div>
            <h1 className="text-[36px] md:text-[52px] font-bold tracking-tight leading-[1.15] mt-1">
              Medicare Dashboard
            </h1>
            <p className="text-[16px] font-normal leading-relaxed text-[#475569] dark:text-[#94A3B8] mt-2">
              {profile.specialization} &bull; {profile.hospital}
            </p>
          </div>

          <button className="rounded-[12px] text-[15px] font-semibold bg-[#008080] hover:bg-[#006666] dark:bg-[#3CD1C2] dark:hover:bg-[#2AB0A2] text-white dark:text-[#020617] px-6 py-3 shadow-md transition-all duration-200 ease-in-out active:scale-[0.98]">
            View Active Shifts
          </button>
        </header>

        {/* --- Metrics Dashboard Matrix --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Experience Years */}
          <div className="rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                Experience Presence
              </p>
              <h3 className="text-[26px] font-bold tracking-tight mt-1 text-[#1E3A8A] dark:text-white">
                {profile.experienceYears}{" "}
                <span className="text-[16px] font-normal text-slate-500">
                  Yrs
                </span>
              </h3>
            </div>
            <div className="p-3 rounded-[12px] bg-white/60 dark:bg-slate-950/50 border border-white/30 text-[#008080] dark:text-[#3CD1C2]">
              <RxPerson className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Ratings */}
          <div className="rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                Patient Evaluation
              </p>
              <h3 className="text-[26px] font-bold tracking-tight mt-1 text-[#1E3A8A] dark:text-white flex items-baseline gap-1">
                {profile.rating ? profile.rating.toFixed(1) : "0.0"}{" "}
                <span className="text-[13px] font-medium text-slate-500">
                  ({profile.reviewCount || 0} reviews)
                </span>
              </h3>
            </div>
            <div className="p-3 rounded-[12px] bg-white/60 dark:bg-slate-950/50 border border-white/30 text-amber-500">
              <RxStar className="w-6 h-6 fill-current" />
            </div>
          </div>

          {/* Card 3: Consultation Fee */}
          <div className="rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                Consultation Fee
              </p>
              <h3 className="text-[26px] font-bold tracking-tight mt-1 text-[#1E3A8A] dark:text-white">
                ৳{profile.consultationFee}
              </h3>
            </div>
            <div className="p-3 rounded-[12px] bg-white/60 dark:bg-slate-950/50 border border-white/30 text-[#008080] dark:text-[#3CD1C2]">
              <RxCardStack className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Daily Active Snapshot Slots */}
          <div className="rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                Today's Slots
              </p>
              <h3 className="text-[26px] font-bold tracking-tight mt-1 text-[#1E3A8A] dark:text-white">
                {appointments.length}{" "}
                <span className="text-[16px] font-normal text-slate-500">
                  Queued
                </span>
              </h3>
            </div>
            <div className="p-3 rounded-[12px] bg-white/60 dark:bg-slate-950/50 border border-white/30 text-[#008080] dark:text-[#3CD1C2]">
              <RxCalendar className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* --- Main Contents Structural Layout Partition --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Module Panel - Appointment Lists */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold tracking-tight">
                  Today's Appointment Schedule
                </h2>
                <button className="text-[13px] font-medium text-[#008080] dark:text-[#3CD1C2] hover:underline flex items-center gap-1 transition-all">
                  View All Navigation <RxChevronRight />
                </button>
              </div>

              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-[12px] bg-white/60 dark:bg-slate-950/50 border border-white/30 dark:border-white/5 flex items-center justify-between transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E6F0FA] dark:bg-slate-900 flex items-center justify-center font-bold text-[13px] text-[#008080] dark:text-[#3CD1C2]">
                        {apt.time.split(" ")[0]}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-[#1E3A8A] dark:text-white">
                          {apt.patientName}
                        </p>
                        <p className="text-[13px] text-[#475569] dark:text-[#94A3B8]">
                          {apt.type} &bull; Scheduled Time: {apt.time}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-[10px] ${
                        apt.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : apt.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Bio Section Panel */}
            {profile.bio && (
              <div className="rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6">
                <h2 className="text-[20px] font-bold tracking-tight mb-3">
                  Professional Bio Statement
                </h2>
                <p className="text-[15px] font-normal leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                  {profile.bio}
                </p>
                {profile.languages && profile.languages.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="text-[11px] font-semibold tracking-wider uppercase bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl px-3 py-1 rounded-[10px]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar Columns */}
          <div className="space-y-6">
            <div className="rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6">
              <h2 className="text-[20px] font-bold tracking-tight mb-4">
                Quick Links
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <a
                  href="/dashboard/doctor/schedules"
                  className="flex items-center gap-3 p-3 rounded-[12px] bg-white/40 dark:bg-slate-900/40 border border-white/20 hover:bg-[#E6F0FA] dark:hover:bg-slate-900 transition-colors duration-200"
                >
                  <RxCardStack className="text-[#008080] dark:text-[#3CD1C2] w-5 h-5" />
                  <span className="text-[15px] font-medium">Manage Slots</span>
                </a>
                <a
                  href="/dashboard/doctor/prescriptions"
                  className="flex items-center gap-3 p-3 rounded-[12px] bg-white/40 dark:bg-slate-900/40 border border-white/20 hover:bg-[#E6F0FA] dark:hover:bg-slate-900 transition-colors duration-200"
                >
                  <RxFileText className="text-[#008080] dark:text-[#3CD1C2] w-5 h-5" />
                  <span className="text-[15px] font-medium">
                    Write Prescription
                  </span>
                </a>
                <a
                  href="/dashboard/doctor/profile"
                  className="flex items-center gap-3 p-3 rounded-[12px] bg-white/40 dark:bg-slate-900/40 border border-white/20 hover:bg-[#E6F0FA] dark:hover:bg-slate-900 transition-colors duration-200"
                >
                  <RxPerson className="text-[#008080] dark:text-[#3CD1C2] w-5 h-5" />
                  <span className="text-[15px] font-medium">
                    Profile Parameters
                  </span>
                </a>
              </div>
            </div>

            {/* BMDC Verification Info Badge */}
            <div className="rounded-[20px] bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl p-6 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                BMDC Registration Identity
              </p>
              <p className="text-[18px] font-semibold tracking-tight text-[#1E3A8A] dark:text-[#3CD1C2] mt-1 font-mono">
                {profile.bmdcNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
