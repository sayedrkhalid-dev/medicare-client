"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  RxCheck,
  RxCross2,
  RxEyeOpen,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxMagnifyingGlass,
} from "react-icons/rx";
import {
  getAllApplications,
  approveApplication,
  rejectApplication,
} from "@/services/doctor-applications/doctorApplication.service";
import Link from "next/link";

export default function DoctorApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [currentTab, setCurrentTab] = useState("Pending");
  // searchDraft is what the input shows as you type; searchQuery is what
  // actually filters the table. They're separate so filtering only happens
  // when the search button (or Enter) is pressed, not on every keystroke.
  const [searchDraft, setSearchDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  // Modal state for viewing the certificate image
  const [previewImage, setPreviewImage] = useState(null);

  // Modal state for collecting a rejection reason before calling the API
  const [rejectTarget, setRejectTarget] = useState(null); // holds the application being rejected, or null
  const [rejectionReason, setRejectionReason] = useState("");

  // Pagination Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const setCurrPage = () => setCurrentPage(1);
    setCurrPage();
  }, [currentTab, searchQuery]);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const data = await getAllApplications();
        if (data) {
          setApplications(data.data);
        }
      } catch (error) {
        console.error("Failed to load doctor applications:", error);
        toast.error("Couldn't load applications. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    setActionId(id);
    try {
      await approveApplication(id);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: "Approved" } : app,
        ),
      );
      toast.success("Application approved.");
    } catch (error) {
      console.error(`Approval error on application: ${id}`, error);
      // Surfaces server guard errors verbatim, e.g.
      // "Only pending applications can be approved" — no special-casing
      // needed since error.message already carries the server's text.
      toast.error(
        error?.message ||
          "Couldn't approve this application. Please try again.",
      );
    } finally {
      setActionId(null);
    }
  };

  // Opens the reason modal instead of rejecting immediately.
  const openRejectModal = (app) => {
    setRejectionReason("");
    setRejectTarget(app);
  };

  // Commits the typed draft to the actual filter. Called by the search
  // button's onClick and by pressing Enter in the input.
  const runSearch = () => {
    setSearchQuery(searchDraft);
  };

  const closeRejectModal = () => {
    setRejectTarget(null);
    setRejectionReason("");
  };

  // Fires once the admin confirms a reason in the modal.
  const handleConfirmReject = async () => {
    if (!rejectTarget) return;
    const id = rejectTarget._id;
    const trimmedReason = rejectionReason.trim();

    if (!trimmedReason) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    setActionId(id);
    try {
      await rejectApplication(id, trimmedReason);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status: "Rejected", rejectionReason: trimmedReason }
            : app,
        ),
      );
      toast.success("Application rejected.");
      closeRejectModal();
    } catch (error) {
      console.error(`Rejection error on application: ${id}`, error);
      // Same as approval: surfaces "Only pending applications can be
      // rejected" directly from the server's thrown error message.
      toast.error(
        error?.message || "Couldn't reject this application. Please try again.",
      );
    } finally {
      setActionId(null);
    }
  };

  // Filter datasets — search now matches the user management page's fields
  // (name, email/contact) instead of name + raw _id + specialty + license.
  const filteredApps = applications.filter((app) => {
    const matchesTab =
      (app.status || "Pending").toLowerCase() === currentTab.toLowerCase();

    const doctorName = app.user?.name || "";
    const email = app.user?.email || "";
    const specialty = app.specialization || "";
    const bmdcNum = app.bmdcNumber || "";

    const targetString =
      `${doctorName} ${email} ${specialty} ${bmdcNum}`.toLowerCase();
    const matchesSearch = targetString.includes(
      searchQuery.toLowerCase().trim(),
    );

    return matchesTab && matchesSearch;
  });

  const totalItems = filteredApps.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApps = filteredApps.slice(startIndex, endIndex);

  const getTabBadgeColor = (tab) => {
    switch (tab) {
      case "Pending":
        return "bg-amber-500 text-white";
      case "Approved":
        return "bg-emerald-500 text-white";
      case "Rejected":
        return "bg-rose-500 text-white";
      default:
        return "bg-slate-400 text-white";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-[#0077B6]">
        <div className="w-8 h-8 border-2 border-t-transparent border-current rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          Syncing credential database record modules...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 transition-colors duration-200">
      {/* Header: heading + description on the left, live results count on the right */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 select-none">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#03045E] dark:text-white">
            Doctor Applications
          </h2>
          <p className="text-[13px] font-normal text-slate-500 dark:text-slate-400 mt-1">
            Review submitted credentials and manage verification status.
          </p>
        </div>
        <span className="text-[13px] text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {totalItems}
          </span>{" "}
          {totalItems === 1 ? "application" : "applications"} found
        </span>
      </div>

      {/* Search Input — search-on-click instead of live filtering: typing
          doesn't touch the table until the button is pressed or Enter is hit */}
      <div className="select-none flex flex-col md:flex-row md:items-center md:justify-end gap-4">
        <div className="relative w-full md:w-80 flex items-stretch">
          <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#008080] dark:text-slate-500 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
            className="w-full pl-10 pr-20 py-2.5 text-[15px] bg-[#F8FAFC] dark:bg-slate-900/50 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] text-[#1E3A8A] dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#008080]/20 dark:focus:ring-[#3cd1c2]/20 focus:border-[#008080] dark:focus:border-[#3cd1c2] transition-all duration-200"
          />
          <button
            type="button"
            onClick={runSearch}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 text-[12px] font-bold rounded-[9px] bg-[#008080] hover:bg-[#006666] dark:hover:bg-[#2ab0a2] text-white transition-colors duration-200 active:scale-[0.97] cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 select-none">
        {["Pending", "Approved", "Rejected"].map((tab) => {
          const count = applications.filter(
            (a) => (a.status || "Pending").toLowerCase() === tab.toLowerCase(),
          ).length;
          const isActiveTab = currentTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`pb-3 px-6 text-xs font-bold tracking-wide relative transition-colors ${
                isActiveTab
                  ? "text-[#03045E] dark:text-[#CAF0F8]"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab} Applications</span>
                {count > 0 && (
                  <span
                    className={`${getTabBadgeColor(tab)} text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center`}
                  >
                    {count}
                  </span>
                )}
              </div>
              {isActiveTab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0077B6] dark:bg-[#00B4D8]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Applications Matrix Table */}
      <div className="bg-white dark:bg-[#111827] border border-[#90E0EF]/20 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Specification</th>
                <th className="py-4 px-6">Medical License</th>
                <th className="py-4 px-6">Submission Date</th>
                <th className="py-4 px-6">Experience Base</th>
                <th className="py-4 px-6 text-right">Verification Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60 text-sm text-slate-600 dark:text-slate-300">
              {paginatedApps.length > 0 ? (
                paginatedApps.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      {/* Avatar + name + gender, matching UserManagementPage's
                          image/fallback-initial pattern */}
                      <div className="flex items-center gap-3">
                        {app.user?.image ? (
                          <img
                            src={app.user.image}
                            alt={app.user?.name || "Doctor"}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#CAF0F8]/40 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-[#03045E] dark:text-slate-400 flex items-center justify-center font-bold capitalize text-[13px] shrink-0">
                            {(app.user?.name || "U").charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {app.user?.name || "Unknown Doctor"}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 capitalize mt-0.5">
                            {app.user?.gender || "—"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-tight bg-[#CAF0F8]/40 dark:bg-[#0077B6]/10 text-[#03045E] dark:text-[#CAF0F8] border border-[#90E0EF]/20">
                        {app.specialization || "General"}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-500 dark:text-slate-400 text-xs">
                      {app.bmdcNumber}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-400 dark:text-slate-500 font-mono text-xs">
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                      {app.experienceYears
                        ? `${app.experienceYears} Years`
                        : "—"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Clean Inspect Document Button */}
                        <Link href={app._id}>
                          <button
                            className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-[#00B4D8] dark:hover:text-[#CAF0F8] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            title="Inspect Documents"
                            disabled={actionId !== null}
                          >
                            <RxEyeOpen className="w-4 h-4" />
                          </button>
                        </Link>

                        {(() => {
                          const status = (
                            app.status || "Pending"
                          ).toLowerCase();
                          const isApproved = status === "approved";
                          const isRejected = status === "rejected";

                          return (
                            <>
                              {/* Show Approve unless already approved —
                                  covers Pending -> Approved and Rejected -> Approved */}
                              {!isApproved && (
                                <button
                                  onClick={() => handleApprove(app._id)}
                                  disabled={actionId !== null}
                                  className="p-2 border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-950/40 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl transition-colors"
                                  title={
                                    isRejected
                                      ? "Approve Application"
                                      : "Approve Credentials"
                                  }
                                >
                                  {actionId === app._id ? (
                                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                                  ) : (
                                    <RxCheck className="w-4 h-4" />
                                  )}
                                </button>
                              )}

                              {/* Show Reject unless already rejected —
                                  covers Pending -> Rejected and Approved -> Rejected.
                                  Both paths go through the same reason modal, since
                                  reversing an approval still deserves an explanation. */}
                              {!isRejected && (
                                <button
                                  onClick={() => openRejectModal(app)}
                                  disabled={actionId !== null}
                                  className="p-2 border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 disabled:opacity-50 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl transition-colors"
                                  title={
                                    isApproved
                                      ? "Revoke Approval"
                                      : "Reject Application"
                                  }
                                >
                                  {actionId === app._id ? (
                                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                                  ) : (
                                    <RxCross2 className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 select-none"
                  >
                    No configurations matching the criteria were found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination UI Engine */}
        {totalItems > 0 && (
          <div className="bg-slate-50/40 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
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
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <RxDoubleArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <RxDoubleArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Clean & Simple Image Lightbox Modal Layer */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal Close Action Trigger */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 backdrop-blur border border-slate-200/50 dark:border-slate-800/50 hover:scale-105 transition-all"
            >
              <RxCross2 className="w-4 h-4" />
            </button>

            {/* Certificate Display Screen */}
            <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 min-h-[300px]">
              <img
                src={previewImage}
                alt="BMDC Medical Practitioner Certificate"
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-sm border border-slate-200/40 dark:border-slate-800/40"
              />
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reject-modal-title"
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3
                id="reject-modal-title"
                className="text-base font-bold text-slate-800 dark:text-slate-100"
              >
                {(rejectTarget.status || "").toLowerCase() === "approved"
                  ? "Revoke approval"
                  : "Reject application"}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Tell{" "}
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {rejectTarget.user?.name || "this applicant"}
                </span>{" "}
                why their{" "}
                {(rejectTarget.status || "").toLowerCase() === "approved"
                  ? "approval is being revoked"
                  : "application is being rejected"}
                . This will be shown to them.
              </p>
            </div>

            <textarea
              autoFocus
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Submitted certificate does not match license number on file"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200/40 dark:focus:border-rose-800 dark:focus:ring-rose-900/30 transition-all resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={closeRejectModal}
                disabled={actionId !== null}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={actionId !== null || !rejectionReason.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                {actionId === rejectTarget._id ? (
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
