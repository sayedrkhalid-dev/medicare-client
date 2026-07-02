"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  FiCreditCard,
  FiSliders,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
  FiDollarSign,
  FiActivity,
  FiCalendar,
} from "react-icons/fi";

import { getMyPayments } from "@/services/payments/payment.service";

export default function MyPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: "",
    page: 1,
    limit: 10,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    async function fetchMyPayments() {
      try {
        setIsLoading(true);
        const response = await getMyPayments(filters);

        if (response?.success) {
          setPayments(response.data || []);

          if (response.meta) {
            setPagination({
              page: response.meta.page || 1,
              totalPages: response.meta.totalPages || 1,
              total: response.meta.total || 0,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load payment history:", error);
        toast.error("Could not load your payment history.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMyPayments();
  }, [filters]);

  const handleStatusChange = (statusValue) => {
    setFilters((prev) => ({ ...prev, status: statusValue, page: 1 }));
  };

  const handlePageChange = (targetPage) => {
    if (targetPage >= 1 && targetPage <= pagination.totalPages) {
      setFilters((prev) => ({ ...prev, page: targetPage }));
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "succeeded":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <FiCheckCircle size={10} /> Paid
          </span>
        );
      case "pending":
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse">
            <FiClock size={10} /> Processing
          </span>
        );
      case "failed":
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <FiXCircle size={10} /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 text-slate-900 dark:text-slate-100 max-w-5xl mx-auto space-y-8 animate-scaleIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <FiCreditCard className="text-teal-500" size={22} /> My Payments
          </h1>
          <p className="text-xxs text-slate-400 dark:text-slate-500">
            Your consultation payment history and receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FiSliders className="text-slate-400 shrink-0" size={12} />
          <select
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-xs p-1.5 border rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer font-semibold"
          >
            <option value="">All Payments</option>
            <option value="succeeded">Paid</option>
            <option value="pending,processing">Processing</option>
            <option value="failed,cancelled">Failed</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="min-h-[40vh] flex items-center justify-center text-slate-400">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide animate-pulse">
            <FiLoader className="animate-spin text-teal-500" size={16} />
            Loading your payment history...
          </div>
        </div>
      ) : payments.length === 0 ? (
        <div className="border border-dashed rounded-2xl p-16 text-center border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 shadow-sm max-w-md mx-auto space-y-3">
          <FiDollarSign
            className="mx-auto text-slate-300 dark:text-slate-700"
            size={32}
          />
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              No payments yet
            </p>
            <p className="text-xxs text-slate-400 dark:text-slate-500 leading-relaxed">
              Payments for booked consultations will show up here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold bg-slate-50/50 dark:bg-slate-950/40">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Doctor</th>
                  <th className="p-4">Date paid</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-600 dark:text-slate-400">
                {payments.map((payment) => {
                  const doctorData =
                    typeof payment.doctorId === "object"
                      ? payment.doctorId
                      : null;

                  return (
                    <tr
                      key={payment._id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {payment.transactionId}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                            <FiActivity size={10} className="text-teal-500" />
                            {doctorData?.specialization || "Consultation"}
                          </span>
                          {doctorData?.hospital && (
                            <span className="text-[10px] text-slate-400 mt-0.5">
                              {doctorData.hospital}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <FiCalendar size={11} className="text-slate-400" />
                          {payment.paidAt
                            ? new Date(payment.paidAt).toLocaleDateString()
                            : "—"}
                        </span>
                      </td>

                      <td className="p-4 font-black text-slate-900 dark:text-white">
                        {payment.amount} {payment.currency?.toUpperCase()}
                      </td>

                      <td className="p-4">{getStatusBadge(payment.status)}</td>

                      <td className="p-4 text-right">
                        {payment.receiptUrl ? (
                          <a
                            href={payment.receiptUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-500 hover:underline"
                          >
                            View <FiExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-xxs text-slate-400 italic">
                            No receipt
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 text-xs">
              <span className="text-xxs text-slate-400 font-medium mr-2">
                Page {pagination.page} of {pagination.totalPages} (
                {pagination.total} total)
              </span>
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <FiChevronLeft size={14} />
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
