"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxCalendar,
  RxClock,
  RxPerson,
  RxActivityLog,
  RxPencil1,
  RxCheckCircled,
  RxCross2,
} from "react-icons/rx";

// Mock database registry for targeted single-session audits
const appointmentsDatabase = {
  "APT-8821": {
    patientName: "Eleanor Vance",
    patientId: "USR-9021",
    doctorName: "Dr. Marcus Vance",
    doctorId: "DOC-2941",
    specialty: "Neurology",
    date: "2026-06-28",
    time: "10:30 AM",
    status: "Scheduled",
    symptoms:
      "Chronic localized migraines accompanied by severe visual aura and intermittent vertigo over the past 3 weeks.",
    consultationType: "Video Telehealth Tele-Encounter",
    insuranceProvider: "BlueCross Core Premium",
    timeline: [
      {
        action: "Session Initiated & Created",
        time: "2026-06-20 14:15",
        user: "Patient Engine",
      },
      {
        action: "Slot Verification Authorized",
        time: "2026-06-20 15:00",
        user: "System Automaton",
      },
    ],
  },
};

export default function AdminAppointmentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Fallback fallback selector maintaining layout continuity for arbitrary mock IDs
  const appointment =
    appointmentsDatabase[id] || appointmentsDatabase["APT-8821"];

  const [status, setStatus] = useState(appointment.status);
  const [adminNotes, setAdminNotes] = useState(
    "Prior medical record transfers verified by regional compliance office.",
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Navigation Row Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to Master Queue</span>
        </button>

        <span
          className={`px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase border ${
            status === "Scheduled"
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : status === "Completed"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-rose-50 text-rose-600 border-rose-200"
          }`}
        >
          Encounter {status}
        </span>
      </div>

      {/* Main Structural Breakdown Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Case File Content Body Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Relationship Mapping Card */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                Encounter Token ID: {id}
              </span>
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-2">
                Entities Linked
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] font-medium pt-2">
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-start gap-3">
                <RxPerson className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Patient Entity
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {appointment.patientName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {appointment.patientId}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-start gap-3">
                <RxPerson className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Assigned Medical Doctor
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {appointment.doctorName}
                  </span>
                  <span className="text-[11px] text-teal-600 font-semibold mt-0.5">
                    {appointment.specialty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Intake Medical Parameters Summary Panel */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Clinical Intake Parameters
            </h3>

            <div className="space-y-4 text-[13px] font-medium">
              <div>
                <span className="text-slate-400 block text-[11px] font-bold uppercase">
                  Reported Symptom Presentation Matrix
                </span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {appointment.symptoms}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-900/60 pt-4">
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">
                    Structural Encounter Vector
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold block mt-0.5">
                    {appointment.consultationType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">
                    Verified Coverage Asset
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold block mt-0.5">
                    {appointment.insuranceProvider}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure System Action Audit Trails (Sequence Component Alternative style) */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Lifecycle Change Logs
            </h3>
            <div className="space-y-3">
              {appointment.timeline.map((evt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-[12px] border-l-2 border-slate-100 dark:border-slate-800 pl-4 relative ml-1"
                >
                  <div className="w-2 h-2 rounded-full bg-slate-300 absolute -left-[5px] top-1.5" />
                  <div className="flex-1 font-medium">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">
                      {evt.action}
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">
                      {evt.time} &bull; Identity: {evt.user}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel Side-Rail Menu */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Scheduling Context
            </h3>

            <div className="space-y-3 font-medium text-[13px]">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxCalendar className="w-4 h-4" /> Calendar Target
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {appointment.date}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxClock className="w-4 h-4" /> Window Lock
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {appointment.time}
                </span>
              </div>
            </div>

            {status === "Scheduled" && (
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setStatus("Completed");
                    console.log("Session administratively marked complete.");
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5"
                >
                  <RxCheckCircled className="w-4 h-4" /> Resolve Encounter
                </button>
                <button
                  onClick={() => {
                    setStatus("Cancelled");
                    console.log("Session administratively aborted.");
                  }}
                  className="w-full py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 font-bold text-[13px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5"
                >
                  <RxCross2 className="w-4 h-4" /> Cancel Booking
                </button>
              </div>
            )}
          </div>

          {/* Admin Override Notes Box */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-3">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <RxPencil1 className="w-4 h-4 text-slate-400" /> Internal Desk
              Notes
            </h3>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full min-h-[100px] p-3 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] resize-none font-medium leading-relaxed"
              placeholder="Append administrative verification log overrides..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
