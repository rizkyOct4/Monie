import { NextResponse } from "next/server";
import { POSTTransactionsLimit } from "@/_lib/redis";

export type POSTProps = {
  key: "newPostTransaction" | "postTransaction";
  publicId: string;
};

export const REDIS_TRANSACTION_LIMIT = {
  POST: async (props: POSTProps) => {
    const { key, publicId } = props;

    const { reset, remaining, success } = await POSTTransactionsLimit.limit(
      `POST key:${key}, publicId:${publicId}`,
    );

    switch (key) {
      case "newPostTransaction":
      case "postTransaction": {
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
