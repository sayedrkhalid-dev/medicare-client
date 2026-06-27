"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RxMagnifyingGlass,
  RxCalendar,
  RxFile,
  RxEyeOpen,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

// Mock database keeping comprehensive diagnostic records across the node cluster
const initialPrescriptionsDatabase = [
  {
    id: "RX-9901",
    patientName: "Eleanor Vance",
    doctorName: "Dr. Marcus Vance",
    diagnosis: "Chronic Migraine Refractory",
    medication: "Sumatriptan 50mg",
    issuedDate: "2026-06-25",
    status: "Active",
  },
  {
    id: "RX-4122",
    patientName: "Dominic Snyder",
    doctorName: "Dr. Amara Patel",
    specialty: "Pediatrics",
    diagnosis: "Acute Strep Pharyngitis",
    medication: "Amoxicillin 250mg/5mL",
    issuedDate: "2026-06-24",
    status: "Fulfilled",
  },
  {
    id: "RX-8830",
    patientName: "Clara Oswald",
    doctorName: "Dr. Melissa Zhao",
    diagnosis: "Allergic Rhinitis Chronic",
    medication: "Fluticasone Propionate",
    issuedDate: "2026-06-19",
    status: "Fulfilled",
  },
  {
    id: "RX-5511",
    patientName: "Arthur Dent",
    doctorName: "Dr. Alan Grant",
    diagnosis: "General Fatigue Check",
    medication: "Vitamin D3 50000 IU",
    issuedDate: "2026-05-12",
    status: "Expired",
  },
];

export default function AdminPrescriptionsLogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Records");

  // Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Reset page position to baseline when filters mutate
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Step 1: Compute matching data arrays based on criteria
  const filteredRecords = initialPrescriptionsDatabase.filter((rx) => {
    const matchesStatus =
      statusFilter === "All Records" || rx.status === statusFilter;
    const matchesSearch =
      rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Step 2: Slice current data segments cleanly
  const totalItems = filteredRecords.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Module Header Area */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          Prescription & Treatment Archives
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Review historical pharmaceutical assignments, diagnostic parameters,
          and fulfillment statuses across the platform.
        </p>
      </div>

      {/* Filter Pipeline Module */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-4 rounded-[16px] shadow-sm">
        <div className="relative flex-1">
          <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search via Patient Name, Doctor, Diagnosis statement, or RX ID Token..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 text-[13px] bg-white dark:bg-slate-900 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-700 dark:text-slate-300 font-semibold focus:outline-none"
        >
          <option value="All Records">All Status Profiles</option>
          <option value="Active">Active Refills</option>
          <option value="Fulfilled">Fulfilled Lifecycle</option>
          <option value="Expired">Expired Tokens</option>
        </select>
      </div>

      {/* Roster Layout Sheet Container */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">RX Token ID</th>
                <th className="py-4 px-6">Patient Entity</th>
                <th className="py-4 px-6">Prescribing Provider</th>
                <th className="py-4 px-6">Clinical Diagnosis</th>
                <th className="py-4 px-6">Medication Regime</th>
                <th className="py-4 px-6 text-right">Fulfillment Tracking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900/60 text-[13px]">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((rx) => (
                  <tr
                    key={rx.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-[12px]">
                      <Link
                        href={`/dashboard/admin/prescriptions/${rx.id}`}
                        className="text-slate-500 hover:text-[#1E3A8A] dark:hover:text-[#3cd1c2] underline underline-offset-2 transition-colors"
                      >
                        {rx.id}
                      </Link>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      {rx.patientName}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                      {rx.doctorName}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-400">
                        {rx.diagnosis}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-600 dark:text-slate-300">
                      {rx.medication}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            rx.status === "Active"
                              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400"
                              : rx.status === "Fulfilled"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400"
                                : "bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500"
                          }`}
                        >
                          {rx.status}
                        </span>

                        <Link
                          href={`/dashboard/admin/prescriptions/${rx.id}`}
                          className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white dark:bg-transparent transition-colors"
                          title="Inspect Prescription Record"
                        >
                          <RxEyeOpen className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-[13px] font-medium text-slate-400"
                  >
                    No prescription items found within the designated layout
                    parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Structural Pagination Engine */}
        {totalItems > 0 && (
          <div className="bg-slate-50/40 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <span className="text-[12px] font-medium text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {Math.min(endIndex, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {totalItems}
              </span>{" "}
              archived records
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <RxDoubleArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-[12px] font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-white dark:bg-slate-900 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px]">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <RxDoubleArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
