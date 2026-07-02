"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RxPerson,
  RxReader,
  RxEnvelopeOpen,
  RxCalendar,
  RxCardStack,
  RxArrowTopRight,
  RxCheck,
  RxCross2,
  RxEyeOpen,
} from "react-icons/rx";

import { getAllUsers } from "@/services/users/user.service";
import { getAllDoctors } from "@/services/doctors/doctor.service";
import {
  getAllApplications,
  approveApplication,
  rejectApplication,
} from "@/services/doctor-applications/doctorApplication.service";
import { getAllAppointments } from "@/services/appointments/appointment.service";
import { getPayments } from "@/services/payments/payment.service";

// Normalizes list responses whether the API returns a raw array
// or an object like { data, total }.
const toList = (res) => (Array.isArray(res) ? res : (res?.data ?? []));
const toTotal = (res, list) =>
  Array.isArray(res) ? res.length : (res?.total ?? res?.count ?? list.length);

export default function AdminDashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userCount, setUserCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [pendingApplications, setPendingApplications] = useState([]);

  const [actionId, setActionId] = useState(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        usersRes,
        doctorsRes,
        applicationsRes,
        appointmentsRes,
        paymentsRes,
      ] = await Promise.all([
        getAllUsers(),
        getAllDoctors(),
        getAllApplications(),
        getAllAppointments(),
        getPayments(),
      ]);

      const applicationsList = toList(applicationsRes);
      const paymentsList = toList(paymentsRes);

      setUserCount(toTotal(usersRes, toList(usersRes)));
      setDoctorCount(toTotal(doctorsRes, toList(doctorsRes)));
      setAppointmentCount(toTotal(appointmentsRes, toList(appointmentsRes)));
      setPendingApplications(applicationsList);
    } catch (err) {
      console.error("Failed to load admin dashboard:", err);
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleApprove = async (applicationId) => {
    try {
      await approveApplication(applicationId);
      setPendingApplications((prev) =>
        prev.filter((app) => (app._id || app.id) !== applicationId),
      );
    } catch (err) {
      console.error("Failed to approve application:", err);
    }
  };

  const handleReject = async (applicationId) => {
    const reason = window.prompt("Reason for rejection:");
    if (!reason) return;
    try {
      await rejectApplication(applicationId, reason);
      setPendingApplications((prev) =>
        prev.filter((app) => (app._id || app.id) !== applicationId),
      );
    } catch (err) {
      console.error("Failed to reject application:", err);
    }
  };

  const widgets = [
    {
      title: "Total Users",
      value: userCount,
      href: "/dashboard/admin/users",
      icon: RxPerson,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Doctors",
      value: doctorCount,
      href: "/dashboard/admin/doctors",
      icon: RxReader,
      iconColor: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
    },
    {
      title: "Doctor Applications",
      value: pendingApplications.length,
      href: "/dashboard/admin/doctor-applications",
      icon: RxEnvelopeOpen,
      iconColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Total Appointments",
      value: appointmentCount,
      href: "/dashboard/admin/appointments",
      icon: RxCalendar,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    },
  ];

  if (loading) {
    return <p className="text-sm text-slate-400">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-[22px] font-bold tracking-tight text-slate-900 dark:text-white">
          System Overview
        </h2>
        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
          Live platform summary and pending verification queue.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {widgets.map((widget) => {
          const Icon = widget.icon;
          return (
            <Link
              key={widget.title}
              href={widget.href}
              className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {widget.title}
                </span>
                <div
                  className={`p-2.5 rounded-[12px] ${widget.bgColor} ${widget.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-[26px] font-extrabold text-slate-900 dark:text-white mt-4">
                {widget.value}
              </h3>
              <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-900/60 flex items-center gap-1.5 text-[12px] font-bold text-[#1E3A8A] dark:text-[#3cd1c2]">
                <span>Manage Module</span>
                <RxArrowTopRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6">
        <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">
          Doctor Applications
        </h3>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Specification</th>
                <th className="py-4 px-6">Medical License</th>
                <th className="py-4 px-6">Submission Date</th>
                <th className="py-4 px-6">Experience Base</th>
                <th className="py-4 px-6 text-right">Verification Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60 text-sm text-slate-600 dark:text-slate-300">
              {pendingApplications.length > 0 ? (
                pendingApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      {/* Avatar + name + gender, matching UserManagementPage's
                          image/fallback-initial pattern */}
                      <div className="flex items-center gap-3">
                        {app.user?.image ? (
                          <img
                            src={app.user.image}
                            alt={app.user?.name || "Doctor"}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#CAF0F8]/40 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-[#03045E] dark:text-slate-400 flex items-center justify-center font-bold capitalize text-[13px] shrink-0">
                            {(app.user?.name || "U").charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {app.user?.name || "Unknown Doctor"}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 capitalize mt-0.5">
                            {app.user?.gender || "—"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-tight bg-[#CAF0F8]/40 dark:bg-[#0077B6]/10 text-[#03045E] dark:text-[#CAF0F8] border border-[#90E0EF]/20">
                        {app.specialization || "General"}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-500 dark:text-slate-400 text-xs">
                      {app.bmdcNumber}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-400 dark:text-slate-500 font-mono text-xs">
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                      {app.experienceYears
                        ? `${app.experienceYears} Years`
                        : "—"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Clean Inspect Document Button */}
                        <Link
                          href={`/dashboard/admin/doctor-applications/${app._id}`}
                        >
                          <button
                            className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-[#00B4D8] dark:hover:text-[#CAF0F8] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            title="Inspect Documents"
                            disabled={actionId !== null}
                          >
                            <RxEyeOpen className="w-4 h-4" />
                          </button>
                        </Link>

                        {(() => {
                          const status = (
                            app.status || "Pending"
                          ).toLowerCase();
                          const isApproved = status === "approved";
                          const isRejected = status === "rejected";

                          return (
                            <>
                              {/* Show Approve unless already approved —
                                  covers Pending -> Approved and Rejected -> Approved */}
                              {!isApproved && (
                                <button
                                  onClick={() => handleApprove(app._id)}
                                  disabled={actionId !== null}
                                  className="p-2 border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-950/40 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl transition-colors"
                                  title={
                                    isRejected
                                      ? "Approve Application"
                                      : "Approve Credentials"
                                  }
                                >
                                  {actionId === app._id ? (
                                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                                  ) : (
                                    <RxCheck className="w-4 h-4" />
                                  )}
                                </button>
                              )}

                              {/* Show Reject unless already rejected —
                                  covers Pending -> Rejected and Approved -> Rejected.
                                  Both paths go through the same reason modal, since
                                  reversing an approval still deserves an explanation. */}
                              {!isRejected && (
                                <button
                                  onClick={() => openRejectModal(app)}
                                  disabled={actionId !== null}
                                  className="p-2 border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 disabled:opacity-50 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl transition-colors"
                                  title={
                                    isApproved
                                      ? "Revoke Approval"
                                      : "Reject Application"
                                  }
                                >
                                  {actionId === app._id ? (
                                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                                  ) : (
                                    <RxCross2 className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 select-none"
                  >
                    No configurations matching the criteria were found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
