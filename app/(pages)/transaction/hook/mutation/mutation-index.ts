"use client";

import { ROUTES_TRANSACTION } from "../../config-route/config-route";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";

export const useMutationTransaction = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: postTransaction } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_TRANSACTION.POST({
        key: "postTransaction",
      });
      const res = await axios.post(URL, data);
      return res.data;
    },
    // onMutate: async (mutate: string) => {
    //   await Promise.all([
    //     queryClient.cancelQueries({ queryKey: queryKeyProjectYear }),
    //     queryClient.cancelQueries({ queryKey: queryKeyProjectList }),
    //   ]);

    //   const prevProjectYear = queryClient.getQueryData(queryKeyProjectYear);
    //   const prevProjectList = queryClient.getQueryData(queryKeyProjectList);

    //   queryClient.setQueryData<InfiniteData<ProjectListData[]>>(
    //     queryKeyProjectList,
    //     (oldData) => {
    //       if (!oldData) return oldData;

    //       return {
    //         ...oldData,
    //         pages: oldData?.pages.map((page: any) => ({
    //           ...page,
    //           data: page?.data.filter(
    //             (f: { publicIdProject: string }) =>
    //               f.publicIdProject !== mutate,
    //           ),
    //         })),
    //       };
    //     },
    //   );

    //   return { prevProjectYear, prevProjectList };
    // },
    // onError: (error, _variables, context) => {
    //   console.error(error);
    //   if (context?.prevProjectYear && context?.prevProjectList) {
    //     queryClient.setQueryData(queryKeyProjectYear, context.prevProjectYear);
    //     queryClient.setQueryData(queryKeyProjectList, context.prevProjectList);
    //   }
    // },
  });

  return { postTransaction };
};
