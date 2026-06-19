import { NextRequest, NextResponse } from "next/server";
import { PostTransaction } from "@/_lib/services/transaction/action/services-action-transaction-index";

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    // const { publicId } = await GetSession();

    const { id, nominal, images, nameTransaction, date, information } =
      await req.json();

    switch (key) {
      case "postTransaction": {
        await PostTransaction({
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
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
