import { NextRequest, NextResponse } from "next/server";
import GetSession from "@/_lib/session";
import {
  GetPeriodTransaction,
  GetIdPeriodTransaction,
} from "@/_lib/services/report/services-report-index";

export async function GET(req: NextRequest) {
  try {
    const { publicId } = await GetSession();

    const key = req.nextUrl.searchParams.get("key");

    // ? PERIOD TRANSACTION =========
    const month = Number(req.nextUrl.searchParams.get("month"));
    const year = Number(req.nextUrl.searchParams.get("year"));

    // ? ID PERIOD TRANSACTION =========
    const idPeriod = req.nextUrl.searchParams.get("id-period") ?? "";

    const pageParam = Number(req.nextUrl.searchParams.get("page-param"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (pageParam - 1) * limit;

    switch (key) {
      case "periodTransactions": {
        const output = await GetPeriodTransaction({
          publicId,
          month,
          year,
        });

        if (!output.length) {
          return NextResponse.json(
            { message: "Data tidak ditemukan" },
            { status: 404 },
          );
        } else {
          return NextResponse.json(output);
        }
      }
      case "idPeriodTransactions": {
        const output = await GetIdPeriodTransaction({
          publicId,
          idPeriod,
        });
        if (!output.length) {
          return NextResponse.json(
            { message: "Data tidak ditemukan" },
            { status: 404 },
          );
        } else {
          return NextResponse.json(output);
        }
      }
      default:
        return NextResponse.json({ message: "Invalid key" }, { status: 400 });
    }
  } catch (err) {
    // console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
