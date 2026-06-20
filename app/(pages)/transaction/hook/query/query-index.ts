"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import { ROUTES_TRANSACTION } from "../../config-route/config-route";

type UseQueryTransactionsProps = {
  publicId: string;
  currentPath: string;
};

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const useQueryTransactions = ({
  publicId,
  currentPath,
}: UseQueryTransactionsProps) => {
  // * INITIAL STATE ============
  const [date, setDate] = useState(getToday());

  const { data: fTransactionsList, refetch: TransactionsListRefetch } =
    useInfiniteQuery({
      queryKey: ["keyTransactionsList", publicId, date],
      queryFn: async ({ pageParam = 1 }) => {
        const limit = 15;
        const URL = ROUTES_TRANSACTION.GET({
          key: "searchTransactions",
          currentPath: currentPath,
          date: date,
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
      enabled: !!date,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
      refetchOnMount: false, // "always" => refetch jika stale saja
      retry: false,
    });

  const TransactionsListData = useMemo(
    () => fTransactionsList?.pages.flatMap((page) => page.data) ?? [],
    [fTransactionsList?.pages],
  );

  //   const projectUpdateData: ProjectUpdateData[] = useMemo(
  //     () => projectUpdate ?? [],
  //     [projectUpdate],
  //   );

  return { TransactionsListData, TransactionsListRefetch, date, setDate };
};
