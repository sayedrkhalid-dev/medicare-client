"use client";

import React, { useState, useEffect } from "react";
import {
  RxCalendar,
  RxClock,
  RxPerson,
  RxVideo,
  RxChevronRight,
  RxChevronLeft,
  RxCheckCircled,
  RxCrossCircled,
  RxInfoCircled,
} from "react-icons/rx";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set low to easily test pagination states

  // Mock data tailored to a modern Patient Portal setup
  const appointments = [
    {
      id: "APT-8821",
      doctor: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      date: "July 12, 2026",
      time: "10:30 AM - 11:00 AM",
      type: "Telehealth Video",
      status: "upcoming",
      roomCode: "MED-VIDEO-XYZ",
    },
    {
      id: "APT-4412",
      doctor: "Dr. Aris Thorne",
      specialty: "Dermatologist",
      date: "July 18, 2026",
      time: "02:15 PM - 02:45 PM",
      type: "In-Person Clinic",
      status: "upcoming",
    },
    {
      id: "APT-5591",
      doctor: "Dr. Keith Vance",
      specialty: "Neurologist",
      date: "August 03, 2026",
      time: "11:00 AM - 11:30 AM",
      type: "In-Person Clinic",
      status: "upcoming",
    },
    {
      id: "APT-1092",
      doctor: "Dr. Eleanor Vance",
      specialty: "General Physician",
      date: "June 14, 2026",
      time: "09:00 AM - 09:30 AM",
      type: "In-Person Clinic",
      status: "completed",
    },
    {
      id: "APT-0912",
      doctor: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      date: "May 02, 2026",
      time: "11:15 AM - 11:45 AM",
      type: "Telehealth Video",
      status: "canceled",
    },
  ];

  // Reset page position index to 1 whenever filtering tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredAppointments = appointments.filter(
    (apt) => apt.status === activeTab,
  );

  // Pagination Logic Calculation Profiles
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    endIndex,
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
            <RxClock className="w-3.5 h-3.5" /> Upcoming
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
            <RxCheckCircled className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "canceled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
            <RxCrossCircled className="w-3.5 h-3.5" /> Canceled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Dynamic Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E3A8A] dark:text-white sm:text-3xl">
            My Appointments
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review your scheduling timeline, join digital sessions, or request
            modifications.
          </p>
        </div>

        <button className="inline-flex items-center justify-center bg-[#1E3A8A] text-white px-4 py-2.5 rounded-[12px] text-sm font-semibold tracking-tight hover:bg-opacity-90 shadow-sm transition-all active:scale-[0.98]">
          Book New Appointment
        </button>
      </div>

      {/* Navigation Filter Tabs System */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
        {["upcoming", "completed", "canceled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium tracking-tight border-b-2 capitalize transition-all relative ${
              activeTab === tab
                ? "border-[#1E3A8A] text-[#1E3A8A] dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {tab}
            {appointments.filter((a) => a.status === tab).length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {appointments.filter((a) => a.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Appointment Feed List */}
      <div className="space-y-4">
        {paginatedAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-[16px] bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
            <RxCalendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-base font-semibold text-slate-600 dark:text-slate-400">
              No scheduled metrics found
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mt-1">
              There are currently no visits registered under the "{activeTab}"
              status profile.
            </p>
          </div>
        ) : (
          paginatedAppointments.map((apt) => (
            <div
              key={apt.id}
              className="group bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-200 hover:shadow-md hover:border-slate-200 dark:hover:border-slate-800"
            >
              {/* Profile / Details Grid Column */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-[12px] bg-[#E6F0FA]/60 dark:bg-slate-900 text-[#1E3A8A] dark:text-blue-400 shrink-0">
                  {apt.type.includes("Video") ? (
                    <RxVideo className="w-6 h-6" />
                  ) : (
                    <RxPerson className="w-6 h-6" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-bold text-[16px] text-slate-900 dark:text-white">
                      {apt.doctor}
                    </h3>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      •
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {apt.specialty}
                    </span>
                  </div>

                  {/* Timeframes and Parameters */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <RxCalendar className="w-4 h-4 text-slate-400" />{" "}
                      {apt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <RxClock className="w-4 h-4 text-slate-400" /> {apt.time}
                    </span>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    {getStatusBadge(apt.status)}
                    <span className="text-xs text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded font-mono">
                      {apt.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Operations Control Segment */}
              <div className="flex flex-wrap items-center gap-3 border-t border-slate-50 dark:border-slate-900 pt-4 md:pt-0 md:border-none justify-end shrink-0">
                {apt.status === "upcoming" && (
                  <>
                    {apt.roomCode && (
                      <button className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-[10px] transition-all active:scale-95 shadow-sm">
                        Join Call
                      </button>
                    )}
                    <button className="px-3.5 py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-[10px] transition-all text-slate-600 dark:text-slate-300">
                      Reschedule
                    </button>
                    <button className="px-3.5 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-[10px] transition-all">
                      Cancel
                    </button>
                  </>
                )}

                {apt.status === "completed" && (
                  <button className="px-3.5 py-2 text-sm font-medium border border-[#E6F0FA] dark:border-slate-800 hover:bg-[#E6F0FA]/30 dark:hover:bg-slate-900 text-[#1E3A8A] dark:text-blue-400 rounded-[10px] transition-all inline-flex items-center gap-1">
                    View Summary <RxChevronRight className="w-4 h-4" />
                  </button>
                )}

                {apt.status === "canceled" && (
                  <button className="px-3.5 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-[10px] hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                    Rebook Slot
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modern Compact Pagination Control Interface */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {endIndex > filteredAppointments.length
                ? filteredAppointments.length
                : endIndex}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {filteredAppointments.length}
            </span>{" "}
            appointments
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95"
            >
              <RxChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                    currentPage === pageNumber
                      ? "bg-[#1E3A8A] text-white shadow-sm"
                      : "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95"
            >
              <RxChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Subtle Portal Advisory banner footer */}
      <div className="p-4 rounded-[12px] bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/40 flex items-start gap-3">
        <RxInfoCircled className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-normal">
          <strong>Need to change an appointment?</strong> Appointments can be
          rescheduled online up to 24 hours prior to the slot. For immediate
          assistance or last-minute cancellations, please trigger the emergency
          channel or contact healthcare desk routing directly.
        </p>
      </div>
    </div>
  );
}
