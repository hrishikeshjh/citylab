"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

/* --- Types -------------------------------------------------------------- */

interface AuthContextValue {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  continueAsGuest: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* --- Provider ----------------------------------------------------------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setIsGuest(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Restore guest mode from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const guestFlag = sessionStorage.getItem("citylab_guest");
      if (guestFlag === "true") setIsGuest(true);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    [],
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, name: string) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
    },
    [],
  );

  const continueAsGuest = useCallback(() => {
    setIsGuest(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("citylab_guest", "true");
    }
  }, []);

  const signOutUser = useCallback(async () => {
    await firebaseSignOut(auth);
    setIsGuest(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("citylab_guest");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        continueAsGuest,
        signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* --- Hook --------------------------------------------------------------- */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
