"use client";

import { FormatCurrency } from "@/_utils/format-currency";
import { ReportSkeleton } from "../skeleton/report-skeleton";
import { FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export type ReportInsightProps = {
  insightData: {
    totalTransaction: number;
    biggestExpense: {
      date: Date;
      amount: number;
    } | null;
    averageExpense: number;
    amountNominal: number;
    mostExpensiveDay: {
      date: Date;
      amount: number;
    } | null;
  };
  isFetchingIdPeriodTransaction: boolean;
};

const ReportInsight = ({
  insightData,
  isFetchingIdPeriodTransaction,
}: ReportInsightProps) => {

  const p = useSearchParams().get("p") ?? "";
  const id = useSearchParams().get("id") ?? "";

  const totalTransaction = insightData?.totalTransaction;
  const biggestExpense = insightData?.biggestExpense;
  const averageExpense = insightData?.averageExpense;
  const mostExpensiveDay = insightData?.mostExpensiveDay;

  return (
    <section
      className="rounded-2xl border border-zinc-800 p-5 shadow-sm"
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

      <div className="flex flex-col gap-3">
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

          {isFetchingIdPeriodTransaction ? (
            <ReportSkeleton type="totaltransactions" />
          ) : (
            <div className="flex gap-4 items-center justify-center">
              <Link
                href={`/report?${new URLSearchParams({
                  p,
                  id,
                  v: "total-transaction",
                }).toString()}`}
              >
                <FaChevronRight className="text-xs text-zinc-600" />
              </Link>

              <p
                className="text-lg font-semibold text-white"
                data-testid="insight-report-total-transaction"
              >
                {totalTransaction}
              </p>
            </div>
          )}
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

          {isFetchingIdPeriodTransaction ? (
            <ReportSkeleton type="biggestExpense" />
          ) : (
            <span
              className="text-right text-sm font-semibold text-red-400"
              data-testid="insight-report-biggest-expense"
            >
              {FormatCurrency(biggestExpense?.amount ?? null)}
            </span>
          )}
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

          {isFetchingIdPeriodTransaction ? (
            <ReportSkeleton type="averageExpense" />
          ) : (
            <span
              className="text-right text-sm font-semibold text-yellow-400"
              data-testid="insight-report-average-expense"
            >
              {FormatCurrency(averageExpense)}
            </span>
          )}
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

          {isFetchingIdPeriodTransaction ? (
            <ReportSkeleton type="mostExpensiveDay" />
          ) : (
            <span
              className="text-right text-sm font-semibold text-orange-400"
              data-testid="insight-report-most-expensive-day"
            >
              {FormatCurrency(mostExpensiveDay?.amount ?? null)}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReportInsight;
