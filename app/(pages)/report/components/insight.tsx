"use client";

import { FormatCurrency } from "@/_utils/format-currency";

type ReportInsightProps = {
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
  };
};

const ReportInsight = ({ insightData }: ReportInsightProps) => {
  // console.log(insightData);
  return (
    <section className="border-b border-zinc-200 py-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Insight Keuangan
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-white">Total Transaksi</span>

          <span className="font-medium text-white">
            {insightData?.totalTransaction}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-white">Pengeluaran Terbesar</span>

          <span className="font-medium text-red-500">
            {FormatCurrency(insightData?.biggestExpense.amount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-white">Rata-rata Pengeluaran / Hari</span>

          <span className="font-medium text-yellow-500">
            {FormatCurrency(insightData?.averageExpense)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-white">Hari Paling Boros</span>

          <span className="font-medium text-orange-500">
            {insightData?.mostExpensiveDay.amount}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ReportInsight;
