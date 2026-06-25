"use client";

import React, { useState, useEffect } from "react";
import {
  RxStar,
  RxChatBubble,
  RxPencil1,
  RxCheckCircled,
  RxClock,
  RxChevronLeft,
  RxChevronRight,
  RxInfoCircled,
  RxActivityLog,
  RxEyeOpen,
  RxPerson,
} from "react-icons/rx";

export default function MyReviewsPage() {
  const [activeTab, setActiveTab] = useState("published");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set to 2 to test pagination transitions cleanly

  const reviewsData = [
    {
      id: "REV-102",
      doctor: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150",
      date: "July 14, 2026",
      rating: 5,
      comment:
        "Dr. Jenkins was incredibly thorough during my EKG evaluation. She took the time to explain the results in plain English, which completely alleviated my anxiety. High-end professional care!",
      status: "published",
      helpfulCount: 14,
    },
    {
      id: "REV-089",
      doctor: "Dr. Eleanor Vance",
      specialty: "General Physician",
      image:
        "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150",
      date: "June 16, 2026",
      rating: 4,
      comment:
        "Very clean clinic environment and short waiting queue times. Dr. Vance was highly professional, though the appointment felt slightly rushed due to high patient volume that morning.",
      status: "published",
      helpfulCount: 3,
    },
    {
      id: "REV-044",
      doctor: "Dr. Aris Thorne",
      specialty: "Dermatologist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
      date: "March 11, 2026",
      rating: 5,
      comment:
        "Superb treatment plan for my chronic eczema. The custom ointment prescription cleared up the inflammation flares within four days. Highly recommend her clinic.",
      status: "published",
      helpfulCount: 9,
    },
    {
      id: "REQ-401",
      doctor: "Dr. Aris Thorne",
      specialty: "Dermatologist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
      date: "Appointment on June 18, 2026",
      status: "pending",
      helpfulCount: 0,
    },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredReviews = reviewsData.filter((rev) => rev.status === activeTab);

  // Pagination Logic
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  // Scoreboard Metrics Calculations
  const totalPublished = reviewsData.filter(
    (r) => r.status === "published",
  ).length;
  const averageRating = (
    reviewsData
      .filter((r) => r.status === "published")
      .reduce((acc, r) => acc + r.rating, 0) / totalPublished
  ).toFixed(1);
  const totalHelpfulClicks = reviewsData.reduce(
    (acc, r) => acc + r.helpfulCount,
    0,
  );

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <RxStar
            key={i}
            className={`w-3.5 h-3.5 ${i < rating ? "fill-current" : "text-slate-200 dark:text-slate-800"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-900 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E3A8A] dark:text-white sm:text-3xl">
          My Reviews
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review metrics, verify performance indexes, and configure transparency
          data loops.
        </p>
      </div>

      {/* Analytics Scoreboard Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-[16px] bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-[12px] bg-[#E6F0FA]/60 dark:bg-slate-900 text-[#1E3A8A] dark:text-blue-400 shrink-0">
            <RxStar className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Average Given Rating
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5 block">
              {averageRating} / 5.0
            </span>
          </div>
        </div>

        <div className="p-5 rounded-[16px] bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-[12px] bg-[#E6F0FA]/60 dark:bg-slate-900 text-[#1E3A8A] dark:text-blue-400 shrink-0">
            <RxCheckCircled className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Published Indices
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5 block">
              {totalPublished} Submissions
            </span>
          </div>
        </div>

        <div className="p-5 rounded-[16px] bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-[12px] bg-[#E6F0FA]/60 dark:bg-slate-900 text-[#1E3A8A] dark:text-blue-400 shrink-0">
            <RxEyeOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Patient Helpful Impact
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5 block">
              {totalHelpfulClicks} Peer Votes
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100/80 dark:bg-slate-950 p-1 rounded-[12px] max-w-sm gap-1">
        {["published", "pending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 text-xs font-semibold tracking-tight capitalize rounded-[8px] transition-all ${
              activeTab === tab
                ? "bg-white dark:bg-slate-800 text-[#1E3A8A] dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {tab === "published" ? "Live Records" : "Action Requests"}
          </button>
        ))}
      </div>

      {/* Main Table Content */}
      <div className="border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] bg-white dark:bg-[#090d1f] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-[#E6F0FA] dark:border-slate-900 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6 w-1/4">Care Provider</th>
                <th className="py-4 px-6 w-1/2">Evaluation / Review Message</th>
                <th className="py-4 px-6 w-1/4 text-right">Status Telemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6F0FA] dark:divide-slate-900 text-sm">
              {paginatedReviews.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="py-12 text-center text-slate-400 dark:text-slate-600"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RxChatBubble className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                      <p className="font-semibold text-slate-500">
                        No active records match parameters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedReviews.map((rev) => (
                  <tr
                    key={rev.id}
                    className="align-top group hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-all"
                  >
                    {/* Provider Column with Profile Image */}
                    <td className="py-5 px-6">
                      <div className="flex items-start gap-3">
                        {rev.image ? (
                          <img
                            src={rev.image}
                            alt={rev.doctor}
                            className="w-10 h-10 rounded-full object-cover border border-[#E6F0FA] dark:border-slate-800 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                            <RxPerson className="w-5 h-5" />
                          </div>
                        )}
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
                            {rev.doctor}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            {rev.specialty}
                          </p>
                          <span className="inline-block text-[10px] font-mono bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 mt-1">
                            {rev.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Review Body Column */}
                    <td className="py-5 px-6 max-w-xl">
                      {rev.comment ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            {renderStars(rev.rating)}
                            <span className="text-xs text-slate-400">
                              {rev.date}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                            "{rev.comment}"
                          </p>
                          {rev.helpfulCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                              <RxActivityLog className="w-3 h-3" /> Found
                              helpful by {rev.helpfulCount} peers
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1.5 pt-1">
                          <p className="text-xs italic text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                            <RxClock className="w-3.5 h-3.5 text-amber-500" />{" "}
                            Request triggered from {rev.date}
                          </p>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Your voice matters. Help other patients evaluate
                            clinic options.
                          </p>
                        </div>
                      )}
                    </td>

                    {/* Operational Action Column */}
                    <td className="py-5 px-6 text-right whitespace-nowrap">
                      {rev.status === "published" ? (
                        <div className="space-y-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                            <RxCheckCircled className="w-3.5 h-3.5" /> Publicly
                            Live
                          </span>
                          <button className="block ml-auto text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                            Modify Statement
                          </button>
                        </div>
                      ) : (
                        <button className="px-4 py-2 text-xs font-bold bg-[#1E3A8A] hover:bg-opacity-90 text-white rounded-[10px] shadow-sm transition-all active:scale-95 inline-flex items-center gap-1.5">
                          <RxPencil1 className="w-3.5 h-3.5" /> Write Evaluation
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Integrated Pagination Section */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-50/40 dark:bg-slate-950/20 border-t border-[#E6F0FA] dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-medium text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-600 dark:text-slate-300">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-600 dark:text-slate-300">
                {endIndex > filteredReviews.length
                  ? filteredReviews.length
                  : endIndex}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-600 dark:text-slate-300">
                {filteredReviews.length}
              </span>{" "}
              metrics
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

      {/* Advisory Banner */}
      <div className="p-4 rounded-[12px] bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
        <RxInfoCircled className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          <strong>Transparency and Verification Rules:</strong> Patient
          evaluations remain subject to HIPAA compliance layers. Direct clinical
          metric updates map directly onto active practitioner profiles upon
          system approval workflows.
        </div>
      </div>
    </div>
  );
}
