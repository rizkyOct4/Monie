/**
 * @jest-environment node
 */

import {
  GetIdTransactions,
  GetSearchIdTransactions,
  GetTransactionList,
} from "@/_lib/services/transaction/services-transaction-index";
import { NextRequest, NextResponse } from "next/server";
import GetSession from "@/_lib/session";
import { GET } from "@/app/(pages)/transaction/api/route";
import { RedisTransactionsLimit } from "@/app/(pages)/transaction/redis/transaction-limit";
import { GETTransactionsLimit } from "@/_lib/redis";

jest.mock("@/_lib/services/transaction/services-transaction-index", () => ({
  GetIdTransactions: jest.fn(),
  GetSearchIdTransactions: jest.fn(),
  GetTransactionList: jest.fn(),
}));

jest.mock("@/_lib/session", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// * REDIS
jest.mock("@/_lib/redis", () => ({
  GETTransactionsLimit: {
    limit: jest.fn(),
  },
}));
// const MockRedisTransactions = jest.fn();
// jest.mock("@/app/(pages)/transaction/redis/transaction-limit", () => ({
//   __esModule: true,
//   default: ({ key, publicId }: { key: string; publicId: string }) => {
//     MockRedisTransactions({ key, publicId });
//   },
// }));

const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
const mockedRedis = GETTransactionsLimit.limit as jest.MockedFunction<
  typeof GETTransactionsLimit.limit
>;
const mockedGetIdTransactions = GetIdTransactions as jest.MockedFunction<
  typeof GetIdTransactions
>;
const mockedGetSearchIdTransactions =
  GetSearchIdTransactions as jest.MockedFunction<
    typeof GetSearchIdTransactions
  >;
const mockedGetTransationList = GetTransactionList as jest.MockedFunction<
  typeof GetTransactionList
>;

// * MOCK API =========
const createRequest = (query: string) =>
  new NextRequest(`http://localhost/transaction/api?${query}`, {
    method: "GET",
  });

describe("GET /transaction/api", () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    mockedSession.mockResolvedValue({
      publicId: "ss12",
      name: "Asking",
    });
  });

  describe("CASE condition", () => {
    describe("idTransactions", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      const req = createRequest(
        new URLSearchParams({
          key: "idTransactions",
          "page-param": "1",
          limit: "15",
        }).toString(),
      );
      const expectedCalled = {
        publicId: "ss12",
        limit: 15,
        offset: 0,
      };

      it("should return 200 when data exists", async () => {
        // ? RETURN MOCK DATA =====
        mockedGetIdTransactions.mockResolvedValue({
          data: [
            {
              id: "period-1",
              initialName: "Asking",
              status: "ACTIVE",
            },
          ],
          hasMore: true,
        });

        const res = await GET(req);

        // ? MENGECEK BODY
        const body = await res.json();

        // console.log(body)

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(200);
        expect(body.data).toHaveLength(1);

        // ! Memastikan service dipanggil dengan parameter yang benar.
        expect(mockedGetIdTransactions).toHaveBeenCalledWith(expectedCalled);
      });
      it("should return 500 when service throws an error", async () => {
        mockedGetIdTransactions.mockRejectedValue(
          new Error("Internal Server Error"),
        );

        const res = await GET(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Internal Server Error",
        });

        expect(mockedGetIdTransactions).toHaveBeenCalledWith(expectedCalled);
      });
    });
    describe("searchTransactions", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      const req = createRequest(
        new URLSearchParams({
          key: "searchTransactions",
          "search-transaction": "randomse",
        }).toString(),
      );
      const expectedCalled = {
        publicId: "ss12",
        search: "randomse",
      };
      it("should return 200 when data exists", async () => {
        // ? RETURN MOCK DATA =====
        mockedGetSearchIdTransactions.mockResolvedValue([
          {
            id: "period-1",
            initialName: "randomsearch1",
          },
        ]);

        const res = await GET(req);

        // ? MENGECEK BODY
        const body = await res.json();

        // console.log(body)

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(200);
        expect(body).toHaveLength(1);

        // ! Memastikan service dipanggil dengan parameter yang benar.
        expect(mockedGetSearchIdTransactions).toHaveBeenCalledWith(
          expectedCalled,
        );
      });
      it("should return 500 when service throws an error", async () => {
        mockedGetSearchIdTransactions.mockRejectedValue(
          new Error("Internal Server Error"),
        );

        const res = await GET(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Internal Server Error",
        });

        expect(mockedGetSearchIdTransactions).toHaveBeenCalledWith(
          expectedCalled,
        );
      });
    });
    // describe("transactions", () => {
    //   beforeEach(() => {
    //     jest.clearAllMocks();
    //   });

    //   const RedisSuccess = async () => {
    //     mockedRedis.mockResolvedValue({
    //       limit: 20,
    //       remaining: 19,
    //       reset: 1750000000,
    //       success: true,
    //       pending: Promise.resolve(),
    //     });

    //     const result = await RedisTransactionsLimit({
    //       key: "transactions",
    //       publicId: "ss12",
    //     });

    //     expect(result).toBeUndefined();

    //     expect(mockedRedis).toHaveBeenCalledTimes(1);

    //     expect(mockedRedis).toHaveBeenCalledWith(
    //       "Get key:transactions, publicId:ss12",
    //     );
    //   };
    //   const RedisLimit = async () => {
    //     mockedRedis.mockResolvedValue({
    //       limit: 20,
    //       remaining: 0,
    //       reset: 1750000000,
    //       success: false,
    //       pending: Promise.resolve(),
    //     });

    //     const result = await RedisTransactionsLimit({
    //       key: "transactions",
    //       publicId: "ss12",
    //     });

    //     expect(result).toBeInstanceOf(NextResponse);

    //     expect(result?.status).toBe(429);

    //     expect(result?.headers.get("X-RateLimit-Remaining")).toBe("0");

    //     expect(result?.headers.get("X-RateLimit-Reset")).toBe("1750000000");
    //   };
    //   const RedisServerFail = async () => {
    //     mockedRedis.mockRejectedValue(new Error("Redis connection failed"));

    //     await expect(
    //       RedisTransactionsLimit({
    //         key: "transactions",
    //         publicId: "ss12",
    //       }),
    //     ).rejects.toThrow("Redis connection failed");
    //   };

    //   const req = createRequest(
    //     new URLSearchParams({
    //       key: "transactions",
    //       "transaction-date": "2026-08-10",
    //       "transaction-name": "random search params",
    //       "page-param": "1",
    //       limit: "15",
    //     }).toString(),
    //   );
    //   const expectedCalled = {
    //     publicId: "ss12",
    //     transactionName: "random search params",
    //     convDate: new Date("2026-08-10"),
    //     offset: 0,
    //     limit: 15,
    //   };
    //   it("should return 200 when data exists", async () => {
    //     // ? RETURN MOCK DATA =====
    //     mockedGetTransationList.mockResolvedValue({
    //       data: [
    //         {
    //           id: "random-1",
    //           status: "ACTIVE",
    //           refId: "s012",
    //           information: "Lorem123",
    //           nominal: 4000,
    //           createdAt: new Date("2026-08-10"),
    //           updatedAt: new Date("2026-08-07"),
    //           images: [
    //             {
    //               id: "random-id-image-1",
    //               imageName: "random-imageName-1",
    //               imageUrl: "random-imageUrl-1",
    //             },
    //           ],
    //         },
    //       ],
    //       hasMore: true,
    //     });

    //     const res = await GET(req);

    //     // ? MENGECEK BODY
    //     const body = await res.json();

    //     // console.log(body)

    //     // ! Memastikan ada tidaknya data dari services
    //     expect(res.status).toBe(200);
    //     expect(body.data).toHaveLength(1);

    //     // ! Memastikan service dipanggil dengan parameter yang benar.
    //     expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
    //   });
    //   it("should return 500 when service throws an error", async () => {
    //     mockedGetTransationList.mockRejectedValue(
    //       new Error("Internal Server Error"),
    //     );

    //     const res = await GET(req);
    //     const body = await res.json();

    //     expect(res.status).toBe(500);

    //     expect(body).toEqual({
    //       message: "Internal Server Error",
    //     });

    //     expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
    //   });
    // });
    describe("transactions", () => {
      const req = createRequest(
        new URLSearchParams({
          key: "transactions",
          "transaction-date": "2026-08-10",
          "transaction-name": "random search params",
          "page-param": "1",
          limit: "15",
        }).toString(),
      );

      const expectedCalled = {
        publicId: "ss12",
        transactionName: "random search params",
        convDate: new Date("2026-08-10"),
        offset: 0,
        limit: 15,
      };

      // =========================================================
      // MOCK HELPER
      // =========================================================

      const mockRedisSuccess = () => {
        mockedRedis.mockResolvedValue({
          limit: 20,
          remaining: 19,
          reset: 1750000000,
          success: true,
          pending: Promise.resolve(),
        });
      };

      const mockRedisLimit = () => {
        mockedRedis.mockResolvedValue({
          limit: 20,
          remaining: 0,
          reset: 1750000000,
          success: false,
          pending: Promise.resolve(),
        });
      };

      const mockRedisServerFail = () => {
        mockedRedis.mockRejectedValue(new Error("Redis connection failed"));
      };

      const mockTransactionData = () => {
        mockedGetTransationList.mockResolvedValue({
          data: [
            {
              id: "random-1",
              status: "ACTIVE",
              refId: "s012",
              information: "Lorem123",
              nominal: 4000,
              createdAt: new Date("2026-08-10"),
              updatedAt: new Date("2026-08-07"),
              images: [
                {
                  id: "random-id-image-1",
                  imageName: "random-imageName-1",
                  imageUrl: "random-imageUrl-1",
                },
              ],
            },
          ],
          hasMore: true,
        });
      };

      // =========================================================
      // RESET MOCK
      // =========================================================

      beforeEach(() => {
        jest.clearAllMocks();
      });

      // =========================================================
      // RATE LIMIT
      // =========================================================

      describe("Rate Limit", () => {
        it("should continue request when rate limit is successful", async () => {
          mockRedisSuccess();
          mockTransactionData();

          const res = await GET(req);
          const body = await res.json();

          expect(res.status).toBe(200);

          expect(body.data).toHaveLength(1);

          expect(mockedRedis).toHaveBeenCalledTimes(1);

          expect(mockedRedis).toHaveBeenCalledWith(
            "Get key:transactions, publicId:ss12",
          );

          expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
        });

        it("should return 429 when rate limit is exceeded", async () => {
          mockRedisLimit();

          const res = await GET(req);
          const body = await res.json();

          expect(res.status).toBe(429);

          expect(body).toEqual({
            message:
              "Too many Requests attempts. Please try again in a few second.",
          });

          expect(res.headers.get("X-RateLimit-Remaining")).toBe("0");

          expect(res.headers.get("X-RateLimit-Reset")).toBe("1750000000");

          // Service tidak boleh dipanggil
          expect(mockedGetTransationList).not.toHaveBeenCalled();
        });

        it("should return 500 when Redis throws an error", async () => {
          mockRedisServerFail();

          const res = await GET(req);
          const body = await res.json();

          expect(res.status).toBe(500);

          expect(body).toEqual({
            message: "Redis connection failed",
          });

          // Service tidak boleh dipanggil
          expect(mockedGetTransationList).not.toHaveBeenCalled();
        });
      });

      // =========================================================
      // TRANSACTION SERVICE
      // =========================================================

      describe("Transaction Service", () => {
        beforeEach(() => {
          // Semua test service harus melewati rate limit
          mockRedisSuccess();
        });

        it("should return 200 when data exists", async () => {
          mockTransactionData();

          const res = await GET(req);
          const body = await res.json();

          // Response
          expect(res.status).toBe(200);

          // Data
          expect(body.data).toHaveLength(1);

          // Service dipanggil
          expect(mockedGetTransationList).toHaveBeenCalledTimes(1);

          // Parameter service
          expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
        });

        it("should return 500 when service throws an error", async () => {
          mockedGetTransationList.mockRejectedValue(
            new Error("Internal Server Error"),
          );

          const res = await GET(req);
          const body = await res.json();

          expect(res.status).toBe(500);

          expect(body).toEqual({
            message: "Internal Server Error",
          });

          expect(mockedGetTransationList).toHaveBeenCalledTimes(1);

          expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
        });
      });
    });
  });
});
