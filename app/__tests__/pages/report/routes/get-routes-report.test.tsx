/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { MockUseQueryIdPeriodTransactions } from "@/app/__mocks__/(pages)/report/hook/hook.index.mock";
import GetSession from "@/_lib/session";
import {
  GetPeriodTransaction,
  GetIdPeriodTransaction,
} from "@/_lib/services/report/services-report-index";
import { GET } from "@/app/(pages)/report/api/route";
import {
  MockRedisSuccess,
  MockRedisLimit,
  MockRedisServerFail,
} from "@/app/__mocks__/redis.mock";
import { GETIDPeriodTransactions } from "@/_lib/redis";

// ? MOCK => PALSU -> DATA YG DIAMBIL GA SAMPAI KE DATABASE !!! -> CUMA SEKEDAR WADAHNYA SAJA !!
jest.mock("@/_lib/services/report/services-report-index", () => ({
  GetPeriodTransaction: jest.fn(),
  GetIdPeriodTransaction: jest.fn(),
}));

// ? JIKA EXPORT DEFAULT CODENYA GINI !!!
jest.mock("@/_lib/session", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// * REDIS
jest.mock("@/_lib/redis", () => ({
  GETIDPeriodTransactions: {
    limit: jest.fn(),
  },
}));

// ? DI CAST INI UNTUK CASE TYPESCRIPT AGAR TAU INI MOCK
const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
const MockedRedis = GETIDPeriodTransactions.limit as jest.MockedFunction<
  typeof GETIDPeriodTransactions.limit
>;
const mockedGetPeriodTransaction = GetPeriodTransaction as jest.MockedFunction<
  typeof GetPeriodTransaction
>;
const mockedGetIdPeriod = GetIdPeriodTransaction as jest.MockedFunction<
  typeof GetIdPeriodTransaction
>;

// * MOCK API =========
const createRequest = (query: string) =>
  new NextRequest(`http://localhost/report/api?${query}`, { method: "GET" });

// ? ROUTE HANDLER ===========
describe("GET /report/api", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedSession.mockResolvedValue({
      publicId: "ss12",
      name: "Asking",
    });
  });

  describe("CASE periodTransaction", () => {
    const req = createRequest(
      new URLSearchParams({
        key: "periodTransactions",
        period: "2026-08",
      }).toString(),
    );
    const expectedPeriod = {
      publicId: "ss12",
      period: "2026-08",
    };

    it("should return 200 when data exists", async () => {
      // ? RETURN MOCK DATA =====
      mockedGetPeriodTransaction.mockResolvedValue([
        {
          initialName: "Asking",
        },
      ]);

      const res = await GET(req);

      // ? MENGECEK BODY
      const body = await res.json();

      // ! Memastikan ada tidaknya data dari services
      expect(res.status).toBe(200);
      // expect(body).toHaveLength(1);

      expect(body[0]).toEqual(
        expect.objectContaining({
          initialName: expect.any(String),
        }),
      );

      // ! Memastikan service dipanggil dengan parameter yang benar.
      expect(mockedGetPeriodTransaction).toHaveBeenCalledWith(expectedPeriod);
    });
    // it("should return 404 when data didn't exists", async () => {
    //   // ? RETURN MOCK DATA =====
    //   mockedGetPeriodTransaction.mockResolvedValue([]);

    //   const res = await GET(req);

    //   // ? MENGECEK BODY
    //   const body = await res.json();

    //   // ! Memastikan ada tidaknya data dari services
    //   expect(res.status).toBe(404);
    //   // expect(body).toHaveLength(1);

    //   expect(body).toEqual({
    //     message: "Data tidak ditemukan",
    //   });

    //   // ! Memastikan service dipanggil dengan parameter yang benar.
    //   expect(mockedGetPeriodTransaction).toHaveBeenCalledWith(expectedPeriod);
    // });
    it("should return 500 when service throws an error", async () => {
      mockedGetPeriodTransaction.mockRejectedValue(
        new Error("Internal Server Error"),
      );

      const res = await GET(req);
      const body = await res.json();

      expect(res.status).toBe(500);

      expect(body).toEqual({
        message: "Internal Server Error",
      });

      expect(mockedGetPeriodTransaction).toHaveBeenCalledWith(expectedPeriod);
    });
  });

  describe("CASE idPeriodTransactions", () => {
    const { IdPeriodTransactionData } = MockUseQueryIdPeriodTransactions();

    const reRequest = () => {
      const req = createRequest(
        new URLSearchParams({
          key: "idPeriodTransactions",
          "id-period": "yoink Master",
        }).toString(),
      );
      const expectedIdPeriod = {
        publicId: "ss12",
        idPeriod: "yoink Master",
      };

      return { req, expectedIdPeriod };
    };

    describe("Rate Limit", () => {
      it("should continue request when rate limit is successful", async () => {
        const { req, expectedIdPeriod } = reRequest();
        MockRedisSuccess({ mock: MockedRedis, limit: 25, remaining: 24 });
        mockedGetIdPeriod.mockResolvedValue(IdPeriodTransactionData);

        const res = await GET(req);
        const body = await res.json();

        expect(res.status).toBe(200);

        expect(MockedRedis).toHaveBeenCalledTimes(1);

        expect(MockedRedis).toHaveBeenCalledWith(
          "GET key:idPeriodTransactions, publicId:ss12",
        );

        expect(mockedGetIdPeriod).toHaveBeenCalledWith(expectedIdPeriod);
      });

      it("should return 429 when rate limit is exceeded", async () => {
        const { req } = reRequest();

        MockRedisLimit({ mock: MockedRedis, limit: 25, remaining: 0 });

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
        expect(mockedGetIdPeriod).not.toHaveBeenCalled();
      });

      it("should return 500 when Redis throws an error", async () => {
        const { req } = reRequest();

        MockRedisServerFail({ mock: MockedRedis });

        const res = await GET(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Redis connection failed",
        });

        // Service tidak boleh dipanggil
        expect(mockedGetIdPeriod).not.toHaveBeenCalled();
      });
    });

    describe("SERVICES", () => {
      beforeEach(() => {
        jest.clearAllMocks();
        MockRedisSuccess({ mock: MockedRedis, limit: 25, remaining: 24 });
      });

      it("should return 200 when data exists", async () => {
        const { req, expectedIdPeriod } = reRequest();

        mockedGetIdPeriod.mockResolvedValue(IdPeriodTransactionData);

        const res = await GET(req);

        // ? MENGECEK STATUS
        const body = await res.json();

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(200);
        expect(body).toHaveLength(1);

        // ! Memastikan service dipanggil dengan parameter yang benar.
        expect(mockedGetIdPeriod).toHaveBeenCalledWith(expectedIdPeriod);
      });
      it("should return 200 when data didn't exists", async () => {
        const { req, expectedIdPeriod } = reRequest();

        mockedGetIdPeriod.mockResolvedValue([]);

        const res = await GET(req);

        // ? MENGECEK STATUS
        const body = await res.json();

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(404);

        expect(body).toEqual({
          message: "Data tidak ditemukan",
        });
        // ! Memastikan service dipanggil dengan parameter yang benar.
        expect(mockedGetIdPeriod).toHaveBeenCalledWith(expectedIdPeriod);
      });
      it("should return 500 when service throws an error", async () => {
        const { req, expectedIdPeriod } = reRequest();

        mockedGetIdPeriod.mockRejectedValue(new Error("Internal Server Error"));

        const res = await GET(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Internal Server Error",
        });

        expect(mockedGetIdPeriod).toHaveBeenCalledWith(expectedIdPeriod);
      });
    });
  });
});
