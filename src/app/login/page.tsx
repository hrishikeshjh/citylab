"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Shield,
  TestTube,
  Heart,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

/* --- Types -------------------------------------------------------------- */

interface EmailFormData {
  name?: string;
  email: string;
  password: string;
}

/* --- Floating Particles ------------------------------------------------ */

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 6 + Math.random() * 8,
            height: 6 + Math.random() * 8,
            background: `rgba(249, 115, 22, ${0.1 + Math.random() * 0.15})`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            x: [0, 10 - Math.random() * 20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* --- Google Icon SVG --------------------------------------------------- */

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

/* --- Main Login Page --------------------------------------------------- */

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const { user, isGuest, signInWithGoogle, signInWithEmail, signUpWithEmail, continueAsGuest } =
    useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  /* --- Handlers -------------------------------------------------------- */

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Google sign-in failed";
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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      // Make Firebase errors more user-friendly
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

  const handleGuestMode = () => {
    continueAsGuest();
    router.push("/");
  };

  const toggleMode = () => {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError("");
    reset();
  };

  /* --- Feature pills for the left panel -------------------------------- */

  const features = [
    {
      icon: TestTube,
      title: "500+ Tests Available",
      desc: "Comprehensive diagnostic catalog",
    },
    {
      icon: Shield,
      title: "NABL Standard Practices",
      desc: "Quality you can trust",
    },
    {
      icon: Heart,
      title: "Home Sample Collection",
      desc: "Convenience at your doorstep",
    },
    {
      icon: Sparkles,
      title: "Digital Reports",
      desc: "Fast & secure online access",
    },
  ];

  /* --- Render ---------------------------------------------------------- */

  return (
    <div className="min-h-screen flex">
      {/* --- Left Panel - Brand / Features (desktop only) ---------------- */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-orange-800/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-yellow-300/10 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white font-bold text-xl">
              C
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold text-white tracking-tight">
                City Lab
              </span>
              <span className="text-xs font-medium tracking-widest uppercase text-white/70">
                Diagnostics
              </span>
            </div>
          </div>

          {/* Tagline */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight">
            Your Health,
            <br />
            <span className="text-yellow-200">Our Priority.</span>
          </h1>
          <p className="mt-4 text-base text-white/80 max-w-md leading-relaxed">
            Sign in to access your reports, book tests, track orders, and manage
            your family&apos;s health — all in one place.
          </p>

          {/* Feature List */}
          <div className="mt-10 space-y-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-white/60">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Right Panel - Login Form ----------------------------------- */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 relative">
        <FloatingParticles />

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg">
              C
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-foreground">
                City Lab
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-text-secondary">
                Diagnostics
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-black/[0.04] border border-gray-100 p-8">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {mode === "signin" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                {mode === "signin"
                  ? "Sign in to access your health dashboard"
                  : "Get started with City Lab today"}
              </p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-foreground transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <div className="h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                or
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Email/Password Form */}
            <form
              onSubmit={handleSubmit(handleEmailSubmit)}
              className="space-y-4"
            >
              {/* Name — only on signup */}
              <AnimatePresence>
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="login-name"
                      className="block text-xs font-semibold text-foreground mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="login-name"
                        type="text"
                        placeholder="John Doe"
                        {...register("name", {
                          required: mode === "signup" && "Name is required",
                        })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm text-foreground placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold text-foreground mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm text-foreground placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-foreground mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters",
                      },
                    })}
                    className="w-full pl-11 pr-12 py-3 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm text-foreground placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={emailLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary text-white text-sm font-semibold transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {emailLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === "signin" ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle mode */}
            <p className="mt-6 text-center text-sm text-text-secondary">
              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Guest Mode */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              type="button"
              onClick={handleGuestMode}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium text-text-secondary bg-white border border-gray-200 transition-all duration-200 hover:border-primary/30 hover:text-primary hover:shadow-sm"
            >
              <Sparkles className="h-4 w-4 transition-colors group-hover:text-primary" />
              Skip &amp; Explore Packages as Guest
              <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
