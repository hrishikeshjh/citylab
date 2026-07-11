"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingButtons } from "@/components/floating-buttons";
import { useAuth } from "@/lib/auth-context";
import { useModal } from "@/lib/modal-context";
import { LoginModal } from "@/components/login-modal";

/**
 * Shell that renders Navbar / Footer / FloatingButtons on every
 * page *except* the login page, which has its own full-screen layout.
 * Controls automatic Login Modal launch on website startup.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isGuest, loading } = useAuth();
  const { openLoginModal } = useModal();
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin");
  const isExcludedPage = isLoginPage || isAdminPage;

  // Auto-launch Login Modal on website startup if unauthenticated and not skipped
  useEffect(() => {
    if (!loading && !user && !isLoginPage && !isAdminPage) {
      const skipped = sessionStorage.getItem("citylab_modal_skipped");
      if (skipped !== "true") {
        openLoginModal();
      }
    }
  }, [user, loading, isLoginPage, isAdminPage, openLoginModal]);

  // Loading Screen (Premium, warm theme spinner)
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-orange-100 border-t-primary animate-spin" />
          <div className="absolute text-primary font-bold text-lg">C</div>
        </div>
        <span className="mt-4 text-sm font-semibold tracking-wide text-foreground uppercase animate-pulse">
          City Lab Diagnostics
        </span>
      </div>
    );
  }

  if (isExcludedPage) {
    return (
      <>
        {children}
        <LoginModal />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
      <LoginModal />
    </>
  );
}

