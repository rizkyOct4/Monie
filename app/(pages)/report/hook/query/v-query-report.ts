"use client"

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ROUTES_REPORT } from "../../config-route/config-route";
import type { TVTotalTransactions } from "../../types/report.type";

type TUseVQueryTransactions = {
  publicId: string;
  currentPath: string;
};

export const useVQueryTransactions = ({
  publicId,
  currentPath,
}: TUseVQueryTransactions) => {
  const IdSearchParams = useSearchParams().get("id") ?? "";
  const VSearchParams = useSearchParams().get("v") ?? "";

  const {
    data: VTotalTransactions,
    isFetching: isFVTotalTransactions,
    refetch: rfVTotalTransactions,
    fetchNextPage: FNPVTotalTransactions,
    hasNextPage: HNPVTotalTransactions,
    isFetchingNextPage: IFNPTransactionList,
  } = useInfiniteQuery({
    queryKey: ["keyVTotalTransactions", publicId, IdSearchParams, VSearchParams],
    queryFn: async ({ pageParam = 1 }) => {
      const limit = 10;
      const URL = ROUTES_REPORT.GET({
        key: "viewTotalTransactions",
        currentPath: currentPath,
        view: VSearchParams,
        id: IdSearchParams,
        pageParam: pageParam,
        limit: limit,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    initialPageParam: 1,
    enabled: !!VSearchParams && currentPath === "/report",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  const VTotalTransactionsData: TVTotalTransactions[] = useMemo(
    () => VTotalTransactions?.pages.flatMap((page) => page.data) ?? [],
    [VTotalTransactions?.pages],
  );

  return {
    VTotalTransactionsData,
  };
};
