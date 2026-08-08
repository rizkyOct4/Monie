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
import type { TPutTransaction } from "../../types/action/action.type";
import { ConvertDateLocalIntoDate } from "@/_utils/format-date";

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

  const { mutateAsync: postTransaction, isPending: isPendingPostTransaction } = useMutation({
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

  return { postTransaction, isPendingPostTransaction };
};

// * UPDATE TRANSACTIONS ======================
type UseMutationPutTranscationProps = {
  publicId: string;
  currentPath: string;
  queryKeyTransactions: QueryKey;
};
export const useMutationPutTranscation = ({
  publicId,
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
      onMutate: async (mutate: TPutTransaction) => {
        await Promise.all([
          queryClient.cancelQueries({ queryKey: queryKeyTransactions }),
        ]);

        const prevPutTransaction =
          queryClient.getQueryData(queryKeyTransactions);

        // ! LINTAS QUERY !!!!
        if (mutate.wrongDate) {
          queryClient.setQueryData<InfiniteData<TransactionsDataType[]>>(
            queryKeyTransactions,
            (oldData) => {
              if (!oldData) return oldData;

              return {
                ...oldData,
                pages: oldData?.pages.map((page: any) => ({
                  ...page,
                  data: page?.data.filter(
                    (f: { id: string }) => f.id !== mutate.existId,
                  ),
                })),
              };
            },
          );
        } else {
          queryClient.setQueryData<InfiniteData<TransactionsDataType[]>>(
            queryKeyTransactions,
            (oldData) => {
              if (!oldData) return oldData;

              return {
                ...oldData,
                pages: oldData?.pages.map((page: any) => ({
                  ...page,
                  data: page?.data.map(
                    (i: {
                      id: string;
                      images: {
                        id: string;
                        imageName: string;
                        imageUrl: string;
                      }[];
                    }) =>
                      i.id === mutate.existId
                        ? {
                            ...i,
                            information: mutate.information,
                            nominal: mutate.nominal,
                            createdAt: mutate.date,
                            updatedAt: mutate.date,
                            images: (() => {
                              // ! adalah Immediately Invoked Function Expression (IIFE),
                              // yaitu function yang langsung dipanggil saat itu juga. CASE karena banyak kondisi !!
                              let images = i.images;

                              if (mutate.deleteImages.length > 0) {
                                images = images.filter(
                                  (image: { imageName: string }) =>
                                    !mutate.deleteImages.includes(
                                      image.imageName,
                                    ),
                                );
                              }

                              if (mutate.newImages.length > 0) {
                                images = [
                                  ...images,
                                  ...mutate.newImages.map((i) => ({
                                    // ! di spread agar data tiap" itu dipisah masing" !!!
                                    id: i.id,
                                    imageName: i.imageName,
                                    imageUrl: i.imageUrl,
                                  })),
                                ];
                              }

                              return images;
                            })(),
                          }
                        : i,
                  ),
                })),
              };
            },
          );
        }

        return { prevPutTransaction };
      },
      onSuccess: (data, variables, context) => {
        const isWrongDate = variables.wrongDate;
        const convertedDate = ConvertDateLocalIntoDate(
          new Date(variables.date),
        );

        if (isWrongDate) {
          queryClient.invalidateQueries({
            queryKey: ["keyTransactionsList", publicId, convertedDate],
          });
        }
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
