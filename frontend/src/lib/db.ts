import { Pool, PoolConfig } from "pg";

// For serverless (Vercel), use short-lived pools per invocation
// For long-running servers, use a persistent pool
const isServerless = process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME;

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: isServerless ? 1 : 10,
  idleTimeoutMillis: isServerless ? 0 : 30000,
  connectionTimeoutMillis: 5000,
  // SSL for production databases
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
};

// Use global to persist pool across hot reloads in dev (non-serverless only)
const globalForDb = globalThis as unknown as { __pgPool: Pool | null };

let pool: Pool | null = null;

function getPoolInstance(): Pool {
  if (isServerless) {
    // In serverless, create a new pool per invocation (no persistence)
    if (!pool) {
      pool = new Pool(poolConfig);
      pool.on("error", (err) => {
        console.error("[DB] Unexpected pool error:", err.message);
      });
    }
    return pool;
  }

  // In standard server, persist via globalThis
  if (!globalForDb.__pgPool) {
    globalForDb.__pgPool = new Pool(poolConfig);
    globalForDb.__pgPool.on("error", (err) => {
      console.error("[DB] Unexpected pool error:", err.message);
    });
  }
  return globalForDb.__pgPool;
}

export function getPool(): Pool {
  return getPoolInstance();
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] || null;
}

export async function execute(text: string, params?: any[]): Promise<{ rowCount: number }> {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return { rowCount: result.rowCount || 0 };
  } finally {
    client.release();
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    await query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}
