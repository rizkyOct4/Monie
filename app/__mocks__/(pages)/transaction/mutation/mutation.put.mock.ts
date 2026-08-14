import { useMutationPutTranscation } from "@/app/(pages)/transaction/hook/mutation/mutation-index";

// * REACT QUERY ==================
export const MockUseMutationPutTransactions = (): ReturnType<
  typeof useMutationPutTranscation
> => ({
  putTransaction: jest.fn(),
  isPendingPutTransaction: false,
});
