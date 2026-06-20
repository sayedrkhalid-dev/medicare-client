import LeftPanel from "./LeftPanel";

const AuthLayout = ({ children }) => {
  return (
    <main className="grow flex items-center justify-center relative px-4 py-8 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Premium Ambient Atmosphere Blurs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
        {/* Top-Left: Warm Amber Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/15 dark:bg-amber-500/10 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>

        {/* Bottom-Right: Luxury Cyan/Emerald Medical Tech Glow */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
      </div>

      <div className="max-w-[1110px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Branding Left Panel (Desktop only) */}
        <LeftPanel />

        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
