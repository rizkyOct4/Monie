"use client";

import {
  useQueryPeriodTransactions,
  useQueryPeriodIdTransactions,
} from "./query/query-index";
import { useVQueryTransactions } from "./query/v-query-report";


export const useHookReport = (currentPath: string, publicId: string) => {
  // * GET PERIOD
  const QGetPeriod = useQueryPeriodTransactions({ publicId, currentPath });
  const QGetIdPeriod = useQueryPeriodIdTransactions({ publicId, currentPath });

  // GET VIEW
  const QVGet = useVQueryTransactions({ publicId, currentPath });

  const values = {
    ...QGetPeriod,
    ...QGetIdPeriod,
    ...QVGet,
  };

  return values;
};
