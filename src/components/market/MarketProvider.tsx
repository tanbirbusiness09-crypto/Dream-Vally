"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type MarketId = "bd" | "sa";

type MarketContextValue = {
  market: MarketId;
  setMarket: (market: MarketId) => void;
  currency: string;
  defaultLocation: string;
  label: string;
};

const MarketContext = createContext<MarketContextValue | null>(null);

const MARKET_META: Record<
  MarketId,
  { currency: string; defaultLocation: string; label: string }
> = {
  bd: {
    currency: "BDT",
    defaultLocation: "All of Bangladesh",
    label: "Bangladesh",
  },
  sa: {
    currency: "SAR",
    defaultLocation: "All of Saudi Arabia",
    label: "Saudi Arabia",
  },
};

function readMarketFromUrl(): MarketId {
  if (typeof window === "undefined") return "bd";
  const param = new URLSearchParams(window.location.search).get("market");
  return param === "sa" ? "sa" : "bd";
}

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarketState] = useState<MarketId>("bd");

  useEffect(() => {
    setMarketState(readMarketFromUrl());
    const onPop = () => setMarketState(readMarketFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setMarket = useCallback((next: MarketId) => {
    setMarketState(next);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("market", next);
    window.history.replaceState({}, "", url.toString());
  }, []);

  const value = useMemo(
    () => ({
      market,
      setMarket,
      ...MARKET_META[market],
    }),
    [market, setMarket]
  );

  return (
    <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
  );
}

export function useMarket() {
  const ctx = useContext(MarketContext);
  if (!ctx) {
    throw new Error("useMarket must be used within MarketProvider");
  }
  return ctx;
}