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
} from "./mutation/mutation-index";

export const useTransactionHook = (publicId: string, currentPath: string) => {
  // * QUERY =======
  const QIdGet = useQueryIdTransactions({ publicId, currentPath });
  const QSearchIdGet = useQuerySearchIdTransactions({ publicId });
  const QGet = useQueryTransactions({ publicId, currentPath });
  const QPutGet = useQueryGetPutTransactions({ publicId, currentPath });

  // * MUTATION =======
  const MNewPost = useMutationNewTransaction({
    queryKeyIdTransactions: QIdGet.queryKeyIdTransactions,
    refetchIdTransactions: QIdGet.idTransactionsListRefetch,
  });
  const MPost = useMutationTransaction({
    queryKeyTransactions: QGet.queryKeyTransactions,
    refetchTransaction: QGet.TransactionsListRefetch,
  });

  return {
    ...QGet,
    ...QIdGet,
    ...QSearchIdGet,
    ...QPutGet,
    ...MNewPost,
    ...MPost,
  };
};
