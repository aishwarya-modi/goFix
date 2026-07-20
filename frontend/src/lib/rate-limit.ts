import { queryOne, execute } from "@/lib/db";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  try {
    const windowStart = new Date(Date.now() - windowMs).toISOString();

    // Clean up old entries periodically
    await execute(
      "DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '1 hour'"
    );

    // Get current count
    const row = await queryOne<{ count: string }>(
      "SELECT COUNT(*) as count FROM rate_limits WHERE key = $1 AND window_start > $2",
      [key, windowStart]
    );

    const currentCount = parseInt(row?.count || "0", 10);

    if (currentCount >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: Date.now() + windowMs,
      };
    }

    // Record this request
    await execute(
      "INSERT INTO rate_limits (key, count, window_start) VALUES ($1, 1, NOW())",
      [key]
    );

    return {
      allowed: true,
      remaining: maxRequests - currentCount - 1,
      resetAt: Date.now() + windowMs,
    };
  } catch (err) {
    console.error("[RateLimit] Error:", err);
    // If rate limiting fails, allow the request
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: Date.now() + windowMs,
    };
  }
}
