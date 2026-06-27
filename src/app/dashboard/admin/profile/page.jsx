"use client";

import React, { useState } from "react";
import {
  RxPerson,
  RxEnvelopeClosed,
  RxCheckCircled,
  RxComponentPlaceholder,
} from "react-icons/rx";
import { LuLock } from "react-icons/lu";

export default function AdminProfileSettingsPage() {
  // Account core identification state
  const [profile, setProfile] = useState({
    fullName: "Chief Administrator Team",
    email: "system.admin@clinicallink.org",
    role: "Global Root Operations Controller",
    mfaStatus: "Enabled (Hardware Key)",
  });

  // Password structural modifiers
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Committed updated account parameters safely to node database:",
      profile,
    );
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      console.error(
        "Critical matching mismatch on credential configuration lines.",
      );
      return;
    }
    console.log("Transmitted secure encryption configuration updates.");
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Module Header Area */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          System Core Operations Profile
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Configure security authorization keys, modify global support handles,
          and refresh encryption parameters.
        </p>
      </div>

      {/* Main Structural Twin Forms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Attributes Panel Configuration */}
        <div className="lg:col-span-2 bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-50 dark:border-slate-900 pb-3 flex items-center gap-2">
            <RxPerson className="w-4 h-4 text-[#1E3A8A] dark:text-[#3cd1c2]" />
            <h3 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Identity Anchor Coordinates
            </h3>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Operator Working Label
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Assigned Authority Level
                </label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full px-4 py-2.5 text-[13px] bg-slate-100 dark:bg-slate-900/80 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-400 dark:text-slate-500 font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                Primary Diagnostic Email Route
              </label>
              <div className="relative">
                <RxEnvelopeClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-slate-700 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="py-2.5 px-5 bg-[#1E3A8A] hover:bg-[#152a61] dark:bg-[#3cd1c2] dark:hover:bg-[#2fb0a2] dark:text-slate-950 text-white font-bold text-[12px] rounded-[10px] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <RxCheckCircled className="w-4 h-4" /> Save Coordinate Changes
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Security Verification Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-50 dark:border-slate-900 pb-3 flex items-center gap-2">
              <LuLock className="w-4 h-4 text-rose-600" />
              <h3 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Credential Refresh
              </h3>
            </div>

            <form onSubmit={handleSecuritySubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Active Passcode
                </label>
                <input
                  type="password"
                  value={security.currentPassword}
                  onChange={(e) =>
                    setSecurity({
                      ...security,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Target Generation Vector
                </label>
                <input
                  type="password"
                  value={security.newPassword}
                  onChange={(e) =>
                    setSecurity({ ...security, newPassword: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Confirm Target Code
                </label>
                <input
                  type="password"
                  value={security.confirmPassword}
                  onChange={(e) =>
                    setSecurity({
                      ...security,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[10px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-700"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-[12px] rounded-[10px] transition-colors"
              >
                Re-encrypt Access Token
              </button>
            </form>

            <div className="border-t border-slate-50 dark:border-slate-900 pt-4 flex items-center justify-between text-[12px] font-medium">
              <span className="text-slate-400 flex items-center gap-1.5">
                <RxComponentPlaceholder className="w-4 h-4 text-emerald-500" />{" "}
                Multi-Factor State
              </span>
              <span className="text-slate-800 dark:text-slate-300 font-bold">
                {profile.mfaStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
