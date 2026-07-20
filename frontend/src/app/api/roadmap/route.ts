import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

interface RoadmapTopic {
  id: number;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  description: string | null;
  resource_url: string | null;
  sort_order: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");

    let sql = "SELECT * FROM roadmap_topics";
    const params: any[] = [];
    const conditions: string[] = [];

    if (category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }
    if (difficulty) {
      conditions.push(`difficulty = $${params.length + 1}`);
      params.push(difficulty);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += " ORDER BY category, sort_order, title";

    const topics = await query<RoadmapTopic>(sql, params);

    // Group by category
    const grouped: Record<string, RoadmapTopic[]> = {};
    topics.forEach((topic) => {
      if (!grouped[topic.category]) {
        grouped[topic.category] = [];
      }
      grouped[topic.category].push(topic);
    });

    return NextResponse.json({
      total: topics.length,
      categories: Object.keys(grouped).length,
      topics,
      grouped,
    });
  } catch (error) {
    console.error("[API] Failed to get roadmap:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
