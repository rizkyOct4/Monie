"use client";

import { useState, useCallback, memo, useMemo } from "react";
import NewTransaction from "./new-transaction";
import ExistedTransactions from "./existed-transaction";
import { ChevronDown, X } from "lucide-react";

type OptionsFormPostProps = {
  onClose: () => void;
};

const ModeOptions = [
  { value: "New" },
  { value: "Existed" },
  { value: "Add Income" },
];

type TransactionMode = "New" | "Existed" | "Add Income" | "openTransactionType";

const OptionsFormPost = ({ onClose }: OptionsFormPostProps) => {
  const [openTransactionType, setOpenTransactionType] = useState(false);
  const [transactionMode, setTransactionMode] =
    useState<TransactionMode>("Existed");

  const handleAction = useCallback((actionType: string) => {
    switch (actionType) {
      case "openTransactionType": {
        setOpenTransactionType((prev) => !prev);
      }
      case "New":
      case "Existed":
      case "Add Income": {
        setTransactionMode(actionType);
        break;
      }
    }
  }, []);

  const Render = useMemo(() => {
    switch (transactionMode) {
      case "New": {
        return <NewTransaction onClose={() => setTransactionMode("Existed")} />;
      }
      case "Existed": {
        <ExistedTransactions onClose={onClose} />;
      }
      default:
        return null;
      // case "New": {
      //   return <NewTransaction onClose={() => setTransactionMode("Existed")} />;
      // }
    }
  }, [onClose, transactionMode]);

  return (
    <div className="fixed inset-0 z-102 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="flex h-auto max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
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
            <div className="relative">
              <button
                type="button"
                aria-label={`Handler Options Btn ${transactionMode}`}
                onClick={() => handleAction("openTransactionType")}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
              >
                <span>{transactionMode}</span>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    openTransactionType ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>

              {openTransactionType && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-30 mt-2 w-36 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-xl"
                >
                  {ModeOptions.map((i) => (
                    <button
                      key={i.value}
                      type="button"
                      role="menuitem"
                      onClick={() => handleAction(i.value)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      {i.value}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
          <div className="flex flex-col gap-6">{Render}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(OptionsFormPost);
