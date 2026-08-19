import { POSTRegister } from "@/_lib/redis";
import { NextResponse } from "next/server";

interface IPOSTAuth {
  key: "register";
  clientId: string | undefined;
}

export const RedisAuthLimit = {
  POST: async (props: IPOSTAuth) => {
    const { key, clientId } = props;
    const { reset, remaining, success } = await POSTRegister.limit(
      `POST key:${key}, clientId:${clientId}`,
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
  },
};
