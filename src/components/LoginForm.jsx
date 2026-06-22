"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginData.email) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(loginData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!loginData.password) {
      errors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      errors.password = "Password is less than 6 characters!";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleForgotPassword = async () => {};

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      // authClient handles the API request lifecycle seamlessly
      const { data, error } = await authClient.signIn.email({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        // better-auth returns structured error objects (e.g., error.message or error.status)
        setSubmitError(
          error.message || "An authentication schema error occurred.",
        );
        console.error("Registration error detail:", error);
        return;
      }

      // Success! The session cookie is managed automatically by the client helper
      console.log("Submitting premium login secure pipeline:", data);
    } else {
      setSubmitError(
        "Please correct the errors indicated below before resubmitting.",
      );
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    console.log(data);
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace("login-", "");
    setLoginData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleLoginSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
          htmlFor="login-email"
        >
          Email Address
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg" />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 text-sm"
            id="login-email"
            placeholder="name@example.com"
            type="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          {errors.email && (
            <p className="text-[14px] text-red-500 tracking-wide font-light">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label
            className="text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
            htmlFor="login-password"
          >
            Password
          </label>
          <Link
            className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-light"
            href="#"
          >
            Forgot password?
          </Link>
        </div>
        <div className="space-y-1">
          <div className="relative">
            {/* Left Icon */}
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg" />

            {/* Password Input */}
            <input
              className={`w-full pl-10 pr-12 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500/20 transition-all outline-none bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 text-sm ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
              }`}
              id="login-password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={loginData.password}
              onChange={handleLoginChange}
            />

            {/* Toggle Visibility Button */}
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="text-lg" />
              ) : (
                <FiEye className="text-lg" />
              )}
            </button>
          </div>

          {/* Error Message Placed Safe From Absolute Positions */}
          {errors.password && (
            <p className="text-[11px] text-red-500 tracking-wide font-light pt-0.5">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-lg font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-[0.98] shadow-lg shadow-slate-950/10 dark:shadow-none"
      >
        Sign In
      </button>

      <div className="relative my-4 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Or Portal With
        </span>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 py-2.5 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          ></path>
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          ></path>
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          ></path>
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          ></path>
        </svg>
        Continue with Google
      </button>
    </form>
  );
};

export default LoginForm;
