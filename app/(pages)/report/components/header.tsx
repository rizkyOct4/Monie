"use client";

import { ChevronDown } from "lucide-react";
import { useState, useContext, memo, useCallback } from "react";
import { ReportContext } from "@/app/context/context";
import { Spokes } from "@/components/ui/spokes";

const HeaderReport = () => {
  const {
    setPeriod,
    PeriodTransactionData,
    isFetchingPeriodTransaction,
    setIdPeriod,
  } = useContext(ReportContext);

  const [transactionName, setTransactionName] = useState("");
  const [openTransaction, setOpenTransaction] = useState(false);

  const handleAction = useCallback(
    (actionType: string, initialName: string, id: string) => {
      switch (actionType) {
        case "openTransaction": {
          setOpenTransaction((prev) => !prev);
          break;
        }
        case "selectTransaction": {
          setTransactionName(initialName);
          setOpenTransaction(false);
          setIdPeriod(id);
          break;
        }
      }
    },
    [setIdPeriod],
  );

return (
  <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm sticky top-6">
    {/* Header */}
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
          <span className="text-sm font-semibold text-emerald-400">
            Rp
          </span>
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Laporan
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Analisis Keuangan
          </p>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      {/* PERIODE */}
      <div className="relative w-full sm:w-48">
        <label
          htmlFor="period-input"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500"
        >
          Periode
        </label>

        <input
          data-testid="period-input"
          id="period-input"
          type="month"
          className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm font-medium text-zinc-200 outline-none transition placeholder:text-zinc-600 hover:border-zinc-700 focus:border-emerald-500/50 focus:bg-zinc-950 focus:ring-2 focus:ring-emerald-500/10"
          onChange={(e) => setPeriod(e.target.value)}
        />
      </div>

      {/* TRANSAKSI */}
      <div className="relative w-full sm:w-60">
        <label
          htmlFor="transaction-button"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500"
        >
          Transaksi
        </label>

        <button
          data-testid="transaction-button"
          id="transaction-button"
          type="button"
          onClick={() => handleAction("openTransaction", "", "")}
          className="flex h-11 w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 text-sm font-medium text-zinc-200 outline-none transition hover:border-zinc-700 hover:bg-zinc-900 focus:border-emerald-500/50 focus:bg-zinc-950 focus:ring-2 focus:ring-emerald-500/10"
        >
          <span className="truncate">
            {transactionName}
          </span>

          <ChevronDown
            size={18}
            className={`shrink-0 text-zinc-500 transition ${
              openTransaction
                ? "rotate-180 text-emerald-400"
                : ""
            }`}
          />
        </button>

        {openTransaction && (
          <div
            data-testid="transaction-dropdown"
            className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-2xl shadow-black/30"
          >
            {isFetchingPeriodTransaction ? (
              <div
                data-testid="loading-transaction"
                className="flex items-center gap-2 px-3 py-3 text-sm text-zinc-500"
              >
                <Spokes className="size-4 animate-spin text-emerald-400" />
                <span>Dalam Progres...</span>
              </div>
            ) : (
              Array.isArray(PeriodTransactionData) &&
              PeriodTransactionData.map(
                (i: { id: string; initialName: string }) => (
                  <button
                    data-testid={`transaction-item-${i.id}`}
                    key={i.id}
                    type="button"
                    onClick={() =>
                      handleAction(
                        "selectTransaction",
                        i.initialName,
                        i.id,
                      )
                    }
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  >
                    {i.initialName}
                  </button>
                ),
              )
            )}
          </div>
        )}
      </div>
    </div>
  </section>
);

};

export default memo(HeaderReport);
