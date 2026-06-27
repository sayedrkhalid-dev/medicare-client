"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxCheck,
  RxCross2,
  RxFile,
  RxDownload,
  RxInfoSign,
} from "react-icons/rx";

const applicationsDatabase = {
  "APP-4021": {
    name: "Dr. Evelyn Sinclair",
    specialty: "Cardiology",
    licenseNumber: "LIC-883921-MD",
    submissionDate: "2026-06-22",
    experience: "8 Years",
    status: "Pending",
    email: "e.sinclair@outlook.com",
    documents: [
      { name: "Medical_Board_License_CC.pdf", size: "2.4 MB" },
      { name: "Johns_Hopkins_Fellowship_Cert.pdf", size: "4.1 MB" },
    ],
  },
};

export default function DoctorApplicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const app = applicationsDatabase[id] || applicationsDatabase["APP-4021"];

  const [currentStatus, setCurrentStatus] = useState(app.status);

  const handleAction = (status) => {
    setCurrentStatus(status);
    console.log(`Application state successfully flipped to: ${status}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Return Interface Control */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Verification Board</span>
        </button>

        <span
          className={`px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase border ${
            currentStatus === "Pending"
              ? "bg-amber-50 text-amber-600 border-amber-200"
              : currentStatus === "Approved"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-rose-50 text-rose-600 border-rose-200"
          }`}
        >
          {currentStatus} Entry
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Dossier Metrics Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                {id} Registry Node
              </span>
              <h2 className="text-[20px] font-black text-slate-900 dark:text-white mt-0.5">
                {app.name}
              </h2>
              <p className="text-[13px] font-semibold text-slate-400">
                {app.email}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-900 pt-4 text-[13px] font-medium">
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Target Specialty
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  {app.specialty}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Experience Base
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  {app.experience}
                </span>
              </div>
            </div>
          </div>

          {/* Secure Document Signature Checklist Block */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Uploaded Certification Assets
            </h3>
            <div className="space-y-2">
              {app.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px]"
                >
                  <div className="flex items-center gap-3">
                    <RxFile className="w-5 h-5 text-slate-400 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 font-mono truncate max-w-[220px] sm:max-w-md">
                        {doc.name}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {doc.size}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 border border-[#E6F0FA] dark:border-slate-800 rounded-md hover:bg-white text-slate-500 transition-colors">
                    <RxDownload className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Administration Decision Core Sidepanel */}
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-fit gap-6">
          <div className="space-y-3">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Verification Engine Actions
            </h3>
            <p className="text-[12px] font-medium text-slate-400 leading-relaxed">
              Verify that the document files match medical board regulatory
              databases before completing the authorization sequence.
            </p>
          </div>

          {currentStatus === "Pending" ? (
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleAction("Approved")}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[10px] text-[13px] font-bold transition-colors flex items-center justify-center gap-2"
              >
                <RxCheck className="w-4 h-4" /> Authorized Credentials
              </button>
              <button
                onClick={() => handleAction("Rejected")}
                className="w-full py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 rounded-[10px] text-[13px] font-bold transition-colors flex items-center justify-center gap-2"
              >
                <RxCross2 className="w-4 h-4" /> Deny Registry Entry
              </button>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-[10px] text-center text-[12px] font-bold text-slate-400">
              Lifecycle status resolved permanently.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
