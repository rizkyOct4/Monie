import { useMutationDeleteTransaction } from "@/app/(pages)/transaction/hook/mutation/mutation-index";

export const MockUseMutationDeleteTransactions = (): ReturnType<
  typeof useMutationDeleteTransaction
> => ({
  deleteTransaction: jest.fn(),
  isPendingDeleteTransaction: true,
});

