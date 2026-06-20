"use client";

import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    // Replaced fixed height with dynamic min-height and padding clearings
    <div className="w-full max-w-md mx-auto py-10">
      {/* REGISTER CARD */}
      <div className="transition-all duration-500 p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-0.5">
            Join MediCare
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
            Initiator your path to absolute tier healthcare
          </p>
        </div>

        <RegisterForm />

        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400 font-light">
          Already registered?{" "}
          {/* Changed button to a styled Next.js Link directly */}
          <Link
            href="/login"
            className="text-amber-600 dark:text-amber-400 font-medium hover:underline inline-block pl-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
