"use client";

import { useState, useCallback, memo } from "react";
import NewTransaction from "./new-transaction";
import ExistedTransactions from "./existed-transaction";
import { X } from "lucide-react";

type OptionsFormPostProps = {
  onClose: () => void;
};

const OptionsFormPost = ({ onClose }: OptionsFormPostProps) => {
  const [isNewTransaction, setIsNewTransaction] = useState("New");

  const handleAction = useCallback((actionType: string) => {
    switch (actionType) {
      case "newTransaction": {
        setIsNewTransaction((prev) => (prev === "New" ? "Existed" : "New"));
        break;
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-102 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Tambah Transaksi
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Tambahkan transaksi baru atau pilih transaksi yang sudah ada
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label={`Handler Options Btn ${isNewTransaction}`}
              onClick={() => handleAction("newTransaction")}
              type="button"
              className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              {isNewTransaction === "New" ? "New" : "Existed"}
            </button>

            <button
              aria-label="Close Btn"
              onClick={onClose}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-6">
            {isNewTransaction === "New" ? (
              <NewTransaction
                onClose={() =>
                  setIsNewTransaction((prev) =>
                    prev === "New" ? "Existed" : "New",
                  )
                }
              />
            ) : (
              <ExistedTransactions onClose={onClose} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OptionsFormPost);
