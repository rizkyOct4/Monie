"use client";

import Link from "next/link";
import { House, Wallet, ChartColumn, Settings, LayoutDashboard } from "lucide-react";
import { memo } from "react";

const Footer = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-101 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {/* Dashboard */}
        <Link
          href="/"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-emerald-400
            transition
            hover:text-emerald-300
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10">
            <LayoutDashboard size={20} />
          </div>

          <span className="text-[10px] font-medium">
            Dashboard
          </span>
        </Link>

        <Link
          href="/transaction"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-500
            transition
            hover:text-zinc-200
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl">
            <Wallet size={20} />
          </div>

          <span className="text-[10px] font-medium">
            Transaksi
          </span>
        </Link>

        <Link
          href="/report"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-500
            transition
            hover:text-zinc-200
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl">
            <ChartColumn size={20} />
          </div>

          <span className="text-[10px] font-medium">
            Laporan
          </span>
        </Link>

        <Link
          href="/setting"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-500
            transition
            hover:text-zinc-200
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl">
            <Settings size={20} />
          </div>

          <span className="text-[10px] font-medium">
            Setting
          </span>
        </Link>

        <Link
          href="/docs"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-500
            transition
            hover:text-zinc-200
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl">
            <Settings size={20} />
          </div>

          <span className="text-[10px] font-medium">
            Docs
          </span>
        </Link>
      </div>
    </nav>
  );
};


export default memo(Footer)
