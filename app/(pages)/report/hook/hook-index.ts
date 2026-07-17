"use client";

import { useQueryPeriodTransactions, useQueryPeriodYearTransactions } from "./query/query-index";

export const useHookReport = (publicId: string) => {
  // * GET PERIOD
  const QGetPeriod = useQueryPeriodTransactions({ publicId });
  const QGetIdPeriod = useQueryPeriodYearTransactions({ publicId });

  return { ...QGetPeriod, ...QGetIdPeriod };
};
