"use client";

import React from "react";
import Image from "next/image";
import { FiAward, FiShield, FiUsers, FiCheckCircle } from "react-icons/fi";

export default function AboutUsPage() {
  const metrics = [
    { label: "Verified Specialists", value: "1,200+" },
    { label: "Successful Consultations", value: "450K+" },
    { label: "Clinical Network Locations", value: "80+" },
    { label: "Patient Satisfaction", value: "99.4%" },
  ];

  const values = [
    {
      icon: <FiShield className="text-teal-500" size={20} />,
      title: "Absolute Clinical Integrity",
      desc: "Every practitioner undergoes multi-tier credentialing checks and validation arrays to maintain unmatched safety thresholds.",
    },
    {
      icon: <FiUsers className="text-teal-500" size={20} />,
      title: "Patient-Centric Systems",
      desc: "Engineering digital healthcare pipelines that put communication and speed of care above programmatic operational friction.",
    },
    {
      icon: <FiAward className="text-teal-500" size={20} />,
      title: "Excellence in Technology",
      desc: "Utilizing modern web tools to build immediate real-time interfaces, lowering the boundary to critical expert consultations.",
    },
  ];

  return (
    <div className="mt-16 p-6 md:p-10 text-slate-900 dark:text-slate-100 max-w-6xl mx-auto space-y-12">
      {/* Refined Hero Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3 animate-scaleIn">
        <span className="inline-flex text-xxs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 px-2.5 py-0.5 rounded bg-teal-500/5 border border-teal-500/10">
          Our Mission
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Architecting the Future of Clinical Access
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          We bridge the distance between elite clinical specialists and people
          who need immediate medical guidance. Through high-fidelity
          technological platforms, premium healthcare is simple, verified, and
          borderless.
        </p>
      </div>

      {/* Grid Metrics Segment */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-scaleIn">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="border backdrop-blur-md p-5 rounded-xl text-center border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm"
          >
            <div className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {item.value}
            </div>
            <div className="text-xxs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Narrative Row Architecture with Unsplash Medical Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        <div className="lg:col-span-7 space-y-4 animate-scaleIn">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Vetted Care Without Boundaries
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Founded by medical practitioners and systems engineers, our purpose
            answers a structural failure in classic modern healthcare:
            scheduling delays and geographic boundaries.
          </p>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            By compiling an interactive network matching professional
            disciplines directly with precise keyword searches, patients
            navigate to care options securely. No algorithms hidden inside
            premium search metrics, just visible clinical solutions.
          </p>

          <div className="space-y-2 pt-2">
            {[
              "Premium real-time filter engine matrices",
              "End-to-end credential certification architectures",
              "Direct, simple USD pricing clear of network coverage traps",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xxs font-semibold text-slate-700 dark:text-slate-300"
              >
                <FiCheckCircle className="text-teal-500 shrink-0" size={14} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Contextual Image Frame */}
        <div className="lg:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md animate-scaleIn group">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
            alt="Modern clinical tech facility workspace"
            fill
            sizes="(max-w-1024px) 100vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Core Values Segment */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            System Core Fundamentals
          </h2>
          <p className="text-xxs text-slate-400 dark:text-slate-500 mt-0.5">
            Our platform behavior is managed strictly under these baseline
            values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="border backdrop-blur-md p-5 rounded-xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm space-y-3 hover:border-teal-500/40 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 w-fit group-hover:scale-105 transition-transform">
                {v.icon}
              </div>
              <h3 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                {v.title}
              </h3>
              <p className="text-xxs text-slate-500 dark:text-slate-400 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
