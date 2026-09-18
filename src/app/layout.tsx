import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import TopNavBar from "@/components/layout/TopNavBar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppProviders from "@/components/AppProviders";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dreamvally - Buy, Sell, Connect across BD and SA",
  description:
    "Dual-market marketplace for Bangladesh and Saudi Arabia: classifieds, shop, delivery, matrimony, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${outfit.variable} ${hindSiliguri.variable} min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-on-surface w-full max-w-full overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <AppProviders>
            <TopNavBar />
            <div className="flex-1 flex flex-col pb-20 md:pb-0 w-full max-w-full overflow-x-hidden">{children}</div>
            <Footer />
            <MobileBottomNav />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}