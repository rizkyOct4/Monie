"use client";

import { useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const acceptCookies = () => {
    document.cookie =
      "cookie-consent=accepted; path=/; max-age=31536000; SameSite=Lax";

    setVisible(false);

    window.location.reload();
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-zinc-950 p-5 shadow-2xl">
      <p className="text-sm text-zinc-400">
        Kami menggunakan cookie untuk menjaga sesi dan meningkatkan pengalaman
        penggunaan Monie.
      </p>

      <button
        onClick={acceptCookies}
        className="mt-4 rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-black"
      >
        Accept Cookies
      </button>
    </div>
  );
}
