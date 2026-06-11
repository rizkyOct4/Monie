"use client";

import Link from "next/link";
import { House, Wallet, ChartColumn, Settings } from "lucide-react";
import { memo } from "react";

const Footer = () => {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-zinc-200
        bg-white/90
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-lg
          items-center
          justify-around
        "
      >
        <Link
          href="/"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-600
          "
        >
          <House size={20} />
          <span className="text-[10px]">Dashboard</span>
        </Link>

        <Link
          href="/transaction"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-600
          "
        >
          <Wallet size={20} />
          <span className="text-[10px]">Transaksi</span>
        </Link>

        <Link
          href="/report"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-600
          "
        >
          <ChartColumn size={20} />
          <span className="text-[10px]">Laporan</span>
        </Link>

        <Link
          href="/setting"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-zinc-600
          "
        >
          <Settings size={20} />
          <span className="text-[10px]">Setting</span>
        </Link>
      </div>
    </nav>
  );
}

export default memo(Footer)
