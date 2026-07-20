import { NextRequest, NextResponse } from "next/server";
import { addVisitor } from "@/lib/data/store";
import { checkRateLimit } from "@/lib/rate-limit";

const ALLOWED_PAGES = new Set([
  "/",
  "/challenge",
  "/security",
  "/learn",
  "/admin",
  "/login",
  "/signup",
]);

function sanitize(input: string, maxLen: number): string {
  return input.replace(/[<>]/g, "").slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 30 requests per minute per IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "127.0.0.1";

    const rateLimit = await checkRateLimit(`track:${ip}`, 30, 60_000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "30",
            "X-RateLimit-Remaining": "0",
            "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    // Parse and validate body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { page, userId } = body as { page?: string; userId?: string };

    if (!page || typeof page !== "string") {
      return NextResponse.json({ error: "page is required" }, { status: 400 });
    }

    // Validate page is an allowed route
    const cleanPage = sanitize(page, 255);
    if (!ALLOWED_PAGES.has(cleanPage) && !cleanPage.startsWith("/learn/")) {
      return NextResponse.json({ error: "Invalid page" }, { status: 400 });
    }

    // Validate userId if provided
    const cleanUserId = userId ? sanitize(userId, 64) : undefined;

    const userAgent = sanitize(request.headers.get("user-agent") || "", 512);

    const entry = await addVisitor({
      page: cleanPage,
      ip,
      user_agent: userAgent,
      user_id: cleanUserId,
    });

    return NextResponse.json(
      { success: true, id: entry.id },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("[API] Failed to track visitor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getVisitors } = await import("@/lib/data/store");
    const visitors = await getVisitors(100);
    return NextResponse.json({ visitors });
  } catch (error) {
    console.error("[API] Failed to get visitors:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
