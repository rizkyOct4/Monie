
import { WalletCards } from "lucide-react";

const AuthBanner = () => {
  return (
    <div className="relative hidden h-full w-full overflow-hidden bg-[#050505] lg:block">
      {/* Background Blur */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-125 w-125 rounded-full bg-emerald-500/8 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-112.5 w-112.5 rounded-full bg-blue-500/6 blur-[130px]" />

      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_35%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/30">
            <WalletCards size={24} strokeWidth={2.4} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Monie
            </h2>

            <p className="text-sm text-zinc-400">
              Personal Finance Management
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-xl">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">
            Smart Financial Management
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-white">
            Kelola uang dengan{" "}
            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              lebih terarah.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
            Catat transaksi, pantau pengeluaran, dan pahami kondisi
            keuanganmu melalui ringkasan serta insight yang mudah dipahami.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 pt-8">
          <div>
            <p className="text-sm text-zinc-500">
              Dibuat untuk membantu mengelola keuangan
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
              Transaction
            </div>

            <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
              Insight
            </div>

            <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
              Report
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
