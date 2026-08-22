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
import { useSearchParams } from "next/navigation";

// * PERIOD TRANSACTIONS ======================
export const getCurrentPeriod = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}`;
};
export const useQueryPeriodTransactions = ({
  publicId,
  currentPath,
}: {
  publicId: string;
  currentPath: string;
}) => {
  const [period, setPeriod] = useState(getCurrentPeriod());

  const {
    data: periodTransaction,
    isFetching: isFetchingPeriodTransaction,
    refetch: refetchPeriodTransaction,
  } = useQuery({
    queryKey: ["keyPeriodTransaction", publicId, period],
    queryFn: async () => {
      const URL = ROUTES_REPORT.GET({
        key: "periodTransactions",
        currentPath: currentPath,
        period: period,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    enabled: !!period,
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
    refetchPeriodTransaction,
  };
};

// * ID PERIOD TRANSACTIONS ======================
export const useQueryPeriodIdTransactions = ({
  publicId,
  currentPath,
}: {
  publicId: string;
  currentPath: string;
}) => {
  const pSearchParams = useSearchParams().get("p") ?? "";
  const searchParams = useSearchParams().get("id") ?? "";

  const [idPeriod, setIdPeriod] = useState("");

  const {
    data: idPeriodTransaction,
    isFetching: isFetchingIdPeriodTransaction,
    refetch: refetchPeriodIdTransaction,
  } = useQuery({
    queryKey: ["keyIdPeriodTransaction", publicId, pSearchParams, searchParams],
    queryFn: async () => {
      const URL = ROUTES_REPORT.GET({
        key: "idPeriodTransactions",
        currentPath: currentPath,
        idPeriod: searchParams,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    enabled: !!searchParams && currentPath === "/report",
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
    refetchPeriodIdTransaction,
  };
};

