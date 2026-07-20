import { NextRequest, NextResponse } from "next/server";
import { runMigrations } from "@/lib/migrations/run";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("x-setup-key");
  if (authHeader !== process.env.SETUP_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
