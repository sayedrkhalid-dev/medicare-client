"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getAppointmentById,
  cancelAppointment,
} from "@/services/appointments/appointment.service";
import { toast } from "react-hot-toast";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiMail,
  FiActivity,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const fetchAppointmentDetails = async () => {
    try {
      setIsLoading(true);
      const res = await getAppointmentById(id);
      if (res?.success) {
        setAppointment(res.data);
      } else {
        toast.error(res?.message || "Appointment details not found");
        router.push("/dashboard/doctor/appointments");
      }
    } catch (error) {
      toast.error(error.message || "Failed to load appointment details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchAppointmentDetails();
  }, [id]);

  const handleConfirmCancel = () => {
    startTransition(async () => {
      try {
        const res = await cancelAppointment(id);
        if (res?.success) {
          toast.success("Appointment cancelled successfully");
          setAppointment((prev) => ({ ...prev, status: "cancelled" }));
          setIsCancelModalOpen(false);
        } else {
          toast.error(res?.message || "Failed to cancel appointment");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    });
  };

  const getStatusBadge = (status) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-teal-500"></div>
      </div>
    );
  }

  if (!appointment) return null;

  const patientName =
    appointment.patientId?.name ||
    appointment.patientName ||
    "Anonymous Patient";
  const patientEmail =
    appointment.patientId?.email ||
    appointment.patientEmail ||
    "No email available";

  return (
    <div className="min-h-screen transition-colors duration-300 p-6 md:p-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Back Button & Navigation */}
      <button
        onClick={() => router.push("/dashboard/doctor/appointments")}
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer group"
      >
        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        Back to Appointments
      </button>

      {/* Header Context Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span
            className={`inline-flex text-xs font-semibold px-2.5 py-0.5 border rounded-full mb-3 uppercase tracking-wider ${getStatusBadge(appointment.status)}`}
          >
            {appointment.status}
          </span>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-500 to-cyan-500 md:from-teal-400 md:to-cyan-400 bg-clip-text text-transparent">
            Appointment File Context
          </h1>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 font-mono">
            ID: {appointment._id}
          </p>
        </div>

        {appointment.status === "scheduled" && (
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-lg shadow-rose-500/10 transition-all active:scale-98 cursor-pointer"
          >
            <FiXCircle size={16} />
            Cancel Appointment
          </button>
        )}
      </div>

      {/* Grid Layout Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Patient Profile Snap Block */}
          <div className="border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
              <FiUser className="text-teal-500" />
              Patient Identity Information
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {patientName}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 inline-flex items-center gap-1.5 mt-1">
                  <FiMail className="text-slate-400" />
                  {patientEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Consultation Notes Section */}
          <div className="border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
              <FiFileText className="text-teal-500" />
              Consultation Notes / Reason
            </h2>
            <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-sm text-slate-600 dark:text-slate-300 min-h-[100px]">
              {appointment.notes ||
                appointment.reason ||
                "No explicit symptoms or baseline context notes were filled out during submission for this slot."}
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="space-y-6">
          <div className="border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
              <FiActivity className="text-teal-500" />
              Logistics & Metrics
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800/80 text-teal-600 dark:text-teal-400 mt-0.5">
                  <FiCalendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {appointment.date
                      ? new Date(appointment.date).toLocaleDateString(
                          undefined,
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800/80 text-teal-600 dark:text-teal-400 mt-0.5">
                  <FiClock size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                    Time Window
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {appointment.startTime} – {appointment.endTime}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                {appointment.status === "completed" ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    <FiCheckCircle size={16} className="flex-shrink-0" />
                    <span>
                      This appointment has been fulfilled. No modifications
                      allowed.
                    </span>
                  </div>
                ) : appointment.status === "cancelled" ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 dark:text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                    <FiAlertCircle size={16} className="flex-shrink-0" />
                    <span>
                      This appointment was cancelled and the slot has been
                      freed.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    <FiClock size={16} className="flex-shrink-0" />
                    <span>
                      Awaiting patient consultation arrival on active calendar
                      timeline.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal Confirmation Alert */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in bg-slate-900/40 dark:bg-slate-950/80">
          <div className="border w-full max-w-sm rounded-2xl p-6 relative shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 animate-scale-up">
            <div className="flex items-center gap-3 text-rose-500 mb-3">
              <FiAlertCircle size={24} className="flex-shrink-0" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Cancel Appointment?
              </h2>
            </div>

            <p className="text-sm mb-6 text-slate-500 dark:text-slate-400 leading-relaxed">
              Are you sure you want to cancel this scheduled consultation with{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {patientName}
              </span>
              ? This slot will be re-opened for booking, and this action cannot
              be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 text-sm font-medium cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                disabled={isPending}
              >
                No, Keep It
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Cancelling..." : "Yes, Cancel Session"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
