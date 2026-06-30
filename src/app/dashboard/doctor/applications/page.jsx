"use client";

import React, { useState, useEffect } from "react";
import {
  RxFile,
  RxCheckCircled,
  RxClock,
  RxExclamationTriangle,
  RxUpload,
  RxLink2,
  RxCardStack,
} from "react-icons/rx";

// --- API Service Functions ---
import {
  createApplication,
  getMyApplications,
} from "@/services/doctor-applications/doctorApplication.service";

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Oncology",
  "Gynecology",
  "Urology",
  "ENT",
];

export default function DoctorApplicationPage() {
  const [formData, setFormData] = useState({
    bmdcNumber: "",
    bmdcCertificateUrl: "",
    specialization: "",
    hospital: "",
    consultationFee: "",
    experienceYears: "",
    languages: "",
    bio: "",
  });

  const [applicationsList, setApplicationsList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [globalMessage, setGlobalMessage] = useState({ type: "", text: "" });

  const fetchApplications = async () => {
    try {
      setPageLoading(true);
      const response = await getMyApplications();
      setApplicationsList(response?.data || response || []);
    } catch (err) {
      console.error("Error pulling application history:", err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    const fetcher = () => fetchApplications();
    fetcher();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.bmdcNumber.trim()) errors.bmdcNumber = "Required";
    if (!formData.bmdcCertificateUrl.trim())
      errors.bmdcCertificateUrl = "Required";
    if (!formData.specialization) errors.specialization = "Required";
    if (!formData.hospital.trim()) errors.hospital = "Required";

    if (
      formData.consultationFee === "" ||
      Number(formData.consultationFee) < 0
    ) {
      errors.consultationFee = "Must be ≥ 0";
    }
    if (
      formData.experienceYears === "" ||
      Number(formData.experienceYears) < 0
    ) {
      errors.experienceYears = "Must be ≥ 0";
    }
    if (formData.bio.length > 1000) {
      errors.bio = "Maximum 1000 characters exceeded";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      setGlobalMessage({ type: "", text: "" });

      const processedLanguages = formData.languages
        ? formData.languages
            .split(",")
            .map((l) => l.trim())
            .filter(Boolean)
        : [];

      const payload = {
        bmdcNumber: formData.bmdcNumber.trim(),
        bmdcCertificateUrl: formData.bmdcCertificateUrl.trim(),
        specialization: formData.specialization,
        hospital: formData.hospital.trim(),
        consultationFee: Number(formData.consultationFee),
        experienceYears: Number(formData.experienceYears),
        languages: processedLanguages,
        bio: formData.bio.trim(),
      };

      await createApplication(payload);

      setGlobalMessage({
        type: "success",
        text: "Application submitted successfully.",
      });
      setFormData({
        bmdcNumber: "",
        bmdcCertificateUrl: "",
        specialization: "",
        hospital: "",
        consultationFee: "",
        experienceYears: "",
        languages: "",
        bio: "",
      });
      fetchApplications();
    } catch (err) {
      console.error(err);
      setGlobalMessage({
        type: "error",
        text:
          err?.response?.data?.message ||
          "Submission failed. Please check network and retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] text-[#1E3A8A] transition-colors duration-300 dark:bg-[#020617] dark:text-[#FFFFFF]">
      {/* Subtle background decorative glows */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E6F0FA]/40 dark:bg-slate-900/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#008080]/5 dark:bg-[#008080]/2 blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 py-10 relative z-10">
        {/* Simple Page Header */}
        <header className="mb-10">
          <h1 className="text-[28px] md:text-[34px] font-bold tracking-tight">
            Practitioner Verification
          </h1>
          <p className="text-[14px] text-[#475569] dark:text-[#94A3B8] mt-1">
            Complete your professional profile below to apply for your digital
            medical workspace.
          </p>
        </header>

        {/* Global Banner Messages */}
        {globalMessage.text && (
          <div
            className={`mb-6 p-4 rounded-[12px] flex items-center gap-3 text-[14px] font-medium border ${
              globalMessage.type === "success"
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400"
            }`}
          >
            {globalMessage.type === "success" ? (
              <RxCheckCircled className="w-5 h-5 shrink-0" />
            ) : (
              <RxExclamationTriangle className="w-5 h-5 shrink-0" />
            )}
            <span>{globalMessage.text}</span>
          </div>
        )}

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Clean Application Form Container */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 rounded-[16px] shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: BMDC Number & Document URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                    BMDC Reg Number *
                  </label>
                  <input
                    type="text"
                    name="bmdcNumber"
                    value={formData.bmdcNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., A-54321"
                    className={`w-full px-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border ${formErrors.bmdcNumber ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] transition-colors`}
                  />
                  {formErrors.bmdcNumber && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formErrors.bmdcNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                    Certificate Document URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="bmdcCertificateUrl"
                      value={formData.bmdcCertificateUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/doc.pdf"
                      className={`w-full pl-9 pr-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border ${formErrors.bmdcCertificateUrl ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] transition-colors`}
                    />
                    <RxLink2 className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                  </div>
                  {formErrors.bmdcCertificateUrl && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formErrors.bmdcCertificateUrl}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Specialization & Current Affiliated Hospital */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                    Specialization Core Field *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border ${formErrors.specialization ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] text-[#1E3A8A] dark:text-white transition-colors`}
                  >
                    <option value="">Select Domain focus</option>
                    {SPECIALIZATIONS.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  {formErrors.specialization && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formErrors.specialization}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                    Current Attached Hospital *
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    placeholder="e.g., Dhaka Medical College"
                    className={`w-full px-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border ${formErrors.hospital ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] transition-colors`}
                  />
                  {formErrors.hospital && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formErrors.hospital}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Consultation Fee Rate & Experience Matrix Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                    Consultation Fee (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 800"
                    className={`w-full px-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border ${formErrors.consultationFee ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] transition-colors`}
                  />
                  {formErrors.consultationFee && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formErrors.consultationFee}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 5"
                    className={`w-full px-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border ${formErrors.experienceYears ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] transition-colors`}
                  />
                  {formErrors.experienceYears && (
                    <p className="text-xs text-rose-500 mt-1">
                      {formErrors.experienceYears}
                    </p>
                  )}
                </div>
              </div>

              {/* Languages Input Column */}
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                  Languages Spoken (Separated by commas)
                </label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  placeholder="Bengali, English"
                  className="w-full px-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] transition-colors"
                />
              </div>

              {/* Bio Summary Block */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Professional Bio
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formData.bio.length}/1000
                  </span>
                </div>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  maxLength="1000"
                  placeholder="Tell patients about your clinical fields, treatments, and practices..."
                  className="w-full px-4 py-2.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#008080] dark:focus:border-[#3CD1C2] text-[14px] transition-colors resize-none"
                />
                {formErrors.bio && (
                  <p className="text-xs text-rose-500 mt-1">{formErrors.bio}</p>
                )}
              </div>

              {/* Ultra Clean Submit Trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-[10px] text-[14px] font-semibold bg-[#008080] hover:bg-[#006666] dark:bg-[#3CD1C2] dark:hover:bg-[#2AB0A2] text-white dark:text-[#020617] py-3 shadow-sm transition-all duration-150 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting
                  ? "Submitting profile application..."
                  : "Submit Credentials"}
              </button>
            </form>
          </div>

          {/* Sidebar Panel: Simplified Applications Tracking Feed */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 rounded-[16px] shadow-sm p-5">
              <h2 className="text-[16px] font-bold tracking-tight mb-4 flex items-center gap-2">
                <RxFile className="text-[#008080] dark:text-[#3CD1C2]" />{" "}
                Application Status
              </h2>

              {pageLoading ? (
                <p className="text-[13px] text-slate-400 animate-pulse text-center py-4">
                  Checking logs...
                </p>
              ) : applicationsList.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-[12px]">
                  <p className="text-[13px] text-slate-400">
                    No applications sent yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {applicationsList.map((app, index) => (
                    <div
                      key={app._id || index}
                      className="p-3.5 rounded-[10px] bg-[#F8FAFC] dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 flex items-center justify-between gap-3 text-[13px]"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1E3A8A] dark:text-white truncate">
                          {app.specialization}
                        </p>
                        <p className="text-[12px] text-slate-400 truncate mt-0.5">
                          {app.hospital}
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-[6px] shrink-0 flex items-center gap-1 ${
                          app.status === "APPROVED"
                            ? "bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : app.status === "REJECTED"
                              ? "bg-rose-100/70 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400"
                              : "bg-amber-100/70 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
                        }`}
                      >
                        {app.status === "APPROVED" ? (
                          <RxCheckCircled />
                        ) : (
                          <RxClock />
                        )}
                        {app.status || "PENDING"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Micro Informational Compliance Checklist Panel */}
            <div className="rounded-[20px] bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-white/30 dark:border-white/10 p-5 text-left text-slate-600 dark:text-slate-400">
              <h3 className="text-[13px] font-bold text-[#1E3A8A] dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                <RxCardStack className="text-[#008080]" /> Submission Checklist
              </h3>
              <ul className="text-[12px] space-y-1.5 list-disc pl-4 font-normal leading-relaxed">
                <li>
                  Double check your certified BMDC Registration format matching
                  database indexes.
                </li>
                <li>
                  Ensure document references stay public for clinical validator
                  checks.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
