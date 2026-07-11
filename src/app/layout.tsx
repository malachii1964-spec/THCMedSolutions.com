import type { Metadata } from "next";
import { Fraunces, Albert_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AgeGate } from "@/components/age-gate";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["WONK", "opsz"],
});

const albert = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "THCMed Solutions — Grow Guides That Actually Work",
    template: "%s · THCMed Solutions",
  },
  description:
    "The grower's almanac for medical cannabis cultivation. Free, stage-by-stage guides from germination to cure — join free to unlock the full library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${albert.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AgeGate />
        {children}
      </body>
    </html>
  );
}
