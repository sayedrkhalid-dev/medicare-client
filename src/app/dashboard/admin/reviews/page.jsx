"use client";

import React, { useState, useEffect } from "react";
import {
  RxMagnifyingGlass,
  RxStarFilled,
  RxTrash,
  RxCheckCircled,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

// Mock global review repository reflecting cross-linked profile testimonies
const initialReviewsDatabase = [
  {
    id: "REV-102",
    patientName: "Eleanor Vance",
    doctorName: "Dr. Marcus Vance",
    rating: 5,
    comment:
      "Exemplary precision during my clinical neuro diagnostics. Absolute elite professional care.",
    date: "2026-06-25",
    status: "Approved",
  },
  {
    id: "REV-103",
    patientName: "Dominic Snyder",
    doctorName: "Dr. Amara Patel",
    rating: 2,
    comment:
      "The virtual session waiting window ran 25 minutes behind schedule. Treatment plan was fine though.",
    date: "2026-06-23",
    status: "Pending",
  },
  {
    id: "REV-104",
    patientName: "Clara Oswald",
    doctorName: "Dr. Melissa Zhao",
    rating: 5,
    comment:
      "Brilliant interaction style, very empathetic handling of child developmental milestones.",
    date: "2026-06-20",
    status: "Approved",
  },
  {
    id: "REV-105",
    patientName: "Arthur Dent",
    doctorName: "Dr. Alan Grant",
    rating: 1,
    comment:
      "Completely automated spam text containing malicious external phishing domains.",
    date: "2026-06-18",
    status: "Flagged",
  },
];

export default function AdminReviewsModerationPage() {
  const [reviews, setReviews] = useState(initialReviewsDatabase);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Reset pagination index upon changing filters
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const handleApprove = (id) => {
    setReviews((prev) =>
      prev.map((rev) => (rev.id === id ? { ...rev, status: "Approved" } : rev)),
    );
    console.log(`Review ${id} visible state authorized live.`);
  };

  const handleFlag = (id) => {
    setReviews((prev) =>
      prev.map((rev) => (rev.id === id ? { ...rev, status: "Flagged" } : rev)),
    );
    console.log(`Review ${id} quarantined for inspection.`);
  };

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((rev) => rev.id !== id));
    console.log(`Review ${id} purged from system storage.`);
  };

  // Step 1: Filter collections based on text matching and status configuration
  const filteredReviews = reviews.filter((rev) => {
    const matchesTab = activeTab === "All" || rev.status === activeTab;
    const matchesSearch =
      rev.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Step 2: Slice pagination view layers
  const totalItems = filteredReviews.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Module Header Area */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          Provider Reviews & Feedback Quality Controls
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Moderate public feedback posts, verify text integrity guidelines, and
          manage profile sentiment score weights.
        </p>
      </div>

      {/* Pipeline Control Dashboard Row */}
      <div className="space-y-4 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
        {/* Search Input Vector */}
        <div className="relative">
          <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search via Patient Name, Physician, or specific review comment text keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
          />
        </div>

        {/* Dynamic Tab Filter Segments */}
        <div className="flex border-b border-slate-100 dark:border-slate-900/60 pt-2 select-none">
          {["All", "Pending", "Approved", "Flagged"].map((tab) => {
            const count =
              tab === "All"
                ? reviews.length
                : reviews.filter((r) => r.status === tab).length;
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
                  <span>{tab} Logs</span>
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

      {/* Main Feedback Record Layout Stack */}
      <div className="space-y-4">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4 transition-all hover:border-slate-200 dark:hover:border-slate-800 group"
            >
              <div className="space-y-2.5 flex-1">
                {/* Meta Header Grid */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px]">
                  <span className="font-mono font-bold text-slate-400">
                    {rev.id}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {rev.patientName}
                  </span>
                  <span className="text-slate-400">&rarr; Feedback for</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {rev.doctorName}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] ml-auto md:ml-0">
                    {rev.date}
                  </span>
                </div>

                {/* Star Metric Line Block */}
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <RxStarFilled
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? "text-amber-400" : "text-slate-200 dark:text-slate-800"}`}
                    />
                  ))}
                </div>

                {/* Review Body Text Content */}
                <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                  "{rev.comment}"
                </p>
              </div>

              {/* Action Modifiers Alignment Column */}
              <div className="flex items-center md:self-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50 dark:border-slate-900 justify-end shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider border mr-2 ${
                    rev.status === "Approved"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-transparent"
                      : rev.status === "Flagged"
                        ? "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-transparent"
                        : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-transparent"
                  }`}
                >
                  {rev.status}
                </span>

                {rev.status !== "Approved" && (
                  <button
                    onClick={() => handleApprove(rev.id)}
                    className="p-2.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-white dark:bg-transparent transition-colors"
                    title="Authorize & Display Review"
                  >
                    <RxCheckCircled className="w-4 h-4" />
                  </button>
                )}

                {rev.status !== "Flagged" && (
                  <button
                    onClick={() => handleFlag(rev.id)}
                    className="p-2.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-white dark:bg-transparent transition-colors"
                    title="Quarantine Content Content"
                  >
                    <RxTrash className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-2.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-rose-100 dark:border-rose-950/40 rounded-[10px] transition-colors"
                  title="Purge From Core Storage Node"
                >
                  <RxTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-12 rounded-[16px] text-center text-[13px] font-medium text-slate-400 shadow-sm">
            No feedback entries found within designated profile constraints.
          </div>
        )}
      </div>

      {/* Structural Pagination Component */}
      {totalItems > 0 && (
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm select-none">
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
            reviews entries
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
  );
}
