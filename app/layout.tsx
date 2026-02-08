import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wellspring - Your Longevity Dashboard",
  description: "Track your health biomarkers, get AI-powered insights, and learn about longevity science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
