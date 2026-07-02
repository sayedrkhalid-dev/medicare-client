"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import Next router hook
import { toast } from "react-hot-toast";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiShield,
  FiLoader,
  FiGlobe,
} from "react-icons/fi";

// Service endpoints
import { getDoctorById } from "@/services/doctors/doctor.service";
import { getDoctorSchedules } from "@/services/doctor-schedules/doctorSchedule.service";
import { getUserById } from "@/services/users/user.service";

export default function DoctorDetailsPage({ params: paramsPromise }) {
  // Unwrap params for Next.js compliance
  const params = use(paramsPromise);
  const doctorId = params.id;

  const router = useRouter(); // 2. Initialize router

  // UI State
  const [doctor, setDoctor] = useState(null);
  const [associatedUser, setAssociatedUser] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedScheduleId, setSelectedScheduleId] = useState("");

  useEffect(() => {
    async function loadDoctorDetails() {
      try {
        setLoading(true);

        // Fetch core doctor details
        const doctorData = await getDoctorById(doctorId);
        const docRecord = doctorData?.data || doctorData;

        if (docRecord) {
          setDoctor(docRecord);

          // Fetch associated user info and schedules in parallel
          const [userData, scheduleData] = await Promise.all([
            getUserById(docRecord.userId),
            getDoctorSchedules(doctorId),
          ]);

          setAssociatedUser(userData?.data || userData);
          setSchedules(scheduleData?.data || scheduleData || []);
        }
      } catch (error) {
        console.error("Error loading doctor data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (doctorId) {
      loadDoctorDetails();
    }
  }, [doctorId]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // Find matching schedule metadata block
    const activeSchedule = schedules.find((s) => s._id === selectedScheduleId);

    if (!activeSchedule) {
      toast.error("Please explicitly select a weekly operating slot block.");
      return;
    }

    /**
     * Doctor schedules are weekly recurrence templates (e.g. dayOfWeek:
     * "Monday"), but the backend needs a concrete calendar date. This
     * computes the *next upcoming date* that falls on the selected
     * schedule's day-of-week -- e.g. if today is Wednesday and the doctor
     * selected a "Monday" schedule, this resolves to next Monday's date,
     * not today's.
     *
     * (Previously this just used today's date regardless of which day
     * the schedule was for -- that mismatch between the requested date's
     * actual weekday and the schedule's dayOfWeek is what caused every
     * booking to fail server-side with "Selected slot is unavailable".)
     */
    const DAY_NAME_TO_INDEX = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const getNextDateForDayOfWeek = (dayName) => {
      const targetDayIndex = DAY_NAME_TO_INDEX[dayName];
      const today = new Date();
      const todayIndex = today.getDay();

      // Days until the next occurrence of targetDayIndex. If today IS
      // that day, book it for today (0 days ahead) rather than jumping
      // a full week forward.
      let daysUntilTarget = (targetDayIndex - todayIndex + 7) % 7;

      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + daysUntilTarget);

      // Zero out the time portion so we only keep the calendar date.
      nextDate.setHours(0, 0, 0, 0);

      // Format as YYYY-MM-DD using LOCAL date parts (not toISOString,
      // which converts to UTC and can shift the date by a day depending
      // on the browser's timezone).
      const year = nextDate.getFullYear();
      const month = String(nextDate.getMonth() + 1).padStart(2, "0");
      const day = String(nextDate.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    const formattedDateString = getNextDateForDayOfWeek(
      activeSchedule.dayOfWeek,
    );
    const slotTimeWindow = activeSchedule.startTime; // HH:MM format from schedule template

    // 3. Route parameters cleanly down to the review terminal step
    router.push(
      `/payment/${doctor._id}?date=${formattedDateString}&time=${slotTimeWindow}`,
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide animate-pulse">
          <FiLoader className="animate-spin text-teal-500" size={16} />
          Loading doctor profile...
        </div>
      </div>
    );
  }

  if (!doctor || !associatedUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <p className="text-xs font-semibold text-rose-500">Error</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Doctor profile could not be found.
        </p>
        <Link
          href="/doctors"
          className="text-xxs font-semibold text-teal-500 tracking-wider border border-teal-500/20 px-3 py-1.5 rounded-lg bg-teal-500/5 hover:bg-teal-500/10"
        >
          Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 text-slate-900 dark:text-slate-100 max-w-6xl mx-auto space-y-8 animate-scaleIn">
      {/* Navigation link */}
      <div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-teal-500 transition-colors"
        >
          <FiArrowLeft size={12} />
          Back to directory
        </Link>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Info card & profile overview */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main profile card */}
          <div className="border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative h-24 w-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0 bg-slate-100 dark:bg-slate-950">
              <Image
                src={associatedUser.image || "/placeholder-avatar.jpg"}
                alt={associatedUser.name}
                fill
                sizes="96px"
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-1.5 min-w-0">
              <span className="text-xxs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                {doctor.specialization}
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                {associatedUser.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {doctor.hospital}
              </p>

              <div className="flex items-center gap-4 text-xxs font-medium text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="text-amber-500">★</span>{" "}
                  {doctor.rating || "5"} ({doctor.reviewCount || 0} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin size={12} className="text-slate-500" />{" "}
                  {associatedUser.address}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-fit">
            {[
              { id: "overview", label: "Overview" },
              { id: "credentials", label: "Qualifications & Details" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm border border-slate-200/60 dark:border-slate-800"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm">
            {activeTab === "overview" ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <FiBookOpen size={14} className="text-teal-500" /> Biography
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                    {doctor.bio || "No biography provided."}
                  </p>
                </div>

                {doctor.languages && doctor.languages.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
                    <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-2">
                      <FiGlobe size={14} className="text-teal-500" /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="text-xxs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <FiAward size={14} className="text-teal-500" /> Registration
                    details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                      <div className="text-xxs text-slate-400 dark:text-slate-500">
                        BMDC certification number
                      </div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        {doctor.bmdcNumber}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                      <div className="text-xxs text-slate-400 dark:text-slate-500">
                        Professional experience
                      </div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        {doctor.experienceYears} years active
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <FiShield size={14} className="text-teal-500" />{" "}
                    Verification status
                  </h3>
                  <div className="flex items-center gap-2 text-xxs font-medium text-slate-500">
                    <FiCheckCircle
                      className="text-teal-500 shrink-0"
                      size={12}
                    />
                    <span>
                      Account listing is currently{" "}
                      <span className="text-teal-500 font-semibold">
                        {doctor.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Clear schedule card and booking actions */}
        <div className="lg:col-span-5 space-y-4 sticky top-6">
          {/* Appointment Fee Card */}
          <div className="border backdrop-blur-md p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-xxs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <FiClock size={12} className="text-teal-500" /> Consultation fee
              </h2>
              <p className="text-xxs text-slate-400 dark:text-slate-500">
                For standard video visit slot
              </p>
            </div>
            <div className="flex items-baseline text-slate-900 dark:text-white font-black text-xl tracking-tight">
              <FiDollarSign size={16} className="text-slate-400 self-center" />
              <span>{doctor.consultationFee}</span>
              <span className="text-xxs text-slate-400 dark:text-slate-500 font-medium ml-0.5">
                BDT
              </span>
            </div>
          </div>

          {/* Availability schedule card */}
          <div className="border backdrop-blur-md p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="text-xxs font-semibold text-slate-400 dark:text-slate-500">
                Weekly availability
              </h3>
              <p className="text-xxs text-slate-400 dark:text-slate-500 leading-relaxed">
                Select a preferred schedule option to make a booking request.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {schedules.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto custom-panel-scrollbar pr-1">
                  {schedules.map((schedule) => (
                    <button
                      key={schedule._id}
                      type="button"
                      disabled={!schedule.isActive}
                      onClick={() => setSelectedScheduleId(schedule._id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex flex-col gap-1 transition-all relative ${
                        !schedule.isActive
                          ? "opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-900"
                          : selectedScheduleId === schedule._id
                            ? "bg-teal-500/5 border-teal-500/40 text-teal-600 dark:text-teal-400 font-medium shadow-sm shadow-teal-500/5 cursor-pointer"
                            : "bg-slate-50/40 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold flex items-center gap-1.5">
                          <FiCalendar
                            size={12}
                            className={
                              selectedScheduleId === schedule._id
                                ? "text-teal-500"
                                : "text-slate-400"
                            }
                          />
                          {schedule.dayOfWeek}
                        </span>
                        <span className="text-xxs px-1.5 py-0.5 rounded bg-slate-200/50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 font-mono text-slate-500">
                          {schedule.slotDuration} min sessions
                        </span>
                      </div>
                      <div className="text-xxs text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono mt-0.5">
                        <span>{schedule.startTime}</span>
                        <span>–</span>
                        <span>{schedule.endTime}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xxs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950">
                  No active operating hours found for this week.
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedScheduleId}
                className={`w-full py-2.5 text-xs font-semibold tracking-wide rounded-xl shadow-sm text-center transition-all ${
                  selectedScheduleId
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:opacity-90 active:scale-98 cursor-pointer"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed"
                }`}
              >
                Request appointment
              </button>
            </form>
          </div>

          {/* Footer security card */}
          <div className="border border-dashed p-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 flex items-center gap-3">
            <FiShield className="text-teal-500 shrink-0" size={14} />
            <div>
              <h4 className="text-xxs font-semibold text-slate-700 dark:text-slate-300">
                Secure connection
              </h4>
              <p className="text-xxs text-slate-400 dark:text-slate-500">
                All health bookings match active practitioner operating
                conditions securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
