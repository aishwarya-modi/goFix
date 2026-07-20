import { NextResponse } from "next/server";
import { healthCheck } from "@/lib/db";

export async function GET() {
  const dbHealthy = await healthCheck();

  const status = {
    status: dbHealthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    services: {
      database: dbHealthy ? "up" : "down",
    },
  };

  return NextResponse.json(status, {
    status: dbHealthy ? 200 : 503,
  });
}
