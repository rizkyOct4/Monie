import { useQueryIdTransactions } from "@/app/(pages)/transaction/hook/query/query-index";

export const MockUseQueryIdTransactions = (): ReturnType<
  typeof useQueryIdTransactions
> => ({
  IdTransactionsListData: [
    {
      id: "random-id-1",
      initialName: "janea-1",
    },
    {
      id: "random-search-id-1",
      initialName: "yoinkMAster-1",
    },
  ],
  idTransactionsListRefetch: jest.fn(),
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
    },
  ],
  isFetchingSearchIdTransaction: false,
});
