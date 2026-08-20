import { NextRequest, NextResponse } from "next/server";
import {
  PostNewTransaction,
  PostCurrentTransaction,
  PutTransaction,
  DeleteTransaction,
} from "@/_lib/services/transaction/action/services-action-transaction-index";
import GetSession from "@/_lib/session";
import { REDIS_TRANSACTION_LIMIT } from "../../redis/ACTION-transaction.redis";

type TPostKey = "newPostTransaction" | "postTransaction";
export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key") as TPostKey;

    const { publicId } = await GetSession();

    const {
      id,
      existId,
      nameTransaction,
      initialNominal,
      date,
      status,
      nominal,
      images,
      information,
    } = await req.json();

    const convDate = new Date(date);

    switch (key) {
      case "newPostTransaction": {
        const checkLimit = await REDIS_TRANSACTION_LIMIT.POST({
          key,
          publicId,
        });
        if (checkLimit) return checkLimit;
        await PostNewTransaction({
          publicId,
          initialNominal,
          id,
          nameTransaction,
          date: convDate,
        });
        return NextResponse.json({
          message: "New Transaction Success",
        });
      }
      case "postTransaction": {
        const checkLimit = await REDIS_TRANSACTION_LIMIT.POST({
          key,
          publicId,
        });
        if (checkLimit) return checkLimit;
        await PostCurrentTransaction({
          publicId,
          id,
          existId,
          nominal,
          images,
          nameTransaction,
          date: convDate,
          information,
          status,
        });
        return NextResponse.json({
          message: "Transaction Success",
        });
      }
      default:
        return NextResponse.json({ message: "Invalid key" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

type TPutKey = "putTransaction";
export async function PUT(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key") as TPutKey;

    const { publicId } = await GetSession();

    const {
      existId,
      date,
      lastNominal,
      nominal,
      images,
      information,
      newImages,
      deleteImages,
      wrongDate,
    } = await req.json();

    const convDate = new Date(date);

    switch (key) {
      case "putTransaction": {
        await PutTransaction({
          publicId,
          existId,
          date: convDate,
          lastNominal,
          nominal,
          images,
          information,
          newImages,
          deleteImages,
          wrongDate,
        });
        return NextResponse.json({
          message: "Update Transaction Success",
        });
      }
      default:
        return NextResponse.json({ message: "Invalid key" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

type TDeleteKey = "deleteTransaction";
export async function DELETE(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key") as TDeleteKey;

    const { publicId } = await GetSession();

    const { id, refId, nominal } = await req.json();

    switch (key) {
      case "deleteTransaction": {
        await DeleteTransaction({
          publicId,
          refId,
          id,
          nominal,
        });
        return NextResponse.json({
          message: "Delete Transaction Success",
        });
      }
      default:
        return NextResponse.json({ message: "Invalid key" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
