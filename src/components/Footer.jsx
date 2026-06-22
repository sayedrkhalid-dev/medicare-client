import React from "react";
import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiTwitter,
  FiLinkedin,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaClinicMedical } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    /* 60% Dominant Layout Color Rule:
       Light Mode -> Ultra-soft Tonal Slate-Blue background from footer.PNG (#F1F5F9/bg-slate-100)
       Dark Mode  -> Deep Rich Night Slate (#090d16)
    */
    <footer className="w-full bg-slate-100 dark:bg-[#090d16] border-t border-slate-200 dark:border-slate-900 text-slate-800 dark:text-slate-300 transition-colors duration-300">
      {/* Main Structural Wrapper - Max width 1280px keeping grid components strictly aligned */}
      <div className="mx-auto max-w-[1280px] px-6 py-12 sm:px-8 lg:py-16">
        {/* Top Segment: Primary Link Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-12">
          {/* Column 1: Brand Info & Social Matrix (lg:span-4) */}
          <div className="flex flex-col space-y-5 lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#1E3A8A] dark:text-white transition-transform active:scale-[0.98] w-fit"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#008080] text-white">
                <FaClinicMedical className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                MediCare Connect
              </span>
            </Link>

            <p className="max-w-sm text-[14px] leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
              Providing high-quality medical services and connecting you with
              the best healthcare professionals worldwide.
            </p>

            {/* Social Anchor Buttons using the exact soft circular layer styling from footer.PNG */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Website"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1E3A8A] dark:text-slate-400 hover:bg-[#008080] hover:text-white dark:hover:bg-[#008080] dark:hover:text-white transition-all duration-200 shadow-sm hover:-translate-y-0.5"
              >
                <FiGlobe className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1E3A8A] dark:text-slate-400 hover:bg-[#008080] hover:text-white dark:hover:bg-[#008080] dark:hover:text-white transition-all duration-200 shadow-sm hover:-translate-y-0.5"
              >
                <FiTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1E3A8A] dark:text-slate-400 hover:bg-[#008080] hover:text-white dark:hover:bg-[#008080] dark:hover:text-white transition-all duration-200 shadow-sm hover:-translate-y-0.5"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:span-2) */}
          <div className="flex flex-col space-y-4 lg:col-span-2">
            <h2 className="text-[14px] font-bold tracking-wider text-[#1E3A8A] dark:text-slate-200 uppercase">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-[14px]">
              {[
                "Find a Doctor",
                "Specializations",
                "Health Packages",
                "Book Online",
              ].map((linkName) => (
                <li key={linkName}>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-[#008080] dark:hover:text-[#3cd1c2] font-medium transition-colors group"
                  >
                    {linkName}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info Blocks (lg:span-3) */}
          <div className="flex flex-col space-y-4 lg:col-span-3">
            <h2 className="text-[14px] font-bold tracking-wider text-[#1E3A8A] dark:text-slate-200 uppercase">
              Contact Info
            </h2>
            <div className="space-y-3.5 text-[14px] text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-[#008080] dark:text-[#3cd1c2] shrink-0 mt-0.5" />
                <span>123 Healthcare Plaza, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-[#008080] dark:text-[#3cd1c2] shrink-0" />
                <a
                  href="tel:+15550001111"
                  className="hover:text-[#008080] dark:hover:text-[#3cd1c2] transition-colors font-medium"
                >
                  +1 (555) 000-1111
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-[#008080] dark:text-[#3cd1c2] shrink-0" />
                <a
                  href="mailto:contact@medicare.com"
                  className="hover:text-[#008080] dark:hover:text-[#3cd1c2] transition-colors font-medium truncate"
                >
                  contact@medicare.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Premium Emergency Hotline Frame Card from footer.PNG (lg:span-3) */}
          <div className="lg:col-span-3 flex items-start">
            {/* Soft layered container token referencing the blueprint card in footer.PNG */}
            <div className="w-full bg-[#E6F0FA]/60 dark:bg-slate-900/40 border border-[#E6F0FA] dark:border-slate-800/60 rounded-[16px] p-5 shadow-sm">
              <h2 className="text-[13px] font-bold tracking-wider text-[#1E3A8A] dark:text-slate-300 uppercase mb-1">
                Emergency Hotline
              </h2>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mb-3">
                Available 24/7 for urgent care
              </p>
              <a
                href="tel:1-800-MED-911"
                className="block text-[20px] sm:text-[22px] font-extrabold tracking-tight text-[#1E3A8A] dark:text-[#3cd1c2] hover:underline transition-all"
              >
                1-800-MED-911
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Segment: Copyright Disclaimer */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900/60 text-center">
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-500 tracking-wide">
            &copy; {currentYear} MediCare Connect. Your health, our priority.
          </p>
        </div>
      </div>
    </footer>
  );
}
