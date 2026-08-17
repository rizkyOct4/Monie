"use client";

import { useState, useContext, useEffect } from "react";
import { TransactionContext } from "@/app/context/context";
import { Spokes } from "@/components/ui/spokes";
import { useRouter, useSearchParams } from "next/navigation";

const OptionsIdTransactions = () => {
  const {
    IdTransactionsListData,
    isFetchingIdTransactionsList,
    isSuccessIdTransaction,
    setIsOpenIdTransaction,
  } = useContext(TransactionContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionName = searchParams.get("v") ?? "";

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Pilih ID");

  useEffect(() => {
    setIsOpenIdTransaction(true);
    if (isSuccessIdTransaction) {
      setIsOpenIdTransaction(false);
    }
  }, [isSuccessIdTransaction, setIsOpenIdTransaction, transactionName]);

  return (
    <div className="flex w-50">
      <div className="relative w-full">
        <label
          htmlFor="transactionName"
          className="mb-1 block text-xs text-gray-400"
        >
          ID TRANSAKSI *
        </label>

        <button
          aria-label="Open list ID transaction"
          type="button"
          onClick={() => setOpen(!open)}
          className=" flex w-full items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 transition hover:border-white/20 focus:border-emerald-500/40"
        >
          <span data-testid="selected-id">{transactionName || selected}</span>

          <svg
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {open && (
          <div
            className=" absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-lg animate-in fade-in slide-in-from-top-1"
            role="dialog"
            aria-label="Container List ID Transaction"
          >
            {isFetchingIdTransactionsList ? (
              <div
                role="status"
                aria-label="Loading ID Transaction"
                className="flex items-center gap-2 px-3 py-3 text-sm text-zinc-500"
              >
                <Spokes className="size-4 animate-spin text-emerald-400" />
                <span>Dalam Progres...</span>
              </div>
            ) : (
              <>
                {Array.isArray(IdTransactionsListData) &&
                  IdTransactionsListData.length > 0 &&
                  IdTransactionsListData.map((i) => (
                    <button
                      aria-label={`List ID transaction ${i.id}`}
                      key={i.id}
                      type="button"
                      onClick={() => {
                        setSelected(i.initialName);
                        setOpen(false);
                        const params = new URLSearchParams({
                          s: i.status,
                          v: i.initialName,
                        });

                        router.push(`/transaction?${params.toString()}`);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-white/5"
                    >
                      {i.initialName}
                    </button>
                  ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionsIdTransactions;
