import { render } from "@testing-library/react";
// import ReportPage from "@/app/(pages)/report/page";
import { parsePeriod } from "@/app/(pages)/report/hook/query/query-index";
import { NextRequest } from "next/server";
import GetSession from "@/_lib/session";
import {
  GetPeriodTransaction,
  GetIdPeriodTransaction,
} from "@/_lib/services/report/services-report-index";
import { GET } from "@/app/(pages)/report/api/route";

// jest.mock("@/_lib/session");
// jest.mock("@/_lib/services/report/services-report-index");

// const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
// const mockedGetPeriod = GetPeriodTransaction as jest.MockedFunction<
//   typeof GetPeriodTransaction
// >;
// const mockedGetIdPeriod = GetIdPeriodTransaction as jest.MockedFunction<
//   typeof GetIdPeriodTransaction
// >;

// * MOCK API =========
// describe("GET /report/api?key=periodTransactions&month=7&year=2026", () => {
//   it("returns period transactions", async () => {
//     // ? RETURN FROM EACH FUNCTION =====
//     mockedSession.mockResolvedValue({
//       publicId: "user-123",
//       name: "budi",
//     });

//     mockedGetPeriod.mockResolvedValue([
//       {
//         id: "period-1",
//         initialName: "Asking",
//       },
//     ]);

//     const req = new NextRequest(
//       "http://localhost/report/api?key=periodTransactions&month=7&year=2026",
//       { method: "GET" },
//     );

//     const res = await GET(req);

//     expect(res.status).toBe(200);

//     expect(await res.json()).toEqual([
//       {
//         id: "period-1",
//       },
//     ]);

//     expect(mockedGetPeriod).toHaveBeenCalledWith({
//       publicId: "user-123",
//       month: 7,
//       year: 2026,
//     });
//   });
// });

// * HELPER FUNCTION ================
describe("parse period transactions", () => {
  it("return Month and Year", () => {
    expect(parsePeriod("2026-07")).toEqual({
      month: "07",
      year: "2026",
    });
  });
});



// todo ROUTE MOCK API TEST BESOK SAMA KAU !!