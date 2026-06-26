import { NextRequest, NextResponse } from "next/server";
import {
  PostNewTransaction,
  PostCurrentTransaction,
  PutTransaction,
} from "@/_lib/services/transaction/action/services-action-transaction-index";
import GetSession from "@/_lib/session";

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    const { publicId } = await GetSession();

    const {
      id,
      existId,
      nameTransaction,
      initialNominal,
      date,
      nominal,
      images,
      information,
    } = await req.json();

    switch (key) {
      case "newPostTransaction": {
        await PostNewTransaction({
          publicId,
          initialNominal,
          id,
          nameTransaction,
          date,
        });
        return NextResponse.json({
          message: "New Transaction Success",
        });
      }
      case "postTransaction": {
        await PostCurrentTransaction({
          publicId,
          id,
          existId,
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

export async function PUT(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    const { publicId } = await GetSession();

    const {
      existId,
      date,
      nominal,
      images,
      information,
      newImages,
      deleteImages,
    } = await req.json();

    switch (key) {
      case "putTransaction": {
        await PutTransaction({
          publicId,
          existId,
          date,
          nominal,
          images,
          information,
          newImages,
          deleteImages
        });
        return NextResponse.json({
          message: "Update Transaction Success",
        });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
