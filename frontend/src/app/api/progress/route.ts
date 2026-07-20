import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, execute } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Get user's progress
    const progress = await query(
      "SELECT topic_slug, completed, bookmarked, notes, completed_at FROM user_progress WHERE user_id = $1",
      [userId]
    );

    // Get overall stats
    const stats = await queryOne<{ total: string; completed: string; bookmarked: string }>(
      `SELECT
         COUNT(*) as total,
         COUNT(*) FILTER (WHERE completed = TRUE) as completed,
         COUNT(*) FILTER (WHERE bookmarked = TRUE) as bookmarked
       FROM user_progress WHERE user_id = $1`,
      [userId]
    );

    // Get progress by category
    const categoryProgress = await query(
      `SELECT r.category,
         COUNT(*) as total,
         COUNT(CASE WHEN up.completed = TRUE THEN 1 END) as completed
       FROM roadmap_topics r
       LEFT JOIN user_progress up ON r.slug = up.topic_slug AND up.user_id = $1
       GROUP BY r.category
       ORDER BY r.category`,
      [userId]
    );

    return NextResponse.json({
      progress,
      stats: {
        total: parseInt(stats?.total || "0", 10),
        completed: parseInt(stats?.completed || "0", 10),
        bookmarked: parseInt(stats?.bookmarked || "0", 10),
      },
      categoryProgress,
    });
  } catch (error) {
    console.error("[API] Failed to get progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, topicSlug, completed, bookmarked, notes } = body;

    if (!userId || !topicSlug) {
      return NextResponse.json(
        { error: "userId and topicSlug are required" },
        { status: 400 }
      );
    }

    const result = await queryOne(
      `INSERT INTO user_progress (user_id, topic_slug, completed, bookmarked, notes, completed_at)
       VALUES ($1, $2, $3, $4, $5, CASE WHEN $3 = TRUE THEN NOW() ELSE NULL END)
       ON CONFLICT (user_id, topic_slug)
       DO UPDATE SET
         completed = COALESCE($3, user_progress.completed),
         bookmarked = COALESCE($4, user_progress.bookmarked),
         notes = COALESCE($5, user_progress.notes),
         completed_at = CASE
           WHEN $3 = TRUE AND user_progress.completed = FALSE THEN NOW()
           WHEN $3 = FALSE THEN NULL
           ELSE user_progress.completed_at
         END
       RETURNING *`,
      [userId, topicSlug, completed ?? false, bookmarked ?? false, notes ?? null]
    );

    return NextResponse.json({ success: true, progress: result });
  } catch (error) {
    console.error("[API] Failed to update progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
