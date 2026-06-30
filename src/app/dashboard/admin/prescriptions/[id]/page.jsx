"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  RxArrowLeft,
  RxCalendar,
  RxPerson,
  RxFile,
  RxDownload,
  RxQuestionMarkCircled,
} from "react-icons/rx";
import { getPrescriptionById } from "@/services/prescriptions/prescription.service";

export default function AdminPrescriptionDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [rx, setRx] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrescription = async () => {
      setIsLoading(true);
      try {
        const data = await getPrescriptionById(id);
        setRx(data);
      } catch (error) {
        console.error("Failed to load prescription:", error);
        toast.error(error?.message || "Couldn't load this prescription.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPrescription();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-[#1E3A8A] dark:text-[#3cd1c2]">
        <div className="w-8 h-8 border-2 border-t-transparent border-current rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400">
          Loading prescription record...
        </span>
      </div>
    );
  }

  if (!rx) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-slate-400">
        <span className="text-sm font-medium">
          This prescription couldn't be found.
        </span>
        <button
          onClick={() => router.back()}
          className="text-[13px] font-bold text-[#1E3A8A] dark:text-[#3cd1c2] hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

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
          Voucher {rx.status || "Unknown"}
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
                Registry Token: {rx._id}
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
                    {rx.patient?.name || "Unknown Patient"}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {rx.patient?._id || "—"}
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
                    {rx.doctor?.name || "Unknown Doctor"}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {rx.doctor?._id || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pharmaceutical Formula and Instructions */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-50 dark:border-slate-900/60 pb-4">
              <span className="text-slate-400 text-[11px] font-bold uppercase block">
                Clinical Diagnosis
              </span>
              <span className="text-[15px] font-black text-slate-900 dark:text-white mt-1 block bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-transparent w-fit">
                {rx.diagnosis || "—"}
              </span>
            </div>

            <div className="space-y-4 text-[13px] font-medium">
              <div>
                <span className="text-slate-400 block text-[11px] font-bold uppercase">
                  Assigned Medication
                </span>
                <span className="text-[#1E3A8A] dark:text-[#3cd1c2] font-black text-[16px] block mt-0.5">
                  {rx.medication || "—"}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] font-bold uppercase">
                  Dosage Instructions
                </span>
                <p className="text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed font-semibold">
                  {rx.dosageInstructions || "No dosage instructions recorded."}
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
                  <RxCalendar className="w-4 h-4" /> Issue Date
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {rx.issuedDate
                    ? new Date(rx.issuedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxCalendar className="w-4 h-4" /> Expiry Date
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {rx.expirationDate
                    ? new Date(rx.expirationDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxFile className="w-4 h-4" /> Refills Remaining
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-bold">
                  {rx.refillsRemaining ?? "—"}
                </span>
              </div>
            </div>

            {/* No download/PDF endpoint exists yet, so this is disabled
                rather than faking a download with a console.log. */}
            <button
              disabled
              title="Not available yet — PDF export isn't supported by the backend yet."
              className="w-full mt-2 py-2.5 bg-slate-900/40 dark:bg-slate-800/40 text-white font-bold text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 cursor-not-allowed"
            >
              <RxDownload className="w-4 h-4" /> Download Signed PDF
              <RxQuestionMarkCircled className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
