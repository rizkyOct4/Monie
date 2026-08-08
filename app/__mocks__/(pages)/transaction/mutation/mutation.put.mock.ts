import { useMutationPutTranscation } from "@/app/(pages)/transaction/hook/mutation/mutation-index";

// * REACT QUERY ==================
export const MockUseQueryPutTransactions = (): ReturnType<
  typeof useMutationPutTranscation
> => ({
  putTransaction: jest.fn(),
  isPendingPutTransaction: false,
});
