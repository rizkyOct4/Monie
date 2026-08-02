/**
 * @jest-environment node
 */

import { parsePeriod } from "@/app/(pages)/report/hook/query/query-index";
import { NextRequest } from "next/server";
import { MockUseQueryIdPeriodTransactions } from "@/app/__mocks__/(pages)/report/hook/hook.index.mock";

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

import GetSession from "@/_lib/session";
import {
  GetPeriodTransaction,
  GetIdPeriodTransaction,
} from "@/_lib/services/report/services-report-index";
import { GET } from "@/app/(pages)/report/api/route";

// ? DI CAST INI UNTUK CASE TYPESCRIPT AGAR TAU INI MOCK
const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
const mockedGetPeriod = GetPeriodTransaction as jest.MockedFunction<
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

    // ! CHECK JIKA SESSION NULL
  });

  describe("CASE periodTransaction", () => {
    const req = createRequest("key=periodTransactions&month=7&year=2026");
    const expectedPeriod = {
      publicId: "ss12",
      month: 7,
      year: 2026,
    };

    it("should return 200 when data exists", async () => {
      // ? RETURN MOCK DATA =====
      mockedGetPeriod.mockResolvedValue([
        {
          id: "period-1",
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
          id: expect.any(String),
          initialName: expect.any(String),
        }),
      );

      // ! Memastikan service dipanggil dengan parameter yang benar.
      expect(mockedGetPeriod).toHaveBeenCalledWith(expectedPeriod);
    });
    it("should return 404 when data didn't exists", async () => {
      // ? RETURN MOCK DATA =====
      mockedGetPeriod.mockResolvedValue([]);

      const res = await GET(req);

      // ? MENGECEK BODY
      const body = await res.json();

      // ! Memastikan ada tidaknya data dari services
      expect(res.status).toBe(404);
      // expect(body).toHaveLength(1);

      expect(body).toEqual({
        message: "Data tidak ditemukan",
      });

      // ! Memastikan service dipanggil dengan parameter yang benar.
      expect(mockedGetPeriod).toHaveBeenCalledWith(expectedPeriod);
    });
    it("should return 500 when service throws an error", async () => {
      mockedGetPeriod.mockRejectedValue(new Error("Internal Server Error"));

      const res = await GET(req);
      const body = await res.json();

      expect(res.status).toBe(500);

      expect(body).toEqual({
        message: "Internal Server Error",
      });

      expect(mockedGetPeriod).toHaveBeenCalledWith(expectedPeriod);
    });
  });

  describe("CASE idPeriodTransaction", () => {
    const req = createRequest("key=idPeriodTransactions&id-period=Ts13ss");
    const expectedIdPeriod = {
      publicId: "ss12",
      idPeriod: "Ts13ss",
    };

    it("should return 200 when data exists", async () => {
      const { IdPeriodTransactionData } = MockUseQueryIdPeriodTransactions();
      mockedGetIdPeriod.mockResolvedValue(IdPeriodTransactionData);

      const res = await GET(req);

      // ? MENGECEK STATUS
      const body = await res.json();

      // ! Memastikan ada tidaknya data dari services
      expect(res.status).toBe(200);
      expect(body).toHaveLength(1);

      // ! Memastikan hasil yang dikirim ke client benar
      // expect(await res.json()).toEqual([
      //   {
      //     salaryIncome: 2000000,
      //     salaryRemaining: 1800000,
      //     createdAt: "2026-07-19T10:00:00.000Z",
      //     updatedAt: "2026-07-19T12:00:00.000Z",
      //     status: "ACTIVE",
      //     insight: [
      //       {
      //         totalTransaction: 10,
      //         biggestExpense: {
      //           date: "2026-07-19T10:00:00.000Z",
      //           amount: 500000,
      //         },
      //         averageExpense: 150000,
      //         amountNominal: 1500000,
      //         mostExpensiveDay: {
      //           date: "2026-07-19T10:00:00.000Z",
      //           amount: 800000,
      //         },
      //       },
      //     ],
      //   },
      // ]);

      // ! Memastikan service dipanggil dengan parameter yang benar.
      expect(mockedGetIdPeriod).toHaveBeenCalledWith(expectedIdPeriod);
    });
    it("should return 404 when data didn't exists", async () => {
      mockedGetIdPeriod.mockResolvedValue([]);

      const res = await GET(req);

      // ? MENGECEK STATUS
      const body = await res.json();

      // ! Memastikan ada tidaknya data dari services
      expect(res.status).toBe(404);

      expect(body).toEqual({
        message: "Data tidak ditemukan",
      });

      // ! Memastikan hasil yang dikirim ke client benar
      // expect(await res.json()).toEqual([
      //   {
      //     salaryIncome: 2000000,
      //     salaryRemaining: 1800000,
      //     createdAt: "2026-07-19T10:00:00.000Z",
      //     updatedAt: "2026-07-19T12:00:00.000Z",
      //     status: "ACTIVE",
      //     insight: [
      //       {
      //         totalTransaction: 10,
      //         biggestExpense: {
      //           date: "2026-07-19T10:00:00.000Z",
      //           amount: 500000,
      //         },
      //         averageExpense: 150000,
      //         amountNominal: 1500000,
      //         mostExpensiveDay: {
      //           date: "2026-07-19T10:00:00.000Z",
      //           amount: 800000,
      //         },
      //       },
      //     ],
      //   },
      // ]);

      // ! Memastikan service dipanggil dengan parameter yang benar.
      expect(mockedGetIdPeriod).toHaveBeenCalledWith(expectedIdPeriod);
    });
    it("should return 500 when service throws an error", async () => {
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

// * HELPER FUNCTION ================
describe("parse period transactions", () => {
  it("return Month and Year", () => {
    expect(parsePeriod("2026-07")).toEqual({
      month: "07",
      year: "2026",
    });
  });
});
