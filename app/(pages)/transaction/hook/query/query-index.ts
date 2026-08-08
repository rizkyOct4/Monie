"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { ROUTES_TRANSACTION } from "../../config-route/config-route";
import type {
  IdTransactionsDataType,
  TransactionsDataType,
} from "../../types/transaction.type";

// * ID TRANSACTIONS ======================
export const useQueryIdTransactions = ({
  publicId,
  currentPath,
}: UseQueryTransactionsProps) => {
  const [isOpenIdTransaction, setIsOpenIdTransaction] = useState(false);

  // * ID TRANSACTIONS ======================
  const { data: fIdTransactionsList, refetch: idTransactionsListRefetch } =
    useInfiniteQuery({
      queryKey: ["keyIdTransactionsList", publicId],
      queryFn: async ({ pageParam = 1 }) => {
        const limit = 15;
        const URL = ROUTES_TRANSACTION.GET({
          key: "idTransactions",
          currentPath: "/transaction",
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
      enabled: isOpenIdTransaction,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
      refetchOnMount: false, // "always" => refetch jika stale saja
      retry: false,
    });

  const IdTransactionsListData: IdTransactionsDataType[] = useMemo(
    () => fIdTransactionsList?.pages.flatMap((page) => page.data) ?? [],
    [fIdTransactionsList?.pages],
  );

  // * SEARCH ID TRANSACTIONS ======================
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(search);
    }, 600);
    return () => clearTimeout(timeout);
  }, [search]);

  const {
    data: searchIdTransaction,
    isFetching: isFetchingSearchIdTransaction,
  } = useQuery({
    queryKey: ["keySearchIdTransaction", publicId, debounceSearch],
    queryFn: async () => {
      const URL = ROUTES_TRANSACTION.GET({
        key: "searchTransactions",
        currentPath: "/transaction",
        search: debounceSearch,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    enabled: debounceSearch !== "",
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  const SearchIdTransactionData: IdTransactionsDataType[] = useMemo(
    () => searchIdTransaction ?? [],
    [searchIdTransaction],
  );

  return {
    IdTransactionsListData,
    idTransactionsListRefetch,
    queryKeyIdTransactions: ["keyIdTransactionsList", publicId],
    isOpenIdTransaction,
    setIsOpenIdTransaction,

    // * SEARCH
    search,
    setSearch,
    SearchIdTransactionData,
    isFetchingSearchIdTransaction,
  };
};

// * TRANSACTIONS ======================
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

  const {
    data: fTransactionsList,
    isFetching: isFTransactionsListData,
    refetch: TransactionsListRefetch,
  } = useInfiniteQuery({
    queryKey: ["keyTransactionsList", publicId, date],
    queryFn: async ({ pageParam = 1 }) => {
      const limit = 15;
      const URL = ROUTES_TRANSACTION.GET({
        key: "transactions",
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
    enabled: !!date && currentPath === "/transaction",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  const TransactionsListData: TransactionsDataType[] = useMemo(
    () => fTransactionsList?.pages.flatMap((page) => page.data) ?? [],
    [fTransactionsList?.pages],
  );

  return {
    TransactionsListData,
    isFTransactionsListData,
    TransactionsListRefetch,
    date,
    setDate,
    queryKeyTransactions: ["keyTransactionsList", publicId, date],
  };
};
