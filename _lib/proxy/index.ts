import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export const AnonymousId = async (clientId: string | undefined) => {
  const cookieStore = await cookies();

  if (!clientId) {
    clientId = nanoid();

    return cookieStore.set("register-client-id", clientId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
};

export const Authentication = (
  req: NextRequest,
  pathname: string,
  publicId: string,
) => {
  if (!publicId) {
    return NextResponse.redirect(
      new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, req.url),
    );
  }
};

export const Forbidden = (
  req: NextRequest,
  clientId: string | undefined,
  publicId: string | undefined,
) => {
  const origin = req.headers.get("origin");

  const isInvalidOrigin =
    origin !== null && origin !== process.env.NEXT_PUBLIC_APP_URL;

  const isMutation = req.method !== "GET";

  const isMissingClient = !clientId;

  if (
    isInvalidOrigin ||
    (isMutation && isMissingClient) ||
    (isMutation && !publicId)
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
};
