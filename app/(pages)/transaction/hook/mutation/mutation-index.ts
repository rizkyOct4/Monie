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
} from "../../types/types";

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

  const { mutateAsync: newPostTransaction } = useMutation({
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

  return { newPostTransaction };
};

// * EXISTS TRANSACTIONS ======================
type UseMutationTransactionProps = {
  queryKeyTransactions: QueryKey;
  refetchTransaction: any;
};
export const useMutationTransaction = ({
  queryKeyTransactions,
  refetchTransaction,
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

      if (!prevTransactions) refetchTransaction();

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
                  refId: mutate.existsId,
                  information: mutate.information,
                  nominal: mutate.nominal,
                  createdAt: mutate.date,
                  updatedAt: mutate.date,
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
export const useMutationPutTranscation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: putTransaction } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_TRANSACTION.POST({
        key: "postTransaction",
      });
      const res = await axios.post(URL, data);
      return res.data;
    },
    // onMutate: async (mutate: any) => {
    //   await Promise.all([
    //     queryClient.cancelQueries({ queryKey: queryKeyTransactions }),
    //     // queryClient.cancelQueries({ queryKey: queryKeyProjectList }),
    //   ]);

    //   const prevTransactions = queryClient.getQueryData(queryKeyTransactions);

    //   if (!prevTransactions) refetchTransaction();

    //   queryClient.setQueryData<InfiniteData<TransactionsDataType[]>>(
    //     queryKeyTransactions,
    //     (oldData) => {
    //       if (!oldData) return oldData;

    //       return {
    //         ...oldData,
    //         pages: oldData?.pages.map((page: any) => ({
    //           ...page,
    //           data: [
    //             ...page.data,
    //             {
    //               refId: mutate.id,
    //               information: mutate.information,
    //               nominal: mutate.nominal,
    //               createdAt: mutate.date,
    //               updatedAt: mutate.date,
    //             },
    //           ],
    //         })),
    //       };
    //     },
    //   );

    //   return { prevTransactions };
    // },
    // onError: (error, _variables, context) => {
    //   console.error(error);
    //   if (context?.prevTransactions) {
    //     queryClient.setQueryData(
    //       queryKeyTransactions,
    //       context.prevTransactions,
    //     );
    //   }
    // },
  });

  return { putTransaction };
};
