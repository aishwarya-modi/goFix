-- Quiz questions for Go roadmap topics
-- Each topic has 3-5 questions with 4 options each

-- Hello World
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('hello-world-in-go', 'What is the correct way to print "Hello, World!" in Go?', '["fmt.Println(\"Hello, World!\")", "print(\"Hello, World!\")", "console.log(\"Hello, World!\")", "System.out.println(\"Hello, World!\")"]', 0, 'fmt.Println is the standard way to print output in Go from the fmt package.', 'beginner', 1),
('hello-world-in-go', 'Which package must be imported to use Println?', '["os", "fmt", "log", "io"]', 1, 'The fmt package provides formatting and printing functions.', 'beginner', 2),
('hello-world-in-go', 'What is the entry point of a Go program?', '["init() function", "main() function in main package", "start() function", "run() function"]', 1, 'Go programs start execution from the main() function in the main package.', 'beginner', 3);

-- Variables
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('variables--constants', 'Which of the following is a valid variable declaration in Go?', '["var x int", "int x", "x := int", "let x int"]', 0, 'Go uses the var keyword for explicit variable declaration.', 'beginner', 1),
('variables--constants', 'What is the short variable declaration operator?', '["=", ":=", "==", ":"]', 1, ':= is the short variable declaration operator that infers the type.', 'beginner', 2),
('variables--constants', 'What happens to a variable declared with var but not assigned?', '["Compilation error", "Gets zero value", "Gets null", "Gets garbage value"]', 1, 'Go initializes variables to their zero value (0 for int, "" for string, false for bool, nil for pointers).', 'beginner', 3);

-- Data Types
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('data-types', 'Which is NOT a basic data type in Go?', '["int", "float64", "char", "bool"]', 2, 'Go does not have a char type. It uses byte (uint8) or rune (int32) for character representation.', 'beginner', 1),
('data-types', 'What is the default integer type in Go?', '["int32", "int64", "int", "uint"]', 2, 'int is the default integer type, its size depends on the platform (32 or 64 bit).', 'beginner', 2),
('data-types', 'What is the zero value of a bool in Go?', '["null", "undefined", "false", "0"]', 2, 'The zero value of bool is false.', 'beginner', 3);

-- Slices
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('slices', 'How do you create a slice with length 5 and capacity 10?', '["make([]int, 5, 10)", "new([]int, 5, 10)", "[]int{5, 10}", "var s []int = 5"]', 0, 'make([]T, length, capacity) creates a slice with specified length and capacity.', 'beginner', 1),
('slices', 'What does append() return?', '["Nothing", "The modified slice", "A new slice", "A pointer to the slice"]', 1, 'append returns the modified slice, which may or may not be the same underlying array.', 'beginner', 2),
('slices', 'What happens when you append to a slice beyond its capacity?', '["Runtime panic", "Silently drops data", "Creates a new backing array", "Returns an error"]', 2, 'When capacity is exceeded, append allocates a new backing array and copies elements.', 'beginner', 3);

-- Maps
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('maps', 'How do you create an empty map in Go?', '["map[string]int{}", "make(map[string]int)", "var m map[string]int", "All of the above"]', 3, 'All three are valid ways to create a map. {} and make() create initialized maps, var creates nil map.', 'beginner', 1),
('maps', 'What happens if you read from a nil map?', '["Returns zero value", "Runtime panic", "Compilation error", "Returns nil"]', 0, 'Reading from a nil map returns the zero value of the value type. Writing to a nil map panics.', 'intermediate', 2),
('maps', 'Which is true about map keys?', '["Any type can be a key", "Only strings can be keys", "Keys must be comparable", "Keys must be integers"]', 2, 'Map keys must be comparable types (strings, ints, bools, pointers, structs of comparable fields).', 'beginner', 3);

-- Functions
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('functions', 'How do you define a function that returns two values?', '["func f() (int, error)", "func f() [int, error]", "func f() {int, error}", "func f() int, error"]', 0, 'Go supports multiple return values using parentheses in the return type.', 'beginner', 1),
('functions', 'What is a closure in Go?', '["A function that closes files", "A function that captures variables from outer scope", "A function with no parameters", "A function that always returns"]', 1, 'A closure is a function that captures and can modify variables from its enclosing scope.', 'intermediate', 2),
('functions', 'Can functions be assigned to variables in Go?', '["No, never", "Yes, functions are first-class citizens", "Only anonymous functions", "Only with reflect package"]', 1, 'Functions are first-class citizens in Go and can be assigned to variables, passed as arguments, and returned.', 'beginner', 3);

-- Structs
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('structs', 'How do you access a struct field?', '["obj.field", "obj->field", "obj[field]", "obj::field"]', 0, 'Go uses dot notation to access struct fields.', 'beginner', 1),
('structs', 'What is struct embedding?', '["Importing structs from other packages", "Including one struct within another", "Creating struct pointers", "Defining struct methods"]', 1, 'Embedding allows you to include a struct within another, promoting its fields and methods.', 'intermediate', 2),
('structs', 'How do you create a struct literal?', '["Person{Name: \"John\", Age: 30}", "new(Person, \"John\", 30)", "Person(\"John\", 30)", "struct Person {\"John\", 30}"]', 0, 'Struct literals use field names with values in curly braces.', 'beginner', 3);

-- Pointers
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('pointers', 'How do you get the address of a variable?', '["&variable", "*variable", "address(variable)", "ref(variable)"]', 0, 'The & operator returns the memory address of a variable.', 'beginner', 1),
('pointers', 'What does the * operator do with a pointer?', '["Multiplies", "Dereferences (gets value)", "Deletes", "Dereferences and deletes"]', 1, 'The * operator dereferences a pointer, getting the value it points to.', 'beginner', 2),
('pointers', 'What is the zero value of a pointer?', '["0", "nil", "null", "undefined"]', 1, 'The zero value of any pointer type in Go is nil.', 'beginner', 3);

-- Interfaces
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('interfaces', 'How is interface satisfaction determined in Go?', '["Explicit declaration", "Implicit (structural typing)", "By inheritance", "By reflection"]', 1, 'Go uses structural typing - if a type has all methods of an interface, it implicitly satisfies it.', 'intermediate', 1),
('interfaces', 'What is the empty interface?', '["interface{}", "An interface with no methods", "Both A and B", "A deprecated feature"]', 2, 'interface{} has no methods and is satisfied by any type. It is equivalent to any in Go 1.18+.', 'intermediate', 2),
('interfaces', 'Can an interface have zero methods?', '["No", "Yes, it becomes the empty interface", "Only in Go 1.18+", "Only with generics"]', 1, 'An interface can have zero methods, making it the empty interface (interface{} or any).', 'intermediate', 3);

-- Goroutines
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('goroutines', 'How do you start a goroutine?', '["go func()", "goroutine func()", "async func()", "thread func()"]', 0, 'The go keyword before a function call starts it as a goroutine.', 'intermediate', 1),
('goroutines', 'What is the difference between a goroutine and a thread?', '["No difference", "Goroutines are lighter and managed by Go runtime", "Threads are lighter", "Goroutines use more memory"]', 1, 'Goroutines are multiplexed onto OS threads and are much lighter weight than threads.', 'intermediate', 2),
('goroutines', 'How many goroutines can you realistically create?', '["A few hundred", "A few thousand", "Millions", "Only one per CPU core"]', 2, 'Due to their low overhead, you can create millions of goroutines.', 'intermediate', 3);

-- Channels
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('channels', 'How do you create a buffered channel with capacity 10?', '["make(chan int, 10)", "new(chan int, 10)", "chan int{10}", "var ch chan int = 10"]', 0, 'make(chan T, capacity) creates a buffered channel with the specified capacity.', 'intermediate', 1),
('channels', 'What happens when you send to a full channel?', '["Data is dropped", "Sender blocks", "Runtime panic", "Buffer grows automatically"]', 1, 'Sending to a full buffered channel blocks the sender until space is available.', 'intermediate', 2),
('channels', 'How do you close a channel?', '["ch.stop()", "close(ch)", "ch.close()", "delete(ch)"]', 1, 'The close() built-in function closes a channel.', 'intermediate', 3);

-- Error Handling
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('error-handling', 'What is the standard way to handle errors in Go?', '["try/catch", "if err != nil", "panic()", "throw"]', 1, 'Go uses explicit error checking with if err != nil pattern.', 'beginner', 1),
('error-handling', 'When should you use panic()?', '["For all errors", "For unrecoverable programming errors", "For user input validation", "Never"]', 1, 'panic is for unrecoverable errors like nil pointer dereference or index out of bounds.', 'intermediate', 2),
('error-handling', 'How do you create a custom error?', '["errors.New(\"message\")", "fmt.Errorf(\"message\")", "Both A and B", "throw new Error(\"message\")"]', 2, 'Both errors.New and fmt.Errorf create error values. fmt.Errorf supports formatting.', 'beginner', 3);

-- Defer
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('defer', 'When is a deferred function executed?', '["Immediately", "When the surrounding function returns", "After 1 second", "In a goroutine"]', 1, 'Deferred functions execute after the surrounding function returns, but before the caller resumes.', 'intermediate', 1),
('defer', 'What is the execution order of multiple defers?', '["FIFO (first in, first out)", "LIFO (last in, first out)", "Random order", "Parallel execution"]', 1, 'Defers are stacked and executed in LIFO order (last deferred, first executed).', 'intermediate', 2),
('defer', 'Can deferred functions modify named return values?', '["No, never", "Yes, by modifying the return variables", "Only if they panic", "Only with pointers"]', 1, 'Deferred functions can modify named return values, which affects the returned result.', 'advanced', 3);

-- Context
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('context-package', 'What is the primary purpose of context?', '["Database connections", "Carrying deadlines, cancellation signals, and request-scoped values", "Logging", "Configuration management"]', 1, 'Context carries deadlines, cancellation signals, and request-scoped values across API boundaries.', 'intermediate', 1),
('context-package', 'How do you create a context with a timeout?', '["context.WithTimeout(parent, duration)", "context.Timeout(duration)", "context.WithDeadline(parent, time)", "context.NewTimeout(duration)"]', 0, 'context.WithTimeout creates a context that expires after the specified duration.', 'intermediate', 2),
('context-package', 'What should you pass as the first argument to main()?', '["context.Background()", "context.TODO()", "context.WithCancel()", "nil"]', 0, 'context.Background() is the root context, typically used at the top of a call chain.', 'intermediate', 3);

-- HTTP
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('http', 'How do you start an HTTP server in Go?', '["http.ListenAndServe(\":8080\", nil)", "http.Start(\":8080\")", "server.Run(\":8080\")", "net.Listen(\":8080\")"]', 0, 'http.ListenAndServe starts an HTTP server on the specified address.', 'beginner', 1),
('http', 'What interface must an HTTP handler implement?', '["HandlerFunc", "ServeHTTP(ResponseWriter, *Request)", "Handle(ResponseWriter, Request)", "http.Handler"]', 1, 'The Handler interface requires a ServeHTTP method with ResponseWriter and *Request parameters.', 'intermediate', 2),
('http', 'How do you get a query parameter from a request?', '["r.Query(\"name\")", "r.URL.Query().Get(\"name\")", "r.Param(\"name\")", "r.GetQuery(\"name\")"]', 1, 'URL query parameters are accessed through r.URL.Query().Get().', 'beginner', 3);

-- JSON
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('encodingjson', 'How do you ignore a struct field during JSON encoding?', '["json:\"-\"", "json:\"ignore\"", "json:\"skip\"", "json:\"hidden\""]', 0, 'The dash tag tells encoding/json to skip the field.', 'beginner', 1),
('encodingjson', 'What tag is used to rename a JSON field?', '["json:\"name\"", "json:\"rename:name\"", "json:\"as:name\"", "json_field:\"name\""]', 0, 'The struct tag json:\"name\" sets the JSON key name.', 'beginner', 2),
('encodingjson', 'How do you unmarshal JSON into a struct?', '["json.Unmarshal(data, &v)", "json.Parse(data, v)", "json.Decode(data, v)", "json.Load(data, v)"]', 0, 'json.Unmarshal parses JSON data and stores the result in the value pointed to by v.', 'beginner', 3);

-- Testing
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('unit-testing', 'What prefix must test function names have?', '["test_", "Test", "check_", "Verify"]', 1, 'Test functions must start with Test followed by a capital letter.', 'beginner', 1),
('unit-testing', 'What package is used for testing in Go?', '["test", "testing", "assert", "check"]', 1, 'The standard library provides the testing package for writing tests.', 'beginner', 2),
('unit-testing', 'How do you run tests in Go?', '["go test ./...", "go run tests", "npm test", "make test"]', 0, 'go test ./... runs all tests in the current directory and subdirectories.', 'beginner', 3);

-- Table-Driven Tests
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('table-driven', 'What is the main advantage of table-driven tests?', '["Faster execution", "Easier to add new test cases", "Less code", "Better coverage"]', 1, 'Table-driven tests make it easy to add new test cases by just adding to the table.', 'intermediate', 1),
('table-driven', 'How are table-driven tests typically structured?', '["Array of test cases with t.Run()", "Single test function", "Separate test files", "Benchmark functions"]', 0, 'Table-driven tests iterate over a slice of test cases, each run with t.Run() for subtests.', 'intermediate', 2);

-- Go Modules
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('go-mod', 'What file defines a Go module?', '["go.mod", "module.json", "package.json", "go.config"]', 0, 'go.mod is the primary file defining a Go module and its dependencies.', 'beginner', 1),
('go-mod', 'How do you add a dependency in Go?', '["go get package", "npm install package", "import package", "require package"]', 0, 'go get downloads and adds a dependency to go.mod.', 'beginner', 2),
('go-mod', 'What does go.sum contain?', '["Source code", "Checksums for dependencies", "Documentation", "Test results"]', 1, 'go.sum contains cryptographic checksums to verify dependency integrity.', 'beginner', 3);

-- Generics
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('generics', 'What is the syntax for a generic function?', '["func F[T any](x T) T", "func F<T>(x T) T", "func F(x T) T where T: any", "func F(x: T) T"]', 0, 'Go generics use square brackets [] for type parameters.', 'advanced', 1),
('generics', 'What constraint allows any type?', '["any", "interface{}", "Both A and B", "Object"]', 2, 'both any and interface{} are equivalent constraints that accept any type.', 'advanced', 2),
('generics', 'When were generics added to Go?', '["Go 1.0", "Go 1.11", "Go 1.18", "Go 2.0"]', 2, 'Generics were officially added in Go 1.18 (March 2022).', 'advanced', 3);

-- Concurrency Patterns
INSERT INTO quizzes (topic_slug, question, options, correct_index, explanation, difficulty, sort_order) VALUES
('concurrency-patterns', 'What pattern uses a channel to signal completion?', '["WaitGroup", "Done channel", "sync.Once", "atomic.Value"]', 1, 'A done channel pattern uses close(ch) to signal all receivers that work is complete.', 'advanced', 1),
('concurrency-patterns', 'What does the select statement do?', '["Chooses a random ready case", "Blocks until one case is ready", "Runs all cases in parallel", "Chooses the first case"]', 1, 'select blocks until one of its cases can proceed, then executes that case.', 'intermediate', 2),
('concurrency-patterns', 'How do you prevent a goroutine leak?', '["Use defer", "Use context for cancellation", "Set a timeout", "All of the above"]', 3, 'Goroutine leaks are prevented by proper cancellation via context, timeouts, or done channels.', 'advanced', 3);
