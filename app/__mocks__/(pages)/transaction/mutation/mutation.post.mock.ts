import { useMutationNewTransaction, useMutationTransaction } from "@/app/(pages)/transaction/hook/mutation/mutation-index";
import { nanoid } from "nanoid";

export const MockPostFormNewIdTransactionsData = {
  id: nanoid(),
  initialNominal: 120000,
  date: new Date(),
  nameTransaction: "Jaya",
};

export const MockUseQueryNewTransactions = (): ReturnType<
  typeof useMutationNewTransaction
> => ({
  newPostTransaction: jest.fn(),
  isPendingNewPostTransaction: false,
});
export const MockUseQueryExistedTransactions = (): ReturnType<
  typeof useMutationTransaction
> => ({
  postTransaction: jest.fn(),
  isPendingPostTransaction: false,
});
