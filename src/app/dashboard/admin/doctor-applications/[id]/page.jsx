"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RxArrowLeft, RxCheck, RxCross2, RxFile } from "react-icons/rx";
import {
  getAllApplications,
  approveApplication,
  rejectApplication,
} from "@/services/doctor-applications/doctorApplication.service";

export default function DoctorApplicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Application State Data Layer
  const [app, setApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Modal layer for collecting rejections reasons
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Fetch target record based on parameters passed from board link
  useEffect(() => {
    const fetchApplicationDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getAllApplications();
        if (response && response.data) {
          // Locate targeted application matching dynamic route payload
          const targetApp = response.data.find((item) => item._id === id);
          if (targetApp) {
            setApp(targetApp);
          } else {
            toast.error("Application record could not be found.");
          }
        }
      } catch (error) {
        console.error("Failed to load details payload structure:", error);
        toast.error("Error reading credentials data engine.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchApplicationDetail();
  }, [id]);

  const handleApprove = async () => {
    if (!app) return;
    setIsActionLoading(true);
    try {
      await approveApplication(app._id);
      setApp((prev) => (prev ? { ...prev, status: "Approved" } : null));
      toast.success("Application successfully approved.");
    } catch (error) {
      console.error("Approval error pipeline execution:", error);
      toast.error(
        error?.message || "Could not approve application processing layer.",
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!app) return;
    const trimmedReason = rejectionReason.trim();

    if (!trimmedReason) {
      toast.error("Please explicitly declare a rejection baseline reason.");
      return;
    }

    setIsActionLoading(true);
    try {
      await rejectApplication(app._id, trimmedReason);
      setApp((prev) =>
        prev
          ? { ...prev, status: "Rejected", rejectionReason: trimmedReason }
          : null,
      );
      toast.success("Application status successfully updated to Rejected.");
      setShowRejectModal(false);
      setRejectionReason("");
    } catch (error) {
      console.error("Rejection action stream exception error:", error);
      toast.error(
        error?.message || "Could not execute application denial routing state.",
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-[#0077B6]">
        <div className="w-8 h-8 border-2 border-t-transparent border-current rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          Syncing application ledger context data models...
        </span>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-12 max-w-7xl mx-auto p-4 space-y-4">
        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
          No matching documentation matrix context discovered.
        </p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-all"
        >
          Return to Board
        </button>
      </div>
    );
  }

  const status = (app.status || "Pending").toLowerCase();
  const isApproved = status === "approved";
  const isRejected = status === "rejected";

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 transition-colors duration-200">
      {/* Return Interface Control */}
      <div className="flex items-center justify-between select-none">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Verification Board</span>
        </button>

        <span
          className={`px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase border ${
            status === "pending"
              ? "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40"
              : isApproved
                ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40"
                : "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/40"
          }`}
        >
          {app.status || "Pending"} Entry
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Dossier Metrics Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#111827] border border-[#90E0EF]/20 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              {app.user?.image ? (
                <img
                  src={app.user.image}
                  alt={app.user?.name}
                  className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-800 bg-slate-50 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#CAF0F8]/40 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#03045E] dark:text-slate-400 flex items-center justify-center font-bold capitalize text-lg shrink-0">
                  {(app.user?.name || "U").charAt(0)}
                </div>
              )}
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-400 block uppercase">
                  ID: {app._id}
                </span>
                <h2 className="text-[20px] font-black text-slate-900 dark:text-white mt-0.5">
                  {app.user?.name || "Unknown Doctor"}
                </h2>
                <p className="text-[13px] font-semibold text-slate-400">
                  {app.user?.email || "No contact verified email system link"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-50 dark:border-slate-800 pt-4 text-[13px] font-medium">
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Target Specialty
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  {app.specialization || "General Medicine"}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Experience Base
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  {app.experienceYears ? `${app.experienceYears} Years` : "—"}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  BMDC License
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">
                  {app.bmdcNumber}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Gender Node
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-bold capitalize">
                  {app.user?.gender || "—"}
                </span>
              </div>
            </div>

            {isRejected && app.rejectionReason && (
              <div className="bg-rose-50/60 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/40 rounded-xl p-4 mt-2">
                <span className="block text-[11px] font-bold text-rose-500 uppercase tracking-wide mb-1">
                  Reason for System Rejection
                </span>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {app.rejectionReason}
                </p>
              </div>
            )}
          </div>

          {/* Secure Document Certification Layer */}
          <div className="bg-white dark:bg-[#111827] border border-[#90E0EF]/20 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Uploaded Certification Assets
            </h3>
            <div className="space-y-2">
              {/* Maps over BMDC Certificate file inputs dynamically */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px]">
                <div className="flex items-center gap-3 min-w-0">
                  <RxFile className="w-5 h-5 text-slate-400 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 font-mono truncate max-w-[200px] sm:max-w-md">
                      BMDC_Verification_Document_Signature.jpg
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Cloud-Hosted Vault Asset
                    </span>
                  </div>
                </div>
                {/* Visual Image Anchor Link */}
                {app.bmdcCertificate && (
                  <a
                    href={app.bmdcCertificate}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400 flex items-center justify-center"
                    title="View Original Certificate File"
                  >
                    View File
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel Column */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#111827] border border-[#90E0EF]/20 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 sticky top-4 select-none">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Review Decisions
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Verify that the professional qualifications match their registered
              profile coordinates.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {!isApproved && (
                <button
                  onClick={handleApprove}
                  disabled={isActionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-colors cursor-pointer"
                >
                  {isActionLoading ? (
                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                  ) : (
                    <RxCheck className="w-4 h-4" />
                  )}
                  <span>
                    {isRejected
                      ? "Re-Approve Credentials"
                      : "Approve Application"}
                  </span>
                </button>
              )}

              {!isRejected && (
                <button
                  onClick={() => {
                    setRejectionReason("");
                    setShowRejectModal(true);
                  }}
                  disabled={isActionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-xl transition-colors cursor-pointer"
                >
                  <RxCross2 className="w-4 h-4" />
                  <span>
                    {isApproved
                      ? "Revoke Approval Status"
                      : "Reject Application"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Reason Trigger Modal Layer */}
      {showRejectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-200"
          onClick={() => setShowRejectModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                {isApproved
                  ? "Revoke approval context"
                  : "Reject application system entry"}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                State clearly why this application is being processed as
                incomplete or unverified.
              </p>
            </div>

            <textarea
              autoFocus
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. The BMDC Certificate signature is blurry or missing secure authorization tags."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200/40 dark:focus:border-rose-800 dark:focus:ring-rose-900/30 transition-all resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                disabled={isActionLoading}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={isActionLoading || !rejectionReason.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                {isActionLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                ) : (
                  <RxCross2 className="w-3.5 h-3.5" />
                )}
                <span>Confirm rejection</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
