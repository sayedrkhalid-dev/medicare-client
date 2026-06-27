"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RxMagnifyingGlass,
  RxCalendar,
  RxClock,
  RxCross2,
  RxCheckCircled,
  RxEyeOpen,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

// Mock database containing comprehensive consulting logs across the platform
const initialAppointmentsDatabase = [
  {
    id: "APT-8821",
    patientName: "Eleanor Vance",
    doctorName: "Dr. Marcus Vance",
    specialty: "Neurology",
    date: "2026-06-28",
    time: "10:30 AM",
    status: "Scheduled",
  },
  {
    id: "APT-1104",
    patientName: "Dominic Snyder",
    doctorName: "Dr. Amara Patel",
    specialty: "Pediatrics",
    date: "2026-06-29",
    time: "02:15 PM",
    status: "Scheduled",
  },
  {
    id: "APT-4402",
    patientName: "Clara Oswald",
    doctorName: "Dr. Melissa Zhao",
    specialty: "Pediatrics",
    date: "2026-06-24",
    time: "09:00 AM",
    status: "Completed",
  },
  {
    id: "APT-9913",
    patientName: "Arthur Dent",
    doctorName: "Dr. Alan Grant",
    specialty: "General Medicine",
    date: "2026-06-22",
    time: "11:00 AM",
    status: "Cancelled",
  },
  {
    id: "APT-5561",
    patientName: "Martha Jones",
    doctorName: "Dr. Fiona Gallagher",
    specialty: "Dermatology",
    date: "2026-07-02",
    time: "04:00 PM",
    status: "Scheduled",
  },
];

export default function AppointmentsManagementPage() {
  const [appointments, setAppointments] = useState(initialAppointmentsDatabase);
  const [currentTab, setCurrentTab] = useState("Scheduled");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Reset page position to 1 upon control interaction changes
  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab, searchTerm]);

  const handleCancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "Cancelled" } : apt,
      ),
    );
    console.log(`Appointment ${id} administratively aborted.`);
  };

  // Filter collections based on category tabs and targeted text match rules
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = apt.status === currentTab;
    const matchesSearch =
      apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Extract layout segmentation indexes
  const totalItems = filteredAppointments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    endIndex,
  );

  const getTabColorConfig = (tab) => {
    switch (tab) {
      case "Scheduled":
        return "bg-blue-500";
      case "Completed":
        return "bg-emerald-500";
      case "Cancelled":
        return "bg-rose-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Title Section */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          Platform Consultation Master Queue
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Monitor scheduled clinical interaction paths, audit verification
          statuses, and execute systemic overrides.
        </p>
      </div>

      {/* Advanced Control Box Pipeline */}
      <div className="space-y-4 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
        {/* Search Input Vector */}
        <div className="relative">
          <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search via Patient, Doctor, Specialty Field, or Booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
          />
        </div>

        {/* Tab Segmentation Element Grid */}
        <div className="flex border-b border-slate-100 dark:border-slate-900/60 pt-2 select-none">
          {["Scheduled", "Completed", "Cancelled"].map((tab) => {
            const count = appointments.filter((a) => a.status === tab).length;
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
                  <span>{tab} Bookings</span>
                  {count > 0 && (
                    <span
                      className={`${getTabColorConfig(tab)} text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-4 text-center`}
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
      </div>

      {/* Roster Layout Sheet Container */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">Booking Key</th>
                <th className="py-4 px-6">Patient Entity</th>
                <th className="py-4 px-6">Assigned Doctor</th>
                <th className="py-4 px-6">Specialty</th>
                <th className="py-4 px-6">Schedule Window</th>
                <th className="py-4 px-6 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900/60 text-[13px]">
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((apt) => (
                  <tr
                    key={apt.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-[12px]">
                      <Link
                        href={`/dashboard/admin/appointments/${apt.id}`}
                        className="text-slate-500 hover:text-[#1E3A8A] dark:hover:text-[#3cd1c2] underline underline-offset-2 transition-colors"
                      >
                        {apt.id}
                      </Link>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      {apt.patientName}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                      {apt.doctorName}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                        {apt.specialty}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col text-[12px] font-medium text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-700 dark:text-slate-300">
                          <RxCalendar className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {apt.date}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono mt-0.5">
                          <RxClock className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {apt.time}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Detail Inspector Target Trigger */}
                        <Link
                          href={`/dashboard/admin/appointments/${apt.id}`}
                          className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white dark:bg-transparent transition-colors"
                          title="Inspect File Overview"
                        >
                          <RxEyeOpen className="w-4 h-4" />
                        </Link>

                        {/* Status Execution Modifiers */}
                        {apt.status === "Scheduled" ? (
                          <button
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="p-2 border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-400 rounded-[10px] transition-colors"
                            title="Revoke Booking Window"
                          >
                            <RxCross2 className="w-4 h-4" />
                          </button>
                        ) : apt.status === "Completed" ? (
                          <span className="text-emerald-500 inline-flex items-center gap-1 text-[12px] font-bold select-none px-2 py-1">
                            <RxCheckCircled className="w-4 h-4" /> Audited
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[12px] font-semibold italic select-none px-2 py-1">
                            Aborted
                          </span>
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
                    No session logs found within the designated configuration
                    constraints.
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
              total entries
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
