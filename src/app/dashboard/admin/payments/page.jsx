"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  FiShield,
  FiSliders,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
  FiDollarSign,
  FiUser,
  FiActivity,
} from "react-icons/fi";

import { getPayments } from "@/services/payments/payment.service";
import { getUserById } from "@/services/users/user.service";
import { getDoctorById } from "@/services/doctors/doctor.service";

export default function AdminPaymentsDashboard() {
  // Collection Matrix State
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback map caches to handle unpopulated backend references efficiently
  const [resolvedPatients, setResolvedPatients] = useState({});
  const [resolvedDoctors, setResolvedDoctors] = useState({});

  // Filtering & Pagination Parameters
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
    async function fetchSystemPayments() {
      try {
        setIsLoading(true);
        const response = await getPayments(filters);

        if (response?.success) {
          const paymentData = response.data || [];
          setPayments(paymentData);

          if (response.meta) {
            setPagination({
              page: response.meta.page || 1,
              totalPages: response.meta.totalPages || 1,
              total: response.meta.total || 0,
            });
          }

          // Optimization pipeline: If backend returns unpopulated IDs, fetch them in parallel
          fetchMissingRelations(paymentData);
        }
      } catch (error) {
        console.error("Failed pulling administrative transaction logs:", error);
        toast.error("Could not load system-wide payment records.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSystemPayments();
  }, [filters]);

  // Lazy-load details asynchronously if the backend returns string IDs instead of fully populated objects
  const fetchMissingRelations = async (paymentList) => {
    const uniquePatientIds = [
      ...new Set(
        paymentList
          .map((p) =>
            typeof p.patientId === "string" ? p.patientId : p.patientId?._id,
          )
          .filter((id) => id && !resolvedPatients[id]),
      ),
    ];

    const uniqueDoctorIds = [
      ...new Set(
        paymentList
          .map((p) =>
            typeof p.doctorId === "string" ? p.doctorId : p.doctorId?._id,
          )
          .filter((id) => id && !resolvedDoctors[id]),
      ),
    ];

    // Hydrate Patients map state
    uniquePatientIds.forEach(async (id) => {
      try {
        const userRes = await getUserById(id);
        if (userRes?.success || userRes) {
          // Fallback support if data arrives flat or wrapped inside a response object
          const userData = userRes.data || userRes;
          setResolvedPatients((prev) => ({ ...prev, [id]: userData }));
        }
      } catch (err) {
        console.error(`Error resolving user reference data for ID: ${id}`, err);
      }
    });

    // Hydrate Doctors map state
    uniqueDoctorIds.forEach(async (id) => {
      try {
        const docRes = await getDoctorById(id);
        if (docRes?.success || docRes) {
          const docData = docRes.data || docRes;
          setResolvedDoctors((prev) => ({ ...prev, [id]: docData }));
        }
      } catch (err) {
        console.error(
          `Error resolving doctor reference data for ID: ${id}`,
          err,
        );
      }
    });
  };

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
            <FiCheckCircle size={10} /> Succeeded
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
    <div className="p-6 md:p-10 text-slate-900 dark:text-slate-100 max-w-7xl mx-auto space-y-8 animate-scaleIn">
      {/* Admin Header Segment */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <FiShield className="text-indigo-500" size={24} /> Financial Audit
            Console
          </h1>
          <p className="text-xxs text-slate-400 dark:text-slate-500">
            Global ledger overview. Monitor clearing pipeline attributes, check
            matching references, and track billing states.
          </p>
        </div>

        {/* Global Filter Selector */}
        <div className="flex items-center gap-2">
          <FiSliders className="text-slate-400 shrink-0" size={12} />
          <select
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-xs p-1.5 border rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer font-semibold"
          >
            <option value="">All Clearing Pools</option>
            <option value="succeeded">Succeeded</option>
            <option value="pending,processing">Pending / Processing</option>
            <option value="failed,cancelled">Failed / Cancelled</option>
          </select>
        </div>
      </div>

      {/* Main Content Rendering Core */}
      {isLoading ? (
        <div className="min-h-[40vh] flex items-center justify-center text-slate-400">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide animate-pulse">
            <FiLoader className="animate-spin text-indigo-500" size={16} />
            Parsing systemic transaction metadata accounts...
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
              No transactions recorded
            </p>
            <p className="text-xxs text-slate-400 dark:text-slate-500 leading-relaxed">
              No clearance references matched your selection scope inside the
              MongoDB collection framework index.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold bg-slate-50/50 dark:bg-slate-950/40">
                  <th className="p-4">Transaction Reference</th>
                  <th className="p-4">Patient Client</th>
                  <th className="p-4">Assigned Specialist</th>
                  <th className="p-4">Settled Gross</th>
                  <th className="p-4">Pipeline Status</th>
                  <th className="p-4 text-right">Stripe Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-600 dark:text-slate-400">
                {payments.map((payment) => {
                  // Fallback evaluation strategies (handles both MongoDB populates and API maps)
                  const patientIdStr =
                    typeof payment.patientId === "string"
                      ? payment.patientId
                      : payment.patientId?._id;
                  const patientData =
                    typeof payment.patientId === "object"
                      ? payment.patientId
                      : resolvedPatients[patientIdStr];

                  const doctorIdStr =
                    typeof payment.doctorId === "string"
                      ? payment.doctorId
                      : payment.doctorId?._id;
                  const doctorData =
                    typeof payment.doctorId === "object"
                      ? payment.doctorId
                      : resolvedDoctors[doctorIdStr];

                  return (
                    <tr
                      key={payment._id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      {/* Transaction Reference ID */}
                      <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {payment.transactionId}
                      </td>

                      {/* Patient Context Mapping */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                            <FiUser size={10} className="text-slate-400" />
                            {patientData?.name || "Loading Name..."}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {patientData?.email || "Resolving details..."}
                          </span>
                        </div>
                      </td>

                      {/* Assigned Medical Specialist */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                            <FiActivity size={10} className="text-indigo-400" />
                            {doctorData?.specialization ||
                              "Clinical Consultation"}
                          </span>
                          {doctorData?.userId?.name && (
                            <span className="text-[10px] text-slate-400 mt-0.5">
                              Dr. {doctorData.userId.name}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Settled Gross Balance Amount */}
                      <td className="p-4 font-black text-slate-900 dark:text-white">
                        {payment.amount} {payment.currency?.toUpperCase()}
                      </td>

                      {/* Pipeline Status Clearance Flag */}
                      <td className="p-4">{getStatusBadge(payment.status)}</td>

                      {/* External Stripe Dashboard Audit Link */}
                      <td className="p-4 text-right">
                        {payment.receiptUrl ? (
                          <a
                            href={payment.receiptUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-500 hover:underline"
                          >
                            Invoice <FiExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-xxs text-slate-400 italic">
                            No Link
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Simple Administrative Pagination Panel */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 text-xs">
              <span className="text-xxs text-slate-400 font-medium mr-2">
                Showing page {pagination.page} of {pagination.totalPages} (
                {pagination.total} global records)
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
