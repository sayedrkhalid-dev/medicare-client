"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxStarFilled,
  RxCheckCircled,
  RxExclamationTriangle,
  RxTrash,
  RxPerson,
  RxCalendar,
} from "react-icons/rx";

// Mock review repository containing targeted evaluation details
const historicalReviewsDatabase = {
  "REV-103": {
    id: "REV-103",
    patientName: "Dominic Snyder",
    patientId: "USR-4012",
    doctorName: "Dr. Amara Patel",
    doctorId: "DOC-7721",
    rating: 2,
    comment:
      "The virtual session waiting window ran 25 minutes behind schedule. Treatment plan was fine though.",
    date: "2026-06-23 11:24:15",
    status: "Pending",
    moderationFlags: ["Latency Complaint", "No Profanity Detected"],
    trustScore: "88%",
  },
};

export default function AdminReviewDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Fallback selector maintaining view stability across arbitrary mock IDs
  const initialReview =
    historicalReviewsDatabase[id] || historicalReviewsDatabase["REV-103"];
  const [review, setReview] = useState(initialReview);

  const updateStatus = (newStatus) => {
    setReview((prev) => ({ ...prev, status: newStatus }));
    console.log(`Review tracking state explicitly committed to: ${newStatus}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Navigation Row Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to Moderation Desk</span>
        </button>

        <span
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-black border uppercase tracking-wider ${
            review.status === "Approved"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400"
              : review.status === "Flagged"
                ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400"
                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400"
          }`}
        >
          Moderation Status: {review.status}
        </span>
      </div>

      {/* Main Column Framework Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Elements and Review Context */}
        <div className="lg:col-span-2 space-y-6">
          {/* Node Entities Profile Mapping */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                Review Reference Token: {review.id}
              </span>
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-2">
                Linked Ecosystem Members
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] font-medium pt-1">
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-start gap-3">
                <RxPerson className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Author (Patient)
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {review.patientName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {review.patientId}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-start gap-3">
                <RxPerson className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Target Practitioner
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {review.doctorName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {review.doctorId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Core Body */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900/60 pb-4">
              <div>
                <span className="text-slate-400 text-[11px] font-bold uppercase block">
                  Submitted Score Weights
                </span>
                <div className="flex items-center gap-0.5 text-amber-400 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <RxStarFilled
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-amber-400" : "text-slate-200 dark:text-slate-800"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[11px] font-bold uppercase block">
                  Submission Clock
                </span>
                <span className="text-[12px] font-mono font-bold text-slate-600 dark:text-slate-400 mt-2 block">
                  {review.date}
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-bold uppercase">
                Feedback Record Context
              </span>
              <p className="text-slate-800 dark:text-slate-200 mt-2.5 leading-relaxed font-semibold bg-slate-50/60 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-transparent text-[14px]">
                "{review.comment}"
              </p>
            </div>
          </div>
        </div>

        {/* System Diagnostics & Instant Moderation Override Triggers */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-5">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Heuristics & Automated Logs
            </h3>

            <div className="space-y-4 font-medium text-[13px]">
              <div>
                <span className="text-slate-400 text-[11px] font-bold uppercase block mb-1.5">
                  Algorithmic Risk Assessment
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {review.moderationFlags.map((flag, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-400 text-[11px] font-bold px-2 py-0.5 rounded border border-slate-200/40 dark:border-slate-800"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-900 pt-3">
                <span className="text-slate-400 text-[11px] font-bold uppercase">
                  Account Trust Integrity
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-black text-[14px]">
                  {review.trustScore}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-900 pt-4 space-y-2">
              <span className="text-slate-400 text-[11px] font-bold uppercase block mb-2">
                Administrative Interventions
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateStatus("Approved")}
                  disabled={review.status === "Approved"}
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-[12px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5"
                >
                  <RxCheckCircled className="w-4 h-4" /> Approve
                </button>

                <button
                  onClick={() => updateStatus("Flagged")}
                  disabled={review.status === "Flagged"}
                  className="py-2 px-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold text-[12px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5"
                >
                  <RxExclamationTriangle className="w-4 h-4" /> Quarantine
                </button>
              </div>

              <button
                onClick={() =>
                  console.log(`Purging record ${review.id} completely.`)
                }
                className="w-full py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-950/40 font-bold text-[12px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5"
              >
                <RxTrash className="w-4 h-4" /> Permanent Delete Node
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
