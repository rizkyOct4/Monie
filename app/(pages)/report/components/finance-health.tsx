"use client";

import { FormatCurrency } from "@/_utils/format-currency";
import { ReportSkeleton } from "../skeleton/report-skeleton";

type FinanceHealthProps = {
  salaryIncome: number;
  salaryRemaining: number;
  isFetchingIdPeriodTransaction: boolean;
};

const FinanceHealth = ({
  salaryIncome,
  salaryRemaining,
  isFetchingIdPeriodTransaction,
}: FinanceHealthProps) => {
  const savingPercentage = Math.round((salaryRemaining / salaryIncome) * 100);
  const usedMoney = salaryIncome - salaryRemaining;
  const expensePercentage = 100 - savingPercentage;

  const getSavingStatus = (savingPercentage: number) => {
    switch (true) {
      case savingPercentage >= 70:
        return {
          status: "Sangat Baik",
          statusColor: "text-emerald-600",
        };

      case savingPercentage >= 50:
        return {
          status: "Baik",
          statusColor: "text-green-500",
        };

      case savingPercentage >= 30:
        return {
          status: "Cukup",
          statusColor: "text-yellow-500",
        };

      default:
        return {
          status: "Buruk",
          statusColor: "text-red-500",
        };
    }
  };

  const { status, statusColor } = getSavingStatus(savingPercentage);
  return (
    <section className="rounded-2xl border border-zinc-800 p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <span className="text-sm font-semibold text-emerald-400">%</span>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Kesehatan Finansial
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Ringkasan kondisi keuangan kamu
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Sisa Saldo */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-200">
                Persentase Sisa Saldo
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Saldo yang masih tersedia
              </p>
            </div>

            <div className="text-right">
              {isFetchingIdPeriodTransaction ? (
                <ReportSkeleton type="salaryRemaining" />
              ) : (
                <>
                  <span className="font-semibold text-emerald-400">
                    {savingPercentage}%
                  </span>

                  <p className="mt-1 text-xs text-zinc-500">
                    {FormatCurrency(salaryRemaining)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
            {isFetchingIdPeriodTransaction ? (
              <ReportSkeleton type="percentage" />
            ) : (
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${savingPercentage}%` }}
              />
            )}
          </div>
        </div>

        {/* Pengeluaran */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-200">
                Persentase Pengeluaran
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Total dana yang telah digunakan
              </p>
            </div>

            <div className="text-right">
              {isFetchingIdPeriodTransaction ? (
                <ReportSkeleton type="expensePercentage" />
              ) : (
                <>
                  <span className="font-semibold text-red-400">
                    {expensePercentage}%
                  </span>

                  <p className="mt-1 text-xs text-zinc-500">
                    {FormatCurrency(usedMoney)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
            {isFetchingIdPeriodTransaction ? (
              <ReportSkeleton type="percentage" />
            ) : (
              <div
                className="h-full rounded-full bg-red-500 transition-all"
                style={{ width: `${expensePercentage}%` }}
              />
            )}
          </div>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-200">Status</p>

              <p className="mt-1 text-xs text-zinc-500">
                Kondisi keuangan saat ini
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${statusColor}`} />

              <span className={`font-semibold ${statusColor}`}>{status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinanceHealth;
