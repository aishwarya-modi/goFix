import { Pool, PoolConfig } from "pg";

const isServerless = process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME;

let pool: Pool | null = null;
const globalForDb = globalThis as unknown as { __pgPool: Pool | null };

function getPoolInstance(): Pool {
  if (isServerless) {
    if (!pool) {
      const config: PoolConfig = {
        connectionString: process.env.DATABASE_URL,
        max: 1,
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 5000,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
      };
      pool = new Pool(config);
      pool.on("error", (err) => {
        console.error("[DB] Unexpected pool error:", err.message);
      });
    }
    return pool;
  }

  if (!globalForDb.__pgPool) {
    const config: PoolConfig = {
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    };
    console.log("[DB] Creating pool with DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "UNSET");
    globalForDb.__pgPool = new Pool(config);
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
