"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RxMagnifyingGlass,
  RxChevronRight,
  RxPlus,
  RxChevronLeft,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxCheckCircled,
  RxCrossCircled,
  RxExclamationTriangle,
} from "react-icons/rx";
import {
  getAllUsers,
  suspendUserById,
  activateUserById,
} from "@/services/users/user.service";

export default function UserManagementPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusTab, setStatusTab] = useState("active");

  // Self-Suspension Error Modal State
  const [showSelfSuspendModal, setShowSelfSuspendModal] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Fetch live user records
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUsers({
        role: roleFilter === "all" ? undefined : roleFilter,
      });

      if (Array.isArray(data)) {
        setAllUsers(data);
      } else if (data && Array.isArray(data.data)) {
        setAllUsers(data.data);
      } else {
        setAllUsers([]);
      }
    } catch (error) {
      console.error("Failed fetching system users:", error);
      setAllUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [roleFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusTab, roleFilter]);

  // 2. Administrative Action Handlers with Dynamic Server Error Catching
  const handleToggleStatus = async (userId, currentStatus) => {
    if (!userId) return;

    setActionLoadingId(userId);
    const isCurrentlyActive = currentStatus?.toLowerCase() === "active";

    try {
      if (isCurrentlyActive) {
        // Trigger server suspension API request
        await suspendUserById(userId);
      } else {
        // Trigger server activation API request
        await activateUserById(userId);
      }

      // If successful, optimistically shift status transitions locally
      setAllUsers((prevUsers) =>
        prevUsers.map((u) => {
          if (u._id === userId) {
            return { ...u, status: isCurrentlyActive ? "suspended" : "active" };
          }
          return u;
        }),
      );
    } catch (error) {
      console.error("Administrative status update failed:", error);

      // CATCH SERVER ERROR: Inspect response payloads (e.g., standard Axios or Fetch error structures)
      // Check if server message indicates a self-suspension restriction violation
      const errorMessage =
        error?.response?.data?.message || error?.message || "";

      if (
        errorMessage.toLowerCase().includes("self") ||
        errorMessage.toLowerCase().includes("own account") ||
        error?.response?.status === 400 || // Often Bad Request for self-harm actions
        error?.response?.status === 403 // Often Forbidden access blocks
      ) {
        setShowSelfSuspendModal(true);
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  // 3. Client-side search & status tab filtering
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      !searchTerm ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const currentStatus = user.status || "active";
    const matchesStatus =
      currentStatus.toLowerCase() === statusTab.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // 4. Compute pagination dimensions
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleFilterChange = (type, value) => {
    if (type === "role") setRoleFilter(value);
    if (type === "status") setStatusTab(value);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-300 transition-colors duration-200">
      {/* Header Block Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#03045E] dark:text-[#CAF0F8]">
            User Directory
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage, filter, and modify administrative access levels for
            accounts.
          </p>
        </div>
        <button
          onClick={() => console.log("Init registration modal")}
          className="flex items-center justify-center gap-2 bg-[#0077B6] hover:bg-[#00B4D8] active:scale-[0.98] text-white transition-all duration-150 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold shadow-sm tracking-wide w-full sm:w-auto shrink-0"
        >
          <RxPlus className="w-4 h-4" />
          <span>Register New User</span>
        </button>
      </div>

      {/* Filters & Control Block */}
      <div className="bg-white dark:bg-[#111827] border border-[rgb(144,224,239)]/30 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1 w-full">
            <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0077B6] dark:text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[#03045E] dark:text-[#CAF0F8] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20 dark:focus:ring-[#00B4D8]/20 focus:border-[#0077B6] dark:focus:border-[#00B4D8] transition-all duration-150"
            />
          </div>

          {/* Role Filter Switcher Tab Options */}
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl overflow-x-auto w-full lg:w-auto">
            {[
              { label: "All Roles", value: "all" },
              { label: "Patients", value: "patient" },
              { label: "Doctors", value: "doctor" },
            ].map((role) => (
              <button
                key={role.value}
                onClick={() => handleFilterChange("role", role.value)}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-1 lg:flex-none ${
                  roleFilter === role.value
                    ? "bg-white dark:bg-[#1f2937] text-[#0077B6] dark:text-[#CAF0F8] shadow-sm border border-slate-200 dark:border-slate-700"
                    : "text-slate-500 dark:text-slate-400 hover:text-[#03045E] dark:hover:text-slate-200"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* System Status Tab Selection Row */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
          {[
            {
              key: "active",
              label: "Active Accounts",
              activeColor: "bg-[#0077B6]",
              dotColor: "bg-emerald-500",
            },
            {
              key: "suspended",
              label: "Suspended",
              activeColor: "bg-[#00B4D8]",
              dotColor: "bg-rose-500",
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleFilterChange("status", tab.key)}
              className={`pb-3 px-4 text-xs md:text-sm font-semibold relative transition-colors duration-150 whitespace-nowrap ${
                statusTab === tab.key
                  ? "text-[#0077B6] dark:text-[#CAF0F8]"
                  : "text-slate-400 dark:text-slate-500 hover:text-[#03045E] dark:hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab.label}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${tab.dotColor}`} />
              </div>
              {statusTab === tab.key && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${tab.activeColor}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Content Panel */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[750px] md:min-w-0">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-[#0077B6] dark:text-slate-400 select-none">
                <th className="py-4 px-4 md:px-6">User</th>
                <th className="py-4 px-4 md:px-6">Role</th>
                <th className="py-4 px-4 md:px-6">Contact Info</th>
                <th className="py-4 px-4 md:px-6 hidden sm:table-cell">
                  Joined Date
                </th>
                <th className="py-4 px-4 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs md:text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#0077B6]">
                      <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                      <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                        Loading user profiles...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => {
                  const currentUserId = user._id || user.email;
                  const isActioning = actionLoadingId === currentUserId;
                  const isActiveState =
                    (user.status || "active").toLowerCase() === "active";

                  return (
                    <tr
                      key={currentUserId}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors duration-150 group"
                    >
                      <td className="py-4 px-4 md:px-6">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name || "User"}
                              className="w-8 h-8 md:w-9 h-9 rounded-full object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=CAF0F8&color=03045E`;
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 md:w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold capitalize text-xs">
                              {(user.name || "U").charAt(0)}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#03045E] dark:text-[#CAF0F8] group-hover:text-[#0077B6] dark:group-hover:text-[#00B4D8] transition-colors duration-150 line-clamp-1">
                              {user.name || "No Name Provided"}
                            </span>
                            {(user.gender || user.bloodGroup) && (
                              <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 capitalize mt-0.5">
                                {user.gender || ""}{" "}
                                {user.bloodGroup
                                  ? `• (${user.bloodGroup})`
                                  : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <span
                          className={`px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-semibold tracking-wide uppercase whitespace-nowrap ${
                            user.role === "doctor"
                              ? "bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border border-teal-200/30"
                              : "bg-blue-50 dark:bg-blue-950/30 text-[#0077B6] dark:text-[#00B4D8] border border-blue-100/30"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <div className="flex flex-col max-w-[150px] md:max-w-none">
                          <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                            {user.email}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                            {user.phone || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6 text-slate-500 dark:text-slate-400 text-xs hidden sm:table-cell">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "—"}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {/* Toggle Status Controls */}
                          <button
                            onClick={() =>
                              handleToggleStatus(user._id, user.status)
                            }
                            disabled={isActioning}
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-150 ${
                              isActioning
                                ? "opacity-50 cursor-not-allowed"
                                : isActiveState
                                  ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                  : "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                            }`}
                          >
                            {isActioning ? (
                              <div className="w-3 h-3 border-2 border-t-transparent border-current rounded-full animate-spin" />
                            ) : isActiveState ? (
                              <>
                                <RxCrossCircled className="w-3.5 h-3.5" />
                                <span>Suspend</span>
                              </>
                            ) : (
                              <>
                                <RxCheckCircled className="w-3.5 h-3.5" />
                                <span>Activate</span>
                              </>
                            )}
                          </button>

                          <Link
                            href={`/dashboard/admin/users/${user._id || ""}`}
                            className="inline-flex items-center gap-0.5 text-xs font-bold text-[#0077B6] dark:text-[rgb(144,224,239)] hover:text-[#00B4D8] dark:hover:text-white transition-colors duration-150 group/btn"
                          >
                            <span>Details</span>
                            <RxChevronRight className="w-4 h-4 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-sm font-medium text-slate-400"
                  >
                    No matching accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Layout Controls */}
        {!isLoading && totalItems > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium text-center sm:text-left">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {Math.min(endIndex, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {totalItems}
              </span>{" "}
              users
            </span>

            <div className="flex items-center gap-1 w-full sm:w-auto justify-center">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150"
              >
                <RxDoubleArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150"
              >
                <RxChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg whitespace-nowrap">
                {currentPage} / {totalPages}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150"
              >
                <RxChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150"
              >
                <RxDoubleArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SERVER-TRIGGERED ERROR MODAL: Dynamic Guard Alert */}
      {showSelfSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          {/* Backdrop Blur Layer */}
          <div
            className="absolute inset-0 bg-[#020417]/60 dark:bg-[#000000]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSelfSuspendModal(false)}
          />

          {/* Modal Box Container Component */}
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

            {/* Modal Actions Footer */}
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
