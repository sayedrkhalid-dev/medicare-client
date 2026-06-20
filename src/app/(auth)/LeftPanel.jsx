import { FiShield, FiZap } from "react-icons/fi";

const LeftPanel = () => {
  // Curated, diverse high-quality physician avatars
  const avatars = [
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&h=150&q=80",
  ];

  return (
    <div className="hidden lg:flex flex-col justify-center gap-10 pr-12 h-full py-6 select-none animate-fade-in">
      {/* HEADER HERO SECTION */}
      <div className="space-y-2">
        <h1 className="text-4xl xl:text-5xl font-light tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
          Your trusted partner in <br />
          <span className="font-semibold bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            digital healthcare.
          </span>
        </h1>
        <p className="text-sm xl:text-base text-slate-600 dark:text-slate-400 max-w-md font-light leading-relaxed">
          {`Access your medical records, schedule appointments with top
          specialists, and manage your family's health all in one secure,
          tailored space.`}
        </p>
      </div>

      {/* CORE VALUE PROPOSITIONS */}
      <div className="grid grid-cols-2 gap-5 max-w-lg">
        {/* Card 1 */}
        <div className="group p-5 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/40 dark:to-slate-900/10 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mb-4 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform">
            <FiShield className="text-lg" />
          </div>
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-1.5">
            HIPAA Compliant
          </h3>
          <p className="text-[11px] xl:text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Your data is strictly encrypted with medical bank-grade security
            protocols.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group p-5 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/40 dark:to-slate-900/10 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mb-4 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform">
            <FiZap className="text-lg" />
          </div>
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-1.5">
            Instant Access
          </h3>
          <p className="text-[11px] xl:text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Real-time priority connections to over 5,000 verified physicians.
          </p>
        </div>
      </div>

      {/* SOCIAL PROOF FOOTER */}
      <div className="flex items-center gap-5 py-5 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md">
        <div className="flex -space-x-3.5">
          {avatars.map((url, index) => (
            <div
              key={index}
              className="w-9 h-9 rounded-full border-2 border-slate-50 dark:border-slate-950 bg-slate-200 dark:bg-slate-800 bg-cover bg-center shadow-md ring-1 ring-slate-200/10 transition-transform hover:scale-105 hover:z-10 cursor-pointer"
              style={{ backgroundImage: `url('${url}')` }}
            />
          ))}
        </div>
        <p className="text-xs xl:text-sm text-slate-600 dark:text-slate-400 font-light tracking-wide">
          Joined by{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400 underline decoration-amber-500/30 underline-offset-4">
            10,000+
          </span>{" "}
          elite patients this month
        </p>
      </div>
    </div>
  );
};

export default LeftPanel;
