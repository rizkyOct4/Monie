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
    <section
      data-testid="header-report"
      className="mb-8 flex items-center justify-between"
    >
      <div data-testid="title-report">
        <h1 className="text-3xl font-bold text-white">Laporan</h1>

        <p className="mt-1 text-sm text-zinc-400">Analisis Keuangan</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* PERIODE */}
        <div className="relative w-48">
          <input
            data-testid="period-input"
            type="month"
            className="border border-zinc-800 bg-white px-3 py-2 text-sm text-black outline-none"
            onChange={(e) => setPeriod(e.target.value)}
          />
        </div>

        {/* TRANSAKSI */}
        <div className="relative w-60">
          <button
            data-testid="transaction-button"
            type="button"
            onClick={() => handleAction("openTransaction", "", "")}
            className="flex w-full items-center justify-between border border-zinc-700 bg-white px-3 py-2 text-sm text-black"
          >
            {transactionName}

            <ChevronDown
              size={18}
              className={`transition ${openTransaction ? "rotate-180" : ""}`}
            />
          </button>

          {openTransaction && (
            <div
              data-testid="transaction-dropdown"
              className="absolute left-0 top-full z-20 mt-1 w-full border border-zinc-700 bg-white"
            >
              {isFetchingPeriodTransaction ? (
                <div data-testid="loading-transaction">
                  <Spokes className="size-4 animate-spin" />
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
                        handleAction("selectTransaction", i.initialName, i.id)
                      }
                      className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-100"
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
