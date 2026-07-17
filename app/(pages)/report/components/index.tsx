"use client";

import HeaderReport from "./header";
import { FormatCurrency } from "@/_utils/format-currency";
import FinanceHealth from "./finance-health";
import ReportInsight from "./insight";
import { useContext } from "react";
import { ReportContext } from "@/app/context/context";

const categories = [
  {
    name: "Makan & Minum",
    amount: 700000,
    percentage: 35,
  },
  {
    name: "Transportasi",
    amount: 500000,
    percentage: 25,
  },
  {
    name: "Belanja",
    amount: 400000,
    percentage: 20,
  },
  {
    name: "Tagihan",
    amount: 300000,
    percentage: 15,
  },
  {
    name: "Lainnya",
    amount: 100000,
    percentage: 5,
  },
];

const ReportClient = () => {
  const { IdPeriodTransactionData } = useContext(ReportContext);

  const insightData = IdPeriodTransactionData[0]?.insight[0]

  return (
    <main className="flex flex-col px-6 py-4 w-full">
      {/* Header */}
      <HeaderReport />

      {/* Kesehatan Finansial */}
      <FinanceHealth />

      {/* Insight */}
      <ReportInsight insightData={insightData}/>
    </main>
  );
};

export default ReportClient;
