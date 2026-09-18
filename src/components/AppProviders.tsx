"use client";

import type { ReactNode } from "react";
import { MarketProvider } from "@/components/market/MarketProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return <MarketProvider>{children}</MarketProvider>;
}