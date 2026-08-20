/**
 * @jest-environment node
 */

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

    // ! CHECK JIKA SESSION NULL
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
    it("should return 404 when data didn't exists", async () => {
      // ? RETURN MOCK DATA =====
      mockedGetPeriodTransaction.mockResolvedValue([]);

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
      expect(mockedGetPeriodTransaction).toHaveBeenCalledWith(expectedPeriod);
    });
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

    it("should return 200 when data exists", async () => {
      const { IdPeriodTransactionData } = MockUseQueryIdPeriodTransactions();
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
