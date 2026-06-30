"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllDoctors } from "@/services/doctors/doctor.service";
import {
  FiUser,
  FiAward,
  FiMapPin,
  FiArrowRight,
  FiStar,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedDoctors = async () => {
      try {
        setIsLoading(true);
        const res = await getAllDoctors({
          limit: 6,
          isVerified: true,
          status: "active",
        });
        if (res?.success) {
          setDoctors(res.data || []);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Featured doctors load error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedDoctors();
  }, []);

  if (!isLoading && doctors.length === 0) return null;

  return (
    <section className="py-16 md:py-24 transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-2">
              Expert Clinical Care
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Meet Our Featured Specialists
            </h3>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-400 max-w-xl">
              Connect with vetted, board-certified medical experts dedicated to
              exceptional healthcare solutions.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 cursor-pointer group shrink-0"
          >
            View all medical specialists
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content Showcase Block Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-[420px] rounded-2xl border animate-pulse border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => {
              const name = doctor.user?.name;
              const specialty = doctor.specialization;
              const experience = doctor.experienceYears;
              const hospital = doctor.hospital;
              const image = doctor.user?.image;
              const rating = doctor.rating;
              const fee = doctor.consultationFee;

              return (
                <div
                  key={doctor._id}
                  className="border backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-md dark:shadow-black/20 hover:shadow-xl hover:shadow-teal-500/[0.04] hover:border-teal-500/50 dark:hover:border-teal-500/40 hover:-translate-y-0.5 group/card"
                >
                  <div>
                    {/* Top Segment Avatar Representation with Specialization Meta Tag */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
                          {image ? (
                            <Image
                              src={image}
                              alt={`${name}`}
                              fill
                              sizes="(max-w-7xl) 64px, 64px"
                              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                              priority={false}
                            />
                          ) : (
                            <FiUser size={28} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1 group-hover/card:text-teal-600 dark:group-hover/card:text-teal-400 transition-colors">
                            {name}
                          </h4>
                          <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                            {specialty}
                          </span>
                        </div>
                      </div>

                      {/* Performance Accent Rating Tag */}
                      <div className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                        <FiStar className="fill-current" size={12} />
                        <span>{rating}</span>
                      </div>
                    </div>

                    {/* Meta Specifications list layout block rows */}
                    <div className="space-y-3 my-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-3">
                        <FiAward
                          className="text-slate-400 dark:text-slate-500 shrink-0"
                          size={18}
                        />
                        <span className="font-medium">
                          {experience}+ Years Experience
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiMapPin
                          className="text-slate-400 dark:text-slate-500 shrink-0"
                          size={18}
                        />
                        <span className="line-clamp-1 text-slate-500 dark:text-slate-400">
                          {hospital}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiDollarSign
                          className="text-slate-400 dark:text-slate-500 shrink-0"
                          size={18}
                        />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {fee > 0 ? `${fee} USD` : "Free / Initial Check"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Core Interactive Action Button CTA - High-Contrast Primary System Block */}
                  <div className="mt-2">
                    <Link
                      href={`/doctors/${doctor._id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold tracking-wide rounded-xl transition-all bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 shadow-md shadow-teal-500/10 active:scale-98 cursor-pointer"
                    >
                      <FiBriefcase size={16} />
                      Book Consultation
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
