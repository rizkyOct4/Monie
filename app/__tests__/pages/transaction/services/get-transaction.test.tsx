import { prisma } from "@/_lib/prisma/prisma-client";
import {
  GetIdTransactions,
  GetSearchIdTransactions,
  GetTransactionList,
} from "@/_lib/services/transaction/services-transaction-index";
import camelcaseKeys from "camelcase-keys";
import { MockGetTransactionList } from "@/app/__mocks__/(pages)/transaction/query/query-transactions.mock";

jest.mock("@/_lib/prisma/prisma-client", () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));

jest.mock("camelcase-keys", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockQueryRaw = prisma.$queryRaw as jest.Mock;
const CamelcaseKeysMockQ1 = camelcaseKeys as jest.Mock;
const CamelcaseKeysMockQ2 = camelcaseKeys as jest.Mock;

describe("SERVICES TRANSACTIONS", () => {
  describe("GetIdTransactions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      CamelcaseKeysMockQ1.mockImplementation((value) =>
        value.map((item: any) => ({
          id: item.id,
          initialName: item.initial_name,
          status: item.status,
        })),
      );
    });
    it("should return data and hasMore true", async () => {
      const mockData = [
        {
          id: "random-1",
          initial_name: "Test Transaction",
          status: "ACTIVE",
        },
        {
          id: "random-2",
          initial_name: "Test Transaction 2",
          status: "ACTIVE",
        },
      ];

      MockQueryRaw.mockResolvedValueOnce(mockData) // ! return query pertama
        .mockResolvedValueOnce([{ amount_id: 3 }]); // ! return query kedua

      const result = await GetIdTransactions({
        publicId: "ss12",
        limit: 2,
        offset: 0,
      });

      expect(MockQueryRaw).toHaveBeenCalledTimes(2);

      expect(result).toEqual({
        data: [
          {
            id: "random-1",
            initialName: "Test Transaction",
            status: "ACTIVE",
          },
          {
            id: "random-2",
            initialName: "Test Transaction 2",
            status: "ACTIVE",
          },
        ],
        hasMore: true,
      });
    });

    it("should return hasMore false when all data has been fetched", async () => {
      const mockData = [
        {
          id: "random-1",
          initial_name: "Test Transaction",
          status: "ACTIVE",
        },
        {
          id: "random-2",
          initial_name: "Test Transaction-2",
          status: "ACTIVE",
        },
        {
          id: "random-3",
          initial_name: "Test Transaction-3",
          status: "ACTIVE",
        },
      ];

      MockQueryRaw.mockResolvedValueOnce(mockData).mockResolvedValueOnce([
        { amount_id: 1 },
      ]);

      const result = await GetIdTransactions({
        publicId: "ss12",
        limit: 15,
        offset: 0,
      });

      // ? RETURN AFTER GET CAMELCASE
      expect(result).toEqual({
        data: [
          {
            id: "random-1",
            initialName: "Test Transaction",
            status: "ACTIVE",
          },
          {
            id: "random-2",
            initialName: "Test Transaction-2",
            status: "ACTIVE",
          },
          {
            id: "random-3",
            initialName: "Test Transaction-3",
            status: "ACTIVE",
          },
        ],
        hasMore: false,
      });
    });

    it("should return empty data when query returns empty array", async () => {
      MockQueryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([
        { amount_id: 0 },
      ]);

      const result = await GetIdTransactions({
        publicId: "ss12",
        limit: 15,
        offset: 0,
      });

      expect(result).toEqual({
        data: [],
        hasMore: false,
      });

      expect(MockQueryRaw).toHaveBeenCalledTimes(2);
    });

    it("should throw when first query fails", async () => {
      MockQueryRaw.mockRejectedValueOnce(new Error("Database error"));

      await expect(
        GetIdTransactions({
          publicId: "ss12",
          limit: 15,
          offset: 0,
        }),
      ).rejects.toThrow("Database error");

      expect(MockQueryRaw).toHaveBeenCalledTimes(1);
    });

    it("should throw when count query fails", async () => {
      MockQueryRaw.mockResolvedValueOnce([
        {
          id: "random-1",
          initial_name: "Test Transaction",
          status: "ACTIVE",
        },
      ]).mockRejectedValueOnce(new Error("Count query failed"));

      await expect(
        GetIdTransactions({
          publicId: "ss12",
          limit: 15,
          offset: 0,
        }),
      ).rejects.toThrow("Count query failed");

      expect(MockQueryRaw).toHaveBeenCalledTimes(2);
    });
  });

  describe("GetSearchIdTransactions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      CamelcaseKeysMockQ2.mockImplementation((value) =>
        value.map((item: any) => ({
          id: item.id,
          initialName: item.initial_name,
        })),
      );
    });
    it("should return has data", async () => {
      const mockData = [
        {
          id: "id-transaction-1",
          initial_name: "Salary August",
        },
        {
          id: "id-transaction-2",
          initial_name: "Salary July",
        },
      ];

      MockQueryRaw.mockResolvedValueOnce(mockData); // ! return query pertama

      const result = await GetSearchIdTransactions({
        publicId: "ss12",
        search: "Salary",
      });

      expect(MockQueryRaw).toHaveBeenCalledTimes(1);

      expect(result).toEqual([
        {
          id: "id-transaction-1",
          initialName: "Salary August",
        },
        {
          id: "id-transaction-2",
          initialName: "Salary July",
        },
      ]);
    });

    it("should return no data", async () => {
      MockQueryRaw.mockResolvedValueOnce([]); // ! return query pertama

      const result = await GetSearchIdTransactions({
        publicId: "ss12",
        search: "Test",
      });

      expect(MockQueryRaw).toHaveBeenCalledTimes(1);

      expect(result).toEqual([]);
    });
  });

  describe("GetTransactionList", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      CamelcaseKeysMockQ1.mockImplementation((value) =>
        value.map((item: any) => ({
          status: item.status,
          id: item.id,
          refId: item.ref_id,
          information: item.information,
          nominal: item.nominal,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          images: item.images,
        })),
      );
    });

    it("should return data and hasMore true", async () => {
      const mockData = [
        {
          status: "ACTIVE",
          id: "transaction-id-1",
          ref_id: "initial-salary-id-1",
          information: "Makan siang",
          nominal: 25000,
          created_at: new Date("2026-08-18T05:00:00.000Z"),
          updated_at: new Date("2026-08-18T05:10:00.000Z"),
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
          ref_id: "initial-salary-id-1",
          information: "Transportasi",
          nominal: 15000,
          created_at: new Date("2026-08-18T03:00:00.000Z"),
          updated_at: new Date("2026-08-18T03:30:00.000Z"),
          images: [],
        },
      ];

      MockQueryRaw.mockResolvedValueOnce(mockData) // ! return query pertama
        .mockResolvedValueOnce([{ amount_transaction: 20 }]); // ! return query kedua

      const result = await GetTransactionList({
        publicId: "ss12",
        transactionName: "random Transaction",
        convDate: new Date("2026-08-18T05:00:00.000Z"),
        offset: 0,
        limit: 15,
      });

      expect(MockQueryRaw).toHaveBeenCalledTimes(2);

      expect(result).toEqual({
        data: MockGetTransactionList,
        hasMore: true,
      });
    });
    it("should return data and hasMore false", async () => {
      const mockData = [
        {
          status: "ACTIVE",
          id: "transaction-id-1",
          ref_id: "initial-salary-id-1",
          information: "Makan siang",
          nominal: 25000,
          created_at: new Date("2026-08-18T05:00:00.000Z"),
          updated_at: new Date("2026-08-18T05:10:00.000Z"),
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
          ref_id: "initial-salary-id-1",
          information: "Transportasi",
          nominal: 15000,
          created_at: new Date("2026-08-18T03:00:00.000Z"),
          updated_at: new Date("2026-08-18T03:30:00.000Z"),
          images: [],
        },
      ];

      MockQueryRaw.mockResolvedValueOnce(mockData) // ! return query pertama
        .mockResolvedValueOnce([{ amount_transaction: 5 }]); // ! return query kedua

      const result = await GetTransactionList({
        publicId: "ss12",
        transactionName: "random Transaction no more data",
        convDate: new Date("2026-08-18T05:00:00.000Z"),
        offset: 0,
        limit: 15,
      });

      expect(MockQueryRaw).toHaveBeenCalledTimes(2);

      expect(result).toEqual({
        data: MockGetTransactionList,
        hasMore: false,
      });
    });
    it("should return empty data when query returns empty array", async () => {
      MockQueryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([
        { amount_transaction: 0 },
      ]);

      const result = await GetTransactionList({
        publicId: "ss12",
        transactionName: "empty DAta",
        convDate: new Date("2026-08-18T05:00:00.000Z"),
        offset: 0,
        limit: 15,
      });

      expect(result).toEqual({
        data: [],
        hasMore: false,
      });

      expect(MockQueryRaw).toHaveBeenCalledTimes(2);
    });
  });
});
