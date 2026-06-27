"use client";

import React, { useState, useEffect } from "react";
import {
  RxCheck,
  RxCross2,
  RxEyeOpen,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

// Expanded mock data database tracking application state histories cleanly
const initialApplicationsDatabase = [
  {
    id: "APP-4021",
    name: "Dr. Evelyn Sinclair",
    specialty: "Cardiology",
    licenseNumber: "LIC-883921-MD",
    submissionDate: "2026-06-22",
    experience: "8 Years",
    status: "Pending",
  },
  {
    id: "APP-1194",
    name: "Dr. Christopher Vance",
    specialty: "Neurology",
    licenseNumber: "LIC-441029-MD",
    submissionDate: "2026-06-24",
    experience: "12 Years",
    status: "Pending",
  },
  {
    id: "APP-8832",
    name: "Dr. Melissa Zhao",
    specialty: "Pediatrics",
    licenseNumber: "LIC-229410-MD",
    submissionDate: "2026-06-19",
    experience: "5 Years",
    status: "Approved",
  },
  {
    id: "APP-5510",
    name: "Dr. Arthur Pendelton",
    specialty: "Dermatology",
    licenseNumber: "LIC-774012-MD",
    submissionDate: "2026-05-11",
    experience: "14 Years",
    status: "Rejected",
  },
  {
    id: "APP-2291",
    name: "Dr. Sarah Jenkins",
    specialty: "Orthopedics",
    licenseNumber: "LIC-109432-MD",
    submissionDate: "2026-06-25",
    experience: "6 Years",
    status: "Pending",
  },
  {
    id: "APP-6104",
    name: "Dr. Alan Grant",
    specialty: "General Medicine",
    licenseNumber: "LIC-302914-MD",
    submissionDate: "2026-04-02",
    experience: "20 Years",
    status: "Approved",
  },
];

export default function DoctorApplicationsPage() {
  const [applications, setApplications] = useState(initialApplicationsDatabase);
  const [currentTab, setCurrentTab] = useState("Pending");

  // Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Intentionally low to clearly demonstrate multi-page handling

  // Reset page counter back to 1 when user swaps status tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab]);

  const handleUpdateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    );
    console.log(`Application ${id} status updated to: ${newStatus}`);
  };

  // Step 1: Compute matching data arrays for the active status context
  const filteredApps = applications.filter((app) => app.status === currentTab);

  // Step 2: Extract index constraints for current page chunk slicing
  const totalItems = filteredApps.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApps = filteredApps.slice(startIndex, endIndex);

  // Status Badge Styling map helper
  const getTabBadgeColor = (tab) => {
    switch (tab) {
      case "Pending":
        return "bg-amber-500";
      case "Approved":
        return "bg-emerald-500";
      case "Rejected":
        return "bg-rose-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Module Header Area */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          Doctor Credentials Verification Board
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Review, inspect, and transition medical practitioner licenses through
          the explicit platform lifecycle.
        </p>
      </div>

      {/* Tab Segmentation Row (Pending, Approved, Rejected) */}
      <div className="flex border-b border-slate-100 dark:border-slate-900/60 pt-2 select-none">
        {["Pending", "Approved", "Rejected"].map((tab) => {
          const count = applications.filter((a) => a.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`pb-3 px-6 text-[13px] font-bold tracking-tight relative transition-colors ${
                currentTab === tab
                  ? "text-[#1E3A8A] dark:text-[#3cd1c2]"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab} Applications</span>
                {count > 0 && (
                  <span
                    className={`${getTabBadgeColor(tab)} text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-4 text-center`}
                  >
                    {count}
                  </span>
                )}
              </div>
              {currentTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] dark:bg-[#3cd1c2] animate-slideIn" />
              )}
            </button>
          );
        })}
      </div>

      {/* Applications Data Matrix Container */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">Practitioner Info</th>
                <th className="py-4 px-6">Specialty Field</th>
                <th className="py-4 px-6">Medical License</th>
                <th className="py-4 px-6">Submission Date</th>
                <th className="py-4 px-6">Experience Base</th>
                <th className="py-4 px-6 text-right">Verification Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900/60 text-[13px]">
              {paginatedApps.length > 0 ? (
                paginatedApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {app.name}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 font-mono mt-0.5">
                          {app.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[12px] font-bold tracking-tight bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                        {app.specialty}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-600 dark:text-slate-300 text-[12px]">
                      {app.licenseNumber}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-500 dark:text-slate-400 font-mono text-[12px]">
                      {app.submissionDate}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                      {app.experience}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Detail Inspector Button */}
                        <button
                          onClick={() =>
                            console.log(`Open document view for ${app.id}`)
                          }
                          className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                          title="Inspect Documents"
                        >
                          <RxEyeOpen className="w-4 h-4" />
                        </button>

                        {/* Interactive Status Mutation Control Triggers */}
                        {app.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(app.id, "Approved")
                              }
                              className="p-2 border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:border-emerald-950/40 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-[10px] transition-colors"
                              title="Approve Credentials"
                            >
                              <RxCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(app.id, "Rejected")
                              }
                              className="p-2 border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-400 rounded-[10px] transition-colors"
                              title="Reject Application"
                            >
                              <RxCross2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
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
                    No doctor configurations matching "{currentTab}" found in
                    this node segment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Structural Pagination Engine Baseline */}
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
              applications
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
