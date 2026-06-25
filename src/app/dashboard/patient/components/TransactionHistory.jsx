import React from "react";
import {
  RxDownload,
  RxFileText,
  RxCheckCircled,
  RxClock,
  RxChevronRight,
} from "react-icons/rx";

export default function TransactionHistory({
  transactionsList,
  onDownloadInvoice,
}) {
  const transactions = transactionsList || [
    {
      id: "TXN-8492",
      doctorName: "Dr. Sarah Mitchell",
      specialization: "Cardiology",
      date: "Oct 24, 2026",
      amount: 150.0,
      method: "Stripe (Visa •••• 4242)",
      status: "Paid",
    },
    {
      id: "TXN-7103",
      doctorName: "Dr. James Rahman",
      specialization: "Neurology",
      date: "Oct 12, 2026",
      amount: 180.0,
      method: "Stripe (Mastercard •••• 5555)",
      status: "Paid",
    },
    {
      id: "TXN-6041",
      doctorName: "Dr. Alex Rivera",
      specialization: "Dermatology",
      date: "Sep 28, 2026",
      amount: 120.0,
      method: "Stripe (Apple Pay)",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="space-y-0.5">
          <h3 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">
            Payment Transaction History
          </h3>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Securely monitor and download your past consultation statements and
            invoices.
          </p>
        </div>

        <button className="self-start sm:self-center flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest text-[#008080] dark:text-[#3cd1c2] hover:text-[#006666] dark:hover:text-[#2ab0a2] transition-colors group cursor-pointer">
          <span>View Detailed Ledger</span>
          <RxChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Hidden Scrollbar Container for Swipeable Mobile Matrix */}
      <div className="overflow-x-auto -mx-6 px-6 pb-1 overflow-x-scroll">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#E6F0FA] dark:border-slate-800/60">
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Invoice ID
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Specialist Team
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Processed Date
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Payment Gateway
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Status
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Amount
              </th>
              <th className="pb-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Receipt
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6F0FA]/60 dark:divide-slate-800/40">
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="group hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
              >
                <td className="py-4 font-mono text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  #{txn.id}
                </td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight">
                      {txn.doctorName}
                    </span>
                    <span className="text-[12px] text-slate-400 font-medium">
                      {txn.specialization}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-[14px] text-slate-500 dark:text-slate-400 font-medium">
                  {txn.date}
                </td>
                <td className="py-4 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                  {txn.method}
                </td>
                <td className="py-4">
                  {txn.status === "Paid" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                      <RxCheckCircled className="w-3.5 h-3.5" />
                      <span>Settled</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
                      <RxClock className="w-3.5 h-3.5 animate-spin" />
                      <span>Pending</span>
                    </span>
                  )}
                </td>
                <td className="py-4 text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">
                  ${txn.amount.toFixed(2)}
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() =>
                      onDownloadInvoice && onDownloadInvoice(txn.id)
                    }
                    disabled={txn.status !== "Paid"}
                    className="p-2 rounded-[12px] border border-[#E6F0FA] dark:border-slate-800 bg-white dark:bg-slate-900 transition-all active:scale-95 text-slate-500 dark:text-slate-400 hover:text-[#1E3A8A] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 inline-flex items-center gap-1.5 text-[12px] font-medium tracking-tight px-3 disabled:opacity-40"
                  >
                    <RxDownload className="w-4 h-4" />
                    <span className="hidden md:inline">Download PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
