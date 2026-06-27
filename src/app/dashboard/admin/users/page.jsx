"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RxMagnifyingGlass,
  RxChevronRight,
  RxPlus,
  RxDotFilled,
  RxChevronLeft,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

// Expanded data schema to demonstrate multi-page operational state switching cleanly
const mockUsersDatabase = [
  {
    id: "USR-9482",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    role: "Patient",
    joinedDate: "2026-03-12",
    status: "Active",
  },
  {
    id: "USR-2941",
    name: "Dr. Marcus Vance",
    email: "m.vance@medicare.org",
    phone: "+1 (555) 876-5432",
    role: "Doctor",
    joinedDate: "2024-01-15",
    status: "Active",
  },
  {
    id: "USR-7410",
    name: "David Kross",
    email: "david.k@example.com",
    phone: "+1 (555) 345-6789",
    role: "Patient",
    joinedDate: "2026-06-20",
    status: "Active",
  },
  {
    id: "USR-8391",
    name: "Elena Rostova",
    email: "e.rostova@example.com",
    phone: "+1 (555) 456-7890",
    role: "Patient",
    joinedDate: "2025-11-04",
    status: "Suspended",
  },
  {
    id: "USR-1024",
    name: "Dr. Amara Patel",
    email: "a.patel@medicare.org",
    phone: "+1 (555) 765-4321",
    role: "Doctor",
    joinedDate: "2024-08-22",
    status: "Active",
  },
  {
    id: "USR-4431",
    name: "Thomas Miller",
    email: "t.miller@example.com",
    phone: "+1 (555) 890-1234",
    role: "Patient",
    joinedDate: "2026-02-18",
    status: "Active",
  },
  {
    id: "USR-5521",
    name: "Dr. Claire Redfield",
    email: "c.redfield@medicare.org",
    phone: "+1 (555) 901-2345",
    role: "Doctor",
    joinedDate: "2025-05-14",
    status: "Active",
  },
  {
    id: "USR-6612",
    name: "James Sutherland",
    email: "j.suth@example.com",
    phone: "+1 (555) 012-3456",
    role: "Patient",
    joinedDate: "2026-01-30",
    status: "Suspended",
  },
  {
    id: "USR-7703",
    name: "Linda Hamilton",
    email: "l.hamilton@example.com",
    phone: "+1 (555) 123-4567",
    role: "Patient",
    joinedDate: "2026-04-11",
    status: "Active",
  },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusTab, setStatusTab] = useState("Active");

  // Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Kept compact intentionally to demonstrate paging behaviors

  // Reset page layout frame to index 1 whenever data sorting matrices shift
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusTab]);

  // Step 1: Compute absolute matched data array subsets
  const filteredUsers = mockUsersDatabase.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    const matchesStatus = user.status === statusTab;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Step 2: Extract index constraints for current page chunk slicing
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Roster Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
            User Core Management
          </h2>
          <p className="text-[13px] font-medium text-slate-400 mt-0.5">
            Monitor, isolate, and audit system profiles across clear deployment
            states.
          </p>
        </div>
        <button
          onClick={() => console.log("Init registration modal")}
          className="flex items-center gap-2 bg-[#1E3A8A] text-white hover:bg-[#152a66] transition-all duration-300 px-4 py-2.5 rounded-[12px] text-[13px] font-bold shadow-sm active:scale-[0.98] shrink-0"
        >
          <RxPlus className="w-4 h-4" />
          <span>Register User Node</span>
        </button>
      </div>

      {/* Advanced Control Pipeline (Search, Status Tabs & Role Filters) */}
      <div className="space-y-4 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-5 rounded-[16px] shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search via Name, Email handle, or Identity Tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
            />
          </div>

          <div className="flex gap-2">
            {["All Roles", "Patient", "Doctor"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2.5 rounded-[12px] text-[13px] font-bold border transition-all ${
                  roleFilter === role
                    ? "bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-slate-800 dark:border-slate-700"
                    : "bg-white dark:bg-transparent text-slate-600 dark:text-slate-400 border-[#E6F0FA] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Structural Status Segmentation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-900/60 pt-2">
          {["Active", "Suspended"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`pb-3 px-6 text-[13px] font-bold tracking-tight relative transition-colors ${
                statusTab === tab
                  ? "text-[#1E3A8A] dark:text-[#3cd1c2]"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{tab} Accounts</span>
                <span
                  className={`w-2 h-2 rounded-full ${tab === "Active" ? "bg-emerald-500" : "bg-rose-500"}`}
                />
              </div>
              {statusTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] dark:bg-[#3cd1c2] animate-slideIn" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Master Table Container */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">User Identification</th>
                <th className="py-4 px-6">Classification</th>
                <th className="py-4 px-6">Contact Vector</th>
                <th className="py-4 px-6">System Registration</th>
                <th className="py-4 px-6 text-right">Action Trace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900/60 text-[13px]">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#3cd1c2] transition-colors">
                          {user.name}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 font-mono mt-0.5">
                          {user.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight ${
                          user.role === "Doctor"
                            ? "bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col font-medium">
                        <span className="text-slate-700 dark:text-slate-300">
                          {user.email}
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          {user.phone}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-500 dark:text-slate-400 font-mono text-[12px]">
                      {user.joinedDate}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/dashboard/admin/users/${user.id}`}
                        className="inline-flex items-center gap-1 text-[12px] font-bold text-slate-400 hover:text-[#1E3A8A] dark:hover:text-[#3cd1c2] transition-colors group/btn"
                      >
                        <span>Inspect Profile</span>
                        <RxChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-[13px] font-medium text-slate-400"
                  >
                    No {statusTab.toLowerCase()}{" "}
                    {roleFilter !== "All Roles"
                      ? roleFilter.toLowerCase() + "s"
                      : "users"}{" "}
                    match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Infrastructure Control Map */}
        {totalItems > 0 && (
          <div className="bg-slate-50/40 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <span className="text-[12px] font-medium text-slate-400">
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
              structural accounts
            </span>

            <div className="flex items-center gap-1.5">
              {/* Jump to first page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <RxDoubleArrowLeft className="w-3.5 h-3.5" />
              </button>

              {/* Move backward single page */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Indicator Tracker badges */}
              <div className="text-[12px] font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-white dark:bg-slate-900 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px]">
                Page {currentPage} of {totalPages}
              </div>

              {/* Move forward single page */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronRight className="w-4 h-4" />
              </button>

              {/* Jump to final page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <RxDoubleArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
