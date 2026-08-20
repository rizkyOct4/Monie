import { renderHook } from "@testing-library/react";
import { useSessionClient } from "@/_lib/c-session";
import { useHookTransaction } from "@/app/(pages)/transaction/hook/hook-index";
import {
  useQueryIdTransactions,
  useQueryTransactions,
} from "@/app/(pages)/transaction/hook/query/query-index";
import {
  useMutationNewTransaction,
  useMutationTransaction,
  useMutationPutTranscation,
  useMutationDeleteTransaction,
} from "@/app/(pages)/transaction/hook/mutation/mutation-index";
// ? MOCKS =================
// * QUERYS ==========
import {
  MockUseQueryIdTransactions,
  MockUseQueryTransactions,
} from "@/app/__mocks__/(pages)/transaction/query/query-transactions.mock";
// * MUTATIONS ==========
import {
  MockUseQueryNewTransactions,
  MockUseQueryExistedTransactions,
} from "@/app/__mocks__/(pages)/transaction/mutation/mutation.post.mock";
import { MockUseMutationPutTransactions } from "@/app/__mocks__/(pages)/transaction/mutation/mutation.put.mock";
import { MockUseMutationDeleteTransactions } from "@/app/__mocks__/(pages)/transaction/mutation/mutation.delete.mock";

jest.mock("@/_lib/c-session", () => ({
  useSessionClient: jest.fn(),
}));
jest.mock("@/app/(pages)/transaction/hook/query/query-index", () => ({
  useQueryIdTransactions: jest.fn(),
  useQueryTransactions: jest.fn(),
}));
jest.mock("@/app/(pages)/transaction/hook/mutation/mutation-index", () => ({
  useMutationNewTransaction: jest.fn(),
  useMutationTransaction: jest.fn(),
  useMutationPutTranscation: jest.fn(),
  useMutationDeleteTransaction: jest.fn(),
}));

const mockedUseSessionClient = useSessionClient as jest.MockedFunction<
  typeof useSessionClient
>;

// * QUERY ==================
const mockedUseQueryIdTransactions =
  useQueryIdTransactions as jest.MockedFunction<typeof useQueryIdTransactions>;
const mockedUseQueryTransactions = useQueryTransactions as jest.MockedFunction<
  typeof useQueryTransactions
>;

// * MUTATION ==================
const mockedUseMutationNewTransaction =
  useMutationNewTransaction as jest.MockedFunction<
    typeof useMutationNewTransaction
  >;
const mockedUseMutationTransaction =
  useMutationTransaction as jest.MockedFunction<typeof useMutationTransaction>;
const mockedUseMutationPutTransaction =
  useMutationPutTranscation as jest.MockedFunction<
    typeof useMutationPutTranscation
  >;
const mockedUseMutationDeleteTransaction =
  useMutationDeleteTransaction as jest.MockedFunction<
    typeof useMutationDeleteTransaction
  >;

describe("Hook index Transactions", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseSessionClient.mockReturnValue({
      publicId: "ss12",
      name: "Asking",
    });
  });

  it("should return all child values", () => {
    // * QUERYS =====
    const MockQIdTransaction = MockUseQueryIdTransactions();
    const MockQTransaction = MockUseQueryTransactions();

    mockedUseQueryIdTransactions.mockReturnValue(MockQIdTransaction);
    mockedUseQueryTransactions.mockReturnValue(MockQTransaction);

    // * MUTATIONS =====
    const MockMNewTransaction = MockUseQueryNewTransactions();
    const MockMExistedTransaction = MockUseQueryExistedTransactions();
    const MockMPutTransaction = MockUseMutationPutTransactions();
    const MockMDeleteTransaction = MockUseMutationDeleteTransactions();

    mockedUseMutationNewTransaction.mockReturnValue(MockMNewTransaction);
    mockedUseMutationTransaction.mockReturnValue(MockMExistedTransaction);
    mockedUseMutationPutTransaction.mockReturnValue(MockMPutTransaction);
    mockedUseMutationDeleteTransaction.mockReturnValue(MockMDeleteTransaction);

    const { result } = renderHook(() =>
      useHookTransaction("ss12", "/transaction"),
    );

    // * QUERYS CALL ==========
    expect(mockedUseQueryIdTransactions).toHaveBeenCalledWith({
      publicId: "ss12",
    });
    expect(mockedUseQueryTransactions).toHaveBeenCalledWith({
      publicId: "ss12",
      currentPath: "/transaction",
    });

    // * MUTATIONS CALL ==========
    expect(mockedUseMutationNewTransaction).toHaveBeenCalledWith({
      queryKeyIdTransactions: MockQIdTransaction.queryKeyIdTransactions,
      refetchIdTransactions: MockQIdTransaction.idTransactionsListRefetch,
    });
    expect(mockedUseMutationTransaction).toHaveBeenCalledWith({
      publicId: "ss12",
      transactionsLimit: MockQTransaction.transactionsLimit
    });
    expect(mockedUseMutationPutTransaction).toHaveBeenCalledWith({
      publicId: "ss12",
      currentPath: "/transaction",
      queryKeyTransactions: MockQTransaction.queryKeyTransactions,
    });
    expect(mockedUseMutationDeleteTransaction).toHaveBeenCalledWith({
      currentPath: "/transaction",
      queryKeyTransactions: MockQTransaction.queryKeyTransactions,
    });

    // ? result.current -> values return from hook
    expect(result.current).toEqual({
      ...MockQIdTransaction,
      ...MockQTransaction,
      ...MockMNewTransaction,
      ...MockMExistedTransaction,
      ...MockMPutTransaction,
      ...MockMDeleteTransaction,
    });
  });
});
