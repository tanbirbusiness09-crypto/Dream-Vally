"use client";

import type { ReactNode } from "react";

export default function FadeIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}