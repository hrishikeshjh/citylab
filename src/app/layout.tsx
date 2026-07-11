import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ModalProvider } from "@/lib/modal-context";
import { AppShell } from "@/components/app-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "City Lab Diagnostic Centre — Accurate Diagnostics. Trusted Care.",
  description:
    "City Lab Diagnostic Centre offers reliable blood tests, health packages, home sample collection, and expert consultations. Trusted by over 50,000 patients with NABL standard practices.",
  keywords: [
    "diagnostic centre",
    "blood test",
    "health checkup",
    "pathology lab",
    "home sample collection",
    "health packages",
    "City Lab",
  ],
  openGraph: {
    title: "City Lab Diagnostic Centre — Accurate Diagnostics. Trusted Care.",
    description:
      "From routine blood tests to advanced health screenings, City Lab provides reliable diagnostic services with experienced professionals and modern technology.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <AuthProvider>
          <ModalProvider>
            <AppShell>{children}</AppShell>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

