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
    default: "Lake Erie Cannabis — Grow Frosty Buds the Easy Way",
    template: "%s · Lake Erie Cannabis",
  },
  description:
    "Premium grower-first cannabis knowledge for indoor and outdoor home growers. Simple, stage-by-stage guides from seed to cure, plant diagnosis, strains, and trusted gear — rooted in Western New York.",
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
