"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Phone, LogOut, LogIn, Moon, Sun, Monitor } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import { useModal } from "@/lib/modal-context";
import { useTheme } from "@/lib/theme-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, loading, signOut } = useAuth();
  const { openLoginModal } = useModal();
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  /* --- Theme icon helper ------------------------------------------------- */
  const ThemeIcon =
    theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  const themeLabel =
    theme === "system"
      ? "System theme"
      : resolvedTheme === "dark"
        ? "Dark mode"
        : "Light mode";

  /* --- User initials helper ---------------------------------------------- */
  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white dark:bg-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
        : "bg-white dark:bg-gray-900"
        }`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2 group shrink-0"
            aria-label="City Lab — Home"
          >
            <img
              src="/images/logo.svg"
              alt="City Lab Diagnostics Logo"
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-[14px] font-medium text-text-secondary rounded-lg transition-colors duration-200 hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={themeLabel}
              title={themeLabel}
            >
              <ThemeIcon className="h-5 w-5" />
            </button>

            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary rounded-full border border-border transition-all duration-200 hover:border-primary hover:text-primary"
              aria-label="Call City Lab"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <Link
              href="#tests"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full transition-all duration-200 hover:bg-primary-hover hover:shadow-md"
            >
              Book a Test
            </Link>

            {/* Auth Button / User Menu (Desktop) */}
            {!loading && (
              <>
                {user ? (
                  /* Logged-in user dropdown */
                  <div className="relative" ref={userMenuRef}>
                    <button
                      type="button"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                      aria-label="User menu"
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          className="h-8 w-8 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {getUserInitials()}
                        </div>
                      )}
                      <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                        {user.displayName || user.email?.split("@")[0]}
                      </span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-black/[0.08] dark:shadow-black/[0.3] border border-gray-100 dark:border-gray-700 py-2 z-50 font-sans">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-text-secondary truncate">
                            {user.email}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={async () => {
                            await signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Always show Login button when unauthenticated */
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary border border-primary/20 bg-primary/5 rounded-full transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md font-sans cursor-pointer"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme toggle (mobile) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={themeLabel}
              title={themeLabel}
            >
              <ThemeIcon className="h-5 w-5" />
            </button>

            {/* Mobile auth indicator (Top Right corner) */}
            {!loading && (
              <>
                {user ? (
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="p-1 rounded-full"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {getUserInitials()}
                      </div>
                    )}
                  </button>
                ) : (
                  /* Always show Login icon on top right mobile header */
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    aria-label="Login"
                  >
                    <LogIn className="h-5 w-5" />
                  </button>
                )}
              </>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-border/50 pb-6 pt-4 font-sans"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 text-[15px] font-medium text-text-secondary rounded-xl transition-colors hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 px-3">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-text-secondary rounded-full border border-border"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <Link
                href="#tests"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full"
              >
                Book a Test
              </Link>

              {/* Mobile auth actions */}
              {!loading && (
                <>
                  {user ? (
                    <div className="flex flex-col gap-2">

                      <button
                        type="button"
                        onClick={async () => {
                          await signOut();
                          handleLinkClick();
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 rounded-full border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        handleLinkClick();
                        openLoginModal();
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary rounded-full border border-primary/20 bg-primary/5 cursor-pointer"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile user dropdown (shown when avatar tapped) */}
        {userMenuOpen && user && (
          <div className="lg:hidden absolute right-4 top-16 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-black/[0.08] dark:shadow-black/[0.3] border border-gray-100 dark:border-gray-700 py-2 z-50 font-sans">
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={async () => {
                await signOut();
                setUserMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
