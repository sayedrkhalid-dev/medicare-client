"use client";

import LoginForm from "@/components/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    // Replaced 'absolute' deck dependencies with normal block-centering layouts
    <div className="w-full max-w-md mx-auto py-10">
      {/* SECURE LOGIN  */}
      <div className="transition-all duration-500 p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
            Please authenticate your private medical profile
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400 font-light">
          New to our network?{" "}
          {/* Cleared native button tags for semantically sound layout */}
          <Link
            href="/register"
            className="text-amber-600 dark:text-amber-400 font-medium hover:underline inline-block pl-1"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
