"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxEnvelopeClosed,
  RxCalendar,
  RxMobile,
  RxActivityLog,
  RxCheckCircled,
  RxCrossCircled,
  RxExclamationTriangle,
} from "react-icons/rx";
import { LuShieldAlert } from "react-icons/lu";
import {
  getUserById,
  suspendUserById,
  activateUserById,
} from "@/services/users/user.service";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Self-Suspension/Server Restriction Warning Modal State
  const [showSelfSuspendModal, setShowSelfSuspendModal] = useState(false);

  // Fetch real user data from your backend
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const data = await getUserById(id);
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching specific user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Administrative Status Toggle Handler catching Server Restrictions
  const handleToggleStatus = async () => {
    if (!user || !id) return;

    setActionLoading(true);
    const isCurrentlyActive =
      (user.status || "active").toLowerCase() === "active";

    try {
      if (isCurrentlyActive) {
        await suspendUserById(id);
      } else {
        await activateUserById(id);
      }

      // Mutate local state smoothly upon server success affirmation
      setUser((prev) => ({
        ...prev,
        status: isCurrentlyActive ? "suspended" : "active",
      }));
    } catch (error) {
      console.error("Administrative status modifier action failure:", error);

      // CATCH SERVER ERROR: Inspect response message text strings or HTTP status status codes
      const errorMessage =
        error?.response?.data?.message || error?.message || "";
      if (
        errorMessage.toLowerCase().includes("self") ||
        errorMessage.toLowerCase().includes("own account") ||
        error?.response?.status === 400 ||
        error?.response?.status === 403
      ) {
        setShowSelfSuspendModal(true);
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Loading indicator template matched with theme environment
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#090d16] gap-3 text-[#0077B6]">
        <div className="w-8 h-8 border-2 border-t-transparent border-current rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          Loading profile data...
        </span>
      </div>
    );
  }

  // Profile not found error card safely matched with theme environment
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] flex items-center justify-center p-4">
        <div className="text-center w-full max-w-md bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
            User profile could not be found.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
          >
            <RxArrowLeft /> Back to User Directory
          </button>
        </div>
      </div>
    );
  }

  const displayStatus = user.status || "active";
  const displayRole = user.role || "patient";
  const isActiveState = displayStatus.toLowerCase() === "active";

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-6 min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-300 transition-colors duration-200">
      {/* Return Navigation Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-[#03045E] dark:hover:text-[#CAF0F8] transition-colors group self-start"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to User Directory</span>
        </button>

        <span className="text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-[#111827] px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg self-start sm:self-auto">
          ID: {id}
        </span>
      </div>

      {/* Main Core Profile Information Summary Block */}
      <div className="bg-white dark:bg-[#111827] border border-[rgb(144,224,239)]/30 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-14 h-14 rounded-full object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=CAF0F8&color=03045E`;
                }}
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-400 text-lg uppercase">
                {(user.name || "U").charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-[#03045E] dark:text-[#CAF0F8] leading-tight">
                {user.name || "No Name Provided"}
              </h2>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 inline-flex items-center gap-1.5 mt-1 break-all select-all">
                <RxEnvelopeClosed className="w-3.5 h-3.5 shrink-0 text-[#0077B6]" />{" "}
                {user.email}
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

        {/* Informative Structured Grid Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-sm select-none">
          <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl">
            <span className="block text-xs font-semibold text-[#0077B6] dark:text-slate-400 uppercase tracking-wider">
              Account Role
            </span>
            <span className="text-[#03045E] dark:text-[#CAF0F8] font-bold text-base mt-1 block capitalize">
              {displayRole}
            </span>
          </div>

          <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl">
            <span className="block text-xs font-semibold text-[#0077B6] dark:text-slate-400 uppercase tracking-wider">
              Registration Date
            </span>
            <span className="text-[#03045E] dark:text-[#CAF0F8] font-bold text-base mt-1 block">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </span>
          </div>

          <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl">
            <span className="block text-xs font-semibold text-[#0077B6] dark:text-slate-400 uppercase tracking-wider">
              Medical Demographics
            </span>
            <span className="text-[#03045E] dark:text-[#CAF0F8] font-bold text-base mt-1 block capitalize">
              {user.gender || "Not Set"}{" "}
              {user.bloodGroup ? `• (${user.bloodGroup})` : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded System Info Profiles Metadata */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 select-none">
          <RxActivityLog className="w-4 h-4 text-[#0077B6]" />
          <span>Extended Metadata Details</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-900/50">
            <span className="text-slate-400 inline-flex items-center gap-2 select-none">
              <RxMobile className="text-[#00B4D8]" /> Contact Phone
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 select-all">
              {user.phone || "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-900/50">
            <span className="text-slate-400 inline-flex items-center gap-2 select-none">
              <RxCalendar className="text-[#00B4D8]" /> Date of Birth
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "—"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-2 md:col-span-2 gap-1 sm:gap-4">
            <span className="text-slate-400 shrink-0 select-none">
              Home Address
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-left sm:text-right max-w-xl md:whitespace-normal">
              {user.address || "No address added"}
            </span>
          </div>
        </div>
      </div>

      {/* Account Safety Control Actions Section Panel */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm select-none">
          <LuShieldAlert className="w-4 h-4" />
          <span>Administrative Safety Controls</span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-2xl select-none">
          Modifying authorization settings will instantly restrict or grant
          account accessibility permissions across the platform dashboard
          infrastructure framework. Please execute status updates with
          precision.
        </p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleToggleStatus}
            disabled={actionLoading}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-150 active:scale-[0.98] ${
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
                <span>Processing Record Change...</span>
              </>
            ) : isActiveState ? (
              <>
                <RxCrossCircled className="w-4 h-4" />
                <span>Suspend Account Access</span>
              </>
            ) : (
              <>
                <RxCheckCircled className="w-4 h-4" />
                <span>Reinstate Active Access</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SERVER-TRIGGERED EXCEPTION MODAL */}
      {showSelfSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          {/* Backdrop Blur Layer */}
          <div
            className="absolute inset-0 bg-[#020417]/60 dark:bg-[#000000]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSelfSuspendModal(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#111827] border border-rose-200/40 dark:border-rose-950/40 p-6 text-left shadow-xl transition-all space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600">
                <RxExclamationTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base md:text-lg font-bold text-[#03045E] dark:text-[#CAF0F8] tracking-tight">
                  Action Blocked by Server
                </h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  You cannot suspend your own administrative profile. Suspending
                  your account will instantly terminate your active dashboard
                  session and system permissions.
                </p>
              </div>
            </div>

            {/* Modal Closer Layout Row */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowSelfSuspendModal(false)}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#03045E] dark:text-[#CAF0F8] font-semibold text-xs md:text-sm rounded-xl transition-all duration-150 active:scale-[0.98]"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
