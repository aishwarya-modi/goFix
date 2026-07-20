import { query, queryOne, execute } from "@/lib/db";

export interface VisitorLog {
  id: string;
  timestamp: string;
  page: string;
  ip: string;
  user_agent: string;
  user_id?: string;
}

export async function addVisitor(
  data: Omit<VisitorLog, "id" | "timestamp">
): Promise<VisitorLog> {
  const id = `v-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    const row = await queryOne<VisitorLog>(
      `INSERT INTO visitor_logs (id, page, ip, user_agent, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, data.page, data.ip, data.user_agent, data.user_id || null]
    );

    if (!row) {
      throw new Error("No row returned from INSERT");
    }

    return row;
  } catch (err) {
    console.error("[Store] Failed to add visitor:", err);
    throw err;
  }
}

export async function getVisitors(limit = 1000): Promise<VisitorLog[]> {
  return query<VisitorLog>(
    "SELECT * FROM visitor_logs ORDER BY timestamp DESC LIMIT $1",
    [limit]
  );
}

export async function getAnalytics() {
  const [totalRow, uniqueRow, todayRow, topPages, dailyVisits, recentLogs] =
    await Promise.all([
      queryOne<{ count: string }>("SELECT COUNT(*) as count FROM visitor_logs"),
      queryOne<{ count: string }>(
        "SELECT COUNT(DISTINCT ip) as count FROM visitor_logs"
      ),
      queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM visitor_logs
         WHERE timestamp >= CURRENT_DATE`,
      ),
      query<{ page: string; count: string }>(
        `SELECT page, COUNT(*) as count FROM visitor_logs
         GROUP BY page ORDER BY count DESC LIMIT 10`
      ),
      query<{ date: string; count: string }>(
        `SELECT DATE(timestamp)::text as date, COUNT(*) as count
         FROM visitor_logs
         WHERE timestamp >= CURRENT_DATE - INTERVAL '6 days'
         GROUP BY DATE(timestamp)
         ORDER BY date`
      ),
      query<VisitorLog>(
        "SELECT * FROM visitor_logs ORDER BY timestamp DESC LIMIT 50"
      ),
    ]);

  const dailyMap: Record<string, number> = {};
  dailyVisits.forEach((d) => {
    dailyMap[d.date] = parseInt(d.count, 10);
  });

  return {
    totalVisits: parseInt(totalRow?.count || "0", 10),
    uniqueVisitors: parseInt(uniqueRow?.count || "0", 10),
    visitsToday: parseInt(todayRow?.count || "0", 10),
    topPages: topPages.map((p) => ({ page: p.page, count: parseInt(p.count, 10) })),
    dailyVisits: dailyMap,
    recentLogs,
  };
}
