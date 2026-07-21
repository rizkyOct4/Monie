"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import { ROUTES_REPORT } from "../../config-route/config-route";
import type {
  PeriodTransactionDataType,
  IdPeriodTransactionDataType,
} from "../../types/report.type";

// * PERIOD TRANSACTIONS ======================
export const parsePeriod = (period: string) => {
  const result = period.split("-").reverse().join("-");
  const [month, year] = result.split("-");
  return { month, year };
};
export const useQueryPeriodTransactions = ({
  publicId,
}: {
  publicId: string;
}) => {
  const [period, setPeriod] = useState("");
  const { month, year } = parsePeriod(period);

  const { data: periodTransaction, isFetching: isFetchingPeriodTransaction } =
    useQuery({
      queryKey: ["keyPeriodTransaction", publicId, month, year],
      queryFn: async () => {
        const URL = ROUTES_REPORT.GET({
          key: "periodTransactions",
          currentPath: "/report",
          month: month,
          year: year,
        });
        const { data } = await axios.get(URL);
        return data;
      },
      enabled: !!month && !!year,
      refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
      refetchOnMount: false, // "always" => refetch jika stale saja
    });

  const PeriodTransactionData: PeriodTransactionDataType[] = useMemo(
    () => periodTransaction ?? [],
    [periodTransaction],
  );

  return {
    period,
    setPeriod,
    PeriodTransactionData,
    isFetchingPeriodTransaction,
  };
};

// * ID PERIOD TRANSACTIONS ======================
export const useQueryPeriodIdTransactions = ({
  publicId,
}: {
  publicId: string;
}) => {
  const [idPeriod, setIdPeriod] = useState("");

  const {
    data: idPeriodTransaction,
    isFetching: isFetchingIdPeriodTransaction,
  } = useQuery({
    queryKey: ["keyIdPeriodTransaction", publicId, idPeriod],
    queryFn: async () => {
      const URL = ROUTES_REPORT.GET({
        key: "idPeriodTransactions",
        currentPath: "/report",
        idPeriod: idPeriod,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    enabled: !!idPeriod,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  const IdPeriodTransactionData: IdPeriodTransactionDataType[] = useMemo(
    () => idPeriodTransaction ?? [],
    [idPeriodTransaction],
  );

  return {
    idPeriod,
    setIdPeriod,
    IdPeriodTransactionData,
    isFetchingIdPeriodTransaction,
  };
};
