"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RxMagnifyingGlass,
  RxEyeOpen,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

// Mock historical processing data directly matching Stripe transaction records
const initialStripeLedgerDatabase = [
  {
    id: "ch_3MxsKSFkXvKuK6MM1N3",
    customerName: "Eleanor Vance",
    email: "e.vance@gmail.com",
    amount: 120.0,
    currency: "USD",
    date: "2026-06-25 14:12",
    status: "Succeeded",
    payout: "Transferred",
  },
  {
    id: "ch_3MxsNSFkXvKuK6MM2O5",
    customerName: "Dominic Snyder",
    email: "d.snyder@yahoo.com",
    amount: 75.5,
    currency: "USD",
    date: "2026-06-24 09:32",
    status: "Succeeded",
    payout: "Pending",
  },
  {
    id: "ch_3MxsPSFkXvKuK6MM3P9",
    customerName: "Clara Oswald",
    email: "c.oswald@gmail.com",
    amount: 210.0,
    currency: "USD",
    date: "2026-06-22 17:05",
    status: "Failed",
    payout: "None",
  },
  {
    id: "ch_3MxsRSFkXvKuK6MM4Q1",
    customerName: "Arthur Dent",
    email: "adent@galaxy.net",
    amount: 45.0,
    currency: "USD",
    date: "2026-06-19 11:18",
    status: "Refunded",
    payout: "Reversed",
  },
];

export default function AdminPaymentsLedgerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Track position corrections during interaction routines
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  // Step 1: Compute matching arrays through target parameters
  const filteredCharges = initialStripeLedgerDatabase.filter((charge) => {
    const matchesTab = activeTab === "All" || charge.status === activeTab;
    const matchesSearch =
      charge.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Step 2: Slice layout arrays clean
  const totalItems = filteredCharges.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCharges = filteredCharges.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Title Component */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          Stripe Payment Clearing Ledger
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Audit live transaction keys, inspect processing events, and check
          webhook verification profiles.
        </p>
      </div>

      {/* Aggregate Ratio Balance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Stripe Live Gross
          </span>
          <span className="text-[22px] font-black text-slate-950 dark:text-white mt-1 block">
            $450.50{" "}
            <span className="text-[12px] text-slate-400 font-medium">USD</span>
          </span>
        </div>
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Payout Matrix Route
          </span>
          <span className="text-[22px] font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            Connected
          </span>
        </div>
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            API Framework Node
          </span>
          <span className="text-[22px] font-black text-slate-700 dark:text-slate-300 font-mono text-[16px] mt-2 block">
            v3/charges
          </span>
        </div>
      </div>

      {/* Controls Infrastructure Pipeline */}
      <div className="space-y-4 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
        {/* Search Input Vector */}
        <div className="relative">
          <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Filter via Stripe Charge Identifier ID (ch_...), Customer Profile, or email handle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
          />
        </div>

        {/* Tab Status Segment Selection */}
        <div className="flex border-b border-slate-100 dark:border-slate-900/60 pt-2 select-none">
          {["All", "Succeeded", "Failed", "Refunded"].map((tab) => {
            const count =
              tab === "All"
                ? initialStripeLedgerDatabase.length
                : initialStripeLedgerDatabase.filter((c) => c.status === tab)
                    .length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-6 text-[13px] font-bold tracking-tight relative transition-colors ${
                  activeTab === tab
                    ? "text-[#1E3A8A] dark:text-[#3cd1c2]"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{tab}</span>
                  <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-4 text-center">
                    {count}
                  </span>
                </div>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] dark:bg-[#3cd1c2] animate-slideIn" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Roster Layout Sheet Container */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">Stripe Charge token ID</th>
                <th className="py-4 px-6">Account Holder</th>
                <th className="py-4 px-6">Clearing Value</th>
                <th className="py-4 px-6">Settlement Timestamp</th>
                <th className="py-4 px-6">Stripe Gateway Profile</th>
                <th className="py-4 px-6 text-right">Payout state</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900/60 text-[13px]">
              {paginatedCharges.length > 0 ? (
                paginatedCharges.map((charge) => (
                  <tr
                    key={charge.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono text-[12px] text-slate-400 font-bold max-w-[180px] truncate">
                      {charge.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {charge.customerName}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                          {charge.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-black text-slate-900 dark:text-white">
                      ${charge.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-500 dark:text-slate-400 text-[12px]">
                      {charge.date}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-black border uppercase tracking-wider ${
                          charge.status === "Succeeded"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900"
                            : charge.status === "Failed"
                              ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900"
                              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900"
                        }`}
                      >
                        {charge.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3 font-medium text-[12px]">
                        <span className="text-slate-500 dark:text-slate-400 font-semibold">
                          {charge.payout}
                        </span>
                        <Link
                          href={`/dashboard/admin/payments/${charge.id}`}
                          className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white dark:bg-transparent transition-colors"
                          title="Inspect Financial Invoice Details"
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
                    No clear transaction items correspond to designated Stripe
                    log filter.
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
              transactions
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
