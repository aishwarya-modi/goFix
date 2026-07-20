export interface Issue {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  category: "security" | "architecture" | "best-practice" | "testing";
  file: string;
  line?: string;
  description: string;
  impact: string;
  solution: string;
  badCode: string;
  goodCode: string;
}

export const issues: Issue[] = [
  {
    id: "hardcoded-credentials",
    title: "Hardcoded Database Credentials",
    severity: "critical",
    category: "security",
    file: "cmd/main.go",
    line: "20",
    description:
      'Database credentials ("admin", "admin") are hardcoded directly in the source code. These values are visible to anyone with access to the repository.',
    impact:
      "Credential leakage can lead to unauthorized database access, data breaches, and compliance violations. If the repo is public, the database is immediately compromised.",
    solution:
      "Use environment variables or a secrets manager. Load credentials at runtime, never commit them to version control.",
    badCode: `svc, err := user.NewService("admin", "admin")`,
    goodCode: `svc, err := user.NewService(
    os.Getenv("DB_USER"),
    os.Getenv("DB_PASSWORD"),
)`,
  },
  {
    id: "hardcoded-connection",
    title: "Hardcoded Connection String",
    severity: "critical",
    category: "security",
    file: "cmd/main.go",
    line: "35",
    description:
      'The full PostgreSQL connection string with credentials is hardcoded: "postgres://admin:admin@localhost/test_repo?sslmode=disable"',
    impact:
      "Exposes host, port, database name, and credentials in source code. Changes require code modification and redeployment.",
    solution:
      "Construct the connection string from individual environment variables, or use a configuration file excluded from version control.",
    badCode: `dbURL := "postgres://admin:admin@localhost/test_repo?sslmode=disable"`,
    goodCode: `dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
    os.Getenv("DB_USER"),
    os.Getenv("DB_PASSWORD"),
    os.Getenv("DB_HOST"),
    os.Getenv("DB_PORT"),
    os.Getenv("DB_NAME"),
)`,
  },
  {
    id: "sql-injection",
    title: "SQL Injection Vulnerability",
    severity: "critical",
    category: "security",
    file: "internal/user/service.go",
    line: "35",
    description:
      'User input is directly concatenated into the SQL query string without sanitization.',
    impact:
      "An attacker can inject arbitrary SQL commands. This could lead to data theft, data deletion, or full database compromise. A request with username: \") OR 1=1 -- would dump all users.",
    solution:
      "Use parameterized queries with placeholders ($1, $2) instead of string concatenation.",
    badCode: `q := "INSERT INTO users (username, password) VALUES ('" + u.Name + "', '" + u.Password + "') RETURNING id"`,
    goodCode: `q := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
err := db.QueryRow(q, u.Name, hashedPassword).Scan(&id)`,
  },
  {
    id: "plaintext-passwords",
    title: "Passwords Stored in Plaintext",
    severity: "critical",
    category: "security",
    file: "internal/user/service.go",
    line: "35",
    description:
      "User passwords are stored directly in the database without any hashing or encryption.",
    impact:
      "If the database is compromised, all user passwords are immediately exposed. Users often reuse passwords across services, creating a cascade of breaches.",
    solution:
      "Hash passwords using bcrypt before storage. Never store plaintext passwords. Use bcrypt.CompareHashAndPassword for verification.",
    badCode: `q := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
err := db.QueryRow(q, u.Name, u.Password).Scan(&id)`,
    goodCode: `hashedPassword, err := bcrypt.GenerateFromPassword(
    []byte(u.Password), bcrypt.DefaultCost,
)
q := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
err = db.QueryRow(q, u.Name, string(hashedPassword)).Scan(&id)`,
  },
  {
    id: "multiple-db-connections",
    title: "Multiple Database Connections",
    severity: "high",
    category: "architecture",
    file: "internal/user/service.go",
    line: "28",
    description:
      "A new database connection is opened and closed on every single request. Additionally, a separate connection is established in main.go for migrations.",
    impact:
      "Connection overhead degrades performance significantly under load. Database servers have connection limits; this pattern will exhaust them quickly.",
    solution:
      "Create a single database connection pool at application startup and inject it into services via dependency injection.",
    badCode: `func (s *service) AddUser(u User) (string, error) {
\t	db, err := sql.Open("postgres", "postgres://admin:admin@localhost/test_repo?sslmode=disable")
\t\tif err != nil {
\t\t\tpanic(err)
\t\t}
\t\tdefer db.Close()`,
    goodCode: `type service struct {
\t\tdb *sql.DB
}

func NewService(db *sql.DB) *service {
\t\treturn &service{db: db}
}

func (s *service) AddUser(u User) (string, error) {
\t\t// Use s.db - the shared connection pool`,
  },
  {
    id: "panic-usage",
    title: "Panic Instead of Error Return",
    severity: "high",
    category: "best-practice",
    file: "internal/user/service.go",
    line: "30",
    description:
      "The code uses panic(err) when a database connection fails, instead of returning the error properly.",
    impact:
      "panic() crashes the entire application, taking down all goroutines and active requests. In production, this means downtime for all users, not just the one who triggered the error.",
    solution:
      "Return errors to the caller and let them decide how to handle the failure. Only panic for truly unrecoverable programmer errors.",
    badCode: `if err != nil {
\t\tpanic(err)
}`,
    goodCode: `if err != nil {
\t\treturn "", fmt.Errorf("opening database: %w", err)
}`,
  },
  {
    id: "no-authentication",
    title: "No Authentication on Endpoints",
    severity: "high",
    category: "security",
    file: "internal/user/http.go",
    line: "12",
    description:
      "The /user endpoint has no authentication or authorization. Anyone can create users without verification.",
    impact:
      "Allows unauthorized access and abuse. Attackers can create unlimited users, spam the system, or impersonate others.",
    solution:
      "Implement JWT-based authentication middleware. Validate tokens on protected endpoints and enforce authorization rules.",
    badCode: `func (h Handler) AddUser(w http.ResponseWriter, r *http.Request) {
\t\tif r.Method != http.MethodPost {
\t\t\tw.WriteHeader(http.StatusMethodNotAllowed)
\t\t\treturn
\t\t}`,
    goodCode: `func (h Handler) AddUser(w http.ResponseWriter, r *http.Request) {
\t\ttoken := r.Header.Get("Authorization")
\t\tif err := validateToken(token); err != nil {
\t\t\tw.WriteHeader(http.StatusUnauthorized)
\t\t\treturn
\t\t}`,
  },
  {
    id: "missing-return-after-error",
    title: "Missing Return After Error Response",
    severity: "medium",
    category: "best-practice",
    file: "internal/user/http.go",
    line: "28",
    description:
      'After writing an error response (500), the code continues to execute and writes a second status code (200 OK), causing a "superfluous response.WriteHeader" warning.',
    impact:
      "Sends conflicting HTTP status codes to the client. Can cause unpredictable client behavior and makes debugging harder.",
    solution:
      "Add a return statement after writing error responses to prevent execution from continuing.",
    badCode: `if err != nil {
\t\tw.WriteHeader(http.StatusInternalServerError)
\t\tw.Write([]byte("Failed to add user"))
}

w.WriteHeader(http.StatusOK)`,
    goodCode: `if err != nil {
\t\tw.WriteHeader(http.StatusInternalServerError)
\t\tw.Write([]byte("Failed to add user"))
\t\treturn
}

w.WriteHeader(http.StatusOK)`,
  },
  {
    id: "no-content-type-header",
    title: "Missing Content-Type Header",
    severity: "low",
    category: "best-practice",
    file: "internal/user/http.go",
    line: "33",
    description:
      "The response does not set a Content-Type header, so clients may not correctly interpret the response body.",
    impact:
      "Clients may not correctly parse responses. REST APIs should explicitly declare content types for interoperability.",
    solution:
      'Set w.Header().Set("Content-Type", "application/json") before writing the response.',
    badCode: `// Return a success response
w.WriteHeader(http.StatusOK)
w.Write([]byte(message))`,
    goodCode: `w.Header().Set("Content-Type", "application/json")
w.WriteHeader(http.StatusOK)
json.NewEncoder(w).Encode(map[string]string{"id": message})`,
  },
  {
    id: "hardcoded-credentials-docker",
    title: "Credentials in docker-compose.yaml",
    severity: "high",
    category: "security",
    file: "docker-compose.yaml",
    line: "10",
    description:
      "Database credentials are hardcoded in the docker-compose.yaml file and committed to the repository.",
    impact:
      "Anyone with repo access can see production or staging database credentials.",
    solution:
      "Use environment variable substitution in docker-compose or use Docker secrets. Reference .env files that are gitignored.",
    badCode: `environment:
\t\tPOSTGRES_USER: admin
\t\tPOSTGRES_PASSWORD: admin`,
    goodCode: `environment:
\t\tPOSTGRES_USER: \${DB_USER}
\t\tPOSTGRES_PASSWORD: \${DB_PASSWORD}`,
  },
  {
    id: "missing-unique-constraint",
    title: "Missing UNIQUE Constraint on Username",
    severity: "medium",
    category: "architecture",
    file: "internal/migrations/000001_create_users_table.up.sql",
    line: "4",
    description:
      "The username column does not have a UNIQUE constraint, allowing duplicate usernames.",
    impact:
      "Users can register with the same username as existing users, leading to confusion and potential security issues with identity spoofing.",
    solution:
      "Add a UNIQUE constraint to the username column in the migration.",
    badCode: `username VARCHAR(50) NOT NULL,`,
    goodCode: `username VARCHAR(50) NOT NULL UNIQUE,`,
  },
  {
    id: "outdated-go-version",
    title: "Outdated Go Version",
    severity: "low",
    category: "best-practice",
    file: "go.mod",
    line: "3",
    description:
      "The go.mod specifies Go 1.20, which is significantly outdated and missing important security patches and language features.",
    impact:
      "Missing security fixes, performance improvements, and modern Go features like generics improvements and enhanced error handling.",
    solution:
      "Update to the latest stable Go version (1.22+) to benefit from security patches and new features.",
    badCode: `go 1.20`,
    goodCode: `go 1.22`,
  },
];

export function getIssuesByFile(filePath: string): Issue[] {
  return issues.filter((i) => i.file === filePath);
}

export function getIssuesBySeverity(severity: Issue["severity"]): Issue[] {
  return issues.filter((i) => i.severity === severity);
}

export function getIssuesByCategory(category: Issue["category"]): Issue[] {
  return issues.filter((i) => i.category === category);
}
