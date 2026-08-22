"use client";

import FinanceHealth from "./finance-health";
import ReportInsight from "./insight";
import { useContext, useMemo } from "react";
import { ReportContext } from "@/app/context/context";
import { useSearchParams } from "next/navigation";
import TotalTransaction from "../(v)/total-transactions/total-transaction";

const ReportClient = () => {
  const {
    IdPeriodTransactionData,
    idPeriod,
    isFetchingIdPeriodTransaction,
    VTotalTransactionsData,
  } = useContext(ReportContext);

  const searchParams = useSearchParams().get("v") ?? "";

  const Render = useMemo(() => {
    switch (searchParams) {
      case "total-transaction":
        return <TotalTransaction data={VTotalTransactionsData}/>;
      default:
        const salaryIncome = idPeriod
          ? IdPeriodTransactionData[0]?.salaryIncome
          : 0;
        const salaryRemaining = idPeriod
          ? IdPeriodTransactionData[0]?.salaryRemaining
          : 0;
        const insightData = idPeriod
          ? IdPeriodTransactionData[0]?.insight[0]
          : {};
        return (
          <>
            <FinanceHealth
              salaryIncome={salaryIncome}
              salaryRemaining={salaryRemaining}
              isFetchingIdPeriodTransaction={isFetchingIdPeriodTransaction}
            />

            <ReportInsight
              insightData={insightData}
              isFetchingIdPeriodTransaction={isFetchingIdPeriodTransaction}
            />
          </>
        );
    }
  }, [
    IdPeriodTransactionData,
    idPeriod,
    isFetchingIdPeriodTransaction,
    searchParams,
  ]);

  return Render;
};

export default ReportClient;
