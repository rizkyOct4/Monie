"use client";

import { useQueryTransactions } from "./query/query-index";
import { useMutationTransaction } from "./mutation/mutation-index";

export const useTransactionHook = (publicId: string, currentPath: string) => {
  // * QUERY =======
  const QGet = useQueryTransactions({ publicId, currentPath });

  // * MUTATION =======
  const MPost = useMutationTransaction();

  return { ...QGet, ...MPost };
};
