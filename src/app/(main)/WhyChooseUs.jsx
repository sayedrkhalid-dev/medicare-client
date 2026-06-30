"use client";

import React from "react";
import {
  FiCheckCircle,
  FiShield,
  FiCpu,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";

export default function WhyChooseUs() {
  const coreStrengths = [
    {
      icon: <FiShield className="text-teal-500" size={20} />,
      title: "Strict Practitioner Verification",
      desc: "Every listed specialist passes through a multi-tier credentialing array and legal certification validation before entering our network.",
    },
    {
      icon: <FiCpu className="text-teal-500" size={20} />,
      title: "High-Fidelity Search Matrix",
      desc: "Skip artificial metrics and sponsored algorithms. Filter directly by precise medical disciplines, availability brackets, and locked cost ranges.",
    },
    {
      icon: <FiClock className="text-teal-500" size={20} />,
      title: "Instant Session Allocation",
      desc: "Eliminate traditional administrative bottlenecks. Secure real-time appointment clearances with certified professionals instantly.",
    },
    {
      icon: <FiTrendingUp className="text-teal-500" size={20} />,
      title: "Transparent Rate Caps",
      desc: "Complete financial clarity with structural pricing channels. No hidden operational premium surcharges or network coverage traps.",
    },
  ];

  const checklist = [
    "24/7 redundant data link node uptime",
    "End-to-end operational transparency matrix",
    "Direct API access to verified provider systems",
  ];

  return (
    <section className="py-16 px-6 md:px-10 text-slate-900 dark:text-slate-100 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
          Platform Advantages
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
          Why Choose MediCare Connect
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          We have re-engineered the digital clinical pipeline from scratch,
          removing administrative friction to prioritize verifiable patient care
          parameters.
        </p>
      </div>

      {/* Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Strength Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {coreStrengths.map((strength, idx) => (
            <div
              key={idx}
              className="border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm flex flex-col gap-4 hover:border-teal-500/30 hover:shadow-md transition-all"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 text-slate-600 w-fit">
                {strength.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                  {strength.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {strength.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Metric Panel */}
        <div className="lg:col-span-4 border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm flex flex-col gap-8">
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Performance Benchmarks
              </h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Our continuous routing infrastructure ensures data transfers and
              booking confirmations complete within microsecond constraints.
            </p>

            <ul className="space-y-3">
              {checklist.map((text, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <FiCheckCircle
                    className="text-teal-500 shrink-0 mt-0.5"
                    size={14}
                  />
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/60 flex items-center justify-between gap-3">
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Under 5 Min
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Average discovery to clearance time
              </div>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20 whitespace-nowrap">
              Live Optimized
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
