"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  getMySchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "@/services/doctor-schedules/doctorSchedule.service";
import { toast } from "react-hot-toast";
import {
  FiPlus,
  FiTrash2,
  FiClock,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function DoctorSchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    dayOfWeek: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    slotDuration: 30,
  });

  const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const SLOT_DURATIONS = [15, 30, 45, 60];

  // Fetch schedules
  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      const res = await getMySchedules();
      if (res?.success) {
        setSchedules(res.data || []);
      } else {
        setSchedules([]);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load your schedules");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "slotDuration" ? Number(value) : value,
    }));
  };

  // Submit New Schedule
  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await createSchedule(formData);
        if (res?.success) {
          toast.success(res?.message || "Schedule created successfully!");
          setIsModalOpen(false);
          fetchSchedules();
        } else {
          toast.error(res?.message || "Failed to create schedule");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    });
  };

  // Toggle Schedule Active Status
  const handleToggleActive = async (id, currentStatus) => {
    try {
      const res = await updateSchedule(id, { isActive: !currentStatus });
      if (res?.success) {
        toast.success(
          `Schedule ${!currentStatus ? "activated" : "deactivated"}`,
        );
        setSchedules((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isActive: !currentStatus } : item,
          ),
        );
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  // Delete Schedule
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this schedule template?"))
      return;

    try {
      const res = await deleteSchedule(id);
      if (res?.success) {
        toast.success(res?.message || "Schedule deleted successfully");
        setSchedules((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete schedule");
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 p-6 md:p-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-500 to-cyan-500 md:from-teal-400 md:to-cyan-400 bg-clip-text text-transparent">
            Schedule Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Set up your weekly availability windows and session constraints.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-teal-500/10 transition-all active:scale-98 cursor-pointer"
        >
          <FiPlus className="text-lg" />
          Add Time Window
        </button>
      </div>

      {/* Main Content Layout */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-teal-500"></div>
        </div>
      ) : schedules.length === 0 ? (
        <div className="border rounded-2xl p-12 text-center max-w-xl mx-auto mt-12 backdrop-blur-md border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 shadow-sm">
          <FiClock className="mx-auto text-4xl mb-4 text-slate-400 dark:text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            No time windows configured
          </h3>
          <p className="text-sm mt-1 mb-6 text-slate-500 dark:text-slate-400">
            You haven't set your weekly recurring availability yet. Patients
            won't be able to book appointments until you add one.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-medium inline-flex items-center gap-1 text-sm underline underline-offset-4 cursor-pointer"
          >
            Create your first schedule window
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schedules.map((schedule) => (
            <div
              key={schedule._id}
              className={`border backdrop-blur-md p-5 rounded-2xl relative group transition-all duration-300 ${
                schedule.isActive
                  ? "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-teal-500/50 dark:hover:border-teal-500/40 shadow-sm"
                  : "border-slate-100 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950 opacity-60"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800/80 text-teal-600 dark:text-teal-400">
                    <FiCalendar />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                    {schedule.dayOfWeek}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      handleToggleActive(schedule._id, schedule.isActive)
                    }
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      schedule.isActive
                        ? "text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500/10"
                        : "text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                    title={
                      schedule.isActive
                        ? "Deactivate schedule"
                        : "Activate schedule"
                    }
                  >
                    {schedule.isActive ? (
                      <FiCheckCircle size={18} />
                    ) : (
                      <FiXCircle size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(schedule._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete window"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <FiClock className="text-slate-400 dark:text-slate-500" />
                  <span>
                    {schedule.startTime} – {schedule.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400">
                    {schedule.slotDuration} Min Slots
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creation Slide-over/Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in bg-slate-900/40 dark:bg-slate-950/80">
          <div className="border w-full max-w-md rounded-2xl p-6 relative shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">
              Add Availability Window
            </h2>
            <p className="text-xs mb-6 text-slate-500 dark:text-slate-400">
              Define a recurring day and time block for appointments.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-500 dark:text-slate-400">
                  Day of the Week
                </label>
                <select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleInputChange}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {DAYS_OF_WEEK.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-500 dark:text-slate-400">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-500 dark:text-slate-400">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-500 dark:text-slate-400">
                  Slot Duration per Patient
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {SLOT_DURATIONS.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, slotDuration: duration }))
                      }
                      className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                        formData.slotDuration === duration
                          ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/50"
                          : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      {duration}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6 border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save Window"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
