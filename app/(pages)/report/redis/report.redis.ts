import { NextResponse } from "next/server";
import { GETIDPeriodTransactions } from "@/_lib/redis";

export type TGETProps = {
  key: "periodTransactions" | "idPeriodTransactions";
  publicId: string;
};

export const REDIS_REPORT_LIMIT = {
  GET: async (props: TGETProps) => {
    const { key, publicId } = props;

    const { reset, remaining, success } = await GETIDPeriodTransactions.limit(
      `GET key:${key}, publicId:${publicId}`,
    );

    switch (key) {
      case "periodTransactions":
      case "idPeriodTransactions": {
        if (!success) {
          return NextResponse.json(
            {
              message:
                "Too many Requests attempts. Please try again in a few second.",
            },
            {
              status: 429,
              headers: {
                "X-RateLimit-Remaining": remaining.toString(),
                "X-RateLimit-Reset": reset.toString(),
              },
            },
          );
        }
      }
    }
  },
};
