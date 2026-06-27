"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RxMagnifyingGlass,
  RxChevronRight,
  RxStarFilled,
  RxDotFilled,
  RxChevronLeft,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

// Explicit mock database tracking verified, active medical specialists
const verifiedDoctorsDatabase = [
  {
    id: "DOC-2941",
    name: "Dr. Marcus Vance",
    specialty: "Neurology",
    email: "m.vance@medicare.org",
    rating: 4.9,
    appointmentsCount: 142,
    isAvailable: true,
    joinedDate: "2024-01-15",
  },
  {
    id: "DOC-1024",
    name: "Dr. Amara Patel",
    specialty: "Pediatrics",
    email: "a.patel@medicare.org",
    rating: 4.8,
    appointmentsCount: 310,
    isAvailable: false,
    joinedDate: "2024-08-22",
  },
  {
    id: "DOC-8832",
    name: "Dr. Melissa Zhao",
    specialty: "Pediatrics",
    email: "m.zhao@medicare.org",
    rating: 4.7,
    appointmentsCount: 95,
    isAvailable: true,
    joinedDate: "2026-06-19",
  },
  {
    id: "DOC-6104",
    name: "Dr. Alan Grant",
    specialty: "General Medicine",
    email: "a.grant@medicare.org",
    rating: 4.6,
    appointmentsCount: 520,
    isAvailable: true,
    joinedDate: "2026-04-02",
  },
  {
    id: "DOC-3319",
    name: "Dr. Fiona Gallagher",
    specialty: "Dermatology",
    email: "f.gallagher@medicare.org",
    rating: 4.9,
    appointmentsCount: 88,
    isAvailable: true,
    joinedDate: "2025-02-11",
  },
];

export default function DoctorManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties");

  // Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Reset page indicator on filter mutation
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, specialtyFilter]);

  // Extract list of unique specialties dynamically for filter system
  const specialties = [
    "All Specialties",
    ...new Set(verifiedDoctorsDatabase.map((d) => d.specialty)),
  ];

  // Step 1: Filter core records based on search keywords and selected specialty
  const filteredDoctors = verifiedDoctorsDatabase.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      specialtyFilter === "All Specialties" ||
      doc.specialty === specialtyFilter;

    return matchesSearch && matchesSpecialty;
  });

  // Step 2: Compute page limits and slice data segments cleanly
  const totalItems = filteredDoctors.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Roster Header */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          Active Verified Doctors Index
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Review consultation totals, clinical metrics, platform statuses, and
          independent profiles.
        </p>
      </div>

      {/* Advanced Control Pipeline (Search Engine & Specialty Dropdown) */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 p-4 rounded-[16px] shadow-sm">
        <div className="relative flex-1">
          <RxMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search via Doctor Name, ID tag, or email handle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
          />
        </div>

        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="px-4 py-2.5 text-[13px] bg-white dark:bg-slate-900 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-700 dark:text-slate-300 font-semibold focus:outline-none focus:border-[#1E3A8A]"
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Roster Data Table Grid */}
      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-[#E6F0FA] dark:border-slate-900 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">Medical Practitioner</th>
                <th className="py-4 px-6">Specialty Field</th>
                <th className="py-4 px-6">Clinical Rating</th>
                <th className="py-4 px-6">Consultation Volume</th>
                <th className="py-4 px-6">Live Availability</th>
                <th className="py-4 px-6 text-right">Action Trace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900/60 text-[13px]">
              {paginatedDoctors.length > 0 ? (
                paginatedDoctors.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-[#3cd1c2] transition-colors">
                          {doc.name}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 font-mono mt-0.5">
                          {doc.id} &bull; {doc.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                        {doc.specialty}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                        <RxStarFilled className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{doc.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                      {doc.appointmentsCount} bookings
                    </td>
                    <td className="py-4 px-6">
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
                          {doc.isAvailable ? "Accepting Patients" : "Off Duty"}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/dashboard/admin/doctors/${doc.id}`}
                        className="inline-flex items-center gap-1 text-[12px] font-bold text-slate-400 hover:text-[#1E3A8A] dark:hover:text-[#3cd1c2] transition-colors group/btn"
                      >
                        <span>Manage Node</span>
                        <RxChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-[13px] font-medium text-slate-400"
                  >
                    No verified platform specialists match your selected search
                    matrices.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Structural Pagination Engine Baseline */}
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
              platform doctors
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <RxDoubleArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-[12px] font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-white dark:bg-slate-900 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px]">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-[8px] bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center"
              >
                <RxChevronRight className="w-4 h-4" />
              </button>

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
