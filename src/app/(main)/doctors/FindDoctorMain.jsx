"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiUser,
  FiStar,
  FiAward,
  FiMapPin,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function FindDoctorMain({
  doctors,
  pagination,
  isLoading,
  filters,
  handlePageChange,
  viewMode,
}) {
  if (isLoading) {
    return (
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2" : "grid-cols-1"}`}
      >
        {[...Array(filters.limit)].map((_, idx) => (
          <div
            key={idx}
            className={`${viewMode === "grid" ? "h-[270px]" : "h-[180px]"} rounded-2xl border animate-pulse border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40`}
          />
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="border border-dashed rounded-2xl p-16 text-center border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 shadow-sm max-w-md mx-auto">
        <FiUser className="mx-auto text-4xl mb-4 text-slate-300 dark:text-slate-700" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          No Specialists Matched
        </h3>
        <p className="text-xs mt-1 text-slate-400 dark:text-slate-500">
          Try expanding your fee limits, updating keywords, or clearing
          specialization parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2" : "grid-cols-1"}`}
      >
        {doctors.map((doctor) => {
          const name = doctor.user?.name || "Specialist Practitioner";
          const specialty = doctor.specialization || "General Medicine";
          const experience = doctor.experienceYears || 0;
          const hospital =
            doctor.hospitalAffiliation || "Medical Center Network";
          const image = doctor.user?.image;
          const rating = doctor.rating || "5.0";
          const fee = doctor.consultationFee || 0;

          {
            /* Premium List Mode Architecture */
          }
          if (viewMode === "list") {
            return (
              <div
                key={doctor._id}
                className="border backdrop-blur-md p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-md dark:shadow-black/20 hover:shadow-xl hover:shadow-teal-500/[0.04] hover:border-teal-500/50 dark:hover:border-teal-500/40 hover:-translate-y-0.5 group/card"
              >
                <div className="flex items-center gap-5 flex-1">
                  <div className="h-16 w-16 relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-inner">
                    {image ? (
                      <Image
                        src={image}
                        alt={`Dr. ${name}`}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                    ) : (
                      <FiUser size={28} />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover/card:text-teal-600 dark:group-hover/card:text-teal-400 transition-colors">
                        {name}
                      </h4>
                      <span className="inline-flex text-xxs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-500/5 border border-teal-500/10">
                        {specialty}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <FiAward
                          className="text-slate-400 dark:text-slate-500 shrink-0"
                          size={14}
                        />
                        <span>{experience}+ Years Practice</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiMapPin
                          className="text-slate-400 dark:text-slate-500 shrink-0"
                          size={14}
                        />
                        <span className="line-clamp-1">{hospital}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/60 shrink-0 min-w-[140px]">
                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-1.5 w-fit">
                      <FiStar className="fill-current" size={11} />
                      <span>{rating}</span>
                    </div>
                    <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {fee > 0 ? `$${fee}` : "Free"}
                    </span>
                  </div>

                  <Link
                    href={`/doctors/${doctor._id}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold tracking-wide uppercase rounded-xl transition-all bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 shadow-md shadow-teal-500/10 active:scale-98 cursor-pointer w-full md:w-auto"
                  >
                    <FiBriefcase size={14} />
                    Book
                  </Link>
                </div>
              </div>
            );
          }

          {
            /* Premium Grid Mode Architecture */
          }
          return (
            <div
              key={doctor._id}
              className="border backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-md dark:shadow-black/20 hover:shadow-xl hover:shadow-teal-500/[0.04] hover:border-teal-500/50 dark:hover:border-teal-500/40 hover:-translate-y-0.5 group/card"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-inner">
                      {image ? (
                        <Image
                          src={image}
                          alt={`${name}`}
                          fill
                          sizes="56px"
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                      ) : (
                        <FiUser size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-1 group-hover/card:text-teal-600 dark:group-hover/card:text-teal-400 transition-colors">
                        {name}
                      </h4>
                      <span className="inline-flex text-xxs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mt-0.5">
                        {specialty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                    <FiStar className="fill-current" size={11} />
                    <span>{rating}</span>
                  </div>
                </div>

                <div className="space-y-2.5 my-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2.5">
                    <FiAward
                      className="text-slate-400 dark:text-slate-500 shrink-0"
                      size={16}
                    />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {experience}+ Years Practice
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FiMapPin
                      className="text-slate-400 dark:text-slate-500 shrink-0"
                      size={16}
                    />
                    <span className="line-clamp-1">{hospital}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-black tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {fee > 0 ? `$${fee}` : "Free Checkup"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <Link
                  href={`/doctors/${doctor._id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold tracking-wide uppercase rounded-xl transition-all bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 shadow-md shadow-teal-500/10 active:scale-98 cursor-pointer"
                >
                  <FiBriefcase size={14} />
                  Book Consultation
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Bar */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 text-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Page{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {pagination.page}
            </span>{" "}
            of {pagination.totalPages}
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <FiChevronLeft size={16} />
            </button>

            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`h-8 w-8 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  pagination.page === i + 1
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm"
                    : "border border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
