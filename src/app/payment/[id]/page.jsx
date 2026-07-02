"use client";

import React, { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiActivity,
  FiShield,
  FiLoader,
} from "react-icons/fi";

import { getDoctorById } from "@/services/doctors/doctor.service";
import { getUserById } from "@/services/users/user.service";
import { createCheckoutSession } from "@/services/payments/payment.service";

export default function CheckoutPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const doctorId = params.id;

  const searchParams = useSearchParams();
  const router = useRouter();

  // Selected date and time from the schedule selection step
  const appointmentDate = searchParams.get("date");
  const appointmentTime = searchParams.get("time");

  // State Management
  const [doctor, setDoctor] = useState(null);
  const [associatedUser, setAssociatedUser] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadCheckoutData() {
      if (!doctorId || !appointmentDate || !appointmentTime) {
        toast.error("Missing required appointment parameters.");
        router.push("/doctors");
        return;
      }

      try {
        setLoading(true);
        const doctorData = await getDoctorById(doctorId);
        const docRecord = doctorData?.data || doctorData;

        if (docRecord) {
          setDoctor(docRecord);
          const userData = await getUserById(docRecord.userId);
          setAssociatedUser(userData?.data || userData);
        }
      } catch (error) {
        console.error("Error loading checkout context:", error);
        toast.error("Failed to fetch doctor details.");
      } finally {
        setLoading(false);
      }
    }

    loadCheckoutData();
  }, [doctorId, appointmentDate, appointmentTime, router]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const payload = {
        doctorId,
        appointmentDate, // Format string: YYYY-MM-DD
        appointmentTime, // Format string: HH:MM
      };

      if (symptoms.trim()) {
        payload.symptoms = symptoms.trim();
      }

      // Call your backend service endpoint
      const response = await createCheckoutSession(payload);

      if (response?.success && response?.data?.checkoutUrl) {
        toast.success("Redirecting to Stripe payment gateway...");
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error(
          "Checkout session endpoint failed to provide routing parameters.",
        );
      }
    } catch (error) {
      console.error("Checkout initiation error:", error);
      toast.error(
        error?.message ||
          "Could not spin up payment session. Please check parameters.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide animate-pulse">
          <FiLoader className="animate-spin text-teal-500" size={16} />
          Assembling verification context...
        </div>
      </div>
    );
  }

  if (!doctor || !associatedUser) return null;

  return (
    <div className="p-6 md:p-10 text-slate-900 dark:text-slate-100 max-w-4xl mx-auto space-y-8 animate-scaleIn">
      <div>
        <Link
          href={`/doctors/${doctorId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-teal-500 transition-colors"
        >
          <FiArrowLeft size={12} />
          Modify schedule block
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Entry Field Column */}
        <form onSubmit={handleCheckout} className="lg:col-span-7 space-y-5">
          <div className="border backdrop-blur-md p-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm space-y-4">
            <div className="space-y-1">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Appointment Intake Review
              </h1>
              <p className="text-xxs text-slate-400 dark:text-slate-500">
                Provide complementary symptoms context before moving to the
                encrypted transaction page.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xxs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <FiFileText size={12} /> Symptoms / intake annotations
                (optional)
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                maxLength={1000}
                placeholder="Briefly state current physical conditions, prior diagnoses, or special guidance questions..."
                rows={5}
                className="w-full text-xs p-3 border rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-colors resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              <div className="text-right text-[10px] text-slate-400 dark:text-slate-500">
                {symptoms.length} / 1000 characters
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 text-xs font-semibold tracking-wide rounded-xl shadow-sm text-center bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:opacity-90 active:scale-98 cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <FiLoader className="animate-spin" size={14} />
                Spawning Stripe Environment...
              </>
            ) : (
              "Authorize & open Stripe secure summary"
            )}
          </button>
        </form>

        {/* Selected Context Meta Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border backdrop-blur-md p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm space-y-4">
            <h2 className="text-xxs font-semibold text-slate-400 dark:text-slate-500">
              Session details
            </h2>

            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/60">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0 bg-slate-100 dark:bg-slate-950">
                <Image
                  src={associatedUser.image || "/placeholder-avatar.jpg"}
                  alt={associatedUser.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {associatedUser.name}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                  {doctor.specialization}
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <FiCalendar size={12} className="text-teal-500" /> Consult
                  date
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {appointmentDate}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <FiClock size={12} className="text-teal-500" /> Window time
                </span>
                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                  {appointmentTime}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-semibold">
                  <FiActivity size={12} className="text-teal-500" /> Grand
                  balance due
                </span>
                <span className="flex items-baseline font-black text-slate-900 dark:text-white">
                  <FiDollarSign
                    size={13}
                    className="text-slate-400 self-center"
                  />
                  {doctor.consultationFee}
                  <span className="text-[10px] text-slate-400 font-medium ml-0.5">
                    BDT
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="border border-dashed p-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 flex items-center gap-3">
            <FiShield className="text-teal-500 shrink-0" size={14} />
            <div>
              <h4 className="text-xxs font-semibold text-slate-700 dark:text-slate-300">
                PCI-DSS compliance rule
              </h4>
              <p className="text-xxs text-slate-400 dark:text-slate-500">
                No billing instruments or credit details are held or analyzed
                locally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
