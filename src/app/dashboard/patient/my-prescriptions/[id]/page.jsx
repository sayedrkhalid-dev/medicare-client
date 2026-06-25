"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxDownload,
  RxReload,
  RxPerson,
  RxCalendar,
  RxInfoCircled,
} from "react-icons/rx";

// Mock function to simulate a database fetch
const getPrescriptionById = (id) => {
  const data = [
    /* Your full prescriptionsData array from before */
    {
      id: "RX-90210",
      medication: "Atorvastatin (Lipitor)",
      dosage: "20mg — Once daily at bedtime",
      doctor: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      issuedDate: "June 14, 2026",
      expiryDate: "Dec 14, 2026",
      refillsLeft: 3,
      status: "active",
    },
    {
      id: "RX-88401",
      medication: "Metformin HCl",
      dosage: "500mg — Twice daily with breakfast and dinner",
      doctor: "Dr. Eleanor Vance",
      specialty: "General Physician",
      issuedDate: "May 20, 2026",
      expiryDate: "Nov 20, 2026",
      refillsLeft: 2,
      status: "active",
    },
    {
      id: "RX-44102",
      medication: "Amoxicillin Trihydrate",
      dosage: "500mg — Three times daily with nutritional food",
      doctor: "Dr. Eleanor Vance",
      specialty: "General Physician",
      issuedDate: "May 10, 2026",
      expiryDate: "June 10, 2026",
      refillsLeft: 0,
      status: "expired",
    },
    {
      id: "RX-31092",
      medication: "Ibuprofen",
      dosage: "400mg — As needed for localized joint inflammation",
      doctor: "Dr. Aris Thorne",
      specialty: "Dermatologist",
      issuedDate: "January 11, 2026",
      expiryDate: "February 11, 2026",
      refillsLeft: 0,
      status: "expired",
    },
  ];
  return data.find((item) => item.id === id);
};

export default function PrescriptionDetailsPage({ params }) {
  const { id } = React.use(params);
  const router = useRouter();
  const rx = getPrescriptionById(id);

  if (!rx)
    return <div className="p-10 text-center">Prescription not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1E3A8A] transition-all"
      >
        <RxArrowLeft className="w-4 h-4" /> Back to List
      </button>

      {/* Hero Header */}
      <div className="bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[14px] p-6 shadow-xs">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {rx.medication}
            </h1>
            <p className="text-sm text-[#1E3A8A] dark:text-blue-400 font-semibold mt-1">
              {rx.dosage}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Prescription ID</p>
            <p className="font-mono font-bold text-slate-600 dark:text-slate-200">
              {rx.id}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[14px] p-5">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
              Clinical Instructions
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-4 rounded-[8px]">
              {rx.instructions}
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[14px] p-5">
            <h4 className="text-xs font-bold uppercase text-slate-400 flex items-center gap-2 mb-3">
              <RxPerson /> Provider
            </h4>
            <p className="text-sm font-bold">{rx.doctor}</p>
            <p className="text-xs text-slate-500">{rx.specialty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
