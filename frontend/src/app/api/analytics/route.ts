import { NextRequest, NextResponse } from "next/server";
import { getAnalytics } from "@/lib/data/store";

// Simple token-based auth for analytics endpoint
// In production, use proper session/JWT validation
function isAuthenticated(request: NextRequest): boolean {
  const expectedToken = process.env.ANALYTICS_API_KEY;

  if (!expectedToken) return true;

  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "").trim();
  return token === expectedToken;
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const analytics = await getAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error("[API] Failed to get analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
