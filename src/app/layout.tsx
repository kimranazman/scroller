import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepROV | Subsea ROV Solutions & Underwater Maintenance",
  description: "Industry-leading remotely operated vehicles for subsea inspection, maintenance, and intervention. Advanced 3D visualization of ROV capabilities for oil & gas infrastructure.",
  keywords: ["ROV", "subsea", "underwater", "maintenance", "oil and gas", "inspection", "intervention", "remotely operated vehicle"],
  authors: [{ name: "DeepROV Solutions" }],
  openGraph: {
    title: "DeepROV | Subsea ROV Solutions",
    description: "Advanced remotely operated vehicles for subsea operations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
