import { NextRequest, NextResponse } from "next/server";
import { CredentialRegister } from "@/_lib/services/auth/services-auth";
import { RedisAuthLimit } from "../redis/post-redis-limit";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const clientId: string | undefined =
      cookieStore.get("register-client-id")?.value;

    const key = req.nextUrl.searchParams.get("key");
    const { name, email, password, userType, createdAt } = await req.json();

    const covtDate = new Date(createdAt);

    switch (key) {
      case "register": {
        const redis = RedisAuthLimit.POST({ key, clientId });
        if (redis) return redis;

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
