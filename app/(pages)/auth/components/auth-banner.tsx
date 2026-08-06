// components/auth/auth-banner.tsx

import { DatabaseZap } from "lucide-react";

const AuthBanner = () => {
  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#050505]">
      {/* Background Blur */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-[140px]" />
      <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-orange-400/10 blur-[120px]" />

      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.15),transparent_35%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/30">
            <DatabaseZap size={24} strokeWidth={2.4} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Wishint
            </h2>

            <p className="text-sm text-zinc-400">
              AI Communication Platform
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-xl">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">
            Welcome Back
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight">
            Turn your{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ideas
            </span>{" "}
            into prompts that AI truly understands.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
            Wishint helps translate human intent into clear, structured
            instructions so AI can produce exactly what you imagine.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 pt-8">
          <div>
            <p className="text-sm text-zinc-500">
              Designed for creators & developers
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
              AI
            </div>

            <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
              Prompt
            </div>

            <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
              Intent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;