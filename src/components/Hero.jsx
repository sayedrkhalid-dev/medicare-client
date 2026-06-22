import React from "react";
import { FiSearch, FiChevronRight, FiStar } from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";

export default function Hero() {
  return (
    /* 60% Dominant Color Rule: 
       Light Mode -> Pure Crisp White (#FFFFFF)
       Dark Mode  -> Deep Night Slate (#020617)
    */
    <section className="relative w-full overflow-hidden bg-[#FFFFFF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Calm ambient design system glows */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 rounded-full bg-[#E6F0FA]/40 dark:bg-slate-900/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-96 w-96 rounded-full bg-[#008080]/5 dark:bg-[#008080]/3 blur-3xl" />

      {/* Main Container Wrapper */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-32 sm:px-8 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Typography Content & Call-to-Actions */}
          <div className="flex flex-col space-y-6 md:space-y-8 lg:col-span-6">
            {/* Header Text Copy */}
            <div className="space-y-4">
              {/* 30% Secondary Color Alignment: Premium High-Trust Navy */}
              <h1 className="text-[36px] font-bold leading-[1.15] tracking-tight text-[#1E3A8A] dark:text-white sm:text-[52px]">
                Healthcare Made
                <span className="block text-[#008080] dark:text-[#3cd1c2] mt-1">
                  Simple, Fast & Connected
                </span>
              </h1>
              <p className="max-w-xl text-[16px] md:text-[18px] font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                Experience the future of medical care. Consult with top-rated
                professionals from the comfort of your home with our secure,
                integrated platform.
              </p>
            </div>

            {/* Action Interaction Controls */}
            <div className="flex w-full gap-4 pt-2">
              {/* 10% Highlight Accent Rule: High-Conversion Deep Teal */}
              <button className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#008080] px-6 py-3.5 text-[15px] font-semibold text-[#FFFFFF] shadow-md transition-all duration-200 hover:bg-[#006666] dark:hover:bg-[#2ab0a2] active:scale-[0.98] w-full sm:w-auto cursor-pointer">
                <FiSearch className="h-4 w-4 stroke-[2.5]" />
                Find Doctors
              </button>

              {/* Secondary Border Button */}
              <button className="inline-flex items-center justify-center gap-2 rounded-[12px] border-2 border-[#1E3A8A] dark:border-slate-800 bg-transparent px-6 py-3.5 text-[15px] font-semibold text-[#1E3A8A] dark:text-slate-300 transition-all duration-200 hover:bg-[#E6F0FA] dark:hover:bg-slate-900 active:scale-[0.98] w-full sm:w-auto cursor-pointer">
                Get Started
                <FiChevronRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Calibrated Platform Statistics Framework
                Adjusted into a clean 4-column display to integrate Review states flawlessly.
                Spans full width natively on mobile viewports while image context remains hidden.
            */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-8 border-t border-[#E6F0FA] dark:border-slate-900 w-full lg:max-w-2xl">
              <div className="space-y-0.5">
                <p className="text-[18px] sm:text-[20px] md:text-[26px] font-bold tracking-tight text-[#1E3A8A] dark:text-slate-200">
                  500+
                </p>
                <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Doctors
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[18px] sm:text-[20px] md:text-[26px] font-bold tracking-tight text-[#1E3A8A] dark:text-slate-200">
                  10k+
                </p>
                <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Patients
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[18px] sm:text-[20px] md:text-[26px] font-bold tracking-tight text-[#1E3A8A] dark:text-slate-200">
                  50k+
                </p>
                <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Bookings
                </p>
              </div>
              {/* Newly added design system matching review statistics tracking */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-0.5 text-[#1E3A8A] dark:text-slate-200">
                  <p className="text-[18px] sm:text-[20px] md:text-[26px] font-bold tracking-tight">
                    4.9
                  </p>
                  <FiStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 shrink-0 mb-1" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration Frame Wrapper (Hidden on small viewports) */}
          <div className="relative hidden lg:flex justify-center lg:col-span-6 lg:justify-end w-full">
            {/* Glassmorphic Image Container Card (Height reduced dynamically via aspect-4/3) */}
            <div className="relative w-full overflow-hidden rounded-[20px] bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md p-4 flex items-center justify-center border border-white/20 dark:border-white/10 shadow-lg transition-colors duration-300">
              <img
                src="/consultation-2.png"
                alt="Illustration of a doctor and patient talking over video call"
                className="w-full h-auto max-h-full object-contain rounded-[20px] scale-105 transform hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-screen dark:brightness-95 dark:contrast-115 dark:opacity-90"
              />
            </div>

            {/* Floating Glassmorphic Trust Verification Card 
      Positioned precisely on the bottom left corner region of the computer monitor
  */}
            <div className="absolute bottom-[12%] left-[8%] flex items-center gap-2 p-2 bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-[10px] shadow-xl transition-colors duration-300 z-10">
              {/* Inline SVG High-Trust Verification Shield Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#008080]/10 text-[#008080] dark:text-[#3cd1c2] dark:bg-[#3cd1c2]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <p className="text-[15px] text-[#1E3A8A] dark:text-white font-bold leading-tight">
                  Certified Platform
                </p>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  HIPAA Compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
