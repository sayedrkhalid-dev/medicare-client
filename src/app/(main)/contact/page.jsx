"use client";

import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";

export default function ContactUsPage() {
  const infoCards = [
    {
      icon: <FiMail className="text-teal-600 dark:text-teal-400" size={16} />,
      title: "Email Channels",
      value: "operations@clinicalnetwork.org",
      desc: "Response within 2 hours tracking.",
    },
    {
      icon: <FiPhone className="text-teal-600 dark:text-teal-400" size={16} />,
      title: "Direct Hotlines",
      value: "+1 (800) 555-8840",
      desc: "Mon-Fri from 8am to 6pm EST.",
    },
    {
      icon: <FiMapPin className="text-teal-600 dark:text-teal-400" size={16} />,
      title: "Central Office HQ",
      value: "600 Medical Plaza, Floor 12",
      desc: "San Francisco, CA 94103.",
    },
  ];

  return (
    <div className="mt-16 p-6 md:p-10 max-w-5xl mx-auto text-slate-900 dark:text-slate-100 space-y-10 animate-scaleIn">
      {/* Minimal Header Block */}
      <div className="max-w-xl">
        <span className="text-xxs font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
          Connect / Support
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Get in Touch With Us
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
          Have an issue with an appointment slot, system verification, or
          billing metrics? Fill out the channel envelope below.
        </p>
      </div>

      {/* Balanced Form + Card Grid Combo Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Premium Input Fields Interface */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="lg:col-span-7 flex flex-col justify-between border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm gap-5"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/60">
              <FiMessageSquare className="text-teal-500" size={14} />
              <h2 className="text-xxs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Inquiry Dispatch Envelope
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Jonathan Doe"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Classification Subject
              </label>
              <select className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer appearance-none">
                <option>General Platform Inquiries</option>
                <option>Specialist Scheduling Assistance</option>
                <option>System Accounts & API Support</option>
                <option>Billing Matrix Corrections</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Message Details
              </label>
              <textarea
                rows={4}
                placeholder="Type your message text context here..."
                className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-colors resize-none custom-panel-scrollbar"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:opacity-90 active:scale-98 cursor-pointer shadow-sm mt-2"
          >
            <FiSend size={12} />
            Transmit Message
          </button>
        </form>

        {/* Right Side: Clean Stacked Channel Blocks */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            {infoCards.map((card, idx) => (
              <div
                key={idx}
                className="border backdrop-blur-md p-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm flex items-start gap-4 flex-1"
              >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 shrink-0">
                  {card.icon}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-xxs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {card.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {card.value}
                  </p>
                  <p className="text-xxs text-slate-400 dark:text-slate-500">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Hour Callout Widget */}
          <div className="border border-dashed p-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 flex items-center gap-3">
            <FiClock className="text-teal-500 shrink-0" size={16} />
            <div>
              <h4 className="text-xxs font-bold text-slate-700 dark:text-slate-300">
                Routing Node Coverage
              </h4>
              <p className="text-xxs text-slate-400 dark:text-slate-500">
                Emergency medical dispatch links remain monitored 24/7/365.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
