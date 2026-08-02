"use client";

import { ROUTES_TRANSACTION } from "../../config-route/config-route";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import { QueryKey } from "@tanstack/react-query";
import type {
  IdTransactionsDataType,
  TransactionsDataType,
} from "../../types/transaction.type";

// * NEW TRANSACTIONS ======================
type UseMutationsNewTransactionProps = {
  queryKeyIdTransactions: QueryKey;
  refetchIdTransactions: any;
};
export const useMutationNewTransaction = ({
  queryKeyIdTransactions,
  refetchIdTransactions,
}: UseMutationsNewTransactionProps) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: newPostTransaction,
    isPending: isPendingNewPostTransaction,
  } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_TRANSACTION.POST({
        key: "newPostTransaction",
      });
      const res = await axios.post(URL, data);
      return res.data;
    },
    onMutate: async (mutate: any) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeyIdTransactions }),
        // queryClient.cancelQueries({ queryKey: queryKeyProjectList }),
      ]);

      const prevIdTransactions = queryClient.getQueryData(
        queryKeyIdTransactions,
      );
      // const prevProjectList = queryClient.getQueryData(queryKeyProjectList);

      if (!queryKeyIdTransactions) refetchIdTransactions();

      queryClient.setQueryData<InfiniteData<IdTransactionsDataType[]>>(
        queryKeyIdTransactions,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page: any) => ({
              ...page,
              data: [
                ...page.data,
                {
                  id: mutate.id,
                  initialName: mutate.nameTransaction,
                },
              ],
            })),
          };
        },
      );

      return { prevIdTransactions };
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevIdTransactions) {
        queryClient.setQueryData(
          queryKeyIdTransactions,
          context.prevIdTransactions,
        );
      }
    },
  });

  return { newPostTransaction, isPendingNewPostTransaction };
};

// * EXISTS TRANSACTIONS ======================
type UseMutationTransactionProps = {
  queryKeyTransactions: QueryKey;
};
export const useMutationTransaction = ({
  queryKeyTransactions,
}: UseMutationTransactionProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: postTransaction } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_TRANSACTION.POST({
        key: "postTransaction",
      });
      const res = await axios.post(URL, data);
      return res.data;
    },
    onMutate: async (mutate: any) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeyTransactions }),
        // queryClient.cancelQueries({ queryKey: queryKeyProjectList }),
      ]);

      const prevTransactions = queryClient.getQueryData(queryKeyTransactions);

      if (!prevTransactions) {
        queryClient.invalidateQueries({
          queryKey: queryKeyTransactions,
        });
      }

      queryClient.setQueryData<InfiniteData<TransactionsDataType[]>>(
        queryKeyTransactions,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page: any) => ({
              ...page,
              data: [
                ...page.data,
                {
                  id: mutate.id,
                  refId: mutate.existId,
                  information: mutate.information,
                  nominal: mutate.nominal,
                  createdAt: mutate.date,
                  updatedAt: mutate.date,
                  status: mutate.status,
                  images: mutate.images,
                },
              ],
            })),
          };
        },
      );

      return { prevTransactions };
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevTransactions) {
        queryClient.setQueryData(
          queryKeyTransactions,
          context.prevTransactions,
        );
      }
    },
  });

  return { postTransaction };
};

// * UPDATE TRANSACTIONS ======================
type UseMutationPutTranscationProps = {
  currentPath: string;
  queryKeyTransactions: QueryKey;
};
export const useMutationPutTranscation = ({
  currentPath,
  queryKeyTransactions,
}: UseMutationPutTranscationProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: putTransaction, isPending: isPendingPutTransaction } =
    useMutation({
      mutationFn: async (data) => {
        const URL = ROUTES_TRANSACTION.PUT({
          key: "putTransaction",
          currentPath: currentPath,
        });
        const res = await axios.put(URL, data);
        return res.data;
      },
      onMutate: () => {
        const prevPutTransaction =
          queryClient.getQueryData(queryKeyTransactions);

        return { prevPutTransaction };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeyTransactions,
        });
      },
      onError: (error, _variables, context) => {
        console.error(error);
        if (context?.prevPutTransaction) {
          queryClient.setQueryData(
            queryKeyTransactions,
            context.prevPutTransaction,
          );
        }
      },
    });

  return { putTransaction, isPendingPutTransaction };
};

// * DELETE TRANSACTIONS ======================
type UseMutationDeleteTransactionProps = {
  currentPath: string;
  queryKeyTransactions: QueryKey;
};
export const useMutationDeleteTransaction = ({
  currentPath,
  queryKeyTransactions,
}: UseMutationDeleteTransactionProps) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteTransaction,
    isPending: isPendingDeleteTransaction,
  } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_TRANSACTION.DELETE({
        key: "deleteTransaction",
        currentPath: currentPath,
      });
      const res = await axios.delete(URL, { data });
      return res.data;
    },
    onMutate: async (mutate: {
      id: string;
      refId: string;
      nominal: number;
      information: string;
    }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeyTransactions }),
      ]);

      const prevTransactions = queryClient.getQueryData(queryKeyTransactions);

      queryClient.setQueryData<InfiniteData<TransactionsDataType[]>>(
        queryKeyTransactions,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page: any) => ({
              ...page,
              data: page?.data.filter(
                (f: { id: string }) => f.id !== mutate.id,
              ),
            })),
          };
        },
      );

      return { prevTransactions };
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevTransactions) {
        queryClient.setQueryData(
          queryKeyTransactions,
          context.prevTransactions,
        );
      }
    },
  });

  return { deleteTransaction, isPendingDeleteTransaction };
};
