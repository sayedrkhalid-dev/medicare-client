import React from "react";

export const metadata = {
  title: "Find Doctors | Premium Clinical Directory",
  description: "Connect and book consultations with certified specialists.",
};

export default function DoctorsLayout({ children }) {
  return (
    <div className="mt-16 min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950">
      {children}
    </div>
  );
}
