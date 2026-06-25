import React from "react";
import { RxCalendar, RxStar, RxChevronRight, RxHeart } from "react-icons/rx";

export default function FavoriteDoctors({ doctorsList, onBookAppointment }) {
  // Fallback mock dataset adhering to project functional search/sort filters
  const favoriteDoctors = doctorsList || [
    {
      id: "doc-1",
      name: "Dr. Sarah Mitchell",
      specialization: "Cardiology",
      experience: "12 years",
      rating: 4.9,
      reviewCount: 142,
      fee: 150,
      availability: "Available Today",
      avatarUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: "doc-2",
      name: "Dr. James Rahman",
      specialization: "Neurology",
      experience: "9 years",
      rating: 4.8,
      reviewCount: 98,
      fee: 180,
      availability: "Next: Tomorrow",
      avatarUrl:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm">
      {/* Header Matrix Control */}
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-0.5">
          <h3 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">
            Favorite Specialists
          </h3>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Quick-access management for your preferred medical team.
          </p>
        </div>

        <button className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest text-[#008080] dark:text-[#3cd1c2] hover:text-[#006666] dark:hover:text-[#2ab0a2] transition-colors group cursor-pointer">
          <span>View All</span>
          <RxChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Grid Container Split */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {favoriteDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[12px] bg-slate-50/60 dark:bg-slate-900/40 border border-[#E6F0FA]/60 dark:border-slate-800/80 gap-4 transition-all hover:border-[#E6F0FA] dark:hover:border-slate-700"
          >
            {/* Identity Core Column */}
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <img
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {doctor.name}
                </h4>
                <p className="text-[13px] font-medium text-[#008080] dark:text-[#3cd1c2]">
                  {doctor.specialization} •{" "}
                  <span className="text-slate-400 font-normal">
                    {doctor.experience}
                  </span>
                </p>

                {/* Rating Frame */}
                <div className="flex items-center gap-1 pt-0.5">
                  <RxStar className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300">
                    {doctor.rating}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({doctor.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Utility Allocation Action Blocks */}
            <div className="flex sm:flex-col justify-between items-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6F0FA] dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
                  Consultation Fee
                </span>
                <span className="text-[16px] font-bold text-slate-900 dark:text-white">
                  ${doctor.fee}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Remove Favorite Toggle Trigger */}
                <button className="p-2.5 rounded-[12px] border border-[#E6F0FA] dark:border-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 bg-white dark:bg-slate-900 transition-all active:scale-95">
                  <RxHeart className="w-4 h-4 fill-current" />
                </button>

                {/* Instant Appointment Router Booking Hook */}
                <button
                  onClick={() =>
                    onBookAppointment && onBookAppointment(doctor.id)
                  }
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-medium tracking-tight rounded-[12px] bg-[#1E3A8A] dark:bg-slate-800 text-white hover:bg-[#152960] dark:hover:bg-slate-700 shadow-sm transition-all active:scale-[0.98] whitespace-nowrap"
                >
                  <RxCalendar className="w-4 h-4" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
