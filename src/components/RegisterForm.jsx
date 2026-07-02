"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiActivity,
  FiLink,
  FiUploadCloud,
  FiAlertCircle,
  FiLock,
  FiEyeOff,
  FiEye,
  FiMail,
} from "react-icons/fi";

import { register } from "@/services/auth/auth.service";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    role: "patient",
    gender: "male",
    password: "",
    agreeToTerms: false,
  });

  // Comprehensive error tracking states
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(registerData.password);

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!registerData.firstName.trim()) {
      tempErrors.firstName = "First name is required";
    } else if (registerData.firstName.trim().length < 2) {
      tempErrors.firstName = "Must be at least 2 characters";
    }

    if (!registerData.lastName.trim()) {
      tempErrors.lastName = "Last name is required";
    }

    if (!registerData.email) {
      tempErrors.email = "Email address is required";
    } else if (!emailRegex.test(registerData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!registerData.password) {
      tempErrors.password = "Password is required";
    } else if (strengthScore < 2) {
      tempErrors.password = "Password is too weak (Use numbers, upper cases)";
    }

    if (!registerData.agreeToTerms) {
      tempErrors.agreeToTerms = "You must accept the terms to proceed";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      setSubmitError(
        "Please correct the errors indicated below before resubmitting.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const data = await register({
        name: `${registerData.firstName.trim()} ${registerData.lastName.trim()}`,
        email: registerData.email,
        password: registerData.password,
        image: registerData.imageUrl.trim() || undefined,
        role: registerData.role,
        gender: registerData.gender,
      });

      console.log("Registration successful! Session created:", data);

      router.push("/");
      router.refresh();
    } catch (err) {
      setSubmitError(err.message || "An authentication schema error occurred.");
      console.error("Registration error detail:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldName = id.replace("reg-", "");

    setRegisterData((prev) => ({
      ...prev,
      [fieldName]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific error as user interacts with it
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRegisterData((prev) => ({ ...prev, role: selectedRole }));
  };

  const handleGenderSelect = (selectedGender) => {
    setRegisterData((prev) => ({ ...prev, gender: selectedGender }));
  };

  return (
    <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
      {/* GLOBAL FORM SUBMISSION ERROR BANNER */}
      {submitError && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs animate-fadeIn">
          <FiAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* 1. NAME GRID */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label
            className="text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300"
            htmlFor="reg-firstName"
          >
            First Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
            <input
              className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500/20 outline-none bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 text-sm transition-all ${
                errors.firstName
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
              }`}
              id="reg-firstName"
              placeholder="Sayed R."
              type="text"
              value={registerData.firstName}
              onChange={handleRegisterChange}
            />
          </div>
          {errors.firstName && (
            <p className="text-[11px] text-red-500 tracking-wide font-light pt-0.5">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            className="text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300"
            htmlFor="reg-lastName"
          >
            Last Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
            <input
              className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500/20 outline-none bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 text-sm transition-all ${
                errors.lastName
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
              }`}
              id="reg-lastName"
              placeholder="Khalid"
              type="text"
              value={registerData.lastName}
              onChange={handleRegisterChange}
            />
          </div>
          {errors.lastName && (
            <p className="text-[11px] text-red-500 tracking-wide font-light pt-0.5">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* 2. EMAIL ADDRESS */}
      <div className="space-y-1">
        <label
          className="text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300"
          htmlFor="reg-email"
        >
          Email Address
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
          <input
            className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500/20 outline-none bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 text-sm transition-all ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
            }`}
            id="reg-email"
            placeholder="name@example.com"
            type="email"
            value={registerData.email}
            onChange={handleRegisterChange}
          />
        </div>
        {errors.email && (
          <p className="text-[11px] text-red-500 tracking-wide font-light pt-0.5">
            {errors.email}
          </p>
        )}
      </div>

      {/* 3. PREMIUM MULTI-MODAL AVATAR / URL FIELD */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300">
          Profile Passport Image or URL
        </label>

        <div className="group relative rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 hover:border-amber-500 dark:hover:border-amber-400 transition-all p-3 flex flex-col items-center justify-center gap-2 text-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-20"
          />

          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 pointer-events-none group-hover:text-amber-500 transition-colors">
            <FiUploadCloud className="text-lg" />
            <span className="text-[14px] font-light">
              Drag & drop avatar here or browse
            </span>
          </div>

          <div className="w-full flex items-center justify-center gap-2 pointer-events-none">
            <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800" />
            <span className="text-[9px] text-slate-400 tracking-wider uppercase font-light">
              or
            </span>
            <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="relative w-full z-30">
            <FiLink className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs" />
            <input
              type="url"
              id="reg-imageUrl"
              placeholder="Paste remote image link..."
              value={registerData.imageUrl}
              onChange={handleRegisterChange}
              className="w-full pl-7 pr-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 text-xs outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400 transition-colors font-light"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>

      {/* 4. PREMIUM ROLE SELECTION STRIP */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300">
          Select Account Role
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleRoleSelect("patient")}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl border text-xs font-medium transition-all ${
              registerData.role === "patient"
                ? "border-amber-500 dark:border-amber-400 bg-amber-500/5 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-500/30"
                : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <FiUser className="text-sm" />I am a Patient
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect("doctor")}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl border text-xs font-medium transition-all ${
              registerData.role === "doctor"
                ? "border-amber-500 dark:border-amber-400 bg-amber-500/5 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-500/30"
                : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <FiActivity className="text-sm" />I am a Doctor
          </button>
        </div>
      </div>

      {/* 5. GENDER SELECTION STRIP */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300">
          Gender
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["male", "female", "other"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => handleGenderSelect(g)}
              className={`py-1.5 px-3 rounded-lg border text-xs font-medium capitalize transition-all ${
                registerData.gender === g
                  ? "border-amber-500 dark:border-amber-400 bg-amber-500/5 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/30"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* 6. CREATE PASSWORD */}
      <div className="space-y-1">
        <label
          className="text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300"
          htmlFor="reg-password"
        >
          Create Password
        </label>
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
              id="reg-password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              onChange={handleRegisterChange}
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
            <p className="text-[14px] text-red-500 tracking-wide font-light pt-0.5">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      {/* TERMS & DISCLOSURES */}
      <div className="space-y-1 pt-1">
        <div className="flex items-end gap-2">
          <input
            className={`mt-0.5 rounded text-slate-900 dark:text-slate-100 focus:ring-amber-500/20 ${
              errors.agreeToTerms
                ? "border-red-500 text-red-500"
                : "border-slate-300 dark:border-slate-700"
            }`}
            id="reg-agreeToTerms"
            type="checkbox"
            checked={registerData.agreeToTerms}
            onChange={handleRegisterChange}
          />
          <label
            className="text-[12px] text-slate-500 dark:text-slate-400 leading-tight font-light"
            htmlFor="reg-agreeToTerms"
          >
            I consent to the luxury concierge{" "}
            <Link
              className="text-amber-600 dark:text-amber-400 hover:underline"
              href="#"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              className="text-amber-600 dark:text-amber-400 hover:underline"
              href="#"
            >
              Privacy Suite
            </Link>
            .
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-[14px] text-red-500 tracking-wide font-light">
            {errors.agreeToTerms}
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Creating account..." : "Sign Up"}
      </button>

      {/* OR PORTAL SEPARATOR */}
      <div className="relative my-4 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Or Portal With
        </span>
      </div>

      {/* GOOGLE FEDERATION BUTTON */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 py-2.5 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
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

export default RegisterForm;
