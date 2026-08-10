"use client";

import { useContext } from "react";
import { ReportContext } from "@/app/context/context";
import { FormatCurrency } from "@/_utils/format-currency";

const FinanceHealth = () => {
  const { IdPeriodTransactionData } = useContext(ReportContext);

  const salaryIncome = IdPeriodTransactionData[0]?.salaryIncome;
  const salaryRemaining = IdPeriodTransactionData[0]?.salaryRemaining;

  const savingPercentage = Math.round((salaryRemaining / salaryIncome) * 100);

  const usedMoney = salaryIncome - salaryRemaining;

  const expensePercentage = 100 - savingPercentage;

  let status = "";
  let statusColor = "";

  switch (true) {
    case savingPercentage >= 70:
      status = "Sangat Baik";
      statusColor = "text-emerald-600";
      break;

    case savingPercentage >= 50:
      status = "Baik";
      statusColor = "text-green-500";
      break;

    case savingPercentage >= 30:
      status = "Cukup";
      statusColor = "text-yellow-500";
      break;

    default:
      status = "Buruk";
      statusColor = "text-red-500";
  }

  // if (savingPercentage >= 70) {
  //   status = "Sangat Baik";
  //   statusColor = "text-emerald-600";
  // } else if (savingPercentage >= 50) {
  //   status = "Baik";
  //   statusColor = "text-green-500";
  // } else if (savingPercentage >= 30) {
  //   status = "Cukup";
  //   statusColor = "text-yellow-500";
  // } else {
  //   status = "Boros";
  //   statusColor = "text-red-500";
  // }

  // return (
  //   <section className="border-b border-zinc-200 py-6">
  //     <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
  //       Kesehatan Finansial
  //     </h2>

  //     <div className="flex flex-col gap-4">
  //       <div className="flex justify-between">
  //         <span className="text-white">Persentase Sisa Saldo</span>

  //         <span className="font-medium text-blue-500">
  //           {savingPercentage}% - {FormatCurrency(salaryRemaining)}
  //         </span>
  //       </div>

  //       <div className="flex justify-between">
  //         <span className="text-white">Persentase Pengeluaran</span>

  //         <span className="font-medium text-red-500">
  //           {expensePercentage}% - {FormatCurrency(usedMoney)}
  //         </span>
  //       </div>

  //       <div className="flex justify-between">
  //         <span className="text-white">Status</span>

  //         <span className={`font-medium ${statusColor}`}>{status}</span>
  //       </div>
  //     </div>
  //   </section>
  // );
return (
  <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm">
    {/* Header */}
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
          <span className="text-sm font-semibold text-emerald-400">
            %
          </span>
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
            <span className="font-semibold text-emerald-400">
              {savingPercentage}%
            </span>

            <p className="mt-1 text-xs text-zinc-500">
              {FormatCurrency(salaryRemaining)}
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${savingPercentage}%` }}
          />
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
            <span className="font-semibold text-red-400">
              {expensePercentage}%
            </span>

            <p className="mt-1 text-xs text-zinc-500">
              {FormatCurrency(usedMoney)}
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-red-500 transition-all"
            style={{ width: `${expensePercentage}%` }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-200">
              Status
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Kondisi keuangan saat ini
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${statusColor}`}
            />

            <span className={`font-semibold ${statusColor}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

};

export default FinanceHealth;
