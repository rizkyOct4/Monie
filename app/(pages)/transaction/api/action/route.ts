import { NextRequest, NextResponse } from "next/server";
import {
  PostNewTransaction,
  PostCurrentTransaction,
  PutTransaction,
  DeleteTransaction,
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
      lastNominal,
      nominal,
      images,
      information,
      newImages,
      deleteImages,
      wrongDate
    } = await req.json();

    switch (key) {
      case "putTransaction": {
        await PutTransaction({
          publicId,
          existId,
          date,
          lastNominal,
          nominal,
          images,
          information,
          newImages,
          deleteImages,
          wrongDate
        });
        return NextResponse.json({
          message: "Update Transaction Success",
        });
      }
      // case "deleteTransaction": {
      //   await DeleteTransaction({
      //     publicId,
      //     refId,
      //     id,
      //     nominal,
      //   });
      //   return NextResponse.json({
      //     message: "Delete Transaction Success",
      //   });
      // }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

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
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
