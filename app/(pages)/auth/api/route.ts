import { NextRequest, NextResponse } from "next/server";
import { CredentialRegister } from "@/_lib/services/auth/services-auth";
import { ratelimit } from "@/_lib/redis";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const clientId: string | undefined =
      cookieStore.get("register-client-id")?.value;
    const { reset, remaining, success } = await ratelimit.limit(
      `register:${clientId}`,
    );

    if (!success) {
      return NextResponse.json(
        {
          message:
            "Too many registration attempts. Please try again in a few minutes.",
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

    const key = req.nextUrl.searchParams.get("key");
    const { name, email, password, userType, createdAt } = await req.json();

    const covtDate = new Date(createdAt);

    switch (key) {
      case "register": {
        await CredentialRegister({
          name,
          email,
          password,
          userType,
          createdAt: covtDate,
        });
        return NextResponse.json({
          message: "Register Success",
        });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
