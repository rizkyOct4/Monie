"use client";

import Link from "next/link";
import {
  Wallet,
  ChartColumn,
  Settings,
  LayoutDashboard,
  BookOpen
} from "lucide-react";
import { memo } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/transaction",
      label: "Transaksi",
      icon: Wallet,
    },
    {
      href: "/report",
      label: "Laporan",
      icon: ChartColumn,
    },
    {
      href: "/setting",
      label: "Setting",
      icon: Settings,
    },
    {
      href: "/docs",
      label: "Docs",
      icon: BookOpen,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-101 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              // prefetch={false}
              className={`flex flex-col items-center gap-1 transition ${
                isActive
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  isActive ? "bg-emerald-500/10" : ""
                }`}
              >
                <Icon size={20} />
              </div>

              <span className="text-[10px] font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default memo(Footer);