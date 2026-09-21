import { Metadata } from "next";
import AdminClientLayout from "./AdminLayoutClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}

