import { TopicContent } from "./fundamentals";

export const packagesContent: Record<string, TopicContent> = {
  "standard-library": {
    slug: "standard-library",
    title: "Go Standard Library",
    summary: "Go's standard library provides production-ready packages for HTTP, JSON, I/O, testing, and more without external dependencies.",
    description: `Go's standard library is one of the language's greatest strengths. Unlike many languages where the standard library is a minimal core, Go ships with a comprehensive set of packages that cover the vast majority of backend engineering needs. Packages like net/http, encoding/json, database/sql, testing, and os provide battle-tested implementations that power production systems at companies like Google, Cloudflare, and Uber.

For backend engineers, the standard library means fewer dependencies, smaller binary sizes, and code that is guaranteed to be maintained alongside the Go release cycle. The Go team's commitment to backward compatibility (since Go 1) means that standard library code you write today will continue to compile with future Go versions. Every package in the standard library follows the same coding conventions, documentation standards, and testing rigor.

In practice, many Go services can be built entirely with the standard library. A typical REST API needs net/http for serving, encoding/json for serialization, database/sql for persistence, log/slog for structured logging, and testing for unit tests — all of which are standard library packages. Reaching for third-party packages should be a deliberate choice, not a default.`,
    keyPoints: [
      "The standard library covers HTTP, JSON, I/O, networking, cryptography, testing, and more",
      "Every standard library package follows strict backward compatibility guarantees",
      "net/http alone is sufficient to build production-grade web servers",
      "encoding/json provides reliable JSON marshaling and unmarshaling",
      "database/sql offers a connection-pooling SQL driver interface",
      "The testing package includes benchmarks, fuzzing, and subtests",
      "Standard library code compiles into your binary with zero external dependencies",
      "go doc and pkg.go.dev provide instant documentation for every package"
    ],
    codeExamples: [
      {
        title: "Built-in HTTP Server Without Dependencies",
        description: "A complete HTTP server using only the standard library",
        bad: [
          '// Importing unnecessary dependencies for a simple HTTP server',
          '// Many developers reach for third-party routers immediately',
          'package main',
          '',
          'import (',
          '    "github.com/gorilla/mux"  // unnecessary for simple routing',
          '    "github.com/gin-gonic/gin" // overkill for basic APIs',
          ')',
          '',
          'func main() {',
          '    r := mux.NewRouter()',
          '    r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {',
          '        w.Write([]byte("ok")) // no content-type header set',
          '    })',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "encoding/json"',
          '    "log/slog"',
          '    "net/http"',
          ')',
          '',
          'type HealthResponse struct {',
          '    Status string `json:"status"`',
          '}',
          '',
          'func healthHandler(w http.ResponseWriter, r *http.Request) {',
          '    w.Header().Set("Content-Type", "application/json")',
          '    json.NewEncoder(w).Encode(HealthResponse{Status: "ok"})',
          '}',
          '',
          'func main() {',
          '    mux := http.NewServeMux()',
          '    mux.HandleFunc("GET /health", healthHandler)',
          '',
          '    slog.Info("server starting", "addr", ":8080")',
          '    if err := http.ListenAndServe(":8080", mux); err != nil {',
          '        slog.Error("server failed", "error", err)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "The stdlib net/http is sufficient for most HTTP services. Go 1.22 added method-based routing patterns (\"GET /health\") directly in ServeMux, eliminating the need for third-party routers in many cases. Always set Content-Type headers and use structured logging with log/slog."
      }
    ],
    bestPractices: [
      "Always try the standard library before adding third-party dependencies",
      "Use pkg.go.dev to explore available standard library packages",
      "Pin your Go version in go.mod for reproducible builds",
      "Read standard library source code — it demonstrates idiomatic Go",
      "Use go doc and go doc -all for quick offline documentation"
    ],
    commonMistakes: [
      "Adding third-party packages when the standard library already covers the need",
      "Not checking pkg.go.dev for new standard library additions across Go versions",
      "Importing packages but not using them (Go compiler enforces no unused imports)",
      "Ignoring the testing package and using inferior third-party test frameworks"
    ],
    relatedTopics: [
      "nethttp-standard",
      "encodingjson",
      "modules--dependencies"
    ],
    externalResources: [
      { title: "Go Standard Library Documentation", url: "https://pkg.go.dev/std" },
      { title: "Go Blog: Getting to Know the Go Standard Library", url: "https://go.dev/blog/" },
      { title: "Go by Example", url: "https://gobyexample.com/" }
    ]
  },

  "flag": {
    slug: "flag",
    title: "The flag Package",
    summary: "Go's flag package provides a standard way to parse command-line flags with type-safe definitions and usage messages.",
    description: `The flag package is Go's built-in solution for parsing command-line arguments. It supports string, int, float, bool, and duration flags with automatic help message generation. While simple compared to third-party alternatives like cobra or urfave/cli, the flag package covers the majority of CLI needs without adding dependencies.

For backend engineers, the flag package is essential for building configurable services and CLI tools. Most production Go services accept flags for configuration like port numbers, database URLs, log levels, and feature toggles. The package integrates naturally with Go's testing framework, allowing you to override flags during tests.

The flag package follows Go's philosophy of simplicity. It defines flags with flag.String, flag.Int, and similar functions that return pointers to the values. After flag.Parse() is called, the pointed-to values are populated from the command line. This pointer-based design allows you to check whether a flag was explicitly set or left at its default value.`,
    keyPoints: [
      "flag.String, flag.Int, flag.Bool, flag.Float64, and flag.Duration create typed flags",
      "flag.Parse() must be called after all flags are defined",
      "Flags are accessed through pointers returned by the definition functions",
      "flag.Usage can be overridden to customize help output",
      "The -help or -h flag automatically prints usage information",
      "flag.CommandLine is the default FlagSet used by the package",
      "Flag names must not be reused within the same FlagSet"
    ],
    codeExamples: [
      {
        title: "Flag-Based Service Configuration",
        description: "Using the flag package to configure a service from the command line",
        bad: [
          'package main',
          '',
          'import (',
          '    "flag"',
          '    "fmt"',
          '    "net/http"',
          ')',
          '',
          'func main() {',
          '    // Accessing flag values before parsing',
          '    addr := flag.String("addr", ":8080", "listen address")',
          '    fmt.Println(*addr) // Empty string — parse not called yet!',
          '',
          '    flag.Parse()',
          '',
          '    // Ignoring errors from flag parsing',
          '    // Using global os.Args instead of flag package',
          '    http.ListenAndServe(*addr, nil)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "flag"',
          '    "log/slog"',
          '    "net/http"',
          '    "os"',
          '    "time"',
          ')',
          '',
          'func main() {',
          '    addr := flag.String("addr", ":8080", "listen address")',
          '    shutdownTimeout := flag.Duration("shutdown-timeout", 10*time.Second, "graceful shutdown timeout")',
          '    verbose := flag.Bool("verbose", false, "enable verbose logging")',
          '',
          '    flag.Parse()',
          '',
          '    level := slog.LevelInfo',
          '    if *verbose {',
          '        level = slog.LevelDebug',
          '    }',
          '    slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: level})))',
          '',
          '    mux := http.NewServeMux()',
          '    mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {',
          '        w.Write([]byte("Hello"))',
          '    })',
          '',
          '    slog.Info("starting server", "addr", *addr, "shutdown_timeout", *shutdownTimeout)',
          '    srv := &http.Server{Addr: *addr, Handler: mux}',
          '    if err := srv.ListenAndServe(); err != http.ErrServerClosed {',
          '        slog.Error("server error", "error", err)',
          '        os.Exit(1)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Define all flags before calling flag.Parse(). Use flag.Duration for time-based flags instead of parsing strings manually. The pointers returned by flag functions let you access values after parsing. Combine flags with structured logging for production-ready service startup."
      }
    ],
    bestPractices: [
      "Define all flags before calling flag.Parse()",
      "Use descriptive flag names with hyphens (e.g., log-level)",
      "Provide sensible defaults so the service works without flags",
      "Use flag.Duration for timeout and interval flags",
      "Override flag.Usage to include example commands in help text",
      "Test CLI flags by calling flag.Parse() with test arguments"
    ],
    commonMistakes: [
      "Calling flag.Parse() more than once (panics in some cases)",
      "Accessing flag values before calling flag.Parse()",
      "Not providing a default value, causing nil pointer dereference",
      "Using flag.Bool without checking whether the flag was explicitly set",
      "Defining flags inside init() functions that run before main"
    ],
    relatedTopics: [
      "standard-library",
      "os",
      "modules--dependencies"
    ],
    externalResources: [
      { title: "Go Package: flag", url: "https://pkg.go.dev/flag" },
      { title: "Go by Example: Command-Line Flags", url: "https://gobyexample.com/command-line-flags" },
      { title: "Go Blog: Command Line Parsing", url: "https://go.dev/blog/command-line" }
    ]
  },

  "io--file-handling": {
    slug: "io--file-handling",
    title: "io & File Handling",
    summary: "The io package defines core interfaces like Reader and Writer that Go's entire I/O system is built upon.",
    description: `The io package is the foundation of Go's I/O system, defining the two most important interfaces in the language: io.Reader and io.Writer. These interfaces enable composability — any type that implements a Read or Write method can be used interchangeably with files, network connections, buffers, and HTTP bodies. This abstraction is what makes Go's I/O code so flexible and reusable.

For backend engineers, understanding io.Reader and io.Writer is non-negotiable. Every HTTP request body is an io.Reader, every file is both a Reader and a Writer, and every database driver uses these interfaces internally. The os package provides file operations (os.Open, os.Create, os.ReadFile), while the io package provides combinators like io.Copy, io.TeeReader, and io.LimitReader.

In production systems, proper file handling involves error checking, resource cleanup with defer, and understanding the difference between buffered and unbuffered I/O. The os.ReadFile and os.WriteFile convenience functions handle many common cases, but for large files or streaming data, you need to work with io.Reader and io.Writer directly.`,
    keyPoints: [
      "io.Reader and io.Writer are the two most fundamental interfaces in Go",
      "os.Open returns an *os.File that implements io.Reader and io.Closer",
      "Always defer Close() after opening a file to prevent resource leaks",
      "io.Copy(dst, src) efficiently copies between any Reader and Writer",
      "os.ReadFile and os.WriteFile are convenience functions for small files",
      "io.TeeReader, io.LimitReader, and io.MultiReader compose readers",
      "Use bufio.Reader for efficient buffered reads from io.Reader sources",
      "File paths should be validated and cleaned with filepath.Clean"
    ],
    codeExamples: [
      {
        title: "Safe File Reading with Error Handling",
        description: "Properly reading a file with resource cleanup and error handling",
        bad: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "os"',
          ')',
          '',
          'func readFile(path string) string {',
          '    // Ignoring error from os.Open',
          '    f, _ := os.Open(path)',
          '',
          '    // Not closing the file — resource leak!',
          '    buf := make([]byte, 1024)',
          '    n, _ := f.Read(buf)',
          '',
          '    // Using fmt.Sprintf with Read result — wrong encoding',
          '    return fmt.Sprintf("%s", buf[:n])',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "io"',
          '    "os"',
          ')',
          '',
          'func readFile(path string) (string, error) {',
          '    f, err := os.Open(path)',
          '    if err != nil {',
          '        return "", fmt.Errorf("opening file: %w", err)',
          '    }',
          '    defer f.Close()',
          '',
          '    data, err := io.ReadAll(f)',
          '    if err != nil {',
          '        return "", fmt.Errorf("reading file: %w", err)',
          '    }',
          '',
          '    return string(data), nil',
          '}',
          '',
          'func readFileSimple(path string) (string, error) {',
          '    data, err := os.ReadFile(path)',
          '    if err != nil {',
          '        return "", fmt.Errorf("reading file: %w", err)',
          '    }',
          '    return string(data), nil',
          '}',
        ].join('\n'),
        explanation: "Always check errors from file operations and use defer f.Close() immediately after a successful open. io.ReadAll (or os.ReadFile for simple cases) handles buffering internally. Wrap errors with fmt.Errorf and %w for proper error chaining. For large files, read in chunks instead of loading everything into memory."
      }
    ],
    bestPractices: [
      "Use defer f.Close() immediately after a successful os.Open",
      "Check and handle every error from file operations",
      "Use os.ReadFile for small files, streaming io.Reader for large ones",
      "Use filepath.Clean to normalize file paths before use",
      "Wrap errors with fmt.Errorf(\"context: %w\", err) for debugging",
      "Avoid reading entire large files into memory — process in chunks"
    ],
    commonMistakes: [
      "Forgetting to close opened files, causing file descriptor leaks",
      "Ignoring errors from file open, read, or write operations",
      "Reading entire large files into memory instead of streaming",
      "Not using filepath.Clean to normalize paths across operating systems",
      "Closing a file multiple times (generates an error on second close)"
    ],
    relatedTopics: [
      "bufio",
      "os",
      "standard-library"
    ],
    externalResources: [
      { title: "Go Package: io", url: "https://pkg.go.dev/io" },
      { title: "Go Package: os", url: "https://pkg.go.dev/os" },
      { title: "Go Blog: io.Reader Architecture", url: "https://go.dev/blog/io-reader-architecture" }
    ]
  },

  "bufio": {
    slug: "bufio",
    title: "bufio: Buffered I/O",
    summary: "The bufio package wraps io.Reader and io.Writer to add buffering, reducing the number of system calls for I/O operations.",
    description: `The bufio package provides buffered I/O by wrapping an underlying io.Reader or io.Writer with an internal buffer. Instead of making a system call for every byte or small chunk of data, bufio reads larger blocks at once from the underlying reader and serves subsequent reads from the buffer. This dramatically reduces the overhead of system calls, which are expensive relative to in-memory operations.

For backend engineers, bufio is essential when processing line-oriented input (logs, CSV files, protocol parsers) or when making many small reads from a file or network connection. bufio.Scanner provides a clean interface for reading input line by line or token by token, with built-in support for splitting on custom boundaries. bufio.Reader offers lower-level buffered reading with methods like ReadByte, ReadBytes, Peek, and ReadLine.

In production, bufio is commonly used for parsing newline-delimited data, building protocol parsers, and implementing efficient copy operations. The Writer variant buffers output and flushes when full or when Flush() is explicitly called, preventing expensive per-byte write syscalls.`,
    keyPoints: [
      "bufio.Reader adds an internal buffer around any io.Reader",
      "bufio.Scanner simplifies reading input line by line or token by token",
      "bufio.Writer buffers writes and flushes to the underlying writer",
      "Scanner.Split allows custom tokenization functions",
      "bufio.NewReaderSize and bufio.NewWriterSize control buffer sizes",
      "bufio.Reader.Peek returns the next n bytes without advancing the reader",
      "bufio.Reader.ReadBytes reads until the delimiter byte is found",
      "Always call Scanner.Err() after the scan loop to check for read errors"
    ],
    codeExamples: [
      {
        title: "Processing Lines with bufio.Scanner",
        description: "Efficiently reading and processing a file line by line",
        bad: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "os"',
          '    "strings"',
          ')',
          '',
          'func processFile(path string) error {',
          '    f, err := os.Open(path)',
          '    if err != nil {',
          '        return err',
          '    }',
          '    defer f.Close()',
          '',
          '    data, _ := os.ReadFile(path)',
          '    lines := strings.Split(string(data), "\\n")',
          '    for _, line := range lines {',
          '        fmt.Println(line)',
          '    }',
          '    return nil',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "bufio"',
          '    "fmt"',
          '    "os"',
          ')',
          '',
          'func processFile(path string) error {',
          '    f, err := os.Open(path)',
          '    if err != nil {',
          '        return fmt.Errorf("opening %s: %w", path, err)',
          '    }',
          '    defer f.Close()',
          '',
          '    scanner := bufio.NewScanner(f)',
          '    for scanner.Scan() {',
          '        line := scanner.Text()',
          '        fmt.Println(line)',
          '    }',
          '    if err := scanner.Err(); err != nil {',
          '        return fmt.Errorf("reading %s: %w", path, err)',
          '    }',
          '    return nil',
          '}',
        ].join('\n'),
        explanation: "bufio.Scanner processes input in chunks using an internal buffer, keeping memory usage constant regardless of file size. Always call scanner.Err() after the loop — the loop exits silently on I/O errors, not just EOF. For very long lines, use scanner.Buffer() to increase the default max token size of 64KB."
      }
    ],
    bestPractices: [
      "Use bufio.Scanner for line-oriented file processing instead of reading entire files",
      "Always check scanner.Err() after the scan loop to detect I/O errors",
      "Increase scanner buffer size for files with very long lines using scanner.Buffer()",
      "Use bufio.Writer when making many small writes to avoid syscall overhead",
      "Call writer.Flush() before closing or returning to ensure all data is written",
      "Use bufio.NewReaderSize when the default 4096-byte buffer is too small"
    ],
    commonMistakes: [
      "Forgetting to check scanner.Err() after the scan loop",
      "Not calling writer.Flush() before closing, causing data loss",
      "Reading entire files into memory when bufio.Scanner would suffice",
      "Assuming scanner.Scan() returns false only on EOF (it returns false on errors too)",
      "Not increasing the scanner buffer for files with lines longer than 64KB"
    ],
    relatedTopics: [
      "io--file-handling",
      "os",
      "standard-library"
    ],
    externalResources: [
      { title: "Go Package: bufio", url: "https://pkg.go.dev/bufio" },
      { title: "Go by Example: Reading Files", url: "https://gobyexample.com/reading-files" },
      { title: "Go Blog: io.Reader Architecture", url: "https://go.dev/blog/io-reader-architecture" }
    ]
  },

  "os": {
    slug: "os",
    title: "The os Package",
    summary: "The os package provides a platform-independent interface to operating system functionality like files, processes, and environment variables.",
    description: `The os package is Go's bridge to the operating system, providing functions for file system operations, environment variable access, process management, and signal handling. It wraps system calls in a portable API that works across Linux, macOS, and Windows without platform-specific code. Key functions include os.Open, os.Create, os.Mkdir, os.Remove, os.Getenv, os.Exit, and os.Signal.

For backend engineers, the os package is used in virtually every Go program. Services read configuration from environment variables with os.Getenv, write log files with os.Create, create temporary directories with os.MkdirTemp, and handle graceful shutdown with os.Signal. The package also provides os.UserHomeDir, os.Getwd, and os.Hostname for discovering execution context.

The os/exec sub-package enables running external commands, which is useful for interacting with system utilities, building CLI tools that wrap other programs, or integrating with tools like git and docker. In production, always use exec.CommandContext with a timeout to prevent runaway processes, and capture stderr for debugging failed executions.`,
    keyPoints: [
      "os.Getenv reads environment variables; os.LookupEnv distinguishes unset from empty",
      "os.Open and os.Create return *os.File with Read and Write methods",
      "os.ReadFile and os.WriteFile are convenience functions for small files",
      "os.MkdirAll creates directory trees including intermediate directories",
      "os.Remove and os.RemoveAll delete files and directory trees",
      "os.Signal channel and os/signal.Notify enable graceful shutdown",
      "os/exec runs external commands with Command and CommandContext",
      "os.TempDir returns the default temp directory; os.MkdirTemp creates temp dirs"
    ],
    codeExamples: [
      {
        title: "Environment-Based Configuration",
        description: "Reading configuration from environment variables with validation",
        bad: [
          'package main',
          '',
          'import (',
          '    "database/sql"',
          '    "os"',
          '    _ "github.com/lib/pq"',
          ')',
          '',
          'func main() {',
          '    // Not checking if env var is empty',
          '    dbURL := os.Getenv("DATABASE_URL")',
          '    db, _ := sql.Open("postgres", dbURL)',
          '    // dbURL could be empty, causing a confusing error later',
          '    _ = db',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "database/sql"',
          '    "log/slog"',
          '    "os"',
          '    "time"',
          '',
          '    _ "github.com/lib/pq"',
          ')',
          '',
          'func main() {',
          '    dbURL, ok := os.LookupEnv("DATABASE_URL")',
          '    if !ok || dbURL == "" {',
          '        slog.Error("DATABASE_URL environment variable is required")',
          '        os.Exit(1)',
          '    }',
          '',
          '    db, err := sql.Open("postgres", dbURL)',
          '    if err != nil {',
          '        slog.Error("failed to open database", "error", err)',
          '        os.Exit(1)',
          '    }',
          '    defer db.Close()',
          '',
          '    db.SetMaxOpenConns(25)',
          '    db.SetMaxIdleConns(5)',
          '    db.SetConnMaxLifetime(5 * time.Minute)',
          '',
          '    if err := db.Ping(); err != nil {',
          '        slog.Error("failed to connect to database", "error", err)',
          '        os.Exit(1)',
          '    }',
          '',
          '    slog.Info("database connected successfully")',
          '}',
        ].join('\n'),
        explanation: "Use os.LookupEnv to distinguish between an unset variable and an empty string. Always validate required environment variables at startup and fail fast with a clear error message. Configure connection pool settings explicitly for production database connections. Check connectivity with db.Ping() before accepting traffic."
      }
    ],
    bestPractices: [
      "Use os.LookupEnv when you need to distinguish unset from empty variables",
      "Validate all required environment variables at startup and fail fast",
      "Use os.MkdirAll instead of os.Mkdir when intermediate directories may not exist",
      "Always defer file Close() after os.Open or os.Create",
      "Use exec.CommandContext with a deadline to prevent runaway external processes",
      "Use os.Signal with context.Context for graceful shutdown patterns"
    ],
    commonMistakes: [
      "Using os.Getenv without checking if the variable is actually set",
      "Not handling errors from os operations (open, create, remove)",
      "Forgetting to defer Close() on opened files",
      "Using os.Exit in library code instead of returning errors",
      "Not setting timeouts on exec.Command, allowing processes to hang forever"
    ],
    relatedTopics: [
      "io--file-handling",
      "flag",
      "bufio",
      "standard-library"
    ],
    externalResources: [
      { title: "Go Package: os", url: "https://pkg.go.dev/os" },
      { title: "Go Package: os/exec", url: "https://pkg.go.dev/os/exec" },
      { title: "Go by Example: Environment Variables", url: "https://gobyexample.com/environment-variables" }
    ]
  },

  "nethttp-standard": {
    slug: "nethttp-standard",
    title: "net/http: HTTP Servers & Clients",
    summary: "Go's net/http package provides a complete, production-ready HTTP server and client without external dependencies.",
    description: `The net/http package is one of the most powerful packages in Go's standard library. It provides everything needed to build production HTTP servers and clients: request/response handling, routing, middleware patterns, TLS support, connection pooling, timeouts, and HTTP/2. Go's standard library HTTP server is used in production by companies handling millions of requests per second.

For backend engineers, net/http is the foundation of every Go web service. Go 1.22 enhanced the default ServeMux with method-based routing patterns (e.g., "GET /users/{id}"), making it sufficient for many APIs without third-party routers. The http.Handler and http.HandlerFunc interfaces enable clean middleware composition through function chaining. The http.Client provides a configurable HTTP client with connection pooling, timeouts, and transport customization.

In production, the critical aspects are configuring timeouts (ReadTimeout, WriteTimeout, IdleTimeout), using context for request cancellation, proper error handling and logging, and running the server with graceful shutdown. A misconfigured HTTP server without timeouts is a denial-of-service vulnerability waiting to happen.`,
    keyPoints: [
      "http.ListenAndServe starts a server; http.Server provides timeout and TLS configuration",
      "Go 1.22 ServeMux supports method prefixes and path parameters like {id}",
      "http.Handler interface (ServeHTTP method) is the core of request handling",
      "http.HandlerFunc adapts plain functions to the Handler interface",
      "http.Client should be reused — it manages a connection pool internally",
      "Always set ReadTimeout, WriteTimeout, and IdleTimeout on http.Server",
      "http.Request.Context() provides cancellation and deadline propagation",
      "http.Transport settings control connection pooling, TLS, and proxy behavior"
    ],
    codeExamples: [
      {
        title: "Production HTTP Server with Timeouts and Graceful Shutdown",
        description: "A properly configured HTTP server ready for production deployment",
        bad: [
          'package main',
          '',
          'import (',
          '    "net/http"',
          ')',
          '',
          'func main() {',
          '    // No timeouts — vulnerable to slowloris attacks',
          '    // No graceful shutdown — in-flight requests dropped on SIGTERM',
          '    // No error handling on ListenAndServe',
          '    http.ListenAndServe(":8080", nil)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "context"',
          '    "log/slog"',
          '    "net/http"',
          '    "os"',
          '    "os/signal"',
          '    "syscall"',
          '    "time"',
          ')',
          '',
          'func main() {',
          '    mux := http.NewServeMux()',
          '    mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {',
          '        w.WriteHeader(http.StatusOK)',
          '        w.Write([]byte(`{"status":"ok"}`))',
          '    })',
          '',
          '    srv := &http.Server{',
          '        Addr:         ":8080",',
          '        Handler:      mux,',
          '        ReadTimeout:  15 * time.Second,',
          '        WriteTimeout: 15 * time.Second,',
          '        IdleTimeout:  60 * time.Second,',
          '    }',
          '',
          '    done := make(chan os.Signal, 1)',
          '    signal.Notify(done, os.Interrupt, syscall.SIGTERM)',
          '',
          '    go func() {',
          '        slog.Info("server starting", "addr", srv.Addr)',
          '        if err := srv.ListenAndServe(); err != http.ErrServerClosed {',
          '            slog.Error("server error", "error", err)',
          '            os.Exit(1)',
          '        }',
          '    }()',
          '',
          '    <-done',
          '    slog.Info("shutting down server...")',
          '',
          '    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)',
          '    defer cancel()',
          '',
          '    if err := srv.Shutdown(ctx); err != nil {',
          '        slog.Error("shutdown error", "error", err)',
          '    }',
          '    slog.Info("server stopped")',
          '}',
        ].join('\n'),
        explanation: "Always create http.Server explicitly and configure timeouts to protect against slowloris and other resource exhaustion attacks. Use signal.NotifyContext or a signal channel for graceful shutdown. ListenAndServe returns http.ErrServerClosed when Shutdown is called, so check for that specifically. Run the server in a goroutine and block on the signal channel."
      },
      {
        title: "HTTP Client with Timeouts and Connection Reuse",
        description: "Configuring an HTTP client properly for making outbound requests",
        bad: [
          '// Creating a new client for every request — wastes connections',
          'func fetchData(url string) ([]byte, error) {',
          '    resp, err := http.Get(url) // uses DefaultClient with no timeout',
          '    if err != nil {',
          '        return nil, err',
          '    }',
          '    defer resp.Body.Close()',
          '    return io.ReadAll(resp.Body)',
          '}',
        ].join('\n'),
        good: [
          'var httpClient = &http.Client{',
          '    Timeout: 30 * time.Second,',
          '    Transport: &http.Transport{',
          '        MaxIdleConns:        100,',
          '        MaxIdleConnsPerHost: 10,',
          '        IdleConnTimeout:     90 * time.Second,',
          '    },',
          '}',
          '',
          'func fetchData(ctx context.Context, url string) ([]byte, error) {',
          '    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("creating request: %w", err)',
          '    }',
          '',
          '    resp, err := httpClient.Do(req)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("executing request: %w", err)',
          '    }',
          '    defer resp.Body.Close()',
          '',
          '    if resp.StatusCode != http.StatusOK {',
          '        return nil, fmt.Errorf("unexpected status: %d", resp.StatusCode)',
          '    }',
          '',
          '    body, err := io.ReadAll(resp.Body)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("reading body: %w", err)',
          '    }',
          '    return body, nil',
          '}',
        ].join('\n'),
        explanation: "Reuse http.Client instances — they manage connection pools internally. Always set a Timeout on the client to prevent hanging requests. Use http.NewRequestWithContext for context-based cancellation and timeouts. Check response status codes before reading the body. Limit body reads with io.LimitReader if you want to cap memory usage."
      }
    ],
    bestPractices: [
      "Always configure ReadTimeout, WriteTimeout, and IdleTimeout on http.Server",
      "Use http.Server.Shutdown for graceful shutdown — never os.Exit in request handlers",
      "Reuse http.Client instances; never use http.DefaultClient in production",
      "Use context.Context for request-scoped deadlines and cancellation",
      "Check response status codes and handle non-200 responses explicitly",
      "Use Go 1.22 method-based routing patterns before reaching for third-party routers"
    ],
    commonMistakes: [
      "Using http.ListenAndServe without configuring a proper http.Server",
      "Creating a new http.Client for every request, wasting connection pools",
      "Not setting timeouts on http.Server or http.Client",
      "Forgetting to close resp.Body, leaking connections",
      "Reading the entire response body without a size limit (memory exhaustion)"
    ],
    relatedTopics: [
      "standard-library",
      "encodingjson",
      "io--file-handling"
    ],
    externalResources: [
      { title: "Go Package: net/http", url: "https://pkg.go.dev/net/http" },
      { title: "Go Blog: A Guide to the Go net/http Package", url: "https://go.dev/blog/wiki/httprequest" },
      { title: "Go Wiki: HTTP Clients", url: "https://github.com/golang/go/wiki/IntermediateMode" }
    ]
  },

  "encodingjson": {
    slug: "encodingjson",
    title: "encoding/json: JSON Handling",
    summary: "The encoding/json package provides JSON marshaling and unmarshaling with struct tags for field mapping and customization.",
    description: `The encoding/json package is the standard library's solution for encoding and decoding JSON data. It provides json.Marshal for converting Go structs to JSON bytes and json.Unmarshal for the reverse. Struct tags (e.g., \`json:"name"\`) control the JSON field names, omitempty behavior, and whether fields are ignored during encoding.

For backend engineers, JSON handling is critical because most modern APIs communicate using JSON. The encoding/json package handles nested structs, slices, maps, time.Time formatting, and custom types through the json.Marshaler and json.Unmarshaler interfaces. The json.Decoder and json.Encoder types work with io.Reader and io.Writer streams, making them suitable for HTTP request and response bodies.

In production, understanding performance characteristics matters. encoding/json uses reflection under the hood, which has overhead for large payloads. For performance-critical paths, consider code generation tools like easyjson or gjson. For streaming use cases, json.Decoder is more memory-efficient than unmarshaling entire payloads into memory. Always handle errors from Unmarshal and validate the decoded data.`,    keyPoints: [
      "json.Marshal converts Go values to JSON bytes; json.Unmarshal does the reverse",
      "Struct tags like `json:\"name\"` control field names in JSON output",
      "omitempty omits zero-value fields from JSON output",
      "json.Decoder reads JSON from io.Reader; json.Encoder writes to io.Writer",
      "json.RawMessage allows deferred or partial JSON parsing",
      "Custom types implement json.Marshaler and json.Unmarshaler for custom serialization",
      "json.Number provides raw number parsing instead of float64 default",
      "Stream decoding with Decoder is more memory-efficient for large payloads"
    ],
    codeExamples: [
      {
        title: "JSON Marshaling with Struct Tags and Error Handling",
        description: "Properly handling JSON serialization with struct tags and validation",
        bad: [
          'package main',
          '',
          'import (',
          '    "encoding/json"',
          '    "fmt"',
          ')',
          '',
          'type User struct {',
          '    Name     string',
          '    Email    string',
          '    Password string // exposed in JSON output!',
          '    Age      int',
          '}',
          '',
          'func main() {',
          '    u := User{Name: "Alice", Email: "alice@example.com", Password: "secret", Age: 30}',
          '',
          '    // Marshaling includes Password field',
          '    data, _ := json.Marshal(u)',
          '    fmt.Println(string(data))',
          '',
          '    // Unmarshaling without validation',
          '    input := []byte(`{"name": "", "email": "bad"}`)',
          '    var result User',
          '    json.Unmarshal(input, &result) // ignoring error',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "encoding/json"',
          '    "fmt"',
          '    "strings"',
          ')',
          '',
          'type User struct {',
          '    Name     string `json:"name"`',
          '    Email    string `json:"email"`',
          '    Password string `json:"-"`',
          '    Age      int    `json:"age,omitempty"`',
          '}',
          '',
          'func main() {',
          '    u := User{Name: "Alice", Email: "alice@example.com", Password: "secret", Age: 30}',
          '',
          '    data, err := json.Marshal(u)',
          '    if err != nil {',
          '        fmt.Printf("marshal error: %v\\n", err)',
          '        return',
          '    }',
          '    fmt.Println(string(data))',
          '    // {"name":"Alice","email":"alice@example.com","age":30}',
          '',
          '    // Using Decoder for streaming from request body',
          '    input := strings.NewReader(`{"name": "Bob", "email": "bob@example.com"}`)',
          '    var result User',
          '    dec := json.NewDecoder(input)',
          '    dec.DisallowUnknownFields()',
          '    if err := dec.Decode(&result); err != nil {',
          '        fmt.Printf("decode error: %v\\n", err)',
          '        return',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Use `json:\"-\"` to exclude sensitive fields like passwords from JSON output. Use `omitempty` to skip zero-value fields in the output. Always check errors from Marshal and Unmarshal. Use json.Decoder for streaming input and DisallowUnknownFields() to reject unexpected fields for stricter validation."
      }
    ],
    bestPractices: [
      "Always use struct tags to control JSON field names and visibility",
      "Use json:\"-\" to exclude sensitive fields from JSON output",
      "Use omitempty for optional fields that should not appear when empty",
      "Use json.Decoder for streaming large payloads instead of loading everything into memory",
      "Always check errors from json.Marshal and json.Unmarshal",
      "Use DisallowUnknownFields() to catch typos and schema mismatches"
    ],
    commonMistakes: [
      "Exposing sensitive fields (passwords, tokens) in JSON output without json:\"-\"",
      "Ignoring errors from json.Unmarshal, leading to silent data corruption",
      "Not using struct tags, resulting in JSON field names matching Go exported names",
      "Using json.Marshal for streaming data instead of json.Encoder",
      "Assuming JSON numbers always deserialize to int — default is float64"
    ],
    relatedTopics: [
      "nethttp-standard",
      "standard-library",
      "structs"
    ],
    externalResources: [
      { title: "Go Package: encoding/json", url: "https://pkg.go.dev/encoding/json" },
      { title: "Go Blog: JSON and Go", url: "https://go.dev/blog/json" },
      { title: "JSON-to-Go Schema Tool", url: "https://mholt.github.io/json-to-go/" }
    ]
  },

  "time": {
    slug: "time",
    title: "The time Package",
    summary: "Go's time package provides wall clocks, monotonic clocks, durations, timers, and tickers for time-based operations.",
    description: `Go's time package handles everything related to time: measuring elapsed time, scheduling future events, formatting and parsing timestamps, and working with durations. The time.Time type represents an instant with nanosecond precision and includes a monotonic clock reading for accurate duration calculations. time.Duration represents elapsed time as a nanosecond count, with convenient constants like time.Second and time.Minute.

For backend engineers, the time package is essential for implementing timeouts, rate limiting, retry logic, caching TTLs, and scheduling background tasks. The time.Timer and time.Ticker types are foundational for building efficient event loops and periodic task runners. time.After and time.AfterFunc provide simple mechanisms for context-based deadline enforcement.

A critical concept is the difference between wall clock time and monotonic clock time. Wall clock time can jump backward (NTP adjustments, daylight saving), while monotonic time always advances. When computing durations, Go uses the monotonic clock automatically when both time.Time values contain monotonic readings. This is why you should pass time.Time values, not Unix timestamps, when measuring elapsed time.`,
    keyPoints: [
      "time.Now() returns the current time with both wall and monotonic clock readings",
      "time.Duration represents elapsed time in nanosecond precision",
      "Use time.Second, time.Minute, time.Hour for readable duration literals",
      "time.Timer fires once after a duration; time.Ticker fires repeatedly",
      "time.After and time.AfterFunc are convenience wrappers for timers",
      "time.Time.Format uses Go's reference time Mon Jan 2 15:04:05 MST 2006",
      "time.Parse and time.ParseInLocation convert strings to time.Time",
      "time.Since is a shortcut for time.Now().Sub(t)"
    ],
    codeExamples: [
      {
        title: "Timeouts, Timers, and Duration Handling",
        description: "Properly using time package for service timeouts and periodic tasks",
        bad: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "time"',
          ')',
          '',
          'func main() {',
          '    // Using sleep to simulate timeouts — blocks the goroutine',
          '    go func() {',
          '        time.Sleep(5 * time.Second) // no way to cancel',
          '        fmt.Println("done")',
          '    }()',
          '',
          '    // Using Unix timestamps for duration calculation',
          '    start := time.Now().Unix()',
          '    time.Sleep(100 * time.Millisecond)',
          '    elapsed := time.Now().Unix() - start',
          '    fmt.Printf("elapsed: %d seconds\\n", elapsed) // loses sub-second precision',
          '',
          '    // Ticker without stop — leaks goroutine',
          '    ticker := time.NewTicker(time.Second)',
          '    go func() {',
          '        for range ticker.C {',
          '            fmt.Println("tick")',
          '        }',
          '    }()',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "context"',
          '    "fmt"',
          '    "time"',
          ')',
          '',
          'func main() {',
          '    // Context-based timeout — cancellable',
          '    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)',
          '    defer cancel()',
          '',
          '    go func() {',
          '        select {',
          '        case <-time.After(3 * time.Second):',
          '            fmt.Println("completed before timeout")',
          '        case <-ctx.Done():',
          '            fmt.Println("timed out:", ctx.Err())',
          '        }',
          '    }()',
          '',
          '    // Precise duration measurement',
          '    start := time.Now()',
          '    time.Sleep(100 * time.Millisecond)',
          '    elapsed := time.Since(start)',
          '    fmt.Printf("elapsed: %v\\n", elapsed)',
          '',
          '    // Ticker with proper cleanup',
          '    ticker := time.NewTicker(time.Second)',
          '    defer ticker.Stop()',
          '    for i := 0; i < 3; i++ {',
          '        <-ticker.C',
          '        fmt.Println("tick")',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Use context.WithTimeout instead of bare timers for cancellable deadlines. time.Since(start) is cleaner and more precise than computing Unix timestamp differences. Always call ticker.Stop() with defer when done to prevent goroutine leaks. Use time.Duration values, not Unix timestamps, when measuring elapsed time to preserve nanosecond precision."
      }
    ],
    bestPractices: [
      "Use time.Duration and time.Since for elapsed time instead of Unix timestamps",
      "Always call timer.Stop() and ticker.Stop() when done to prevent goroutine leaks",
      "Use context.WithTimeout for request-scoped deadlines instead of bare timers",
      "Store time values as time.Time, not as Unix timestamps or formatted strings",
      "Use the reference time Mon Jan 2 15:04:05 MST 2006 for custom time formats",
      "Check timer.Stop() return value — false means the timer already fired"
    ],
    commonMistakes: [
      "Forgetting to stop timers and tickers, causing goroutine and memory leaks",
      "Using Unix timestamps for duration calculations, losing sub-second precision",
      "Using wrong format string — Go uses a specific reference time, not Y-m-d",
      "Comparing time.Time values with == instead of using .Equal()",
      "Not accounting for time zones when parsing time strings"
    ],
    relatedTopics: [
      "goroutines",
      "context",
      "standard-library"
    ],
    externalResources: [
      { title: "Go Package: time", url: "https://pkg.go.dev/time" },
      { title: "Go Blog: Monotonic Clocks", url: "https://go.dev/blog/monotonic" },
      { title: "Go by Example: Timers and Tickers", url: "https://gobyexample.com/tickers" }
    ]
  },

  "regexp": {
    slug: "regexp",
    title: "The regexp Package",
    summary: "Go's regexp package provides RE2-syntax regular expressions that are safe, fast, and guarantee linear-time matching.",
    description: `Go's regexp package implements regular expressions using the RE2 syntax, which is fundamentally different from PCRE used in many other languages. RE2 guarantees linear-time matching O(n) by eliminating backtracking, making it safe from catastrophic regex backtracking (ReDoS attacks). The trade-off is that RE2 does not support backreferences, lookahead, or lookbehind assertions.

For backend engineers, the regexp package is invaluable for input validation, log parsing, URL routing, and data extraction. Functions like regexp.MatchString, regexp.MustCompile, and regexp.MustCompilePOSIX compile patterns at startup. The Regexp type provides methods for finding, replacing, and splitting strings based on patterns.

In production, always pre-compile regex patterns at the package level or in init functions. Compiling a regex at runtime on every request is wasteful. Use MustCompile for patterns known at compile time — it panics on invalid patterns, catching errors early. For simple string operations, use strings.Contains, strings.HasPrefix, or strings.Index instead of regexp, as they are significantly faster.`,
    keyPoints: [
      "RE2 syntax guarantees linear-time matching — no ReDoS vulnerabilities",
      "regexp.MustCompile compiles at package level; panics on invalid patterns",
      "regexp.Compile returns an error instead of panicking",
      "Regexp.FindString, FindAllString, and Submatch extract matches",
      "Regexp.ReplaceAllString and ReplaceAllStringSubexp perform replacements",
      "regexp.QuoteMeta escapes special regex characters for literal matching",
      "Named groups use (?P<name>pattern) syntax",
      "For simple operations, prefer strings.Contains over regexp.MatchString"
    ],
    codeExamples: [
      {
        title: "Pre-compiled Regex Patterns for Performance",
        description: "Using regexp correctly with pre-compilation and proper error handling",
        bad: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "regexp"',
          ')',
          '',
          'func validateEmail(email string) bool {',
          '    // Compiling regex on every call — expensive!',
          '    matched, _ := regexp.MatchString(`^[a-zA-Z0-9]+@example\\.com$`, email)',
          '    return matched',
          '}',
          '',
          'func extractDomains(logLine string) []string {',
          '    // Another runtime compilation',
          '    re := regexp.MustCompile(`([a-z]+)\\.example\\.com`)',
          '    return re.FindAllString(logLine, -1)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "regexp"',
          ')',
          '',
          'var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$`)',
          'var domainRegex = regexp.MustCompile(`([a-z]+)\\.example\\.com`) ',
          '',
          'func validateEmail(email string) bool {',
          '    return emailRegex.MatchString(email)',
          '}',
          '',
          'func extractDomains(logLine string) []string {',
          '    return domainRegex.FindAllString(logLine, -1)',
          '}',
          '',
          'func main() {',
          '    fmt.Println(validateEmail("alice@example.com"))  // true',
          '    fmt.Println(validateEmail("not-an-email"))      // false',
          '    logLine := "request from api.example.com and auth.example.com"',
          '    fmt.Println(extractDomains(logLine))',
          '}',
        ].join('\n'),
        explanation: "Always compile regex patterns at the package level using regexp.MustCompile. This compiles once at startup instead of on every function call. MustCompile panics on invalid patterns, which is desirable for patterns known at compile time — it surfaces errors during testing. For patterns that may come from user input, use regexp.Compile to handle the error gracefully."
      }
    ],
    bestPractices: [
      "Pre-compile regex patterns at the package level using regexp.MustCompile",
      "Use regexp.Compile when the pattern comes from user input (handle errors)",
      "Use strings.Contains, strings.HasPrefix, and strings.Index for simple pattern matching",
      "Use regexp.QuoteMeta to escape user-provided strings for literal matching",
      "Keep regex patterns simple and readable; add comments with (?#) for complex patterns",
      "Test regex patterns against edge cases including empty strings and long inputs"
    ],
    commonMistakes: [
      "Compiling regex patterns inside functions called frequently (performance hit)",
      "Not handling errors from regexp.Compile (using MustCompile for dynamic patterns)",
      "Using regexp for simple string operations where strings package suffices",
      "Writing overly complex patterns that are hard to read and maintain",
      "Forgetting that RE2 does not support backreferences or lookaheads"
    ],
    relatedTopics: [
      "standard-library",
      "io--file-handling",
      "flag"
    ],
    externalResources: [
      { title: "Go Package: regexp", url: "https://pkg.go.dev/regexp" },
      { title: "RE2 Syntax Reference", url: "https://github.com/google/re2/wiki/Syntax" },
      { title: "Go by Example: Regular Expressions", url: "https://gobyexample.com/regular-expressions" }
    ]
  },

  "logging": {
    slug: "logging",
    title: "Logging in Go",
    summary: "Go's standard library provides the log package for basic logging and log/slog for structured, leveled logging introduced in Go 1.21.",
    description: `Logging is a fundamental requirement for any production backend service. Go's standard library offers two logging approaches: the classic log package for simple text-based logging, and the newer log/slog package (introduced in Go 1.21) for structured, leveled logging. The log package writes timestamped messages to stderr, while slog provides key-value structured output in JSON or text format.

For backend engineers, structured logging is essential for observability. Structured logs with consistent fields (request ID, user ID, latency, status code) can be easily searched, filtered, and aggregated by log management systems like ELK, Datadog, or CloudWatch. slog's Handler interface allows you to customize output format and destination without changing log call sites.

In production systems, logging strategy matters. Use different log levels (Debug, Info, Warn, Error) appropriately. Always include context in log messages — what operation was happening, what the inputs were, and what the error was. Avoid logging sensitive data like passwords, tokens, or PII. Consider performance implications: for high-throughput services, sampling or asynchronous logging may be necessary.`,    keyPoints: [
      "log package provides simple text logging to stderr with timestamps",
      "log/slog (Go 1.21) provides structured key-value logging with levels",
      "slog.Info, slog.Warn, slog.Error accept key-value pairs for structured output",
      "slog.Handler interface allows custom output formats (JSON, text, custom)",
      "log.Fatal and log.Fatalf call os.Exit(1) after logging — deferred functions do not run",
      "slog.NewJSONHandler produces JSON output suitable for log aggregation systems",
      "Use slog.With to add persistent fields to a logger for request-scoped context",
      "Set the default slog logger with slog.SetDefault for consistent application logging"
    ],
    codeExamples: [
      {
        title: "Structured Logging with log/slog",
        description: "Setting up structured logging for a production Go service",
        bad: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "log"',
          ')',
          '',
          'func handleRequest(method, path string, statusCode int) {',
          '    // Unstructured log — impossible to filter or search by field',
          '    log.Printf("%s %s %d", method, path, statusCode)',
          '',
          '    // fmt.Println mixed with log — no consistent destination',
          '    fmt.Println("something happened")',
          '',
          '    // log.Fatal exits immediately — deferred functions never run',
          '    if statusCode >= 500 {',
          '        log.Fatal("server error")',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "log/slog"',
          '    "os"',
          ')',
          '',
          'func init() {',
          '    logger := slog.New(slog.NewJSONHandler(os.Stderr, &slog.HandlerOptions{',
          '        Level: slog.LevelInfo,',
          '    }))',
          '    slog.SetDefault(logger)',
          '}',
          '',
          'func handleRequest(method, path string, statusCode int) {',
          '    // Structured log with consistent fields',
          '    slog.Info("request handled",',
          '        "method", method,',
          '        "path", path,',
          '        "status", statusCode,',
          '    )',
          '',
          '    if statusCode >= 500 {',
          '        slog.Error("server error",',
          '            "method", method,',
          '            "path", path,',
          '            "status", statusCode,',
          '        )',
          '    }',
          '}',
          '',
          'func main() {',
          '    slog.Info("server started", "addr", ":8080")',
          '    handleRequest("GET", "/health", 200)',
          '}',
        ].join('\n'),
        explanation: "Use slog with JSON handler for structured logs that can be parsed by log management systems. Every log line includes consistent key-value pairs for filtering and aggregation. Avoid log.Fatal in service code — it bypasses deferred functions like connection cleanup. Use slog.Info/Warn/Error with structured fields instead of unformatted strings."
      }
    ],
    bestPractices: [
      "Use log/slog with JSON output for production services — structured logs are searchable",
      "Include contextual fields (request ID, user ID, duration) in every log entry",
      "Avoid logging sensitive data: passwords, tokens, PII, and database connection strings",
      "Use log levels consistently: Debug for development, Info for operations, Error for failures",
      "Never use log.Fatal in library code or request handlers — it bypasses defer",
      "Set up logging early in main() with slog.SetDefault for consistent output"
    ],
    commonMistakes: [
      "Using log.Fatal in request handlers, which kills the process without running defers",
      "Logging unstructured strings instead of key-value pairs for machine parsing",
      "Logging sensitive information like passwords, tokens, or PII",
      "Using fmt.Println for operational logging instead of a proper logger",
      "Not setting log levels, resulting in too much or too little output in production"
    ],
    relatedTopics: [
      "slog",
      "standard-library",
      "nethttp-standard"
    ],
    externalResources: [
      { title: "Go Package: log/slog", url: "https://pkg.go.dev/log/slog" },
      { title: "Go Blog: Structured Logging with slog", url: "https://go.dev/blog/log-slog" },
      { title: "Go Package: log", url: "https://pkg.go.dev/log" }
    ]
  },

  "slog": {
    slug: "slog",
    title: "log/slog: Structured Logging",
    summary: "Go 1.21 introduced log/slog for high-performance structured logging with JSON/text output and customizable handlers.",
    description: `log/slog is Go's standard library solution for structured logging, introduced in Go 1.21. It provides a fast, extensible logging API that outputs key-value pairs in JSON or text format. The slog package was designed with performance as a primary concern — it avoids allocations in common logging paths and supports both synchronous and asynchronous handlers.

The core abstraction in slog is the Handler interface, which processes log Records containing a message, level, time, and a set of key-value Attrs. The built-in JSONHandler produces JSON lines suitable for log aggregation, while TextHandler produces human-readable output for development. You can implement custom handlers to send logs to external services, buffer them, or filter by level.

For backend engineers, slog represents a significant improvement over the classic log package. Its structured output enables powerful querying and analysis in tools like Datadog, Cloudflare Logpush, or the ELK stack. The slog.With method creates child loggers with persistent fields, which is perfect for request-scoped logging where every log line from a handler should include the request ID and user ID.`,
    keyPoints: [
      "slog provides Info, Warn, Error, and Debug functions with key-value attributes",
      "JSONHandler outputs JSON lines; TextHandler outputs human-readable key=value pairs",
      "slog.With creates loggers with persistent fields for request-scoped context",
      "The Handler interface allows custom log processors and destinations",
      "slog.Group organizes related attributes under a common namespace",
      "Performance is optimized — zero-allocation paths for common logging patterns",
      "slog.Record can carry source locations when enabled via HandlerOptions",
      "ReplaceAttr allows transforming or redacting attributes before output"
    ],
    codeExamples: [
      {
        title: "Request-Scoped Logging with slog.With",
        description: "Creating child loggers with persistent context for each request",
        bad: [
          'package main',
          '',
          'import (',
          '    "log/slog"',
          '    "net/http"',
          ')',
          '',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    // Logging without request context — impossible to correlate logs',
          '    slog.Info("processing request")',
          '    slog.Info("request completed", "status", 200)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "log/slog"',
          '    "net/http"',
          '    "time"',
          ')',
          '',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    start := time.Now()',
          '',
          '    // Create a child logger with request-scoped fields',
          '    log := slog.With(',
          '        "method", r.Method,',
          '        "path", r.URL.Path,',
          '        "remote", r.RemoteAddr,',
          '    )',
          '',
          '    log.Info("processing request")',
          '',
          '    // Business logic here',
          '    w.WriteHeader(http.StatusOK)',
          '    w.Write([]byte("OK"))',
          '',
          '    log.Info("request completed",',
          '        "status", http.StatusOK,',
          '        "duration", time.Since(start),',
          '    )',
          '}',
          '',
          'func main() {',
          '    slog.SetDefault(slog.New(slog.NewJSONHandler(slog.Default().Handler().(slog.Handler), nil)))',
          '    http.HandleFunc("GET /", handler)',
          '    slog.Info("server starting", "addr", ":8080")',
          '    http.ListenAndServe(":8080", nil)',
          '}',
        ].join('\n'),
        explanation: "Use slog.With to attach persistent fields (method, path, remote address) to a child logger. Every subsequent log call from that logger automatically includes these fields, eliminating repetition and ensuring consistency. Include timing information (duration) in completion logs for performance monitoring. This pattern makes it trivial to correlate logs for a specific request."
      }
    ],
    bestPractices: [
      "Use slog.With for request-scoped logging to avoid repeating common fields",
      "Output JSON with JSONHandler for production — parseable by log aggregation tools",
      "Use slog.Group to namespace related attributes (e.g., db, http, user)",
      "Enable source location reporting in development with HandlerOptions.AddSource",
      "Use ReplaceAttr to redact sensitive fields before they reach log output",
      "Set slog.SetDefault early in main() so all packages use the same configuration"
    ],
    commonMistakes: [
      "Not using slog.With, leading to repetitive field declarations across log calls",
      "Using the default TextHandler in production instead of JSONHandler",
      "Logging at Debug level in production, creating excessive noise",
      "Not redacting sensitive attributes (passwords, tokens) in custom handlers",
      "Creating a new slog.Logger per request instead of using With for child loggers"
    ],
    relatedTopics: [
      "logging",
      "standard-library",
      "nethttp-standard"
    ],
    externalResources: [
      { title: "Go Package: log/slog", url: "https://pkg.go.dev/log/slog" },
      { title: "Go Blog: An Introduction to log/slog", url: "https://go.dev/blog/log-slog" },
      { title: "Go 1.21 Release Notes: log/slog", url: "https://go.dev/doc/go1.21" }
    ]
  },

  "modules--dependencies": {
    slug: "modules--dependencies",
    title: "Go Modules & Dependencies",
    summary: "Go modules is the standard dependency management system, using go.mod and go.sum to declare and verify dependencies.",
    description: `Go modules is the official dependency management system for Go, introduced in Go 1.11 and made the default in Go 1.13. A module is a collection of Go packages with a go.mod file that defines the module path and its dependencies. The go.sum file provides a cryptographic checksum of every dependency to ensure reproducible builds.

For backend engineers, understanding Go modules is essential for managing project dependencies, ensuring reproducible builds across development and CI environments, and publishing reusable packages. The go.mod file declares the module's import path, Go version, and required dependencies. go.sum contains expected checksums for every dependency, preventing tampered packages from being used.

In production, pin your Go version in go.mod, commit go.sum to version control, and use go mod vendor if you need vendored dependencies for air-gapped environments. The go module proxy (proxy.golang.org) caches and serves module downloads, improving build speed and reliability. Tools like go mod tidy, go mod verify, and go mod graph help maintain a clean dependency tree.`,
    keyPoints: [
      "go.mod defines the module path, Go version, and dependencies",
      "go.sum contains cryptographic checksums for reproducible builds",
      "go mod tidy adds missing dependencies and removes unused ones",
      "go mod vendor copies dependencies into the vendor/ directory",
      "Module proxy (proxy.golang.org) caches and serves module downloads",
      "Replace directives can redirect module paths for local development",
      "go mod graph shows the complete dependency tree",
      "Semantic import versioning (v2, v3) requires updating the module path"
    ],
    codeExamples: [
      {
        title: "Managing Dependencies with Go Modules",
        description: "Properly initializing and managing Go module dependencies",
        bad: [
          '// Without go.mod — GOPATH mode, not reproducible',
          '$ mkdir myproject && cd myproject',
          '$ go get github.com/gin-gonic/gin@latest',
          '// Dependency versions not tracked — different team members get different versions',
          '// No checksum verification — vulnerable to supply chain attacks',
        ].join('\n'),
        good: [
          '// Initialize a new module',
          '$ go mod init github.com/myorg/myproject',
          '',
          '// Add a dependency (Go 1.17+)',
          '$ go get github.com/gin-gonic/gin@v1.9.1',
          '',
          '// Tidy up — add missing, remove unused',
          '$ go mod tidy',
          '',
          '// Verify checksums match',
          '$ go mod verify',
          '',
          '// View the dependency graph',
          '$ go mod graph',
          '',
          '// go.mod content:',
          '// module github.com/myorg/myproject',
          '// go 1.22',
          '// require (',
          '//     github.com/gin-gonic/gin v1.9.1',
          '// )',
        ].join('\n'),
        explanation: "Always initialize go.mod for new projects with go mod init. Pin specific versions of dependencies (not @latest in production). Run go mod tidy before committing to ensure the dependency list is clean. Commit go.sum to version control for reproducible builds. Use go mod verify to check that downloaded modules match expected checksums."
      }
    ],
    bestPractices: [
      "Always commit go.mod and go.sum to version control",
      "Run go mod tidy before committing to keep dependency lists clean",
      "Pin specific dependency versions instead of using @latest",
      "Use go mod verify in CI to check for checksum mismatches",
      "Use replace directives for local development, not production",
      "Consider go mod vendor for air-gapped or hermetic build environments"
    ],
    commonMistakes: [
      "Using @latest in go.mod instead of pinning specific versions",
      "Not committing go.sum, breaking reproducible builds for other developers",
      "Forgetting to run go mod tidy, leaving stale dependencies in go.mod",
      "Using replace directives in production go.mod files",
      "Not running go mod vendor in CI when using vendored dependencies"
    ],
    relatedTopics: [
      "go-mod",
      "go-mod-init",
      "go-mod-tidy",
      "publishing-modules"
    ],
    externalResources: [
      { title: "Go Modules Reference", url: "https://go.dev/ref/mod" },
      { title: "Go Blog: Using Go Modules", url: "https://go.dev/blog/using-go-modules" },
      { title: "Managing Dependencies Tutorial", url: "https://go.dev/doc/modules/managing-dependencies" }
    ]
  },

  "go-mod": {
    slug: "go-mod",
    title: "go.mod File Deep Dive",
    summary: "The go.mod file is the core of Go modules, declaring the module path, Go version, and all direct and indirect dependencies.",
    description: `The go.mod file is the heart of Go's module system. It contains three primary directives: module (the module's import path), go (the Go language version requirement), and require (the list of dependencies with their versions). An optional replace directive redirects a module to a different source, and exclude can prevent specific versions from being used.

Understanding go.mod is critical for backend engineers because it governs how your project resolves dependencies, which Go language features are available, and how your module interacts with the broader Go ecosystem. The module path in go.mod becomes the import prefix for all packages within the module — for example, github.com/myorg/myproject/internal/auth.

The go directive in go.mod controls which Go features and standard library packages are available. Setting it to go 1.22 enables the latest language features and standard library additions. The Go toolchain directive (introduced in Go 1.21) can automatically download and use the correct Go version when building, ensuring consistency across development environments.`,
    keyPoints: [
      "module directive defines the module's import path (e.g., github.com/org/repo)",
      "go directive specifies the minimum Go version required to build the module",
      "toolchain directive (Go 1.21+) auto-downloads the correct Go version",
      "require directive lists dependencies with specific versions",
      "replace directive redirects a module to a different path or local directory",
      "exclude directive prevents specific module versions from being selected",
      "indirect dependencies are listed with // indirect comments",
      "The module path must match the repository location for publishable modules"
    ],
    codeExamples: [
      {
        title: "Understanding go.mod Directives",
        description: "A well-structured go.mod file with proper directives",
        bad: [
          '// Inconsistent module path',
          'module myapp',
          '',
          '// Missing go directive',
          '',
          '// Using replace in production',
          'require (',
          '    github.com/sirupsen/logrus v1.9.3',
          ')',
          'replace github.com/sirupsen/logrus => ./local-logrus',
        ].join('\n'),
        good: [
          'module github.com/myorg/myproject',
          '',
          'go 1.22',
          '',
          'toolchain go1.22.0',
          '',
          'require (',
          '    github.com/lib/pq v1.10.9',
          '    golang.org/x/sync v0.7.0',
          ')',
          '',
          '// go 1.22 removed the need for separate require blocks',
          '// for indirect dependencies — go mod tidy manages them automatically',
          '',
          '// Use replace only for local development:',
          '// replace github.com/myorg/mylib => ../mylib',
        ].join('\n'),
        explanation: "The module path should match your repository URL for publishable packages. Always include the go directive to specify the minimum Go version. Use toolchain to pin the exact Go version for reproducible builds. Avoid replace directives in committed go.mod files — use them only for local development and override via GOFLAGS or a separate go.mod in test environments."
      }
    ],
    bestPractices: [
      "Match the module path to your repository URL for publishable packages",
      "Set the go directive to the minimum version your code requires",
      "Use the toolchain directive to pin the exact Go version for builds",
      "Avoid replace directives in production — use GOFLAGS=-mod=mod for overrides",
      "Let go mod tidy manage indirect dependency versions automatically",
      "Update the go directive when adopting new language features"
    ],
    commonMistakes: [
      "Setting a module path that does not match the repository location",
      "Using replace directives in production go.mod files",
      "Not updating the go directive when using new language features",
      "Manually editing indirect dependencies instead of using go mod tidy",
      "Missing the go directive entirely, causing default version behavior"
    ],
    relatedTopics: [
      "modules--dependencies",
      "go-mod-init",
      "go-mod-tidy"
    ],
    externalResources: [
      { title: "Go Module Reference: go.mod", url: "https://go.dev/ref/mod#go-mod" },
      { title: "Go Blog: Using Go Modules", url: "https://go.dev/blog/using-go-modules" },
      { title: "Go Wiki: Modules", url: "https://github.com/golang/go/wiki/Modules" }
    ]
  },

  "go-mod-init": {
    slug: "go-mod-init",
    title: "go mod init",
    summary: "go mod init creates a new go.mod file, establishing a new module with a specified import path.",
    description: `The go mod init command creates a new go.mod file in the current directory, initializing a new Go module. The command takes a module path as an argument, which typically matches the project's repository URL (e.g., github.com/username/projectname). This module path becomes the import prefix for all packages within the project.

For backend engineers starting new projects, go mod init is always the first step. It sets up the dependency management infrastructure that Go requires. After initialization, you can add dependencies with go get, and Go will automatically add them to go.mod and generate the corresponding go.sum entries.

If you're migrating an existing project from GOPATH mode to modules, go mod init will analyze your imported packages and generate the initial go.mod with the required dependencies. Following up with go mod tidy ensures all transitive dependencies are properly recorded. The command also supports initializing modules within subdirectories for monorepo structures.`,
    keyPoints: [
      "go mod init <module-path> creates a new go.mod in the current directory",
      "The module path should match the repository URL for publishable packages",
      "go mod init can migrate GOPATH projects by analyzing import statements",
      "Initializing in subdirectories creates nested modules for monorepos",
      "After init, use go get to add dependencies and go mod tidy to clean up",
      "The go directive defaults to the current Go version on initialization",
      "go mod init requires Go 1.13 or later (module mode is default)",
      "Module paths for internal packages use /internal/ in the path"
    ],
    codeExamples: [
      {
        title: "Initializing a New Go Module",
        description: "Setting up a new project with Go modules from scratch",
        bad: [
          '// Not initializing a module — relies on GOPATH (deprecated)',
          '$ mkdir myproject && cd myproject',
          '$ cat > main.go <<EOF',
          'package main',
          'import "github.com/sirupsen/logrus"',
          'func main() { logrus.Info("hello") }',
          'EOF',
          '$ go run main.go // May fail without module mode',
        ].join('\n'),
        good: [
          '// Initialize module with proper path',
          '$ mkdir myproject && cd myproject',
          '$ go mod init github.com/myorg/myproject',
          '',
          '// Write your code',
          '$ cat > main.go <<EOF',
          'package main',
          'import "log/slog"',
          'func main() { slog.Info("hello") }',
          'EOF',
          '',
          '// Tidy to verify and record dependencies',
          '$ go mod tidy',
          '',
          '// Verify the module is set up correctly',
          '$ cat go.mod',
          '// module github.com/myorg/myproject',
          '// go 1.22',
          '',
          '$ go build ./...',
        ].join('\n'),
        explanation: "Always run go mod init as the first step for new projects. Use a module path that matches your repository URL so others can import your packages. go mod tidy after writing code ensures all dependencies are recorded. For monorepos, you can initialize modules in subdirectories to create independent versioning boundaries."
      }
    ],
    bestPractices: [
      "Use the full repository path as the module path (e.g., github.com/org/repo)",
      "Initialize modules before writing any code with external imports",
      "Use go mod tidy after init to populate dependencies from your code",
      "For monorepos, consider separate modules for independently versioned components",
      "Verify the module with go build ./... after initialization"
    ],
    commonMistakes: [
      "Using a short, informal module path that does not match the repository URL",
      "Forgetting to run go mod init and getting confusing import errors",
      "Initializing the module in the wrong directory (should be the project root)",
      "Not running go mod tidy after init, leaving go.mod incomplete",
      "Using module paths with capital letters (Go module paths are case-sensitive)"
    ],
    relatedTopics: [
      "go-mod",
      "modules--dependencies",
      "go-mod-tidy"
    ],
    externalResources: [
      { title: "Go Command: go mod init", url: "https://go.dev/ref/mod#go-mod-init" },
      { title: "Tutorial: Create a Go Module", url: "https://go.dev/doc/tutorial/create-module" },
      { title: "Go Blog: Using Go Modules", url: "https://go.dev/blog/using-go-modules" }
    ]
  },

  "go-mod-tidy": {
    slug: "go-mod-tidy",
    title: "go mod tidy",
    summary: "go mod tidy adds missing module requirements and removes unused dependencies to keep go.mod clean and correct.",
    description: `The go mod tidy command analyzes your Go source files to determine which dependencies are actually imported. It adds any missing requirements to go.mod and removes dependencies that are no longer used by any package in your module. It also updates go.sum with the correct checksums for all required modules.

For backend engineers, go mod tidy is a critical maintenance command. After adding or removing imports in your code, running go mod tidy ensures your go.mod accurately reflects what your project needs. This prevents shipping unnecessary dependencies and keeps the dependency tree clean. It's common practice to run go mod tidy as part of CI checks to ensure go.mod and go.sum are always in sync with the source code.

The command also handles indirect dependencies — packages required by your direct dependencies but not directly imported by your code. These are marked with // indirect comments in go.mod. go mod tidy resolves the complete transitive dependency graph and records the minimum required versions for all dependencies.`,
    keyPoints: [
      "Adds missing require directives based on import statements in your code",
      "Removes require directives for packages no longer imported",
      "Updates go.sum with correct checksums for all dependencies",
      "Resolves indirect (transitive) dependencies and adds them with // indirect",
      "Ensures go.mod and go.sum are always in sync with source code",
      "Should be run after any changes to import statements",
      "Commonly used as a CI check: go mod tidy && git diff --exit-code go.mod go.sum",
      "go mod tidy -e continues past errors, useful for partially broken modules"
    ],
    codeExamples: [
      {
        title: "Using go mod tidy to Clean Dependencies",
        description: "Keeping your dependency list accurate and minimal",
        bad: [
          '// Manually managing dependencies — error-prone and tedious',
          '$ vim go.mod  // manually adding/removing require lines',
          '',
          '// Forgetting to update go.sum — builds fail for other developers',
          '// Running go get for each import instead of letting tidy handle it',
          '',
          '// No CI check — stale dependencies accumulate over time',
        ].join('\n'),
        good: [
          '// After changing imports, tidy handles everything',
          '$ go mod tidy',
          '',
          '// Verify what changed',
          '$ git diff go.mod go.sum',
          '',
          '// CI check to ensure go.mod is always clean',
          '$ cat .github/workflows/ci.yml',
          '# steps:',
          '#   - run: go mod tidy',
          '#   - run: git diff --exit-code go.mod go.sum',
          '',
          '// If tidy fails due to a broken dependency:',
          '$ go mod tidy -e  // continues past errors',
          '',
          '// Check for unused dependencies:',
          '$ go mod why -m github.com/unused/dep',
          '$ go mod graph | grep unused',
        ].join('\n'),
        explanation: "Run go mod tidy after any import changes to keep go.mod and go.sum accurate. Add a CI step that runs go mod tidy and checks for diffs — this catches forgotten dependency updates. go mod why shows why a module is needed in the dependency graph. Use go mod tidy -e to continue past errors when debugging broken dependency chains."
      }
    ],
    bestPractices: [
      "Run go mod tidy after every change to import statements",
      "Add go mod tidy && git diff --exit-code to CI pipelines",
      "Commit go.mod and go.sum changes from tidy to version control",
      "Use go mod why to understand why a dependency is required",
      "Use go mod tidy -e when debugging broken dependency chains",
      "Run go mod verify after tidy to ensure checksums are valid"
    ],
    commonMistakes: [
      "Not running go mod tidy after adding or removing imports",
      "Forgetting to commit go.sum changes alongside go.mod changes",
      "Manually editing go.mod instead of using go mod tidy",
      "Ignoring indirect dependencies that may need version updates",
      "Running go get instead of go mod tidy for dependency management"
    ],
    relatedTopics: [
      "go-mod",
      "go-mod-init",
      "modules--dependencies"
    ],
    externalResources: [
      { title: "Go Command: go mod tidy", url: "https://go.dev/ref/mod#go-mod-tidy" },
      { title: "Go Modules Reference", url: "https://go.dev/ref/mod" },
      { title: "Go Blog: Using Go Modules", url: "https://go.dev/blog/using-go-modules" }
    ]
  },

  "go-mod-vendor": {
    slug: "go-mod-vendor",
    title: "go mod vendor",
    summary: "go mod vendor copies all module dependencies into a vendor/ directory for self-contained, hermetic builds.",
    description: `The go mod vendor command copies all dependencies listed in go.mod and go.sum into a vendor/ directory within your project. This creates a self-contained copy of every dependency, meaning builds can proceed without downloading anything from the network. The vendor/ directory includes a vendor/modules.txt file that tracks which modules and packages were vendored.

For backend engineers, vendoring is valuable in several scenarios. Air-gapped environments that cannot access the internet require vendored dependencies. Reproducible builds benefit from vendoring because the exact dependency versions are committed alongside the source code. Some regulated industries require vendored dependencies for audit and compliance purposes.

When building with vendored dependencies, use the -mod=vendor flag or set GOFLAGS=-mod=vendor. The go build, go test, and go vet commands will then resolve dependencies from the vendor/ directory instead of the module cache. Running go mod vendor regenerates the vendor/ directory based on the current go.mod, and go mod vendor -v provides verbose output showing which packages are being copied.`,
    keyPoints: [
      "go mod vendor copies all dependencies into vendor/ directory",
      "vendor/modules.txt tracks vendored modules and their versions",
      "Build with -mod=vendor or GOFLAGS=-mod=vendor to use vendored dependencies",
      "Vendoring creates self-contained builds without network access",
      "go mod vendor regenerates the vendor/ directory from go.mod",
      "The vendor/ directory should be committed to version control",
      "Vendored dependencies can be inspected and audited directly in vendor/",
      "go mod verify checks that vendor/ matches go.sum checksums"
    ],
    codeExamples: [
      {
        title: "Setting Up Vendored Dependencies",
        description: "Creating and using vendored dependencies for hermetic builds",
        bad: [
          '// Vendoring without committing — defeats the purpose',
          '$ go mod vendor',
          '$ echo "vendor/" >> .gitignore  // nobody can build offline',
          '',
          '// Using vendor without the -mod=vendor flag',
          '$ go build ./...  // ignores vendor/ directory',
          '',
          '// Not regenerating vendor/ after dependency changes',
          '$ go get github.com/new/dep@v1.0.0',
          '$ go build ./...  // vendor/ is stale!',
        ].join('\n'),
        good: [
          '// Create vendor directory',
          '$ go mod vendor',
          '',
          '// Verify vendored dependencies match go.sum',
          '$ go mod verify',
          '',
          '// Build using vendored dependencies',
          '$ go build -mod=vendor ./...',
          '',
          '// Add to .envrc or Makefile for convenience:',
          '// export GOFLAGS="-mod=vendor"',
          '',
          '// After updating dependencies, regenerate vendor/',
          '$ go get github.com/updated/dep@v1.2.0',
          '$ go mod tidy',
          '$ go mod vendor',
          '$ git add vendor/ go.mod go.sum',
        ].join('\n'),
        explanation: "Always commit the vendor/ directory to version control after running go mod vendor. Use -mod=vendor in build commands or set GOFLAGS globally. When dependencies change, run go mod tidy followed by go mod vendor to regenerate. Verify with go mod verify that vendored code matches expected checksums. This workflow ensures every developer and CI pipeline builds with identical dependency versions."
      }
    ],
    bestPractices: [
      "Commit the vendor/ directory to version control after go mod vendor",
      "Use -mod=vendor or GOFLAGS=-mod=vendor for builds with vendored dependencies",
      "Regenerate vendor/ after every dependency change with go mod vendor",
      "Run go mod verify to ensure vendored dependencies match go.sum",
      "Include go mod vendor in CI pipelines for reproducible builds",
      "Use vendor/ for audit trails in regulated environments"
    ],
    commonMistakes: [
      "Adding vendor/ to .gitignore, making builds non-reproducible for others",
      "Forgetting to regenerate vendor/ after changing dependencies",
      "Not using -mod=vendor flag when building with vendored dependencies",
      "Committing only go.mod but not vendor/ — breaks offline builds",
      "Running go get instead of go mod vendor after updating go.mod"
    ],
    relatedTopics: [
      "go-mod",
      "modules--dependencies",
      "go-mod-tidy"
    ],
    externalResources: [
      { title: "Go Command: go mod vendor", url: "https://go.dev/ref/mod#go-mod-vendor" },
      { title: "Go Modules Reference: Vendoring", url: "https://go.dev/ref/mod#vendoring" },
      { title: "Go Blog: Using Go Modules", url: "https://go.dev/blog/using-go-modules" }
    ]
  },

  "publishing-modules": {
    slug: "publishing-modules",
    title: "Publishing Go Modules",
    summary: "Publishing Go modules to make your packages importable by others using version tags and the Go module proxy.",
    description: `Publishing a Go module makes your packages available for other Go projects to import. The Go module system uses Git tags to define versions. When you push a version tag (e.g., v1.2.3) to a repository, the Go module proxy (proxy.golang.org) automatically picks it up and makes it available for go get. The module path in go.mod must match the repository location for the module to be downloadable.

For backend engineers building shared libraries or tools, understanding the publishing workflow is important. Go uses semantic versioning (semver) with the v prefix: v1.0.0, v1.2.3, v2.0.0. Major version increments (v2, v3) require updating the module path to include the version suffix (e.g., github.com/org/repo/v2). This allows multiple major versions to coexist.

The publishing process involves ensuring your go.mod is clean (go mod tidy), your tests pass, your README documents the packages, and your Git tags follow semver conventions. The Go module proxy and checksum database (sum.golang.org) provide security guarantees — once a version is published, its checksums are immutable, protecting against supply chain attacks.`,
    keyPoints: [
      "Git tags define module versions (e.g., v1.0.0, v1.2.3)",
      "Module path must match the repository URL for proxy.golang.org to serve it",
      "Major versions v2+ require updating the module path with /v2 suffix",
      "Go module proxy (proxy.golang.org) automatically picks up new tags",
      "Checksum database (sum.golang.org) provides immutable checksum verification",
      "go mod tidy and go mod verify should be run before tagging a release",
      "Use go list -m all to verify module version information",
      "Pre-release versions use tags like v1.0.0-rc.1 or v1.0.0-beta.2"
    ],
    codeExamples: [
      {
        title: "Preparing and Tagging a Release",
        description: "Steps to publish a Go module with proper versioning",
        bad: [
          '// Tagging without preparation',
          '$ git tag v1.0.0',
          '$ git push --tags',
          '// go.mod may have stale dependencies, tests may not pass',
          '// Module may not be downloadable (wrong module path)',
        ].join('\n'),
        good: [
          '// Step 1: Ensure code is ready',
          '$ go mod tidy',
          '$ go mod verify',
          '$ go test ./...',
          '$ go vet ./...',
          '',
          '// Step 2: Verify module information',
          '$ go list -m all',
          '$ go list -m -versions github.com/myorg/mylib',
          '',
          '// Step 3: Tag the release',
          '$ git tag -a v1.0.0 -m "Release v1.0.0"',
          '$ git push origin v1.0.0',
          '',
          '// Step 4: Verify publication',
          '$ go list -m -versions github.com/myorg/mylib@v1.0.0',
          '',
          '// For v2+ major versions, update go.mod:',
          '// module github.com/myorg/mylib/v2',
          '// Then tag as v2.0.0',
        ].join('\n'),
        explanation: "Always clean up your module before tagging: run go mod tidy, go mod verify, go test, and go vet. Use annotated tags (-a flag) with descriptive messages. After pushing the tag, verify it appears on proxy.golang.org. For major version bumps, update the module path in go.mod first, then tag with the new version. The checksum database ensures published versions are tamper-proof."
      }
    ],
    bestPractices: [
      "Run go mod tidy, go mod verify, go test, and go vet before tagging releases",
      "Use annotated Git tags with descriptive messages for releases",
      "Follow semantic versioning strictly (semver.org)",
      "Update the module path for major version bumps (v2, v3)",
      "Document breaking changes in release notes or CHANGELOG",
      "Test that your module is downloadable before announcing the release"
    ],
    commonMistakes: [
      "Tagging without running go mod tidy, resulting in incomplete go.mod",
      "Using non-semver tags that confuse the module proxy",
      "Not updating the module path for v2+ major versions",
      "Forgetting to push tags to the remote repository",
      "Publishing pre-release versions without proper semver pre-release syntax"
    ],
    relatedTopics: [
      "go-mod",
      "modules--dependencies",
      "go-mod-init"
    ],
    externalResources: [
      { title: "Developing and Publishing Modules", url: "https://go.dev/doc/modules/developing" },
      { title: "Go Module Versioning", url: "https://go.dev/ref/mod#version-queries" },
      { title: "Semantic Versioning Specification", url: "https://semver.org/" }
    ]
  },

  "using-3rd-party-packages": {
    slug: "using-3rd-party-packages",
    title: "Using Third-Party Packages",
    summary: "Evaluating, importing, and managing third-party Go packages while maintaining security, performance, and dependency hygiene.",
    description: `While Go's standard library is extensive, many projects require third-party packages for specialized functionality like database drivers, HTTP clients, logging backends, or CLI frameworks. The Go ecosystem has a rich collection of high-quality packages available through the module proxy. Finding and evaluating packages involves checking documentation on pkg.go.dev, reviewing source code quality, checking maintenance activity, and assessing community adoption.

For backend engineers, the key to using third-party packages effectively is restraint and diligence. Before adding a dependency, ask whether the standard library already covers the need. If a third-party package is necessary, evaluate its maintenance status (recent commits, open issues), test coverage, license compatibility, and transitive dependency footprint. Every new dependency is a potential security vulnerability and maintenance burden.

In production, managing third-party packages means keeping them updated, scanning for vulnerabilities with govulncheck, and avoiding unnecessary dependencies. Tools like go list -m -u all show available updates, and the Go vulnerability database (vuln.go.dev) tracks known security issues. Minimize deep dependency trees that increase the attack surface and slow down builds.`,
    keyPoints: [
      "Search pkg.go.dev for packages with documentation, examples, and imports",
      "Evaluate package health: last commit date, open issues, test coverage",
      "Check the license (MIT, Apache 2.0, BSD) for compatibility with your project",
      "Use go get to add a package: go get github.com/org/package@version",
      "govulncheck scans your code for known vulnerabilities in dependencies",
      "go list -m -u all shows available dependency updates",
      "Minimize dependency trees — fewer dependencies mean smaller attack surface",
      "Always pin specific versions, not @latest, for reproducible builds"
    ],
    codeExamples: [
      {
        title: "Adding and Evaluating a Third-Party Package",
        description: "Properly adding an external dependency with security considerations",
        bad: [
          '// Adding packages without evaluation',
          '$ go get github.com/random/unknown-package@latest',
          '',
          '// Using @latest — not reproducible',
          '$ go get github.com/some/pkg@latest',
          '',
          '// Not checking for vulnerabilities',
          '$ go build ./... // might use packages with known CVEs',
          '',
          '// Ignoring license compatibility',
          '// GPL-licensed code mixed with proprietary project',
        ].join('\n'),
        good: [
          '// Step 1: Research on pkg.go.dev',
          '// Check documentation, examples, import count, license',
          '$ go doc -all github.com/shopspring/decimal',
          '',
          '// Step 2: Check package health',
          '// - Look at GitHub stars, recent commits, open issues',
          '// - Verify test coverage and CI status',
          '',
          '// Step 3: Add with a specific version',
          '$ go get github.com/shopspring/decimal@v1.4.0',
          '',
          '// Step 4: Tidy and verify',
          '$ go mod tidy',
          '$ go mod verify',
          '',
          '// Step 5: Check for known vulnerabilities',
          '$ go install golang.org/x/vuln/cmd/govulncheck@latest',
          '$ govulncheck ./...',
          '',
          '// Step 6: Update periodically',
          '$ go list -m -u all  // shows available updates',
        ].join('\n'),
        explanation: "Always evaluate third-party packages before adding them: check documentation on pkg.go.dev, review the source code, verify maintenance activity, and confirm license compatibility. Pin specific versions for reproducibility. Run govulncheck regularly to catch known vulnerabilities. Use go list -m -u all to identify packages that need updates, and review changelogs before upgrading."
      }
    ],
    bestPractices: [
      "Check pkg.go.dev for documentation, examples, and import statistics before adding packages",
      "Verify package health: recent commits, active maintenance, reasonable issue count",
      "Confirm license compatibility with your project's license",
      "Pin specific versions and never use @latest in committed go.mod",
      "Run govulncheck periodically to scan for known vulnerabilities in dependencies",
      "Minimize the number of third-party dependencies — prefer the standard library"
    ],
    commonMistakes: [
      "Adding third-party packages without evaluating their maintenance status or security",
      "Using @latest instead of pinned versions, causing non-reproducible builds",
      "Not checking for license compatibility, leading to legal issues",
      "Ignoring known vulnerabilities by not running govulncheck",
      "Accumulating unused dependencies without periodic cleanup"
    ],
    relatedTopics: [
      "modules--dependencies",
      "standard-library",
      "go-mod-tidy"
    ],
    externalResources: [
      { title: "pkg.go.dev Package Discovery", url: "https://pkg.go.dev/" },
      { title: "Go Vulnerability Database", url: "https://vuln.go.dev/" },
      { title: "govulncheck Documentation", url: "https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck" }
    ]
  },
};
