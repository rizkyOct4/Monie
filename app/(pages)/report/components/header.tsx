"use client";

import { ChevronDown } from "lucide-react";
import { useState, useContext } from "react";
import { ReportContext } from "@/app/context/context";

const HeaderReport = () => {
  const { setPeriod, PeriodTransactionData, setIdPeriod } = useContext(ReportContext);

  const [transactionName, setTransactionName] = useState("");

  const [openTransaction, setOpenTransaction] = useState(false);

  return (
    <section className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">Laporan</h1>

        <p className="mt-1 text-sm text-zinc-400">Analisis Keuangan</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* PERIODE */}
        <div className="relative w-48">
          {/* Header */}
          <input
            type="month"
            className=" border border-zinc-800 bg-white px-3 py-2 text-sm text-black outline-none"
            onChange={(e) => setPeriod(e.target.value)}
          />
        </div>

        {/* TRANSAKSI */}
        <div className="relative w-60">
          <button
            type="button"
            onClick={() => setOpenTransaction(!openTransaction)}
            className="flex w-full items-center justify-between border border-zinc-700 bg-white px-3 py-2 text-sm text-black"
          >
            {transactionName ?? ""}

            <ChevronDown
              size={18}
              className={`transition ${openTransaction ? "rotate-180" : ""}`}
            />
          </button>

          {openTransaction && (
            <div className="absolute left-0 top-full z-20 mt-1 w-full border border-zinc-700 bg-white">
              {PeriodTransactionData.map(
                (i: { id: string; initialName: string }) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => {
                      setTransactionName(i.initialName);
                      setOpenTransaction(false);
                      setIdPeriod(i.id)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-100"
                  >
                    {i.initialName}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderReport;
