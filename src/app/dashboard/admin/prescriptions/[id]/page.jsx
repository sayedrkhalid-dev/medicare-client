"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxCalendar,
  RxPerson,
  RxFile,
  RxInfoSign,
  RxDownload,
} from "react-icons/rx";

// Mock database registry for targeted single prescription audits
const prescriptionsDatabase = {
  "RX-9901": {
    patientName: "Eleanor Vance",
    patientId: "USR-9021",
    doctorName: "Dr. Marcus Vance",
    doctorId: "DOC-2941",
    diagnosis: "Chronic Migraine Refractory",
    medication: "Sumatriptan 50mg",
    dosageInstructions:
      "Take one tablet orally at the immediate onset of aura or acute phase migraine. Do not exceed 100mg within any 24-hour cycle window.",
    refillsRemaining: 2,
    issuedDate: "2026-06-25",
    expirationDate: "2026-12-25",
    status: "Active",
  },
};

export default function AdminPrescriptionDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Fallback selector maintaining layout continuity for arbitrary mock IDs
  const rx = prescriptionsDatabase[id] || prescriptionsDatabase["RX-9901"];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Navigation Row Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to Archives</span>
        </button>

        <span
          className={`px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase border ${
            rx.status === "Active"
              ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400"
              : rx.status === "Fulfilled"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400"
                : "bg-slate-50 text-slate-400 border-slate-200"
          }`}
        >
          Voucher {rx.status}
        </span>
      </div>

      {/* Main Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prescription Parameters Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Relationship Link Block */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                Registry Token: {id}
              </span>
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-2">
                Linked Profile Nodes
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] font-medium pt-1">
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-start gap-3">
                <RxPerson className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Patient Entity
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {rx.patientName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {rx.patientId}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-start gap-3">
                <RxPerson className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Prescribing Physician
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {rx.doctorName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {rx.doctorId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pharmaceutical Formula and Instructions */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-50 dark:border-slate-900/60 pb-4">
              <span className="text-slate-400 text-[11px] font-bold uppercase block">
                Clinical Diagnosis Vector
              </span>
              <span className="text-[15px] font-black text-slate-900 dark:text-white mt-1 block bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-transparent w-fit">
                {rx.diagnosis}
              </span>
            </div>

            <div className="space-y-4 text-[13px] font-medium">
              <div>
                <span className="text-slate-400 block text-[11px] font-bold uppercase">
                  Assigned Drug Formula
                </span>
                <span className="text-[#1E3A8A] dark:text-[#3cd1c2] font-black text-[16px] block mt-0.5">
                  {rx.medication}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] font-bold uppercase">
                  Regime Intake Instructions
                </span>
                <p className="text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed font-semibold">
                  {rx.dosageInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Details Side-Rail Menu */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Validation Logs
            </h3>

            <div className="space-y-3 font-medium text-[13px]">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxCalendar className="w-4 h-4" /> Issue Timestamp
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {rx.issuedDate}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxCalendar className="w-4 h-4" /> Expiry Threshold
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {rx.expirationDate}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxFile className="w-4 h-4" /> Refill Quantities
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-bold">
                  {rx.refillsRemaining} remaining
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                console.log(
                  `Triggering secure digital script download for token: ${id}`,
                )
              }
              className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-[13px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5"
            >
              <RxDownload className="w-4 h-4" /> Download Signed PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
