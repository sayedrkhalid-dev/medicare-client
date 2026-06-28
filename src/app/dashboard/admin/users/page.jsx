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
        await suspendUserById(userId);
      } else {
        await activateUserById(userId);
      }

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
    /* 60% Dominant Color Rule: Light Background (#FFFFFF) | Dark Background Slate-950 */
    <div className="space-y-4 max-w-[1280px] mx-auto p-4 min-h-screen bg-[#FFFFFF] dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors duration-300 relative">
      {/* Ambient Micro-Glow Framework elements mapping from system architecture guidelines */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 rounded-full bg-[#E6F0FA]/40 dark:bg-slate-900/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-96 w-96 rounded-full bg-[#008080]/5 dark:bg-[#008080]/3 blur-3xl pointer-events-none" />

      {/* Header Block Section */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div>
          {/* Secondary Focus Color: 30% Premium High-Trust Navy (#1E3A8A) | Dark Mode White */}
          <h2 className="text-lg font-bold tracking-tight text-[#1E3A8A] dark:text-white">
            User Directory
          </h2>
          <p className="text-[13px] font-normal text-slate-500 dark:text-slate-400 mt-1">
            Manage, filter, and modify administrative access levels for
            accounts.
          </p>
        </div>
        {/* 10% Action Accent Rule: High-Conversion Deep Teal (#008080) */}
        <button
          onClick={() => console.log("Init registration modal")}
          className="inline-flex items-center justify-center gap-2 bg-[#008080] hover:bg-[#006666] dark:hover:bg-[#2ab0a2] active:scale-[0.98] text-[#FFFFFF] transition-all duration-200 px-6 py-3.5 rounded-[12px] text-[15px] font-semibold shadow-md tracking-normal w-full sm:w-auto shrink-0 cursor-pointer"
        >
          <RxPlus className="w-4 h-4 stroke-[1.5]" />
          <span>Register New User</span>
        </button>
      </div>

      {/* Filters & Control Block Framework - Implements Custom Border Overlay Shades */}
      <div className="relative z-10 bg-[#FFFFFF] dark:bg-slate-950 border border-[#E6F0FA] dark:border-slate-900 p-4 rounded-[20px] shadow-sm space-y-4 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1 w-full">
            <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#008080] dark:text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-[15px] bg-[#F8FAFC] dark:bg-slate-900/50 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px] text-[#1E3A8A] dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#008080]/20 dark:focus:ring-[#3cd1c2]/20 focus:border-[#008080] dark:focus:border-[#3cd1c2] transition-all duration-200"
            />
          </div>

          {/* Role Filter Switcher Tab Options */}
          <div className="flex gap-1 bg-[#F8FAFC] dark:bg-slate-900 p-1 rounded-[12px] overflow-x-auto w-full lg:w-auto select-none">
            {[
              { label: "All Roles", value: "all" },
              { label: "Patients", value: "patient" },
              { label: "Doctors", value: "doctor" },
            ].map((role) => (
              <button
                key={role.value}
                onClick={() => handleFilterChange("role", role.value)}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold whitespace-nowrap transition-all duration-200 flex-1 lg:flex-none ${
                  roleFilter === role.value
                    ? "bg-[#FFFFFF] dark:bg-[#0F172A] text-[#008080] dark:text-[#3cd1c2] shadow-sm border border-[#E6F0FA] dark:border-slate-800"
                    : "text-slate-400 dark:text-slate-500 hover:text-[#1E3A8A] dark:hover:text-white"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* System Status Tab Selection Row */}
        <div className="flex border-b border-[#E6F0FA] dark:border-slate-900 overflow-x-auto select-none">
          {[
            {
              key: "active",
              label: "Active Accounts",
              activeColor: "bg-[#008080] dark:bg-[#3cd1c2]",
              dotColor: "bg-emerald-500",
            },
            {
              key: "suspended",
              label: "Suspended",
              activeColor: "bg-[#006666] dark:bg-[#2ab0a2]",
              dotColor: "bg-rose-500",
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleFilterChange("status", tab.key)}
              className={`pb-3 px-4 text-[13px] font-semibold relative transition-colors duration-200 whitespace-nowrap ${
                statusTab === tab.key
                  ? "text-[#008080] dark:text-[#3cd1c2]"
                  : "text-slate-400 dark:text-slate-500 hover:text-[#1E3A8A] dark:hover:text-white"
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

      {/* Main Table Content Panel configured with exact Radius layout limits */}
      <div className="relative z-10 bg-[#FFFFFF] dark:bg-slate-950 border border-[#E6F0FA] dark:border-slate-900 rounded-[20px] shadow-sm overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[750px] md:min-w-0">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-wider text-[#008080] dark:text-slate-400 select-none">
                <th className="py-4 px-4 md:px-6">User</th>
                <th className="py-4 px-4 md:px-6">Role</th>
                <th className="py-4 px-4 md:px-6">Contact Info</th>
                <th className="py-4 px-4 md:px-6 hidden sm:table-cell">
                  Joined Date
                </th>
                <th className="py-4 px-4 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6F0FA] dark:divide-slate-900 text-[13px] md:text-[15px]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#008080] dark:text-[#3cd1c2]">
                      <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                      <span className="text-[13px] font-medium text-slate-400 dark:text-slate-500">
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
                      className="hover:bg-[#F8FAFC]/50 dark:hover:bg-slate-900/30 transition-colors duration-200 group"
                    >
                      <td className="py-4 px-4 md:px-6">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name || "User"}
                              className="w-8 h-8 md:w-9 h-9 rounded-full object-cover bg-slate-100 dark:bg-slate-800 border border-[#E6F0FA] dark:border-slate-800"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=E6F0FA&color=1E3A8A`;
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 md:w-9 h-9 rounded-full bg-[#E6F0FA]/60 dark:bg-slate-900/50 border border-[#E6F0FA] dark:border-slate-800 text-[#1E3A8A] dark:text-slate-400 flex items-center justify-center font-bold capitalize text-[13px]">
                              {(user.name || "U").charAt(0)}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1E3A8A] dark:text-slate-200 group-hover:text-[#008080] dark:group-hover:text-[#3cd1c2] transition-colors duration-200 line-clamp-1">
                              {user.name || "No Name Provided"}
                            </span>
                            {(user.gender || user.bloodGroup) && (
                              <span className="text-[10px] md:text-[11px] text-slate-400 dark:text-slate-500 font-medium capitalize mt-0.5 select-none">
                                {user.gender || ""}{" "}
                                {user.bloodGroup
                                  ? `• (${user.bloodGroup})`
                                  : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6 select-none">
                        <span
                          className={`px-2 py-0.5 md:py-1 rounded-[10px] text-[10px] md:text-[11px] font-bold tracking-wide uppercase whitespace-nowrap border ${
                            user.role === "doctor"
                              ? "bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border-teal-200/20"
                              : "bg-blue-50 dark:bg-blue-950/30 text-[#1E3A8A] dark:text-[#3cd1c2] border-blue-200/20"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <div className="flex flex-col max-w-[150px] md:max-w-none">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold truncate select-all">
                            {user.email}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 select-all">
                            {user.phone || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6 text-slate-400 dark:text-slate-500 text-[13px] hidden sm:table-cell select-none">
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
                      <td className="py-4 px-4 md:px-6 text-right select-none">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() =>
                              handleToggleStatus(user._id, user.status)
                            }
                            disabled={isActioning}
                            className={`inline-flex items-center gap-1 text-[13px] font-semibold px-2.5 py-1 rounded-[12px] transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                              isActioning
                                ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800 text-slate-400"
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
                            className="inline-flex items-center gap-0.5 text-[13px] font-bold text-[#1E3A8A] dark:text-slate-300 hover:text-[#008080] dark:hover:text-white transition-colors duration-200 group/btn"
                          >
                            <span>Details</span>
                            <RxChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
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
                    className="py-12 text-center text-[13px] font-medium text-slate-400 select-none"
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
          <div className="bg-[#F8FAFC] dark:bg-slate-900/50 border-t border-[#E6F0FA] dark:border-slate-900 px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <span className="text-[13px] text-slate-400 dark:text-slate-500 font-medium text-center sm:text-left">
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
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <RxDoubleArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <RxChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="text-[13px] font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-[#FFFFFF] dark:bg-slate-800 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] whitespace-nowrap">
                {currentPage} / {totalPages}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <RxChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <RxDoubleArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SERVER-TRIGGERED ERROR MODAL: Implements standard system glassmorphism overlay structure */}
      {showSelfSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          <div
            className="absolute inset-0 bg-[#020617]/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSelfSuspendModal(false)}
          />

          {/* Core Panel Frame - Set with macro glass container rules */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-[20px] bg-[#FFFFFF] dark:bg-slate-950 border border-rose-200/40 dark:border-rose-950/40 p-6 text-left shadow-xl transition-all space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-rose-50 dark:bg-rose-950/30 text-rose-600">
                <RxExclamationTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-[18px] font-bold text-[#1E3A8A] dark:text-white tracking-tight">
                  Action Blocked by Server
                </h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  You cannot suspend your own administrative profile. Suspending
                  your account will instantly terminate your active dashboard
                  session and system permissions.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowSelfSuspendModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#F8FAFC] hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-[#1E3A8A] dark:text-slate-200 font-bold text-[13px] rounded-[12px] transition-all duration-200 active:scale-[0.98] border border-[#E6F0FA] dark:border-slate-800 cursor-pointer"
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
