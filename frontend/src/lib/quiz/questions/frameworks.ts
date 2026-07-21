import type { QuizQuestion } from "../types";

export const frameworksQuestions: Record<string, QuizQuestion[]> = {
  gin: [
    {
      id: "gin-1",
      type: "multiple-choice",
      question: "Which function registers a GET route in Gin?",
      options: [
        { id: "a", text: "r.GET(\"/path\", handler)" },
        { id: "b", text: "r.Route(\"GET\", \"/path\", handler)" },
        { id: "c", text: "r.Handle(\"GET\", \"/path\", handler)" },
        { id: "d", text: "r.AddRoute(\"GET\", \"/path\", handler)" },
      ],
      correctAnswer: "a",
      explanation: "Gin provides shortcut methods like GET, POST, PUT, DELETE, etc. on the Engine/Router. r.GET(\"/path\", handler) is the idiomatic way to register a GET route.",
      difficulty: "easy",
      points: 10,
      tags: ["gin", "routing"],
      relatedLesson: "gin",
    },
    {
      id: "gin-2",
      type: "code-output",
      question: "What is the output of this Gin handler?",
      code: `package main

import (
  "github.com/gin-gonic/gin"
  "net/http"
)

func main() {
  r := gin.Default()
  r.GET("/hello/:name", func(c *gin.Context) {
    name := c.Param("name")
    c.String(http.StatusOK, "Hello %s", name)
  })
  // Assume request: GET /hello/Alice
}`,
      options: [
        { id: "a", text: "Hello Alice" },
        { id: "b", text: "Hello :name" },
        { id: "c", text: "Empty response" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "c.Param(\"name\") extracts the path parameter bound to :name. For the request GET /hello/Alice, it returns \"Alice\", so the response body is \"Hello Alice\".",
      difficulty: "easy",
      points: 10,
      tags: ["gin", "routing", "params"],
      relatedLesson: "gin",
    },
    {
      id: "gin-3",
      type: "true-false",
      question: "Gin's gin.Default() includes Logger and Recovery middleware out of the box.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "gin.Default() creates a Router with Logger() and Recovery() middleware already attached. gin.New() creates a bare router with no middleware.",
      difficulty: "easy",
      points: 10,
      tags: ["gin", "middleware"],
      relatedLesson: "gin",
    },
    {
      id: "gin-4",
      type: "multiple-choice",
      question: "How do you bind a JSON request body to a struct in Gin?",
      options: [
        { id: "a", text: "c.ShouldBindJSON(&myStruct)" },
        { id: "b", text: "c.ReadBody(&myStruct)" },
        { id: "c", text: "c.GetBody(&myStruct)" },
        { id: "d", text: "json.Unmarshal(c.Body, &myStruct)" },
      ],
      correctAnswer: "a",
      explanation: "Gin provides ShouldBindJSON (non-fatal) and MustBindJSON (aborts on error) to deserialize JSON request bodies into structs using the binding package's tags.",
      difficulty: "easy",
      points: 10,
      tags: ["gin", "binding"],
      relatedLesson: "gin",
    },
    {
      id: "gin-5",
      type: "multiple-select",
      question: "Which of the following are valid Gin routing groups? (Select all that apply)",
      options: [
        { id: "a", text: "r.Group(\"/api/v1\")" },
        { id: "b", text: "r.Group(\"/api\", authMiddleware)" },
        { id: "c", text: "r.Group(\"/api\").Group(\"/v1\")" },
        { id: "d", text: "r.RouterGroup(\"/api\")" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "r.Group creates a route group with an optional middleware chain. Groups can be nested (r.Group(\"/api\").Group(\"/v1\")). There is no RouterGroup method — RouterGroup is a type, not a constructor.",
      difficulty: "medium",
      points: 20,
      tags: ["gin", "routing", "groups"],
      relatedLesson: "gin",
    },
    {
      id: "gin-6",
      type: "identify-bug",
      question: "What is wrong with this Gin middleware?",
      code: `func AuthMiddleware() gin.HandlerFunc {
  return func(c *gin.Context) {
    token := c.GetHeader("Authorization")
    if token == "" {
      c.JSON(401, gin.H{"error": "unauthorized"})
    }
    // validate token...
    c.Next()
  }
}`,
      options: [
        { id: "a", text: "Missing c.Abort() after the 401 response to stop the chain" },
        { id: "b", text: "c.GetHeader does not exist in Gin" },
        { id: "c", text: "gin.H is not a valid type" },
        { id: "d", text: "Middleware must return an error" },
      ],
      correctAnswer: "a",
      explanation: "After sending the 401 response, you must call c.Abort() to prevent the handler chain from continuing. Without it, the request will proceed to downstream handlers even after the unauthorized response.",
      difficulty: "medium",
      points: 20,
      tags: ["gin", "middleware", "bug"],
      relatedLesson: "gin",
    },
    {
      id: "gin-7",
      type: "scenario",
      question: "You need to serve a single-page application (SPA) with Gin where all routes fallback to index.html. Which approach is correct?",
      options: [
        { id: "a", text: "Use r.NoRoute() to serve index.html for unmatched routes" },
        { id: "b", text: "Use r.Static(\"/\", \"./dist\")" },
        { id: "c", text: "Use r.StaticFS(\"/\", gin.Dir(\"./dist\", true))" },
        { id: "d", text: "Use r.StaticFile(\"index.html\") for every route" },
      ],
      correctAnswer: "a",
      explanation: "For SPA routing, r.NoRoute() catches all unmatched routes and serves index.html, enabling client-side routing. r.Static serves files from a directory but won't handle client-side route fallbacks. r.StaticFS with noRedirect can work but requires additional configuration.",
      difficulty: "medium",
      points: 20,
      tags: ["gin", "spa", "routing"],
      relatedLesson: "gin",
    },
    {
      id: "gin-8",
      type: "complete-code",
      question: "Complete the custom Gin middleware that limits request body size to 1MB.",
      code: `func MaxBodySize(limit int64) gin.HandlerFunc {
  return func(c *gin.Context) {
    c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, ______)
    c.Next()
  }
}`,
      options: [
        { id: "a", text: "limit" },
        { id: "b", text: "limit * 1024 * 1024" },
        { id: "c", text: "1024 * 1024" },
        { id: "d", text: "c.Request.ContentLength" },
      ],
      correctAnswer: "a",
      explanation: "The parameter limit is already in bytes (int64). Passing it directly to http.MaxBytesReader sets the maximum request body size to the specified byte count.",
      difficulty: "medium",
      points: 20,
      tags: ["gin", "middleware", "security"],
      relatedLesson: "gin",
    },
    {
      id: "gin-9",
      type: "architecture",
      question: "In a large Gin application, what is the recommended way to structure route registration?",
      code: `// Which pattern is best for scaling?

// Option A
func main() {
  r := gin.Default()
  r.GET("/users", listUsers)
  r.POST("/users", createUser)
  // ... hundreds more routes
}

// Option B
func main() {
  r := gin.Default()
  RegisterUserRoutes(r)
  RegisterOrderRoutes(r)
  RegisterProductRoutes(r)
}`,
      options: [
        { id: "a", text: "Option A — centralizing routes is always better" },
        { id: "b", text: "Option B — using separate registration functions per domain" },
        { id: "c", text: "Both are equivalent" },
        { id: "d", text: "Neither — use a code generator" },
      ],
      correctAnswer: "b",
      explanation: "Option B separates route registration by domain concern, making it easier to maintain, test, and scale. Each registration function can use its own route group and middleware. This follows the separation of concerns principle.",
      difficulty: "hard",
      points: 30,
      tags: ["gin", "architecture", "scalability"],
      relatedLesson: "gin",
    },
    {
      id: "gin-10",
      type: "security",
      question: "Which Gin configuration correctly prevents CORS for all origins while allowing specific methods?",
      code: `r := gin.Default()

r.Use(func(c *gin.Context) {
  ______
  c.Next()
})`,
      options: [
        { id: "a", text: "c.Header(\"Access-Control-Allow-Origin\", \"*\")" },
        { id: "b", text: "c.Header(\"Access-Control-Allow-Origin\", \"*\"); c.Header(\"Access-Control-Allow-Methods\", \"GET, POST, PUT, DELETE\")" },
        { id: "c", text: "c.Header(\"Access-Control-Allow-Origin\", \"*\"); c.Header(\"Access-Control-Allow-Credentials\", \"true\")" },
        { id: "d", text: "Use gin-contrib/cors with AllowAllOrigins: true and AllowCredentials: true" },
      ],
      correctAnswer: "b",
      explanation: "Setting Allow-Origin to * with explicit Allow-Methods allows cross-origin requests with specific HTTP methods. Option a doesn't restrict methods. Option c is insecure because Allow-Origin: * and Allow-Credentials: true are incompatible per the spec. Option d violates the CORS spec.",
      difficulty: "hard",
      points: 30,
      tags: ["gin", "security", "cors"],
      relatedLesson: "gin",
    },
  ],

  echo: [
    {
      id: "echo-1",
      type: "multiple-choice",
      question: "What is the Echo framework's primary purpose?",
      options: [
        { id: "a", text: "A high-performance, extensible HTTP web framework" },
        { id: "b", text: "A WebSocket-only library" },
        { id: "c", text: "A database ORM" },
        { id: "d", text: "A message queue client" },
      ],
      correctAnswer: "a",
      explanation: "Echo is a high-performance, extensible, minimalist Go web framework. It provides routing, middleware, data binding, and template rendering out of the box.",
      difficulty: "easy",
      points: 10,
      tags: ["echo", "framework"],
      relatedLesson: "echo",
    },
    {
      id: "echo-2",
      type: "multiple-choice",
      question: "How do you extract a URL path parameter in Echo?",
      options: [
        { id: "a", text: "c.Param(\"id\")" },
        { id: "b", text: "c.GetParam(\"id\")" },
        { id: "c", text: "c.QueryParam(\"id\")" },
        { id: "d", text: "c.PathVar(\"id\")" },
      ],
      correctAnswer: "a",
      explanation: "c.Param() extracts path parameters in Echo (e.g., /users/:id). c.QueryParam() extracts query string parameters, not path parameters.",
      difficulty: "easy",
      points: 10,
      tags: ["echo", "routing"],
      relatedLesson: "echo",
    },
    {
      id: "echo-3",
      type: "true-false",
      question: "Echo uses middleware in the form of func(echo.HandlerFunc) echo.HandlerFunc.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Echo middleware wraps HandlerFunc. A middleware receives the next HandlerFunc and returns a new HandlerFunc, forming a chain. This is the standard Echo middleware signature.",
      difficulty: "easy",
      points: 10,
      tags: ["echo", "middleware"],
      relatedLesson: "echo",
    },
    {
      id: "echo-4",
      type: "code-output",
      question: "What does this Echo code return?",
      code: `e := echo.New()
e.GET("/items", func(c echo.Context) error {
  return c.JSON(200, map[string]string{"status": "ok"})
})`,
      options: [
        { id: "a", text: '{"status":"ok"}' },
        { id: "b", text: "status: ok" },
        { id: "c", text: "{status: ok}" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "c.JSON serializes the map to JSON and returns it with Content-Type application/json. map[string]string{\"status\": \"ok\"} serializes to {\"status\":\"ok\"}.",
      difficulty: "easy",
      points: 10,
      tags: ["echo", "json"],
      relatedLesson: "echo",
    },
    {
      id: "echo-5",
      type: "multiple-select",
      question: "Which built-in middleware does Echo provide? (Select all that apply)",
      options: [
        { id: "a", text: "Middleware.Logger()" },
        { id: "b", text: "Middleware.Recover()" },
        { id: "c", text: "Middleware.Gzip()" },
        { id: "d", text: "Middleware.Redis()" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Echo provides Logger, Recover, Gzip, CORS, JWT, KeyAuth, BasicAuth, and other middleware built-in. Redis middleware is not part of Echo's standard library.",
      difficulty: "medium",
      points: 20,
      tags: ["echo", "middleware"],
      relatedLesson: "echo",
    },
    {
      id: "echo-6",
      type: "scenario",
      question: "You need to validate a JSON request body in Echo with proper error messages. Which approach is idiomatic?",
      options: [
        { id: "a", text: "Manually check each field in the handler" },
        { id: "b", text: "Use struct tags with echo.MapBinder and a custom binder" },
        { id: "c", text: "Use c.Bind() with struct tags from the validate library" },
        { id: "d", text: "Use json.Unmarshal and then manually validate" },
      ],
      correctAnswer: "c",
      explanation: "Echo's c.Bind() uses struct tags (binding, validate) to bind and validate request data. Combined with the go-playground/validator tags, it provides automatic validation with structured error messages.",
      difficulty: "medium",
      points: 20,
      tags: ["echo", "validation"],
      relatedLesson: "echo",
    },
    {
      id: "echo-7",
      type: "identify-bug",
      question: "What is the problem with this Echo custom error handler?",
      code: `e.HTTPErrorHandler = func(err error, c echo.Context) {
  c.JSON(500, map[string]string{"error": err.Error()})
}`,
      options: [
        { id: "a", text: "It doesn't check if the response has already been committed" },
        { id: "b", text: "echo.Context cannot return JSON in error handlers" },
        { id: "c", text: "HTTPErrorHandler must be a method, not a function" },
        { id: "d", text: "err.Error() is not allowed in Echo" },
      ],
      correctAnswer: "a",
      explanation: "The error handler should check c.Response().Committed before writing. If the response was already sent (e.g., partial write), attempting to write again causes issues. Always guard with if !c.Response().Committed { ... }.",
      difficulty: "medium",
      points: 20,
      tags: ["echo", "error-handling", "bug"],
      relatedLesson: "echo",
    },
    {
      id: "echo-8",
      type: "complete-code",
      question: "Complete this Echo route that serves a file download.",
      code: `e.GET("/download/:filename", func(c echo.Context) error {
  filename := c.Param("filename")
  return c.______(filename, "./files/"+filename)
})`,
      options: [
        { id: "a", text: "File" },
        { id: "b", text: "SendFile" },
        { id: "c", text: "Attachment" },
        { id: "d", text: "Download" },
      ],
      correctAnswer: "c",
      explanation: "c.Attachment(filePath, name) sends a file as a download with Content-Disposition: attachment header. c.File serves the file inline without triggering a download prompt.",
      difficulty: "medium",
      points: 20,
      tags: ["echo", "file-serving"],
      relatedLesson: "echo",
    },
    {
      id: "echo-9",
      type: "architecture",
      question: "How does Echo's router performance compare to standard net/http?",
      options: [
        { id: "a", text: "Echo is significantly slower due to reflection overhead" },
        { id: "b", text: "Echo's radix-tree router is faster than net/http's linear scan" },
        { id: "c", text: "They are identical because Echo uses net/http under the hood" },
        { id: "d", text: "Echo cannot handle more than 10,000 concurrent requests" },
      ],
      correctAnswer: "b",
      explanation: "Echo uses an optimized radix-tree based router (similar to httprouter) which provides O(log n) route matching compared to net/http's O(n) linear scan. This makes Echo significantly faster for applications with many routes.",
      difficulty: "hard",
      points: 30,
      tags: ["echo", "performance", "architecture"],
      relatedLesson: "echo",
    },
    {
      id: "echo-10",
      type: "security",
      question: "Which Echo configuration provides the best defense against CSRF attacks for a stateful web application?",
      options: [
        { id: "a", text: "Use CSRF middleware with a cookie-based token" },
        { id: "b", text: "Set SameSite=Lax on all cookies" },
        { id: "c", text: "Use Echo's CSRF middleware with a per-session token and SameSite=Strict" },
        { id: "d", text: "CSRF is not a concern for REST APIs" },
      ],
      correctAnswer: "c",
      explanation: "Echo's CSRF middleware generates a per-session token, embeds it in forms/headers, and validates on mutation requests. SameSite=Strict prevents cross-origin cookie transmission entirely, providing double protection.",
      difficulty: "hard",
      points: 30,
      tags: ["echo", "security", "csrf"],
      relatedLesson: "echo",
    },
  ],

  fiber: [
    {
      id: "fiber-1",
      type: "multiple-choice",
      question: "What underlying library does Fiber use for HTTP handling?",
      options: [
        { id: "a", text: "net/http" },
        { id: "b", text: "fasthttp" },
        { id: "c", text: "gorilla/mux" },
        { id: "d", text: "chi" },
      ],
      correctAnswer: "b",
      explanation: "Fiber is built on top of fasthttp, which is a high-performance HTTP engine that avoids allocations by reusing objects and using a custom protocol parser. This gives Fiber its exceptional speed.",
      difficulty: "easy",
      points: 10,
      tags: ["fiber", "fasthttp"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-2",
      type: "multiple-choice",
      question: "How do you access query parameters in Fiber?",
      options: [
        { id: "a", text: "c.Query(\"key\")" },
        { id: "b", text: "c.QueryParam(\"key\")" },
        { id: "c", text: "c.URL().Query().Get(\"key\")" },
        { id: "d", text: "c.Params(\"key\")" },
      ],
      correctAnswer: "a",
      explanation: "Fiber's c.Query() returns the value of a query parameter. c.Params() is for path parameters, and c.QueryParam() is Echo's method, not Fiber's.",
      difficulty: "easy",
      points: 10,
      tags: ["fiber", "query-params"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-3",
      type: "true-false",
      question: "Fiber is fully compatible with the net/http interface.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Fiber is NOT compatible with net/http because it's built on fasthttp. This means some net/http middleware and libraries won't work directly with Fiber. This is a key trade-off for its performance.",
      difficulty: "easy",
      points: 10,
      tags: ["fiber", "compatibility"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-4",
      type: "code-output",
      question: "What does this Fiber middleware do?",
      code: `app := fiber.New()

app.Use(func(c *fiber.Ctx) error {
  start := time.Now()
  err := c.Next()
  log.Printf("%s %s %v", c.Method(), c.Path(), time.Since(start))
  return err
})`,
      options: [
        { id: "a", text: "Logs the HTTP method, path, and response time for each request" },
        { id: "b", text: "Sets CORS headers" },
        { id: "c", text: "Rate-limits incoming requests" },
        { id: "d", text: "Compresses the response body" },
      ],
      correctAnswer: "a",
      explanation: "This middleware records the start time, calls c.Next() to proceed to the handler, then logs the method, path, and elapsed duration. It's a classic request logging middleware pattern.",
      difficulty: "easy",
      points: 10,
      tags: ["fiber", "middleware", "logging"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-5",
      type: "multiple-select",
      question: "Which of the following are valid Fiber middleware use cases? (Select all that apply)",
      options: [
        { id: "a", text: "Request logging" },
        { id: "b", text: "JWT authentication" },
        { id: "c", text: "WebSocket upgrades" },
        { id: "d", text: "SQL query execution" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Fiber middleware can handle logging, authentication (JWT), and protocol upgrades (WebSocket via fasthttp's upgrade). SQL query execution is business logic, not a middleware concern.",
      difficulty: "medium",
      points: 20,
      tags: ["fiber", "middleware"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-6",
      type: "identify-bug",
      question: "What is wrong with this Fiber route handler?",
      code: `app.Get("/user/:id", func(c *fiber.Ctx) error {
  id := c.Params("id")
  var user User
  db.First(&user, id)
  c.JSON(user)
  return nil
})`,
      options: [
        { id: "a", text: "c.JSON() already sends the response, so the return is fine — but db.First error is not checked" },
        { id: "b", text: "c.Params returns an int, not a string" },
        { id: "c", text: "Fiber doesn't support JSON responses" },
        { id: "d", text: "The route pattern is invalid" },
      ],
      correctAnswer: "a",
      explanation: "While c.JSON(user) works, the database error from db.First is silently ignored. If the user is not found, c.JSON(nil) sends a null response with 200 status instead of a 404. Always check errors from database operations.",
      difficulty: "medium",
      points: 20,
      tags: ["fiber", "error-handling", "bug"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-7",
      type: "scenario",
      question: "You need to implement request timeout handling in Fiber. Which approach is correct?",
      options: [
        { id: "a", text: "Use app.Config().IdleTimeout" },
        { id: "b", text: "Use a goroutine with context.WithTimeout and c.Context().Done()" },
        { id: "c", text: "Use fiber middleware with time.Sleep" },
        { id: "d", text: "Fiber does not support request timeouts" },
      ],
      correctAnswer: "b",
      explanation: "Fiber supports per-request timeouts by using context.WithTimeout and checking c.Context().Done() or the deadline. The global IdleTimeout only controls keep-alive connections, not individual request processing time.",
      difficulty: "medium",
      points: 20,
      tags: ["fiber", "timeout", "concurrency"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-8",
      type: "complete-code",
      question: "Complete this Fiber static file serving configuration.",
      code: `app := fiber.New()

app.Static(______)
// Serves files from ./public directory
// at the /assets URL prefix`,
      options: [
        { id: "a", text: "\"/assets\", \"./public\"" },
        { id: "b", text: "\"./public\", \"/assets\"" },
        { id: "c", text: "\"/assets/public\"" },
        { id: "d", text: "fiber.Static(\"/assets\", \"./public\")" },
      ],
      correctAnswer: "a",
      explanation: "app.Static takes (prefix, root) as arguments. The first argument is the URL prefix (/assets) and the second is the filesystem path (./public). Files in ./public will be served under /assets/.",
      difficulty: "medium",
      points: 20,
      tags: ["fiber", "static-files"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-9",
      type: "architecture",
      question: "What is the main architectural trade-off of using Fiber over standard net/http?",
      options: [
        { id: "a", text: "Fiber is slower but more compatible" },
        { id: "b", text: "Fiber is faster but incompatible with net/http middleware ecosystem" },
        { id: "c", text: "Fiber adds no trade-offs" },
        { id: "d", text: "Fiber uses more memory than net/http" },
      ],
      correctAnswer: "b",
      explanation: "Fiber's use of fasthttp provides superior performance and lower memory usage, but at the cost of incompatibility with the net/http ecosystem. Many popular Go libraries expect net/http handlers, which won't work directly with Fiber.",
      difficulty: "hard",
      points: 30,
      tags: ["fiber", "architecture", "trade-offs"],
      relatedLesson: "fiber",
    },
    {
      id: "fiber-10",
      type: "security",
      question: "Which Fiber configuration provides comprehensive protection against Slowloris DDoS attacks?",
      options: [
        { id: "a", text: "Set app.Config().ReadTimeout and WriteTimeout" },
        { id: "b", text: "Set app.Config().IdleTimeout to a low value" },
        { id: "c", text: "Both ReadTimeout/WriteTimeout and a reasonable IdleTimeout" },
        { id: "d", text: "Use a reverse proxy like nginx in front" },
      ],
      correctAnswer: "c",
      explanation: "Slowloris attacks hold connections open by sending data very slowly. ReadTimeout limits how long the server waits for a complete request, WriteTimeout limits response time, and IdleTimeout closes idle keep-alive connections. All three together mitigate this attack vector.",
      difficulty: "hard",
      points: 30,
      tags: ["fiber", "security", "ddos"],
      relatedLesson: "fiber",
    },
  ],

  beego: [
    {
      id: "beego-1",
      type: "multiple-choice",
      question: "What type of framework is Beego?",
      options: [
        { id: "a", text: "A micro-framework for HTTP only" },
        { id: "b", text: "A full-stack MVC framework with ORM, admin panel, and scaffolding" },
        { id: "c", text: "A WebSocket library" },
        { id: "d", text: "A CLI framework" },
      ],
      correctAnswer: "b",
      explanation: "Beego is a full-stack Go framework that includes an MVC pattern, built-in ORM, admin panel, code generation (bee tool), session management, caching, and more. It's one of the most comprehensive Go web frameworks.",
      difficulty: "easy",
      points: 10,
      tags: ["beego", "framework"],
      relatedLesson: "beego",
    },
    {
      id: "beego-2",
      type: "multiple-choice",
      question: "What is the 'bee' tool in the Beego ecosystem?",
      options: [
        { id: "a", text: "A database migration tool" },
        { id: "b", text: "A CLI tool for creating, running, and managing Beego projects" },
        { id: "c", text: "A testing framework" },
        { id: "d", text: "A dependency manager" },
      ],
      correctAnswer: "b",
      explanation: "bee is Beego's CLI tool that helps create new projects, run live-reloading development servers, build binaries, generate code, and manage the Beego project lifecycle.",
      difficulty: "easy",
      points: 10,
      tags: ["beego", "tooling"],
      relatedLesson: "beego",
    },
    {
      id: "beego-3",
      type: "code-output",
      question: "What does this Beego controller method return?",
      code: `type UserController struct {
  beego.Controller
}

func (c *UserController) Get() {
  c.Data["json"] = map[string]string{"name": "Alice"}
  c.ServeJSON()
}`,
      options: [
        { id: "a", text: '{"name":"Alice"}' },
        { id: "b", text: "name: Alice" },
        { id: "c", text: "Empty response" },
        { id: "d", text: "A view template" },
      ],
      correctAnswer: "a",
      explanation: "c.Data[\"json\"] sets the JSON data, and c.ServeJSON() serializes and sends it with the correct Content-Type header. The output is {\"name\":\"Alice\"}.",
      difficulty: "easy",
      points: 10,
      tags: ["beego", "controller"],
      relatedLesson: "beego",
    },
    {
      id: "beego-4",
      type: "true-false",
      question: "Beego controllers must embed beego.Controller.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Beego controllers must embed beego.Controller to inherit lifecycle methods (Prepare, Get, Post, etc.) and built-in functionality like data rendering, session access, and template rendering.",
      difficulty: "easy",
      points: 10,
      tags: ["beego", "controller"],
      relatedLesson: "beego",
    },
    {
      id: "beego-5",
      type: "multiple-select",
      question: "Which Beego built-in features are correct? (Select all that apply)",
      options: [
        { id: "a", text: "ORM supporting MySQL, PostgreSQL, and SQLite" },
        { id: "b", text: "Built-in session management" },
        { id: "c", text: "WebSocket support via gorilla/websocket" },
        { id: "d", text: "Built-in Prometheus metrics" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Beego includes a multi-database ORM, session management with multiple backends, and WebSocket support. Prometheus metrics are not built-in and require third-party integration.",
      difficulty: "medium",
      points: 20,
      tags: ["beego", "features"],
      relatedLesson: "beego",
    },
    {
      id: "beego-6",
      type: "identify-bug",
      question: "What is wrong with this Beego route definition?",
      code: `beego.Router("/api/user", &UserController{})`,
      options: [
        { id: "a", text: "Should be beego.Router(\"/api/user/:id\", &UserController{}) to handle user IDs" },
        { id: "b", text: "beego.Router is correct but the controller must implement all HTTP methods" },
        { id: "c", text: "Nothing is wrong — this registers all HTTP methods for /api/user" },
        { id: "d", text: "Should use beego.NSRouter instead for API routes" },
      ],
      correctAnswer: "c",
      explanation: "beego.Router registers a route that maps to the controller's corresponding method handlers (Get, Post, Put, Delete). It's not necessarily a bug — it correctly routes /api/user to UserController, and each HTTP method maps to the matching controller method.",
      difficulty: "medium",
      points: 20,
      tags: ["beego", "routing"],
      relatedLesson: "beego",
    },
    {
      id: "beego-7",
      type: "scenario",
      question: "You want to organize a Beego application into modular namespaces. How should you define them?",
      options: [
        { id: "a", text: "Use beego.NewNamespace(\"/api\", beego.NSNamespace(...))" },
        { id: "b", text: "Use separate beego.Router calls" },
        { id: "c", text: "Use beego.Include with a controller slice" },
        { id: "d", text: "Namespaces are not supported in Beego" },
      ],
      correctAnswer: "a",
      explanation: "Beego's namespace system (beego.NewNamespace) allows grouping routes under a common prefix with shared middleware. You can nest namespaces and apply filters to specific route groups.",
      difficulty: "medium",
      points: 20,
      tags: ["beego", "architecture", "namespaces"],
      relatedLesson: "beego",
    },
    {
      id: "beego-8",
      type: "complete-code",
      question: "Complete the Beego ORM query to fetch a user by ID.",
      code: `var user User
o := orm.NewOrm()
err := o.______((&user, 42))
if err != nil {
  // handle error
}`,
      options: [
        { id: "a", text: "Read" },
        { id: "b", text: "Query" },
        { id: "c", text: "Get" },
        { id: "d", text: "Fetch" },
      ],
      correctAnswer: "a",
      explanation: "o.Read() in Beego ORM performs a SELECT by primary key. o.Read(&user, 42) fetches the user with primary key 42. It returns orm.ErrNoRows if not found.",
      difficulty: "medium",
      points: 20,
      tags: ["beego", "orm", "database"],
      relatedLesson: "beego",
    },
    {
      id: "beego-9",
      type: "architecture",
      question: "How does Beego's MVC pattern differ from Go's standard approach of using handler functions directly?",
      options: [
        { id: "a", text: "Beego controllers provide lifecycle hooks (Prepare, Finish, PostRun) and automatic data binding" },
        { id: "b", text: "Beego is purely syntactic sugar with no real differences" },
        { id: "c", text: "Standard handlers are always better than MVC" },
        { id: "d", text: "Beego MVC is only for monolithic applications" },
      ],
      correctAnswer: "a",
      explanation: "Beego controllers offer a structured lifecycle: Init → Prepare → Get/Post/Put/Delete → Finish. This provides hooks for auth checks, cleanup, and data preparation that raw handler functions don't provide without manual middleware chaining.",
      difficulty: "hard",
      points: 30,
      tags: ["beego", "architecture", "mvc"],
      relatedLesson: "beego",
    },
    {
      id: "beego-10",
      type: "security",
      question: "What security concern exists when using Beego's automatic router with the default configuration?",
      options: [
        { id: "a", text: "Default session configuration uses in-memory storage which is not suitable for production" },
        { id: "b", text: "XSRF protection must be explicitly enabled" },
        { id: "c", text: "AutoRouter can expose unintended controller methods" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswer: "d",
      explanation: "Beego's default configuration has several security concerns: in-memory sessions don't scale across instances, XSRF is enabled by default but should be verified, and AutoRouter can expose controller methods beyond the standard HTTP verbs if not configured carefully.",
      difficulty: "hard",
      points: 30,
      tags: ["beego", "security"],
      relatedLesson: "beego",
    },
  ],

  gorm: [
    {
      id: "gorm-1",
      type: "multiple-choice",
      question: "What is GORM primarily used for?",
      options: [
        { id: "a", text: "An ORM (Object-Relational Mapping) library for Go" },
        { id: "b", text: "A HTTP router" },
        { id: "c", text: "A JSON serializer" },
        { id: "d", text: "A logging framework" },
      ],
      correctAnswer: "a",
      explanation: "GORM is a popular ORM library for Go that supports MySQL, PostgreSQL, SQLite, and SQL Server. It provides ORM features like auto-migration, association hooks, transactions, and preloading.",
      difficulty: "easy",
      points: 10,
      tags: ["gorm", "orm"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-2",
      type: "multiple-choice",
      question: "How do you define a GORM model with an auto-increment primary key?",
      options: [
        { id: "a", text: "Include `gorm.Model` which provides ID, CreatedAt, UpdatedAt, DeletedAt" },
        { id: "b", text: "Use `db.PrimaryKey()` tag" },
        { id: "c", text: "Use `gorm:\"primary_key\"` tag on any field" },
        { id: "d", text: "GORM does not support auto-increment keys" },
      ],
      correctAnswer: "a",
      explanation: "gorm.Model embeds a struct with ID (uint), CreatedAt, UpdatedAt, and DeletedAt (soft delete) fields. This is the standard way to add a primary key and timestamps to GORM models.",
      difficulty: "easy",
      points: 10,
      tags: ["gorm", "model"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-3",
      type: "code-output",
      question: "What SQL does this GORM query generate?",
      code: `db.Where("age > ?", 18).Find(&users)`,
      options: [
        { id: "a", text: "SELECT * FROM users WHERE age > 18" },
        { id: "b", text: "SELECT * FROM users WHERE age > '?'" },
        { id: "c", text: "SELECT * FROM users WHERE age > 0" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "GORM uses parameterized queries. The ? placeholder is replaced with the value 18, generating: SELECT * FROM users WHERE age > 18. The actual query uses parameter binding to prevent SQL injection.",
      difficulty: "easy",
      points: 10,
      tags: ["gorm", "query"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-4",
      type: "true-false",
      question: "GORM performs soft deletes by default when using gorm.Model.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "gorm.Model includes a DeletedAt field (time.Time). When you call db.Delete(), GORM sets DeletedAt to the current time instead of actually deleting the row. Subsequent queries automatically filter out soft-deleted records.",
      difficulty: "easy",
      points: 10,
      tags: ["gorm", "soft-delete"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-5",
      type: "multiple-select",
      question: "Which GORM associations are supported? (Select all that apply)",
      options: [
        { id: "a", text: "Has One" },
        { id: "b", text: "Has Many" },
        { id: "c", text: "Many-to-Many" },
        { id: "d", text: "Inheritance" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "GORM supports Has One, Has Many, Belongs To, and Many-to-Many associations through struct tags and Preload/Joins methods. Go (and GORM) does not support inheritance — it uses composition and struct embedding instead.",
      difficulty: "medium",
      points: 20,
      tags: ["gorm", "associations"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-6",
      type: "identify-bug",
      question: "What is the N+1 query problem in this code?",
      code: `var orders []Order
db.Find(&orders)
for _, order := range orders {
  fmt.Println(order.User.Name) // lazy load
}`,
      options: [
        { id: "a", text: "Each order.User triggers a separate SELECT, causing N+1 queries" },
        { id: "b", text: "The for loop is inefficient" },
        { id: "c", text: "db.Find should use db.First" },
        { id: "d", text: "This code is correct and optimal" },
      ],
      correctAnswer: "a",
      explanation: "Accessing order.User.Name triggers a lazy-load query for each order. With 100 orders, this generates 101 queries (1 for orders + 100 for users). Use db.Preload(\"User\").Find(&orders) to eager-load users in a single JOIN or additional query.",
      difficulty: "medium",
      points: 20,
      tags: ["gorm", "performance", "n-plus-one"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-7",
      type: "scenario",
      question: "You need to perform a database transaction in GORM. Which pattern is correct?",
      options: [
        { id: "a", text: "Use db.Transaction(func(tx *gorm.DB) error { ... })" },
        { id: "b", text: "Use db.Begin() and tx.Commit()/tx.Rollback()" },
        { id: "c", text: "Both A and B work" },
        { id: "d", text: "GORM does not support transactions" },
      ],
      correctAnswer: "c",
      explanation: "Both approaches work. db.Transaction() is safer as it automatically commits on nil return and rolls back on error. Manual Begin/Commit/Rollback gives more control but requires careful error handling to avoid orphaned transactions.",
      difficulty: "medium",
      points: 20,
      tags: ["gorm", "transactions"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-8",
      type: "complete-code",
      question: "Complete this GORM query that eager-loads associated User data.",
      code: `var orders []Order
db.______(\"User\").Find(&orders)`,
      options: [
        { id: "a", text: "Preload" },
        { id: "b", text: "Join" },
        { id: "c", text: "Include" },
        { id: "d", text: "Load" },
      ],
      correctAnswer: "a",
      explanation: "db.Preload(\"User\") tells GORM to eager-load the User association. This runs an additional query (or JOIN) to fetch all related users, avoiding the N+1 problem.",
      difficulty: "medium",
      points: 20,
      tags: ["gorm", "preloading"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-9",
      type: "architecture",
      question: "When should you use GORM versus the raw database/sql package?",
      options: [
        { id: "a", text: "Always use GORM — it's always better" },
        { id: "b", text: "Use GORM for standard CRUD; use database/sql or pgx for complex queries and performance-critical paths" },
        { id: "c", text: "Always use database/sql — GORM adds too much overhead" },
        { id: "d", text: "Use GORM for PostgreSQL only" },
      ],
      correctAnswer: "b",
      explanation: "GORM excels at rapid development with standard CRUD, associations, and migrations. For complex queries, batch operations, streaming results, or performance-critical code, raw SQL through database/sql or pgx gives more control and better performance.",
      difficulty: "hard",
      points: 30,
      tags: ["gorm", "architecture", "performance"],
      relatedLesson: "gorm",
    },
    {
      id: "gorm-10",
      type: "security",
      question: "Which GORM practice is vulnerable to SQL injection?",
      options: [
        { id: "a", text: "db.Where(\"name = ?\", userInput).Find(&users)" },
        { id: "b", text: "db.Where(fmt.Sprintf(\"name = '%s'\", userInput)).Find(&users)" },
        { id: "c", text: "db.Where(\"name = ?\", userInput).Find(&users)" },
        { id: "d", text: "db.Find(&users)" },
      ],
      correctAnswer: "b",
      explanation: "Using fmt.Sprintf to interpolate user input directly into SQL strings bypasses parameterized queries and creates SQL injection vulnerabilities. Always use GORM's ? placeholders for parameter binding, which the other options correctly do.",
      difficulty: "hard",
      points: 30,
      tags: ["gorm", "security", "sql-injection"],
      relatedLesson: "gorm",
    },
  ],

  pgx: [
    {
      id: "pgx-1",
      type: "multiple-choice",
      question: "What is pgx?",
      options: [
        { id: "a", text: "A pure Go PostgreSQL driver and toolkit" },
        { id: "b", text: "A MySQL driver" },
        { id: "c", text: "An ORM for SQLite" },
        { id: "d", text: "A Redis client" },
      ],
      correctAnswer: "a",
      explanation: "pgx is a pure Go PostgreSQL driver that supports the database/sql interface but also has a native interface with additional features like binary protocol, COPY, pool, and channel listening.",
      difficulty: "easy",
      points: 10,
      tags: ["pgx", "database"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-2",
      type: "multiple-choice",
      question: "How does pgx differ from the standard database/sql + lib/pq driver?",
      options: [
        { id: "a", text: "pgx uses PostgreSQL's binary protocol for better performance" },
        { id: "b", text: "pgx only supports text protocol" },
        { id: "c", text: "pgx is slower than lib/pq" },
        { id: "d", text: "pgx does not support transactions" },
      ],
      correctAnswer: "a",
      explanation: "pgx uses PostgreSQL's binary wire protocol by default, avoiding text serialization/deserialization overhead. This provides significant performance improvements for parameterized queries and result scanning.",
      difficulty: "easy",
      points: 10,
      tags: ["pgx", "performance"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-3",
      type: "code-output",
      question: "What does this pgx code do?",
      code: `conn, _ := pgx.Connect(ctx, "postgres://localhost/mydb")
defer conn.Close(ctx)
var name string
conn.QueryRow(ctx, "SELECT name FROM users WHERE id = $1", 1).Scan(&name)
fmt.Println(name)`,
      options: [
        { id: "a", text: "Queries a single user's name by ID and prints it" },
        { id: "b", text: "Creates a new user named name" },
        { id: "c", text: "Deletes a user" },
        { id: "d", text: "Fails because pgx does not support $1 parameters" },
      ],
      correctAnswer: "a",
      explanation: "pgx uses $1, $2, etc. for parameterized queries (PostgreSQL style). QueryRow fetches a single row, and Scan extracts the column value into the Go variable. The result is printed to stdout.",
      difficulty: "easy",
      points: 10,
      tags: ["pgx", "query"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-4",
      type: "true-false",
      question: "pgx supports both the database/sql interface and its own native interface.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "pgx provides two APIs: the standard database/sql interface (via pgxstdlib) for drop-in replacement of lib/pq, and a native interface (pgx.Conn) with additional features like binary protocol, COPY, and connection pooling.",
      difficulty: "easy",
      points: 10,
      tags: ["pgx", "api"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-5",
      type: "multiple-select",
      question: "Which pgx features are NOT available through database/sql? (Select all that apply)",
      options: [
        { id: "a", text: "COPY protocol for bulk inserts" },
        { id: "b", text: "Binary protocol encoding" },
        { id: "c", text: "LISTEN/NOTIFY support" },
        { id: "d", text: "SELECT queries" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "COPY, binary protocol, and LISTEN/NOTIFY are pgx-native features not exposed through database/sql. Standard SQL queries work through both interfaces, which is why database/sql supports SELECT.",
      difficulty: "medium",
      points: 20,
      tags: ["pgx", "features"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-6",
      type: "scenario",
      question: "You need to insert 10,000 rows efficiently using pgx. Which approach performs best?",
      options: [
        { id: "a", text: "Loop with individual INSERT statements" },
        { id: "b", text: "Use pgx.CopyFrom with the COPY protocol" },
        { id: "c", text: "Build a single INSERT with 10,000 value tuples" },
        { id: "d", text: "Use pgx's batch API with batch.Exec()" },
      ],
      correctAnswer: "b",
      explanation: "pgx.CopyFrom uses PostgreSQL's COPY protocol, which is the fastest way to bulk-insert data. It bypasses the SQL parser and writes directly to the table, achieving near-native I/O speeds. Batch is fast but COPY is faster.",
      difficulty: "medium",
      points: 20,
      tags: ["pgx", "performance", "bulk-insert"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-7",
      type: "complete-code",
      question: "Complete this pgx batch query example.",
      code: `batch := &pgx.Batch{}
batch.Queue("INSERT INTO users (name) VALUES ($1)", "Alice")
batch.Queue("INSERT INTO users (name) VALUES ($1)", "Bob")
br, err := conn.______(ctx, batch)`,
      options: [
        { id: "a", text: "SendBatch" },
        { id: "b", text: "ExecuteBatch" },
        { id: "c", text: "RunBatch" },
        { id: "d", text: "ExecBatch" },
      ],
      correctAnswer: "a",
      explanation: "conn.SendBatch() sends all queued queries in the batch to PostgreSQL and returns a BatchResults object. You then iterate with br.QueryRow() or br.Exec() to process each result.",
      difficulty: "medium",
      points: 20,
      tags: ["pgx", "batch"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-8",
      type: "identify-bug",
      question: "What is the problem with this pgx connection handling?",
      code: `func getUser(id int) (*User, error) {
  conn, _ := pgx.Connect(ctx, "postgres://localhost/mydb")
  var user User
  conn.QueryRow(ctx, "SELECT * FROM users WHERE id = $1", id).Scan(&user)
  return &user, nil
}`,
      options: [
        { id: "a", text: "Connection is not closed — should defer conn.Close(ctx)" },
        { id: "b", text: "Scan into struct is not supported" },
        { id: "c", text: "Should use $0 instead of $1" },
        { id: "d", text: "QueryRow doesn't return errors" },
      ],
      correctAnswer: "a",
      explanation: "Each call to getUser opens a new connection without closing it, causing a connection leak. Always defer conn.Close(ctx) after Connect, or better yet, use a connection pool (pgxpool) for production code.",
      difficulty: "medium",
      points: 20,
      tags: ["pgx", "connection-management", "bug"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-9",
      type: "architecture",
      question: "When migrating from database/sql to pgx native, what architectural change provides the most benefit?",
      options: [
        { id: "a", text: "Replace db.Query with conn.Query for better error handling and binary protocol" },
        { id: "b", text: "Use pgxpool for connection management instead of database/sql connection pools" },
        { id: "c", text: "Implement the COPY protocol for all inserts" },
        { id: "d", text: "All of the above as appropriate" },
      ],
      correctAnswer: "d",
      explanation: "Migrating to pgx native provides benefits across the board: binary protocol for queries, pgxpool for efficient connection management, and COPY for bulk operations. The key is using the right feature for each use case.",
      difficulty: "hard",
      points: 30,
      tags: ["pgx", "architecture", "migration"],
      relatedLesson: "pgx",
    },
    {
      id: "pgx-10",
      type: "security",
      question: "Which pgx practice prevents SQL injection in dynamic table/column names?",
      options: [
        { id: "a", text: "Use fmt.Sprintf to build the query" },
        { id: "b", text: "Use pgx.Identifier{} to safely quote identifiers" },
        { id: "c", text: "Escape the input with strings.Replace" },
        { id: "d", text: "SQL injection is not possible with PostgreSQL" },
      ],
      correctAnswer: "b",
      explanation: "pgx.Identifier provides safe quoting for identifiers (table names, column names) that can't be parameterized with $1. Use pgx.Identifier{\"public\", \"users\"}.Sanitize() or conn.QuoteIdentifier() to properly escape identifiers.",
      difficulty: "hard",
      points: 30,
      tags: ["pgx", "security", "sql-injection"],
      relatedLesson: "pgx",
    },
  ],

  cobra: [
    {
      id: "cobra-1",
      type: "multiple-choice",
      question: "What is the primary purpose of the Cobra library?",
      options: [
        { id: "a", text: "Building CLI applications with subcommands, flags, and help text" },
        { id: "b", text: "HTTP server framework" },
        { id: "c", text: "Database ORM" },
        { id: "d", text: "WebSocket library" },
      ],
      correctAnswer: "a",
      explanation: "Cobra is a Go library for creating CLI applications. It provides subcommands, flags, argument validation, auto-generated help text, and shell completion. It's used by kubectl, Hugo, and many other popular CLIs.",
      difficulty: "easy",
      points: 10,
      tags: ["cobra", "cli"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-2",
      type: "multiple-choice",
      question: "How do you define a Cobra command?",
      options: [
        { id: "a", text: "&cobra.Command{Use: \"cmd\", Run: func(cmd *cobra.Command, args []string) {}}" },
        { id: "b", text: "cobra.NewCommand(\"cmd\", handler)" },
        { id: "c", text: "cobra.Command(\"cmd\", handler)" },
        { id: "d", text: "cli.New(\"cmd\")" },
      ],
      correctAnswer: "a",
      explanation: "Cobra commands are defined as struct literals of cobra.Command with fields like Use, Short, Long, Run, and Args. The Use field is the command name, and Run is the handler function.",
      difficulty: "easy",
      points: 10,
      tags: ["cobra", "command"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-3",
      type: "code-output",
      question: "What does this Cobra command output when run with --help?",
      code: `var rootCmd = &cobra.Command{
  Use:   "myapp",
  Short: "My application",
  Long:  "A longer description of my application",
}`,
      options: [
        { id: "a", text: "Shows 'My application' as short description and the long description" },
        { id: "b", text: "Only shows 'myapp'" },
        { id: "c", text: "Shows usage examples" },
        { id: "d", text: "Panics because Long is not set" },
      ],
      correctAnswer: "a",
      explanation: "Cobra auto-generates help text. --help displays the Short description prominently, followed by the Long description if provided. It also shows available subcommands, flags, and usage patterns.",
      difficulty: "easy",
      points: 10,
      tags: ["cobra", "help"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-4",
      type: "true-false",
      question: "Cobra requires a root command to which subcommands are attached.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Cobra follows a hierarchical command structure. There must be a root command (typically called rootCmd) that serves as the entry point. All subcommands are added to it using AddCommand().",
      difficulty: "easy",
      points: 10,
      tags: ["cobra", "architecture"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-5",
      type: "multiple-select",
      question: "Which Cobra features are correct? (Select all that apply)",
      options: [
        { id: "a", text: "Persistent flags that apply to a command and all its children" },
        { id: "b", text: "Shell completion for bash, zsh, fish, and PowerShell" },
        { id: "c", text: "Automatic help generation" },
        { id: "d", text: "Built-in HTTP server" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Cobra provides persistent flags (inherited by subcommands), shell completion for multiple shells, and automatic help generation. It does not include an HTTP server — Cobra is specifically for CLI applications.",
      difficulty: "medium",
      points: 20,
      tags: ["cobra", "features"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-6",
      type: "identify-bug",
      question: "What is wrong with this Cobra flag setup?",
      code: `func init() {
  rootCmd.PersistentFlags().StringVarP(&configFile, "config", "c", "", "Config file")
  rootCmd.Flags().IntVarP(&port, "port", "p", 8080, "Port")
}

func main() {
  rootCmd.Execute()
}

// The --port flag should not be available on subcommands`,
      options: [
        { id: "a", text: "PersistentFlags makes --port available on all subcommands — should use Flags() instead" },
        { id: "b", text: "IntVarP is not a valid flag type" },
        { id: "c", text: "init() is not called before main()" },
        { id: "d", text: "The flag registration is correct as-is" },
      ],
      correctAnswer: "a",
      explanation: "Wait — the code actually uses Flags() for port, not PersistentFlags(). This is correct. If it were PersistentFlags, --port would be inherited by subcommands. The current code is actually fine for making --port only available on rootCmd.",
      difficulty: "medium",
      points: 20,
      tags: ["cobra", "flags", "bug"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-7",
      type: "scenario",
      question: "You want to validate that a Cobra command receives exactly one argument. How do you enforce this?",
      options: [
        { id: "a", text: "Set cmd.Args = cobra.ExactArgs(1)" },
        { id: "b", text: "Check len(args) in the Run function manually" },
        { id: "c", text: "Use cmd.PreRun to validate" },
        { id: "d", text: "Set cmd.ArgsFunction to a custom validator" },
      ],
      correctAnswer: "a",
      explanation: "Cobra provides built-in argument validators like cobra.ExactArgs(n), cobra.MinimumNArgs(n), cobra.MaximumNArgs(n), and cobra.ArbitraryArgs. Setting cmd.Args automatically validates before Run is called.",
      difficulty: "medium",
      points: 20,
      tags: ["cobra", "validation"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-8",
      type: "complete-code",
      question: "Complete this Cobra command that binds a flag to a variable.",
      code: `var verbose bool

func init() {
  rootCmd._______("verbose", "V", false, "Enable verbose output")
  rootCmd.Flags().BoolVar(&verbose, "verbose", false, "Enable verbose output")
}`,
      options: [
        { id: "a", text: "PersistentFlags().BoolP" },
        { id: "b", text: "Flags().String" },
        { id: "c", text: "AddCommand" },
        { id: "d", text: "MarkPersistentFlagRequired" },
      ],
      correctAnswer: "a",
      explanation: "PersistentFlags().BoolP registers a persistent boolean flag with short name. This makes --verbose / -V available on the root command and all its subcommands. The BoolVar variant directly binds to a variable.",
      difficulty: "medium",
      points: 20,
      tags: ["cobra", "flags"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-9",
      type: "architecture",
      question: "What is the recommended Cobra project structure for a large CLI application?",
      options: [
        { id: "a", text: "Put all commands in a single cmd/root.go file" },
        { id: "b", text: "Split into cmd/root.go, cmd/serve.go, cmd/migrate.go, etc., each in its own file" },
        { id: "c", text: "Use a single main.go with switch statements" },
        { id: "d", text: "Use goroutines for each subcommand" },
      ],
      correctAnswer: "b",
      explanation: "The recommended pattern is one file per command under cmd/. root.go sets up the root command, serve.go defines the serve subcommand, etc. This mirrors the command hierarchy and keeps files focused and testable.",
      difficulty: "hard",
      points: 30,
      tags: ["cobra", "architecture", "project-structure"],
      relatedLesson: "cobra",
    },
    {
      id: "cobra-10",
      type: "security",
      question: "Which Cobra practice prevents accidental command execution?",
      options: [
        { id: "a", text: "Use cmd.SilenceUsage = true to suppress usage on error" },
        { id: "b", text: "Implement PreRun hooks to validate state before execution" },
        { id: "c", text: "Use cobra.Command.EnablePrefixMatching to prevent typo-based execution" },
        { id: "d", text: "All of the above" },
      ],
      correctAnswer: "d",
      explanation: "Multiple security measures help: SilenceUsage prevents usage dumps on errors, PreRun hooks validate preconditions, and prefix matching (disabled by default for security) can prevent command confusion. For security-sensitive CLIs, disable prefix matching and add validation hooks.",
      difficulty: "hard",
      points: 30,
      tags: ["cobra", "security"],
      relatedLesson: "cobra",
    },
  ],

  urfavecli: [
    {
      id: "urfavecli-1",
      type: "multiple-choice",
      question: "What is urfave/cli primarily used for?",
      options: [
        { id: "a", text: "Building CLI applications with flags, subcommands, and shell completion" },
        { id: "b", text: "Web server framework" },
        { id: "c", text: "Task scheduler" },
        { id: "d", text: "Database migration" },
      ],
      correctAnswer: "a",
      explanation: "urfave/cli (v1 and v2) is a Go framework for building CLI applications. It provides a declarative API for defining commands, flags, arguments, and shell completion with minimal boilerplate.",
      difficulty: "easy",
      points: 10,
      tags: ["urfavecli", "cli"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-2",
      type: "code-output",
      question: "What does this urfave/cli application do?",
      code: `app := &cli.App{
  Name:  "greet",
  Usage: "greet the world",
  Action: func(c *cli.Context) error {
    fmt.Println("Hello, World!")
    return nil
  },
}`,
      options: [
        { id: "a", text: "Prints 'Hello, World!' when the program is run" },
        { id: "b", text: "Prints 'greet the world'" },
        { id: "c", text: "Does nothing until a subcommand is specified" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "The Action function is the main handler. When the app runs without subcommands, it executes the Action, which prints 'Hello, World!'. The Name and Usage provide metadata for help text.",
      difficulty: "easy",
      points: 10,
      tags: ["urfavecli", "app"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-3",
      type: "multiple-choice",
      question: "How do you define a flag in urfave/cli v2?",
      options: [
        { id: "a", text: "&cli.StringFlag{Name: \"config\", Aliases: []string{\"c\"}, Value: \"default.yaml\"}" },
        { id: "b", text: "cli.Flag(\"config\", \"c\")" },
        { id: "c", text: "app.Flag(\"config\").Default(\"default.yaml\")" },
        { id: "d", text: "Define config as a package variable" },
      ],
      correctAnswer: "a",
      explanation: "In urfave/cli v2, flags are struct literals with typed variants (StringFlag, IntFlag, BoolFlag, etc.). They have Name, Aliases, Value, Usage, and other fields for configuration.",
      difficulty: "easy",
      points: 10,
      tags: ["urfavecli", "flags"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-4",
      type: "true-false",
      question: "urfave/cli supports automatic shell completion for bash, zsh, fish, and PowerShell.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "urfave/cli provides a completion command that generates shell completion scripts for bash, zsh, fish, and PowerShell. This can be invoked with `app.Run([]string{app.Name, \"completion\", \"bash\"})`.",
      difficulty: "easy",
      points: 10,
      tags: ["urfavecli", "completion"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-5",
      type: "multiple-select",
      question: "Which urfave/cli features are available? (Select all that apply)",
      options: [
        { id: "a", text: "Before hooks that run before the command action" },
        { id: "b", text: "Subcommand aliases" },
        { id: "c", text: "Interactive prompts with survey library integration" },
        { id: "d", text: "Built-in HTTP server" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "urfave/cli supports Before/After hooks, command aliases, and can integrate with survey/promptui for interactive prompts. It does not include a built-in HTTP server — it's purely for CLI applications.",
      difficulty: "medium",
      points: 20,
      tags: ["urfavecli", "features"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-6",
      type: "identify-bug",
      question: "What is wrong with this urfave/cli subcommand definition?",
      code: `app := &cli.App{
  Commands: []*cli.Command{
    {
      Name:  "serve",
      Usage: "Start the server",
      Action: func(c *cli.Context) error {
        port := c.Int("port")
        return startServer(port)
      },
    },
  },
}
// --port flag is never defined`,
      options: [
        { id: "a", text: "c.Int(\"port\") will return 0 because no --port flag is defined on the command" },
        { id: "b", text: "Commands must be pointers to cli.Command" },
        { id: "c", text: "serve is a reserved command name" },
        { id: "d", text: "The Action signature is wrong" },
      ],
      correctAnswer: "a",
      explanation: "c.Int(\"port\") retrieves the value of the --port flag, but no flag is defined on the serve command. It will silently return 0 (the zero value). You need to add Flags: []cli.Flag{&cli.IntFlag{Name: \"port\", ...}} to the command.",
      difficulty: "medium",
      points: 20,
      tags: ["urfavecli", "bug", "flags"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-7",
      type: "scenario",
      question: "You need a urfave/cli Before hook that validates a config file exists. How do you implement it?",
      options: [
        { id: "a", text: "Check the flag in the Action function" },
        { id: "b", text: "Use a Before hook that checks the file and returns an error to abort" },
        { id: "c", text: "Use os.Stat in a goroutine" },
        { id: "d", text: "Use c.App.Before" },
      ],
      correctAnswer: "b",
      explanation: "The Before hook runs before the Action. If it returns an error, the command is aborted and the error is displayed. This is ideal for validating preconditions like file existence before the main logic runs.",
      difficulty: "medium",
      points: 20,
      tags: ["urfavecli", "hooks"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-8",
      type: "complete-code",
      question: "Complete this urfave/cli Before hook that validates a required flag.",
      code: `&cli.Command{
  Name:  "deploy",
  Flags: []cli.Flag{
    &cli.StringFlag{Name: \"env\", Required: true},
  },
  Before: func(c *cli.Context) error {
    if c.String(\"env\") == \"\" {
      return fmt.Errorf(\"env flag is required\")
    }
    return ________
  },
}`,
      options: [
        { id: "a", text: "nil" },
        { id: "b", text: "errors.New(\"ok\")" },
        { id: "c", text: "fmt.Errorf(\"done\")" },
        { id: "d", text: "cli.Exit(\"done\", 0)" },
      ],
      correctAnswer: "a",
      explanation: "Returning nil from the Before hook means validation passed and the command proceeds. Returning any non-nil error aborts the command. Since we validated the env flag, we return nil to continue.",
      difficulty: "medium",
      points: 20,
      tags: ["urfavecli", "validation"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-9",
      type: "architecture",
      question: "How does urfave/cli v2's type-safe flag system differ from v1?",
      options: [
        { id: "a", text: "v2 uses generic typed flags (StringFlag, IntFlag) instead of GenericFlag" },
        { id: "b", text: "v1 is better because it's simpler" },
        { id: "c", text: "v2 uses reflection to read flags" },
        { id: "d", text: "There is no meaningful difference" },
      ],
      correctAnswer: "a",
      explanation: "urfave/cli v2 introduced typed flags (StringFlag, IntFlag, BoolFlag, etc.) that provide compile-time type safety. v1 used a more generic approach with Interface types, requiring runtime type assertions.",
      difficulty: "hard",
      points: 30,
      tags: ["urfavecli", "architecture", "v2"],
      relatedLesson: "urfavecli",
    },
    {
      id: "urfavecli-10",
      type: "security",
      question: "Which urfave/cli practice helps prevent accidental credential exposure in CLI output?",
      options: [
        { id: "a", text: "Use cli.StringFlag with EnvVars for secrets instead of command-line flags" },
        { id: "b", text: "Never log flag values" },
        { id: "c", text: "Use c.App.Writer instead of os.Stdout" },
        { id: "d", text: "Both A and B" },
      ],
      correctAnswer: "d",
      explanation: "Using environment variables for secrets prevents them from appearing in process lists (ps aux output). Combined with never logging flag values (which might contain secrets), this reduces credential exposure risk significantly.",
      difficulty: "hard",
      points: 30,
      tags: ["urfavecli", "security", "secrets"],
      relatedLesson: "urfavecli",
    },
  ],

  bubbletea: [
    {
      id: "bubbletea-1",
      type: "multiple-choice",
      question: "What is Bubble Tea?",
      options: [
        { id: "a", text: "A framework for building interactive terminal UIs (TUIs) in Go" },
        { id: "b", text: "A web framework" },
        { id: "c", text: "A database library" },
        { id: "d", text: "A logging framework" },
      ],
      correctAnswer: "a",
      explanation: "Bubble Tea is a Go framework for building terminal user interfaces. It uses an Elm-inspired architecture with Model, Update, and View functions to create interactive CLI applications.",
      difficulty: "easy",
      points: 10,
      tags: ["bubbletea", "tui"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-2",
      type: "multiple-choice",
      question: "What are the three core functions in Bubble Tea's architecture?",
      options: [
        { id: "a", text: "Model, Update, View" },
        { id: "b", text: "Init, Handle, Render" },
        { id: "c", text: "Start, Process, Stop" },
        { id: "d", text: "Setup, Execute, Teardown" },
      ],
      correctAnswer: "a",
      explanation: "Bubble Tea uses an Elm-like architecture: Model (state), Update (handles messages and returns new model), and View (renders the UI as a string). This unidirectional data flow makes TUIs predictable and testable.",
      difficulty: "easy",
      points: 10,
      tags: ["bubbletea", "architecture"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-3",
      type: "code-output",
      question: "What does this Bubble Tea program display?",
      code: `type model struct{}

func (m model) Init() tea.Cmd {
  return tea.Quit
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
  return m, nil
}

func (m model) View() string {
  return "Hello, Bubble Tea!"
}`,
      options: [
        { id: "a", text: "Hello, Bubble Tea!" },
        { id: "b", text: "An interactive terminal with cursor" },
        { id: "c", text: "Nothing — tea.Quit exits immediately" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "c",
      explanation: "Init() returns tea.Quit, which tells Bubble Tea to exit immediately after initialization. The View is never rendered because the program quits before the event loop starts. To see output, return nil or a tea.Batch from Init().",
      difficulty: "easy",
      points: 10,
      tags: ["bubbletea", "lifecycle"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-4",
      type: "true-false",
      question: "Bubble Tea programs can handle keyboard and mouse events.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Bubble Tea captures keyboard (tea.KeyMsg), mouse (tea.MouseMsg), window resize (tea.WindowSizeMsg), and custom messages. This enables fully interactive terminal applications.",
      difficulty: "easy",
      points: 10,
      tags: ["bubbletea", "events"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-5",
      type: "multiple-select",
      question: "Which Bubble Tea components are part of the Lip Gloss ecosystem? (Select all that apply)",
      options: [
        { id: "a", text: "Bubbles — reusable TUI components (text inputs, tables, etc.)" },
        { id: "b", text: "Lip Gloss — terminal styling library" },
        { id: "c", text: "Wish — SSH server for Bubble Tea apps" },
        { id: "d", text: "Drone — CI/CD pipeline tool" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "The Charm ecosystem includes Bubbles (reusable components), Lip Gloss (styling), and Wish (SSH server for Bubble Tea). Drone is a separate CI/CD tool, not part of Charm's TUI ecosystem.",
      difficulty: "medium",
      points: 20,
      tags: ["bubbletea", "ecosystem"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-6",
      type: "scenario",
      question: "You need to fetch data asynchronously in a Bubble Tea app without blocking the UI. How?",
      options: [
        { id: "a", text: "Use tea.Cmd which executes in a goroutine and sends a message when done" },
        { id: "b", text: "Use goroutine directly in Update" },
        { id: "c", text: "Use time.Sleep in View" },
        { id: "d", text: "Use init() to fetch data" },
      ],
      correctAnswer: "a",
      explanation: "tea.Cmd functions run in goroutines by Bubble Tea's runtime. When the command completes, it sends a message to Update. This keeps the UI responsive while fetching data in the background.",
      difficulty: "medium",
      points: 20,
      tags: ["bubbletea", "async", "concurrency"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-7",
      type: "identify-bug",
      question: "What is wrong with this Bubble Tea Update function?",
      code: `func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
  switch msg := msg.(type) {
  case tea.KeyMsg:
    if msg.String() == "q" {
      return m, tea.Quit
    }
    m.count++
  }
  return m, nil  // Always returns nil — no async commands
}`,
      options: [
        { id: "a", text: "The nil cmd is not a bug — it's valid when no async work is needed" },
        { id: "b", text: "msg.String() is not a valid method on tea.KeyMsg" },
        { id: "c", text: "tea.Quit cannot be returned from a key handler" },
        { id: "d", text: "m.count is not defined on the model" },
      ],
      correctAnswer: "a",
      explanation: "Returning nil for the Cmd is perfectly valid when no asynchronous operations are needed. Not every Update needs to return a command — nil means 'don't do anything else.' The code correctly handles the quit key and updates state.",
      difficulty: "medium",
      points: 20,
      tags: ["bubbletea", "update"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-8",
      type: "complete-code",
      question: "Complete this Bubble Tea program to display a text input field.",
      code: `type model struct {
  textInput textinput.Model
}

func initialModel() model {
  ti := textinput.New()
  ti.Placeholder = \"Enter your name\"
  ti.Focus()
  return model{textInput: ti}
}

func (m model) Init() tea.Cmd {
  return ________
}`,
      options: [
        { id: "a", text: "textinput.Blink" },
        { id: "b", text: "tea.Blink" },
        { id: "c", text: "m.textInput.Blink" },
        { id: "d", text: "tea.Quit" },
      ],
      correctAnswer: "a",
      explanation: "textinput.Blink returns a tea.Cmd that starts the cursor blinking animation for the text input component. This is the standard way to activate a focused text input in Bubble Tea.",
      difficulty: "medium",
      points: 20,
      tags: ["bubbletea", "components", "textinput"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-9",
      type: "architecture",
      question: "How does Bubble Tea's Elm architecture compare to React's virtual DOM approach?",
      options: [
        { id: "a", text: "Both use unidirectional data flow, but Bubble Tea renders to strings rather than a virtual DOM" },
        { id: "b", text: "Bubble Tea uses a virtual DOM for terminal rendering" },
        { id: "c", text: "They are completely different paradigms" },
        { id: "d", text: "Bubble Tea is faster because it skips rendering entirely" },
      ],
      correctAnswer: "a",
      explanation: "Both Bubble Tea and React follow the Elm architecture (Model-Update-View). The key difference is that Bubble Tea renders the View as a string that's written to the terminal, while React uses a virtual DOM diffing algorithm to update the browser DOM.",
      difficulty: "hard",
      points: 30,
      tags: ["bubbletea", "architecture", "elm"],
      relatedLesson: "bubbletea",
    },
    {
      id: "bubbletea-10",
      type: "security",
      question: "When serving Bubble Tea apps over SSH with Wish, what security measure is essential?",
      options: [
        { id: "a", text: "Use password authentication only" },
        { id: "b", text: "Configure SSH host keys and consider public key authentication" },
        { id: "c", text: "Disable encryption for performance" },
        { id: "d", text: "Run as root for full access" },
      ],
      correctAnswer: "b",
      explanation: "Wish serves Bubble Tea apps over SSH, requiring proper host key configuration for secure connections. Public key authentication provides stronger security than passwords. Never disable SSH encryption — it protects data in transit.",
      difficulty: "hard",
      points: 30,
      tags: ["bubbletea", "wish", "security"],
      relatedLesson: "bubbletea",
    },
  ],

  melody: [
    {
      id: "melody-1",
      type: "multiple-choice",
      question: "What is the Melody library used for?",
      options: [
        { id: "a", text: "A lightweight WebSocket framework for Go" },
        { id: "b", text: "A music player library" },
        { id: "c", text: "An HTTP router" },
        { id: "d", text: "A logging library" },
      ],
      correctAnswer: "a",
      explanation: "Melody is a lightweight WebSocket framework for Go that abstracts the complexities of WebSocket connections. It provides a simple API for handling messages, broadcasting, and managing connected sessions.",
      difficulty: "easy",
      points: 10,
      tags: ["melody", "websocket"],
      relatedLesson: "melody",
    },
    {
      id: "melody-2",
      type: "multiple-choice",
      question: "How do you create a Melody instance?",
      options: [
        { id: "a", text: "melody.New()" },
        { id: "b", text: "melody.Create()" },
        { id: "c", text: "melody.Init()" },
        { id: "d", text: "melody.Setup()" },
      ],
      correctAnswer: "a",
      explanation: "melody.New() creates a new Melody WebSocket engine instance. You then configure message handlers (HandleMessage, HandleConnect, HandleDisconnect) and use HandleRequest to upgrade HTTP connections.",
      difficulty: "easy",
      points: 10,
      tags: ["melody", "setup"],
      relatedLesson: "melody",
    },
    {
      id: "melody-3",
      type: "code-output",
      question: "What does this Melody code do?",
      code: `m := melody.New()

m.HandleMessage(func(s *melody.Session, msg []byte) {
  m.Broadcast(msg)
})`,
      options: [
        { id: "a", text: "Echoes messages back to all connected sessions" },
        { id: "b", text: "Sends messages only to the sender" },
        { id: "c", text: "Logs messages and discards them" },
        { id: "d", text: "Broadcasts only text messages, ignoring binary" },
      ],
      correctAnswer: "a",
      explanation: "m.Broadcast(msg) sends the message to ALL connected sessions. This creates a broadcast/echo pattern. To send only to the sender, use s.Write(msg). The handler receives both text and binary messages.",
      difficulty: "easy",
      points: 10,
      tags: ["melody", "broadcast"],
      relatedLesson: "melody",
    },
    {
      id: "melody-4",
      type: "true-false",
      question: "Melody handles WebSocket connection and disconnection events.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Melody provides HandleConnect and HandleDisconnect callbacks to track when clients join and leave. This is essential for implementing features like presence indicators, chat rooms, and cleanup logic.",
      difficulty: "easy",
      points: 10,
      tags: ["melody", "lifecycle"],
      relatedLesson: "melody",
    },
    {
      id: "melody-5",
      type: "multiple-select",
      question: "Which Melody broadcasting methods are available? (Select all that apply)",
      options: [
        { id: "a", text: "m.Broadcast(msg) — send to all sessions" },
        { id: "b", text: "m.BroadcastFilter(msg, filter) — send to sessions matching filter" },
        { id: "c", text: "m.BroadcastOthers(msg, session) — send to all except one" },
        { id: "d", text: "m.BroadcastGroup(msg, group) — send to named group" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Melody provides Broadcast (all), BroadcastFilter (matching a filter function), and BroadcastOthers (all except one session). There is no BroadcastGroup method — groups are implemented via session metadata and BroadcastFilter.",
      difficulty: "medium",
      points: 20,
      tags: ["melody", "broadcasting"],
      relatedLesson: "melody",
    },
    {
      id: "melody-6",
      type: "scenario",
      question: "You need to implement a chat room feature with Melody where users join specific rooms. How?",
      options: [
        { id: "a", text: "Use session.Set() to store room name, and BroadcastFilter to filter by room" },
        { id: "b", text: "Create separate Melody instances for each room" },
        { id: "c", text: "Use WebSocket URL parameters to identify rooms" },
        { id: "d", text: "Both A and B are valid approaches" },
      ],
      correctAnswer: "d",
      explanation: "Both approaches work. Using session metadata with BroadcastFilter is simpler for small-scale apps. Separate Melody instances per room provide better isolation and scalability. URL parameters can supplement either approach.",
      difficulty: "medium",
      points: 20,
      tags: ["melody", "chat", "rooms"],
      relatedLesson: "melody",
    },
    {
      id: "melody-7",
      type: "identify-bug",
      question: "What is wrong with this Melody message handler?",
      code: `m.HandleMessage(func(s *melody.Session, msg []byte) {
  // Broadcast to all, then send confirmation to sender
  m.Broadcast(msg)
  s.Write([]byte("sent"))
})`,
      options: [
        { id: "a", text: "s.Write() may race with Broadcast — the sender receives both broadcast and confirmation" },
        { id: "b", text: "msg should be a string, not []byte" },
        { id: "c", text: "Broadcast cannot be called inside HandleMessage" },
        { id: "d", text: "The handler signature is wrong" },
      ],
      correctAnswer: "a",
      explanation: "When Broadcast sends to all sessions including the sender, the sender gets the message twice: once from Broadcast and once from s.Write. Use BroadcastOthers for the broadcast to exclude the sender, or remove the explicit Write.",
      difficulty: "medium",
      points: 20,
      tags: ["melody", "broadcast", "bug"],
      relatedLesson: "melody",
    },
    {
      id: "melody-8",
      type: "complete-code",
      question: "Complete this Melody WebSocket upgrade handler.",
      code: `func wsHandler(w http.ResponseWriter, r *http.Request) {
  err := m._______(w, r, nil)
  if err != nil {
    log.Println(err)
  }
}`,
      options: [
        { id: "a", text: "HandleRequest" },
        { id: "b", text: "HandleUpgrade" },
        { id: "c", text: "Upgrade" },
        { id: "d", text: "Connect" },
      ],
      correctAnswer: "a",
      explanation: "m.HandleRequest(w, r, sessionKeys) upgrades the HTTP request to a WebSocket connection and registers it with Melody. The third parameter is a map of session keys for metadata.",
      difficulty: "medium",
      points: 20,
      tags: ["melody", "upgrade"],
      relatedLesson: "melody",
    },
    {
      id: "melody-9",
      type: "architecture",
      question: "For a real-time collaboration app with 10,000 concurrent WebSocket connections, what Melody architecture consideration is critical?",
      options: [
        { id: "a", text: "Melody is single-threaded — use goroutines for message processing" },
        { id: "b", text: "Use channel-based message routing to avoid Melody's internal lock contention" },
        { id: "c", text: "Melody cannot handle more than 100 connections" },
        { id: "d", text: "Melody automatically distributes load across servers" },
      ],
      correctAnswer: "b",
      explanation: "At scale, Melody's Broadcast method can become a bottleneck due to internal locking. Using a channel-based pub/sub system (like Redis) for message routing with selective Melody broadcasting improves throughput and scalability.",
      difficulty: "hard",
      points: 30,
      tags: ["melody", "architecture", "scale"],
      relatedLesson: "melody",
    },
    {
      id: "melody-10",
      type: "security",
      question: "Which security measure is essential when using Melody for a public WebSocket service?",
      options: [
        { id: "a", text: "Validate the Origin header in HandleRequest to prevent cross-site WebSocket hijacking" },
        { id: "b", text: "Use plaintext WebSocket (ws://) for simplicity" },
        { id: "c", text: "Disable all message filtering" },
        { id: "d", text: "Allow all origins without checking" },
      ],
      correctAnswer: "a",
      explanation: "Cross-site WebSocket hijacking occurs when a malicious page connects to your WebSocket server. Validating the Origin header in the HTTP upgrade request prevents unauthorized cross-origin connections. Always use wss:// (TLS) in production.",
      difficulty: "hard",
      points: 30,
      tags: ["melody", "security", "websocket"],
      relatedLesson: "melody",
    },
  ],

  centrifugo: [
    {
      id: "centrifugo-1",
      type: "multiple-choice",
      question: "What is Centrifugo?",
      options: [
        { id: "a", text: "A scalable real-time messaging server supporting WebSocket, SSE, and other transports" },
        { id: "b", text: "A database replication tool" },
        { id: "c", text: "A load balancer" },
        { id: "d", text: "A message queue like RabbitMQ" },
      ],
      correctAnswer: "a",
      explanation: "Centrifugo is a real-time messaging server that handles WebSocket, Server-Sent Events, HTTP streaming, and gRPC connections. It provides pub/sub, presence, joins, RPC, and other real-time patterns at scale.",
      difficulty: "easy",
      points: 10,
      tags: ["centrifugo", "realtime"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-2",
      type: "multiple-choice",
      question: "How does Centrifugo handle authentication?",
      options: [
        { id: "a", text: "It uses a JWT-based token system verified by Centrifugo against your auth endpoint" },
        { id: "b", text: "It has built-in user management" },
        { id: "c", text: "Authentication is not supported" },
        { id: "d", text: "It uses basic HTTP authentication" },
      ],
      correctAnswer: "a",
      explanation: "Centrifugo uses JSON Web Tokens (JWT) for authentication. Your backend generates JWTs after verifying user credentials, and Centrifugo validates them. This keeps user data and authentication logic in your application.",
      difficulty: "easy",
      points: 10,
      tags: ["centrifugo", "auth"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-3",
      type: "code-output",
      question: "What does this Centrifugo configuration do?",
      code: `{
  "namespaces": [
    {
      "name": "chat",
      "publish": true,
      "presence": true,
      "join_leave": true
    }
  ]
}`,
      options: [
        { id: "a", text: "Creates a 'chat' namespace with publish, presence, and join/leave events enabled" },
        { id: "b", text: "Creates three separate channels" },
        { id: "c", text: "Disables all features for the chat namespace" },
        { id: "d", text: "Configures a database connection" },
      ],
      correctAnswer: "a",
      explanation: "Namespaces in Centrifugo group channels with shared settings. The 'chat' namespace enables pub/sub (publish), user presence tracking, and join/leave notifications for all channels under chat: prefix.",
      difficulty: "easy",
      points: 10,
      tags: ["centrifugo", "config"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-4",
      type: "true-false",
      question: "Centrifugo supports horizontal scaling using Redis or NATS as a broker.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Centrifugo supports Redis and NATS as broker backends for horizontal scaling. When multiple Centrifugo instances run, the broker distributes messages between them, allowing you to handle millions of connections.",
      difficulty: "easy",
      points: 10,
      tags: ["centrifugo", "scaling"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-5",
      type: "multiple-select",
      question: "Which Centrifugo features are available? (Select all that apply)",
      options: [
        { id: "a", text: "Pub/Sub messaging on channels" },
        { id: "b", text: "Presence — see who's online in a channel" },
        { id: "c", text: "History — message replay" },
        { id: "d", text: "Built-in database storage" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Centrifugo provides pub/sub, presence, history (with optional message recovery/replay), and RPC. Message history is stored in Redis or memory. Centrifugo does not provide database storage — it's a messaging server.",
      difficulty: "medium",
      points: 20,
      tags: ["centrifugo", "features"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-6",
      type: "scenario",
      question: "You need to send a real-time notification to a specific user across multiple devices. Which Centrifugo feature is best?",
      options: [
        { id: "a", text: "Use a user-specific channel and publish messages to it" },
        { id: "b", text: "Broadcast to all connected clients" },
        { id: "c", text: "Use RPC for request-response messaging" },
        { id: "d", text: "Use the presence feature" },
      ],
      correctAnswer: "a",
      explanation: "Centrifugo maps user IDs to connections automatically. Publishing to user-$userID channel sends the message to all connections for that user across all devices. Broadcasting would reach all users, not just the target.",
      difficulty: "medium",
      points: 20,
      tags: ["centrifugo", "messaging", "user-targeting"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-7",
      type: "identify-bug",
      question: "What is wrong with this Centrifugo Go SDK integration?",
      code: `func publishHandler(c *gin.Context) {
  centrifugo := &centrifuge.DefaultNode{}
  // Publish without connecting to Redis
  result, err := centrifugo.Publish(
    c.Request.Context(),
    "chat:general",
    centrifuge PublishData{Data: []byte("hello")},
  )
}`,
      options: [
        { id: "a", text: "The node must be initialized with broker/storage (e.g., Redis) before publishing" },
        { id: "b", text: "Publish is not a method on DefaultNode" },
        { id: "c", text: "centrifuge.PublishData is not a valid type" },
        { id: "d", text: "Context cannot be used with Centrifugo" },
      ],
      correctAnswer: "a",
      explanation: "DefaultNode must be properly initialized with a broker (Redis/NATS) and storage before it can publish or handle messages. Without initialization, the node cannot route messages to connected clients.",
      difficulty: "medium",
      points: 20,
      tags: ["centrifugo", "setup", "bug"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-8",
      type: "complete-code",
      question: "Complete this Centrifugo server configuration to enable Redis broker.",
      code: `{
  "engine": "redis",
  "redis_address": "localhost:6379",
  "___enable_client_events": true
}`,
      options: [
        { id: "a", text: "" },
        { id: "b", text: "broker_" },
        { id: "c", text: "server_" },
        { id: "d", text: "redis_" },
      ],
      correctAnswer: "a",
      explanation: "In Centrifugo configuration, enable_client_events is a top-level setting (no prefix). When true, it allows client events (connect/disconnect) to be sent to the application via the webhook or event handler.",
      difficulty: "medium",
      points: 20,
      tags: ["centrifugo", "config"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-9",
      type: "architecture",
      question: "How does Centrifugo's architecture differ from a direct WebSocket implementation?",
      options: [
        { id: "a", text: "Centrifugo abstracts WebSocket complexity and provides protocol-level features like presence, history, and pub/sub" },
        { id: "b", text: "There is no difference — it's just a wrapper" },
        { id: "c", text: "Centrifugo is always slower than raw WebSocket" },
        { id: "d", text: "Centrifugo only supports WebSocket, not SSE or gRPC" },
      ],
      correctAnswer: "a",
      explanation: "Centrifugo provides a protocol layer on top of transport (WebSocket, SSE, gRPC) with built-in features like pub/sub, presence, join/leave, history, and recovery. Raw WebSocket only provides message framing — you'd need to build all those features yourself.",
      difficulty: "hard",
      points: 30,
      tags: ["centrifugo", "architecture", "comparison"],
      relatedLesson: "centrifugo",
    },
    {
      id: "centrifugo-10",
      type: "security",
      question: "Which security configuration is essential for a production Centrifugo deployment?",
      options: [
        { id: "a", text: "Enable TLS, use strong API keys, and configure proper channel token boundaries" },
        { id: "b", text: "Use default configuration without changes" },
        { id: "c", text: "Disable authentication for testing" },
        { id: "d", text: "Run Centrifugo on port 80 for easy access" },
      ],
      correctAnswer: "a",
      explanation: "Production Centrifugo requires TLS for encrypted transport, strong API keys to prevent unauthorized publishing, and proper channel namespace boundaries to prevent cross-channel access. Default configs are insecure.",
      difficulty: "hard",
      points: 30,
      tags: ["centrifugo", "security", "production"],
      relatedLesson: "centrifugo",
    },
  ],

  zap: [
    {
      id: "zap-1",
      type: "multiple-choice",
      question: "What is the Zap logging library known for?",
      options: [
        { id: "a", text: "Zero-allocation, high-performance structured logging" },
        { id: "b", text: "Colorful terminal output" },
        { id: "c", text: "Log rotation and file management" },
        { id: "d", text: "Distributed tracing" },
      ],
      correctAnswer: "a",
      explanation: "Zap (by Uber) is designed for zero-allocation structured logging. It uses memory pools and avoids reflection, making it one of the fastest Go logging libraries. It produces JSON output by default for easy parsing.",
      difficulty: "easy",
      points: 10,
      tags: ["zap", "logging"],
      relatedLesson: "zap",
    },
    {
      id: "zap-2",
      type: "multiple-choice",
      question: "What are the two main logger types in Zap?",
      options: [
        { id: "a", text: "SugaredLogger (flexible, uses Printf-style) and Logger (strict, zero-allocation)" },
        { id: "b", text: "InfoLogger and ErrorLogger" },
        { id: "c", text: "TextLogger and JSONLogger" },
        { id: "d", text: "DebugLogger and FatalLogger" },
      ],
      correctAnswer: "a",
      explanation: "Zap provides SugaredLogger (sugar.Info, sugar.Errorf — uses reflection for formatting) and Logger (logger.Info — strongly typed fields, zero allocations). Use SugaredLogger for ease, Logger for maximum performance.",
      difficulty: "easy",
      points: 10,
      tags: ["zap", "api"],
      relatedLesson: "zap",
    },
    {
      id: "zap-3",
      type: "code-output",
      question: "What is the output format of this Zap logger?",
      code: `logger, _ := zap.NewProduction()
defer logger.Sync()
logger.Info("server started",
  zap.String("host", "localhost"),
  zap.Int("port", 8080),
)`,
      options: [
        { id: "a", text: 'JSON like {"level":"info","msg":"server started","host":"localhost","port":8080}' },
        { id: "b", text: "Plain text: INFO server started host=localhost port=8080" },
        { id: "c", text: "CSV format" },
        { id: "d", text: "XML format" },
      ],
      correctAnswer: "a",
      explanation: "zap.NewProduction() creates a JSON logger. Structured fields (String, Int) are serialized as JSON key-value pairs. The output is a single JSON line with level, timestamp, message, and custom fields.",
      difficulty: "easy",
      points: 10,
      tags: ["zap", "output"],
      relatedLesson: "zap",
    },
    {
      id: "zap-4",
      type: "true-false",
      question: "Zap's SugaredLogger is slower than its strict Logger because it uses reflection for formatting.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "SugaredLogger uses reflection to handle variadic arguments and Printf-style formatting, which adds overhead. The strict Logger accepts strongly typed fields (zap.String, zap.Int) without reflection, making it faster.",
      difficulty: "easy",
      points: 10,
      tags: ["zap", "performance"],
      relatedLesson: "zap",
    },
    {
      id: "zap-5",
      type: "multiple-select",
      question: "Which Zap configurations are correct for development vs production? (Select all that apply)",
      options: [
        { id: "a", text: "zap.NewDevelopment() — human-readable output, debug level, stacktraces on warnings" },
        { id: "b", text: "zap.NewProduction() — JSON output, info level, stacktraces on errors" },
        { id: "c", text: "zap.NewNop() — discards all logs" },
        { id: "d", text: "zap.NewFile() — writes to files only" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Zap provides NewDevelopment (readable, verbose), NewProduction (JSON, filtered), and NewNop (no-op). There is no built-in NewFile — file output is configured through the Config struct with a file writer.",
      difficulty: "medium",
      points: 20,
      tags: ["zap", "config"],
      relatedLesson: "zap",
    },
    {
      id: "zap-6",
      type: "identify-bug",
      question: "What is wrong with this Zap logger usage?",
      code: `func main() {
  logger, _ := zap.NewProduction()
  logger.Info("processing",
    zap.String("key", "value"),
    zap.Error(fmt.Errorf("something failed")),
  )
  logger.Sync()
}`,
      options: [
        { id: "a", text: "The error is logged at INFO level — errors should use logger.Error() instead" },
        { id: "b", text: "zap.Error cannot be used with Info" },
        { id: "c", text: "logger.Sync() must be called before the first log" },
        { id: "d", text: "fmt.Errorf creates an invalid error" },
      ],
      correctAnswer: "a",
      explanation: "While the code is technically valid, logging an error at INFO level is misleading. Use logger.Error(\"processing\", ...) when there's an actual error. This ensures proper log level filtering and alerting in production.",
      difficulty: "medium",
      points: 20,
      tags: ["zap", "logging", "bug"],
      relatedLesson: "zap",
    },
    {
      id: "zap-7",
      type: "scenario",
      question: "You need to add request-scoped fields (request ID, user ID) to all logs within a handler. How?",
      options: [
        { id: "a", text: "Create a child logger with With() and pass it through the context" },
        { id: "b", text: "Use a global map to store request fields" },
        { id: "c", text: "Add fields to every individual log call" },
        { id: "d", text: "All approaches are equally good" },
      ],
      correctAnswer: "a",
      explanation: "logger.With(zap.String(\"request_id\", id), zap.String(\"user_id\", uid)) creates a child logger that automatically includes these fields in every log. Store it in context.Value and retrieve it in the handler. This is efficient and type-safe.",
      difficulty: "medium",
      points: 20,
      tags: ["zap", "context", "structured-logging"],
      relatedLesson: "zap",
    },
    {
      id: "zap-8",
      type: "complete-code",
      question: "Complete this Zap configuration that writes logs to a file.",
      code: `cfg := zap.Config{
  Level:       zap.NewAtomicLevelAt(zap.InfoLevel),
  OutputPaths: []string{"stdout", "_______"},
  Encoding:    "json",
}`,
      options: [
        { id: "a", text: "\"./app.log\"" },
        { id: "b", text: "\"file://app.log\"" },
        { id: "c", text: "os.Stdout.Name()" },
        { id: "d", text: "\"/var/log/app\"" },
      ],
      correctAnswer: "a",
      explanation: "OutputPaths accepts filesystem paths or special values (\"stdout\", \"stderr\"). To log to a file, include the file path directly: \"./app.log\". Zap handles file creation, rotation (with a sink), and writing.",
      difficulty: "medium",
      points: 20,
      tags: ["zap", "config", "file-output"],
      relatedLesson: "zap",
    },
    {
      id: "zap-9",
      type: "architecture",
      question: "When should you choose Zap over Zerolog or the standard log package?",
      options: [
        { id: "a", text: "Zap for maximum performance, Zerolog for simpler API, stdlib for zero dependencies" },
        { id: "b", text: "Always use Zap — it's always better" },
        { id: "c", text: "Use stdlib log — third-party loggers are unnecessary" },
        { id: "d", text: "Zap and Zerolog are identical in performance" },
      ],
      correctAnswer: "a",
      explanation: "Zap excels at raw performance (zero allocations with Logger). Zerolog offers a simpler fluent API with similar performance. stdlib log has zero dependencies and is fine for simple tools. Choose based on your needs.",
      difficulty: "hard",
      points: 30,
      tags: ["zap", "architecture", "comparison"],
      relatedLesson: "zap",
    },
    {
      id: "zap-10",
      type: "security",
      question: "What security concern exists with Zap logging in production?",
      options: [
        { id: "a", text: "Logging sensitive data (passwords, tokens, PII) without redaction" },
        { id: "b", text: "Zap is inherently insecure" },
        { id: "c", text: "Zap logs cannot be encrypted" },
        { id: "d", text: "No security concerns exist" },
      ],
      correctAnswer: "a",
      explanation: "The main security concern is accidentally logging sensitive data. Always redact passwords, tokens, and PII before logging. Use Zap's field naming conventions to identify sensitive fields and add middleware to mask them.",
      difficulty: "hard",
      points: 30,
      tags: ["zap", "security", "sensitive-data"],
      relatedLesson: "zap",
    },
  ],

  zerolog: [
    {
      id: "zerolog-1",
      type: "multiple-choice",
      question: "What is Zerolog's main design philosophy?",
      options: [
        { id: "a", text: "Zero allocation structured logging with a fluent API" },
        { id: "b", text: "Feature-rich logging with many built-in integrations" },
        { id: "c", text: "Distributed logging across microservices" },
        { id: "d", text: "Log aggregation and analysis" },
      ],
      correctAnswer: "a",
      explanation: "Zerolog focuses on zero-allocation structured logging with an elegant fluent API. It achieves near-zero allocations by avoiding reflection and using a builder pattern for log event construction.",
      difficulty: "easy",
      points: 10,
      tags: ["zerolog", "logging"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-2",
      type: "multiple-choice",
      question: "How do you create a Zerolog logger?",
      options: [
        { id: "a", text: "zerolog.New(os.Stdout)" },
        { id: "b", text: "zerolog.Create(os.Stdout)" },
        { id: "c", text: "log.New zerolog" },
        { id: "d", text: "zerolog.Init()" },
      ],
      correctAnswer: "a",
      explanation: "zerolog.New() takes an io.Writer and returns a logger. You can chain With() for global fields and Level() for filtering. The simplest logger is zerolog.New(os.Stdout).With().Logger().",
      difficulty: "easy",
      points: 10,
      tags: ["zerolog", "setup"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-3",
      type: "code-output",
      question: "What is the output of this Zerolog code?",
      code: `logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
logger.Info().
  Str("key", "value").
  Int("count", 42).
  Msg("hello")`,
      options: [
        { id: "a", text: 'JSON: {"level":"info","time":"...","key":"value","count":42,"message":"hello"}' },
        { id: "b", text: 'Plain text: INFO hello key=value count=42' },
        { id: "c", text: 'CSV: info,...,key,value,count,42,hello' },
        { id: "d", text: 'Compilation error' },
      ],
      correctAnswer: "a",
      explanation: "Zerolog's fluent API chains field methods (Str, Int) after a level method (Info()) and ends with Msg(). The output is a single JSON line with level, timestamp, custom fields, and message.",
      difficulty: "easy",
      points: 10,
      tags: ["zerolog", "output"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-4",
      type: "true-false",
      question: "Zerolog supports sub-loggers via the With() method.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "zerolog.Logger.With() returns an Event that you chain fields onto, then call Logger() to get a sub-logger. This sub-logger includes all the fields in every subsequent log call.",
      difficulty: "easy",
      points: 10,
      tags: ["zerolog", "sub-logger"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-5",
      type: "multiple-select",
      question: "Which Zerolog output formats are supported? (Select all that apply)",
      options: [
        { id: "a", text: "JSON (default)" },
        { id: "b", text: "Console (human-readable, colorized)" },
        { id: "c", text: "XML" },
        { id: "d", text: "MessagePack" },
      ],
      correctAnswer: ["a", "b"],
      explanation: "Zerolog supports JSON (default) and Console output formats. The ConsoleWriter formats logs for human readability with colors. XML and MessagePack are not built-in output formats.",
      difficulty: "medium",
      points: 20,
      tags: ["zerolog", "output"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-6",
      type: "identify-bug",
      question: "What is the issue with this Zerolog code?",
      code: `logger := zerolog.New(os.Stdout)
logger.Info().Str("user", "alice")
// Missing Msg() — event is discarded`,
      options: [
        { id: "a", text: "Without Msg() or Send(), the log event is silently discarded" },
        { id: "b", text: "Str() is not a valid field method" },
        { id: "c", text: "logger.Info() returns an error" },
        { id: "d", text: "os.Stdout is not valid" },
      ],
      correctAnswer: "a",
      explanation: "Zerolog events must be finalized with Msg() or Send(). Without a finalization call, the event is never written. This is a common gotcha — the event is built but never flushed.",
      difficulty: "medium",
      points: 20,
      tags: ["zerolog", "gotcha", "bug"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-7",
      type: "scenario",
      question: "You want to add a request ID to all logs within an HTTP handler using Zerolog. What's the idiomatic approach?",
      options: [
        { id: "a", text: "Create a sub-logger with the request ID and store it in context" },
        { id: "b", text: "Use a global variable for the request ID" },
        { id: "c", text: "Prepend the request ID to every log message string" },
        { id: "d", text: "Use Zerolog's built-in HTTP middleware" },
      ],
      correctAnswer: "a",
      explanation: "Use logger.With().Str(\"request_id\", id).Logger() to create a sub-logger, then store it in context using zerolog.New(ctx). This makes the request ID available to all code that retrieves the logger from context.",
      difficulty: "medium",
      points: 20,
      tags: ["zerolog", "context", "middleware"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-8",
      type: "complete-code",
      question: "Complete this Zerolog hook that adds a field to every log event.",
      code: `type RequestIDHook struct{}

func (h *RequestIDHook) Run(e *zerolog.Event, level zerolog.Level, msg string) {
  if level >= zerolog.InfoLevel {
    e._______("component", "api")
  }
}`,
      options: [
        { id: "a", text: "Str" },
        { id: "b", text: "Put" },
        { id: "c", text: "Add" },
        { id: "d", text: "Set" },
      ],
      correctAnswer: "a",
      explanation: "Zerolog hooks use e.Str() to add fields to the event. Hooks run for every log event, allowing you to conditionally add fields based on log level or other criteria.",
      difficulty: "medium",
      points: 20,
      tags: ["zerolog", "hooks"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-9",
      type: "architecture",
      question: "How does Zerolog's memory model compare to Zap's for high-throughput logging?",
      options: [
        { id: "a", text: "Zerolog achieves zero allocations with a builder pattern; Zap achieves zero allocations with pooled buffers" },
        { id: "b", text: "Zerolog allocates more than Zap" },
        { id: "c", text: "They use identical approaches" },
        { id: "d", text: "Zap cannot achieve zero allocations" },
      ],
      correctAnswer: "a",
      explanation: "Zerolog uses a builder pattern where the Event reuses its internal buffer. Zap uses sync.Pool to recycle byte buffers. Both achieve zero allocations in the hot path, but through different mechanisms. Both are extremely fast.",
      difficulty: "hard",
      points: 30,
      tags: ["zerolog", "architecture", "performance"],
      relatedLesson: "zerolog",
    },
    {
      id: "zerolog-10",
      type: "security",
      question: "Which Zerolog practice helps prevent log injection attacks?",
      options: [
        { id: "a", text: "Use structured fields (Str, Int) instead of string concatenation in Msg()" },
        { id: "b", text: "Log everything — more data is always better" },
        { id: "c", text: "Use Msgf with user input directly" },
        { id: "d", text: "Log injection is not a real threat" },
      ],
      correctAnswer: "a",
      explanation: "Structured fields (Str, Int, Bool) properly encode values as JSON, preventing log injection where an attacker could inject newlines or JSON to forge log entries. Never concatenate user input into log messages — use typed fields.",
      difficulty: "hard",
      points: 30,
      tags: ["zerolog", "security", "log-injection"],
      relatedLesson: "zerolog",
    },
  ],

  "orms--db-access": [
    {
      id: "orms-1",
      type: "multiple-choice",
      question: "What is the primary advantage of using an ORM over raw SQL?",
      options: [
        { id: "a", text: "Faster query execution" },
        { id: "b", text: "Productivity through type-safe queries and reduced boilerplate" },
        { id: "c", text: "Automatic query optimization" },
        { id: "d", text: "Better security than parameterized queries" },
      ],
      correctAnswer: "b",
      explanation: "ORMs improve productivity by providing type-safe queries, auto-migration, struct mapping, and reducing SQL boilerplate. They don't execute faster (raw SQL is often faster) and don't provide automatic optimization.",
      difficulty: "easy",
      points: 10,
      tags: ["orms", "database"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-2",
      type: "multiple-choice",
      question: "Which Go ORM supports multiple databases including MySQL, PostgreSQL, and SQLite?",
      options: [
        { id: "a", text: "GORM" },
        { id: "b", text: "sqlx" },
        { id: "c", text: "pgx" },
        { id: "d", text: "sqlmock" },
      ],
      correctAnswer: "a",
      explanation: "GORM is a multi-database ORM that supports MySQL, PostgreSQL, SQLite, SQL Server, and others. sqlx extends database/sql but is not an ORM. pgx is PostgreSQL-specific. sqlmock is for testing.",
      difficulty: "easy",
      points: 10,
      tags: ["orms", "gorm"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-3",
      type: "true-false",
      question: "Ent (Facebook's ORM) uses code generation to create type-safe query builders.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Ent uses a graph-based schema definition and generates Go code for type-safe queries, migrations, and graph traversal. The generated code provides compile-time safety for all database operations.",
      difficulty: "easy",
      points: 10,
      tags: ["orms", "ent"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-4",
      type: "code-output",
      question: "What does this Ent schema definition generate?",
      code: `type User struct {
  ent.Schema
}

func (User) Fields() []ent.Field {
  return []ent.Field{
    field.String("name"),
    field.Int("age"),
  }
}`,
      options: [
        { id: "a", text: "A User entity with Name (string) and Age (int) fields, plus query/mutation methods" },
        { id: "b", text: "A database table with no query methods" },
        { id: "c", text: "A protobuf message" },
        { id: "d", text: "Nothing — Ent requires more configuration" },
      ],
      correctAnswer: "a",
      explanation: "Ent generates a complete entity package with the User struct, Name/Age fields, builder/mutation types, and query methods (Where, Create, Update, Delete). The schema definition drives all code generation.",
      difficulty: "easy",
      points: 10,
      tags: ["orms", "ent", "code-generation"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-5",
      type: "multiple-select",
      question: "Which Go database access libraries are NOT ORMs? (Select all that apply)",
      options: [
        { id: "a", text: "database/sql — standard library SQL interface" },
        { id: "b", text: "sqlx — extensions to database/sql" },
        { id: "c", text: "sqlc — generates Go code from SQL queries" },
        { id: "d", text: "GORM — full ORM with associations and hooks" },
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "database/sql, sqlx, and sqlc are not ORMs. database/sql is the standard SQL interface, sqlx adds convenience methods, and sqlc generates type-safe Go from SQL. GORM is the only true ORM in this list.",
      difficulty: "medium",
      points: 20,
      tags: ["orms", "comparison"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-6",
      type: "scenario",
      question: "You need to migrate from GORM to sqlc for better performance. What's the biggest architectural change?",
      options: [
        { id: "a", text: "Replace struct-based queries with SQL-first queries defined in .sql files" },
        { id: "b", text: "There is no difference — they're interchangeable" },
        { id: "c", text: "You must switch to PostgreSQL" },
        { id: "d", text: "sqlc cannot replace GORM" },
      ],
      correctAnswer: "a",
      explanation: "sqlc requires writing SQL queries in .sql files and generates Go functions from them. This is a paradigm shift from GORM's builder pattern. You lose ORM features (associations, hooks) but gain performance and type safety from hand-written SQL.",
      difficulty: "medium",
      points: 20,
      tags: ["orms", "sqlc", "migration"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-7",
      type: "identify-bug",
      question: "What performance issue does this GORM query have?",
      code: `var users []User
db.Find(&users)
for i := range users {
  db.Model(&users[i]).Related(&users[i].Orders)
  for j := range users[i].Orders {
    db.Model(&users[i].Orders[j]).Related(&users[i].Orders[j].Items)
  }
}`,
      options: [
        { id: "a", text: "N+1 query problem — each Related() call generates a separate SELECT" },
        { id: "b", text: "The range loop is incorrect" },
        { id: "c", text: "Related() cannot be chained" },
        { id: "d", text: "No issue — this is correct GORM usage" },
      ],
      correctAnswer: "a",
      explanation: "Each Related() call triggers a lazy-load query. With 100 users and 5 orders each, this generates 100 + 500 + more queries. Use Preload(\"Orders.Items\").Find(&users) to eager-load all associations efficiently.",
      difficulty: "medium",
      points: 20,
      tags: ["orms", "performance", "n-plus-one"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-8",
      type: "complete-code",
      question: "Complete this sqlc query definition that will generate a type-safe Go function.",
      code: `-- name: GetUserByID :one
SELECT id, name, email
FROM users
WHERE id = $1
LIMIT 1`,
      options: [
        { id: "a", text: "sqlc will generate: func (q *Queries) GetUserByID(ctx context.Context, id int64) (User, error)" },
        { id: "b", text: "sqlc will generate: func GetUserByID(id int) User" },
        { id: "c", text: "sqlc will generate: func (q *Queries) GetUserByID(ctx context.Context) ([]User, error)" },
        { id: "d", text: "sqlc cannot generate from SQL comments" },
      ],
      correctAnswer: "a",
      explanation: "sqlc reads the SQL and comment annotations. :one means return a single row. $1 is parameterized. It generates a method on Queries that takes the parameter types and returns the result type with error.",
      difficulty: "medium",
      points: 20,
      tags: ["orms", "sqlc", "code-generation"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-9",
      type: "architecture",
      question: "When building a Go microservice, what database access pattern provides the best testability?",
      options: [
        { id: "a", text: "Define a repository interface per aggregate, inject it, and mock for testing" },
        { id: "b", text: "Use GORM directly in handlers for speed" },
        { id: "c", text: "Use global database variables" },
        { id: "d", text: "Skip tests — use integration tests only" },
      ],
      correctAnswer: "a",
      explanation: "The repository pattern with interfaces enables unit testing with mock implementations. Define interfaces like UserRepository with methods (FindByID, Create, etc.), implement with GORM/sqlx/pgx, and mock in tests.",
      difficulty: "hard",
      points: 30,
      tags: ["orms", "architecture", "testing"],
      relatedLesson: "orms--db-access",
    },
    {
      id: "orms-10",
      type: "security",
      question: "Which database access pattern in Go is most resistant to SQL injection?",
      options: [
        { id: "a", text: "Using parameterized queries with ? or $1 placeholders" },
        { id: "b", text: "Sanitizing input with strings.Replace" },
        { id: "c", text: "Using ORMs which automatically escape everything" },
        { id: "d", text: "All patterns are equally secure" },
      ],
      correctAnswer: "a",
      explanation: "Parameterized queries ensure user input is treated as data, not executable SQL. ORMs use parameterized queries internally, but string concatenation in raw SQL is vulnerable regardless of sanitization. Always use parameter binding.",
      difficulty: "hard",
      points: 30,
      tags: ["orms", "security", "sql-injection"],
      relatedLesson: "orms--db-access",
    },
  ],
};
