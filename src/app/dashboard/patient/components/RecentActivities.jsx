import React from "react";
import {
  RxCalendar,
  RxCheckCircled,
  RxChevronRight,
  RxClock,
  RxCrossCircled,
  RxFileText,
  RxStar,
} from "react-icons/rx";

export default function RecentActivities({ activitiesList }) {
  // Fallback default operational activity streams mapping history logs
  const activities = activitiesList || [
    {
      id: "act-1",
      type: "appointment_confirmed",
      title: "Appointment Confirmed",
      description:
        "Your booking with Dr. Sarah Mitchell has been approved for Oct 24.",
      timestamp: "10 mins ago",
      status: "success",
    },
    {
      id: "act-2",
      type: "payment_success",
      title: "Invoice Paid Successfully",
      description:
        "Payment of $150.00 for consultation invoice #MC-8492 was completed.",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      id: "act-3",
      type: "review_submitted",
      title: "Review Published",
      description:
        "You rated Dr. James Rahman 5 stars for his neurology check-up guidance.",
      timestamp: "Yesterday",
      status: "neutral",
    },
    {
      id: "act-4",
      type: "appointment_cancelled",
      title: "Session Cancelled by System",
      description:
        "Consultation request with Dr. Alex Rivera was dropped due to scheduling mismatch.",
      timestamp: "3 days ago",
      status: "error",
    },
  ];

  // Helper function to map contextual logs cleanly to design system icons
  const getActivityStyles = (type, status) => {
    switch (type) {
      case "appointment_confirmed":
        return {
          icon: RxCheckCircled,
          bg: "bg-emerald-50 dark:bg-emerald-950/20",
          text: "text-emerald-600 dark:text-emerald-400",
        };
      case "payment_success":
        return {
          icon: RxFileText,
          bg: "bg-blue-50 dark:bg-blue-950/20",
          text: "text-blue-600 dark:text-blue-400",
        };
      case "review_submitted":
        return {
          icon: RxStar,
          bg: "bg-amber-50 dark:bg-amber-950/20",
          text: "text-amber-600 dark:text-amber-400",
        };
      case "appointment_cancelled":
        return {
          icon: RxCrossCircled,
          bg: "bg-rose-50 dark:bg-rose-950/20",
          text: "text-rose-600 dark:text-rose-400",
        };
      default:
        return {
          icon: RxClock,
          bg: "bg-slate-50 dark:bg-slate-800",
          text: "text-slate-600 dark:text-slate-400",
        };
    }
  };

  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[20px] border border-[#E6F0FA] dark:border-slate-900 shadow-sm">
      {/* Structural Header Wrapper */}
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-0.5">
          <h3 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">
            Recent Activities
          </h3>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            Real-time tracking feed of your recent health workspace
            interactions.
          </p>
        </div>

        <button className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest text-[#008080] dark:text-[#3cd1c2] hover:text-[#006666] dark:hover:text-[#2ab0a2] transition-colors group cursor-pointer">
          <span>View All</span>
          <RxChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Activity Timeline List */}
      <div className="relative pl-4 space-y-6 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E6F0FA] dark:before:bg-slate-800">
        {activities.map((item) => {
          const styles = getActivityStyles(item.type, item.status);
          const IconComponent = styles.icon;

          return (
            <div key={item.id} className="relative flex gap-4 group">
              {/* Timeline Bullet Anchor Point */}
              <div
                className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-[#0F172A] mt-1`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 ${
                    item.status === "success"
                      ? "bg-emerald-500"
                      : item.status === "error"
                        ? "bg-rose-500"
                        : "bg-slate-400"
                  }`}
                />
              </div>

              {/* Activity Details Block */}
              <div className="flex-1 flex items-start gap-3 p-3.5 rounded-[12px] bg-slate-50/50 dark:bg-slate-900/30 border border-[#E6F0FA]/40 dark:border-slate-800/60 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/60">
                {/* Contextual Accent Icon Wrapper */}
                <div
                  className={`p-2.5 rounded-[12px] shrink-0 ${styles.bg} ${styles.text}`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Text Data Segments */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
