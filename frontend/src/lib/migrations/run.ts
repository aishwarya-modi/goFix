import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { getPool, query } from "@/lib/db";

export async function runMigrations() {
  const migrationsDir = join(process.cwd(), "src", "lib", "migrations");

  // Create migrations tracking table (using unique name to avoid conflict with Go backend)
  await query(`
    CREATE TABLE IF NOT EXISTS nextjs_migrations (
      version VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // Get already applied migrations
  const applied = await query<{ version: string }>(
    "SELECT version FROM nextjs_migrations ORDER BY version"
  );
  const appliedSet = new Set(applied.map((r) => r.version));

  // Read migration files
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (appliedSet.has(file)) continue;

    console.log(`[DB] Applying migration: ${file}`);
    const sql = readFileSync(join(migrationsDir, file), "utf-8");

    const client = await getPool().connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        "INSERT INTO nextjs_migrations (version) VALUES ($1)",
        [file]
      );
      await client.query("COMMIT");
      console.log(`[DB] Migration ${file} applied successfully`);
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(`[DB] Migration ${file} failed:`, err);
      throw err;
    } finally {
      client.release();
    }
  }
}
