"use client";

import {
  useQueryIdTransactions,
  useQuerySearchIdTransactions,
  useQueryTransactions,
  useQueryGetPutTransactions,
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
  const QSearchIdGet = useQuerySearchIdTransactions({ publicId });
  const QGet = useQueryTransactions({ publicId, currentPath });
  const QGetPut = useQueryGetPutTransactions({ publicId, currentPath });

  // * MUTATION =======
  const MNewPost = useMutationNewTransaction({
    queryKeyIdTransactions: QIdGet.queryKeyIdTransactions,
    refetchIdTransactions: QIdGet.idTransactionsListRefetch,
  });
  const MPost = useMutationTransaction({
    queryKeyTransactions: QGet.queryKeyTransactions,
  });
  const MPut = useMutationPutTranscation({
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
    ...QSearchIdGet,
    ...QGetPut,
    ...MNewPost,
    ...MPost,
    ...MPut,
    ...MDelete,
  };
};
