import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ModalProvider } from "@/lib/modal-context";
import { ThemeProvider } from "@/lib/theme-context";
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
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply dark class before paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('citylab-theme');
                  var theme = stored || 'system';
                  var isDark = theme === 'dark' ||
                    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <AuthProvider>
          <ModalProvider>
            <ThemeProvider>
              <AppShell>{children}</AppShell>
            </ThemeProvider>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
