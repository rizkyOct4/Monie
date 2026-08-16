import { NextRequest, NextResponse } from "next/server";
import {
  GetIdTransactions,
  GetSearchIdTransactions,
  GetTransactionList,
} from "@/_lib/services/transaction/services-transaction-index";
import GetSession from "@/_lib/session";

export async function GET(req: NextRequest) {
  try {
    const { publicId } = await GetSession();

    const key = req.nextUrl.searchParams.get("key");
    const date = req.nextUrl.searchParams.get("date-transaction");
    const search = req.nextUrl.searchParams.get("search-transaction") ?? "";
    const searchTransaction = date ? new Date(date) : "";
    const pageParam = Number(req.nextUrl.searchParams.get("page-param"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (pageParam - 1) * limit;

    // * PUT COMPONENT ======
    const idTransaction = req.nextUrl.searchParams.get("id-transaction") ?? "";

    switch (key) {
      case "idTransactions": {
        const output = await GetIdTransactions({
          publicId,
          limit,
          offset,
        });

        if (output.data.length === 0) {
          return NextResponse.json(
            { message: "Data tidak ditemukan" },
            { status: 404 },
          );
        } else {
          return NextResponse.json(output);
        }
      }
      case "searchTransactions": {
        const output = await GetSearchIdTransactions({
          publicId,
          search,
        });
        if (output.length === 0) {
          return NextResponse.json(
            { message: "Data tidak ditemukan" },
            { status: 404 },
          );
        } else {
          return NextResponse.json(output);
        }
      }
      case "transactions": {
        const output = await GetTransactionList({
          publicId,
          searchTransaction,
          offset,
          limit,
        });
        if (output.data.length === 0) {
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
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
