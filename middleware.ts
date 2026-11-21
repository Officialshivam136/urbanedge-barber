import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "./lib/security";

// Malicious signature patterns for basic WAF inspection
const MALICIOUS_PATTERNS = [
  /(\.\.\/|\.\.\\)/i, // Directory traversal
  /<script/i, // Script injection
  /<\/script>/i,
  /javascript:/i, // JavaScript pseudo-protocol
  /onerror\s*=/i, // Inline handler injection
  /onload\s*=/i,
  /(union[\s+]+select|insert[\s+]+into|drop[\s+]+table|select[\s+]+.+[\s+]+from)/i, // SQL injection patterns
  /eval\s*\(/i, // Arbitrary code execution
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const rawUrl = request.url;

  // 1. Inspect URL, Query Strings, and parsed searchParams for malicious injection attempts (WAF filter)
  let decodedUrl = rawUrl;
  try {
    decodedUrl = decodeURIComponent(rawUrl);
  } catch {
    return new NextResponse(
      JSON.stringify({ error: "Forbidden: Malformed URI encoding detected.", status: 400 }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Check raw and decoded URL
  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(decodedUrl) || pattern.test(rawUrl)) {
      return new NextResponse(
        JSON.stringify({
          error: "Forbidden: Malicious request signature detected by firewall.",
          status: 403,
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // Check each parsed query param individually
  for (const [key, value] of searchParams.entries()) {
    const target = `${key} ${value}`;
    for (const pattern of MALICIOUS_PATTERNS) {
      if (pattern.test(target)) {
        return new NextResponse(
          JSON.stringify({
            error: "Forbidden: Malicious request signature detected by firewall in parameters.",
            status: 403,
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  }

  // 2. Client IP Extraction
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const clientIp = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : realIp || "127.0.0.1";

  // 3. Rate Limiting & Anti-DDoS Thresholds
  const isApiRoute = pathname.startsWith("/api");
  const limit = isApiRoute ? 25 : 120; // 25 reqs/min for API, 120 reqs/min for pages
  const windowMs = 60 * 1000; // 1-minute window

  const rateCheck = checkRateLimit(`${clientIp}_${isApiRoute ? "api" : "web"}`, limit, windowMs);

  if (!rateCheck.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: "Rate limit exceeded. Please wait a minute before retrying.",
        retryAfterSeconds: rateCheck.resetInSec,
        status: 429,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": rateCheck.resetInSec.toString(),
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // 4. Continue with Enhanced Security Headers
  const response = NextResponse.next();

  response.headers.set("X-RateLimit-Limit", limit.toString());
  response.headers.set("X-RateLimit-Remaining", rateCheck.remaining.toString());
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets (videos, static icons)
     */
    "/((?!_next/static|_next/image|favicon.ico|videos/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
