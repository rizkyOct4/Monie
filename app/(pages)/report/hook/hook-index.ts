"use client";

import {
  useQueryPeriodTransactions,
  useQueryPeriodIdTransactions,
} from "./query/query-index";
import { useSessionClient } from "@/_lib/c-session";

export const useHookReport = () => {
  const { publicId } = useSessionClient();

  // * GET PERIOD
  const QGetPeriod = useQueryPeriodTransactions({ publicId });
  const QGetIdPeriod = useQueryPeriodIdTransactions({ publicId });

  const values = {
    ...QGetPeriod,
    ...QGetIdPeriod,
  };

  return values;
};
