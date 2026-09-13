import { NextRequest, NextResponse } from "next/server";

/**
 * Keep one public hostname so Google does not split indexing signals between
 * www and non-www versions of the same local landing pages.
 *
 * Vercel currently serves www as the production hostname, so redirect the
 * apex host in the same direction instead of creating a www <-> apex loop.
 */
export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (hostname === "septicpumpingquote.com") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.hostname = "www.septicpumpingquote.com";
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
