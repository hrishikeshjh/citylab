import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — City Lab",
  description: "Administrative console to manage laboratory bookings, diagnostic catalogs, rostered doctors, home collections, and verification reports.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
