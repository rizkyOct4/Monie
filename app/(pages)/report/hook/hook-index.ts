"use client";

import {
  useQueryPeriodTransactions,
  useQueryPeriodIdTransactions,
} from "./query/query-index";

export const useHookReport = (currentPath: string, publicId: string) => {
  // * GET PERIOD
  const QGetPeriod = useQueryPeriodTransactions({ publicId, currentPath });
  const QGetIdPeriod = useQueryPeriodIdTransactions({ publicId, currentPath });

  const values = {
    ...QGetPeriod,
    ...QGetIdPeriod,
  };

  return values;
};
