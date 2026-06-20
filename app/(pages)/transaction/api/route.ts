import { NextRequest, NextResponse } from "next/server";
import { GetTransactionList } from "@/_lib/services/transaction/services-transaction-index";
import GetSession from "@/_lib/session";

export async function GET(req: NextRequest) {
  try {
    const { publicId } = await GetSession();

    const key = req.nextUrl.searchParams.get("key");
    const date = req.nextUrl.searchParams.get("search-transaction");
    const searchTransaction = date ? new Date(date) : "";
    const pageParam = Number(req.nextUrl.searchParams.get("page-param"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));

    const offset = (pageParam - 1) * limit;

    switch (key) {
      case "searchTransactions": {
        const output = await GetTransactionList({
          publicId,
          searchTransaction,
          offset,
          limit,
        });
        return NextResponse.json(output);
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
