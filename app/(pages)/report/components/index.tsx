"use client";

import HeaderReport from "./header";
import FinanceHealth from "./finance-health";
import ReportInsight from "./insight";
import { useContext } from "react";
import { ReportContext } from "@/app/context/context";

const ReportClient = () => {
  const { IdPeriodTransactionData, idPeriod } = useContext(ReportContext);

  const salaryIncome = idPeriod ? IdPeriodTransactionData[0]?.salaryIncome : 0;
  const salaryRemaining = idPeriod
    ? IdPeriodTransactionData[0]?.salaryRemaining
    : 0;
  const insightData = idPeriod ? IdPeriodTransactionData[0]?.insight : [];

  return (
    <main className="flex flex-col p-6 w-full min-h-screen relative gap-4">
      <HeaderReport />

      <FinanceHealth
        salaryIncome={salaryIncome}
        salaryRemaining={salaryRemaining}
      />

      <ReportInsight insightData={insightData} />
    </main>
  );
};

export default ReportClient;
