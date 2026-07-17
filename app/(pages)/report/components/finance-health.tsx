"use client";

import { useContext } from "react";
import { ReportContext } from "@/app/context/context";
import { FormatCurrency } from "@/_utils/format-currency";

const FinanceHealth = () => {
  const { IdPeriodTransactionData } = useContext(ReportContext);

  const salaryIncome = IdPeriodTransactionData[0]?.salaryIncome;
  const salaryRemaining = IdPeriodTransactionData[0]?.salaryRemaining;

  const savingPercentage = Math.round(
    (salaryRemaining / salaryIncome) * 100
  );

  const usedMoney = salaryIncome - salaryRemaining

  const expensePercentage = 100 - savingPercentage;

  let status = "";
  let statusColor = "";


  if (savingPercentage >= 70) {
    status = "Sangat Baik";
    statusColor = "text-emerald-600";
  } else if (savingPercentage >= 50) {
    status = "Baik";
    statusColor = "text-green-500";
  } else if (savingPercentage >= 30) {
    status = "Cukup";
    statusColor = "text-yellow-500";
  } else {
    status = "Boros";
    statusColor = "text-red-500";
  }

  return (
    <section className="border-b border-zinc-200 py-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Kesehatan Finansial
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-white">
            Persentase Sisa Saldo
          </span>

          <span className="font-medium text-blue-500">
            {savingPercentage}% - {FormatCurrency(salaryRemaining)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-white">
            Persentase Pengeluaran
          </span>

          <span className="font-medium text-red-500">
            {expensePercentage}% - {FormatCurrency(usedMoney)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-white">Status</span>

          <span className={`font-medium ${statusColor}`}>
            {status}
          </span>
        </div>

      </div>
    </section>
  );
};

export default FinanceHealth;
