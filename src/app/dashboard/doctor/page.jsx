"use client";

import { useEffect, useState } from "react";
import { RxCalendar, RxClock, RxFileText, RxPerson } from "react-icons/rx";

import { getMyDoctorProfile } from "@/services/doctors/doctor.service";
import { getDoctorAppointments } from "@/services/appointments/appointment.service";
import {
  getMySchedules,
  deleteSchedule,
} from "@/services/doctor-schedules/doctorSchedule.service";
import { getMyPrescriptions } from "@/services/prescriptions/prescription.service";

const toList = (res) => (Array.isArray(res) ? res : (res?.data ?? []));

export default function DoctorDashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [profileRes, appointmentsRes, schedulesRes, prescriptionsRes] =
        await Promise.all([
          getMyDoctorProfile(),
          getDoctorAppointments(),
          getMySchedules(),
          // getMyPrescriptions({ limit: 5 }),
        ]);

      setProfile(profileRes?.data ?? profileRes);
      setAppointments(toList(appointmentsRes));
      setSchedules(toList(schedulesRes));
      // setPrescriptions(toList(prescriptionsRes));
    } catch (err) {
      console.error("Failed to load doctor dashboard:", err);
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleDeleteSchedule = async (scheduleId) => {
    if (!window.confirm("Delete this schedule slot?")) return;
    try {
      await deleteSchedule(scheduleId);
      setSchedules((prev) =>
        prev.filter((s) => (s._id || s.id) !== scheduleId),
      );
    } catch (err) {
      console.error("Failed to delete schedule:", err);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-400">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
          <RxPerson className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-slate-900 dark:text-white">
            {profile?.name || profile?.user?.name || "Welcome back, Doctor"}
          </h2>
          <p className="text-[13px] text-slate-400">
            {profile?.specialization || "Manage your appointments and schedule"}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Appointments
          </span>
          <h3 className="text-[26px] font-extrabold text-slate-900 dark:text-white mt-2">
            {appointments.length}
          </h3>
        </div>
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Schedule Slots
          </span>
          <h3 className="text-[26px] font-extrabold text-slate-900 dark:text-white mt-2">
            {schedules.length}
          </h3>
        </div>
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Recent Prescriptions
          </span>
          <h3 className="text-[26px] font-extrabold text-slate-900 dark:text-white mt-2">
            {prescriptions.length}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6">
          <div className="flex items-center gap-2 mb-4">
            <RxCalendar className="w-4 h-4 text-slate-400" />
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Upcoming Appointments
            </h3>
          </div>
          {appointments.length === 0 ? (
            <p className="text-[13px] text-slate-400">No appointments yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-900">
              {appointments.map((apt) => (
                <div key={apt._id || apt.id} className="py-3">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {apt.patientName || apt.patient?.name || "Patient"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {apt.date || apt.appointmentDate} ·{" "}
                    {apt.time || apt.appointmentTime} · {apt.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6">
          <div className="flex items-center gap-2 mb-4">
            <RxClock className="w-4 h-4 text-slate-400" />
            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              My Schedule
            </h3>
          </div>
          {schedules.length === 0 ? (
            <p className="text-[13px] text-slate-400">No schedule slots set.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-900">
              {schedules.map((slot) => {
                const id = slot._id || slot.id;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {slot.day || slot.dayOfWeek}
                      </p>
                      <p className="text-xs text-slate-400">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSchedule(id)}
                      className="text-xs font-semibold text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#020617] border border-[#E6F0FA] dark:border-slate-900 rounded-[16px] p-6">
        <div className="flex items-center gap-2 mb-4">
          <RxFileText className="w-4 h-4 text-slate-400" />
          <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Recent Prescriptions
          </h3>
        </div>
        {prescriptions.length === 0 ? (
          <p className="text-[13px] text-slate-400">
            No prescriptions issued yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-900">
            {prescriptions.map((rx) => (
              <div key={rx._id || rx.id} className="py-3">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {rx.patientName || rx.patient?.name || "Patient"}
                </p>
                <p className="text-xs text-slate-400">
                  {rx.diagnosis || rx.notes || "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
