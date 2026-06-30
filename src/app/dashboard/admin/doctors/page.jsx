"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  RxMagnifyingGlass,
  RxChevronRight,
  RxChevronLeft,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxCheckCircled,
  RxCrossCircled,
  RxStarFilled,
  RxDotFilled,
} from "react-icons/rx";
import {
  getAllDoctors,
  suspendDoctorById,
  activateDoctorById,
} from "@/services/doctors/doctor.service";

export default function DoctorManagementPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [doctors, setDoctors] = useState([]);

  // Search-on-click pattern (same as AppointmentsManagementPage)
  const [searchDraft, setSearchDraft] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [statusTab, setStatusTab] = useState("active");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, specialtyFilter, statusTab]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const data = await getAllDoctors({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          status: statusTab,
          specialization:
            specialtyFilter === "all" ? undefined : specialtyFilter,
        });

        setDoctors(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
        setTotalItems(data.meta?.total || 0);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        toast.error(
          error?.message || "Couldn't load doctors. Please refresh the page.",
        );
        setDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, [currentPage, searchTerm, specialtyFilter, statusTab]);

  const runSearch = () => {
    setSearchTerm(searchDraft);
  };

  const handleToggleStatus = async (doctorId, currentStatus) => {
    if (!doctorId) {
      toast.error(
        "Couldn't identify this doctor. Please refresh and try again.",
      );
      return;
    }

    setActionLoadingId(doctorId);
    const isCurrentlyActive =
      (currentStatus || "active").toLowerCase() === "active";

    try {
      if (isCurrentlyActive) {
        await suspendDoctorById(doctorId);
      } else {
        await activateDoctorById(doctorId);
      }

      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId
            ? { ...doc, status: isCurrentlyActive ? "suspended" : "active" }
            : doc,
        ),
      );

      toast.success(
        isCurrentlyActive ? "Doctor suspended." : "Doctor activated.",
      );
    } catch (error) {
      console.error("Doctor status toggle failed:", error);
      toast.error(
        isCurrentlyActive
          ? "Couldn't suspend this doctor. Please try again."
          : "Couldn't activate this doctor. Please try again.",
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  console.log(doctors);

  return (
    <div className="space-y-4 max-w-[1280px] mx-auto p-4 min-h-screen bg-[#FFFFFF] dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors duration-300 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 rounded-full bg-[#E6F0FA]/40 dark:bg-slate-900/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-96 w-96 rounded-full bg-[#008080]/5 dark:bg-[#008080]/3 blur-3xl pointer-events-none" />

      {/* Filters */}
      <div className="relative z-10 bg-[#FFFFFF] dark:bg-slate-950 border border-[#E6F0FA] dark:border-slate-900 p-4 rounded-[20px] shadow-sm space-y-4 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex items-stretch flex-1">
            <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#008080] dark:text-slate-500 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or email..."
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
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 text-[12px] font-bold rounded-[9px] bg-[#1E3A8A] hover:bg-[#162d6b] dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors duration-200 active:scale-[0.97] cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex border-b border-[#E6F0FA] dark:border-slate-900 overflow-x-auto select-none">
          {[
            {
              key: "active",
              label: "Active Doctors",
              dotColor: "bg-emerald-500",
            },
            { key: "suspended", label: "Suspended", dotColor: "bg-rose-500" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusTab(tab.key)}
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
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008080] dark:bg-[#3cd1c2]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="relative z-10 bg-[#FFFFFF] dark:bg-slate-950 border border-[#E6F0FA] dark:border-slate-900 rounded-[20px] shadow-sm overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[750px] md:min-w-0">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-wider text-[#008080] dark:text-slate-400 select-none">
                <th className="py-4 px-4 md:px-6">Doctor</th>
                <th className="py-4 px-4 md:px-6">Specialty</th>
                <th className="py-4 px-4 md:px-6">Rating</th>
                <th className="py-4 px-4 md:px-6 hidden sm:table-cell">
                  Consultations
                </th>
                <th className="py-4 px-4 md:px-6 hidden sm:table-cell">
                  Availability
                </th>
                <th className="py-4 px-4 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6F0FA] dark:divide-slate-900 text-[13px] md:text-[15px]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#008080] dark:text-[#3cd1c2]">
                      <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                      <span className="text-[13px] font-medium text-slate-400 dark:text-slate-500">
                        Loading doctor profiles...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : doctors.length > 0 ? (
                doctors.map((doc) => {
                  const docId = doc._id || doc.email;
                  const isActioning = actionLoadingId === docId;
                  const isActiveState =
                    (doc.status || "active").toLowerCase() === "active";

                  return (
                    <tr
                      key={docId}
                      className="hover:bg-[#F8FAFC]/50 dark:hover:bg-slate-900/30 transition-colors duration-200 group"
                    >
                      <td className="py-4 px-4 md:px-6">
                        <div className="flex items-center gap-3">
                          {doc?.user?.image ? (
                            <img
                              src={doc?.user?.image}
                              alt={doc?.user?.name || "Doctor"}
                              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover bg-slate-100 dark:bg-slate-800 border border-[#E6F0FA] dark:border-slate-800"
                            />
                          ) : (
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold capitalize text-[13px]">
                              {(doc?.user?.name || "D").charAt(0)}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1E3A8A] dark:text-slate-200 group-hover:text-[#008080] dark:group-hover:text-[#3cd1c2] transition-colors duration-200 line-clamp-1">
                              {doc?.user?.name || "No Name Provided"}
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 truncate">
                              {doc?.user?.email || "—"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 md:px-6 select-none">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                          {doc.specialization || doc.specialty || "General"}
                        </span>
                      </td>

                      <td className="py-4 px-4 md:px-6">
                        {doc.rating != null ? (
                          <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                            <RxStarFilled className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>{Number(doc.rating).toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[12px]">—</span>
                        )}
                      </td>

                      <td className="py-4 px-4 md:px-6 font-semibold text-slate-700 dark:text-slate-300 hidden sm:table-cell">
                        {doc.appointmentsCount != null
                          ? `${doc.appointmentsCount} bookings`
                          : "—"}
                      </td>

                      <td className="py-4 px-4 md:px-6 hidden sm:table-cell select-none">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-semibold border ${
                            doc.isAvailable
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-transparent"
                              : "bg-slate-50 text-slate-500 border-slate-200/60 dark:bg-slate-900 dark:text-slate-400 dark:border-transparent"
                          }`}
                        >
                          <RxDotFilled
                            className={`w-4 h-4 -ml-1 shrink-0 ${doc.isAvailable ? "text-emerald-500 animate-pulse" : "text-slate-400"}`}
                          />
                          <span>
                            {doc.isAvailable ? "Accepting" : "Off Duty"}
                          </span>
                        </span>
                      </td>

                      <td className="py-4 px-4 md:px-6 text-right select-none">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() =>
                              handleToggleStatus(doc._id, doc.status)
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
                            href={`/dashboard/admin/doctors/${doc._id || ""}`}
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
                    colSpan={6}
                    className="py-12 text-center text-[13px] font-medium text-slate-400 select-none"
                  >
                    No doctors found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              doctors
            </span>

            <div className="flex items-center gap-1 w-full sm:w-auto justify-center">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <RxDoubleArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
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
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <RxChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] bg-[#FFFFFF] dark:bg-transparent text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors duration-200"
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
