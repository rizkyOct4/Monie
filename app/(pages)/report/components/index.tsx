"use client";

import HeaderReport from "./header";
import FinanceHealth from "./finance-health";
import ReportInsight from "./insight";
import { useContext } from "react";
import { ReportContext } from "@/app/context/context";

const ReportClient = () => {
  const { IdPeriodTransactionData } = useContext(ReportContext);

  const insightData = IdPeriodTransactionData[0]?.insight

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
