"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  RxArrowLeft,
  RxEnvelopeClosed,
  RxCalendar,
  RxMobile,
  RxIdCard,
  RxStarFilled,
  RxActivityLog,
  RxCheckCircled,
  RxCrossCircled,
  RxExclamationTriangle,
  RxDotFilled,
} from "react-icons/rx";
import { LuShieldAlert } from "react-icons/lu";
import {
  getDoctorById,
  suspendDoctorById,
  activateDoctorById,
} from "@/services/doctors/doctor.service";

export default function DoctorDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showSelfSuspendModal, setShowSelfSuspendModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDoctor = async () => {
      setIsLoading(true);
      try {
        const data = await getDoctorById(id);
        setDoctor(data.data);
      } catch (error) {
        console.error("Failed to load doctor:", error);
        toast.error(error?.message || "Couldn't load this doctor's profile.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  // Close modal on Escape
  useEffect(() => {
    if (!showSelfSuspendModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowSelfSuspendModal(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showSelfSuspendModal]);

  const handleToggleStatus = async () => {
    if (!doctor || !id) return;
    setActionLoading(true);
    const isCurrentlyActive =
      (doctor.status || "approved").toLowerCase() === "approved";

    try {
      if (isCurrentlyActive) {
        await suspendDoctorById(id);
      } else {
        await activateDoctorById(id);
      }
      setDoctor((prev) => ({
        ...prev,
        status: isCurrentlyActive ? "suspended" : "approved",
      }));
      toast.success(
        isCurrentlyActive ? "Doctor suspended." : "Doctor activated.",
      );
    } catch (error) {
      console.error("Doctor status toggle failed:", error);
      const errorMessage =
        error?.response?.data?.message || error?.message || "";
      const lowerMessage = errorMessage.toLowerCase();

      if (
        lowerMessage.includes("self") ||
        lowerMessage.includes("own account") ||
        error?.response?.status === 400 ||
        error?.response?.status === 403
      ) {
        setShowSelfSuspendModal(true);
      } else {
        toast.error(
          isCurrentlyActive
            ? "Couldn't suspend this doctor. Please try again."
            : "Couldn't activate this doctor. Please try again.",
        );
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#090d16] gap-3 text-[#0077B6]">
        <div className="w-8 h-8 border-2 border-t-transparent border-current rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          Loading doctor profile...
        </span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] flex items-center justify-center p-4">
        <div className="text-center w-full max-w-md bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
            Doctor profile could not be found.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
          >
            <RxArrowLeft /> Back to Doctor Directory
          </button>
        </div>
      </div>
    );
  }

  const displayStatus = doctor.status || "approved";
  const isActiveState = displayStatus.toLowerCase() === "approved";

  return (
    <div className="space-y-4 max-w-7xl p-4 mx-auto min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-300 transition-colors duration-200">
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-[#03045E] dark:hover:text-[#CAF0F8] transition-colors group self-start"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Doctor Directory</span>
        </button>
        <span className="text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-[#111827] px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg self-start sm:self-auto">
          ID: {id}
        </span>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-[#111827] border border-[#90E0EF]/30 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            {doctor?.user?.image ? (
              <img
                src={doctor?.user?.image}
                alt={doctor?.user?.name || "Doctor"}
                className="w-14 h-14 rounded-full object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name || "Doctor")}&background=CAF0F8&color=03045E`;
                }}
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 flex items-center justify-center font-bold text-teal-700 dark:text-teal-400 text-lg uppercase">
                {(doctor?.user?.name || "D").charAt(0)}
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-[#03045E] dark:text-[#CAF0F8] leading-tight">
                  {doctor?.user?.name || "No Name Provided"}
                </h2>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                  {doctor.specialization || doctor.specialty || "General"}
                </span>
              </div>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 inline-flex items-center gap-1.5 mt-1 break-all select-all">
                <RxEnvelopeClosed className="w-3.5 h-3.5 shrink-0 text-[#0077B6]" />
                {doctor?.user?.email}
              </span>
            </div>
          </div>

          <span
            className={`self-start sm:self-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase whitespace-nowrap border ${
              isActiveState
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/20"
                : "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200/20"
            }`}
          >
            {displayStatus}
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-sm select-none">
          <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center gap-4">
            <RxStarFilled className="w-7 h-7 text-amber-500 shrink-0" />
            <div>
              <span className="block text-xs font-semibold text-[#0077B6] dark:text-slate-400 uppercase tracking-wider">
                Rating
              </span>
              <span className="text-[#03045E] dark:text-[#CAF0F8] font-bold text-base mt-0.5 block">
                {doctor.rating != null
                  ? `${Number(doctor.rating).toFixed(1)} / 5.0`
                  : "—"}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center gap-4">
            <RxActivityLog className="w-7 h-7 text-[#0077B6] shrink-0" />
            <div>
              <span className="block text-xs font-semibold text-[#0077B6] dark:text-slate-400 uppercase tracking-wider">
                Total Consultations
              </span>
              <span className="text-[#03045E] dark:text-[#CAF0F8] font-bold text-base mt-0.5 block">
                {doctor.appointmentsCount != null
                  ? `${doctor.appointmentsCount} bookings`
                  : "—"}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center gap-4">
            <RxCalendar className="w-7 h-7 text-purple-500 shrink-0" />
            <div>
              <span className="block text-xs font-semibold text-[#0077B6] dark:text-slate-400 uppercase tracking-wider">
                Member Since
              </span>
              <span className="text-[#03045E] dark:text-[#CAF0F8] font-bold text-base mt-0.5 block">
                {doctor.createdAt
                  ? new Date(doctor.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : doctor.joinedDate || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio + Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bio */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Clinical Bio & Overview
          </h3>
          {doctor.bio ? (
            <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {doctor.bio}
            </p>
          ) : (
            <p className="text-[13px] text-slate-400 italic">
              No bio provided.
            </p>
          )}
          {doctor.education && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-[#0077B6] dark:text-slate-400 uppercase tracking-wider block mb-1">
                Education
              </span>
              <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">
                {doctor.education}
              </span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Metadata
          </h3>
          <div className="space-y-3 font-medium text-[13px]">
            {doctor.phone && (
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900/50 pb-2.5">
                <span className="text-slate-400 inline-flex items-center gap-1.5">
                  <RxMobile className="w-4 h-4 text-[#00B4D8]" /> Phone
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold select-all">
                  {doctor.phone}
                </span>
              </div>
            )}
            {doctor.licenseNumber && (
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900/50 pb-2.5">
                <span className="text-slate-400 inline-flex items-center gap-1.5">
                  <RxIdCard className="w-4 h-4 text-[#00B4D8]" /> License
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-mono font-bold text-[12px] select-all">
                  {doctor.licenseNumber}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between pb-2.5">
              <span className="text-slate-400 inline-flex items-center gap-1.5">
                <RxDotFilled className="w-4 h-4 text-[#00B4D8]" /> Availability
              </span>
              <span
                className={`text-[12px] font-bold ${
                  doctor.isAvailable
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-400"
                }`}
              >
                {doctor.isAvailable ? "Accepting Patients" : "Off Duty"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Safety Controls */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm select-none">
          <LuShieldAlert className="w-4 h-4" />
          <span>Administrative Safety Controls</span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-2xl select-none">
          Modifying this doctor's status will immediately restrict or restore
          their ability to accept patient bookings and access the platform
          dashboard.
        </p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleToggleStatus}
            disabled={actionLoading}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-150 approved:scale-[0.98] ${
              actionLoading
                ? "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent"
                : isActiveState
                  ? "bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-200/20"
                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200/20"
            }`}
          >
            {actionLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : isActiveState ? (
              <>
                <RxCrossCircled className="w-4 h-4" />
                <span>Suspend Doctor Account</span>
              </>
            ) : (
              <>
                <RxCheckCircled className="w-4 h-4" />
                <span>Reinstate Doctor Access</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Self-suspend modal */}
      {showSelfSuspendModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="self-suspend-title"
          aria-describedby="self-suspend-desc"
        >
          <div
            className="absolute inset-0 bg-[#020417]/60 dark:bg-[#000000]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSelfSuspendModal(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#111827] border border-rose-200/40 dark:border-rose-950/40 p-6 text-left shadow-xl transition-all space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600">
                <RxExclamationTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3
                  id="self-suspend-title"
                  className="text-base md:text-lg font-bold text-[#03045E] dark:text-[#CAF0F8] tracking-tight"
                >
                  Action Blocked by Server
                </h3>
                <p
                  id="self-suspend-desc"
                  className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                >
                  You cannot suspend your own account. This action would
                  immediately terminate your approved session and revoke your
                  platform access.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                autoFocus
                onClick={() => setShowSelfSuspendModal(false)}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#03045E] dark:text-[#CAF0F8] font-semibold text-xs md:text-sm rounded-xl transition-all duration-150 approved:scale-[0.98]"
              >
                Acknowledge &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
