"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaVenusMars } from "react-icons/fa";
import {
  LuActivity,
  LuCalendar,
  LuCamera,
  LuCheck,
  LuListFilter,
  LuMail,
  LuMapPin,
  LuPhone,
  LuShieldAlert,
  LuUser,
} from "react-icons/lu";
import { MdClose } from "react-icons/md";

export default function ProfilePage() {
  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;
  console.log(user);

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({});

  // Step 1: Initialize form fields when session profile data successfully resolves
  useEffect(() => {
    if (user) {
      const setInitialForm = () =>
        setFormData({
          name: user.name || "",
          phone: user.phone || "",
          dateOfBirth: user.dateOfBirth || "",
          gender: user.gender || "",
          bloodGroup: user.bloodGroup || "A+",
          address: user.address || "",
        });

      setInitialForm();
    }
  }, [user]);

  // Step 2: Handle live key value state mutation changes
  const handleInputChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 3: Handle asynchronous validation state submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await authClient.updateUser(formData);
      setIsSaving(false);
      setIsSaved(true);

      setTimeout(() => setIsSaved(false), 1000);
      console.log("Medicare Profile updated successfully:", formData);
    } catch (err) {
      console.error("Failed to commit ledger modifications:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Header View */}
      <div className="border-b border-slate-100 dark:border-slate-900 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E3A8A] dark:text-white sm:text-3xl">
          Profile Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal records, contact metrics, and medical
          verification profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Account Info Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 text-center shadow-sm">
            <div className="relative w-28 h-28 mx-auto group">
              <div className="w-full h-full rounded-full bg-[#E6F0FA]/60 dark:bg-slate-900 border-2 border-dashed border-[#1E3A8A]/30 dark:border-blue-400/30 flex items-center justify-center text-slate-400 overflow-hidden">
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={user?.name || "User Avatar"}
                    fill
                    className="rounded-full"
                  />
                ) : (
                  <LuUser className="w-12 h-12 text-[#1E3A8A]/70 dark:text-blue-400/70" />
                )}
              </div>
              <button
                type="button"
                className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-white"
                title="Change Avatar Image"
              >
                <LuCamera className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {user?.role} Profile
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-900 flex justify-center gap-2">
              {user?.emailVerified ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <LuCheck className="w-3.5 h-3.5" /> ID Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                  <MdClose className="w-3.5 h-3.5" /> Not Verified
                </span>
              )}
            </div>
          </div>

          {/* Administrative Metadata Info */}
          <div className="bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5 space-y-4 shadow-sm text-sm">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LuListFilter className="w-4 h-4 text-slate-400" /> Administrative
              Logs
            </h3>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span className="font-medium">Account Created:</span>{" "}
                <span className="text-slate-700 dark:text-slate-200">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "---"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Updated At:</span>{" "}
                <span className="text-slate-700 dark:text-slate-200">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "---"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Last Login:</span>{" "}
                <span className="text-slate-700 dark:text-slate-200">
                  Today, 07:25 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reorganized Form Block */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#090d1f] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] shadow-sm overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Block 1: Demographics & Personal Identification */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-900 pb-3 mb-5">
                  Personal Identification Metrics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Full Legal Name
                    </label>
                    <div className="relative">
                      <LuUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        value={formData?.name || ""}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[10px] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-all font-medium"
                        required
                      />
                    </div>
                  </div>

                  {/* Email address input - LOCKED STATE */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <LuMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={user?.email || ""}
                        readOnly
                        disabled
                        className="w-full bg-slate-100 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800/80 rounded-[10px] pl-10 pr-4 py-2.5 text-sm outline-none cursor-not-allowed font-medium select-none"
                        title="Primary registration email cannot be altered."
                      />
                    </div>
                  </div>

                  {/* Phone number field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Phone Identifier
                    </label>
                    <div className="relative">
                      <LuPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        name="phone"
                        value={formData?.phone || ""}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[10px] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-all font-medium"
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  {/* Step 2: Added Premium Calendar Picker Wrapper for DOB */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <LuCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData?.dateOfBirth || ""}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[10px] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-all font-medium text-slate-600 dark:text-slate-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Step 3: Inserted Gender Metric field matching design syntax */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Biological Gender
                    </label>
                    <div className="relative">
                      <FaVenusMars className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                      <select
                        name="gender"
                        value={formData?.gender || ""}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[10px] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-all font-medium text-slate-600 dark:text-slate-300 appearance-none"
                        required
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Blood Group configuration parameters */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Blood Type Group
                    </label>
                    <div className="relative">
                      <LuActivity className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                      <select
                        name="bloodGroup"
                        value={formData?.bloodGroup || "A+"}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[10px] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-all font-medium text-slate-600 dark:text-slate-300 appearance-none"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Block 2: Location and Addresses */}
              <div className="pt-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-900 pb-3 mb-5">
                  Residential Coordinates
                </h3>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Residential Address
                  </label>
                  <div className="relative">
                    <LuMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      name="address"
                      value={formData?.address || ""}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[10px] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-all font-medium"
                      required
                      placeholder="Your complete residential address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Primary design system colors optimized for submission actions */}
            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/40 border-t border-[#E6F0FA] dark:border-slate-900 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 text-sm font-semibold bg-[#1E3A8A] hover:bg-[#152a66] text-white rounded-[10px] shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : isSaved
                    ? "Saved changes"
                    : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Advisory Bottom Info Block */}
      <div className="p-4 rounded-[12px] bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
        <LuShieldAlert className="w-5 h-5 text-[#1E3A8A] dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          <strong>Security Protocol Warning:</strong> Modifying parameters like
          full legal names or secure routing emails changes internal access
          verification state properties. Updates undergo standard ledger audits
          before refreshing live records.
        </div>
      </div>
    </div>
  );
}
