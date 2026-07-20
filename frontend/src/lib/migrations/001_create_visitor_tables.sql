-- Visitor tracking tables for GoFix analytics

CREATE TABLE IF NOT EXISTS visitor_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    page VARCHAR(255) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL DEFAULT '',
    user_id VARCHAR(64)
);

CREATE INDEX IF NOT EXISTS idx_visitor_logs_timestamp ON visitor_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_page ON visitor_logs (page);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_ip ON visitor_logs (ip);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_user_id ON visitor_logs (user_id) WHERE user_id IS NOT NULL;

-- Partition by day for efficient queries and easy cleanup
-- (Optional: can be added later for high-traffic production)

-- Rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
    key VARCHAR(128) PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 1,
    window_start TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits (window_start);
