"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { MarketProvider } from "@/components/market/MarketProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MarketProvider>{children}</MarketProvider>
    </SessionProvider>
  );
}
