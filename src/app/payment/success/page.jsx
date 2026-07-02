"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiCheckCircle,
  FiLoader,
  FiAlertTriangle,
  FiCreditCard,
  FiArrowRight,
  FiActivity,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

import { verifyCheckoutSession } from "@/services/payments/payment.service";

// 1. Extracted Sub-Component to encapsulate URL Client Runtime logic
function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  // State Management
  const [verificationState, setVerificationState] = useState("verifying"); // verifying | succeeded | failed
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Track continuous polling metrics safely
  const pollingCountRef = useRef(0);
  const maxPollAttempts = 15; // Increased to 15 attempts (30 seconds total) for robust local network processing

  useEffect(() => {
    if (!sessionId) {
      setVerificationState("failed");
      setErrorMessage(
        "No active transaction identification parameter found in your path.",
      );
      return;
    }

    let isMounted = true;
    let timeoutId = null;

    async function pollSessionVerification() {
      try {
        pollingCountRef.current += 1;

        // Execute endpoint lookup match directly
        const response = await verifyCheckoutSession(sessionId);

        if (!isMounted) return;

        // ✅ FIXED: Deep extraction parsing (response.data.data.status) to unpack Express JSON structure
        if (response?.success && response?.data?.status === "success") {
          // ✅ FIXED: Target the inner payment document correctly
          setAppointmentDetails(response.data.payment);
          setVerificationState("succeeded");
          toast.success("Appointment verified successfully!");
        } else if (pollingCountRef.current >= maxPollAttempts) {
          setVerificationState("failed");
          setErrorMessage(
            "Verification timed out. Your transaction is processing but could not be updated instantly. Check your dashboard.",
          );
        } else {
          // Keep polling every 2 seconds if status is still "pending" or "processing"
          timeoutId = setTimeout(pollSessionVerification, 2000);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Verification error encountered:", error);

        if (pollingCountRef.current >= maxPollAttempts) {
          setVerificationState("failed");
          setErrorMessage(
            error?.message || "Database validation pipeline failed to clear.",
          );
        } else {
          timeoutId = setTimeout(pollSessionVerification, 2000);
        }
      }
    }

    pollSessionVerification();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sessionId, router]);

  return (
    <>
      {/* Verification Loading State */}
      {verificationState === "verifying" && (
        <div className="space-y-4 py-6">
          <div className="flex justify-center">
            <FiLoader className="animate-spin text-teal-500" size={36} />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-base font-bold tracking-tight">
              Confirming settlement context
            </h1>
            <p className="text-xxs text-slate-400 dark:text-slate-500 max-w-sm mx-auto leading-relaxed">
              Syncing securely with clearing networks to register your session
              allocation data. Do not close this terminal.
            </p>
          </div>
        </div>
      )}

      {/* Verification Success State */}
      {verificationState === "succeeded" && (
        <>
          <div className="space-y-3 py-2">
            <div className="flex justify-center">
              <div className="p-3 bg-teal-500/10 rounded-full border border-teal-500/20 text-teal-500 animate-bounce">
                <FiCheckCircle size={32} />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Consultation Confirmed
              </h1>
              <p className="text-xxs text-slate-400 dark:text-slate-500">
                Your billing settlement was matched. Your session parameters
                are permanently saved.
              </p>
            </div>
          </div>

          {/* Display verification details */}
          {appointmentDetails && (
            <div className="p-4 rounded-xl border text-left text-xs bg-slate-50/40 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <FiCreditCard size={12} /> Transaction matching ID
                </span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {appointmentDetails.transactionId ||
                    sessionId.substring(0, 12) + "..."}
                </span>
              </div>
              {appointmentDetails.amount && (
                <div className="flex items-center justify-between border-t border-slate-200/40 dark:border-slate-800/40 pt-2">
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <FiActivity size={12} /> Settled amount
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {appointmentDetails.amount}{" "}
                    {appointmentDetails.currency?.toUpperCase() || "BDT"}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Link
              href="/dashboard/payments"
              className="w-full py-2.5 text-xs font-semibold tracking-wide rounded-xl shadow-sm text-center bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Access payment dashboard
              <FiArrowRight size={13} />
            </Link>
          </div>
        </>
      )}

      {/* Verification Failure State */}
      {verificationState === "failed" && (
        <>
          <div className="space-y-3 py-2">
            <div className="flex justify-center">
              <div className="p-3 bg-rose-500/10 rounded-full border border-rose-500/20 text-rose-500">
                <FiAlertTriangle size={32} />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-lg font-extrabold tracking-tight text-rose-500">
                Verification Exception
              </h1>
              <p className="text-xxs text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
                {errorMessage ||
                  "The security loop could not confirm clearance records correctly."}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <Link
              href="/doctors"
              className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-center cursor-pointer"
            >
              Return to directory
            </Link>
            <Link
              href="/dashboard/payments"
              className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:opacity-90 transition-all text-center cursor-pointer"
            >
              View dashboard history
            </Link>
          </div>
        </>
      )}
    </>
  );
}

// 2. Main Page Module exporting layout boundary wrappers safely
export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[75vh] p-6 md:p-10 flex items-center justify-center text-slate-900 dark:text-slate-100 max-w-xl mx-auto">
      <div className="w-full border backdrop-blur-md p-8 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 shadow-sm text-center space-y-6 animate-scaleIn">
        <Suspense
          fallback={
            <div className="space-y-4 py-6">
              <div className="flex justify-center">
                <FiLoader className="animate-spin text-teal-500" size={36} />
              </div>
              <h1 className="text-base font-bold text-slate-400 dark:text-slate-500">
                Loading checkout session...
              </h1>
            </div>
          }
        >
          <CheckoutSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}