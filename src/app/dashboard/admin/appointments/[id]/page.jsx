"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  RxArrowLeft,
  RxCalendar,
  RxClock,
  RxPerson,
  RxPencil1,
  RxCheckCircled,
  RxCross2,
  RxQuestionMarkCircled,
} from "react-icons/rx";
import {
  getAppointmentById,
  cancelAppointment,
} from "@/services/appointments/appointment.service";

export default function AdminAppointmentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  // Admin notes remain local-only for now
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      setIsLoading(true);
      try {
        const response = await getAppointmentById(id);
        const data = response?.data || response;
        setAppointment(data);
      } catch (error) {
        console.error("Failed to load appointment:", error);
        toast.error(error?.message || "Couldn't load this appointment.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchAppointment();
  }, [id]);

  const handleCancel = async () => {
    if (!appointment) return;
    setIsCancelling(true);
    try {
      await cancelAppointment(appointment._id);
      setAppointment((prev) => ({
        ...prev,
        appointmentStatus: "cancelled",
      }));
      toast.success("Appointment cancelled successfully.");
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error(
        error?.message || "Couldn't cancel this appointment. Please try again.",
      );
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-[#1E3A8A] dark:text-[#3cd1c2]">
        <div className="w-8 h-8 border-2 border-t-transparent border-current rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400">
          Loading appointment record...
        </span>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-slate-400">
        <span className="text-sm font-medium">
          This appointment couldn't be found.
        </span>
        <button
          onClick={() => router.back()}
          className="text-[13px] font-bold text-[#1E3A8A] dark:text-[#3cd1c2] hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  // Normalize backend lower-case schema status values into UI labels
  const rawStatus = (appointment.appointmentStatus || "").toLowerCase();
  const isScheduled = rawStatus === "pending" || rawStatus === "confirmed";
  const isCompleted = rawStatus === "completed";
  const isCancelled = rawStatus === "cancelled";

  let statusLabel = "Scheduled";
  if (isCompleted) statusLabel = "Completed";
  if (isCancelled) statusLabel = "Cancelled";

  // Helper values for dynamic avatar representations
  const pName =
    appointment.patientName || appointment.patient?.name || "Unknown Patient";
  const dName =
    appointment.doctorName || appointment.doctor?.name || "Unknown Doctor";
  const pInitial = pName.charAt(0).toUpperCase();
  const dInitial = dName
    .replace(/^Dr\.\s*/i, "")
    .charAt(0)
    .toUpperCase();

  console.log(appointment);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Navigation Row Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to Master Queue</span>
        </button>

        <span
          className={`px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase border ${
            isScheduled
              ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50"
              : isCompleted
                ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
                : "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50"
          }`}
        >
          Encounter {statusLabel}
        </span>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Case File Content Body Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Relationship Mapping Card */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                Encounter Token ID: {appointment._id}
              </span>
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-2">
                Entities Linked
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] font-medium pt-2">
              {/* Patient Profile Box */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-center gap-4">
                {appointment.patientImage || appointment.patient?.image ? (
                  <img
                    src={appointment.patientImage || appointment.patient?.image}
                    alt={pName}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-[15px] shrink-0 border border-slate-300/30">
                    {pInitial || <RxPerson className="w-5 h-5" />}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Patient Entity
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                    {pName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                    ID: {appointment.patientId || "—"}
                  </span>
                </div>
              </div>

              {/* Doctor Profile Box */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] flex items-center gap-4">
                {appointment.doctorImage || appointment.doctor?.image ? (
                  <img
                    src={
                      appointment.doctorImage || appointment.doctor?.user?.image
                    }
                    alt={dName}
                    className="w-12 h-12 rounded-full object-cover border border-teal-200 dark:border-teal-900/50 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-[15px] shrink-0 border border-teal-200/50">
                    {dInitial || <RxPerson className="w-5 h-5" />}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Assigned Medical Doctor
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                    {dName}
                  </span>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold mt-0.5 truncate">
                    {appointment.doctorSpecialization || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Intake Medical Parameters Summary Panel */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Clinical Intake Parameters
            </h3>

            <div className="space-y-4 text-[13px] font-medium">
              <div>
                <span className="text-slate-400 block text-[11px] font-bold uppercase">
                  Reported Symptom Presentation
                </span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {appointment.symptoms || "No symptoms recorded."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-900/60 pt-4">
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">
                    Financial Context
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold block mt-0.5">
                    Fee: ${appointment.consultationFee || "0"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">
                    Payment Gateway Status
                  </span>
                  <span className="text-emerald-600 font-bold block mt-0.5 uppercase tracking-wide text-[12px]">
                    {appointment.paymentStatus || "unpaid"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel Side-Rail Menu */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Scheduling Context
            </h3>

            <div className="space-y-3 font-medium text-[13px]">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxCalendar className="w-4 h-4" /> Date
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {appointment.appointmentDate
                    ? new Date(appointment.appointmentDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxClock className="w-4 h-4" /> Time Slot
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                  {appointment.appointmentTime || "—"}
                </span>
              </div>
            </div>

            {isScheduled && (
              <div className="pt-2 space-y-2">
                <button
                  disabled
                  title="Action requires additional backend workflow extension endpoints."
                  className="w-full py-2 bg-emerald-600/40 text-white font-bold text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 cursor-not-allowed"
                >
                  <RxCheckCircled className="w-4 h-4" /> Resolve Encounter
                  <RxQuestionMarkCircled className="w-3.5 h-3.5 opacity-70" />
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="w-full py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 disabled:opacity-50 dark:bg-rose-950/20 dark:text-rose-400 font-bold text-[13px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isCancelling ? (
                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                  ) : (
                    <RxCross2 className="w-4 h-4" />
                  )}
                  Cancel Booking
                </button>
              </div>
            )}
          </div>

          {/* Admin Override Notes Box */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-3">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <RxPencil1 className="w-4 h-4 text-slate-400" /> Internal Desk
              Notes
            </h3>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full min-h-[100px] p-3 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] resize-none font-medium leading-relaxed"
              placeholder="Append administrative verification log overrides..."
            />
            <p className="text-[11px] text-slate-400 italic">
              Not saved yet — notes persistence isn't built on the backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
