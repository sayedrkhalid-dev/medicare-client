"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  RxArrowLeft,
  RxCalendar,
  RxCardStack,
  RxFileText,
  RxActivityLog,
} from "react-icons/rx";
import { LuLock } from "react-icons/lu";

// Mock financial archive mapping out extensive payload objects returned by Stripe APIs
const stripeTransactionsDatabase = {
  ch_3MxsKSFkXvKuK6MM1N3: {
    customerName: "Eleanor Vance",
    email: "e.vance@gmail.com",
    amount: 120.0,
    applicationFee: 12.0,
    stripeFee: 3.78,
    netPayout: 104.22,
    currency: "USD",
    date: "2026-06-25 14:12:08",
    status: "Succeeded",
    payoutStatus: "Transferred",
    paymentMethod: "Visa ending in 4242",
    fundingType: "Credit",
    riskEvaluation: "Normal (Score: 12)",
    receiptUrl: "https://receipt.stripe.com/ch_3MxsKSFkXvKuK6MM1N3",
  },
};

export default function AdminPaymentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // Dynamic fallback mapping ensuring uninterrupted view initialization across mock parameters
  const tx =
    stripeTransactionsDatabase[id] ||
    stripeTransactionsDatabase["ch_3MxsKSFkXvKuK6MM1N3"];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Structural Module Header Area */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors group"
        >
          <RxArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to Clearing Ledger</span>
        </button>

        <span
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-black border uppercase tracking-wider ${
            tx.status === "Succeeded"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900"
              : "bg-rose-50 text-rose-700 border-rose-200"
          }`}
        >
          Stripe API State: {tx.status}
        </span>
      </div>

      {/* Primary Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Distributions and Accounting Metrics Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Metadata Anchor Panel */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                Object Token: {id}
              </span>
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mt-2">
                Account Billing Origin
              </h3>
            </div>

            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-900 rounded-[12px]">
              <div className="text-[13px] font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Customer Profiling Target
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                    {tx.customerName}
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Stripe Link Email
                  </span>
                  <span className="font-mono font-bold text-slate-500 dark:text-slate-400 mt-0.5 block">
                    {tx.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Ledger Balancing Formula */}
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-50 dark:border-slate-900/60 pb-3">
              Settlement Balance Ledger
            </h3>

            <div className="divide-y divide-slate-50 dark:divide-slate-900/40 text-[13px] font-medium space-y-3.5">
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Captured Charge Volume</span>
                <span className="font-black text-slate-900 dark:text-white">
                  ${tx.amount.toFixed(2)} {tx.currency}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3.5">
                <span className="text-slate-400">
                  Platform Application Share (10%)
                </span>
                <span className="font-bold text-slate-600 dark:text-slate-400">
                  -${tx.applicationFee.toFixed(2)} {tx.currency}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3.5">
                <span className="text-slate-400">
                  Stripe Gateway Gateway Processing Fee
                </span>
                <span className="font-bold text-slate-600 dark:text-slate-400">
                  -${tx.stripeFee.toFixed(2)} {tx.currency}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl">
                <span className="text-slate-900 dark:text-slate-300 font-bold">
                  Net System Provider Deposit Allocation
                </span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-[15px]">
                  ${tx.netPayout.toFixed(2)} {tx.currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Processing Radar Side-Rail Logs */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6 shadow-sm space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Stripe Radar Telemetry
            </h3>

            <div className="space-y-3.5 font-medium text-[13px]">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxCalendar className="w-4 h-4" /> Gateway Execution
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-mono font-bold text-[12px]">
                  {tx.date}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxCardStack className="w-4 h-4" /> Instrument Specification
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-semibold">
                  {tx.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-900 pb-2.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <LuLock className="w-4 h-4" /> Risk Evaluation
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-semibold">
                  {tx.riskEvaluation}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RxActivityLog className="w-4 h-4" /> Payout Network
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {tx.payoutStatus}
                </span>
              </div>
            </div>

            <a
              href={tx.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-[13px] rounded-[10px] transition-colors flex items-center justify-center gap-1.5 select-none"
            >
              <RxFileText className="w-4 h-4" /> Open Stripe Dashboard Invoice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
