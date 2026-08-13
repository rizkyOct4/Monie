/**
 * @jest-environment node
 */

import {
  GetIdTransactions,
  GetSearchIdTransactions,
  GetTransactionList,
} from "@/_lib/services/transaction/services-transaction-index";
import { NextRequest } from "next/server";
import GetSession from "@/_lib/session";
import { GET } from "@/app/(pages)/transaction/api/route";

jest.mock("@/_lib/services/transaction/services-transaction-index", () => ({
  GetIdTransactions: jest.fn(),
  GetSearchIdTransactions: jest.fn(),
  GetTransactionList: jest.fn(),
}));

jest.mock("@/_lib/session", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
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
  new NextRequest(`http://localhost/transaction/api?${query}`, { method: "GET" });

describe("GET /transaction/api", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedSession.mockResolvedValue({
      publicId: "ss12",
      name: "Asking",
    });

    // ! CHECK JIKA SESSION NULL
  });

  describe("CASE condition", () => {
    describe("idTransactions", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      const req = createRequest("key=idTransactions&page-param=1&limit=15");
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
      it("should return 404 when data didn't exists", async () => {
        // ? RETURN MOCK DATA =====
        mockedGetIdTransactions.mockResolvedValue({
          data: [],
          hasMore: false,
        });

        const res = await GET(req);

        // ? MENGECEK BODY
        const body = await res.json();

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(404); // ? HTTP response
        expect(body).toEqual({
          message: "Data tidak ditemukan",
        });

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
        "key=searchTransactions&search-transaction=randomse",
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
      it("should return 404 when data didn't exists", async () => {
        // ? RETURN MOCK DATA =====
        mockedGetSearchIdTransactions.mockResolvedValue([]);

        const res = await GET(req);

        // ? MENGECEK BODY
        const body = await res.json();

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(404); // ? HTTP response
        expect(body).toEqual({
          message: "Data tidak ditemukan",
        });

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
    describe("transactions", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      const req = createRequest(
        "key=transactions&date-transaction=2026-08-10&page-param=1&limit=15",
      );
      const expectedCalled = {
        publicId: "ss12",
        searchTransaction: new Date("2026-08-10T00:00:00.000Z"),
        offset: 0,
        limit: 15,
      };
      it("should return 200 when data exists", async () => {
        // ? RETURN MOCK DATA =====
        mockedGetTransationList.mockResolvedValue({
          data: [
            {
              id: "random-1",
              status: "ACTIVE",
              refId: "s012",
              information: "Lorem123",
              nominal: 4000,
              createdAt: new Date("2026-08-10T11:11:00.000Z"),
              updatedAt: new Date("2026-08-07T11:11:00.000Z"),
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

        const res = await GET(req);

        // ? MENGECEK BODY
        const body = await res.json();

        // console.log(body)

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(200);
        expect(body.data).toHaveLength(1);

        // ! Memastikan service dipanggil dengan parameter yang benar.
        expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
      });
      it("should return 404 when data didn't exists", async () => {
        // ? RETURN MOCK DATA =====
        mockedGetTransationList.mockResolvedValue({
          data: [],
          hasMore: false,
        });

        const res = await GET(req);

        // ? MENGECEK BODY
        const body = await res.json();

        // ! Memastikan ada tidaknya data dari services
        expect(res.status).toBe(404); // ? HTTP response
        expect(body).toEqual({
          message: "Data tidak ditemukan",
        });

        // ! Memastikan service dipanggil dengan parameter yang benar.
        expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
      });
      it("should return 500 when service throws an error", async () => {
        mockedGetTransationList.mockRejectedValue(new Error("Internal Server Error"));

        const res = await GET(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Internal Server Error",
        });

        expect(mockedGetTransationList).toHaveBeenCalledWith(expectedCalled);
      });
    });
    // describe("has no key", () => {
    //   const req = createRequest("");

    // })
  });
});
