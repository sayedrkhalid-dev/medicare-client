"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.png";
import { useTheme } from "@/context/ThemeContext";

import {
  FiHome,
  FiUser,
  FiSearch,
  FiInfo,
  FiPhone,
  FiGrid,
  FiBell,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // State to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Component has safely mounted on the client browser
    setMounted(true);

    const fetchUserSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await authClient.getSession();
        console.log(data, error);

        if (data && data.user) {
          setUser({
            name: data.user.name,
            email: data.user.email,
            photoUrl: data.user.image,
            role: data.user.role || "Patient",
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Session matching verification error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    } catch (err) {
      console.error("Logout runtime context failure:", err);
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome className="w-5 h-5" /> },
    {
      name: "Find Doctors",
      href: "/doctors",
      icon: <FiSearch className="w-5 h-5" />,
    },
    { name: "About Us", href: "/about", icon: <FiInfo className="w-5 h-5" /> },
    {
      name: "Contact Us",
      href: "/contact",
      icon: <FiPhone className="w-5 h-5" />,
    },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* 60% Rule Frame Layout Container */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-20 backdrop-blur-xl bg-[#FFFFFF]/90 dark:bg-slate-950/90 shadow-[0px_4px_20px_rgba(30,58,138,0.03)] border-b border-[#E6F0FA] dark:border-slate-800 transition-colors duration-300">
        {/* Brand Logo Wrapper */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Image
            src={logo}
            alt="MediCare Connect Logo"
            width={160}
            height={40}
            className="h-12 w-auto object-contain block dark:brightness-110 dark:contrast-125"
            priority
          />
        </Link>

        {/* Desktop Links (30% Secondary Color Balance) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] font-medium tracking-tight transition-colors duration-200 pb-1 relative cursor-pointer ${
                isActive(link.href)
                  ? "text-[#1E3A8A] font-bold border-b-2 border-[#1E3A8A] dark:text-[#E6F0FA] dark:border-[#008080]"
                  : "text-slate-600 dark:text-slate-400 hover:text-[#1E3A8A] dark:hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Private Dashboard Link for Desktop view when Session is Authorized */}
          {!loading && user && (
            <Link
              href={`/dashboard/${user.role}`}
              className={`text-[15px] font-medium tracking-tight transition-colors duration-200 pb-1 relative cursor-pointer ${
                isActive("/dashboard")
                  ? "text-[#1E3A8A] font-bold border-b-2 border-[#1E3A8A] dark:text-[#E6F0FA] dark:border-[#008080]"
                  : "text-slate-600 dark:text-slate-400 hover:text-[#1E3A8A] dark:hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Action Layout Elements */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-[12px] text-slate-600 hover:text-[#1E3A8A] hover:bg-[#E6F0FA] dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle Layout Theme"
          >
            {/* Only render the reactive icon if mounted on the client. 
               Renders a neutral placeholder skeleton or generic icon on the server.
            */}
            {mounted ? (
              isDark ? (
                <FiSun className="w-5 h-5 text-amber-400" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )
            ) : (
              <div className="w-5 h-5" /> // Blank placeholder layout-box
            )}
          </button>

          {/* Quick Search Icon Button */}
          <Link href="/doctors">
            <button
              className="p-2.5 rounded-[12px] text-slate-600 hover:text-[#1E3A8A] hover:bg-[#E6F0FA] dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-all active:scale-95 cursor-pointer"
              aria-label="Search Doctor Registry"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </Link>

          {/* Alerts Bell Button */}
          {!loading && user && (
            <div className="relative">
              <button
                className="p-2.5 rounded-[12px] text-slate-600 hover:text-[#1E3A8A] hover:bg-[#E6F0FA] dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-all relative active:scale-95 cursor-pointer group"
                aria-label="Notifications"
              >
                <FiBell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse" />
              </button>
            </div>
          )}

          {/* Profile Dropdown Container */}
          {!loading && (
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 dark:focus:ring-[#008080]/30 rounded-full p-1 cursor-pointer transition-transform active:scale-[0.98]"
                  >
                    <img
                      src={
                        user.photoUrl ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                      }
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#1E3A8A]/10 dark:border-slate-800"
                    />
                    <span className="hidden md:inline-block text-slate-700 dark:text-slate-300 font-medium text-sm max-w-[120px] truncate">
                      {user.name}
                    </span>
                    <FiChevronDown
                      className={`hidden md:inline-block w-4 h-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu Box (12px standard curve) */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#FFFFFF] dark:bg-slate-900 border border-[#E6F0FA] dark:border-slate-800 rounded-[12px] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                      <div className="px-4 py-2 border-b border-[#E6F0FA] dark:border-slate-800">
                        <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {user.email}
                        </p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold bg-[#E6F0FA] text-[#1E3A8A] dark:bg-slate-800 dark:text-slate-300 rounded-full capitalize">
                          {user.role} Account
                        </span>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-[#E6F0FA]/50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <FiGrid className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        My Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-[#E6F0FA]/50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <FiUser className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        Profile Settings
                      </Link>

                      <hr className="border-[#E6F0FA] dark:border-slate-800 my-1" />

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium cursor-pointer transition-colors"
                      >
                        <FiLogOut className="w-4 h-4 text-red-500" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <button className="px-5 py-2 text-[14px] font-semibold text-[#1E3A8A] border-2 border-[#1E3A8A] dark:text-slate-200 dark:border-slate-700 hover:bg-[#E6F0FA] dark:hover:bg-slate-900 transition-all rounded-[12px] cursor-pointer">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-[#1E3A8A] dark:text-slate-300 focus:outline-none cursor-pointer lg:hidden"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Drawer Overlay Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Slide-out Panel */}
      <div
        className={`fixed top-20 right-0 w-72 h-[calc(100vh-5rem)] backdrop-blur-xl bg-[#FFFFFF]/95 dark:bg-slate-950/95 shadow-2xl border-l border-[#E6F0FA] dark:border-slate-800 z-45 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col p-6 gap-2 h-full overflow-y-auto">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold mb-2">
            Navigation Links
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-[12px] transition-all ${
                isActive(link.href)
                  ? "bg-[#E6F0FA] text-[#1E3A8A] font-bold dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-[#E6F0FA]/50 dark:hover:bg-slate-900"
              }`}
            >
              {link.icon}
              <span className="text-base font-medium">{link.name}</span>
            </Link>
          ))}

          {/* Private Dashboard Link for Mobile Drawer */}
          {!loading && user && (
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-[12px] transition-all ${
                isActive("/dashboard")
                  ? "bg-[#E6F0FA] text-[#1E3A8A] font-bold dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-[#E6F0FA]/50 dark:hover:bg-slate-900"
              }`}
            >
              <FiGrid className="w-5 h-5" />
              <span className="text-base font-medium">Dashboard</span>
            </Link>
          )}

          {/* Fixed Bottom Action Layout Wrapper */}
          <div className="flex flex-col gap-3 mt-auto pb-4">
            {!loading && user ? (
              <button
                onClick={handleLogout}
                className="w-full text-center flex items-center justify-center gap-2 px-6 py-3 border border-red-200 dark:border-red-900/30 text-red-500 rounded-[12px] font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              !loading && (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <button className="w-full px-6 py-3 font-semibold bg-[#008080] text-[#FFFFFF] hover:bg-[#006666] shadow-sm rounded-[12px] transition-all cursor-pointer">
                    Sign In
                  </button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
