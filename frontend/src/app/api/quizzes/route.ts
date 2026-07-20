import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicSlug = searchParams.get("topic");
    const userId = searchParams.get("userId");

    if (!topicSlug) {
      return NextResponse.json({ error: "topic is required" }, { status: 400 });
    }

    // Get quizzes for topic (or all if topic is "all")
    const quizzes = topicSlug === "all"
      ? await query(
          "SELECT id, topic_slug, question, options, correct_index, explanation, difficulty, sort_order FROM quizzes ORDER BY topic_slug, sort_order"
        )
      : await query(
          "SELECT id, topic_slug, question, options, correct_index, explanation, difficulty, sort_order FROM quizzes WHERE topic_slug = $1 ORDER BY sort_order",
          [topicSlug]
        );

    if (quizzes.length === 0) {
      return NextResponse.json({
        quizzes: [],
        stats: { total: 0, attempted: 0, correct: 0 },
      });
    }

    // Get user's attempt stats if userId provided
    let stats = { total: quizzes.length, attempted: 0, correct: 0 };
    if (userId) {
      const attemptStats = topicSlug === "all"
        ? await queryOne<{ attempted: string; correct: string }>(
            `SELECT
               COUNT(DISTINCT quiz_id) as attempted,
               COUNT(*) FILTER (WHERE is_correct = TRUE) as correct
             FROM quiz_attempts
             WHERE user_id = $1`,
            [userId]
          )
        : await queryOne<{ attempted: string; correct: string }>(
            `SELECT
               COUNT(DISTINCT quiz_id) as attempted,
               COUNT(*) FILTER (WHERE is_correct = TRUE) as correct
             FROM quiz_attempts
             WHERE user_id = $1 AND topic_slug = $2`,
            [userId, topicSlug]
          );

      stats = {
        total: quizzes.length,
        attempted: parseInt(attemptStats?.attempted || "0", 10),
        correct: parseInt(attemptStats?.correct || "0", 10),
      };
    }

    return NextResponse.json({ quizzes, stats });
  } catch (error) {
    console.error("[API] Failed to get quizzes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, quizId, selectedIndex } = body;

    if (!userId || !quizId || selectedIndex === undefined) {
      return NextResponse.json(
        { error: "userId, quizId, and selectedIndex are required" },
        { status: 400 }
      );
    }

    // Get the quiz to check correct answer
    const quiz = await queryOne<{ id: number; topic_slug: string; correct_index: number }>(
      "SELECT id, topic_slug, correct_index FROM quizzes WHERE id = $1",
      [quizId]
    );

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const isCorrect = quiz.correct_index === selectedIndex;

    // Record the attempt
    await query(
      `INSERT INTO quiz_attempts (user_id, topic_slug, quiz_id, selected_index, is_correct)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, quiz.topic_slug, quizId, selectedIndex, isCorrect]
    );

    // Get updated stats
    const stats = await queryOne<{ attempted: string; correct: string }>(
      `SELECT
         COUNT(DISTINCT quiz_id) as attempted,
         COUNT(*) FILTER (WHERE is_correct = TRUE) as correct
       FROM quiz_attempts
       WHERE user_id = $1 AND topic_slug = $2`,
      [userId, quiz.topic_slug]
    );

    return NextResponse.json({
      success: true,
      isCorrect,
      correctIndex: quiz.correct_index,
      stats: {
        attempted: parseInt(stats?.attempted || "0", 10),
        correct: parseInt(stats?.correct || "0", 10),
      },
    });
  } catch (error) {
    console.error("[API] Failed to submit quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
