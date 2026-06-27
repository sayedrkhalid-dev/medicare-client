"use client";

import React, { useState } from "react";
import {
  RxSlider,
  RxGear,
  RxGlobe,
  RxBell,
  RxCheckCircled,
  RxCrossCircled,
} from "react-icons/rx";

export default function AdminGlobalSettingsPage() {
  // Global platform state toggles
  const [systemConfig, setSystemConfig] = useState({
    maintenanceMode: false,
    patientRegistrationOpen: true,
    globalConsultationFeeFloor: 50,
    stripeLiveEnvironment: true,
    webhookRetryLimit: 3,
    enableSystemNotifications: true,
  });

  const handleConfigToggle = (key) => {
    setSystemConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleValueChange = (key, val) => {
    setSystemConfig((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    console.log(
      "Global application architecture environment configurations updated:",
      systemConfig,
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Module Header Area */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
          Global System Settings & Variables
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Modify top-level application behaviors, calibrate billing parameters,
          and override node processing state constraints.
        </p>
      </div>

      <form
        onSubmit={handleSaveSettings}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Core System Operational Matrix Blocks */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Infrastructure Toggles */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-50 dark:border-slate-900/60 pb-3 flex items-center gap-2 select-none">
              <RxGlobe className="w-4 h-4 text-[#1E3A8A] dark:text-[#3cd1c2]" />
              <h3 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Ecosystem Run States
              </h3>
            </div>

            <div className="divide-y divide-slate-50 dark:divide-slate-900/40 text-[13px] font-medium space-y-4">
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col max-w-md">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    System Maintenance Freeze
                  </span>
                  <span className="text-[12px] text-slate-400 mt-0.5">
                    Redirect incoming client requests to a secure static
                    fallback page cluster.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleConfigToggle("maintenanceMode")}
                  className={`w-11 h-6 rounded-full transition-colors relative duration-200 focus:outline-none ${
                    systemConfig.maintenanceMode
                      ? "bg-rose-600"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                      systemConfig.maintenanceMode ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Patient Registration */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col max-w-md">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Public Patient Registration Intake
                  </span>
                  <span className="text-[12px] text-slate-400 mt-0.5">
                    Control whether new public profiles can initialize
                    authentication routines.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleConfigToggle("patientRegistrationOpen")}
                  className={`w-11 h-6 rounded-full transition-colors relative duration-200 focus:outline-none ${
                    systemConfig.patientRegistrationOpen
                      ? "bg-[#1E3A8A] dark:bg-[#3cd1c2]"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                      systemConfig.patientRegistrationOpen ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Core Gateway Rules Configuration */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-50 dark:border-slate-900/60 pb-3 flex items-center gap-2 select-none">
              <RxSlider className="w-4 h-4 text-emerald-600" />
              <h3 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Financial Threshold Rules
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] font-medium">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Base Consultation Floor ($ USD)
                </label>
                <input
                  type="number"
                  value={systemConfig.globalConsultationFeeFloor}
                  onChange={(e) =>
                    handleValueChange(
                      "globalConsultationFeeFloor",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Stripe Webhook Max Retries
                </label>
                <input
                  type="number"
                  value={systemConfig.webhookRetryLimit}
                  onChange={(e) =>
                    handleValueChange(
                      "webhookRetryLimit",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-4 py-2.5 text-[13px] bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Environments & State Submits */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-50 dark:border-slate-900 pb-3 flex items-center gap-2 select-none">
              <RxGear className="w-4 h-4 text-amber-500" />
              <h3 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Gateway Authorization
              </h3>
            </div>

            <div className="divide-y divide-slate-50 dark:divide-slate-900/40 text-[13px] font-medium space-y-4">
              {/* Stripe Environment Node */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Stripe Live Production API
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Toggle off to route through standard development test modes.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleConfigToggle("stripeLiveEnvironment")}
                  className={`w-11 h-6 rounded-full transition-colors relative duration-200 focus:outline-none ${
                    systemConfig.stripeLiveEnvironment
                      ? "bg-emerald-600"
                      : "bg-amber-500"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                      systemConfig.stripeLiveEnvironment ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Stream Notifications */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Global Notification Socket
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Dispatch automated alerts on transactional triggers.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleConfigToggle("enableSystemNotifications")
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative duration-200 focus:outline-none ${
                    systemConfig.enableSystemNotifications
                      ? "bg-[#1E3A8A] dark:bg-[#3cd1c2]"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                      systemConfig.enableSystemNotifications
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-slate-50 dark:border-slate-900/60 pt-4">
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-[12px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <RxCheckCircled className="w-4 h-4" /> Deploy Runtime Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
