import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buni Iphone | Premium iPhones in Sri Lanka",
  description: "Your trusted source for new, refurbished, and pre-owned iPhones in Sri Lanka. 12-month warranty, hassle-free trade-in, and same-day delivery.",
  keywords: "iPhone Sri Lanka, Buy iPhone Colombo, Refurbished iPhone SL, Apple Store Sri Lanka",
  openGraph: {
    title: "Buni Iphone | Premium iPhones in Sri Lanka",
    description: "Your trusted source for premium iPhones in Sri Lanka.",
    url: "https://buniiphone.lk",
    siteName: "Buni Iphone",
    locale: "en_LK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-accent selection:text-black">
        <Navbar />
        <main className="flex-1 flex flex-col pt-16">
          {children}
        </main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
