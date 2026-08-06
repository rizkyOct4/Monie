import { NextRequest, NextResponse } from "next/server";
import GetSession from "./_lib/session";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export const proxy = auth(async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/auth") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const { publicId } = await GetSession();

  if (!publicId) {
    return NextResponse.redirect(
      new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, req.url),
    );
  }

  return NextResponse.next();
});

// const proxy = async (req: NextRequest) => {
//   const pathname = req.nextUrl.pathname;

//   if (pathname.startsWith("/auth") || pathname.startsWith("/api/auth")) {
//     return NextResponse.next();
//   }

//   const { publicId } = await GetSession();

//   if (!publicId) {
//     return NextResponse.redirect(
//       new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, req.url),
//     );
//   }

//   return NextResponse.next();
// };
export default proxy;

export const config = {
  matcher: [
    // `/((?!|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)`,

    "/((?!auth|api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
    // `/((?!|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)`,
  ],
};
