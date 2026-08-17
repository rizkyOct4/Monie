import {
  useQueryIdTransactions,
  useQueryTransactions,
} from "@/app/(pages)/transaction/hook/query/query-index";

export const MockUseQueryIdTransactions = (): ReturnType<
  typeof useQueryIdTransactions
> => ({
  IdTransactionsListData: [
    {
      id: "random-id-1",
      initialName: "janea-1",
      status: "ACTIVE",
    },
    {
      id: "random-search-id-1",
      initialName: "yoinkMAster-1",
      status: "ACTIVE",
    },
  ],
  idTransactionsListRefetch: jest.fn(),
  isFetchingIdTransactionsList: false,
  isSuccessIdTransaction: false,
  queryKeyIdTransactions: ["keyIdTransactionsList", "ss12"],
  isOpenIdTransaction: false,
  setIsOpenIdTransaction: jest.fn(),

  // * SEARCH
  search: "yoinkMa",
  setSearch: jest.fn(),
  SearchIdTransactionData: [
    {
      id: "random-search-id-1",
      initialName: "yoinkMAster-1",
      status: "ACTIVE",
    },
  ],
  isFetchingSearchIdTransaction: false,
});

export const MockUseQueryTransactions = (): ReturnType<
  typeof useQueryTransactions
> => ({
  TransactionsListData: [],
  isFTransactionsListData: false,
  TransactionsListRefetch: jest.fn(),
  date: "2026-08-01",
  setDate: jest.fn(),
  queryKeyTransactions: [
    "keyTransactionsList",
    "ss12",
    "random search params",
    "2026-08-01",
  ],
});
