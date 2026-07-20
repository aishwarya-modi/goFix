import { NextRequest, NextResponse } from "next/server";
import { runMigrations } from "@/lib/migrations/run";

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    await runMigrations();
    return NextResponse.json({ success: true, message: "Migrations applied" });
  } catch (error) {
    console.error("[API] Migration failed:", error);
    return NextResponse.json(
      { error: "Migration failed", details: String(error) },
      { status: 500 }
    );
  }
}
