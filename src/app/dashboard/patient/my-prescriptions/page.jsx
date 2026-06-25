"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  RxClipboard,
  RxClock,
  RxCheckCircled,
  RxReload,
  RxDownload,
  RxInfoCircled,
  RxMagnifyingGlass,
  RxFileText,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";

export default function PrescriptionsPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const prescriptionsData = [
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

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const filteredRx = prescriptionsData.filter((rx) => {
    const matchesTab = rx.status === activeTab;
    const matchesSearch =
      rx.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRx.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRx = filteredRx.slice(startIndex, endIndex);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Header Segment */}
      <div className="border-b border-slate-100 dark:border-slate-900 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E3A8A] dark:text-white sm:text-3xl">
          My Prescriptions
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor active medical treatments, review dosage histories, and
          request pharmacy refills.
        </p>
      </div>

      {/* Control Utility Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 p-3 rounded-[12px] shadow-sm">
        {/* Left Side: Search Field with Integrated Action Button */}
        <div className="relative flex items-center w-full sm:max-w-md">
          <RxMagnifyingGlass className="absolute left-3 text-slate-400 w-4 h-4 z-10" />
          <input
            type="text"
            placeholder="Search medication or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 rounded-[8px] pl-9 pr-20 py-1.5 text-xs outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-all font-medium"
          />
          <button className="absolute right-1 top-1 bottom-1 px-3 bg-[#1E3A8A] text-white rounded-[6px] text-[11px] font-semibold hover:bg-opacity-95 transition-all active:scale-95">
            Search
          </button>
        </div>

        {/* Right Side: Tab Menu */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-[8px] sm:w-auto gap-0.5">
          {["active", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 text-xs font-semibold tracking-tight capitalize rounded-[5px] transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-800 text-[#1E3A8A] dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {tab === "active" ? "Active" : "History"}
            </button>
          ))}
        </div>
      </div>

      {/* Prescription View List */}
      <div className="space-y-3">
        {paginatedRx.length === 0 ? (
          <div className="text-center py-16 border border-[#E6F0FA] dark:border-slate-900 bg-white dark:bg-[#090d1f] rounded-[12px] text-slate-400 shadow-sm">
            <RxClipboard className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-xs font-medium text-slate-500">
              No matching prescriptions found
            </p>
          </div>
        ) : (
          paginatedRx.map((rx) => (
            <Link
              key={rx.id}
              href={`/dashboard/patient/my-prescriptions/${rx.id}`}
            >
              <div className="bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] p-4 shadow-sm space-y-3.5 hover:shadow-md transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Information Layout */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2 rounded-[8px] shrink-0 ${
                        rx.status === "active"
                          ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-600"
                      }`}
                    >
                      <RxFileText className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                        {rx.medication}
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            rx.status === "active"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
                          }`}
                        >
                          {rx.status === "active" ? (
                            <RxCheckCircled className="w-2.5 h-2.5" />
                          ) : (
                            <RxClock className="w-2.5 h-2.5" />
                          )}{" "}
                          {rx.status}
                        </span>
                      </h3>
                      <p className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-400">
                        {rx.dosage}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Prescribed by{" "}
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {rx.doctor}
                        </span>{" "}
                        ({rx.specialty})
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center gap-2 md:self-center self-end">
                    <button
                      className="p-1.5 rounded-[6px] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95"
                      title="Download PDF"
                    >
                      <RxDownload className="w-3.5 h-3.5" />
                    </button>
                    {rx.status === "active" && (
                      <button
                        disabled={rx.refillsLeft === 0}
                        className="px-3 py-1.5 text-[11px] font-semibold bg-[#1E3A8A] text-white rounded-[6px] shadow-xs hover:bg-opacity-95 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none inline-flex items-center gap-1"
                      >
                        <RxReload className="w-3 h-3" /> Refill
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Metadata row */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-900 flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-slate-400 font-medium">
                  <div>
                    ID:{" "}
                    <span className="font-mono font-bold text-slate-600 dark:text-slate-200">
                      {rx.id}
                    </span>
                  </div>
                  <div>
                    Issued:{" "}
                    <span className="text-slate-600 dark:text-slate-200">
                      {rx.issuedDate}
                    </span>
                  </div>
                  <div>
                    Expires:{" "}
                    <span className="text-slate-600 dark:text-slate-200">
                      {rx.expiryDate}
                    </span>
                  </div>
                  {rx.status === "active" && (
                    <div
                      className={
                        rx.refillsLeft === 0 ? "text-rose-500 font-bold" : ""
                      }
                    >
                      Refills Left:{" "}
                      <span className="font-bold">{rx.refillsLeft}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Container */}
      {totalPages >= 1 && (
        <div className="p-3 bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <p className="text-xs font-medium text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {filteredRx.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {endIndex > filteredRx.length ? filteredRx.length : endIndex}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {filteredRx.length}
            </span>{" "}
            entries
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 disabled:opacity-40 transition-all"
              >
                <RxChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 text-xs font-semibold rounded-md transition-all ${
                      currentPage === page
                        ? "bg-[#1E3A8A] text-white"
                        : "border border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 disabled:opacity-40 transition-all"
              >
                <RxChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Advisory Segment */}
      <div className="p-4 rounded-[12px] bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
        <RxInfoCircled className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          <strong>Clinical Regulation Notice:</strong> Online refill execution
          pipelines operate under strict pharmacy verification layers. If you
          run out of remaining refills, a tracking evaluation consultation run
          with your provider is mandatory.
        </div>
      </div>
    </div>
  );
}
