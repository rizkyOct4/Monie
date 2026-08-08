import { useQueryTransactions } from "@/app/(pages)/transaction/hook/query/query-index";
import type { TransactionsDataType } from "@/app/(pages)/transaction/types/transaction.type";
import { MockSession } from "../../session.mock";
import type { PopUpDeleteTransactionProps } from "@/app/(pages)/transaction/components/pop-up/pop-up-delete";



// ! TRANSACTIONS LIST DATA ==============
export const MockTransactionsListData: TransactionsDataType[] = [
  {
    id: "jj-4533",
    refId: "random-1",
    images: [
      {
        id: "random-1",
        imageName: "sectorName-12",
        imageUrl: "sectorUrl-120",
      },
      {
        id: "random-2",
        imageName: "sectorName-13",
        imageUrl: "sectorUrl-130",
      },
    ],
    information: "info-1",
    nominal: 15000,
    createdAt: new Date("2026-07-19T10:00:00.000Z"),
    updatedAt: new Date("2026-07-19T10:00:00.000Z"),
    status: "ACTIVE",
  },
];

export const MockPutFormTransactionsData = {
  existId: MockTransactionsListData[0].id,
  images: MockTransactionsListData[0].images[0],
  information: MockTransactionsListData[0].information,
  nominal: MockTransactionsListData[0].nominal,
};

export const MockDeleteFormTransactionsData = {
  id: MockTransactionsListData[0].id,
  refId: MockTransactionsListData[0].refId,
  information: MockTransactionsListData[0].information,
  nominal: MockTransactionsListData[0].nominal,
};





// * REACT QUERY ==================
export const MockUseQueryTransactions = (): ReturnType<
  typeof useQueryTransactions
> => ({
  TransactionsListData: MockTransactionsListData,
  isFTransactionsListData: true,
  TransactionsListRefetch: jest.fn(),
  date: "2026-07-25",
  setDate: jest.fn(),
  queryKeyTransactions: ["keyTransactionsList", MockSession.publicId, "2026-7-25"],
});
