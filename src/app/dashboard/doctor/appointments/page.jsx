"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  getDoctorAppointments,
  cancelAppointment,
} from "@/services/appointments/appointment.service";
import { toast } from "react-hot-toast";
import {
  FiClock,
  FiCalendar,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState("all"); // all, scheduled, completed, cancelled
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      // Passing empty object or pre-constructed filters if your backend expects query parameters
      const res = await getDoctorAppointments();
      if (res?.success) {
        setAppointments(res.data || []);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Cancel Appointment handler
  const handleCancelAppointment = async (appointmentId) => {
    if (!confirm("Are you sure you want to cancel this scheduled appointment?"))
      return;

    startTransition(async () => {
      try {
        const res = await cancelAppointment(appointmentId);
        if (res?.success) {
          toast.success(res?.message || "Appointment cancelled successfully");
          // Update status locally to maintain state accuracy
          setAppointments((prev) =>
            prev.map((appt) =>
              appt._id === appointmentId
                ? { ...appt, status: "cancelled" }
                : appt,
            ),
          );
        } else {
          toast.error(res?.message || "Failed to cancel appointment");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    });
  };

  // Filtering Logic
  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus =
      statusFilter === "all" || appt.status === statusFilter;

    // Safety check fallback for nested patient names
    const patientName = appt.patientId?.name || appt.patientName || "";
    const matchesSearch = patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Helper styling mapping for system statuses
  const getStatusStyles = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 p-6 md:p-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-500 to-cyan-500 md:from-teal-400 md:to-cyan-400 bg-clip-text text-transparent">
          My Appointments
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review patient bookings, look up consultation schedules, or coordinate
          availability overrides.
        </p>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-6 p-4 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-xl focus:outline-none focus:border-teal-500 text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
          />
        </div>

        {/* Status Category Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900">
          {["all", "scheduled", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === tab
                  ? "bg-white dark:bg-slate-800 shadow-sm text-teal-600 dark:text-teal-400 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Area Grid Layout */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-teal-500"></div>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="border rounded-2xl p-12 text-center max-w-xl mx-auto mt-12 backdrop-blur-md border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 shadow-sm">
          <FiAlertCircle className="mx-auto text-4xl mb-4 text-slate-400 dark:text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            No records matched
          </h3>
          <p className="text-sm mt-1 text-slate-500 dark:text-slate-400">
            There are no appointments fitting this scope or query at this
            moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredAppointments.map((appt) => {
            const patientName =
              appt.patientId?.name || appt.patientName || "Anonymous Patient";
            const patientEmail =
              appt.patientId?.email || appt.patientEmail || "";

            return (
              <div
                key={appt._id}
                className="border backdrop-blur-md p-5 rounded-2xl transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-teal-500/50 dark:hover:border-teal-500/40 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Top segment with Profile representation and status tag */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-slate-800/80 text-teal-600 dark:text-teal-400">
                        <FiUser size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-1">
                          {patientName}
                        </h3>
                        {patientEmail && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">
                            {patientEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-0.5 border rounded-full font-medium capitalize ${getStatusStyles(appt.status)}`}
                    >
                      {appt.status}
                    </span>
                  </div>

                  {/* Core Timing constraints info fields */}
                  <div className="space-y-2.5 my-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                      <span>
                        {appt.date
                          ? new Date(appt.date).toLocaleDateString(undefined, {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                      <span>
                        {appt.startTime} – {appt.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conditional Actions Segment bottom wrapper */}
                {appt.status === "scheduled" && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end">
                    <button
                      onClick={() => handleCancelAppointment(appt._id)}
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      title="Cancel Booking"
                    >
                      <FiXCircle size={14} />
                      Cancel Appointment
                    </button>
                  </div>
                )}

                {appt.status === "completed" && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end text-emerald-500 dark:text-emerald-400 text-xs font-medium gap-1">
                    <FiCheckCircle size={14} />
                    <span>Fulfilled session</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
