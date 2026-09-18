"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMarket, type MarketId } from "./MarketProvider";

export default function MarketTabBar({ className = "" }: { className?: string }) {
  const { market, setMarket } = useMarket();

  return (
    <Tabs
      value={market}
      onValueChange={(v) => setMarket(v as MarketId)}
      className={className}
    >
      <TabsList className="w-full sm:w-auto bg-black/20 backdrop-blur-md border border-white/10">
        <TabsTrigger value="bd" className="flex-1 sm:flex-none min-w-[120px]">
          Bangladesh
        </TabsTrigger>
        <TabsTrigger value="sa" className="flex-1 sm:flex-none min-w-[120px]">
          Saudi Arabia
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
