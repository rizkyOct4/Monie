import { NextRequest, NextResponse } from "next/server";
import { CredentialRegister } from "@/_lib/services/auth/services-auth";

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    const { name, email, password, userType } = await req.json();

    switch (key) {
      case "register": {
        await CredentialRegister({
          name,
          email,
          password,
          userType,
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
