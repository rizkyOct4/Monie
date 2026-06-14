import { NextRequest, NextResponse } from "next/server";
import GetSession from "./_lib/session";

const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const { publicId } = await GetSession();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  if (!publicId) {
    return NextResponse.redirect(
      new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, req.url),
    );
  }

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: [
    "/((?!auth|api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
};
