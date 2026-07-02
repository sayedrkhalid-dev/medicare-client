import React from "react";
import { FiHeart, FiStar, FiUser, FiActivity } from "react-icons/fi";

const stories = [
  {
    id: 1,
    name: "Sarah M.",
    age: 42,
    treatment: "Chronic Back Pain Management",
    quote:
      "After two years of constant discomfort, the personalized physical therapy and medical plan here gave me my life back. I ran my first 5K last weekend!",
    metric: "100% Pain-Free",
    doctor: "Dr. Aris Thorne, Neurology",
    imgUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 2,
    name: "Rahman K.",
    age: 58,
    treatment: "Cardiac Rehabilitation & Recovery",
    quote:
      "The telehealth monitoring system kept me feeling completely safe during post-surgery recovery at home. The coordination across the care team was flawless.",
    metric: "4 Months Post-Op Recovery",
    doctor: "Dr. Sarah Lin, Cardiology",
    imgUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 3,
    name: "Elena R.",
    age: 29,
    treatment: "Endocrinology & Thyroid Care",
    quote:
      "Finding the right specialists who actually listen changed everything. They caught an imbalance others missed, and my energy levels have soared.",
    metric: "Energy Levels Restored",
    doctor: "Dr. Marcus Vance, Endocrinology",
    imgUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

export default function PatientSuccessStories() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-16 px-6 md:px-12 lg:px-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border border-teal-200/40 dark:border-teal-800/40 text-xs font-semibold tracking-wider uppercase">
            <FiHeart size={12} className="animate-pulse" /> Real Results
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Stories of Hope & Recovery
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Nothing tells our story better than the patients who have trusted us
            with their health journeys. Discover how tailored clinical pathways
            change lives.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group hover:-translate-y-1 duration-300"
            >
              <div className="space-y-5">
                {/* Five-Star Rating & Highlight Metric Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill="currentColor" size={14} />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                    {story.metric}
                  </span>
                </div>

                {/* Patient Review Paragraph */}
                <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  "{story.quote}"
                </p>
              </div>

              {/* Patient Profile Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-3.5">
                <img
                  src={story.imgUrl}
                  alt={story.name}
                  className="w-11 h-11 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 border border-slate-200 dark:border-slate-700"
                />
                <div className="text-left space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {story.name}{" "}
                    <span className="text-slate-400 text-xs font-normal">
                      Age {story.age}
                    </span>
                  </h4>
                  <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold tracking-wide uppercase flex items-center gap-1">
                    <FiActivity size={10} /> {story.treatment}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Under care of {story.doctor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Impact Micro-stats bar */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
          <div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              15k+
            </p>
            <p className="text-xxs text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Patients Managed
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-teal-500">
              98.4%
            </p>
            <p className="text-xxs text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Satisfaction Rating
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              45+
            </p>
            <p className="text-xxs text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Clinical Specialists
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              12 min
            </p>
            <p className="text-xxs text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Avg Response Time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
