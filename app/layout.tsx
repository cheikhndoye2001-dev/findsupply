import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CookieBanner from "./CookieBanner";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://findsupply-word.vercel.app"),
  title: "FindSupply — You Find It. We Supply It.",
  description:
    "Envoyez une photo de l'article que vous cherchez, FindSupply le retrouve auprès de ses fournisseurs.",
  openGraph: {
    title: "FindSupply — You Find It. We Supply It.",
    description:
      "Envoyez une photo de l'article que vous cherchez, FindSupply le retrouve auprès de ses fournisseurs.",
    locale: "fr_FR",
    type: "website",
  },
  verification: {
    google: "0a4q1ttfb4pcoxDJz-1X5s0ZvuxPqTCjH_qKUlo0Mv8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable} font-body`}>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
