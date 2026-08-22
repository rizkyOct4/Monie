import { NextRequest, NextResponse } from "next/server";
import GetSession from "@/_lib/session";
import {
  GetPeriodTransaction,
  GetIdPeriodTransaction,
} from "@/_lib/services/report/services-report-index";
import { GETVTotalTransactions } from "@/_lib/services/report/v/services-report-views";
import { REDIS_REPORT_LIMIT } from "../redis/report.redis";

export async function GET(req: NextRequest) {
  try {
    const { publicId } = await GetSession();

    const key = req.nextUrl.searchParams.get("key");

    // ? PERIOD TRANSACTION =========
    const period = req.nextUrl.searchParams.get("period") ?? "";

    // ? ID PERIOD TRANSACTION =========
    const idPeriod = req.nextUrl.searchParams.get("id-period") ?? "";

    const pageParam = Number(req.nextUrl.searchParams.get("page-param"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (pageParam - 1) * limit;

    switch (key) {
      case "periodTransactions": {
        const output = await GetPeriodTransaction({
          publicId,
          period,
        });

        // if (!output.length) {
        //   return NextResponse.json(
        //     { message: "Data tidak ditemukan" },
        //     { status: 404 },
        //   );
        // } else {
        return NextResponse.json(output);
        // }
      }
      case "idPeriodTransactions": {
        const redis = await REDIS_REPORT_LIMIT.GET({
          key: "idPeriodTransactions",
          publicId: publicId,
        });
        if (redis) return redis;

        const output = await GetIdPeriodTransaction({
          publicId,
          idPeriod,
        });
        // if (!output.length) {
        //   return NextResponse.json(
        //     { message: "Data tidak ditemukan" },
        //     { status: 404 },
        //   );
        // } else {
        return NextResponse.json(output);
        // }
      }
      case "viewTotalTransactions": {
        const nameTransaction = req.nextUrl.searchParams.get("id") ?? "";
        // const redis = await REDIS_REPORT_LIMIT.GET({
        //   key: "idPeriodTransactions",
        //   publicId: publicId,
        // });
        // if (redis) return redis;

        const output = await GETVTotalTransactions({
          publicId,
          nameTransaction,
          limit,
          offset,
        });
        // if (output.length === 0) {
        //   return NextResponse.json(
        //     { message: "Data tidak ditemukan" },
        //     { status: 404 },
        //   );
        // } else {
          return NextResponse.json(output);
        // }
      }
      default:
        return NextResponse.json({ message: "Invalid key" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
