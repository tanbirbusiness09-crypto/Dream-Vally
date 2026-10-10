"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, PlusCircle, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/post-ad", label: "Post", icon: PlusCircle, emphasize: true },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/dashboard", label: "Account", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide mobile bottom navigation on seller portal pages
  if (pathname?.startsWith('/seller')) {
    return null;
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-outline-variant/40 bg-surface-container-lowest/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile primary"
    >
      <ul className="grid grid-cols-5 h-16">
        {items.map(({ href, label, icon: Icon, emphasize }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors",
                  active ? "text-primary" : "text-on-surface-variant",
                  emphasize && "text-transparent bg-clip-text bg-gradient-to-r from-[#00C48A] to-[#F5C518]"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    emphasize && "text-[#00C48A]",
                    active && !emphasize && "text-primary"
                  )}
                  strokeWidth={active || emphasize ? 2.4 : 1.8}
                />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
