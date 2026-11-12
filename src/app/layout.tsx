import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstraHealth — Astronaut Health Monitoring System",
  description:
    "AstraHealth is a smart astronaut health-monitoring platform for long-duration and deep-space missions. NASA Space Apps Challenge 2026 — Team Medora.",
  keywords: [
    "AstraHealth",
    "Astronaut Health",
    "NASA Space Apps",
    "Space Medicine",
    "Mission Control",
    "Team Medora",
  ],
  authors: [{ name: "Team Medora" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "AstraHealth — Astronaut Health Monitoring",
    description: "Mission-control health monitoring for deep-space missions.",
    siteName: "AstraHealth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstraHealth — Astronaut Health Monitoring",
    description: "Mission-control health monitoring for deep-space missions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
