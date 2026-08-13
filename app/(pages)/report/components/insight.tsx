"use client";

import { FormatCurrency } from "@/_utils/format-currency";

export type ReportInsightProps = {
  insightData: {
    totalTransaction: number;
    biggestExpense: {
      date: Date;
      amount: number;
    };
    averageExpense: number;
    amountNominal: number;
    mostExpensiveDay: {
      date: Date;
      amount: number;
    };
  }[];
};

const ReportInsight = ({ insightData }: ReportInsightProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm"
      role="dialog"
      aria-label="Insight Section"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <span className="text-sm font-semibold text-emerald-400">✦</span>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Insight Keuangan
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Ringkasan aktivitas keuangan kamu
            </p>
          </div>
        </div>
      </div>

      {Array.isArray(insightData) && insightData.length > 0
        ? insightData.map((i, idx) => (
            <div className="flex flex-col gap-3" key={idx}>
              {/* Total Transaksi */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div>
                  <span className="text-sm font-medium text-zinc-200">
                    Total Transaksi
                  </span>

                  <p className="mt-1 text-xs text-zinc-500">
                    Jumlah transaksi pada periode ini
                  </p>
                </div>

                <span
                  className="text-lg font-semibold text-white"
                  data-testid="insight-report-total-transaction"
                >
                  {i.totalTransaction}
                </span>
              </div>

              {/* Pengeluaran Terbesar */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div>
                  <span className="text-sm font-medium text-zinc-200">
                    Pengeluaran Terbesar
                  </span>

                  <p className="mt-1 text-xs text-zinc-500">
                    Transaksi dengan nominal terbesar
                  </p>
                </div>

                <span
                  className="text-right text-sm font-semibold text-red-400"
                  data-testid="insight-report-biggest-expense"
                >
                  {FormatCurrency(i.biggestExpense.amount)}
                </span>
              </div>

              {/* Rata-rata Pengeluaran */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div>
                  <span className="text-sm font-medium text-zinc-200">
                    Rata-rata Pengeluaran / Hari
                  </span>

                  <p className="mt-1 text-xs text-zinc-500">
                    Rata-rata dana yang digunakan setiap hari
                  </p>
                </div>

                <span
                  className="text-right text-sm font-semibold text-yellow-400"
                  data-testid="insight-report-average-expense"
                >
                  {FormatCurrency(i.averageExpense)}
                </span>
              </div>

              {/* Hari Paling Boros */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div>
                  <span className="text-sm font-medium text-zinc-200">
                    Hari Paling Boros
                  </span>

                  <p className="mt-1 text-xs text-zinc-500">
                    Hari dengan total pengeluaran tertinggi
                  </p>
                </div>

                <span
                  className="text-right text-sm font-semibold text-orange-400"
                  data-testid="insight-report-most-expensive-day"
                >
                  {i.mostExpensiveDay.amount}
                </span>
              </div>
            </div>
          ))
        : null}
    </section>
  );
};

export default ReportInsight;
