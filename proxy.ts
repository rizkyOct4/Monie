import { NextRequest, NextResponse } from "next/server";
import GetSession from "./_lib/session";
import { cookies } from "next/headers";
import { AnonymousId, Authentication, Forbidden } from "./_lib/proxy";

const proxy = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const pathname = req.nextUrl.pathname;

  const clientId = cookieStore.get("register-client-id")?.value;

  // ? CREATE NEW COOKIES ANONYMOUS =====
  const anonymous = await AnonymousId(clientId);
  if (anonymous) return anonymous;

  if (pathname.startsWith("/auth") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const { publicId } = await GetSession();

  // ? CHECK AUTH =====
  const auth = Authentication(req, pathname, publicId);
  if (auth) return auth;
  
  // ? FORBIDDEN =====
  const forb = Forbidden(req, clientId, publicId);
  if (forb) return forb;

  return NextResponse.next();
};
export default proxy;

export const config = {
  matcher: [
    "/((?!auth|docs|cv|api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
    // `/((?!|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)`,
  ],
};

// const TRIAL_DAYS = 30;

// const proxy = async (req: NextRequest) => {
//   const pathname = req.nextUrl.pathname;

//   if (pathname.startsWith("/api/auth")) {
//     return NextResponse.next();
//   }

//   const { publicId } = await GetSession();

//   // User sudah login → langsung lanjut
//   if (publicId) {
//     return NextResponse.next();
//   }

//   const consent = req.cookies.get("cookie-consent")?.value;
//   const anonymousId = req.cookies.get("anonymous-id")?.value;
//   const trialExpires = req.cookies.get("trial-expires")?.value;

//   // Belum punya trial cookie → buat trial baru
//   if (consent === "accepted") {
//     const response = NextResponse.redirect(
//       new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, req.url),
//     );

//     const expires = new Date();

//     expires.setDate(expires.getDate() + TRIAL_DAYS);

//     response.cookies.set("anonymous-id", nanoid(), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       expires,
//     });

//     response.cookies.set("trial-expires", expires.toISOString(), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       expires,
//     });

//     return response;
//   }

//   // Trial masih aktif
//   const expiresAt = new Date(trialExpires).getTime();

//   if (Date.now() < expiresAt) {
//     return NextResponse.next();
//   }

//   // Trial sudah habis
//   return NextResponse.redirect(
//     new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, req.url),
//   );
// };

// export default proxy;

// export const config = {
//   matcher: [
//     "/((?!auth|docs|transaction|report|setting|cv|api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
//     // `/((?!|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)`,
//   ],
// };
