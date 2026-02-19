import type { Metadata, Viewport } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";

import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "LuminaLib - Library Management System",
  description:
    "A modern library management system for browsing, borrowing, and managing books.",
};

export const viewport: Viewport = {
  themeColor: "#1a3a6b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_sourceCodePro.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
