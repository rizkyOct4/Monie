import { NextRequest, NextResponse } from "next/server";
import {
  PostNewTransaction,
  PostCurrentTransaction,
} from "@/_lib/services/transaction/action/services-action-transaction-index";
import GetSession from "@/_lib/session";

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    const { publicId } = await GetSession();

    const {
      typeTransaction,
      initialNominal,
      currentId,
      id,
      nominal,
      images,
      nameTransaction,
      date,
      information,
    } = await req.json();

    switch (key) {
      case "postTransaction": {
        if (typeTransaction) {
          await PostNewTransaction({
            publicId,
            initialNominal,
            id,
            nominal,
            images,
            nameTransaction,
            date,
            information,
          });
          return NextResponse.json({
            message: "New Transaction Success",
          });
        } else {
          await PostCurrentTransaction({
            publicId,
            currentId,
            id,
            nominal,
            images,
            nameTransaction,
            date,
            information,
          });
          return NextResponse.json({
            message: "Transaction Success",
          });
        }
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
