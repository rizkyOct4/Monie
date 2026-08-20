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

export const MockGetTransactionList = [
  {
    status: "ACTIVE",
    id: "transaction-id-1",
    refId: "initial-salary-id-1",
    information: "Makan siang",
    nominal: 25000,
    createdAt: new Date("2026-08-18T05:00:00.000Z"),
    updatedAt: new Date("2026-08-18T05:10:00.000Z"),
    images: [
      {
        id: "transaction-image-id-1",
        imageName: "receipt.jpg",
        imageUrl: "https://example.com/receipt.jpg",
      },
    ],
  },
  {
    status: "ACTIVE",
    id: "transaction-id-2",
    refId: "initial-salary-id-1",
    information: "Transportasi",
    nominal: 15000,
    createdAt: new Date("2026-08-18T03:00:00.000Z"),
    updatedAt: new Date("2026-08-18T03:30:00.000Z"),
    images: [],
  },
];

export const MockUseQueryTransactions = (): ReturnType<
  typeof useQueryTransactions
> => ({
  TransactionsListData: MockGetTransactionList,
  isFTransactionsListData: false,
  TransactionsListRefetch: jest.fn(),
  FNPTransactionsList: jest.fn(),
  HNPTransactionList: true,
  IFNPTransactionList: false,
  date: "2026-08-01",
  setDate: jest.fn(),
  queryKeyTransactions: [
    "keyTransactionsList",
    "ss12",
    "random search params",
    "2026-08-01",
  ],
    transactionsLimit: 10,
});
