import { GETTransactionsLimit } from "@/_lib/redis";
import { NextResponse } from "next/server";

interface IRedisTransactionsLimitProps {
  key: string | null;
  publicId: string;
}

export const RedisTransactionsLimit = async ({
  key = "transactions",
  publicId,
}: IRedisTransactionsLimitProps) => {
  const { reset, remaining, success } = await GETTransactionsLimit.limit(
    `Get key:${key}, publicId:${publicId}`,
  );

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
};
