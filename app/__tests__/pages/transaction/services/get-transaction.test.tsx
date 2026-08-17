import { prisma } from "@/_lib/prisma/prisma-client";
import {
  GetIdTransactions,
  GetSearchIdTransactions,
} from "@/_lib/services/transaction/services-transaction-index";
import camelcaseKeys from "camelcase-keys";

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

describe("SERVICES GET ID TRANSACTIONS", () => {
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

  describe("GetIdTransactions", () => {
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
  it("should return data and hasMore true", async () => {
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
      search: "Testing Search",
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

  // it("should return empty array when no transaction is found", async () => {
  //   const MockQueryResult: {
  //     id: string;
  //     initial_name: string;
  //   }[] = [];

  //   const MockCamelcaseResult: {
  //     id: string;
  //     initialName: string;
  //   }[] = [];

  //   PrismaQueryRawMock.mockResolvedValue(MockQueryResult);
  //   CamelcaseKeysMock.mockReturnValue(MockCamelcaseResult);

  //   const result = await GetSearchIdTransactions({
  //     publicId: "public-user-123",
  //     search: "NotFound",
  //   });

  //   expect(PrismaQueryRawMock).toHaveBeenCalledTimes(1);
  //   expect(CamelcaseKeysMock).toHaveBeenCalledWith(MockQueryResult);

  //   expect(result).toEqual([]);
  // });

  // it("should throw error when prisma query fails", async () => {
  //   const MockError = new Error("Database error");

  //   PrismaQueryRawMock.mockRejectedValue(MockError);

  //   await expect(
  //     GetSearchIdTransactions({
  //       publicId: "public-user-123",
  //       search: "Salary",
  //     }),
  //   ).rejects.toThrow("Database error");

  //   expect(PrismaQueryRawMock).toHaveBeenCalledTimes(1);
  //   expect(CamelcaseKeysMock).not.toHaveBeenCalled();
  // });
});
