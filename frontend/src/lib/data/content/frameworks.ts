import { TopicContent } from "./fundamentals";

export const frameworksContent: Record<string, TopicContent> = {
  "gin": {
    slug: "gin",
    title: "Gin Web Framework",
    summary: "Gin is a high-performance HTTP web framework featuring a radix tree router, middleware pipeline, and minimal memory allocation.",
    description: `Gin is a fast, minimalistic web framework for building REST APIs and microservices in Go. Built on top of net/http, it provides a httprouter-powered radix tree router that delivers near-zero allocation performance. Its API is intentionally similar to Martini but with up to 40x faster performance due to its use of custom radix trees instead of reflection-based routing.

For backend engineers, Gin strikes an excellent balance between simplicity and feature richness. It includes a robust middleware system, JSON validation, route grouping, error management, and rendering helpers out of the box. The framework is battle-tested at companies like ByteDance, Baidu, and Tencent, handling millions of requests per second in production environments.

In practice, Gin has become one of the most popular Go web frameworks on GitHub, with over 80k stars. Its ecosystem includes companion libraries for ORM (Gin-Scope), session management, and authentication. The framework's lightweight core and extensible middleware architecture make it a natural choice for teams building microservice architectures where each service needs a fast, reliable HTTP layer.`,
    keyPoints: [
      "Built on net/http with httprouter for radix tree-based routing at near-zero allocation",
      "Middleware pipeline supports chaining with c.Next() and c.Abort() control flow",
      "Route grouping allows shared prefixes and middleware across endpoint families",
      "Built-in JSON binding and validation using struct tags (binding:\"required\")",
      "Supports multiple renderers: JSON, XML, YAML, HTML templates, and protobuf",
      "Context object carries request-scoped data through middleware chain",
      "Native graceful shutdown support via http.Server with context"
    ],
    codeExamples: [
      {
        title: "Setting Up a Gin Server",
        description: "Comparing a bare-bones setup versus a production-ready configuration",
        bad: `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/users/:id", func(c *gin.Context) {
        c.JSON(200, gin.H{"id": c.Param("id")})
    })
    r.Run()
}`,
        good: `package main

import (
    "context"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.New()
    r.Use(gin.Logger(), gin.Recovery())

    r.GET("/users/:id", func(c *gin.Context) {
        id := c.Param("id")
        c.JSON(http.StatusOK, gin.H{"id": id})
    })

    srv := &http.Server{
        Addr:         ":8080",
        Handler:      r,
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  60 * time.Second,
    }

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("listen: %s\\n", err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    log.Println("Shutting down server...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal("Server forced to shutdown:", err)
    }
    log.Println("Server exiting")
}`,
        explanation: "The bad example uses gin.Default() without configuring server timeouts and calls r.Run() which blocks without graceful shutdown. The good example explicitly creates a gin.Engine with only the needed middleware (Logger and Recovery), configures http.Server with read/write/idle timeouts to prevent slow-client attacks, runs the server in a goroutine, and listens for OS signals to trigger a graceful shutdown via srv.Shutdown with a deadline context."
      },
      {
        title: "Middleware and Route Groups",
        description: "Properly structuring middleware and grouped routes for an API",
        bad: `func main() {
    r := gin.Default()
    r.GET("/api/v1/users", AuthMiddleware(), GetUsers)
    r.POST("/api/v1/users", AuthMiddleware(), CreateUser)
    r.GET("/api/v1/orders", AuthMiddleware(), GetOrders)
    r.Run()
}`,
        good: `func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(http.StatusUnauthorized,
                gin.H{"error": "missing authorization header"})
            return
        }
        userID, err := validateToken(token)
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized,
                gin.H{"error": "invalid token"})
            return
        }
        c.Set("userID", userID)
        c.Next()
    }
}

func main() {
    r := gin.New()
    r.Use(gin.Logger(), gin.Recovery())

    v1 := r.Group("/api/v1")
    v1.Use(AuthRequired())
    {
        v1.GET("/users", GetUsers)
        v1.POST("/users", CreateUser)
        v1.GET("/orders", GetOrders)
    }

    r.Run(":8080")
}`,
        explanation: "The bad example redundantly applies AuthMiddleware() to every single route handler, making it easy to forget on new routes. The good example defines AuthRequired as a reusable gin.HandlerFunc that checks the Authorization header, aborts with 401 on failure, and stores the authenticated userID in the context. The route group /api/v1 applies the middleware once, so all routes under it are protected automatically. Grouping also keeps related endpoints organized."
      }
    ],
    bestPractices: [
      "Always use gin.New() instead of gin.Default() in production to explicitly choose middleware",
      "Configure http.Server timeouts (ReadTimeout, WriteTimeout, IdleTimeout) to prevent slow-client attacks",
      "Use route groups to avoid repeating middleware and path prefixes",
      "Set trusted proxies explicitly with r.SetTrustedProxies() to prevent HTTP request smuggling",
      "Use c.Abort() in middleware to stop the chain early on auth failures instead of returning",
      "Bind request payloads using ShouldBindJSON with validated struct tags rather than manual parsing"
    ],
    commonMistakes: [
      "Using r.Run() without graceful shutdown causes dropped connections on deployment",
      "Forgetting to call c.Abort() in auth middleware allows handlers to execute after auth failure",
      "Not setting TrustedProxies leaves the framework vulnerable to proxy header spoofing",
      "Using gin.H for responses instead of typed structs makes API contracts implicit",
      "Calling c.JSON() after c.Abort() sends double responses"
    ],
    relatedTopics: [
      "echo",
      "fiber",
      "orms--db-access"
    ],
    externalResources: [
      { title: "Gin Web Framework", url: "https://github.com/gin-gonic/gin" },
      { title: "Gin Documentation", url: "https://gin-gonic.com/docs/" },
      { title: "Gin vs Echo vs Fiber Benchmarks", url: "https://github.com/the-benchmarker/web-frameworks" }
    ]
  },

  "echo": {
    slug: "echo",
    title: "Echo Framework",
    summary: "Echo is a high-performance, extensible Go web framework with a minimalist core and a powerful router built on top of net/http.",
    description: `Echo is a high-performance, extensible, and minimalist Go web framework created by Labstack. It provides a robust router with path parameter support, middleware chaining, and a rich set of utilities for building modern web applications and APIs. Echo's design philosophy centers on minimalism—its core stays small while offering a composable set of features through its ecosystem.

For backend engineers, Echo offers several compelling advantages over alternatives. Its router uses a custom radix tree implementation similar to httprouter but with additional capabilities like wildcard and regex matching. The framework provides first-class support for HTTP/2, WebSocket, and TLS, along with built-in CSRF protection, rate limiting, and request validation through its middleware ecosystem. Its context API is ergonomic and type-safe, reducing boilerplate in handlers.

Echo is widely used in production at companies like Tencent and is especially popular for building API gateways and microservice HTTP layers. Its middleware architecture supports both pre-processing and post-processing, enabling clean separation of concerns. The framework's focus on performance means it consistently ranks among the fastest Go web frameworks in third-party benchmarks, making it suitable for latency-sensitive production workloads.`,
    keyPoints: [
      "Minimalist core with extensible middleware ecosystem via echo.MiddlewareFunc",
      "Custom radix tree router with support for wildcards and route metadata",
      "First-class HTTP/2, WebSocket, and automatic TLS (Let's Encrypt) support",
      "Typed context API with generics-friendly design for handler parameters",
      "Built-in request binding and validation using struct tags (validate:\"required\")",
      "Group-based routing with prefix, middleware, and nested group support",
      "Middleware supports per-route, per-group, or global application"
    ],
    codeExamples: [
      {
        title: "Echo Server Setup",
        description: "Comparing a minimal setup versus production configuration",
        bad: `package main

import (
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func main() {
    e := echo.New()
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    e.GET("/hello", func(c echo.Context) error {
        return c.JSON(200, map[string]string{"message": "hello"})
    })
    e.Logger.Fatal(e.Start(":8080"))
}`,
        good: `package main

import (
    "context"
    "log"
    "os"
    "os/signal"
    "time"

    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func main() {
    e := echo.New()
    e.HideBanner = true
    e.HidePort = true

    e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
        Format: "method=\${method}, uri=\${uri}, status=\${status}\\n",
    }))
    e.Use(middleware.Recover())
    e.Use(middleware.Secure())
    e.Use(middleware.RequestID())

    e.GET("/hello", func(c echo.Context) error {
        return c.JSON(200, map[string]string{"message": "hello"})
    })

    addr := ":" + envOrDefault("PORT", "8080")
    srv := &echo.Server{
        Addr:         addr,
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    go func() {
        if err := e.StartServer(srv); err != nil && err != context.Canceled {
            log.Printf("server error: %v\\n", err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, os.Interrupt)
    <-quit
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    if err := e.Shutdown(ctx); err != nil {
        log.Printf("shutdown error: %v\\n", err)
    }
}

func envOrDefault(key, fallback string) string {
    if v := os.Getenv(key); v != "" {
        return v
    }
    return fallback
}`,
        explanation: "The bad example uses e.Logger.Fatal(e.Start()) which blocks and provides no graceful shutdown. The good example configures Echo with explicit security middleware (Secure for security headers, RequestID for distributed tracing), creates an echo.Server with read/write timeouts, starts the server in a goroutine, and handles OS signals for graceful shutdown. It also reads the port from environment variables, which is standard for containerized deployments."
      }
    ],
    bestPractices: [
      "Use echo.New() and configure HideBanner/HidePort for cleaner logs in production",
      "Apply middleware globally with e.Use() and per-route with route-level middleware attachment",
      "Always use e.Shutdown(ctx) for graceful shutdown instead of process-level termination",
      "Use middleware.Secure() to automatically set security headers (XSS, content-type, HSTS)",
      "Return typed error responses using custom HTTPErrorHandler for consistent API contracts",
      "Prefer c.Bind() or c.BindAndValidate() for automatic request parsing with validation"
    ],
    commonMistakes: [
      "Using e.Logger.Fatal(e.Start()) blocks without graceful shutdown on SIGTERM",
      "Forgetting to set TrustedProxies allows IP spoofing via X-Forwarded-For headers",
      "Not using a custom error handler means unstructured error responses leak implementation details",
      "Returning errors from handlers without setting the status code defaults to 500 silently",
      "Mixing e.Use() and per-route middleware creates confusing execution order"
    ],
    relatedTopics: [
      "gin",
      "fiber",
      "zap"
    ],
    externalResources: [
      { title: "Echo Framework", url: "https://github.com/labstack/echo" },
      { title: "Echo Documentation", url: "https://echo.labstack.com/" },
      { title: "Echo Middleware List", url: "https://echo.labstack.com/middleware/" }
    ]
  },

  "fiber": {
    slug: "fiber",
    title: "Fiber Framework",
    summary: "Fiber is an Express.js-inspired Go web framework built on fasthttp, offering minimal overhead and blazing-fast request handling.",
    description: `Fiber is a Go web framework inspired by Express.js and built on top of the fasthttp library, which bypasses net/http entirely for raw performance. Created by Fenny and maintained by the GoFiber community, Fiber is designed for developers who want the speed of fasthttp with an Express-like API that feels familiar to JavaScript/Node.js developers moving to Go.

For backend engineers, Fiber's key differentiator is its use of fasthttp instead of net/http. This means it avoids the allocation overhead of Go's standard HTTP package, delivering significantly higher throughput and lower latency under load. Fiber provides an ergonomic context object (fasthttp.Ctx) with helper methods for parsing, binding, and responding to requests. It includes built-in middleware for CORS, compression, rate limiting, session management, and more.

In production, Fiber is favored for high-throughput API services, real-time applications, and microservices where every microsecond of latency matters. Its Express-like API reduces the learning curve for teams migrating from Node.js. However, because it uses fasthttp rather than net/http, some standard library-compatible middleware may not work directly—a tradeoff that is generally acceptable given the performance gains.`,
    keyPoints: [
      "Built on fasthttp for significantly lower latency and higher throughput than net/http",
      "Express.js-inspired API makes it approachable for developers coming from Node.js",
      "Built-in middleware: CORS, compress,限流, logger, session, proxy, and more",
      "Static file serving with configurable caching, compression, and SPA support",
      "Group-based routing with prefix and middleware chaining",
      "WebSocket support via fasthttp-based upgrader",
      "Template engine support with standard Go template interfaces"
    ],
    codeExamples: [
      {
        title: "Fiber Server Setup",
        description: "A minimal Fiber server versus a production-ready configuration",
        bad: `package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })
    app.Listen(":8080")
}`,
        good: `package main

import (
    "context"
    "log"
    "os"
    "os/signal"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/compress"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "github.com/gofiber/fiber/v2/middleware/helmet"
    "github.com/gofiber/fiber/v2/middleware/limiter"
    "github.com/gofiber/fiber/v2/middleware/recover"
    "github.com/gofiber/fiber/v2/middleware/requestid"
)

func main() {
    app := fiber.New(fiber.Config{
        AppName:      "MyService",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  60 * time.Second,
        BodyLimit:    10 * 1024 * 1024,
        ErrorHandler: customErrorHandler,
    })

    app.Use(recover.New())
    app.Use(compress.New(compress.Config{Level: compress.LevelBestSpeed}))
    app.Use(cors.New(cors.Config{
        AllowOrigins: "https://example.com",
        AllowMethods: "GET,POST,PUT,DELETE",
    }))
    app.Use(helmet.New())
    app.Use(limiter.New(limiter.Config{
        Max:        100,
        Expiration: 1 * time.Minute,
    }))
    app.Use(requestid.New())

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, os.Interrupt, os.Kill)

    go func() {
        <-quit
        log.Println("Shutting down...")
        ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
        defer cancel()
        if err := app.ShutdownWithContext(ctx); err != nil {
            log.Fatalf("shutdown error: %v", err)
        }
    }()

    log.Fatal(app.Listen(":8080"))
}

func customErrorHandler(c *fiber.Ctx, err error) error {
    code := fiber.StatusInternalServerError
    if e, ok := err.(*fiber.Error); ok {
        code = e.Code
    }
    return c.Status(code).JSON(fiber.Map{"error": err.Error()})
}`,
        explanation: "The bad example creates a Fiber app with no middleware, no timeouts, and calls app.Listen which blocks without graceful shutdown. The good example configures Fiber with explicit read/write/idle timeouts and body size limit, stacks essential middleware (recover, compress, CORS, helmet for security headers, rate limiting, request ID), registers a custom error handler for structured JSON errors, and sets up signal-based graceful shutdown with app.ShutdownWithContext. The middleware order matters: recover first, then security, then business logic."
      }
    ],
    bestPractices: [
      "Always set ReadTimeout and WriteTimeout in fiber.Config to prevent slow-client resource exhaustion",
      "Use recover middleware as the first middleware to catch panics in handlers",
      "Configure compress middleware for production to reduce response payload sizes",
      "Use helmet middleware to set security headers (X-Content-Type-Options, HSTS, etc.)",
      "Call app.ShutdownWithContext with a timeout context for graceful shutdown instead of os.Exit",
      "Be aware that fiber uses fasthttp, not nethttp—standard net/http middleware is incompatible"
    ],
    commonMistakes: [
      "Using app.Listen() without signal handling causes dropped connections on deployment",
      "Assuming net/http middleware works with Fiber fasthttp—they are incompatible",
      "Not setting BodyLimit allows malicious clients to exhaust memory with huge payloads",
      "Placing recover middleware after other middleware leaves early middleware unprotected from panics",
      "Using c.Context().Response.Header().Set() directly instead of c.Set() for response headers"
    ],
    relatedTopics: [
      "gin",
      "echo",
      "melody"
    ],
    externalResources: [
      { title: "Fiber Framework", url: "https://github.com/gofiber/fiber" },
      { title: "Fiber Documentation", url: "https://docs.gofiber.io/" },
      { title: "fasthttp", url: "https://github.com/valyala/fasthttp" }
    ]
  },

  "beego": {
    slug: "beego",
    title: "Beego Framework",
    summary: "Beego is a full-featured Go MVC framework with built-in ORM, admin panel, caching, session management, and code generation tools.",
    description: `Beego is a full-featured, convention-over-configuration MVC web framework for Go, created by astaxie (Xusheng Huang). Unlike minimalist frameworks like Gin or Echo, Beego provides a comprehensive toolkit that includes an ORM, admin panel, caching layer, session management, i18n support, and even a code generator (beego generate). It follows an MVC architecture similar to Django or Laravel, making it familiar to developers coming from those ecosystems.

For backend engineers, Beego is particularly appealing when building monolithic applications or CRUD-heavy services where productivity matters more than raw performance. Its built-in Orm maps Go structs to database tables automatically and supports MySQL, PostgreSQL, SQLite, and others. The Bee tool provides scaffolding commands for generating controllers, models, and migrations, reducing boilerplate significantly. Beego also includes a built-in admin dashboard for monitoring application metrics in development.

In production environments, Beego powers applications at companies like 360 and Xiaomi in China. The framework's all-in-one nature means fewer dependency decisions, but it also means tighter coupling to Beego's conventions. For teams building standard web applications with server-side rendering or REST APIs with admin interfaces, Beego provides everything out of the box without needing to assemble middleware from separate packages.`,
    keyPoints: [
      "Full MVC framework with routers, controllers, models, views, and filters",
      "Built-in ORM supporting MySQL, PostgreSQL, SQLite, and TiDB with struct-to-table mapping",
      "Bee CLI tool for project scaffolding, code generation, and hot-reload development",
      "Built-in admin panel (beego.Admin) for monitoring and inspecting running applications",
      "Integrated caching with adapters for Memcache, Redis, file, and in-memory stores",
      "Session management with file, Redis, and database backends",
      "i18n support with automatic language detection from headers"
    ],
    codeExamples: [
      {
        title: "Beego Controller Setup",
        description: "A Beego MVC controller versus raw handler function approach",
        bad: `package controllers

import (
    "encoding/json"
    "net/http"

    "github.com/beego/beego/v2/server/web"
)

type UserController struct {
    web.Controller
}

func (c *UserController) Get() {
    // Accessing raw request instead of using Beego's built-in methods
    req := c.Ctx.Request
    var user map[string]string
    json.NewDecoder(req.Body).Decode(&user)
    c.Ctx.ResponseWriter.WriteHeader(200)
    json.NewEncoder(c.Ctx.ResponseWriter).Encode(user)
}`,
        good: `package controllers

import (
    "github.com/beego/beego/v2/server/web"
)

type UserController struct {
    web.Controller
}

type CreateUserReq struct {
    Name  string \`json:"name" validate:"required"\`
    Email string \`json:"email" validate:"required,email"\`
}

type UserResp struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func (c *UserController) Get() {
    id, _ := c.GetInt64("id")
    user, err := findUserByID(id)
    if err != nil {
        c.Data["json"] = map[string]string{"error": "user not found"}
        c.Ctx.Output.SetStatus(404)
        c.ServeJSON()
        return
    }
    c.Data["json"] = user
    c.ServeJSON()
}

func (c *UserController) Post() {
    var req CreateUserReq
    if err := c.BindJSON(&req); err != nil {
        c.Data["json"] = map[string]string{"error": err.Error()}
        c.Ctx.Output.SetStatus(400)
        c.ServeJSON()
        return
    }
    user := createUser(req.Name, req.Email)
    c.Data["json"] = UserResp{
        ID: user.ID, Name: user.Name, Email: user.Email,
    }
    c.Ctx.Output.SetStatus(201)
    c.ServeJSON()
}`,
        explanation: "The bad example bypasses Beego's abstractions by directly accessing c.Ctx.Request and manually writing JSON responses. The good example defines typed request/response structs with JSON and validation tags, uses Beego's BindJSON for automatic binding and validation, and leverages ServeJSON for consistent JSON response handling. The controller stays idiomatic to Beego's conventions, making it easier to maintain and test."
      }
    ],
    bestPractices: [
      "Use Bee CLI (bee generate) for scaffolding controllers, models, and migrations to reduce boilerplate",
      "Define typed request/response structs with json and validate tags instead of map[string]interface{}",
      "Use Beego's built-in ORM (orm.Read, orm.Insert) instead of raw SQL for standard CRUD operations",
      "Configure beego.BConfig.RunMode to 'prod' in production to disable debug features",
      "Use web.Controller.Data for response data and ServeJSON for consistent JSON output",
      "Set explicit database connection pool settings via orm.RegisterDriver and MaxOpenConns"
    ],
    commonMistakes: [
      "Running in development mode in production leaks debug information and admin endpoints",
      "Bypassing Beego's ORM and writing raw SQL without connection pool management",
      "Not using c.ServeJSON() and manually encoding responses breaks Beego's response pipeline",
      "Ignoring Beego's filter (middleware) chain and adding auth logic directly in controllers",
      "Using global ORM instances without configuring connection pool limits exhausts database connections"
    ],
    relatedTopics: [
      "gorm",
      "orms--db-access",
      "zap"
    ],
    externalResources: [
      { title: "Beego Framework", url: "https://github.com/beego/beego" },
      { title: "Beego Documentation", url: "https://beego.me/docs/" },
      { title: "Bee CLI Tool", url: "https://github.com/beego/bee" }
    ]
  },

  "gorm": {
    slug: "gorm",
    title: "GORM ORM",
    summary: "GORM is a developer-friendly ORM for Go that simplifies database operations with an expressive query builder and auto-migration.",
    description: `GORM is the most popular ORM library for Go, created by Jinzhu. It provides a full-featured ORM that supports MySQL, PostgreSQL, SQLite, SQL Server, and other databases. GORM's API is designed to be expressive and chainable, allowing developers to write database queries in a way that reads almost like natural language. Features include auto-migration, associations (has many, belongs to, many-to-many), transactions, hooks, and preloading.

For backend engineers, GORM dramatically reduces the boilerplate required for database access in Go applications. Instead of writing SQL strings and manually scanning results into structs, GORM maps Go struct fields to database columns and provides type-safe query methods. Its AutoMigrate feature can create and alter tables based on your struct definitions, which is invaluable during rapid development. The Preload function eagerly loads associated records, solving the N+1 query problem that plagues manual ORM implementations.

In production, GORM is used extensively in Chinese tech companies and growing rapidly in international markets. The library supports advanced features like soft deletes (using a deleted_at timestamp field), optimistic locking, and conflict resolution for upserts. While it adds overhead compared to raw SQL, the productivity gains for standard CRUD operations are substantial. For performance-critical paths, GORM also provides a way to execute raw SQL while still benefiting from the connection pool management.`,
    keyPoints: [
      "Chainable API with methods like Where, Select, Order, Limit for building queries",
      "AutoMigrate creates and alters tables from Go struct definitions",
      "Association support: HasOne, HasMany, BelongsTo, Many2Many with Preload for eager loading",
      "Soft deletes using deleted_at gorm.Model field instead of hard DELETE statements",
      "Transaction support via db.Transaction(func(tx *gorm.DB) error) with automatic rollback",
      "Hooks (BeforeCreate, AfterUpdate, etc.) for intercepting ORM lifecycle events",
      "Logger integration for slow query detection and SQL logging in development"
    ],
    codeExamples: [
      {
        title: "GORM Query Patterns",
        description: "Anti-patterns in GORM queries versus recommended approaches",
        bad: `// Loading all records into memory then filtering
var users []User
db.Find(&users)
var activeUsers []User
for _, u := range users {
    if u.Active {
        activeUsers = append(activeUsers, u)
    }
}

// N+1 query problem
var orders []Order
db.Find(&orders)
for i := range orders {
    db.Model(&orders[i]).Association("Items").Find(&orders[i].Items)
}`,
        good: `// Push filtering to the database with Where
var activeUsers []User
db.Where("active = ?", true).Find(&activeUsers)

// Use Preload for eager loading associated records
var orders []Order
db.Preload("Items").Find(&orders)

// Use Joins for complex queries with single SQL
var ordersWithUsers []Order
db.Joins("JOIN users ON users.id = orders.user_id").
    Where("users.status = ?", "active").
    Preload("Items").
    Find(&ordersWithUsers)

// Use First for single record instead of Find + loop
var user User
if err := db.Where("email = ?", email).First(&user).Error; err != nil {
    if errors.Is(err, gorm.ErrRecordNotFound) {
        return nil, ErrUserNotFound
    }
    return nil, fmt.Errorf("query user: %w", err)
}`,
        explanation: "The bad example loads all users into memory and filters in Go, and triggers N+1 queries by loading order items one at a time. The good example pushes filtering to the database with Where, uses Preload for eager loading to solve N+1, uses Joins for complex cross-table queries, and uses First with proper error handling for single-record lookups. The key insight is: let the database do the filtering and joining, and minimize round trips."
      },
      {
        title: "GORM Model and Migration",
        description: "Proper model definition with indexes, constraints, and soft deletes",
        bad: `type User struct {
    Id        int
    Name      string
    Email     string
    CreatedAt time.Time
    UpdatedAt time.Time
}

func init() {
    db.AutoMigrate(&User{})
}`,
        good: `type User struct {
    gorm.Model
    Name      string \`gorm:"size:100;not null"\`
    Email     string \`gorm:"size:255;uniqueIndex;not null"\`
    Role      string \`gorm:"size:20;default:user"\`
    LoginCount int   \`gorm:"default:0"\`
}

func Migrate(db *gorm.DB) error {
    err := db.AutoMigrate(&User{})
    if err != nil {
        return fmt.Errorf("auto migrate users: %w", err)
    }

    idx := db.Migrator().HasIndex(&User{}, "idx_users_email")
    if !idx {
        db.Exec("CREATE UNIQUE INDEX idx_users_email ON users(email)")
    }
    return nil
}`,
        explanation: "The bad example uses unexported id (lowercase) and raw int type instead of gorm.Model, lacks field constraints, and calls AutoMigrate in init() with no error handling. The good example embeds gorm.Model which provides ID, CreatedAt, UpdatedAt, and DeletedAt (for soft deletes), adds field constraints (size, not null, unique index, default), and wraps AutoMigrate in a dedicated function with error handling. gorm.Model's DeletedAt field enables soft deletes automatically."
      }
    ],
    bestPractices: [
      "Always check db.Error after query operations—GORM returns errors as values, not panics",
      "Use Preload or Joins to avoid N+1 queries; never loop and query individually",
      "Define database constraints (size, not null, unique) in struct tags to let AutoMigrate enforce them",
      "Use db.Transaction() for multi-table operations to ensure atomicity",
      "Configure connection pool with db.DB() and set SetMaxOpenConns/SetMaxIdleConns",
      "Use gorm.ErrRecordNotFound to distinguish missing records from real errors"
    ],
    commonMistakes: [
      "Forgetting Preload on associations causes N+1 queries in loops",
      "Calling AutoMigrate in production without version control can cause data loss",
      "Not closing rows from db.Raw().Rows() leaks database connections",
      "Using db.Find without Limit on large tables loads entire tables into memory",
      "Ignoring db.Error after operations means silent data loss on constraint violations"
    ],
    relatedTopics: [
      "pgx",
      "orms--db-access",
      "beego"
    ],
    externalResources: [
      { title: "GORM Documentation", url: "https://gorm.io/docs/" },
      { title: "GORM GitHub Repository", url: "https://github.com/go-gorm/gorm" },
      { title: "GORM Gen (Type-Safe Code Generator)", url: "https://gorm.io/gen/" }
    ]
  },

  "pgx": {
    slug: "pgx",
    title: "pgx PostgreSQL Driver",
    summary: "pgx is a fast, pure-Go PostgreSQL driver and toolkit that provides a lower-level, higher-performance alternative to database/sql.",
    description: `pgx is a pure-Go PostgreSQL driver and toolkit created by Jack Christensen. Unlike the standard database/sql interface used by lib/pq, pgx provides both a database/sql-compatible driver and its own native API that exposes PostgreSQL-specific features. The native API offers better performance through reduced allocations, support for PostgreSQL's binary protocol, COPY operations, prepared statements, and LISTEN/NOTIFY.

For backend engineers, pgx is the recommended choice for any application that uses PostgreSQL exclusively. The native pgx API provides direct access to PostgreSQL features that database/sql abstracts away: LISTEN/NOTIFY for real-time event streaming, COPY for bulk data loading, pipeline mode for batching queries, and native type mapping for PostgreSQL-specific types like jsonb, arrays, inet, and hstore. The library also includes pgxpool, a built-in connection pool that outperforms database/sql's pool for PostgreSQL workloads.

In production, pgx powers critical data layers at companies that need maximum PostgreSQL performance. Its binary protocol support means data is serialized directly without text parsing overhead, which can improve throughput by 20-30% for complex queries. The pgxpool package provides a production-ready connection pool with health checking and automatic reconnection. For teams migrating from lib/pq, pgx also offers a database/sql-compatible driver (pgx/stdlib) as a drop-in replacement.`,
    keyPoints: [
      "Pure-Go implementation with both database/sql driver and native high-performance API",
      "pgxpool provides built-in connection pooling with health checking and context support",
      "Binary protocol support for 20-30% faster data transfer compared to text protocol",
      "Native PostgreSQL features: LISTEN/NOTIFY, COPY, pipeline mode, and row-level locking",
      "Type mapping for PostgreSQL-specific types: jsonb, arrays, inet, uuid, hstore",
      "Automatic prepared statement caching in native mode for repeated queries",
      "COPY protocol support for bulk data loading at maximum throughput"
    ],
    codeExamples: [
      {
        title: "pgx Connection and Querying",
        description: "Using database/sql interface versus native pgx API",
        bad: `package main

import (
    "database/sql"
    "log"

    _ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
    db, err := sql.Open("pgx", "postgres://localhost:5432/mydb")
    if err != nil {
        log.Fatal(err)
    }

    rows, err := db.Query("SELECT id, name, email FROM users WHERE active = $1", true)
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()

    for rows.Next() {
        var id int
        var name, email string
        if err := rows.Scan(&id, &name, &email); err != nil {
            log.Fatal(err)
        }
    }
}`,
        good: `package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/jackc/pgx/v5"
    "github.com/jackc/pgx/v5/pgxpool"
)

type User struct {
    ID    int64
    Name  string
    Email string
}

func main() {
    ctx := context.Background()

    pool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
    if err != nil {
        log.Fatalf("create pool: %v", err)
    }
    defer pool.Close()

    if err := pool.Ping(ctx); err != nil {
        log.Fatalf("ping: %v", err)
    }

    var user User
    err = pool.QueryRow(ctx,
        "SELECT id, name, email FROM users WHERE active = $1", true,
    ).Scan(&user.ID, &user.Name, &user.Email)
    if err != nil {
        if err == pgx.ErrNoRows {
            fmt.Println("no user found")
        } else {
            log.Fatalf("query: %v", err)
        }
    }

    rows, err := pool.Query(ctx,
        "SELECT id, name, email FROM users WHERE role = $1", "admin",
    )
    if err != nil {
        log.Fatalf("query: %v", err)
    }
    defer rows.Close()

    var admins []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name, &u.Email); err != nil {
            log.Fatalf("scan: %v", err)
        }
        admins = append(admins, u)
    }
    if err := rows.Err(); err != nil {
        log.Fatalf("rows iteration: %v", err)
    }
}`,
        explanation: "The bad example uses database/sql which doesn't take advantage of pgx's native features and connection pooling. The good example uses pgxpool.New for a dedicated PostgreSQL connection pool with automatic lifecycle management, checks connectivity with Ping, handles ErrNoRows explicitly for single-row queries, uses pgxpool.QueryRow for single records and Query for multiple rows, and always checks rows.Err() after iteration. The DATABASE_URL environment variable avoids hardcoding connection strings."
      }
    ],
    bestPractices: [
      "Use pgxpool.New instead of sql.Open for better performance with native PostgreSQL protocol",
      "Always defer rows.Close() and check rows.Err() after iteration to avoid resource leaks",
      "Use pgx.ErrNoRows to distinguish no-results from actual errors in QueryRow scans",
      "Set pool.MaxConns and pool.MinConns based on expected load and database connection limits",
      "Use pool.Begin or pool.BeginTx for transactions instead of manual BEGIN/COMMIT SQL",
      "Use COPY protocol via pgx.CopyFrom for bulk inserts instead of individual INSERT statements"
    ],
    commonMistakes: [
      "Forgetting rows.Err() after rows.Next() loop exits misses iteration errors",
      "Not calling pool.Close() leaks database connections",
      "Using $1 placeholder with string concatenation instead of parameterized queries enables SQL injection",
      "Creating a new connection pool per request instead of sharing a single pool across the application",
      "Not setting MaxConns on pool in production leads to PostgreSQL connection exhaustion"
    ],
    relatedTopics: [
      "gorm",
      "orms--db-access",
      "zap"
    ],
    externalResources: [
      { title: "pgx GitHub Repository", url: "https://github.com/jackc/pgx" },
      { title: "pgx Documentation", url: "https://pkg.go.dev/github.com/jackc/pgx/v5" },
      { title: "pgxpool Guide", url: "https://pkg.go.dev/github.com/jackc/pgx/v5/pgxpool" }
    ]
  },

  "cobra": {
    slug: "cobra",
    title: "Cobra CLI Library",
    summary: "Cobra is the most widely used Go library for building CLI applications, used by Kubernetes, Docker, Hugo, and most major Go tools.",
    description: `Cobra is a Go library for creating powerful modern CLI applications. Created by Steve Francia, it is the foundation behind virtually every significant Go command-line tool including Kubernetes (kubectl), Docker CLI, Hugo, GitHub CLI (gh), and Terraform. Cobra provides a framework for building subcommands, flags, argument validation, and help text generation that follows Unix conventions out of the box.

For backend engineers, Cobra is essential because it standardizes how Go CLIs are built. It handles the boilerplate of parsing command-line arguments, managing nested subcommands, validating input, and providing consistent help output. Cobra uses a tree structure where each command can have subcommands, flags (both persistent and local), and argument validators. This makes it straightforward to build CLIs ranging from simple single-command tools to complex multi-subcommand applications like kubectl.

In production, Cobra's approach to CLI construction has become the de facto standard in the Go ecosystem. The library integrates with Viper for configuration management, enabling CLIs that accept flags, environment variables, and config files with a unified API. Cobra commands are also highly testable—you can programmatically execute commands and capture output without invoking the actual binary, making it straightforward to write integration tests for CLI behavior.`,
    keyPoints: [
      "Tree-based command hierarchy supporting arbitrarily nested subcommands",
      "Persistent flags propagate to all child commands; local flags are scoped to a single command",
      "Built-in help generation from command and flag descriptions following POSIX conventions",
      "Argument validation with cobra.ExactArgs(n), cobra.MinimumNArgs(n), and custom validators",
      "Shell completion generation for bash, zsh, fish, and PowerShell",
      "Integrates with Viper for unified flag, env var, and config file management",
      "Testable command execution via cmd.Execute() without spawning child processes"
    ],
    codeExamples: [
      {
        title: "Cobra Command Structure",
        description: "Setting up a Cobra CLI with subcommands and flags",
        bad: `package main

import (
    "fmt"
    "os"
)

func main() {
    if len(os.Args) < 2 {
        fmt.Println("usage: mycli <command>")
        os.Exit(1)
    }

    switch os.Args[1] {
    case "serve":
        port := "8080"
        if len(os.Args) > 2 {
            port = os.Args[2]
        }
        fmt.Println("Starting server on port", port)
    case "migrate":
        fmt.Println("Running migrations")
    default:
        fmt.Println("unknown command:", os.Args[1])
        os.Exit(1)
    }
}`,
        good: `package main

import (
    "fmt"
    "log"
    "os"
    "time"

    "github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
    Use:   "mycli",
    Short: "A sample CLI application",
    Long:  "mycli is a CLI tool demonstrating Cobra subcommands and flags.",
}

var serveCmd = &cobra.Command{
    Use:   "serve",
    Short: "Start the HTTP server",
    RunE: func(cmd *cobra.Command, args []string) error {
        port, _ := cmd.Flags().GetString("port")
        timeout, _ := cmd.Flags().GetDuration("timeout")
        fmt.Printf("Starting server on :%s (timeout: %s)\\n", port, timeout)
        return nil
    },
}

var migrateCmd = &cobra.Command{
    Use:   "migrate",
    Short: "Run database migrations",
    RunE: func(cmd *cobra.Command, args []string) error {
        steps, _ := cmd.Flags().GetInt("steps")
        fmt.Printf("Running %d migration steps\\n", steps)
        return nil
    },
}

func init() {
    serveCmd.Flags().StringP("port", "p", "8080", "Port to listen on")
    serveCmd.Flags().Duration("timeout", 30*time.Second, "Server shutdown timeout")

    migrateCmd.Flags().IntP("steps", "n", 0, "Number of migration steps (0=all)")

    rootCmd.AddCommand(serveCmd, migrateCmd)
}

func main() {
    if err := rootCmd.Execute(); err != nil {
        log.Fatal(err)
    }
}`,
        explanation: "The bad example manually parses os.Args with a switch statement, handling flags as positional arguments. This doesn't support --help, --flags, or nested subcommands. The good example uses Cobra to define a root command with nested subcommands (serve, migrate), registers typed flags with short and long forms, default values, and descriptions, and uses RunE instead of Run to propagate errors. The rootCmd.Execute() handles all argument parsing, help generation, and error display automatically."
      }
    ],
    bestPractices: [
      "Use RunE instead of Run in commands so errors propagate and Cobra displays them properly",
      "Define persistent flags on rootCmd for options shared across all subcommands",
      "Use cobra.Command.Flags() for local flags and cobra.Command.PersistentFlags() for inherited ones",
      "Set SilenceUsage and SilenceErrors on rootCmd when you handle errors manually to avoid double-printing",
      "Test commands by calling cmd.Execute() or using SetArgs to simulate CLI invocations",
      "Use Viper integration (viper.BindPFlags) to unify flags with environment variables and config files"
    ],
    commonMistakes: [
      "Using os.Args directly instead of Cobra's flag parsing bypasses help and validation",
      "Setting flags inside Run instead of init() means flags aren't available before command execution",
      "Forgetting to add subcommands with AddCommand makes them invisible to Cobra's command tree",
      "Using Run without returning errors causes silent failures without proper exit codes",
      "Not checking flag values in PreRunE allows invalid arguments to reach RunE"
    ],
    relatedTopics: [
      "urfavecli",
      "beego",
      "packages"
    ],
    externalResources: [
      { title: "Cobra GitHub Repository", url: "https://github.com/spf13/cobra" },
      { title: "Cobra Documentation", url: "https://cobra.dev/" },
      { title: "Viper Configuration Library", url: "https://github.com/spf13/viper" }
    ]
  },

  "urfavecli": {
    slug: "urfavecli",
    title: "urfave/cli Library",
    summary: "urfave/cli is a lightweight, expressive Go library for building command-line applications with a fluent API.",
    description: `urfave/cli (formerly codegangsta/cli) is a lightweight Go library for building command-line applications. Created by Jeremy Saenz, it takes a more declarative, struct-based approach to CLI definition compared to Cobra. Instead of defining commands through method calls on a cobra.Command tree, urfave/cli uses Go structs with struct tags and slice-based command definitions, making the entire CLI topology visible at a glance.

For backend engineers, urfave/cli offers a simpler mental model for building CLIs. Commands, flags, and arguments are all defined as Go structs composed together. This makes the code very readable—the entire CLI layout is visible without navigating through nested function calls. The library supports subcommands, flags (string, int, bool, duration, etc.), bash/zsh completion, and version management. Its API v2 introduced generics and improved type safety for flag values.

In production, urfave/cli is used by tools like Drone CI, Mattermost, and numerous internal developer tools. While it has fewer features than Cobra (no built-in help customization, simpler shell completion), its simplicity and readability make it an excellent choice for CLIs that don't need deeply nested subcommand trees. The struct-based API is particularly appealing for teams that prefer declarative configuration over imperative setup.`,
    keyPoints: [
      "Struct-based command and flag definitions make CLI topology visible at a glance",
      "Fluent API for composing commands, subcommands, and flags into a complete CLI",
      "Type-safe flags with explicit default values, usage strings, and environment variable binding",
      "Built-in support for version flags and version management",
      "Bash and zsh shell completion generation",
      "Context-based API carries state between middleware and command handlers",
      "Lightweight with minimal dependencies compared to Cobra+Viper"
    ],
    codeExamples: [
      {
        title: "urfave/cli Command Definition",
        description: "Building a CLI with urfave/cli's struct-based approach",
        bad: `package main

import (
    "fmt"
    "os"
)

func main() {
    if len(os.Args) < 2 {
        fmt.Println("usage: mycli <command>")
        os.Exit(1)
    }
    switch os.Args[1] {
    case "serve":
        fmt.Println("Starting server")
    case "migrate":
        fmt.Println("Running migrations")
    }
}`,
        good: `package main

import (
    "fmt"
    "log"
    "os"
    "time"

    "github.com/urfave/cli/v2"
)

func main() {
    app := &cli.App{
        Name:  "mycli",
        Usage: "A sample CLI application",
        Version: "1.0.0",
        Commands: []*cli.Command{
            {
                Name:  "serve",
                Usage: "Start the HTTP server",
                Flags: []cli.Flag{
                    &cli.StringFlag{
                        Name:    "port",
                        Aliases: []string{"p"},
                        Usage:   "Port to listen on",
                        Value:   "8080",
                        EnvVars: []string{"PORT"},
                    },
                    &cli.DurationFlag{
                        Name:  "timeout",
                        Usage: "Server shutdown timeout",
                        Value: 30 * time.Second,
                    },
                },
                Action: func(c *cli.Context) error {
                    port := c.String("port")
                    timeout := c.Duration("timeout")
                    fmt.Printf("Starting server on :%s (timeout: %s)\\n", port, timeout)
                    return nil
                },
            },
            {
                Name:  "migrate",
                Usage: "Run database migrations",
                Flags: []cli.Flag{
                    &cli.IntFlag{
                        Name:    "steps",
                        Aliases: []string{"n"},
                        Usage:   "Number of migration steps (0=all)",
                        Value:   0,
                    },
                },
                Action: func(c *cli.Context) error {
                    steps := c.Int("steps")
                    fmt.Printf("Running %d migration steps\\n", steps)
                    return nil
                },
            },
        },
    }

    if err := app.Run(os.Args); err != nil {
        log.Fatal(err)
    }
}`,
        explanation: "The bad example uses manual os.Args parsing with a switch, duplicating what urfave/cli handles automatically. The good example defines the entire CLI structure declaratively using structs: an App with Commands, each Command with Flags and an Action. Flags are typed (StringFlag, DurationFlag, IntFlag) with aliases, defaults, usage text, and environment variable fallback via EnvVars. The entire CLI topology is visible in one function call, and app.Run handles argument parsing, help generation, and error display."
      }
    ],
    bestPractices: [
      "Use cli.StringFlag, cli.IntFlag, etc. with EnvVars for flag/env var unification",
      "Use Aliases on flags for short options (--port / -p) following Unix conventions",
      "Return errors from Action handlers instead of calling log.Fatal to keep behavior testable",
      "Set app.HideHelp and app.HideVersion when you need custom help/version behavior",
      "Use Before hooks on commands for validation or setup logic that runs before Action",
      "Use cli.Context methods (c.String, c.Int, c.Duration) for type-safe flag access"
    ],
    commonMistakes: [
      "Accessing os.Args instead of using c.Args() bypasses urfave/cli's parsing",
      "Using cli.BoolFlag without Default: false means it defaults to true in some versions",
      "Not setting EnvVars on flags misses the opportunity for 12-factor app configuration",
      "Using Action instead of a function assigned to Action: misses the cli.Context parameter",
      "Forgetting to check c.Args().Len() when expecting positional arguments"
    ],
    relatedTopics: [
      "cobra",
      "fiber",
      "zap"
    ],
    externalResources: [
      { title: "urfave/cli GitHub Repository", url: "https://github.com/urfave/cli" },
      { title: "urfave/cli Documentation", url: "https://cli.urfave.org/" },
      { title: "urfave/cli v2 Migration Guide", url: "https://cli.urfave.org/v2/getting-started/" }
    ]
  },

  "bubbletea": {
    slug: "bubbletea",
    title: "Bubbletea TUI Framework",
    summary: "Bubbletea is an Elm-architecture-based framework for building terminal user interfaces in Go with composable, testable components.",
    description: `Bubbletea is a Go framework for building terminal user interfaces (TUIs) based on The Elm Architecture (TEA). Created by the Charm team, it follows a model-update-view pattern where your application state is a model struct, user input triggers update functions that return a new model, and the view function renders the current model as a string. This architecture makes TUI code predictable, testable, and composable.

For backend engineers, Bubbletea is valuable for building operator tools, dashboards, database migration CLIs, and interactive debugging utilities. Think of tools like k9s (Kubernetes dashboard), lazygit, or soft-serve (Git server TUI). The framework handles raw terminal input, screen rendering, and alt-screen management while you focus on application logic. Components like text inputs, tables, lists, and progress bars are available as composable "bubbles" from the bubbles library.

In production, Bubbletea is used by Charm (makers of Lip Gloss, Wish, and Glamour) to build a cohesive ecosystem for terminal applications. The library is used in tools like Gum (shell script builder), Mods (AI in the terminal), and numerous open-source developer tools. Its functional update model makes it straightforward to write unit tests—you call update with a model and a message, and assert on the resulting model state without needing a terminal.`,
    keyPoints: [
      "Elm Architecture (model-update-view) provides a predictable, testable state management pattern",
      "Composable components (bubbles) for text inputs, tables, lists, spinners, and progress bars",
      "Alt-screen support for full-screen TUI applications alongside inline mode",
      "Keyboard and mouse input handling with configurable key bindings",
      "Batch processing for multiple simultaneous commands (Cmd returns a []Cmd)",
      "Program can be run in raw terminal, alt-screen, or with custom input/output",
      "Integration with Lip Gloss for terminal styling (colors, borders, alignment)"
    ],
    codeExamples: [
      {
        title: "Bubbletea Counter Application",
        description: "A simple counter showing the model-update-view pattern",
        bad: `package main

import (
    "fmt"
    "os"

    "github.com/charmbracelet/bubbles/textinput"
    tea "github.com/charmbracelet/bubbletea"
)

type model struct {
    input textinput.Model
}

func (m model) Init() tea.Cmd {
    return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    return m, nil
}

func (m model) View() string {
    return "Counter app"
}

func main() {
    p := tea.NewProgram(model{})
    if _, err := p.Run(); err != nil {
        fmt.Fprintf(os.Stderr, "error: %v\\n", err)
        os.Exit(1)
    }
}`,
        good: `package main

import (
    "fmt"
    "os"
    "strconv"

    tea "github.com/charmbracelet/bubbletea"
)

type model struct {
    count int
}

type tickMsg time.Time

func initialModel() model {
    return model{count: 0}
}

func (m model) Init() tea.Cmd {
    return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.KeyMsg:
        switch msg.String() {
        case "ctrl+c", "q":
            return m, tea.Quit
        case "up", "+":
            m.count++
        case "down", "-":
            m.count--
        }
    }
    return m, nil
}

func (m model) View() string {
    s := "Counter: " + strconv.Itoa(m.count) + "\\n\\n"
    s += "Press +/- to change, q to quit\\n"
    return s
}

func main() {
    p := tea.NewProgram(initialModel(), tea.WithAltScreen())
    finalModel, err := p.Run()
    if err != nil {
        fmt.Fprintf(os.Stderr, "error: %v\\n", err)
        os.Exit(1)
    }
    _ = finalModel
}`,
        explanation: "The bad example imports bubbles but doesn't use them properly, has an empty Update function, and doesn't handle any input. The good example defines a complete model-update-view cycle: model holds the count, Update handles keyboard messages (up/+ increments, down/- decrements, q quits), View renders the current state as a string. The tea.KeyMsg type switch handles input. tea.WithAltScreen() runs in full-screen mode. finalModel captures the final state after the program exits."
      }
    ],
    bestPractices: [
      "Keep model state minimal—only store data that affects the view",
      "Return tea.Batch() from Update to handle multiple side effects simultaneously",
      "Use tea.Cmd for side effects (network calls, file I/O) to keep Update pure",
      "Test Update functions by creating a model, calling Update with messages, and asserting state",
      "Use tea.Program.Quit() from within Cmd functions for graceful exit after async operations",
      "Style your views with Lip Gloss for consistent, polished terminal output"
    ],
    commonMistakes: [
      "Performing side effects directly in Update instead of returning a tea.Cmd",
      "Forgetting tea.Batch() when Update needs to trigger multiple commands",
      "Returning a new model without copying unchanged fields in struct updates",
      "Using fmt.Println in View instead of returning a string (View must return the full screen content)",
      "Not handling tea.WindowSizeMsg to support terminal resizing in full-screen apps"
    ],
    relatedTopics: [
      "cobra",
      "urfavecli",
      "packages"
    ],
    externalResources: [
      { title: "Bubbletea GitHub Repository", url: "https://github.com/charmbracelet/bubbletea" },
      { title: "Bubbletea Documentation", url: "https://bubbletea.sh/" },
      { title: "Charm Bubbles (Components)", url: "https://github.com/charmbracelet/bubbles" }
    ]
  },

  "melody": {
    slug: "melody",
    title: "Melody WebSocket Library",
    summary: "Melody is a lightweight WebSocket framework for Go that abstracts connection management, broadcasting, and message routing.",
    description: `Melody is a lightweight, high-performance WebSocket library for Go that simplifies WebSocket server development. Created by Oliver Gong, it provides an abstraction layer on top of Gorilla WebSocket (or nhooyr/websocket) that handles connection lifecycle, message broadcasting, and session management automatically. Instead of dealing with low-level WebSocket upgrade, read/write pumps, and connection maps, Melody lets you focus on message handling logic.

For backend engineer, Melody is valuable when building real-time features like chat applications, live notifications, collaborative editing tools, or WebSocket-based APIs. The library manages a pool of WebSocket connections and provides simple methods for sending messages to individual connections, broadcasting to all connections, or targeting connections matching a filter function. Its OnMessage, OnConnect, and OnDisconnect hooks provide a clean API for handling WebSocket events.

In production, Melody is used in chat applications, live dashboards, and real-time collaboration tools. The library handles ping/pong keep-alive automatically, manages goroutine-per-connection lifecycle, and provides connection metadata storage for associating user IDs or other state with connections. When combined with a framework like Gin or Echo, Melody provides the WebSocket layer without coupling to any specific HTTP framework.`,
    keyPoints: [
      "Simple API: OnMessage, OnConnect, OnDisconnect hooks for event-driven WebSocket handling",
      "Automatic ping/pong keep-alive with configurable interval",
      "Broadcast to all connections or filter connections with a custom filter function",
      "Per-connection metadata storage via session data (Set/Get on connection)",
      "Framework-agnostic—works with Gin, Echo, Fiber, or raw net/http",
      "Handles read/write pump goroutines and connection cleanup automatically",
      "Supports concurrent message sending from multiple goroutines safely"
    ],
    codeExamples: [
      {
        title: "Melody WebSocket Server",
        description: "Setting up a Melody WebSocket server with Gin",
        bad: `package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool { return true },
}

var connections = make(map[*websocket.Conn]bool)

func handleWS(c *gin.Context) {
    conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
    if err != nil {
        return
    }
    connections[conn] = true

    for {
        _, msg, err := conn.ReadMessage()
        if err != nil {
            delete(connections, conn)
            conn.Close()
            return
        }
        for conn := range connections {
            conn.WriteMessage(websocket.TextMessage, msg)
        }
    }
}

func main() {
    r := gin.Default()
    r.GET("/ws", handleWS)
    r.Run(":8080")
}`,
        good: `package main

import (
    "fmt"
    "log"
    "sync"

    "github.com/gin-gonic/gin"
    "github.com/ofuscus/melody"
)

func main() {
    r := gin.Default()
    m := melody.New()

    m.HandleConnect(func(s *melody.Session) {
        log.Printf("Client connected: %s", s.Request.RemoteAddr)
    })

    m.HandleDisconnect(func(s *melody.Session) {
        log.Printf("Client disconnected: %s", s.Request.RemoteAddr)
    })

    m.HandleMessage(func(s *melody.Session, msg []byte) {
        err := m.Broadcast(msg)
        if err != nil {
            log.Printf("broadcast error: %v", err)
        }
    })

    m.HandleMessageBinary(func(s *melody.Session, msg []byte) {
        m.BroadcastBinary(msg)
    })

    m.HandlePong(func(s *melody.Session) {
        log.Printf("Pong received from %s", s.Request.RemoteAddr)
    })

    r.GET("/ws", func(c *gin.Context) {
        err := m.HandleRequest(c.Writer, c.Request)
        if err != nil {
            log.Printf("ws upgrade error: %v", err)
        }
    })

    r.GET("/stats", func(c *gin.Context) {
        count := m.Len()
        c.JSON(200, gin.H{"connections": count})
    })

    r.Run(":8080")
}`,
        explanation: "The bad example manually manages a connections map with a goroutine per connection, handles upgrader configuration, and reads/writes in a loop. This has race conditions on the connections map (no mutex), no ping/pong keep-alive, and manual cleanup. The good example uses Melody which handles all connection management: HandleConnect/HandleDisconnect for lifecycle events, HandleMessage for text messages, HandleMessageBinary for binary, and HandlePong for keep-alive. m.Broadcast(msg) sends to all connections safely. m.Len() gives live connection count. The framework-agnostic HandleRequest works with any HTTP router."
      }
    ],
    bestPractices: [
      "Use HandleMessage for text messages and HandleMessageBinary for binary—don't mix in one handler",
      "Use session metadata (s.Set/s.Get) to associate user IDs with connections for targeted sending",
      "Use m.BroadcastFilter to send messages to specific connections instead of broadcasting to all",
      "Handle upgrade errors explicitly—don't silently ignore failed WebSocket upgrades",
      "Set up ping/pong configuration via m.Config to detect stale connections",
      "Use m.Close() on server shutdown to cleanly disconnect all WebSocket clients"
    ],
    commonMistakes: [
      "Using a shared map without synchronization to track connections causes data races",
      "Not checking m.Broadcast error return value misses failed sends to closed connections",
      "Sending messages outside the HandleMessage handler without checking session state",
      "Forgetting to set ping/pong timeouts means dead connections are never cleaned up",
      "Using Melody with gin.Default() middleware that sets cookies before WebSocket upgrade"
    ],
    relatedTopics: [
      "fiber",
      "centrifugo",
      "melody"
    ],
    externalResources: [
      { title: "Melody GitHub Repository", url: "https://github.com/ofuscus/melody" },
      { title: "Gorilla WebSocket", url: "https://github.com/gorilla/websocket" },
      { title: "Melody Chat Example", url: "https://github.com/ofuscus/melody/tree/master/examples" }
    ]
  },

  "centrifugo": {
    slug: "centrifugo",
    title: "Centrifugo Real-Time Server",
    summary: "Centrifugo is a scalable real-time messaging server supporting WebSockets, SSE, and long-polling with channel-based pub/sub.",
    description: `Centrifugo is an open-source, scalable real-time messaging server written in Go. It implements the Centrifugo protocol and provides WebSocket, Server-Sent Events (SSE), and long-polling transports out of the box. Unlike writing WebSocket handling from scratch, Centrifugo is a standalone service that handles connection management, channel subscriptions, presence tracking, history, and message delivery at scale—while your application server controls authentication and authorization through a server-side API or HTTP callbacks.

For backend engineers, Centrifugo separates real-time transport from your application logic. Your backend (Go, Python, Node.js, etc.) communicates with Centrifugo through an HTTP API or GRPC to subscribe users to channels, broadcast messages, and validate connections. This means your application doesn't need to manage WebSocket connections directly—Centrifugo handles the connection lifecycle, horizontal scaling across nodes, and delivery guarantees. You focus on business logic while Centrifugo handles real-time delivery.

In production, Centrifugo powers real-time features at companies with millions of concurrent connections. It supports channel namespaces for multi-tenant isolation, presence (who's online), history (message replay), join/leave events, and subscription verification via JWT tokens. The server can be deployed as a standalone service or embedded into your Go application using centrifugo library. Its protocol is used by the official Centrifugo client SDKs for JavaScript, React Native, Flutter, Swift, and Android.`,
    keyPoints: [
      "Standalone real-time server with WebSocket, SSE, and long-polling transports",
      "Channel-based pub/sub with namespaces for multi-tenant isolation",
      "Server-side API for subscription control, message broadcasting, and connection management",
      "JWT-based authentication for client connections with per-channel permissions",
      "Presence tracking, history, and join/leave events built-in",
      "Horizontal scaling via Redis or NATS broker for multi-node deployments",
      "Official client SDKs for JavaScript, React Native, Flutter, Go, and more"
    ],
    codeExamples: [
      {
        title: "Centrifugo Server Setup",
        description: "Running Centrifugo standalone with API integration",
        bad: `// Trying to build real-time infrastructure from scratch
// with gorilla/websocket in your application server

var hub = struct {
    sync.RWMutex
    clients map[string]*websocket.Conn
}{clients: make(map[string]*websocket.Conn)}

func handleWS(c *gin.Context) {
    conn, _ := upgrader.Upgrade(c.Writer, c.Request, nil)
    userID := c.Query("user_id")
    hub.Lock()
    hub.clients[userID] = conn
    hub.Unlock()
}

func broadcast(userID string, data []byte) {
    hub.RLock()
    conn := hub.clients[userID]
    hub.RUnlock()
    if conn != nil {
        conn.WriteMessage(websocket.TextMessage, data)
    }
}`,
        good: `package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "time"

    centrifgo "github.com/centrifugal/centrifuge-go"
    "github.com/gin-gonic/gin"
)

func main() {
    // Client connecting to Centrifugo server
    client := centrifgo.NewClient(centrifgo.Config{
        URL: os.Getenv("CENTRIFUGO_URL"),
    })

    sub, err := client.NewSubscription("chat:general")
    if err != nil {
        log.Fatal(err)
    }

    sub.OnPublication(func(e centrifgo.PublicationEvent) {
        var msg struct {
            User string \`json:"user"\`
            Text string \`json:"text"\`
        }
        if err := json.Unmarshal(e.Data, &msg); err == nil {
            fmt.Printf("[%s] %s: %s\\n", e.Channel, msg.User, msg.Text)
        }
    })

    err = sub.Subscribe()
    if err != nil {
        log.Fatal(err)
    }

    // HTTP endpoint to publish via Centrifugo API
    r := gin.Default()
    r.POST("/api/broadcast", func(c *gin.Context) {
        var payload struct {
            Channel string \`json:"channel"\`
            Data    string \`json:"data"\`
        }
        if err := c.ShouldBindJSON(&payload); err != nil {
            c.JSON(400, gin.H{"error": err.Error()})
            return
        }

        ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
        defer cancel()

        data, _ := json.Marshal(map[string]string{"text": payload.Data})
        _, err := client.Publish(ctx, payload.Channel, data)
        if err != nil {
            c.JSON(500, gin.H{"error": err.Error()})
            return
        }
        c.JSON(200, gin.H{"status": "ok"})
    })

    r.Run(":8080")
}`,
        explanation: "The bad example builds a custom WebSocket hub with a map of connections, manual goroutine synchronization, and no scaling support. This won't work across multiple server instances. The good example uses centrifuge-go client library to connect to a Centrifugo server, subscribes to channels with typed event handlers, and publishes messages via the client API. Centrifugo handles all connection management, scaling (via Redis), presence, and delivery. Your application only handles business logic and communicates with Centrifugo through the client library."
      }
    ],
    bestPractices: [
      "Use Centrifugo's server-side API for authorization—never trust client-side channel subscriptions",
      "Deploy Centrifugo behind your load balancer with its own scaling strategy separate from your app",
      "Use channel namespaces to isolate tenant data in multi-tenant applications",
      "Configure Redis or NATS as a broker for horizontal scaling across multiple Centrifugo nodes",
      "Use subscription tokens (JWT) with short expiry and refresh mechanism for secure connections",
      "Monitor Centrifugo with Prometheus metrics for connection count, message rate, and latency"
    ],
    commonMistakes: [
      "Building WebSocket infrastructure from scratch instead of using a battle-tested solution like Centrifugo",
      "Trusting client-provided channel names without server-side authorization validation",
      "Not configuring a message broker (Redis/NATS) means Centrifugo can only run on a single node",
      "Using Centrifugo without TLS in production exposes real-time traffic to interception",
      "Ignoring Centrifugo's presence and history features when they could replace custom implementations"
    ],
    relatedTopics: [
      "melody",
      "fiber",
      "zap"
    ],
    externalResources: [
      { title: "Centrifugo Documentation", url: "https://centrifugal.dev/" },
      { title: "Centrifugo GitHub Repository", url: "https://github.com/centrifugal/centrifugo" },
      { title: "centrifuge-go Client Library", url: "https://github.com/centrifugal/centrifuge-go" }
    ]
  },

  "zap": {
    slug: "zap",
    title: "Zap Structured Logger",
    summary: "Zap is Uber's high-performance, zero-allocation structured logger for Go optimized for speed-critical production environments.",
    description: `Zap is a high-performance, zero-allocation structured logging library for Go, originally developed at Uber. It provides two APIs: a strongly-typed SugaredLogger (with printf-style and printf-free methods) and a zero-allocation Logger that uses zero-allocation encoding for maximum performance. Zap is specifically designed for environments where logging performance matters—its zero-allocation design means logging doesn't add measurable GC pressure even at millions of log lines per second.

For backend engineers, Zap is the go-to choice when logging performance is critical. Its structured logging approach means logs are machine-parseable JSON by default, making them ideal for log aggregation systems like Elasticsearch, Datadog, or Loki. The Logger type uses a memory pool and avoids allocations entirely by using a buffer-based approach with zapcore primitives. The SugaredLogger is slightly slower but offers a more ergonomic API similar to log/slog or logrus.

In production, Zap is used extensively at Uber and by thousands of companies for microservice logging. It integrates with OpenTelemetry for distributed tracing, supports context-aware logging, and provides custom encoding options. The library's design philosophy prioritizes speed and structured data over arbitrary log formatting, which aligns with modern observability practices where logs are indexed and queried rather than read line-by-line.`,
    keyPoints: [
      "Zero-allocation Logger using memory pools and buffer-based encoding for maximum speed",
      "SugaredLogger provides printf/scanf-style API with 10x allocations compared to Logger",
      "Structured logging with typed fields (String, Int, Duration, Error) instead of string concatenation",
      "Highly configurable output: JSON, console, or custom encoders via zapcore",
      "Level-based filtering with dynamic level changing without restart",
      "Built-in support for log sampling to reduce volume in high-throughput systems",
      "Integration with context.Context for request-scoped logging"
    ],
    codeExamples: [
      {
        title: "Zap Logger Setup",
        description: "Configuring Zap for production versus development environments",
        bad: `package main

import (
    "log"
    "time"
)

func handleRequest(userID string, duration time.Duration) {
    log.Println("Processing request for user", userID, "took", duration)
    if duration > time.Second {
        log.Println("WARNING: Slow request detected for user", userID)
    }
    log.Println("Request completed successfully for user", userID)
}`,
        good: `package main

import (
    "os"
    "time"

    "go.uber.org/zap"
    "go.uber.org/zap/zapcore"
)

func main() {
    logger := newLogger("production")
    defer logger.Sync()

    handleRequest(logger, "user-123", 1500*time.Millisecond)
}

func newLogger(env string) *zap.Logger {
    var cfg zap.Config
    if env == "production" {
        cfg = zap.Config{
            Level:       zap.NewAtomicLevelAt(zap.InfoLevel),
            Encoding:    "json",
            OutputPaths: []string{"stdout", "stderr"},
            EncoderConfig: zapcore.EncoderConfig{
                TimeKey:        "ts",
                LevelKey:       "level",
                NameKey:        "logger",
                CallerKey:      "caller",
                MessageKey:     "msg",
                StacktraceKey:  "stacktrace",
                LineEnding:     zapcore.DefaultLineEnding,
                EncodeLevel:    zapcore.LowercaseLevelEncoder,
                EncodeTime:     zapcore.ISO8601TimeEncoder,
                EncodeDuration: zapcore.MillisDurationEncoder,
                EncodeCaller:   zapcore.ShortCallerEncoder,
            },
        }
    } else {
        cfg = zap.NewDevelopmentConfig()
    }

    logger, err := cfg.Build(zap.AddCallerSkip(0))
    if err != nil {
        panic(err)
    }
    return logger
}

func handleRequest(logger *zap.Logger, userID string, duration time.Duration) {
    logger.Info("processing request",
        zap.String("user_id", userID),
        zap.Duration("duration", duration),
    )

    if duration > time.Second {
        logger.Warn("slow request detected",
            zap.String("user_id", userID),
            zap.Duration("duration", duration),
            zap.Duration("threshold", time.Second),
        )
    }

    logger.Info("request completed",
        zap.String("user_id", userID),
        zap.Duration("duration", duration),
        zap.String("status", "success"),
    )
}`,
        explanation: "The bad example uses log.Println with string concatenation—this creates a new string allocation on every log call and produces unstructured output that's hard to parse. The good example configures Zap with JSON encoding for production (machine-readable), ISO8601 timestamps, and lowercase level names. The handleRequest function uses typed fields (zap.String, zap.Duration) which avoids string formatting allocations and produces structured JSON output. Each log line is self-contained with named fields for easy querying in log aggregation systems."
      }
    ],
    bestPractices: [
      "Use Logger (zero-alloc) in hot paths and SugaredLogger for convenience in less critical code",
      "Always call logger.Sync() on application shutdown to flush buffered log entries",
      "Pass logger via context.Context or as a struct field instead of using a global logger",
      "Use typed fields (zap.String, zap.Int, zap.Error) instead of fmt.Sprintf for structured data",
      "Configure log sampling in high-throughput systems to avoid overwhelming log aggregation",
      "Set appropriate log levels per environment: Info for production, Debug for development"
    ],
    commonMistakes: [
      "Using fmt.Sprintf inside log calls defeats structured logging and causes extra allocations",
      "Forgetting logger.Sync() can lose buffered log entries on shutdown",
      "Using SugaredLogger in performance-critical hot paths adds unnecessary allocations",
      "Logging sensitive data (passwords, tokens, PII) in structured fields violates compliance",
      "Not setting a log level means Debug logs flood production and impact performance"
    ],
    relatedTopics: [
      "zerolog",
      "gin",
      "pgx"
    ],
    externalResources: [
      { title: "Zap GitHub Repository", url: "https://github.com/uber-go/zap" },
      { title: "Zap Documentation", url: "https://pkg.go.dev/go.uber.org/zap" },
      { title: "Uber Go Style Guide - Logging", url: "https://github.com/uber-go/guide/blob/master/style.md#force-structured-logging" }
    ]
  },

  "zerolog": {
    slug: "zerolog",
    title: "Zerolog Structured Logger",
    summary: "Zerolog is a zero-allocation JSON logger for Go focused on extreme performance and simplicity for high-throughput systems.",
    description: `Zerolog is a zero-allocation JSON logger for Go, created by Damien Mathieu at Segment. It is optimized for the absolute minimum allocation overhead, even compared to Zap. Zerolog achieves this through a simpler API design that avoids Zap's two-tier Logger/SugaredLogger split and instead provides a single fluent API. The library outputs JSON logs by default and is designed for structured logging in production systems where every allocation counts.

For backend engineers, Zerolog offers the most performance-focused logging experience in Go. Its API is chained fluently: zerolog.New(os.Stdout).With().Timestamp().Logger() creates a logger, and logger.Info().Str("key", "value").Msg("message") writes a log entry. Zerolog uses a memory pool and zero-allocation encoding, making it suitable for millions of log lines per second. Its Context integration supports request-scoped logging with zerolog.Ctx(ctx).

In production, Zerolog is favored in latency-critical systems like trading platforms, gaming servers, and high-frequency API services. The library supports sub-loggers for module-specific logging, log levels, sampling, and custom writers. While Zap has a richer ecosystem and more configuration options, Zerolog excels in scenarios where logging itself must have minimal performance impact.`,
    keyPoints: [
      "Single fluent API—no Logger/SugaredLogger split, just zerolog.Logger",
      "Zero-allocation JSON encoding via memory pools and buffer reuse",
      "Chained field methods: Str, Int, Dur, Err, Interface for structured data",
      "Sub-loggers via logger.With() for module-specific log context",
      "Context integration via zerolog.Ctx(ctx) for request-scoped logging",
      "Sampling support for high-throughput systems to reduce log volume",
      "Custom writers and hooks for filtering, transforming, or routing log output"
    ],
    codeExamples: [
      {
        title: "Zerolog Logger Usage",
        description: "Setting up and using zerolog in a production application",
        bad: `package main

import (
    "fmt"
    "time"
)

func processOrder(orderID string, itemCount int, duration time.Duration) {
    fmt.Printf("[INFO] Processing order %s with %d items\\n", orderID, itemCount)
    if duration > 5*time.Second {
        fmt.Printf("[WARN] Slow order processing: %s took %v\\n", orderID, duration)
    }
    fmt.Printf("[INFO] Order %s completed in %v\\n", orderID, duration)
}`,
        good: `package main

import (
    "os"
    "time"

    "github.com/rs/zerolog"
    "github.com/rs/zerolog/log"
)

func main() {
    logger := zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr}).
        With().
        Timestamp().
        Str("service", "order-service").
        Logger()
    defer logger.Sync()

    processOrder(logger, "ORD-789", 3, 2*time.Second)
}

func processOrder(logger zerolog.Logger, orderID string, itemCount int, duration time.Duration) {
    log := logger.With().
        Str("order_id", orderID).
        Int("item_count", itemCount).
        Logger()

    log.Info().
        Dur("duration", duration).
        Msg("processing order")

    if duration > 5*time.Second {
        log.Warn().
            Dur("duration", duration).
            Str("reason", "slow_processing").
            Msg("slow order processing detected")
    }

    log.Info().
        Dur("duration", duration).
        Str("status", "completed").
        Msg("order processed successfully")
}`,
        explanation: "The bad example uses fmt.Printf with string interpolation—this creates new string allocations on every call and produces unstructured output. The good example creates a zerolog.Logger with ConsoleWriter for human-readable development output and adds service context via With(). Str. For each request, a sub-logger is created with order-specific fields (order_id, item_count) using logger.With(). The chained API (Info().Dur().Msg()) is fluent and zero-allocation. Each log entry is structured JSON with typed fields for easy parsing."
      }
    ],
    bestPractices: [
      "Use logger.With() to create sub-loggers with request-scoped context instead of repeating fields",
      "Use zerolog.Ctx(ctx) to retrieve and enrich a logger stored in context.Context",
      "Call logger.Sync() on application shutdown to flush any buffered output",
      "Use ConsoleWriter for development and plain JSON for production log aggregation",
      "Set zerolog.SetGlobalLevel() to control log verbosity across the entire application",
      "Use logger.Hook() for cross-cutting log concerns like metrics or alerting"
    ],
    commonMistakes: [
      "Using fmt.Sprintf in log messages defeats zero-allocation design and structured logging",
      "Not creating a sub-logger with With() forces repeating common fields on every log call",
      "Using the global log.Logger without configuring it produces default output without context",
      "Logging at Debug level in production without level gating wastes CPU on string formatting",
      "Calling logger.Info().Msg() with an empty message produces unhelpful log entries"
    ],
    relatedTopics: [
      "zap",
      "gin",
      "pgx"
    ],
    externalResources: [
      { title: "Zerolog GitHub Repository", url: "https://github.com/rs/zerolog" },
      { title: "Zerolog Documentation", url: "https://pkg.go.dev/github.com/rs/zerolog" },
      { title: "Zap vs Zerolog Benchmarks", url: "https://github.com/uber-go/zap/issues/776" }
    ]
  },

  "orms--db-access": {
    slug: "orms--db-access",
    title: "ORMs and Database Access Patterns",
    summary: "Comparing raw SQL, query builders, and ORMs in Go for production database access with tradeoffs in performance, type safety, and maintainability.",
    description: `Database access is one of the most critical concerns for backend engineers, and Go offers several approaches: raw SQL with drivers like pgx or database/sql, query builders like squirrel, and ORMs like GORM or Ent. Each approach represents a different point on the spectrum between control and convenience. Understanding when to use each—and their tradeoffs—is essential for building reliable, performant production systems.

Raw SQL with a driver like pgx gives you complete control over queries and the best possible performance. You write SQL directly, bind results manually, and manage connections explicitly. Query builders like squirrel let you compose SQL programmatically with type safety and prevent SQL injection while still generating SQL you can inspect. ORMs like GORM map Go structs to database tables and provide an API that abstracts SQL entirely, which is productive for CRUD operations but can hide performance implications.

For backend engineers, the key decision factors are: query complexity (simple CRUD vs. complex joins), performance requirements (latency-critical paths vs. standard web requests), team familiarity with SQL, and the need for database portability. In practice, most production systems use a combination—ORM for standard CRUD and admin operations, raw SQL or query builders for complex reports and performance-critical paths. The key is understanding the tradeoffs so you can make informed architectural decisions rather than defaulting to one approach.`,
    keyPoints: [
      "Raw SQL (database/sql, pgx) gives maximum control and best performance for complex queries",
      "Query builders (squirrel, goqu) provide type-safe SQL composition without hiding the query",
      "ORMs (GORM, Ent) map structs to tables and provide CRUD abstractions with auto-migration",
      "All approaches should use parameterized queries to prevent SQL injection",
      "Connection pooling via database/sql or pgxpool is critical for production performance",
      "N+1 queries are a common ORM pitfall—use eager loading (Preload, Join) to prevent them",
      "Transactions must be used for multi-table operations regardless of the access approach"
    ],
    codeExamples: [
      {
        title: "Database Access Approaches Compared",
        description: "Same query implemented with raw SQL, query builder, and ORM",
        bad: `package main

import (
    "fmt"
    "github.com/jinzhu/gorm"
)

type Order struct {
    gorm.Model
    UserID uint
    Total  float64
    Status string
}

func findActiveOrders(db *gorm.DB) []Order {
    var orders []Order
    db.Find(&orders)

    // Filter in Go instead of database — wastes memory and CPU
    var active []Order
    for _, o := range orders {
        if o.Status == "active" {
            active = append(active, o)
        }
    }

    // N+1: load user for each order individually
    for i := range active {
        db.Model(&active[i]).Related(&active[i].User)
    }
    return active
}`,
        good: `// Approach 1: Raw SQL with pgx
func findActiveOrdersRaw(ctx context.Context, pool *pgxpool.Pool) ([]Order, error) {
    query := \`
        SELECT o.id, o.user_id, o.total, o.status, o.created_at
        FROM orders o
        WHERE o.status = $1
        ORDER BY o.created_at DESC
        LIMIT 100
    \`
    rows, err := pool.Query(ctx, query, "active")
    if err != nil {
        return nil, fmt.Errorf("query orders: %w", err)
    }
    defer rows.Close()

    var orders []Order
    for rows.Next() {
        var o Order
        if err := rows.Scan(&o.ID, &o.UserID, &o.Total, &o.Status, &o.CreatedAt); err != nil {
            return nil, fmt.Errorf("scan order: %w", err)
        }
        orders = append(orders, o)
    }
    return orders, rows.Err()
}

// Approach 2: GORM with proper querying
func findActiveOrdersGORM(db *gorm.DB) ([]Order, error) {
    var orders []Order
    err := db.
        Where("status = ?", "active").
        Order("created_at DESC").
        Limit(100).
        Preload("User").
        Find(&orders).Error
    if err != nil {
        return nil, fmt.Errorf("query orders: %w", err)
    }
    return orders, nil
}

// Approach 3: Squirrel query builder
func findActiveOrdersSquirrel(db *sql.DB) ([]Order, error) {
    query, args, err := sq.
        Select("id", "user_id", "total", "status", "created_at").
        From("orders").
        Where(sq.Eq{"status": "active"}).
        OrderBy("created_at DESC").
        Limit(100).
        ToSql()
    if err != nil {
        return nil, fmt.Errorf("build query: %w", err)
    }

    rows, err := db.Query(query, args...)
    if err != nil {
        return nil, fmt.Errorf("query orders: %w", err)
    }
    defer rows.Close()
    // ... scan rows into Order structs
    return orders, nil
}`,
        explanation: "The bad example uses GORM but loads all orders and filters in Go (wasteful), and triggers N+1 queries by loading users individually. The good example shows three approaches: (1) Raw SQL with pgx—maximum control, explicit parameter binding with $1, manual scanning; (2) GORM with Where/Limit/Order pushed to the database and Preload for eager loading; (3) Squirrel query builder—type-safe SQL composition with automatic parameterization. All three push filtering to the database and handle errors properly. Choose based on query complexity and performance needs."
      }
    ],
    bestPractices: [
      "Use parameterized queries ($1, ?) with all approaches—never concatenate user input into SQL",
      "Push filtering and sorting to the database—don't load all rows and filter in Go",
      "Use connection pooling (pgxpool, database/sql pool settings) for all database connections",
      "Check rows.Err() after iteration to catch errors that don't appear in row scanning",
      "Use transactions for multi-table operations—don't rely on sequential independent queries",
      "Profile database queries in production using slow query logs or APM tools to find bottlenecks"
    ],
    commonMistakes: [
      "Loading entire tables into memory and filtering in Go instead of using WHERE clauses",
      "N+1 queries from ORM associations—always use Preload or Join for eager loading",
      "Not closing rows after queries leaks database connections from the pool",
      "Using ORM methods without checking error return values means silent data loss",
      "Mixing ORM and raw SQL without understanding connection pool ownership causes connection leaks"
    ],
    relatedTopics: [
      "gorm",
      "pgx",
      "beego"
    ],
    externalResources: [
      { title: "Go database/sql Documentation", url: "https://pkg.go.dev/database/sql" },
      { title: "Squirrel Query Builder", url: "https://github.com/Masterminds/squirrel" },
      { title: "Ent ORM Framework", url: "https://github.com/ent/ent" }
    ]
  }
};
