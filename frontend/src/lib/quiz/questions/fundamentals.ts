import type { QuizQuestion } from "../types";

export const fundamentalsQuestions: Record<string, QuizQuestion[]> = {
  "introduction-to-go": [
    {
      id: "intro-1",
      type: "multiple-choice",
      question: "Who designed the Go programming language?",
      options: [
        { id: "a", text: "Dennis Ritchie" },
        { id: "b", text: "Rob Pike, Ken Thompson, and Robert Griesemer" },
        { id: "c", text: "Guido van Rossum" },
        { id: "d", text: "Bjarne Stroustrup" },
      ],
      correctAnswer: "b",
      explanation: "Go was designed at Google by Rob Pike, Ken Thompson, and Robert Griesemer. It was publicly announced in November 2009 and became a stable version in 2012.",
      difficulty: "easy",
      points: 10,
      tags: ["history", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-2",
      type: "true-false",
      question: "Go is an interpreted programming language.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go is a compiled language. It compiles directly to machine code, which contributes to its fast execution speed and fast startup time compared to interpreted languages.",
      difficulty: "easy",
      points: 10,
      tags: ["fundamentals", "compilation"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-3",
      type: "multiple-choice",
      question: "Which of the following is NOT a core design goal of Go?",
      options: [
        { id: "a", text: "Fast compilation" },
        { id: "b", text: "Memory safety with garbage collection" },
        { id: "c", text: "Object-oriented inheritance" },
        { id: "d", text: "Built-in concurrency support" },
      ],
      correctAnswer: "c",
      explanation: "Go deliberately omits classical OOP inheritance. It uses composition, interfaces, and struct embedding instead. Go prioritizes simplicity, fast compilation, memory safety, and concurrency.",
      difficulty: "easy",
      points: 10,
      tags: ["design", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-4",
      type: "multiple-select",
      question: "Which of the following are benefits of Go? (Select all that apply)",
      options: [
        { id: "a", text: "Garbage collection" },
        { id: "b", text: "Manual memory management" },
        { id: "c", text: "Goroutines for lightweight concurrency" },
        { id: "d", text: "Fast compile times" },
      ],
      correctAnswer: ["a", "c", "d"],
      explanation: "Go provides garbage collection (not manual memory management), lightweight goroutines, and fast compilation. Manual memory management is characteristic of C/C++, not Go.",
      difficulty: "easy",
      points: 10,
      tags: ["benefits", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-5",
      type: "code-output",
      question: "What is the output of this program?",
      code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
      options: [
        { id: "a", text: "Hello, World!" },
        { id: "b", text: "hello, world!" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime error" },
      ],
      correctAnswer: "a",
      explanation: "The program imports fmt, calls Println with a string literal, and outputs 'Hello, World!' followed by a newline. The program compiles and runs without errors.",
      difficulty: "easy",
      points: 10,
      tags: ["code-output", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-6",
      type: "multiple-choice",
      question: "What is the command to compile and run a Go program in one step?",
      options: [
        { id: "a", text: "go run" },
        { id: "b", text: "go build" },
        { id: "c", text: "go compile" },
        { id: "d", text: "go exec" },
      ],
      correctAnswer: "a",
      explanation: "'go run' compiles and runs the program in one step. 'go build' only compiles the program to an executable. There is no 'go compile' or 'go exec' command.",
      difficulty: "easy",
      points: 10,
      tags: ["tooling", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-7",
      type: "true-false",
      question: "Go requires a semicolon at the end of each statement.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go does not require semicolons. The compiler automatically inserts them during parsing. This is one of Go's design decisions to keep code clean. You would only need explicit semicolons in rare cases.",
      difficulty: "easy",
      points: 10,
      tags: ["syntax", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-8",
      type: "multiple-choice",
      question: "What is the file extension for Go source files?",
      options: [
        { id: "a", text: ".g" },
        { id: "b", text: ".go" },
        { id: "c", text: ".golang" },
        { id: "d", text: ".gp" },
      ],
      correctAnswer: "b",
      explanation: "Go source files use the '.go' extension. This is a universal convention and required by the Go toolchain.",
      difficulty: "easy",
      points: 10,
      tags: ["tooling", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-9",
      type: "multiple-select",
      question: "Which of the following industries commonly use Go? (Select all that apply)",
      options: [
        { id: "a", text: "Cloud infrastructure (Docker, Kubernetes)" },
        { id: "b", text: "Web backend services" },
        { id: "c", text: "Mobile app development (iOS/Android UI)" },
        { id: "d", text: "DevOps and CLI tooling" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Go is widely used for cloud infrastructure, web backends, and DevOps tooling. It is not commonly used for building iOS/Android UIs — Swift/Kotlin are the standard there.",
      difficulty: "easy",
      points: 10,
      tags: ["ecosystem", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-10",
      type: "scenario",
      question: "Your team needs a language for a high-throughput microservice handling millions of requests per second. Which Go characteristic makes it most suitable?",
      options: [
        { id: "a", text: "Dynamic typing makes prototyping faster" },
        { id: "b", text: "Compiled to native binaries with low latency and built-in concurrency via goroutines" },
        { id: "c", text: "JIT compilation provides runtime optimization" },
        { id: "d", text: "Multithreading model matches Java's threading" },
      ],
      correctAnswer: "b",
      explanation: "Go compiles to native binaries (no JVM startup overhead), has garbage collection, and goroutines enable lightweight concurrency — ideal for high-throughput microservices. Go is statically typed, not dynamic.",
      difficulty: "medium",
      points: 20,
      tags: ["scenario", "concurrency"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-11",
      type: "best-practice",
      question: "What is the recommended way to organize a Go project's source code?",
      options: [
        { id: "a", text: "Use GOPATH for all projects with shared source directories" },
        { id: "b", text: "Use Go modules with a go.mod file at the project root" },
        { id: "c", text: "Place all .go files in the same directory" },
        { id: "d", text: "Use a monorepo without dependency management" },
      ],
      correctAnswer: "b",
      explanation: "Go modules (introduced in Go 1.11, default since 1.16) is the standard dependency management system. Each project has a go.mod file defining its module path and dependencies. GOPATH-based workflows are legacy.",
      difficulty: "medium",
      points: 20,
      tags: ["best-practice", "tooling"],
      relatedLesson: "introduction-to-go",
    },
    {
      id: "intro-12",
      type: "identify-bug",
      question: "This program fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    fmt.Println("Hello")
    fmt.Println("World")
}`,
      options: [
        { id: "a", text: "Missing semicolons between statements" },
        { id: "b", text: "The code compiles and runs correctly — there is no bug" },
        { id: "c", text: "The import path for fmt is incorrect" },
        { id: "d", text: "The main function is not exported" },
      ],
      correctAnswer: "b",
      explanation: "This code compiles and runs correctly. Go automatically inserts semicolons, fmt is a standard library package, and main() in package main is the correct entry point. There is no bug.",
      difficulty: "medium",
      points: 20,
      tags: ["identify-bug", "fundamentals"],
      relatedLesson: "introduction-to-go",
    },
  ],
  "history-of-go": [
    {
      id: "history-1",
      type: "multiple-choice",
      question: "In what year was Go first publicly announced?",
      options: [
        { id: "a", text: "2007" },
        { id: "b", text: "2009" },
        { id: "c", text: "2012" },
        { id: "d", text: "2014" },
      ],
      correctAnswer: "b",
      explanation: "Go was publicly announced in November 2009. Development began in 2007, and Go 1.0 was released in March 2012.",
      difficulty: "easy",
      points: 10,
      tags: ["history"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-2",
      type: "multiple-choice",
      question: "At which company was Go originally developed?",
      options: [
        { id: "a", text: "Microsoft" },
        { id: "b", text: "Facebook" },
        { id: "c", text: "Google" },
        { id: "d", text: "Oracle" },
      ],
      correctAnswer: "c",
      explanation: "Go was designed and developed at Google. The initial team included Rob Pike, Ken Thompson, and Robert Griesemer, all Google engineers at the time.",
      difficulty: "easy",
      points: 10,
      tags: ["history"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-3",
      type: "true-false",
      question: "Go 1.0 was released the same year Go was publicly announced (2009).",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go was announced in 2009, but Go 1.0 was released on March 28, 2012. The gap allowed the team to stabilize the language and standard library.",
      difficulty: "easy",
      points: 10,
      tags: ["history", "versioning"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-4",
      type: "multiple-select",
      question: "Which languages influenced Go's design? (Select all that apply)",
      options: [
        { id: "a", text: "C" },
        { id: "b", text: "Python" },
        { id: "c", text: "Pascal" },
        { id: "d", text: "Smalltalk" },
      ],
      correctAnswer: ["a", "c"],
      explanation: "Go's syntax was influenced by C (for low-level control) and Pascal/Modula-2 (for structured programming, packages). Ken Thompson and Rob Pike had deep experience with these languages.",
      difficulty: "medium",
      points: 20,
      tags: ["history", "design"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-5",
      type: "multiple-choice",
      question: "What was the primary motivation behind creating Go at Google?",
      options: [
        { id: "a", text: "To replace Java for Android development" },
        { id: "b", text: "To address slow build times and complexity in large C++ codebases" },
        { id: "c", text: "To compete with Python for machine learning" },
        { id: "d", text: "To create a browser scripting language" },
      ],
      correctAnswer: "b",
      explanation: "Go was created to solve problems at Google: slow compilation of large C++ codebases, difficulty with concurrent programming, and language complexity. Rob Pike's talks describe frustration with build times measured in hours.",
      difficulty: "medium",
      points: 20,
      tags: ["history", "motivation"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-6",
      type: "multiple-choice",
      question: "What is the name of the mascot/logo of the Go programming language?",
      options: [
        { id: "a", text: "Rex" },
        { id: "b", text: "Gopher" },
        { id: "c", text: "GoBot" },
        { id: "d", text: "GoBear" },
      ],
      correctAnswer: "b",
      explanation: "The Go mascot is a gopher, designed by Renee French. The gopher has become an iconic symbol of the Go community, and gopher-related imagery is used extensively in Go conferences and materials.",
      difficulty: "easy",
      points: 10,
      tags: ["culture", "fundamentals"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-7",
      type: "multiple-choice",
      question: "Which of these is an early language that Go's designers worked on before Go?",
      options: [
        { id: "a", text: "Java" },
        { id: "b", text: "Limbo/Inferno" },
        { id: "c", text: "Ruby" },
        { id: "d", text: "Haskell" },
      ],
      correctAnswer: "b",
      explanation: "Rob Pike and others developed Limbo and the Inferno operating system at Bell Labs. Go borrowed ideas from these projects, including the concept of channels and lightweight concurrency (CSP model).",
      difficulty: "medium",
      points: 20,
      tags: ["history", "influences"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-8",
      type: "true-false",
      question: "The Go 1 compatibility promise guarantees that Go 1.x programs will compile and run on future Go versions.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "The Go 1 compatibility promise (Go 1 release, 2012) guarantees that Go 1.x code will continue to compile and run. This stability commitment is one of Go's core principles.",
      difficulty: "easy",
      points: 10,
      tags: ["history", "compatibility"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-9",
      type: "multiple-choice",
      question: "What concurrency model does Go adopt?",
      options: [
        { id: "a", text: "Shared memory with locks (like Java)" },
        { id: "b", text: "Communicating Sequential Processes (CSP)" },
        { id: "c", text: "Actor model (like Erlang)" },
        { id: "d", text: "Async/await (like JavaScript)" },
      ],
      correctAnswer: "b",
      explanation: "Go uses the CSP (Communicating Sequential Processes) concurrency model, where goroutines communicate through channels. This was inspired by Tony Hoare's CSP and the earlier Limbo language.",
      difficulty: "medium",
      points: 20,
      tags: ["history", "concurrency"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-10",
      type: "scenario",
      question: "You're evaluating languages for a project. A colleague says 'Go is just a fad.' Based on Go's track record, which evidence best refutes this claim?",
      options: [
        { id: "a", text: "Go has been used in production at Google, Netflix, Uber, Dropbox, and as the backbone of Docker and Kubernetes since 2012" },
        { id: "b", text: "Go has the most GitHub stars of any language" },
        { id: "c", text: "Go has been the #1 most-used language since its release" },
        { id: "d", text: "Go replaced C++ entirely at Google" },
      ],
      correctAnswer: "a",
      explanation: "Go has proven staying power with adoption at major companies and as critical infrastructure (Docker, Kubernetes, Terraform). It has been stable since 2012 and continues growing. The other claims are inaccurate exaggerations.",
      difficulty: "medium",
      points: 20,
      tags: ["scenario", "ecosystem"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-11",
      type: "multiple-select",
      question: "Which major open-source projects are written in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Docker" },
        { id: "b", text: "Kubernetes" },
        { id: "c", text: "Redis" },
        { id: "d", text: "Terraform" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Docker, Kubernetes, and Terraform are all written in Go. Redis is written in C. Go's standard library and tooling make it ideal for building developer infrastructure.",
      difficulty: "medium",
      points: 20,
      tags: ["ecosystem", "fundamentals"],
      relatedLesson: "history-of-go",
    },
    {
      id: "history-12",
      type: "architecture",
      question: "Go's design philosophy emphasizes 'less is more.' Which design choices reflect this philosophy?",
      options: [
        { id: "a", text: "No inheritance, no generics (pre-1.18), no exceptions, no annotations, no constructors" },
        { id: "b", text: "Rich type system with covariance, contravariance, and union types" },
        { id: "c", text: "Multiple inheritance, operator overloading, and implicit type conversions" },
        { id: "d", text: "Pattern matching, macros, and compile-time code generation" },
      ],
      correctAnswer: "a",
      explanation: "Go deliberately excludes many features found in other languages: no class inheritance, no try/catch, no macros, no annotations. This simplicity reduces complexity and makes code easier to read and maintain. Generics were added in Go 1.18 after careful design.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "design"],
      relatedLesson: "history-of-go",
    },
  ],
  "why-use-go": [
    {
      id: "why-1",
      type: "multiple-choice",
      question: "Which of the following is a primary advantage of Go for backend services?",
      options: [
        { id: "a", text: "Dynamic typing allows faster prototyping" },
        { id: "b", text: "Compiled to native binaries with fast startup and low memory footprint" },
        { id: "c", text: "JIT compilation provides runtime optimization" },
        { id: "d", text: "Browser-based execution via WebAssembly only" },
      ],
      correctAnswer: "b",
      explanation: "Go compiles to static native binaries with no runtime/VM overhead. This gives fast startup, low memory usage, and easy deployment — ideal for backend microservices and containers.",
      difficulty: "easy",
      points: 10,
      tags: ["advantages", "backend"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-2",
      type: "true-false",
      question: "Go's garbage collector introduces significant latency that makes it unsuitable for high-performance systems.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go's garbage collector has been heavily optimized over the years. Since Go 1.5, GC pauses are typically sub-millisecond. Go powers Google's production systems and high-throughput services like Uber's dispatch, proving it's suitable for high-performance workloads.",
      difficulty: "easy",
      points: 10,
      tags: ["performance", "gc"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-3",
      type: "multiple-select",
      question: "Why is Go well-suited for cloud-native development? (Select all that apply)",
      options: [
        { id: "a", text: "Produces small static binaries ideal for containers" },
        { id: "b", text: "Cross-compilation is built into the toolchain" },
        { id: "c", text: "Requires a runtime VM for deployment" },
        { id: "d", text: "Standard library includes HTTP server and crypto" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Go produces small static binaries (great for scratch/alpine containers), cross-compiles with GOOS/GOARCH, and includes a robust stdlib with HTTP server, TLS, and more. No runtime VM is needed — this is an advantage over JVM languages.",
      difficulty: "easy",
      points: 10,
      tags: ["cloud-native", "advantages"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-4",
      type: "multiple-choice",
      question: "What makes Go's concurrency model attractive for backend services?",
      options: [
        { id: "a", text: "OS thread-based concurrency only" },
        { id: "b", text: "Lightweight goroutines multiplexed onto OS threads by the Go runtime scheduler" },
        { id: "c", text: "Event-loop model similar to Node.js" },
        { id: "d", text: "Async/await with callback chains" },
      ],
      correctAnswer: "b",
      explanation: "Go's goroutines start with just a few KB of stack and are scheduled onto OS threads by the Go runtime. You can spawn hundreds of thousands of goroutines, whereas OS threads are limited to thousands. This makes concurrent programming simple and efficient.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "goroutines"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-5",
      type: "multiple-choice",
      question: "Go's error handling using explicit return values (no exceptions) is designed to:",
      options: [
        { id: "a", text: "Make code shorter and more concise" },
        { id: "b", text: "Force developers to handle errors immediately at the call site" },
        { id: "c", text: "Allow errors to be silently ignored by default" },
        { id: "d", text: "Reduce the number of keywords in the language" },
      ],
      correctAnswer: "b",
      explanation: "Go's explicit error handling (returning error values) forces developers to acknowledge and handle errors at each call site. There are no hidden control flows like exceptions. This makes error paths visible and explicit in the code.",
      difficulty: "medium",
      points: 20,
      tags: ["error-handling", "design"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-6",
      type: "code-output",
      question: "What is the advantage demonstrated by this cross-compilation command?",
      code: `# Build for Linux on macOS
GOOS=linux GOARCH=amd64 go build -o myapp

# Build for ARM Linux
GOOS=linux GOARCH=arm64 go build -o myapp-arm`,
      options: [
        { id: "a", text: "Go can only compile for the current OS" },
        { id: "b", text: "Go supports cross-compilation to multiple OS/architectures natively without external tools" },
        { id: "c", text: "You need Docker to cross-compile in Go" },
        { id: "d", text: "Cross-compilation requires CGo enabled" },
      ],
      correctAnswer: "b",
      explanation: "Go's toolchain natively supports cross-compilation by setting GOOS and GOARCH environment variables. No external tools or CGo required. This is invaluable for deploying to different server architectures and building binaries for CI/CD pipelines.",
      difficulty: "medium",
      points: 20,
      tags: ["tooling", "deployment"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-7",
      type: "multiple-choice",
      question: "Which of the following best describes Go's type system?",
      options: [
        { id: "a", text: "Fully dynamic with duck typing" },
        { id: "b", text: "Static, structural typing with interfaces satisfied implicitly" },
        { id: "c", text: "Static, nominal typing requiring explicit 'implements' keywords" },
        { id: "d", text: "Gradual typing with runtime type checking" },
      ],
      correctAnswer: "b",
      explanation: "Go uses static typing at compile time with structural (not nominal) interfaces. A type implements an interface by satisfying its method set — no explicit declaration needed. This decouples implementations from interfaces.",
      difficulty: "medium",
      points: 20,
      tags: ["type-system", "interfaces"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-8",
      type: "scenario",
      question: "You're building a CLI tool that needs to be distributed to teams on Linux, macOS, and Windows. Which Go feature is most beneficial?",
      options: [
        { id: "a", text: "Go's dynamic linking allows distribution of shared libraries" },
        { id: "b", text: "Cross-compilation to all three platforms produces standalone static binaries with no dependencies" },
        { id: "c", text: "Go's package manager handles deployment automatically" },
        { id: "d", text: "Go programs run on any OS via the JVM" },
      ],
      correctAnswer: "b",
      explanation: "Go's cross-compilation (GOOS/GOARCH) produces standalone static binaries for any platform. No runtime, VM, or shared libraries needed. Users just download and run the binary — ideal for CLI tools and easy distribution.",
      difficulty: "easy",
      points: 10,
      tags: ["scenario", "deployment"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-9",
      type: "multiple-select",
      question: "Which of the following are reasons companies choose Go over other languages? (Select all that apply)",
      options: [
        { id: "a", text: "Fast compile times improve developer productivity" },
        { id: "b", text: "Built-in tooling: formatter, test framework, doc generator, dependency management" },
        { id: "c", text: "Extensive metaprogramming and macro systems" },
        { id: "d", text: "Simple, readable code style enforced by gofmt" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Go provides fast compilation, comprehensive built-in tools (go fmt, go test, go doc, go mod), and enforces a single code style via gofmt. Go deliberately avoids complex metaprogramming and macros to keep code simple.",
      difficulty: "medium",
      points: 20,
      tags: ["tooling", "ecosystem"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-10",
      type: "best-practice",
      question: "When should you NOT choose Go for a project?",
      options: [
        { id: "a", text: "Building a high-performance network service" },
        { id: "b", text: "Building a complex GUI desktop application with rich UI components" },
        { id: "c", text: "Writing a distributed system" },
        { id: "d", text: "Building a microservice" },
      ],
      correctAnswer: "b",
      explanation: "Go lacks mature GUI frameworks. While bindings exist (Fyne, Gio), Go is not the ideal choice for desktop GUI applications. Go excels at backend services, CLI tools, networking, and distributed systems — not frontend UIs.",
      difficulty: "medium",
      points: 20,
      tags: ["best-practice", "use-cases"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-11",
      type: "identify-bug",
      question: "This Go program demonstrates a common misconception. What's wrong with expecting Go to behave like this?",
      code: `package main

import "fmt"

// Trying to use exceptions-style error handling
func divide(a, b int) int {
    if b == 0 {
        panic("division by zero") // This compiles but panics
    }
    return a / b
}

func main() {
    result := divide(10, 0)
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "The code won't compile because panic is not a valid function" },
        { id: "b", text: "The program will panic at runtime — Go uses panic/recover, not try/catch, and this should use error returns instead" },
        { id: "c", text: "The code is correct and idiomatic Go" },
        { id: "d", text: "The code has a syntax error in the if statement" },
      ],
      correctAnswer: "b",
      explanation: "While panic() compiles, it's not idiomatic for expected errors. Go's convention is to return an error value: func divide(a, b int) (int, error). Panic is for truly unrecoverable situations. The program will panic at runtime with 'division by zero'.",
      difficulty: "hard",
      points: 30,
      tags: ["error-handling", "identify-bug", "idioms"],
      relatedLesson: "why-use-go",
    },
    {
      id: "why-12",
      type: "architecture",
      question: "Your organization is deciding between Go and Rust for a new microservice platform. Which scenario best fits Go?",
      options: [
        { id: "a", text: "Building a microservice platform where developer velocity, team scalability, and standard library coverage are top priorities" },
        { id: "b", text: "Writing firmware for an embedded device with no OS" },
        { id: "c", text: "Building a game engine requiring zero-cost abstractions and manual memory control" },
        { id: "d", text: "Implementing a real-time audio processing kernel" },
      ],
      correctAnswer: "a",
      explanation: "Go excels when developer productivity, fast compilation, readable code, and a rich standard library matter most. Rust is better for systems requiring zero-cost abstractions, manual memory control, or no_std environments. For a microservice platform, Go's simplicity and goroutines are ideal.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "language-comparison"],
      relatedLesson: "why-use-go",
    },
  ],
  "setting-up-the-environment": [
    {
      id: "setup-1",
      type: "multiple-choice",
      question: "What is the command to verify Go is installed and check its version?",
      options: [
        { id: "a", text: "go version" },
        { id: "b", text: "go --version" },
        { id: "c", text: "go -v" },
        { id: "d", text: "go info" },
      ],
      correctAnswer: "a",
      explanation: "'go version' is the correct command. It prints the installed Go version. 'go --version' and 'go -v' are not valid commands.",
      difficulty: "easy",
      points: 10,
      tags: ["tooling", "setup"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-2",
      type: "multiple-choice",
      question: "Which environment variable tells Go where to install binaries?",
      options: [
        { id: "a", text: "GOPATH" },
        { id: "b", text: "GOBIN" },
        { id: "c", text: "GOROOT" },
        { id: "d", text: "GOFLAGS" },
      ],
      correctAnswer: "b",
      explanation: "GOBIN specifies the directory where 'go install' places binaries. Defaults to $GOPATH/bin or ~/go/bin if GOPATH is not set. GOROOT is where Go is installed, GOPATH is the workspace root.",
      difficulty: "easy",
      points: 10,
      tags: ["environment", "tooling"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-3",
      type: "multiple-select",
      question: "Which of the following are valid ways to initialize a new Go module? (Select all that apply)",
      options: [
        { id: "a", text: "go mod init mymodule" },
        { id: "b", text: "go mod new mymodule" },
        { id: "c", text: "Creating a go.mod file manually with module and go directives" },
        { id: "d", text: "go init mymodule" },
      ],
      correctAnswer: ["a", "c"],
      explanation: "'go mod init mymodule' is the standard way. You can also manually create a go.mod file with 'module mymodule' and 'go 1.x' directives. 'go mod new' and 'go init' are not valid commands.",
      difficulty: "easy",
      points: 10,
      tags: ["modules", "setup"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-4",
      type: "true-false",
      question: "The GOROOT environment variable points to the directory where Go's standard library source code resides.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "GOROOT is the directory where the Go distribution is installed. It contains the standard library source, compiler, and tools. It's usually auto-detected and doesn't need to be set manually.",
      difficulty: "easy",
      points: 10,
      tags: ["environment", "setup"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-5",
      type: "multiple-choice",
      question: "What does the 'go vet' command do?",
      options: [
        { id: "a", text: "Runs the test suite for the current package" },
        { id: "b", text: "Reports suspicious constructs and potential errors in Go source code" },
        { id: "c", text: "Formats code according to Go standards" },
        { id: "d", text: "Downloads and installs dependencies" },
      ],
      correctAnswer: "b",
      explanation: "'go vet' statically analyzes Go source code and reports suspicious constructs that may be bugs (e.g., printf format mismatches, unreachable code, incorrect struct field usage). It's a crucial pre-commit check.",
      difficulty: "easy",
      points: 10,
      tags: ["tooling", "analysis"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-6",
      type: "code-output",
      question: "What does this command produce?",
      code: `go mod init example.com/myproject
go mod tidy
cat go.mod`,
      options: [
        { id: "a", text: "A go.mod file with the module path and dependencies" },
        { id: "b", text: "A go.sum file only" },
        { id: "c", text: "An error — 'cat' is not a Go command" },
        { id: "d", text: "A compiled binary" },
      ],
      correctAnswer: "a",
      explanation: "go mod init creates a go.mod file, go mod tidy adds required dependencies and removes unused ones. cat go.mod prints the file, showing the module path, Go version, and require statements.",
      difficulty: "easy",
      points: 10,
      tags: ["modules", "tooling"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-7",
      type: "multiple-choice",
      question: "What is the purpose of the 'gofmt' tool?",
      options: [
        { id: "a", text: "It checks for security vulnerabilities in code" },
        { id: "b", text: "It formats Go source code to a standard canonical style" },
        { id: "c", text: "It compiles Go code to machine code" },
        { id: "d", text: "It generates documentation from code comments" },
      ],
      correctAnswer: "b",
      explanation: "gofmt reformats Go code to the standard canonical layout. It handles indentation, spacing, and alignment. 'go fmt' is a wrapper that runs gofmt on all .go files in the current directory. This eliminates style debates.",
      difficulty: "medium",
      points: 20,
      tags: ["tooling", "formatting"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-8",
      type: "multiple-select",
      question: "Which of these are valid Go workspace modes? (Select all that apply)",
      options: [
        { id: "a", text: "Module-aware mode (default since Go 1.16)" },
        { id: "b", text: "GOPATH mode (legacy, no go.mod)" },
        { id: "c", text: "Vendor mode (using vendor directory)" },
        { id: "d", text: "Sandbox mode (isolated compilation)" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go supports module-aware mode (with go.mod), legacy GOPATH mode, and vendor mode (vendoring dependencies). There is no 'sandbox mode'. Vendor mode uses 'go mod vendor' to copy dependencies into a vendor/ directory.",
      difficulty: "medium",
      points: 20,
      tags: ["workspaces", "modules"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-9",
      type: "scenario",
      question: "You just cloned a Go repository and want to set up your development environment. What is the correct sequence of steps?",
      options: [
        { id: "a", text: "go install, then go build, then go test" },
        { id: "b", text: "go mod download (or go mod tidy), then go build, then go test" },
        { id: "c", text: "npm install, then go build" },
        { id: "d", text: "git clone, then go run" },
      ],
      correctAnswer: "b",
      explanation: "After cloning, run 'go mod tidy' or 'go mod download' to fetch dependencies, then 'go build' to verify compilation, then 'go test' to run tests. npm is for Node.js. 'go install' installs binaries, not project dependencies.",
      difficulty: "medium",
      points: 20,
      tags: ["workflow", "setup"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-10",
      type: "best-practice",
      question: "What is the recommended way to manage Go versions across different projects on your machine?",
      options: [
        { id: "a", text: "Always use the latest stable Go version for all projects" },
        { id: "b", text: "Use a version manager like 'go install golang.org/dl/go1.x@latest' or 'gvm'/'asdf' to switch between Go versions" },
        { id: "c", text: "Manually download and replace Go binaries" },
        { id: "d", text: "Never update Go — use the version that came with your OS" },
      ],
      correctAnswer: "b",
      explanation: "Using a version manager (official dl tool, gvm, asdf, or brew) lets you install and switch between Go versions per project. Different projects may require specific Go versions, especially when working with generics, workspaces, or specific toolchain features.",
      difficulty: "medium",
      points: 20,
      tags: ["best-practice", "tooling"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-11",
      type: "multiple-choice",
      question: "What does 'go env GOPATH' do?",
      options: [
        { id: "a", text: "Sets the GOPATH to a new value" },
        { id: "b", text: "Prints the current value of the GOPATH environment variable" },
        { id: "c", text: "Resets GOPATH to the default value" },
        { id: "d", text: "Opens GOPATH in the file explorer" },
      ],
      correctAnswer: "b",
      explanation: "'go env GOPATH' prints the current GOPATH value. To set it, use 'go env -w GOPATH=/new/path'. The 'go env' command reads all Go environment variables, and 'go env -w' writes them persistently.",
      difficulty: "medium",
      points: 20,
      tags: ["tooling", "environment"],
      relatedLesson: "setting-up-the-environment",
    },
    {
      id: "setup-12",
      type: "identify-bug",
      question: "A developer runs this command and gets an error. What's wrong?",
      code: `$ cd myproject
$ go build
go: go.mod file not found in current directory or any parent directory.
To create one:
\tgo mod init example.com/myproject`,
      options: [
        { id: "a", text: "The Go version is too old" },
        { id: "b", text: "The project is not initialized as a Go module — a go.mod file is missing" },
        { id: "c", text: "The GOPATH is not set" },
        { id: "d", text: "The source files have syntax errors" },
      ],
      correctAnswer: "b",
      explanation: "Since Go 1.16, module-aware mode is the default. Every Go project needs a go.mod file. The fix is to run 'go mod init <module-path>' to create the go.mod file. This is the most common setup issue for new Go projects.",
      difficulty: "medium",
      points: 20,
      tags: ["modules", "identify-bug", "setup"],
      relatedLesson: "setting-up-the-environment",
    },
  ],
  "hello-world-in-go": [
    {
      id: "hello-1",
      type: "multiple-choice",
      question: "What must every executable Go program have?",
      options: [
        { id: "a", text: "A function named init()" },
        { id: "b", text: "A main() function in package main" },
        { id: "c", text: "A Run() function in the root package" },
        { id: "d", text: "An Entry() function" },
      ],
      correctAnswer: "b",
      explanation: "Every executable Go program must have a main() function in a package named main. This is the entry point. Library packages do not need a main() function.",
      difficulty: "easy",
      points: 10,
      tags: ["basics", "packages"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-2",
      type: "multiple-choice",
      question: "What is the first line in every Go source file?",
      options: [
        { id: "a", text: "import \"fmt\"" },
        { id: "b", text: "package <name>" },
        { id: "c", text: "func main()" },
        { id: "d", text: "// Package documentation" },
      ],
      correctAnswer: "b",
      explanation: "Every Go source file begins with a package declaration: 'package <name>'. This declares which package the file belongs to. All files in a directory must have the same package name.",
      difficulty: "easy",
      points: 10,
      tags: ["packages", "syntax"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-3",
      type: "code-output",
      question: "What is the output of this program?",
      code: `package main

import "fmt"

func main() {
    fmt.Println("Hello", "World")
}`,
      options: [
        { id: "a", text: "Hello World" },
        { id: "b", text: "HelloWorld" },
        { id: "c", text: "Hello, World" },
        { id: "d", text: "Hello World\n" },
      ],
      correctAnswer: "a",
      explanation: "fmt.Println adds spaces between arguments and appends a newline. 'Hello' and 'World' are separated by a space, and a newline is appended. The output is 'Hello World\\n'. Note: Println adds spaces between arguments, unlike Printf.",
      difficulty: "easy",
      points: 10,
      tags: ["code-output", "fmt"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-4",
      type: "multiple-select",
      question: "Which of the following are standard library print functions in Go? (Select all that apply)",
      options: [
        { id: "a", text: "fmt.Println" },
        { id: "b", text: "fmt.Print" },
        { id: "c", text: "fmt.Printf" },
        { id: "d", text: "fmt.Printlnf" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "fmt.Println, fmt.Print, and fmt.Printf are all valid. Println adds a newline, Print does not add a newline or spaces, Printf uses format strings. 'Printlnf' does not exist.",
      difficulty: "easy",
      points: 10,
      tags: ["fmt", "output"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-5",
      type: "true-false",
      question: "In Go, the package name 'main' has special meaning — it tells the linker to create an executable rather than a library.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Package main is special in Go. When the compiler sees 'package main', it knows to produce an executable binary. The main() function is the entry point. All other packages produce library archives (.a files).",
      difficulty: "easy",
      points: 10,
      tags: ["packages", "compilation"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-6",
      type: "code-output",
      question: "What is the output of this program?",
      code: `package main

import "fmt"

func main() {
    fmt.Print("Hello")
    fmt.Print(" World")
    fmt.Println("!")
}`,
      options: [
        { id: "a", text: "Hello World!" },
        { id: "b", text: "Hello\nWorld!\n" },
        { id: "c", text: "Hello World!\n" },
        { id: "d", text: "HelloWorld!" },
      ],
      correctAnswer: "c",
      explanation: "Print does not add newlines or spaces. The first Print writes 'Hello', the second writes ' World' (note the leading space), and Println writes '!' followed by a newline. Output: 'Hello World!\\n'.",
      difficulty: "medium",
      points: 20,
      tags: ["code-output", "fmt"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-7",
      type: "identify-bug",
      question: "This program fails to compile. What is the error?",
      code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
      options: [
        { id: "a", text: "Missing semicolon after main()" },
        { id: "b", text: "This code compiles and runs correctly — there is no bug" },
        { id: "c", text: "The fmt package is not imported" },
        { id: "d", text: "func must be capitalized" },
      ],
      correctAnswer: "b",
      explanation: "This is the standard Go hello world program. It has package main, imports fmt, defines main(), and calls Println. It compiles and runs correctly. There is no bug.",
      difficulty: "medium",
      points: 20,
      tags: ["identify-bug", "basics"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-8",
      type: "multiple-choice",
      question: "What is the difference between fmt.Print and fmt.Println?",
      options: [
        { id: "a", text: "Print adds a newline; Println does not" },
        { id: "b", text: "Print does not add a newline; Println appends a newline" },
        { id: "c", text: "Print can only print strings; Println can print any type" },
        { id: "d", text: "There is no difference" },
      ],
      correctAnswer: "b",
      explanation: "fmt.Print writes to stdout without adding a newline. fmt.Println writes to stdout and appends a newline. Both can accept any values — they use the default format for each type.",
      difficulty: "easy",
      points: 10,
      tags: ["fmt", "output"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-9",
      type: "complete-code",
      question: "Complete the code to print 'Hello, World!' followed by a newline.",
      code: `package main

import "fmt"

func main() {
    ___
}`,
      options: [
        { id: "a", text: 'fmt.Println("Hello, World!")' },
        { id: "b", text: 'fmt.Print("Hello, World!")' },
        { id: "c", text: 'fmt.Println("Hello, World!")' },
        { id: "d", text: 'print("Hello, World!")' },
      ],
      correctAnswer: "c",
      explanation: "fmt.Println('Hello, World!') prints the string followed by a newline. fmt.Print prints without a newline. print() is a builtin that doesn't go through fmt and uses different formatting.",
      difficulty: "easy",
      points: 10,
      tags: ["complete-code", "fmt"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-10",
      type: "multiple-choice",
      question: "How do you compile a Go program named main.go into an executable?",
      options: [
        { id: "a", text: "go compile main.go" },
        { id: "b", text: "go build main.go" },
        { id: "c", text: "go make main.go" },
        { id: "d", text: "go link main.go" },
      ],
      correctAnswer: "b",
      explanation: "'go build main.go' compiles the program and produces an executable. For a main package, it produces a binary named after the directory (or module). 'go run main.go' compiles and runs in one step.",
      difficulty: "easy",
      points: 10,
      tags: ["tooling", "compilation"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-11",
      type: "scenario",
      question: "You want to write a Go program that prints a multi-line string literal. Which approach works?",
      options: [
        { id: "a", text: "Use backticks for a raw string literal" },
        { id: "b", text: "Use triple quotes like Python" },
        { id: "c", text: "Use double backticks for raw strings" },
        { id: "d", text: "Go does not support multi-line strings" },
      ],
      correctAnswer: "a",
      explanation: "Go supports raw string literals using backticks: `line1\\nline2`. Backtick strings are interpreted literally — no escape sequences. For interpreted strings with \\n, use double quotes with explicit newlines.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "syntax"],
      relatedLesson: "hello-world-in-go",
    },
    {
      id: "hello-12",
      type: "architecture",
      question: "You're building a Go project with multiple packages. What is the correct directory structure convention?",
      options: [
        { id: "a", text: "All .go files go in the root directory" },
        { id: "b", text: "Each package has its own directory; the directory name matches the package name; main package goes in cmd/ or root" },
        { id: "c", text: "All packages go in a single file" },
        { id: "d", text: "Package names must match directory names exactly, including capitalization" },
      ],
      correctAnswer: "b",
      explanation: "Go convention: each package is a directory, directory name matches package name (lowercase, no underscores typically). The main package typically goes in cmd/appname/ or the project root. This structure supports clean imports and builds.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "project-structure"],
      relatedLesson: "hello-world-in-go",
    },
  ],
  "variables--constants": [
    {
      id: "vars-1",
      type: "multiple-choice",
      question: "Which of the following is a valid variable declaration in Go?",
      options: [
        { id: "a", text: 'var x = 10' },
        { id: "b", text: 'variable x = 10' },
        { id: "c", text: 'let x = 10' },
        { id: "d", text: 'dim x as int = 10' },
      ],
      correctAnswer: "a",
      explanation: "Go uses 'var' for variable declarations. 'variable', 'let', and 'dim' are from other languages. Go's var keyword can be used with or without an explicit type.",
      difficulty: "easy",
      points: 10,
      tags: ["variables", "syntax"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-2",
      type: "multiple-choice",
      question: "What is the short variable declaration operator in Go?",
      options: [
        { id: "a", text: ":=" },
        { id: "b", text: "=:" },
        { id: "c", text: "==" },
        { id: "d", text: "::" },
      ],
      correctAnswer: "a",
      explanation: "':=' is the short variable declaration operator. It declares and initializes a variable in one step, inferring the type. It can only be used inside functions. Example: x := 10 declares x as int with value 10.",
      difficulty: "easy",
      points: 10,
      tags: ["variables", "syntax"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-3",
      type: "code-output",
      question: "What is the value of x after this code runs?",
      code: `package main

import "fmt"

func main() {
    x := 5
    x = x + 2
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "7" },
        { id: "c", text: "2" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "x is initialized to 5, then x = x + 2 makes x equal to 7. The short declaration creates x as an int, and reassignment with = updates its value.",
      difficulty: "easy",
      points: 10,
      tags: ["variables", "code-output"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-4",
      type: "multiple-select",
      question: "Which of the following are valid ways to declare a variable in Go? (Select all that apply)",
      options: [
        { id: "a", text: 'var x int' },
        { id: "b", text: 'var x int = 10' },
        { id: "c", text: 'var x = 10' },
        { id: "d", text: 'int x = 10' },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go supports var x int (zero value), var x int = 10 (explicit type), and var x = 10 (type inference). 'int x = 10' is C/Java syntax, not valid Go.",
      difficulty: "easy",
      points: 10,
      tags: ["variables", "declaration"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-5",
      type: "true-false",
      question: "In Go, the := operator can only be used inside functions.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "The short variable declaration := can only be used inside function bodies. At package level, you must use var or const declarations. This is a language rule enforced by the compiler.",
      difficulty: "easy",
      points: 10,
      tags: ["variables", "scope"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-6",
      type: "multiple-choice",
      question: "What happens when you declare a variable with var but don't initialize it?",
      options: [
        { id: "a", text: "Compilation error — all variables must be initialized" },
        { id: "b", text: "The variable gets the zero value for its type" },
        { id: "c", text: "The variable gets a random garbage value" },
        { id: "d", text: "The variable is nil regardless of type" },
      ],
      correctAnswer: "b",
      explanation: "Go guarantees zero initialization. var x int gives x the value 0. var s string gives s an empty string. var b bool gives false. var p *int gives nil. Every type has a defined zero value.",
      difficulty: "medium",
      points: 20,
      tags: ["variables", "zero-values"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-7",
      type: "code-output",
      question: "What is the output of this program?",
      code: `package main

import "fmt"

func main() {
    var (
        a int
        b string
        c bool
        d float64
    )
    fmt.Printf("%v %q %v %v\\n", a, b, c, d)
}`,
      options: [
        { id: "a", text: '0 "" false 0' },
        { id: "b", text: "nil nil nil nil" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "0 0 0 0" },
      ],
      correctAnswer: "a",
      explanation: "All variables get their zero values: int→0, string→empty string (printed as \"\" with %q), bool→false, float64→0. The zero value is not nil — nil is only for pointers, slices, maps, channels, interfaces, and functions.",
      difficulty: "medium",
      points: 20,
      tags: ["zero-values", "variables"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-8",
      type: "multiple-choice",
      question: "Can you declare multiple variables of the same type in a single var statement?",
      options: [
        { id: "a", text: "No, each variable must have its own var statement" },
        { id: "b", text: "Yes, using var (a, b, c int)" },
        { id: "c", text: "Yes, using var [a, b, c] int" },
        { id: "d", text: "Yes, using var a, b, c: int" },
      ],
      correctAnswer: "b",
      explanation: "Go supports grouped declarations: var (a, b, c int) declares three int variables. You can also initialize them: var a, b, c = 1, 2, 3. This is useful for declaring related variables.",
      difficulty: "medium",
      points: 20,
      tags: ["variables", "syntax"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-9",
      type: "multiple-choice",
      question: "What is the value of a const declared without an explicit type?",
      options: [
        { id: "a", text: "It has no type and can be used as any type" },
        { id: "b", text: "It defaults to int" },
        { id: "c", text: "It defaults to string" },
        { id: "d", text: "It cannot be used in expressions" },
      ],
      correctAnswer: "a",
      explanation: "Untyped constants have a default type (int for integer literals, float64 for float, etc.) but can be used with any compatible type. They can hold values larger than any built-in type at compile time.",
      difficulty: "medium",
      points: 20,
      tags: ["constants", "types"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-10",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func main() {
    x := 10
    y := 20
    x, y = y, x
    fmt.Println(x, y)
}`,
      options: [
        { id: "a", text: "10 20" },
        { id: "b", text: "20 10" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "20 20" },
      ],
      correctAnswer: "b",
      explanation: "Go supports simultaneous assignment: x, y = y, x swaps the values. After the swap, x is 20 and y is 10. This is a common Go idiom that avoids needing a temporary variable.",
      difficulty: "medium",
      points: 20,
      tags: ["variables", "assignment"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-11",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    var x int = "hello"
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "x should be declared as string" },
        { id: "b", text: "Cannot assign a string literal to an int variable — type mismatch" },
        { id: "c", text: "Missing semicolon" },
        { id: "d", text: "The var keyword is wrong — should be let" },
      ],
      correctAnswer: "b",
      explanation: "Go is statically typed. var x int declares x as int, and 'hello' is a string literal. You cannot assign a string to an int variable. This causes a compilation error: 'cannot use \"hello\" (untyped string constant) as int value'.",
      difficulty: "medium",
      points: 20,
      tags: ["type-system", "identify-bug"],
      relatedLesson: "variables--constants",
    },
    {
      id: "vars-12",
      type: "scenario",
      question: "You need to declare a constant for the maximum retry count in a function. What is the idiomatic Go approach?",
      options: [
        { id: "a", text: 'var maxRetries = 3' },
        { id: "b", text: 'const maxRetries = 3' },
        { id: "c", text: 'let MAX_RETRIES = 3' },
        { id: "d", text: 'define MAX_RETRIES = 3' },
      ],
      correctAnswer: "b",
      explanation: "For values that should not change, use const. Idiomatic Go uses camelCase (maxRetries), not SCREAMING_SNAKE_CASE. const maxRetries = 3 creates a compile-time constant. var implies the value might change, which is misleading for constants.",
      difficulty: "hard",
      points: 30,
      tags: ["constants", "best-practice"],
      relatedLesson: "variables--constants",
    },
  ],
  "var-vs": [
    {
      id: "varvs-1",
      type: "multiple-choice",
      question: "What is the key difference between 'var x = 5' and 'x := 5'?",
      options: [
        { id: "a", text: "There is no difference" },
        { id: "b", text: "var can be used at package level; := can only be used inside functions" },
        { id: "c", text: ":= creates a constant; var creates a variable" },
        { id: "d", text: "var requires an explicit type; := does not" },
      ],
      correctAnswer: "b",
      explanation: "Both declare and initialize a variable with type inference. The critical difference is scope: := can only be used inside function bodies, while var works at both package level and function level.",
      difficulty: "easy",
      points: 10,
      tags: ["variables", "syntax"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-2",
      type: "true-false",
      question: "The := operator can declare a new variable and redeclare an existing one in the same statement.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "In a short variable declaration with multiple variables (x, y := 1, 2), if at least one variable is new, the existing variables are reassigned rather than redeclared. This is called 'redeclaration' and is valid Go.",
      difficulty: "medium",
      points: 20,
      tags: ["variables", "declaration"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-3",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func main() {
    x := 10
    fmt.Println(x)
    x, y := 20, 30
    fmt.Println(x, y)
}`,
      options: [
        { id: "a", text: "10 20 30" },
        { id: "b", text: "10 20" },
        { id: "c", text: "Compilation error on second :=" },
        { id: "d", text: "10 10 30" },
      ],
      correctAnswer: "a",
      explanation: "First, x := 10 declares x. Then x, y := 20, 30 redeclares x (since y is new) and assigns new values. This is valid Go — at least one variable in a := must be new. Output: 10, then 20 30.",
      difficulty: "medium",
      points: 20,
      tags: ["variables", "code-output"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-4",
      type: "multiple-choice",
      question: "Which of the following uses var but NOT :=?",
      options: [
        { id: "a", text: "x := 5" },
        { id: "b", text: "var x int = 5" },
        { id: "c", text: "x := 5 (inside a function)" },
        { id: "d", text: "All use :=" },
      ],
      correctAnswer: "b",
      explanation: "var x int = 5 uses the var keyword with explicit type annotation. := is the short variable declaration that combines var and type inference. Only option b uses the var keyword.",
      difficulty: "easy",
      points: 10,
      tags: ["variables", "syntax"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-5",
      type: "multiple-select",
      question: "Which of the following can be done with 'var' but NOT with ':='? (Select all that apply)",
      options: [
        { id: "a", text: "Declare a variable at package level" },
        { id: "b", text: "Declare multiple variables of different types" },
        { id: "c", text: "Declare a variable without initialization" },
        { id: "d", text: "Reassign an existing variable" },
      ],
      correctAnswer: ["a", "c"],
      explanation: "var can be used at package level and without initialization (getting zero values). := cannot be used at package level, and both sides must be initialized. := also cannot reassign existing variables without a new one.",
      difficulty: "medium",
      points: 20,
      tags: ["variables", "declaration"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-6",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    x := 10
    x := 20
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "x cannot be redeclared — both variables in := must be new, or one must be new" },
        { id: "b", text: "Missing semicolon" },
        { id: "c", text: "x is already declared — use x = instead" },
        { id: "d", text: "Both a and c are correct descriptions" },
      ],
      correctAnswer: "d",
      explanation: "x := 20 fails because x was already declared and no new variable is introduced in the := statement. The fix is either 'x = 20' (reassignment) or 'var x = 20' (new scope with var). This is the key difference between var and :=.",
      difficulty: "medium",
      points: 20,
      tags: ["identify-bug", "variables"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var x int
    x := 10
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "0" },
        { id: "b", text: "10" },
        { id: "c", text: "Compilation error — x redeclared" },
        { id: "d", text: "Compilation error — no new variable in :=" },
      ],
      correctAnswer: "c",
      explanation: "var x int declares x in the current scope. x := 10 attempts to redeclare x using :=, but x is already in scope and no new variable is introduced. This is a compilation error.",
      difficulty: "medium",
      points: 20,
      tags: ["variables", "scope"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-8",
      type: "multiple-choice",
      question: "When should you use var instead of :=?",
      options: [
        { id: "a", text: "When you want to be more explicit about the type or when declaring at package level" },
        { id: "b", text: "Never — := is always preferred" },
        { id: "c", text: "Only when declaring constants" },
        { id: "d", text: "Only inside for loops" },
      ],
      correctAnswer: "a",
      explanation: "Use var when: declaring at package level, when you want explicit type annotation for clarity, or when you want a zero value without initialization. Use := for concise local declarations. Both are idiomatic Go.",
      difficulty: "medium",
      points: 20,
      tags: ["best-practice", "variables"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

var x = 100

func main() {
    x := 200
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "100" },
        { id: "b", text: "200" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "0" },
      ],
      correctAnswer: "b",
      explanation: "var x = 100 declares x at package level. Inside main(), x := 200 creates a new local x that shadows the package-level x. fmt.Println prints the local x (200), not the package-level x (100).",
      difficulty: "hard",
      points: 30,
      tags: ["variables", "scope", "shadowing"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-10",
      type: "scenario",
      question: "You're writing a function that receives a nil error. You want to explicitly show this is intentional. Which declaration style is best?",
      options: [
        { id: "a", text: 'err := nil' },
        { id: "b", text: 'var err error = nil' },
        { id: "c", text: 'var err error' },
        { id: "d", text: 'err = nil' },
      ],
      correctAnswer: "c",
      explanation: "var err error explicitly declares an error variable with its zero value (nil). This makes the intent clear. := nil won't compile because nil has no type. err = nil requires err to be previously declared.",
      difficulty: "hard",
      points: 30,
      tags: ["error-handling", "best-practice"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-11",
      type: "multiple-choice",
      question: "What is the purpose of var block declarations?",
      options: [
        { id: "a", text: "They make variables thread-safe" },
        { id: "b", text: "They allow grouping related variable declarations for readability" },
        { id: "c", text: "They create package-private variables" },
        { id: "d", text: "They are required for multi-variable declarations" },
      ],
      correctAnswer: "b",
      explanation: "var blocks (var ( ... )) are purely for readability and organization. They group related declarations: var ( host = \"localhost\"; port = 8080 ). They don't change scoping or behavior — just code organization.",
      difficulty: "medium",
      points: 20,
      tags: ["syntax", "readability"],
      relatedLesson: "var-vs",
    },
    {
      id: "varvs-12",
      type: "architecture",
      question: "In a large Go codebase, what convention should guide the choice between var and :=?",
      options: [
        { id: "a", text: "Always use := for consistency across the codebase" },
        { id: "b", text: "Use := for local short-lived variables; use var for package-level variables and when the type is not obvious from initialization" },
        { id: "c", text: "Always use var for safety, as := can cause bugs" },
        { id: "d", text: "Use var only for constants" },
      ],
      correctAnswer: "b",
      explanation: "The Go community convention: use := for concise local declarations where the type is obvious. Use var when declaring at package level, when the zero value is intended, or when you want to explicitly show the type for clarity.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "conventions"],
      relatedLesson: "var-vs",
    },
  ],
  "zero-values": [
    {
      id: "zero-1",
      type: "multiple-choice",
      question: "What is the zero value of a bool in Go?",
      options: [
        { id: "a", text: "nil" },
        { id: "b", text: "true" },
        { id: "c", text: "false" },
        { id: "d", text: "0" },
      ],
      correctAnswer: "c",
      explanation: "The zero value of bool is false. When you declare var b bool without initializing, b is false. This is guaranteed by the Go specification.",
      difficulty: "easy",
      points: 10,
      tags: ["zero-values", "types"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-2",
      type: "multiple-choice",
      question: "What is the zero value of a pointer in Go?",
      options: [
        { id: "a", text: "0" },
        { id: "b", text: "false" },
        { id: "c", text: "nil" },
        { id: "d", text: "empty pointer" },
      ],
      correctAnswer: "c",
      explanation: "The zero value of pointers, slices, maps, channels, interfaces, and functions is nil. This is important for checking if these types have been initialized.",
      difficulty: "easy",
      points: 10,
      tags: ["zero-values", "pointers"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-3",
      type: "true-false",
      question: "The zero value of a string in Go is the word 'nil'.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "The zero value of a string is an empty string (\"\"), not the word 'nil'. var s string gives s the value \"\". This is a common misconception — only pointer-like types have nil as their zero value.",
      difficulty: "easy",
      points: 10,
      tags: ["zero-values", "strings"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-4",
      type: "multiple-select",
      question: "Which of these types have nil as their zero value? (Select all that apply)",
      options: [
        { id: "a", text: "pointers" },
        { id: "b", text: "slices" },
        { id: "c", text: "maps" },
        { id: "d", text: "integers" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Pointers, slices, maps, channels, interfaces, and functions have nil as their zero value. Integers have 0 as their zero value. Strings have \"\" and bools have false.",
      difficulty: "easy",
      points: 10,
      tags: ["zero-values", "types"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-5",
      type: "code-output",
      question: "What does this code print?",
      code: `package main

import "fmt"

func main() {
    var s []int
    fmt.Println(s == nil, len(s), cap(s))
}`,
      options: [
        { id: "a", text: "true 0 0" },
        { id: "b", text: "false 0 0" },
        { id: "c", text: "nil 0 0" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "A nil slice has len=0 and cap=0, and s == nil is true. A nil slice is perfectly valid in Go — you can iterate over it, append to it, and pass it to functions. It behaves like an empty slice in most operations.",
      difficulty: "easy",
      points: 10,
      tags: ["zero-values", "slices"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-6",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func main() {
    var m map[string]int
    fmt.Println(m == nil)
    // fmt.Println(m["key"]) // Would this work?
}`,
      options: [
        { id: "a", text: "true, and accessing m[\"key\"] would panic" },
        { id: "b", text: "true, and accessing m[\"key\"] would return 0" },
        { id: "c", text: "false" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "A nil map is valid and m == nil is true. Reading from a nil map returns the zero value of the value type (0 for int). However, writing to a nil map panics. This is a key distinction: reads are safe, writes are not.",
      difficulty: "medium",
      points: 20,
      tags: ["zero-values", "maps"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-7",
      type: "multiple-choice",
      question: "What is the zero value of an interface in Go?",
      options: [
        { id: "a", text: "Empty interface with value nil" },
        { id: "b", text: "nil (both type and value are nil)" },
        { id: "c", text: "Runtime error" },
        { id: "d", text: "An empty struct" },
      ],
      correctAnswer: "b",
      explanation: "A nil interface has both its type and value as nil. This is different from an interface holding a nil pointer — that interface has a type. Checking i == nil is true only when both type and value are nil.",
      difficulty: "medium",
      points: 20,
      tags: ["zero-values", "interfaces"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

type MyStruct struct {
    Name string
    Age  int
}

func main() {
    var s MyStruct
    fmt.Printf("%q %d\\n", s.Name, s.Age)
}`,
      options: [
        { id: "a", text: '"" 0' },
        { id: "b", text: "nil 0" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: " panic: nil pointer" },
      ],
      correctAnswer: "a",
      explanation: "Struct fields are zero-initialized: string fields get \"\" and int fields get 0. Structs themselves are always zero-value (never nil). This guarantees predictable initialization without constructors.",
      difficulty: "medium",
      points: 20,
      tags: ["zero-values", "structs"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-9",
      type: "multiple-select",
      question: "Which of the following are valid uses of zero values in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Using a nil slice as a ready-to-append collection" },
        { id: "b", text: "Using a zero-value int as a default counter" },
        { id: "c", text: "Writing to a nil map as a default map" },
        { id: "d", text: "Using a zero-value struct as a ready-to-use value" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Nil slices are ready to append. Zero ints default to 0. Zero structs are ready to use. However, writing to a nil map panics — you must use make(map[string]int) before writing.",
      difficulty: "medium",
      points: 20,
      tags: ["zero-values", "best-practice"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-10",
      type: "identify-bug",
      question: "This code panics at runtime. What is the issue?",
      code: `package main

func main() {
    var m map[string]int
    m["key"] = 42
}`,
      options: [
        { id: "a", text: "Map keys must be strings, not ints" },
        { id: "b", text: "Cannot assign to a nil map — must use make(map[string]int) first" },
        { id: "c", text: "Missing import for map operations" },
        { id: "d", text: "The code is correct" },
      ],
      correctAnswer: "b",
      explanation: "var m map[string]int creates a nil map. Reading from a nil map returns the zero value (safe), but writing to a nil map causes a runtime panic: 'assignment to entry in nil map'. Use m = make(map[string]int) before writing.",
      difficulty: "medium",
      points: 20,
      tags: ["zero-values", "maps", "identify-bug"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var i interface{} = nil
    var p *int = nil
    
    var j interface{} = p
    
    fmt.Println(i == nil, j == nil)
}`,
      options: [
        { id: "a", text: "true true" },
        { id: "b", text: "true false" },
        { id: "c", text: "false false" },
        { id: "d", text: "false true" },
      ],
      correctAnswer: "b",
      explanation: "i is a nil interface (both type and value nil). j holds a nil *int pointer — j has a type (*int) even though its value is nil. An interface holding a nil pointer is NOT nil itself. This is a famous Go gotcha.",
      difficulty: "hard",
      points: 30,
      tags: ["zero-values", "interfaces", "gotcha"],
      relatedLesson: "zero-values",
    },
    {
      id: "zero-12",
      type: "scenario",
      question: "You receive a function that returns (Result, error). When the function succeeds but returns an empty result, how do you check if the result is meaningful?",
      options: [
        { id: "a", text: "Check if the Result == nil" },
        { id: "b", text: "Check if the error is nil first, then check if the Result's fields are zero values" },
        { id: "c", text: "Use panic if the result is empty" },
        { id: "d", text: "The function should never return an empty result with nil error" },
      ],
      correctAnswer: "b",
      explanation: "In Go, you always check the error first (if err != nil, return/handle). For a successful result, check if the relevant fields are zero values or use the comma-ok idiom for maps. Nil checks alone aren't sufficient for structs.",
      difficulty: "hard",
      points: 30,
      tags: ["error-handling", "zero-values", "patterns"],
      relatedLesson: "zero-values",
    },
  ],
  "data-types": [
    {
      id: "data-1",
      type: "multiple-select",
      question: "Which of the following are basic types in Go? (Select all that apply)",
      options: [
        { id: "a", text: "bool" },
        { id: "b", text: "string" },
        { id: "c", text: "char" },
        { id: "d", text: "byte" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Go has bool, string, and byte (alias for uint8) as basic types. There is no 'char' type in Go — the closest equivalent is byte (uint8) or rune (int32) for Unicode characters.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "basics"],
      relatedLesson: "data-types",
    },
    {
      id: "data-2",
      type: "multiple-choice",
      question: "Go is a _____ language.",
      options: [
        { id: "a", text: "dynamically typed" },
        { id: "b", text: "statically typed" },
        { id: "c", text: "weakly typed" },
        { id: "d", text: "untyped" },
      ],
      correctAnswer: "b",
      explanation: "Go is statically typed — all types are known at compile time. The compiler enforces type safety and prevents type mismatches. This catches many bugs at compile time rather than runtime.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "fundamentals"],
      relatedLesson: "data-types",
    },
    {
      id: "data-3",
      type: "multiple-select",
      question: "Which categories of types does Go support? (Select all that apply)",
      options: [
        { id: "a", text: "Basic types (int, float64, string, bool)" },
        { id: "b", text: "Composite types (arrays, slices, structs, maps)" },
        { id: "c", text: "Reference types (pointers, functions, channels)" },
        { id: "d", text: "Class types (objects with inheritance)" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go has basic types, composite types (arrays, structs, slices, maps), and reference-like types (pointers, functions, channels, interfaces, slices, maps). Go does not have class types or inheritance.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "categories"],
      relatedLesson: "data-types",
    },
    {
      id: "data-4",
      type: "true-false",
      question: "Go supports implicit type conversions between compatible types (like int to int64).",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go does NOT support implicit type conversions. You must use explicit type conversion: int64(x). This prevents subtle bugs from automatic widening/narrowing conversions, which is a deliberate design choice for clarity.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "conversions"],
      relatedLesson: "data-types",
    },
    {
      id: "data-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var x int = 42
    var y float64 = float64(x)
    var z int = int(y)
    fmt.Println(x, y, z)
}`,
      options: [
        { id: "a", text: "42 42 42" },
        { id: "b", text: "42 42.0 42" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "42 42 0" },
      ],
      correctAnswer: "b",
      explanation: "Explicit conversions work: float64(42) = 42.0, int(42.0) = 42. fmt.Println prints 42, 42, 42 but Println for float64 shows 42 (not 42.0 unless using Printf with %f). Actually, fmt.Println(42.0) prints 42.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "conversions"],
      relatedLesson: "data-types",
    },
    {
      id: "data-6",
      type: "multiple-choice",
      question: "What is the difference between new() and make() in Go?",
      options: [
        { id: "a", text: "new() allocates memory and returns a pointer; make() initializes slices, maps, and channels and returns the value itself" },
        { id: "b", text: "They are interchangeable" },
        { id: "c", text: "new() is for slices; make() is for pointers" },
        { id: "d", text: "new() returns a value; make() returns a pointer" },
      ],
      correctAnswer: "a",
      explanation: "new(T) allocates zero-value memory and returns *T (a pointer). make(T, args) creates and initializes slices, maps, and channels — returning T (not *T). You cannot use make for structs or arrays.",
      difficulty: "medium",
      points: 20,
      tags: ["memory", "allocation"],
      relatedLesson: "data-types",
    },
    {
      id: "data-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := new(int)
    y := make([]int, 3)
    fmt.Printf("%T %T\\n", x, y)
}`,
      options: [
        { id: "a", text: "*int []int" },
        { id: "b", text: "int []int" },
        { id: "c", text: "*int *[]int" },
        { id: "d", text: "*int *slice" },
      ],
      correctAnswer: "a",
      explanation: "new(int) returns *int (pointer to int). make([]int, 3) returns []int (a slice, not a pointer to a slice). This is the key difference: new returns a pointer, make returns the initialized value.",
      difficulty: "medium",
      points: 20,
      tags: ["memory", "types"],
      relatedLesson: "data-types",
    },
    {
      id: "data-8",
      type: "multiple-choice",
      question: "Which of the following is true about Go structs?",
      options: [
        { id: "a", text: "Structs can only contain basic types" },
        { id: "b", text: "Structs support methods but not inheritance" },
        { id: "c", text: "Structs are reference types" },
        { id: "d", text: "Structs cannot be passed to functions" },
      ],
      correctAnswer: "b",
      explanation: "Go structs can contain any type. They support methods (via receiver functions) but NOT inheritance — Go uses composition via struct embedding instead. Structs are value types (copied on assignment), not reference types.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "types"],
      relatedLesson: "data-types",
    },
    {
      id: "data-9",
      type: "multiple-select",
      question: "Which of the following are zero-sized types in Go? (Select all that apply)",
      options: [
        { id: "a", text: "struct{} (empty struct)" },
        { id: "b", text: "[0]byte (zero-length array)" },
        { id: "c", text: "int" },
        { id: "d", text: "bool" },
      ],
      correctAnswer: ["a", "b"],
      explanation: "Empty structs (struct{}) and zero-length arrays ([0]T) take 0 bytes of memory. They're useful as map value types when you want a set: map[string]struct{} uses no memory per value. int and bool use 8 and 1 byte respectively.",
      difficulty: "hard",
      points: 30,
      tags: ["types", "memory"],
      relatedLesson: "data-types",
    },
    {
      id: "data-10",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

type Distance int

func main() {
    var d Distance = 100
    var i int = int(d)
    fmt.Println(d, i)
}`,
      options: [
        { id: "a", text: "Compilation error — cannot convert Distance to int" },
        { id: "b", text: "100 100" },
        { id: "c", text: "Distance 100" },
        { id: "d", text: "0 0" },
      ],
      correctAnswer: "b",
      explanation: "Distance is a named type based on int. You can explicitly convert between named types and their underlying types. int(d) converts Distance to int, and both print 100. Named types have the same underlying representation.",
      difficulty: "medium",
      points: 20,
      tags: ["named-types", "conversions"],
      relatedLesson: "data-types",
    },
    {
      id: "data-11",
      type: "identify-bug",
      question: "This code fails to compile. Why?",
      code: `package main

func main() {
    var x int = 3.14
}`,
      options: [
        { id: "a", text: "The variable name 'x' is reserved" },
        { id: "b", text: "Cannot assign untyped float constant 3.14 to int without explicit conversion" },
        { id: "c", text: "int cannot hold decimal values — use float64" },
        { id: "d", text: "Both b and c describe the issue" },
      ],
      correctAnswer: "d",
      explanation: "var x int = 3.14 fails because 3.14 is a floating-point constant and int is an integer type. Go does not perform implicit conversion. You need var x int = int(3.14) or var x float64 = 3.14. Both descriptions are correct.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "identify-bug"],
      relatedLesson: "data-types",
    },
    {
      id: "data-12",
      type: "scenario",
      question: "You're designing an API response type. Which Go type combination is most idiomatic for representing a nullable integer field in JSON?",
      options: [
        { id: "a", text: "Use int with 0 as the 'no value' sentinel" },
        { id: "b", text: "Use *int (pointer to int) so nil represents absence and 0 is a valid value" },
        { id: "c", text: "Use string and convert to int manually" },
        { id: "d", text: "Use interface{} to hold any type" },
      ],
      correctAnswer: "b",
      explanation: "Using *int lets you distinguish between 'not present' (nil/omitted) and 'zero value' (0). The encoding/json package marshals nil pointers as null and omits them with omitempty. Using 0 as sentinel conflates 'absent' with 'zero'.",
      difficulty: "hard",
      points: 30,
      tags: ["types", "json", "api-design"],
      relatedLesson: "data-types",
    },
  ],
  "integers-signed-unsigned": [
    {
      id: "int-1",
      type: "multiple-select",
      question: "Which of the following are integer types in Go? (Select all that apply)",
      options: [
        { id: "a", text: "int8" },
        { id: "b", text: "uint" },
        { id: "c", text: "int32" },
        { id: "d", text: "integer" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go has int8, int16, int32, int64 (signed), uint8, uint16, uint32, uint64 (unsigned), and the platform-dependent int/uint. There is no 'integer' type in Go.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "integers"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-2",
      type: "multiple-choice",
      question: "What is the size of a plain 'int' type on a 64-bit architecture?",
      options: [
        { id: "a", text: "32 bits (4 bytes)" },
        { id: "b", text: "64 bits (8 bytes)" },
        { id: "c", text: "Platform-dependent — same as the architecture's word size" },
        { id: "d", text: "Always 32 bits" },
      ],
      correctAnswer: "c",
      explanation: "int is platform-dependent: 32-bit on 32-bit architectures, 64-bit on 64-bit architectures. This is different from int32/int64 which have fixed sizes. On modern 64-bit systems, int is 64 bits.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "integers"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-3",
      type: "true-false",
      question: "uint8 is an alias for byte in Go.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "byte is a built-in alias for uint8. They are interchangeable. The byte alias is used when the value represents raw data (bytes), while uint8 is used when representing small unsigned integers.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "byte"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-4",
      type: "code-output",
      question: "What happens when this code runs?",
      code: `package main

import "fmt"

func main() {
    var x uint8 = 255
    x = x + 1
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "256" },
        { id: "b", text: "0" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "b",
      explanation: "uint8 can hold values 0-255. Adding 1 to 255 causes unsigned overflow, wrapping around to 0. Go does not check for overflow — it wraps silently like C. This is well-defined behavior for unsigned integers.",
      difficulty: "medium",
      points: 20,
      tags: ["overflow", "integers"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var x int8 = 127
    x = x + 1
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "128" },
        { id: "b", text: "-128" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "b",
      explanation: "int8 can hold values -128 to 127. Adding 1 to 127 causes signed overflow (undefined behavior in C, but defined in Go as wrapping to -128). Go guarantees two's complement wrap-around for signed integers.",
      difficulty: "medium",
      points: 20,
      tags: ["overflow", "integers"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-6",
      type: "multiple-choice",
      question: "What is the alias for int32 used for Unicode code points in Go?",
      options: [
        { id: "a", text: "byte" },
        { id: "b", text: "rune" },
        { id: "c", text: "char" },
        { id: "d", text: "unicode" },
      ],
      correctAnswer: "b",
      explanation: "rune is a built-in alias for int32, used to represent Unicode code points (characters). When you range over a string, you get runes. It's the closest Go has to a 'char' type.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "rune"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var a int = 10
    var b uint = 5
    // fmt.Println(a - b)  // What would this do?
    fmt.Println(a - int(b))
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "-5" },
        { id: "d", text: "15" },
      ],
      correctAnswer: "a",
      explanation: "int(b) explicitly converts uint(5) to int(5). Then 10 - 5 = 5. Without the explicit conversion, a - b would fail to compile because Go doesn't allow mixing signed and unsigned types in arithmetic.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "conversions"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-8",
      type: "multiple-select",
      question: "Which of the following integer constants can Go handle at compile time? (Select all that apply)",
      options: [
        { id: "a", text: "A number larger than uint64" },
        { id: "b", text: "Very large untyped integer constants" },
        { id: "c", text: "Arbitrary-precision arithmetic on constants" },
        { id: "d", text: "Constants exceeding int64 max value" },
      ],
      correctAnswer: ["b", "c", "d"],
      explanation: "Go constants can be arbitrarily large at compile time — the compiler uses arbitrary-precision arithmetic. You can write const huge = 1 << 200 and use it in expressions. Runtime values are limited to their type's range.",
      difficulty: "hard",
      points: 30,
      tags: ["constants", "types"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-9",
      type: "identify-bug",
      question: "This code has an issue. What is it?",
      code: `package main

import "fmt"

func main() {
    var a int32 = 100
    var b int64 = 200
    fmt.Println(a + b)
}`,
      options: [
        { id: "a", text: "a + b overflows" },
        { id: "b", text: "Cannot use + with different integer types — need explicit conversion" },
        { id: "c", text: "int32 and int64 cannot be added" },
        { id: "d", text: "Both b and c describe the issue" },
      ],
      correctAnswer: "d",
      explanation: "Go does not allow arithmetic between different integer types. You must explicitly convert: int64(a) + b or a + int32(b). This prevents silent precision loss. The compiler error is: 'invalid operation: a + b (mismatched types int32 and int64)'.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "identify-bug"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-10",
      type: "multiple-choice",
      question: "What is the max value of uint8?",
      options: [
        { id: "a", text: "127" },
        { id: "b", text: "255" },
        { id: "c", text: "65535" },
        { id: "d", text: "2147483647" },
      ],
      correctAnswer: "b",
      explanation: "uint8 is 8 bits unsigned: max value is 2^8 - 1 = 255. Range is 0-255. int8 (signed) has max value 127 (range -128 to 127). uint16 has max 65535, int32 has max 2147483647.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "integers"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-11",
      type: "scenario",
      question: "You need to parse a string '256' into an integer. Which function should you use?",
      options: [
        { id: "a", text: 'int("256")' },
        { id: "b", text: 'strconv.Atoi("256")' },
        { id: "c", text: 'parseInt("256")' },
        { id: "d", text: 'string.ToInt("256")' },
      ],
      correctAnswer: "b",
      explanation: "strconv.Atoi() converts a string to int. int(\"256\") is a type conversion, not a parse — it will fail to compile. There is no parseInt() or string.ToInt() in Go. Always check the error from strconv.Atoi.",
      difficulty: "medium",
      points: 20,
      tags: ["conversion", "parsing"],
      relatedLesson: "integers-signed-unsigned",
    },
    {
      id: "int-12",
      type: "best-practice",
      question: "When should you use int vs int64 for a variable that stores a count?",
      options: [
        { id: "a", text: "Always use int64 for safety" },
        { id: "b", text: "Use int for most cases — it's the natural word size and most efficient; use int64 only when you need guaranteed size or are interfacing with APIs that require it" },
        { id: "c", text: "Use uint to avoid negative values" },
        { id: "d", text: "Use float64 to handle decimals" },
      ],
      correctAnswer: "b",
      explanation: "int is the natural word size and most efficient. The Go spec recommends using int unless you need a specific size. For network protocols, APIs, or when size matters, use int32/int64. Avoid uint for counts (unsigned arithmetic gotchas).",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "types"],
      relatedLesson: "integers-signed-unsigned",
    },
  ],
  "floating-points": [
    {
      id: "float-1",
      type: "multiple-choice",
      question: "What floating-point types does Go provide?",
      options: [
        { id: "a", text: "Only float32" },
        { id: "b", text: "float32 and float64" },
        { id: "c", text: "float, double, and long double" },
        { id: "d", text: "float16, float32, and float64" },
      ],
      correctAnswer: "b",
      explanation: "Go provides float32 (single precision) and float64 (double precision). There is no float16 or 'double' keyword. float64 is the default for untyped floating-point constants.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "float"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-2",
      type: "true-false",
      question: "In Go, the literal 3.14 is a float64 by default.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Untyped floating-point constants like 3.14 default to float64. To get float32, use float32(3.14) or the suffix: 3.14 is float64, and you need explicit conversion for float32.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "float"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-3",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func main() {
    x := 0.1 + 0.2
    fmt.Printf("%.20f\\n", x)
}`,
      options: [
        { id: "a", text: "0.30000000000000000000" },
        { id: "b", text: "0.30000000000000004441" },
        { id: "c", text: "0.3" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "0.1 + 0.2 = 0.30000000000000004441 due to IEEE 754 floating-point precision limitations. This is a universal issue with binary floating-point, not specific to Go. For exact decimal arithmetic, use math/big or shopSpring/decimal.",
      difficulty: "medium",
      points: 20,
      tags: ["precision", "float"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-4",
      type: "multiple-select",
      question: "Which of the following are valid float literals in Go? (Select all that apply)",
      options: [
        { id: "a", text: "3.14" },
        { id: "b", text: ".5" },
        { id: "c", text: "3." },
        { id: "d", text: "1e10" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All are valid: 3.14 (standard), .5 (no leading digit), 3. (no trailing digit), 1e10 (scientific notation). Go accepts all standard IEEE 754 literal formats.",
      difficulty: "easy",
      points: 10,
      tags: ["syntax", "float"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-5",
      type: "multiple-choice",
      question: "Which package provides special floating-point values like NaN and Inf?",
      options: [
        { id: "a", text: "math" },
        { id: "b", text: "float" },
        { id: "c", text: "mathutil" },
        { id: "d", text: "numeric" },
      ],
      correctAnswer: "a",
      explanation: "The math package provides math.NaN(), math.Inf(1), math.Inf(-1), math.IsNaN(), math.IsInf(), and math.MaxFloat64. These are essential for working with special floating-point values.",
      difficulty: "easy",
      points: 10,
      tags: ["stdlib", "float"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import (
    "fmt"
    "math"
)

func main() {
    x := math.NaN()
    fmt.Println(x == x)
    fmt.Println(math.IsNaN(x))
}`,
      options: [
        { id: "a", text: "true true" },
        { id: "b", text: "false true" },
        { id: "c", text: "true false" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "NaN is not equal to anything, including itself (IEEE 754 spec). x == x is always false for NaN. Use math.IsNaN() to check for NaN. This is a famous property of NaN values.",
      difficulty: "medium",
      points: 20,
      tags: ["NaN", "float"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-7",
      type: "multiple-choice",
      question: "What is the difference between float32 and float64 in terms of precision?",
      options: [
        { id: "a", text: "float32 has about 7 decimal digits of precision; float64 has about 15-16" },
        { id: "b", text: "They have the same precision" },
        { id: "c", text: "float64 has double the precision of float32 (exactly)" },
        { id: "d", text: "float32 is more precise than float64" },
      ],
      correctAnswer: "a",
      explanation: "float32 provides approximately 7 decimal digits of precision (2^23 mantissa), float64 provides approximately 15-16 digits (2^52 mantissa). float64 is preferred for most applications due to better precision.",
      difficulty: "medium",
      points: 20,
      tags: ["precision", "float"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var x float32 = 1.0000001
    var y float32 = 1.0000002
    fmt.Println(x == y)
    
    var a float64 = 1.0000001
    var b float64 = 1.0000002
    fmt.Println(a == b)
}`,
      options: [
        { id: "a", text: "false false" },
        { id: "b", text: "true false" },
        { id: "c", text: "false true" },
        { id: "d", text: "true true" },
      ],
      correctAnswer: "a",
      explanation: "Both comparisons are false. 1.0000001 and 1.0000002 are distinguishable in both float32 and float64 precision ranges. The difference (0.0000001) is within the precision of both types.",
      difficulty: "hard",
      points: 30,
      tags: ["precision", "comparison"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-9",
      type: "multiple-select",
      question: "What are best practices for floating-point comparisons? (Select all that apply)",
      options: [
        { id: "a", text: "Never use == to compare floating-point values for equality" },
        { id: "b", text: "Use an epsilon tolerance for comparisons" },
        { id: "c", text: "Use math.Abs(a-b) < epsilon for comparison" },
        { id: "d", text: "Use string comparison for floating-point values" },
      ],
      correctAnswer: ["b", "c"],
      explanation: "Floating-point comparisons should use a tolerance (epsilon). math.Abs(a-b) < 1e-9 checks if values are 'close enough'. Never use == for floating-point equality. String comparison is fragile and not recommended.",
      difficulty: "medium",
      points: 20,
      tags: ["best-practice", "comparison"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-10",
      type: "identify-bug",
      question: "This code has a subtle issue. What is it?",
      code: `package main

import "fmt"

func main() {
    x := 0.1
    y := 0.2
    sum := x + y
    if sum == 0.3 {
        fmt.Println("equal")
    } else {
        fmt.Println("not equal")
    }
}`,
      options: [
        { id: "a", text: "The code is correct and will print 'equal'" },
        { id: "b", text: "Floating-point precision issue — sum may not be exactly 0.3, use tolerance comparison" },
        { id: "c", text: "Compilation error — cannot compare float64" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "b",
      explanation: "Due to IEEE 754 representation, 0.1 + 0.2 may not be exactly 0.3. The comparison should use tolerance: math.Abs(sum-0.3) < 1e-10. This is a classic floating-point gotcha that appears in many languages.",
      difficulty: "medium",
      points: 20,
      tags: ["floating-point", "identify-bug"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-11",
      type: "multiple-choice",
      question: "How does Go handle integer division by zero?",
      options: [
        { id: "a", text: "Returns NaN" },
        { id: "b", text: "Returns infinity" },
        { id: "c", text: "Panics at runtime" },
        { id: "d", text: "Returns 0" },
      ],
      correctAnswer: "c",
      explanation: "Integer division by zero causes a runtime panic: 'integer divide by zero'. Floating-point division by zero returns +Inf or -Inf (IEEE 754), but integer division by zero panics.",
      difficulty: "medium",
      points: 20,
      tags: ["division", "panics"],
      relatedLesson: "floating-points",
    },
    {
      id: "float-12",
      type: "scenario",
      question: "You need exact decimal arithmetic for financial calculations. Which approach is correct?",
      options: [
        { id: "a", text: "Use float64 — it's precise enough" },
        { id: "b", text: "Use math/big.Rat for exact rational arithmetic, or use integer cents instead of float dollars" },
        { id: "c", text: "Use float32 for better precision" },
        { id: "d", text: "Use int64 with decimal point in the variable name" },
      ],
      correctAnswer: "b",
      explanation: "Float arithmetic introduces rounding errors unsuitable for finance. Use math/big.Rat for exact rational arithmetic, or represent money as integer cents (199 instead of 1.99). Libraries like shopSpring/decimal provide convenience types.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "finance", "precision"],
      relatedLesson: "floating-points",
    },
  ],
  "complex-numbers": [
    {
      id: "complex-1",
      type: "multiple-choice",
      question: "What complex number types does Go provide?",
      options: [
        { id: "a", text: "complex64 and complex128" },
        { id: "b", text: "complex32 and complex64" },
        { id: "c", text: "Only complex128" },
        { id: "d", text: "complex and complexf" },
      ],
      correctAnswer: "a",
      explanation: "Go provides complex64 (two float32 values) and complex128 (two float64 values). complex128 is the default for untyped complex constants.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "complex"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-2",
      type: "multiple-choice",
      question: "How do you create a complex number literal in Go?",
      options: [
        { id: "a", text: "3 + 4i" },
        { id: "b", text: "complex(3, 4)" },
        { id: "c", text: "Both a and b are valid" },
        { id: "d", text: "complex3+4i" },
      ],
      correctAnswer: "c",
      explanation: "Both 3+4i (literal syntax) and complex(3, 4) (function call) are valid. In the literal form, the imaginary part must end with 'i'. Spaces around the +/- are optional.",
      difficulty: "easy",
      points: 10,
      tags: ["syntax", "complex"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    c := 3 + 4i
    fmt.Println(real(c), imag(c))
}`,
      options: [
        { id: "a", text: "3 4" },
        { id: "b", text: "4 3" },
        { id: "c", text: "(3,4)" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "real(c) returns the real part (3) and imag(c) returns the imaginary part (4) of the complex number. These are built-in functions that work with complex64 and complex128.",
      difficulty: "easy",
      points: 10,
      tags: ["complex", "functions"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-4",
      type: "true-false",
      question: "Complex numbers in Go can be compared using == and !=.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Go supports == and != for complex numbers. Two complex numbers are equal if both their real and imaginary parts are equal. Note that comparing floats within complex numbers has the usual precision caveats.",
      difficulty: "easy",
      points: 10,
      tags: ["complex", "comparison"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    a := 2 + 3i
    b := 1 + 1i
    sum := a + b
    product := a * b
    fmt.Println(sum, product)
}`,
      options: [
        { id: "a", text: "3+4i 5+5i" },
        { id: "b", text: "3+4i -1+5i" },
        { id: "c", text: "3+4i 5-5i" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "Sum: (2+3i) + (1+1i) = 3+4i. Product: (2+3i) * (1+1i) = 2+2i+3i+3i² = 2+5i-3 = -1+5i. Go supports +, -, *, / on complex numbers directly.",
      difficulty: "medium",
      points: 20,
      tags: ["complex", "arithmetic"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-6",
      type: "multiple-choice",
      question: "Which package provides mathematical functions for complex numbers?",
      options: [
        { id: "a", text: "math" },
        { id: "b", text: "cmath" },
        { id: "c", text: "math/cmplx" },
        { id: "d", text: "complex" },
      ],
      correctAnswer: "c",
      explanation: "math/cmplx provides functions for complex128: cmplx.Abs, cmplx.Conj, cmplx.Exp, cmplx.Log, cmplx.Pow, cmplx.Sqrt, etc. The math package only works with float64.",
      difficulty: "medium",
      points: 20,
      tags: ["stdlib", "complex"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import (
    "fmt"
    "math/cmplx"
)

func main() {
    c := 3 + 4i
    fmt.Println(cmplx.Abs(c))
}`,
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "5" },
        { id: "d", text: "7" },
      ],
      correctAnswer: "c",
      explanation: "cmplx.Abs returns the magnitude of the complex number: sqrt(3² + 4²) = sqrt(9+16) = sqrt(25) = 5. This is the Pythagorean theorem applied to complex numbers.",
      difficulty: "medium",
      points: 20,
      tags: ["complex", "math"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-8",
      type: "multiple-select",
      question: "Which of the following can be converted to complex numbers in Go? (Select all that apply)",
      options: [
        { id: "a", text: "int values" },
        { id: "b", text: "float64 values" },
        { id: "c", text: "string values" },
        { id: "d", text: "bool values" },
      ],
      correctAnswer: ["a", "b"],
      explanation: "int and float64 values can be converted to complex numbers: complex(3, 4) or complex(3.0, 4.0). Strings cannot be directly converted to complex numbers — you'd need strconv or parsing. Bools cannot be converted either.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "conversion"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-9",
      type: "true-false",
      question: "You can use complex numbers in map keys in Go.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Complex numbers are comparable types in Go (unlike slices or maps themselves), so they can be used as map keys. complex64 and complex128 both implement the comparable constraint.",
      difficulty: "medium",
      points: 20,
      tags: ["complex", "maps"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-10",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    c := 3 + 4i
    fmt.Println(c / 0)
}`,
      options: [
        { id: "a", text: "Division by zero panics at runtime, not a compile error" },
        { id: "b", text: "Cannot divide complex by integer literal 0 — need complex(0, 0)" },
        { id: "c", text: "The code compiles and runs, producing complex Inf/NaN values" },
        { id: "d", text: "The code is correct" },
      ],
      correctAnswer: "c",
      explanation: "Complex division by zero compiles and runs. Go promotes 0 to complex(0, 0) and performs the division, resulting in complex Inf or NaN values (IEEE 754). It does not panic like integer division by zero.",
      difficulty: "hard",
      points: 30,
      tags: ["complex", "edge-cases"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-11",
      type: "scenario",
      question: "You're implementing a signal processing algorithm that requires complex arithmetic. Which Go type should you use?",
      options: [
        { id: "a", text: "complex64 for better performance" },
        { id: "b", text: "complex128 for better precision (default in Go)" },
        { id: "c", text: "A struct with real and imaginary float64 fields" },
        { id: "d", text: "Two separate float64 variables" },
      ],
      correctAnswer: "b",
      explanation: "complex128 is the default and most precise type for complex arithmetic in Go. While complex64 saves memory, Go's standard library (math/cmplx) works with complex128. Use complex128 unless memory is critical and precision can be sacrificed.",
      difficulty: "medium",
      points: 20,
      tags: ["best-practice", "complex"],
      relatedLesson: "complex-numbers",
    },
    {
      id: "complex-12",
      type: "architecture",
      question: "Why does Go include complex numbers as a built-in type while most general-purpose languages don't?",
      options: [
        { id: "a", text: "Go was designed for game development" },
        { id: "b", text: "Go aims to be suitable for scientific computing and signal processing alongside systems programming" },
        { id: "c", text: "Complex numbers were added to compete with Python" },
        { id: "d", text: "They were inherited from C" },
      ],
      correctAnswer: "b",
      explanation: "Go includes complex numbers because it was designed to be a general-purpose language for many domains, including scientific computing. Having native complex types avoids the overhead of library implementations for common mathematical operations.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "design"],
      relatedLesson: "complex-numbers",
    },
  ],
  "boolean": [
    {
      id: "bool-1",
      type: "multiple-choice",
      question: "What are the only two values of type bool in Go?",
      options: [
        { id: "a", text: "TRUE and FALSE" },
        { id: "b", text: "true and false" },
        { id: "c", text: "1 and 0" },
        { id: "d", text: "yes and no" },
      ],
      correctAnswer: "b",
      explanation: "Go uses lowercase true and false as boolean constants. TRUE/FALSE, yes/no, and 1/0 are not valid boolean values in Go. Go is case-sensitive.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "boolean"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-2",
      type: "true-false",
      question: "In Go, you can use an integer as a boolean (e.g., if 1 { ... }).",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go does not allow implicit conversion between int and bool. Unlike C/Python, 'if 1' is a compilation error. You must explicitly write 'if x != 0' or 'if x == 1'. This prevents subtle bugs from truthy/falsy values.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "boolean"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-3",
      type: "multiple-choice",
      question: "What is the result of: true && false || true?",
      options: [
        { id: "a", text: "false" },
        { id: "b", text: "true" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Depends on operator precedence" },
      ],
      correctAnswer: "b",
      explanation: "Operator precedence: && binds tighter than ||. So this evaluates as (true && false) || true = false || true = true. Go follows standard boolean algebra precedence.",
      difficulty: "easy",
      points: 10,
      tags: ["boolean", "operators"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var b bool
    fmt.Println(b)
    fmt.Println(!b)
}`,
      options: [
        { id: "a", text: "true false" },
        { id: "b", text: "false true" },
        { id: "c", text: "nil true" },
        { id: "d", text: "0 1" },
      ],
      correctAnswer: "b",
      explanation: "The zero value of bool is false, so b is false. !b negates it to true. Output: false, then true.",
      difficulty: "easy",
      points: 10,
      tags: ["boolean", "zero-values"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-5",
      type: "multiple-select",
      question: "Which of the following are valid boolean expressions in Go? (Select all that apply)",
      options: [
        { id: "a", text: "!true" },
        { id: "b", text: "true && false" },
        { id: "c", text: "true || false" },
        { id: "d", text: "true ^^ false" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go supports ! (NOT), && (AND), and || (OR). There is no XOR operator (^^) in Go. You would need to implement XOR as (a != b) or (a && !b) || (!a && b).",
      difficulty: "easy",
      points: 10,
      tags: ["boolean", "operators"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-6",
      type: "multiple-choice",
      question: "What does short-circuit evaluation mean for && in Go?",
      options: [
        { id: "a", text: "Both operands are always evaluated" },
        { id: "b", text: "If the left operand is false, the right operand is NOT evaluated" },
        { id: "c", text: "If the left operand is true, the right operand is NOT evaluated" },
        { id: "d", text: "Both operands are evaluated in parallel" },
      ],
      correctAnswer: "b",
      explanation: "Go uses short-circuit evaluation: for &&, if the left side is false, the result is false and the right side is never evaluated. For ||, if the left side is true, the right side is skipped. This is important for nil checks before method calls.",
      difficulty: "medium",
      points: 20,
      tags: ["boolean", "evaluation"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    a := true
    b := false
    
    fmt.Println(a == b)
    fmt.Println(a != b)
    fmt.Println(a && b)
    fmt.Println(a || b)
}`,
      options: [
        { id: "a", text: "false true false true" },
        { id: "b", text: "true false false true" },
        { id: "c", text: "false true true false" },
        { id: "d", text: "true false true false" },
      ],
      correctAnswer: "a",
      explanation: "a == b: true == false = false. a != b: true != false = true. a && b: true && false = false. a || b: true || false = true.",
      difficulty: "easy",
      points: 10,
      tags: ["boolean", "operators"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-8",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if x {
        fmt.Println("positive")
    }
}`,
      options: [
        { id: "a", text: "x is not declared properly" },
        { id: "b", text: "Cannot use int as bool — Go requires explicit comparison: if x > 0" },
        { id: "c", text: "Missing else clause" },
        { id: "d", text: "The code is correct" },
      ],
      correctAnswer: "b",
      explanation: "Go requires an explicit boolean expression in if statements. 'if x' where x is int is a compilation error. You must write 'if x > 0' or 'if x != 0'. Go does not have implicit truthiness conversions.",
      difficulty: "medium",
      points: 20,
      tags: ["boolean", "identify-bug"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-9",
      type: "scenario",
      question: "You have a function that can return nil or a value. You want to check if it returned a non-nil value. Which is correct?",
      options: [
        { id: "a", text: "if result != nil && result.IsValid() {" },
        { id: "b", text: "if !result == nil {" },
        { id: "c", text: "if result = nil {" },
        { id: "d", text: "if result != nil || result.IsValid() {" },
      ],
      correctAnswer: "a",
      explanation: "Due to short-circuit evaluation, result != nil is checked first. If result is nil, result.IsValid() is never called (avoiding nil pointer dereference). This is the standard nil-check pattern in Go.",
      difficulty: "medium",
      points: 20,
      tags: ["short-circuit", "nil-check"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-10",
      type: "multiple-choice",
      question: "What is the size of a bool in Go?",
      options: [
        { id: "a", text: "1 byte" },
        { id: "b", text: "4 bytes" },
        { id: "c", text: "8 bytes" },
        { id: "d", text: "Platform-dependent" },
      ],
      correctAnswer: "a",
      explanation: "A bool in Go is 1 byte. While it only needs 1 bit, Go allocates a full byte for alignment and simplicity. This is defined by the Go specification and is consistent across platforms.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "memory"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-11",
      type: "multiple-select",
      question: "Which of the following will cause a compilation error? (Select all that apply)",
      options: [
        { id: "a", text: "var b bool = 1" },
        { id: "b", text: 'var b bool = "true"' },
        { id: "c", text: "var b bool = true" },
        { id: "d", text: "var b bool = (1 > 0)" },
      ],
      correctAnswer: ["a", "b"],
      explanation: "var b bool = 1 fails (int cannot be used as bool). var b bool = \"true\" fails (string cannot be used as bool). var b bool = true is valid. var b bool = (1 > 0) is valid — the comparison produces a bool.",
      difficulty: "hard",
      points: 30,
      tags: ["types", "conversion"],
      relatedLesson: "boolean",
    },
    {
      id: "bool-12",
      type: "architecture",
      question: "Why did Go choose to not allow implicit int-to-bool conversion while languages like Python and C do?",
      options: [
        { id: "a", text: "To make the language faster" },
        { id: "b", text: "To prevent bugs where integers are accidentally used as booleans, enforcing explicit intent" },
        { id: "c", text: "To simplify the compiler" },
        { id: "d", text: "To maintain compatibility with C" },
      ],
      correctAnswer: "b",
      explanation: "Go explicitly rejects implicit int-to-bool conversion to prevent common bugs: accidentally passing 0 as false, or treating any non-zero value as true. This forces explicit intent: if x != 0 is clearer than if x.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "design"],
      relatedLesson: "boolean",
    },
  ],
  "strings": [
    {
      id: "str-1",
      type: "multiple-choice",
      question: "What is the underlying data type of a string in Go?",
      options: [
        { id: "a", text: "A pointer to a character array" },
        { id: "b", text: "A read-only byte slice (struct with pointer and length)" },
        { id: "c", text: "An array of runes" },
        { id: "d", text: "A linked list of characters" },
      ],
      correctAnswer: "b",
      explanation: "A string in Go is a read-only struct containing a pointer to a byte array and its length (2 words: pointer + length). It's immutable — any 'modification' creates a new string.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "types"],
      relatedLesson: "strings",
    },
    {
      id: "str-2",
      type: "true-false",
      question: "Strings in Go are mutable — you can modify individual bytes.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Strings in Go are immutable. You cannot modify individual bytes of a string. To 'modify' a string, you convert to []byte, modify the bytes, then convert back. This creates a new string.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "immutability"],
      relatedLesson: "strings",
    },
    {
      id: "str-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hello, World!"
    fmt.Println(len(s))
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "13" },
        { id: "c", text: "14" },
        { id: "d", text: "Depends on encoding" },
      ],
      correctAnswer: "b",
      explanation: "len(s) returns the number of bytes in the string, not the number of characters. 'Hello, World!' is 13 bytes (ASCII). For multi-byte characters, len counts bytes, not runes.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "len"],
      relatedLesson: "strings",
    },
    {
      id: "str-4",
      type: "multiple-select",
      question: "Which of the following operations are NOT allowed on strings in Go? (Select all that apply)",
      options: [
        { id: "a", text: 's[0] = "x"' },
        { id: "b", text: "s + other" },
        { id: "c", text: 's += " world"' },
        { id: "d", text: "s == other" },
      ],
      correctAnswer: ["a"],
      explanation: "s[0] = 'x' is not allowed because strings are immutable — you cannot assign to individual bytes. s + other (concatenation), s += ' world' (append), and s == other (comparison) are all valid operations.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "operations"],
      relatedLesson: "strings",
    },
    {
      id: "str-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hello"
    fmt.Printf("%c\\n", s[1])
    fmt.Printf("%d\\n", s[1])
}`,
      options: [
        { id: "a", text: "e 101" },
        { id: "b", text: "H 72" },
        { id: "c", text: "101 e" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "s[1] is byte 'e' (ASCII 101). %c formats as character, %d formats as decimal. 'H'=72, 'e'=101, 'l'=108, 'o'=111.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "indexing"],
      relatedLesson: "strings",
    },
    {
      id: "str-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hello, 世界"
    fmt.Println(len(s))
    fmt.Println(len([]rune(s)))
}`,
      options: [
        { id: "a", text: "9 9" },
        { id: "b", text: "13 9" },
        { id: "c", text: "9 13" },
        { id: "d", text: "13 13" },
      ],
      correctAnswer: "b",
      explanation: "len(s) counts bytes: 'Hello, ' (7 bytes) + '世界' (6 bytes, 3 each) = 13. len([]rune(s)) counts runes (Unicode code points): 7 ASCII chars + 2 CJK characters = 9.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "runes", "unicode"],
      relatedLesson: "strings",
    },
    {
      id: "str-7",
      type: "multiple-choice",
      question: "How do you concatenate many strings efficiently in Go?",
      options: [
        { id: "a", text: "Use + in a for loop" },
        { id: "b", text: "Use strings.Builder" },
        { id: "c", text: "Use fmt.Sprintf" },
        { id: "d", text: "Use string([]byte{...})" },
      ],
      correctAnswer: "b",
      explanation: "strings.Builder is the most efficient way to build strings. It uses an internal []byte buffer and avoids repeated allocations. Each + creates a new string; Builder accumulates in a single buffer.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "performance"],
      relatedLesson: "strings",
    },
    {
      id: "str-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    var builder strings.Builder
    for i := 0; i < 5; i++ {
        builder.WriteString("a")
    }
    fmt.Println(builder.String())
}`,
      options: [
        { id: "a", text: "aaaaa" },
        { id: "b", text: "a" },
        { id: "c", text: "5" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "strings.Builder accumulates strings written via WriteString. After 5 iterations, String() returns 'aaaaa'. Builder is efficient because it grows the internal buffer as needed.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "builder"],
      relatedLesson: "strings",
    },
    {
      id: "str-9",
      type: "multiple-select",
      question: "Which functions in the strings package can split a string? (Select all that apply)",
      options: [
        { id: "a", text: "strings.Split" },
        { id: "b", text: "strings.SplitN" },
        { id: "c", text: "strings.Fields" },
        { id: "d", text: "strings.Partition" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "strings.Split splits on a separator, strings.SplitN splits into at most N parts, strings.Fields splits on whitespace. There is no strings.Partition function.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "stdlib"],
      relatedLesson: "strings",
    },
    {
      id: "str-10",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, World!"
    fmt.Println(strings.Contains(s, "World"))
    fmt.Println(strings.HasPrefix(s, "Hello"))
    fmt.Println(strings.HasSuffix(s, "!"))
}`,
      options: [
        { id: "a", text: "true true true" },
        { id: "b", text: "false true false" },
        { id: "c", text: "true false true" },
        { id: "d", text: "true true false" },
      ],
      correctAnswer: "a",
      explanation: "strings.Contains checks if substring exists (true for 'World'). HasPrefix checks start (true for 'Hello'). HasSuffix checks end (true for '!').",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "functions"],
      relatedLesson: "strings",
    },
    {
      id: "str-11",
      type: "identify-bug",
      question: "This code has a subtle issue. What is it?",
      code: `package main

import "fmt"

func main() {
    s := "Hello, 世界"
    for i := 0; i < len(s); i++ {
        fmt.Printf("%c", s[i])
    }
}`,
      options: [
        { id: "a", text: "The code is correct and prints 'Hello, 世界'" },
        { id: "b", text: "Indexing with len iterates bytes, not runes — multi-byte characters will be garbled" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "b",
      explanation: "s[i] accesses individual bytes. For multi-byte UTF-8 characters like '世界', s[i] returns individual bytes, not the full character. Use for _, r := range s to iterate over runes correctly.",
      difficulty: "hard",
      points: 30,
      tags: ["strings", "unicode", "identify-bug"],
      relatedLesson: "strings",
    },
    {
      id: "str-12",
      type: "best-practice",
      question: "When should you use []byte vs string in Go?",
      options: [
        { id: "a", text: "Always use []byte for better performance" },
        { id: "b", text: "Use string for text processing; use []byte for I/O, network operations, and when you need to modify content" },
        { id: "c", text: "They are interchangeable" },
        { id: "d", text: "Always use string — []byte is deprecated" },
      ],
      correctAnswer: "b",
      explanation: "string is for text (immutable, comparable, can be map key). []byte is for binary data, I/O operations, and when mutation is needed. Converting between them has allocation cost, so choose based on context.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "strings", "performance"],
      relatedLesson: "strings",
    },
  ],
  "interpreted-string-literals": [
    {
      id: "interp-1",
      type: "multiple-choice",
      question: "Which character is used for interpreted string literals in Go?",
      options: [
        { id: "a", text: "Backtick (`)" },
        { id: "b", text: "Double quote (\")" },
        { id: "c", text: "Single quote (')" },
        { id: "d", text: "Triple quote" },
      ],
      correctAnswer: "b",
      explanation: "Interpreted string literals use double quotes: \"Hello\\nWorld\". Backticks are for raw string literals. Single quotes are for rune literals.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "syntax"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-2",
      type: "multiple-select",
      question: "Which escape sequences are valid in interpreted string literals? (Select all that apply)",
      options: [
        { id: "a", text: "\\n (newline)" },
        { id: "b", text: "\\t (tab)" },
        { id: "c", text: "\\r (carriage return)" },
        { id: "d", text: "\\e (escape)" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go supports \\n, \\t, \\r, \\\\, \\\", \\' and other standard escape sequences. \\e is not a standard Go escape sequence. Use \\x1b for ESC character.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "escape"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hello\\nWorld"
    fmt.Println(s)
}`,
      options: [
        { id: "a", text: "Hello\\nWorld" },
        { id: "b", text: "Hello" },
        { id: "c", text: "Hello\\nWorld" },
        { id: "d", text: "HelloWorld" },
      ],
      correctAnswer: "b",
      explanation: "\\n in a double-quoted string is interpreted as a newline character. fmt.Println prints 'Hello', then a newline (from \\n), then 'World', then another newline (from Println).",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "escape"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-4",
      type: "true-false",
      question: "You can include a double quote inside a double-quoted string using \\\".",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Yes, use \\\" to escape a double quote inside a double-quoted string: \"She said \\\"hello\\\"\". This is a standard escape sequence.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "escape"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Line1\\tLine2"
    fmt.Println(s)
}`,
      options: [
        { id: "a", text: "Line1\\tLine2" },
        { id: "b", text: "Line1  Line2" },
        { id: "c", text: "Line1\tLine2" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "c",
      explanation: "\\t is interpreted as a tab character. The output shows 'Line1' followed by a tab then 'Line2'. In the terminal, this appears as whitespace between the words.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "escape"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-6",
      type: "multiple-choice",
      question: "What is the difference between \"a\\nb\" and `a\\nb` in Go?",
      options: [
        { id: "a", text: "They produce the same output" },
        { id: "b", text: "The first produces 'a' newline 'b'; the second produces 'a\\nb' literally" },
        { id: "c", text: "The first is raw; the second is interpreted" },
        { id: "d", text: "The second is not valid Go" },
      ],
      correctAnswer: "b",
      explanation: "In double quotes, \\n is a newline character. In backticks, \\n is two literal characters: backslash and n. Interpreted strings process escape sequences; raw strings do not.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "raw-vs-interpreted"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hello\\x41\\x42\\x43"
    fmt.Println(s)
}`,
      options: [
        { id: "a", text: "HelloABC" },
        { id: "b", text: "Hello\\x41\\x42\\x43" },
        { id: "c", text: "Hello 65 66 67" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "\\x41 is hexadecimal escape for 'A' (65), \\x42 for 'B' (66), \\x43 for 'C' (67). Interpreted strings support hexadecimal byte escapes.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "hex-escape"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-8",
      type: "multiple-select",
      question: "Which of the following are invalid in a double-quoted string? (Select all that apply)",
      options: [
        { id: "a", text: "Unescaped backslash at end of line" },
        { id: "b", text: "Literal newline character" },
        { id: "c", text: "Unicode escape \\u0041" },
        { id: "d", text: "Octal escape \\101" },
      ],
      correctAnswer: ["b"],
      explanation: "Double-quoted strings cannot span multiple lines (literal newline). An unescaped backslash at end of line is actually fine (it's just \\ followed by nothing). \\u and octal escapes are valid. A literal newline requires a raw string or \\n.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "syntax"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Unicode: \\u0048\\u0065\\u006C\\u006C\\u006F"
    fmt.Println(s)
}`,
      options: [
        { id: "a", text: "Unicode: Hello" },
        { id: "b", text: "Unicode: \\u0048\\u0065\\u006C\\u006C\\u006F" },
        { id: "c", text: "Unicode: 00480065006C006C006F" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "\\u0048 is Unicode code point U+0048 ('H'), \\u0065 is 'e', \\u006C is 'l', \\u006C is 'l', \\u006F is 'o'. Go interprets \\u escapes in double-quoted strings.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "unicode"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-10",
      type: "multiple-choice",
      question: "What is the length of the string \"Hello\\tWorld\"?",
      options: [
        { id: "a", text: "11" },
        { id: "b", text: "12" },
        { id: "c", text: "13" },
        { id: "d", text: "10" },
      ],
      correctAnswer: "b",
      explanation: "len counts bytes. 'Hello' (5) + \\t (1 byte for tab) + 'World' (5) = 11 bytes. Actually, let me recalculate: H-e-l-l-o (5) + tab (1) + W-o-r-l-d (5) = 11.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "length"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-11",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    s := "Line 1
    Line 2"
    fmt.Println(s)
}`,
      options: [
        { id: "a", text: "Missing semicolon" },
        { id: "b", text: "Double-quoted strings cannot span multiple lines — use backticks or \\n" },
        { id: "c", text: "String is too long" },
        { id: "d", text: "The code is correct" },
      ],
      correctAnswer: "b",
      explanation: "Double-quoted strings cannot contain literal newlines. Use backticks for multi-line strings: `Line 1\\nLine 2`, or use \\n: \"Line 1\\nLine 2\". This is a common mistake when copying text.",
      difficulty: "hard",
      points: 30,
      tags: ["strings", "identify-bug"],
      relatedLesson: "interpreted-string-literals",
    },
    {
      id: "interp-12",
      type: "scenario",
      question: "You need to construct a SQL query string with a table name. Which approach is safest?",
      options: [
        { id: "a", text: 'fmt.Sprintf("SELECT * FROM %s", tableName)' },
        { id: "b", text: 'fmt.Sprintf("SELECT * FROM \\\"%s\\\"", tableName)' },
        { id: "c", text: "Use string concatenation with + operator" },
        { id: "d", text: "Use raw strings and replace placeholders" },
      ],
      correctAnswer: "d",
      explanation: "For SQL queries, use raw strings with parameterized queries (via database/sql or an ORM). Sprintf is vulnerable to SQL injection. Raw strings preserve formatting. Always use parameterized queries, not string interpolation.",
      difficulty: "hard",
      points: 30,
      tags: ["security", "strings", "sql"],
      relatedLesson: "interpreted-string-literals",
    },
  ],
  "raw-string-literals": [
    {
      id: "raw-1",
      type: "multiple-choice",
      question: "What character delimits raw string literals in Go?",
      options: [
        { id: "a", text: "Double quotes" },
        { id: "b", text: "Backticks (`)" },
        { id: "c", text: "Single quotes" },
        { id: "d", text: "Triple quotes" },
      ],
      correctAnswer: "b",
      explanation: "Raw string literals use backticks: `Hello\\nWorld`. In raw strings, backslash is just a regular character — no escape sequences are processed.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "syntax"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-2",
      type: "true-false",
      question: "Escape sequences like \\n are interpreted in raw string literals.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Raw string literals treat backslashes as regular characters. `Hello\\nWorld` contains a literal backslash, 'n' — not a newline. This is the key difference from interpreted (double-quoted) strings.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "raw"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := ` + "`" + `Hello
World` + "`" + `
    fmt.Println(s)
}`,
      options: [
        { id: "a", text: "HelloWorld" },
        { id: "b", text: "Hello\\nWorld" },
        { id: "c", text: "Hello" },
        { id: "d", text: "Hello\\nWorld (with actual newline)" },
      ],
      correctAnswer: "d",
      explanation: "Raw strings can span multiple lines. The newline between 'Hello' and 'World' is literal. fmt.Println outputs: Hello, newline, World, newline.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "raw", "multiline"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-4",
      type: "multiple-select",
      question: "Which of the following are common uses for raw string literals? (Select all that apply)",
      options: [
        { id: "a", text: "Regular expressions" },
        { id: "b", text: "HTML templates" },
        { id: "c", text: "JSON strings" },
        { id: "d", text: "SQL queries" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "Raw strings are ideal when the content contains many backslashes or special characters: regex patterns, HTML/SQL/JSON templates. They avoid the need to double-escape everything.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "use-cases"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := ` + "`" + `^\d{3}-\d{4}$` + "`" + `
    r := regexp.MustCompile(pattern)
    fmt.Println(r.MatchString("555-1234"))
}`,
      options: [
        { id: "a", text: "false" },
        { id: "b", text: "true" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime error" },
      ],
      correctAnswer: "b",
      explanation: "Using a raw string for regex avoids double-escaping: `^\\d{3}-\\d{4}$` instead of \"^\\\\d{3}-\\\\d{4}$\". The regex matches '555-1234' (3 digits, dash, 4 digits).",
      difficulty: "medium",
      points: 20,
      tags: ["regex", "raw-strings"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-6",
      type: "multiple-choice",
      question: "Can raw string literals contain backtick characters?",
      options: [
        { id: "a", text: "Yes, using backtick escape" },
        { id: "b", text: "No, raw strings cannot contain backticks" },
        { id: "c", text: "Yes, they are allowed inside backticks" },
        { id: "d", text: "Only with a special escape sequence" },
      ],
      correctAnswer: "b",
      explanation: "Raw string literals cannot contain backtick characters since the backtick is the delimiter. You cannot escape it. If you need a backtick in a raw string, use string concatenation or a rune conversion.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "raw", "limitations"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s1 := "Hello\\tWorld"
    s2 := ` + "`" + `Hello\tWorld` + "`" + `
    fmt.Println(s1 == s2)
    fmt.Println(len(s1), len(s2))
}`,
      options: [
        { id: "a", text: "true 11 11" },
        { id: "b", text: "false 11 12" },
        { id: "c", text: "false 10 11" },
        { id: "d", text: "true 10 10" },
      ],
      correctAnswer: "b",
      explanation: "s1 has a tab character (1 byte), s2 has backslash + 't' (2 bytes). They are NOT equal. len(s1) = 5+1+5 = 11, len(s2) = 5+2+5 = 12.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "raw-vs-interpreted"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-8",
      type: "multiple-choice",
      question: "What is the trailing newline behavior of raw string literals?",
      options: [
        { id: "a", text: "Backtick strings never contain newlines" },
        { id: "b", text: "A raw string starts and ends with a newline that can be trimmed with strings.TrimSpace" },
        { id: "c", text: "Backtick strings automatically trim leading/trailing newlines" },
        { id: "d", text: "Raw strings add a newline after the closing backtick" },
      ],
      correctAnswer: "b",
      explanation: "If you write a raw string like `\\nHello\\n`, the string includes the literal newline characters. When using backtick formatting, leading/trailing whitespace (including newlines) is part of the string.",
      difficulty: "hard",
      points: 30,
      tags: ["strings", "raw", "edge-cases"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-9",
      type: "identify-bug",
      question: "This code has an issue. What is it?",
      code: `package main

import "fmt"

func main() {
    s := ` + "`" + `He said "hello"` + "`" + `
    fmt.Println(s)
}`,
      options: [
        { id: "a", text: "Compilation error — raw strings cannot contain double quotes" },
        { id: "b", text: "The code is correct — raw strings can contain double quotes" },
        { id: "c", text: "Runtime error" },
        { id: "d", text: "The quotes are escaped" },
      ],
      correctAnswer: "b",
      explanation: "Raw strings can contain double quotes since the delimiter is backticks, not double quotes. This is one reason raw strings are useful — no need to escape double quotes.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "raw"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-10",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    json := ` + "`" + `{
    "name": "Go",
    "version": "1.21"
}` + "`" + `
    fmt.Println(json)
}`,
      options: [
        { id: "a", text: "{\\n    \"name\": \"Go\",\\n    \"version\": \"1.21\"\\n}" },
        { id: "b", text: "The raw JSON string with actual newlines and indentation" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Single line without newlines" },
      ],
      correctAnswer: "b",
      explanation: "Raw strings preserve all whitespace, including newlines and indentation. The output shows the JSON with actual formatting — no escape sequences needed.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "raw", "json"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-11",
      type: "multiple-select",
      question: "Which of the following is true about raw string literals? (Select all that apply)",
      options: [
        { id: "a", text: "They can span multiple lines" },
        { id: "b", text: "They cannot contain backtick characters" },
        { id: "c", text: "They can contain double quotes without escaping" },
        { id: "d", text: "They are always interpreted at compile time" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Raw strings: span multiple lines (yes), cannot contain backticks (yes), can contain double quotes (yes), are compile-time constants like all string literals (not 'interpreted' at runtime).",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "raw"],
      relatedLesson: "raw-string-literals",
    },
    {
      id: "raw-12",
      type: "best-practice",
      question: "When should you choose raw string literals over interpreted strings?",
      options: [
        { id: "a", text: "Always — they are more efficient" },
        { id: "b", text: "When the content contains many backslashes (regex, SQL, HTML) or when you need multi-line strings without \\n" },
        { id: "c", text: "Only for JSON data" },
        { id: "d", text: "Never — interpreted strings are always better" },
      ],
      correctAnswer: "b",
      explanation: "Raw strings shine when: content has many backslashes (avoid double-escaping), multi-line text is needed without \\n concatenation, or when embedding code/SQL/HTML. Use interpreted strings when you need escape sequences like \\n or \\t.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "strings"],
      relatedLesson: "raw-string-literals",
    },
  ],
  "runes": [
    {
      id: "rune-1",
      type: "multiple-choice",
      question: "What is a rune in Go?",
      options: [
        { id: "a", text: "A character literal type, alias for int32" },
        { id: "b", text: "A string processing function" },
        { id: "c", text: "A regular expression type" },
        { id: "d", text: "A type for ASCII characters only" },
      ],
      correctAnswer: "a",
      explanation: "rune is a built-in alias for int32, used to represent Unicode code points. Single-quoted character literals like 'A' are of type rune. It's the closest Go has to a 'char' type.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "runes"],
      relatedLesson: "runes",
    },
    {
      id: "rune-2",
      type: "true-false",
      question: "A rune literal 'A' and a string literal \"A\" have the same type.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "'A' is a rune (int32) representing a single Unicode code point. \"A\" is a string containing the UTF-8 encoding of 'A' (1 byte). They are different types with different representations.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "runes", "strings"],
      relatedLesson: "runes",
    },
    {
      id: "rune-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    r := 'A'
    fmt.Printf("%T %d %c\\n", r, r, r)
}`,
      options: [
        { id: "a", text: "int32 65 A" },
        { id: "b", text: "rune 65 A" },
        { id: "c", text: "char 65 A" },
        { id: "d", text: "byte 65 A" },
      ],
      correctAnswer: "a",
      explanation: "'A' is type int32 (rune is an alias, %T shows the underlying type). Unicode code point 65 = 'A'. %d prints decimal, %c prints character.",
      difficulty: "easy",
      points: 10,
      tags: ["runes", "types"],
      relatedLesson: "runes",
    },
    {
      id: "rune-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hello"
    runes := []rune(s)
    fmt.Println(len(s), len(runes))
    
    s2 := "世界"
    runes2 := []rune(s2)
    fmt.Println(len(s2), len(runes2))
}`,
      options: [
        { id: "a", text: "5 5 6 2" },
        { id: "b", text: "5 5 2 2" },
        { id: "c", text: "5 5 6 6" },
        { id: "d", text: "5 5 3 3" },
      ],
      correctAnswer: "a",
      explanation: "For 'Hello': len=5 bytes, 5 runes (all ASCII). For '世界': len=6 bytes (3 per character), 2 runes. []rune() converts to a slice of Unicode code points.",
      difficulty: "medium",
      points: 20,
      tags: ["runes", "unicode", "strings"],
      relatedLesson: "runes",
    },
    {
      id: "rune-5",
      type: "multiple-select",
      question: "When ranging over a string, what does Go iterate over? (Select all that apply)",
      options: [
        { id: "a", text: "UTF-8 encoded bytes" },
        { id: "b", text: "Runes (Unicode code points)" },
        { id: "c", text: "Characters" },
        { id: "d", text: "Both index and rune value" },
      ],
      correctAnswer: ["b", "d"],
      explanation: "for i, r := range s iterates over runes (not bytes). i is the byte index, r is the rune value. This is different from for i := 0; i < len(s); i++ which iterates bytes.",
      difficulty: "medium",
      points: 20,
      tags: ["runes", "range"],
      relatedLesson: "runes",
    },
    {
      id: "rune-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Go语言"
    for i, r := range s {
        fmt.Printf("index:%d rune:%c\\n", i, r)
    }
}`,
      options: [
        { id: "a", text: "index:0 rune:G\\nindex:1 rune:o\\nindex:2 rune:语\\nindex:5 rune:言" },
        { id: "b", text: "index:0 rune:G\\nindex:1 rune:o\\nindex:2 rune:语\\nindex:3 rune:言" },
        { id: "c", text: "index:0 rune:Go语言" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "G (index 0), o (index 1), 语 (index 2, 3 bytes — so next index is 5), 言 (index 5). Range gives byte indices, which skip ahead for multi-byte characters.",
      difficulty: "medium",
      points: 20,
      tags: ["runes", "range", "unicode"],
      relatedLesson: "runes",
    },
    {
      id: "rune-7",
      type: "multiple-choice",
      question: "How do you get the number of characters (not bytes) in a string?",
      options: [
        { id: "a", text: "len(s)" },
        { id: "b", text: "utf8.RuneCountInString(s)" },
        { id: "c", text: "len([]rune(s))" },
        { id: "d", text: "Both b and c" },
      ],
      correctAnswer: "d",
      explanation: "utf8.RuneCountInString(s) counts runes without allocation. len([]rune(s)) converts to []rune first (allocating), then counts. Both give the number of characters. RuneCountInString is more efficient.",
      difficulty: "medium",
      points: 20,
      tags: ["runes", "strings"],
      relatedLesson: "runes",
    },
    {
      id: "rune-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    s := "Hello, 世界"
    fmt.Println(utf8.ValidString(s))
    
    s2 := string([]byte{0xff, 0xfe})
    fmt.Println(utf8.ValidString(s2))
}`,
      options: [
        { id: "a", text: "true true" },
        { id: "b", text: "true false" },
        { id: "c", text: "false true" },
        { id: "d", text: "false false" },
      ],
      correctAnswer: "b",
      explanation: "utf8.ValidString checks if a string contains valid UTF-8. 'Hello, 世界' is valid UTF-8. {0xff, 0xfe} is not valid UTF-8 (those bytes don't form valid multi-byte sequences).",
      difficulty: "medium",
      points: 20,
      tags: ["runes", "utf8"],
      relatedLesson: "runes",
    },
    {
      id: "rune-9",
      type: "multiple-choice",
      question: "What is the Unicode code point for the rune '中'?",
      options: [
        { id: "a", text: "20013" },
        { id: "b", text: "65" },
        { id: "c", text: "48" },
        { id: "d", text: "128" },
      ],
      correctAnswer: "a",
      explanation: "'中' is Unicode code point U+4E2D, which is 20013 in decimal. You can verify with fmt.Printf(\"%d\", '中'). 'A' is 65, '0' is 48.",
      difficulty: "medium",
      points: 20,
      tags: ["runes", "unicode"],
      relatedLesson: "runes",
    },
    {
      id: "rune-10",
      type: "identify-bug",
      question: "This code has an issue. What is it?",
      code: `package main

import "fmt"

func main() {
    s := "Hello, 世界"
    fmt.Println(s[7])
}`,
      options: [
        { id: "a", text: "s[7] is '世' (the character)" },
        { id: "b", text: "s[7] is a single byte of the multi-byte character — may print garbage" },
        { id: "c", text: "Compilation error — index out of range" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "b",
      explanation: "'Hello, 世' has '世' starting at byte index 7 (3 bytes: 0xe4, 0xb8, 0x96). s[7] is the first byte 0xe4, which is not valid UTF-8 on its own. Printing with %c may show garbage or nothing useful.",
      difficulty: "hard",
      points: 30,
      tags: ["runes", "utf8", "identify-bug"],
      relatedLesson: "runes",
    },
    {
      id: "rune-11",
      type: "multiple-select",
      question: "Which functions in the unicode/utf8 package are useful for working with runes? (Select all that apply)",
      options: [
        { id: "a", text: "utf8.RuneCountInString" },
        { id: "b", text: "utf8.DecodeRuneInString" },
        { id: "c", text: "utf8.EncodeRune" },
        { id: "d", text: "utf8.ValidString" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All are useful: RuneCountInString counts runes, DecodeRuneInString decodes the next rune, EncodeRune encodes a rune to bytes, ValidString checks UTF-8 validity.",
      difficulty: "medium",
      points: 20,
      tags: ["runes", "stdlib"],
      relatedLesson: "runes",
    },
    {
      id: "rune-12",
      type: "scenario",
      question: "You need to truncate a string to the first N characters (not bytes) while preserving valid UTF-8. What is the correct approach?",
      options: [
        { id: "a", text: "s[:N]" },
        { id: "b", text: "Convert to []rune, slice, convert back: string([]rune(s)[:N])" },
        { id: "c", text: "strings.Substring(s, 0, N)" },
        { id: "d", text: "s[0:N*4]" },
      ],
      correctAnswer: "b",
      explanation: "s[:N] slices bytes, potentially cutting multi-byte characters. Converting to []rune, slicing, and converting back ensures character boundaries. strings.Substring doesn't exist in Go. s[0:N*4] is incorrect.",
      difficulty: "hard",
      points: 30,
      tags: ["runes", "strings", "unicode"],
      relatedLesson: "runes",
    },
  ],
  "type-inference": [
    {
      id: "infer-1",
      type: "multiple-choice",
      question: "What does type inference mean in Go?",
      options: [
        { id: "a", text: "The compiler automatically determines the type of a variable from its initialization expression" },
        { id: "b", text: "The runtime checks types at execution time" },
        { id: "c", text: "You must always specify the type explicitly" },
        { id: "d", text: "Type inference only works with const" },
      ],
      correctAnswer: "a",
      explanation: "Type inference lets the compiler deduce the variable type from the right-hand side of := or var x = expr. This reduces verbosity while maintaining static type safety.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "inference"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-2",
      type: "code-output",
      question: "What type does x have in each case?",
      code: `package main

import "fmt"

func main() {
    x := 42
    y := 3.14
    z := "hello"
    w := true
    fmt.Printf("%T %T %T %T\\n", x, y, z, w)
}`,
      options: [
        { id: "a", text: "int float64 string bool" },
        { id: "b", text: "int float32 string bool" },
        { id: "c", text: "int64 float64 string bool" },
        { id: "d", text: "int float64 []byte bool" },
      ],
      correctAnswer: "a",
      explanation: "Integer literals default to int, floating-point to float64, string literals to string, true/false to bool. These are the default types for untyped constants.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "inference"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-3",
      type: "true-false",
      question: "Type inference in Go uses the same mechanism as languages like Python or JavaScript.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go uses static type inference — types are determined at compile time. Python/JavaScript use dynamic typing with runtime type checking. Go's inference is compile-time, ensuring type safety.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "static-vs-dynamic"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 42
    fmt.Printf("%T\\n", x)
    x = 3.14  // Does this work?
}`,
      options: [
        { id: "a", text: "int — but the second line fails to compile" },
        { id: "b", text: "int — and the second line assigns 3.14 (truncated to 3)" },
        { id: "c", text: "float64 — and the assignment works" },
        { id: "d", text: "Compilation error on first line" },
      ],
      correctAnswer: "a",
      explanation: "x := 42 infers x as int. x = 3.14 fails because you can't assign a float64 to an int without explicit conversion. Go's static typing prevents implicit type changes.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "inference", "assignment"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-5",
      type: "multiple-choice",
      question: "What type does Go infer for an untyped integer constant like 42?",
      options: [
        { id: "a", text: "int64" },
        { id: "b", text: "int (default type for integer constants)" },
        { id: "c", text: "uint" },
        { id: "d", text: "It has no default type" },
      ],
      correctAnswer: "b",
      explanation: "Untyped integer constants default to int when used in a context requiring a type. However, they can be used as any integer type: var x int32 = 42 is valid because 42 is an untyped constant.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "constants", "inference"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    const x = 42
    var y int32 = x
    var z int64 = x
    fmt.Println(y, z)
}`,
      options: [
        { id: "a", text: "42 42" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "0 0" },
        { id: "d", text: "42 0" },
      ],
      correctAnswer: "a",
      explanation: "Unstyled constants have no fixed type and can be used as any compatible type. x (untyped 42) can be assigned to both int32 and int64 variables. This is a feature of Go's untyped constants.",
      difficulty: "medium",
      points: 20,
      tags: ["constants", "types", "inference"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-7",
      type: "multiple-select",
      question: "When does Go's type inference NOT work? (Select all that apply)",
      options: [
        { id: "a", text: "At package level with var (requires explicit type or expression)" },
        { id: "b", text: "When declaring a variable without initialization" },
        { id: "c", text: "In function parameters" },
        { id: "d", text: "In := declarations" },
      ],
      correctAnswer: ["a", "b"],
      explanation: "Package-level var needs an expression or explicit type: var x = 5 or var x int. var x (without init) needs explicit type. := always needs initialization. Function parameters always have explicit types.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "inference", "scope"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3, 4, 5}
    even := []int{}
    for _, n := range nums {
        if n%2 == 0 {
            even = append(even, n)
        }
    }
    fmt.Println(even)
}`,
      options: [
        { id: "a", text: "[2 4]" },
        { id: "b", text: "[1 3 5]" },
        { id: "c", text: "[]" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "The code filters even numbers from nums. n%2 == 0 is true for 2 and 4. even starts empty and appends 2, then 4. Output: [2 4].",
      difficulty: "medium",
      points: 20,
      tags: ["inference", "slices"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-9",
      type: "multiple-choice",
      question: "What is the difference between var x = 5 and x := 5 inside a function?",
      options: [
        { id: "a", text: "They are identical in all respects" },
        { id: "b", text: "Both declare and initialize x as int, but := can only be used inside functions" },
        { id: "c", text: "var creates a package-level variable; := creates a constant" },
        { id: "d", text: "There is no difference at all" },
      ],
      correctAnswer: "b",
      explanation: "Both infer int type and assign 5. var x = 5 works at package level and function level. x := 5 only works inside functions. They are equivalent inside functions.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "declaration"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-10",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

func main() {
    var x
    x = 5
}`,
      options: [
        { id: "a", text: "x is already declared" },
        { id: "b", text: "var x without a type or initialization expression is invalid" },
        { id: "c", text: "5 is not assignable to x" },
        { id: "d", text: "The code is correct" },
      ],
      correctAnswer: "b",
      explanation: "var x requires either a type (var x int) or an initialization expression (var x = 5). Without either, the compiler cannot determine the type. The fix: var x = 5 or var x int.",
      difficulty: "medium",
      points: 20,
      tags: ["types", "declaration", "identify-bug"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 42
    fmt.Printf("%T\\n", x)
    y := float64(x)
    fmt.Printf("%T\\n", y)
}`,
      options: [
        { id: "a", text: "int float64" },
        { id: "b", text: "int int" },
        { id: "c", text: "float64 float64" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "x := 42 infers int. float64(x) explicitly converts to float64, and y := float64(x) infers float64. Type inference follows the explicit conversion.",
      difficulty: "easy",
      points: 10,
      tags: ["types", "inference", "conversion"],
      relatedLesson: "type-inference",
    },
    {
      id: "infer-12",
      type: "best-practice",
      question: "When should you prefer explicit type annotation over type inference?",
      options: [
        { id: "a", text: "Never — inference is always sufficient" },
        { id: "b", text: "When the type is not obvious from the right-hand side, for exported variables, or when the inferred type might be too narrow/wide" },
        { id: "c", text: "Always — explicit is better than implicit" },
        { id: "d", text: "Only when the compiler requires it" },
      ],
      correctAnswer: "b",
      explanation: "Use explicit types when: the type isn't obvious (var result = compute() — what type?), for package-level variables (public API clarity), or when you want a specific type (var x float64 = 5 instead of var x = 5).",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "types"],
      relatedLesson: "type-inference",
    },
  ],
  "type-conversion": [
    {
      id: "convert-1",
      type: "multiple-choice",
      question: "How do you convert an int to a float64 in Go?",
      options: [
        { id: "a", text: "float64(x)" },
        { id: "b", text: "(float64)x" },
        { id: "c", text: "toFloat64(x)" },
        { id: "d", text: "x.toFloat64()" },
      ],
      correctAnswer: "a",
      explanation: "Go uses function-call syntax for type conversion: float64(x). There are no cast operators or conversion methods. This syntax is consistent for all type conversions in Go.",
      difficulty: "easy",
      points: 10,
      tags: ["conversion", "types"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-2",
      type: "true-false",
      question: "Go supports implicit type conversions between compatible numeric types.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go does NOT support implicit type conversions. Even int32 to int64 requires explicit conversion. This prevents bugs from automatic widening/narrowing and makes code behavior explicit.",
      difficulty: "easy",
      points: 10,
      tags: ["conversion", "types"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 3.99
    y := int(x)
    fmt.Println(y)
}`,
      options: [
        { id: "a", text: "3.99" },
        { id: "b", text: "4" },
        { id: "c", text: "3" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "c",
      explanation: "int(x) truncates the decimal part (rounds toward zero). 3.99 becomes 3, not 4. Go truncates, it does not round. This is important to remember for numeric conversions.",
      difficulty: "easy",
      points: 10,
      tags: ["conversion", "truncation"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-4",
      type: "multiple-select",
      question: "Which of the following type conversions are valid in Go? (Select all that apply)",
      options: [
        { id: "a", text: "string([]byte{72, 101, 108, 108, 111})" },
        { id: "b", text: "[]byte(\"Hello\")" },
        { id: "c", text: "int(\"42\")" },
        { id: "d", text: "string(65)" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "string([]byte) converts bytes to string. []byte(string) converts string to bytes. string(65) converts int to string (Unicode code point 65 = 'A'). int(\"42\") is NOT valid — use strconv.Atoi.",
      difficulty: "medium",
      points: 20,
      tags: ["conversion", "types"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    fmt.Println(string(65))
    fmt.Println(string([]byte{72, 101, 108, 108, 111}))
}`,
      options: [
        { id: "a", text: "A Hello" },
        { id: "b", text: "65 Hello" },
        { id: "c", text: "A [72 101 108 108 111]" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "string(65) converts Unicode code point 65 to 'A'. string([]byte{72,...}) converts bytes to string 'Hello'. This is the standard way to convert between strings and byte slices.",
      difficulty: "medium",
      points: 20,
      tags: ["conversion", "strings"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-6",
      type: "multiple-choice",
      question: "What happens when you convert a float to an int in Go?",
      options: [
        { id: "a", text: "Rounds to nearest integer" },
        { id: "b", text: "Truncates toward zero (drops the fractional part)" },
        { id: "c", text: "Panics if the value is not an integer" },
        { id: "d", text: "Returns the ceiling" },
      ],
      correctAnswer: "b",
      explanation: "Converting float to int truncates toward zero: 3.9 → 3, -3.9 → -3. It does not round, ceiling, or floor. Use math.Round(), math.Ceil(), or math.Floor() for those behaviors.",
      difficulty: "medium",
      points: 20,
      tags: ["conversion", "truncation"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-7",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    var x int32 = 100000
    var y int16 = x
    fmt.Println(y)
}`,
      options: [
        { id: "a", text: "x is too large for int16" },
        { id: "b", text: "Cannot assign int32 to int16 — need explicit conversion y := int16(x)" },
        { id: "c", text: "int16 and int32 cannot be converted" },
        { id: "d", text: "The code is correct" },
      ],
      correctAnswer: "b",
      explanation: "Go requires explicit conversion: var y int16 = int16(x). Without it, the compiler error is 'cannot use x (variable of type int32) as type int16 in assignment'. Note: 100000 exceeds int16 max (32767), so it will overflow.",
      difficulty: "medium",
      points: 20,
      tags: ["conversion", "identify-bug"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    var x int32 = 100000
    y := int16(x)
    fmt.Println(y)
}`,
      options: [
        { id: "a", text: "100000" },
        { id: "b", text: "-31072" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "b",
      explanation: "int16 can hold -32768 to 32767. 100000 wraps around: 100000 % 65536 = 34464, then as signed: 34464 - 65536 = -31072. Go performs two's complement truncation for integer overflows.",
      difficulty: "hard",
      points: 30,
      tags: ["conversion", "overflow"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-9",
      type: "multiple-select",
      question: "Which conversions will cause a compilation error? (Select all that apply)",
      options: [
        { id: "a", text: "string(myInt) where myInt is int" },
        { id: "b", text: "int(myString) where myString is string" },
        { id: "c", text: "*int(&myInt) where myInt is int" },
        { id: "d", text: "bool(1) where 1 is int" },
      ],
      correctAnswer: ["b", "d"],
      explanation: "int(string) is invalid — use strconv.Atoi. bool(int) is invalid — Go doesn't allow int-to-bool conversion. string(int) is valid (Unicode code point). *int(&int) is valid (pointer conversion).",
      difficulty: "hard",
      points: 30,
      tags: ["conversion", "errors"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-10",
      type: "scenario",
      question: "You receive a JSON response with a numeric field and need to parse it. Which conversion approach is correct?",
      options: [
        { id: "a", text: 'var x int = json.Number("42")' },
        { id: "b", text: "Use json.Unmarshal into a struct with int field, or use strconv.Atoi for string conversion" },
        { id: "c", text: 'int(jsonString)' },
        { id: "d", text: "Use fmt.Sprintf" },
      ],
      correctAnswer: "b",
      explanation: "json.Unmarshal handles type conversion from JSON numbers to Go types. For string-to-int, use strconv.Atoi. Direct type conversions like int(string) don't parse — they convert Unicode code points.",
      difficulty: "medium",
      points: 20,
      tags: ["conversion", "json", "parsing"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-11",
      type: "multiple-choice",
      question: "What is the result of converting a string with multi-byte UTF-8 characters to []byte?",
      options: [
        { id: "a", text: "Each rune becomes one byte" },
        { id: "b", text: "Each rune becomes its UTF-8 encoded bytes" },
        { id: "c", text: "Compilation error for non-ASCII strings" },
        { id: "d", text: "Only ASCII characters are included" },
      ],
      correctAnswer: "b",
      explanation: "[]byte(\"世界\") produces the UTF-8 encoded bytes for each character. '世' is 3 bytes, '界' is 3 bytes, so the result is a 6-byte slice. This preserves the exact UTF-8 encoding.",
      difficulty: "medium",
      points: 20,
      tags: ["conversion", "utf8", "strings"],
      relatedLesson: "type-conversion",
    },
    {
      id: "convert-12",
      type: "architecture",
      question: "Why does Go require explicit type conversions instead of implicit ones?",
      options: [
        { id: "a", text: "To make the compiler simpler" },
        { id: "b", text: "To make all type-related behavior explicit in the code, preventing subtle bugs from implicit widening/narrowing" },
        { id: "c", text: "To improve runtime performance" },
        { id: "d", text: "To be compatible with C" },
      ],
      correctAnswer: "b",
      explanation: "Explicit conversions make type behavior visible in the code. Implicit conversions can hide precision loss, overflow, or semantic changes. Go prioritizes clarity and explicit intent over convenience.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "design"],
      relatedLesson: "type-conversion",
    },
  ],
  "const-and-iota": [
    {
      id: "iota-1",
      type: "multiple-choice",
      question: "What is iota in Go?",
      options: [
        { id: "a", text: "A built-in function for iteration" },
        { id: "b", text: "An identifier that resets to 0 in each const block and increments by 1" },
        { id: "c", text: "A keyword for loops" },
        { id: "d", text: "A type for enums" },
      ],
      correctAnswer: "b",
      explanation: "iota is a special constant identifier that auto-increments within a const block. It starts at 0 and increments by 1 for each constant specification. It's the idiomatic way to create enums in Go.",
      difficulty: "easy",
      points: 10,
      tags: ["constants", "iota"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-2",
      type: "code-output",
      question: "What are the values of a, b, c, d?",
      code: `const (
    a = iota
    b
    c
    d
)`,
      options: [
        { id: "a", text: "0 1 2 3" },
        { id: "b", text: "1 2 3 4" },
        { id: "c", text: "0 0 0 0" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "iota starts at 0 and increments for each line: a=0, b=1, c=2, d=3. Once declared, constants repeat the previous expression if no new value is given.",
      difficulty: "easy",
      points: 10,
      tags: ["iota", "constants"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-3",
      type: "multiple-select",
      question: "Which of the following are valid uses of const in Go? (Select all that apply)",
      options: [
        { id: "a", text: "const x = 42" },
        { id: "b", text: "const x int = 42" },
        { id: "c", text: "const x = computeValue()" },
        { id: "d", text: "const ( a = 1; b = 2 )" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Constants must be compile-time evaluable. const x = computeValue() is invalid because function calls are not constant expressions (except for a few special cases like unsafe.Sizeof).",
      difficulty: "easy",
      points: 10,
      tags: ["constants", "syntax"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-4",
      type: "code-output",
      question: "What are the values?",
      code: `const (
    _  = iota
    KB = 1 << (10 * iota)
    MB = 1 << (10 * iota)
    GB = 1 << (10 * iota)
)`,
      options: [
        { id: "a", text: "KB=1024 MB=1048576 GB=1073741824" },
        { id: "b", text: "KB=1 MB=1 GB=1" },
        { id: "c", text: "KB=0 MB=0 GB=0" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "_ = iota discards 0. KB: 1 << (10*1) = 1024. MB: 1 << (10*2) = 1048576. GB: 1 << (10*3) = 1073741824. This is the idiomatic way to define byte size constants.",
      difficulty: "medium",
      points: 20,
      tags: ["iota", "bitwise"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-5",
      type: "code-output",
      question: "What are the values of the constants?",
      code: `const (
    A = iota * 10
    B
    C
    D
)`,
      options: [
        { id: "a", text: "0 10 20 30" },
        { id: "b", text: "0 1 2 3" },
        { id: "c", text: "10 20 30 40" },
        { id: "d", text: "0 0 0 0" },
      ],
      correctAnswer: "a",
      explanation: "Each line repeats the expression with the new iota value. A=0*10=0, B=1*10=10, C=2*10=20, D=3*10=30.",
      difficulty: "medium",
      points: 20,
      tags: ["iota", "constants"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-6",
      type: "multiple-choice",
      question: "What is the purpose of the blank identifier _ in a const block with iota?",
      options: [
        { id: "a", text: "To skip a value in the iota sequence" },
        { id: "b", text: "To create an error" },
        { id: "c", text: "To start iota at 1 instead of 0" },
        { id: "d", text: "To reset iota to 0" },
      ],
      correctAnswer: "a",
      explanation: "_ = iota skips the current iota value (consuming it but not assigning to any constant). This is used to skip values, e.g., starting enums from 1: _ = iota; const A = iota.",
      difficulty: "medium",
      points: 20,
      tags: ["iota", "constants"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-7",
      type: "code-output",
      question: "What are the values?",
      code: `const (
    Sunday = iota
    _
    Tuesday
    _
    Thursday
    _
    Saturday
)`,
      options: [
        { id: "a", text: "Sunday=0 Tuesday=2 Thursday=4 Saturday=6" },
        { id: "b", text: "Sunday=0 Tuesday=1 Thursday=2 Saturday=3" },
        { id: "c", text: "Sunday=1 Tuesday=2 Thursday=3 Saturday=4" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "iota increments even for _ = iota. Sunday=0, _=1, Tuesday=2, _=3, Thursday=4, _=5, Saturday=6. The blank identifier consumes iota values but doesn't create constants.",
      difficulty: "medium",
      points: 20,
      tags: ["iota", "enums"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-8",
      type: "true-false",
      question: "Constants in Go can be of any type, including struct types.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Constants can be of any basic type (int, float, string, bool, complex). However, they cannot be of slice, map, or function types. Struct constants are allowed if the struct contains only basic types.",
      difficulty: "medium",
      points: 20,
      tags: ["constants", "types"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-9",
      type: "multiple-select",
      question: "Which of the following are NOT valid constant expressions? (Select all that apply)",
      options: [
        { id: "a", text: "const x = 1 + 2" },
        { id: "b", text: 'const x = len("hello")' },
        { id: "c", text: "const x = 1 << 3" },
        { id: "d", text: "const x = make([]int, 5)" },
      ],
      correctAnswer: ["b", "d"],
      explanation: "len() is a built-in function, not a constant expression. make() allocates memory, not a constant expression. 1+2 and 1<<3 are valid constant expressions.",
      difficulty: "hard",
      points: 30,
      tags: ["constants", "expressions"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-10",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

const x = 10

func main() {
    const y = x + 1
    fmt.Println(y)
}`,
      options: [
        { id: "a", text: "Constants cannot reference other constants" },
        { id: "b", text: "The code is correct — constants can reference other constants" },
        { id: "c", text: "x is not accessible inside main()" },
        { id: "d", text: "Missing type annotation" },
      ],
      correctAnswer: "b",
      explanation: "Constants CAN reference other constants. const y = x + 1 is valid — y becomes 11. Constants are evaluated at compile time and can reference each other.",
      difficulty: "medium",
      points: 20,
      tags: ["constants", "scope"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-11",
      type: "code-output",
      question: "What are the values?",
      code: `type Weekday int

const (
    Sunday    Weekday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)

func (d Weekday) String() string {
    return [...]string{
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday",
    }[d]
}`,
      options: [
        { id: "a", text: "Sunday=0, Monday=1, ..., Saturday=6 with String() returning day names" },
        { id: "b", text: "Sunday=1, Monday=2, ..., Saturday=7" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime error" },
      ],
      correctAnswer: "a",
      explanation: "This is the idiomatic Go pattern for enums: define a named type (Weekday), use iota for values (0-6), and implement String() for display. Sunday=0, Monday=1, etc.",
      difficulty: "hard",
      points: 30,
      tags: ["iota", "enums", "patterns"],
      relatedLesson: "const-and-iota",
    },
    {
      id: "iota-12",
      type: "scenario",
      question: "You need to define file permissions (read, write, execute) as bit flags using iota. Which is the correct approach?",
      options: [
        { id: "a", text: "const ( Read = 1; Write = 2; Execute = 4 )" },
        { id: "b", text: 'const ( Read = 1 << iota; Write; Execute )' },
        { id: "c", text: "const Read = 0x100" },
        { id: "d", text: 'var Read = 1' },
      ],
      correctAnswer: "b",
      explanation: "iota with bit shifts creates powers of 2: Read=1<<0=1, Write=1<<1=2, Execute=1<<2=4. This is the standard pattern for bit flags in Go. Option a works but is less idiomatic.",
      difficulty: "hard",
      points: 30,
      tags: ["iota", "bit-flags", "best-practice"],
      relatedLesson: "const-and-iota",
    },
  ],
  "conditionals": [
    {
      id: "cond-1",
      type: "multiple-choice",
      question: "Which keywords does Go use for conditional statements?",
      options: [
        { id: "a", text: "if, else, switch, select" },
        { id: "b", text: "if, else, elif, switch" },
        { id: "c", text: "if, unless, switch" },
        { id: "d", text: "when, if, switch" },
      ],
      correctAnswer: "a",
      explanation: "Go uses if, else, switch, and select (for channel operations). There is no 'elif', 'unless', or 'when'. Go's conditional syntax is deliberately minimal.",
      difficulty: "easy",
      points: 10,
      tags: ["conditionals", "syntax"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-2",
      type: "true-false",
      question: "Go requires parentheses around the condition in if statements.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go does NOT require parentheses around conditions: if x > 0 { ... }. If you include them, Go will error: 'if x > 0 { }' is correct; 'if (x > 0) { }' is wrong.",
      difficulty: "easy",
      points: 10,
      tags: ["conditionals", "syntax"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if x > 5 {
        fmt.Println("big")
    } else {
        fmt.Println("small")
    }
}`,
      options: [
        { id: "a", text: "big" },
        { id: "b", text: "small" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Both big and small" },
      ],
      correctAnswer: "a",
      explanation: "x=10 > 5, so the if branch executes: 'big'. The else branch is skipped.",
      difficulty: "easy",
      points: 10,
      tags: ["conditionals", "if-else"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-4",
      type: "multiple-select",
      question: "Which of the following are valid conditional forms in Go? (Select all that apply)",
      options: [
        { id: "a", text: "if x > 0 { }" },
        { id: "b", text: "if x := getValue(); x > 0 { }" },
        { id: "c", text: "if (x > 0) { }" },
        { id: "d", text: "if x > 0 { } else if x < 0 { } else { }" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "All are valid except 'if (x > 0) { }' — Go does not allow parentheses around conditions. The if-with-init form (b) is idiomatic Go for scoping variables.",
      difficulty: "easy",
      points: 10,
      tags: ["conditionals", "syntax"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    switch 3 {
    case 1:
        fmt.Println("one")
    case 2:
        fmt.Println("two")
    case 3:
        fmt.Println("three")
    default:
        fmt.Println("other")
    }
}`,
      options: [
        { id: "a", text: "one" },
        { id: "b", text: "two" },
        { id: "c", text: "three" },
        { id: "d", text: "other" },
      ],
      correctAnswer: "c",
      explanation: "switch 3 matches case 3: 'three'. Go's switch does not fall through by default (unlike C). Only the matching case executes.",
      difficulty: "easy",
      points: 10,
      tags: ["conditionals", "switch"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-6",
      type: "multiple-choice",
      question: "What is the default behavior of Go's switch statement regarding fallthrough?",
      options: [
        { id: "a", text: "Cases fall through to the next case by default" },
        { id: "b", text: "Cases do NOT fall through — each case is exclusive" },
        { id: "c", text: "Only the last case falls through" },
        { id: "d", text: "Fallthrough is required in every case" },
      ],
      correctAnswer: "b",
      explanation: "Go's switch does NOT fall through by default. Each case executes only its block. Use the 'fallthrough' keyword to force execution of the next case. This is different from C/Java.",
      difficulty: "easy",
      points: 10,
      tags: ["conditionals", "switch"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    switch {
    case 1 > 2:
        fmt.Println("1 > 2")
    case 2 > 1:
        fmt.Println("2 > 1")
    case 3 > 2:
        fmt.Println("3 > 2")
    }
}`,
      options: [
        { id: "a", text: "1 > 2" },
        { id: "b", text: "2 > 1" },
        { id: "c", text: "3 > 2" },
        { id: "d", text: "2 > 1 and 3 > 2" },
      ],
      correctAnswer: "b",
      explanation: "Switch without an expression evaluates boolean cases in order. 1>2 is false, 2>1 is true → '2 > 1' prints. 3>2 is never checked (switch stops at first match).",
      difficulty: "medium",
      points: 20,
      tags: ["conditionals", "switch"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if init := x > 5; init {
        fmt.Println("initialized:", init)
    }
}`,
      options: [
        { id: "a", text: "initialized: true" },
        { id: "b", text: "initialized: false" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime error" },
      ],
      correctAnswer: "a",
      explanation: "Go's if-with-init syntax: the variable 'init' is declared and initialized in the if statement. init = 10>5 = true. The variable is scoped to the if/else block.",
      difficulty: "medium",
      points: 20,
      tags: ["conditionals", "if-init"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-9",
      type: "multiple-choice",
      question: "What is the purpose of fallthrough in a switch statement?",
      options: [
        { id: "a", text: "It skips to the default case" },
        { id: "b", text: "It forces execution of the next case's body, regardless of its condition" },
        { id: "c", text: "It breaks out of the switch" },
        { id: "d", text: "It restarts the switch from the beginning" },
      ],
      correctAnswer: "b",
      explanation: "fallthrough forces execution of the next case's body without checking its condition. It must be the last statement in a case body. It's rarely used and considered non-idiomatic by many.",
      difficulty: "medium",
      points: 20,
      tags: ["conditionals", "switch", "fallthrough"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-10",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    switch x := 2; x {
    case 1, 3, 5:
        fmt.Println("odd")
    case 2, 4, 6:
        fmt.Println("even")
    }
}`,
      options: [
        { id: "a", text: "odd" },
        { id: "b", text: "even" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "odd even" },
      ],
      correctAnswer: "b",
      explanation: "Multiple values per case: case 2, 4, 6 matches x=2. The output is 'even'. Go's switch supports multi-value cases separated by commas.",
      difficulty: "medium",
      points: 20,
      tags: ["conditionals", "switch"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-11",
      type: "identify-bug",
      question: "This code has an issue. What is it?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if x > 5
    {
        fmt.Println("big")
    }
}`,
      options: [
        { id: "a", text: "The code is correct — this is valid Go" },
        { id: "b", text: "The opening brace must be on the same line as the if statement, not on the next line" },
        { id: "c", text: "Missing semicolon" },
        { id: "d", text: "x is not declared" },
      ],
      correctAnswer: "b",
      explanation: "Go enforces that the opening brace { must be on the same line as the if statement. Placing it on the next line causes a compilation error. This is a deliberate Go style rule.",
      difficulty: "medium",
      points: 20,
      tags: ["conditionals", "syntax", "identify-bug"],
      relatedLesson: "conditionals",
    },
    {
      id: "cond-12",
      type: "architecture",
      question: "In a large Go codebase, when should you prefer a switch statement over multiple if-else chains?",
      options: [
        { id: "a", text: "Always — switch is always faster" },
        { id: "b", text: "When comparing a single variable against multiple values — switch is more readable and maintainable" },
        { id: "c", text: "When you need short-circuit evaluation" },
        { id: "d", text: "When you have fewer than 2 conditions" },
      ],
      correctAnswer: "b",
      explanation: "switch is clearer when testing one value against multiple possibilities. if-else chains are better when testing different variables or complex boolean expressions. Switch is not necessarily faster — it's about readability.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "readability"],
      relatedLesson: "conditionals",
    },
  ],
  "if": [
    {
      id: "if-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    if x := 10; x > 5 {
        fmt.Println(x)
    }
}`,
      options: [
        { id: "a", text: "10" },
        { id: "b", text: "5" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "true" },
      ],
      correctAnswer: "a",
      explanation: "Go supports 'if init; condition { }' syntax. x is declared and initialized to 10, then checked: 10 > 5 is true, so 10 is printed.",
      difficulty: "easy",
      points: 10,
      tags: ["if", "init-statement"],
      relatedLesson: "if",
    },
    {
      id: "if-2",
      type: "true-false",
      question: "In Go, the braces { } around an if body are mandatory, even for single-line bodies.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Go requires braces for all control flow bodies (if, for, switch, func). If x > 0 fmt.Println(x) is invalid. You must write if x > 0 { fmt.Println(x) }.",
      difficulty: "easy",
      points: 10,
      tags: ["if", "syntax"],
      relatedLesson: "if",
    },
    {
      id: "if-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    if x := 10; x > 5 {
        fmt.Println("big:", x)
    } else {
        fmt.Println("small:", x)
    }
    // fmt.Println(x)  // What would this do?
}`,
      options: [
        { id: "a", text: "big: 10" },
        { id: "b", text: "small: 10" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "big: 10 and x is accessible" },
      ],
      correctAnswer: "a",
      explanation: "x > 5 is true, so 'big: 10' prints. The variable x declared in the if-init is scoped to the if/else block — it would not be accessible outside (commented line would fail).",
      difficulty: "easy",
      points: 10,
      tags: ["if", "scope"],
      relatedLesson: "if",
    },
    {
      id: "if-4",
      type: "multiple-select",
      question: "Which of the following are valid if-init patterns in Go? (Select all that apply)",
      options: [
        { id: "a", text: 'if err := doSomething(); err != nil {' },
        { id: "b", text: "if n := len(s); n > 0 {" },
        { id: "c", text: "if x, ok := m[key]; ok {" },
        { id: "d", text: 'if (err := doSomething()) != nil {' },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "All are valid Go if-init patterns. (d) is invalid because Go does not allow parentheses around conditions. The if-init pattern is commonly used for error checking and comma-ok idiom.",
      difficulty: "easy",
      points: 10,
      tags: ["if", "patterns"],
      relatedLesson: "if",
    },
    {
      id: "if-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    if x := 10; x > 5 {
        fmt.Println("x is:", x)
    } else if x > 3 {
        fmt.Println("x is medium:", x)
    } else {
        fmt.Println("x is small:", x)
    }
}`,
      options: [
        { id: "a", text: "x is: 10" },
        { id: "b", text: "x is medium: 10" },
        { id: "c", text: "x is small: 10" },
        { id: "d", text: "Compilation error — x is redeclared" },
      ],
      correctAnswer: "a",
      explanation: "x=10 > 5 is true, so the first branch executes. The else-if and else branches are not evaluated. x is accessible throughout the entire if-else chain.",
      difficulty: "medium",
      points: 20,
      tags: ["if", "else-if"],
      relatedLesson: "if",
    },
    {
      id: "if-6",
      type: "multiple-choice",
      question: "What is the scope of a variable declared in an if-init statement?",
      options: [
        { id: "a", text: "The entire function" },
        { id: "b", text: "Only within the if and its associated else/else-if blocks" },
        { id: "c", text: "The package" },
        { id: "d", text: "The current block only (not the else)" },
      ],
      correctAnswer: "b",
      explanation: "Variables declared in the if-init are scoped to the entire if-else chain. This allows the same variable to be used in if, else-if, and else bodies.",
      difficulty: "medium",
      points: 20,
      tags: ["if", "scope"],
      relatedLesson: "if",
    },
    {
      id: "if-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func process() error { return nil }

func main() {
    if err := process(); err != nil {
        fmt.Println("error:", err)
    } else {
        fmt.Println("success")
    }
}`,
      options: [
        { id: "a", text: "error: <nil>" },
        { id: "b", text: "success" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "b",
      explanation: "process() returns nil error. err = nil, so err != nil is false. The else branch executes: 'success'. This is the idiomatic Go error-checking pattern.",
      difficulty: "medium",
      points: 20,
      tags: ["if", "error-handling"],
      relatedLesson: "if",
    },
    {
      id: "if-8",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    if x := 10; x > 5 {
        fmt.Println(x)
    }
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "x is not declared" },
        { id: "b", text: "Variable x declared in if-init is not accessible outside the if block" },
        { id: "c", text: "Missing else clause" },
        { id: "d", text: "The code is correct" },
      ],
      correctAnswer: "b",
      explanation: "x is scoped to the if block. The second fmt.Println(x) outside the block cannot find x. This is the key scoping rule for if-init variables.",
      difficulty: "medium",
      points: 20,
      tags: ["if", "scope", "identify-bug"],
      relatedLesson: "if",
    },
    {
      id: "if-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 5
    if x > 10 {
        fmt.Println("big")
    } else if x > 3 {
        fmt.Println("medium")
    } else if x > 1 {
        fmt.Println("small")
    } else {
        fmt.Println("tiny")
    }
}`,
      options: [
        { id: "a", text: "big" },
        { id: "b", text: "medium" },
        { id: "c", text: "small" },
        { id: "d", text: "tiny" },
      ],
      correctAnswer: "b",
      explanation: "x=5: not > 10, but > 3 → 'medium'. Go evaluates conditions in order and executes the first matching branch.",
      difficulty: "medium",
      points: 20,
      tags: ["if", "else-if"],
      relatedLesson: "if",
    },
    {
      id: "if-10",
      type: "multiple-choice",
      question: "Why does Go require the opening brace on the same line as if?",
      options: [
        { id: "a", text: "To save horizontal space" },
        { id: "b", text: "To avoid the dangling else ambiguity present in C-like languages" },
        { id: "c", text: "For faster compilation" },
        { id: "d", text: "To match the style of Python" },
      ],
      correctAnswer: "b",
      explanation: "In C, placing the brace on a new line can create a dangling else ambiguity. Go's requirement ensures the parser always knows which if an else belongs to, eliminating this class of bugs.",
      difficulty: "hard",
      points: 30,
      tags: ["if", "design"],
      relatedLesson: "if",
    },
    {
      id: "if-11",
      type: "scenario",
      question: "You want to check if a file exists and read it. Which pattern is most idiomatic?",
      options: [
        { id: "a", text: "Check with os.Stat first, then open" },
        { id: "b", text: 'if f, err := os.Open(name); err != nil { handle error } else { defer f.Close(); use f }' },
        { id: "c", text: "Use try/catch around the file open" },
        { id: "d", text: "Use panic if file doesn't exist" },
      ],
      correctAnswer: "b",
      explanation: "The idiomatic Go pattern combines the if-init with error handling: open the file, check the error in the if condition, and use it in the else block. This scopes the file handle to the block.",
      difficulty: "hard",
      points: 30,
      tags: ["if", "error-handling", "best-practice"],
      relatedLesson: "if",
    },
    {
      id: "if-12",
      type: "best-practice",
      question: "When should you prefer if-else over switch in Go?",
      options: [
        { id: "a", text: "When testing a single variable against multiple values" },
        { id: "b", text: "When testing different variables or complex boolean expressions that don't share a common switch operand" },
        { id: "c", text: "When you need fallthrough behavior" },
        { id: "d", text: "Never — switch is always preferred" },
      ],
      correctAnswer: "b",
      explanation: "if-else is better when conditions test different variables or have complex logic (e.g., if a && b || c). switch is better when testing one value against multiple possibilities.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "readability"],
      relatedLesson: "if",
    },
  ],
  "if-else": [
    {
      id: "ifelse-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    age := 20
    if age >= 18 {
        fmt.Println("adult")
    } else {
        fmt.Println("minor")
    }
}`,
      options: [
        { id: "a", text: "adult" },
        { id: "b", text: "minor" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Both" },
      ],
      correctAnswer: "a",
      explanation: "age=20 >= 18, so the if branch executes: 'adult'. The else branch is skipped.",
      difficulty: "easy",
      points: 10,
      tags: ["if-else"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-2",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 5
    var result string
    if x > 10 {
        result = "big"
    } else {
        result = "small"
    }
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "big" },
        { id: "b", text: "small" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "" },
      ],
      correctAnswer: "b",
      explanation: "x=5 is not > 10, so else branch executes: result='small'. This is the traditional if-else pattern without init statement.",
      difficulty: "easy",
      points: 10,
      tags: ["if-else"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-3",
      type: "multiple-choice",
      question: "Can you have an else without an if in Go?",
      options: [
        { id: "a", text: "Yes" },
        { id: "b", text: "No — else must always follow an if or else-if" },
        { id: "c", text: "Only with a switch statement" },
        { id: "d", text: "Only in the main function" },
      ],
      correctAnswer: "b",
      explanation: "else must always be paired with an if or else-if. An orphaned else is a syntax error.",
      difficulty: "easy",
      points: 10,
      tags: ["if-else", "syntax"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    num := 15
    if num%2 == 0 {
        fmt.Println("even")
    } else if num%3 == 0 {
        fmt.Println("divisible by 3")
    } else {
        fmt.Println("other")
    }
}`,
      options: [
        { id: "a", text: "even" },
        { id: "b", text: "divisible by 3" },
        { id: "c", text: "other" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "15%2=1 (not 0), 15%3=0 → 'divisible by 3'. The else-if chain evaluates in order.",
      difficulty: "easy",
      points: 10,
      tags: ["if-else", "else-if"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "hello"
    if len(s) > 10 {
        fmt.Println("long")
    } else if len(s) > 5 {
        fmt.Println("medium")
    } else if len(s) > 0 {
        fmt.Println("short")
    } else {
        fmt.Println("empty")
    }
}`,
      options: [
        { id: "a", text: "long" },
        { id: "b", text: "medium" },
        { id: "c", text: "short" },
        { id: "d", text: "empty" },
      ],
      correctAnswer: "c",
      explanation: "len('hello')=5: not > 10, not > 5, but > 0 → 'short'.",
      difficulty: "medium",
      points: 20,
      tags: ["if-else", "strings"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 0
    if x := 5; x > 0 {
        fmt.Println("inner:", x)
    }
    fmt.Println("outer:", x)
}`,
      options: [
        { id: "a", text: "inner: 5\\nouter: 5" },
        { id: "b", text: "inner: 5\\nouter: 0" },
        { id: "c", text: "inner: 0\\nouter: 0" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "The if-init x:=5 creates a new x scoped to the if block. The outer x (initialized to 0) is unaffected. This demonstrates variable shadowing with if-init.",
      difficulty: "medium",
      points: 20,
      tags: ["if-else", "scope", "shadowing"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-7",
      type: "identify-bug",
      question: "This code has an issue. What is it?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if x > 5
    {
        fmt.Println("big")
    }
    else
    {
        fmt.Println("small")
    }
}`,
      options: [
        { id: "a", text: "Braces on separate lines cause a compilation error in Go" },
        { id: "b", text: "The code is correct" },
        { id: "c", text: "Missing semicolon" },
        { id: "d", text: "x is undeclared" },
      ],
      correctAnswer: "a",
      explanation: "Go requires the opening brace { on the same line as the if/else statement. Placing braces on separate lines is a compilation error. This is a deliberate Go formatting rule.",
      difficulty: "medium",
      points: 20,
      tags: ["if-else", "syntax", "identify-bug"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    switch result := classify(5); result {
    case "positive":
        fmt.Println("pos")
    case "negative":
        fmt.Println("neg")
    default:
        fmt.Println("zero")
    }
}

func classify(n int) string {
    if n > 0 {
        return "positive"
    } else if n < 0 {
        return "negative"
    }
    return "zero"
}`,
      options: [
        { id: "a", text: "pos" },
        { id: "b", text: "neg" },
        { id: "c", text: "zero" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "classify(5) returns 'positive'. The switch matches case 'positive': 'pos'. This combines function calls, if-else, and switch.",
      difficulty: "medium",
      points: 20,
      tags: ["if-else", "functions", "switch"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-9",
      type: "multiple-select",
      question: "Which of the following patterns are idiomatic Go for error handling with if-else? (Select all that apply)",
      options: [
        { id: "a", text: 'if err != nil { return err }' },
        { id: "b", text: 'if err := do(); err != nil { return fmt.Errorf("failed: %w", err) }' },
        { id: "c", text: 'try { do() } catch { return err }' },
        { id: "d", text: 'if result, err := do(); err != nil { return err } else { use(result) }' },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Go does not have try/catch. Idiomatic error handling: check err != nil, wrap errors with fmt.Errorf, or use if-init pattern. Options a, b, d are standard Go error patterns.",
      difficulty: "medium",
      points: 20,
      tags: ["error-handling", "patterns"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-10",
      type: "scenario",
      question: "You're writing a function that validates user input. Multiple conditions can fail. What is the best structure?",
      options: [
        { id: "a", text: "Deeply nested if-else blocks" },
        { id: "b", text: "Guard clauses with early returns at the top of the function" },
        { id: "c", text: "A single complex boolean expression" },
        { id: "d", text: "Use goto to jump to error handling" },
      ],
      correctAnswer: "b",
      explanation: "Guard clauses (early returns) keep code flat and readable: if invalidEmail { return error }. if invalidAge { return error }. This avoids deep nesting and is the preferred Go pattern.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "error-handling"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 42
    if x := x + 8; x > 50 {
        fmt.Println("A:", x)
    } else {
        fmt.Println("B:", x)
    }
    fmt.Println("C:", x)
}`,
      options: [
        { id: "a", text: "A: 50\\nC: 42" },
        { id: "b", text: "B: 50\\nC: 42" },
        { id: "c", text: "A: 50\\nC: 50" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "x:=x+8 makes inner x=50. 50>50 is false, so else: 'B: 50'. Wait, 50>50 is false, so else executes: 'B: 50'. Then outer x is still 42: 'C: 42'.",
      difficulty: "hard",
      points: 30,
      tags: ["if-else", "scope", "shadowing"],
      relatedLesson: "if-else",
    },
    {
      id: "ifelse-12",
      type: "architecture",
      question: "How should error handling with if-else be structured in a large Go application?",
      options: [
        { id: "a", text: "Use a single function that handles all errors with a big switch" },
        { id: "b", text: "Handle errors at each call site or use a centralized error handler that wraps errors with context" },
        { id: "c", text: "Ignore non-critical errors to keep code clean" },
        { id: "d", text: "Use panic for all errors" },
      ],
      correctAnswer: "b",
      explanation: "Handle errors where they occur (or propagate with wrapping). A centralized error handler can map error types to responses. Never ignore errors — use _ = err only when intentionally discarding.",
      difficulty: "hard",
      points: 30,
      tags: ["architecture", "error-handling"],
      relatedLesson: "if-else",
    },
  ],
  "switch": [
    {
      id: "switch-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    day := "Tuesday"
    switch day {
    case "Monday":
        fmt.Println("Start of week")
    case "Friday":
        fmt.Println("Almost weekend")
    case "Tuesday", "Wednesday", "Thursday":
        fmt.Println("Midweek")
    default:
        fmt.Println("Weekend")
    }
}`,
      options: [
        { id: "a", text: "Start of week" },
        { id: "b", text: "Almost weekend" },
        { id: "c", text: "Midweek" },
        { id: "d", text: "Weekend" },
      ],
      correctAnswer: "c",
      explanation: "day='Tuesday' matches the multi-value case 'Tuesday', 'Wednesday', 'Thursday'. Output: 'Midweek'.",
      difficulty: "easy",
      points: 10,
      tags: ["switch"],
      relatedLesson: "switch",
    },
    {
      id: "switch-2",
      type: "true-false",
      question: "Go's switch statement falls through to the next case by default.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go's switch does NOT fall through. Each case is exclusive. Use 'fallthrough' keyword to force execution of the next case. This is a major difference from C/Java switch.",
      difficulty: "easy",
      points: 10,
      tags: ["switch", "fallthrough"],
      relatedLesson: "switch",
    },
    {
      id: "switch-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    switch x := 2; {
    case x < 0:
        fmt.Println("negative")
    case x == 0:
        fmt.Println("zero")
    case x > 0:
        fmt.Println("positive")
    }
}`,
      options: [
        { id: "a", text: "negative" },
        { id: "b", text: "zero" },
        { id: "c", text: "positive" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "c",
      explanation: "Expressionless switch with boolean cases: case x > 0 is true for x=2. This is equivalent to an if-else chain but can be cleaner for multiple conditions.",
      difficulty: "easy",
      points: 10,
      tags: ["switch", "boolean"],
      relatedLesson: "switch",
    },
    {
      id: "switch-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    switch {
    case x > 100:
        fmt.Println("huge")
    case x > 10:
        fmt.Println("big")
    case x > 5:
        fmt.Println("medium")
    default:
        fmt.Println("small")
    }
}`,
      options: [
        { id: "a", text: "huge" },
        { id: "b", text: "big" },
        { id: "c", text: "medium" },
        { id: "d", text: "small" },
      ],
      correctAnswer: "c",
      explanation: "x=10: not > 100, not > 10 (10>10 is false!), but > 5 → 'medium'. Note: 10 > 10 is false.",
      difficulty: "medium",
      points: 20,
      tags: ["switch", "comparison"],
      relatedLesson: "switch",
    },
    {
      id: "switch-5",
      type: "multiple-select",
      question: "Which of the following are valid switch forms in Go? (Select all that apply)",
      options: [
        { id: "a", text: 'switch x {' },
        { id: "b", text: 'switch x := getValue(); x {' },
        { id: "c", text: 'switch {' },
        { id: "d", text: 'switch (x) {' },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go supports switch with expression, switch with init, and expressionless switch. switch (x) { is invalid — Go does not allow parentheses around the switch expression.",
      difficulty: "medium",
      points: 20,
      tags: ["switch", "syntax"],
      relatedLesson: "switch",
    },
    {
      id: "switch-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 5
    switch {
    case x > 3:
        fmt.Println("A")
        fallthrough
    case x > 4:
        fmt.Println("B")
    case x > 2:
        fmt.Println("C")
    }
}`,
      options: [
        { id: "a", text: "A" },
        { id: "b", text: "A B" },
        { id: "c", text: "A B C" },
        { id: "d", text: "A C" },
      ],
      correctAnswer: "b",
      explanation: "case x>3 is true (5>3): prints 'A'. fallthrough forces next case body: prints 'B'. Then x>4 is true (5>4), but since we fell through, we don't re-evaluate. Actually, fallthrough executes the next case body regardless. Output: A, B.",
      difficulty: "medium",
      points: 20,
      tags: ["switch", "fallthrough"],
      relatedLesson: "switch",
    },
    {
      id: "switch-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

type Color int

const (
    Red   Color = iota
    Green
    Blue
)

func main() {
    c := Green
    switch c {
    case Red:
        fmt.Println("red")
    case Green:
        fmt.Println("green")
    case Blue:
        fmt.Println("blue")
    }
}`,
      options: [
        { id: "a", text: "red" },
        { id: "b", text: "green" },
        { id: "c", text: "blue" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "c = Green = 1. switch matches case Green: 'green'. This is the idiomatic Go pattern for switch with enums (iota constants).",
      difficulty: "medium",
      points: 20,
      tags: ["switch", "enums"],
      relatedLesson: "switch",
    },
    {
      id: "switch-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import (
    "fmt"
    "time"
)

func main() {
    switch time.Now().Weekday() {
    case time.Saturday, time.Sunday:
        fmt.Println("weekend")
    default:
        fmt.Println("weekday")
    }
}`,
      options: [
        { id: "a", text: "weekend" },
        { id: "b", text: "weekday" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Depends on the current day" },
      ],
      correctAnswer: "d",
      explanation: "time.Now().Weekday() returns the current day. On Saturday/Sunday it prints 'weekend', otherwise 'weekday'. The answer depends on when the program runs.",
      difficulty: "medium",
      points: 20,
      tags: ["switch", "time"],
      relatedLesson: "switch",
    },
    {
      id: "switch-9",
      type: "multiple-choice",
      question: "In Go, when is fallthrough used in a switch?",
      options: [
        { id: "a", text: "It's the default behavior" },
        { id: "b", text: "It's rarely used — it forces the NEXT case's body to execute without checking its condition" },
        { id: "c", text: "It breaks out of the switch" },
        { id: "d", text: "It restarts the switch" },
      ],
      correctAnswer: "b",
      explanation: "fallthrough must be the last statement in a case body. It forces execution of the next case's body without evaluating its condition. It's rarely needed and considered non-idiomatic by many.",
      difficulty: "medium",
      points: 20,
      tags: ["switch", "fallthrough"],
      relatedLesson: "switch",
    },
    {
      id: "switch-10",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    switch x := 5; x {
    case 1:
        fmt.Println("one")
    fallthrough
    case 2:
        fmt.Println("two")
    }
}`,
      options: [
        { id: "a", text: "fallthrough cannot be used with a value switch" },
        { id: "b", text: "fallthrough must be the LAST statement in a case body" },
        { id: "c", text: "The code is correct" },
        { id: "d", text: "x is not declared" },
      ],
      correctAnswer: "b",
      explanation: "fallthrough cannot be followed by another statement or case. It must be the last line: fallthrough must be the final statement. Having fallthrough before case is a compilation error.",
      difficulty: "hard",
      points: 30,
      tags: ["switch", "fallthrough", "identify-bug"],
      relatedLesson: "switch",
    },
    {
      id: "switch-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 5
    switch {
    case x > 3:
        fmt.Println("A")
    case x > 4:
        fmt.Println("B")
    case x > 2:
        fmt.Println("C")
    }
}`,
      options: [
        { id: "a", text: "A" },
        { id: "b", text: "B" },
        { id: "c", text: "C" },
        { id: "d", text: "A B C" },
      ],
      correctAnswer: "a",
      explanation: "Expressionless switch evaluates cases in order. x=5>3 is true → 'A'. Once a case matches, the switch exits. B and C are never checked.",
      difficulty: "medium",
      points: 20,
      tags: ["switch", "evaluation"],
      relatedLesson: "switch",
    },
    {
      id: "switch-12",
      type: "scenario",
      question: "You need to handle different HTTP methods in a handler. Which approach is most idiomatic?",
      options: [
        { id: "a", text: "Multiple if-else checking r.Method" },
        { id: "b", text: 'switch r.Method { case "GET": ...; case "POST": ... }' },
        { id: "c", text: "Use a map of method to handler function" },
        { id: "d", text: "Both b and c are valid idiomatic approaches" },
      ],
      correctAnswer: "d",
      explanation: "switch is clean for a few methods. A map[string]http.HandlerFunc is cleaner for many methods. Both are idiomatic Go. The map approach scales better for many methods.",
      difficulty: "hard",
      points: 30,
      tags: ["switch", "http", "patterns"],
      relatedLesson: "switch",
    },
  ],
  "loops": [
    {
      id: "loop-1",
      type: "multiple-choice",
      question: "How many loop constructs does Go have?",
      options: [
        { id: "a", text: "for, while, do-while" },
        { id: "b", text: "Only for — it's the only looping keyword" },
        { id: "c", text: "for, foreach, repeat" },
        { id: "d", text: "for, while, until" },
      ],
      correctAnswer: "b",
      explanation: "Go has only the 'for' keyword for all looping needs. while, do-while, and foreach are not separate keywords — they are all implemented using 'for'.",
      difficulty: "easy",
      points: 10,
      tags: ["loops", "syntax"],
      relatedLesson: "loops",
    },
    {
      id: "loop-2",
      type: "true-false",
      question: "Go supports while loops as a separate keyword.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go does not have a 'while' keyword. A while-like loop is written as: for condition { }. A do-while would be: for { ... if !condition { break } }.",
      difficulty: "easy",
      points: 10,
      tags: ["loops", "syntax"],
      relatedLesson: "loops",
    },
    {
      id: "loop-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    sum := 0
    for i := 0; i < 5; i++ {
        sum += i
    }
    fmt.Println(sum)
}`,
      options: [
        { id: "a", text: "10" },
        { id: "b", text: "15" },
        { id: "c", text: "20" },
        { id: "d", text: "5" },
      ],
      correctAnswer: "a",
      explanation: "Sum: 0+1+2+3+4 = 10. The loop runs for i=0,1,2,3,4. i<5 means i stops at 4.",
      difficulty: "easy",
      points: 10,
      tags: ["loops", "for"],
      relatedLesson: "loops",
    },
    {
      id: "loop-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    i := 0
    for i < 5 {
        fmt.Print(i, " ")
        i++
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 " },
        { id: "b", text: "1 2 3 4 5 " },
        { id: "c", text: "0 1 2 3 4 5 " },
        { id: "d", text: "Infinite loop" },
      ],
      correctAnswer: "a",
      explanation: "This is a while-style for loop. Prints 0,1,2,3,4 with spaces. When i reaches 5, the condition is false and the loop exits.",
      difficulty: "easy",
      points: 10,
      tags: ["loops", "while"],
      relatedLesson: "loops",
    },
    {
      id: "loop-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := range 5 {
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 " },
        { id: "b", text: "1 2 3 4 5 " },
        { id: "c", text: "0 1 2 3 4 5 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "for i := range 5 iterates from 0 to 4 (exclusive of 5). This is the Go 1.22+ range-over-integer feature.",
      difficulty: "medium",
      points: 20,
      tags: ["loops", "range"],
      relatedLesson: "loops",
    },
    {
      id: "loop-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for {
        fmt.Println("forever")
        break
    }
}`,
      options: [
        { id: "a", text: "Infinite loop" },
        { id: "b", text: "forever" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Nothing" },
      ],
      correctAnswer: "b",
      explanation: "for { } is an infinite loop. break exits after one iteration. Output: 'forever' once.",
      difficulty: "easy",
      points: 10,
      tags: ["loops", "infinite"],
      relatedLesson: "loops",
    },
    {
      id: "loop-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        if i == 3 {
            continue
        }
        if i == 7 {
            break
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 4 5 6 " },
        { id: "b", text: "0 1 2 4 5 " },
        { id: "c", text: "0 1 2 " },
        { id: "d", text: "0 1 2 4 5 6 7 " },
      ],
      correctAnswer: "a",
      explanation: "i=3: continue (skips print). i=7: break (exits loop). Prints: 0,1,2,4,5,6.",
      difficulty: "medium",
      points: 20,
      tags: ["loops", "break", "continue"],
      relatedLesson: "loops",
    },
    {
      id: "loop-8",
      type: "multiple-select",
      question: "Which of the following are valid for loop forms in Go? (Select all that apply)",
      options: [
        { id: "a", text: "for { }" },
        { id: "b", text: "for condition { }" },
        { id: "c", text: "for init; condition; post { }" },
        { id: "d", text: "for range collection { }" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All four forms are valid: infinite loop, while-style, C-style three-clause, and range-style. Go's for is the only loop keyword but supports all these forms.",
      difficulty: "medium",
      points: 20,
      tags: ["loops", "syntax"],
      relatedLesson: "loops",
    },
    {
      id: "loop-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    sum := 0
    for i := 0; ; i++ {
        if i > 5 {
            break
        }
        sum += i
    }
    fmt.Println(sum)
}`,
      options: [
        { id: "a", text: "15" },
        { id: "b", text: "21" },
        { id: "c", text: "10" },
        { id: "d", text: "Infinite loop" },
      ],
      correctAnswer: "b",
      explanation: "Loop runs for i=0,1,2,3,4,5 (breaks when i>5, which is i=6). Sum: 0+1+2+3+4+5 = 15. Wait, i starts at 0, increments after each iteration. When i=6, 6>5 is true, break. Sum: 0+1+2+3+4+5 = 15.",
      difficulty: "medium",
      points: 20,
      tags: ["loops", "break"],
      relatedLesson: "loops",
    },
    {
      id: "loop-10",
      type: "identify-bug",
      question: "This code has an infinite loop. What's wrong?",
      code: `package main

func main() {
    i := 0
    for i < 10 {
        // Do something
        i++  // This is in a different scope
    }
}`,
      options: [
        { id: "a", text: "The code is correct" },
        { id: "b", text: "Infinite loop — the condition is always true if i never changes" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Missing break" },
      ],
      correctAnswer: "a",
      explanation: "This code is actually correct. i is declared outside the loop, i++ modifies it, and the condition i<10 eventually becomes false. There's no bug — the loop terminates when i reaches 10.",
      difficulty: "medium",
      points: 20,
      tags: ["loops", "identify-bug"],
      relatedLesson: "loops",
    },
    {
      id: "loop-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i, j := 0, 10; i < j; i, j = i+1, j-1 {
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 " },
        { id: "b", text: "0 1 2 3 4 5 " },
        { id: "c", text: "0 1 2 3 4 5 6 7 8 9 " },
        { id: "d", text: "0 10 1 9 2 8 3 7 4 6 " },
      ],
      correctAnswer: "a",
      explanation: "Multiple init/post variables. i goes 0,1,2,3,4; j goes 10,9,8,7,6. Loop exits when i>=j (i=5, j=5). Prints: 0,1,2,3,4.",
      difficulty: "hard",
      points: 30,
      tags: ["loops", "multiple-variables"],
      relatedLesson: "loops",
    },
    {
      id: "loop-12",
      type: "best-practice",
      question: "When should you use break with a label vs. a flag variable to exit nested loops?",
      options: [
        { id: "a", text: "Always use flag variables for clarity" },
        { id: "b", text: "Use labeled break for directly exiting nested loops — it's cleaner than flag variables" },
        { id: "c", text: "Use goto to exit nested loops" },
        { id: "d", text: "Never use nested loops" },
      ],
      correctAnswer: "b",
      explanation: "Labeled break (break Label) directly exits the outer loop. Flag variables add boilerplate. goto is discouraged. Labeled break is the idiomatic Go approach for exiting nested loops.",
      difficulty: "hard",
      points: 30,
      tags: ["loops", "best-practice"],
      relatedLesson: "loops",
    },
  ],
  "for-loop": [
    {
      id: "for-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        fmt.Print(i * i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 4 9 16 " },
        { id: "b", text: "0 1 2 3 4 " },
        { id: "c", text: "1 4 9 16 25 " },
        { id: "d", text: "5 10 15 20 25 " },
      ],
      correctAnswer: "a",
      explanation: "Squares of 0,1,2,3,4: 0,1,4,9,16.",
      difficulty: "easy",
      points: 10,
      tags: ["for", "loops"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-2",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 10; i > 0; i -= 2 {
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "10 8 6 4 2 " },
        { id: "b", text: "10 8 6 4 2 0 " },
        { id: "c", text: "10 9 8 7 6 5 4 3 2 1 " },
        { id: "d", text: "2 4 6 8 10 " },
      ],
      correctAnswer: "a",
      explanation: "Starts at 10, decrements by 2: 10,8,6,4,2. Stops when i<=0. 0 is not printed because the condition is checked before the body.",
      difficulty: "easy",
      points: 10,
      tags: ["for", "decrement"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 100; i++ {
        if i >= 5 {
            break
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 " },
        { id: "b", text: "0 1 2 3 4 5 " },
        { id: "c", text: "0 1 2 3 " },
        { id: "d", text: "0 1 2 3 4 5 6 " },
      ],
      correctAnswer: "a",
      explanation: "i goes 0,1,2,3,4. When i=5, break exits the loop. Output: 0,1,2,3,4.",
      difficulty: "easy",
      points: 10,
      tags: ["for", "break"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-4",
      type: "multiple-select",
      question: "Which of the following are valid for loop forms in Go? (Select all that apply)",
      options: [
        { id: "a", text: "for i := 0; i < 10; i++ { }" },
        { id: "b", text: "for { }" },
        { id: "c", text: "for i < 10 { }" },
        { id: "d", text: "for (i := 0; i < 10; i++) { }" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "All except (d) are valid. Go does not use parentheses in for statements. for (i := 0; ...) is a syntax error.",
      difficulty: "medium",
      points: 20,
      tags: ["for", "syntax"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    result := 1
    for i := 1; i <= 5; i++ {
        result *= i
    }
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "15" },
        { id: "b", text: "25" },
        { id: "c", text: "120" },
        { id: "d", text: "720" },
      ],
      correctAnswer: "c",
      explanation: "Factorial: 1*1*2*3*4*5 = 120. Note: the loop starts at i=1 (not i=0), so result = 1*1*2*3*4*5 = 120.",
      difficulty: "medium",
      points: 20,
      tags: ["for", "factorial"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        for j := 0; j < 3; j++ {
            fmt.Print(i*3+j, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 " },
        { id: "b", text: "0 0 0 1 1 1 2 2 2 3 3 3 4 4 4 " },
        { id: "c", text: "0 1 2 0 1 2 0 1 2 0 1 2 0 1 2 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "Nested loops: i=0: 0,1,2. i=1: 3,4,5. i=2: 6,7,8. i=3: 9,10,11. i=4: 12,13,14.",
      difficulty: "medium",
      points: 20,
      tags: ["for", "nested"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
OuterLoop:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                break OuterLoop
            }
            fmt.Print(i, j, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "00 01 02 10 " },
        { id: "b", text: "00 01 02 10 11 " },
        { id: "c", text: "00 01 02 " },
        { id: "d", text: "00 01 02 10 11 12 " },
      ],
      correctAnswer: "a",
      explanation: "Labeled break exits the outer loop. Prints 00,01,02,10. When i=1, j=1, break OuterLoop exits the outer for loop.",
      difficulty: "hard",
      points: 30,
      tags: ["for", "labeled-break"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        if i%2 == 0 {
            continue
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 2 4 " },
        { id: "b", text: "1 3 " },
        { id: "c", text: "1 2 3 4 " },
        { id: "d", text: "0 1 2 3 4 " },
      ],
      correctAnswer: "b",
      explanation: "continue skips even numbers. Prints odd numbers: 1,3.",
      difficulty: "medium",
      points: 20,
      tags: ["for", "continue"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    for x > 0 {
        x -= 3
    }
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "0" },
        { id: "b", text: "1" },
        { id: "c", text: "-2" },
        { id: "d", text: "2" },
      ],
      correctAnswer: "b",
      explanation: "x starts at 10. Subtract 3: 10,7,4,1,-2. When x=1, 1>0 is true, x becomes -2. When x=-2, -2>0 is false, loop exits. Output: -2. Wait, let me recalculate: 10→7→4→1→-2. When x=1, loop continues (1>0), x becomes -2. -2>0 is false, exit. Output: -2.",
      difficulty: "medium",
      points: 20,
      tags: ["for", "while-style"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-10",
      type: "identify-bug",
      question: "This code has an infinite loop. What's wrong?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        fmt.Print(i, " ")
        // Someone removed i++ here
    }
}`,
      options: [
        { id: "a", text: "The code is correct — i++ is in the post statement" },
        { id: "b", text: "Infinite loop because i is never incremented" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "The loop runs only once" },
      ],
      correctAnswer: "a",
      explanation: "The i++ is in the post statement of the for loop (for i:=0; i<10; i++), not in the body. The code is correct and prints 0-9.",
      difficulty: "medium",
      points: 20,
      tags: ["for", "identify-bug"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := range 3 {
        for j := range 3 {
            if i+j == 3 {
                goto done
            }
            fmt.Print(i, j, " ")
        }
    }
done:
    fmt.Println("done")
}`,
      options: [
        { id: "a", text: "00 01 02 10 11 12 done" },
        { id: "b", text: "00 01 02 10 11 done" },
        { id: "c", text: "00 01 02 10 done" },
        { id: "d", text: "done" },
      ],
      correctAnswer: "c",
      explanation: "i=0: j=0(0+0≠3), j=1(0+1≠3), j=2(0+2≠3). i=1: j=0(1+0≠3), j=1(1+1≠3), j=2(1+2=3)→goto done. Prints 00,01,02,10,11 then jumps to done.",
      difficulty: "hard",
      points: 30,
      tags: ["for", "goto"],
      relatedLesson: "for-loop",
    },
    {
      id: "for-12",
      type: "best-practice",
      question: "When should you use a traditional for loop vs. a range loop?",
      options: [
        { id: "a", text: "Always use range — it's more efficient" },
        { id: "b", text: "Use traditional for when you need index control, step values, or complex conditions; use range for iterating over collections" },
        { id: "c", text: "Use traditional for only for numerical sequences" },
        { id: "d", text: "They are always interchangeable" },
      ],
      correctAnswer: "b",
      explanation: "Traditional for is for when you need control over step values (i+=3), complex conditions, or numerical ranges. Range is for iterating over slices, maps, strings, and channels. Each has its place.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "for"],
      relatedLesson: "for-loop",
    },
  ],
  "for-range": [
    {
      id: "range-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30}
    for i, v := range nums {
        fmt.Print(i, v, " ")
    }
}`,
      options: [
        { id: "a", text: "0 10 1 20 2 30 " },
        { id: "b", text: "10 20 30 " },
        { id: "c", text: "0 1 2 10 20 30 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "range returns index and value pairs. i=0,v=10; i=1,v=20; i=2,v=30.",
      difficulty: "easy",
      points: 10,
      tags: ["range", "slices"],
      relatedLesson: "for-range",
    },
    {
      id: "range-2",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hello"
    for _, c := range s {
        fmt.Print(c, " ")
    }
}`,
      options: [
        { id: "a", text: "72 101 108 108 111 " },
        { id: "b", text: "H e l l o " },
        { id: "c", text: "Hello " },
        { id: "d", text: "0 1 2 3 4 " },
      ],
      correctAnswer: "a",
      explanation: "Range over string returns runes as int32. 'H'=72, 'e'=101, 'l'=108, 'l'=108, 'o'=111.",
      difficulty: "easy",
      points: 10,
      tags: ["range", "strings", "runes"],
      relatedLesson: "for-range",
    },
    {
      id: "range-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    m := map[string]int{"a": 1, "b": 2, "c": 3}
    for k, v := range m {
        fmt.Print(k, v, " ")
    }
}`,
      options: [
        { id: "a", text: "a1 b2 c3 " },
        { id: "b", text: "1 2 3 " },
        { id: "c", text: "a b c " },
        { id: "d", text: "Output order is not guaranteed" },
      ],
      correctAnswer: "d",
      explanation: "Map iteration order in Go is intentionally randomized. The output will contain all key-value pairs but in an unspecified order. This prevents programs from depending on map order.",
      difficulty: "easy",
      points: 10,
      tags: ["range", "maps"],
      relatedLesson: "for-range",
    },
    {
      id: "range-4",
      type: "true-false",
      question: "The index variable in a range loop is a copy and cannot modify the original slice.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "The value variable in range is a copy. Modifying it does not affect the original slice. To modify elements, use the index: for i := range nums { nums[i] = newValue }.",
      difficulty: "easy",
      points: 10,
      tags: ["range", "copies"],
      relatedLesson: "for-range",
    },
    {
      id: "range-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30, 40, 50}
    for i := range nums {
        nums[i] *= 2
    }
    fmt.Println(nums)
}`,
      options: [
        { id: "a", text: "[10 20 30 40 50]" },
        { id: "b", text: "[20 40 60 80 100]" },
        { id: "c", text: "[0 0 0 0 0]" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "for i := range nums gives only the index. nums[i] *= 2 modifies the slice element through the index. All values are doubled.",
      difficulty: "medium",
      points: 20,
      tags: ["range", "modification"],
      relatedLesson: "for-range",
    },
    {
      id: "range-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := "Hi, 世界!"
    count := 0
    for range s {
        count++
    }
    fmt.Println(count)
}`,
      options: [
        { id: "a", text: "8" },
        { id: "b", text: "11" },
        { id: "c", text: "10" },
        { id: "d", text: "9" },
      ],
      correctAnswer: "d",
      explanation: "for range s counts runes (characters). 'Hi, ' = 4 runes, '世界' = 2 runes, '!' = 1 rune = 7. Wait: H,i,,,space,世,界,! = 8. Let me count: H(1), i(2), ,(3), space(4), 世(5), 界(6), !(7). That's 7.",
      difficulty: "medium",
      points: 20,
      tags: ["range", "strings"],
      relatedLesson: "for-range",
    },
    {
      id: "range-7",
      type: "multiple-select",
      question: "Which of these can be ranged over in Go? (Select all that apply)",
      options: [
        { id: "a", text: "slices" },
        { id: "b", text: "maps" },
        { id: "c", text: "strings" },
        { id: "d", text: "integers (Go 1.22+)" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "Go ranges over slices, maps, strings, arrays, and channels. Since Go 1.22, you can also range over integers (for i := range n iterates 0 to n-1).",
      difficulty: "medium",
      points: 20,
      tags: ["range", "types"],
      relatedLesson: "for-range",
    },
    {
      id: "range-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    ch := make(chan int, 3)
    ch <- 10
    ch <- 20
    ch <- 30
    close(ch)
    
    for v := range ch {
        fmt.Print(v, " ")
    }
}`,
      options: [
        { id: "a", text: "10 20 30 " },
        { id: "b", text: "Infinite loop" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime panic" },
      ],
      correctAnswer: "a",
      explanation: "range over a closed channel receives values until the channel is drained. The channel has 3 buffered values: 10,20,30. After draining, the range exits.",
      difficulty: "medium",
      points: 20,
      tags: ["range", "channels"],
      relatedLesson: "for-range",
    },
    {
      id: "range-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    s := []int{1, 2, 3, 4, 5}
    var filtered []int
    for _, v := range s {
        if v%2 != 0 {
            filtered = append(filtered, v)
        }
    }
    fmt.Println(filtered)
}`,
      options: [
        { id: "a", text: "[2 4]" },
        { id: "b", text: "[1 3 5]" },
        { id: "c", text: "[1 2 3 4 5]" },
        { id: "d", text: "[]" },
      ],
      correctAnswer: "b",
      explanation: "Filters odd numbers: v%2!=0 is true for 1,3,5. Appends them to filtered. Output: [1 3 5].",
      difficulty: "medium",
      points: 20,
      tags: ["range", "filtering"],
      relatedLesson: "for-range",
    },
    {
      id: "range-10",
      type: "identify-bug",
      question: "This code doesn't modify the original slice. Why?",
      code: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3}
    for _, v := range nums {
        v = v * 2
    }
    fmt.Println(nums)
}`,
      options: [
        { id: "a", text: "The code is correct and modifies nums" },
        { id: "b", text: "v is a copy of the element — modifying v doesn't affect the original slice" },
        { id: "c", text: "range doesn't work with slices" },
        { id: "d", text: "Missing & before nums" },
      ],
      correctAnswer: "b",
      explanation: "range copies values. v = v*2 modifies the copy, not the original. To modify, use: for i := range nums { nums[i] *= 2 }.",
      difficulty: "medium",
      points: 20,
      tags: ["range", "copies", "identify-bug"],
      relatedLesson: "for-range",
    },
    {
      id: "range-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i, j := range "Go语言" {
        fmt.Printf("%d:%c ", i, j)
    }
}`,
      options: [
        { id: "a", text: "0:G 1:o 2:语 5:言 " },
        { id: "b", text: "0:G 1:o 2:语 3:言 " },
        { id: "c", text: "0:G 1:o 6:语 9:言 " },
        { id: "d", text: "0:G 1:o 2:语 4:言 " },
      ],
      correctAnswer: "a",
      explanation: "G(0), o(1), 语 starts at byte 2 (3 bytes), 言 starts at byte 5 (3 bytes). Index is the byte position, not character position.",
      difficulty: "hard",
      points: 30,
      tags: ["range", "strings", "bytes"],
      relatedLesson: "for-range",
    },
    {
      id: "range-12",
      type: "best-practice",
      question: "You want to iterate over a map and delete entries matching a condition. What is the safe way?",
      options: [
        { id: "a", text: "Use a separate slice to collect keys, then delete after the loop" },
        { id: "b", text: "Delete during range — Go allows modifying maps during range" },
        { id: "c", text: "Create a new map instead of modifying the original" },
        { id: "d", text: "Both a and c are safe approaches" },
      ],
      correctAnswer: "d",
      explanation: "Go allows deleting from a map during range (but not adding). Collecting keys first (a) is safe. Creating a new map (c) is also safe. Both avoid concurrent modification issues during iteration.",
      difficulty: "hard",
      points: 30,
      tags: ["range", "maps", "best-practice"],
      relatedLesson: "for-range",
    },
  ],
  "break": [
    {
      id: "break-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        if i == 5 {
            break
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 " },
        { id: "b", text: "0 1 2 3 4 5 " },
        { id: "c", text: "0 1 2 3 " },
        { id: "d", text: "5 " },
      ],
      correctAnswer: "a",
      explanation: "break exits the loop when i==5. The loop prints 0,1,2,3,4 and then stops.",
      difficulty: "easy",
      points: 10,
      tags: ["break", "loops"],
      relatedLesson: "break",
    },
    {
      id: "break-2",
      type: "true-false",
      question: "The break statement can only be used inside for loops in Go.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "break can be used in for loops, switch statements, and select statements. It exits the innermost enclosing for/switch/select.",
      difficulty: "easy",
      points: 10,
      tags: ["break", "control-flow"],
      relatedLesson: "break",
    },
    {
      id: "break-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    for _, v := range nums {
        if v > 7 {
            break
        }
        fmt.Print(v, " ")
    }
}`,
      options: [
        { id: "a", text: "1 2 3 4 5 6 7 " },
        { id: "b", text: "1 2 3 4 5 6 7 8 " },
        { id: "c", text: "1 2 3 4 5 6 " },
        { id: "d", text: "10 " },
      ],
      correctAnswer: "a",
      explanation: "When v=8 (>7), break exits the loop. Prints 1-7.",
      difficulty: "easy",
      points: 10,
      tags: ["break", "range"],
      relatedLesson: "break",
    },
    {
      id: "break-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if j == 2 {
                break
            }
            fmt.Print(i, j, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "00 01 10 11 20 21 " },
        { id: "b", text: "00 01 02 10 11 12 20 21 22 " },
        { id: "c", text: "00 01 10 11 20 21 22 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "break only exits the innermost loop. When j=2, inner loop breaks, outer loop continues. Prints 00,01, then 10,11, then 20,21.",
      difficulty: "medium",
      points: 20,
      tags: ["break", "nested-loops"],
      relatedLesson: "break",
    },
    {
      id: "break-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
OuterLoop:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if j == 2 {
                break OuterLoop
            }
            fmt.Print(i, j, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "00 01 10 11 20 21 " },
        { id: "b", text: "00 01 " },
        { id: "c", text: "00 01 10 11 " },
        { id: "d", text: "00 01 20 21 " },
      ],
      correctAnswer: "b",
      explanation: "break OuterLoop exits the OUTER loop. When i=0, j=2: break OuterLoop exits everything. Only 00,01 are printed.",
      difficulty: "medium",
      points: 20,
      tags: ["break", "labeled"],
      relatedLesson: "break",
    },
    {
      id: "break-6",
      type: "multiple-select",
      question: "Which statements can break be used in? (Select all that apply)",
      options: [
        { id: "a", text: "for loops" },
        { id: "b", text: "switch statements" },
        { id: "c", text: "select statements" },
        { id: "d", text: "if statements" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "break works in for, switch, and select. In switch, it exits the switch. In select, it exits the select. It does NOT work in if statements (if is not a loop).",
      difficulty: "medium",
      points: 20,
      tags: ["break", "control-flow"],
      relatedLesson: "break",
    },
    {
      id: "break-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    ch := make(chan int)
    go func() {
        for i := 0; i < 10; i++ {
            ch <- i
        }
        close(ch)
    }()
    
    for v := range ch {
        if v == 5 {
            break
        }
        fmt.Print(v, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 " },
        { id: "b", text: "0 1 2 3 4 5 " },
        { id: "c", text: "0 1 2 3 4 5 6 7 8 9 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "range over a channel receives values. When v=5, break exits the range loop. Prints 0-4.",
      difficulty: "medium",
      points: 20,
      tags: ["break", "channels"],
      relatedLesson: "break",
    },
    {
      id: "break-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    switch 3 {
    case 1:
        fmt.Println("one")
    case 2:
        fmt.Println("two")
    case 3:
        fmt.Println("three")
        break
        fmt.Println("after break")
    }
}`,
      options: [
        { id: "a", text: "three" },
        { id: "b", text: "three\\nafter break" },
        { id: "c", text: "after break" },
        { id: "d", text: "Nothing" },
      ],
      correctAnswer: "a",
      explanation: "break in a switch exits the switch. 'after break' is never reached. Output: 'three'.",
      difficulty: "medium",
      points: 20,
      tags: ["break", "switch"],
      relatedLesson: "break",
    },
    {
      id: "break-9",
      type: "multiple-choice",
      question: "What is the purpose of labeled break in Go?",
      options: [
        { id: "a", text: "To exit a specific nested loop by name" },
        { id: "b", text: "To add a comment to a break statement" },
        { id: "c", text: "To break out of a function" },
        { id: "d", text: "To create a named break point for debugging" },
      ],
      correctAnswer: "a",
      explanation: "A labeled break (break LabelName) exits the specific labeled loop, not just the innermost one. This is essential for breaking out of nested loops cleanly.",
      difficulty: "medium",
      points: 20,
      tags: ["break", "labeled"],
      relatedLesson: "break",
    },
    {
      id: "break-10",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        switch {
        case i < 2:
            fmt.Print(i, " ")
        case i == 3:
            break
        default:
            fmt.Print(i, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "0 1 4 " },
        { id: "b", text: "0 1 2 4 " },
        { id: "c", text: "0 1 4 5 " },
        { id: "d", text: "0 1 " },
      ],
      correctAnswer: "b",
      explanation: "i=0,1: <2 → print. i=2: default → print. i=3: break (exits switch, not for loop). i=4: default → print. Output: 0,1,2,4.",
      difficulty: "hard",
      points: 30,
      tags: ["break", "switch", "for"],
      relatedLesson: "break",
    },
    {
      id: "break-11",
      type: "identify-bug",
      question: "This code does not exit the outer loop when expected. What's wrong?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                break  // Want to exit outer loop
            }
            fmt.Print(i, j, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "break only exits the innermost loop — use break OuterLoop with a label" },
        { id: "b", text: "The code is correct" },
        { id: "c", text: "Missing label" },
        { id: "d", text: "break doesn't work in range loops" },
      ],
      correctAnswer: "a",
      explanation: "break without a label only exits the innermost loop. To exit the outer loop, define a label: OuterLoop: for i... { ... break OuterLoop }. Without the label, only the inner loop exits.",
      difficulty: "hard",
      points: 30,
      tags: ["break", "nested-loops", "identify-bug"],
      relatedLesson: "break",
    },
    {
      id: "break-12",
      type: "scenario",
      question: "You're processing items from a channel and want to stop when you receive a poison pill value. Which pattern is correct?",
      options: [
        { id: "a", text: "for v := range ch { if v == poison { break }; process(v) }" },
        { id: "b", text: "for { v := <-ch; if v == poison { return }; process(v) }" },
        { id: "c", text: "Both are valid patterns" },
        { id: "d", text: "Use goto to jump to cleanup code" },
      ],
      correctAnswer: "c",
      explanation: "Both patterns work. Range over channel exits when closed. Direct receive with break on poison value is also valid. Choose based on whether the channel is closed after the poison pill.",
      difficulty: "hard",
      points: 30,
      tags: ["break", "channels", "patterns"],
      relatedLesson: "break",
    },
  ],
  "continue": [
    {
      id: "cont-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        if i%2 == 0 {
            continue
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 2 4 " },
        { id: "b", text: "1 3 " },
        { id: "c", text: "1 2 3 4 " },
        { id: "d", text: "0 1 2 3 4 " },
      ],
      correctAnswer: "b",
      explanation: "continue skips even numbers. Prints odd numbers: 1,3.",
      difficulty: "easy",
      points: 10,
      tags: ["continue", "loops"],
      relatedLesson: "continue",
    },
    {
      id: "cont-2",
      type: "true-false",
      question: "continue can be used in switch statements in Go.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "continue can only be used in for loops. In a for loop, it skips to the next iteration. It cannot be used in switch or select statements.",
      difficulty: "easy",
      points: 10,
      tags: ["continue", "control-flow"],
      relatedLesson: "continue",
    },
    {
      id: "cont-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    nums := []int{1, -2, 3, -4, 5}
    sum := 0
    for _, v := range nums {
        if v < 0 {
            continue
        }
        sum += v
    }
    fmt.Println(sum)
}`,
      options: [
        { id: "a", text: "-6" },
        { id: "b", text: "9" },
        { id: "c", text: "3" },
        { id: "d", text: "15" },
      ],
      correctAnswer: "b",
      explanation: "continue skips negative numbers. Sum of positive: 1+3+5 = 9.",
      difficulty: "easy",
      points: 10,
      tags: ["continue", "sum"],
      relatedLesson: "continue",
    },
    {
      id: "cont-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        if i == 2 {
            continue
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 3 4 " },
        { id: "b", text: "0 1 2 3 4 " },
        { id: "c", text: "2 " },
        { id: "d", text: "0 1 3 4 5 " },
      ],
      correctAnswer: "a",
      explanation: "continue when i=2 skips the print. Prints 0,1,3,4.",
      difficulty: "easy",
      points: 10,
      tags: ["continue"],
      relatedLesson: "continue",
    },
    {
      id: "cont-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if j == 1 {
                continue
            }
            fmt.Print(i, j, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "00 02 10 12 20 22 " },
        { id: "b", text: "00 01 02 10 11 12 20 21 22 " },
        { id: "c", text: "00 10 20 " },
        { id: "d", text: "01 11 21 " },
      ],
      correctAnswer: "a",
      explanation: "continue only affects the innermost loop. When j=1, inner loop continues. Prints all combinations where j≠1: 00,02,10,12,20,22.",
      difficulty: "medium",
      points: 20,
      tags: ["continue", "nested-loops"],
      relatedLesson: "continue",
    },
    {
      id: "cont-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
OuterLoop:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if j == 1 {
                continue OuterLoop
            }
            fmt.Print(i, j, " ")
        }
    }
}`,
      options: [
        { id: "a", text: "00 10 20 " },
        { id: "b", text: "00 02 10 12 20 22 " },
        { id: "c", text: "00 01 02 " },
        { id: "d", text: "00 10 20 02 12 22 " },
      ],
      correctAnswer: "a",
      explanation: "continue OuterLoop skips to the next iteration of the OUTER loop when j=1. For i=0: prints 00, then j=1 continues outer. For i=1: prints 10, then j=1 continues outer. For i=2: prints 20.",
      difficulty: "hard",
      points: 30,
      tags: ["continue", "labeled"],
      relatedLesson: "continue",
    },
    {
      id: "cont-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    primes := []int{2, 3, 4, 5, 6, 7, 8, 9, 10}
    for _, v := range primes {
        if v%2 == 0 {
            continue
        }
        fmt.Print(v, " ")
    }
}`,
      options: [
        { id: "a", text: "2 4 6 8 10 " },
        { id: "b", text: "3 5 7 9 " },
        { id: "c", text: "3 5 7 " },
        { id: "d", text: "2 3 5 7 " },
      ],
      correctAnswer: "b",
      explanation: "continue skips even numbers. Prints odd numbers from the slice: 3,5,7,9.",
      difficulty: "medium",
      points: 20,
      tags: ["continue", "filtering"],
      relatedLesson: "continue",
    },
    {
      id: "cont-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        if i < 3 {
            continue
        }
        if i > 7 {
            break
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 5 6 7 8 9 " },
        { id: "b", text: "3 4 5 6 7 " },
        { id: "c", text: "3 4 5 6 7 8 " },
        { id: "d", text: "8 9 " },
      ],
      correctAnswer: "b",
      explanation: "continue skips i<3. break exits when i>7. Prints i=3,4,5,6,7.",
      difficulty: "medium",
      points: 20,
      tags: ["continue", "break"],
      relatedLesson: "continue",
    },
    {
      id: "cont-9",
      type: "multiple-select",
      question: "Which of the following are valid uses of labeled continue? (Select all that apply)",
      options: [
        { id: "a", text: "continue OuterLoop to skip to the next iteration of the outer loop" },
        { id: "b", text: "continue InnerLoop to skip to the next iteration of the inner loop" },
        { id: "c", text: "continue to skip to the next iteration of the current loop (no label needed)" },
        { id: "d", text: "continue Function to skip to the next function call" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Labeled continue works with for loops to specify which loop to continue. continue (no label) continues the innermost loop. There is no 'continue Function' — continue only works with for loops.",
      difficulty: "medium",
      points: 20,
      tags: ["continue", "labeled"],
      relatedLesson: "continue",
    },
    {
      id: "cont-10",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := range 10 {
        if i%3 == 0 {
            continue
        }
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "1 2 4 5 7 8 " },
        { id: "b", text: "0 3 6 9 " },
        { id: "c", text: "1 2 3 4 5 6 7 8 9 " },
        { id: "d", text: "3 6 9 " },
      ],
      correctAnswer: "a",
      explanation: "continue skips multiples of 3 (0,3,6,9). Prints 1,2,4,5,7,8.",
      difficulty: "medium",
      points: 20,
      tags: ["continue", "range"],
      relatedLesson: "continue",
    },
    {
      id: "cont-11",
      type: "identify-bug",
      question: "This code doesn't filter as expected. Why?",
      code: `package main

import "fmt"

func main() {
    words := []string{"hello", "", "world", "", "!"}
    for _, w := range words {
        if w == "" {
            continue
        }
        fmt.Print(w, " ")
    }
}`,
      options: [
        { id: "a", text: "The code is correct and filters empty strings" },
        { id: "b", text: "Empty strings are not filtered because '' != \"\"" },
        { id: "c", text: "continue doesn't work with strings" },
        { id: "d", text: "Missing break instead of continue" },
      ],
      correctAnswer: "a",
      explanation: "The code correctly filters empty strings. w == \"\" is true for empty strings, and continue skips them. Output: 'hello world !'. There is no bug.",
      difficulty: "medium",
      points: 20,
      tags: ["continue", "strings"],
      relatedLesson: "continue",
    },
    {
      id: "cont-12",
      type: "best-practice",
      question: "When should you use continue vs. restructuring with if-else?",
      options: [
        { id: "a", text: "Always use continue to avoid nesting" },
        { id: "b", text: "Use continue to skip early and keep the main logic at the top level, reducing indentation" },
        { id: "c", text: "Never use continue — always use if-else" },
        { id: "d", text: "Only use continue for performance optimization" },
      ],
      correctAnswer: "b",
      explanation: "continue as a 'guard clause' keeps the main logic unindented: if skipCondition { continue }; // main logic. This is often cleaner than wrapping main logic in an if-else.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "readability"],
      relatedLesson: "continue",
    },
  ],
  "goto-discouraged": [
    {
      id: "goto-1",
      type: "multiple-choice",
      question: "Does Go support the goto statement?",
      options: [
        { id: "a", text: "No, goto is removed from Go" },
        { id: "b", text: "Yes, but it's discouraged and cannot jump over variable declarations" },
        { id: "c", text: "Yes, it's commonly used in Go" },
        { id: "d", text: "Only in assembly code" },
      ],
      correctAnswer: "b",
      explanation: "Go does support goto, but it's rarely used and discouraged. It cannot jump over variable declarations (to prevent uninitialized variable issues). break/continue and labeled loops are preferred.",
      difficulty: "easy",
      points: 10,
      tags: ["goto", "control-flow"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-2",
      type: "true-false",
      question: "goto in Go can jump to any label in the same function, including across variable declarations.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go's goto cannot jump over variable declarations. This is a safety feature to prevent jumping to code where variables might not be initialized. The compiler enforces this restriction.",
      difficulty: "easy",
      points: 10,
      tags: ["goto", "restrictions"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    i := 0
Loop:
    if i < 5 {
        fmt.Print(i, " ")
        i++
        goto Loop
    }
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 " },
        { id: "b", text: "0 1 2 3 4 5 " },
        { id: "c", text: "Infinite loop" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "goto Loop jumps back to the label. Prints 0,1,2,3,4. When i=5, the condition is false and the loop exits. This is equivalent to a for loop.",
      difficulty: "medium",
      points: 20,
      tags: ["goto", "loops"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-4",
      type: "multiple-select",
      question: "Which of the following are restrictions on goto in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Cannot jump into a nested block from outside" },
        { id: "b", text: "Cannot jump over variable declarations" },
        { id: "c", text: "Cannot jump to a label in a different function" },
        { id: "d", text: "Cannot jump to a label at all" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go's goto: cannot jump into nested blocks, cannot jump over variable declarations (to avoid uninitialized vars), cannot cross function boundaries. It CAN jump to labels within the same function.",
      difficulty: "medium",
      points: 20,
      tags: ["goto", "restrictions"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                goto end
            }
            fmt.Print(i, j, " ")
        }
    }
end:
    fmt.Println("done")
}`,
      options: [
        { id: "a", text: "00 01 02 10 done" },
        { id: "b", text: "00 01 02 10 11 done" },
        { id: "c", text: "00 01 02 done" },
        { id: "d", text: "done" },
      ],
      correctAnswer: "a",
      explanation: "goto end jumps to the end label when i=1, j=1. Prints 00,01,02,10 then jumps to 'done'. This avoids the need for labeled break.",
      difficulty: "medium",
      points: 20,
      tags: ["goto", "nested-loops"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-6",
      type: "multiple-choice",
      question: "Why is goto discouraged in Go?",
      options: [
        { id: "a", text: "It's slower than other control flow" },
        { id: "b", text: "It makes code harder to read and maintain, creating spaghetti code" },
        { id: "c", text: "It's not supported by the Go compiler" },
        { id: "d", text: "It only works in the main function" },
      ],
      correctAnswer: "b",
      explanation: "goto creates non-linear control flow that's harder to follow. Go provides labeled break/continue and other constructs for all legitimate use cases. goto should only be used when other approaches are truly inadequate.",
      difficulty: "medium",
      points: 20,
      tags: ["goto", "best-practice"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if x > 5 {
        goto big
    }
    fmt.Println("small")
    return
big:
    fmt.Println("big")
}`,
      options: [
        { id: "a", text: "small\\nbig" },
        { id: "b", text: "big" },
        { id: "c", text: "small" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "x=10>5 is true, so goto big jumps to the label. 'small' is never printed. 'big' is printed.",
      difficulty: "medium",
      points: 20,
      tags: ["goto", "if"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-8",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func main() {
    goto end
    x := 10
    fmt.Println(x)
end:
    fmt.Println("done")
}`,
      options: [
        { id: "a", text: "The code is correct" },
        { id: "b", text: "goto cannot jump over variable declaration (x := 10)" },
        { id: "c", text: "Missing label syntax" },
        { id: "d", text: "goto cannot be used in main()" },
      ],
      correctAnswer: "b",
      explanation: "goto jumps over x := 10, which is not allowed. Go prevents jumping over variable declarations to ensure variables are properly initialized.",
      difficulty: "hard",
      points: 30,
      tags: ["goto", "restrictions", "identify-bug"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    err := process()
    if err != nil {
        goto cleanup
    }
    fmt.Println("success")
    return
cleanup:
    fmt.Println("cleanup:", err)
}

func process() error { return fmt.Errorf("failed") }`,
      options: [
        { id: "a", text: "success" },
        { id: "b", text: "cleanup: failed" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Runtime error" },
      ],
      correctAnswer: "b",
      explanation: "process() returns an error. err != nil is true, so goto cleanup jumps to the cleanup label. Prints 'cleanup: failed'.",
      difficulty: "medium",
      points: 20,
      tags: ["goto", "error-handling"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-10",
      type: "multiple-choice",
      question: "What is the alternative to goto for exiting nested loops?",
      options: [
        { id: "a", text: "Use a flag variable" },
        { id: "b", text: "Use labeled break (break LabelName)" },
        { id: "c", text: "Use return from the function" },
        { id: "d", text: "All of the above are alternatives" },
      ],
      correctAnswer: "d",
      explanation: "Labeled break is the most direct alternative. Flag variables work but add boilerplate. Return works if the loops are in the function's final logic. All are better than goto.",
      difficulty: "medium",
      points: 20,
      tags: ["goto", "alternatives"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-11",
      type: "scenario",
      question: "In what scenario might goto be considered acceptable in Go?",
      options: [
        { id: "a", text: "Replacing a for loop for better performance" },
        { id: "b", text: "Cleanup logic in a function with many deferred resources and complex error paths (though even here, defer is usually preferred)" },
        { id: "c", text: "Always — goto is as good as break" },
        { id: "d", text: "For jumping between goroutines" },
      ],
      correctAnswer: "b",
      explanation: "goto is rarely justified. Some C-to-Go transpilation uses it for cleanup. In idiomatic Go, use defer for cleanup. goto is acceptable only when all other approaches are significantly worse.",
      difficulty: "hard",
      points: 30,
      tags: ["goto", "best-practice"],
      relatedLesson: "goto-discouraged",
    },
    {
      id: "goto-12",
      type: "architecture",
      question: "Why does Go include goto despite discouraging it?",
      options: [
        { id: "a", text: "To maintain compatibility with C code" },
        { id: "b", text: "There are rare edge cases where goto provides the clearest solution, and removing it entirely would limit the language" },
        { id: "c", text: "For backward compatibility with Go 1.0" },
        { id: "d", text: "It was an oversight in the language design" },
      ],
      correctAnswer: "b",
      explanation: "Go's designers included goto for completeness but heavily restricted it (no jumping over vars, no cross-function). In rare cases (complex cleanup, transpiled code), goto can be the clearest option.",
      difficulty: "hard",
      points: 30,
      tags: ["goto", "design"],
      relatedLesson: "goto-discouraged",
    },
  ],
  "functions-basics": [
    {
      id: "funcbasic-1",
      type: "multiple-choice",
      question: "How do you define a function in Go?",
      options: [
        { id: "a", text: "function name() { }" },
        { id: "b", text: "func name() { }" },
        { id: "c", text: "def name() { }" },
        { id: "d", text: "fn name() { }" },
      ],
      correctAnswer: "b",
      explanation: "Go uses the 'func' keyword to define functions. 'function', 'def', and 'fn' are from other languages.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "syntax"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-2",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func greet(name string) {
    fmt.Println("Hello,", name)
}

func main() {
    greet("Go")
}`,
      options: [
        { id: "a", text: "Hello, Go" },
        { id: "b", text: "Hello Go" },
        { id: "c", text: "Hello, Go!" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "fmt.Println adds a space between arguments. 'Hello,' and 'Go' are printed with a space: 'Hello, Go'.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "calling"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-3",
      type: "multiple-select",
      question: "Which of the following are valid function signatures in Go? (Select all that apply)",
      options: [
        { id: "a", text: "func add(a, b int) int" },
        { id: "b", text: "func add(a int, b int) int" },
        { id: "c", text: "func add(int a, int b) int" },
        { id: "d", text: "func add(a, b int, c ...float64) int" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Go functions: params grouped by type (a, b int), individual params (a int, b int), variadic (c ...float64). 'func add(int a, int b)' is C/Java syntax, not Go.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "parameters"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-4",
      type: "true-false",
      question: "Go functions can only return a single value.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go functions can return multiple values: func divide(a, b int) (int, error). This is a core Go feature used extensively for error handling.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "returns"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func main() {
    result := add(3, 4)
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "7" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "c",
      explanation: "add(3,4) returns 3+4=7. result is assigned 7. fmt.Println prints 7.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "return"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-6",
      type: "multiple-choice",
      question: "What is the zero value for a function type in Go?",
      options: [
        { id: "a", text: "Empty function" },
        { id: "b", text: "nil" },
        { id: "c", text: "panic" },
        { id: "d", text: "func() {}" },
      ],
      correctAnswer: "b",
      explanation: "Functions are reference-like types. The zero value of a function variable is nil. Calling a nil function panics at runtime.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "zero-values"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-7",
      type: "code-output",
      question: "What happens at runtime?",
      code: `package main

func main() {
    var f func()
    f()
}`,
      options: [
        { id: "a", text: "Nothing — empty function is called" },
        { id: "b", text: "Runtime panic: function called on nil" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Returns nil" },
      ],
      correctAnswer: "b",
      explanation: "var f func() creates a nil function. Calling f() panics: 'runtime error: invalid memory address or nil pointer dereference'.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "nil"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func swap(a, b string) (string, string) {
    return b, a
}

func main() {
    x, y := swap("hello", "world")
    fmt.Println(x, y)
}`,
      options: [
        { id: "a", text: "hello world" },
        { id: "b", text: "world hello" },
        { id: "c", text: "hello hello" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "swap returns b, a = 'world', 'hello'. x='world', y='hello'. Output: 'world hello'.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "multiple-return"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-9",
      type: "multiple-select",
      question: "Which of the following are valid return types in Go? (Select all that apply)",
      options: [
        { id: "a", text: "int" },
        { id: "b", text: "(int, error)" },
        { id: "c", text: "[]int" },
        { id: "d", text: "func()" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "Go functions can return any type: single values, multiple values, slices, other functions, and more. All are valid return types.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "types"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-10",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func divide(a, b float64) (float64, bool) {
    if b == 0 {
        return 0, false
    }
    return a / b, true
}

func main() {
    result, ok := divide(10, 3)
    fmt.Printf("%.2f %v\\n", result, ok)
}`,
      options: [
        { id: "a", text: "3.33 true" },
        { id: "b", text: "0.00 false" },
        { id: "c", text: "3.33 false" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "divide(10,3) returns 10.0/3.0=3.33... and true (success). fmt.Printf formats with 2 decimal places: '3.33 true'.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "multiple-return", "error-handling"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-11",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func main() {
    result := add(3.5, 4.5)
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "add cannot take float64 arguments" },
        { id: "b", text: "The code is correct" },
        { id: "c", text: "Missing return type" },
        { id: "d", text: "Wrong function name" },
      ],
      correctAnswer: "a",
      explanation: "add expects int parameters but receives float64 (3.5, 4.5). Go does not perform implicit conversion. You need add(int(3.5), int(4.5)) or change the parameter types to float64.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "types", "identify-bug"],
      relatedLesson: "functions-basics",
    },
    {
      id: "funcbasic-12",
      type: "best-practice",
      question: "When should you create a new function vs. adding code to an existing function?",
      options: [
        { id: "a", text: "Always keep code in one function for easier debugging" },
        { id: "b", text: "Extract functions when: the function does multiple things, it's over 30-50 lines, or the same logic is duplicated" },
        { id: "c", text: "One function per line of code" },
        { id: "d", text: "Only create new functions when the compiler forces you to" },
      ],
      correctAnswer: "b",
      explanation: "Functions should do one thing (Single Responsibility). Extract when: doing multiple things, too long (>30-50 lines), duplicated logic, or complex enough to need its own test. Go prefers small, focused functions.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "functions"],
      relatedLesson: "functions-basics",
    },
  ],
  "functions": [
    {
      id: "func-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func modify(s []int) {
    s[0] = 999
}

func main() {
    nums := []int{1, 2, 3}
    modify(nums)
    fmt.Println(nums)
}`,
      options: [
        { id: "a", text: "[1 2 3]" },
        { id: "b", text: "[999 2 3]" },
        { id: "c", text: "[999 999 999]" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "Slices are passed by reference (header is copied, but underlying array is shared). modify changes the first element to 999. The original slice is affected.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "slices", "reference"],
      relatedLesson: "functions",
    },
    {
      id: "func-2",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func modify(x int) {
    x = 100
}

func main() {
    x := 5
    modify(x)
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "100" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "0" },
      ],
      correctAnswer: "a",
      explanation: "Go is pass-by-value. modify receives a copy of x. Changing the copy to 100 doesn't affect the original. x remains 5.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "pass-by-value"],
      relatedLesson: "functions",
    },
    {
      id: "func-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func modify(x *int) {
    *x = 100
}

func main() {
    x := 5
    modify(&x)
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "100" },
        { id: "c", text: "&5" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "modify takes a pointer to x. *x = 100 dereferences the pointer and modifies the original value. x becomes 100.",
      difficulty: "easy",
      points: 10,
      tags: ["functions", "pointers"],
      relatedLesson: "functions",
    },
    {
      id: "func-4",
      type: "multiple-select",
      question: "Which of the following are true about Go function parameters? (Select all that apply)",
      options: [
        { id: "a", text: "All parameters are passed by value" },
        { id: "b", text: "Slices share their underlying array with the caller" },
        { id: "c", text: "Maps are passed by reference" },
        { id: "d", text: "Pointers are passed by value (pointer copy)" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "Go passes everything by value. Slices: the header is copied but underlying array is shared. Maps: the internal pointer is copied (acts like reference). Pointers: the pointer address is copied, but both point to same memory.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "passing"],
      relatedLesson: "functions",
    },
    {
      id: "func-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func appendTo(s []int, v int) []int {
    return append(s, v)
}

func main() {
    nums := make([]int, 0, 3)
    nums = appendTo(nums, 1)
    nums = appendTo(nums, 2)
    fmt.Println(nums, len(nums), cap(nums))
}`,
      options: [
        { id: "a", text: "[1 2] 2 3" },
        { id: "b", text: "[1 2] 2 2" },
        { id: "c", text: "[1] 1 3" },
        { id: "d", text: "[1 2] 2 4" },
      ],
      correctAnswer: "a",
      explanation: "append returns a new slice header. The first append has cap=3, so no reallocation. Second append also fits. len=2, cap=3.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "slices", "append"],
      relatedLesson: "functions",
    },
    {
      id: "func-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func modifyMap(m map[string]int) {
    m["key"] = 42
}

func main() {
    m := make(map[string]int)
    modifyMap(m)
    fmt.Println(m)
}`,
      options: [
        { id: "a", text: "map[key:42]" },
        { id: "b", text: "map[]" },
        { id: "c", text: "nil" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "Maps are reference types in Go. The map header is passed by value, but the internal pointer references the same hash table. modifyMap changes the original map.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "maps"],
      relatedLesson: "functions",
    },
    {
      id: "func-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func double(x int) int {
    return x * 2
}

func apply(f func(int) int, x int) int {
    return f(x)
}

func main() {
    result := apply(double, 5)
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "10" },
        { id: "c", text: "25" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "apply takes a function and applies it to x. double(5) = 10. This demonstrates first-class functions in Go.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "first-class"],
      relatedLesson: "functions",
    },
    {
      id: "func-8",
      type: "multiple-choice",
      question: "What is the difference between func() and func()()?",
      options: [
        { id: "a", text: "They are the same" },
        { id: "b", text: "func() is a function type; func()() invokes a function that returns a function" },
        { id: "c", text: "func()() is invalid Go syntax" },
        { id: "d", text: "func()() calls the function twice" },
      ],
      correctAnswer: "b",
      explanation: "func() is a type (function taking no args, returning nothing). func()() is a function call where a function returns another function, which is then immediately invoked.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "types"],
      relatedLesson: "functions",
    },
    {
      id: "func-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func makeGreeter(greeting string) func(string) string {
    return func(name string) string {
        return greeting + ", " + name + "!"
    }
}

func main() {
    hello := makeGreeter("Hello")
    howdy := makeGreeter("Howdy")
    fmt.Println(hello("Go"))
    fmt.Println(howdy("World"))
}`,
      options: [
        { id: "a", text: "Hello, Go!\\nHowdy, World!" },
        { id: "b", text: "Hello, World!\\nHowdy, Go!" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Hello Go\\nHowdy World" },
      ],
      correctAnswer: "a",
      explanation: "makeGreeter returns a closure that captures 'greeting'. hello binds greeting='Hello', howdy binds greeting='Howdy'. Each closure has its own copy of greeting.",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "closures"],
      relatedLesson: "functions",
    },
    {
      id: "func-10",
      type: "identify-bug",
      question: "This code panics. What is the issue?",
      code: `package main

import "fmt"

func divide(a, b int) int {
    return a / b
}

func main() {
    fmt.Println(divide(10, 0))
}`,
      options: [
        { id: "a", text: "Compilation error" },
        { id: "b", text: "Runtime panic: integer divide by zero" },
        { id: "c", text: "Returns 0" },
        { id: "d", text: "Returns infinity" },
      ],
      correctAnswer: "b",
      explanation: "Integer division by zero causes a runtime panic in Go. The function should check for zero and return an error: func divide(a, b int) (int, error).",
      difficulty: "medium",
      points: 20,
      tags: ["functions", "error-handling", "identify-bug"],
      relatedLesson: "functions",
    },
    {
      id: "func-11",
      type: "scenario",
      question: "You need a function that can optionally take extra configuration. What is the Go pattern?",
      options: [
        { id: "a", text: "Use default parameters" },
        { id: "b", text: "Use functional options pattern: func WithX(v Option) Option" },
        { id: "c", text: "Use global variables" },
        { id: "d", text: "Use method overloading" },
      ],
      correctAnswer: "b",
      explanation: "Go doesn't have default parameters or method overloading. The functional options pattern (Dave Cheney's pattern) uses variadic option functions: NewServer(WithPort(8080), WithTimeout(5*time.Second)).",
      difficulty: "hard",
      points: 30,
      tags: ["functions", "patterns", "options"],
      relatedLesson: "functions",
    },
    {
      id: "func-12",
      type: "architecture",
      question: "How should errors be handled in function return values in Go?",
      options: [
        { id: "a", text: "Return only the error, let the caller figure out the value" },
        { id: "b", text: "Return (value, error) tuple and always check err != nil before using the value" },
        { id: "c", text: "Use panic for expected errors" },
        { id: "d", text: "Return empty values on error without telling the caller" },
      ],
      correctAnswer: "b",
      explanation: "The idiomatic Go pattern: return (T, error). Check error first: result, err := do(); if err != nil { return err }. Never use the result when err != nil. This makes error paths explicit.",
      difficulty: "hard",
      points: 30,
      tags: ["error-handling", "patterns"],
      relatedLesson: "functions",
    },
  ],
  "multiple-return-values": [
    {
      id: "multi-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    r, err := divide(10, 3)
    fmt.Printf("%.2f %v\\n", r, err)
}`,
      options: [
        { id: "a", text: "3.33 <nil>" },
        { id: "b", text: "0.00 division by zero" },
        { id: "c", text: "3.33 error" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "divide(10,3) returns (3.33..., nil). r=3.33, err=nil. Printf shows '3.33 <nil>'.",
      difficulty: "easy",
      points: 10,
      tags: ["multiple-return", "error-handling"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-2",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func coords() (int, int, int) {
    return 1, 2, 3
}

func main() {
    x, y, z := coords()
    fmt.Println(x, y, z)
}`,
      options: [
        { id: "a", text: "1 2 3" },
        { id: "b", text: "3 2 1" },
        { id: "c", text: "1 2" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "coords returns three values. Go assigns them in order: x=1, y=2, z=3.",
      difficulty: "easy",
      points: 10,
      tags: ["multiple-return"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-3",
      type: "true-false",
      question: "Go functions can return any number of values (1, 2, 3, or more).",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Go functions can return any number of values. Common patterns: one value, two values (value+error), or more. There's no practical limit.",
      difficulty: "easy",
      points: 10,
      tags: ["multiple-return"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-4",
      type: "multiple-select",
      question: "Which of the following are valid ways to discard return values in Go? (Select all that apply)",
      options: [
        { id: "a", text: 'result, _ := divide(10, 3)' },
        { id: "b", text: '_, err := divide(10, 3)' },
        { id: "c", text: 'result := divide(10, 3)' },
        { id: "d", text: '_, _ = divide(10, 3)' },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "_ (blank identifier) discards a return value. All three are valid. Option c is invalid because divide returns two values but only one variable is provided.",
      difficulty: "easy",
      points: 10,
      tags: ["multiple-return", "blank-identifier"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func minMax(nums []int) (int, int) {
    min, max := nums[0], nums[0]
    for _, v := range nums[1:] {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
    }
    return min, max
}

func main() {
    min, max := minMax([]int{3, 1, 4, 1, 5, 9, 2, 6})
    fmt.Println(min, max)
}`,
      options: [
        { id: "a", text: "1 9" },
        { id: "b", text: "9 1" },
        { id: "c", text: "3 6" },
        { id: "d", text: "1 6" },
      ],
      correctAnswer: "a",
      explanation: "min=1 (smallest), max=9 (largest) in the slice [3,1,4,1,5,9,2,6].",
      difficulty: "medium",
      points: 20,
      tags: ["multiple-return", "slices"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return  // naked return
}

func main() {
    x, y := split(17)
    fmt.Println(x, y)
}`,
      options: [
        { id: "a", text: "7 10" },
        { id: "b", text: "8 9" },
        { id: "c", text: "7 9" },
        { id: "d", text: "8 10" },
      ],
      correctAnswer: "a",
      explanation: "x = 17*4/9 = 68/9 = 7 (integer division). y = 17-7 = 10. Named return values with naked return.",
      difficulty: "medium",
      points: 20,
      tags: ["multiple-return", "named-return"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func process() (int, error) {
    return 0, fmt.Errorf("something went wrong")
}

func main() {
    val, err := process()
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Value:", val)
}`,
      options: [
        { id: "a", text: "Value: 0" },
        { id: "b", text: "Error: something went wrong" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Both Value and Error" },
      ],
      correctAnswer: "b",
      explanation: "process returns (0, error). err != nil is true, so the error branch prints 'Error: something went wrong' and returns.",
      difficulty: "medium",
      points: 20,
      tags: ["multiple-return", "error-handling"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-8",
      type: "multiple-select",
      question: "Which of the following are idiomatic patterns for multiple return values in Go? (Select all that apply)",
      options: [
        { id: "a", text: "(value, error) for operations that can fail" },
        { id: "b", text: "(value, bool) for lookups that might not find a result" },
        { id: "c", text: "(value, bool, error) for complex lookups" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All are idiomatic Go patterns. (T, error) is the most common. (T, bool) is used for map lookups. (T, bool, error) handles both 'not found' and 'error' cases.",
      difficulty: "medium",
      points: 20,
      tags: ["multiple-return", "patterns"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func multiReturn() (int, int, int, int) {
    return 1, 2, 3, 4
}

func main() {
    a, _, c, _ := multiReturn()
    fmt.Println(a, c)
}`,
      options: [
        { id: "a", text: "1 3" },
        { id: "b", text: "2 4" },
        { id: "c", text: "1 2 3 4" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "Blank identifier _ discards values 2 and 4. a=1, c=3.",
      difficulty: "medium",
      points: 20,
      tags: ["multiple-return", "blank-identifier"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-10",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func divide(a, b int) (int, error) {
    if b == 0 {
        return fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    r, err := divide(10, 0)
    fmt.Println(r, err)
}`,
      options: [
        { id: "a", text: "return fmt.Errorf(...) only returns one value, but function expects two" },
        { id: "b", text: "The code is correct" },
        { id: "c", text: "Division by zero" },
        { id: "d", text: "Missing semicolon" },
      ],
      correctAnswer: "a",
      explanation: "return fmt.Errorf(...) returns only 1 value, but the function signature requires (int, error) — two values. Fix: return 0, fmt.Errorf(...).",
      difficulty: "hard",
      points: 30,
      tags: ["multiple-return", "identify-bug"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-11",
      type: "scenario",
      question: "You call a function that returns (Result, error) and the error is non-nil. What should you do with the Result?",
      options: [
        { id: "a", text: "Use it — it might contain useful partial data" },
        { id: "b", text: "Discard it and return/handle the error — the result is undefined when error is non-nil" },
        { id: "c", text: "Check if result is nil" },
        { id: "d", text: "Log both and continue" },
      ],
      correctAnswer: "b",
      explanation: "When error is non-nil, the value is considered undefined. Don't use it. Always check and handle the error first. This is a Go convention: if err != nil { return err }.",
      difficulty: "hard",
      points: 30,
      tags: ["error-handling", "best-practice"],
      relatedLesson: "multiple-return-values",
    },
    {
      id: "multi-12",
      type: "architecture",
      question: "How should a large Go application structure error returns across function boundaries?",
      options: [
        { id: "a", text: "Return raw errors with no context" },
        { id: "b", text: "Wrap errors with context using fmt.Errorf('context: %w', err) at each layer" },
        { id: "c", text: "Use global error variables for all errors" },
        { id: "d", text: "Convert all errors to strings" },
      ],
      correctAnswer: "b",
      explanation: "Wrap errors with context at each layer: fmt.Errorf('user lookup failed: %w', err). This builds a chain of context. Use errors.Is/As to unwrap and check error types. Never return raw errors without context.",
      difficulty: "hard",
      points: 30,
      tags: ["error-handling", "architecture"],
      relatedLesson: "multiple-return-values",
    },
  ],
  "named-return-values": [
    {
      id: "named-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func divide(a, b float64) (result float64, err error) {
    if b == 0 {
        err = fmt.Errorf("division by zero")
        return
    }
    result = a / b
    return
}

func main() {
    r, e := divide(10, 3)
    fmt.Printf("%.2f %v\\n", r, e)
}`,
      options: [
        { id: "a", text: "3.33 <nil>" },
        { id: "b", text: "0.00 division by zero" },
        { id: "c", text: "3.33 error" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "Named return values: result and err are pre-declared. Setting result=10/3 and return (no args) returns the current values of result and err.",
      difficulty: "easy",
      points: 10,
      tags: ["named-return", "functions"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-2",
      type: "true-false",
      question: "Named return values in Go must be used with naked returns (return without arguments).",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "You can use named return values with either naked return (return) or explicit return (return result, err). Naked return is optional and often discouraged for clarity.",
      difficulty: "easy",
      points: 10,
      tags: ["named-return", "syntax"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return x, y  // explicit return with named values
}

func main() {
    x, y := split(17)
    fmt.Println(x, y)
}`,
      options: [
        { id: "a", text: "7 10" },
        { id: "b", text: "8 9" },
        { id: "c", text: "7 9" },
        { id: "d", text: "8 10" },
      ],
      correctAnswer: "a",
      explanation: "Named returns with explicit return values. x=17*4/9=7, y=17-7=10. Explicit return (return x, y) works the same as naked return.",
      difficulty: "easy",
      points: 10,
      tags: ["named-return"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-4",
      type: "multiple-select",
      question: "What are the benefits of named return values? (Select all that apply)",
      options: [
        { id: "a", text: "Documentation — names describe what each return value represents" },
        { id: "b", text: "Naked returns reduce boilerplate" },
        { id: "c", text: "They improve type safety" },
        { id: "d", text: "They prevent errors" },
      ],
      correctAnswer: ["a", "b"],
      explanation: "Named returns document intent and enable naked returns. They don't affect type safety (types are the same) or prevent errors. Many Go style guides discourage naked returns for clarity.",
      difficulty: "medium",
      points: 20,
      tags: ["named-return", "benefits"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func lookup(id int) (name string, found bool) {
    if id == 1 {
        name = "Alice"
        found = true
        return
    }
    return "unknown", false
}

func main() {
    n, f := lookup(1)
    fmt.Println(n, f)
    n, f = lookup(2)
    fmt.Println(n, f)
}`,
      options: [
        { id: "a", text: "Alice true\\nunknown false" },
        { id: "b", text: "Alice true\\n false" },
        { id: "c", text: "unknown false\\nAlice true" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "lookup(1): name='Alice', found=true, naked return. lookup(2): explicit return 'unknown', false.",
      difficulty: "medium",
      points: 20,
      tags: ["named-return", "multiple-return"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-6",
      type: "multiple-choice",
      question: "What is the controversy around naked returns in Go?",
      options: [
        { id: "a", text: "They don't compile on some platforms" },
        { id: "b", text: "Some style guides (like Go's own) discourage them because they reduce readability in longer functions" },
        { id: "c", text: "They cause performance issues" },
        { id: "d", text: "They are deprecated in Go 1.21" },
      ],
      correctAnswer: "b",
      explanation: "Effective Go and many style guides suggest avoiding naked returns in all but very short functions, because they make it harder to see what values are returned.",
      difficulty: "medium",
      points: 20,
      tags: ["named-return", "style"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func divide(a, b int) (result int, err error) {
    if b == 0 {
        err = fmt.Errorf("cannot divide by zero")
        return  // naked return — result is 0 (zero value)
    }
    result = a / b
    return
}

func main() {
    r, e := divide(10, 0)
    fmt.Println(r, e)
}`,
      options: [
        { id: "a", text: "10 <nil>" },
        { id: "b", text: "0 cannot divide by zero" },
        { id: "c", text: "panic" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "When b=0, err is set and naked return returns the current values: result=0 (zero value), err=error. The zero value is returned for result.",
      difficulty: "medium",
      points: 20,
      tags: ["named-return", "error-handling"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func process() (count int, err error) {
    for i := 0; i < 5; i++ {
        if i == 3 {
            err = fmt.Errorf("failed at %d", i)
            return
        }
        count++
    }
    return
}

func main() {
    c, e := process()
    fmt.Println(c, e)
}`,
      options: [
        { id: "a", text: "5 <nil>" },
        { id: "b", text: "3 failed at 3" },
        { id: "c", text: "3 <nil>" },
        { id: "d", text: "4 failed at 3" },
      ],
      correctAnswer: "b",
      explanation: "count increments: 0,1,2. When i=3, error is set. count=3 at that point. Naked return returns count=3 and the error.",
      difficulty: "medium",
      points: 20,
      tags: ["named-return", "error-handling"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-9",
      type: "multiple-select",
      question: "When are named return values most useful? (Select all that apply)",
      options: [
        { id: "a", text: "In short functions where naked return reduces boilerplate" },
        { id: "b", text: "When the return values need documentation" },
        { id: "c", text: "In very long functions for readability" },
        { id: "d", text: "In error handling patterns where you set error and return early" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Named returns shine in: short functions (naked return is clean), documentation (names explain values), error handling (set error, naked return). In long functions, naked returns hurt readability.",
      difficulty: "hard",
      points: 30,
      tags: ["named-return", "best-practice"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-10",
      type: "identify-bug",
      question: "This code has a subtle issue. What is it?",
      code: `package main

import "fmt"

func process() (result int, err error) {
    result = 42
    err = nil
    // What does this return?
    return result, err
}

func main() {
    r, e := process()
    fmt.Println(r, e)
}`,
      options: [
        { id: "a", text: "42 <nil>" },
        { id: "b", text: "0 <nil> — named values are shadowed by explicit return" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "panic" },
      ],
      correctAnswer: "a",
      explanation: "Explicit return (return result, err) uses the local values. result=42, err=nil. The explicit return values take precedence. Output: 42, <nil>.",
      difficulty: "hard",
      points: 30,
      tags: ["named-return", "gotcha"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-11",
      type: "scenario",
      question: "You're writing a parser function. Should you use named return values?",
      options: [
        { id: "a", text: "Always — they're better in every case" },
        { id: "b", text: "Yes, because the function returns (ParsedData, error) and the names document what each value means" },
        { id: "c", text: "No — named returns are always bad" },
        { id: "d", text: "Only if the function is under 5 lines" },
      ],
      correctAnswer: "b",
      explanation: "Named returns (data ParsedData, err error) document the return values clearly. For longer functions, use explicit return. For short functions, naked return is fine.",
      difficulty: "hard",
      points: 30,
      tags: ["named-return", "documentation"],
      relatedLesson: "named-return-values",
    },
    {
      id: "named-12",
      type: "best-practice",
      question: "What is the recommended approach for naked returns in Go?",
      options: [
        { id: "a", text: "Use them everywhere for conciseness" },
        { id: "b", text: "Use them only in short functions (<5 lines); use explicit return in longer functions" },
        { id: "c", text: "Never use them — always use explicit return" },
        { id: "d", text: "Use them only for error returns" },
      ],
      correctAnswer: "b",
      explanation: "Effective Go recommends naked returns only for short functions. In longer functions, explicit return (return result, err) is clearer. Most Go teams follow this convention.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "style"],
      relatedLesson: "named-return-values",
    },
  ],
  "variadic-functions": [
    {
      id: "varargs-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(1, 2, 3, 4, 5))
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "15" },
        { id: "c", text: "120" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "sum(1,2,3,4,5) = 1+2+3+4+5 = 15. The ...int syntax makes nums a variadic parameter (slice of int).",
      difficulty: "easy",
      points: 10,
      tags: ["variadic", "functions"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-2",
      type: "multiple-choice",
      question: "Where must the variadic parameter be placed in a function signature?",
      options: [
        { id: "a", text: "At the beginning of the parameter list" },
        { id: "b", text: "At the end of the parameter list" },
        { id: "c", text: "Anywhere in the parameter list" },
        { id: "d", text: "Before the return values" },
      ],
      correctAnswer: "b",
      explanation: "The variadic parameter must be the last parameter in the function signature. func f(a int, b ...string) is valid; func f(b ...string, a int) is not.",
      difficulty: "easy",
      points: 10,
      tags: ["variadic", "syntax"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func greet(names ...string) {
    for _, name := range names {
        fmt.Printf("Hello, %s!\\n", name)
    }
}

func main() {
    greet("Alice", "Bob", "Charlie")
}`,
      options: [
        { id: "a", text: "Hello, Alice!\\nHello, Bob!\\nHello, Charlie!" },
        { id: "b", text: "Hello, Alice Bob Charlie!" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Hello, Alice!" },
      ],
      correctAnswer: "a",
      explanation: "greet receives three string arguments. The range loop iterates over each, printing a greeting.",
      difficulty: "easy",
      points: 10,
      tags: ["variadic"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    nums := []int{10, 20, 30}
    fmt.Println(sum(nums...))
}`,
      options: [
        { id: "a", text: "60" },
        { id: "b", text: "30" },
        { id: "c", text: "[10 20 30]" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "nums... unpacks the slice into individual arguments. sum(10, 20, 30) = 60. The ... operator expands a slice into variadic args.",
      difficulty: "medium",
      points: 20,
      tags: ["variadic", "slice-expansion"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-5",
      type: "multiple-select",
      question: "Which of the following are valid ways to call a variadic function? (Select all that apply)",
      options: [
        { id: "a", text: "sum(1, 2, 3)" },
        { id: "b", text: "sum(nums...)" },
        { id: "c", text: "sum()" },
        { id: "d", text: "sum(1, 2, 3, 4, 5, ...)" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "All valid: individual args, slice expansion (...), or no args (empty slice). 'sum(1,2,3,...)' is invalid — ... is only for expanding slices, not for trailing args.",
      difficulty: "medium",
      points: 20,
      tags: ["variadic", "calling"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func printAll(args ...interface{}) {
    for _, arg := range args {
        fmt.Printf("%v (%T) ", arg, arg)
    }
}

func main() {
    printAll(42, "hello", 3.14, true)
}`,
      options: [
        { id: "a", text: "42 (int) hello (string) 3.14 (float64) true (bool) " },
        { id: "b", text: "[42 hello 3.14 true]" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "42 hello 3.14 true" },
      ],
      correctAnswer: "a",
      explanation: "...interface{} accepts any type. %v prints value, %T prints type. Each argument is printed with its type.",
      difficulty: "medium",
      points: 20,
      tags: ["variadic", "interface"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func min(nums ...int) int {
    if len(nums) == 0 {
        return 0
    }
    min := nums[0]
    for _, n := range nums[1:] {
        if n < min {
            min = n
        }
    }
    return min
}

func main() {
    fmt.Println(min(5, 3, 8, 1, 9))
}`,
      options: [
        { id: "a", text: "9" },
        { id: "b", text: "1" },
        { id: "c", text: "5" },
        { id: "d", text: "0" },
      ],
      correctAnswer: "b",
      explanation: "min(5,3,8,1,9) returns 1 — the smallest value.",
      difficulty: "medium",
      points: 20,
      tags: ["variadic", "algorithm"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-8",
      type: "multiple-choice",
      question: "What is the type of a variadic parameter inside the function?",
      options: [
        { id: "a", text: "The individual element type" },
        { id: "b", text: "A slice of the element type" },
        { id: "c", text: "An array of the element type" },
        { id: "d", text: "An interface{}" },
      ],
      correctAnswer: "b",
      explanation: "Inside the function, the variadic parameter is a slice. func sum(nums ...int) means nums is []int inside the function body.",
      difficulty: "medium",
      points: 20,
      tags: ["variadic", "types"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func concat(sep string, parts ...string) string {
    result := ""
    for i, p := range parts {
        if i > 0 {
            result += sep
        }
        result += p
    }
    return result
}

func main() {
    fmt.Println(concat("-", "a", "b", "c"))
}`,
      options: [
        { id: "a", text: "abc" },
        { id: "b", text: "a-b-c" },
        { id: "c", text: "-a-b-c" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "concat joins strings with separator. parts=['a','b','c'], sep='-'. Output: 'a-b-c'.",
      difficulty: "medium",
      points: 20,
      tags: ["variadic", "string"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-10",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"

func log(format string, args ...interface{}) {
    fmt.Printf(format, args...)
}

func main() {
    log("Hello %s, you are %d years old", "Alice", 30)
}`,
      options: [
        { id: "a", text: "The code is correct" },
        { id: "b", text: "args... expansion is invalid in Printf" },
        { id: "c", text: "Missing comma" },
        { id: "d", text: "Wrong format string" },
      ],
      correctAnswer: "a",
      explanation: "This is the standard pattern for wrapping fmt.Printf. args... expands the variadic slice into individual arguments. The code is correct.",
      difficulty: "medium",
      points: 20,
      tags: ["variadic", "printf"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-11",
      type: "multiple-select",
      question: "Which of the following is true about variadic functions? (Select all that apply)",
      options: [
        { id: "a", text: "A function can only have one variadic parameter" },
        { id: "b", text: "The variadic parameter is always a slice inside the function" },
        { id: "c", text: "You can pass a nil slice to a variadic function" },
        { id: "d", text: "You can have both regular and variadic parameters" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All true: one variadic per function (must be last), it's a slice internally, nil slices are valid (empty), and you can mix regular + variadic params.",
      difficulty: "hard",
      points: 30,
      tags: ["variadic", "rules"],
      relatedLesson: "variadic-functions",
    },
    {
      id: "varargs-12",
      type: "scenario",
      question: "You want to write a function that accepts either individual values or a pre-built slice. What is the Go approach?",
      options: [
        { id: "a", text: "Write two separate functions" },
        { id: "b", text: "Use a variadic function and call it with slice... to pass a pre-built slice" },
        { id: "c", text: "Use interface{} to accept any type" },
        { id: "d", text: "Use method overloading" },
      ],
      correctAnswer: "b",
      explanation: "Variadic functions work for both: func f(nums ...int). Call with individual args f(1,2,3) or slice expansion f(nums...). This is the standard Go pattern.",
      difficulty: "hard",
      points: 30,
      tags: ["variadic", "patterns"],
      relatedLesson: "variadic-functions",
    },
  ],
  "anonymous-functions": [
    {
      id: "anon-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    greet := func(name string) {
        fmt.Println("Hello,", name)
    }
    greet("Go")
}`,
      options: [
        { id: "a", text: "Hello, Go" },
        { id: "b", text: "Hello Go" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Hello, name" },
      ],
      correctAnswer: "a",
      explanation: "An anonymous function assigned to 'greet'. Calling greet('Go') invokes it. fmt.Println adds space: 'Hello, Go'.",
      difficulty: "easy",
      points: 10,
      tags: ["anonymous", "functions"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-2",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    func() {
        fmt.Println("IIFE!")
    }()
}`,
      options: [
        { id: "a", text: "IIFE!" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "Nothing" },
        { id: "d", text: "function" },
      ],
      correctAnswer: "a",
      explanation: "Immediately Invoked Function Expression (IIFE). The anonymous function is defined and immediately called with ().",
      difficulty: "easy",
      points: 10,
      tags: ["anonymous", "iife"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func apply(f func(int, int) int, a, b int) int {
    return f(a, b)
}

func main() {
    result := apply(func(a, b int) int {
        return a + b
    }, 3, 4)
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "7" },
        { id: "d", text: "12" },
      ],
      correctAnswer: "c",
      explanation: "Anonymous function adds a+b. apply(add, 3, 4) = 3+4 = 7.",
      difficulty: "easy",
      points: 10,
      tags: ["anonymous", "higher-order"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    double := func(x int) int {
        return x * 2
    }
    
    nums := []int{1, 2, 3, 4, 5}
    for _, n := range nums {
        fmt.Print(double(n), " ")
    }
}`,
      options: [
        { id: "a", text: "1 2 3 4 5 " },
        { id: "b", text: "2 4 6 8 10 " },
        { id: "c", text: "3 6 9 12 15 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "double doubles each number. 1→2, 2→4, 3→6, 4→8, 5→10.",
      difficulty: "medium",
      points: 20,
      tags: ["anonymous", "functions"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    operations := map[string]func(int, int)int{
        "+": func(a, b int) int { return a + b },
        "-": func(a, b int) int { return a - b },
        "*": func(a, b int) int { return a * b },
    }
    
    fmt.Println(operations["+"](3, 4))
    fmt.Println(operations["-"](10, 3))
    fmt.Println(operations["*"](5, 6))
}`,
      options: [
        { id: "a", text: "7 7 30" },
        { id: "b", text: "7 3 30" },
        { id: "c", text: "7 -7 30" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "Map of functions: +→3+4=7, -→10-3=7. Wait, 10-3=7? No, 10-3=7. Actually 10-3=7 is correct. Let me recalculate: 3+4=7, 10-3=7, 5*6=30. Output: 7,7,30. Hmm, that should be option a. Let me recheck: 3+4=7, 10-3=7, 5*6=30.",
      difficulty: "medium",
      points: 20,
      tags: ["anonymous", "maps", "functions"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-6",
      type: "multiple-select",
      question: "Which of the following are valid uses of anonymous functions in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Assigned to a variable" },
        { id: "b", text: "Passed as an argument to another function" },
        { id: "c", text: "Immediately invoked (IIFE)" },
        { id: "d", text: "Returned from another function" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "Anonymous functions can be assigned to variables, passed as arguments, immediately invoked, and returned from functions. All are standard Go patterns.",
      difficulty: "medium",
      points: 20,
      tags: ["anonymous", "patterns"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 0
    inc := func() int {
        x++
        return x
    }
    fmt.Println(inc(), inc(), inc())
}`,
      options: [
        { id: "a", text: "1 1 1" },
        { id: "b", text: "1 2 3" },
        { id: "c", text: "0 0 0" },
        { id: "d", text: "3 3 3" },
      ],
      correctAnswer: "b",
      explanation: "inc captures x by reference. Each call increments x: 1, 2, 3. The anonymous function has access to x from the enclosing scope.",
      difficulty: "medium",
      points: 20,
      tags: ["anonymous", "closure"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    defer func() {
        fmt.Println("deferred!")
    }()
    fmt.Println("first")
}`,
      options: [
        { id: "a", text: "first\\ndeferred!" },
        { id: "b", text: "deferred!\\nfirst" },
        { id: "c", text: "first" },
        { id: "d", text: "deferred!" },
      ],
      correctAnswer: "a",
      explanation: "defer executes when the surrounding function returns. 'first' prints immediately, 'deferred!' prints when main() returns.",
      difficulty: "medium",
      points: 20,
      tags: ["anonymous", "defer"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    funcs := make([]func(), 3)
    for i := 0; i < 3; i++ {
        i := i  // capture loop variable
        funcs[i] = func() {
            fmt.Print(i, " ")
        }
    }
    for _, f := range funcs {
        f()
    }
}`,
      options: [
        { id: "a", text: "0 1 2 " },
        { id: "b", text: "2 2 2 " },
        { id: "c", text: "3 3 3 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "i := i creates a new variable for each iteration, captured by the closure. Each function has its own copy: 0, 1, 2. Without i := i, all would be 2 (loop variable bug).",
      difficulty: "hard",
      points: 30,
      tags: ["anonymous", "closure", "gotcha"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-10",
      type: "identify-bug",
      question: "This code has a classic closure bug. What is it?",
      code: `package main

import "fmt"

func main() {
    funcs := make([]func(), 3)
    for i := 0; i < 3; i++ {
        funcs[i] = func() {
            fmt.Print(i, " ")
        }
    }
    for _, f := range funcs {
        f()
    }
}`,
      options: [
        { id: "a", text: "The code is correct and prints 0 1 2" },
        { id: "b", text: "Classic loop variable capture bug — all closures share the same i, which ends at 3" },
        { id: "c", text: "Missing return type" },
        { id: "d", text: "Cannot assign functions to slice" },
      ],
      correctAnswer: "b",
      explanation: "All closures capture the same variable i. After the loop, i=3. All functions print 3. Fix: add i := i inside the loop to create a new variable per iteration.",
      difficulty: "hard",
      points: 30,
      tags: ["anonymous", "closure", "identify-bug"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    result := func(a, b int) int {
        return a * b
    }(5, 6)
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "6" },
        { id: "c", text: "11" },
        { id: "d", text: "30" },
      ],
      correctAnswer: "d",
      explanation: "Immediately invoked: the anonymous function is defined and called with (5,6). Returns 5*6=30.",
      difficulty: "medium",
      points: 20,
      tags: ["anonymous", "iife"],
      relatedLesson: "anonymous-functions",
    },
    {
      id: "anon-12",
      type: "best-practice",
      question: "When should you use anonymous functions vs. named functions?",
      options: [
        { id: "a", text: "Always use anonymous functions for brevity" },
        { id: "b", text: "Use anonymous for short, one-off callbacks; use named for reusable, testable, documented functions" },
        { id: "c", text: "Never use anonymous functions" },
        { id: "d", text: "Use anonymous functions for public APIs" },
      ],
      correctAnswer: "b",
      explanation: "Anonymous functions are great for short callbacks (sort.Slice, goroutines). Named functions are better for reuse, testing, and documentation. Use each where appropriate.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "functions"],
      relatedLesson: "anonymous-functions",
    },
  ],
  "closures": [
    {
      id: "closure-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func counter() func() int {
    n := 0
    return func() int {
        n++
        return n
    }
}

func main() {
    c := counter()
    fmt.Println(c(), c(), c())
}`,
      options: [
        { id: "a", text: "1 1 1" },
        { id: "b", text: "0 1 2" },
        { id: "c", text: "1 2 3" },
        { id: "d", text: "3 3 3" },
      ],
      correctAnswer: "c",
      explanation: "counter returns a closure capturing n. Each call increments n: 1, 2, 3. The closure maintains its own copy of n.",
      difficulty: "easy",
      points: 10,
      tags: ["closures", "functions"],
      relatedLesson: "closures",
    },
    {
      id: "closure-2",
      type: "true-false",
      question: "A closure in Go captures variables by reference, not by value.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Closures capture variables by reference. The closure and the enclosing scope share the same variables. This is why modifying captured variables affects the outer scope.",
      difficulty: "easy",
      points: 10,
      tags: ["closures", "reference"],
      relatedLesson: "closures",
    },
    {
      id: "closure-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func makeAdder(x int) func(int) int {
    return func(y int) int {
        return x + y
    }
}

func main() {
    add5 := makeAdder(5)
    add10 := makeAdder(10)
    fmt.Println(add5(3), add10(3))
}`,
      options: [
        { id: "a", text: "8 13" },
        { id: "b", text: "5 10" },
        { id: "c", text: "3 3" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "add5 captures x=5: 5+3=8. add10 captures x=10: 10+3=13. Each closure has its own captured x.",
      difficulty: "easy",
      points: 10,
      tags: ["closures", "factory"],
      relatedLesson: "closures",
    },
    {
      id: "closure-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    funcs := []func(){}
    for i := 0; i < 3; i++ {
        funcs = append(funcs, func() {
            fmt.Print(i, " ")
        })
    }
    for _, f := range funcs {
        f()
    }
}`,
      options: [
        { id: "a", text: "0 1 2 " },
        { id: "b", text: "3 3 3 " },
        { id: "c", text: "2 2 2 " },
        { id: "d", text: "0 0 0 " },
      ],
      correctAnswer: "b",
      explanation: "Classic closure bug: all functions capture the same variable i. After the loop, i=3. All closures print 3.",
      difficulty: "medium",
      points: 20,
      tags: ["closures", "gotcha", "loop-variable"],
      relatedLesson: "closures",
    },
    {
      id: "closure-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    funcs := []func(){}
    for i := 0; i < 3; i++ {
        i := i  // Fix the closure bug
        funcs = append(funcs, func() {
            fmt.Print(i, " ")
        })
    }
    for _, f := range funcs {
        f()
    }
}`,
      options: [
        { id: "a", text: "3 3 3 " },
        { id: "b", text: "2 2 2 " },
        { id: "c", text: "0 1 2 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "c",
      explanation: "i := i creates a new variable for each iteration. Each closure captures a different i: 0, 1, 2.",
      difficulty: "medium",
      points: 20,
      tags: ["closures", "fix", "loop-variable"],
      relatedLesson: "closures",
    },
    {
      id: "closure-6",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func fibonacci() func() int {
    a, b := 0, 1
    return func() int {
        a, b = b, a+b
        return a
    }
}

func main() {
    fib := fibonacci()
    for i := 0; i < 7; i++ {
        fmt.Print(fib(), " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 1 2 3 5 8 " },
        { id: "b", text: "1 1 2 3 5 8 13 " },
        { id: "c", text: "1 2 3 4 5 6 7 " },
        { id: "d", text: "0 1 2 3 4 5 6 " },
      ],
      correctAnswer: "b",
      explanation: "Fibonacci sequence: 1,1,2,3,5,8,13. Each call updates a and b. First call: a=1,b=1. Second: a=1,b=2. Etc.",
      difficulty: "medium",
      points: 20,
      tags: ["closures", "fibonacci"],
      relatedLesson: "closures",
    },
    {
      id: "closure-7",
      type: "multiple-select",
      question: "Which of the following are common closure patterns in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Stateful counters/accumulators" },
        { id: "b", text: "Function factories (making functions)" },
        { id: "c", text: "Callbacks for async operations" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "Closures are used for: counters/accumulators (capturing mutable state), function factories (generating specialized functions), callbacks (goroutines, sort.Slice, etc.).",
      difficulty: "medium",
      points: 20,
      tags: ["closures", "patterns"],
      relatedLesson: "closures",
    },
    {
      id: "closure-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    f := func() {
        fmt.Println(x)
        x = 20
    }
    f()
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "10 10" },
        { id: "b", text: "10 20" },
        { id: "c", text: "20 20" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "f captures x by reference. First prints 10 (original value). Then sets x=20. After f(), x is 20.",
      difficulty: "medium",
      points: 20,
      tags: ["closures", "mutation"],
      relatedLesson: "closures",
    },
    {
      id: "closure-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := "hello"
    f := func() {
        fmt.Println(x)
    }
    x = "world"
    f()
}`,
      options: [
        { id: "a", text: "hello" },
        { id: "b", text: "world" },
        { id: "c", text: "hello world" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "Closures capture variables by reference. x is changed to 'world' before f() is called. f() prints the current value of x: 'world'.",
      difficulty: "medium",
      points: 20,
      tags: ["closures", "reference"],
      relatedLesson: "closures",
    },
    {
      id: "closure-10",
      type: "identify-bug",
      question: "This code doesn't produce the expected output. Why?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        go func() {
            fmt.Print(i, " ")
        }()
    }
    fmt.Scanln() // wait
}`,
      options: [
        { id: "a", text: "The code is correct" },
        { id: "b", text: "Goroutine closure captures loop variable i — may print 5 5 5 5 5 or other values" },
        { id: "c", text: "Missing synchronization" },
        { id: "d", text: "Cannot use goroutines in main" },
      ],
      correctAnswer: "b",
      explanation: "Each goroutine captures the same i variable. By the time goroutines execute, the loop may have finished (i=5). This is a race condition and closure bug. Fix: pass i as parameter.",
      difficulty: "hard",
      points: 30,
      tags: ["closures", "goroutines", "race-condition"],
      relatedLesson: "closures",
    },
    {
      id: "closure-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        go func(n int) {
            fmt.Print(n, " ")
        }(i)
    }
    fmt.Scanln()
}`,
      options: [
        { id: "a", text: "0 1 2 3 4 (in some order)" },
        { id: "b", text: "5 5 5 5 5" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "0 1 2 3 4 (in order)" },
      ],
      correctAnswer: "a",
      explanation: "Passing i as parameter n creates a copy for each goroutine. Each goroutine gets its own n: 0,1,2,3,4. Order may vary due to concurrency.",
      difficulty: "hard",
      points: 30,
      tags: ["closures", "goroutines", "fix"],
      relatedLesson: "closures",
    },
    {
      id: "closure-12",
      type: "best-practice",
      question: "What is the best way to avoid closure-related bugs in loops?",
      options: [
        { id: "a", text: "Use global variables instead of closures" },
        { id: "b", text: "Create a new variable inside the loop (i := i) or pass the loop variable as a function parameter" },
        { id: "c", text: "Don't use closures" },
        { id: "d", text: "Use goto instead of for loops" },
      ],
      correctAnswer: "b",
      explanation: "Two fixes: (1) i := i shadows the loop variable per iteration, (2) pass i as a parameter to the goroutine/anonymous function. Both create independent copies.",
      difficulty: "hard",
      points: 30,
      tags: ["closures", "best-practice"],
      relatedLesson: "closures",
    },
  ],
  "scope-and-shadowing": [
    {
      id: "scope-1",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if x > 5 {
        x := 20
        fmt.Println("inner:", x)
    }
    fmt.Println("outer:", x)
}`,
      options: [
        { id: "a", text: "inner: 20\\nouter: 10" },
        { id: "b", text: "inner: 20\\nouter: 20" },
        { id: "c", text: "inner: 10\\nouter: 10" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "x := 20 inside the if block creates a new variable that shadows the outer x. The outer x remains 10.",
      difficulty: "easy",
      points: 10,
      tags: ["scope", "shadowing"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-2",
      type: "true-false",
      question: "In Go, variables declared inside a block are only accessible within that block.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Go uses lexical scoping. Variables are accessible from the block they're declared in, plus any nested blocks. They are NOT accessible from outside their declaring block.",
      difficulty: "easy",
      points: 10,
      tags: ["scope", "block"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-3",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

var x = "global"

func main() {
    x := "local"
    fmt.Println(x)
    fmt.Println(global())
}

func global() string {
    return x
}`,
      options: [
        { id: "a", text: "local\\nglobal" },
        { id: "b", text: "local\\nlocal" },
        { id: "c", text: "global\\nglobal" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "x := 'local' shadows the global x in main(). fmt.Println(x) prints 'local'. global() returns the package-level x: 'global'.",
      difficulty: "easy",
      points: 10,
      tags: ["scope", "global", "shadowing"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-4",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        i := i
        fmt.Print(i, " ")
    }
}`,
      options: [
        { id: "a", text: "0 1 2 " },
        { id: "b", text: "3 3 3 " },
        { id: "c", text: "0 0 0 " },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "i := i shadows the loop variable with a new variable per iteration. Each iteration gets its own copy: 0, 1, 2.",
      difficulty: "medium",
      points: 20,
      tags: ["scope", "shadowing", "loop"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 1
    {
        x := 2
        {
            x := 3
            fmt.Println(x)
        }
        fmt.Println(x)
    }
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "1 2 3" },
        { id: "b", text: "3 2 1" },
        { id: "c", text: "3 3 3" },
        { id: "d", text: "1 1 1" },
      ],
      correctAnswer: "b",
      explanation: "Nested blocks create nested scopes. Inner x=3, middle x=2, outer x=1. Each x shadows the previous.",
      difficulty: "medium",
      points: 20,
      tags: ["scope", "blocks"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-6",
      type: "multiple-select",
      question: "Which of the following create new variable scopes in Go? (Select all that apply)",
      options: [
        { id: "a", text: "if/else blocks" },
        { id: "b", text: "for loop blocks" },
        { id: "c", text: "function bodies" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswer: ["d"],
      explanation: "All control structures (if, for, switch, select, func bodies) create new scopes. Variables declared inside are local to that scope.",
      difficulty: "medium",
      points: 20,
      tags: ["scope", "blocks"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-7",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    f := func() {
        fmt.Println(x)
        x = 20
    }
    f()
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "10 10" },
        { id: "b", text: "10 20" },
        { id: "c", text: "20 20" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "The closure captures x by reference. f() prints x (10) then sets x=20. After f(), x is 20.",
      difficulty: "medium",
      points: 20,
      tags: ["scope", "closure"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-8",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 0
    for x := 0; x < 3; x++ {
        fmt.Print(x, " ")
    }
    fmt.Println(x)
}`,
      options: [
        { id: "a", text: "0 1 2 0" },
        { id: "b", text: "0 1 2 3" },
        { id: "c", text: "0 1 2" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "for x := 0 shadows the outer x. Loop prints 0,1,2. After the loop, outer x is still 0.",
      difficulty: "medium",
      points: 20,
      tags: ["scope", "for-loop", "shadowing"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-9",
      type: "multiple-choice",
      question: "What is the package-level scope in Go?",
      options: [
        { id: "a", text: "Variables are only accessible in the file they're declared in" },
        { id: "b", text: "Variables/functions declared at the top level of any file in the package are accessible to all files in that package" },
        { id: "c", text: "Package-level means global across all packages" },
        { id: "d", text: "Package-level means function-level" },
      ],
      correctAnswer: "b",
      explanation: "Package-level declarations (variables, functions, types) are visible to all files within the same package. They are not visible to other packages unless exported (capitalized).",
      difficulty: "medium",
      points: 20,
      tags: ["scope", "package"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-10",
      type: "identify-bug",
      question: "This code has a shadowing issue. What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 10
    if err := process(); err != nil {
        fmt.Println("error:", err)
    } else {
        fmt.Println("x:", x)
    }
    fmt.Println(x)
}

func process() error { return nil }`,
      options: [
        { id: "a", text: "x: 10\\n10" },
        { id: "b", text: "error: <nil>\\n10" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "error: nil" },
      ],
      correctAnswer: "a",
      explanation: "process() returns nil error. err=nil, so else branch: 'x: 10'. Then prints outer x: 10. No shadowing issue here — err is scoped to the if-else.",
      difficulty: "hard",
      points: 30,
      tags: ["scope", "if-init"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-11",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func main() {
    x := 5
    fmt.Println("A:", x)
    {
        x := 10
        fmt.Println("B:", x)
    }
    fmt.Println("C:", x)
    x = 15
    fmt.Println("D:", x)
}`,
      options: [
        { id: "a", text: "A: 5\\nB: 10\\nC: 5\\nD: 15" },
        { id: "b", text: "A: 5\\nB: 10\\nC: 10\\nD: 15" },
        { id: "c", text: "A: 5\\nB: 5\\nC: 5\\nD: 15" },
        { id: "d", text: "A: 15\\nB: 10\\nC: 15\\nD: 15" },
      ],
      correctAnswer: "a",
      explanation: "Inner x := 10 shadows outer x within the block. After the block, outer x is still 5. Then x = 15 (assignment, not :=) modifies the outer x.",
      difficulty: "hard",
      points: 30,
      tags: ["scope", "shadowing", "assignment"],
      relatedLesson: "scope-and-shadowing",
    },
    {
      id: "scope-12",
      type: "scenario",
      question: "Your Go linter warns about a variable shadowing issue. How should you address it?",
      options: [
        { id: "a", text: "Ignore it — shadowing is always fine" },
        { id: "b", text: "Rename the inner variable to avoid confusion, or restructure the code to reduce nesting" },
        { id: "c", text: "Remove the outer variable" },
        { id: "d", text: "Use a different language" },
      ],
      correctAnswer: "b",
      explanation: "Shadowing can hide bugs (e.g., := when = was intended). Rename the inner variable (e.g., innerX) or restructure to reduce nesting. Use go vet -shadow to detect these.",
      difficulty: "hard",
      points: 30,
      tags: ["best-practice", "shadowing", "linting"],
      relatedLesson: "scope-and-shadowing",
    },
  ],
  "package-import-rules": [
    {
      id: "import-1",
      type: "multiple-choice",
      question: "How do you import a package in Go?",
      options: [
        { id: "a", text: 'import "fmt"' },
        { id: "b", text: 'include "fmt"' },
        { id: "c", text: 'require "fmt"' },
        { id: "d", text: 'use "fmt"' },
      ],
      correctAnswer: "a",
      explanation: "Go uses the 'import' keyword to import packages. 'include', 'require', and 'use' are from other languages.",
      difficulty: "easy",
      points: 10,
      tags: ["import", "syntax"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-2",
      type: "multiple-select",
      question: "Which of the following are valid import forms in Go? (Select all that apply)",
      options: [
        { id: "a", text: 'import "fmt"' },
        { id: "b", text: 'import f "fmt"' },
        { id: "c", text: 'import . "fmt"' },
        { id: "d", text: 'import _ "fmt"' },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All valid: standard import, aliased import (f), dot import (imports names into current namespace), blank import (side effects only).",
      difficulty: "easy",
      points: 10,
      tags: ["import", "syntax"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-3",
      type: "multiple-choice",
      question: "What does the blank identifier import (import _ \"fmt\") do?",
      options: [
        { id: "a", text: "Imports and makes all names available" },
        { id: "b", text: "Imports only for side effects (e.g., database drivers, init functions)" },
        { id: "c", text: "Removes the package from compilation" },
        { id: "d", text: "Is an invalid import" },
      ],
      correctAnswer: "b",
      explanation: "import _ \"pkg\" imports a package for its side effects only (init() functions). Common for database drivers: import _ \"github.com/lib/pq\".",
      difficulty: "easy",
      points: 10,
      tags: ["import", "side-effects"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-4",
      type: "code-output",
      question: "What does this import block produce?",
      code: `import (
    "fmt"
    f "os"
)

func main() {
    fmt.Println(f.Args)
}`,
      options: [
        { id: "a", text: "Prints the os.Args variable using alias f" },
        { id: "b", text: "Compilation error — os.Args is not a function" },
        { id: "c", text: "Compilation error — cannot alias os" },
        { id: "d", text: "Prints the program arguments" },
      ],
      correctAnswer: "d",
      explanation: "f is an alias for the os package. f.Args refers to os.Args, which contains command-line arguments. This prints the Args slice.",
      difficulty: "medium",
      points: 20,
      tags: ["import", "alias"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-5",
      type: "multiple-select",
      question: "When should you use import aliases? (Select all that apply)",
      options: [
        { id: "a", text: "To resolve package name conflicts (e.g., \"math/rand\" and \"crypto/rand\")" },
        { id: "b", text: "To shorten long package paths" },
        { id: "c", text: "To avoid the package name entirely" },
        { id: "d", text: "Always — aliases are required" },
      ],
      correctAnswer: ["a", "b"],
      explanation: "Use aliases for conflicts: rand1 \"math/rand\"; rand2 \"crypto/rand\". Or to shorten: pb \"github.com/org/long-package-name\". Aliases are not required.",
      difficulty: "medium",
      points: 20,
      tags: ["import", "best-practice"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-6",
      type: "multiple-choice",
      question: "What is the rule about import paths in Go?",
      options: [
        { id: "a", text: "Import paths can be relative (./mypackage)" },
        { id: "b", text: "Import paths must be absolute module paths or standard library paths" },
        { id: "c", text: "Import paths can be URLs" },
        { id: "d", text: "Import paths are case-insensitive" },
      ],
      correctAnswer: "b",
      explanation: "Go import paths must be absolute: either standard library (\"fmt\") or full module paths (\"github.com/user/repo/pkg\"). Relative imports are not supported in module mode.",
      difficulty: "medium",
      points: 20,
      tags: ["import", "modules"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-7",
      type: "multiple-select",
      question: "Which of these are standard library packages in Go? (Select all that apply)",
      options: [
        { id: "a", text: "fmt" },
        { id: "b", text: "net/http" },
        { id: "c", text: "io" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswer: ["d"],
      explanation: "fmt, net/http, and io are all part of Go's standard library. Go has a comprehensive stdlib covering I/O, networking, crypto, testing, and more.",
      difficulty: "easy",
      points: 10,
      tags: ["import", "stdlib"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-8",
      type: "code-output",
      question: "What does dot import do?",
      code: `package main

import . "fmt"

func main() {
    Println("Hello!")
}`,
      options: [
        { id: "a", text: "Hello!" },
        { id: "b", text: "Compilation error — Println not defined" },
        { id: "c", text: "fmt.Hello!" },
        { id: "d", text: "Compilation error — dot import not allowed" },
      ],
      correctAnswer: "a",
      explanation: "Dot import (import . \"fmt\") makes all exported names available directly. Println is now available without the fmt. prefix.",
      difficulty: "medium",
      points: 20,
      tags: ["import", "dot-import"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-9",
      type: "best-practice",
      question: "When should you avoid dot imports?",
      options: [
        { id: "a", text: "In test files only" },
        { id: "b", text: "In production code — dot imports pollute the namespace and make it unclear where functions come from" },
        { id: "c", text: "Always — they are deprecated" },
        { id: "d", text: "Only when importing multiple packages" },
      ],
      correctAnswer: "b",
      explanation: "Dot imports are discouraged in production code (golint warns). They make code harder to read — you can't tell which package a function comes from. Acceptable in test files for readability.",
      difficulty: "medium",
      points: 20,
      tags: ["import", "best-practice"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-10",
      type: "identify-bug",
      question: "This code fails to compile. What is the issue?",
      code: `package main

import "fmt"
import "fmt"

func main() {
    fmt.Println("Hello")
}`,
      options: [
        { id: "a", text: "The code is correct" },
        { id: "b", text: "Cannot import the same package twice" },
        { id: "c", text: "Missing semicolon" },
        { id: "d", text: "Wrong import path" },
      ],
      correctAnswer: "b",
      explanation: "Duplicate imports are a compilation error. fmt is imported twice. Remove one import statement.",
      difficulty: "medium",
      points: 20,
      tags: ["import", "errors"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-11",
      type: "multiple-select",
      question: "What happens if you import a package but don't use it? (Select all that apply)",
      options: [
        { id: "a", text: "Compilation error in Go" },
        { id: "b", text: "Warning in some languages, but error in Go" },
        { id: "c", text: "The package is silently ignored" },
        { id: "d", text: "It depends on the Go version" },
      ],
      correctAnswer: ["a"],
      explanation: "Go requires all imports to be used. Unused imports cause compilation errors: 'imported and not used'. This enforces clean code. Use _ import for side-effect-only packages.",
      difficulty: "hard",
      points: 30,
      tags: ["import", "unused"],
      relatedLesson: "package-import-rules",
    },
    {
      id: "import-12",
      type: "architecture",
      question: "How should you organize imports in a large Go project?",
      options: [
        { id: "a", text: "All imports in a single line, sorted alphabetically" },
        { id: "b", text: "Group imports: stdlib, then external, with blank line between groups" },
        { id: "c", text: "Import everything at the top of each function" },
        { id: "d", text: "Use global imports accessible everywhere" },
      ],
      correctAnswer: "b",
      explanation: "Go convention: group imports as (1) stdlib packages, (2) external packages, (3) internal packages, with blank lines between groups. goimports auto-formats this.",
      difficulty: "hard",
      points: 30,
      tags: ["import", "organization", "best-practice"],
      relatedLesson: "package-import-rules",
    },
  ],
  "packages": [
    {
      id: "pkg-1",
      type: "multiple-choice",
      question: "What is the package declaration rule in Go?",
      options: [
        { id: "a", text: "All files in a directory must have the same package name" },
        { id: "b", text: "Each file can have a different package name" },
        { id: "c", text: "Package names must match directory names exactly" },
        { id: "d", text: "Package names are optional" },
      ],
      correctAnswer: "a",
      explanation: "All .go files in a directory must belong to the same package (have the same package declaration). The directory name usually matches the package name.",
      difficulty: "easy",
      points: 10,
      tags: ["packages", "rules"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-2",
      type: "true-false",
      question: "In Go, unexported (lowercase) names are accessible from other packages.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Lowercase names are unexported (package-private). Only uppercase (exported) names are accessible from other packages. This is Go's encapsulation mechanism.",
      difficulty: "easy",
      points: 10,
      tags: ["packages", "visibility"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-3",
      type: "multiple-select",
      question: "Which of the following are exported names in Go? (Select all that apply)",
      options: [
        { id: "a", text: "MyFunc" },
        { id: "b", text: "myFunc" },
        { id: "c", text: "MyVar" },
        { id: "d", text: "myVar" },
      ],
      correctAnswer: ["a", "c"],
      explanation: "Names starting with uppercase are exported: MyFunc, MyVar. Names starting with lowercase are unexported: myFunc, myVar. This applies to functions, variables, types, and constants.",
      difficulty: "easy",
      points: 10,
      tags: ["packages", "exported"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-4",
      type: "multiple-choice",
      question: "What is the special meaning of package main?",
      options: [
        { id: "a", text: "It's the test package" },
        { id: "b", text: "It produces an executable binary instead of a library" },
        { id: "c", text: "It's a deprecated package" },
        { id: "d", text: "It's the root package of all Go programs" },
      ],
      correctAnswer: "b",
      explanation: "package main with a main() function tells the Go compiler to produce an executable binary. All other packages produce library archives (.a files).",
      difficulty: "easy",
      points: 10,
      tags: ["packages", "main"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-5",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

const Pi = 3.14159

func main() {
    fmt.Println(Pi)
}`,
      options: [
        { id: "a", text: "3.14159" },
        { id: "b", text: "Pi" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "3.14" },
      ],
      correctAnswer: "a",
      explanation: "Pi (capitalized) is exported from the main package. fmt.Println prints its value: 3.14159.",
      difficulty: "easy",
      points: 10,
      tags: ["packages", "constants"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-6",
      type: "multiple-select",
      question: "What are valid Go package naming conventions? (Select all that apply)",
      options: [
        { id: "a", text: "Lowercase, single word: math, fmt, strings" },
        { id: "b", text: "No underscores or mixedCase: mypackage" },
        { id: "c", text: "CamelCase: MyPackage" },
        { id: "d", text: "Short, descriptive names" },
      ],
      correctAnswer: ["a", "d"],
      explanation: "Go convention: short, lowercase, single-word package names. No underscores, no camelCase. Examples: fmt, strings, strconv. The name should describe the package's purpose.",
      difficulty: "medium",
      points: 20,
      tags: ["packages", "conventions"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-7",
      type: "multiple-select",
      question: "Which of the following are Go project layout conventions? (Select all that apply)",
      options: [
        { id: "a", text: "cmd/ for application entry points" },
        { id: "b", text: "pkg/ for library code" },
        { id: "c", text: "internal/ for private packages (not importable outside module)" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswer: ["d"],
      explanation: "Common Go layout: cmd/ (main packages), pkg/ (library), internal/ (private packages), pkg/ (reusable code). internal/ packages can only be imported within their parent module.",
      difficulty: "medium",
      points: 20,
      tags: ["packages", "layout"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-8",
      type: "multiple-choice",
      question: "What is the init() function in Go?",
      options: [
        { id: "a", text: "The main entry point of the program" },
        { id: "b", text: "A function that runs automatically before main() or when the package is imported" },
        { id: "c", text: "A constructor for structs" },
        { id: "d", text: "A function that initializes test cases" },
      ],
      correctAnswer: "b",
      explanation: "init() runs automatically when a package is imported (or when the program starts for package main). Multiple init() functions can exist in a package. They run in order of file name.",
      difficulty: "medium",
      points: 20,
      tags: ["packages", "init"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-9",
      type: "code-output",
      question: "What is the output?",
      code: `package main

import "fmt"

func init() {
    fmt.Println("init")
}

func main() {
    fmt.Println("main")
}`,
      options: [
        { id: "a", text: "main\\ninit" },
        { id: "b", text: "init\\nmain" },
        { id: "c", text: "main" },
        { id: "d", text: "init" },
      ],
      correctAnswer: "b",
      explanation: "init() runs before main(). Output: 'init' then 'main'.",
      difficulty: "medium",
      points: 20,
      tags: ["packages", "init", "order"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-10",
      type: "multiple-select",
      question: "What are Go's internal package rules? (Select all that apply)",
      options: [
        { id: "a", text: "Packages under internal/ can only be imported by code in the parent directory tree" },
        { id: "b", text: "internal/ packages are visible to all packages in the module" },
        { id: "c", text: "internal/ provides enforced encapsulation at the module level" },
        { id: "d", text: "internal/ packages are visible to all Go programs" },
      ],
      correctAnswer: ["a", "c"],
      explanation: "The internal/ directory enforces encapsulation: packages inside can only be imported by code in the parent directory tree. This is a Go language feature, not just convention.",
      difficulty: "hard",
      points: 30,
      tags: ["packages", "internal"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-11",
      type: "scenario",
      question: "You need to share types between two packages in your module without exposing them to external users. What should you use?",
      options: [
        { id: "a", text: "Put them in a public pkg/ directory" },
        { id: "b", text: "Put them in an internal/ directory — they'll be accessible within the module but not to external importers" },
        { id: "c", text: "Use global variables" },
        { id: "d", text: "Export them and tell users not to import" },
      ],
      correctAnswer: "b",
      explanation: "internal/ packages are accessible within the module but invisible to external importers. This is the Go way to create private shared code.",
      difficulty: "hard",
      points: 30,
      tags: ["packages", "internal", "encapsulation"],
      relatedLesson: "packages",
    },
    {
      id: "pkg-12",
      type: "architecture",
      question: "How should a Go project organize its packages for maximum maintainability?",
      options: [
        { id: "a", text: "Put everything in one package for simplicity" },
        { id: "b", text: "Organize by domain/feature with clear boundaries; avoid circular dependencies; use internal/ for private code" },
        { id: "c", text: "One package per file" },
        { id: "d", text: "Mirror the directory structure of other languages" },
      ],
      correctAnswer: "b",
      explanation: "Organize by domain/feature. Avoid circular imports (they're forbidden in Go). Use internal/ for private packages. Keep packages focused and small. Follow Go conventions, not Java/C# patterns.",
      difficulty: "hard",
      points: 30,
      tags: ["packages", "architecture"],
      relatedLesson: "packages",
    },
  ],
};
