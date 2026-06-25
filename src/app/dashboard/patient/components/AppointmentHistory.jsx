import React from "react";
import {
  RxCalendar,
  RxVideo,
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxFileText,
  RxChevronRight,
} from "react-icons/rx";

export default function AppointmentHistory({
  appointmentsList,
  onCancelAppointment,
  onViewPrescription,
}) {
  const appointments = appointmentsList || [
    {
      id: "APT-9921",
      doctorName: "Dr. Sarah Mitchell",
      specialization: "Cardiology",
      date: "Jun 28, 2026",
      time: "10:30 AM",
      type: "Telemedicine",
      status: "Scheduled",
    },
    {
      id: "APT-9840",
      doctorName: "Dr. James Rahman",
      specialization: "Neurology",
      date: "Jun 15, 2026",
      time: "02:15 PM",
      type: "In-Person",
      status: "Completed",
      hasPrescription: true,
    },
    {
      id: "APT-9711",
      doctorName: "Dr. Alex Rivera",
      specialization: "Dermatology",
      date: "May 12, 2026",
      time: "11:00 AM",
      type: "In-Person",
      status: "Cancelled",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400";
      case "Completed":
        return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400";
      case "Cancelled":
        return "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400";
      default:
        return "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="space-y-0.5">
          <h3 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">
            Appointment Schedule & History
          </h3>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Review your upcoming bookings, visit formats, and access clinical
            documents.
          </p>
        </div>

        <button className="self-start sm:self-center flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest text-[#008080] dark:text-[#3cd1c2] hover:text-[#006666] dark:hover:text-[#2ab0a2] transition-colors group cursor-pointer">
          <span>Full Schedule</span>
          <RxChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Horizontal Scroller Shell - Clean Track Suppression */}
      <div className="overflow-x-auto -mx-6 px-6 pb-1">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="border-b border-[#E6F0FA] dark:border-slate-800/60">
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Appointment ID
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Medical Professional
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Date & Time
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Consultation Format
              </th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Status
              </th>
              <th className="pb-3 text-right text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6F0FA]/60 dark:divide-slate-800/40">
            {appointments.map((apt) => (
              <tr
                key={apt.id}
                className="group hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
              >
                <td className="py-4 font-mono text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  #{apt.id}
                </td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight">
                      {apt.doctorName}
                    </span>
                    <span className="text-[12px] text-slate-400 font-medium">
                      {apt.specialization}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">
                      {apt.date}
                    </span>
                    <span className="text-[12px] text-slate-400 font-medium">
                      {apt.time}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-[14px] font-medium text-slate-700 dark:text-slate-300">
                    {apt.type === "Telemedicine" ? (
                      <>
                        <RxVideo className="w-4 h-4 text-[#008080] dark:text-[#3cd1c2]" />
                        <span>Telemedicine Visit</span>
                      </>
                    ) : (
                      <>
                        <RxCalendar className="w-4 h-4 text-[#1E3A8A] dark:text-slate-400" />
                        <span>In-Person Visit</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full ${getStatusStyle(apt.status)}`}
                  >
                    {apt.status === "Scheduled" && (
                      <RxClock className="w-3.5 h-3.5" />
                    )}
                    {apt.status === "Completed" && (
                      <RxCheckCircled className="w-3.5 h-3.5" />
                    )}
                    {apt.status === "Cancelled" && (
                      <RxCrossCircled className="w-3.5 h-3.5" />
                    )}
                    <span>{apt.status}</span>
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {apt.status === "Scheduled" && (
                      <button
                        onClick={() =>
                          onCancelAppointment && onCancelAppointment(apt.id)
                        }
                        className="px-3 py-1.5 text-[12px] font-semibold tracking-tight text-rose-600 dark:text-rose-400 rounded-[12px] hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all active:scale-95"
                      >
                        Cancel Booking
                      </button>
                    )}
                    {apt.status === "Completed" && apt.hasPrescription && (
                      <button
                        onClick={() =>
                          onViewPrescription && onViewPrescription(apt.id)
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold tracking-tight text-[#1E3A8A] dark:text-white bg-[#E6F0FA] dark:bg-slate-800 rounded-[12px] transition-all active:scale-[0.98]"
                      >
                        <RxFileText className="w-3.5 h-3.5" />
                        <span>Prescription</span>
                      </button>
                    )}
                    {apt.status === "Cancelled" && (
                      <span className="text-[12px] text-slate-400 font-medium italic pr-2 select-none">
                        No Actions
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
