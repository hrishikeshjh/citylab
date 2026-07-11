"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useModal } from "@/lib/modal-context";

interface EmailFormData {
  name?: string;
  email: string;
  password: string;
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useModal();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, continueAsGuest } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>();

  if (!isLoginModalOpen) return null;

  /* --- Handlers -------------------------------------------------------- */

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      closeLoginModal();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google sign-in failed";
      if (!message.includes("popup-closed")) {
        setError(message);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailSubmit = async (data: EmailFormData) => {
    setError("");
    setEmailLoading(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(data.email, data.password, data.name || "");
      } else {
        await signInWithEmail(data.email, data.password);
      }
      closeLoginModal();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      if (message.includes("user-not-found") || message.includes("invalid-credential")) {
        setError("Invalid email or password. Please try again.");
      } else if (message.includes("email-already-in-use")) {
        setError("An account with this email already exists. Try signing in.");
      } else if (message.includes("weak-password")) {
        setError("Password must be at least 6 characters.");
      } else {
        setError(message);
      }
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSkip = () => {
    continueAsGuest();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("citylab_modal_skipped", "true");
    }
    closeLoginModal();
  };

  const toggleMode = () => {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError("");
    reset();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop (Dark glassmorphic blur) */}
        <motion.div
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleSkip} // Clicking outside skips/closes the modal
        />

        {/* Modal Dialog Card */}
        <motion.div
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-black/15 border border-gray-100 p-8 relative z-10 font-sans"
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
        >
          {/* Close/Cross Button on top-right */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            aria-label="Skip login"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo header */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg">
              C
            </div>
            <h2 className="text-xl font-bold text-foreground mt-3">
              {mode === "signin" ? "Welcome to City Lab" : "Create Account"}
            </h2>
            <p className="text-xs text-text-secondary mt-1 text-center">
              {mode === "signin"
                ? "Sign in to access digital reports and book tests"
                : "Register to track test orders and family health"}
            </p>
          </div>

          {/* Error messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-foreground transition-all hover:bg-gray-50 disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-3">
            {mode === "signup" && (
              <div>
                <label className="block text-[10px] font-bold text-foreground uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-foreground placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500 mt-0.5">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-foreground uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-foreground placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-foreground uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-foreground placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500 mt-0.5">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={emailLoading}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold transition-all hover:bg-primary-hover disabled:opacity-60"
            >
              {emailLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Toggle link */}
          <p className="mt-5 text-center text-xs text-text-secondary">
            {mode === "signin" ? "New to City Lab?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-bold text-primary hover:text-primary-hover"
            >
              {mode === "signin" ? "Sign Up Free" : "Sign In"}
            </button>
          </p>

          {/* Guest skip link */}
          <div className="mt-5 pt-4 border-t border-gray-50 text-center">
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-text-secondary hover:text-primary transition-colors uppercase tracking-wide"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Skip &amp; Explore packages as guest
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
