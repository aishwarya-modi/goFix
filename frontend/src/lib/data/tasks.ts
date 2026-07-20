export interface Hint {
  level: number;
  text: string;
}

export interface Task {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  description: string;
  goal: string;
  skills: string[];
  hints: Hint[];
  relatedIssueIds: string[];
  solution: string;
  estimatedMinutes: number;
}

export const tasks: Task[] = [
  {
    id: 1,
    title: "Remove Hardcoded Credentials",
    difficulty: "Easy",
    category: "Security",
    description:
      "Database credentials are hardcoded in both the Go source code and docker-compose.yaml. This is a critical security vulnerability that exposes sensitive information in version control.",
    goal: "Move all credentials to environment variables. The application should read DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, and DB_NAME from the environment at runtime.",
    skills: ["Environment Variables", "Configuration Management", "12-Factor App"],
    hints: [
      { level: 1, text: "Look at how the database connection string is constructed in cmd/main.go" },
      { level: 2, text: "Use os.Getenv() to read environment variables in Go" },
      { level: 3, text: "Pass env vars to docker-compose using ${VAR} syntax and create a .env file" },
      { level: 4, text: "Never commit .env files — add them to .gitignore" },
    ],
    relatedIssueIds: ["hardcoded-credentials", "hardcoded-connection", "hardcoded-credentials-docker"],
    solution: `// In cmd/main.go
import "os"

func runMigrations() {
    dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_NAME"),
    )
    // ...
}

// Create a .env file (gitignored):
// DB_USER=admin
// DB_PASSWORD=securepassword
// DB_HOST=localhost
// DB_PORT=5432
// DB_NAME=test_repo`,
    estimatedMinutes: 15,
  },
  {
    id: 2,
    title: "Prevent SQL Injection",
    difficulty: "Medium",
    category: "Security",
    description:
      "The AddUser function constructs SQL queries using string concatenation with user input. This allows attackers to inject arbitrary SQL commands.",
    goal: "Replace string concatenation with parameterized queries using database/sql placeholders ($1, $2).",
    skills: ["SQL Security", "Parameterized Queries", "Input Sanitization"],
    hints: [
      { level: 1, text: "Look at the query construction in internal/user/service.go" },
      { level: 2, text: "Go's database/sql supports placeholder syntax with $1, $2, etc." },
      { level: 3, text: "db.QueryRow(query, arg1, arg2) passes parameters safely to the database driver" },
    ],
    relatedIssueIds: ["sql-injection"],
    solution: `// Before (VULNERABLE):
q := "INSERT INTO users (username, password) VALUES ('" + u.Name + "', '" + u.Password + "') RETURNING id"
err := db.QueryRow(q).Scan(&id)

// After (SAFE):
q := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
err := db.QueryRow(q, u.Name, u.Password).Scan(&id)`,
    estimatedMinutes: 10,
  },
  {
    id: 3,
    title: "Hash Passwords with bcrypt",
    difficulty: "Medium",
    category: "Security",
    description:
      "Passwords are stored in plaintext in the database. If the database is compromised, all user passwords are immediately exposed.",
    goal: "Use bcrypt to hash passwords before storing them. The bcrypt library handles salting automatically.",
    skills: ["Password Hashing", "bcrypt", "Cryptography Basics"],
    hints: [
      { level: 1, text: "Go's standard approach for password hashing is golang.org/x/crypto/bcrypt" },
      { level: 2, text: "Use bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)" },
      { level: 3, text: "The DefaultCost is 10, which is a good balance of security and performance" },
    ],
    relatedIssueIds: ["plaintext-passwords"],
    solution: `import "golang.org/x/crypto/bcrypt"

func (s *service) AddUser(u User) (string, error) {
    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword(
        []byte(u.Password), bcrypt.DefaultCost,
    )
    if err != nil {
        return "", fmt.Errorf("hashing password: %w", err)
    }

    var id string
    q := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
    err = s.db.QueryRow(q, u.Name, string(hashedPassword)).Scan(&id)
    if err != nil {
        return "", fmt.Errorf("inserting user: %w", err)
    }
    return id, nil
}`,
    estimatedMinutes: 15,
  },
  {
    id: 4,
    title: "Centralize Database Connection",
    difficulty: "Medium",
    category: "Architecture",
    description:
      "A new database connection is opened and closed on every request in the AddUser function. This is extremely inefficient and will exhaust database connections under load.",
    goal: "Create a single database connection pool at startup using sql.Open and sql.DB. Inject it into the service via dependency injection.",
    skills: ["Dependency Injection", "Connection Pooling", "Go Architecture"],
    hints: [
      { level: 1, text: "sql.Open() returns a *sql.DB which is already a connection pool" },
      { level: 2, text: "Create the connection once in main.go and pass it to NewService()" },
      { level: 3, text: "Use db.SetMaxOpenConns() and db.SetMaxIdleConns() to tune the pool" },
    ],
    relatedIssueIds: ["multiple-db-connections"],
    solution: `// service.go
type service struct {
    db *sql.DB
}

func NewService(db *sql.DB) *service {
    return &service{db: db}
}

func (s *service) AddUser(u User) (string, error) {
    // Use s.db - no new connection needed
    var id string
    q := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
    err := s.db.QueryRow(q, u.Name, u.Password).Scan(&id)
    return id, err
}

// main.go
func main() {
    db, err := sql.Open("postgres", dbURL)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)

    svc := user.NewService(db)
    // ...
}`,
    estimatedMinutes: 15,
  },
  {
    id: 5,
    title: "Improve Error Handling",
    difficulty: "Easy",
    category: "Best Practice",
    description:
      "The code uses panic() in the service layer and has inconsistent error handling. The HTTP handler also has a missing return statement after error responses.",
    goal: "Remove all panic() calls. Return errors properly. Fix the missing return in the HTTP handler.",
    skills: ["Go Error Handling", "Error Wrapping", "Graceful Degradation"],
    hints: [
      { level: 1, text: "In Go, errors are values — return them, don't panic" },
      { level: 2, text: "Use fmt.Errorf() with %w to wrap errors with context" },
      { level: 3, text: "The HTTP handler in http.go is missing a return after writing the error response" },
    ],
    relatedIssueIds: ["panic-usage", "missing-return-after-error"],
    solution: `// Before (BAD):
if err != nil {
    panic(err)
}

// After (GOOD):
if err != nil {
    return "", fmt.Errorf("opening database: %w", err)
}

// In http.go, add return after error:
if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    w.Write([]byte("Failed to add user"))
    return  // <-- This was missing!
}`,
    estimatedMinutes: 10,
  },
  {
    id: 6,
    title: "Add JWT Authentication",
    difficulty: "Hard",
    category: "Security",
    description:
      "The /user endpoint has no authentication. Anyone can create users without any verification or authorization.",
    goal: "Implement JWT-based middleware that validates tokens on protected endpoints. Create a login endpoint that issues tokens.",
    skills: ["JWT", "HTTP Middleware", "Token-Based Auth"],
    hints: [
      { level: 1, text: "Use a library like github.com/golang-jwt/jwt/v5" },
      { level: 2, text: "Create middleware that extracts and validates the Bearer token from the Authorization header" },
      { level: 3, text: "Generate tokens with a secret key and expiration time" },
      { level: 4, text: "Wrap the handler with the middleware: authMiddleware(http.HandlerFunc(h.AddUser))" },
    ],
    relatedIssueIds: ["no-authentication"],
    solution: `import (
    "github.com/golang-jwt/jwt/v5"
    "strings"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Missing auth token", http.StatusUnauthorized)
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
            return jwtSecret, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }

        next.ServeHTTP(w, r)
    }
}

// Use it:
http.HandleFunc("/user", authMiddleware(h.AddUser))`,
    estimatedMinutes: 30,
  },
  {
    id: 7,
    title: "Add Tests",
    difficulty: "Hard",
    category: "Testing",
    description:
      "The project has zero test coverage. There are no unit tests, integration tests, or table-driven tests.",
    goal: "Write table-driven unit tests for the service layer. Mock the database. Test error cases and edge cases.",
    skills: ["Table-Driven Tests", "Testify", "Database Mocking", "Test Architecture"],
    hints: [
      { level: 1, text: "Go uses the built-in testing package — no framework required" },
      { level: 2, text: "Table-driven tests use a slice of test cases with t.Run() for subtests" },
      { level: 3, text: "Create an interface for your database operations to enable mocking" },
      { level: 4, text: "Use github.com/stretchr/testify for assertions" },
    ],
    relatedIssueIds: ["no-tests"],
    solution: `// service_test.go
package user

import (
    "testing"
    "github.com/stretchr/testify/assert"
)

func TestAddUser(t *testing.T) {
    tests := []struct {
        name    string
        input   User
        wantErr bool
    }{
        {
            name:    "valid user",
            input:   User{Name: "john", Password: "secret123"},
            wantErr: false,
        },
        {
            name:    "empty name",
            input:   User{Name: "", Password: "secret123"},
            wantErr: true,
        },
        {
            name:    "empty password",
            input:   User{Name: "john", Password: ""},
            wantErr: false,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // Use mock DB or test database
            svc := NewService(mockDB)
            id, err := svc.AddUser(tt.input)
            if tt.wantErr {
                assert.Error(t, err)
                assert.Empty(t, id)
            } else {
                assert.NoError(t, err)
                assert.NotEmpty(t, id)
            }
        })
    }
}`,
    estimatedMinutes: 45,
  },
];

export function getTaskById(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}
