"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
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
import {
  getAllAppointments,
  cancelAppointment,
} from "@/services/appointments/appointment.service";

export default function AppointmentsManagementPage() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  const [currentTab, setCurrentTab] = useState("Scheduled");

  // Search-on-click, same pattern as DoctorApplicationsPage: searchDraft is
  // what the input shows; searchTerm is what's actually sent to the server.
  const [searchDraft, setSearchDraft] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination is now server-side (the API returns data + meta), matching
  // UserManagementPage's pattern, instead of client-side slicing.
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Reset to page 1 whenever a filter actually changes (status tab or an
  // applied search), not on every keystroke of the draft.
  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab, searchTerm]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const data = await getAllAppointments({
          page: currentPage,
          limit: itemsPerPage,
          status: currentTab,
          search: searchTerm,
        });
        setAppointments(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
        setTotalItems(data.meta?.total || 0);
      } catch (error) {
        console.error("Failed to load appointments:", error);
        toast.error(
          error?.message ||
            "Couldn't load appointments. Please refresh the page.",
        );
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [currentPage, currentTab, searchTerm]);

  const runSearch = () => {
    setSearchTerm(searchDraft);
  };

  const handleCancelAppointment = async (id) => {
    setActionId(id);
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, status: "Cancelled" } : apt,
        ),
      );
      toast.success("Appointment cancelled.");
    } catch (error) {
      console.error(`Cancel error on appointment: ${id}`, error);
      toast.error(
        error?.message || "Couldn't cancel this appointment. Please try again.",
      );
    } finally {
      setActionId(null);
    }
  };

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
      {/* Advanced Control Box Pipeline */}
      <div className="space-y-4 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
        {/* Search Input Vector — search-on-click via the button, same as
            DoctorApplicationsPage */}
        <div className="relative flex items-stretch">
          <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search via Patient, Doctor, Specialty Field, or Booking ID..."
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
            className="w-full pl-10 pr-20 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
          />
          <button
            type="button"
            onClick={runSearch}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 text-[12px] font-bold rounded-[9px] bg-[#1E3A8A] hover:bg-[#162d6b] dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors duration-200 active:scale-[0.97] cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Tab Segmentation Element Grid */}
        <div className="flex border-b border-slate-100 dark:border-slate-900/60 pt-2 select-none overflow-x-auto">
          {["Scheduled", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`pb-3 px-6 text-[13px] font-bold tracking-tight relative transition-colors whitespace-nowrap ${
                currentTab === tab
                  ? "text-[#1E3A8A] dark:text-[#3cd1c2]"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab} Bookings</span>
              </div>
              {currentTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] dark:bg-[#3cd1c2] animate-slideIn" />
              )}
            </button>
          ))}
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#1E3A8A] dark:text-[#3cd1c2]">
                      <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                      <span className="text-[13px] font-medium text-slate-400">
                        Loading consultation records...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : appointments.length > 0 ? (
                appointments.map((apt) => (
                  <tr
                    key={apt._id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-[12px]">
                      <Link
                        href={`/dashboard/admin/appointments/${apt._id}`}
                        className="text-slate-500 hover:text-[#1E3A8A] dark:hover:text-[#3cd1c2] underline underline-offset-2 transition-colors"
                      >
                        {apt._id}
                      </Link>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      {apt.patient?.name || "Unknown Patient"}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                      {apt.doctor?.name || "Unknown Doctor"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                        {apt.doctor?.specialization ||
                          apt.specialty ||
                          "General"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col text-[12px] font-medium text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-700 dark:text-slate-300">
                          <RxCalendar className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {apt.date
                            ? new Date(apt.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "—"}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono mt-0.5">
                          <RxClock className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {apt.time || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/appointments/${apt._id}`}
                          className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white dark:bg-transparent transition-colors"
                          title="Inspect File Overview"
                        >
                          <RxEyeOpen className="w-4 h-4" />
                        </Link>

                        {apt.status === "Scheduled" ? (
                          <button
                            onClick={() => handleCancelAppointment(apt._id)}
                            disabled={actionId !== null}
                            className="p-2 border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 disabled:opacity-50 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-400 rounded-[10px] transition-colors"
                            title="Revoke Booking Window"
                          >
                            {actionId === apt._id ? (
                              <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                            ) : (
                              <RxCross2 className="w-4 h-4" />
                            )}
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
        {!isLoading && totalItems > 0 && (
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
