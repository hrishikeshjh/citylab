import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — City Lab Diagnostic Centre",
  description:
    "Sign in to City Lab to access your reports, book tests, and manage your health. Sign in with Google, email, or continue as a guest.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
