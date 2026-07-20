export interface TopicContent {
  slug: string;
  title: string;
  summary: string;
  description: string;
  keyPoints: string[];
  codeExamples: {
    title: string;
    description: string;
    bad: string;
    good: string;
    explanation: string;
  }[];
  bestPractices: string[];
  commonMistakes: string[];
  relatedTopics: string[];
  externalResources: { title: string; url: string }[];
}

export const fundamentalsContent: Record<string, TopicContent> = {
  "introduction-to-go": {
    slug: "introduction-to-go",
    title: "Introduction to Go",
    summary: "Go is a statically typed, compiled language designed for simplicity, concurrency, and performance at scale.",
    description: `Go (also known as Golang) is an open-source programming language created at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. It was designed to address the challenges of large-scale software engineering at Google, where C++, Java, and Python were proving difficult to manage at the company's scale.

For backend engineers, Go offers a compelling combination of simplicity, performance, and built-in concurrency primitives. Its garbage collector, fast compilation times, and static binary output make it ideal for building microservices, APIs, infrastructure tooling, and cloud-native applications. Companies like Docker, Kubernetes, Terraform, and Cloudflare all rely heavily on Go.

In production systems, Go excels where you need high throughput, low latency, and reliable performance under heavy load. The language's emphasis on explicit error handling, clear control flow, and minimal syntax means that Go codebases tend to be readable and maintainable even as they grow to millions of lines of code.`,
    keyPoints: [
      "Go is a compiled, statically typed language with garbage collection",
      "Designed for simplicity, readability, and concurrent programming",
      "Fast compilation and single binary output simplify deployment",
      "Built-in concurrency with goroutines and channels",
      "Standard library is powerful enough for most backend needs",
      "Strong ecosystem for cloud-native and infrastructure tooling",
      "Enforced code formatting with gofmt eliminates style debates"
    ],
    codeExamples: [
      {
        title: "Your First Go Program",
        description: "A minimal Go program that demonstrates the basic structure",
        bad: [
          'package main',
          '// Missing import of fmt',
          'func main() {',
          '  println("hello") // println works but fmt.Println is preferred',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    fmt.Println("Hello, World!")',
          '}',
        ].join('\n'),
        explanation: "The good example imports fmt explicitly and uses fmt.Println which writes to stdout properly with a newline. println is a builtin that writes to stderr and is not recommended for production use. Always use fmt or log packages for output."
      }
    ],
    bestPractices: [
      "Start with the official Go tutorial at go.dev/learn",
      "Use gofmt or your editor's Go plugin for automatic formatting",
      "Keep packages small and focused on a single responsibility",
      "Prefer the standard library before reaching for third-party packages",
      "Write tests alongside your code from day one",
      "Use Go modules for dependency management"
    ],
    commonMistakes: [
      "Trying to use OOP patterns from other languages instead of idiomatic Go",
      "Over-engineering abstractions before understanding the problem",
      "Ignoring error values returned by functions",
      "Using global variables instead of dependency injection",
      "Not running go vet and golangci-lint on your code"
    ],
    relatedTopics: [
      "history-of-go",
      "why-use-go",
      "hello-world-in-go"
    ],
    externalResources: [
      { title: "Official Go Documentation", url: "https://go.dev/doc/" },
      { title: "Effective Go", url: "https://go.dev/doc/effective_go" },
      { title: "Go Blog", url: "https://go.dev/blog/" }
    ]
  },

  "history-of-go": {
    slug: "history-of-go",
    title: "History of Go",
    summary: "Go was created at Google in 2007 to solve real-world engineering challenges at massive scale.",
    description: `Go emerged from frustration at Google. In 2007, Robert Griesemer, Rob Pike, and Ken Thompson began designing a language that could combine the ease of dynamic languages like Python with the performance and safety of statically typed languages like C++. The initial design work happened during a spare afternoon and evolved over the next two years before Go was publicly announced in November 2009.

The language drew inspiration from several predecessors: C for its simplicity and low-level control, Pascal and Modula-2 for structured programming, CSP and Occam for concurrent communication patterns, and Smalltalk and Newsqueak for lexical scoping. Go's designers deliberately left out features like inheritance, generics (added later in Go 1.18), and exception-based error handling to keep the language simple.

Go 1 was released in March 2012 with a promise of backward compatibility. This stability promise proved crucial for adoption in production systems. The language has since grown to power some of the most critical infrastructure on the internet, from Kubernetes to the Go runtime that powers Google's own services.`,
    keyPoints: [
      "Created at Google by Rob Pike, Ken Thompson, and Robert Griesemer",
      "First announced publicly in November 2009",
      "Go 1 released March 2012 with backward compatibility guarantee",
      "Designed to solve large-scale software engineering problems",
      "Drew from C, CSP, Pascal, and other languages for design inspiration",
      "Go 1.18 introduced generics after years of community discussion",
      "Go is used in production by Google, Cloudflare, Uber, Dropbox, and many others"
    ],
    codeExamples: [],
    bestPractices: [
      "Understand Go's design philosophy to write more idiomatic code",
      "Learn from the Go Blog for insight into language decisions",
      "Study the Go specification to understand language guarantees",
      "Follow Go release notes for new features and changes"
    ],
    commonMistakes: [
      "Assuming Go will add features from other languages without considering trade-offs",
      "Not understanding the backward compatibility promise when choosing Go versions",
      "Ignoring the evolution of Go idioms over the years"
    ],
    relatedTopics: [
      "introduction-to-go",
      "why-use-go"
    ],
    externalResources: [
      { title: "Go Blog: History of Go", url: "https://go.dev/blog/go1" },
      { title: "Go: A Documentary", url: "https://go.dev/doc/generate" },
      { title: "The Go Programming Language Specification", url: "https://go.dev/ref/spec" }
    ]
  },

  "why-use-go": {
    slug: "why-use-go",
    title: "Why Use Go",
    summary: "Go offers fast compilation, built-in concurrency, simple syntax, and excellent performance for backend systems.",
    description: `Go addresses several pain points that backend engineers commonly face. Its compiled nature produces fast, efficient binaries without runtime overhead, while garbage collection eliminates manual memory management. The language's simplicity means that new team members can read and contribute to codebases quickly, reducing onboarding time significantly.

For backend services, Go's concurrency model using goroutines and channels is a killer feature. Goroutines are lightweight threads managed by the Go runtime, allowing you to handle thousands of concurrent connections with minimal memory overhead. This makes Go ideal for building high-performance web servers, API gateways, message queue consumers, and any service that needs to handle many simultaneous I/O operations.

In production, Go's single binary deployment model eliminates dependency management nightmares. No virtual environments, no runtime installations, no DLL hell. You compile your code, copy the binary to the server, and run it. This simplicity extends to the deployment pipeline, making Go services particularly well-suited for containerized environments like Docker and Kubernetes.`,
    keyPoints: [
      "Fast compilation and execution speed close to C/C++",
      "Built-in concurrency with goroutines (lightweight green threads)",
      "Single binary deployment eliminates runtime dependencies",
      "Garbage collector handles memory management efficiently",
      "Simple language specification makes teams productive fast",
      "Excellent standard library covers most backend needs out of the box",
      "Strong tooling including gofmt, go vet, and built-in testing",
      "Backward compatibility guarantee since Go 1"
    ],
    codeExamples: [
      {
        title: "Goroutine Concurrency",
        description: "Demonstrates how easy it is to launch concurrent operations in Go",
        bad: [
          '// In many languages, concurrent code is complex:',
          '// You need thread pools, executors, callback chains, or async/await',
          '// Go makes this trivial with goroutines',
          'func handleRequests(requests []Request) {',
          '    for _, req := range requests {',
          '        process(req) // Sequential - slow!',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'func handleRequests(requests []Request) {',
          '    var wg sync.WaitGroup',
          '    for _, req := range requests {',
          '        wg.Add(1)',
          '        go func(r Request) {',
          '            defer wg.Done()',
          '            process(r)',
          '        }(req)',
          '    }',
          '    wg.Wait()',
          '}',
        ].join('\n'),
        explanation: "The good example uses goroutines (the 'go' keyword) to process requests concurrently. Each goroutine is lightweight (~2KB initial stack) and scheduled by the Go runtime. sync.WaitGroup ensures we wait for all goroutines to finish before returning. This pattern is fundamental to Go backend services."
      }
    ],
    bestPractices: [
      "Use Go for microservices that need high concurrency and low latency",
      "Leverage the standard library before adding dependencies",
      "Use Go's built-in benchmarking to validate performance decisions",
      "Adopt Go for CLI tools and infrastructure automation",
      "Take advantage of Go's fast builds in CI/CD pipelines"
    ],
    commonMistakes: [
      "Not leveraging goroutines and channels when processing I/O-bound tasks",
      "Adding unnecessary dependencies when the standard library suffices",
      "Ignoring Go's garbage collector tuning for latency-sensitive services",
      "Not using Go's race detector during testing"
    ],
    relatedTopics: [
      "introduction-to-go",
      "goroutines",
      "channels"
    ],
    externalResources: [
      { title: "Go Blog: Why Go?", url: "https://go.dev/doc/" },
      { title: "Go at Google: Language Design in the Service of Software Engineering", url: "https://go.dev/talks/2012/splash.article" },
      { title: "Wikipedia: Go Programming Language", url: "https://en.wikipedia.org/wiki/Go_(programming_language)" }
    ]
  },

  "setting-up-the-environment": {
    slug: "setting-up-the-environment",
    title: "Setting Up the Environment",
    summary: "Configure your system with Go, an editor with Go support, and essential tooling for productive development.",
    description: `Setting up a Go development environment is straightforward compared to many languages. The Go toolchain includes everything you need: compiler, formatter, package manager, test runner, and documentation server. You download Go from the official website and follow the platform-specific installer.

For your editor, Visual Studio Code with the Go extension (by the Go team) provides the best free experience with features like auto-formatting, linting, code completion, and inline test running. GoLand by JetBrains is a popular paid alternative with deeper IDE features. Both editors integrate tightly with the Go toolchain.

After installation, verify your setup with go version and set up GOPATH if you're using the module system (recommended for all new projects since Go 1.11). Understanding GOPATH vs modules is important for navigating existing codebases, but for new projects, always use Go modules.`,
    keyPoints: [
      "Download Go from https://go.dev/dl/ for your platform",
      "Verify installation with go version in your terminal",
      "Use Go modules (go mod init) for all new projects",
      "VS Code + Go extension is the recommended free editor setup",
      "Set GOPATH=$HOME/go (or your preference) for workspace",
      "Use golangci-lint for comprehensive linting beyond go vet",
      "Configure your editor to run gofmt on save for consistent formatting",
      "Use go env to inspect your Go environment variables"
    ],
    codeExamples: [
      {
        title: "Verifying Your Environment",
        description: "Commands to verify your Go setup is correct",
        bad: [
          '// Not verifying installation and jumping into coding:',
          '$ go version',
          '// If this fails, you need to fix your PATH',
          '',
          '// Starting without go mod init:',
          '$ mkdir myproject && cd myproject',
          '$ vim main.go',
          '// This creates a module-less project which is not recommended',
        ].join('\n'),
        good: [
          '// Verify installation',
          '$ go version',
          '// go version go1.21.0 darwin/amd64',
          '',
          '// Check environment',
          '$ go env GOPATH GOROOT GOBIN',
          '',
          '// Initialize a new module',
          '$ mkdir myproject && cd myproject',
          '$ go mod init github.com/username/myproject',
          '',
          '// Install essential tools',
          '$ go install golang.org/x/tools/gopls@latest',
          '$ go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest',
        ].join('\n'),
        explanation: "Always verify your Go installation and initialize modules for new projects. gopls is the official Go language server that powers editor features. golangci-lint aggregates multiple linters to catch common mistakes early."
      }
    ],
    bestPractices: [
      "Always use Go modules for dependency management",
      "Configure your editor to format on save with gofmt",
      "Install and configure golangci-lint in your CI pipeline",
      "Keep your Go version up to date for security patches",
      "Use go env -w to persist environment settings"
    ],
    commonMistakes: [
      "Forgetting to set GOPATH or misunderstanding its role with modules",
      "Not installing gopls and missing editor integration features",
      "Using GOPATH mode instead of module mode for new projects",
      "Not configuring your editor for Go, leading to poor development experience"
    ],
    relatedTopics: [
      "hello-world-in-go",
      "packages"
    ],
    externalResources: [
      { title: "Go Download and Install", url: "https://go.dev/doc/install" },
      { title: "Go Wiki: IDEs and Editor Plugins", url: "https://github.com/golang/go/wiki/IDEsAndTextEditorPlugins" },
      { title: "gopls Documentation", url: "https://go.dev/gopls/" }
    ]
  },

  "hello-world-in-go": {
    slug: "hello-world-in-go",
    title: "Hello World in Go",
    summary: "Learn the minimal structure of a Go program: package declaration, imports, and the main function.",
    description: `Every Go program starts with a package declaration. For executable programs, the package must be named main. The main function is the entry point where execution begins. Go programs require explicit imports rather than implicit ones, making dependencies clear at a glance.

The Go standard library's fmt package provides formatted I/O functions similar to C's printf family. For a simple "Hello, World!" program, you only need to import fmt and call fmt.Println. The compilation process produces a single binary for your target platform, making deployment straightforward.

Understanding this basic structure is crucial because every Go file follows this pattern: package at the top, imports next, then declarations. This consistency is enforced by gofmt and is a core part of Go's design philosophy of readability.`,
    keyPoints: [
      "Every Go file starts with a package declaration",
      "Executable programs must use package main",
      "The main function is the entry point (no return value allowed)",
      "Imports are explicit and grouped: stdlib first, then third-party",
      "Go compiles to a single binary for the target platform",
      "Use fmt.Println for stdout output, log for logging",
      "The blank identifier _ can be used to suppress unused imports"
    ],
    codeExamples: [
      {
        title: "Hello World",
        description: "The classic first program in Go",
        bad: [
          '// Missing package declaration',
          'import "fmt"',
          '',
          'func main() {',
          '    fmt.println("Hello") // wrong case: println is lowercase',
          '    fmt.Print("Hello")   // no newline, output may not flush',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    fmt.Println("Hello, World!")',
          '}',
        ].join('\n'),
        explanation: "The good example includes the required package main declaration, uses fmt.Println (capital L) for a proper newline-terminated print, and follows Go conventions. fmt.Println writes to stdout and appends a newline. Always start Go files with the package declaration."
      }
    ],
    bestPractices: [
      "Group imports: standard library first, then a blank line, then third-party",
      "Use goimports to manage imports automatically",
      "Keep main.go minimal — move logic to other packages",
      "Use fmt.Printf for formatted output, not string concatenation",
      "Use log.Println instead of fmt.Println for application logging"
    ],
    commonMistakes: [
      "Forgetting the package declaration",
      "Using lowercase fmt.println instead of fmt.Println",
      "Writing all logic in main instead of organizing into packages",
      "Not handling errors from fmt functions (rare but possible)"
    ],
    relatedTopics: [
      "introduction-to-go",
      "setting-up-the-environment",
      "packages"
    ],
    externalResources: [
      { title: "A Tour of Go: Getting Started", url: "https://go.dev/tour/basics/1" },
      { title: "Go Blog: Getting Started", url: "https://go.dev/doc/tutorial/getting-started" },
      { title: "Go by Example: Hello World", url: "https://gobyexample.com/hello-world" }
    ]
  },

  "variables--constants": {
    slug: "variables--constants",
    title: "Variables & Constants",
    summary: "Go variables are declared with var or := syntax; constants use the const keyword with compile-time values.",
    description: `Variables in Go are containers for storing values with a specific type. Go offers two main ways to declare variables: the var keyword for explicit declarations and := for short variable declarations within functions. Constants are similar but must be set at compile time and cannot be modified after declaration.

Go is statically typed, meaning every variable has a fixed type determined at compile time. This type safety catches many bugs early while gofmt and the compiler keep the syntax clean. The short declaration operator (:=) infers the type automatically, combining declaration and initialization into a single statement.

For backend engineers, understanding Go's variable semantics is crucial for writing efficient code. Go passes variables by value by default, which affects performance and correctness. Constants in Go can be untyped, allowing flexible arithmetic without explicit casts.`,
    keyPoints: [
      "var declares variables with explicit type; := infers type within functions",
      "Constants are declared with const and must be compile-time values",
      "Go is statically typed — once declared, a variable's type cannot change",
      "Package-level variables can only use var, not :=",
      "Uninitialized variables get their zero value (not null/undefined)",
      "Constants can be grouped with parenthesized const blocks",
      "iota can be used in const blocks to generate sequential values"
    ],
    codeExamples: [
      {
        title: "Variable Declaration Styles",
        description: "Shows the different ways to declare variables in Go",
        bad: [
          '// Too verbose and repetitive',
          'var name string = "Alice"',
          'var age int = 30',
          'var active bool = true',
          '',
          '// Using := at package level (won\'t compile)',
          '// name := "Alice"  // ERROR: := not allowed at package level',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Short declaration (preferred in functions)',
          '    name := "Alice"',
          '',
          '    // var with type inference',
          '    var age int = 30',
          '',
          '    // var with zero value',
          '    var active bool',
          '',
          '    // Multiple declarations',
          '    var (',
          '        host = "localhost"',
          '        port = 8080',
          '    )',
          '',
          '    fmt.Println(name, age, active, host, port)',
          '}',
        ].join('\n'),
        explanation: "Use := for concise local declarations, var when you need to be explicit about the type or when declaring at package level. Group related var declarations with parenthesized blocks for readability. := allows multiple assignments in one statement."
      }
    ],
    bestPractices: [
      "Use := for variable declarations inside functions for conciseness",
      "Use var for package-level variables and when you need the zero value",
      "Prefer explicit types in function signatures for clarity",
      "Group related constants with parenthesized const blocks",
      "Avoid package-level mutable state — pass dependencies explicitly"
    ],
    commonMistakes: [
      "Using := when = would be clearer (redeclaration vs new variable)",
      "Shadows outer variables with := in nested scopes",
      "Forgetting that := requires at least one new variable on the left side",
      "Using var at function level when := would be more idiomatic",
      "Declaring variables you never use (compiler error in Go)"
    ],
    relatedTopics: [
      "var-vs",
      "zero-values",
      "const-and-iota",
      "type-inference"
    ],
    externalResources: [
      { title: "Go Tour: Variables", url: "https://go.dev/tour/basics/2" },
      { title: "Effective Go: Variables", url: "https://go.dev/doc/effective_go#variables" },
      { title: "Go by Example: Variables", url: "https://gobyexample.com/variables" }
    ]
  },

  "var-vs": {
    slug: "var-vs",
    title: "var vs :=",
    summary: "Understanding when to use var declarations versus the short variable declaration operator.",
    description: `The var keyword and the := operator both declare and initialize variables, but they serve different purposes. var is a general-purpose declaration that works at any scope and can declare without initializing. The := operator is a shorthand that infers the type and requires at least one new variable on the left side, and it only works inside functions.

At the package level, you must use var because := is not allowed. Inside functions, := is preferred for its brevity, but var has its place when you want to explicitly name the type or initialize a variable to its zero value before assigning later.

Understanding this distinction matters because := can accidentally shadow outer variables. If you declare err inside an if block with :=, you might create a new err instead of reusing the one from the outer scope, leading to subtle bugs.`,
    keyPoints: [
      ":= declares and initializes, inferring the type automatically",
      "var can declare without initializing (gives zero value)",
      ":= only works inside functions, not at package level",
      ":= requires at least one new variable on the left side",
      "var is needed when you want to explicitly specify the type",
      ":= can shadow outer variables — watch for this in nested scopes",
      "Both can be used for multiple simultaneous declarations"
    ],
    codeExamples: [
      {
        title: "var vs := Usage",
        description: "When to use each declaration style",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// := is not allowed at package level',
          '// name := "Alice"  // COMPILE ERROR',
          '',
          'func main() {',
          '    // Shadowing outer variable',
          '    name := "Alice"',
          '    fmt.Println(name)',
          '',
          '    if true {',
          '        name := "Bob"  // New variable, shadows outer!',
          '        fmt.Println(name)',
          '    }',
          '',
          '    fmt.Println(name) // Still "Alice" — confusing',
          '',
          '    // Reusing var when type is obvious from context',
          '    var result int = compute() // Redundant type annotation',
          '    _ = result',
          '}',
          '',
          'func compute() int { return 42 }',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Package level: must use var',
          'var name = "Alice"',
          '',
          'func main() {',
          '    // Inside function: := preferred',
          '    greeting := "Hello"',
          '',
          '    // Reuse outer variable with =',
          '    name = "Bob"',
          '',
          '    // Explicit var for zero-value then assign',
          '    var count int',
          '    count = 10',
          '',
          '    // Multiple := declaration',
          '    x, y := 1, 2',
          '',
          '    fmt.Println(greeting, name, count, x, y)',
          '}',
        ].join('\n'),
        explanation: "Use var at package level (:= is not allowed there). Inside functions, prefer := for brevity. When you want to reuse an existing variable, use =. Watch out for := shadowing — if you need to reassign an outer variable, use = instead of :=. Group multiple variable declarations with := when appropriate."
      }
    ],
    bestPractices: [
      "Use := inside functions for most local variable declarations",
      "Use var at package level and when explicit type annotation adds clarity",
      "Be careful with := in if/for blocks to avoid variable shadowing",
      "Use = to reassign existing variables instead of creating new ones with :=",
      "If := left side has mixed new and existing variables, the new ones take precedence"
    ],
    commonMistakes: [
      "Accidentally shadowing outer variables with := in nested blocks",
      "Using := at package level which causes a compile error",
      "Adding redundant type annotations with := when the type is already inferred",
      "Using := when = is needed to reassign an existing variable",
      "Not realizing := creates a new variable even if the name matches an outer one"
    ],
    relatedTopics: [
      "variables--constants",
      "scope-and-shadowing",
      "type-inference"
    ],
    externalResources: [
      { title: "Go FAQ: Variable Declaration", url: "https://go.dev/doc/effective_go#variables" },
      { title: "Go Wiki: Variable Shadowing", url: "https://github.com/golang/go/wiki/SliceTricks" },
      { title: "Go by Example: Variables", url: "https://gobyexample.com/variables" }
    ]
  },

  "zero-values": {
    slug: "zero-values",
    title: "Zero Values",
    summary: "Every type in Go has a well-defined zero value used when variables are declared without explicit initialization.",
    description: `In Go, when you declare a variable without initializing it, it automatically gets the zero value for its type. This is a key difference from languages like Python or JavaScript where uninitialized variables throw errors or return null. Go's zero values are: 0 for numeric types, false for booleans, "" for strings, nil for pointers, slices, maps, channels, and interfaces, and empty structs/arrays.

Zero values make Go code more predictable and eliminate many null pointer scenarios you see in other languages. However, this also means you need to be aware of nil values for pointers, slices, maps, and interfaces, as dereferencing nil can cause panics.

For backend engineers, understanding zero values is essential for writing safe code that handles edge cases. For example, checking if a map is nil before accessing it, or understanding that a nil pointer check is different from an empty string check.`,
    keyPoints: [
      "Zero values are: 0, false, \"\", nil, or empty for their respective types",
      "nil is the zero value for pointers, slices, maps, channels, interfaces, and functions",
      "Zero values enable safe default initialization without explicit assignment",
      "Understanding nil is critical to avoid runtime panics",
      "Zero values are useful as sentinel values in conditionals",
      "Struct zero values recursively zero all fields",
      "The reflect package can check if a value equals its zero value"
    ],
    codeExamples: [
      {
        title: "Zero Values in Practice",
        description: "Demonstrates how zero values work across types and why they matter",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Forgetting that slices/maps have nil zero value',
          '    var s []int',
          '    s = append(s, 1) // This works — append handles nil slices',
          '',
          '    var m map[string]int',
          '    // m["key"] = 1  // PANIC: assignment to entry in nil map',
          '',
          '    var p *int',
          '    // fmt.Println(*p)  // PANIC: nil pointer dereference',
          '',
          '    fmt.Println(len(s), m, p)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Nil slice — append works safely',
          '    var s []int',
          '    s = append(s, 1)',
          '',
          '    // Initialize map before use',
          '    m := make(map[string]int)',
          '    m["key"] = 1',
          '',
          '    // Check pointer before dereferencing',
          '    var p *int',
          '    if p != nil {',
          '        fmt.Println(*p)',
          '    } else {',
          '        fmt.Println("pointer is nil")',
          '    }',
          '',
          '    // Useful zero value checks',
          '    var name string',
          '    if name == "" {',
          '        fmt.Println("name is empty")',
          '    }',
          '',
          '    var count int',
          '    if count == 0 {',
          '        fmt.Println("count is zero")',
          '    }',
          '',
          '    fmt.Println(len(s), m)',
          '}',
        ].join('\n'),
        explanation: "Always initialize maps with make or a map literal before use — nil maps panic on assignment. Nil slices are safe to append to but should be checked with len() == 0 or compared to nil explicitly. Always check pointers for nil before dereferencing. Use zero values as sentinel checks for strings and numbers."
      }
    ],
    bestPractices: [
      "Always initialize maps before writing to them — use make(map[K]V)",
      "Check pointers for nil before dereferencing",
      "Use zero value checks for strings (== \"\") and numbers (== 0)",
      "Prefer making the zero value useful in API design",
      "Document when nil means something different from empty"
    ],
    commonMistakes: [
      "Assigning to a nil map without initializing it first",
      "Dereferencing a nil pointer without checking",
      "Confusing an empty string with a nil pointer to a string",
      "Not handling nil slices vs empty slices in function returns",
      "Assuming zero values mean 'invalid' when they might be valid defaults"
    ],
    relatedTopics: [
      "data-types",
      "pointers-basics",
      "maps",
      "slices"
    ],
    externalResources: [
      { title: "Go Tour: Zero Value", url: "https://go.dev/tour/basics/3" },
      { title: "Effective Go: The Zero Value", url: "https://go.dev/doc/effective_go#the_zero_value" },
      { title: "Go Blog: Zero Values", url: "https://go.dev/blog/go1.13" }
    ]
  },

  "data-types": {
    slug: "data-types",
    title: "Data Types",
    summary: "Go provides a rich set of built-in types including integers, floats, strings, booleans, and composite types.",
    description: `Go's type system is one of its strongest features for building reliable backend systems. The language provides built-in types for common data: integers (int, int8, int16, int32, int64 and their unsigned counterparts), floating-point numbers (float32, float64), complex numbers (complex64, complex128), booleans, strings, and runes (Unicode code points). Beyond these primitives, Go offers arrays, slices, maps, structs, and channels as composite types.

Go's type system is both simple and powerful. Unlike dynamically typed languages, Go catches type errors at compile time, preventing an entire class of runtime bugs. For backend engineers, this means fewer surprises in production. The type system also enables Go's compiler to optimize code aggressively, producing binaries that run significantly faster than interpreted languages.

The distinction between value types and reference types is important in Go. Structs, arrays, and ints are value types (copied when passed to functions), while slices, maps, and channels are reference types (backed by a header that points to underlying data). Understanding this distinction is critical for writing correct and efficient Go code.`,
    keyPoints: [
      "Built-in types: bool, string, int/int8/.../int64, uint variants, float32/float64",
      "Composite types: arrays, slices, maps, structs, channels, pointers",
      "Go uses type aliases and named types for creating new types",
      "Value types (structs, arrays) are copied on assignment; reference types (slices, maps) share underlying data",
      "The int type is at least 32 bits but platform-dependent (32 or 64 bit)",
      "Strings in Go are immutable UTF-8 byte sequences",
      "Type safety is enforced at compile time — no implicit type conversions between unrelated types"
    ],
    codeExamples: [
      {
        title: "Working with Go Types",
        description: "Shows how different types behave in Go, especially around assignment and passing",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'type User struct {',
          '    Name string',
          '    Age  int',
          '}',
          '',
          'func main() {',
          '    // Mixing integer types without explicit conversion',
          '    var a int32 = 10',
          '    var b int64 = 20',
          '    // var c = a + b  // COMPILE ERROR: cannot mix types',
          '',
          '    // Assuming string and []byte are interchangeable',
          '    var s string = "hello"',
          '    // s[0] = \'H\'  // COMPILE ERROR: string is immutable',
          '',
          '    // Passing a struct by value when you wanted a reference',
          '    u := User{Name: "Alice", Age: 30}',
          '    modifyUser(u) // Changes are lost!',
          '    fmt.Println(u)',
          '}',
          '',
          'func modifyUser(u User) {',
          '    u.Name = "Bob" // Only modifies the copy',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'type User struct {',
          '    Name string',
          '    Age  int',
          '}',
          '',
          'func main() {',
          '    // Explicit type conversion',
          '    var a int32 = 10',
          '    var b int64 = 20',
          '    c := int64(a) + b',
          '',
          '    // Use []byte or strings.Builder for mutation',
          '    s := "hello"',
          '    b2 := []byte(s)',
          '    b2[0] = \'H\'',
          '    s = string(b2)',
          '',
          '    // Pass pointer to modify original struct',
          '    u := User{Name: "Alice", Age: 30}',
          '    modifyUser(&u)',
          '    fmt.Println(u)',
          '}',
          '',
          'func modifyUser(u *User) {',
          '    u.Name = "Bob" // Modifies original',
          '}',
        ].join('\n'),
        explanation: "Go requires explicit type conversion between numeric types — this prevents accidental data loss. Strings are immutable; use []byte or strings.Builder for modifications. Pass structs by pointer if you need to modify them, otherwise the function operates on a copy."
      }
    ],
    bestPractices: [
      "Use the smallest integer type that fits your data for memory efficiency",
      "Prefer int for general-purpose integer operations unless size matters",
      "Use named types to create domain-specific types (type UserID int64)",
      "Understand the difference between value and reference types",
      "Use strings.Builder for efficient string concatenation"
    ],
    commonMistakes: [
      "Mixing integer types without explicit conversion (Go won't auto-promote)",
      "Expecting string mutation to work (strings are immutable)",
      "Forgetting that structs are value types and get copied on assignment",
      "Using int when the size matters (network protocols, binary formats)",
      "Confusing rune with byte — a rune is a Unicode code point, a byte is 8 bits"
    ],
    relatedTopics: [
      "integers-signed-unsigned",
      "floating-points",
      "boolean",
      "strings",
      "runes"
    ],
    externalResources: [
      { title: "Go Tour: Basic Types", url: "https://go.dev/tour/basics/11" },
      { title: "Effective Go: Types", url: "https://go.dev/doc/effective_go#types" },
      { title: "Go Spec: Types", url: "https://go.dev/ref/spec#Types" }
    ]
  },

  "integers-signed-unsigned": {
    slug: "integers-signed-unsigned",
    title: "Integers: Signed & Unsigned",
    summary: "Go provides signed (int) and unsigned (uint) integer types in sizes from 8 to 64 bits.",
    description: `Go offers a comprehensive set of integer types divided into signed and unsigned categories. Signed integers can represent both positive and negative values: int8 (-128 to 127), int16 (-32768 to 32767), int32 (-2^31 to 2^31-1), int64 (-2^63 to 2^63-1). Unsigned integers can only be non-negative: uint8 (0 to 255), uint16 (0 to 65535), uint32, uint64. The plain int and uint types are platform-dependent (32 or 64 bits).

For backend engineers, choosing the right integer type matters for both correctness and performance. On 64-bit platforms (most modern servers), int is 64 bits and operations are as fast as any other type. Use specific sizes like int32 or int64 when the size matters, such as for binary protocols, database schemas, or when interfacing with C code.

The byte type is actually an alias for uint8, and the rune type is an alias for int32. These named aliases make code more readable when working with specific data formats.`,
    keyPoints: [
      "int is the default integer type — use it unless you need a specific size",
      "int8/int16/int32/int64 for signed; uint8/uint16/uint32/uint64 for unsigned",
      "int is 32 or 64 bits depending on platform (usually 64 on modern systems)",
      "byte is an alias for uint8; rune is an alias for int32",
      "Constant expressions allow untyped integer constants to be any size",
      "Explicit conversion is required between integer types (no implicit promotion)"
    ],
    codeExamples: [
      {
        title: "Integer Types and Overflow",
        description: "Demonstrates integer type sizes, conversions, and overflow behavior",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Unexpected overflow',
          '    var a int8 = 127',
          '    a++ // OVERFLOW: wraps to -128',
          '    fmt.Println(a) // -128',
          '',
          '    // Confusion between int and int64',
          '    var b int = 100',
          '    var c int64 = 200',
          '    // result := b + c  // COMPILE ERROR: type mismatch',
          '',
          '    // Using uint for age can be misleading',
          '    var age uint = -1 // Wraps to large positive number',
          '    fmt.Println(age)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Use int for general purpose',
          '    var count int = 42',
          '',
          '    // Use specific types only when size matters',
          '    var port int32 = 8080',
          '    var fileSize int64 = 1024 * 1024 * 1024',
          '',
          '    // Explicit conversion when mixing types',
          '    result := int64(count) + fileSize',
          '',
          '    // Check for overflow before it happens',
          '    var a int8 = 127',
          '    if a < math.MaxInt8 {',
          '        a++',
          '    }',
          '',
          '    // Use int for age (negative can mean unknown)',
          '    var age int = -1',
          '    if age < 0 {',
          '        fmt.Println("age unknown")',
          '    }',
          '',
          '    fmt.Println(result, a, age)',
          '}',
        ].join('\n'),
        explanation: "Use int for most integer operations — it's the default and performs well on 64-bit platforms. Use specific types only when interfacing with binary formats, APIs, or when memory layout matters. Always be aware of overflow boundaries when using small integer types."
      }
    ],
    bestPractices: [
      "Default to int for most integer operations unless size matters",
      "Use specific sizes (int32, int64) when interfacing with binary protocols or APIs",
      "Be aware of overflow when using small integer types (int8, uint8)",
      "Never use unsigned types to prevent negative values — use validation instead",
      "Use strconv.Itoa and strconv.Atoi for string-to-int conversions"
    ],
    commonMistakes: [
      "Forgetting that integer overflow silently wraps around",
      "Mixing int sizes without explicit conversion",
      "Using uint to prevent negative values (wrap-around creates security issues)",
      "Assuming int is always 64-bit across all platforms",
      "Using int for time.Duration (use the time.Duration type instead)"
    ],
    relatedTopics: [
      "data-types",
      "floating-points",
      "type-conversion"
    ],
    externalResources: [
      { title: "Go Spec: Numeric Types", url: "https://go.dev/ref/spec#Numeric_types" },
      { title: "Go Tour: Integer Types", url: "https://go.dev/tour/basics/11" },
      { title: "Effective Go: Integers", url: "https://go.dev/doc/effective_go#integers" }
    ]
  },

  "floating-points": {
    slug: "floating-points",
    title: "Floating-Point Numbers",
    summary: "Go provides float32 and float64 types for decimal numbers with IEEE 754 representation.",
    description: `Go offers two floating-point types: float32 (approximately 7 decimal digits of precision) and float64 (approximately 15 decimal digits of precision). Both follow the IEEE 754 standard for floating-point arithmetic. The float64 type is the default and should be used for most floating-point operations due to its higher precision.

Floating-point arithmetic comes with inherent imprecision due to how decimal numbers are represented in binary. For backend engineers, this matters when dealing with financial calculations, scientific data, or any scenario where exact decimal representation is required. For monetary values, always use integer types (storing cents) or the math/big package for arbitrary precision.

Go follows IEEE 754 semantics, which means special values like NaN (Not a Number) and Inf (Infinity) are possible. These can arise from operations like 0/0 or very large numbers. Always check for these values when processing external data.`,
    keyPoints: [
      "float64 is the default — use it unless you have a specific reason for float32",
      "float32 has ~7 digits of precision; float64 has ~15 digits",
      "Floating-point comparisons should use epsilon-based checking",
      "NaN != NaN — special comparison rules for IEEE 754 values",
      "Use the math package for common operations (math.Abs, math.Round, etc.)",
      "Avoid floating-point for financial calculations — use integer cents or big.Rat",
      "math.MaxFloat32 and math.MaxFloat64 give the maximum representable values"
    ],
    codeExamples: [
      {
        title: "Floating-Point Precision",
        description: "Shows common pitfalls with floating-point comparisons and arithmetic",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Direct equality comparison (dangerous!)',
          '    x := 0.1 + 0.2',
          '    if x == 0.3 {',
          '        fmt.Println("equal")',
          '    } else {',
          '        fmt.Println("not equal!") // This prints!',
          '    }',
          '',
          '    // Using float for money (inaccurate)',
          '    price := 0.1',
          '    qty := 3',
          '    total := price * float64(qty)',
          '    fmt.Printf("Total: %.2f\\n", total) // 0.30, but internally imprecise',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "math"',
          ')',
          '',
          'func main() {',
          '    // Epsilon-based comparison',
          '    x := 0.1 + 0.2',
          '    if math.Abs(x-0.3) < 1e-9 {',
          '        fmt.Println("equal")',
          '    }',
          '',
          '    // Use integers for money (store cents)',
          '    price := 10 // $0.10 stored as 10 cents',
          '    qty := 3',
          '    total := price * qty',
          '    fmt.Printf("Total: $%d.%02d\\n", total/100, total%100)',
          '',
          '    // Or use decimal library for financial math',
          '    // github.com/shopspring/decimal',
          '}',
        ].join('\n'),
        explanation: "Direct floating-point equality comparison fails due to binary representation imprecision. Use epsilon comparison with math.Abs for approximate equality. For financial calculations, store values as integers (cents/pennies) or use a decimal library. Go's float64 provides ~15 digits of precision which is sufficient for most scientific computing."
      }
    ],
    bestPractices: [
      "Default to float64 for better precision",
      "Use epsilon-based comparisons, never direct == for floats",
      "Use integer types or decimal libraries for monetary calculations",
      "Check for NaN and Inf when processing external numeric data",
      "Use strconv.ParseFloat for string-to-float conversions",
      "Consider using math/big for arbitrary precision requirements"
    ],
    commonMistakes: [
      "Comparing floating-point numbers with == instead of epsilon-based comparison",
      "Using float for financial calculations instead of integer cents",
      "Not handling NaN and Inf values from external data",
      "Mixing float32 and float64 without explicit conversion",
      "Assuming printf formatting eliminates floating-point imprecision"
    ],
    relatedTopics: [
      "integers-signed-unsigned",
      "data-types",
      "type-conversion"
    ],
    externalResources: [
      { title: "Go Spec: Float Types", url: "https://go.dev/ref/spec#Numeric_types" },
      { title: "What Every Computer Scientist Should Know About Floating-Point Arithmetic", url: "https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html" },
      { title: "Go by Example: Floats", url: "https://gobyexample.com/floats" }
    ]
  },

  "complex-numbers": {
    slug: "complex-numbers",
    title: "Complex Numbers",
    summary: "Go has built-in support for complex numbers with complex64 and complex128 types.",
    description: `Go is one of the few mainstream languages with built-in complex number types: complex64 (float32 real and imaginary parts) and complex128 (float64 real and imaginary parts). Complex numbers are represented as a + bi where a is the real part and b is the imaginary part, using the built-in complex() function to create them.

While complex numbers are less common in typical backend work, they appear in scientific computing, signal processing, and certain algorithms in machine learning. Go's built-in support means you don't need external libraries for basic complex arithmetic — addition, subtraction, multiplication, and division all work with standard operators.

The real() and imag() functions extract the real and imaginary parts respectively, and cmplx package in the standard library provides additional operations like magnitude (Abs), phase (Arg), and conjugate.`,
    keyPoints: [
      "complex64 uses float32 for real and imaginary parts",
      "complex128 uses float64 for real and imaginary parts (default)",
      "Use complex(real, imag) to create complex numbers",
      "real() and imag() extract parts; cmplx package provides advanced operations",
      "Standard arithmetic operators work with complex numbers",
      "The math/cmplx package provides Abs, Conj, Exp, Log, Pow, Sqrt functions"
    ],
    codeExamples: [
      {
        title: "Complex Number Operations",
        description: "Basic complex number creation and manipulation",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Trying to create complex numbers without the complex() builtin',
          '    // var z = 3 + 4i  // This only works in const/var declarations',
          '',
          '    // Forgetting that complex operations work',
          '    var a complex128 = complex(3, 4)',
          '    // Direct field access doesn\'t work:',
          '    // fmt.Println(a.real)  // COMPILE ERROR',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "math/cmplx"',
          ')',
          '',
          'func main() {',
          '    // Create complex numbers',
          '    a := complex(3, 4) // 3 + 4i',
          '    b := complex(1, 2) // 1 + 2i',
          '',
          '    // Arithmetic',
          '    sum := a + b',
          '    diff := a - b',
          '    prod := a * b',
          '',
          '    // Extract parts',
          '    fmt.Printf("a = %f + %fi\\n", real(a), imag(a))',
          '    fmt.Printf("|a| = %f\\n", cmplx.Abs(a)) // 5.0',
          '',
          '    // Operations',
          '    fmt.Printf("sum: %v, diff: %v, prod: %v\\n", sum, diff, prod)',
          '}',
        ].join('\n'),
        explanation: "Use the complex() built-in to create complex numbers. Access real and imaginary parts with real() and imag() functions — not struct fields. The math/cmplx package provides additional operations. Complex128 is the default and should be used unless you have memory constraints requiring complex64."
      }
    ],
    bestPractices: [
      "Use complex128 for better precision unless memory is constrained",
      "Use complex() built-in to create complex values",
      "Use math/cmplx package for advanced complex operations",
      "Complex types are rarely needed in backend services — use them only for scientific computing",
      "Document functions that accept or return complex numbers clearly"
    ],
    commonMistakes: [
      "Trying to access .real and .imag as struct fields instead of using functions",
      "Using complex numbers when floats would suffice",
      "Forgetting that complex comparisons work differently (use cmplx.Abs for magnitude)",
      "Mixing complex64 and complex128 without explicit conversion"
    ],
    relatedTopics: [
      "floating-points",
      "data-types"
    ],
    externalResources: [
      { title: "Go Spec: Complex Numbers", url: "https://go.dev/ref/spec#Complex_types" },
      { title: "math/cmplx Package", url: "https://pkg.go.dev/math/cmplx" },
      { title: "Go by Example: Complex Numbers", url: "https://gobyexample.com/complex-numbers" }
    ]
  },

  "boolean": {
    slug: "boolean",
    title: "Boolean",
    summary: "The bool type represents true or false values and is essential for control flow and conditions.",
    description: `The boolean type (bool) in Go can hold two values: true or false. Booleans are the foundation of conditional logic, making them essential for control flow, error handling, and state management in backend systems. Go does not support truthiness checks on other types — you cannot use an integer or string as a boolean directly, which prevents many subtle bugs.

In backend services, booleans commonly represent feature flags, configuration toggles, request states, and conditional logic in business rules. Go's strict boolean typing means you must always write explicit conditions, making code more readable and less error-prone.

The && (AND), || (OR), and ! (NOT) operators work on booleans with standard short-circuit evaluation: && stops at the first false, and || stops at the first true. This means you can safely chain conditions without worrying about nil dereferences.`,
    keyPoints: [
      "bool type has exactly two values: true and false",
      "Go does not allow implicit conversion to/from bool (no truthiness)",
      "&& has higher precedence than || in boolean expressions",
      "Short-circuit evaluation: && stops at first false, || at first true",
      "Zero value of bool is false",
      "Used extensively in if statements, for loops, and channel operations",
      "Boolean fields in structs are often better represented as enums or option types"
    ],
    codeExamples: [
      {
        title: "Boolean Usage Patterns",
        description: "Proper boolean usage and common patterns in Go",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Go does not allow this (no implicit conversion)',
          '    // if 1 { }  // COMPILE ERROR: cannot use as bool',
          '    // if "true" { }  // COMPILE ERROR',
          '',
          '    // Redundant boolean comparison',
          '    active := true',
          '    if active == true {  // Unnecessary comparison',
          '        fmt.Println("active")',
          '    }',
          '',
          '    // Double negation',
          '    if !(!active) {',
          '        fmt.Println("still active")',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Direct boolean check (idiomatic)',
          '    active := true',
          '    if active {',
          '        fmt.Println("active")',
          '    }',
          '',
          '    // Boolean functions read naturally',
          '    if isActive() && !isDeleted() {',
          '        fmt.Println("processing")',
          '    }',
          '',
          '    // Short-circuit prevents nil dereference',
          '    var user *User',
          '    if user != nil && user.IsActive {',
          '        fmt.Println("user active")',
          '    }',
          '}',
          '',
          'type User struct { IsActive bool }',
          '',
          'func isActive() bool  { return true }',
          'func isDeleted() bool { return false }',
        ].join('\n'),
        explanation: "Use boolean values directly in conditions without == true/false comparisons. Short-circuit evaluation in && means the right side is only evaluated if the left side is true. This makes nil-check-then-use patterns safe. Name boolean-returning functions with Is/Has/Can prefixes for clarity."
      }
    ],
    bestPractices: [
      "Use direct boolean checks: if flag { } instead of if flag == true { }",
      "Name boolean-returning functions with Is/Has/Can/Should prefixes",
      "Use short-circuit evaluation for safe nil checks before accessing fields",
      "Consider using enum-like types for options with more than two states",
      "Use bool for truly binary states; use constants or enums for multi-state values"
    ],
    commonMistakes: [
      "Writing if flag == true instead of the idiomatic if flag",
      "Using booleans for multi-state values where an enum would be clearer",
      "Forgetting short-circuit evaluation order",
      "Not checking for nil before dereferencing in boolean expressions",
      "Using bool fields in APIs where null/undefined should be distinct from false"
    ],
    relatedTopics: [
      "conditionals",
      "if",
      "data-types"
    ],
    externalResources: [
      { title: "Go Spec: Boolean Types", url: "https://go.dev/ref/spec#Boolean_types" },
      { title: "Effective Go: Booleans", url: "https://go.dev/doc/effective_go#booleans" },
      { title: "Go by Example: Booleans", url: "https://gobyexample.com/booleans" }
    ]
  },

  "strings": {
    slug: "strings",
    title: "Strings",
    summary: "Strings in Go are immutable UTF-8 byte sequences with rich standard library support.",
    description: `Go strings are immutable sequences of bytes, encoded in UTF-8. This is a critical design decision: UTF-8 is the dominant encoding for the web and for modern systems. The immutability of strings means they are safe for concurrent use and can be freely shared between goroutines without synchronization.

The strings package in the standard library provides a comprehensive set of functions for common string operations: searching (Contains, HasPrefix, HasSuffix, Index), replacing (Replace, ReplaceAll), splitting (Split, SplitAfter), trimming (TrimSpace, TrimPrefix), and comparison (EqualFold for case-insensitive comparison).

For backend engineers, string handling is pervasive — from parsing HTTP request bodies to constructing JSON responses, from building database queries to logging messages. Understanding Go's string semantics (UTF-8 encoded, immutable, backed by a byte array) helps you write efficient and correct code.`,
    keyPoints: [
      "Strings are immutable sequences of UTF-8 encoded bytes",
      "len() returns byte length, not character count (use utf8.RuneCountInString for runes)",
      "The strings package provides comprehensive string manipulation functions",
      "Strings are safe for concurrent access due to immutability",
      "Use strings.Builder for efficient string concatenation in loops",
      "String comparison uses == operator; use strings.EqualFold for case-insensitive",
      "Byte indexing (s[i]) returns a byte, not a rune — use for range for Unicode"
    ],
    codeExamples: [
      {
        title: "String Operations and Gotchas",
        description: "Common string operations and pitfalls, especially around UTF-8",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    s := "Hello, 世界"',
          '',
          '    // len() counts bytes, not characters',
          '    fmt.Println(len(s)) // 13, not 11!',
          '',
          '    // Byte indexing doesn\'t give you characters',
          '    fmt.Println(s[7]) // Prints a byte, not "界"',
          '',
          '    // String concatenation in a loop is O(n^2)',
          '    result := ""',
          '    for i := 0; i < 1000; i++ {',
          '        result += "x" // Each concatenation copies the string',
          '    }',
          '',
          '    // Index-based operations break on multi-byte characters',
          '    fmt.Println(s[:3]) // "Hel" — this happens to work',
          '    // s[7:9] might break a multi-byte character!',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "strings"',
          '    "unicode/utf8"',
          ')',
          '',
          'func main() {',
          '    s := "Hello, 世界"',
          '',
          '    // Use RuneCountInString for character count',
          '    fmt.Println(utf8.RuneCountInString(s)) // 9',
          '',
          '    // Use for range to iterate over runes',
          '    for i, r := range s {',
          '        fmt.Printf("%d: %c\\n", i, r)',
          '    }',
          '',
          '    // Use strings.Builder for efficient concatenation',
          '    var builder strings.Builder',
          '    for i := 0; i < 1000; i++ {',
          '        builder.WriteString("x")',
          '    }',
          '    result := builder.String()',
          '',
          '    // Use strings functions for common operations',
          '    fmt.Println(strings.Contains(s, "世界"))',
          '    fmt.Println(strings.ToUpper(s))',
          '    fmt.Println(strings.Fields(s))',
          '    _ = result',
          '}',
        ].join('\n'),
        explanation: "len() returns byte count, not character count — use utf8.RuneCountInString for Unicode character count. The for range loop properly handles multi-byte UTF-8 characters. strings.Builder is O(1) amortized append vs O(n^2) for += concatenation. Always use the strings package for common operations."
      }
    ],
    bestPractices: [
      "Use strings.Builder for efficient string concatenation in loops",
      "Use strings.Contains, HasPrefix, and friends instead of manual indexing",
      "Use utf8.RuneCountInString when you need character count",
      "Iterate strings with for range to properly handle UTF-8 multibyte characters",
      "Prefer strings.EqualFold for case-insensitive comparison",
      "Avoid converting strings to []byte unless necessary (creates a copy)"
    ],
    commonMistakes: [
      "Using len() to count characters instead of bytes",
      "Concatenating strings in loops with + operator instead of strings.Builder",
      "Indexing into strings expecting to get characters (gets bytes instead)",
      "Not handling multi-byte UTF-8 characters when slicing strings",
      "Converting string to []byte unnecessarily (causes memory allocation)"
    ],
    relatedTopics: [
      "interpreted-string-literals",
      "raw-string-literals",
      "runes",
      "data-types"
    ],
    externalResources: [
      { title: "Go Tour: Strings", url: "https://go.dev/tour/basics/12" },
      { title: "Go Blog: Strings, Bytes, Runes, and Characters", url: "https://go.dev/blog/strings" },
      { title: "Go by Example: Strings", url: "https://gobyexample.com/strings" }
    ]
  },

  "interpreted-string-literals": {
    slug: "interpreted-string-literals",
    title: "Interpreted String Literals",
    summary: "Double-quoted strings in Go support escape sequences like \\n, \\t, and \\x for special characters.",
    description: `Interpreted string literals in Go are delimited by double quotes and allow escape sequences. Common escape sequences include \\n (newline), \\t (tab), \\r (carriage return), \\\\ (backslash), \\\" (double quote), \\xHH (hexadecimal), and \\uHHHH (Unicode). These are processed at compile time, meaning the actual bytes in memory reflect the interpreted values.

For backend engineers, understanding string literals is important when working with HTTP headers, JSON encoding, SQL queries, and log formatting. Interpreted strings are the default choice for most use cases — they are concise and handle special characters elegantly. However, they cannot span multiple lines, which is where raw string literals come in handy.

Each escape sequence expands to a single byte or rune in the resulting string. The \\xHH form allows arbitrary byte values (0x00 to 0xFF), while \\u and \\U forms handle Unicode code points.`,
    keyPoints: [
      "Double-quoted strings interpret escape sequences",
      "Common escapes: \\n, \\t, \\r, \\\\, \\\", \\a, \\b, \\f, \\v",
      "Hexadecimal escape: \\xHH (exactly 2 hex digits)",
      "Unicode escapes: \\uHHHH (4 hex digits) or \\UHHHHHHHH (8 hex digits)",
      "Octal escapes: \\OOO (exactly 3 octal digits)",
      "Interpreted strings cannot span multiple lines",
      "Invalid escape sequences cause compile errors"
    ],
    codeExamples: [
      {
        title: "Escape Sequences in Strings",
        description: "Common escape sequences and their uses",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Trying to create multi-line string with double quotes',
          '    // msg := "Hello\\nWorld"  // Works but limited',
          '',
          '    // Missing that \\n is interpreted',
          '    path := "C:\\Users\\file.txt"  // \\U and \\f are escape sequences!',
          '    fmt.Println(path)',
          '',
          '    // Forgetting to escape quotes inside strings',
          '    // json := "key": "value"  // COMPILE ERROR',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Common escape sequences',
          '    msg := "Hello\\nWorld"',
          '    fmt.Println(msg)',
          '',
          '    // Use raw strings for file paths',
          '    path := `C:\\Users\\file.txt`',
          '    fmt.Println(path)',
          '',
          '    // Hex and Unicode escapes',
          '    bell := "\\x07"',
          '    heart := "\\u2764"',
          '    emoji := "\\U0001F600"',
          '    fmt.Printf("bell: %s, heart: %s, emoji: %s\\n", bell, heart, emoji)',
          '',
          '    // Tab alignment',
          '    fmt.Printf("Name:\\t%s\\nAge:\\t%d\\n", "Alice", 30)',
          '}',
        ].join('\n'),
        explanation: "Interpreted strings process escape sequences like \\n (newline) and \\t (tab). For file paths, use raw strings (backticks) to avoid \\ being interpreted as escape. Hex escapes (\\xHH) and Unicode escapes (\\uHHHH) let you include special characters. Tab escapes help with formatted output alignment."
      }
    ],
    bestPractices: [
      "Use interpreted strings (double quotes) for most string literals",
      "Use raw strings for file paths, regex patterns, and multi-line text",
      "Remember that \\n in a string literal is a single newline character",
      "Use \\t for tab-aligned output in log messages and formatted text",
      "Use \\x or \\u escapes for special characters in generated strings"
    ],
    commonMistakes: [
      "Forgetting that \\ in interpreted strings is an escape character",
      "Using interpreted strings for file paths (double backslashes needed)",
      "Trying to span interpreted strings across multiple lines",
      "Using wrong number of hex digits in \\x escape sequences",
      "Confusing \\n (newline) with \\r\\n (Windows line ending)"
    ],
    relatedTopics: [
      "raw-string-literals",
      "strings",
      "runes"
    ],
    externalResources: [
      { title: "Go Spec: String Literals", url: "https://go.dev/ref/spec#String_literals" },
      { title: "Go by Example: Strings", url: "https://gobyexample.com/strings" },
      { title: "Effective Go: Strings", url: "https://go.dev/doc/effective_go#strings" }
    ]
  },

  "raw-string-literals": {
    slug: "raw-string-literals",
    title: "Raw String Literals",
    summary: "Backtick-delimited strings in Go preserve content literally without escape sequence processing.",
    description: `Raw string literals in Go use backticks as delimiters and are interpreted literally — no escape sequences are processed. This makes them ideal for multi-line strings, file paths, regular expressions, and any content that would otherwise require excessive escaping. The content between backticks is exactly what appears in the source code.

For backend engineers, raw strings are invaluable when writing SQL queries, JSON templates, HTML snippets, regex patterns, and file paths. They eliminate the need to double-escape backslashes and make strings much more readable. The tradeoff is that you cannot include a backtick character itself within a raw string.

A subtle detail: raw strings are not empty by default. A raw string containing only backticks has a length of zero. Also, the backtick characters themselves are not part of the string content.`,
    keyPoints: [
      "Raw strings use backtick (`) as delimiter — no escape processing",
      "Content is literal: no \\n, \\t, \\x processing",
      "Cannot contain backtick characters (the delimiter itself)",
      "Multi-line: newlines are preserved literally",
      "Ideal for SQL, regex, HTML templates, and file paths",
      "The byte value of the raw string is exactly what appears between backticks",
      "Raw strings cannot contain the backtick character — use concatenation if needed"
    ],
    codeExamples: [
      {
        title: "Raw String Literals",
        description: "When and how to use raw strings effectively",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Double-escaping in interpreted strings',
          '    path := "C:\\\\Users\\\\Documents\\\\file.txt"',
          '    fmt.Println(path)',
          '',
          '    // Regex with lots of backslashes',
          '    pattern := "^\\\\d{3}-\\\\d{4}-\\\\d{4}$"',
          '    fmt.Println(pattern)',
          '',
          '    // SQL with escaped quotes',
          '    query := "SELECT * FROM users WHERE name = \\"Alice\\""',
          '    fmt.Println(query)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Raw strings: no escaping needed',
          '    path := `C:\\Users\\Documents\\file.txt`',
          '    fmt.Println(path)',
          '',
          '    // Regex is clean and readable',
          '    pattern := `^\\d{3}-\\d{4}-\\d{4}$`',
          '    fmt.Println(pattern)',
          '',
          '    // SQL query is readable',
          '    query := `SELECT * FROM users WHERE name = "Alice"`',
          '    fmt.Println(query)',
          '',
          '    // Multi-line HTML template',
          '    html := `',
          '<html>',
          '  <body>',
          '    <h1>Hello</h1>',
          '  </body>',
          '</html>`',
          '    fmt.Println(html)',
          '}',
        ].join('\n'),
        explanation: "Raw strings eliminate the need for escaping backslashes, quotes, and special characters. File paths, regex patterns, and SQL queries become much more readable. Raw strings also support literal multi-line content, which is useful for templates and configuration. Note: you cannot include a backtick character inside a raw string."
      }
    ],
    bestPractices: [
      "Use raw strings for file paths to avoid double-escaping backslashes",
      "Use raw strings for regex patterns for readability",
      "Use raw strings for SQL queries and multi-line templates",
      "Use interpreted strings (double quotes) when you need escape sequences",
      "Combine raw strings with concatenation if you need a literal backtick"
    ],
    commonMistakes: [
      "Trying to include a backtick character inside a raw string",
      "Using raw strings when escape sequences are needed (\\n, \\t)",
      "Forgetting that raw strings preserve all whitespace including leading indentation",
      "Not realizing that raw strings don't process \\u or \\x escapes"
    ],
    relatedTopics: [
      "interpreted-string-literals",
      "strings",
      "runes"
    ],
    externalResources: [
      { title: "Go Spec: String Literals", url: "https://go.dev/ref/spec#String_literals" },
      { title: "Go by Example: String Literals", url: "https://gobyexample.com/string-literals" },
      { title: "Effective Go: Strings", url: "https://go.dev/doc/effective_go#strings" }
    ]
  },

  "runes": {
    slug: "runes",
    title: "Runes",
    summary: "A rune is a Go alias for int32 representing a single Unicode code point in UTF-8 encoding.",
    description: `In Go, a rune is an alias for int32 and represents a single Unicode code point. Runes are how Go handles Unicode characters — while strings are sequences of bytes, iterating over a string with for range yields runes. This distinction is critical because a single Unicode character (like an emoji or CJK character) can take 1 to 4 bytes in UTF-8 encoding.

For backend engineers working with international text, APIs that handle multiple languages, or systems processing user input, understanding runes is essential. Go's native UTF-8 support means most of the time you can work with strings directly, but when you need to manipulate individual characters, the rune type gives you the correct abstraction.

The unicode and unicode/utf8 packages provide functions for working with runes: checking if a rune is a letter, digit, or space; converting between cases; and validating UTF-8 encoding.`,
    keyPoints: [
      "rune is an alias for int32 — represents a Unicode code point",
      "Strings are byte sequences; for range on strings yields runes",
      "UTF-8 encoding: 1 byte for ASCII, up to 4 bytes for other characters",
      "The unicode package provides character classification (IsLetter, IsDigit, etc.)",
      "The unicode/utf8 package provides UTF-8 encoding/decoding functions",
      "len() returns byte count, not rune count",
      "rune literals use single quotes: 'A', '界', '\\u2764'"
    ],
    codeExamples: [
      {
        title: "Working with Runes",
        description: "Understanding the difference between bytes and runes in strings",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    s := "Hello, 世界"',
          '',
          '    // len counts bytes, not runes',
          '    fmt.Println(len(s)) // 13 (bytes), not 11 (runes)',
          '',
          '    // Byte index doesn\'t correspond to character position',
          '    for i := 0; i < len(s); i++ {',
          '        fmt.Printf("%d: %x\\n", i, s[i])',
          '    }',
          '',
          '    // Counting characters by slicing bytes',
          '    count := 0',
          '    for i := 0; i < len(s); i++ {',
          '        if s[i] < 128 { count++ } // Not correct for multi-byte!',
          '    }',
          '    fmt.Println(count)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "unicode/utf8"',
          ')',
          '',
          'func main() {',
          '    s := "Hello, 世界"',
          '',
          '    // RuneCountInString gives correct character count',
          '    fmt.Println(utf8.RuneCountInString(s)) // 9',
          '',
          '    // for range iterates over runes',
          '    for i, r := range s {',
          '        fmt.Printf("byte %d: rune %c (U+%04X)\\n", i, r, r)',
          '    }',
          '',
          '    // Convert to []rune for indexed character access',
          '    runes := []rune(s)',
          '    fmt.Println(string(runes[7:9])) // "世界"',
          '',
          '    // Character classification',
          '    for _, r := range "Hello123" {',
          '        switch {',
          '        case unicode.IsLetter(r):',
          '            fmt.Printf("%c is a letter\\n", r)',
          '        case unicode.IsDigit(r):',
          '            fmt.Printf("%c is a digit\\n", r)',
          '        }',
          '    }',
          '}',
        ].join('\n'),
        explanation: "for range on a string iterates over runes, giving you the correct byte position and rune value. utf8.RuneCountInString counts Unicode characters. Convert to []rune when you need indexed access to characters. The unicode package provides IsLetter, IsDigit, IsSpace for character classification."
      }
    ],
    bestPractices: [
      "Use for range to iterate over strings when you need characters",
      "Use utf8.RuneCountInString for character count",
      "Convert to []rune when you need indexed access to characters",
      "Use the unicode package for character classification",
      "Remember that rune literals use single quotes, not double quotes"
    ],
    commonMistakes: [
      "Using len() to count characters instead of utf8.RuneCountInString",
      "Indexing into a string with byte positions and expecting character positions",
      "Converting string to []byte when []rune is what you need",
      "Using double quotes for rune literals (should be single quotes)",
      "Not handling multi-byte characters when processing strings byte-by-byte"
    ],
    relatedTopics: [
      "strings",
      "interpreted-string-literals",
      "raw-string-literals"
    ],
    externalResources: [
      { title: "Go Blog: Strings, Bytes, Runes, and Characters", url: "https://go.dev/blog/strings" },
      { title: "Go Tour: Runes", url: "https://go.dev/tour/basics/13" },
      { title: "Go by Example: Runes", url: "https://gobyexample.com/rune" }
    ]
  },

  "type-inference": {
    slug: "type-inference",
    title: "Type Inference",
    summary: "Go infers variable types from initial values, reducing verbosity while maintaining type safety.",
    description: `Go's type inference allows you to declare variables without explicitly writing their type. When you use := or var x = value, the compiler determines the type from the assigned value. This keeps Go code concise while maintaining the safety of static typing — the type is still known at compile time.

Type inference works with all types: numeric types default to int or float64, strings become string, and complex types are inferred from their literal form. The short declaration operator (:=) is the most common way to leverage type inference inside functions. At package level, var x = value also infers the type.

For backend engineers, type inference reduces boilerplate while keeping code strongly typed. You get the readability benefits of dynamic languages without sacrificing compile-time safety. However, explicit types in function signatures and public APIs improve clarity.`,
    keyPoints: [
      "The := operator infers type from the right-hand side expression",
      "var x = value also infers type (works at package level too)",
      "Integer literals default to int; float literals to float64",
      "Complex literals default to complex128",
      "Type inference is compile-time — no runtime cost",
      "Explicit types in function signatures improve readability",
      "The compiler can infer types in multi-value assignments with :="
    ],
    codeExamples: [
      {
        title: "Type Inference in Practice",
        description: "How Go infers types and when to be explicit",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Redundant type annotations when inference works fine',
          '    var x int = 42',
          '    var s string = "hello"',
          '    var f float64 = 3.14',
          '',
          '    // But sometimes you want a different type',
          '    var a = 42      // int, but maybe you wanted int64?',
          '    var b = 3.14    // float64, but maybe you wanted float32?',
          '    fmt.Println(x, s, f, a, b)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Let the compiler infer the type',
          '    x := 42           // int',
          '    s := "hello"      // string',
          '    f := 3.14         // float64',
          '',
          '    // Explicit when you need a specific type',
          '    var a int64 = 42   // Explicit int64',
          '    var b float32 = 3.14 // Explicit float32',
          '',
          '    // Inferred from function return',
          '    result := compute() // type inferred from return type',
          '',
          '    // Multi-value inference',
          '    val, ok := m["key"] // types inferred',
          '',
          '    fmt.Println(x, s, f, a, b, val, ok)',
          '}',
          '',
          'var m = map[string]int{"key": 1}',
          'func compute() int { return 42 }',
        ].join('\n'),
        explanation: "Use := to let the compiler infer types — it makes code concise. Only use explicit types when you need a different type than what would be inferred (e.g., int64 instead of int). Type inference is compile-time, so there's zero runtime cost. In multi-value assignments like comma-ok, := simultaneously infers all types."
      }
    ],
    bestPractices: [
      "Use := for conciseness when the type is obvious from the value",
      "Be explicit in function signatures and public API definitions",
      "Use explicit types when you need a specific size (int64, float32)",
      "Trust the compiler — if the type is wrong, the code won't compile",
      "Use type inference with multi-value returns for cleaner code"
    ],
    commonMistakes: [
      "Being too explicit when inference would be clearer and more concise",
      "Not being explicit enough when the inferred type is wrong for the use case",
      "Assuming type inference means the type is dynamic (it's still static)",
      "Forgetting that integer constants can be assigned to any integer type"
    ],
    relatedTopics: [
      "var-vs",
      "variables--constants",
      "type-conversion"
    ],
    externalResources: [
      { title: "Go Tour: Short Variable Declarations", url: "https://go.dev/tour/basics/4" },
      { title: "Effective Go: Variables", url: "https://go.dev/doc/effective_go#variables" },
      { title: "Go Spec: Short Variable Declarations", url: "https://go.dev/ref/spec#Short_variable_declarations" }
    ]
  },

  "type-conversion": {
    slug: "type-conversion",
    title: "Type Conversion",
    summary: "Go requires explicit type conversions — no implicit type promotion or coercion between types.",
    description: `Go does not perform implicit type conversions. If you need to convert between types, you must use an explicit type conversion expression: value.(Type) for interfaces or simply Type(value) for basic types. This design prevents accidental data loss and makes all conversions visible in the code.

For backend engineers, type conversion appears frequently when working with numeric data (database results, API responses), converting between strings and numbers (strconv package), and converting between slices of related types (like []byte to string). Understanding the cost of each conversion helps you write efficient code.

String conversions are particularly important: converting a string to []byte or []rune creates a copy of the data, while converting back to string also copies. The strings.Builder or bytes.Buffer can help avoid unnecessary copies when building strings incrementally.`,
    keyPoints: [
      "No implicit conversions — all type changes must be explicit",
      "Syntax: Type(value) for basic types, value.(Type) for interfaces",
      "Converting between numeric types may truncate or lose precision",
      "String to []byte and back creates a copy of the underlying data",
      "The strconv package handles string-to-number conversions",
      "Type conversion can fail at runtime for interfaces (type assertion)",
      "Named types require conversion to/from their underlying type"
    ],
    codeExamples: [
      {
        title: "Type Conversion Patterns",
        description: "Common conversions and how to handle them safely",
        bad: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "strconv"',
          ')',
          '',
          'func main() {',
          '    // Truncation on narrowing conversion',
          '    var big int64 = 1000',
          '    var small int8 = int8(big) // Wraps to 1000 mod 256 = 232',
          '    fmt.Println(small)',
          '',
          '    // Unsafe string to int conversion',
          '    s := "not a number"',
          '    // i, _ := strconv.Atoi(s) // Ignoring error!',
          '',
          '    // Losing precision',
          '    var f float64 = 3.14159',
          '    var i int = int(f) // Truncates to 3',
          '    fmt.Println(i)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "strconv"',
          ')',
          '',
          'func main() {',
          '    // Safe narrowing with bounds check',
          '    var big int64 = 100',
          '    if big >= math.MinInt8 && big <= math.MaxInt8 {',
          '        small := int8(big)',
          '        fmt.Println(small)',
          '    }',
          '',
          '    // Always handle conversion errors',
          '    s := "42"',
          '    i, err := strconv.Atoi(s)',
          '    if err != nil {',
          '        fmt.Printf("conversion error: %v\\n", err)',
          '        return',
          '    }',
          '    fmt.Println(i)',
          '',
          '    // Efficient string/byte conversion when possible',
          '    b := []byte("hello")',
          '    s2 := string(b)',
          '    fmt.Println(s2)',
          '}',
        ].join('\n'),
        explanation: "Always check for overflow when narrowing numeric types. Use strconv functions for string-to-number conversions and handle errors. String-to-byte conversions create copies — avoid unnecessary conversions. The math package constants (math.MaxInt8, etc.) help with bounds checking."
      }
    ],
    bestPractices: [
      "Always check for errors when converting strings to numbers",
      "Use strconv.Itoa/Atoi for simple int-string conversions",
      "Check bounds when narrowing numeric types (int64 to int8)",
      "Minimize string <-> []byte conversions to reduce allocations",
      "Use type assertions with comma-ok pattern for safe interface conversion"
    ],
    commonMistakes: [
      "Ignoring truncation when converting larger to smaller numeric types",
      "Not handling errors from strconv.Atoi and similar functions",
      "Assuming string([]byte) doesn't allocate (it does copy the data)",
      "Forgetting that named types need explicit conversion to their base type",
      "Using unsafe type assertions without the comma-ok pattern"
    ],
    relatedTopics: [
      "type-inference",
      "integers-signed-unsigned",
      "strings"
    ],
    externalResources: [
      { title: "Go Spec: Conversions", url: "https://go.dev/ref/spec#Conversions" },
      { title: "strconv Package", url: "https://pkg.go.dev/strconv" },
      { title: "Go by Example: Type Conversion", url: "https://gobyexample.com/type-conversion" }
    ]
  },

  "const-and-iota": {
    slug: "const-and-iota",
    title: "Const and iota",
    summary: "Constants in Go are compile-time values; iota provides a convenient way to create enum-like constants.",
    description: `Constants in Go are declared with the const keyword and must be set to a value that the compiler can evaluate at compile time. This includes literals, other constants, and expressions involving only constants. Constants cannot be changed after declaration, and their values are substituted directly where they're used — there's no memory allocation.

The iota identifier is a special counter that auto-increments within a const block. Starting at 0, each subsequent const declaration in the block gets the next value (1, 2, 3, etc.). This makes iota perfect for creating enumeration-like types. You can also combine iota with arithmetic expressions to create more complex patterns like bitmasks.

For backend engineers, const and iota are essential for defining configuration defaults, error codes, status enums, and bit flags. The compile-time nature of constants means the compiler can optimize code that uses them — for example, using constants in switch statements allows the compiler to generate jump tables.`,
    keyPoints: [
      "const values are determined at compile time — no runtime allocation",
      "iota starts at 0 and increments by 1 for each const declaration in a block",
      "iota resets to 0 for each new const block",
      "Constants can be untyped, allowing flexible use in expressions",
      "Typed constants follow the same rules as variables",
      "iota with arithmetic creates bitmasks, offsets, and other patterns",
      "Untyped constants have no precision loss until used with a typed variable"
    ],
    codeExamples: [
      {
        title: "Constants and iota Patterns",
        description: "Using const and iota for enums and bitmasks",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Manual enum values (error-prone)',
          'const (',
          '    StatusPending   = 0',
          '    StatusActive    = 1',
          '    StatusInactive  = 2',
          '    StatusDeleted   = 3',
          ')',
          '',
          '// Magic numbers everywhere',
          'const (',
          '    ReadPermission  = 1',
          '    WritePermission = 2',
          '    ExecPermission  = 4',
          ')',
          '',
          'func main() {',
          '    fmt.Println(StatusActive)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// iota-based enum (maintainable)',
          'const (',
          '    StatusPending  = iota // 0',
          '    StatusActive          // 1',
          '    StatusInactive        // 2',
          '    StatusDeleted         // 3',
          ')',
          '',
          '// Bitmask with iota',
          'const (',
          '    ReadPermission  = 1 << iota // 1',
          '    WritePermission              // 2',
          '    ExecPermission               // 4',
          ')',
          '',
          '// Skipping values with blank identifier',
          'const (',
          '    _  = iota',
          '    KB = 1 << (10 * iota) // 1024',
          '    MB                    // 1048576',
          '    GB                    // 1073741824',
          ')',
          '',
          'func main() {',
          '    perms := ReadPermission | WritePermission',
          '    fmt.Printf("Status: %d, Perms: %d\\n", StatusActive, perms)',
          '    fmt.Printf("1 MB = %d bytes\\n", MB)',
          '}',
        ].join('\n'),
        explanation: "iota auto-increments within a const block, making enums easy to maintain. For bitmasks, use 1 << iota to create powers of 2. The blank identifier _ skips a value. Untyped constants don't have precision loss until used with a typed variable. Adding new values to iota enums doesn't require updating existing values."
      }
    ],
    bestPractices: [
      "Use iota for enum-like constant sequences instead of manual numbering",
      "Use 1 << iota for bitflags and permission constants",
      "Group related constants in parenthesized const blocks",
      "Add comments to document the expected values",
      "Consider using typed constants for additional type safety",
      "Use _ = iota to skip a value in the sequence"
    ],
    commonMistakes: [
      "Manually numbering enum values instead of using iota",
      "Forgetting that iota resets to 0 in each new const block",
      "Using var instead of const for values that should be immutable",
      "Not using iota for bitmask patterns, leading to magic numbers",
      "Confusing typed and untyped constant behavior"
    ],
    relatedTopics: [
      "variables--constants",
      "var-vs",
      "conditionals"
    ],
    externalResources: [
      { title: "Go Tour: Constants", url: "https://go.dev/tour/basics/15" },
      { title: "Effective Go: Constants", url: "https://go.dev/doc/effective_go#constants" },
      { title: "Go by Example: Constants", url: "https://gobyexample.com/constants" }
    ]
  },

  "conditionals": {
    slug: "conditionals",
    title: "Conditionals",
    summary: "Go supports if, switch, and select statements for conditional logic with some unique syntax features.",
    description: `Go's conditional statements follow a familiar C-like syntax with some important differences. The if statement doesn't require parentheses around the condition, but the braces are mandatory. Go's if can include an initialization statement before the condition, which is especially useful for error handling patterns.

The switch statement in Go is more powerful and flexible than in many other languages. It supports expressions, type switches, and can match multiple values per case. Go's switch doesn't fall through by default — each case breaks automatically, which eliminates a common source of bugs in other languages.

For backend engineers, these conditional constructs form the backbone of request routing, error handling, and business logic. The if-with-initialization pattern is particularly common for handling errors concisely, and type switches are useful for processing different message types in event-driven systems.`,
    keyPoints: [
      "if conditions don't need parentheses, but braces are required",
      "if can have an initialization statement: if err := do(); err != nil { }",
      "switch doesn't fall through by default (unlike C/Java)",
      "switch can match types (type switch) and multiple values per case",
      "Go has no ternary operator — use if/else instead",
      "select is used for channel operations (covered separately)",
      "init statement in if/for variables are scoped to the block"
    ],
    codeExamples: [
      {
        title: "Conditional Patterns in Go",
        description: "Idiomatic conditional usage including init statements and switch",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Verbose error handling without init statement',
          '    result, err := doWork()',
          '    if err != nil {',
          '        fmt.Println("error:", err)',
          '        return',
          '    }',
          '    fmt.Println(result)',
          '',
          '    // Fall-through confusion (Go doesn\'t fall through)',
          '    // In C/Java, this would print "one" AND "two"',
          '    // In Go, only the matching case executes',
          '    switch 1 {',
          '    case 1:',
          '        fmt.Println("one")',
          '    case 2:',
          '        fmt.Println("two")',
          '    }',
          '}',
          '',
          'func doWork() (string, error) { return "ok", nil }',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Init statement (most common pattern)',
          '    if result, err := doWork(); err != nil {',
          '        fmt.Println("error:", err)',
          '        return',
          '    } else {',
          '        fmt.Println(result)',
          '    }',
          '',
          '    // Switch with multiple cases',
          '    switch day := "Mon"; day {',
          '    case "Sat", "Sun":',
          '        fmt.Println("weekend")',
          '    case "Mon", "Tue", "Wed", "Thu", "Fri":',
          '        fmt.Println("weekday")',
          '    default:',
          '        fmt.Println("unknown")',
          '    }',
          '',
          '    // Type switch',
          '    var i interface{} = "hello"',
          '    switch v := i.(type) {',
          '    case string:',
          '        fmt.Println("string:", v)',
          '    case int:',
          '        fmt.Println("int:", v)',
          '    }',
          '}',
          '',
          'func doWork() (string, error) { return "ok", nil }',
        ].join('\n'),
        explanation: "The init statement in if (if err := f(); err != nil) is the most common Go pattern for error handling — the error variable is scoped to the if/else blocks. Switch doesn't fall through, so no break is needed. Type switches use i.(type) syntax and are great for handling interfaces."
      }
    ],
    bestPractices: [
      "Use if-with-init for concise error handling: if err := f(); err != nil { }",
      "Prefer early returns over deeply nested if-else chains",
      "Use switch instead of long if-else chains for multiple conditions",
      "Leverage switch's multiple-value matching for cleaner code",
      "Use type switches when processing interface values"
    ],
    commonMistakes: [
      "Forgetting that Go doesn't fall through in switch cases",
      "Adding unnecessary parentheses around conditions",
      "Creating deeply nested if-else chains instead of using early returns",
      "Using if-else chains when switch would be cleaner",
      "Confusing variable scope in if init statements"
    ],
    relatedTopics: [
      "if",
      "if-else",
      "switch",
      "for-loop"
    ],
    externalResources: [
      { title: "Go Tour: If/Else", url: "https://go.dev/tour/flowcontrol/3" },
      { title: "Go Tour: Switch", url: "https://go.dev/tour/flowcontrol/5" },
      { title: "Effective Go: Control Structures", url: "https://go.dev/doc/effective_go#control-structures" }
    ]
  },

  "if": {
    slug: "if",
    title: "if",
    summary: "The if statement in Go evaluates a boolean condition with optional initialization and no required parentheses.",
    description: `Go's if statement evaluates a boolean expression and executes a block of code when the condition is true. Unlike C-family languages, Go doesn't require parentheses around the condition, but the opening brace is mandatory on the same line as the condition. This eliminates the dangling else problem.

A distinctive feature of Go's if is the optional initialization statement. You can declare and initialize variables before the condition, separated by a semicolon. These variables are scoped to the if and any associated else blocks, making them ideal for the common pattern of checking errors immediately after a function call.

Go doesn't have a ternary operator (?:). Use if/else instead. The language's design philosophy favors explicit, readable code over concise one-liners.`,
    keyPoints: [
      "Parentheses around conditions are optional but discouraged",
      "Opening brace { must be on the same line as the if statement",
      "Optional init statement: if init; condition { }",
      "Variables declared in init are scoped to the if/else block",
      "No ternary operator — use if/else instead",
      "Braces are always required, even for single-line bodies",
      "Conditions must be boolean — no truthiness conversion"
    ],
    codeExamples: [
      {
        title: "if Statement Patterns",
        description: "Using if with init statements and proper error handling",
        bad: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "os"',
          ')',
          '',
          'func main() {',
          '    // Verbose: separate declaration and check',
          '    data, err := os.ReadFile("config.txt")',
          '    if err != nil {',
          '        fmt.Println("read error:", err)',
          '        return',
          '    }',
          '',
          '    // err is still accessible here (might be confusing)',
          '    fmt.Println(len(data))',
          '',
          '    // Single-line body without braces (not allowed in Go)',
          '    // if true return  // COMPILE ERROR',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "os"',
          ')',
          '',
          'func main() {',
          '    // Init statement scopes err to if/else',
          '    if data, err := os.ReadFile("config.txt"); err != nil {',
          '        fmt.Println("read error:", err)',
          '        return',
          '    } else {',
          '        fmt.Println(len(data))',
          '    }',
          '',
          '    // Most common pattern: early return on error',
          '    result, err := process()',
          '    if err != nil {',
          '        log.Fatal(err)',
          '    }',
          '    // Use result — no need for else',
          '    fmt.Println(result)',
          '}',
          '',
          'func process() (string, error) { return "ok", nil }',
          'var log = struct{ Fatal func(...interface{}) }{',
          '    Fatal: func(args ...interface{}) { fmt.Println(args...) },',
          '}',
        ].join('\n'),
        explanation: "The init statement (if err := f(); err != nil) scopes the error variable to the if/else blocks. The early return pattern is preferred in Go: check for error, return early, then continue with the happy path. This avoids deep nesting and makes the code easier to follow."
      }
    ],
    bestPractices: [
      "Use the init statement for error checking: if err := f(); err != nil { }",
      "Prefer early returns over else blocks when possible",
      "Always use braces, even for single-line bodies",
      "Keep conditions simple — extract complex logic into functions",
      "Don't nest more than 3 levels deep; refactor with early returns"
    ],
    commonMistakes: [
      "Using parentheses around conditions (not idiomatic, though allowed)",
      "Forgetting that init-scoped variables are not accessible after the if block",
      "Not using braces (compilation error in Go)",
      "Creating deeply nested if blocks instead of using early returns",
      "Using if without considering the else branch when both paths are needed"
    ],
    relatedTopics: [
      "if-else",
      "conditionals",
      "switch"
    ],
    externalResources: [
      { title: "Go Tour: If", url: "https://go.dev/tour/flowcontrol/3" },
      { title: "Effective Go: If", url: "https://go.dev/doc/effective_go#if" },
      { title: "Go by Example: If/Else", url: "https://gobyexample.com/if-else" }
    ]
  },

  "if-else": {
    slug: "if-else",
    title: "if-else",
    summary: "Go's if-else provides two-way branching with mandatory braces and optional init statements.",
    description: `Go's if-else provides the standard two-way conditional branching. Like the plain if, it doesn't require parentheses around the condition but does require braces. The initialization statement in the if clause is also available in if-else, with the variables scoped to both the if and else blocks.

A key design principle in Go is to use early returns instead of if-else when possible. Instead of wrapping the main logic in an else block, you handle the error case first with a return, then continue with the normal flow. This reduces indentation and makes the code easier to read, especially in functions with multiple error checks.

The else block in Go must have its opening brace on the same line as the closing brace of the if block (K&R style). This is enforced by gofmt and the compiler.`,
    keyPoints: [
      "else must start on the same line as the closing brace: } else {",
      "Init statement variables are accessible in both if and else blocks",
      "Prefer early returns over if-else for error handling",
      "No else required after return — the function exits anyway",
      "Use else only when both branches are equally weighted",
      "Variables declared in if are NOT available after the if-else block"
    ],
    codeExamples: [
      {
        title: "if-else and Early Return Pattern",
        description: "When to use else and when to use early return",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func classify(score int) string {',
          '    // Deeply nested if-else chains',
          '    if score >= 0 {',
          '        if score >= 90 {',
          '            return "A"',
          '        } else {',
          '            if score >= 80 {',
          '                return "B"',
          '            } else {',
          '                if score >= 70 {',
          '                    return "C"',
                     '    } else {',
          '                    return "F"',
          '                }',
          '            }',
          '        }',
          '    }',
          '    return "invalid"',
          '}',
          '',
          'func main() { fmt.Println(classify(85)) }',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func classify(score int) string {',
          '    // Early returns eliminate nesting',
          '    if score < 0 {',
          '        return "invalid"',
          '    }',
          '    if score >= 90 {',
          '        return "A"',
          '    }',
          '    if score >= 80 {',
          '        return "B"',
          '    }',
          '    if score >= 70 {',
          '        return "C"',
          '    }',
          '    return "F"',
          '}',
          '',
          'func main() { fmt.Println(classify(85)) }',
        ].join('\n'),
        explanation: "Replace deeply nested if-else with early returns. Each condition returns immediately, keeping the happy path at the lowest indentation level. This is the idiomatic Go pattern for functions with multiple conditions. Use actual else blocks only when both branches produce values for the same variable."
      }
    ],
    bestPractices: [
      "Prefer early returns to reduce nesting",
      "Use else only when you need to execute one of two equal branches",
      "Keep else blocks short — if they're long, consider refactoring",
      "Use init statements with if-else for scoped error handling",
      "Go's gofmt enforces } else { on same line as closing brace"
    ],
    commonMistakes: [
      "Writing else on a new line (compilation error)",
      "Using else after return (redundant — the function already exits)",
      "Creating deeply nested if-else chains instead of early returns",
      "Forgetting that init-scoped variables are not available after the block",
      "Overusing else when the code would be clearer with sequential ifs"
    ],
    relatedTopics: [
      "if",
      "conditionals",
      "switch"
    ],
    externalResources: [
      { title: "Go Tour: If/Else", url: "https://go.dev/tour/flowcontrol/3" },
      { title: "Effective Go: If", url: "https://go.dev/doc/effective_go#if" },
      { title: "Go by Example: If/Else", url: "https://gobyexample.com/if-else" }
    ]
  },

  "switch": {
    slug: "switch",
    title: "Switch",
    summary: "Go's switch is more powerful than C/Java — cases don't fall through by default and support types.",
    description: `Go's switch statement is a versatile control flow mechanism that goes beyond simple value matching. Unlike C or Java, Go switches don't fall through between cases — each case breaks automatically. You can match multiple values per case with comma-separated expressions, and Go also supports type switches for working with interface values.

The switch can have an initialization statement similar to if, and expressions don't need to be constants — they're evaluated at runtime. Go also allows a switch without a condition, which is equivalent to switch true { } and is useful for replacing long if-else chains.

For backend engineers, switch is invaluable for request routing, status code handling, type-based dispatch, and command parsing. The type switch is particularly useful when processing messages from channels that carry interface{} values.`,
    keyPoints: [
      "Cases don't fall through by default — no break needed",
      "Use fallthrough keyword to explicitly fall through to next case",
      "Multiple values per case: case \"a\", \"b\", \"c\":",
      "Type switches: switch v := i.(type) { case int: }",
      "Switch without condition: switch { case x > 0: }",
      "Init statements allowed: switch x := get(); x { }",
      "Expressions in cases are evaluated at runtime (not just constants)"
    ],
    codeExamples: [
      {
        title: "Switch Statement Patterns",
        description: "Various switch patterns including type switches and multi-value matching",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Long if-else chain (use switch instead)',
          '    status := 200',
          '    if status == 200 {',
          '        fmt.Println("OK")',
          '    } else if status == 201 {',
          '        fmt.Println("Created")',
          '    } else if status == 400 {',
          '        fmt.Println("Bad Request")',
          '    } else if status == 404 {',
          '        fmt.Println("Not Found")',
          '    } else {',
          '        fmt.Println("Unknown")',
          '    }',
          '',
          '    // Confusing: fallthrough when you didn\'t mean it',
          '    x := 1',
          '    switch x {',
          '    case 1:',
          '        fmt.Println("one")',
          '        fallthrough',
          '    case 2:',
          '        fmt.Println("two") // Always prints!',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Clean switch for value matching',
          '    status := 200',
          '    switch status {',
          '    case 200:',
          '        fmt.Println("OK")',
          '    case 201:',
          '        fmt.Println("Created")',
          '    case 400:',
          '        fmt.Println("Bad Request")',
          '    case 404:',
          '        fmt.Println("Not Found")',
          '    default:',
          '        fmt.Println("Unknown")',
          '    }',
          '',
          '    // Type switch',
          '    var i interface{} = "hello"',
          '    switch v := i.(type) {',
          '    case string:',
          '        fmt.Printf("string of length %d\\n", len(v))',
          '    case int:',
          '        fmt.Printf("integer: %d\\n", v)',
          '    case nil:',
          '        fmt.Println("nil value")',
          '    default:',
          '        fmt.Printf("unknown type: %T\\n", v)',
          '    }',
          '',
          '    // Multiple values per case',
          '    day := "Sat"',
          '    switch day {',
          '    case "Sat", "Sun":',
          '        fmt.Println("weekend")',
          '    default:',
          '        fmt.Println("weekday")',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Use switch instead of long if-else chains for cleaner code. Multiple values per case eliminate repeated code. Type switches handle different types from interfaces gracefully. Fallthrough is rarely needed — if you use it, document why. The init statement is useful for computing the switch value."
      }
    ],
    bestPractices: [
      "Use switch instead of long if-else chains for value comparisons",
      "Group related values with multiple cases per statement",
      "Use type switches for processing interface values",
      "Avoid fallthrough — it's almost never needed in Go",
      "Use the init statement when the switch value needs computation",
      "Add a default case to handle unexpected values gracefully"
    ],
    commonMistakes: [
      "Using fallthrough when it's not intended",
      "Not adding a default case when unexpected values should be handled",
      "Using if-else chains when switch would be cleaner",
      "Forgetting that case expressions are evaluated at runtime",
      "Not realizing type switches use i.(type) syntax, not regular type assertion"
    ],
    relatedTopics: [
      "conditionals",
      "if",
      "if-else",
      "type-conversion"
    ],
    externalResources: [
      { title: "Go Tour: Switch", url: "https://go.dev/tour/flowcontrol/5" },
      { title: "Effective Go: Switch", url: "https://go.dev/doc/effective_go#switch" },
      { title: "Go by Example: Switch", url: "https://gobyexample.com/switch" }
    ]
  },

  "loops": {
    slug: "loops",
    title: "Loops",
    summary: "Go has only one loop construct — the for loop — which handles all iteration patterns.",
    description: `Go simplified its control flow by having a single loop keyword: for. The for loop replaces the while, do-while, and traditional for loops found in other languages. This simplicity is a deliberate design choice that keeps the language small and easy to learn.

The for loop in Go has three forms: the classic for with init, condition, and post statements; the while-style for with just a condition; and the infinite for {} loop (equivalent to while true). All three forms use the same keyword, making the syntax consistent.

For backend engineers, loops are fundamental for processing data, handling connections, running background tasks, and implementing retry logic. Understanding Go's single loop construct and its variations makes you productive quickly without needing to learn multiple loop syntaxes.`,
    keyPoints: [
      "Go has only the for loop — no while or do-while keywords",
      "Classic form: for init; condition; post { }",
      "While form: for condition { }",
      "Infinite loop: for { }",
      "Init and post statements are optional",
      "Break and continue control loop execution",
      "Range form: for i, v := range collection { }"
    ],
    codeExamples: [
      {
        title: "All Loop Forms",
        description: "Demonstrating the three forms of the for loop",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Using for as while (fine but can be clearer)',
          '    i := 0',
          '    for i < 5 {',
          '        fmt.Println(i)',
          '        i++',
          '    }',
          '',
          '    // Multiple variables with complex loop body',
          '    items := []int{1, 2, 3, 4, 5}',
          '    for j := 0; j < len(items); j++ {',
          '        if items[j]%2 == 0 {',
          '            continue',
          '        }',
          '        fmt.Println(items[j])',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Classic for loop',
          '    for i := 0; i < 5; i++ {',
          '        fmt.Println(i)',
          '    }',
          '',
          '    // While-style (when you don\'t need init/post)',
          '    count := 0',
          '    for count < 5 {',
          '        fmt.Println(count)',
          '        count++',
          '    }',
          '',
          '    // Infinite loop with break',
          '    for {',
          '        if done() {',
          '            break',
          '        }',
          '        process()',
          '    }',
          '',
          '    // Use range for slice iteration (idiomatic)',
          '    items := []int{1, 2, 3, 4, 5}',
          '    for _, v := range items {',
          '        if v%2 == 0 {',
          '            continue',
          '        }',
          '        fmt.Println(v)',
          '    }',
          '}',
          '',
          'func done() bool { return false }',
          'func process()    {}',
        ].join('\n'),
        explanation: "The classic for loop handles most iteration needs. The while-style is useful when the iteration logic is more complex than a simple counter. Use range for iterating over slices and maps — it's more idiomatic than index-based iteration. Infinite loops with break are common for server main loops and retry logic."
      }
    ],
    bestPractices: [
      "Use the classic for loop for simple counter-based iteration",
      "Use for range for iterating over slices, arrays, maps, and strings",
      "Prefer for range over index-based access when you don't need the index",
      "Use break and continue to reduce nesting in loop bodies",
      "Keep loop bodies short — extract complex logic into functions"
    ],
    commonMistakes: [
      "Using while/do-while syntax (Go only has for)",
      "Modifying a slice while iterating over it with range",
      "Using index-based access when range would be cleaner",
      "Creating infinite loops without proper exit conditions",
      "Forgetting that range gives copies of values, not references"
    ],
    relatedTopics: [
      "for-loop",
      "for-range",
      "break",
      "continue"
    ],
    externalResources: [
      { title: "Go Tour: For", url: "https://go.dev/tour/flowcontrol/1" },
      { title: "Effective Go: For", url: "https://go.dev/doc/effective_go#for" },
      { title: "Go by Example: For", url: "https://gobyexample.com/for" }
    ]
  },

  "for-loop": {
    slug: "for-loop",
    title: "For Loop",
    summary: "The for loop is Go's only looping construct, supporting init, condition, and post statements.",
    description: `The for loop in Go combines the functionality of traditional for, while, and do-while loops from other languages. The classic form has three parts separated by semicolons: an initialization statement, a condition expression, and a post statement (typically an increment or decrement). Each part is optional.

The init statement executes once before the loop starts and can declare variables scoped to the loop. The condition is evaluated before each iteration — when it's false, the loop exits. The post statement executes at the end of each iteration, before the condition is checked again.

For backend engineers, the for loop is workhorse for data processing pipelines, batch operations, retry mechanisms, and background worker loops. Understanding the nuances — like how init-scoped variables work and when to use different loop forms — makes your code more efficient and readable.`,
    keyPoints: [
      "Classic form: for init; condition; post { }",
      "Any part can be omitted: for ; ; { } is an infinite loop",
      "Init statement variables are scoped to the loop",
      "Condition is checked before each iteration (pre-test loop)",
      "Post statement runs after each iteration body",
      "Break exits the loop; continue skips to the next iteration",
      "Nested loops are allowed but should be kept shallow"
    ],
    codeExamples: [
      {
        title: "For Loop Patterns",
        description: "Common for loop patterns and idiomatic usage",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Using range when you need the index for modification',
          '    nums := []int{1, 2, 3, 4, 5}',
          '    for _, v := range nums {',
          '        // Can\'t modify the slice element here!',
          '        // v is a copy, not a reference',
          '        fmt.Println(v)',
          '    }',
          '',
          '    // Infinite loop without clear exit',
          '    for {',
          '        fmt.Println("forever")',
          '        // No break or return — infinite!',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Classic for with init, condition, post',
          '    for i := 0; i < 10; i++ {',
          '        fmt.Println(i)',
          '    }',
          '',
          '    // For with multiple variables',
          '    for i, j := 0, 10; i < j; i, j = i+1, j-1 {',
          '        fmt.Println(i, j)',
          '    }',
          '',
          '    // Modifying slice by index when needed',
          '    nums := []int{1, 2, 3, 4, 5}',
          '    for i := range nums {',
          '        nums[i] *= 2 // Modifies original slice',
          '    }',
          '',
          '    // Infinite loop with proper exit',
          '    for {',
          '        select {',
          '        case msg := <-ch:',
          '            process(msg)',
          '        case <-done:',
          '            return',
          '        }',
          '    }',
          '}',
          '',
          'var ch    = make(chan string)',
          'var done  = make(chan struct{})',
          'func process(s string) { fmt.Println(s) }',
        ].join('\n'),
        explanation: "The classic for loop is the most common form. Use i, j := start, end with both advancing to process two pointers. When you need to modify slice elements, use index-based iteration (for i := range nums). Always have a clear exit condition in infinite loops."
      }
    ],
    bestPractices: [
      "Use the simplest loop form that fits your use case",
      "Initialize loop variables in the init statement when possible",
      "Use index-based iteration when you need to modify elements",
      "Keep loop variables scoped to the loop with init statements",
      "Use labeled breaks for nested loops when needed"
    ],
    commonMistakes: [
      "Off-by-one errors in loop bounds",
      "Using the wrong variable in the post statement",
      "Not scoping variables properly (declaring before the loop when init would work)",
      "Creating infinite loops without break/return conditions",
      "Using range when index-based access is needed for modification"
    ],
    relatedTopics: [
      "loops",
      "for-range",
      "break",
      "continue"
    ],
    externalResources: [
      { title: "Go Tour: For", url: "https://go.dev/tour/flowcontrol/1" },
      { title: "Effective Go: For", url: "https://go.dev/doc/effective_go#for" },
      { title: "Go by Example: For Loops", url: "https://gobyexample.com/for" }
    ]
  },

  "for-range": {
    slug: "for-range",
    title: "For Range",
    summary: "The for range construct iterates over slices, arrays, maps, strings, and channels with idiomatic patterns.",
    description: `The for range loop is one of Go's most versatile constructs. It iterates over elements of collections (slices, arrays, maps), the runes of a string, or the values received from a channel. For each iteration, it returns the index and value (or key and value for maps).

For slices and arrays, for range gives you both index and value. Use _ to ignore the index when you only need values. For maps, it returns key-value pairs. For strings, it iterates over runes (Unicode code points) with their byte positions. For channels, it receives values until the channel is closed.

A critical subtlety is that range gives you a copy of each value. Modifying the loop variable doesn't change the original collection. To modify elements, use index-based access with for i := range.`,
    keyPoints: [
      "for i, v := range slice: i is index, v is a copy of value",
      "for k, v := range map: k is key, v is value",
      "for i, r := range string: i is byte position, r is rune",
      "for v := range channel: receives values until channel is closed",
      "Use _ to ignore index or value: for _, v := range",
      "v is a copy — modifying it doesn't affect the original",
      "The loop variable is reused across iterations (be careful with pointers)"
    ],
    codeExamples: [
      {
        title: "For Range Patterns",
        description: "Proper range usage and common pitfalls",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Trying to modify value (only modifies the copy)',
          '    nums := []int{1, 2, 3, 4, 5}',
          '    for _, v := range nums {',
          '        v *= 2 // This doesn\'t modify nums!',
          '    }',
          '    fmt.Println(nums) // Still [1 2 3 4 5]',
          '',
          '    // Pointer trap with loop variable',
          '    results := []*int{}',
          '    for _, v := range []int{1, 2, 3} {',
          '        results = append(results, &v) // All point to same v!',
          '    }',
          '    for _, p := range results {',
          '        fmt.Print(*p, " ") // Prints 3 3 3, not 1 2 3',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Modify using index',
          '    nums := []int{1, 2, 3, 4, 5}',
          '    for i := range nums {',
          '        nums[i] *= 2 // Modifies original',
          '    }',
          '    fmt.Println(nums) // [2 4 6 8 10]',
          '',
          '    // Avoid pointer trap by capturing value',
          '    results := []*int{}',
          '    for _, v := range []int{1, 2, 3} {',
          '        v := v // Create new variable for each iteration',
          '        results = append(results, &v)',
          '    }',
          '    for _, p := range results {',
          '        fmt.Print(*p, " ") // Prints 1 2 3',
          '    }',
          '    fmt.Println()',
          '',
          '    // Iterate map',
          '    ages := map[string]int{"Alice": 30, "Bob": 25}',
          '    for name, age := range ages {',
          '        fmt.Printf("%s is %d\\n", name, age)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "When modifying collection elements, use index-based iteration: for i := range nums { nums[i] *= 2 }. The pointer trap occurs because the loop variable is reused — create a new variable inside the loop to capture each value. For maps, range gives key-value pairs in undefined order."
      }
    ],
    bestPractices: [
      "Use for i := range when you only need the index",
      "Use for _, v := range when you only need values",
      "Use index-based access (for i := range) to modify elements",
      "Capture loop variables before taking their address in goroutines",
      "Don't rely on map iteration order — it's deliberately randomized",
      "Use range to iterate strings for proper rune handling"
    ],
    commonMistakes: [
      "Modifying the loop value copy instead of the original element",
      "The pointer trap: taking address of loop variable in range",
      "Assuming map iteration order is consistent",
      "Using range on a nil slice (it works fine — zero iterations)",
      "Not handling the case where a channel might block during range"
    ],
    relatedTopics: [
      "for-loop",
      "slices",
      "maps",
      "strings"
    ],
    externalResources: [
      { title: "Go Tour: Range", url: "https://go.dev/tour/flowcontrol/6" },
      { title: "Effective Go: Range", url: "https://go.dev/doc/effective_go#range" },
      { title: "Go Blog: for range loop variable semantics", url: "https://go.dev/blog/range" }
    ]
  },

  "break": {
    slug: "break",
    title: "Break",
    summary: "The break statement exits the innermost for loop or switch/select statement immediately.",
    description: `The break statement in Go terminates the execution of the innermost enclosing for, switch, or select statement. In Go, break only applies to these three constructs — it doesn't work with if or other statements. When executed, control transfers to the statement immediately following the terminated construct.

For nested loops, you can use labeled breaks to exit an outer loop. A label is a name followed by a colon placed before the target loop statement. The break label syntax then exits that specific loop. This is cleaner than using flags or return statements to break out of nested loops.

In switch and select statements, break is implicit — each case breaks automatically. You rarely need explicit break in these constructs, but it's useful when you want to exit early from within a case body.`,
    keyPoints: [
      "Break exits the innermost for, switch, or select statement",
      "No break needed at end of switch/select cases (implicit)",
      "Labeled break exits an outer loop: break LabelName",
      "Labels must be defined on the for, switch, or select statement",
      "Break is useful for early exit in select and switch cases",
      "Go doesn't have goto-break like some other languages"
    ],
    codeExamples: [
      {
        title: "Break and Labeled Break",
        description: "Breaking out of loops and using labels for nested loops",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Searching in nested loops without labels',
          '    matrix := [][]int{{1, 2}, {3, 4}, {5, 6}}',
          '    found := false',
          '    for i := range matrix {',
          '        for j := range matrix[i] {',
          '            if matrix[i][j] == 4 {',
          '                fmt.Printf("Found at %d,%d\\n", i, j)',
          '                found = true',
          '                break // Only exits inner loop!',
          '            }',
          '        }',
          '        if found {',
          '            break // Need flag to exit outer loop',
          '        }',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Labeled break exits the outer loop directly',
          '    matrix := [][]int{{1, 2}, {3, 4}, {5, 6}}',
          '    search:',
          '    for i := range matrix {',
          '        for j := range matrix[i] {',
          '            if matrix[i][j] == 4 {',
          '                fmt.Printf("Found at %d,%d\\n", i, j)',
          '                break search',
          '            }',
          '        }',
          '    }',
          '',
          '    // Break in select for early exit',
          '    for {',
          '        select {',
          '        case msg := <-ch:',
          '            if msg == "stop" {',
          '                break // Only exits select',
          '            }',
          '            process(msg)',
          '        }',
          '    }',
          '}',
          '',
          'var ch = make(chan string)',
          'func process(s string) { fmt.Println(s) }',
        ].join('\n'),
        explanation: "Labeled break lets you exit any enclosing for loop directly, eliminating the need for flag variables. Place the label before the target loop and use break labelName. In select, break only exits the select — use a labeled for loop to exit the surrounding for loop from within select."
      }
    ],
    bestPractices: [
      "Use labeled break for nested loops instead of flag variables",
      "Keep labels descriptive but concise",
      "Use break to exit select early when processing conditions",
      "Prefer break over goto for loop exit control",
      "Remember that break in select only exits the select, not the for loop"
    ],
    commonMistakes: [
      "Using break in a select without a label when you want to exit the for loop",
      "Forgetting that break only exits the innermost loop/switch/select",
      "Using flag variables when labeled break would be cleaner",
      "Trying to break from an if statement (not supported in Go)"
    ],
    relatedTopics: [
      "continue",
      "for-loop",
      "loops"
    ],
    externalResources: [
      { title: "Go Tour: Break", url: "https://go.dev/tour/flowcontrol/6" },
      { title: "Effective Go: Break and Continue", url: "https://go.dev/doc/effective_go#break" },
      { title: "Go Spec: Break Statements", url: "https://go.dev/ref/spec#Break_statements" }
    ]
  },

  "continue": {
    slug: "continue",
    title: "Continue",
    summary: "The continue statement skips the current iteration and jumps to the next iteration of the innermost for loop.",
    description: `The continue statement in Go skips the remaining body of the current loop iteration and proceeds to the next iteration. Like break, continue only works with for loops. It goes to the post statement (if any) and then evaluates the condition again.

For backend engineers, continue is essential for filtering data, skipping invalid entries, and implementing clean iteration logic. Using continue early in a loop body reduces nesting by handling edge cases at the top and keeping the main logic at the lowest indentation level.

In a for range loop, continue skips to the next element. Combined with early continue for error conditions, this pattern keeps the happy path clearly visible in the code.`,
    keyPoints: [
      "Continue skips to the next iteration of the innermost for loop",
      "Only works with for loops — not with switch, select, or if",
      "Executes the post statement before the next condition check",
      "Use continue to handle error cases at the top of loop bodies",
      "Labeled continue works with nested for loops",
      "Reduces nesting by handling edge cases early"
    ],
    codeExamples: [
      {
        title: "Continue for Clean Loop Bodies",
        description: "Using continue to reduce nesting and improve readability",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    numbers := []int{1, -2, 3, -4, 5, 0}',
          '',
          '    // Deeply nested logic',
          '    for _, n := range numbers {',
          '        if n > 0 {',
          '            if n%2 == 0 {',
          '                fmt.Printf("%d is positive and even\\n", n)',
          '            } else {',
          '                fmt.Printf("%d is positive and odd\\n", n)',
          '            }',
          '        }',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    numbers := []int{1, -2, 3, -4, 5, 0}',
          '',
          '    // Continue reduces nesting',
          '    for _, n := range numbers {',
          '        if n <= 0 {',
          '            continue // Skip non-positive',
          '        }',
          '',
          '        // Happy path at lowest indentation',
          '        if n%2 == 0 {',
          '            fmt.Printf("%d is positive and even\\n", n)',
          '        } else {',
          '            fmt.Printf("%d is positive and odd\\n", n)',
          '        }',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Continue moves the edge case check to the top of the loop body, reducing nesting for the main logic. This pattern is called 'guard clause' or 'early continue' and is highly valued in Go codebases for its readability. The happy path stays at the lowest indentation level."
      }
    ],
    bestPractices: [
      "Use continue for guard clauses at the top of loop bodies",
      "Keep the happy path at the lowest indentation level",
      "Use labeled continue for nested loops when needed",
      "Combine with error checking for clean data processing loops",
      "Don't overuse continue — sometimes restructuring the loop is better"
    ],
    commonMistakes: [
      "Using continue in non-for contexts (not supported)",
      "Overusing continue when a simpler loop structure would work",
      "Forgetting that continue executes the post statement",
      "Not realizing labeled continue only works with for loops"
    ],
    relatedTopics: [
      "break",
      "for-loop",
      "loops"
    ],
    externalResources: [
      { title: "Go Tour: Continue", url: "https://go.dev/tour/flowcontrol/7" },
      { title: "Effective Go: Break and Continue", url: "https://go.dev/doc/effective_go#break" },
      { title: "Go Spec: Continue Statements", url: "https://go.dev/ref/spec#Continue_statements" }
    ]
  },

  "goto-discouraged": {
    slug: "goto-discouraged",
    title: "Goto (Discouraged)",
    summary: "Go has a goto statement but it's discouraged — use structured control flow instead.",
    description: `Go does include a goto statement, but it's explicitly discouraged by the Go community and rarely appears in well-written Go code. The goto statement transfers control to a labeled statement within the same function. Unlike C, Go's goto has restrictions: you cannot jump over variable declarations, and labels must be within the current function.

The primary use case where goto might be justified is in generated code or extremely performance-critical inner loops where breaking out of deeply nested logic is necessary. Even then, labeled break or early returns are usually better alternatives.

For backend engineers, understanding that goto exists but should be avoided is important for code reviews. If you encounter goto in legacy code or generated code, understand what it does, but don't introduce it in new code.`,
    keyPoints: [
      "goto exists in Go but is explicitly discouraged",
      "Cannot jump over variable declarations",
      "Labels must be within the same function",
      "Only useful in rare edge cases (generated code, deep cleanup)",
      "Prefer structured control flow: for, if, switch, break, return",
      "Labeled break and early returns handle most goto use cases",
      "The go vet tool flags problematic goto usage"
    ],
    codeExamples: [
      {
        title: "Goto vs Structured Alternatives",
        description: "Why goto is usually unnecessary and what to use instead",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func process(data []int) int {',
          '    // goto makes code hard to follow',
          '    for _, v := range data {',
          '        if v < 0 {',
          '            goto cleanup',
          '        }',
          '        if v > 100 {',
          '            goto cleanup',
          '        }',
          '        fmt.Println("processing", v)',
          '    }',
          'cleanup:',
          '    fmt.Println("cleanup done")',
          '    return 0',
          '}',
          '',
          'func main() { process([]int{1, 2, -1}) }',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func process(data []int) int {',
          '    // Early return is cleaner and more idiomatic',
          '    for _, v := range data {',
          '        if v < 0 || v > 100 {',
          '            fmt.Println("invalid value:", v)',
          '            return 1',
          '        }',
          '        fmt.Println("processing", v)',
          '    }',
          '    fmt.Println("cleanup done")',
          '    return 0',
          '}',
          '',
          'func main() { process([]int{1, 2, -1}) }',
        ].join('\n'),
        explanation: "Replace goto with early returns or structured control flow. Early returns are the most common alternative — they make the exit conditions explicit and the happy path clear. Labeled break works for exiting nested loops. defer handles cleanup. goto is almost never the right choice."
      }
    ],
    bestPractices: [
      "Avoid goto in new code — use structured control flow instead",
      "Use early returns for error handling and early exits",
      "Use labeled break for exiting nested loops",
      "Use defer for cleanup operations",
      "If you encounter goto in code review, suggest refactoring"
    ],
    commonMistakes: [
      "Using goto when a simple return or break would suffice",
      "Creating spaghetti code with complex goto patterns",
      "Jumping over variable declarations (compile error)",
      "Using goto for cleanup instead of defer",
      "Not realizing goto is a red flag in code reviews"
    ],
    relatedTopics: [
      "break",
      "continue",
      "conditionals"
    ],
    externalResources: [
      { title: "Go Spec: Goto Statements", url: "https://go.dev/ref/spec#Goto_statements" },
      { title: "Effective Go: Goto", url: "https://go.dev/doc/effective_go#goto" },
      { title: "Go Blog: Code Review Comments", url: "https://github.com/golang/go/wiki/CodeReviewComments" }
    ]
  },

  "functions-basics": {
    slug: "functions-basics",
    title: "Functions Basics",
    summary: "Functions in Go are first-class citizens with clear syntax, mandatory braces, and no default parameters.",
    description: `Functions in Go are declared with the func keyword, followed by the function name, parameters, return type, and body. Go functions have several distinctive features: they always use explicit parameters (no default values), they can return multiple values, and they are first-class values that can be assigned to variables and passed as arguments.

Go functions are block-scoped and follow a simple, consistent syntax. Parameters are passed by value by default (copies of the original data), though you can pass pointers for reference semantics. The function body must always be enclosed in braces, and Go enforces this style consistently.

For backend engineers, functions are the building blocks of every Go program. Understanding function syntax, parameter passing, and return values is fundamental to writing idiomatic Go. Functions in Go are also closures — they capture variables from their enclosing scope, which enables powerful patterns for callbacks and state management.`,
    keyPoints: [
      "Functions are declared with func keyword",
      "No default parameter values — use variadic or options pattern instead",
      "Always use braces for function body (even single-line functions)",
      "Parameters are passed by value (copies), not by reference",
      "Functions are first-class values — can be assigned and passed",
      "Functions can return multiple values (idiomatic for error handling)",
      "Recursive functions work the same as in other languages"
    ],
    codeExamples: [
      {
        title: "Function Declaration and Usage",
        description: "Basic function patterns and parameter passing",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Missing return type',
          '// func add(a, b int) { return a + b }  // COMPILE ERROR',
          '',
          '// Trying to use default parameters (not supported)',
          '// func greet(name string = "World") { }  // COMPILE ERROR',
          '',
          '// Single-line function without braces (not allowed)',
          '// func double(x int) int { return x * 2 } // this actually works',
          '',
          'func main() {',
          '    result := add(1, 2)',
          '    fmt.Println(result)',
          '}',
          '',
          'func add(a, b int) int {',
          '    return a + b',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Named parameters for clarity',
          'func add(a, b int) int {',
          '    return a + b',
          '}',
          '',
          '// Multiple return values (idiomatic)',
          'func divide(a, b float64) (float64, error) {',
          '    if b == 0 {',
          '        return 0, fmt.Errorf("division by zero")',
          '    }',
          '    return a / b, nil',
          '}',
          '',
          '// Functions as values',
          'func apply(f func(int, int) int, a, b int) int {',
          '    return f(a, b)',
          '}',
          '',
          'func main() {',
          '    result := add(1, 2)',
          '    fmt.Println(result)',
          '',
          '    // Pass function as argument',
          '    sum := apply(add, 3, 4)',
          '    fmt.Println(sum)',
          '',
          '    // Anonymous function',
          '    mul := func(a, b int) int { return a * b }',
          '    fmt.Println(apply(mul, 3, 4))',
          '}',
        ].join('\n'),
        explanation: "Functions always require explicit types — no defaults. Multiple return values are idiomatic in Go, especially for error handling. Functions are first-class values that can be passed as arguments and assigned to variables. Anonymous functions (closures) are commonly used for callbacks."
      }
    ],
    bestPractices: [
      "Keep functions short and focused on a single responsibility",
      "Use named return values for documentation purposes",
      "Return errors as the last return value",
      "Use early returns to avoid deep nesting",
      "Prefer small functions over large monolithic ones"
    ],
    commonMistakes: [
      "Trying to use default parameter values (not supported in Go)",
      "Writing functions that are too long and do too many things",
      "Not handling returned errors (the #1 Go mistake)",
      "Using named returns when they hurt clarity",
      "Passing large structs by value when pointers would be more efficient"
    ],
    relatedTopics: [
      "functions",
      "multiple-return-values",
      "named-return-values"
    ],
    externalResources: [
      { title: "Go Tour: Functions", url: "https://go.dev/tour/basics/5" },
      { title: "Effective Go: Functions", url: "https://go.dev/doc/effective_go#functions" },
      { title: "Go by Example: Functions", url: "https://gobyexample.com/functions" }
    ]
  },

  "functions": {
    slug: "functions",
    title: "Functions",
    summary: "Go functions support multiple return values, named returns, variadic parameters, and closures.",
    description: `Functions are central to Go programming. Unlike many languages, Go functions can return multiple values, which is primarily used for the idiomatic error handling pattern where the last return value is an error. This eliminates the need for try-catch exception handling and makes error paths explicit in the code.

Go functions support several advanced features: variadic parameters (...type) for accepting variable numbers of arguments, named return values for documentation and naked returns, and closures for capturing variables from the enclosing scope. The defer keyword allows you to schedule function calls for when the surrounding function returns, which is essential for cleanup operations like closing files and unlocking mutexes.

For backend engineers, understanding Go's function semantics is crucial for writing efficient code. Since parameters are passed by value, passing large structs creates copies. Use pointers for large data structures to avoid unnecessary memory allocation. The Go compiler can sometimes optimize this, but it's better to be explicit about your intent.`,
    keyPoints: [
      "Multiple return values enable idiomatic error handling",
      "Variadic parameters (...type) accept variable argument counts",
      "Named return values provide documentation and enable naked returns",
      "Closures capture variables from enclosing scope",
      "defer schedules function calls for when the function returns",
      "Functions are first-class values — they can be assigned and passed",
      "Parameters are passed by value; use pointers for reference semantics"
    ],
    codeExamples: [
      {
        title: "Function Features",
        description: "Multiple returns, variadic, and closures in practice",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Ignoring errors (terrible practice)',
          'func readFile(path string) string {',
          '    data, _ := os.ReadFile(path) // Ignored error!',
          '    return string(data)',
          '}',
          '',
          '// Using global state instead of closures',
          'var counter = 0',
          'func increment() { counter++ }',
          '',
          'func main() {',
          '    increment()',
          '    fmt.Println(counter)',
          '}',
          '',
          'var os = struct{ ReadFile func(string) ([]byte, error) }{',
          '    ReadFile: func(s string) ([]byte, error) { return nil, nil },',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Multiple return values for error handling',
          'func readFile(path string) (string, error) {',
          '    data, err := os.ReadFile(path)',
          '    if err != nil {',
          '        return "", fmt.Errorf("read %s: %w", path, err)',
          '    }',
          '    return string(data), nil',
          '}',
          '',
          '// Closure for state management',
          'func newCounter() func() int {',
          '    count := 0',
          '    return func() int {',
          '        count++',
          '        return count',
          '    }',
          '}',
          '',
          'func main() {',
          '    counter := newCounter()',
          '    fmt.Println(counter()) // 1',
          '    fmt.Println(counter()) // 2',
          '}',
          '',
          'var os = struct{ ReadFile func(string) ([]byte, error) }{',
          '    ReadFile: func(s string) ([]byte, error) { return nil, nil },',
          '}',
        ].join('\n'),
        explanation: "Always handle errors — never ignore them with _. Closures encapsulate state without globals, making code more testable and reusable. Multiple return values make error handling explicit and idiomatic. The newCounter pattern demonstrates how closures manage private state."
      }
    ],
    bestPractices: [
      "Always handle errors returned by functions",
      "Use closures instead of global variables for state management",
      "Keep function signatures clean — use named types for complex parameters",
      "Use defer for cleanup operations (close, unlock, disconnect)",
      "Write pure functions when possible — easier to test and reason about"
    ],
    commonMistakes: [
      "Ignoring returned errors with _ (the most common Go mistake)",
      "Using naked returns in long functions (hurts readability)",
      "Not using defer for cleanup, leading to resource leaks",
      "Using global variables instead of closures for state",
      "Passing large structs by value when pointers would be more efficient"
    ],
    relatedTopics: [
      "functions-basics",
      "multiple-return-values",
      "named-return-values",
      "closures"
    ],
    externalResources: [
      { title: "Go Tour: Functions", url: "https://go.dev/tour/basics/5" },
      { title: "Effective Go: Functions", url: "https://go.dev/doc/effective_go#functions" },
      { title: "Go Blog: Defer, Panic, and Recover", url: "https://go.dev/blog/defer-panic-and-recover" }
    ]
  },

  "multiple-return-values": {
    slug: "multiple-return-values",
    title: "Multiple Return Values",
    summary: "Go functions can return multiple values, enabling idiomatic error handling and tuple-like patterns.",
    description: `Multiple return values are one of Go's most distinctive features. The primary use case is the idiomatic error handling pattern where functions return (result, error). This makes error handling explicit at every call site — you can't accidentally ignore an error without using the blank identifier _.

Beyond error handling, multiple return values are useful for returning computed values along with metadata (like a map lookup returning both the value and whether it exists), for providing success/failure indicators, and for returning both a result and a continuation token for pagination.

For backend engineers, the (result, error) pattern is fundamental. Every database query, HTTP request, file operation, and external service call returns an error as the last value. Learning to handle these consistently is essential for writing reliable Go code.`,
    keyPoints: [
      "Functions can return any number of values",
      "The (result, error) pattern is the standard for error handling",
      "Error is always the last return value by convention",
      "Use blank identifier _ to intentionally ignore a return value",
      "Multiple returns are stack-allocated (no heap allocation for returns)",
      "Named returns document what each value represents",
      "Use comma-ok pattern for map lookups: value, ok := m[key]"
    ],
    codeExamples: [
      {
        title: "Multiple Return Values in Practice",
        description: "Error handling and tuple-like returns",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Single return forces awkward error handling',
          'func divide(a, b int) int {',
          '    if b == 0 {',
          '        return 0 // Caller can\'t distinguish error from result',
          '    }',
          '    return a / b',
          '}',
          '',
          'func main() {',
          '    result := divide(10, 0)',
          '    fmt.Println(result) // 0 — is this an error or real result?',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "math"',
          ')',
          '',
          '// Multiple return values for error handling',
          'func divide(a, b float64) (float64, error) {',
          '    if b == 0 {',
          '        return 0, fmt.Errorf("division by zero")',
          '    }',
          '    return a / b, nil',
          '}',
          '',
          '// Tuple-like returns for map lookups',
          'func getFirst(m map[string]int) (int, bool) {',
          '    for k, v := range m {',
          '        _ = k',
          '        return v, true',
          '    }',
          '    return 0, false',
          '}',
          '',
          'func main() {',
          '    result, err := divide(10, 3)',
          '    if err != nil {',
          '        fmt.Println("error:", err)',
          '        return',
          '    }',
          '    fmt.Printf("%.2f\\n", result)',
          '',
          '    m := map[string]int{"a": 1, "b": 2}',
          '    if val, ok := getFirst(m); ok {',
          '        fmt.Println("found:", val)',
          '    }',
          '}',
          '',
          'var math = struct{ NaN func() float64 }{',
          '    NaN: func() float64 { return 0 },',
          '}',
        ].join('\n'),
        explanation: "Multiple return values make error handling explicit — the caller must handle both values or use _ to ignore one. The (value, ok) pattern is standard for lookups. This approach eliminates ambiguity: the caller always knows if an operation succeeded."
      }
    ],
    bestPractices: [
      "Return error as the last value in the return list",
      "Always check returned errors — never silently ignore them",
      "Use named returns when the purpose of values isn't obvious",
      "Use blank identifier _ only when you intentionally don't need the value",
      "Keep return lists short — 3 is usually the maximum"
    ],
    commonMistakes: [
      "Ignoring returned errors (the most common Go bug)",
      "Returning too many values (consider using a struct instead)",
      "Not wrapping errors with context for debugging",
      "Using named returns when they reduce clarity",
      "Forgetting that error is nil on success (no need to check error value)"
    ],
    relatedTopics: [
      "named-return-values",
      "functions",
      "functions-basics"
    ],
    externalResources: [
      { title: "Go Tour: Multiple Return Values", url: "https://go.dev/tour/basics/7" },
      { title: "Effective Go: Multiple Return Values", url: "https://go.dev/doc/effective_go#multiple-returns" },
      { title: "Go Blog: Error Handling", url: "https://go.dev/blog/go1.13-errors" }
    ]
  },

  "named-return-values": {
    slug: "named-return-values",
    title: "Named Return Values",
    summary: "Go allows naming return values, which acts as documentation and enables naked return statements.",
    description: `Named return values in Go declare the return types with variable names that are initialized to their zero values when the function is entered. These names serve as documentation and allow the use of naked return statements, which return the current values of the named returns without explicit arguments.

Named returns are particularly useful for documentation purposes when the function signature has multiple return values and the purpose of each isn't immediately clear. They can also simplify error handling patterns where the function sets named error variables and returns at the end.

However, naked returns (return without arguments) are controversial. In short functions, they reduce clarity because you can't see what's being returned without reading the function body. The Go community generally recommends using naked returns only in short functions and being explicit with return values in longer functions.`,
    keyPoints: [
      "Named returns declare return variables that are zero-initialized",
      "Naked return statements return current values of named returns",
      "Named returns document the purpose of return values",
      "Use naked returns only in short functions (under 10 lines)",
      "Named returns create new variables in the function scope",
      "defer can modify named return values before the function returns",
      "Named returns combined with defer enable powerful patterns"
    ],
    codeExamples: [
      {
        title: "Named Returns and Naked Returns",
        description: "When named returns help and when they hurt",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Naked returns in a long function (hurts readability)',
          'func process(data []int) (sum int, count int, err error) {',
          '    for _, v := range data {',
          '        if v < 0 {',
          '            err = fmt.Errorf("negative value: %d", v)',
          '            return // What values are being returned?',
          '        }',
          '        if v > 1000 {',
          '            err = fmt.Errorf("value too large: %d", v)',
          '            return // Need to read the function to know',
          '        }',
          '        sum += v',
          '        count++',
          '    }',
          '    return // Still unclear',
          '}',
          '',
          'func main() {',
          '    s, c, e := process([]int{1, 2, 3})',
          '    fmt.Println(s, c, e)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Named returns with explicit returns (clearer)',
          'func process(data []int) (int, int, error) {',
          '    sum := 0',
          '    count := 0',
          '    for _, v := range data {',
          '        if v < 0 {',
          '            return 0, 0, fmt.Errorf("negative value: %d", v)',
          '        }',
          '        if v > 1000 {',
          '            return 0, 0, fmt.Errorf("value too large: %d", v)',
          '        }',
          '        sum += v',
          '        count++',
          '    }',
          '    return sum, count, nil',
          '}',
          '',
          '// Named returns good for: short functions, defer patterns',
          'func divide(a, b float64) (result float64, err error) {',
          '    if b == 0 {',
          '        err = fmt.Errorf("division by zero")',
          '        return',
          '    }',
          '    result = a / b',
          '    return',
          '}',
          '',
          'func main() {',
          '    s, c, e := process([]int{1, 2, 3})',
          '    fmt.Println(s, c, e)',
          '    r, err := divide(10, 3)',
          '    fmt.Println(r, err)',
          '}',
        ].join('\n'),
        explanation: "In long functions, explicit return values (return sum, count, nil) are clearer than naked returns. Named returns shine in short functions and when used with defer (which can modify return values). The general rule: use named returns when they add clarity, use explicit returns when the function is long."
      }
    ],
    bestPractices: [
      "Use explicit returns in functions longer than 10 lines",
      "Use named returns when the purpose of values isn't obvious from types",
      "Named returns are useful with defer for modifying return values",
      "Document named returns in the function's doc comment",
      "Don't use naked returns if they require reading the function body"
    ],
    commonMistakes: [
      "Using naked returns in long functions where they reduce clarity",
      "Assuming named returns are different from regular variables",
      "Forgetting that defer can modify named return values",
      "Using named returns when simple types are self-documenting",
      "Not understanding that named returns create new variables in scope"
    ],
    relatedTopics: [
      "multiple-return-values",
      "functions",
      "functions-basics"
    ],
    externalResources: [
      { title: "Effective Go: Named Return Values", url: "https://go.dev/doc/effective_go#named-results" },
      { title: "Go Tour: Named Returns", url: "https://go.dev/tour/basics/8" },
      { title: "Go Spec: Function Declarations", url: "https://go.dev/ref/spec#Function_declarations" }
    ]
  },

  "variadic-functions": {
    slug: "variadic-functions",
    title: "Variadic Functions",
    summary: "Go functions can accept a variable number of arguments using the ...Type parameter syntax.",
    description: `Variadic functions in Go accept a variable number of arguments of the same type. The variadic parameter is declared with ... before the type, and inside the function it behaves as a slice. You can pass individual values, slices (with the spread operator ...), or a mix of both.

The fmt.Println, fmt.Printf, and many standard library functions use variadic parameters. The spread operator ... unpacks a slice into individual arguments when calling a variadic function. This is similar to ... in JavaScript or *args in Python.

For backend engineers, variadic functions are common in logging, configuration, and utility functions. The log and fmt packages make extensive use of them. When designing your own variadic functions, remember that the variadic parameter must be the last parameter.`,
    keyPoints: [
      "Variadic parameter must be the last parameter in the function",
      "Inside the function, the variadic parameter is a slice",
      "Use ... to spread a slice into individual arguments",
      "Can mix individual arguments and spread slices",
      "At most one variadic parameter per function",
      "fmt.Println, fmt.Printf, and append are variadic functions",
      "Empty variadic call is valid: f() for f(...int)"
    ],
    codeExamples: [
      {
        title: "Variadic Function Usage",
        description: "Creating and using variadic functions effectively",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Using slices when variadics would be cleaner',
          'func sum(nums []int) int {',
          '    total := 0',
          '    for _, n := range nums {',
          '        total += n',
          '    }',
          '    return total',
          '}',
          '',
          'func main() {',
          '    // Must create a slice even for simple calls',
          '    total := sum([]int{1, 2, 3, 4, 5})',
          '    fmt.Println(total)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Variadic function — accepts any number of ints',
          'func sum(nums ...int) int {',
          '    total := 0',
          '    for _, n := range nums {',
          '        total += n',
          '    }',
          '    return total',
          '}',
          '',
          '// Variadic with other parameters',
          'func logf(level string, parts ...interface{}) {',
          '    fmt.Printf("[%s] ", level)',
          '    fmt.Println(parts...)',
          '}',
          '',
          'func main() {',
          '    // Individual arguments',
          '    total := sum(1, 2, 3, 4, 5)',
          '    fmt.Println(total)',
          '',
          '    // Spread a slice',
          '    nums := []int{10, 20, 30}',
          '    total = sum(nums...)',
          '    fmt.Println(total)',
          '',
          '    // Mixed',
          '    total = sum(1, nums...)',
          '    fmt.Println(total)',
          '',
          '    logf("INFO", "server started on port", 8080)',
          '}',
        ].join('\n'),
        explanation: "Variadic functions accept any number of arguments without forcing callers to create slices. The ...spread operator unpacks slices into individual arguments. Inside the variadic function, the parameter is just a slice. Use variadics for utility functions, logging, and any function that naturally accepts variable inputs."
      }
    ],
    bestPractices: [
      "Use variadic parameters for functions that naturally accept variable inputs",
      "Keep variadic parameters as the last parameter",
      "Use the ...spread operator to pass slices to variadic functions",
      "Consider both variadic and slice-based signatures for public APIs",
      "Use interface{} sparingly in variadic parameters (prefer specific types)"
    ],
    commonMistakes: [
      "Placing the variadic parameter before other parameters (compile error)",
      "Forgetting to use ... when spreading slices",
      "Using interface{} in variadic params when a more specific type would be better",
      "Not realizing the variadic parameter is a slice (len, append work on it)",
      "Creating unnecessary slice allocations when variadics would be simpler"
    ],
    relatedTopics: [
      "functions",
      "functions-basics",
      "slices"
    ],
    externalResources: [
      { title: "Go Tour: Variadic Functions", url: "https://go.dev/tour/basics/10" },
      { title: "Effective Go: Variadic Functions", url: "https://go.dev/doc/effective_go#variadic" },
      { title: "Go by Example: Variadic Functions", url: "https://gobyexample.com/variadic-functions" }
    ]
  },

  "anonymous-functions": {
    slug: "anonymous-functions",
    title: "Anonymous Functions",
    summary: "Go supports anonymous functions (lambdas) that can be immediately invoked or assigned to variables.",
    description: `Anonymous functions in Go are functions without a name, defined using the func keyword followed by the parameter list, optional return type, and body. They can be assigned to variables, passed as arguments, returned from other functions, or immediately invoked (IIFE pattern).

In Go, anonymous functions are closures — they capture variables from the surrounding scope. This makes them powerful for creating callbacks, handlers, and functions that need access to state from their enclosing context. The HTTP handler pattern in Go heavily relies on closures for dependency injection.

Anonymous functions are commonly used in goroutines, test setup, HTTP middleware, and any place where a small, self-contained piece of logic needs to be passed as a value.`,
    keyPoints: [
      "Anonymous functions have no name and are defined inline",
      "Can be assigned to variables: f := func() { }",
      "Can be immediately invoked: func() { }()",
      "Are closures — capture variables from enclosing scope",
      "Common in goroutines, HTTP handlers, and callbacks",
      "The HTTP handler pattern uses closures for dependency injection",
      "func keyword starts the anonymous function definition"
    ],
    codeExamples: [
      {
        title: "Anonymous Functions and Closures",
        description: "Using anonymous functions for callbacks, goroutines, and IIFE",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          '// Named function for simple one-off logic (verbose)',
          'func main() {',
          '    // Using a named function for a simple callback',
          '    processItem(handleItem)',
          '}',
          '',
          'func handleItem(item int) {',
          '    fmt.Println("item:", item)',
          '}',
          '',
          'func processItem(f func(int)) { f(42) }',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Assign anonymous function to variable',
          '    double := func(x int) int {',
          '        return x * 2',
          '    }',
          '    fmt.Println(double(5)) // 10',
          '',
          '    // Immediately invoked function expression (IIFE)',
          '    result := func() string {',
          '        return "computed"',
          '    }()',
          '    fmt.Println(result)',
          '',
          '    // Anonymous function in goroutine',
          '    go func(msg string) {',
          '        fmt.Println(msg)',
          '    }("hello")',
          '',
          '    // HTTP handler pattern',
          '    handler := makeHandler("api/v1")',
          '    handler()',
          '}',
          '',
          'func makeHandler(prefix string) func() {',
          '    return func() {',
          '        fmt.Println("handling request for", prefix)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Anonymous functions are ideal for short, one-off logic. Assign them to variables when you'll reuse them. IIFEs execute immediately and are useful for initialization. Goroutines with anonymous functions are common for concurrent tasks. Closures capture variables from the enclosing scope, enabling patterns like the HTTP handler."
      }
    ],
    bestPractices: [
      "Use anonymous functions for short, one-off logic",
      "Use named functions when the logic is complex or reusable",
      "Be careful with closures in goroutines — they capture variables by reference",
      "Use IIFEs for initialization logic that needs local variables",
      "Name the anonymous function variable for clarity: handler := func() { }"
    ],
    commonMistakes: [
      "Capturing loop variables in closures (classic gotcha)",
      "Making anonymous functions too complex (use named functions instead)",
      "Forgetting that goroutine closures capture variables by reference",
      "Not realizing anonymous functions allocate on the heap (closure capture)",
      "Using anonymous functions when a named function would be more readable"
    ],
    relatedTopics: [
      "closures",
      "functions",
      "scope-and-shadowing"
    ],
    externalResources: [
      { title: "Go Tour: Functions as Values", url: "https://go.dev/tour/func-types/1" },
      { title: "Effective Go: Function Values", url: "https://go.dev/doc/effective_go#function-literals" },
      { title: "Go by Example: Closures", url: "https://gobyexample.com/closures" }
    ]
  },

  "closures": {
    slug: "closures",
    title: "Closures",
    summary: "Go closures capture variables from their enclosing scope, enabling powerful state management patterns.",
    description: `A closure is a function value that references variables from outside its own body. The function may access and assign to the referenced variables, and the variables are shared between the closure and the enclosing scope, meaning the closure's modifications are visible outside it.

In Go, all functions are closures. When an anonymous function references a variable from an outer scope, it captures a reference to that variable. This enables patterns like counters, generators, middleware chains, and encapsulated state. The captured variables live as long as the closure exists.

For backend engineers, closures are fundamental to Go's concurrency patterns, HTTP middleware, test fixtures, and configuration. Understanding closure semantics — especially variable capture — is crucial for avoiding subtle bugs, particularly when closures are used in goroutines or loops.`,
    keyPoints: [
      "Closures capture variables by reference, not by value",
      "Captured variables live as long as the closure exists",
      "Multiple closures can share the same captured variables",
      "Closures in goroutines capture variables that may change during execution",
      "Closures are commonly used for middleware, callbacks, and state",
      "The loop variable capture in goroutines is a classic pitfall",
      "Closures can be returned from functions to create factories"
    ],
    codeExamples: [
      {
        title: "Closure Variable Capture",
        description: "How closures capture variables and common pitfalls",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Classic loop variable capture bug',
          '    funcs := make([]func(), 5)',
          '    for i := 0; i < 5; i++ {',
          '        funcs[i] = func() {',
          '            fmt.Println(i) // All print 5!',
          '        }',
          '    }',
          '    for _, f := range funcs {',
          '        f() // 5 5 5 5 5 (not 0 1 2 3 4)',
          '    }',
          '',
          '    // Unexpected mutation',
          '    counter := 0',
          '    increment := func() { counter++ }',
          '    increment()',
          '    increment()',
          '    // counter is now 2, but might surprise callers',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Fix: capture value in each iteration',
          '    funcs := make([]func(), 5)',
          '    for i := 0; i < 5; i++ {',
          '        i := i // Create new variable for this iteration',
          '        funcs[i] = func() {',
          '            fmt.Println(i) // Correct: 0 1 2 3 4',
          '        }',
          '    }',
          '    for _, f := range funcs {',
          '        f()',
          '    }',
          '',
          '    // Encapsulated state with closure',
          '    counter := newCounter()',
          '    counter.increment()',
          '    counter.increment()',
          '    fmt.Println(counter.value()) // 2',
          '}',
          '',
          'type counter struct {',
          '    n int',
          '}',
          '',
          'func newCounter() *counter {',
          '    c := &counter{}',
          '    return c',
          '}',
          '',
          'func (c *counter) increment() { c.n++ }',
          'func (c *counter) value() int     { return c.n }',
        ].join('\n'),
        explanation: "The classic loop closure bug: all closures share the same loop variable. Fix by creating a new variable in each iteration (i := i). For state management, use a struct or return closures from a factory function. Closure-captured variables are shared by reference — mutations are visible to all holders."
      }
    ],
    bestPractices: [
      "Be aware of loop variable capture in goroutines and closures",
      "Capture loop variables by creating new variables: v := v",
      "Use factory functions to create independent closure instances",
      "Keep closures short — if complex, use a named function",
      "Document closure behavior when they capture mutable state"
    ],
    commonMistakes: [
      "Loop variable capture: all closures share the same loop variable",
      "Capturing variables in goroutines that change before goroutine runs",
      "Creating closures that hold references to large objects (memory leak)",
      "Not understanding that closures capture by reference, not by value",
      "Using closures instead of methods when methods would be clearer"
    ],
    relatedTopics: [
      "anonymous-functions",
      "scope-and-shadowing",
      "functions"
    ],
    externalResources: [
      { title: "Effective Go: Closures", url: "https://go.dev/doc/effective_go#closures" },
      { title: "Go Blog: Loop Variable Semantics", url: "https://go.dev/blog/loopvar" },
      { title: "Go by Example: Closures", url: "https://gobyexample.com/closures" }
    ]
  },

  "scope-and-shadowing": {
    slug: "scope-and-shadowing",
    title: "Scope and Shadowing",
    summary: "Go has lexical scoping; variables declared in inner blocks can shadow outer variables with the same name.",
    description: `Go uses lexical (static) scoping — a variable's scope extends from its declaration to the end of the innermost enclosing block. Each if, for, switch, and function body creates a new scope. Variables declared in inner scopes can shadow (hide) variables with the same name from outer scopes.

Shadowing is one of the most subtle sources of bugs in Go. When you use := inside an if or for block, if any variable on the left side already exists in the outer scope, Go creates a new variable in the inner scope. The outer variable remains unchanged, which can be very confusing.

For backend engineers, understanding scope is crucial for writing correct concurrent code, managing variable lifetimes, and avoiding subtle bugs. The Go compiler's vet tool can catch some shadowing issues, but developers need to be aware of the pattern to avoid it.`,
    keyPoints: [
      "Lexical scoping: variable scope extends to the end of its enclosing block",
      "Each { } creates a new scope (if, for, switch, function body)",
      ":= in inner scope can shadow outer variables with the same name",
      "Package-level scope includes all files in the package",
      "Variables declared with var at package level are visible to all files",
      ":= creates new variables in the current scope, even if same name exists outside",
      "go vet can detect some shadowing issues"
    ],
    codeExamples: [
      {
        title: "Variable Shadowing Pitfalls",
        description: "How shadowing creates bugs and how to avoid them",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    x := 10',
          '    fmt.Println(x) // 10',
          '',
          '    if true {',
          '        x := 20  // Shadows outer x!',
          '        fmt.Println(x) // 20',
          '    }',
          '',
          '    fmt.Println(x) // Still 10 — outer x unchanged',
          '',
          '    // Common mistake with error handling',
          '    var err error',
          '    if true {',
          '        result, err := doWork() // err is NEW variable',
          '        fmt.Println(result)',
          '        _ = err',
          '    }',
          '    // Outer err is still nil!',
          '    if err != nil {',
          '        // This will never execute',
          '        fmt.Println("error:", err)',
          '    }',
          '}',
          '',
          'func doWork() (string, error) { return "ok", fmt.Errorf("fail") }',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    x := 10',
          '    fmt.Println(x) // 10',
          '',
          '    // Use = to reassign instead of := to avoid shadowing',
          '    if true {',
          '        x = 20',
          '        fmt.Println(x) // 20',
          '    }',
          '    fmt.Println(x) // 20 — same variable modified',
          '',
          '    // Proper error handling without shadowing',
          '    var err error',
          '    if true {',
          '        var result string',
          '        result, err = doWork() // Use = to assign to outer err',
          '        fmt.Println(result)',
          '    }',
          '    if err != nil {',
          '        fmt.Println("error:", err)',
          '    }',
          '}',
          '',
          'func doWork() (string, error) { return "ok", fmt.Errorf("fail") }',
        ].join('\n'),
        explanation: "Use = to reassign outer variables instead of := which creates new ones. In error handling, declare the result variable separately and use = to assign both values. This keeps the outer error variable accessible. Running go vet or golangci-lint with shadow detector helps catch these issues."
      }
    ],
    bestPractices: [
      "Use = to reassign variables instead of := when you want to modify the outer variable",
      "Run go vet and golangci-lint to detect shadowing issues",
      "Use different variable names in inner scopes to avoid confusion",
      "Be careful with := in if/for blocks — check if any variable already exists outside",
      "Declare variables close to where they're used for smaller scope"
    ],
    commonMistakes: [
      "Using := inside a block when = would modify the outer variable",
      "Not realizing error variables get shadowed in nested blocks",
      "Declaring variables at the top of a function when they're only needed in one block",
      "Using the same variable name in inner and outer scopes",
      "Not running go vet to catch shadowing issues"
    ],
    relatedTopics: [
      "var-vs",
      "variables--constants",
      "closures"
    ],
    externalResources: [
      { title: "Effective Go: Scope", url: "https://go.dev/doc/effective_go#scope" },
      { title: "Go Blog: Scope of Variables", url: "https://go.dev/doc/effective_go#variables" },
      { title: "shadow checker", url: "https://github.com/kisielk/shadow" }
    ]
  },

  "package-import-rules": {
    slug: "package-import-rules",
    title: "Package Import Rules",
    summary: "Go enforces strict import rules: packages must be used, imports are grouped, and blank imports serve special purposes.",
    description: `Go's import system has several enforced rules that keep code clean and dependencies explicit. The most fundamental rule is that every imported package must be used — unused imports cause a compilation error. This prevents dead dependencies from cluttering your code and ensures that the dependency graph accurately reflects what the code actually needs.

The blank identifier _ can be used to import a package for its side effects only, such as registering a database driver or an image decoder. This is the standard mechanism for plugin-style registration in Go. For example, importing _ "github.com/lib/pq" registers the PostgreSQL driver with database/sql without directly referencing it.

Import paths are resolved using Go modules. The import declaration groups follow convention: standard library imports first, then a blank line, then third-party packages. Tools like goimports automate this grouping. Relative imports are not supported in module mode — all imports must use module paths.`,
    keyPoints: [
      "Unused imports cause compilation errors — every import must be used",
      "Blank import _ imports for side effects only (driver registration, etc.)",
      "Import paths are resolved via Go modules",
      "Group imports: standard library first, then third-party",
      "Aliases are used to resolve import path conflicts",
      "Dot imports (import . \"pkg\") bring exports into the current namespace (discouraged)",
      "Cyclic imports between packages are not allowed"
    ],
    codeExamples: [
      {
        title: "Import Rules and Patterns",
        description: "Proper import usage including blank imports and grouping",
        bad: [
          'package main',
          '',
          '// Unused import — won\'t compile',
          'import (',
          '    "fmt"',
          '    "os"    // unused!',
          '    "math"',
          ')',
          '',
          'func main() {',
          '    fmt.Println("hello")',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    // Standard library',
          '    "fmt"',
          '    "math"',
          '',
          '    // Third-party packages',
          '    "github.com/lib/pq"',
          '',
          '    // Blank import for side effects (driver registration)',
          '    _ "github.com/lib/pq"',
          ')',
          '',
          '// Alias resolves conflict if two packages have same name',
          'import (',
          '    "fmt"',
          '    myfmt "github.com/other/fmt"',
          ')',
          '',
          'func main() {',
          '    fmt.Println("using standard fmt")',
          '    myfmt.Println("using aliased fmt")',
          '}',
        ].join('\n'),
        explanation: "Go requires all imports to be used — the compiler rejects unused imports. Blank imports (_ \"pkg\") register side effects like database drivers. Group imports by origin: stdlib first, third-party second. Use aliases when two packages share a name. goimports handles grouping automatically."
      }
    ],
    bestPractices: [
      "Use goimports to manage import grouping automatically",
      "Use blank imports _ for driver registration and side-effect-only packages",
      "Never use dot imports (import . \"pkg\") outside of tests",
      "Keep import lists clean — remove unused imports immediately",
      "Use import aliases only when resolving naming conflicts"
    ],
    commonMistakes: [
      "Leaving unused imports in code (compilation error)",
      "Not using blank imports for driver registration patterns",
      "Mixing stdlib and third-party imports without grouping",
      "Using dot imports that pollute the namespace",
      "Creating circular import dependencies between packages"
    ],
    relatedTopics: [
      "packages",
      "hello-world-in-go"
    ],
    externalResources: [
      { title: "Effective Go: Import Paths", url: "https://go.dev/doc/effective_go#importing" },
      { title: "Go Tour: Importing Packages", url: "https://go.dev/tour/basics/9" },
      { title: "Go Wiki: Import Blank", url: "https://github.com/golang/go/wiki/CodeReviewComments#import-dot" }
    ]
  },

  "packages": {
    slug: "packages",
    title: "Packages",
    summary: "Go programs are organized into packages — the fundamental unit of code organization and encapsulation.",
    description: `Packages are Go's mechanism for organizing code into reusable, encapsulated units. Every Go source file belongs to exactly one package, declared at the top of the file with the package keyword. The package name must match the directory it lives in. Packages provide encapsulation through their export rules: identifiers that start with an uppercase letter are exported (visible outside the package), and lowercase identifiers are unexported (package-private).

The package main is special — it defines an executable program rather than a library. A main package must contain a main function, which serves as the entry point. Library packages are imported by other packages and provide reusable functionality. The package name is used as the default qualifier when referencing exported identifiers: fmt.Println means the Println function from the fmt package.

For backend engineers, package design is critical for maintaining large codebases. Well-designed packages have clear responsibilities, minimal dependencies, and well-defined APIs. Go encourages small packages with focused functionality rather than large monolithic ones. The standard library itself follows this philosophy — packages like net/http, database/sql, and encoding/json each handle a single domain.`,
    keyPoints: [
      "Each directory contains one package; package name matches directory",
      "Exported identifiers start with uppercase; unexported with lowercase",
      "package main defines an executable; library packages are imported",
      "Package-level init() functions run before main()",
      "Import paths use the module path + directory path",
      "Package-level variables are initialized before init() runs",
      "Circular package dependencies are prohibited"
    ],
    codeExamples: [
      {
        title: "Package Organization",
        description: "How to structure packages and use exports",
        bad: [
          '// Bad: single package for everything',
          '// myapp/',
          '//   handlers.go   (package myapp)',
          '//   models.go     (package myapp)',
          '//   database.go   (package myapp)',
          '//   utils.go      (package myapp)',
          '// Everything is in one flat package',
          '',
          '// Bad: exporting everything',
          'package myapp',
          '',
          'type internalConfig struct { // Should be unexported',
          '    DBHost string',
          '}',
          '',
          'var GlobalConnection interface{} // Global state',
        ].join('\n'),
        good: [
          '// Good: organized into sub-packages',
          '// myapp/',
          '//   handler/',         // package handler',
          '//   model/',           // package model',
          '//   db/',              // package db',
          '',
          '// model/user.go',
          'package model',
          '',
          '// User is exported — visible to other packages',
          'type User struct {',
          '    Name  string // exported field',
          '    email string // unexported — package private',
          '}',
          '',
          '// NewUser is the constructor — exported',
          'func NewUser(name, email string) *User {',
          '    return &User{Name: name, email: email}',
          '}',
          '',
          '// GetEmail is exported',
          'func (u *User) GetEmail() string { return u.email }',
        ].join('\n'),
        explanation: "Organize code into focused packages with clear responsibilities. Export only what other packages need — keep implementation details unexported. Constructors like NewUser provide controlled creation. Unexported fields (email) are accessed through exported methods, maintaining encapsulation."
      }
    ],
    bestPractices: [
      "Keep packages small and focused on a single responsibility",
      "Export only what needs to be public — prefer unexported types and functions",
      "Use NewType constructors for controlled initialization",
      "Avoid circular dependencies — restructure with interfaces",
      "Name packages with short, clear, lowercase names",
      "Place package-level init() functions sparingly and document them clearly"
    ],
    commonMistakes: [
      "Making everything exported when most types should be package-private",
      "Creating circular dependencies between packages",
      "Putting too many responsibilities in a single package",
      "Using package-level mutable state instead of dependency injection",
      "Not matching package name to directory name"
    ],
    relatedTopics: [
      "package-import-rules",
      "setting-up-the-environment",
      "hello-world-in-go"
    ],
    externalResources: [
      { title: "Effective Go: Packages", url: "https://go.dev/doc/effective_go#packages" },
      { title: "Go Tour: Packages, Functions, and Imports", url: "https://go.dev/tour/basics/9" },
      { title: "Go Blog: Package Names", url: "https://go.dev/blog/package-names" }
    ]
  },

  "arrays": {
    slug: "arrays",
    title: "Arrays",
    summary: "Arrays in Go have fixed size defined at compile time and are value types that are copied on assignment.",
    description: `Arrays in Go are sequences of elements with a fixed size determined at compile time. The size is part of the type — [3]int and [5]int are different types. Arrays are value types in Go: when you assign an array to another variable or pass it to a function, the entire array is copied. This makes them efficient for small, known-size collections but impractical for dynamic data.

Arrays are rarely used directly in Go code because slices provide a more flexible abstraction. However, understanding arrays is essential because slices are built on top of them. Every slice has an underlying array that holds the actual data. Arrays are also used when the size is small and fixed, such as a buffer for reading network packets or a set of coordinates.

The Go compiler optimizes array operations effectively. Array literals can be initialized with specific values or with a count of repeated values. The built-in len() function returns the array's size, and arrays support the range-based for loop for iteration.`,
    keyPoints: [
      "Array size is part of the type: [3]int and [5]int are different types",
      "Arrays are value types — copied on assignment and function calls",
      "Size must be a compile-time constant",
      "Arrays can be compared with == and != (if element type allows it)",
      "len() returns the array size; indexing starts at 0",
      "Arrays are rarely used directly — slices are preferred",
      "The underlying array of a slice is a fixed-size array"
    ],
    codeExamples: [
      {
        title: "Array Declaration and Usage",
        description: "How arrays work in Go and why slices are preferred",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Arrays are fixed-size — can\'t append or grow',
          '    var names [3]string{"Alice", "Bob", "Charlie"}',
          '',
          '    // Arrays are value types — full copy on assignment',
          '    copy := names',
          '    copy[0] = "Zara"',
          '    fmt.Println(names[0]) // Still "Alice" — original unchanged',
          '',
          '    // Can\'t add a 4th element',
          '    // names[3] = "Dave" // PANIC: index out of range',
          '',
          '    // Passing to function copies entire array',
          '    process(names)',
          '}',
          '',
          'func process(arr [3]string) {',
          '    arr[0] = "modified" // Only modifies the copy',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Array literal',
          '    var numbers [3]int = [3]int{1, 2, 3}',
          '',
          '    // Compiler counts elements',
          '    colors := [...]string{"red", "green", "blue"}',
          '',
          '    // Counting fill',
          '    zeros := [5]int{1: 10, 3: 30} // [0 10 0 30 0]',
          '',
          '    // Iterate with range',
          '    for i, v := range numbers {',
          '        fmt.Printf("index %d: %d\\n", i, v)',
          '    }',
          '',
          '    // Convert array to slice when flexibility is needed',
          '    s := numbers[:]',
          '    s = append(s, 4) // Now working with a slice',
          '',
          '    fmt.Println(colors, zeros)',
          '}',
        ].join('\n'),
        explanation: "Arrays in Go are fixed-size value types. Use [...] to let the compiler count elements. Index expressions initialize specific positions. Slices (built on arrays) provide dynamic resizing — convert with numbers[:]. Use arrays directly only when the size is small, fixed, and performance-critical."
      }
    ],
    bestPractices: [
      "Prefer slices over arrays for most use cases",
      "Use arrays when the size is small, fixed, and known at compile time",
      "Convert arrays to slices with arr[:] when flexibility is needed",
      "Be aware that arrays are value types — assignment copies the data",
      "Use array literals with [...] to let the compiler count elements"
    ],
    commonMistakes: [
      "Trying to append to a fixed-size array (use slices instead)",
      "Assuming array assignment creates a reference (it copies)",
      "Confusing [3]int and [5]int — they are different types",
      "Not converting to slice when dynamic resizing is needed",
      "Using arrays in function signatures when slices would be more flexible"
    ],
    relatedTopics: [
      "slices",
      "array-to-slice-conversion",
      "capacity-and-growth"
    ],
    externalResources: [
      { title: "Go Tour: Arrays", url: "https://go.dev/tour/moretypes/5" },
      { title: "Effective Go: Arrays", url: "https://go.dev/doc/effective_go#arrays" },
      { title: "Go by Example: Arrays", url: "https://gobyexample.com/arrays" }
    ]
  },

  "slices": {
    slug: "slices",
    title: "Slices",
    summary: "Slices are dynamically-sized, flexible views into underlying arrays — the most commonly used collection type in Go.",
    description: `Slices are Go's primary collection type and are used extensively in virtually every Go program. A slice is a lightweight structure containing a pointer to an underlying array, a length (number of elements), and a capacity (how many elements can fit before reallocation). Slices provide a dynamic, resizable view of an array, combining the performance of arrays with the flexibility of dynamic collections.

Slices are reference types — when you pass a slice to a function, changes to the underlying elements are visible to the caller. However, the slice header itself (pointer, length, capacity) is passed by value. This means operations like append that may reallocate the underlying array require capturing the returned slice: s = append(s, x).

The append function is the primary way to add elements to a slice. It handles reallocation transparently — when the underlying array is full, append allocates a new, larger array and copies the data. The len() and cap() builtins return the slice's current length and capacity. Slices support full and partial indexing, as well as the range-based for loop.`,
    keyPoints: [
      "Slice header: pointer, length, capacity — passed by value to functions",
      "Slices are reference types — elements are shared; header is copied",
      "append grows the slice; may reallocate the underlying array",
      "Always capture the return of append: s = append(s, x)",
      "len() returns length; cap() returns capacity",
      "Slices support sub-slicing: s[low:high]",
      "A nil slice is valid — len() == 0 and append works on it",
      "Slice literals create an underlying array and a slice header pointing to it"
    ],
    codeExamples: [
      {
        title: "Slice Operations and Gotchas",
        description: "Essential slice patterns and common mistakes",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Forgetting to capture append return',
          '    s := make([]int, 0, 3)',
          '    append(s, 1, 2, 3) // Result discarded!',
          '    fmt.Println(s) // Still empty []',
          '',
          '    // Modifying sub-slice affects original',
          '    original := []int{1, 2, 3, 4, 5}',
          '    sub := original[1:3]',
          '    sub[0] = 99',
          '    fmt.Println(original) // [1 99 3 4 5] — original modified!',
          '',
          '    // Slice shared with underlying array',
          '    arr := [5]int{1, 2, 3, 4, 5}',
          '    s2 := arr[:3]',
          '    s2 = append(s2, 99) // May modify arr!',
          '    fmt.Println(arr)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Always capture append return',
          '    s := make([]int, 0, 3)',
          '    s = append(s, 1, 2, 3)',
          '    fmt.Println(s) // [1 2 3]',
          '',
          '    // Copy to avoid shared backing array',
          '    original := []int{1, 2, 3, 4, 5}',
          '    sub := make([]int, 2)',
          '    copy(sub, original[1:3])',
          '    sub[0] = 99',
          '    fmt.Println(original) // [1 2 3 4 5] — unchanged',
          '',
          '    // Use full slice expression to limit capacity',
          '    arr := [5]int{1, 2, 3, 4, 5}',
          '    s2 := arr[:3:3] // Cap limited to 3',
          '    s2 = append(s2, 99) // Forces new allocation',
          '    fmt.Println(arr) // [1 2 3 4 5] — unchanged',
          '',
          '    // Initialize with literal',
          '    fruits := []string{"apple", "banana", "cherry"}',
          '    fmt.Println(fruits)',
          '}',
        ].join('\n'),
        explanation: "Always capture the return value of append — it may return a new slice header. Sub-slices share the backing array, so modifications propagate. Use copy() to create an independent copy. The three-index slice expression s[low:high:max] limits capacity to prevent append from touching the original array."
      }
    ],
    bestPractices: [
      "Always capture the return value of append: s = append(s, x)",
      "Pre-allocate with make([]T, 0, capacity) when size is known",
      "Use copy() when you need an independent copy of a sub-slice",
      "Check for nil slices — they are valid but may surprise callers",
      "Use three-index slicing s[low:high:max] to limit capacity when sharing backing arrays"
    ],
    commonMistakes: [
      "Discarding the return value of append (lost data)",
      "Modifying a sub-slice and unintentionally affecting the parent",
      "Not pre-allocating capacity when the final size is known",
      "Confusing nil slice with empty slice (both have len 0)",
      "Passing slices to functions expecting arrays (type mismatch)"
    ],
    relatedTopics: [
      "arrays",
      "capacity-and-growth",
      "array-to-slice-conversion",
      "for-range"
    ],
    externalResources: [
      { title: "Go Blog: Go Slices: Usage and Internals", url: "https://go.dev/blog/slices-intro" },
      { title: "Go Tour: Slices", url: "https://go.dev/tour/moretypes/7" },
      { title: "Go by Example: Slices", url: "https://gobyexample.com/slices" }
    ]
  },

  "array-to-slice-conversion": {
    slug: "array-to-slice-conversion",
    title: "Array to Slice Conversion",
    summary: "Convert an array to a slice with arr[:] — the resulting slice shares the underlying array data.",
    description: `In Go, every slice is backed by an underlying array. Converting an array to a slice is straightforward: use the full slice expression arr[:] or arr[0:]. This creates a slice header pointing to the array's data with length equal to the array's size and capacity equal to the array's size. The resulting slice shares memory with the original array — modifications to the slice elements will be visible in the array and vice versa.

This conversion is implicit in many operations. When you pass an array to a function expecting a slice, Go automatically converts it. Similarly, when you append elements to a slice backed by an array with enough capacity, the new elements go directly into the array. Understanding this relationship is crucial for writing efficient Go code that avoids unnecessary allocations.

For backend engineers, array-to-slice conversion appears when working with fixed-size buffers (like network packet buffers or cryptographic hashes) that need to be passed to functions expecting slices. The conversion is zero-cost — no data is copied, only a slice header (24 bytes on 64-bit systems) is created.`,
    keyPoints: [
      "arr[:] creates a slice with len == cap == len(arr)",
      "The slice shares the underlying array — no copy is made",
      "Conversion is zero-cost — only a slice header is created",
      "arr[0:] and arr[:] produce equivalent slices",
      "Functions accepting slices can receive arrays implicitly",
      "Modifications to the slice affect the original array"
    ],
    codeExamples: [
      {
        title: "Array to Slice Conversion",
        description: "Converting arrays to slices and understanding shared memory",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func process(data []byte) {',
          '    data[0] = 0xFF // Modifies the original array!',
          '}',
          '',
          'func main() {',
          '    // Array — can\'t pass to []byte function directly',
          '    var buf [64]byte',
          '    buf[0] = 42',
          '',
          '    // Forgetting conversion is shared',
          '    s := buf[:]',
          '    process(s)',
          '    fmt.Println(buf[0]) // 0xFF — buf was modified',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func process(data []byte) {',
          '    data[0] = 0xFF',
          '}',
          '',
          'func processCopy(data []byte) {',
          '    data[0] = 0xFF',
          '}',
          '',
          'func main() {',
          '    // Array to slice — implicit when passing to function',
          '    var buf [64]byte',
          '    buf[0] = 42',
          '',
          '    // Explicit conversion',
          '    s := buf[:] // s shares memory with buf',
          '    process(s)',
          '    fmt.Println(buf[0]) // 0xFF — shared memory',
          '',
          '    // If you need isolation, copy first',
          '    var buf2 [64]byte',
          '    buf2[0] = 42',
          '    s2 := make([]byte, len(buf2))',
          '    copy(s2, buf2[:])',
          '    processCopy(s2)',
          '    fmt.Println(buf2[0]) // 42 — original safe',
          '}',
        ].join('\n'),
        explanation: "arr[:] creates a slice backed by the original array — no copy. When you need isolation from the original array, use make + copy to create an independent slice. The conversion is free, but always be aware that the slice and array share memory."
      }
    ],
    bestPractices: [
      "Use arr[:] to convert arrays to slices when passing to functions",
      "Use copy() when you need an independent slice from an array",
      "Be aware that array-to-slice conversion shares memory",
      "Pre-allocate slice capacity when converting large arrays",
      "Use three-index slicing arr[0:n:n] to limit slice capacity"
    ],
    commonMistakes: [
      "Assuming arr[:] creates a copy (it shares memory)",
      "Not realizing modifications to the slice affect the original array",
      "Passing a fixed-size array where a slice is expected (needs conversion)",
      "Using full slice expression without understanding capacity implications"
    ],
    relatedTopics: [
      "arrays",
      "slices",
      "slice-to-array-conversion"
    ],
    externalResources: [
      { title: "Go Blog: Go Slices: Usage and Internals", url: "https://go.dev/blog/slices-intro" },
      { title: "Go Spec: Slice Expressions", url: "https://go.dev/ref/spec#Slice_expressions" },
      { title: "Go by Example: Slices", url: "https://gobyexample.com/slices" }
    ]
  },

  "slice-to-array-conversion": {
    slug: "slice-to-array-conversion",
    title: "Slice to Array Conversion",
    summary: "Convert a slice to an array with [N]T(s) — copies data into a new fixed-size array.",
    description: `Converting a slice to an array in Go creates a new array and copies the slice's elements into it. The syntax is [N]T(slice) where N is the array size and T is the element type. If the slice has fewer than N elements, the remaining positions are zero-valued. If the slice has more than N elements, only the first N are copied. This operation allocates a new array on the stack or heap depending on size.

Go 1.17 introduced direct slice-to-array conversion, making it easier to work with fixed-size buffers. Before Go 1.17, you had to copy elements manually or use unsafe. The conversion is useful when you need to pass data to functions that require fixed-size arrays, store data in a struct with an array field, or when you need value semantics (independent copy) for the data.

Unlike array-to-slice conversion, slice-to-always copies data — the new array is independent of the original slice. This means modifications to the array do not affect the slice and vice versa. The performance cost is proportional to the number of elements copied.`,
    keyPoints: [
      "Syntax: arr := [N]T(slice) — creates a new array of size N",
      "If slice is shorter than N, remaining elements are zero-valued",
      "If slice is longer than N, only the first N elements are copied",
      "The conversion always copies — no shared memory with the original",
      "Introduced in Go 1.17",
      "Useful for fixed-size buffer operations and value semantics"
    ],
    codeExamples: [
      {
        title: "Slice to Array Conversion",
        description: "Converting slices to arrays with automatic copying",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Manual copy before Go 1.17 (verbose)',
          '    src := []int{1, 2, 3, 4, 5}',
          '    var arr [5]int',
          '    copy(arr[:], src)',
          '    fmt.Println(arr)',
          '',
          '    // Forgetting size mismatch',
          '    s := []int{1, 2, 3}',
          '    // arr3 := [5]int(s) // Only copies 3; rest are zero',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Direct conversion (Go 1.17+)',
          '    s := []int{1, 2, 3, 4, 5}',
          '    arr := [5]int(s)',
          '    fmt.Println(arr) // [1 2 3 4 5]',
          '',
          '    // Partial conversion — zero-fills remaining',
          '    short := []int{1, 2, 3}',
          '    arr5 := [5]int(short)',
          '    fmt.Println(arr5) // [1 2 3 0 0]',
          '',
          '    // Truncation — only first N elements',
          '    long := []int{1, 2, 3, 4, 5, 6, 7}',
          '    arr3 := [3]int(long)',
          '    fmt.Println(arr3) // [1 2 3]',
          '',
          '    // Independent copy — modifying array doesn\'t affect slice',
          '    original := []int{10, 20, 30}',
          '    arrCopy := [3]int(original)',
          '    arrCopy[0] = 99',
          '    fmt.Println(original[0]) // 10 — unchanged',
          '}',
        ].join('\n'),
        explanation: "Go 1.17+ supports direct [N]T(slice) conversion. The array is always a new allocation — no shared memory. Shorter slices zero-fill; longer slices truncate. This is ideal when you need value semantics or fixed-size arrays for APIs and protocol buffers."
      }
    ],
    bestPractices: [
      "Use [N]T(slice) for direct conversion in Go 1.17+",
      "Ensure the slice has enough elements or handle zero-filling",
      "Use this conversion when value semantics (independent copy) is needed",
      "Consider performance for large arrays — conversion copies all elements",
      "For zero-copy scenarios, keep working with slices"
    ],
    commonMistakes: [
      "Assuming slice-to-array conversion shares memory (it always copies)",
      "Not handling the case where slice is shorter than the array",
      "Using this conversion unnecessarily when slices would suffice",
      "Forgetting that the resulting array is independent of the original slice"
    ],
    relatedTopics: [
      "arrays",
      "slices",
      "array-to-slice-conversion",
      "type-conversion"
    ],
    externalResources: [
      { title: "Go Spec: Conversions", url: "https://go.dev/ref/spec#Conversions" },
      { title: "Go 1.17 Release Notes: Array to Slice Conversion", url: "https://go.dev/doc/go1.17" },
      { title: "Go by Example: Arrays", url: "https://gobyexample.com/arrays" }
    ]
  },

  "capacity-and-growth": {
    slug: "capacity-and-growth",
    title: "Capacity and Growth",
    summary: "Slices grow dynamically via append; understanding capacity helps avoid unnecessary allocations.",
    description: `Every slice in Go has a length (number of elements) and a capacity (total space in the underlying array from the slice's start). When you append to a slice and exceed its capacity, Go allocates a new, larger underlying array. The growth strategy is approximately doubled: a slice with capacity 1 grows to 2, then 4, 8, 16, and so on. For large slices, the growth factor transitions from 2x to approximately 1.25x to balance memory usage.

Understanding capacity is crucial for performance. Pre-allocating slices with make([]T, 0, expectedCap) avoids repeated reallocations during append. Each reallocation copies the entire slice data to the new array, so for large slices, this can be expensive. The cap() built-in function returns the current capacity of a slice.

For backend engineers working with data processing pipelines, HTTP response buffering, or any scenario involving variable-size collections, capacity management directly impacts memory allocation and garbage collection pressure. Tools like go test -bench and pprof can help identify capacity-related performance issues.`,
    keyPoints: [
      "cap() returns the underlying array capacity of a slice",
      "append doubles capacity (approximately) when growing",
      "Pre-allocate with make([]T, 0, cap) when the final size is known",
      "Each reallocation copies all existing elements to the new array",
      "The growth formula: new cap = old cap + old cap/2 + 192 (simplified) for large slices",
      "Three-index slicing s[low:high:max] controls capacity",
      "Slice literals use exactly the capacity needed for initial elements"
    ],
    codeExamples: [
      {
        title: "Capacity Management",
        description: "Understanding and optimizing slice capacity",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Many reallocations without pre-allocation',
          '    var s []int',
          '    for i := 0; i < 1000; i++ {',
          '        s = append(s, i) // Grows: 0→1→2→4→8→...→1024',
          '    }',
          '    fmt.Println(len(s), cap(s))',
          '',
          '    // Unintended capacity sharing',
          '    original := make([]int, 5, 10)',
          '    sub := original[:3] // len=3, cap=10!',
          '    sub = append(sub, 99, 100, 101) // Overwrites original[3:6]',
          '    fmt.Println(original)',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Pre-allocate for known size',
          '    s := make([]int, 0, 1000)',
          '    for i := 0; i < 1000; i++ {',
          '        s = append(s, i) // No reallocations!',
          '    }',
          '    fmt.Println(len(s), cap(s)) // 1000 1000',
          '',
          '    // Control capacity with three-index slicing',
          '    original := make([]int, 5, 10)',
          '    sub := original[:3:3] // len=3, cap=3',
          '    sub = append(sub, 99, 100, 101) // Forces new allocation',
          '    fmt.Println(original) // Original safe',
          '',
          '    // Growth strategy observation',
          '    s2 := make([]int, 0)',
          '    prevCap := 0',
          '    for i := 0; i < 100; i++ {',
          '        s2 = append(s2, i)',
          '        if cap(s2) != prevCap {',
          '            fmt.Printf("len=%d cap=%d\\n", len(s2), cap(s2))',
          '            prevCap = cap(s2)',
          '        }',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Pre-allocate with make([]T, 0, expectedCap) to avoid repeated reallocations. Three-index slicing (s[:3:3]) limits capacity, forcing append to allocate a new backing array when exceeded. This prevents unintended overwrites of adjacent elements in the underlying array."
      }
    ],
    bestPractices: [
      "Pre-allocate slice capacity when the expected size is known",
      "Use three-index slicing to prevent capacity sharing between slices",
      "Monitor allocations with go test -benchmem and pprof",
      "Use cap() to check remaining capacity before batch appends",
      "For very large slices, consider growing in chunks rather than one-by-one"
    ],
    commonMistakes: [
      "Not pre-allocating capacity leading to O(n) reallocations",
      "Unintended capacity sharing via sub-slicing (append overwrites neighbors)",
      "Assuming append always creates a new backing array",
      "Growing slices in a loop without checking capacity",
      "Confusing len() with cap() — they return different values"
    ],
    relatedTopics: [
      "slices",
      "arrays",
      "make",
      "append"
    ],
    externalResources: [
      { title: "Go Blog: Go Slices: Usage and Internals", url: "https://go.dev/blog/slices-intro" },
      { title: "Go Blog: Go Slices: Usage and Internals — Capacity", url: "https://go.dev/blog/slices-intro" },
      { title: "Go by Example: Slices", url: "https://gobyexample.com/slices" }
    ]
  },

  "maps": {
    slug: "maps",
    title: "Maps",
    summary: "Maps in Go are hash tables — unordered collections of key-value pairs with O(1) average lookup.",
    description: `Maps are Go's built-in hash table implementation, storing key-value pairs with fast lookup, insertion, and deletion. The map[K]V type associates keys of type K with values of type V. Keys must be comparable types (strings, numbers, booleans, arrays, pointers, structs — but not slices, maps, or functions). Values can be any type. Map access is O(1) on average, making maps ideal for caching, counting, indexing, and set operations.

Maps are reference types — they point to an underlying hash table data structure. When you pass a map to a function, changes to the map's contents are visible to the caller. However, the map must be initialized before use (with make or a map literal). Assigning to a nil map causes a runtime panic, which is one of the most common Go mistakes.

Go maps are not safe for concurrent use. If multiple goroutines read and write to a map simultaneously, you need to use sync.Mutex or sync.RWMutex to protect it. Go 1.6+ includes a race detector that can catch unsynchronized map access. For concurrent-safe maps, consider sync.Map or a sharded map implementation.`,
    keyPoints: [
      "Maps are reference types — initialized with make(map[K]V) or map literals",
      "nil maps are valid for reading (return zero value) but panic on write",
      "Key types must be comparable — slices, maps, and functions cannot be keys",
      "Maps are not safe for concurrent access — use sync.Mutex or sync.Map",
      "Map order is deliberately randomized in iteration",
      "len(m) returns the number of key-value pairs",
      "Deleting a key: delete(m, key)"
    ],
    codeExamples: [
      {
        title: "Map Operations and Safety",
        description: "Proper map usage including initialization and concurrent access",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Nil map — reading works, writing panics',
          '    var m map[string]int',
          '    fmt.Println(m["key"]) // 0 (zero value)',
          '    // m["key"] = 1 // PANIC: assignment to entry in nil map',
          '',
          '    // Unsafe concurrent access',
          '    // Two goroutines writing to same map = race condition',
          '    // go func() { m["a"] = 1 }()',
          '    // go func() { m["b"] = 2 }()',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "sync"',
          ')',
          '',
          'func main() {',
          '    // Initialize with make',
          '    m := make(map[string]int)',
          '    m["key"] = 1',
          '',
          '    // Initialize with literal',
          '    colors := map[string]string{',
          '        "red":   "#ff0000",',
          '        "green": "#00ff00",',
          '    }',
          '',
          '    // Safe read with comma-ok',
          '    val, ok := colors["red"]',
          '    if ok {',
          '        fmt.Println("red:", val)',
          '    }',
          '',
          '    // Delete a key',
          '    delete(colors, "red")',
          '',
          '    // Concurrent-safe map',
          '    var mu sync.RWMutex',
          '    safeMap := make(map[string]int)',
          '',
          '    mu.Lock()',
          '    safeMap["key"] = 1',
          '    mu.Unlock()',
          '',
          '    mu.RLock()',
          '    v := safeMap["key"]',
          '    mu.RUnlock()',
          '    fmt.Println(v)',
          '}',
        ].join('\n'),
        explanation: "Always initialize maps before use — make(map[K]V) or map literals. Use comma-ok to distinguish missing keys from zero values. Protect maps with sync.RWMutex for concurrent access, or use sync.Map for high-contention scenarios. delete(m, key) removes a key-value pair."
      }
    ],
    bestPractices: [
      "Always initialize maps before writing: make(map[K]V) or map literal",
      "Use comma-ok idiom to check key existence explicitly",
      "Protect concurrent map access with sync.RWMutex or sync.Map",
      "Use delete(m, key) to remove entries",
      "Pre-allocate with make(map[K]V, hint) when approximate size is known",
      "Keep map keys simple — use basic types for best performance"
    ],
    commonMistakes: [
      "Assigning to a nil map without initialization (runtime panic)",
      "Using maps concurrently without synchronization (race condition)",
      "Checking for zero value instead of using comma-ok to verify key existence",
      "Relying on map iteration order (deliberately randomized)",
      "Using non-comparable types as map keys (slices, maps, functions)"
    ],
    relatedTopics: [
      "iterating-maps",
      "comma-ok-idiom",
      "zero-values",
      "make"
    ],
    externalResources: [
      { title: "Go Tour: Maps", url: "https://go.dev/tour/moretypes/9" },
      { title: "Effective Go: Maps", url: "https://go.dev/doc/effective_go#maps" },
      { title: "Go by Example: Maps", url: "https://gobyexample.com/maps" }
    ]
  },

  "iterating-maps": {
    slug: "iterating-maps",
    title: "Iterating Maps",
    summary: "Use for range to iterate maps — key-value pairs are returned in randomized order by design.",
    description: `Go maps are iterated using the for range loop, which returns key-value pairs on each iteration. Unlike some languages where hash tables maintain insertion order, Go deliberately randomizes map iteration order. This design choice forces developers to write code that doesn't depend on iteration order, which is critical because hash table order is inherently unstable and can change as the map grows or shrinks.

The for range on a map can iterate over keys only, values only, or both. You can use _ to ignore either the key or value. The iteration order changes between program runs and even within the same run after modifications, which is useful for testing code that should work regardless of order.

For backend engineers, map iteration is essential for processing configuration, aggregating data, building indexes, and any key-value processing. When order matters (like for deterministic output), collect keys into a slice, sort the slice, and iterate over the sorted keys. This pattern gives you both the flexibility of maps and the predictability of ordered processing.`,
    keyPoints: [
      "for k, v := range m iterates over key-value pairs",
      "Iteration order is deliberately randomized — never rely on it",
      "for k := range m iterates keys only",
      "for _, v := range m iterates values only",
      "Use _ to ignore key or value: for _, v := range m",
      "Map iteration reflects the map's current state — deleted keys disappear",
      "Sorted iteration: collect keys, sort, then access by sorted key order"
    ],
    codeExamples: [
      {
        title: "Map Iteration Patterns",
        description: "Common patterns for iterating maps in Go",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    m := map[string]int{"a": 1, "b": 2, "c": 3}',
          '',
          '    // Assuming iteration order (wrong!)',
          '    // This might print a,b,c or c,b,a or any order',
          '    for k, v := range m {',
          '        fmt.Println(k, v)',
          '    }',
          '',
          '    // Getting first element assuming insertion order (wrong!)',
          '    var first string',
          '    for k := range m {',
          '        first = k',
          '        break // Not necessarily the "first" key',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "sort"',
          ')',
          '',
          'func main() {',
          '    m := map[string]int{"a": 1, "b": 2, "c": 3}',
          '',
          '    // Iterate keys only',
          '    for k := range m {',
          '        fmt.Println("key:", k)',
          '    }',
          '',
          '    // Iterate values only',
          '    for _, v := range m {',
          '        fmt.Println("value:", v)',
          '    }',
          '',
          '    // Sorted iteration (deterministic order)',
          '    keys := make([]string, 0, len(m))',
          '    for k := range m {',
          '        keys = append(keys, k)',
          '    }',
          '    sort.Strings(keys)',
          '    for _, k := range keys {',
          '        fmt.Printf("%s: %d\\n", k, m[k])',
          '    }',
          '',
          '    // Build a new map by filtering',
          '    filtered := make(map[string]int)',
          '    for k, v := range m {',
          '        if v > 1 {',
          '            filtered[k] = v',
          '        }',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Never assume map iteration order — it's randomized. For sorted output, collect keys into a slice, sort them, and iterate in sorted order. Use for k := range for keys, for _, v := range for values, and for k, v := range for both. Deleting or adding entries during range is safe — the iteration reflects changes."
      }
    ],
    bestPractices: [
      "Never rely on map iteration order — it's deliberately randomized",
      "Use sorted key iteration when deterministic output is required",
      "Use the most efficient range form: keys only, values only, or both",
      "Filtering maps: create a new map during range rather than modifying in-place",
      "Be aware that modifying a map during range is safe but may skip/add entries"
    ],
    commonMistakes: [
      "Assuming map iteration order matches insertion order",
      "Relying on a specific order for tests or output",
      "Modifying map values directly in range (v is a copy for value types)",
      "Expecting consistent order across different runs or platforms",
      "Not pre-allocating the result map when building during iteration"
    ],
    relatedTopics: [
      "maps",
      "for-range",
      "comma-ok-idiom"
    ],
    externalResources: [
      { title: "Go Blog: Range over Maps", url: "https://go.dev/blog/range" },
      { title: "Go Tour: For Range", url: "https://go.dev/tour/flowcontrol/6" },
      { title: "Effective Go: Range", url: "https://go.dev/doc/effective_go#range" }
    ]
  },

  "make": {
    slug: "make",
    title: "make",
    summary: "make allocates and initializes slices, maps, and channels — the built-in constructor for reference types.",
    description: `The make built-in function allocates and initializes slices, maps, and channels. It returns an initialized (non-nil) value of the specified type. For slices, make([]T, length, capacity) allocates an underlying array of the given capacity and returns a slice of the given length. For maps, make(map[K]V, hint) creates an empty map with an optional size hint for performance. For channels, make(chan T, buffer) creates a buffered channel of the given buffer size.

The key difference between make and new is that make returns an initialized, ready-to-use value, while new returns a pointer to a zero-valued, newly allocated variable. You cannot use make for structs, arrays, or other types — it's exclusively for slices, maps, and channels.

For backend engineers, make is one of the most frequently called functions. Understanding its parameters — especially the capacity hint for slices — directly impacts performance. Pre-allocating with make([]T, 0, expectedSize) avoids the overhead of repeated reallocations as the slice grows through append.`,
    keyPoints: [
      "make([]T, length) or make([]T, length, capacity) for slices",
      "make(map[K]V) or make(map[K]V, hint) for maps",
      "make(chan T) or make(chan T, buffer) for channels",
      "make returns an initialized, non-nil value ready for use",
      "new returns a pointer to zero value; make returns initialized value",
      "make only works for slices, maps, and channels",
      "The capacity hint for slices avoids reallocations"
    ],
    codeExamples: [
      {
        title: "make Usage Patterns",
        description: "When and how to use make for slices, maps, and channels",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Using new instead of make for slices',
          '    // s := new([]int) // Returns *[]int (nil pointer)',
          '    // (*s) = append(*s, 1) // Works but awkward',
          '',
          '    // Without capacity hint — many reallocations',
          '    s := make([]int, 0)',
          '    for i := 0; i < 10000; i++ {',
          '        s = append(s, i) // Repeated growing',
          '    }',
          '',
          '    // Nil map (forgot make)',
          '    var m map[string]int',
          '    // m["key"] = 1 // PANIC',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Slice with length and capacity',
          '    s := make([]int, 0, 10000)',
          '    for i := 0; i < 10000; i++ {',
          '        s = append(s, i) // No reallocations',
          '    }',
          '    fmt.Println(len(s), cap(s))',
          '',
          '    // Slice with initial length (pre-filled)',
          '    zeros := make([]int, 5) // [0 0 0 0 0]',
          '    fmt.Println(zeros)',
          '',
          '    // Map with size hint',
          '    m := make(map[string]int, 100)',
          '    m["key"] = 1',
          '',
          '    // Buffered channel',
          '    ch := make(chan int, 10)',
          '    ch <- 42',
          '    v := <-ch',
          '    fmt.Println(v)',
          '}',
        ].join('\n'),
        explanation: "Use make([]T, 0, cap) with a capacity hint to pre-allocate and avoid reallocations. make([]T, n) creates a slice with n zero-valued elements (length = n, not 0). For maps, the size hint reduces initial hash table resizing. For channels, the buffer parameter creates a buffered channel."
      }
    ],
    bestPractices: [
      "Use make([]T, 0, expectedCap) when you know the final size",
      "Use make(map[K]V, hint) with expected size for large maps",
      "Use make(chan T, buffer) for buffered channels with expected throughput",
      "Use make([]T, n) when you need a pre-filled slice of zero values",
      "Avoid make([]T, 0) without capacity hint in loops — causes reallocations"
    ],
    commonMistakes: [
      "Using new([]int) instead of make([]int, 0) for slices",
      "Forgetting the capacity hint when the final size is known",
      "Confusing make([]T, 5) with make([]T, 0, 5) — different length",
      "Not using make for maps (nil map panic on assignment)",
      "Using make for types other than slices, maps, and channels (compile error)"
    ],
    relatedTopics: [
      "slices",
      "maps",
      "capacity-and-growth",
      "zero-values"
    ],
    externalResources: [
      { title: "Go Tour: make", url: "https://go.dev/tour/basics/14" },
      { title: "Effective Go: Allocation with new or make", url: "https://go.dev/doc/effective_go#allocation_new" },
      { title: "Go Spec: Allocation: new and make", url: "https://go.dev/ref/spec#Allocation" }
    ]
  },

  "call-by-value": {
    slug: "call-by-value",
    title: "Call by Value",
    summary: "Go passes all function arguments by value — the function receives a copy of each argument.",
    description: `Go is a strictly pass-by-value language. When you pass an argument to a function, Go creates a copy of the argument and passes that copy to the function. This applies to all types: integers, strings, structs, slices, maps, channels, and pointers. The function operates on the copy, and any modifications to the parameter don't affect the original value.

However, the type of the copy matters. For value types (int, string, struct), the function gets a complete independent copy. For reference types (slice, map, channel), the copy is a header/descriptor that points to the same underlying data structure. This means the function can modify the contents of the underlying data (like slice elements or map entries), but not the header itself (like slice length/capacity or map pointer).

For pointers, the copy is of the pointer itself, not the pointed-to data. So the function can modify the data through the pointer, but reassigning the pointer inside the function doesn't affect the caller. Understanding this distinction is essential for writing correct Go code and deciding when to use pointers for efficiency.`,
    keyPoints: [
      "All arguments are passed by value — functions receive copies",
      "Value types (int, struct, string): function gets independent copy",
      "Reference types (slice, map, channel): copy shares underlying data",
      "Pointer copies share the same pointed-to data",
      "Modifying a pointer parameter inside a function doesn't affect the caller",
      "Pass by value prevents accidental shared state between callers",
      "Performance consideration: large structs should be passed by pointer"
    ],
    codeExamples: [
      {
        title: "Call by Value Semantics",
        description: "How Go's pass-by-value affects different types",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Expecting pass-by-reference behavior (wrong!)',
          '    x := 10',
          '    modifyInt(x)',
          '    fmt.Println(x) // Still 10',
          '',
          '    // Passing large struct by value (expensive copy)',
          '    user := User{Name: "Alice", Data: make([]byte, 1024)}',
          '    processUser(user) // Copies entire struct including Data slice',
          '}',
          '',
          'func modifyInt(n int) {',
          '    n = 20 // Only modifies the copy',
          '}',
          '',
          'type User struct {',
          '    Name string',
          '    Data []byte',
          '}',
          '',
          'func processUser(u User) {',
          '    u.Name = "Bob" // Only modifies the copy',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Pass pointer to modify original',
          '    x := 10',
          '    modifyInt(&x)',
          '    fmt.Println(x) // 20',
          '',
          '    // Pass pointer to avoid copying large structs',
          '    user := &User{Name: "Alice", Data: make([]byte, 1024)}',
          '    processUser(user)',
          '    fmt.Println(user.Name) // "Bob"',
          '',
          '    // Slice header is copied, but underlying array is shared',
          '    s := []int{1, 2, 3}',
          '    modifySlice(s)',
          '    fmt.Println(s[0]) // 99 — shared data modified',
          '}',
          '',
          'func modifyInt(n *int) {',
          '    *n = 20 // Modifies original through pointer',
          '}',
          '',
          'type User struct {',
          '    Name string',
          '    Data []byte',
          '}',
          '',
          'func processUser(u *User) {',
          '    u.Name = "Bob" // Modifies original',
          '}',
          '',
          'func modifySlice(s []int) {',
          '    s[0] = 99 // Modifies underlying array (shared)',
          '    // s = append(s, 4) // This would NOT affect caller\'s slice',
          '}',
        ].join('\n'),
        explanation: "Go always passes by value. For small types, this is fine. For large structs, pass a pointer to avoid copying. Slices are a special case: the slice header (pointer, len, cap) is copied, but modifications to elements affect the shared underlying array. append on a slice parameter may create a new backing array that the caller doesn't see."
      }
    ],
    bestPractices: [
      "Pass large structs by pointer to avoid expensive copies",
      "Use pointers when the function needs to modify the caller's variable",
      "Value types (int, bool, small structs) can be passed by value safely",
      "Be aware that slice elements are shared even though the header is copied",
      "Use pointer receivers for methods that modify the receiver",
      "Document when a function modifies its arguments through pointers"
    ],
    commonMistakes: [
      "Assuming pass-by-reference for types that are actually passed by value",
      "Passing large structs by value, causing unnecessary copying",
      "Expecting append on a slice parameter to modify the caller's slice",
      "Not realizing that reassigning a pointer parameter doesn't affect the caller",
      "Passing nil pointers without checking (panic on dereference)"
    ],
    relatedTopics: [
      "pointers-basics",
      "pointers",
      "slices",
      "functions"
    ],
    externalResources: [
      { title: "Effective Go: Pass by Value", url: "https://go.dev/doc/effective_go#passing" },
      { title: "Go FAQ: Pass by Value", url: "https://go.dev/doc/faq#references" },
      { title: "Go Blog: Go Slices: Internals", url: "https://go.dev/blog/slices-intro" }
    ]
  },

  "pointers-basics": {
    slug: "pointers-basics",
    title: "Pointers Basics",
    summary: "Pointers hold memory addresses of values — use & to take an address and * to dereference.",
    description: `A pointer in Go holds the memory address of a value. The *T type denotes a pointer to a value of type T. You create a pointer with the & (address-of) operator and access the pointed-to value with the * (dereference) operator. Go pointers are simpler than C pointers — they don't support arithmetic, which eliminates many common memory bugs.

When you pass a pointer to a function, the function can read and modify the original value through the pointer. This is how Go achieves reference-like behavior while being strictly pass-by-value: you pass a copy of the pointer, but both the original and the copy point to the same data.

The new(T) built-in allocates a zero-valued T and returns a *T pointer to it. Pointer types have a zero value of nil. Always check pointers for nil before dereferencing to avoid panics. Go's garbage collector handles memory deallocation automatically — there is no free or delete.`,
    keyPoints: [
      "T is the type; *T is a pointer to T",
      "&x takes the address of x",
      "*p dereferences pointer p to get the value",
      "nil is the zero value for pointers",
      "new(T) allocates zero-valued T and returns *T",
      "No pointer arithmetic — safe from memory bugs",
      "Garbage collector automatically frees unreachable memory"
    ],
    codeExamples: [
      {
        title: "Pointer Basics",
        description: "Creating, using, and dereferencing pointers",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Not using pointer when modification is needed',
          '    x := 10',
          '    increment(x) // Passes a copy',
          '    fmt.Println(x) // Still 10',
          '',
          '    // Dereferencing nil pointer (panic)',
          '    var p *int',
          '    // fmt.Println(*p) // PANIC: nil pointer dereference',
          '}',
          '',
          'func increment(n int) {',
          '    n++ // Only modifies the copy',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    // Creating a pointer',
          '    x := 10',
          '    p := &x // p is *int, points to x',
          '    fmt.Println(*p) // 10',
          '',
          '    // Modify through pointer',
          '    *p = 20',
          '    fmt.Println(x) // 20 — x is modified',
          '',
          '    // Pass pointer to function',
          '    increment(&x)',
          '    fmt.Println(x) // 21',
          '',
          '    // new() allocates zero value',
          '    p2 := new(int) // *int pointing to 0',
          '    *p2 = 42',
          '    fmt.Println(*p2)',
          '',
          '    // Always check for nil',
          '    var p3 *int',
          '    if p3 != nil {',
          '        fmt.Println(*p3)',
          '    } else {',
          '        fmt.Println("p3 is nil")',
          '    }',
          '}',
          '',
          'func increment(n *int) {',
          '    *n++ // Modifies original through pointer',
          '}',
        ].join('\n'),
        explanation: "Use & to take the address of a variable, * to dereference and access the value. Pointers allow functions to modify the caller's data. Always check pointers for nil before dereferencing. new(T) allocates and returns a pointer to a zero-valued T. Go pointers don't support arithmetic."
      }
    ],
    bestPractices: [
      "Use pointers when functions need to modify the caller's data",
      "Always check for nil before dereferencing pointers",
      "Use new(T) for allocating zero-valued pointer targets",
      "Keep pointers simple — avoid complex pointer chains",
      "Pass large structs by pointer to avoid copying overhead"
    ],
    commonMistakes: [
      "Dereferencing a nil pointer (runtime panic)",
      "Forgetting that new(T) returns a pointer, not a value",
      "Using pointer arithmetic (not supported in Go)",
      "Not taking the address when passing to functions that need modification",
      "Creating dangling references (not an issue in Go due to GC)"
    ],
    relatedTopics: [
      "pointers",
      "call-by-value",
      "zero-values"
    ],
    externalResources: [
      { title: "Go Tour: Pointers", url: "https://go.dev/tour/basics/6" },
      { title: "Effective Go: Pointers", url: "https://go.dev/doc/effective_go#pointers" },
      { title: "Go by Example: Pointers", url: "https://gobyexample.com/pointers" }
    ]
  },

  "pointers": {
    slug: "pointers",
    title: "Pointers",
    summary: "Go pointers enable passing references without arithmetic, supporting efficient data sharing and mutation.",
    description: `Go uses pointers for indirection — accessing a value through its memory address. Unlike C, Go pointers are safe: they cannot be arithmetically manipulated, and the garbage collector manages their lifetime. Pointers are declared with *T (pointer to T), created with & (address-of), and dereferenced with * (indirect). The zero value for any pointer type is nil.

Pointer receivers allow methods to modify the receiver value. This is the standard way to implement mutable methods on structs. Value receivers, by contrast, operate on a copy. The choice between pointer and value receivers affects both semantics and performance — large structs should use pointer receivers to avoid copying.

For backend engineers, pointers are essential for dependency injection, shared state, efficient data transfer, and implementing interfaces on mutable types. Go's pointer safety means you get the benefits of indirection without the memory management complexity of languages like C/C++. The escape analysis pass in the compiler determines whether values escape to the heap or stay on the stack.`,
    keyPoints: [
      "*T is a pointer type; &x takes address; *p dereferences",
      "No pointer arithmetic — safe by design",
      "nil is the zero value for pointers",
      "Pointer receiver methods can modify the receiver",
      "Value receiver methods operate on a copy",
      "Escape analysis decides stack vs heap allocation",
      "Go's GC automatically manages pointer lifetimes"
    ],
    codeExamples: [
      {
        title: "Pointer Receivers and Methods",
        description: "Using pointers with methods for mutable behavior",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'type Counter struct {',
          '    value int',
          '}',
          '',
          '// Value receiver — can\'t modify the Counter',
          'func (c Counter) Increment() {',
          '    c.value++ // Only modifies the copy!',
          '}',
          '',
          'func main() {',
          '    c := Counter{value: 0}',
          '    c.Increment()',
          '    c.Increment()',
          '    fmt.Println(c.value) // Still 0',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'type Counter struct {',
          '    value int',
          '}',
          '',
          '// Pointer receiver — modifies the original',
          'func (c *Counter) Increment() {',
          '    c.value++',
          '}',
          '',
          '// Value receiver for read-only (efficient)',
          'func (c Counter) Value() int {',
          '    return c.value',
          '}',
          '',
          'func main() {',
          '    c := &Counter{value: 0}',
          '    c.Increment()',
          '    c.Increment()',
          '    fmt.Println(c.Value()) // 2',
          '',
          '    // Pointer enables interface satisfaction',
          '    var p Printer = c // *Counter satisfies Printer',
          '    p.Print()',
          '}',
          '',
          'type Printer interface {',
          '    Print()',
          '}',
          '',
          'func (c *Counter) Print() {',
          '    fmt.Println("Counter:", c.value)',
          '}',
        ].join('\n'),
        explanation: "Use pointer receivers when the method needs to modify the receiver. Value receivers work on copies. If even one method needs a pointer receiver, use pointer receivers for all methods on that type. Pointer receivers enable interface satisfaction where value receivers might not."
      }
    ],
    bestPractices: [
      "Use pointer receivers when the method modifies the receiver",
      "Use value receivers for read-only methods on small structs",
      "If any method uses pointer receiver, use pointer receivers for all methods",
      "Accept interfaces, return concrete types — keep method sets minimal",
      "Let escape analysis decide allocation — don't over-optimize"
    ],
    commonMistakes: [
      "Using value receiver when mutation is needed",
      "Mixing pointer and value receivers on the same type",
      "Not understanding interface satisfaction differs for pointer vs value receivers",
      "Overusing pointers when values would be simpler and safer",
      "Forgetting that nil pointers cause panics on dereference"
    ],
    relatedTopics: [
      "pointers-basics",
      "call-by-value",
      "methods",
      "interfaces"
    ],
    externalResources: [
      { title: "Effective Go: Pointers to Interfaces", url: "https://go.dev/doc/effective_go#pointers" },
      { title: "Go Blog: Mechanism: Stacks and Heap", url: "https://go.dev/blog/slices-intro" },
      { title: "Go Spec: Address operators", url: "https://go.dev/ref/spec#Address_operators" }
    ]
  },

  "comma-ok-idiom": {
    slug: "comma-ok-idiom",
    title: "Comma-OK Idiom",
    summary: "The comma-ok pattern lets you check if a map lookup succeeded, type assertion was valid, or channel receive occurred.",
    description: `The comma-ok idiom is a distinctive Go pattern for distinguishing between a zero value and a missing or invalid result. It appears in three main contexts: map lookups (checking if a key exists), type assertions (checking if an interface holds the expected type), and channel receives (checking if the channel was closed). The pattern returns a second boolean value — true if the operation succeeded, false otherwise.

For maps, value, ok := m[key] returns the value and true if the key exists, or the zero value and false if it doesn't. This is essential because map lookups return the zero value for both "key not found" and "key exists with zero value." Without comma-ok, you can't distinguish these cases.

For type assertions, value, ok := i.(Type) attempts to assert that interface i holds a value of Type. If the assertion fails, ok is false and value is the zero value of Type. Without the comma-ok form, a failed type assertion panics. For channels, value, ok := <-ch receives a value and ok is false when the channel is closed and drained.`,
    keyPoints: [
      "Map lookup: value, ok := m[key] — ok is false if key doesn't exist",
      "Type assertion: value, ok := i.(Type) — ok is false if wrong type",
      "Channel receive: value, ok := <-ch — ok is false when channel is closed",
      "Without comma-ok, type assertion panics on failure",
      "For maps, zero value and missing key both return the zero value",
      "comma-ok prevents using sentinel values (like -1 or \"\") as error indicators",
      "ok is a bool — true means success, false means failure/absence"
    ],
    codeExamples: [
      {
        title: "Comma-OK Idiom Patterns",
        description: "Using comma-ok for maps, type assertions, and channels",
        bad: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    m := map[string]int{"age": 30}',
          '',
          '    // Can\'t distinguish missing key from zero value',
          '    val := m["name"]',
          '    if val == 0 {',
          '        fmt.Println("name is 0 or missing") // Ambiguous!',
          '    }',
          '',
          '    // Unsafe type assertion (panics on failure)',
          '    var i interface{} = "hello"',
          '    // s := i.(int) // PANIC: interface conversion string is not int',
          '',
          '    // Not checking if channel is closed',
          '    ch := make(chan int)',
          '    close(ch)',
          '    // v := <-ch // Returns zero value, but how to know it\'s closed?',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    m := map[string]int{"age": 30}',
          '',
          '    // Comma-ok for maps',
          '    val, ok := m["name"]',
          '    if !ok {',
          '        fmt.Println("name key not found")',
          '    } else {',
          '        fmt.Println("name:", val)',
          '    }',
          '',
          '    // Comma-ok for type assertion',
          '    var i interface{} = "hello"',
          '    if s, ok := i.(string); ok {',
          '        fmt.Println("string:", s)',
          '    } else {',
          '        fmt.Println("not a string")',
          '    }',
          '',
          '    // Comma-ok for channels',
          '    ch := make(chan int, 2)',
          '    ch <- 42',
          '    ch <- 99',
          '    close(ch)',
          '',
          '    for {',
          '        v, ok := <-ch',
          '        if !ok {',
          '            fmt.Println("channel closed")',
          '            break',
          '        }',
          '        fmt.Println("received:", v)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "The comma-ok idiom returns a boolean indicating success. For maps, ok is false when the key doesn't exist — essential for distinguishing missing keys from zero values. For type assertions, comma-ok prevents panics. For channels, ok is false when the channel is closed and drained."
      }
    ],
    bestPractices: [
      "Always use comma-ok for map lookups when zero values are valid",
      "Always use comma-ok type assertions instead of bare assertions (prevent panics)",
      "Use comma-ok channel receive in loops to detect channel closure",
      "Combine comma-ok with if-else for clean branching",
      "Use the blank identifier _ to ignore the ok value when the check is unnecessary"
    ],
    commonMistakes: [
      "Not using comma-ok for map lookups, confusing zero value with missing key",
      "Using bare type assertions without comma-ok (panic on failure)",
      "Forgetting that ok is false when a channel is closed and drained",
      "Using sentinel values (-1, \"\") instead of comma-ok for existence checks",
      "Ignoring the ok value when it carries important information"
    ],
    relatedTopics: [
      "maps",
      "type-conversion",
      "multiple-return-values",
      "zero-values"
    ],
    externalResources: [
      { title: "Go Tour: Maps", url: "https://go.dev/tour/moretypes/10" },
      { title: "Effective Go: Maps", url: "https://go.dev/doc/effective_go#maps" },
      { title: "Go Blog: Go Slices: Internals", url: "https://go.dev/blog/slices-intro" }
    ]
  },
};
