export interface CodeExample {
  bad: string;
  good: string;
  explanation: string;
}

export interface Topic {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  whyItMatters: string;
  howGoHelps: string;
  examples: CodeExample[];
  bestPractices: string[];
  relatedTasks: number[];
}

export const topics: Topic[] = [
  {
    slug: "sql-injection",
    title: "SQL Injection",
    icon: "🔓",
    summary: "Understanding and preventing SQL injection attacks in Go",
    description:
      "SQL injection is one of the most common and dangerous web security vulnerabilities. It occurs when user input is directly included in SQL queries without proper sanitization, allowing attackers to manipulate the query logic.",
    whyItMatters:
      "SQL injection can lead to unauthorized data access, data modification, data deletion, and in severe cases, complete database takeover. It has been responsible for some of the largest data breaches in history.",
    howGoHelps:
      "Go's database/sql package provides built-in support for parameterized queries. By using placeholders ($1, $2, etc. for PostgreSQL) and passing values as separate arguments, the database driver handles proper escaping automatically.",
    examples: [
      {
        bad: `// NEVER do this - string concatenation with user input
q := "INSERT INTO users (username, password) VALUES ('" + u.Name + "', '" + u.Password + "')"
db.QueryRow(q)

// An attacker could send:
// username: "'; DROP TABLE users; --"
// This would destroy your entire users table!`,
        good: `// ALWAYS use parameterized queries
q := "INSERT INTO users (username, password) VALUES ($1, $2)"
db.QueryRow(q, u.Name, u.Password)

// The database driver handles escaping:
// - No possibility of SQL injection
// - Values are sent separately from the query
// - The query structure is fixed at compile time`,
        explanation:
          "Parameterized queries separate the SQL logic from the data. The database engine parses the query structure first, then safely binds the parameter values. This makes injection impossible because user input can never change the query's intent.",
      },
      {
        bad: `// Another injection example
q := "SELECT * FROM users WHERE username='" + username + "'"
rows, _ := db.Query(q)

// Attack: username = "admin' --"
// Resulting query: SELECT * FROM users WHERE username='admin' --'
// The -- comments out the rest, bypassing password check!`,
        good: `// Safe parameterized query
q := "SELECT * FROM users WHERE username = $1"
rows, _ := db.Query(q, username)

// Even if username contains SQL syntax,
// it's treated purely as a string value`,
        explanation:
          "The same principle applies to SELECT queries. Parameterized queries ensure that user input is always treated as data, never as executable SQL code.",
      },
    ],
    bestPractices: [
      "Always use parameterized queries ($1, $2 for PostgreSQL, ? for MySQL)",
      "Never construct SQL queries with string concatenation or fmt.Sprintf",
      "Use an ORM like GORM or sqlx for additional safety",
      "Validate and sanitize input before it reaches the database layer",
      "Apply the principle of least privilege to database users",
    ],
    relatedTasks: [2],
  },
  {
    slug: "password-hashing",
    title: "Password Hashing",
    icon: "🔐",
    summary: "Secure password storage with bcrypt in Go",
    description:
      "Storing passwords in plaintext is one of the most severe security mistakes. Even if your database is encrypted at rest, plaintext passwords mean any database breach immediately compromises all user accounts.",
    whyItMatters:
      "Users reuse passwords across services. A breach of your plaintext passwords can lead to cascading compromises across email, banking, social media, and other services. It's also a violation of compliance requirements like GDPR, HIPAA, and PCI-DSS.",
    howGoHelps:
      "Go's golang.org/x/crypto/bcrypt package provides a mature, battle-tested implementation of the bcrypt hashing algorithm. It automatically handles salting, uses configurable work factors, and provides constant-time comparison.",
    examples: [
      {
        bad: `// NEVER store plaintext passwords
q := "INSERT INTO users (username, password) VALUES ($1, $2)"
db.QueryRow(q, u.Name, u.Password)
// If DB is breached, all passwords are exposed!`,
        good: `import "golang.org/x/crypto/bcrypt"

// Hash with bcrypt before storage
hashedPassword, err := bcrypt.GenerateFromPassword(
    []byte(u.Password),
    bcrypt.DefaultCost, // cost factor 10
)
if err != nil {
    return "", fmt.Errorf("hashing password: %w", err)
}

q := "INSERT INTO users (username, password) VALUES ($1, $2)"
db.QueryRow(q, u.Name, string(hashedPassword))`,
        explanation:
          "bcrypt.GenerateFromPassword automatically generates a random salt and includes it in the hash output. The DefaultCost of 10 provides a good balance between security and performance. Each hash takes ~100ms, making brute force attacks impractical.",
      },
      {
        bad: `// Comparing plaintext passwords
if storedPassword == inputPassword {
    // Login successful
}`,
        good: `// Comparing bcrypt hashes
err := bcrypt.CompareHashAndPassword(
    []byte(storedHash),
    []byte(inputPassword),
)
if err != nil {
    // Invalid password (wrong password or hash is corrupted)
    return fmt.Errorf("invalid credentials")
}
// Login successful`,
        explanation:
          "bcrypt.CompareHashAndPassword performs constant-time comparison to prevent timing attacks. It re-hashes the input password with the same salt and compares the results. This ensures that even measuring response times cannot reveal information about the password.",
      },
    ],
    bestPractices: [
      "Use bcrypt with DefaultCost (10) or higher for password hashing",
      "Never use MD5, SHA1, or SHA256 for password hashing (they're too fast)",
      "Never truncate passwords before hashing",
      "Use constant-time comparison for hash verification",
      "Consider increasing the cost factor as hardware improves",
    ],
    relatedTasks: [3],
  },
  {
    slug: "dependency-injection",
    title: "Dependency Injection",
    icon: "🔗",
    summary: "Clean architecture with dependency injection in Go",
    description:
      "Dependency Injection (DI) is a design pattern where components receive their dependencies from外部 rather than creating them internally. This promotes loose coupling, testability, and maintainability.",
    whyItMatters:
      "Without DI, components create tight coupling to their dependencies, making testing difficult, code rigid, and changes expensive. DI enables swapping implementations, mocking for tests, and cleaner architecture.",
    howGoHelps:
      "Go's approach to DI is simple and idiomatic: pass dependencies as constructor arguments. No framework needed. The service struct holds its dependencies, and NewService() receives them.",
    examples: [
      {
        bad: `// BAD: Service creates its own dependencies
type service struct{}

func (s *service) AddUser(u User) (string, error) {
    db, err := sql.Open("postgres", "postgres://admin:admin@localhost/db")
    // How do you test this? You can't mock the database!
    // How do you change the connection? You have to modify this function!
}`,
        good: `// GOOD: Dependencies injected via constructor
type service struct {
    db *sql.DB // injected dependency
}

func NewService(db *sql.DB) *service {
    return &service{db: db} // received from outside
}

func (s *service) AddUser(u User) (string, error) {
    // Uses the injected database connection
    // Easy to test: pass a mock *sql.DB
    // Easy to change: just pass a different *sql.DB
}

// In main.go:
db, _ := sql.Open("postgres", dbURL)
svc := user.NewService(db) // inject the dependency`,
        explanation:
          "By injecting the database connection, the service becomes decoupled from connection management. This makes unit testing straightforward (inject a mock), and the service doesn't need to know about connection pooling, environment variables, or retry logic.",
      },
    ],
    bestPractices: [
      "Pass dependencies as constructor arguments, not global variables",
      "Define interfaces for external dependencies to enable mocking",
      "Keep constructors simple — just assign dependencies",
      "Use the service struct to hold all injected dependencies",
      "Consider using wire (Google's DI) for complex dependency graphs",
    ],
    relatedTasks: [4],
  },
  {
    slug: "error-handling",
    title: "Go Error Handling",
    icon: "⚠️",
    summary: "Idiomatic error handling patterns in Go",
    description:
      "Go's explicit error handling is one of its defining features. Unlike exceptions in other languages, Go requires you to handle every error at the point it occurs, making error paths visible and intentional.",
    whyItMatters:
      "Improper error handling leads to silent failures, panics in production, data corruption, and debugging nightmares. Go's error philosophy emphasizes awareness and explicit handling of failure modes.",
    howGoHelps:
      "Go provides error as a built-in interface, along with patterns like error wrapping (%w), errors.Is(), and errors.As(). The convention is to return errors as the last return value and check them immediately.",
    examples: [
      {
        bad: `// NEVER panic in library/service code
func (s *service) AddUser(u User) (string, error) {
    db, err := sql.Open("postgres", dbURL)
    if err != nil {
        panic(err) // Crashes the entire application!
    }
}

// Also bad: ignoring errors
id, _ := db.QueryRow(q).Scan(&id) // Silent failure`,
        good: `// Return errors with context
func (s *service) AddUser(u User) (string, error) {
    var id string
    q := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
    if err := s.db.QueryRow(q, u.Name, u.Password).Scan(&id); err != nil {
        return "", fmt.Errorf("inserting user %s: %w", u.Name, err)
    }
    return id, nil
}

// In main.go, handle the error:
svc, err := user.NewService(db)
if err != nil {
    log.Fatal(err) // Only fatal in main, never in libraries
}`,
        explanation:
          "fmt.Errorf with %w creates error chains that can be inspected with errors.Is() and errors.As(). Adding context like the function name and parameters makes debugging much easier. Panic is reserved for truly unrecoverable programmer errors.",
      },
      {
        bad: `// Missing return after error response in HTTP handler
if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    w.Write([]byte("Error"))
    // Execution continues! Two status codes sent!
}
w.WriteHeader(http.StatusOK)`,
        good: `// Proper early return pattern
if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    w.Write([]byte("Error"))
    return // Stop execution here
}
w.WriteHeader(http.StatusOK)`,
        explanation:
          "In Go HTTP handlers, calling WriteHeader after the headers are already sent produces a warning. Always use early returns after error responses to prevent execution from continuing.",
      },
    ],
    bestPractices: [
      "Always check errors immediately after the function call",
      "Wrap errors with fmt.Errorf('context: %w', err) for better debugging",
      "Never panic() in library or service code — return errors instead",
      "Use early returns in HTTP handlers after error responses",
      "Log errors at the boundary (main, HTTP handlers), not deep in business logic",
    ],
    relatedTasks: [5],
  },
  {
    slug: "testing",
    title: "Go Testing Patterns",
    icon: "🧪",
    summary: "Table-driven tests and testing best practices in Go",
    description:
      "Go has a built-in testing package that encourages simple, readable tests. The table-driven test pattern is idiomatic and allows testing many cases with minimal code duplication.",
    whyItMatters:
      "Without tests, refactoring is terrifying, bugs go undetected, and onboarding new developers is slow. Good tests serve as living documentation of expected behavior.",
    howGoHelps:
      "Go's testing package provides t.Run() for subtests, testing.T for assertions, and testing.B for benchmarks. Combined with testify for assertions, you can write comprehensive tests with minimal boilerplate.",
    examples: [
      {
        bad: `// BAD: Testing without structure
func TestUser(t *testing.T) {
    svc := NewService(db)
    svc.AddUser(User{Name: "john", Password: "secret"})
    // No assertion! How do we know this worked?
    // No error case testing!
    // No edge cases!
}`,
        good: `// GOOD: Table-driven test
func TestAddUser(t *testing.T) {
    tests := []struct {
        name     string
        input    User
        wantID   bool
        wantErr  bool
    }{
        {
            name:    "valid user creation",
            input:   User{Name: "alice", Password: "pass123"},
            wantID:  true,
            wantErr: false,
        },
        {
            name:    "empty username rejected",
            input:   User{Name: "", Password: "pass123"},
            wantID:  false,
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            svc := NewService(mockDB)
            id, err := svc.AddUser(tt.input)

            if tt.wantErr {
                assert.Error(t, err)
            } else {
                assert.NoError(t, err)
            }
            if tt.wantID {
                assert.NotEmpty(t, id)
            }
        })
    }
}`,
        explanation:
          "Table-driven tests make it easy to add new test cases, provide clear output for failing cases via t.Run names, and ensure consistent testing patterns across the codebase. Each test case is self-documenting.",
      },
    ],
    bestPractices: [
      "Use table-driven tests for functions with multiple input/output combinations",
      "Use t.Run() for named subtests that show which case failed",
      "Use testify/assert for cleaner assertions",
      "Test both success and failure paths",
      "Use interfaces to mock external dependencies",
      "Run tests with go test -race to detect race conditions",
    ],
    relatedTasks: [7],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
