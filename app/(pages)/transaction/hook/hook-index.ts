"use client";

import {
  useQueryIdTransactions,
  useQueryTransactions,
} from "./query/query-index";
import {
  useMutationNewTransaction,
  useMutationTransaction,
  useMutationPutTranscation,
  useMutationDeleteTransaction,
} from "./mutation/mutation-index";

export const useHookTransaction = (publicId: string, currentPath: string) => {
  // * QUERY =======
  const QIdGet = useQueryIdTransactions({ publicId, currentPath });
  const QGet = useQueryTransactions({ publicId, currentPath });

  // * MUTATION =======
  const MNewPost = useMutationNewTransaction({
    queryKeyIdTransactions: QIdGet.queryKeyIdTransactions,
    refetchIdTransactions: QIdGet.idTransactionsListRefetch,
  });
  const MPost = useMutationTransaction({
    queryKeyTransactions: QGet.queryKeyTransactions,
  });
  const MPut = useMutationPutTranscation({
    publicId,
    currentPath,
    queryKeyTransactions: QGet.queryKeyTransactions,
  });

  const MDelete = useMutationDeleteTransaction({
    currentPath,
    queryKeyTransactions: QGet.queryKeyTransactions,
  });

  return {
    ...QGet,
    ...QIdGet,
    ...MNewPost,
    ...MPost,
    ...MPut,
    ...MDelete,
  };
};
