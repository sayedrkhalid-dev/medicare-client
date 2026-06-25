"use client";

import React, { useState, useEffect } from "react";
import {
  RxReader,
  RxDownload,
  RxCalendar,
  RxCheckCircled,
  RxClock,
  RxExclamationTriangle,
  RxChevronLeft,
  RxChevronRight,
  RxInfoCircled,
} from "react-icons/rx";

export default function PaymentHistoryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Real-world scenario healthcare billing telemetry data
  const transactions = [
    {
      id: "TXN-99401",
      service: "Cardiology Consultation & EKG",
      provider: "Dr. Sarah Jenkins",
      date: "July 12, 2026",
      amount: 185.0,
      method: "Visa ending in 4242",
      status: "completed",
    },
    {
      id: "TXN-99105",
      service: "Prescription Refill — Lipitor (30 Day)",
      provider: "Medicare Central Pharmacy",
      date: "July 02, 2026",
      amount: 15.4,
      method: "Copay Balance",
      status: "completed",
    },
    {
      id: "TXN-98200",
      service: "Dermatology Follow-up",
      provider: "Dr. Aris Thorne",
      date: "June 18, 2026",
      amount: 75.0,
      method: "Mastercard ending in 8812",
      status: "pending",
    },
    {
      id: "TXN-95112",
      service: "Lab Diagnostics — Blood Panel",
      provider: "Quest Diagnostics Labs",
      date: "May 14, 2026",
      amount: 210.0,
      method: "Insurance Copay",
      status: "completed",
    },
    {
      id: "TXN-91024",
      service: "General Wellness Screening",
      provider: "Dr. Eleanor Vance",
      date: "April 03, 2026",
      amount: 120.0,
      method: "Visa ending in 4242",
      status: "failed",
    },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredTransactions = transactions.filter((txn) => {
    if (activeFilter === "all") return true;
    return txn.status === activeFilter;
  });

  // Pagination bounds calculation logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex,
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
            <RxCheckCircled className="w-3.5 h-3.5" /> Paid
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
            <RxClock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
            <RxExclamationTriangle className="w-3.5 h-3.5" /> Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Header View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E3A8A] dark:text-white sm:text-3xl">
            Payment History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track claims processing, verify copays, and securely download
            itemized medical invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d1f] text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-[12px] text-sm font-semibold tracking-tight hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-[0.98]">
            <RxDownload className="w-4 h-4" /> Export Statement
          </button>
        </div>
      </div>

      {/* Segmented Filter Control Array */}
      <div className="flex bg-slate-100/80 dark:bg-slate-950 p-1 rounded-[12px] max-w-md gap-1">
        {["all", "completed", "pending", "failed"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 text-center py-2 text-xs font-semibold tracking-tight capitalize rounded-[8px] transition-all ${
              activeFilter === filter
                ? "bg-white dark:bg-slate-800 text-[#1E3A8A] dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {filter === "all" ? "All Billing" : filter}
          </button>
        ))}
      </div>

      {/* Clean Tabular Layout Grid Structure */}
      <div className="border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] bg-white dark:bg-[#090d1f] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-[#E6F0FA] dark:border-slate-900 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Transaction / Description</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Method</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6F0FA] dark:divide-slate-900 text-sm">
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-slate-400 dark:text-slate-600"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RxReader className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                      <p className="font-semibold text-slate-500">
                        No payment records match filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="group hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-all"
                  >
                    {/* Description Block */}
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
                          {txn.service}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                          <span className="font-mono bg-slate-100 dark:bg-slate-900 px-1.5 py-0.2 rounded">
                            {txn.id}
                          </span>
                          <span>•</span>
                          <span>{txn.provider}</span>
                        </p>
                      </div>
                    </td>

                    {/* Date Block */}
                    <td className="py-4 px-6 whitespace-nowrap text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <RxCalendar className="w-4 h-4 text-slate-400" />{" "}
                        {txn.date}
                      </span>
                    </td>

                    {/* Funding Instrument */}
                    <td className="py-4 px-6 whitespace-nowrap text-slate-500 dark:text-slate-400 font-medium">
                      {txn.method}
                    </td>

                    {/* Status badge metric */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getStatusBadge(txn.status)}
                    </td>

                    {/* Numeric pricing values */}
                    <td className="py-4 px-6 text-right font-bold text-slate-900 dark:text-white font-mono">
                      ${txn.amount.toFixed(2)}
                    </td>

                    {/* Context Action Matrix */}
                    <td className="py-4 px-6 text-right">
                      {txn.status === "completed" ? (
                        <button
                          title="Download Receipt PDF"
                          className="p-1.5 text-slate-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-all active:scale-95"
                        >
                          <RxDownload className="w-4 h-4" />
                        </button>
                      ) : txn.status === "failed" ? (
                        <button className="text-xs font-semibold text-rose-600 hover:underline">
                          Retry Payment
                        </button>
                      ) : (
                        <span className="text-xs italic text-slate-400">
                          Processing
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Control Segment */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-50/40 dark:bg-slate-950/20 border-t border-[#E6F0FA] dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-medium text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-600 dark:text-slate-300">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-600 dark:text-slate-300">
                {endIndex > filteredTransactions.length
                  ? filteredTransactions.length
                  : endIndex}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-600 dark:text-slate-300">
                {filteredTransactions.length}
              </span>{" "}
              statements
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 disabled:opacity-40 transition-all"
              >
                <RxChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 text-xs font-semibold rounded-md transition-all ${
                      currentPage === page
                        ? "bg-[#1E3A8A] text-white"
                        : "border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
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
                className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 disabled:opacity-40 transition-all"
              >
                <RxChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Advisory Info Footer Banner */}
      <div className="p-4 rounded-[12px] bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
        <RxInfoCircled className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          <strong>Insurance & Out-of-Pocket processing notice:</strong>{" "}
          Co-payments, deductibles, and direct clinical adjustments are updated
          live following insurer adjudication protocols. If you spot anomalies
          in a coverage matrix declaration, reach out to standard billing
          navigation support channels.
        </div>
      </div>
    </div>
  );
}
