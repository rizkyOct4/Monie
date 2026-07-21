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
  // console.log(insightData);
  return (
    <section
      className="border-b border-zinc-200 py-6"
      data-testid="insight-report-section"
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Insight Keuangan
      </h2>

      {Array.isArray(insightData) && insightData.length > 0
        ? insightData.map((i, idx) => (
            <div className="flex flex-col gap-4" key={idx}>
              <div className="flex justify-between">
                <span className="text-white">Total Transaksi</span>

                <span
                  className="font-medium text-white"
                  data-testid="insight-report-total-transaction"
                >
                  {i.totalTransaction}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white">Pengeluaran Terbesar</span>

                <span
                  className="font-medium text-red-500"
                  data-testid="insight-report-biggest-expense"
                >
                  {FormatCurrency(i.biggestExpense.amount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white">Rata-rata Pengeluaran / Hari</span>

                <span
                  className="font-medium text-yellow-500"
                  data-testid="insight-report-average-expense"
                >
                  {FormatCurrency(i.averageExpense)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white">Hari Paling Boros</span>

                <span
                  className="font-medium text-orange-500"
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
