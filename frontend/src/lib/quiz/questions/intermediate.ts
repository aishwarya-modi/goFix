import type { QuizQuestion } from "../types";

export const intermediateQuestions: Record<string, QuizQuestion[]> = {
  "structs": [
    {
      id: "structs-1",
      type: "multiple-choice",
      question: "How do you define a struct in Go?",
      options: [
        { id: "a", text: "type S struct {}" },
        { id: "b", text: "struct S {}" },
        { id: "c", text: "class S {}" },
        { id: "d", text: "define struct S" }
      ],
      correctAnswer: "a",
      explanation: "Go uses the 'type' keyword combined with 'struct' to define a new struct type.",
      difficulty: "easy",
      points: 10,
      tags: ["structs"],
      relatedLesson: "structs"
    },
    {
      id: "structs-2",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    p := Person{Name: \"Alice\", Age: 30}\n    fmt.Println(p.Name)\n}",
      options: [
        { id: "a", text: "Alice" },
        { id: "b", text: "" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Alice 30" }
      ],
      correctAnswer: "a",
      explanation: "Struct fields are accessed using dot notation. p.Name returns the Name field which was set to 'Alice'.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "field-access"],
      relatedLesson: "structs"
    },
    {
      id: "structs-3",
      type: "multiple-choice",
      question: "What is the zero value of a struct type?",
      options: [
        { id: "a", text: "A struct with all fields set to their respective zero values" },
        { id: "b", text: "nil" },
        { id: "c", text: "An empty struct with no fields" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The zero value of a struct is a struct where each field has its respective zero value.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "zero-value"],
      relatedLesson: "structs"
    },
    {
      id: "structs-4",
      type: "true-false",
      question: "You can compare two struct values directly using the == operator in Go.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Struct values that do not contain fields that are slices, maps, or functions can be compared using ==.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "comparison"],
      relatedLesson: "structs"
    },
    {
      id: "structs-5",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Point struct {\n    X, Y int\n}\n\nfunc main() {\n    p1 := Point{1, 2}\n    p2 := Point{1, 2}\n    fmt.Println(p1 == p2)\n}",
      options: [
        { id: "a", text: "true" },
        { id: "b", text: "false" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "Since Point contains only int fields (which are comparable), == works and returns true.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "comparison"],
      relatedLesson: "structs"
    },
    {
      id: "structs-6",
      type: "identify-bug",
      question: "What happens when this code runs?",
      code: "package main\n\nimport \"fmt\"\n\ntype User struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    var u User\n    u.Name = \"Bob\"\n    fmt.Println(u)\n}",
      options: [
        { id: "a", text: "It compiles and prints {Bob 0}" },
        { id: "b", text: "Cannot assign to u.Name because u was declared with var" },
        { id: "c", text: "User is not defined properly" },
        { id: "d", text: "Missing import" }
      ],
      correctAnswer: "a",
      explanation: "The code is valid. 'var u User' creates a zero-valued struct. You can then assign to individual fields.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "initialization"],
      relatedLesson: "structs"
    },
    {
      id: "structs-7",
      type: "multiple-select",
      question: "Which of the following are valid ways to initialize a struct? (Select all that apply)",
      options: [
        { id: "a", text: "p := Person{Name: \"Alice\", Age: 30}" },
        { id: "b", text: "p := Person{\"Alice\", 30}" },
        { id: "c", text: "p := new(Person)" },
        { id: "d", text: "p := Person()" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go supports named field initialization, positional initialization, and the new() builtin. Person() is not valid Go syntax.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "initialization"],
      relatedLesson: "structs"
    },
    {
      id: "structs-8",
      type: "scenario",
      question: "You have a large struct that is passed to many functions. What is the most idiomatic way to pass it?",
      options: [
        { id: "a", text: "Pass by value everywhere for immutability" },
        { id: "b", text: "Pass a pointer to avoid copying the large struct" },
        { id: "c", text: "Convert it to a map for flexibility" },
        { id: "d", text: "Store it in a global variable" }
      ],
      correctAnswer: "b",
      explanation: "For large structs, passing a pointer is more efficient as it avoids copying all the data.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "performance"],
      relatedLesson: "structs"
    },
    {
      id: "structs-9",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Config struct {\n    Debug   bool\n    Retries int\n}\n\nfunc main() {\n    c1 := Config{true, 3}\n    _ = c1\n    c2 := Config{Debug: true}\n    fmt.Println(c2.Retries)\n}",
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "0" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "b",
      explanation: "When using named field initialization, unspecified fields get their zero values. c2 has Retries=0.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "initialization"],
      relatedLesson: "structs"
    },
    {
      id: "structs-10",
      type: "best-practice",
      question: "Which is a best practice when defining struct fields?",
      options: [
        { id: "a", text: "Always export all fields so they are accessible everywhere" },
        { id: "b", text: "Keep struct fields unexported when they should not be modified externally" },
        { id: "c", text: "Use pointer types for all primitive fields" },
        { id: "d", text: "Include methods as fields in the struct definition" }
      ],
      correctAnswer: "b",
      explanation: "Keeping fields unexported enforces encapsulation and prevents external code from modifying internal state directly.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "encapsulation", "best-practice"],
      relatedLesson: "structs"
    }
  ],

  "embedding-structs": [
    {
      id: "embed-1",
      type: "multiple-choice",
      question: "What does struct embedding in Go do?",
      options: [
        { id: "a", text: "Creates a copy of the embedded struct" },
        { id: "b", text: "Promotes the embedded struct fields and methods to the outer struct" },
        { id: "c", text: "Creates a pointer to the embedded struct" },
        { id: "d", text: "Converts the embedded struct into an interface" }
      ],
      correctAnswer: "b",
      explanation: "Struct embedding promotes the fields and methods of the inner struct to the outer struct, allowing direct access.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "embedding"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Address struct {\n    City string\n}\n\ntype Person struct {\n    Name    string\n    Address\n}\n\nfunc main() {\n    p := Person{Name: \"Alice\", Address: Address{City: \"NYC\"}}\n    fmt.Println(p.City)\n}",
      options: [
        { id: "a", text: "NYC" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "{NYC}" },
        { id: "d", text: "" }
      ],
      correctAnswer: "a",
      explanation: "The Address struct is embedded in Person, so its fields are promoted. p.City accesses Address.City directly.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "embedding", "field-promotion"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-3",
      type: "identify-bug",
      question: "What happens when you compile this code?",
      code: "package main\n\ntype A struct {\n    X int\n}\n\ntype B struct {\n    X int\n}\n\ntype C struct {\n    A\n    B\n}\n\nfunc main() {\n    c := C{}\n    _ = c.X\n}",
      options: [
        { id: "a", text: "Returns A's X" },
        { id: "b", text: "Returns B's X" },
        { id: "c", text: "Compilation error due to ambiguous selector" },
        { id: "d", text: "Returns 0" }
      ],
      correctAnswer: "c",
      explanation: "When both embedded structs A and B have a field named X, c.X is ambiguous. You must use c.A.X or c.B.X.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "embedding", "ambiguity"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-4",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Logger struct{}\n\nfunc (l Logger) Log(msg string) {\n    fmt.Println(\"LOG:\", msg)\n}\n\ntype Server struct {\n    Logger\n    Addr string\n}\n\nfunc main() {\n    s := Server{Addr: \":8080\"}\n    s.Log(\"started\")\n}",
      options: [
        { id: "a", text: "LOG: started" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "started" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "The Logger struct methods are promoted to Server. Calling s.Log('started') invokes Logger's Log method.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "embedding", "method-promotion"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-5",
      type: "true-false",
      question: "An embedded struct in Go is the same as inheritance in OOP languages.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Go's struct embedding is composition, not inheritance. There is no polymorphism or subtyping.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "embedding", "composition"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-6",
      type: "multiple-choice",
      question: "How do you access the embedded struct itself (not its fields) in Go?",
      options: [
        { id: "a", text: "Use the type name as the field name: outer.Inner" },
        { id: "b", text: "Use outer.inner" },
        { id: "c", text: "Use outer->inner" },
        { id: "d", text: "Use outer/embedded" }
      ],
      correctAnswer: "a",
      explanation: "When a struct is embedded, the type name is used as the field name.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "embedding"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-7",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Base struct {\n    ID int\n}\n\nfunc (b Base) Describe() string {\n    return fmt.Sprintf(\"Base(%d)\", b.ID)\n}\n\ntype Derived struct {\n    Base\n}\n\nfunc (d Derived) Describe() string {\n    return fmt.Sprintf(\"Derived(%d)\", d.ID)\n}\n\nfunc main() {\n    d := Derived{Base{ID: 42}}\n    fmt.Println(d.Describe())\n}",
      options: [
        { id: "a", text: "Derived(42)" },
        { id: "b", text: "Base(42)" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "42" }
      ],
      correctAnswer: "a",
      explanation: "Derived defines its own Describe method which shadows the promoted method from Base.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "embedding", "method-shadowing"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-8",
      type: "multiple-select",
      question: "What are benefits of struct embedding in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Code reuse without inheritance" },
        { id: "b", text: "Promotion of methods and fields" },
        { id: "c", text: "Runtime type polymorphism" },
        { id: "d", text: "Simplified syntax for accessing inner fields" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Struct embedding enables code reuse through composition, promotes fields/methods, and avoids inheritance complexity.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "embedding", "composition"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-9",
      type: "scenario",
      question: "You have an embedded struct and the outer struct both define a method with the same signature. How is the call resolved?",
      options: [
        { id: "a", text: "The embedded struct method is always called" },
        { id: "b", text: "The outer struct method takes precedence; use the type name to call the embedded one" },
        { id: "c", text: "Compilation error - methods cannot be overridden" },
        { id: "d", text: "Both methods are called" }
      ],
      correctAnswer: "b",
      explanation: "The outer struct method shadows the promoted method from the embedded struct.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "embedding", "method-shadowing"],
      relatedLesson: "embedding-structs"
    },
    {
      id: "embed-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Animal struct {\n    Name string\n}\n\nfunc (a Animal) Speak() string {\n    return \"...\"\n}\n\ntype Dog struct {\n    Animal\n}\n\nfunc main() {\n    d := Dog{Animal{Name: \"Rex\"}}\n    fmt.Println(d.Name, d.Speak())\n}",
      options: [
        { id: "a", text: "Rex ..." },
        { id: "b", text: "{Rex} ..." },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Rex" }
      ],
      correctAnswer: "a",
      explanation: "Both d.Name (promoted field) and d.Speak() (promoted method) work directly.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "embedding"],
      relatedLesson: "embedding-structs"
    }
  ],

  "struct-tags--json": [
    {
      id: "tags-1",
      type: "multiple-choice",
      question: "What is the purpose of struct tags in Go?",
      options: [
        { id: "a", text: "To add metadata that can be read by packages like encoding/json" },
        { id: "b", text: "To define methods on the struct" },
        { id: "c", text: "To set default values for fields" },
        { id: "d", text: "To enforce type constraints" }
      ],
      correctAnswer: "a",
      explanation: "Struct tags are string literals that provide metadata. They are used by encoding/json, encoding/xml, etc.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "tags"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-2",
      type: "code-output",
      question: "What does this JSON marshaling produce?",
      code: "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype User struct {\n    Name  string `json:\"name\"`\n    Email string `json:\"email\"`\n}\n\nfunc main() {\n    u := User{Name: \"Alice\", Email: \"alice@example.com\"}\n    b, _ := json.Marshal(u)\n    fmt.Println(string(b))\n}",
      options: [
        { id: "a", text: "{\"name\":\"Alice\",\"email\":\"alice@example.com\"}" },
        { id: "b", text: "{\"Name\":\"Alice\",\"Email\":\"alice@example.com\"}" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "{Alice alice@example.com}" }
      ],
      correctAnswer: "a",
      explanation: "The json struct tags rename the fields to lowercase in the JSON output.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "tags", "json"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-3",
      type: "multiple-choice",
      question: "How do you make a struct field omit from JSON when it has a zero value?",
      options: [
        { id: "a", text: "json:\"field_name,omitempty\"" },
        { id: "b", text: "json:\"field_name,exclude\"" },
        { id: "c", text: "json:\"-\"" },
        { id: "d", text: "json:\"field_name,zero\"" }
      ],
      correctAnswer: "a",
      explanation: "The 'omitempty' option omits the field from JSON output when it has a zero value.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "tags", "json"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-4",
      type: "code-output",
      question: "What does this code produce?",
      code: "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype Response struct {\n    Data  string `json:\"data\"`\n    Token string `json:\"-\"`\n}\n\nfunc main() {\n    r := Response{Data: \"hello\", Token: \"secret123\"}\n    b, _ := json.Marshal(r)\n    fmt.Println(string(b))\n}",
      options: [
        { id: "a", text: "{\"data\":\"hello\"}" },
        { id: "b", text: "{\"data\":\"hello\",\"Token\":\"secret123\"}" },
        { id: "c", text: "{\"data\":\"hello\",\"token\":\"secret123\"}" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The json:\"-\" tag tells the marshaler to always skip this field.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "tags", "json"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-5",
      type: "true-false",
      question: "Struct tags are accessible at runtime via the reflect package.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "You can use the reflect package to read struct tags at runtime.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "tags", "reflection"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-6",
      type: "code-output",
      question: "What JSON is produced by this code?",
      code: "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype Config struct {\n    Host string         `json:\"host\"`\n    Port int            `json:\"port,omitempty\"`\n    Tags []string       `json:\"tags,omitempty\"`\n}\n\nfunc main() {\n    c := Config{Host: \"localhost\"}\n    b, _ := json.Marshal(c)\n    fmt.Println(string(b))\n}",
      options: [
        { id: "a", text: "{\"host\":\"localhost\"}" },
        { id: "b", text: "{\"host\":\"localhost\",\"port\":0,\"tags\":null}" },
        { id: "c", text: "{\"host\":\"localhost\",\"port\":0,\"tags\":[]}" },
        { id: "d", text: "{}" }
      ],
      correctAnswer: "a",
      explanation: "Port is 0 and Tags is nil, both zero values. The omitempty tag causes them to be omitted.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "tags", "json"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-7",
      type: "multiple-select",
      question: "Which packages commonly use struct tags? (Select all that apply)",
      options: [
        { id: "a", text: "encoding/json" },
        { id: "b", text: "encoding/xml" },
        { id: "c", text: "database/sql (via sql drivers)" },
        { id: "d", text: "fmt" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "encoding/json, encoding/xml, and database/sql use struct tags. The fmt package does not.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "tags"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-8",
      type: "identify-bug",
      question: "What is wrong with this struct tag?",
      code: "type User struct {\n    Name  string `json: \"name\"`\n    Email string `json:\"email\"`\n}",
      options: [
        { id: "a", text: "The first tag has a space between json: and the value" },
        { id: "b", text: "Nothing, it is valid" },
        { id: "c", text: "Tags must use single quotes" },
        { id: "d", text: "json is not a valid tag name" }
      ],
      correctAnswer: "a",
      explanation: "Struct tags must not have a space between the colon and the value. The extra space makes it invalid.",
      difficulty: "hard",
      points: 30,
      tags: ["structs", "tags", "syntax"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-9",
      type: "code-output",
      question: "What does this JSON unmarshaling produce?",
      code: "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype Event struct {\n    Name string `json:\"event_name\"`\n}\n\nfunc main() {\n    data := `{\"event_name\":\"launch\"}`\n    var e Event\n    json.Unmarshal([]byte(data), &e)\n    fmt.Println(e.Name)\n}",
      options: [
        { id: "a", text: "launch" },
        { id: "b", text: "" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "event_name" }
      ],
      correctAnswer: "a",
      explanation: "json.Unmarshal uses the json struct tags to map JSON keys to struct fields.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "tags", "json"],
      relatedLesson: "struct-tags--json"
    },
    {
      id: "tags-10",
      type: "best-practice",
      question: "When should you use the omitempty JSON tag option?",
      options: [
        { id: "a", text: "Always, on every JSON field" },
        { id: "b", text: "When the zero value should not appear in the JSON output" },
        { id: "c", text: "Only for string fields" },
        { id: "d", text: "When you want to make the field private" }
      ],
      correctAnswer: "b",
      explanation: "Use omitempty when a zero value should not be included in the JSON output.",
      difficulty: "medium",
      points: 20,
      tags: ["structs", "tags", "json", "best-practice"],
      relatedLesson: "struct-tags--json"
    }
  ],

  "methods-vs-functions": [
    {
      id: "mvf-1",
      type: "multiple-choice",
      question: "What is the difference between a method and a function in Go?",
      options: [
        { id: "a", text: "Methods are defined on a receiver type; functions are standalone" },
        { id: "b", text: "There is no difference" },
        { id: "c", text: "Methods must return a value; functions cannot" },
        { id: "d", text: "Functions can only be in packages; methods can be in structs" }
      ],
      correctAnswer: "a",
      explanation: "Methods in Go are functions with a special receiver argument.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "functions"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Rectangle struct {\n    Width, Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc main() {\n    rect := Rectangle{Width: 5, Height: 3}\n    fmt.Println(rect.Area())\n}",
      options: [
        { id: "a", text: "15" },
        { id: "b", text: "8" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "{5 3}" }
      ],
      correctAnswer: "a",
      explanation: "Area is a method on Rectangle. It computes Width * Height = 5 * 3 = 15.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "value-receiver"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-3",
      type: "true-false",
      question: "Methods in Go can only be defined on struct types.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Methods can be defined on any named type, including non-struct types.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "types"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-4",
      type: "multiple-select",
      question: "When should you prefer a method over a function? (Select all that apply)",
      options: [
        { id: "a", text: "When the operation is closely tied to a specific type" },
        { id: "b", text: "When you need to implement an interface" },
        { id: "c", text: "When you want to use the function as a standalone utility" },
        { id: "d", text: "When you want polymorphic behavior via interfaces" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Methods are preferred when the operation belongs to a type, implementing interfaces, or for polymorphism.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "functions", "design"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-5",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype Celsius float64\n\nfunc (c Celsius) ToFahrenheit() float64 {\n    return float64(c)*9/5 + 32\n}\n\nfunc main() {\n    temp := Celsius(100)\n    fmt.Println(temp.ToFahrenheit())\n}",
      options: [
        { id: "a", text: "212" },
        { id: "b", text: "100" },
        { id: "c", text: "37" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "A method can be defined on any named type. 100 * 9/5 + 32 = 212.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "named-types"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-6",
      type: "scenario",
      question: "You want a function that calculates distance between two points. Should you use a method or function?",
      options: [
        { id: "a", text: "Method on Point" },
        { id: "b", text: "Standalone function" },
        { id: "c", text: "Either works equally well" },
        { id: "d", text: "Neither, use a global variable" }
      ],
      correctAnswer: "c",
      explanation: "Both approaches are valid and idiomatic in Go.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "functions", "design"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n    value int\n}\n\nfunc (c *Counter) Increment() {\n    c.value++\n}\n\nfunc (c Counter) Value() int {\n    return c.value\n}\n\nfunc main() {\n    c := Counter{value: 5}\n    c.Increment()\n    c.Increment()\n    fmt.Println(c.Value())\n}",
      options: [
        { id: "a", text: "7" },
        { id: "b", text: "5" },
        { id: "c", text: "6" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "Increment uses a pointer receiver and modifies the original. Two increments bring 5 to 7.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-8",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Greeter struct {\n    Name string\n}\n\nfunc (g Greeter) Greet() string {\n    return \"Hello, \" + g.Name\n}\n\nfunc main() {\n    g := Greeter{Name: \"World\"}\n    fmt.Println(Greet(g))\n}",
      options: [
        { id: "a", text: "Greet is a method, not a function - should be g.Greet()" },
        { id: "b", text: "Missing return type" },
        { id: "c", text: "Cannot create Greeter literal" },
        { id: "d", text: "Nothing, it compiles and runs" }
      ],
      correctAnswer: "a",
      explanation: "Greet is a method on Greeter, so it must be called as g.Greet().",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "syntax"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-9",
      type: "multiple-choice",
      question: "Which is true about method sets in Go?",
      options: [
        { id: "a", text: "The method set of type T includes only methods with value receivers" },
        { id: "b", text: "The method set of type T includes both value and pointer receiver methods" },
        { id: "c", text: "The method set of *T includes only pointer receiver methods" },
        { id: "d", text: "Method sets are not important in Go" }
      ],
      correctAnswer: "a",
      explanation: "The method set of T includes only value-receiver methods. *T includes both.",
      difficulty: "hard",
      points: 30,
      tags: ["methods", "method-sets"],
      relatedLesson: "methods-vs-functions"
    },
    {
      id: "mvf-10",
      type: "best-practice",
      question: "What is the recommended naming convention for exported methods in Go?",
      options: [
        { id: "a", text: "Use camelCase starting with lowercase" },
        { id: "b", text: "Use PascalCase to export, camelCase to keep unexported" },
        { id: "c", text: "Use snake_case for readability" },
        { id: "d", text: "Prefix with the type name like GetPersonName" }
      ],
      correctAnswer: "b",
      explanation: "Exported methods use PascalCase, unexported use camelCase. Avoid redundant prefixes.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "naming", "best-practice"],
      relatedLesson: "methods-vs-functions"
    }
  ],
  "value-receivers": [
    {
      id: "vr-1",
      type: "multiple-choice",
      question: "What happens when a method has a value receiver?",
      options: [
        { id: "a", text: "The method receives a copy of the receiver value" },
        { id: "b", text: "The method receives a reference to the original value" },
        { id: "c", text: "The method cannot modify any data" },
        { id: "d", text: "The method receives a pointer to the value" }
      ],
      correctAnswer: "a",
      explanation: "A value receiver creates a copy of the receiver. Modifications affect only the copy.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "value-receiver"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n    Count int\n}\n\nfunc (c Counter) Add(n int) {\n    c.Count += n\n}\n\nfunc main() {\n    c := Counter{Count: 10}\n    c.Add(5)\n    fmt.Println(c.Count)\n}",
      options: [
        { id: "a", text: "10" },
        { id: "b", text: "15" },
        { id: "c", text: "5" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "Add uses a value receiver, so c is copied. Original c.Count remains 10.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "value-receiver"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-3",
      type: "true-false",
      question: "Methods with value receivers cannot be called on pointer values.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Go automatically dereferences pointers when calling methods.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "value-receiver"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype Point struct {\n    X, Y int\n}\n\nfunc main() {\n    p1 := Point{1, 2}\n    p2 := p1\n    p2.X = 10\n    fmt.Println(p1.X, p2.X)\n}",
      options: [
        { id: "a", text: "1 10" },
        { id: "b", text: "10 10" },
        { id: "c", text: "1 1" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "Structs are value types. p2 := p1 creates a copy. Modifying p2.X does not affect p1.",
      difficulty: "easy",
      points: 10,
      tags: ["structs", "value-type"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-5",
      type: "scenario",
      question: "You have a method that reads struct fields but never modifies them. Which receiver type should you use?",
      options: [
        { id: "a", text: "Pointer receiver for safety" },
        { id: "b", text: "Value receiver since no modification is needed" },
        { id: "c", text: "It does not matter" },
        { id: "d", text: "Interface receiver" }
      ],
      correctAnswer: "b",
      explanation: "Use a value receiver when the method does not need to modify the receiver.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "value-receiver", "best-practice"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-6",
      type: "multiple-choice",
      question: "When is a value receiver preferred over a pointer receiver?",
      options: [
        { id: "a", text: "When the receiver is a small struct and the method does not modify it" },
        { id: "b", text: "Always" },
        { id: "c", text: "When the method needs to modify the receiver" },
        { id: "d", text: "When the struct contains a slice field" }
      ],
      correctAnswer: "a",
      explanation: "Value receivers are preferred for small structs when no mutation is needed.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "value-receiver", "performance"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Pair struct {\n    A, B int\n}\n\nfunc (p Pair) Sum() int {\n    return p.A + p.B\n}\n\nfunc main() {\n    p := Pair{A: 3, B: 7}\n    fmt.Println(p.Sum())\n}",
      options: [
        { id: "a", text: "10" },
        { id: "b", text: "3" },
        { id: "c", text: "7" },
        { id: "d", text: "{3 7}" }
      ],
      correctAnswer: "a",
      explanation: "The Sum method adds A and B: 3 + 7 = 10.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "value-receiver"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-8",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Name struct {\n    First, Last string\n}\n\nfunc (n Name) SetFirst(name string) {\n    n.First = name\n}\n\nfunc main() {\n    n := Name{First: \"John\", Last: \"Doe\"}\n    n.SetFirst(\"Jane\")\n    fmt.Println(n.First)\n}",
      options: [
        { id: "a", text: "SetFirst uses a value receiver so n.First is still John" },
        { id: "b", text: "Compilation error on SetFirst" },
        { id: "c", text: "Cannot access n.First after calling a method" },
        { id: "d", text: "Nothing, it prints Jane" }
      ],
      correctAnswer: "a",
      explanation: "The value receiver means SetFirst operates on a copy. Original n.First remains 'John'.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "value-receiver", "bug"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-9",
      type: "multiple-select",
      question: "Which are true about value receivers? (Select all that apply)",
      options: [
        { id: "a", text: "They receive a copy of the original value" },
        { id: "b", text: "They can be called on both values and pointers" },
        { id: "c", text: "They always prevent modification of the receiver" },
        { id: "d", text: "They are safe for concurrent access" }
      ],
      correctAnswer: ["a", "b"],
      explanation: "Value receivers get a copy and can be called on both values and pointers.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "value-receiver"],
      relatedLesson: "value-receivers"
    },
    {
      id: "vr-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Animal struct {\n    Name string\n}\n\nfunc (a Animal) GetName() string {\n    return a.Name\n}\n\nfunc main() {\n    a := &Animal{Name: \"Rex\"}\n    fmt.Println(a.GetName())\n}",
      options: [
        { id: "a", text: "Rex" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "&Rex" },
        { id: "d", text: "{Rex}" }
      ],
      correctAnswer: "a",
      explanation: "Go automatically dereferences the pointer when calling GetName().",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "value-receiver"],
      relatedLesson: "value-receivers"
    }
  ],

  "pointer-receivers": [
    {
      id: "pr-1",
      type: "multiple-choice",
      question: "When should you use a pointer receiver?",
      options: [
        { id: "a", text: "When the method needs to modify the receiver" },
        { id: "b", text: "When the method only reads data" },
        { id: "c", text: "Only for primitive types" },
        { id: "d", text: "Never" }
      ],
      correctAnswer: "a",
      explanation: "Pointer receivers allow methods to modify the original value.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n    value int\n}\n\nfunc (c *Counter) Increment() {\n    c.value++\n}\n\nfunc main() {\n    c := &Counter{value: 0}\n    c.Increment()\n    c.Increment()\n    c.Increment()\n    fmt.Println(c.value)\n}",
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "0" },
        { id: "c", text: "1" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The pointer receiver allows Increment to modify the original Counter. After three calls, value is 3.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-3",
      type: "true-false",
      question: "If any method on a type uses a pointer receiver, all methods should use pointer receivers for consistency.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "The Go style guide recommends consistency: if one method needs a pointer receiver, all methods should.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "pointer-receiver", "best-practice"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype BankAccount struct {\n    Balance float64\n}\n\nfunc (b *BankAccount) Deposit(amount float64) {\n    b.Balance += amount\n}\n\nfunc (b BankAccount) GetBalance() float64 {\n    return b.Balance\n}\n\nfunc main() {\n    acc := &BankAccount{}\n    acc.Deposit(100)\n    acc.Deposit(50)\n    fmt.Println(acc.GetBalance())\n}",
      options: [
        { id: "a", text: "150" },
        { id: "b", text: "50" },
        { id: "c", text: "100" },
        { id: "d", text: "0" }
      ],
      correctAnswer: "a",
      explanation: "Deposit modifies balance via pointer receiver. GetBalance reads it. Total is 150.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-5",
      type: "multiple-select",
      question: "Which require pointer receivers? (Select all that apply)",
      options: [
        { id: "a", text: "Methods that modify the receiver's fields" },
        { id: "b", text: "Methods on types implementing interfaces with pointer-receiver methods" },
        { id: "c", text: "Methods that only return computed values" },
        { id: "d", text: "Methods where copying a large struct should be avoided" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Pointer receivers are needed for modification, interface satisfaction, and avoiding large struct copies.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Node struct {\n    Value int\n    Next  *Node\n}\n\nfunc (n *Node) Append(val int) {\n    for n.Next != nil {\n        n = n.Next\n    }\n    n.Next = &Node{Value: val}\n}\n\nfunc main() {\n    head := &Node{Value: 1}\n    head.Append(2)\n    head.Append(3)\n    fmt.Println(head.Next.Next.Value)\n}",
      options: [
        { id: "a", text: "Nothing - it prints 3" },
        { id: "b", text: "Cannot append to a nil Next" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic on nil pointer dereference" }
      ],
      correctAnswer: "a",
      explanation: "The code correctly traverses to the last node and appends. head is 1->2->3.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Thing struct {\n    X int\n}\n\nfunc (t *Thing) SetX(val int) {\n    t.X = val\n}\n\nfunc main() {\n    t1 := Thing{X: 10}\n    t2 := t1\n    t2.SetX(20)\n    fmt.Println(t1.X, t2.X)\n}",
      options: [
        { id: "a", text: "10 20" },
        { id: "b", text: "20 20" },
        { id: "c", text: "10 10" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "t2 := t1 creates a copy. t2.SetX(20) modifies the copy, t1 remains 10.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "pointer-receiver", "value-copy"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-8",
      type: "multiple-choice",
      question: "What is the method set of *T in Go?",
      options: [
        { id: "a", text: "Only methods with pointer receivers on T" },
        { id: "b", text: "Methods with both value receivers and pointer receivers on T" },
        { id: "c", text: "Only methods with value receivers" },
        { id: "d", text: "All functions in the package" }
      ],
      correctAnswer: "b",
      explanation: "The method set of *T includes all methods with value receivers AND all with pointer receivers.",
      difficulty: "hard",
      points: 30,
      tags: ["methods", "pointer-receiver", "method-sets"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-9",
      type: "scenario",
      question: "You have a struct with a map field and want a method to add a key-value pair. Which receiver?",
      options: [
        { id: "a", text: "Value receiver - maps are reference types" },
        { id: "b", text: "Pointer receiver - to signal possible modification" },
        { id: "c", text: "Either works identically" },
        { id: "d", text: "Neither - use a standalone function" }
      ],
      correctAnswer: "b",
      explanation: "Using a pointer receiver is more idiomatic when the method has side effects.",
      difficulty: "medium",
      points: 20,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "pointer-receivers"
    },
    {
      id: "pr-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Toggle struct {\n    state bool\n}\n\nfunc (t *Toggle) Flip() {\n    t.state = !t.state\n}\n\nfunc (t Toggle) IsOn() bool {\n    return t.state\n}\n\nfunc main() {\n    var t Toggle\n    fmt.Println(t.IsOn())\n    t.Flip()\n    fmt.Println(t.IsOn())\n    t.Flip()\n    fmt.Println(t.IsOn())\n}",
      options: [
        { id: "a", text: "false true false" },
        { id: "b", text: "true false true" },
        { id: "c", text: "false false false" },
        { id: "d", text: "true true true" }
      ],
      correctAnswer: "a",
      explanation: "Initial state is false. Flip toggles to true, then back to false.",
      difficulty: "easy",
      points: 10,
      tags: ["methods", "pointer-receiver"],
      relatedLesson: "pointer-receivers"
    }
  ],
  "pointers-with-structs": [
    {
      id: "ps-1",
      type: "multiple-choice",
      question: "What does the new() function return when used with a struct?",
      options: [
        { id: "a", text: "A pointer to a zero-valued struct" },
        { id: "b", text: "A zero-valued struct" },
        { id: "c", text: "nil" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "new(T) allocates memory for a zero-valued T and returns a *T.",
      difficulty: "easy",
      points: 10,
      tags: ["pointers", "structs", "new"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    p := &Person{Name: \"Alice\", Age: 30}\n    fmt.Println(p.Name)\n}",
      options: [
        { id: "a", text: "Alice" },
        { id: "b", text: "{Alice 30}" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "&Alice" }
      ],
      correctAnswer: "a",
      explanation: "Go allows direct field access through pointers.",
      difficulty: "easy",
      points: 10,
      tags: ["pointers", "structs"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-3",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype Rect struct {\n    W, H int\n}\n\nfunc area(r *Rect) int {\n    return r.W * r.H\n}\n\nfunc main() {\n    r := &Rect{W: 4, H: 5}\n    fmt.Println(area(r))\n}",
      options: [
        { id: "a", text: "20" },
        { id: "b", text: "9" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "{4 5}" }
      ],
      correctAnswer: "a",
      explanation: "The function takes a pointer to Rect and returns the area: 4 * 5 = 20.",
      difficulty: "easy",
      points: 10,
      tags: ["pointers", "structs"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-4",
      type: "true-false",
      question: "In Go, you can call a method that expects a value receiver by passing a pointer.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Go automatically dereferences pointers when calling methods.",
      difficulty: "easy",
      points: 10,
      tags: ["pointers", "structs"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-5",
      type: "identify-bug",
      question: "What happens when you run this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Config struct {\n    Debug bool\n}\n\nfunc SetDebug(c *Config) {\n    c.Debug = true\n}\n\nfunc main() {\n    var c Config\n    SetDebug(c)\n    fmt.Println(c.Debug)\n}",
      options: [
        { id: "a", text: "true" },
        { id: "b", text: "false" },
        { id: "c", text: "Compilation error - must pass &c to SetDebug" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "c",
      explanation: "SetDebug expects *Config but c is Config. You must call SetDebug(&c).",
      difficulty: "medium",
      points: 20,
      tags: ["pointers", "structs", "bug"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-6",
      type: "multiple-select",
      question: "Which are true about pointers and structs in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Go does not support pointer arithmetic" },
        { id: "b", text: "The & operator gets the address of a struct" },
        { id: "c", text: "The * operator dereferences a pointer to a struct" },
        { id: "d", text: "Structs cannot be allocated on the heap" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go does not support pointer arithmetic. Structs can be heap-allocated via escape analysis.",
      difficulty: "medium",
      points: 20,
      tags: ["pointers", "structs"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Node struct {\n    Value int\n    Next  *Node\n}\n\nfunc main() {\n    n3 := &Node{Value: 3, Next: nil}\n    n2 := &Node{Value: 2, Next: n3}\n    n1 := &Node{Value: 1, Next: n2}\n    curr := n1\n    for curr != nil {\n        fmt.Print(curr.Value, \" \")\n        curr = curr.Next\n    }\n}",
      options: [
        { id: "a", text: "1 2 3" },
        { id: "b", text: "3 2 1" },
        { id: "c", text: "1 2 3 " },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "This traverses a linked list from head to tail, printing each value.",
      difficulty: "medium",
      points: 20,
      tags: ["pointers", "structs", "linked-list"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Pair struct {\n    A, B int\n}\n\nfunc swap(p *Pair) {\n    p.A, p.B = p.B, p.A\n}\n\nfunc main() {\n    p := Pair{A: 1, B: 2}\n    swap(&p)\n    fmt.Println(p.A, p.B)\n}",
      options: [
        { id: "a", text: "2 1" },
        { id: "b", text: "1 2" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "0 0" }
      ],
      correctAnswer: "a",
      explanation: "swap takes a pointer to Pair and swaps A and B.",
      difficulty: "easy",
      points: 10,
      tags: ["pointers", "structs"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-9",
      type: "scenario",
      question: "You need to write a function that initializes all fields of a large struct. What is the best approach?",
      options: [
        { id: "a", text: "Return the struct by value from the function" },
        { id: "b", text: "Accept a pointer and modify the struct in place" },
        { id: "c", text: "Use a global variable" },
        { id: "d", text: "Use a map instead of a struct" }
      ],
      correctAnswer: "b",
      explanation: "Accepting a pointer avoids copying the large struct.",
      difficulty: "medium",
      points: 20,
      tags: ["pointers", "structs", "performance"],
      relatedLesson: "pointers-with-structs"
    },
    {
      id: "ps-10",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype Employee struct {\n    Name   string\n    Salary float64\n}\n\nfunc applyRaise(e *Employee, pct float64) {\n    e.Salary *= (1 + pct / 100)\n}\n\nfunc main() {\n    emp := &Employee{Name: \"Bob\", Salary: 50000}\n    applyRaise(emp, 10)\n    fmt.Printf(\"%.0f\", emp.Salary)\n}",
      options: [
        { id: "a", text: "55000" },
        { id: "b", text: "50000" },
        { id: "c", text: "60000" },
        { id: "d", text: "5010" }
      ],
      correctAnswer: "a",
      explanation: "applyRaise modifies Salary through a pointer. 50000 * 1.1 = 55000.",
      difficulty: "easy",
      points: 10,
      tags: ["pointers", "structs"],
      relatedLesson: "pointers-with-structs"
    }
  ],

  "interfaces-basics": [
    {
      id: "ib-1",
      type: "multiple-choice",
      question: "What is an interface in Go?",
      options: [
        { id: "a", text: "A collection of method signatures that a type must satisfy" },
        { id: "b", text: "A concrete type that can be instantiated" },
        { id: "c", text: "A pointer to a struct" },
        { id: "d", text: "A function type" }
      ],
      correctAnswer: "a",
      explanation: "An interface defines a set of method signatures. Any type implementing all methods satisfies it.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Stringer interface {\n    String() string\n}\n\ntype Dog struct {\n    Name string\n}\n\nfunc (d Dog) String() string {\n    return \"Dog: \" + d.Name\n}\n\nfunc main() {\n    var s Stringer = Dog{Name: \"Rex\"}\n    fmt.Println(s)\n}",
      options: [
        { id: "a", text: "Dog: Rex" },
        { id: "b", text: "{Rex}" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Rex" }
      ],
      correctAnswer: "a",
      explanation: "Dog implements Stringer via the String() method. fmt.Println calls String().",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "Stringer"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-3",
      type: "true-false",
      question: "In Go, types must explicitly declare which interfaces they implement.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Go uses implicit interface satisfaction. No 'implements' keyword needed.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-4",
      type: "multiple-select",
      question: "Which are benefits of interfaces in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Polymorphism" },
        { id: "b", text: "Loose coupling" },
        { id: "c", text: "Performance improvement" },
        { id: "d", text: "Testability through mocking" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Interfaces provide polymorphism, loose coupling, and testability. They do not improve performance.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "benefits"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-5",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Circle struct { Radius float64 }\nfunc (c Circle) Area() float64 { return 3.14 * c.Radius * c.Radius }\n\ntype Rectangle struct { W, H float64 }\nfunc (r Rectangle) Area() float64 { return r.W * r.H }\n\nfunc printArea(s Shape) {\n    fmt.Printf(\"%.2f\\n\", s.Area())\n}\n\nfunc main() {\n    printArea(Circle{Radius: 5})\n    printArea(Rectangle{W: 4, H: 6})\n}",
      options: [
        { id: "a", text: "78.50 then 24.00" },
        { id: "b", text: "24.00 then 78.50" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "25.00 then 10.00" }
      ],
      correctAnswer: "a",
      explanation: "Circle.Area() = 3.14 * 25 = 78.50. Rectangle.Area() = 4 * 6 = 24.00.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "polymorphism"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Writer interface {\n    Write(data []byte) (int, error)\n}\n\ntype MyWriter struct{}\n\nfunc main() {\n    var w Writer = MyWriter{}\n    fmt.Println(w)\n}",
      options: [
        { id: "a", text: "Compilation error - MyWriter does not implement Writer" },
        { id: "b", text: "Prints {[]}" },
        { id: "c", text: "Writer cannot be instantiated" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "MyWriter has no Write method, so it does not satisfy Writer.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "implementation"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Notifier interface {\n    Notify(msg string)\n}\n\ntype Email struct { Addr string }\nfunc (e Email) Notify(msg string) { fmt.Printf(\"Email to %s: %s\\n\", e.Addr, msg) }\n\ntype SMS struct { Phone string }\nfunc (s SMS) Notify(msg string) { fmt.Printf(\"SMS to %s: %s\\n\", s.Phone, msg) }\n\nfunc sendAlert(n Notifier, msg string) { n.Notify(msg) }\n\nfunc main() {\n    sendAlert(Email{Addr: \"alice@test.com\"}, \"Hello\")\n    sendAlert(SMS{Phone: \"555-1234\"}, \"Hello\")\n}",
      options: [
        { id: "a", text: "Email to alice@test.com: Hello then SMS to 555-1234: Hello" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "Hello twice" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "Both Email and SMS implement Notifier. sendAlert calls Notify on each.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "polymorphism"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-8",
      type: "multiple-choice",
      question: "What is the zero value of an interface variable?",
      options: [
        { id: "a", text: "nil" },
        { id: "b", text: "An empty struct" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "An empty interface value" }
      ],
      correctAnswer: "a",
      explanation: "The zero value of any interface type is nil.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "zero-value"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-9",
      type: "scenario",
      question: "You are designing a function that can accept any type of logger. What is the best Go approach?",
      options: [
        { id: "a", text: "Define an interface with a Log method" },
        { id: "b", text: "Use type switches for each known logger type" },
        { id: "c", text: "Accept fmt.Stringer and convert" },
        { id: "d", text: "Use generics with type constraints" }
      ],
      correctAnswer: "a",
      explanation: "Defining a Logger interface is the idiomatic approach. Follow 'accept interfaces, return structs'.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "design"],
      relatedLesson: "interfaces-basics"
    },
    {
      id: "ib-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype A interface { MethodA() string }\ntype B interface { MethodB() string }\ntype AB interface { A; B }\n\ntype Thing struct{}\nfunc (t Thing) MethodA() string { return \"A\" }\nfunc (t Thing) MethodB() string { return \"B\" }\n\nfunc main() {\n    var x AB = Thing{}\n    fmt.Println(x.MethodA(), x.MethodB())\n}",
      options: [
        { id: "a", text: "A B" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "B A" },
        { id: "d", text: "AB" }
      ],
      correctAnswer: "a",
      explanation: "Interfaces can be embedded. AB combines A and B. Thing satisfies AB.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "embedding"],
      relatedLesson: "interfaces-basics"
    }
  ],
  "interfaces": [
    {
      id: "intf-1",
      type: "multiple-choice",
      question: "How many methods must a type have to satisfy an interface in Go?",
      options: [
        { id: "a", text: "All methods declared in the interface" },
        { id: "b", text: "At least one method" },
        { id: "c", text: "It must use the implements keyword" },
        { id: "d", text: "It depends on the interface name" }
      ],
      correctAnswer: "a",
      explanation: "A type satisfies an interface by implementing ALL methods declared in it.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Animal interface { Speak() string }\ntype Cat struct{}\nfunc (c Cat) Speak() string { return \"Meow\" }\ntype Dog struct{}\nfunc (d Dog) Speak() string { return \"Woof\" }\n\nfunc main() {\n    animals := []Animal{Cat{}, Dog{}, Cat{}}\n    for _, a := range animals {\n        fmt.Print(a.Speak(), \" \")\n    }\n}",
      options: [
        { id: "a", text: "Meow Woof Meow" },
        { id: "b", text: "{ } { } { }" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Meow Meow Woof" }
      ],
      correctAnswer: "a",
      explanation: "A slice of Animal holds any type implementing Animal.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "slices"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-3",
      type: "multiple-select",
      question: "Which are best practices for interfaces in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Keep interfaces small" },
        { id: "b", text: "Define interfaces where they are consumed" },
        { id: "c", text: "Define interfaces where the concrete type is defined" },
        { id: "d", text: "Accept interfaces, return structs" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Keep interfaces small, define where consumed, and accept interfaces/return structs.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "best-practice"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype Stringer interface { String() string }\n\ntype Greeter struct { Name string }\nfunc (g Greeter) String() string { return \"Hello, \" + g.Name }\n\nfunc greet(s Stringer) { fmt.Println(s.String()) }\n\nfunc main() {\n    greet(Greeter{Name: \"World\"})\n}",
      options: [
        { id: "a", text: "Hello, World" },
        { id: "b", text: "World" },
        { id: "c", text: "Hello, " },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "Greeter implements Stringer. greet calls String().",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "Stringer"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-5",
      type: "true-false",
      question: "An interface value can hold different concrete types at different times.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "An interface variable can be reassigned to hold any satisfying type.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype Closer interface { Close() error }\n\ntype File struct { Name string }\n\nfunc main() {\n    var c Closer = File{Name: \"test.txt\"}\n    fmt.Println(c)\n}",
      options: [
        { id: "a", text: "Compilation error - File does not implement Closer" },
        { id: "b", text: "Prints test.txt" },
        { id: "c", text: "Panic" },
        { id: "d", text: "Prints {test.txt}" }
      ],
      correctAnswer: "a",
      explanation: "File has no Close() method and does not satisfy Closer.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "satisfaction"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Writer interface { Write([]byte) (int, error) }\n\ntype Buffer struct { data []byte }\nfunc (b *Buffer) Write(p []byte) (int, error) {\n    b.data = append(b.data, p...)\n    return len(p), nil\n}\n\nfunc main() {\n    var w Writer = &Buffer{}\n    w.Write([]byte(\"hello\"))\n    w.Write([]byte(\" world\"))\n    fmt.Println(string(w.(*Buffer).data))\n}",
      options: [
        { id: "a", text: "hello world" },
        { id: "b", text: "hello" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "[104 101 108 108 111]" }
      ],
      correctAnswer: "a",
      explanation: "Buffer.Write appends data. Two writes produce 'hello world'.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-8",
      type: "scenario",
      question: "You are writing a package and the user wants to provide their own serialization logic. How should you design this?",
      options: [
        { id: "a", text: "Accept a function parameter" },
        { id: "b", text: "Define a Serializer interface and accept it" },
        { id: "c", text: "Hardcode JSON serialization" },
        { id: "d", text: "Use global configuration" }
      ],
      correctAnswer: "b",
      explanation: "A Serializer interface allows users to implement any strategy while keeping packages decoupled.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "design"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-9",
      type: "multiple-choice",
      question: "What happens when you call a method on a nil interface value?",
      options: [
        { id: "a", text: "Returns the zero value" },
        { id: "b", text: "Panics with a nil pointer dereference" },
        { id: "c", text: "Does nothing" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "b",
      explanation: "Calling a method on a nil interface causes a panic because Go needs the concrete type for the method lookup.",
      difficulty: "hard",
      points: 30,
      tags: ["interfaces", "nil"],
      relatedLesson: "interfaces"
    },
    {
      id: "intf-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Reader interface { Read() string }\ntype Writer2 interface { Write(data string) }\ntype ReadWriter interface { Reader; Writer2 }\n\ntype Memory struct { content string }\nfunc (m *Memory) Read() string  { return m.content }\nfunc (m *Memory) Write(data string) { m.content = data }\n\nfunc main() {\n    var rw ReadWriter = &Memory{}\n    rw.Write(\"data\")\n    fmt.Println(rw.Read())\n}",
      options: [
        { id: "a", text: "data" },
        { id: "b", text: "" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "data data" }
      ],
      correctAnswer: "a",
      explanation: "*Memory implements both Reader and Writer2, satisfying ReadWriter.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "composition"],
      relatedLesson: "interfaces"
    }
  ],

  "empty-interfaces": [
    {
      id: "ei-1",
      type: "multiple-choice",
      question: "What is the empty interface in Go?",
      options: [
        { id: "a", text: "interface{} - it has no method requirements" },
        { id: "b", text: "A compile-time error" },
        { id: "c", text: "interface { void }" },
        { id: "d", text: "Any type that has no methods" }
      ],
      correctAnswer: "a",
      explanation: "The empty interface (or 'any' in Go 1.18+) has no method requirements.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc printAnything(val interface{}) {\n    fmt.Println(val)\n}\n\nfunc main() {\n    printAnything(42)\n    printAnything(\"hello\")\n    printAnything(true)\n}",
      options: [
        { id: "a", text: "42, hello, true (each on separate line)" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "42hello true" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "The empty interface accepts any type.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-3",
      type: "true-false",
      question: "In Go 1.18 and later, 'any' is an alias for 'interface{}'.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Go 1.18 introduced 'any' as a built-in alias for interface{}.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-4",
      type: "multiple-select",
      question: "When is it appropriate to use the empty interface? (Select all that apply)",
      options: [
        { id: "a", text: "When a function needs to accept values of unknown types" },
        { id: "b", text: "When you want type safety for all parameters" },
        { id: "c", text: "For serialization/deserialization of dynamic data" },
        { id: "d", text: "When working with heterogeneous collections" }
      ],
      correctAnswer: ["a", "c", "d"],
      explanation: "The empty interface is useful for dynamic typing, serialization, and heterogeneous collections.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-5",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc describe(i interface{}) {\n    fmt.Printf(\"(%v, %T)\\n\", i, i)\n}\n\nfunc main() {\n    describe(42)\n    describe(\"hello\")\n    describe(3.14)\n}",
      options: [
        { id: "a", text: "(42, int) (hello, string) (3.14, float64)" },
        { id: "b", text: "(42, interface{}) (hello, interface{}) (3.14, interface{})" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "(42, int) (hello, string) (3.14, float64)" }
      ],
      correctAnswer: "a",
      explanation: "The %T verb prints the concrete type stored in the interface.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc add(a interface{}, b interface{}) interface{} {\n    return a + b\n}\n\nfunc main() {\n    result := add(1, 2)\n    fmt.Println(result)\n}",
      options: [
        { id: "a", text: "Compilation error - cannot use + on interface{} values" },
        { id: "b", text: "Prints 3" },
        { id: "c", text: "Panic" },
        { id: "d", text: "Prints 12" }
      ],
      correctAnswer: "a",
      explanation: "You cannot use arithmetic operators on interface{} values. Type-assert first.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var i interface{} = \"hello\"\n    j := i\n    fmt.Println(i == j)\n    fmt.Println(i == \"hello\")\n}",
      options: [
        { id: "a", text: "true true" },
        { id: "b", text: "true false" },
        { id: "c", text: "false false" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "Interface values can be compared. Both hold 'hello'.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-8",
      type: "multiple-choice",
      question: "What is the downside of using interface{} extensively?",
      options: [
        { id: "a", text: "Loss of compile-time type safety" },
        { id: "b", text: "Slower compilation" },
        { id: "c", text: "It is deprecated" },
        { id: "d", text: "Nothing - it is always preferred" }
      ],
      correctAnswer: "a",
      explanation: "Using interface{} sacrifices compile-time type safety.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "empty-interface"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-9",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var x interface{} = []int{1, 2, 3}\n    slice, ok := x.([]int)\n    fmt.Println(slice, ok)\n}",
      options: [
        { id: "a", text: "[1 2 3] true" },
        { id: "b", text: "[] true" },
        { id: "c", text: "nil false" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The type assertion to []int succeeds.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "empty-interface", "type-assertion"],
      relatedLesson: "empty-interfaces"
    },
    {
      id: "ei-10",
      type: "best-practice",
      question: "When using the empty interface, what should you do to recover type safety?",
      options: [
        { id: "a", text: "Use type assertions or type switches to extract the concrete type" },
        { id: "b", text: "Never use the empty interface" },
        { id: "c", text: "Convert everything to strings" },
        { id: "d", text: "Use fmt.Sprintf for all operations" }
      ],
      correctAnswer: "a",
      explanation: "Use type assertions or type switches. Prefer generics (Go 1.18+) when possible.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "empty-interface", "best-practice"],
      relatedLesson: "empty-interfaces"
    }
  ],
  "embedding-interfaces": [
    {
      id: "eintf2-1",
      type: "multiple-choice",
      question: "What does interface embedding do in Go?",
      options: [
        { id: "a", text: "Combines the method sets of multiple interfaces into one" },
        { id: "b", text: "Creates a pointer to the embedded interface" },
        { id: "c", text: "Copies the implementation of one interface to another" },
        { id: "d", text: "Is not allowed in Go" }
      ],
      correctAnswer: "a",
      explanation: "Interface embedding combines method sets.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "embedding"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-2",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype Reader interface { Read() string }\ntype Writer interface { Write(string) }\ntype ReadWriter interface { Reader; Writer }\n\ntype File struct { content string }\nfunc (f *File) Read() string { return f.content }\nfunc (f *File) Write(data string) { f.content = data }\n\nfunc main() {\n    var rw ReadWriter = &File{}\n    rw.Write(\"hello\")\n    fmt.Println(rw.Read())\n}",
      options: [
        { id: "a", text: "hello" },
        { id: "b", text: "" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "hello hello" }
      ],
      correctAnswer: "a",
      explanation: "File implements both Read and Write, satisfying ReadWriter.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "embedding"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-3",
      type: "true-false",
      question: "An interface can embed other interfaces that have overlapping method sets.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Go allows overlapping methods as long as signatures are identical.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "embedding"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-4",
      type: "identify-bug",
      question: "What happens with this code?",
      code: "package main\n\nimport \"fmt\"\n\ntype A interface { Method() }\ntype B interface { Method(); Extra() }\ntype Combined interface { A; B }\n\ntype T struct{}\nfunc (t T) Method() {}\nfunc (t T) Extra()  {}\n\nfunc main() {\n    var c Combined = T{}\n    c.Method()\n    c.Extra()\n    fmt.Println(\"ok\")\n}",
      options: [
        { id: "a", text: "Compilation error due to conflicting signatures" },
        { id: "b", text: "Prints ok" },
        { id: "c", text: "Panic" },
        { id: "d", text: "T does not implement Combined" }
      ],
      correctAnswer: "b",
      explanation: "Both A and B define Method() with the same signature. T satisfies Combined.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "embedding"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-5",
      type: "multiple-select",
      question: "Which are true about interface embedding? (Select all that apply)",
      options: [
        { id: "a", text: "The outer interface requires all methods from embedded interfaces" },
        { id: "b", text: "A type must implement all methods" },
        { id: "c", text: "Interface embedding is the same as inheritance" },
        { id: "d", text: "You can embed multiple interfaces" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Interface embedding combines method sets. It is NOT inheritance.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "embedding"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-6",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Closer interface { Close() error }\ntype Flusher interface { Flush() }\ntype WriteFlushCloser interface { Closer; Flusher }\n\ntype Stream struct{}\nfunc (s Stream) Close() error { return nil }\nfunc (s Stream) Flush()       {}\n\nfunc main() {\n    var wfc WriteFlushCloser = Stream{}\n    fmt.Println(wfc.Close())\n    wfc.Flush()\n    fmt.Println(\"done\")\n}",
      options: [
        { id: "a", text: "nil then done" },
        { id: "b", text: "done" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "0 then done" }
      ],
      correctAnswer: "a",
      explanation: "Stream satisfies WriteFlushCloser. Close() returns nil.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "embedding"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-7",
      type: "scenario",
      question: "You want to define an interface combining read, write, and close. What is the idiomatic Go approach?",
      options: [
        { id: "a", text: "Define all methods explicitly" },
        { id: "b", text: "Embed io.Reader, io.Writer, and io.Closer" },
        { id: "c", text: "Use struct embedding instead" },
        { id: "d", text: "Create abstract base classes" }
      ],
      correctAnswer: "b",
      explanation: "Go's standard library defines composite interfaces by embedding simpler ones.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "embedding", "io"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-8",
      type: "multiple-choice",
      question: "If C embeds A and B, and both define Foo() with different signatures, what happens?",
      options: [
        { id: "a", text: "Compilation error - ambiguous method signature" },
        { id: "b", text: "C takes the signature from A" },
        { id: "c", text: "C takes the signature from B" },
        { id: "d", text: "It compiles but panics" }
      ],
      correctAnswer: "a",
      explanation: "Different signatures for the same method make the combined interface invalid.",
      difficulty: "hard",
      points: 30,
      tags: ["interfaces", "embedding", "conflict"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-9",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Notifier interface { Notify(msg string) }\ntype Logger interface { Log(msg string) }\ntype AlertSystem interface { Notifier; Logger }\n\ntype SMS struct{}\nfunc (s SMS) Notify(msg string) { fmt.Printf(\"Alert: %s\\n\", msg) }\nfunc (s SMS) Log(msg string)    { fmt.Printf(\"Log: %s\\n\", msg) }\n\nfunc main() {\n    var a AlertSystem = SMS{}\n    a.Notify(\"fire\")\n    a.Log(\"fire\")\n}",
      options: [
        { id: "a", text: "Alert: fire then Log: fire" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "fire fire" },
        { id: "d", text: "Alert: fire Alert: fire" }
      ],
      correctAnswer: "a",
      explanation: "SMS satisfies AlertSystem by implementing both methods.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "embedding"],
      relatedLesson: "embedding-interfaces"
    },
    {
      id: "eintf2-10",
      type: "best-practice",
      question: "When should you embed interfaces versus defining methods explicitly?",
      options: [
        { id: "a", text: "Always embed" },
        { id: "b", text: "Embed when combining existing interfaces; define explicitly for new or small interfaces" },
        { id: "c", text: "Never embed interfaces" },
        { id: "d", text: "Only embed when using generics" }
      ],
      correctAnswer: "b",
      explanation: "Embedding is ideal for combining existing contracts. Explicit declarations are clearer for new interfaces.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "embedding", "best-practice"],
      relatedLesson: "embedding-interfaces"
    }
  ],

  "type-assertions": [
    {
      id: "ta-1",
      type: "multiple-choice",
      question: "What is a type assertion in Go?",
      options: [
        { id: "a", text: "An expression that extracts the concrete type from an interface value" },
        { id: "b", text: "A way to assert that a type implements an interface" },
        { id: "c", text: "A compile-time type check" },
        { id: "d", text: "A way to create interface values" }
      ],
      correctAnswer: "a",
      explanation: "A type assertion extracts the concrete type from an interface. Syntax: x.(T).",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var i interface{} = \"hello\"\n    s := i.(string)\n    fmt.Println(s)\n}",
      options: [
        { id: "a", text: "hello" },
        { id: "b", text: "" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "The type assertion extracts the string value. Since i holds a string, it succeeds.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-3",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var i interface{} = 42\n    s, ok := i.(string)\n    fmt.Println(s, ok)\n}",
      options: [
        { id: "a", text: "42 false" },
        { id: "b", text: "" },
        { id: "c", text: "false" },
        { id: "d", text: "false false" }
      ],
      correctAnswer: "d",
      explanation: "The comma-ok form returns the zero value and false when the assertion fails. Empty string is the zero value for string, which prints as empty, so the output is ' false'.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-assertion", "comma-ok"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-4",
      type: "true-false",
      question: "A type assertion without the comma-ok form panics if the assertion fails.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Without the comma-ok pattern, a failing type assertion causes a runtime panic.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-assertion", "panic"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-5",
      type: "identify-bug",
      question: "What will happen when this code runs?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var i interface{} = 42\n    s := i.(string)\n    fmt.Println(s)\n}",
      options: [
        { id: "a", text: "Prints 42" },
        { id: "b", text: "Panics because int cannot be asserted as string" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Prints empty string" }
      ],
      correctAnswer: "b",
      explanation: "Without comma-ok, a failing assertion panics.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-assertion", "panic"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-6",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Animal interface { Speak() string }\ntype Cat struct{}\nfunc (c Cat) Speak() string { return \"Meow\" }\n\nfunc main() {\n    var a Animal = Cat{}\n    c, ok := a.(Cat)\n    fmt.Println(c.Speak(), ok)\n}",
      options: [
        { id: "a", text: "Meow true" },
        { id: "b", text: "Meow false" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "The assertion succeeds because the interface holds a Cat.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-7",
      type: "multiple-select",
      question: "Which statements about type assertions are true? (Select all that apply)",
      options: [
        { id: "a", text: "They extract the concrete type from an interface" },
        { id: "b", text: "The comma-ok form returns a boolean indicating success" },
        { id: "c", text: "They always succeed at compile time" },
        { id: "d", text: "Without comma-ok, a failed assertion panics" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Type assertions extract concrete types, comma-ok indicates success, and without it failures cause panics.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-8",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc printType(i interface{}) {\n    if s, ok := i.(string); ok {\n        fmt.Println(\"string:\", s)\n    } else if n, ok := i.(int); ok {\n        fmt.Println(\"int:\", n)\n    } else {\n        fmt.Println(\"unknown type\")\n    }\n}\n\nfunc main() {\n    printType(\"hello\")\n    printType(42)\n    printType(3.14)\n}",
      options: [
        { id: "a", text: "string: hello, int: 42, unknown type" },
        { id: "b", text: "hello, 42, 3.14" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "string: hello, unknown type, unknown type" }
      ],
      correctAnswer: "a",
      explanation: "The function uses comma-ok type assertions to check the concrete type.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-9",
      type: "scenario",
      question: "You receive an interface{} and need to call a method specific to its concrete type. What should you do?",
      options: [
        { id: "a", text: "Call the method directly on the interface" },
        { id: "b", text: "Use a type assertion to extract the concrete type, then call the method" },
        { id: "c", text: "Convert to string and parse" },
        { id: "d", text: "Use reflect to call any method" }
      ],
      correctAnswer: "b",
      explanation: "Type assertions let you recover the concrete type and access type-specific methods.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "type-assertions"
    },
    {
      id: "ta-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var i interface{} = []int{10, 20, 30}\n    slice, ok := i.([]int)\n    if ok {\n        fmt.Println(len(slice), slice[1])\n    }\n}",
      options: [
        { id: "a", text: "3 20" },
        { id: "b", text: "30 20" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "0 0" }
      ],
      correctAnswer: "a",
      explanation: "The type assertion to []int succeeds. Length is 3, element at index 1 is 20.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-assertion"],
      relatedLesson: "type-assertions"
    }
  ],
  "type-switch": [
    {
      id: "tsw-1",
      type: "multiple-choice",
      question: "What is a type switch in Go?",
      options: [
        { id: "a", text: "A switch that branches based on the concrete type of an interface value" },
        { id: "b", text: "A regular switch comparing type names as strings" },
        { id: "c", text: "A compile-time type checking mechanism" },
        { id: "d", text: "A way to switch between packages" }
      ],
      correctAnswer: "a",
      explanation: "A type switch uses switch v := x.(type) to branch on the concrete type.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc describe(i interface{}) {\n    switch v := i.(type) {\n    case int:\n        fmt.Printf(\"int: %d\\n\", v)\n    case string:\n        fmt.Printf(\"string: %s\\n\", v)\n    default:\n        fmt.Printf(\"other: %T\\n\", v)\n    }\n}\n\nfunc main() {\n    describe(42)\n    describe(\"hello\")\n    describe(3.14)\n}",
      options: [
        { id: "a", text: "int: 42, string: hello, other: float64" },
        { id: "b", text: "42, hello, 3.14" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "int: 42, string: hello, other: float64" }
      ],
      correctAnswer: "a",
      explanation: "The type switch matches each value to its case.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-3",
      type: "true-false",
      question: "In a type switch, the variable in each case holds the value narrowed to that specific type.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Inside each case, the switch variable is automatically typed to the case's type.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc process(i interface{}) string {\n    switch v := i.(type) {\n    case int:\n        return fmt.Sprintf(\"int:%d\", v)\n    case float64:\n        return fmt.Sprintf(\"float:%.1f\", v)\n    case bool:\n        return fmt.Sprintf(\"bool:%t\", v)\n    case nil:\n        return \"nil\"\n    default:\n        return fmt.Sprintf(\"type:%T\", v)\n    }\n}\n\nfunc main() {\n    fmt.Println(process(42))\n    fmt.Println(process(nil))\n    fmt.Println(process(\"hello\"))\n}",
      options: [
        { id: "a", text: "int:42, nil, type:string" },
        { id: "b", text: "42, nil, hello" },
        { id: "c", text: "int:42, nil, string:hello" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "42 matches int, nil matches nil case, and 'hello' falls to default.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-5",
      type: "code-output",
      question: "What does this type switch do?",
      code: "package main\n\nimport \"fmt\"\n\nfunc check(i interface{}) {\n    switch i.(type) {\n    case int, string:\n        fmt.Println(\"int or string\")\n    default:\n        fmt.Println(\"other\")\n    }\n}\n\nfunc main() {\n    check(42)\n    check(\"hello\")\n    check(3.14)\n}",
      options: [
        { id: "a", text: "int or string, int or string, other" },
        { id: "b", text: "other, other, other" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "int or string, other, other" }
      ],
      correctAnswer: "a",
      explanation: "Go allows combining multiple types in a single case.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-6",
      type: "multiple-select",
      question: "Which can be used as cases in a type switch? (Select all that apply)",
      options: [
        { id: "a", text: "Concrete types like int, string, bool" },
        { id: "b", text: "Interface types like io.Reader" },
        { id: "c", text: "Pointer types like *os.File" },
        { id: "d", text: "Only basic types - not structs" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Type switch cases can use any type.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype Writer interface { Write([]byte) (int, error) }\ntype Closer interface { Close() error }\n\nfunc handle(i interface{}) {\n    switch v := i.(type) {\n    case Writer:\n        fmt.Println(\"writer\")\n    case Closer:\n        fmt.Println(\"closer\")\n    default:\n        fmt.Printf(\"unknown: %T\\n\", v)\n    }\n}\n\ntype WriteCloser struct{}\nfunc (w WriteCloser) Write(b []byte) (int, error) { return 0, nil }\nfunc (w WriteCloser) Close() error { return nil }\n\nfunc main() {\n    handle(WriteCloser{})\n}",
      options: [
        { id: "a", text: "writer" },
        { id: "b", text: "closer" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "unknown: WriteCloser" }
      ],
      correctAnswer: "a",
      explanation: "WriteCloser satisfies both, but the first matching case wins.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-8",
      type: "multiple-choice",
      question: "What is the purpose of the default case in a type switch?",
      options: [
        { id: "a", text: "It handles any type not matched by other cases" },
        { id: "b", text: "It is required for compilation" },
        { id: "c", text: "It catches compilation errors" },
        { id: "d", text: "It provides a fallback for nil values only" }
      ],
      correctAnswer: "a",
      explanation: "The default case is optional and handles unmatched types.",
      difficulty: "easy",
      points: 10,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-9",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc typeCheck(i interface{}) {\n    switch i.(type) {\n    case int:\n        fmt.Print(\"I \")\n    case string:\n        fmt.Print(\"S \")\n    case float64:\n        fmt.Print(\"F \")\n    }\n    fmt.Print(\"E \")\n}\n\nfunc main() {\n    typeCheck(42)\n    typeCheck(\"hi\")\n    typeCheck(3.14)\n    typeCheck(true)\n}",
      options: [
        { id: "a", text: "I S F E" },
        { id: "b", text: "I S F E E" },
        { id: "c", text: "I S F E E E" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "b",
      explanation: "42 prints 'I ', 'hi' prints 'S ', 3.14 prints 'F ', true has no case. All four print 'E '.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-switch"],
      relatedLesson: "type-switch"
    },
    {
      id: "tsw-10",
      type: "best-practice",
      question: "When should you use a type switch instead of multiple type assertions?",
      options: [
        { id: "a", text: "Always - type switches are faster" },
        { id: "b", text: "When you need to handle multiple different types from a single interface" },
        { id: "c", text: "Only when dealing with nil values" },
        { id: "d", text: "Never - always use type assertions" }
      ],
      correctAnswer: "b",
      explanation: "Type switches are cleaner when handling multiple possible types.",
      difficulty: "medium",
      points: 20,
      tags: ["interfaces", "type-switch", "best-practice"],
      relatedLesson: "type-switch"
    }
  ],

  "error-handling-basics": [
    {
      id: "ehb-1",
      type: "multiple-choice",
      question: "How does Go handle errors by convention?",
      options: [
        { id: "a", text: "Functions return an error as the last return value" },
        { id: "b", text: "Using try-catch-finally blocks" },
        { id: "c", text: "Using exceptions" },
        { id: "d", text: "Using global error variables" }
      ],
      correctAnswer: "a",
      explanation: "Go uses explicit error returns as the last return value.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "basics"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New(\"division by zero\")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    result, err := divide(10, 0)\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    fmt.Println(\"Result:\", result)\n}",
      options: [
        { id: "a", text: "Error: division by zero" },
        { id: "b", text: "Result: 0" },
        { id: "c", text: "Result: +Inf" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "divide(10, 0) returns an error which is detected and printed.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "basics"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-3",
      type: "true-false",
      question: "In Go, errors are values, not special language constructs.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Errors in Go are just values that implement the error interface.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "design"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc process(s string) error {\n    if s == \"\" {\n        return errors.New(\"empty string\")\n    }\n    fmt.Println(\"Processing:\", s)\n    return nil\n}\n\nfunc main() {\n    _ = process(\"hello\")\n    _ = process(\"\")\n    _ = process(\"world\")\n}",
      options: [
        { id: "a", text: "Processing: hello, Processing: world" },
        { id: "b", text: "Processing: hello, empty string, Processing: world" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "process('') returns an error (discarded with _). The others succeed.",
      difficulty: "easy",
      points: 10,
      tags: ["errors"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-5",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n)\n\nfunc main() {\n    f, err := os.Open(\"nonexistent.txt\")\n    fmt.Println(f.Name())\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n    }\n}",
      options: [
        { id: "a", text: "Uses f.Name() before checking err" },
        { id: "b", text: "Nothing - it handles the error" },
        { id: "c", text: "os.Open is deprecated" },
        { id: "d", text: "Missing import" }
      ],
      correctAnswer: "a",
      explanation: "The code accesses f.Name() before checking err, risking nil pointer dereference.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "best-practice"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-6",
      type: "multiple-select",
      question: "Which are common Go error handling patterns? (Select all that apply)",
      options: [
        { id: "a", text: "if err != nil { return err }" },
        { id: "b", text: "defer and recover" },
        { id: "c", text: "try-catch" },
        { id: "d", text: "Sentinel errors with errors.Is" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Go uses explicit error checking, defer/recover, and sentinel errors. Not try-catch.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "patterns"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc main() {\n    _, err := strconv.Atoi(\"abc\")\n    if err != nil {\n        fmt.Println(\"Failed to parse\")\n    } else {\n        fmt.Println(\"Parsed successfully\")\n    }\n}",
      options: [
        { id: "a", text: "Failed to parse" },
        { id: "b", text: "Parsed successfully" },
        { id: "c", text: "Panic" },
        { id: "d", text: "abc" }
      ],
      correctAnswer: "a",
      explanation: "strconv.Atoi('abc') fails because 'abc' is not a valid integer.",
      difficulty: "easy",
      points: 10,
      tags: ["errors"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-8",
      type: "scenario",
      question: "You are reading a file in a function. What is the idiomatic way to handle the error?",
      options: [
        { id: "a", text: "Panic if the file does not exist" },
        { id: "b", text: "Return the error to the caller" },
        { id: "c", text: "Ignore the error" },
        { id: "d", text: "Log the error and continue" }
      ],
      correctAnswer: "b",
      explanation: "The Go convention is to return errors to the caller.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "best-practice"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-9",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc readConfig() error {\n    return errors.New(\"config not found\")\n}\n\nfunc startServer() error {\n    return errors.New(\"port in use\")\n}\n\nfunc main() {\n    err1 := readConfig()\n    err2 := startServer()\n    if err1 != nil {\n        fmt.Println(err1)\n    }\n    if err2 != nil {\n        fmt.Println(err2)\n    }\n}",
      options: [
        { id: "a", text: "config not found, port in use" },
        { id: "b", text: "config not found" },
        { id: "c", text: "port in use" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "Both functions return non-nil errors, so both messages print.",
      difficulty: "easy",
      points: 10,
      tags: ["errors"],
      relatedLesson: "error-handling-basics"
    },
    {
      id: "ehb-10",
      type: "best-practice",
      question: "What should a function return when there is no error?",
      options: [
        { id: "a", text: "nil" },
        { id: "b", text: "errors.New(\"\")" },
        { id: "c", text: "A custom error with a success message" },
        { id: "d", text: "panic(nil)" }
      ],
      correctAnswer: "a",
      explanation: "When there is no error, return nil.",
      difficulty: "easy",
      points: 10,
      tags: ["errors"],
      relatedLesson: "error-handling-basics"
    }
  ],
  "error-interface": [
    {
      id: "eiintf-1",
      type: "multiple-choice",
      question: "What does the error interface in Go look like?",
      options: [
        { id: "a", text: "type error interface { Error() string }" },
        { id: "b", text: "type error interface { String() string }" },
        { id: "c", text: "type error interface { Message() string }" },
        { id: "d", text: "type error interface { Err() string }" }
      ],
      correctAnswer: "a",
      explanation: "The built-in error interface requires a single method: Error() string.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "interface"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype ValidationError struct {\n    Field   string\n    Message string\n}\n\nfunc (e ValidationError) Error() string {\n    return fmt.Sprintf(\"validation error on %s: %s\", e.Field, e.Message)\n}\n\nfunc validate(name string) error {\n    if name == \"\" {\n        return ValidationError{Field: \"name\", Message: \"required\"}\n    }\n    return nil\n}\n\nfunc main() {\n    err := validate(\"\")\n    if err != nil {\n        fmt.Println(err)\n    }\n}",
      options: [
        { id: "a", text: "validation error on name: required" },
        { id: "b", text: "required" },
        { id: "c", text: "{name required}" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "ValidationError implements the error interface via Error() method.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "interface", "custom-error"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-3",
      type: "true-false",
      question: "Any type that implements the Error() string method satisfies the error interface.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Go uses implicit interface satisfaction. Any type with Error() string satisfies error.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "interface"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype NotFoundError struct {\n    Resource string\n    ID       int\n}\n\nfunc (e NotFoundError) Error() string {\n    return fmt.Sprintf(\"%s with id %d not found\", e.Resource, e.ID)\n}\n\nfunc findUser(id int) (string, error) {\n    if id == 0 {\n        return \"\", NotFoundError{Resource: \"user\", ID: id}\n    }\n    return \"Alice\", nil\n}\n\nfunc main() {\n    user, err := findUser(0)\n    if err != nil {\n        fmt.Println(err)\n    } else {\n        fmt.Println(user)\n    }\n}",
      options: [
        { id: "a", text: "user with id 0 not found" },
        { id: "b", text: "Alice" },
        { id: "c", text: "{user 0}" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "findUser(0) returns a NotFoundError which implements the error interface.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "interface", "custom-error"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-5",
      type: "multiple-select",
      question: "What are benefits of implementing the error interface? (Select all that apply)",
      options: [
        { id: "a", text: "Rich error messages with structured data" },
        { id: "b", text: "Ability to use errors with standard library functions" },
        { id: "c", text: "Automatic error recovery" },
        { id: "d", text: "Programmatic error inspection via type assertions" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Custom error types provide rich messages, work with standard library, and allow programmatic inspection.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "interface"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\ntype MyError struct {\n    Code int\n}\n\nfunc (e *MyError) Error() string {\n    return \"error\"\n}\n\nfunc main() {\n    var err error = MyError{Code: 404}\n    _ = err\n}",
      options: [
        { id: "a", text: "MyError does not implement error - Error method is on *MyError pointer receiver" },
        { id: "b", text: "Nothing - it compiles" },
        { id: "c", text: "MyError cannot be used as error" },
        { id: "d", text: "Missing return value" }
      ],
      correctAnswer: "a",
      explanation: "Error() is defined on *MyError (pointer receiver), so only *MyError satisfies error. MyError (value) does not.",
      difficulty: "hard",
      points: 30,
      tags: ["errors", "interface", "pointer-receiver"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\ntype timeoutError struct {\n    seconds int\n}\n\nfunc (e timeoutError) Error() string {\n    return fmt.Sprintf(\"timeout after %d seconds\", e.seconds)\n}\n\nfunc doWork() error {\n    return timeoutError{seconds: 30}\n}\n\nfunc main() {\n    err := doWork()\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "timeout after 30 seconds" },
        { id: "b", text: "{30}" },
        { id: "c", text: "timeout" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "timeoutError implements error. The Error() method formats the message.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "interface", "custom-error"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-8",
      type: "scenario",
      question: "You want errors in your package to include both a message and a numeric code. What is the best approach?",
      options: [
        { id: "a", text: "Return error codes as separate values" },
        { id: "b", text: "Create a custom error type with a Code field and implement Error()" },
        { id: "c", text: "Use fmt.Errorf with a formatted message" },
        { id: "d", text: "Use panic with a formatted message" }
      ],
      correctAnswer: "b",
      explanation: "A custom error type with a Code field lets you carry both message and code while satisfying the error interface.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "interface", "design"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-9",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\ntype PathError struct {\n    Op   string\n    Path string\n    Err  error\n}\n\nfunc (e *PathError) Error() string {\n    return fmt.Sprintf(\"%s %s: %v\", e.Op, e.Path, e.Err)\n}\n\nfunc open(name string) error {\n    return &PathError{Op: \"open\", Path: name, Err: errors.New(\"permission denied\")}\n}\n\nfunc main() {\n    err := open(\"/etc/passwd\")\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "open /etc/passwd: permission denied" },
        { id: "b", text: "permission denied" },
        { id: "c", text: "open /etc/passwd" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "PathError implements Error() and wraps the inner error message.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "interface", "custom-error"],
      relatedLesson: "error-interface"
    },
    {
      id: "eiintf-10",
      type: "best-practice",
      question: "When creating custom error types, what is the recommended approach?",
      options: [
        { id: "a", text: "Always embed error in your custom error struct" },
        { id: "b", text: "Implement the Error() string method and include useful context fields" },
        { id: "c", text: "Use fmt.Println to display errors" },
        { id: "d", text: "Return string instead of error" }
      ],
      correctAnswer: "b",
      explanation: "Implement Error() string and include fields that provide context for debugging and programmatic inspection.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "interface", "best-practice"],
      relatedLesson: "error-interface"
    }
  ],

  "errorsnew": [
    {
      id: "en-1",
      type: "multiple-choice",
      question: "What does errors.New() return?",
      options: [
        { id: "a", text: "An error with the given message" },
        { id: "b", text: "A string representation of the error" },
        { id: "c", text: "A pointer to an error struct" },
        { id: "d", text: "A panic value" }
      ],
      correctAnswer: "a",
      explanation: "errors.New() creates and returns a new error with the specified message string.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "errors.New"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc main() {\n    err := errors.New(\"something went wrong\")\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "something went wrong" },
        { id: "b", text: "{something went wrong}" },
        { id: "c", text: "&{something went wrong}" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "fmt.Println calls the Error() method on the error, printing the message string.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "errors.New"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-3",
      type: "true-false",
      question: "errors.New() returns a value that implements the error interface.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "errors.New() returns a *stringError which implements Error() string.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "errors.New", "interface"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrNotFound = errors.New(\"not found\")\n\nfunc find(id int) (string, error) {\n    if id < 0 {\n        return \"\", ErrNotFound\n    }\n    return \"found\", nil\n}\n\nfunc main() {\n    _, err := find(-1)\n    fmt.Println(err == ErrNotFound)\n}",
      options: [
        { id: "a", text: "true" },
        { id: "b", text: "false" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "errors.New returns the same pointer each time for the same package-level variable. Direct comparison works.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "errors.New", "comparison"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-5",
      type: "multiple-select",
      question: "When should you use errors.New()? (Select all that apply)",
      options: [
        { id: "a", text: "For simple, static error messages" },
        { id: "b", text: "When you need to include dynamic values in the message" },
        { id: "c", text: "For sentinel errors defined as package-level variables" },
        { id: "d", text: "When you need structured error data" }
      ],
      correctAnswer: ["a", "c"],
      explanation: "errors.New is best for static messages and sentinel errors. For dynamic messages, use fmt.Errorf.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "errors.New", "best-practice"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-6",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc main() {\n    err1 := errors.New(\"error\")\n    err2 := errors.New(\"error\")\n    fmt.Println(err1 == err2)\n    fmt.Println(err1.Error() == err2.Error())\n}",
      options: [
        { id: "a", text: "false true" },
        { id: "b", text: "true true" },
        { id: "c", text: "false false" },
        { id: "d", text: "true false" }
      ],
      correctAnswer: "a",
      explanation: "Two calls to errors.New with the same string create different pointers. == compares pointers (false), but Error() strings are equal (true).",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "errors.New", "comparison"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-7",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc main() {\n    err := errors.New(\"oops\")\n    fmt.Println(err.Error)\n}",
      options: [
        { id: "a", text: "err.Error is a method, not a field - should be err.Error()" },
        { id: "b", text: "errors.New is deprecated" },
        { id: "c", text: "Missing import" },
        { id: "d", text: "Nothing, it compiles" }
      ],
      correctAnswer: "a",
      explanation: "Error is a method on the error type. You must call it as err.Error(), not access it as err.Error.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "errors.New", "syntax"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-8",
      type: "scenario",
      question: "You need to create a simple error message in a function. Which is the simplest approach?",
      options: [
        { id: "a", text: "errors.New(\"invalid input\")" },
        { id: "b", text: "fmt.Errorf(\"invalid input\")" },
        { id: "c", text: "panic(\"invalid input\")" },
        { id: "d", text: "var err error = nil" }
      ],
      correctAnswer: "a",
      explanation: "For simple static messages, errors.New is the most direct approach. fmt.Errorf also works but is more suited for formatted messages.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "errors.New"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-9",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrAuth = errors.New(\"authentication failed\")\n\nfunc login(user string) error {\n    if user == \"admin\" {\n        return nil\n    }\n    return ErrAuth\n}\n\nfunc main() {\n    err := login(\"guest\")\n    fmt.Println(err)\n    fmt.Println(err == ErrAuth)\n}",
      options: [
        { id: "a", text: "authentication failed, true" },
        { id: "b", text: "authentication failed, false" },
        { id: "c", text: "nil, true" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "login('guest') returns ErrAuth. Printing it shows the message. Comparing with == returns true.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "errors.New", "sentinel"],
      relatedLesson: "errorsnew"
    },
    {
      id: "en-10",
      type: "best-practice",
      question: "What is the best practice for creating reusable error values?",
      options: [
        { id: "a", text: "Create a new error with errors.New every time" },
        { id: "b", text: "Define sentinel errors as package-level variables with errors.New" },
        { id: "c", text: "Use string comparisons for error checking" },
        { id: "d", text: "Store errors in global maps" }
      ],
      correctAnswer: "b",
      explanation: "Package-level sentinel errors (var ErrX = errors.New(...)) are the Go standard for reusable errors.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "errors.New", "best-practice"],
      relatedLesson: "errorsnew"
    }
  ],
  "fmterrorf": [
    {
      id: "fe-1",
      type: "multiple-choice",
      question: "What does fmt.Errorf do?",
      options: [
        { id: "a", text: "Creates a new error with a formatted message" },
        { id: "b", text: "Prints an error to stdout" },
        { id: "c", text: "Returns the error interface" },
        { id: "d", text: "Catches a panic" }
      ],
      correctAnswer: "a",
      explanation: "fmt.Errorf creates a new error with a formatted message, similar to fmt.Sprintf but returning an error.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "fmt.Errorf"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n)\n\nfunc main() {\n    err := fmt.Errorf(\"age must be positive, got %d\", -5)\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "age must be positive, got -5" },
        { id: "b", text: "{age must be positive, got -5}" },
        { id: "c", text: "age must be positive, got %d" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "fmt.Errorf formats the error message just like fmt.Sprintf, but returns it as an error.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "fmt.Errorf"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-3",
      type: "true-false",
      question: "fmt.Errorf is useful when you need to include dynamic values in error messages.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "fmt.Errorf uses the same formatting verbs as fmt.Sprintf, making it ideal for dynamic error messages.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "fmt.Errorf"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc validateAge(age int) error {\n    if age < 0 || age > 150 {\n        return fmt.Errorf(\"invalid age: %d\", age)\n    }\n    return nil\n}\n\nfunc main() {\n    err := validateAge(200)\n    if err != nil {\n        fmt.Println(err)\n    }\n    err = validateAge(25)\n    if err != nil {\n        fmt.Println(err)\n    } else {\n        fmt.Println(\"valid\")\n    }\n}",
      options: [
        { id: "a", text: "invalid age: 200, valid" },
        { id: "b", text: "invalid age: 200" },
        { id: "c", text: "valid" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "validateAge(200) returns an error. validateAge(25) returns nil, printing 'valid'.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "fmt.Errorf"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-5",
      type: "multiple-select",
      question: "When should you use fmt.Errorf over errors.New? (Select all that apply)",
      options: [
        { id: "a", text: "When you need to include dynamic values in the message" },
        { id: "b", text: "When you need to wrap another error with %w" },
        { id: "c", text: "For simple static error messages" },
        { id: "d", text: "When creating package-level sentinel errors" }
      ],
      correctAnswer: ["a", "b"],
      explanation: "fmt.Errorf is preferred for dynamic messages and error wrapping. errors.New is better for static messages.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "fmt.Errorf", "best-practice"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-6",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc parseNumber(s string) (int, error) {\n    n, err := strconv.Atoi(s)\n    if err != nil {\n        return 0, fmt.Errorf(\"parsing %q: %w\", s, err)\n    }\n    return n, nil\n}\n\nfunc main() {\n    _, err := parseNumber(\"abc\")\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "parsing \"abc\": strconv.Atoi: parsing \"abc\": invalid syntax" },
        { id: "b", text: "parsing abc" },
        { id: "c", text: "invalid syntax" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "fmt.Errorf wraps the strconv error using %w, creating a chain of error context.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "fmt.Errorf", "wrapping"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-7",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, fmt.Errorf(\"division by zero\")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    result, err := divide(10, 0)\n    fmt.Println(result, err)\n}",
      options: [
        { id: "a", text: "Nothing - this code works correctly" },
        { id: "b", text: "Should use errors.New instead of fmt.Errorf for static messages" },
        { id: "c", text: "fmt.Errorf cannot be used in return statements" },
        { id: "d", text: "Missing error check" }
      ],
      correctAnswer: "b",
      explanation: "For static messages without formatting, errors.New is slightly more efficient. However, this code still works correctly.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "fmt.Errorf", "errors.New", "best-practice"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-8",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\ntype ValidationError struct {\n    Field string\n    Err   error\n}\n\nfunc (e ValidationError) Error() string {\n    return fmt.Sprintf(\"%s: %v\", e.Field, e.Err)\n}\n\nfunc validate(name string) error {\n    if name == \"\" {\n        return ValidationError{\n            Field: \"name\",\n            Err:   fmt.Errorf(\"cannot be empty\"),\n        }\n    }\n    return nil\n}\n\nfunc main() {\n    err := validate(\"\")\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "name: cannot be empty" },
        { id: "b", text: "cannot be empty" },
        { id: "c", text: "{name cannot be empty}" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "ValidationError formats Field and Err using fmt.Sprintf.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "fmt.Errorf", "custom-error"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-9",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc process(data []byte) error {\n    if len(data) == 0 {\n        return fmt.Errorf(\"empty data: len=%d\", len(data))\n    }\n    fmt.Printf(\"processing %d bytes\\n\", len(data))\n    return nil\n}\n\nfunc main() {\n    _ = process([]byte{})\n    _ = process([]byte(\"hello\"))\n}",
      options: [
        { id: "a", text: "empty data: len=0, processing 5 bytes" },
        { id: "b", text: "empty data: len=0" },
        { id: "c", text: "processing 5 bytes" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "process([]byte{}) returns an error. process([]byte('hello')) succeeds, printing the length.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "fmt.Errorf"],
      relatedLesson: "fmterrorf"
    },
    {
      id: "fe-10",
      type: "best-practice",
      question: "When using fmt.Errorf, which format verb should you use to wrap another error?",
      options: [
        { id: "a", text: "%v" },
        { id: "b", text: "%w" },
        { id: "c", text: "%s" },
        { id: "d", text: "%d" }
      ],
      correctAnswer: "b",
      explanation: "%w wraps the error, allowing errors.Is and errors.As to work on the wrapped error. %v just formats it as a string.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "fmt.Errorf", "wrapping"],
      relatedLesson: "fmterrorf"
    }
  ],
  "sentinel-errors": [
    {
      id: "se-1",
      type: "multiple-choice",
      question: "What is a sentinel error in Go?",
      options: [
        { id: "a", text: "A pre-declared error variable used to check for specific error conditions" },
        { id: "b", text: "An error that causes the program to exit" },
        { id: "c", text: "An error that is always nil" },
        { id: "d", text: "An error from the standard library only" }
      ],
      correctAnswer: "a",
      explanation: "Sentinel errors are package-level variables that represent known error conditions (e.g., io.EOF, sql.ErrNoRows).",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "sentinel"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrUserNotFound = errors.New(\"user not found\")\n\nfunc findUser(id int) error {\n    if id != 1 {\n        return ErrUserNotFound\n    }\n    return nil\n}\n\nfunc main() {\n    err := findUser(2)\n    if err == ErrUserNotFound {\n        fmt.Println(\"User not found\")\n    }\n}",
      options: [
        { id: "a", text: "User not found" },
        { id: "b", text: "" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "findUser(2) returns ErrUserNotFound. The == comparison succeeds and prints the message.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "sentinel"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-3",
      type: "true-false",
      question: "Sentinel errors should be defined as exported package-level variables.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Sentinel errors are typically exported (capitalized) so callers can check for them using errors.Is or ==.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "sentinel", "naming"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-4",
      type: "multiple-select",
      question: "Which are well-known sentinel errors in Go's standard library? (Select all that apply)",
      options: [
        { id: "a", text: "io.EOF" },
        { id: "b", text: "sql.ErrNoRows" },
        { id: "c", text: "fmt.Errorf" },
        { id: "d", text: "os.ErrNotExist" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "io.EOF, sql.ErrNoRows, and os.ErrNotExist are standard sentinel errors. fmt.Errorf is a function, not a sentinel error.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "sentinel", "standard-library"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-5",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"io\"\n)\n\nfunc readAll(r io.Reader) ([]byte, error) {\n    buf := make([]byte, 1024)\n    n, err := r.Read(buf)\n    if err == io.EOF {\n        return buf[:n], nil\n    }\n    if err != nil {\n        return nil, err\n    }\n    return buf[:n], nil\n}\n\ntype emptyReader struct{}\nfunc (e emptyReader) Read(p []byte) (int, error) { return 0, io.EOF }\n\nfunc main() {\n    data, err := readAll(emptyReader{})\n    fmt.Println(len(data), err)\n}",
      options: [
        { id: "a", text: "0 <nil>" },
        { id: "b", text: "0 EOF" },
        { id: "c", text: "1024 <nil>" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "emptyReader returns io.EOF immediately. readAll catches it and returns empty data with nil error.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "sentinel", "io.EOF"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-6",
      type: "identify-bug",
      question: "What is wrong with this approach?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc getUser(id int) (string, error) {\n    if id == 0 {\n        return \"\", errors.New(\"user not found\")\n    }\n    return \"Alice\", nil\n}\n\nfunc isUserNotFound(err error) bool {\n    return err.Error() == \"user not found\"\n}\n\nfunc main() {\n    _, err := getUser(0)\n    fmt.Println(isUserNotFound(err))\n}",
      options: [
        { id: "a", text: "Comparing error strings is fragile - should use errors.Is with a sentinel error" },
        { id: "b", text: "Nothing - this works correctly" },
        { id: "c", text: "errors.New cannot be used for sentinel errors" },
        { id: "d", text: "err.Error() panics on nil errors" }
      ],
      correctAnswer: "a",
      explanation: "String comparison is fragile. If the error message changes, the check breaks. Use a sentinel variable with errors.Is instead.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "sentinel", "best-practice"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar (\n    ErrClosed   = errors.New(\"connection closed\")\n    ErrTimeout  = errors.New(\"operation timed out\")\n    ErrNotFound = errors.New(\"resource not found\")\n)\n\nfunc doWork(op string) error {\n    switch op {\n    case \"close\":\n        return ErrClosed\n    case \"timeout\":\n        return ErrTimeout\n    default:\n        return ErrNotFound\n    }\n}\n\nfunc main() {\n    err := doWork(\"timeout\")\n    switch {\n    case errors.Is(err, ErrTimeout):\n        fmt.Println(\"timed out\")\n    case errors.Is(err, ErrNotFound):\n        fmt.Println(\"not found\")\n    case errors.Is(err, ErrClosed):\n        fmt.Println(\"closed\")\n    }\n}",
      options: [
        { id: "a", text: "timed out" },
        { id: "b", text: "not found" },
        { id: "c", text: "closed" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "doWork('timeout') returns ErrTimeout. errors.Is matches it first in the switch.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "sentinel", "errors.Is"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-8",
      type: "scenario",
      question: "When should you define sentinel errors in a package?",
      options: [
        { id: "a", text: "For every possible error condition" },
        { id: "b", text: "Only for errors that callers need to check programmatically" },
        { id: "c", text: "Never - always use fmt.Errorf" },
        { id: "d", text: "Only in the main package" }
      ],
      correctAnswer: "b",
      explanation: "Sentinel errors are for conditions callers need to handle differently. Not every error needs to be a sentinel.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "sentinel", "design"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-9",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrInvalid = errors.New(\"invalid input\")\n\nfunc process(s string) error {\n    if s == \"\" {\n        return fmt.Errorf(\"process: %w\", ErrInvalid)\n    }\n    return nil\n}\n\nfunc main() {\n    err := process(\"\")\n    fmt.Println(errors.Is(err, ErrInvalid))\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "true, process: invalid input" },
        { id: "b", text: "false, process: invalid input" },
        { id: "c", text: "true, invalid input" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "errors.Is unwraps the error chain to find ErrInvalid. The message includes 'process:' prefix from fmt.Errorf.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "sentinel", "wrapping"],
      relatedLesson: "sentinel-errors"
    },
    {
      id: "se-10",
      type: "best-practice",
      question: "What is the naming convention for sentinel errors in Go?",
      options: [
        { id: "a", text: "Use lowercase and prefix with 'err'" },
        { id: "b", text: "Use Err prefix with PascalCase (e.g., ErrNotFound)" },
        { id: "c", text: "Use ALL_CAPS with underscores" },
        { id: "d", text: "Use any name as long as it starts with err" }
      ],
      correctAnswer: "b",
      explanation: "Go convention is to prefix sentinel errors with 'Err' in PascalCase: ErrNotFound, ErrClosed, etc.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "sentinel", "naming"],
      relatedLesson: "sentinel-errors"
    }
  ],
  "wrappingunwrapping-errors": [
    {
      id: "wue-1",
      type: "multiple-choice",
      question: "What does error wrapping in Go mean?",
      options: [
        { id: "a", text: "Adding context to an error while preserving the original error" },
        { id: "b", text: "Converting an error to a string" },
        { id: "c", text: "Catching a panic" },
        { id: "d", text: "Logging an error" }
      ],
      correctAnswer: "a",
      explanation: "Error wrapping adds context to an error while keeping the original error accessible via errors.Unwrap.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "wrapping"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrDB = errors.New(\"database error\")\n\nfunc query(q string) error {\n    return fmt.Errorf(\"query %q: %w\", q, ErrDB)\n}\n\nfunc main() {\n    err := query(\"SELECT *\")\n    fmt.Println(errors.Is(err, ErrDB))\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "true, query \"SELECT *\": database error" },
        { id: "b", text: "false, query SELECT *: database error" },
        { id: "c", text: "true, database error" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "%w wraps ErrDB. errors.Is unwraps to find it. The message includes the context.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "wrapping", "errors.Is"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-3",
      type: "true-false",
      question: "errors.Is traverses the error chain to find a match.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "errors.Is checks the error and all wrapped errors in the chain for a match.",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "errors.Is"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrNotFound = errors.New(\"not found\")\n\nfunc openFile(name string) error {\n    return fmt.Errorf(\"open %s: %w\", name, ErrNotFound)\n}\n\nfunc readFile(name string) error {\n    err := openFile(name)\n    return fmt.Errorf(\"read %s: %w\", name, err)\n}\n\nfunc main() {\n    err := readFile(\"config.txt\")\n    fmt.Println(errors.Is(err, ErrNotFound))\n    fmt.Println(err)\n}",
      options: [
        { id: "a", text: "true, read config.txt: open config.txt: not found" },
        { id: "b", text: "false, read config.txt: open config.txt: not found" },
        { id: "c", text: "true, not found" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "errors.Is traverses the entire chain: readFile -> openFile -> ErrNotFound. It finds the match.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "wrapping", "chain"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-5",
      type: "multiple-select",
      question: "Which functions work with wrapped errors? (Select all that apply)",
      options: [
        { id: "a", text: "errors.Is" },
        { id: "b", text: "errors.As" },
        { id: "c", text: "errors.Unwrap" },
        { id: "d", text: "errors.New" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "errors.Is, errors.As, and errors.Unwrap all traverse error chains. errors.New creates new errors.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "wrapping"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-6",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\ntype PathError struct {\n    Op   string\n    Path string\n    Err  error\n}\n\nfunc (e *PathError) Error() string { return e.Op + \" \" + e.Path + \": \" + e.Err.Error() }\nfunc (e *PathError) Unwrap() error { return e.Err }\n\nvar ErrPermission = errors.New(\"permission denied\")\n\nfunc open(name string) error {\n    return &PathError{Op: \"open\", Path: name, Err: ErrPermission}\n}\n\nfunc main() {\n    err := open(\"/etc/passwd\")\n    fmt.Println(errors.Is(err, ErrPermission))\n    var pe *PathError\n    fmt.Println(errors.As(err, &pe))\n    if pe != nil {\n        fmt.Println(pe.Op, pe.Path)\n    }\n}",
      options: [
        { id: "a", text: "true, true, open /etc/passwd" },
        { id: "b", text: "false, false" },
        { id: "c", text: "true, false" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "errors.Is finds ErrPermission via Unwrap. errors.As finds the *PathError in the chain.",
      difficulty: "hard",
      points: 30,
      tags: ["errors", "wrapping", "errors.As", "Unwrap"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-7",
      type: "true-false",
      question: "You can wrap errors without using fmt.Errorf.",
      options: [
        { id: "a", text: "True - implement an Unwrap() error method on a custom error type" },
        { id: "b", text: "False - fmt.Errorf with %w is the only way" }
      ],
      correctAnswer: "a",
      explanation: "Any error type with an Unwrap() error method can participate in error chains. fmt.Errorf with %w is the easiest way but not the only way.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "wrapping", "Unwrap"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrConn = errors.New(\"connection failed\")\nvar ErrAuth = errors.New(\"authentication failed\")\n\nfunc connect() error {\n    return fmt.Errorf(\"connect: %w\", ErrConn)\n}\n\nfunc main() {\n    err := connect()\n    fmt.Println(errors.Is(err, ErrConn))\n    fmt.Println(errors.Is(err, ErrAuth))\n}",
      options: [
        { id: "a", text: "true false" },
        { id: "b", text: "false true" },
        { id: "c", text: "true true" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "connect() wraps ErrConn. errors.Is finds it (true). ErrAuth is not in the chain (false).",
      difficulty: "easy",
      points: 10,
      tags: ["errors", "wrapping", "errors.Is"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-9",
      type: "scenario",
      question: "You are writing a data access layer. A lower-level function returns an error. How should you handle it?",
      options: [
        { id: "a", text: "Return the raw error as-is" },
        { id: "b", text: "Wrap it with context using fmt.Errorf and %w" },
        { id: "c", text: "Convert it to a string and return a new error" },
        { id: "d", text: "Ignore the error" }
      ],
      correctAnswer: "b",
      explanation: "Wrapping errors with context helps debugging while preserving the original error for programmatic checking.",
      difficulty: "medium",
      points: 20,
      tags: ["errors", "wrapping", "best-practice"],
      relatedLesson: "wrappingunwrapping-errors"
    },
    {
      id: "wue-10",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc doA() error {\n    return errors.New(\"error in A\")\n}\n\nfunc doB() error {\n    return fmt.Errorf(\"doB: %w\", doA())\n}\n\nfunc doC() error {\n    return fmt.Errorf(\"doC: %w\", doB())\n}\n\nfunc main() {\n    err := doC()\n    fmt.Println(err)\n    var target error\n    errors.As(err, &target)\n    fmt.Println(target.Error())\n}",
      options: [
        { id: "a", text: "doC: doB: error in A, error in A" },
        { id: "b", text: "error in A, error in A" },
        { id: "c", text: "doC: doB: error in A, doC: doB: error in A" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The full chain message is printed first. errors.As finds the innermost error (error in A) and extracts it.",
      difficulty: "hard",
      points: 30,
      tags: ["errors", "wrapping", "errors.As", "chain"],
      relatedLesson: "wrappingunwrapping-errors"
    },
  ],
  "panic-and-recover": [
    {
      id: "panic-and-recover-1",
      type: "multiple-choice",
      question: "What does the panic() function do in Go?",
      options: [
        { id: "a", text: "It causes the program to crash and unwind the stack" },
        { id: "b", text: "It logs an error and continues execution" },
        { id: "c", text: "It returns an error to the caller" },
        { id: "d", text: "It pauses the current goroutine" }
      ],
      correctAnswer: "a",
      explanation: "panic() causes normal execution to stop and begins unwinding the stack, running deferred functions along the way.",
      difficulty: "easy",
      points: 10,
      tags: ["panic", "recover"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-2",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Print(r)\n        }\n    }()\n    panic(\"oh no\")\n    fmt.Println(\"after panic\")\n}",
      options: [
        { id: "a", text: "oh no" },
        { id: "b", text: "after panic" },
        { id: "c", text: "oh noafter panic" },
        { id: "d", text: "No output" }
      ],
      correctAnswer: "a",
      explanation: "recover() catches the panic value inside a deferred function. The line after panic() is never reached.",
      difficulty: "medium",
      points: 20,
      tags: ["panic", "recover", "defer"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-3",
      type: "true-false",
      question: "A recover() call outside a deferred function will catch a panic.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "recover() only works when called directly from a deferred function. Otherwise it returns nil.",
      difficulty: "medium",
      points: 20,
      tags: ["panic", "recover"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-4",
      type: "multiple-choice",
      question: "What happens if a deferred function panics while handling another panic?",
      options: [
        { id: "a", text: "The second panic replaces the first" },
        { id: "b", text: "Both panics are recovered" },
        { id: "c", text: "The program crashes with both panics" },
        { id: "d", text: "Go ignores the second panic" }
      ],
      correctAnswer: "a",
      explanation: "If a deferred function panics while handling a panic, the new panic value replaces the old one.",
      difficulty: "hard",
      points: 30,
      tags: ["panic", "recover", "defer"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-5",
      type: "scenario",
      question: "You have a server that should not crash under any circumstance. Which approach should you use?",
      options: [
        { id: "a", text: "Wrap every handler in a defer/recover" },
        { id: "b", text: "Use if/else checks everywhere instead" },
        { id: "c", text: "Let panics crash and restart with a supervisor" },
        { id: "d", text: "Catch panics at the top-level request handler" }
      ],
      correctAnswer: "d",
      explanation: "Recovering at the top-level request handler keeps the server alive while isolating failures per request.",
      difficulty: "medium",
      points: 20,
      tags: ["panic", "recover", "best-practice"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    recover()\n    panic(\"fail\")\n    fmt.Println(\"done\")\n}",
      options: [
        { id: "a", text: "recover() is called before the panic, so it catches nothing" },
        { id: "b", text: "recover() must be inside a deferred function" },
        { id: "c", text: "panic() should use a string not a string literal" },
        { id: "d", text: "There is no bug" }
      ],
      correctAnswer: "b",
      explanation: "recover() only works when called directly from a deferred function. This code will crash.",
      difficulty: "medium",
      points: 20,
      tags: ["panic", "recover", "bug"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-7",
      type: "multiple-choice",
      question: "What value does recover() return if there is no active panic?",
      options: [
        { id: "a", text: "nil" },
        { id: "b", text: "false" },
        { id: "c", text: "an empty string" },
        { id: "d", text: "It panics" }
      ],
      correctAnswer: "a",
      explanation: "recover() returns nil if there is no active panic or if it is not called directly from a deferred function.",
      difficulty: "easy",
      points: 10,
      tags: ["panic", "recover"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-8",
      type: "true-false",
      question: "Calling panic() with a non-error value (like an integer) is valid Go.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "panic() accepts any interface{} value. Calling panic(42) or panic(\"oops\") are both valid.",
      difficulty: "easy",
      points: 10,
      tags: ["panic"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-9",
      type: "best-practice",
      question: "When is it appropriate to use panic() in Go?",
      options: [
        { id: "a", text: "For truly unrecoverable states like initialization failures" },
        { id: "b", text: "Instead of returning errors in regular functions" },
        { id: "c", text: "To signal EOF while reading a file" },
        { id: "d", text: "To implement control flow in business logic" }
      ],
      correctAnswer: "a",
      explanation: "panic is reserved for truly exceptional conditions like failure to acquire a critical resource at startup.",
      difficulty: "medium",
      points: 20,
      tags: ["panic", "best-practice"],
      relatedLesson: "panic-and-recover"
    },
    {
      id: "panic-and-recover-10",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    defer func() {\n        fmt.Print(\"A \")\n    }()\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Print(r, \" \")\n        }\n    }()\n    panic(\"B\")\n    fmt.Print(\"C\")\n}",
      options: [
        { id: "a", text: "B A" },
        { id: "b", text: "A B" },
        { id: "c", text: "B C A" },
        { id: "d", text: "C B A" }
      ],
      correctAnswer: "a",
      explanation: "Deferred functions run in LIFO order. The recover defer runs last (first LIFO), prints B. Then the remaining defer prints A. C is never reached.",
      difficulty: "hard",
      points: 30,
      tags: ["panic", "recover", "defer", "lifo"],
      relatedLesson: "panic-and-recover"
    }
  ],

  "goroutines": [
    {
      id: "goroutines-1",
      type: "multiple-choice",
      question: "How do you start a new goroutine in Go?",
      options: [
        { id: "a", text: "go myFunction()" },
        { id: "b", text: "goroutine myFunction()" },
        { id: "c", text: "async myFunction()" },
        { id: "d", text: "thread myFunction()" }
      ],
      correctAnswer: "a",
      explanation: "The 'go' keyword followed by a function call starts a new goroutine.",
      difficulty: "easy",
      points: 10,
      tags: ["goroutines"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-2",
      type: "true-false",
      question: "Goroutines run on OS threads directly without any multiplexing.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Goroutines are multiplexed onto OS threads by the Go runtime scheduler. Many goroutines share fewer OS threads.",
      difficulty: "easy",
      points: 10,
      tags: ["goroutines", "scheduler"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-3",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    go fmt.Println(\"hello\")\n    fmt.Println(\"world\")\n}",
      options: [
        { id: "a", text: "It may print nothing, 'world', or 'hello world' or 'world hello'" },
        { id: "b", text: "hello world" },
        { id: "c", text: "world" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The main goroutine may exit before the spawned goroutine runs. No synchronization means output is non-deterministic.",
      difficulty: "medium",
      points: 20,
      tags: ["goroutines", "synchronization"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-4",
      type: "multiple-choice",
      question: "Which of the following best describes a goroutine's initial stack size?",
      options: [
        { id: "a", text: "Small (a few KB) and grows/shrinks as needed" },
        { id: "b", text: "Large (1 MB) like an OS thread" },
        { id: "c", text: "Fixed at 64 KB and never changes" },
        { id: "d", text: "Zero; it uses a separate stack allocated by the user" }
      ],
      correctAnswer: "a",
      explanation: "Goroutines start with a small stack (around 2-8 KB) that dynamically grows and shrinks, allowing millions to exist.",
      difficulty: "medium",
      points: 20,
      tags: ["goroutines", "stack"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-5",
      type: "scenario",
      question: "You spawn 100,000 goroutines to handle incoming requests. What concern is most important?",
      options: [
        { id: "a", text: "Memory usage from goroutine stacks" },
        { id: "b", text: "Creating too many OS threads" },
        { id: "c", text: "The CPU cost of spawning each goroutine" },
        { id: "d", text: "There is no concern; goroutines are free" }
      ],
      correctAnswer: "a",
      explanation: "While goroutines are lightweight, each has a stack that takes memory. 100k goroutines still consume significant RAM.",
      difficulty: "medium",
      points: 20,
      tags: ["goroutines", "scalability"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nfunc main() {\n    go func() {\n        println(\"running\")\n    }()\n}",
      options: [
        { id: "a", text: "The goroutine may never execute before main exits" },
        { id: "b", text: "Anonymous functions cannot be used with go" },
        { id: "c", text: "println cannot be used inside a goroutine" },
        { id: "d", text: "Missing import for goroutines" }
      ],
      correctAnswer: "a",
      explanation: "main() returns immediately after spawning the goroutine, which may not have time to run before the program exits.",
      difficulty: "easy",
      points: 10,
      tags: ["goroutines", "bug"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-7",
      type: "true-false",
      question: "Goroutines in the same program share the same address space.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Goroutines share the same address space and can access shared variables, which is why synchronization is needed.",
      difficulty: "easy",
      points: 10,
      tags: ["goroutines", "memory"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-8",
      type: "multiple-choice",
      question: "How does the Go scheduler decide when to pause one goroutine and run another?",
      options: [
        { id: "a", text: "At specific preemption points in function calls" },
        { id: "b", text: "Only when a goroutine calls runtime.Gosched()" },
        { id: "c", text: "After a fixed time slice of 10ms" },
        { id: "d", text: "When the OS scheduler interrupts" }
      ],
      correctAnswer: "a",
      explanation: "Go uses cooperative preemption at safe points (function entry, loop back-edges) rather than timer-based preemption.",
      difficulty: "hard",
      points: 30,
      tags: ["goroutines", "scheduler"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-9",
      type: "best-practice",
      question: "Which is the recommended way to know when a goroutine has finished?",
      options: [
        { id: "a", text: "Use a channel or sync.WaitGroup" },
        { id: "b", text: "Sleep for a fixed duration" },
        { id: "c", text: "Poll a shared boolean variable" },
        { id: "d", text: "Use runtime.NumGoroutine() in a loop" }
      ],
      correctAnswer: "a",
      explanation: "Channels and WaitGroups are the idiomatic ways to synchronize goroutine completion.",
      difficulty: "easy",
      points: 10,
      tags: ["goroutines", "synchronization", "best-practice"],
      relatedLesson: "goroutines"
    },
    {
      id: "goroutines-10",
      type: "code-output",
      question: "Assuming this runs on a single CPU, what is a possible output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        go func() {\n            fmt.Print(i)\n        }()\n    }\n}",
      options: [
        { id: "a", text: "333" },
        { id: "b", text: "012" },
        { id: "c", text: "123" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The goroutines capture the variable i by reference. By the time they run, the loop has finished and i == 3.",
      difficulty: "hard",
      points: 30,
      tags: ["goroutines", "closure", "loop-variable"],
      relatedLesson: "goroutines"
    }
  ],

  "channels": [
    {
      id: "channels-1",
      type: "multiple-choice",
      question: "How do you send a value to a channel in Go?",
      options: [
        { id: "a", text: "ch <- value" },
        { id: "b", text: "ch => value" },
        { id: "c", text: "value -> ch" },
        { id: "d", text: "ch << value" }
      ],
      correctAnswer: "a",
      explanation: "The <- operator is used to send values to a channel. The arrow points toward the channel.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "syntax"],
      relatedLesson: "channels"
    },
    {
      id: "channels-2",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    go func() {\n        ch <- 42\n    }()\n    val := <-ch\n    fmt.Println(val)\n}",
      options: [
        { id: "a", text: "42" },
        { id: "b", text: "0" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Deadlock" }
      ],
      correctAnswer: "a",
      explanation: "The goroutine sends 42 to the channel, and main receives it. Program prints 42 and exits.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "goroutines"],
      relatedLesson: "channels"
    },
    {
      id: "channels-3",
      type: "true-false",
      question: "An unbuffered channel blocks the sender until a receiver is ready to receive.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Unbuffered channels require both a sender and receiver to be ready for the communication to proceed.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "blocking"],
      relatedLesson: "channels"
    },
    {
      id: "channels-4",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 2)\n    ch <- 1\n    ch <- 2\n    close(ch)\n    for v := range ch {\n        fmt.Println(v)\n    }\n}",
      options: [
        { id: "a", text: "1\n2" },
        { id: "b", text: "2\n1" },
        { id: "c", text: "1" },
        { id: "d", text: "Deadlock" }
      ],
      correctAnswer: "a",
      explanation: "A buffered channel with capacity 2 accepts 2 sends without blocking. Range iterates over all values in FIFO order.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "buffered", "range"],
      relatedLesson: "channels"
    },
    {
      id: "channels-5",
      type: "multiple-choice",
      question: "What is the zero value of a channel?",
      options: [
        { id: "a", text: "nil" },
        { id: "b", text: "An empty channel ready to use" },
        { id: "c", text: "A closed channel" },
        { id: "d", text: "0" }
      ],
      correctAnswer: "a",
      explanation: "A channel's zero value is nil. Sending to or receiving from a nil channel blocks forever.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "zero-value"],
      relatedLesson: "channels"
    },
    {
      id: "channels-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    ch <- 5\n    fmt.Println(<-ch)\n}",
      options: [
        { id: "a", text: "Sending on an unbuffered channel without a receiver causes deadlock" },
        { id: "b", text: "Cannot send int on a channel" },
        { id: "c", text: "Missing go func() for sender" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "The unbuffered channel blocks the sender until a receiver is ready. Since there is none, it deadlocks.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "deadlock", "bug"],
      relatedLesson: "channels"
    },
    {
      id: "channels-7",
      type: "multiple-choice",
      question: "What does it mean to close a channel?",
      options: [
        { id: "a", text: "No more values will be sent; receivers can still receive remaining values" },
        { id: "b", text: "The channel is destroyed immediately" },
        { id: "c", text: "All goroutines waiting on the channel are terminated" },
        { id: "d", text: "The channel becomes nil" }
      ],
      correctAnswer: "a",
      explanation: "Closing a channel signals that no more values will be sent. Receivers can still read remaining buffered values.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "close"],
      relatedLesson: "channels"
    },
    {
      id: "channels-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    close(ch)\n    v, ok := <-ch\n    fmt.Println(v, ok)\n}",
      options: [
        { id: "a", text: "0 false" },
        { id: "b", text: "0 true" },
        { id: "c", text: "nil false" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "Receiving from a closed channel returns the zero value and false for the ok flag.",
      difficulty: "hard",
      points: 30,
      tags: ["channels", "close", "receive"],
      relatedLesson: "channels"
    },
    {
      id: "channels-9",
      type: "multiple-select",
      question: "Which of these are valid channel directions in Go? (Select all that apply)",
      options: [
        { id: "a", text: "chan<- (send-only)" },
        { id: "b", text: "<-chan (receive-only)" },
        { id: "c", text: "chan (bidirectional)" },
        { id: "d", text: "->chan (send-only)" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Go supports send-only (chan<-), receive-only (<-chan), and bidirectional (chan) channel types.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "syntax"],
      relatedLesson: "channels"
    },
    {
      id: "channels-10",
      type: "best-practice",
      question: "Who should close a channel in Go?",
      options: [
        { id: "a", text: "The sender, to signal no more values are coming" },
        { id: "b", text: "The receiver, after reading the last value" },
        { id: "c", text: "Both sender and receiver should call close" },
        { id: "d", text: "Channels must never be closed" }
      ],
      correctAnswer: "a",
      explanation: "The sender should close the channel. Closing on the receiver side or closing twice causes a panic.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "close", "best-practice"],
      relatedLesson: "channels"
    }
  ],

  "buffered-vs-unbuffered": [
    {
      id: "buffered-vs-unbuffered-1",
      type: "multiple-choice",
      question: "What is the main difference between buffered and unbuffered channels?",
      options: [
        { id: "a", text: "Buffered channels have capacity; unbuffered channels have capacity 0" },
        { id: "b", text: "Buffered channels are faster" },
        { id: "c", text: "Unbuffered channels can hold more data" },
        { id: "d", text: "There is no difference" }
      ],
      correctAnswer: "a",
      explanation: "Unbuffered channels have capacity 0 (synchronous). Buffered channels have a specified capacity for async sends.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "buffered", "unbuffered"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-2",
      type: "code-output",
      question: "What happens when this code runs?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 3)\n    ch <- 1\n    ch <- 2\n    ch <- 3\n    fmt.Println(<-ch)\n    fmt.Println(<-ch)\n}",
      options: [
        { id: "a", text: "1\n2" },
        { id: "b", text: "3\n2" },
        { id: "c", text: "1\n3" },
        { id: "d", text: "1\n2\n3" }
      ],
      correctAnswer: "a",
      explanation: "Buffered channel holds 3 values. Receiving reads in FIFO order: 1, then 2.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "buffered", "fifo"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-3",
      type: "true-false",
      question: "A send on a full buffered channel blocks until space is available.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "When a buffered channel is full, the sender blocks until a receiver takes a value.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "buffered", "blocking"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-4",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    fmt.Println(len(ch), cap(ch))\n}",
      options: [
        { id: "a", text: "0 0" },
        { id: "b", text: "0 1" },
        { id: "c", text: "nil nil" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "An unbuffered channel has length 0 and capacity 0.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "unbuffered", "capacity"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-5",
      type: "scenario",
      question: "You need to coordinate exactly two goroutines so they exchange a value and continue. Which channel type?",
      options: [
        { id: "a", text: "Unbuffered channel (synchronous handoff)" },
        { id: "b", text: "Buffered channel with capacity 1" },
        { id: "c", text: "Buffered channel with capacity 10" },
        { id: "d", text: "A shared variable with a mutex" }
      ],
      correctAnswer: "a",
      explanation: "An unbuffered channel gives synchronous handoff: both goroutines rendezvous at the same moment.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "unbuffered", "synchronization"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-6",
      type: "identify-bug",
      question: "What is the problem with this code?",
      code: "package main\n\nfunc main() {\n    ch := make(chan int, 1)\n    ch <- 1\n    ch <- 2\n    <-ch\n}",
      options: [
        { id: "a", text: "The second send blocks because buffer is full (capacity 1) and no receiver is ready" },
        { id: "b", text: "Cannot send twice on a buffered channel" },
        { id: "c", text: "Capacity must be larger than 1" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "The buffered channel has capacity 1. After the first send, the buffer is full, so the second send blocks forever.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "buffered", "deadlock", "bug"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-7",
      type: "multiple-choice",
      question: "When is a buffered channel preferred over an unbuffered one?",
      options: [
        { id: "a", text: "When you want to decouple sender and receiver timing" },
        { id: "b", text: "When you need guaranteed delivery" },
        { id: "c", text: "When you have only one goroutine" },
        { id: "d", text: "Buffered channels are always preferred" }
      ],
      correctAnswer: "a",
      explanation: "Buffered channels decouple the sender and receiver, allowing the sender to continue before the receiver consumes.",
      difficulty: "medium",
      points: 20,
      tags: ["channels", "buffered", "decoupling"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 2)\n    ch <- 10\n    ch <- 20\n    close(ch)\n    for v := range ch {\n        fmt.Print(v, \" \")\n    }\n}",
      options: [
        { id: "a", text: "10 20" },
        { id: "b", text: "20 10" },
        { id: "c", text: "10" },
        { id: "d", text: "No output" }
      ],
      correctAnswer: "a",
      explanation: "Range over a buffered channel reads all values in FIFO order until the channel is closed.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "buffered", "range"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-9",
      type: "multiple-choice",
      question: "What happens if you create a channel with make(chan int) and never send or receive?",
      options: [
        { id: "a", text: "The goroutine does not block; the channel just sits idle" },
        { id: "b", text: "It causes an immediate deadlock" },
        { id: "c", text: "The channel is garbage collected" },
        { id: "d", text: "It panics" }
      ],
      correctAnswer: "a",
      explanation: "Creating a channel and not using it is fine. Go does not enforce channel usage.",
      difficulty: "easy",
      points: 10,
      tags: ["channels", "unbuffered"],
      relatedLesson: "buffered-vs-unbuffered"
    },
    {
      id: "buffered-vs-unbuffered-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 3)\n    ch <- 1\n    ch <- 2\n    close(ch)\n    fmt.Print(len(ch), \" \", cap(ch))\n}",
      options: [
        { id: "a", text: "2 3" },
        { id: "b", text: "0 3" },
        { id: "c", text: "3 3" },
        { id: "d", text: "2 0" }
      ],
      correctAnswer: "a",
      explanation: "len(ch) returns the number of unread elements (2). cap(ch) returns the capacity (3).",
      difficulty: "hard",
      points: 30,
      tags: ["channels", "buffered", "len", "cap"],
      relatedLesson: "buffered-vs-unbuffered"
    }
  ],

  "select-statement": [
    {
      id: "select-1",
      type: "multiple-choice",
      question: "What does the select statement do in Go?",
      options: [
        { id: "a", text: "Waits on multiple channel operations, executing the first one that is ready" },
        { id: "b", text: "Selects a random value from a channel" },
        { id: "c", text: "Chooses between different channel types" },
        { id: "d", text: "Filters values from a channel" }
      ],
      correctAnswer: "a",
      explanation: "select lets a goroutine wait on multiple channel operations simultaneously, choosing the first ready one.",
      difficulty: "easy",
      points: 10,
      tags: ["select", "channels"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-2",
      type: "code-output",
      question: "What is a possible output of this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch1 := make(chan string, 1)\n    ch2 := make(chan string, 1)\n    ch1 <- \"A\"\n    ch2 <- \"B\"\n    select {\n    case v := <-ch1:\n        fmt.Print(v)\n    case v := <-ch2:\n        fmt.Print(v)\n    }\n}",
      options: [
        { id: "a", text: "Either A or B (non-deterministic)" },
        { id: "b", text: "A, then B" },
        { id: "c", text: "B, then A" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "When multiple cases are ready, select picks one uniformly at random.",
      difficulty: "medium",
      points: 20,
      tags: ["select", "channels", "non-deterministic"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-3",
      type: "true-false",
      question: "A select statement with no cases blocks forever.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "select{} with no cases blocks the current goroutine forever.",
      difficulty: "easy",
      points: 10,
      tags: ["select", "blocking"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-4",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    close(ch)\n    select {\n    case v, ok := <-ch:\n        fmt.Println(v, ok)\n    default:\n        fmt.Println(\"default\")\n    }\n}",
      options: [
        { id: "a", text: "0 false" },
        { id: "b", text: "default" },
        { id: "c", text: "0 true" },
        { id: "d", text: "Panic" }
      ],
      correctAnswer: "a",
      explanation: "A closed channel can always be received from (returns zero value). The default case does not run.",
      difficulty: "medium",
      points: 20,
      tags: ["select", "closed-channel"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-5",
      type: "scenario",
      question: "You want to implement a timeout for a channel receive. Which pattern should you use?",
      options: [
        { id: "a", text: "select with time.After as a timeout case" },
        { id: "b", text: "time.Sleep then check channel len" },
        { id: "c", text: "A separate goroutine with a timer" },
        { id: "d", text: "Set a deadline on the channel itself" }
      ],
      correctAnswer: "a",
      explanation: "select { case v := <-ch: ...; case <-time.After(d): ... } is the idiomatic timeout pattern.",
      difficulty: "medium",
      points: 20,
      tags: ["select", "timeout"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-6",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"time\"\n\nfunc main() {\n    ch := make(chan int)\n    select {\n    case <-ch:\n    default:\n        println(\"no data\")\n    }\n}",
      options: [
        { id: "a", text: "no data" },
        { id: "b", text: "Deadlock" },
        { id: "c", text: "0" },
        { id: "d", text: "No output" }
      ],
      correctAnswer: "a",
      explanation: "The default case runs when no other case is ready. Since ch has no data, default executes.",
      difficulty: "easy",
      points: 10,
      tags: ["select", "default"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-7",
      type: "identify-bug",
      question: "What is the issue with this select statement?",
      code: "select {\ncase ch <- 1:\n    // send\ncase v := <-ch:\n    // receive\n}",
      options: [
        { id: "a", text: "Nothing; mixing send and receive in select is valid" },
        { id: "b", text: "Cannot have send and receive on the same channel in one select" },
        { id: "c", text: "Need a default case when mixing send and receive" },
        { id: "d", text: "Select cannot be used with sends" }
      ],
      correctAnswer: "a",
      explanation: "A select can contain both send and receive operations on the same channel.",
      difficulty: "medium",
      points: 20,
      tags: ["select", "send", "receive"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-8",
      type: "multiple-select",
      question: "Which statements about select are true? (Select all that apply)",
      options: [
        { id: "a", text: "If multiple cases are ready, one is chosen at random" },
        { id: "b", text: "A nil channel is never ready for communication" },
        { id: "c", text: "The default case runs if no other case is ready" },
        { id: "d", text: "Select evaluates all channel expressions once at the start" }
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All four are correct. Random selection, nil channels block, default is fallback, expressions evaluated once.",
      difficulty: "hard",
      points: 30,
      tags: ["select", "details"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-9",
      type: "code-output",
      question: "What happens when this code runs?",
      code: "package main\n\nfunc main() {\n    select {}\n}",
      options: [
        { id: "a", text: "Block forever (deadlock)" },
        { id: "b", text: "Compilation error: select must have at least one case" },
        { id: "c", text: "Exits immediately" },
        { id: "d", text: "Panics" }
      ],
      correctAnswer: "a",
      explanation: "select{} with no cases blocks the goroutine forever. In main, this causes a deadlock.",
      difficulty: "easy",
      points: 10,
      tags: ["select"],
      relatedLesson: "select-statement"
    },
    {
      id: "select-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch1 := make(chan int)\n    ch2 := make(chan int)\n    go func() {\n        ch1 <- 5\n    }()\n    select {\n    case v := <-ch1:\n        fmt.Print(v)\n    case v := <-ch2:\n        fmt.Print(v)\n    }\n}",
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "0" },
        { id: "c", text: "No output; deadlock" },
        { id: "d", text: "Prints 5 or 0 randomly" }
      ],
      correctAnswer: "a",
      explanation: "Only ch1 has data ready, so the select picks that case and prints 5.",
      difficulty: "medium",
      points: 20,
      tags: ["select", "goroutines"],
      relatedLesson: "select-statement"
    }
  ],
  "concurrency-patterns": [
    {
      id: "concurrency-patterns-1",
      type: "multiple-choice",
      question: "What is the Go concurrency model based on?",
      options: [
        { id: "a", text: "CSP (Communicating Sequential Processes)" },
        { id: "b", text: "Actor model" },
        { id: "c", text: "Shared memory threading" },
        { id: "d", text: "Callback-based async" }
      ],
      correctAnswer: "a",
      explanation: "Go's concurrency is based on CSP, where goroutines communicate via channels rather than shared memory.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "csp"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-2",
      type: "code-output",
      question: "What does this code demonstrate?",
      code: "package main\n\nimport \"fmt\"\n\nfunc generator(nums ...int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for _, n := range nums {\n            out <- n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    gen := generator(1, 2, 3)\n    for v := range gen {\n        fmt.Print(v)\n    }\n}",
      options: [
        { id: "a", text: "123" },
        { id: "b", text: "321" },
        { id: "c", text: "generator" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "This is the generator pattern: a function that returns a channel and sends values in a goroutine.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "generator", "pattern"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-3",
      type: "true-false",
      question: "The Done channel pattern is used to signal goroutines to stop.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "A done channel is closed to signal multiple goroutines to stop, avoiding goroutine leaks.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "done-channel", "pattern"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-4",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    done := make(chan struct{})\n    go func() {\n        fmt.Print(\"A\")\n        close(done)\n    }()\n    <-done\n    fmt.Print(\"B\")\n}",
      options: [
        { id: "a", text: "AB" },
        { id: "b", text: "BA" },
        { id: "c", text: "A" },
        { id: "d", text: "B" }
      ],
      correctAnswer: "a",
      explanation: "The done channel synchronizes the goroutine. A is printed, then done is closed, main proceeds and prints B.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "done-channel", "synchronization"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-5",
      type: "scenario",
      question: "You have multiple goroutines producing results that all need to be collected. Which pattern?",
      options: [
        { id: "a", text: "Fan-in: merge multiple channels into one" },
        { id: "b", text: "Fan-out: split work across goroutines" },
        { id: "c", text: "Pipeline: chain stages" },
        { id: "d", text: "WaitGroup: just wait for completion" }
      ],
      correctAnswer: "a",
      explanation: "Fan-in merges multiple input channels into a single output channel, collecting results from multiple sources.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-in", "pattern"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    go func() {\n        for i := 0; i < 3; i++ {\n            ch <- i\n        }\n    }()\n    for v := range ch {\n        fmt.Println(v)\n    }\n}",
      options: [
        { id: "a", text: "The channel is never closed, so range in main blocks forever" },
        { id: "b", text: "Cannot range over a channel" },
        { id: "c", text: "Deadlock because ch is unbuffered" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "range on a channel continues until the channel is closed. Without close(ch), the loop deadlocks.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "range", "bug"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-7",
      type: "multiple-select",
      question: "Which are common Go concurrency patterns? (Select all that apply)",
      options: [
        { id: "a", text: "Generator: function returning a channel" },
        { id: "b", text: "Fan-out: distribute work across goroutines" },
        { id: "c", text: "Pipeline: chain processing stages via channels" },
        { id: "d", text: "Singleton: single instance pattern" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Generator, fan-out, and pipeline are common CSP patterns. Singleton is a design pattern, not concurrency-specific.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "patterns"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-8",
      type: "code-output",
      question: "What does this tee-like pattern do?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    source := make(chan int)\n    go func() {\n        for i := 1; i <= 3; i++ {\n            source <- i\n        }\n        close(source)\n    }()\n    for v := range source {\n        fmt.Println(v * 2)\n    }\n}",
      options: [
        { id: "a", text: "2\n4\n6" },
        { id: "b", text: "1\n2\n3" },
        { id: "c", text: "3\n6\n9" },
        { id: "d", text: "1\n4\n9" }
      ],
      correctAnswer: "a",
      explanation: "Each value from source is multiplied by 2. Source emits 1, 2, 3, output is 2, 4, 6.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "pipeline"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-9",
      type: "best-practice",
      question: "What is the best way to avoid goroutine leaks?",
      options: [
        { id: "a", text: "Always have a way to signal goroutines to stop (done channel or context)" },
        { id: "b", text: "Never use goroutines" },
        { id: "c", text: "Use time.Sleep to wait for all goroutines" },
        { id: "d", text: "Use runtime.Goexit to clean up" }
      ],
      correctAnswer: "a",
      explanation: "Goroutine leaks occur when goroutines block forever. Always provide a cancellation mechanism.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "goroutine-leak", "best-practice"],
      relatedLesson: "concurrency-patterns"
    },
    {
      id: "concurrency-patterns-10",
      type: "code-output",
      question: "What does this code demonstrate?",
      code: "package main\n\nimport \"fmt\"\n\ntype Result struct {\n    Value int\n    Err   error\n}\n\nfunc main() {\n    resultCh := make(chan Result, 1)\n    go func() {\n        resultCh <- Result{Value: 42}\n    }()\n    res := <-resultCh\n    fmt.Println(res.Value)\n}",
      options: [
        { id: "a", text: "42" },
        { id: "b", text: "{42 <nil>}" },
        { id: "c", text: "Result{42}" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "This is the result channel pattern, where a struct bundles the result value and error together.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "result-channel", "pattern"],
      relatedLesson: "concurrency-patterns"
    }
  ],
  "fan-in": [
    {
      id: "fan-in-1",
      type: "multiple-choice",
      question: "What is the fan-in concurrency pattern?",
      options: [
        { id: "a", text: "Multiple input channels merged into a single output channel" },
        { id: "b", text: "One input channel split to multiple goroutines" },
        { id: "c", text: "A linear chain of processing stages" },
        { id: "d", text: "A single goroutine doing all work" }
      ],
      correctAnswer: "a",
      explanation: "Fan-in combines multiple channels into one, collecting results from multiple goroutines into a single stream.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "fan-in"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-2",
      type: "code-output",
      question: "What is the output of this fan-in example?",
      code: "package main\n\nimport \"fmt\"\n\nfunc producer(ch chan<- int, start int) {\n    for i := 0; i < 2; i++ {\n        ch <- start + i\n    }\n    // note: no close here\n}\n\nfunc main() {\n    ch1 := make(chan int)\n    ch2 := make(chan int)\n    go producer(ch1, 1)\n    go producer(ch2, 10)\n    // fan-in: read from both\n    for i := 0; i < 4; i++ {\n        select {\n        case v := <-ch1:\n            fmt.Print(v, \" \")\n        case v := <-ch2:\n            fmt.Print(v, \" \")\n        }\n    }\n}",
      options: [
        { id: "a", text: "1 10 2 11 (order may vary)" },
        { id: "b", text: "1 2 10 11" },
        { id: "c", text: "1 10 11 2" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "Select picks randomly between ch1 (1,2) and ch2 (10,11). Output order varies but values are those four.",
      difficulty: "hard",
      points: 30,
      tags: ["concurrency", "fan-in", "select"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-3",
      type: "true-false",
      question: "When merging multiple channels, you must always close the merged output channel.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Closing is only needed if the consumer uses range. For select-based merging, close is optional.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-in", "close"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-4",
      type: "scenario",
      question: "You have 5 goroutines fetching data from APIs. You need all results in one channel. How?",
      options: [
        { id: "a", text: "Use fan-in: merge all 5 result channels into one" },
        { id: "b", text: "Use fan-out on a single channel" },
        { id: "c", text: "Use a pipeline with 5 stages" },
        { id: "d", text: "Use a mutex to synchronize writes to a slice" }
      ],
      correctAnswer: "a",
      explanation: "Fan-in merges multiple channels, collecting results from concurrent API calls into one stream.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "fan-in"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-5",
      type: "code-output",
      question: "What does this merge function output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc merge(chs ...<-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for _, ch := range chs {\n            for v := range ch {\n                out <- v\n            }\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    a := make(chan int, 1)\n    b := make(chan int, 1)\n    a <- 1\n    b <- 2\n    close(a)\n    close(b)\n    for v := range merge(a, b) {\n        fmt.Print(v)\n    }\n}",
      options: [
        { id: "a", text: "12" },
        { id: "b", text: "21" },
        { id: "c", text: "1" },
        { id: "d", text: "2" }
      ],
      correctAnswer: "a",
      explanation: "This merge processes channels sequentially: reads all from a (1), then all from b (2). Output: 12.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-in", "merge"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-6",
      type: "identify-bug",
      question: "What is the bug in this fan-in merge?",
      code: "func merge(chs ...<-chan int) <-chan int {\n    out := make(chan int)\n    for _, ch := range chs {\n        go func(c <-chan int) {\n            for v := range c {\n                out <- v\n            }\n        }(ch)\n    }\n    return out\n}",
      options: [
        { id: "a", text: "The merged output channel is never closed after all inputs are consumed" },
        { id: "b", text: "Cannot range over a receive-only channel" },
        { id: "c", text: "The goroutines will leak" },
        { id: "d", text: "No bug; this is correct" }
      ],
      correctAnswer: "a",
      explanation: "The output channel is never closed, so any range loop on the result of merge will deadlock.",
      difficulty: "hard",
      points: 30,
      tags: ["concurrency", "fan-in", "bug"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-7",
      type: "multiple-choice",
      question: "How can you signal completion from all input channels in a fan-in?",
      options: [
        { id: "a", text: "Use a sync.WaitGroup to close the output after all inputs are drained" },
        { id: "b", text: "Use time.After to guess when all inputs are done" },
        { id: "c", text: "Use a counter incremented per received value" },
        { id: "d", text: "You cannot; fan-in runs forever" }
      ],
      correctAnswer: "a",
      explanation: "A WaitGroup tracks when each input goroutine finishes, then closes the output channel.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-in", "waitgroup"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    for i := 0; i < 3; i++ {\n        go func(id int) {\n            ch <- id\n        }(i)\n    }\n    sum := 0\n    for i := 0; i < 3; i++ {\n        sum += <-ch\n    }\n    fmt.Println(sum)\n}",
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "6" },
        { id: "c", text: "0" },
        { id: "d", text: "1" }
      ],
      correctAnswer: "a",
      explanation: "Each goroutine sends its id (0, 1, or 2). Sum = 0+1+2 = 3.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-in"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-9",
      type: "multiple-select",
      question: "Which are valid fan-in implementations? (Select all that apply)",
      options: [
        { id: "a", text: "Using select with all input channels" },
        { id: "b", text: "Using a separate goroutine per input channel writing to one output" },
        { id: "c", text: "Using range over one channel at a time sequentially" },
        { id: "d", text: "Using a single shared variable with atomic operations" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Select-based, goroutine-per-channel, and sequential merge are all valid fan-in approaches.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-in"],
      relatedLesson: "fan-in"
    },
    {
      id: "fan-in-10",
      type: "best-practice",
      question: "When fanning in channels, what should you do with the output channel?",
      options: [
        { id: "a", text: "Close it when all inputs are exhausted" },
        { id: "b", text: "Leave it open; garbage collector handles it" },
        { id: "c", text: "Convert it to a buffered channel" },
        { id: "d", text: "Never close it to avoid panics" }
      ],
      correctAnswer: "a",
      explanation: "Closing the output channel allows consumers to use range and signals completion cleanly.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-in", "best-practice"],
      relatedLesson: "fan-in"
    }
  ],
  "fan-out": [
    {
      id: "fan-out-1",
      type: "multiple-choice",
      question: "What is the fan-out concurrency pattern?",
      options: [
        { id: "a", text: "Distributing work from one channel to multiple goroutines" },
        { id: "b", text: "Combining multiple channels into one" },
        { id: "c", text: "Sequential processing in a single goroutine" },
        { id: "d", text: "Cancelling all goroutines at once" }
      ],
      correctAnswer: "a",
      explanation: "Fan-out distributes work items from a single source across multiple worker goroutines.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "fan-out"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-2",
      type: "code-output",
      question: "What is a possible output of this fan-out?",
      code: "package main\n\nimport \"fmt\"\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 5)\n    results := make(chan int, 5)\n    for w := 1; w <= 3; w++ {\n        go worker(w, jobs, results)\n    }\n    for j := 1; j <= 5; j++ {\n        jobs <- j\n    }\n    close(jobs)\n    for r := 1; r <= 5; r++ {\n        fmt.Print(<-results, \" \")\n    }\n}",
      options: [
        { id: "a", text: "2 4 6 8 10 (order may vary)" },
        { id: "b", text: "1 2 3 4 5" },
        { id: "c", text: "3 6 9 12 15" },
        { id: "d", text: "2 4 6 8" }
      ],
      correctAnswer: "a",
      explanation: "Three workers process jobs in parallel, producing results 2, 4, 6, 8, 10 in non-deterministic order.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-out", "worker-pool"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-3",
      type: "true-false",
      question: "Fan-out automatically balances work evenly across all workers.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Go does not guarantee even distribution. Workers that are ready first get the next job from the channel.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-out"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-4",
      type: "code-output",
      question: "How many goroutines run concurrently in this fan-out?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    jobs := make(chan int, 100)\n    for i := 0; i < 10; i++ {\n        go func(id int) {\n            for j := range jobs {\n                fmt.Println(id, j)\n            }\n        }(i)\n    }\n    for i := 0; i < 100; i++ {\n        jobs <- i\n    }\n    close(jobs)\n}",
      options: [
        { id: "a", text: "10" },
        { id: "b", text: "100" },
        { id: "c", text: "1" },
        { id: "d", text: "11" }
      ],
      correctAnswer: "a",
      explanation: "10 worker goroutines are created. Combined with main, 11 goroutines exist total, but 10 are workers.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-out", "goroutines"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-5",
      type: "scenario",
      question: "You need to process 1000 images concurrently but limit to 4 simultaneous operations. Which pattern?",
      options: [
        { id: "a", text: "Fan-out with 4 workers" },
        { id: "b", text: "Fan-in with 4 inputs" },
        { id: "c", text: "Pipeline with 4 stages" },
        { id: "d", text: "Select with 4 cases" }
      ],
      correctAnswer: "a",
      explanation: "Fan-out with 4 workers limits concurrency, each worker processes one image at a time.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-out", "worker-pool"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-6",
      type: "identify-bug",
      question: "What is wrong with this fan-out?",
      code: "func main() {\n    jobs := make(chan int)\n    for w := 1; w <= 3; w++ {\n        go func() {\n            for j := range jobs {\n                fmt.Println(j)\n            }\n        }()\n    }\n    jobs <- 1\n    jobs <- 2\n    close(jobs)\n}",
      options: [
        { id: "a", text: "Nothing is wrong; this is correct" },
        { id: "b", text: "Jobs channel is unbuffered and main may send before workers are ready" },
        { id: "c", text: "Cannot range over jobs" },
        { id: "d", text: "close(jobs) will panic" }
      ],
      correctAnswer: "b",
      explanation: "The jobs channel is unbuffered. The sends in main may happen before workers range on jobs, causing a potential deadlock.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-out", "bug"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-7",
      type: "multiple-choice",
      question: "What is a common use case for fan-out?",
      options: [
        { id: "a", text: "Parallelizing CPU-bound work across multiple workers" },
        { id: "b", text: "Merging log streams" },
        { id: "c", text: "Synchronizing two goroutines" },
        { id: "d", text: "Implementing a single-producer single-consumer queue" }
      ],
      correctAnswer: "a",
      explanation: "Fan-out parallelizes work across workers, useful for CPU-bound tasks that can be done concurrently.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "fan-out"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-8",
      type: "code-output",
      question: "What does this code demonstrate about fan-out?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 3)\n    ch <- 10\n    ch <- 20\n    ch <- 30\n    close(ch)\n    for v := range ch {\n        go func(x int) {\n            fmt.Print(x, \" \")\n        }(v)\n    }\n}",
      options: [
        { id: "a", text: "10 20 30 (order may vary)" },
        { id: "b", text: "30 20 10" },
        { id: "c", text: "No output; main exits before goroutines run" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "c",
      explanation: "main returns immediately after the loop, before the goroutines have a chance to print anything.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-out", "main-exit"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-9",
      type: "best-practice",
      question: "How many workers should you use in a fan-out for CPU-bound work?",
      options: [
        { id: "a", text: "runtime.NumCPU() or GOMAXPROCS" },
        { id: "b", text: "As many as possible" },
        { id: "c", text: "1" },
        { id: "d", text: "The number of jobs divided by 2" }
      ],
      correctAnswer: "a",
      explanation: "For CPU-bound work, using runtime.NumCPU() workers optimally utilizes available CPU cores.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "fan-out", "best-practice"],
      relatedLesson: "fan-out"
    },
    {
      id: "fan-out-10",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    go func() {\n        for i := 1; i <= 3; i++ {\n            ch <- i\n        }\n        close(ch)\n    }()\n    sum := 0\n    for v := range ch {\n        sum += v\n    }\n    fmt.Println(sum)\n}",
      options: [
        { id: "a", text: "6" },
        { id: "b", text: "3" },
        { id: "c", text: "1" },
        { id: "d", text: "0" }
      ],
      correctAnswer: "a",
      explanation: "Sum of 1 + 2 + 3 = 6.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "range", "channels"],
      relatedLesson: "fan-out"
    }
  ],
  "pipeline": [
    {
      id: "pipeline-1",
      type: "multiple-choice",
      question: "What is a pipeline in Go concurrency?",
      options: [
        { id: "a", text: "A series of stages connected by channels" },
        { id: "b", text: "A single goroutine doing everything" },
        { id: "c", text: "A buffered channel with capacity 1" },
        { id: "d", text: "A for loop over a range" }
      ],
      correctAnswer: "a",
      explanation: "A pipeline chains stages where each stage receives from an input channel and sends to an output channel.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "pipeline"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-2",
      type: "code-output",
      question: "What is the output of this pipeline?",
      code: "package main\n\nimport \"fmt\"\n\nfunc gen(nums ...int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for _, n := range nums {\n            out <- n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc sq(in <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for n := range in {\n            out <- n * n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    for n := range sq(sq(gen(2, 3))) {\n        fmt.Println(n)\n    }\n}",
      options: [
        { id: "a", text: "16\n81" },
        { id: "b", text: "4\n9" },
        { id: "c", text: "2\n3" },
        { id: "d", text: "256\n6561" }
      ],
      correctAnswer: "a",
      explanation: "gen emits 2,3. sq squares them (4,9). sq again squares those (16,81).",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "pipeline", "square"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-3",
      type: "true-false",
      question: "Each stage in a pipeline typically runs in its own goroutine.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Each pipeline stage runs in a goroutine, allowing concurrent execution between stages.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "pipeline"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-4",
      type: "identify-bug",
      question: "What is wrong with this pipeline stage?",
      code: "func stage(in <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for v := range in {\n            out <- v * 2\n        }\n        // missing close(out)\n    }()\n    return out\n}",
      options: [
        { id: "a", text: "The output channel is never closed, causing the next stage to deadlock" },
        { id: "b", text: "Cannot receive from in inside a goroutine" },
        { id: "c", text: "out is not buffered" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "Without close(out), the next stage's range loop never terminates, causing a deadlock.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "pipeline", "bug"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-5",
      type: "scenario",
      question: "You are building a pipeline: read data -> transform -> write. What is a key benefit?",
      options: [
        { id: "a", text: "Each stage runs concurrently, improving throughput" },
        { id: "b", text: "Simpler code with no goroutines needed" },
        { id: "c", text: "Guaranteed order preservation" },
        { id: "d", text: "Automatic error recovery" }
      ],
      correctAnswer: "a",
      explanation: "Pipeline stages run concurrently, so while one stage processes, another can fetch the next item.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "pipeline", "throughput"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-6",
      type: "code-output",
      question: "What does this pipeline print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc filterOdd(in <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for v := range in {\n            if v%2 == 0 {\n                out <- v\n            }\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    in := make(chan int)\n    go func() {\n        for i := 1; i <= 5; i++ {\n            in <- i\n        }\n        close(in)\n    }()\n    for v := range filterOdd(in) {\n        fmt.Print(v)\n    }\n}",
      options: [
        { id: "a", text: "24" },
        { id: "b", text: "135" },
        { id: "c", text: "12345" },
        { id: "d", text: "1 2 3 4 5" }
      ],
      correctAnswer: "a",
      explanation: "filterOdd only lets even numbers pass. Input: 1,2,3,4,5. Output: 2,4.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "pipeline", "filter"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-7",
      type: "multiple-select",
      question: "What are characteristics of a well-designed pipeline? (Select all that apply)",
      options: [
        { id: "a", text: "Each stage is a goroutine" },
        { id: "b", text: "Stages communicate via channels" },
        { id: "c", text: "The output channel is closed when the stage finishes" },
        { id: "d", text: "All stages use the same channel for communication" }
      ],
      correctAnswer: ["a", "b", "c"],
      explanation: "Stages run in goroutines, communicate via typed channels, and close their output when done.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "pipeline"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-8",
      type: "code-output",
      question: "What does this print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    go func() {\n        for i := 0; i < 3; i++ {\n            ch <- i\n        }\n        close(ch)\n    }()\n    for v := range ch {\n        defer fmt.Println(v)\n    }\n}",
      options: [
        { id: "a", text: "2\n1\n0" },
        { id: "b", text: "0\n1\n2" },
        { id: "c", text: "No output" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "deferred printlns execute in LIFO order when the function returns: 2, 1, 0.",
      difficulty: "hard",
      points: 30,
      tags: ["concurrency", "defer"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-9",
      type: "best-practice",
      question: "How should errors be handled in a pipeline?",
      options: [
        { id: "a", text: "Pass errors through a separate error channel" },
        { id: "b", text: "Panic and recover at each stage" },
        { id: "c", text: "Log and continue" },
        { id: "d", text: "Use a global error variable" }
      ],
      correctAnswer: "a",
      explanation: "A separate error channel (or error struct in the result type) lets stages report errors without stopping the pipeline.",
      difficulty: "hard",
      points: 30,
      tags: ["concurrency", "pipeline", "error-handling"],
      relatedLesson: "pipeline"
    },
    {
      id: "pipeline-10",
      type: "code-output",
      question: "What is the final output of this pipeline?",
      code: "package main\n\nimport \"fmt\"\n\nfunc addOne(in <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for v := range in {\n            out <- v + 1\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    in := make(chan int)\n    go func() {\n        in <- 1\n        close(in)\n    }()\n    result := addOne(addOne(addOne(in)))\n    fmt.Println(<-result)\n}",
      options: [
        { id: "a", text: "4" },
        { id: "b", text: "3" },
        { id: "c", text: "1" },
        { id: "d", text: "2" }
      ],
      correctAnswer: "a",
      explanation: "Three addOne stages: 1 -> 2 -> 3 -> 4.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "pipeline"],
      relatedLesson: "pipeline"
    }
  ],
  "worker-pools": [
    {
      id: "worker-pools-1",
      type: "multiple-choice",
      question: "What is a worker pool in Go?",
      options: [
        { id: "a", text: "A fixed number of goroutines processing jobs from a channel" },
        { id: "b", text: "A single goroutine handling all tasks" },
        { id: "c", text: "A pool of OS threads" },
        { id: "d", text: "A buffered channel with capacity equal to the number of workers" }
      ],
      correctAnswer: "a",
      explanation: "A worker pool creates a fixed set of goroutines that consume jobs from a shared channel.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "worker-pool"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-2",
      type: "code-output",
      question: "How many jobs does each worker process in this pool?",
      code: "package main\n\nimport \"fmt\"\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        results <- j * 10\n    }\n}\n\nfunc main() {\n    const numJobs = 10\n    const numWorkers = 3\n    jobs := make(chan int, numJobs)\n    results := make(chan int, numJobs)\n    for w := 1; w <= numWorkers; w++ {\n        go worker(w, jobs, results)\n    }\n    for j := 1; j <= numJobs; j++ {\n        jobs <- j\n    }\n    close(jobs)\n    for r := 1; r <= numJobs; r++ {\n        <-results\n    }\n}",
      options: [
        { id: "a", text: "Distribution varies; not necessarily even" },
        { id: "b", text: "3, 3, 4" },
        { id: "c", text: "4, 3, 3" },
        { id: "d", text: "10 each" }
      ],
      correctAnswer: "a",
      explanation: "Workers compete for jobs and the distribution depends on scheduling, not fixed.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "worker-pool"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-3",
      type: "true-false",
      question: "Worker pools are primarily used to limit concurrency.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Worker pools cap the number of concurrent operations, preventing resource exhaustion.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "worker-pool", "concurrency-limit"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-4",
      type: "scenario",
      question: "You need to make 1000 HTTP requests but limit to 10 at a time. Which approach?",
      options: [
        { id: "a", text: "Worker pool with 10 workers" },
        { id: "b", text: "1000 goroutines with a channel" },
        { id: "c", text: "Sequential requests" },
        { id: "d", text: "Use time.Ticker to rate-limit" }
      ],
      correctAnswer: "a",
      explanation: "A worker pool with 10 workers limits concurrency to 10 simultaneous HTTP requests.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "worker-pool", "http"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-5",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 5)\n    for i := 0; i < 5; i++ {\n        select {\n        case ch <- i:\n            fmt.Println(\"sent\", i)\n        default:\n            fmt.Println(\"full\")\n        }\n    }\n    close(ch)\n}",
      options: [
        { id: "a", text: "sent 0\nsent 1\nsent 2\nsent 3\nsent 4" },
        { id: "b", text: "full x5" },
        { id: "c", text: "0 1 2 3 4" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "The buffered channel has capacity 5, so all 5 sends succeed without blocking.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "buffered-channel", "select"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-6",
      type: "identify-bug",
      question: "What is wrong with this worker pool?",
      code: "func main() {\n    jobs := make(chan int)\n    results := make(chan int)\n    for w := 1; w <= 3; w++ {\n        go func() {\n            for j := range jobs {\n                results <- j * 2\n            }\n        }()\n    }\n    for j := 1; j <= 5; j++ {\n        jobs <- j\n    }\n    close(jobs)\n    for r := 1; r <= 5; r++ {\n        <-results\n    }\n}",
      options: [
        { id: "a", text: "Nothing; this is correct" },
        { id: "b", text: "results channel is never closed, and main blocks forever" },
        { id: "c", text: "Cannot range over jobs in multiple goroutines" },
        { id: "d", text: "Workers cannot send to an unbuffered results channel" }
      ],
      correctAnswer: "b",
      explanation: "After reading 5 results, main tries to read a 6th result (since close(jobs) runs after 5 sends but results has no close). Actually, the workers don't close results, but the loop count is 5 so it's fine. The real issue: jobs is unbuffered, and the 5th send may block if workers aren't ready. Combined with results being unbuffered, this can deadlock.",
      difficulty: "hard",
      points: 30,
      tags: ["concurrency", "worker-pool", "bug"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-7",
      type: "multiple-select",
      question: "What elements does a worker pool typically include? (Select all that apply)",
      options: [
        { id: "a", text: "A jobs channel" },
        { id: "b", text: "A results channel" },
        { id: "c", text: "A fixed number of worker goroutines" },
        { id: "d", text: "A WaitGroup to wait for all workers to finish" }
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "A worker pool has a jobs channel, results channel, fixed workers, and usually a WaitGroup.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "worker-pool"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan struct{}, 3)\n    for i := 0; i < 3; i++ {\n        ch <- struct{}{}\n    }\n    // Simulate limited concurrency\n    done := make(chan struct{})\n    go func() {\n        <-ch\n        fmt.Print(\"A\")\n        ch <- struct{}{}\n        done <- struct{}{}\n    }()\n    go func() {\n        <-ch\n        fmt.Print(\"B\")\n        ch <- struct{}{}\n        done <- struct{}{}\n    }()\n    <-done\n    <-done\n}",
      options: [
        { id: "a", text: "AB or BA (non-deterministic)" },
        { id: "b", text: "AB" },
        { id: "c", text: "BA" },
        { id: "d", text: "A" }
      ],
      correctAnswer: "a",
      explanation: "Two goroutines compete for the 3 permits in the channel. They acquire one each and print in non-deterministic order.",
      difficulty: "hard",
      points: 30,
      tags: ["concurrency", "worker-pool", "semaphore"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-9",
      type: "best-practice",
      question: "When should you use a worker pool vs spawning a goroutine per task?",
      options: [
        { id: "a", text: "Worker pool when tasks are numerous and resource limits matter" },
        { id: "b", text: "Goroutine per task is always better" },
        { id: "c", text: "Worker pool only for CPU-bound work" },
        { id: "d", text: "Never use worker pools; they are outdated" }
      ],
      correctAnswer: "a",
      explanation: "Worker pools limit resource usage when tasks are many. Goroutine-per-task is fine for bounded work.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "worker-pool", "best-practice"],
      relatedLesson: "worker-pools"
    },
    {
      id: "worker-pools-10",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 2)\n    ch <- 1\n    ch <- 2\n    fmt.Print(len(ch), cap(ch))\n}",
      options: [
        { id: "a", text: "2 2" },
        { id: "b", text: "0 2" },
        { id: "c", text: "1 2" },
        { id: "d", text: "2 1" }
      ],
      correctAnswer: "a",
      explanation: "len(ch) is 2 (two items buffered), cap(ch) is 2 (total capacity).",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "buffered-channel"],
      relatedLesson: "worker-pools"
    }
  ],
  "mutexes": [
    {
      id: "mutexes-1",
      type: "multiple-choice",
      question: "What does sync.Mutex do in Go?",
      options: [
        { id: "a", text: "Provides mutual exclusion to protect shared resources" },
        { id: "b", text: "Creates a new goroutine" },
        { id: "c", text: "Sends data through a channel" },
        { id: "d", text: "Synchronizes time across goroutines" }
      ],
      correctAnswer: "a",
      explanation: "A Mutex ensures only one goroutine can access a critical section at a time.",
      difficulty: "easy",
      points: 10,
      tags: ["sync", "mutex"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-2",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var mu sync.Mutex\n    count := 0\n    var wg sync.WaitGroup\n    wg.Add(2)\n    go func() {\n        mu.Lock()\n        count++\n        mu.Unlock()\n        wg.Done()\n    }()\n    go func() {\n        mu.Lock()\n        count++\n        mu.Unlock()\n        wg.Done()\n    }()\n    wg.Wait()\n    fmt.Println(count)\n}",
      options: [
        { id: "a", text: "2" },
        { id: "b", text: "1" },
        { id: "c", text: "0" },
        { id: "d", text: "3" }
      ],
      correctAnswer: "a",
      explanation: "Mutex protects count from race conditions. Both goroutines increment it, result is 2.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "mutex", "race-condition"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-3",
      type: "true-false",
      question: "A sync.Mutex must be initialized before use.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "The zero value of sync.Mutex is unlocked and ready to use. No initialization needed.",
      difficulty: "easy",
      points: 10,
      tags: ["sync", "mutex", "zero-value"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-4",
      type: "identify-bug",
      question: "What is the bug in this code?",
      code: "var mu sync.Mutex\nmu.Lock()\nmu.Lock()",
      options: [
        { id: "a", text: "Locking an already locked mutex causes a deadlock" },
        { id: "b", text: "Cannot lock a mutex twice" },
        { id: "c", text: "Need to import sync before using Mutex" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "sync.Mutex is not reentrant. Locking an already locked mutex causes a deadlock (in the same goroutine).",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "mutex", "deadlock", "bug"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-5",
      type: "scenario",
      question: "You have a shared map being read and written by multiple goroutines. What should you use?",
      options: [
        { id: "a", text: "sync.Mutex or sync.RWMutex" },
        { id: "b", text: "A channel" },
        { id: "c", text: "An atomic counter" },
        { id: "d", text: "Nothing; maps are thread-safe in Go" }
      ],
      correctAnswer: "a",
      explanation: "Maps are not thread-safe. Use a Mutex or RWMutex to synchronize access.",
      difficulty: "easy",
      points: 10,
      tags: ["sync", "mutex", "map"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-6",
      type: "code-output",
      question: "What does RWMutex provide that Mutex does not?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var rw sync.RWMutex\n    var data int\n    // multiple concurrent readers\n    var wg sync.WaitGroup\n    for i := 0; i < 3; i++ {\n        wg.Add(1)\n        go func() {\n            rw.RLock()\n            _ = data\n            rw.RUnlock()\n            wg.Done()\n        }()\n    }\n    wg.Wait()\n    fmt.Println(\"done\")\n}",
      options: [
        { id: "a", text: "Multiple readers can hold the read lock simultaneously" },
        { id: "b", text: "Faster writes" },
        { id: "c", text: "Automatic unlocking" },
        { id: "d", text: "No deadlock protection" }
      ],
      correctAnswer: "a",
      explanation: "RWMutex allows multiple concurrent readers (RLock) but exclusive access for writers (Lock).",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "rwmutex", "readers-writers"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-7",
      type: "multiple-choice",
      question: "What happens if you call Unlock() on an unlocked Mutex?",
      options: [
        { id: "a", text: "It panics" },
        { id: "b", text: "It does nothing" },
        { id: "c", text: "It locks the mutex" },
        { id: "d", text: "It blocks until another goroutine locks it" }
      ],
      correctAnswer: "a",
      explanation: "Calling Unlock on an unlocked Mutex causes a runtime panic.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "mutex", "panic"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var mu sync.Mutex\n    mu.Lock()\n    go func() {\n        mu.Lock()\n        fmt.Println(\"locked\")\n        mu.Unlock()\n    }()\n    fmt.Println(\"main\")\n    mu.Unlock()\n    // wait for goroutine\n    mu.Lock()\n    mu.Unlock()\n}",
      options: [
        { id: "a", text: "main\nlocked" },
        { id: "b", text: "locked\nmain" },
        { id: "c", text: "main" },
        { id: "d", text: "Deadlock" }
      ],
      correctAnswer: "a",
      explanation: "Main locks first, prints 'main', unlocks. Then goroutine acquires lock, prints 'locked', unlocks. Main waits on final lock/unlock.",
      difficulty: "hard",
      points: 30,
      tags: ["sync", "mutex"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-9",
      type: "best-practice",
      question: "What is the recommended pattern for using a Mutex?",
      options: [
        { id: "a", text: "Lock early, defer Unlock" },
        { id: "b", text: "Lock and unlock manually everywhere" },
        { id: "c", text: "Never use defer with mutexes" },
        { id: "d", text: "Use a channel instead of a mutex whenever possible" }
      ],
      correctAnswer: "a",
      explanation: "Using defer mu.Unlock() guarantees the mutex is released even if the function panics.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "mutex", "best-practice", "defer"],
      relatedLesson: "mutexes"
    },
    {
      id: "mutexes-10",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\ntype SafeCounter struct {\n    mu    sync.Mutex\n    value int\n}\n\nfunc (c *SafeCounter) Increment() {\n    c.mu.Lock()\n    c.value++\n    c.mu.Unlock()\n}\n\nfunc (c *SafeCounter) Value() int {\n    c.mu.Lock()\n    defer c.mu.Unlock()\n    return c.value\n}\n\nfunc main() {\n    c := SafeCounter{}\n    var wg sync.WaitGroup\n    for i := 0; i < 100; i++ {\n        wg.Add(1)\n        go func() {\n            c.Increment()\n            wg.Done()\n        }()\n    }\n    wg.Wait()\n    fmt.Println(c.Value())\n}",
      options: [
        { id: "a", text: "100" },
        { id: "b", text: "99" },
        { id: "c", text: "0" },
        { id: "d", text: "101" }
      ],
      correctAnswer: "a",
      explanation: "SafeCounter uses a mutex to protect access. 100 goroutines increment it, result is 100.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "mutex", "safe-counter"],
      relatedLesson: "mutexes"
    }
  ],
  "waitgroups": [
    {
      id: "waitgroups-1",
      type: "multiple-choice",
      question: "What is the purpose of sync.WaitGroup?",
      options: [
        { id: "a", text: "To wait for a collection of goroutines to finish" },
        { id: "b", text: "To create a pool of workers" },
        { id: "c", text: "To synchronize channel operations" },
        { id: "d", text: "To prevent goroutine leaks" }
      ],
      correctAnswer: "a",
      explanation: "WaitGroup waits for all goroutines that called Add() to call Done().",
      difficulty: "easy",
      points: 10,
      tags: ["sync", "waitgroup"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    wg.Add(3)\n    for i := 0; i < 3; i++ {\n        go func(id int) {\n            defer wg.Done()\n            fmt.Print(id)\n        }(i)\n    }\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "012 (order may vary)" },
        { id: "b", text: "012" },
        { id: "c", text: "210" },
        { id: "d", text: "3" }
      ],
      correctAnswer: "a",
      explanation: "The three goroutines run concurrently, outputting 0, 1, 2 in non-deterministic order.",
      difficulty: "easy",
      points: 10,
      tags: ["sync", "waitgroup"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-3",
      type: "true-false",
      question: "A negative counter in WaitGroup causes a panic.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Calling Done() more times than Add() causes a negative counter, which panics.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "waitgroup", "panic"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-4",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "func main() {\n    var wg sync.WaitGroup\n    for i := 0; i < 3; i++ {\n        go func() {\n            wg.Add(1)\n            defer wg.Done()\n            fmt.Println(i)\n        }()\n    }\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "wg.Add(1) is called inside the goroutine; WaitGroup may Wait before Add" },
        { id: "b", text: "Cannot use for loop with WaitGroup" },
        { id: "c", text: "fmt.Println cannot be called in a goroutine" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "Add must be called before starting each goroutine to ensure Wait sees the correct count.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "waitgroup", "bug"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-5",
      type: "scenario",
      question: "You want to download 10 files concurrently. Which synchronization primitive?",
      options: [
        { id: "a", text: "WaitGroup" },
        { id: "b", text: "Mutex" },
        { id: "c", text: "Channel" },
        { id: "d", text: "Atomic counter" }
      ],
      correctAnswer: "a",
      explanation: "WaitGroup is ideal for waiting for a fixed set of goroutines to complete.",
      difficulty: "easy",
      points: 10,
      tags: ["sync", "waitgroup"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-6",
      type: "code-output",
      question: "What does this print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    for i := 0; i < 5; i++ {\n        wg.Add(1)\n        go func(n int) {\n            defer wg.Done()\n            if n == 0 {\n                return\n            }\n            fmt.Print(n)\n        }(i)\n    }\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "1234 (order may vary)" },
        { id: "b", text: "01234" },
        { id: "c", text: "01234 (order may vary)" },
        { id: "d", text: "No output" }
      ],
      correctAnswer: "a",
      explanation: "Goroutine with id=0 returns early without printing. goroutines 1-4 print their ids.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "waitgroup"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-7",
      type: "multiple-select",
      question: "Which statements about WaitGroup are true? (Select all that apply)",
      options: [
        { id: "a", text: "Add() should be called in the parent goroutine" },
        { id: "b", text: "Done() decrements the counter by 1" },
        { id: "c", text: "Wait() blocks until the counter reaches 0" },
        { id: "d", text: "A WaitGroup can be reused after Wait returns" }
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All four statements are correct. Add in parent, Done decrements, Wait blocks, and WaitGroup is reusable.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "waitgroup"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-8",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    wg.Add(1)\n    go func() {\n        defer wg.Done()\n        defer func() { fmt.Println(\"A\") }()\n        fmt.Println(\"B\")\n    }()\n    wg.Wait()\n    fmt.Println(\"C\")\n}",
      options: [
        { id: "a", text: "B\nA\nC" },
        { id: "b", text: "A\nB\nC" },
        { id: "c", text: "B\nC\nA" },
        { id: "d", text: "C\nB\nA" }
      ],
      correctAnswer: "a",
      explanation: "In the goroutine: B is printed, then defer runs (A), then wg.Done(). Main prints C after Wait returns.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "waitgroup", "defer"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-9",
      type: "best-practice",
      question: "What is the recommended way to ensure Done is called for every Add?",
      options: [
        { id: "a", text: "Use defer wg.Done() immediately after starting the goroutine" },
        { id: "b", text: "Call Done manually at the end of every code path" },
        { id: "c", text: "Use a channel signal instead" },
        { id: "d", text: "WaitGroup does not require Done to be called" }
      ],
      correctAnswer: "a",
      explanation: "defer wg.Done() at the start of the goroutine ensures Done is called even if the goroutine panics.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "waitgroup", "best-practice"],
      relatedLesson: "waitgroups"
    },
    {
      id: "waitgroups-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    wg.Add(1)\n    go func() {\n        defer wg.Done()\n        defer fmt.Println(\"defer 1\")\n        defer fmt.Println(\"defer 2\")\n        fmt.Println(\"hello\")\n    }()\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "hello\ndefer 2\ndefer 1" },
        { id: "b", text: "hello\ndefer 1\ndefer 2" },
        { id: "c", text: "defer 2\ndefer 1\nhello" },
        { id: "d", text: "No output" }
      ],
      correctAnswer: "a",
      explanation: "Defer runs in LIFO order: 'defer 2' first, then 'defer 1'. 'hello' is printed before defers run.",
      difficulty: "hard",
      points: 30,
      tags: ["sync", "waitgroup", "defer", "lifo"],
      relatedLesson: "waitgroups"
    }
  ],
  "sync-package": [
    {
      id: "sync-package-1",
      type: "multiple-choice",
      question: "Which of the following is NOT part of the sync package?",
      options: [
        { id: "a", text: "sync.Channel" },
        { id: "b", text: "sync.Mutex" },
        { id: "c", text: "sync.WaitGroup" },
        { id: "d", text: "sync.Once" }
      ],
      correctAnswer: "a",
      explanation: "Channel is a built-in type, not part of the sync package.",
      difficulty: "easy",
      points: 10,
      tags: ["sync"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-2",
      type: "multiple-choice",
      question: "What does sync.Once do?",
      options: [
        { id: "a", text: "Ensures a function is called only once, even across goroutines" },
        { id: "b", text: "Limits a function to run only on Mondays" },
        { id: "c", text: "Runs a function once per goroutine" },
        { id: "d", text: "Delays execution until a condition is met" }
      ],
      correctAnswer: "a",
      explanation: "sync.Once guarantees that the function passed to Do() executes exactly one time.",
      difficulty: "easy",
      points: 10,
      tags: ["sync", "once"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-3",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var once sync.Once\n    var wg sync.WaitGroup\n    for i := 0; i < 3; i++ {\n        wg.Add(1)\n        go func() {\n            once.Do(func() {\n                fmt.Println(\"once\")\n            })\n            wg.Done()\n        }()\n    }\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "once" },
        { id: "b", text: "once\nonce\nonce" },
        { id: "c", text: "once (3 times, once per goroutine)" },
        { id: "d", text: "No output" }
      ],
      correctAnswer: "a",
      explanation: "sync.Once ensures the function runs only once, even though 3 goroutines call it.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "once"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-4",
      type: "true-false",
      question: "sync.Pool is used to cache objects and reduce allocation pressure.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "sync.Pool provides a way to reuse temporary objects, reducing GC pressure.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "pool"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-5",
      type: "code-output",
      question: "What does this code demonstrate?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nvar pool = sync.Pool{\n    New: func() interface{} {\n        fmt.Print(\"new \")\n        return 0\n    },\n}\n\nfunc main() {\n    v := pool.Get().(int)\n    fmt.Print(v, \" \")\n    pool.Put(42)\n    v = pool.Get().(int)\n    fmt.Println(v)\n}",
      options: [
        { id: "a", text: "new 0 42" },
        { id: "b", text: "0 42" },
        { id: "c", text: "new 0 new 42" },
        { id: "d", text: "42 42" }
      ],
      correctAnswer: "a",
      explanation: "First Get() calls New (prints 'new 0'). Put stores 42. Second Get() reuses it (prints 42).",
      difficulty: "hard",
      points: 30,
      tags: ["sync", "pool"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-6",
      type: "multiple-choice",
      question: "What is sync.Cond used for?",
      options: [
        { id: "a", text: "Condition variable for goroutines to wait for an event" },
        { id: "b", text: "Conditional compilation" },
        { id: "c", text: "Creating conditional channels" },
        { id: "d", text: "Checking race conditions" }
      ],
      correctAnswer: "a",
      explanation: "sync.Cond provides condition variables for goroutines to wait for signal/broadcast events.",
      difficulty: "hard",
      points: 30,
      tags: ["sync", "cond"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-7",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var m sync.Map\n    m.Store(\"key\", \"value\")\n    v, ok := m.Load(\"key\")\n    fmt.Println(v, ok)\n}",
      options: [
        { id: "a", text: "value true" },
        { id: "b", text: "value false" },
        { id: "c", text: "nil false" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "sync.Map provides a thread-safe map. Store saves the value, Load retrieves it.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "sync-map"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-8",
      type: "true-false",
      question: "You should always use sync.Map instead of a regular map with a mutex.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "sync.Map is optimized for specific access patterns. For most cases, a regular map with a mutex is preferred.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "sync-map", "best-practice"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-9",
      type: "best-practice",
      question: "When should you use sync.Once?",
      options: [
        { id: "a", text: "For lazy initialization of singleton resources" },
        { id: "b", text: "For every function call to prevent duplicates" },
        { id: "c", text: "To run cleanup code multiple times" },
        { id: "d", text: "To parallelize function execution" }
      ],
      correctAnswer: "a",
      explanation: "sync.Once is ideal for one-time initialization like setting up a database connection.",
      difficulty: "medium",
      points: 20,
      tags: ["sync", "once", "best-practice"],
      relatedLesson: "sync-package"
    },
    {
      id: "sync-package-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nvar once sync.Once\n\nfunc initDB() {\n    once.Do(func() {\n        fmt.Println(\"initialized\")\n    })\n}\n\nfunc main() {\n    go initDB()\n    go initDB()\n    initDB()\n    once.Do(func() {\n        fmt.Println(\"also\")\n    })\n}",
      options: [
        { id: "a", text: "initialized" },
        { id: "b", text: "initialized\nalso" },
        { id: "c", text: "initialized x3" },
        { id: "d", text: "initialized x3\nalso" }
      ],
      correctAnswer: "a",
      explanation: "The first call runs 'initialized'. Subsequent calls, including the second once.Do with a different func, do nothing.",
      difficulty: "hard",
      points: 30,
      tags: ["sync", "once"],
      relatedLesson: "sync-package"
    }
  ],
  "race-detection": [
    {
      id: "race-detection-1",
      type: "multiple-choice",
      question: "When does a data race occur in Go?",
      options: [
        { id: "a", text: "When two goroutines access the same variable concurrently and at least one is a write" },
        { id: "b", text: "When two goroutines read the same variable" },
        { id: "c", text: "When a goroutine panics" },
        { id: "d", text: "When the program runs slower than expected" }
      ],
      correctAnswer: "a",
      explanation: "A data race occurs when multiple goroutines access the same variable without synchronization, and at least one is a write.",
      difficulty: "easy",
      points: 10,
      tags: ["race-condition", "data-race"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-2",
      type: "code-output",
      question: "Does this code have a data race?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var x int\n    var wg sync.WaitGroup\n    wg.Add(2)\n    go func() { x++; wg.Done() }()\n    go func() { fmt.Println(x); wg.Done() }()\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "Yes, x is written by one goroutine and read by another without synchronization" },
        { id: "b", text: "No, WaitGroup synchronizes the access" },
        { id: "c", text: "Yes, because x++ is not atomic" },
        { id: "d", text: "No, integer reads and writes are always safe" }
      ],
      correctAnswer: "a",
      explanation: "There is a race between the write (x++) and the read (fmt.Println(x)). WaitGroup does not provide mutual exclusion.",
      difficulty: "medium",
      points: 20,
      tags: ["race-condition", "data-race"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-3",
      type: "true-false",
      question: "Data races only occur on multi-core machines.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Data races depend on goroutine scheduling, not the number of cores. They can occur even on single-core machines.",
      difficulty: "medium",
      points: 20,
      tags: ["race-condition", "scheduling"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-4",
      type: "multiple-choice",
      question: "Which of these operations is NOT safe for concurrent access without synchronization?",
      options: [
        { id: "a", text: "Reading from different keys of the same map" },
        { id: "b", text: "Reading from a channel" },
        { id: "c", text: "Calling sync.WaitGroup.Add" },
        { id: "d", text: "Sending to a channel" }
      ],
      correctAnswer: "a",
      explanation: "Concurrent map access (even reads to different keys) is unsafe in Go without a mutex.",
      difficulty: "medium",
      points: 20,
      tags: ["race-condition", "map"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-5",
      type: "scenario",
      question: "Your production service intermittently crashes with 'fatal error: concurrent map writes'. What is happening?",
      options: [
        { id: "a", text: "Multiple goroutines are writing to the same map concurrently" },
        { id: "b", text: "The map is too large for memory" },
        { id: "c", text: "The map was deleted while iterating" },
        { id: "d", text: "A goroutine is reading from a closed map" }
      ],
      correctAnswer: "a",
      explanation: "Go panics on concurrent map writes. The fix is to use a mutex or sync.Map.",
      difficulty: "easy",
      points: 10,
      tags: ["race-condition", "map", "panic"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-6",
      type: "identify-bug",
      question: "Does this code have a data race?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var counter int\n    for i := 0; i < 100; i++ {\n        go func() {\n            counter++\n        }()\n    }\n    fmt.Println(counter)\n}",
      options: [
        { id: "a", text: "Yes, counter++ has a race between 100 goroutines and the read in fmt.Println" },
        { id: "b", text: "No, counter++ is atomic" },
        { id: "c", text: "Yes, but only because fmt.Println is outside the loop" },
        { id: "d", text: "No, goroutines are too fast to matter" }
      ],
      correctAnswer: "a",
      explanation: "100 goroutines race to write counter++ and main reads it without synchronization.",
      difficulty: "medium",
      points: 20,
      tags: ["race-condition", "bug"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-7",
      type: "multiple-select",
      question: "Which can help prevent data races? (Select all that apply)",
      options: [
        { id: "a", text: "Using channels for communication" },
        { id: "b", text: "Using sync.Mutex" },
        { id: "c", text: "Using the race detector during testing" },
        { id: "d", text: "Making variables local to a single goroutine" }
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "Channels, mutexes, the race detector, and goroutine-local variables all help prevent or detect races.",
      difficulty: "medium",
      points: 20,
      tags: ["race-condition", "prevention"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-8",
      type: "code-output",
      question: "Does this code have a data race?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var x int\n    var mu sync.Mutex\n    var wg sync.WaitGroup\n    wg.Add(2)\n    go func() {\n        mu.Lock()\n        x++\n        mu.Unlock()\n        wg.Done()\n    }()\n    go func() {\n        mu.Lock()\n        fmt.Println(x)\n        mu.Unlock()\n        wg.Done()\n    }()\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "No, both access to x is protected by the mutex" },
        { id: "b", text: "Yes, the mutex is not needed" },
        { id: "c", text: "Yes, x++ is not atomic even with mutex" },
        { id: "d", text: "No, because x++ and fmt.Println happen in different goroutines" }
      ],
      correctAnswer: "a",
      explanation: "Both goroutines lock the mutex before accessing x, so no data race occurs.",
      difficulty: "easy",
      points: 10,
      tags: ["race-condition", "mutex"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-9",
      type: "best-practice",
      question: "What is the Go mantra regarding concurrency?",
      options: [
        { id: "a", text: "Do not communicate by sharing memory; instead, share memory by communicating" },
        { id: "b", text: "Always use mutexes for everything" },
        { id: "c", text: "Never use goroutines" },
        { id: "d", text: "Use global variables for state" }
      ],
      correctAnswer: "a",
      explanation: "Go's philosophy is to use channels for communication rather than shared memory with locks.",
      difficulty: "medium",
      points: 20,
      tags: ["race-condition", "philosophy"],
      relatedLesson: "race-detection"
    },
    {
      id: "race-detection-10",
      type: "code-output",
      question: "How does the race detector flag this code?",
      code: "package main\n\nfunc main() {\n    done := make(chan bool)\n    var data int\n    go func() {\n        data = 42\n        done <- true\n    }()\n    <-done\n    _ = data\n}",
      options: [
        { id: "a", text: "No race; the channel synchronizes access to data" },
        { id: "b", text: "Race detected: data is written in goroutine and read in main" },
        { id: "c", text: "Race detected: data is read in main before the goroutine writes" },
        { id: "d", text: "Race detected: channel operations are not synchronous" }
      ],
      correctAnswer: "a",
      explanation: "The channel send happens before the receive, and the send happens after the write to data, so there is a happens-before relationship.",
      difficulty: "hard",
      points: 30,
      tags: ["race-condition", "channel", "happens-before"],
      relatedLesson: "race-detection"
    }
  ],
  "race-detector": [
    {
      id: "race-detector-1",
      type: "multiple-choice",
      question: "How do you enable the Go race detector?",
      options: [
        { id: "a", text: "go test -race" },
        { id: "b", text: "go test -detect" },
        { id: "c", text: "go test -check-race" },
        { id: "d", text: "go test -race-detection" }
      ],
      correctAnswer: "a",
      explanation: "The -race flag enables the race detector for tests, builds, and runs.",
      difficulty: "easy",
      points: 10,
      tags: ["race-detector", "testing"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-2",
      type: "true-false",
      question: "The race detector adds CPU and memory overhead.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "The race detector instruments memory accesses, which can slow down execution 2-20x and increase memory usage.",
      difficulty: "easy",
      points: 10,
      tags: ["race-detector", "performance"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-3",
      type: "multiple-choice",
      question: "When a race is detected, what does Go report?",
      options: [
        { id: "a", text: "The goroutine stacks and the memory access involved" },
        { id: "b", text: "Just the line number" },
        { id: "c", text: "Nothing; it just crashes" },
        { id: "d", text: "A stack trace without variable names" }
      ],
      correctAnswer: "a",
      explanation: "The race detector prints a detailed report showing both conflicting access stacks and the exact memory location.",
      difficulty: "medium",
      points: 20,
      tags: ["race-detector"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-4",
      type: "scenario",
      question: "Your CI pipeline runs go test -race and finds a race. What should you do?",
      options: [
        { id: "a", text: "Fix the race by adding proper synchronization" },
        { id: "b", text: "Remove the -race flag from CI" },
        { id: "c", text: "Ignore it; races are harmless" },
        { id: "d", text: "Add time.Sleep to make the race less likely" }
      ],
      correctAnswer: "a",
      explanation: "Data races are bugs. Always fix the underlying synchronization issue.",
      difficulty: "easy",
      points: 10,
      tags: ["race-detector", "testing"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-5",
      type: "code-output",
      question: "Will the race detector always catch this race?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var x int\n    var wg sync.WaitGroup\n    wg.Add(2)\n    go func() { x++; wg.Done() }()\n    go func() { fmt.Println(x); wg.Done() }()\n    wg.Wait()\n}",
      options: [
        { id: "a", text: "No, the race detector is statistical; it may miss races" },
        { id: "b", text: "Yes, it always catches all races" },
        { id: "c", text: "No, because WaitGroup prevents detection" },
        { id: "d", text: "Yes, because the race is obvious" }
      ],
      correctAnswer: "a",
      explanation: "The race detector only catches races that actually happen during execution. It does not prove race-freedom.",
      difficulty: "hard",
      points: 30,
      tags: ["race-detector", "limitations"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-6",
      type: "multiple-choice",
      question: "Can the race detector detect races in cgo code?",
      options: [
        { id: "a", text: "No, it only instruments Go code" },
        { id: "b", text: "Yes, it instruments all code" },
        { id: "c", text: "Only if the C code is compiled with -race" },
        { id: "d", text: "Only on Linux" }
      ],
      correctAnswer: "a",
      explanation: "The race detector only instruments Go memory accesses. Cgo code races are not detected.",
      difficulty: "medium",
      points: 20,
      tags: ["race-detector", "cgo"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-7",
      type: "true-false",
      question: "You can use the race detector in production builds.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "The race detector is intended for testing, not production, due to the performance overhead.",
      difficulty: "medium",
      points: 20,
      tags: ["race-detector", "production"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-8",
      type: "identify-bug",
      question: "The race detector reported a race. How do you reproduce it deterministically?",
      options: [
        { id: "a", text: "Run the test many times with -race and hope it triggers again" },
        { id: "b", text: "Use -count=1 and -race" },
        { id: "c", text: "You cannot; races are non-deterministic" },
        { id: "d", text: "Use the -rdflags flag" }
      ],
      correctAnswer: "a",
      explanation: "Races are non-deterministic and may not reproduce every time. Run tests many times to increase detection probability.",
      difficulty: "medium",
      points: 20,
      tags: ["race-detector", "testing"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-9",
      type: "multiple-select",
      question: "Which can be used with -race? (Select all that apply)",
      options: [
        { id: "a", text: "go test" },
        { id: "b", text: "go build" },
        { id: "c", text: "go run" },
        { id: "d", text: "go install" }
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "The -race flag works with all go commands: test, build, run, and install.",
      difficulty: "medium",
      points: 20,
      tags: ["race-detector"],
      relatedLesson: "race-detector"
    },
    {
      id: "race-detector-10",
      type: "best-practice",
      question: "What is the recommended CI practice for race detection?",
      options: [
        { id: "a", text: "Run go test -race ./... regularly in CI" },
        { id: "b", text: "Only run the race detector on commits that modify concurrent code" },
        { id: "c", text: "Run the race detector manually when bugs appear" },
        { id: "d", text: "Skip the race detector; it is too slow" }
      ],
      correctAnswer: "a",
      explanation: "Running -race in CI regularly catches races early. It should be part of the standard test suite.",
      difficulty: "medium",
      points: 20,
      tags: ["race-detector", "ci", "best-practice"],
      relatedLesson: "race-detector"
    }
  ],
  "common-usecases": [
    {
      id: "common-usecases-1",
      type: "multiple-choice",
      question: "Which is a common use case for goroutines?",
      options: [
        { id: "a", text: "Handling multiple concurrent requests in a web server" },
        { id: "b", text: "Storing data in a database" },
        { id: "c", text: "Compiling Go code" },
        { id: "d", text: "Parsing command-line arguments" }
      ],
      correctAnswer: "a",
      explanation: "Web servers commonly use goroutines to handle each incoming request concurrently.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "usecases"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-2",
      type: "code-output",
      question: "What does this common pattern do?",
      code: "package main\n\nimport \"net/http\"\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n    w.Write([]byte(\"Hello\"))\n}\n\nfunc main() {\n    http.HandleFunc(\"/\", handler)\n    http.ListenAndServe(\":8080\", nil)\n}",
      options: [
        { id: "a", text: "Starts a web server; each request runs in its own goroutine" },
        { id: "b", text: "Makes an HTTP request" },
        { id: "c", text: "Downloads a file" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "http.ListenAndServe handles each incoming request in its own goroutine automatically.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "http", "usecases"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-3",
      type: "scenario",
      question: "You need to batch process 1000 files concurrently. Which pattern?",
      options: [
        { id: "a", text: "Fan-out with worker pool" },
        { id: "b", text: "Sequential for loop" },
        { id: "c", text: "Single goroutine per file" },
        { id: "d", text: "Using a timer to space out processing" }
      ],
      correctAnswer: "a",
      explanation: "A worker pool limits concurrency and efficiently processes files in parallel.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "worker-pool", "usecases"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-4",
      type: "code-output",
      question: "What is the output of this common pipeline pattern?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"io/ioutil\"\n    \"strings\"\n)\n\nfunc main() {\n    data := \"hello world\"\n    upper := strings.ToUpper(data)\n    words := strings.Split(upper, \" \")\n    for _, w := range words {\n        fmt.Println(w)\n    }\n}",
      options: [
        { id: "a", text: "HELLO\nWORLD" },
        { id: "b", text: "hello\nworld" },
        { id: "c", text: "HELLO WORLD" },
        { id: "d", text: "hello world" }
      ],
      correctAnswer: "a",
      explanation: "strings.ToUpper converts to uppercase, then Split separates by space.",
      difficulty: "easy",
      points: 10,
      tags: ["pipeline", "strings"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-5",
      type: "multiple-choice",
      question: "What is a common use case for the done-channel pattern?",
      options: [
        { id: "a", text: "Graceful shutdown of background workers" },
        { id: "b", text: "Speeding up CPU-bound computation" },
        { id: "c", text: "Sorting a slice" },
        { id: "d", text: "Reading a file" }
      ],
      correctAnswer: "a",
      explanation: "The done-channel pattern signals goroutines to stop, enabling graceful shutdown.",
      difficulty: "medium",
      points: 20,
      tags: ["concurrency", "done-channel", "usecases"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-6",
      type: "identify-bug",
      question: "What is wrong with this common pattern?",
      code: "func main() {\n    resp, _ := http.Get(\"https://example.com\")\n    defer resp.Body.Close()\n    body, _ := ioutil.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}",
      options: [
        { id: "a", text: "Errors from http.Get and ioutil.ReadAll are ignored" },
        { id: "b", text: "defer resp.Body.Close() after body read" },
        { id: "c", text: "ioutil.ReadAll is deprecated" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "Ignoring errors from http.Get and ioutil.ReadAll can hide network failures.",
      difficulty: "medium",
      points: 20,
      tags: ["error-handling", "http"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-7",
      type: "multiple-select",
      question: "Which are common concurrency use cases in Go? (Select all that apply)",
      options: [
        { id: "a", text: "Web servers handling requests" },
        { id: "b", text: "Background job processing" },
        { id: "c", text: "Real-time data streaming" },
        { id: "d", text: "Batch file processing" }
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All four are common real-world use cases for Go concurrency.",
      difficulty: "easy",
      points: 10,
      tags: ["concurrency", "usecases"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-8",
      type: "code-output",
      question: "What does this code demonstrate?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    ticker := time.NewTicker(1 * time.Second)\n    go func() {\n        for t := range ticker.C {\n            fmt.Println(\"Tick at\", t)\n        }\n    }()\n    time.Sleep(3 * time.Second)\n    ticker.Stop()\n    fmt.Println(\"Ticker stopped\")\n}",
      options: [
        { id: "a", text: "Periodic task execution at regular intervals" },
        { id: "b", text: "One-time delayed execution" },
        { id: "c", text: "Counting down from 3 to 0" },
        { id: "d", text: "A timer that fires once" }
      ],
      correctAnswer: "a",
      explanation: "time.Ticker sends periodic ticks. This is commonly used for recurring tasks like heartbeats.",
      difficulty: "medium",
      points: 20,
      tags: ["time", "ticker", "usecases"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-9",
      type: "best-practice",
      question: "What is the best practice for handling database connections in a web server?",
      options: [
        { id: "a", text: "Use a connection pool (database/sql handles this)" },
        { id: "b", text: "Open a new connection per request" },
        { id: "c", text: "Use a global connection variable without pooling" },
        { id: "d", text: "Share connections across all handlers manually" }
      ],
      correctAnswer: "a",
      explanation: "database/sql provides a built-in connection pool, which is the recommended approach.",
      difficulty: "medium",
      points: 20,
      tags: ["database", "connection-pool", "best-practice"],
      relatedLesson: "common-usecases"
    },
    {
      id: "common-usecases-10",
      type: "code-output",
      question: "What does this code demonstrate?",
      code: "package main\n\nimport \"fmt\"\n\ntype Handler func()\n\nfunc main() {\n    var handlers []Handler\n    for i := 0; i < 3; i++ {\n        i := i\n        handlers = append(handlers, func() {\n            fmt.Println(i)\n        })\n    }\n    for _, h := range handlers {\n        h()\n    }\n}",
      options: [
        { id: "a", text: "0\n1\n2" },
        { id: "b", text: "3\n3\n3" },
        { id: "c", text: "2\n2\n2" },
        { id: "d", text: "0 1 2" }
      ],
      correctAnswer: "a",
      explanation: "The 'i := i' shadows the loop variable, capturing the current value. This is the standard Go idiom for closures in loops.",
      difficulty: "hard",
      points: 30,
      tags: ["closure", "loop-variable", "idiom"],
      relatedLesson: "common-usecases"
    }
  ],
  "context-package": [
    {
      id: "context-package-1",
      type: "multiple-choice",
      question: "What is the main purpose of the context package?",
      options: [
        { id: "a", text: "To carry deadlines, cancellation signals, and request-scoped values" },
        { id: "b", text: "To define application settings" },
        { id: "c", text: "To manage database connections" },
        { id: "d", text: "To compile regular expressions" }
      ],
      correctAnswer: "a",
      explanation: "context.Context carries deadlines, cancellation signals, and values across API boundaries.",
      difficulty: "easy",
      points: 10,
      tags: ["context"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-2",
      type: "code-output",
      question: "What does this code demonstrate?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n)\n\nfunc main() {\n    ctx := context.Background()\n    fmt.Println(ctx.Err())\n}",
      options: [
        { id: "a", text: "<nil>" },
        { id: "b", text: "context canceled" },
        { id: "c", text: "deadline exceeded" },
        { id: "d", text: "unknown" }
      ],
      correctAnswer: "a",
      explanation: "context.Background() returns an empty context with no cancellation. Err() returns nil.",
      difficulty: "easy",
      points: 10,
      tags: ["context", "background"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-3",
      type: "true-false",
      question: "A parent context's cancellation automatically cancels all derived child contexts.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Cancelling a parent context propagates cancellation to all derived contexts created from it.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "cancellation"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-4",
      type: "code-output",
      question: "What does this code do?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n)\n\nfunc main() {\n    ctx, cancel := context.WithCancel(context.Background())\n    defer cancel()\n    select {\n    case <-ctx.Done():\n        fmt.Println(\"cancelled\")\n    default:\n        fmt.Println(\"not cancelled\")\n    }\n}",
      options: [
        { id: "a", text: "not cancelled" },
        { id: "b", text: "cancelled" },
        { id: "c", text: "Deadlock" },
        { id: "d", text: "No output" }
      ],
      correctAnswer: "a",
      explanation: "The context is not cancelled yet (cancel() is deferred). ctx.Done() is nil, so select goes to default.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "cancel", "done"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-5",
      type: "scenario",
      question: "You want a web handler to timeout after 5 seconds. Which context function?",
      options: [
        { id: "a", text: "context.WithTimeout" },
        { id: "b", text: "context.WithCancel" },
        { id: "c", text: "context.Background" },
        { id: "d", text: "context.TODO" }
      ],
      correctAnswer: "a",
      explanation: "context.WithTimeout creates a context that auto-cancels after the specified duration.",
      difficulty: "easy",
      points: 10,
      tags: ["context", "timeout"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-6",
      type: "identify-bug",
      question: "What is wrong with this context usage?",
      code: "func handler(w http.ResponseWriter, r *http.Request) {\n    ctx := r.Context()\n    val := ctx.Value(\"user\")\n    // use val\n}",
      options: [
        { id: "a", text: "The key for context values should be a custom type, not a string" },
        { id: "b", text: "Cannot call ctx.Value from an HTTP handler" },
        { id: "c", text: "Cannot use request context outside the request lifecycle" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "Context value keys should be custom types to avoid collisions. Using string keys is discouraged.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "values", "best-practice"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-7",
      type: "multiple-select",
      question: "What are the two root context functions provided by the context package? (Select all that apply)",
      options: [
        { id: "a", text: "context.Background()" },
        { id: "b", text: "context.TODO()" },
        { id: "c", text: "context.Root()" },
        { id: "d", text: "context.New()" }
      ],
      correctAnswer: ["a", "b"],
      explanation: "Background and TODO are the two root contexts. Background is typically used as the top-level context.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "root"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)\n    defer cancel()\n    <-ctx.Done()\n    fmt.Println(ctx.Err())\n}",
      options: [
        { id: "a", text: "context deadline exceeded" },
        { id: "b", text: "context canceled" },
        { id: "c", text: "<nil>" },
        { id: "d", text: "deadline" }
      ],
      correctAnswer: "a",
      explanation: "After the timeout expires, ctx.Done() is closed and ctx.Err() returns DeadlineExceeded.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "timeout", "deadline"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-9",
      type: "best-practice",
      question: "What is the convention for passing context in Go functions?",
      options: [
        { id: "a", text: "Context should be the first parameter of a function" },
        { id: "b", text: "Context should be stored in a struct" },
        { id: "c", text: "Context should be a global variable" },
        { id: "d", text: "Context should be the last parameter" }
      ],
      correctAnswer: "a",
      explanation: "By convention, ctx is the first parameter of functions that accept a context.",
      difficulty: "easy",
      points: 10,
      tags: ["context", "convention"],
      relatedLesson: "context-package"
    },
    {
      id: "context-package-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n)\n\ntype key string\n\nconst userKey key = \"user\"\n\nfunc main() {\n    ctx := context.WithValue(context.Background(), userKey, \"alice\")\n    v := ctx.Value(userKey)\n    fmt.Println(v)\n}",
      options: [
        { id: "a", text: "alice" },
        { id: "b", text: "user" },
        { id: "c", text: "alice key" },
        { id: "d", text: "Compilation error" }
      ],
      correctAnswer: "a",
      explanation: "context.WithValue stores the value with a typed key. ctx.Value retrieves it.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "values"],
      relatedLesson: "context-package"
    }
  ],
  "deadlines--cancellations": [
    {
      id: "deadlines-1",
      type: "multiple-choice",
      question: "How do you create a context with a deadline?",
      options: [
        { id: "a", text: "context.WithDeadline(parent, time)" },
        { id: "b", text: "context.NewDeadline(parent, time)" },
        { id: "c", text: "context.CreateDeadline(parent, time)" },
        { id: "d", text: "context.Deadline(parent, time)" }
      ],
      correctAnswer: "a",
      explanation: "context.WithDeadline creates a context that cancels at the specified time.",
      difficulty: "easy",
      points: 10,
      tags: ["context", "deadline"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-2",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(-1*time.Hour))\n    defer cancel()\n    select {\n    case <-ctx.Done():\n        fmt.Println(ctx.Err())\n    default:\n        fmt.Println(\"not done\")\n    }\n}",
      options: [
        { id: "a", text: "context deadline exceeded" },
        { id: "b", text: "not done" },
        { id: "c", text: "context canceled" },
        { id: "d", text: "Deadline not implemented" }
      ],
      correctAnswer: "a",
      explanation: "The deadline is in the past (-1 hour), so the context is already cancelled with DeadlineExceeded.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "deadline", "timeout"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-3",
      type: "true-false",
      question: "Calling cancel() on a context multiple times is safe.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "It is safe to call cancel multiple times. The first call cancels the context; subsequent calls do nothing.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "cancel"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-4",
      type: "scenario",
      question: "You start 10 goroutines that should stop when a user cancels an operation. What should you pass?",
      options: [
        { id: "a", text: "A shared context.Context with cancel" },
        { id: "b", text: "A channel per goroutine" },
        { id: "c", text: "A global boolean flag" },
        { id: "d", text: "A signal handler" }
      ],
      correctAnswer: "a",
      explanation: "A shared context with cancel propagates cancellation to all goroutines efficiently.",
      difficulty: "easy",
      points: 10,
      tags: ["context", "cancellation"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-5",
      type: "code-output",
      question: "What does this code do?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n)\n\nfunc main() {\n    ctx, cancel := context.WithCancel(context.Background())\n    go func() {\n        <-ctx.Done()\n        fmt.Println(\"stopped\")\n    }()\n    cancel()\n    // wait a bit\n    fmt.Scanln()\n}",
      options: [
        { id: "a", text: "prints 'stopped' then waits for input" },
        { id: "b", text: "prints nothing" },
        { id: "c", text: "deadlocks" },
        { id: "d", text: "panics" }
      ],
      correctAnswer: "a",
      explanation: "cancel() triggers ctx.Done() in the goroutine, which prints 'stopped'. Main waits for input.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "cancel", "done"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-6",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: "func main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n    time.Sleep(200 * time.Millisecond)\n    select {\n    case <-ctx.Done():\n        fmt.Println(\"done\")\n    }\n}",
      options: [
        { id: "a", text: "cancel() is never called, causing a context leak" },
        { id: "b", text: "time.Sleep blocks the select" },
        { id: "c", text: "WithTimeout does not work with Sleep" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "The cancel function returned by WithTimeout should always be called to free resources, even if the timeout fires.",
      difficulty: "hard",
      points: 30,
      tags: ["context", "leak", "cancel"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-7",
      type: "multiple-choice",
      question: "What does ctx.Deadline() return?",
      options: [
        { id: "a", text: "The deadline time and a boolean indicating if a deadline is set" },
        { id: "b", text: "The remaining duration" },
        { id: "c", text: "The creation time of the context" },
        { id: "d", text: "The current time" }
      ],
      correctAnswer: "a",
      explanation: "ctx.Deadline() returns the deadline time (if set) and true, or zero time and false if no deadline.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "deadline"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n    defer cancel()\n    deadline, ok := ctx.Deadline()\n    fmt.Println(ok, deadline.After(time.Now()))\n}",
      options: [
        { id: "a", text: "true true" },
        { id: "b", text: "true false" },
        { id: "c", text: "false false" },
        { id: "d", text: "false true" }
      ],
      correctAnswer: "a",
      explanation: "A deadline is set (ok=true) and it is in the future (deadline.After(time.Now()) is true).",
      difficulty: "hard",
      points: 30,
      tags: ["context", "deadline", "timeout"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-9",
      type: "best-practice",
      question: "What should you do with the cancel function returned by WithCancel/WithTimeout?",
      options: [
        { id: "a", text: "Always call it, typically via defer, to release resources" },
        { id: "b", text: "Only call it if you need to cancel early" },
        { id: "c", text: "Never call it; it is called automatically" },
        { id: "d", text: "Store it in a global variable" }
      ],
      correctAnswer: "a",
      explanation: "The cancel function should always be called to release context resources, even if the context will timeout.",
      difficulty: "medium",
      points: 20,
      tags: ["context", "cancel", "best-practice"],
      relatedLesson: "deadlines--cancellations"
    },
    {
      id: "deadlines-10",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    parent, cancel := context.WithCancel(context.Background())\n    defer cancel()\n    child, _ := context.WithTimeout(parent, 1*time.Hour)\n    cancel()\n    <-child.Done()\n    fmt.Println(child.Err())\n}",
      options: [
        { id: "a", text: "context canceled" },
        { id: "b", text: "context deadline exceeded" },
        { id: "c", text: "<nil>" },
        { id: "d", text: "No output; deadline will trigger first" }
      ],
      correctAnswer: "a",
      explanation: "Parent cancellation propagates to the child. Even though the child had a deadline, it reports 'context canceled'.",
      difficulty: "hard",
      points: 30,
      tags: ["context", "cancellation", "propagation"],
      relatedLesson: "deadlines--cancellations"
    }
  ],
  "iterating-strings": [
    {
      id: "iterating-strings-1",
      type: "multiple-choice",
      question: "When iterating over a string with range, what does the index refer to?",
      options: [
        { id: "a", text: "Byte index, not rune index" },
        { id: "b", text: "Rune index" },
        { id: "c", text: "Character index" },
        { id: "d", text: "Word index" }
      ],
      correctAnswer: "a",
      explanation: "range over a string iterates over runes but the index is the byte position, not the rune count.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "range", "runes"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-2",
      type: "code-output",
      question: "What is the output of this code?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := \"Hi 世\"\n    for i, r := range s {\n        fmt.Printf(\"%d:%c \", i, r)\n    }\n}",
      options: [
        { id: "a", text: "0:H 1:i 2:  3:世" },
        { id: "b", text: "0:H 1:i 2:世" },
        { id: "c", text: "0:H 1:i 2:世 3:界" },
        { id: "d", text: "0:H 1:i 2:  3:世 4:界" }
      ],
      correctAnswer: "a",
      explanation: "'Hi ' is 3 bytes (H=1, i=1, space=1). '世' is 3 bytes starting at index 3.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "range", "unicode"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-3",
      type: "true-false",
      question: "A for loop with an index (for i := 0; i < len(s); i++) iterates over runes.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "A byte-by-byte loop iterates over bytes, not runes. Only range over string iterates over runes.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "iteration", "bytes"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-4",
      type: "code-output",
      question: "What is the output?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := \"Hello\"\n    fmt.Println(len(s))\n}",
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "3" },
        { id: "c", text: "8" },
        { id: "d", text: "10" }
      ],
      correctAnswer: "a",
      explanation: "len() returns the number of bytes. 'Hello' is 5 ASCII characters, each 1 byte, so len is 5.",
      difficulty: "easy",
      points: 10,
      tags: ["strings", "len"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-5",
      type: "code-output",
      question: "What is the output of this rune iteration?",
      code: "package main\n\nimport (\n    \"fmt\"\n    \"unicode/utf8\"\n)\n\nfunc main() {\n    s := \"世界\"\n    fmt.Println(utf8.RuneCountInString(s), len(s))\n}",
      options: [
        { id: "a", text: "2 6" },
        { id: "b", text: "6 2" },
        { id: "c", text: "2 2" },
        { id: "d", text: "6 6" }
      ],
      correctAnswer: "a",
      explanation: "'世界' has 2 runes, each 3 bytes in UTF-8, so len returns 6 bytes.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "runes", "utf8"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-6",
      type: "identify-bug",
      question: "What is the bug in this code?",
      code: "func reverse(s string) string {\n    result := \"\"\n    for i := len(s) - 1; i >= 0; i-- {\n        result += string(s[i])\n    }\n    return result\n}",
      options: [
        { id: "a", text: "Byte-by-byte reversal breaks multi-byte runes" },
        { id: "b", text: "string indexing is not valid" },
        { id: "c", text: "Cannot use += on strings" },
        { id: "d", text: "Nothing is wrong" }
      ],
      correctAnswer: "a",
      explanation: "Reversing bytes instead of runes will corrupt multi-byte UTF-8 characters.",
      difficulty: "hard",
      points: 30,
      tags: ["strings", "runes", "bug"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-7",
      type: "multiple-select",
      question: "Which are correct ways to count runes in a string? (Select all that apply)",
      options: [
        { id: "a", text: "utf8.RuneCountInString(s)" },
        { id: "b", text: "len([]rune(s))" },
        { id: "c", text: "len(s)" },
        { id: "d", text: "for range s { n++ }" }
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "len(s) counts bytes, not runes. The other three correctly count runes.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "runes", "counting"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-8",
      type: "code-output",
      question: "What does this code print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := \"a\u0300\" // 'a' with combining grave accent\n    fmt.Println(len(s), len([]rune(s)))\n}",
      options: [
        { id: "a", text: "3 2" },
        { id: "b", text: "2 1" },
        { id: "c", text: "2 2" },
        { id: "d", text: "1 1" }
      ],
      correctAnswer: "a",
      explanation: "'a' is 1 byte, the combining accent is 2 bytes = 3 bytes total. It has 2 runes.",
      difficulty: "hard",
      points: 30,
      tags: ["strings", "runes", "combining"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-9",
      type: "best-practice",
      question: "What is the most efficient way to check if a string contains a specific rune?",
      options: [
        { id: "a", text: "strings.ContainsRune(s, r)" },
        { id: "b", text: "for range s { if r == target { ... } }" },
        { id: "c", text: "utf8.DecodeRuneInString(s)" },
        { id: "d", text: "strings.IndexRune(s, r) >= 0" }
      ],
      correctAnswer: "a",
      explanation: "strings.ContainsRune is the most readable and efficient way to check for a rune.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "runes", "best-practice"],
      relatedLesson: "iterating-strings"
    },
    {
      id: "iterating-strings-10",
      type: "code-output",
      question: "What does this print?",
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := \"Go\"\n    for i := 0; i < len(s); i++ {\n        fmt.Printf(\"%x \", s[i])\n    }\n}",
      options: [
        { id: "a", text: "47 6f" },
        { id: "b", text: "G o" },
        { id: "c", text: "71 111" },
        { id: "d", text: "G 71 o 111" }
      ],
      correctAnswer: "a",
      explanation: "Hex values: 'G' = 0x47, 'o' = 0x6f. Byte-by-byte iteration prints each byte in hex.",
      difficulty: "medium",
      points: 20,
      tags: ["strings", "bytes", "hex"],
      relatedLesson: "iterating-strings"
    }
  ],
};
