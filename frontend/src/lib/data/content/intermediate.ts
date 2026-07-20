import type { TopicContent } from "./fundamentals";

export const intermediateContent: Record<string, TopicContent> = {
  "structs": {
    slug: "structs",
    title: "Structs",
    summary: "Structs are Go's primary way to group related data fields into a single composite type.",
    description: `Structs in Go are composite data types that group named fields of different types into a single unit. Unlike classes in OOP languages, structs in Go are purely data containers — they hold state but do not define behavior. Methods are attached separately, keeping data and logic decoupled by design.

For backend engineers, structs are the backbone of almost every Go program. They model database records, API request and response payloads, configuration objects, and domain entities. Defining clear struct types creates implicit contracts between parts of your system, making code self-documenting and easier to reason about.

In real-world services, structs are serialized to JSON for API communication, mapped to database rows with scanning, and passed between goroutines via channels. Understanding struct initialization, zero values, and field tags is essential for building reliable production systems.`,
    keyPoints: [
      "Structs are value types in Go — copying a struct copies all its fields",
      "Fields are accessed with dot notation: s.FieldName",
      "Struct literals can use positional or named field syntax",
      "Zero values are assigned to uninitialized fields (0, false, empty string, nil)",
      "Struct tags provide metadata for JSON, DB, validation, and other frameworks",
      "Anonymous structs are useful for one-off temporary groupings",
      "Structs can be compared with == if all fields are comparable"
    ],
    codeExamples: [
      {
        title: "Defining and Using Structs",
        description: "Creating a struct for a user entity with proper initialization",
        bad: [
          'type User struct {',
          '    Name string',
          '    Email string',
          '    Age int',
          '}',
          '',
          '// Using positional initialization — fragile and hard to read:',
          'func createUser() User {',
          '    return User{"Alice", "alice@example.com", 30}',
          '}',
          '',
          '// Accessing potentially zero-value fields without checking:',
          'func processUser(u User) string {',
          '    return "User: " + u.Name',
          '}',
        ].join('\n'),
        good: [
          'type User struct {',
          '    Name  string `json:"name"`',
          '    Email string `json:"email"`',
          '    Age   int    `json:"age"`',
          '}',
          '',
          '// Named field initialization — clear and maintainable:',
          'func createUser() User {',
          '    return User{',
          '        Name:  "Alice",',
          '        Email: "alice@example.com",',
          '        Age:   30,',
          '    }',
          '}',
          '',
          '// Safe access with fmt.Sprintf:',
          'func processUser(u User) string {',
          '    return fmt.Sprintf("User: %s age: %d", u.Name, u.Age)',
          '}',
        ].join('\n'),
        explanation: "Always use named field initialization — it is explicit, self-documenting, and resilient to field reordering. Positional initialization breaks silently when fields are added or rearranged. Struct tags enable serialization frameworks like encoding/json to map field names to wire formats."
      }
    ],
    bestPractices: [
      "Use named field initialization to avoid positional fragility",
      "Add JSON struct tags for any struct used in API or storage contexts",
      "Keep structs small and focused — prefer composition over large structs",
      "Use pointer receivers for methods that modify struct state",
      "Document exported struct fields when the meaning is not obvious"
    ],
    commonMistakes: [
      "Using positional struct literals that break when fields are reordered",
      "Forgetting JSON tags, resulting in ugly exported field names in JSON output",
      "Comparing structs that contain slices or maps (compilation error)",
      "Modifying a struct copy instead of a pointer and wondering why changes are lost"
    ],
    relatedTopics: [
      "embedding-structs",
      "struct-tags--json",
      "pointers-with-structs"
    ],
    externalResources: [
      { title: "Go Spec: Struct types", url: "https://go.dev/ref/spec#Struct_types" },
      { title: "Effective Go: Structs", url: "https://go.dev/doc/effective_go#structs" },
      { title: "Go Blog: JSON and Go", url: "https://go.dev/blog/json" }
    ]
  },

  "embedding-structs": {
    slug: "embedding-structs",
    title: "Embedding Structs",
    summary: "Struct embedding lets you compose types by promoting their fields and methods without inheritance.",
    description: `Go does not have inheritance. Instead, it offers struct embedding — a form of composition where one struct is included as an anonymous field inside another. The embedded struct's fields and methods are "promoted" to the outer struct, allowing you to access them as if they were defined directly on the outer type.

This is a deliberate design choice. Embedding gives you code reuse and interface satisfaction without the complexity of class hierarchies. The inner struct's identity is preserved, and you can always access it explicitly via its type name. When fields or methods conflict, the compiler forces you to resolve the ambiguity explicitly.

For backend engineers, embedding is critical for building layered architectures. Common patterns include embedding database models into API response structs, composing middleware behaviors, and building rich domain types from smaller value objects.`,
    keyPoints: [
      "Embedding uses an anonymous field — the type name becomes the field name",
      "Promoted fields and methods are accessible on the outer struct",
      "Outer struct methods shadow inner struct methods with the same name",
      "Multiple embedding creates a flat namespace — conflicts require explicit resolution",
      "The inner struct can be accessed by its type name: outer.Inner",
      "Embedding is composition, not inheritance — there is no 'super' or 'this'",
      "Interfaces can also be embedded, composing method sets"
    ],
    codeExamples: [
      {
        title: "Struct Embedding and Field Promotion",
        description: "Using embedding to compose a UserWithProfile from User and Profile",
        bad: [
          'type User struct {',
          '    ID    int',
          '    Email string',
          '}',
          '',
          '// Manual delegation — repetitive and error-prone:',
          'type UserWithProfile struct {',
          '    User        User',
          '    Bio         string',
          '    AvatarURL   string',
          '}',
          '',
          '// Must manually forward every call:',
          'func (u UserWithProfile) GetID() int    { return u.User.ID }',
          'func (u UserWithProfile) GetEmail() string { return u.User.Email }',
        ].join('\n'),
        good: [
          'type User struct {',
          '    ID    int    `json:"id"`',
          '    Email string `json:"email"`',
          '}',
          '',
          '// Embedding promotes User fields to UserWithProfile:',
          'type UserWithProfile struct {',
          '    User',
          '    Bio       string `json:"bio"`',
          '    AvatarURL string `json:"avatar_url"`',
          '}',
          '',
          '// Promoted fields — clean access:',
          'func describe(uwp UserWithProfile) string {',
          '    return fmt.Sprintf("ID: %d, Email: %s, Bio: %s",',
          '        uwp.ID, uwp.Email, uwp.Bio)',
          '}',
          '',
          '// Explicit access to inner struct when needed:',
          'func userOnly(uwp UserWithProfile) User {',
          '    return uwp.User',
          '}',
        ].join('\n'),
        explanation: "Embedding User inside UserWithProfile promotes ID and Email fields so they can be accessed directly on UserWithProfile. This eliminates boilerplate forwarding methods. The inner struct is still accessible explicitly via uwp.User when you need the composed type directly."
      }
    ],
    bestPractices: [
      "Favor composition via embedding over deep inheritance-like hierarchies",
      "When multiple embedded types have conflicting methods, add an explicit wrapper",
      "Use embedding to satisfy interfaces by composing small interface-satisfying types",
      "Keep embedding shallow — deeply nested embedding hurts readability",
      "Document when embedding is used for interface satisfaction vs. field promotion"
    ],
    commonMistakes: [
      "Confusing embedding with inheritance — there is no polymorphic dispatch",
      "Shadowed methods from multiple embedded types cause silent behavior changes",
      "Assuming promoted fields are copied — they share memory with the embedded struct",
      "Using embedding to build deep chains that are hard to debug"
    ],
    relatedTopics: [
      "structs",
      "embedding-interfaces",
      "interfaces"
    ],
    externalResources: [
      { title: "Effective Go: Embedding", url: "https://go.dev/doc/effective_go#embedding" },
      { title: "Go Blog: Embedding in Go", url: "https://go.dev/doc/effective_go#embedding" },
      { title: "Go Spec: Struct types", url: "https://go.dev/ref/spec#Struct_types" }
    ]
  },

  "struct-tags--json": {
    slug: "struct-tags--json",
    title: "Struct Tags (JSON)",
    summary: "Struct tags annotate fields with metadata for JSON serialization, database mapping, and validation.",
    description: `Struct tags are string literals attached to struct fields that provide metadata to packages like encoding/json, database/sql, and validation libraries. Tags are key-value pairs separated by spaces, with keys and values separated by colons. They are accessed at runtime via reflection.

The json tag is the most common, controlling how fields map to JSON keys during marshaling and unmarshaling. Tags like omitempty skip zero-value fields, and the - tag value tells the encoder to ignore a field entirely. Without tags, Go's JSON encoder uses the exported field name as-is, which often doesn't match conventional API naming like camelCase.

For backend engineers, struct tags are essential for every API and storage layer. They define the contract between your Go types and the outside world. Correct tags prevent bugs where fields are silently dropped from JSON responses or database inserts fail because column names don't match.`,
    keyPoints: [
      "Tags are raw string literals on struct fields: `key:\"value\"`",
      "json tags control JSON field names: `json:\"user_name\"`",
      "omitempty omits zero-value fields from JSON output",
      "The dash tag `-` tells the encoder to ignore the field entirely",
      "db tags map fields to database column names for ORMs/scanners",
      "Tags are read via reflection — packages like json and sql use them internally",
      "Multiple tag types can coexist: `json:\"name\" db:\"user_name\"`",
      "Tag syntax varies by package — always check the package documentation"
    ],
    codeExamples: [
      {
        title: "JSON Struct Tags in Practice",
        description: "Properly tagging a struct for API responses and database storage",
        bad: [
          'type Response struct {',
          '    UserName  string',
          '    UserEmail string',
          '    Password  string',
          '    IsActive  bool',
          '    CreatedAt time.Time',
          '}',
          '',
          '// Without tags, JSON output is:',
          '// {"UserName":"alice","UserEmail":"alice@example.com","Password":"secret",...}',
          '// Uppercase field names violate API conventions and leak the password field',
        ].join('\n'),
        good: [
          'type Response struct {',
          '    UserName  string    `json:"userName"`',
          '    UserEmail string    `json:"userEmail"`',
          '    Password  string    `json:"-"`',
          '    IsActive  bool      `json:"isActive"`',
          '    CreatedAt time.Time `json:"createdAt,omitempty"`',
          '}',
          '',
          '// JSON output:',
          '// {"userName":"alice","userEmail":"alice@example.com","isActive":true}',
          '// Password is excluded, naming follows camelCase convention',
        ].join('\n'),
        explanation: "Tags transform the JSON output to match API conventions. The `-` tag on Password prevents sensitive data from leaking in responses. The omitempty tag on CreatedAt avoids including the zero time value when it hasn't been set."
      }
    ],
    bestPractices: [
      "Always add json tags to structs used in API request/response types",
      "Use `-` to exclude sensitive fields like passwords and internal tokens",
      "Prefer omitempty for optional fields to keep JSON payloads clean",
      "Use db tags alongside json tags for types shared between API and storage layers",
      "Validate tag syntax early — mistyped tags cause silent serialization bugs"
    ],
    commonMistakes: [
      "Omitting json tags, leading to uppercase field names in JSON output",
      "Forgetting to exclude sensitive fields, leaking passwords or tokens",
      "Using omitempty on bool fields where false is a meaningful value",
      "Typos in tag keys (e.g., json vs jsont) cause silent failures"
    ],
    relatedTopics: [
      "structs",
      "error-handling-basics",
      "interfaces"
    ],
    externalResources: [
      { title: "Go Blog: JSON and Go", url: "https://go.dev/blog/json" },
      { title: "Go Doc: encoding/json", url: "https://pkg.go.dev/encoding/json" },
      { title: "Go Reference: Struct Tags", url: "https://go.dev/ref/spec#Tag" }
    ]
  },

  "methods-vs-functions": {
    slug: "methods-vs-functions",
    title: "Methods vs Functions",
    summary: "Methods are functions with a receiver; they define behavior on types while functions are standalone.",
    description: `In Go, the key difference between a method and a function is the receiver. A method has an extra parameter — the receiver — which binds it to a specific type. This receiver can be a value or a pointer, and it determines how the method operates on its target. Regular functions have no receiver and operate only on their explicit parameters.

Methods in Go serve a similar role to member functions in other languages, but they are more flexible. Because methods are defined outside the type declaration, you can define methods on types you did not create, including types from other packages. This enables interface satisfaction and extension of existing types without modifying their source.

For backend engineers, understanding when to use methods vs functions is fundamental to Go API design. Methods are ideal when behavior is tightly coupled to a type — like marshaling, validation, or string representation. Pure functions are better for stateless transformations that don't belong to a particular type.`,
    keyPoints: [
      "Methods have a receiver: func (r Receiver) Method() ReturnType",
      "Value receivers operate on copies; pointer receivers operate on originals",
      "You can define methods on any named type in your package (not built-in types)",
      "Methods are the mechanism for implementing interfaces",
      "Functions are preferred when no specific type ownership is needed",
      "The receiver is the first parameter by convention, named with a short abbreviation",
      "Methods can be called on both values and pointers (Go handles the conversion)"
    ],
    codeExamples: [
      {
        title: "Methods vs Functions for Area Calculation",
        description: "Comparing a standalone function with a method bound to a Rectangle type",
        bad: [
          'type Rectangle struct {',
          '    Width, Height float64',
          '}',
          '',
          '// Function approach — no type association:',
          'func CalculateArea(r Rectangle) float64 {',
          '    return r.Width * r.Height',
          '}',
          '',
          '// Usage is disconnected from the type:',
          'area := CalculateArea(myRect)',
        ].join('\n'),
        good: [
          'type Rectangle struct {',
          '    Width, Height float64',
          '}',
          '',
          '// Method — bound to Rectangle:',
          'func (r Rectangle) Area() float64 {',
          '    return r.Width * r.Height',
          '}',
          '',
          '// Perimeter is also a natural method:',
          'func (r Rectangle) Perimeter() float64 {',
          '    return 2 * (r.Width + r.Height)',
          '}',
          '',
          '// Readable, object-like syntax:',
          'area := myRect.Area()',
          'perim := myRect.Perimeter()',
        ].join('\n'),
        explanation: "Methods group behavior with the type they operate on, making code more readable and discoverable. myRect.Area() is self-documenting — you know immediately that it computes something related to Rectangle. Methods also enable interface implementation, which standalone functions cannot do."
      }
    ],
    bestPractices: [
      "Use methods when behavior is logically tied to a specific type",
      "Use pure functions for stateless transformations independent of any type",
      "Prefer pointer receivers for types with mutable state or large value sizes",
      "Name methods with clear, verb-first names: Get, Set, Validate, Marshal",
      "Keep method sets consistent — if one method uses a pointer receiver, use it for all"
    ],
    commonMistakes: [
      "Defining methods on non-package types (e.g., int, string, or imported types)",
      "Mixing value and pointer receivers on the same type inconsistently",
      "Using methods when a simple function would be clearer and more testable",
      "Making methods that depend on hidden global state instead of using parameters"
    ],
    relatedTopics: [
      "value-receivers",
      "pointer-receivers",
      "interfaces"
    ],
    externalResources: [
      { title: "Effective Go: Methods", url: "https://go.dev/doc/effective_go#methods" },
      { title: "Go Spec: Method declarations", url: "https://go.dev/ref/spec#Method_declarations" },
      { title: "Go Blog: Laws of Reflection", url: "https://go.dev/blog/laws-of-reflection" }
    ]
  },

  "value-receivers": {
    slug: "value-receivers",
    title: "Value Receivers",
    summary: "Value receiver methods operate on a copy of the struct, leaving the original unchanged.",
    description: `A value receiver method gets a copy of the receiver when called. Any modifications made inside the method affect only the copy, not the original value. This provides natural immutability guarantees and makes concurrent access safe without locks.

Value receivers are ideal for methods that compute derived data without side effects — like formatting, calculations, or serialization. Since Go copies the receiver, there's no risk of the method accidentally mutating shared state. This makes value receiver methods inherently safe for concurrent reads.

The trade-off is performance. For large structs, copying the receiver on every method call can be expensive. If the struct contains large slices, maps, or is bigger than a few words, a pointer receiver is more efficient. For small structs used in read-only methods, value receivers are the idiomatic choice.`,
    keyPoints: [
      "Value receiver syntax: func (r MyType) Method() ReturnType",
      "The method receives a copy — modifications don't affect the original",
      "Safe for concurrent reads without synchronization",
      "Best for small, immutable structs and pure computation methods",
      "Copies slices and maps — the method gets its own slice header/map reference",
      "Cannot modify the original receiver's fields from within the method",
      "When in doubt, start with value receivers and optimize later"
    ],
    codeExamples: [
      {
        title: "Value Receiver Immutability",
        description: "Demonstrating that value receiver methods cannot modify the original",
        bad: [
          'type Counter struct {',
          '    Value int',
          '}',
          '',
          '// Value receiver — increments the copy, not the original:',
          'func (c Counter) Increment() {',
          '    c.Value++',
          '}',
          '',
          '// This looks like it should work, but doesn\'t:',
          'c := Counter{Value: 0}',
          'c.Increment()',
          'fmt.Println(c.Value) // Prints 0, not 1!',
        ].join('\n'),
        good: [
          'type Counter struct {',
          '    Value int',
          '}',
          '',
          '// Value receiver for read-only operations:',
          'func (c Counter) String() string {',
          '    return fmt.Sprintf("Counter{%d}", c.Value)',
          '}',
          '',
          'func (c Counter) IsPositive() bool {',
          '    return c.Value > 0',
          '}',
          '',
          '// Pointer receiver for mutation:',
          'func (c *Counter) Increment() {',
          '    c.Value++',
          '}',
          '',
          'c := Counter{Value: 0}',
          'c.Increment()',
          'fmt.Println(c) // Counter{1}',
          'fmt.Println(c.String()) // Counter{1}',
        ].join('\n'),
        explanation: "Value receivers are perfect for read-only methods like String() and IsPositive(). They express intent clearly — this method won't change the receiver. For mutation, use pointer receivers. Mixing receiver types on the same type is confusing and should be avoided."
      }
    ],
    bestPractices: [
      "Use value receivers for read-only methods on small structs",
      "Switch to pointer receivers when the struct is large or needs mutation",
      "Keep all methods on a type using the same receiver type for consistency",
      "Value receivers provide implicit concurrency safety for reads",
      "Use value receivers for methods that return derived computations"
    ],
    commonMistakes: [
      "Expecting value receiver methods to modify the original struct",
      "Using value receivers on large structs causing unnecessary copying overhead",
      "Mixing value and pointer receivers on the same type (causes interface issues)",
      "Not realizing slices inside value receivers share underlying arrays"
    ],
    relatedTopics: [
      "pointer-receivers",
      "methods-vs-functions",
      "pointers-with-structs"
    ],
    externalResources: [
      { title: "Effective Go: Pointers vs Values", url: "https://go.dev/doc/effective_go#pointers_vs_values" },
      { title: "Go Spec: Method sets", url: "https://go.dev/ref/spec#Method_sets" },
      { title: "Go FAQ: Methods on value types", url: "https://go.dev/doc/faq#Methods_on_value_types" }
    ]
  },

  "pointer-receivers": {
    slug: "pointer-receivers",
    title: "Pointer Receivers",
    summary: "Pointer receiver methods operate on the original value, enabling mutation and avoiding copies.",
    description: `Pointer receiver methods receive a pointer to the original value, allowing the method to read and modify the receiver's fields. Changes made inside the method persist after the method returns. Pointer receivers also avoid copying large structs on every method call.

Pointer receivers are the default choice for most methods in production Go code. They allow mutation, which is needed for setters, state updates, and builder patterns. They also avoid the cost of copying large structs, which matters for types containing slices, maps, or many fields.

The Go team recommends using pointer receivers when any method on the type needs to modify the receiver. Once you choose pointer receivers for some methods, use them for all methods on that type to maintain consistency and avoid confusing interface satisfaction behavior.`,
    keyPoints: [
      "Pointer receiver syntax: func (r *MyType) Method() ReturnType",
      "Modifications inside the method affect the original value",
      "Avoids copying large structs on every method call",
      "Required when the method needs to update internal state",
      "Go automatically handles addressable values when calling pointer methods",
      "Use consistently across all methods of a type",
      "Pointer receiver methods cannot be called on unaddressable values"
    ],
    codeExamples: [
      {
        title: "Pointer Receiver for Mutable State",
        description: "Building a Buffer type that mutates internal state via pointer receivers",
        bad: [
          'type Buffer struct {',
          '    data []byte',
          '}',
          '',
          '// Value receiver — appends to a copy of the slice header:',
          'func (b Buffer) Write(data []byte) int {',
          '    b.data = append(b.data, data...)',
          '    return len(data)',
          '}',
          '',
          '// Original Buffer is never modified:',
          'buf := Buffer{}',
          'buf.Write([]byte("hello"))',
          'fmt.Println(len(buf.data)) // 0 — writes were lost!',
        ].join('\n'),
        good: [
          'type Buffer struct {',
          '    data []byte',
          '}',
          '',
          '// Pointer receiver — mutates the original:',
          'func (b *Buffer) Write(data []byte) int {',
          '    b.data = append(b.data, data...)',
          '    return len(data)',
          '}',
          '',
          'func (b *Buffer) Bytes() []byte {',
          '    return b.data',
          '}',
          '',
          'buf := &Buffer{}',
          'buf.Write([]byte("hello"))',
          'fmt.Println(string(buf.Bytes())) // "hello"',
        ].join('\n'),
        explanation: "The value receiver version loses all writes because append modifies a copy of the slice header. The pointer receiver version correctly mutates the original Buffer's data slice. Note that even Bytes() uses a pointer receiver for consistency, though it could technically use a value receiver."
      }
    ],
    bestPractices: [
      "Use pointer receivers when any method on the type mutates state",
      "Be consistent — use pointer receivers for all methods once you start",
      "Avoid unnecessary dereferencing — Go handles a.Method() for both &a and a",
      "For large structs, pointer receivers avoid expensive copying",
      "Initialize pointer-receiver types with &Type{} or new(Type)"
    ],
    commonMistakes: [
      "Inconsistent receiver types across methods on the same struct",
      "Forgetting to initialize pointer receiver types, causing nil dereference",
      "Calling pointer methods on unaddressable values (temporaries, return values)",
      "Using pointer receivers unnecessarily on tiny immutable structs"
    ],
    relatedTopics: [
      "value-receivers",
      "pointers-with-structs",
      "methods-vs-functions"
    ],
    externalResources: [
      { title: "Effective Go: Pointers vs Values", url: "https://go.dev/doc/effective_go#pointers_vs_values" },
      { title: "Go Blog: Pointer receivers", url: "https://go.dev/doc/effective_go#methods" },
      { title: "Go FAQ: Can I call a method on a nil pointer?", url: "https://go.dev/doc/faq#nil" }
    ]
  },

  "pointers-with-structs": {
    slug: "pointers-with-structs",
    title: "Pointers with Structs",
    summary: "Using pointers with structs enables mutation, avoids copying, and is essential for many Go patterns.",
    description: `When you pass a struct to a function or method by value, Go creates a complete copy. For small structs this is efficient and safe, but for large structs it wastes memory and CPU. Pointers solve this by passing a memory address instead of copying the entire struct. A pointer to a struct also allows the receiving function to modify the original struct's fields.

In Go, the & operator creates a pointer to a value, and the * operator dereferences a pointer to access the value. Go automatically dereferences pointers when accessing fields, so myPtr.Field works the same as (*myPtr).Field. This syntactic sugar makes working with struct pointers ergonomic.

For backend engineers, pointers with structs are pervasive. Database scanning requires pointers to store potentially NULL values. API frameworks often unmarshal JSON into pointer fields. Understanding when to use pointers vs values directly impacts memory efficiency, correctness, and code clarity in production systems.`,
    keyPoints: [
      "Use & to create a pointer: p := &MyStruct{field: value}",
      "Pointer fields allow nil — check before dereferencing",
      "Go auto-dereferences: p.Field works like (*p).Field",
      "Passing pointers avoids copying large structs",
      "Pointer fields in JSON can be nil, enabling optional field detection",
      "database/sql requires pointers for nullable columns",
      "new(Type) returns *Type initialized to zero values"
    ],
    codeExamples: [
      {
        title: "Pointer Fields for Nullable API Values",
        description: "Using pointer fields to distinguish between zero value and absent in API payloads",
        bad: [
          'type UpdateRequest struct {',
          '    Name  string `json:"name"`',
          '    Email string `json:"email"`',
          '    Age   int    `json:"age"`',
          '}',
          '',
          '// Cannot distinguish "set to empty" from "not provided":',
          '// {"name": ""} vs {} both result in zero-value strings',
          '// There is no way to know which fields the client intended to update',
        ].join('\n'),
        good: [
          'type UpdateRequest struct {',
          '    Name  *string `json:"name"`',
          '    Email *string `json:"email"`',
          '    Age   *int    `json:"age"`',
          '}',
          '',
          '// Now we can check which fields were provided:',
          'func applyUpdate(user *User, req UpdateRequest) {',
          '    if req.Name != nil {',
          '        user.Name = *req.Name',
          '    }',
          '    if req.Email != nil {',
          '        user.Email = *req.Email',
          '    }',
          '    if req.Age != nil {',
          '        user.Age = *req.Age',
          '    }',
          '}',
          '',
          '// JSON: {"name": "Alice"} only updates Name, others remain unchanged',
        ].join('\n'),
        explanation: "Pointer fields in JSON structs solve a fundamental API problem: distinguishing between \"not provided\" and \"set to zero value\". When a field is nil, it wasn't in the JSON payload. When it points to a value (even empty string), the client explicitly sent it. This pattern is critical for PATCH-style API endpoints."
      }
    ],
    bestPractices: [
      "Use pointers for nullable fields in API request/response types",
      "Pass large structs by pointer to avoid expensive copies",
      "Always check for nil before dereferencing pointers",
      "Use pointer fields in database models for nullable columns",
      "Initialize struct pointers with &Type{} for clarity"
    ],
    commonMistakes: [
      "Dereferencing a nil pointer without checking, causing a runtime panic",
      "Taking the address of a loop variable and expecting each iteration to be independent",
      "Overusing pointers for small, immutable value types where copies are fine",
      "Forgetting that pointer fields default to nil, not zero values"
    ],
    relatedTopics: [
      "structs",
      "pointer-receivers",
      "value-receivers"
    ],
    externalResources: [
      { title: "Effective Go: Pointers", url: "https://go.dev/doc/effective_go#pointers" },
      { title: "Go Blog: JSON and Go", url: "https://go.dev/blog/json" },
      { title: "Go Spec: Address operators", url: "https://go.dev/ref/spec#Address_operators" }
    ]
  },

  "interfaces-basics": {
    slug: "interfaces-basics",
    title: "Interfaces (Basics)",
    summary: "Interfaces define a set of methods that a type must implement to satisfy a behavioral contract.",
    description: `An interface in Go defines a set of method signatures that a type must implement. Any type that has methods matching all the signatures in the interface automatically satisfies it — no explicit declaration is needed. This is called implicit interface satisfaction and is one of Go's most distinctive features.

Interfaces enable polymorphism, dependency injection, and testability without class hierarchies. A function can accept an interface parameter and work with any type that satisfies it, whether it's a real implementation, a mock, or a stub. This decouples your code from specific implementations.

For backend engineers, interfaces are the primary abstraction mechanism. They allow you to swap implementations without changing calling code — switch from a real database to a test double, from HTTP to gRPC, or from one storage backend to another. The io.Reader, io.Writer, and error interfaces are the most commonly used interfaces in Go.`,
    keyPoints: [
      "Interfaces are satisfied implicitly — no 'implements' keyword needed",
      "A type satisfies an interface if it has all required methods",
      "Interfaces enable polymorphism and dependency injection",
      "Small interfaces (1-3 methods) are preferred in Go",
      "The empty interface interface{} can hold any type (use sparingly)",
      "Interfaces can be satisfied by pointer receivers, value receivers, or both",
      "Return interface types from functions; accept interfaces as parameters"
    ],
    codeExamples: [
      {
        title: "Implicit Interface Satisfaction",
        description: "A Logger interface with multiple implementations, no inheritance needed",
        bad: [
          '// Tightly coupled — function depends on concrete implementation:',
          'type FileLogger struct {',
          '    filePath string',
          '}',
          '',
          'func logToFile(msg string) {',
          '    logger := &FileLogger{filePath: "/var/log/app.log"}',
          '    logger.Write(msg)',
          '}',
          '',
          '// Cannot swap in a different logger or test double',
        ].join('\n'),
        good: [
          '// Interface defines the contract:',
          'type Logger interface {',
          '    Log(msg string)',
          '    Close() error',
          '}',
          '',
          '// Multiple implementations:',
          'type FileLogger struct { path string }',
          'func (f *FileLogger) Log(msg string)  { /* write to file */ }',
          'func (f *FileLogger) Close() error    { /* close file */ return nil }',
          '',
          'type ConsoleLogger struct{}',
          'func (c *ConsoleLogger) Log(msg string) { fmt.Println(msg) }',
          'func (c *ConsoleLogger) Close() error   { return nil }',
          '',
          '// Function depends on interface, not implementation:',
          'func processOrder(log Logger, order Order) error {',
          '    log.Log(fmt.Sprintf("Processing order %s", order.ID))',
          '    // ... business logic ...',
          '    return nil',
          '}',
          '',
          '// Test with a mock:',
          'type MockLogger struct { messages []string }',
          'func (m *MockLogger) Log(msg string) { m.messages = append(m.messages, msg) }',
          'func (m *MockLogger) Close() error   { return nil }',
        ].join('\n'),
        explanation: "The processOrder function depends on the Logger interface, not a specific implementation. This makes it easy to use with FileLogger, ConsoleLogger, or a MockLogger in tests. Implicit satisfaction means FileLogger and ConsoleLogger don't need to declare they implement Logger — they just need the right methods."
      }
    ],
    bestPractices: [
      "Define interfaces where they are consumed, not where they are implemented",
      "Keep interfaces small — 1 to 3 methods is the Go convention",
      "Accept interfaces, return concrete types (unless you need to hide the type)",
      "Use interfaces for testability — they enable easy mocking",
      "Avoid interface{} unless absolutely necessary — use generics when possible"
    ],
    commonMistakes: [
      "Defining interfaces at the implementation site instead of the consumer site",
      "Creating large interfaces with many methods that are hard to satisfy",
      "Using interface{} everywhere, losing type safety",
      "Not realizing that pointer and value receivers create different method sets"
    ],
    relatedTopics: [
      "interfaces",
      "empty-interfaces",
      "type-assertions"
    ],
    externalResources: [
      { title: "Effective Go: Interfaces", url: "https://go.dev/doc/effective_go#interfaces" },
      { title: "Go Blog: Interfaces and Composition", url: "https://go.dev/blog/laws-of-reflection" },
      { title: "Go Doc: io package", url: "https://pkg.go.dev/io" }
    ]
  },

  "interfaces": {
    slug: "interfaces",
    title: "Interfaces",
    summary: "Go interfaces provide implicit polymorphism through method sets, enabling flexible and testable code.",
    description: `Go interfaces define behavioral contracts through method sets. Unlike languages with explicit implementation declarations, a Go type satisfies an interface simply by implementing its methods. This implicit satisfaction decouples types from the interfaces they implement, allowing you to create interfaces after the fact based on what your code needs.

The power of this design is that interfaces can be defined at the point of consumption. A function can define the minimal interface it needs, and any type with those methods will work. This leads to small, focused interfaces — the Go standard library's io.Reader has just one method, yet it is one of the most widely used interfaces in the language.

For backend engineers, interfaces are the key to building systems that are both flexible and testable. They allow you to swap implementations, create test doubles, and build clean architecture boundaries between layers of your application.`,
    keyPoints: [
      "Implicit satisfaction: no 'implements' keyword, just implement the methods",
      "Interfaces are satisfied by both value and pointer receivers (but they differ)",
      "A value of an interface type holds a pair: (type, value) — the dynamic type",
      "nil interfaces and interfaces holding nil values are different (common gotcha)",
      "Interfaces enable the Strategy, Adapter, and Repository patterns naturally",
      "Go interfaces prefer small, focused method sets over large ones",
      "Type switches and type assertions access the concrete type inside an interface"
    ],
    codeExamples: [
      {
        title: "The Nil Interface Gotcha",
        description: "Understanding why a nil concrete value in a non-nil interface causes bugs",
        bad: [
          'type Storage interface {',
          '    Get(key string) (string, error)',
          '}',
          '',
          'type DBStorage struct {',
          '    db *sql.DB',
          '}',
          '',
          'func NewDBStorage(db *sql.DB) Storage {',
          '    if db == nil {',
          '        return nil // BUG: returns nil Storage interface',
          '    }',
          '    return &DBStorage{db: db}',
          '}',
          '',
          '// Caller checks for nil interface:',
          'store := NewDBStorage(nil)',
          'if store == nil {',
          '    // This branch is NEVER reached!',
          '    fmt.Println("No storage configured")',
          '}',
          '// store.Get("key") will panic with nil pointer dereference',
        ].join('\n'),
        good: [
          'type Storage interface {',
          '    Get(key string) (string, error)',
          '}',
          '',
          'type DBStorage struct {',
          '    db *sql.DB',
          '}',
          '',
          '// Return error instead of nil to make failure explicit:',
          'func NewDBStorage(db *sql.DB) (Storage, error) {',
          '    if db == nil {',
          '        return nil, errors.New("database connection is nil")',
          '    }',
          '    return &DBStorage{db: db}, nil',
          '}',
          '',
          'store, err := NewDBStorage(nil)',
          'if err != nil {',
          '    log.Fatal("Failed to create storage:", err)',
          '}',
        ].join('\n'),
        explanation: "A nil interface value is fundamentally different from a non-nil interface holding a nil pointer. When NewDBStorage returns nil as a Storage interface, it becomes a non-nil interface containing a nil *DBStorage. The safe pattern is to always return (Interface, error) pairs so the caller can check the error."
      }
    ],
    bestPractices: [
      "Define interfaces where they are consumed, not where they are implemented",
      "Keep interfaces small — prefer 1-3 methods per interface",
      "Return (T, error) instead of nil interfaces for constructor functions",
      "Use interfaces for dependency injection in service constructors",
      "Document interface contracts with comments on the interface definition"
    ],
    commonMistakes: [
      "Confusing a nil interface with a non-nil interface holding a nil concrete value",
      "Defining large interfaces that are hard to implement and test",
      "Mixing value and pointer receivers, which affects interface satisfaction",
      "Not checking error returns when type asserting interface values"
    ],
    relatedTopics: [
      "interfaces-basics",
      "empty-interfaces",
      "type-assertions",
      "embedding-interfaces"
    ],
    externalResources: [
      { title: "Go Blog: Interfaces", url: "https://go.dev/doc/effective_go#interfaces" },
      { title: "Go Blog: Laws of Reflection", url: "https://go.dev/blog/laws-of-reflection" },
      { title: "Go Wiki: Interface Value", url: "https://go.dev/ref/spec#Interface_values" }
    ]
  },

  "empty-interfaces": {
    slug: "empty-interfaces",
    title: "Empty Interfaces",
    summary: "The empty interface accepts any type, acting as Go's equivalent of interface{} or any.",
    description: `The empty interface — interface{} or its alias any — has no methods, which means every type in Go satisfies it. This makes it a universal container that can hold values of any type. It is Go's equivalent of Object in Java or any in TypeScript, but without built-in type safety.

The empty interface is useful when you genuinely don't know the type at compile time — such as handling dynamically typed data, implementing generic containers before Go 1.18, or working with reflection. However, overusing the empty interface defeats the purpose of Go's type system and makes code harder to reason about.

For backend engineers, the empty interface appears in JSON unmarshaling (map[string]any), database scanning (Scan into interface{}), and logging frameworks. When you encounter it, the first instinct should be to narrow the type as quickly as possible using type assertions or type switches.`,
    keyPoints: [
      "interface{} (or any) is satisfied by every type in Go",
      "Use it only when the type truly cannot be known at compile time",
      "Type assertions or type switches are needed to recover the concrete type",
      "map[string]any is the standard type for dynamic JSON objects",
      "Generics (Go 1.18+) often replace the need for empty interfaces",
      "Type safety is lost — use the empty interface sparingly and narrow quickly",
      "The any keyword was introduced in Go 1.18 as an alias for interface{}"
    ],
    codeExamples: [
      {
        title: "Type Switch with Empty Interface",
        description: "Safely handling values of unknown type using a type switch",
        bad: [
          '// Using empty interface without narrowing — fragile:',
          'func describe(v any) string {',
          '    // Cannot call type-specific methods without assertion:',
          '    return fmt.Sprintf("%v", v)',
          '}',
          '',
          '// Runtime type checks sprinkled everywhere:',
          'func process(v any) {',
          '    if str, ok := v.(string); ok {',
          '        fmt.Println("String:", strings.ToUpper(str))',
          '    } else if num, ok := v.(int); ok {',
          '        fmt.Println("Number:", num * 2)',
          '    }',
          '    // Quickly becomes unreadable with many types',
          '}',
        ].join('\n'),
        good: [
          '// Type switch — clean and idiomatic:',
          'func describe(v any) string {',
          '    switch val := v.(type) {',
          '    case string:',
          '        return fmt.Sprintf("String of length %d", len(val))',
          '    case int:',
          '        return fmt.Sprintf("Integer: %d", val)',
          '    case bool:',
          '        return fmt.Sprintf("Boolean: %t", val)',
          '    case nil:',
          '        return "nil"',
          '    default:',
          '        return fmt.Sprintf("Unknown type: %T", val)',
          '    }',
          '}',
          '',
          '// Better yet, use generics for type-safe containers:',
          'type Result[T any] struct {',
          '    Value T',
          '    Err   error',
          '}',
        ].join('\n'),
        explanation: "A type switch is cleaner and more extensible than chained type assertions. The v.(type) syntax extracts the concrete type and binds it to val with the correct type in each case. Consider using generics instead of empty interfaces when you need type-safe containers or functions."
      }
    ],
    bestPractices: [
      "Use the empty interface only when the type is truly unknown at compile time",
      "Narrow the type immediately with type assertions or type switches",
      "Consider generics (Go 1.18+) as a type-safe alternative to empty interfaces",
      "Use map[string]any for dynamic JSON objects, then validate the structure",
      "Document why the empty interface is necessary in comments"
    ],
    commonMistakes: [
      "Using interface{} everywhere instead of specific types",
      "Forgetting to check the ok boolean in comma-ok type assertions",
      "Building entire APIs around interface{} instead of using generics",
      "Assuming the concrete type without runtime checks, causing panics"
    ],
    relatedTopics: [
      "interfaces",
      "type-assertions",
      "type-switch"
    ],
    externalResources: [
      { title: "Go Blog: Interfaces and Composition", url: "https://go.dev/blog/laws-of-reflection" },
      { title: "Go Spec: Interface types", url: "https://go.dev/ref/spec#Interface_types" },
      { title: "Go 1.18 Generics Announcement", url: "https://go.dev/blog/intro-generics" }
    ]
  },

  "embedding-interfaces": {
    slug: "embedding-interfaces",
    title: "Embedding Interfaces",
    summary: "Interface embedding composes smaller interfaces into larger ones by combining their method sets.",
    description: `Just like struct embedding, interfaces in Go can be embedded within other interfaces. When you embed interface A inside interface B, interface B inherits all of A's methods. The resulting interface requires all methods from both A and B to be satisfied. This is Go's mechanism for building large interfaces from small, focused ones.

The standard library uses this pattern extensively. io.ReadWriter embeds io.Reader and io.Writer. io.ReadWriteCloser embeds all three. This lets you define small, composable interfaces and combine them as needed without repeating method signatures.

For backend engineers, interface embedding is the key to designing clean, layered abstractions. Instead of one massive interface with a dozen methods, define small interfaces for specific capabilities and compose them. This follows the Interface Segregation Principle and makes your code more flexible and testable.`,
    keyPoints: [
      "Embedding an interface adds all its methods to the embedding interface",
      "The embedding interface requires all methods from embedded interfaces",
      "Standard library uses this: io.ReadWriter = io.Reader + io.Writer",
      "You can embed multiple interfaces: interface { A; B; C }",
      "Embedded interfaces cannot share method names with conflicting signatures",
      "This composes behavior without implementation inheritance",
      "The embedded interface's type name becomes accessible as a method group"
    ],
    codeExamples: [
      {
        title: "Composing Interfaces via Embedding",
        description: "Building a Repository interface from smaller, focused interfaces",
        bad: [
          '// One massive interface — violates Interface Segregation:',
          'type Repository interface {',
          '    GetByID(id string) (*User, error)',
          '    GetByEmail(email string) (*User, error)',
          '    Create(user *User) error',
          '    Update(user *User) error',
          '    Delete(id string) error',
          '    List(offset, limit int) ([]*User, error)',
          '    Count() (int, error)',
          '    Validate(user *User) error',
          '}',
          '',
          '// Test doubles must implement ALL methods, even if unused',
        ].join('\n'),
        good: [
          '// Small, focused interfaces:',
          'type Reader interface {',
          '    GetByID(id string) (*User, error)',
          '    GetByEmail(email string) (*User, error)',
          '    List(offset, limit int) ([]*User, error)',
          '}',
          '',
          'type Writer interface {',
          '    Create(user *User) error',
          '    Update(user *User) error',
          '    Delete(id string) error',
          '}',
          '',
          '// Compose via embedding:',
          'type Repository interface {',
          '    Reader',
          '    Writer',
          '    Count() (int, error)',
          '}',
          '',
          '// Functions accept only what they need:',
          'func findUser(r Reader, email string) (*User, error) {',
          '    return r.GetByEmail(email)',
          '}',
          '',
          '// Test double only implements Reader — minimal effort:',
          'type FakeReader struct { users []*User }',
          'func (f *FakeReader) GetByID(id string) (*User, error) { /* ... */ }',
          'func (f *FakeReader) GetByEmail(email string) (*User, error) { /* ... */ }',
          'func (f *FakeReader) List(o, l int) ([]*User, error) { /* ... */ }',
        ].join('\n'),
        explanation: "Breaking the large Repository into Reader and Writer lets functions depend on only the capabilities they need. findUser only needs read access, so it accepts Reader. This makes test doubles simpler. Composing them back into Repository gives the full interface when needed."
      }
    ],
    bestPractices: [
      "Define small interfaces (1-3 methods) and compose them via embedding",
      "Accept the narrowest interface your function needs",
      "Follow the Interface Segregation Principle",
      "Use embedding to build public interfaces from internal building blocks",
      "Keep embedded interface names descriptive and focused"
    ],
    commonMistakes: [
      "Creating a single massive interface instead of composing small ones",
      "Embedding interfaces with conflicting method signatures (compile error)",
      "Not realizing embedded interfaces are public and accessible on the composite",
      "Over-engineering interface hierarchies that add indirection without value"
    ],
    relatedTopics: [
      "interfaces",
      "embedding-structs",
      "interfaces-basics"
    ],
    externalResources: [
      { title: "Effective Go: Interface embedding", url: "https://go.dev/doc/effective_go#embedding" },
      { title: "Go Blog: Go 1.18 and generics", url: "https://go.dev/blog/intro-generics" },
      { title: "Go Doc: io.ReadWriter", url: "https://pkg.go.dev/io#ReadWriter" }
    ]
  },

  "type-assertions": {
    slug: "type-assertions",
    title: "Type Assertions",
    summary: "Type assertions extract the concrete type from an interface value, with a safety check via comma-ok.",
    description: `A type assertion takes an interface value and extracts the concrete type it holds. The syntax x.(T) asserts that x is of type T. If x is not T, the operation panics — unless you use the two-value form x.(T) which returns the value and a boolean indicating success.

Type assertions are fundamental when working with empty interfaces or when you need to access type-specific methods that aren't part of the interface. They are the runtime counterpart to Go's static type system, allowing you to recover concrete types when the interface has erased them.

For backend engineers, type assertions appear frequently in JSON processing, middleware chains, and error handling where you need to inspect the concrete type behind an interface. Using the comma-ok pattern prevents panics and enables graceful handling of unexpected types.`,
    keyPoints: [
      "Syntax: x.(T) where x is an interface value and T is the asserted type",
      "Panics if x is not of type T — use comma-ok for safety",
      "Comma-ok form: v, ok := x.(T) — ok is false if assertion fails",
      "Can assert to any type: concrete struct, pointer, or another interface",
      "Type assertions on nil interfaces always fail and panic without comma-ok",
      "Useful for recovering specific error types from the error interface",
      "Type assertions have zero runtime cost when the compiler can optimize them"
    ],
    codeExamples: [
      {
        title: "Safe Type Assertions with Comma-Ok",
        description: "Extracting a custom error type from the error interface safely",
        bad: [
          'type ValidationError struct {',
          '    Field   string',
          '    Message string',
          '}',
          '',
          'func (e *ValidationError) Error() string {',
          '    return e.Field + ": " + e.Message',
          '}',
          '',
          '// Unsafe — panics if err is not *ValidationError:',
          'func handleError(err error) string {',
          '    ve := err.(*ValidationError)',
          '    return "Validation failed on " + ve.Field',
          '}',
        ].join('\n'),
        good: [
          'type ValidationError struct {',
          '    Field   string',
          '    Message string',
          '}',
          '',
          'func (e *ValidationError) Error() string {',
          '    return e.Field + ": " + e.Message',
          '}',
          '',
          '// Safe — comma-ok pattern prevents panics:',
          'func handleError(err error) string {',
          '    ve, ok := err.(*ValidationError)',
          '    if !ok {',
          '        return "An unexpected error occurred"',
          '    }',
          '    return "Validation failed on " + ve.Field',
          '}',
          '',
          '// Alternative: use errors.As for error chains (Go 1.13+):',
          'func handleErrorModern(err error) string {',
          '    var ve *ValidationError',
          '    if errors.As(err, &ve) {',
          '        return "Validation failed on " + ve.Field',
          '    }',
          '    return "An unexpected error occurred"',
          '}',
        ].join('\n'),
        explanation: "The comma-ok pattern returns false instead of panicking when the assertion fails. The errors.As function from Go 1.13+ is even better for errors — it unwraps error chains and checks each error in the chain."
      }
    ],
    bestPractices: [
      "Always use the comma-ok form unless you are certain of the type",
      "Use errors.As (Go 1.13+) for type assertions on error values",
      "Prefer type switches over multiple type assertions for readability",
      "Document the expected concrete types when returning interface values",
      "Keep type assertions in a narrow scope"
    ],
    commonMistakes: [
      "Forgetting the comma-ok pattern, causing runtime panics",
      "Using type assertions instead of type switches when checking multiple types",
      "Not using errors.As for error type checks, missing wrapped errors",
      "Asserting interface-to-interface without understanding interface satisfaction"
    ],
    relatedTopics: [
      "type-switch",
      "error-interface",
      "empty-interfaces"
    ],
    externalResources: [
      { title: "Go Spec: Type assertions", url: "https://go.dev/ref/spec#Type_assertions" },
      { title: "Go Blog: Errors are values", url: "https://go.dev/blog/errors-are-values" },
      { title: "Go Doc: errors.As", url: "https://pkg.go.dev/errors#As" }
    ]
  },

  "type-switch": {
    slug: "type-switch",
    title: "Type Switch",
    summary: "Type switches dispatch on the concrete type held by an interface using a switch-like syntax.",
    description: `A type switch is a special form of switch statement that compares the concrete type of an interface value. The syntax switch v := x.(type) extracts the concrete type and binds it to v with the appropriate type in each case branch. It's cleaner and more extensible than chained type assertions.

Type switches are the idiomatic way to handle multiple possible types in an interface. They are commonly used in JSON unmarshaling, error handling, middleware dispatch, and any place where an interface can hold different concrete types. Each case branch automatically narrows v to the asserted type.

For backend engineers, type switches are essential in API middleware, custom error handling, and building type-safe dispatchers. They provide a clean alternative to if-else chains of type assertions.`,
    keyPoints: [
      "Syntax: switch v := x.(type) { case T: ... }",
      "v is automatically narrowed to type T in each case branch",
      "The default case handles unrecognized types",
      "Cases must be unique types — no duplicate type cases allowed",
      "The type variable v is only available inside the switch scope",
      "Commonly used with error interfaces and JSON unmarshaling results",
      "Case order does not matter — Go dispatches by type, not position"
    ],
    codeExamples: [
      {
        title: "Type Switch for Error Handling",
        description: "Dispatching on different error types returned from a service call",
        bad: [
          '// Chained type assertions — hard to extend:',
          'func handleErr(err error) int {',
          '    ve, ok1 := err.(*ValidationError)',
          '    if ok1 {',
          '        return 400',
          '    }',
          '    nf, ok2 := err.(*NotFoundError)',
          '    if ok2 {',
          '        return 404',
          '    }',
          '    return 500',
          '}',
        ].join('\n'),
        good: [
          '// Type switch — clean and extensible:',
          'func handleErr(err error) int {',
          '    switch err.(type) {',
          '    case *ValidationError:',
          '        return 400',
          '    case *NotFoundError:',
          '        return 404',
          '    case *RateLimitError:',
          '        return 429',
          '    case *UnauthorizedError:',
          '        return 401',
          '    default:',
          '        return 500',
          '    }',
          '}',
        ].join('\n'),
        explanation: "The type switch replaces chained type assertions with a clean, extensible dispatch pattern. Adding a new error type just requires adding a new case — no restructuring of existing logic."
      }
    ],
    bestPractices: [
      "Use type switches over chained type assertions for readability",
      "Always include a default case for unexpected types",
      "Keep type switch cases focused — handle one type per case",
      "Use type switches at interface boundaries to narrow concrete types quickly",
      "Combine with errors.As for handling wrapped error chains"
    ],
    commonMistakes: [
      "Forgetting to include a default case for unexpected types",
      "Using type switch when a simple interface method call would suffice",
      "Declaring the same type in multiple cases (compile error)",
      "Not realizing the type variable scope is limited to the switch block"
    ],
    relatedTopics: [
      "type-assertions",
      "error-interface",
      "empty-interfaces"
    ],
    externalResources: [
      { title: "Go Spec: Switch statements", url: "https://go.dev/ref/spec#Switch_statements" },
      { title: "Effective Go: Type switches", url: "https://go.dev/doc/effective_go#type_switches" },
      { title: "Go Blog: Errors are values", url: "https://go.dev/blog/errors-are-values" }
    ]
  },

  "error-handling-basics": {
    slug: "error-handling-basics",
    title: "Error Handling Basics",
    summary: "Go uses explicit error return values instead of exceptions, forcing you to handle errors at every call site.",
    description: `Go's error handling model is based on multiple return values. Functions that can fail return an error as their last return value, and callers are expected to check and handle it. There are no exceptions, no try/catch, and no hidden control flow. Errors are values — they can be inspected, wrapped, compared, and passed around.

This explicit approach means you always know where errors can occur in your code. The if err != nil pattern is ubiquitous in Go. While some find it verbose, it forces developers to consider error cases upfront rather than catching them at distant exception handlers.

For backend engineers, error handling is critical for building reliable services. Proper error handling ensures your API returns meaningful status codes, your workers don't silently fail, and your logs contain actionable diagnostic information.`,
    keyPoints: [
      "Functions return (result, error) — the error is the last return value",
      "Check errors immediately after the function call: if err != nil",
      "The error interface has a single method: Error() string",
      "errors.New and fmt.Errorf create new error values",
      "Return early on error to avoid deep nesting",
      "Errors can be wrapped with %w in fmt.Errorf for error chains",
      "The errors.Is and errors.As functions (Go 1.13+) inspect wrapped errors"
    ],
    codeExamples: [
      {
        title: "Idiomatic Error Handling",
        description: "Proper error checking and early return patterns",
        bad: [
          'func getUser(id string) (*User, error) {',
          '    user, err := db.FindByID(id)',
          '    if err == nil {',
          '        if user.Email != "" {',
          '            return user, nil',
          '        } else {',
          '            return nil, errors.New("user has no email")',
          '        }',
          '    } else {',
          '        return nil, err',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'func getUser(id string) (*User, error) {',
          '    user, err := db.FindByID(id)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("find user %s: %w", id, err)',
          '    }',
          '',
          '    if user.Email == "" {',
          '        return nil, fmt.Errorf("user %s has no email", id)',
          '    }',
          '',
          '    return user, nil',
          '}',
        ].join('\n'),
        explanation: "The good example uses early returns to reduce nesting and keep the happy path clear. Each error is wrapped with fmt.Errorf and %w to preserve the original error for inspection. The error message provides context about what operation failed."
      }
    ],
    bestPractices: [
      "Check errors immediately after the function call",
      "Use early returns to keep the happy path at the top level",
      "Wrap errors with context using fmt.Errorf and %w",
      "Return meaningful error messages that describe what failed and why",
      "Use errors.Is and errors.As to inspect wrapped errors"
    ],
    commonMistakes: [
      "Ignoring errors with _ = err or not checking them at all",
      "Overly generic error messages that don't help debugging",
      "Deeply nested if-else error handling instead of early returns",
      "Losing error context by returning the raw error without wrapping"
    ],
    relatedTopics: [
      "error-interface",
      "errorsnew",
      "fmterrorf"
    ],
    externalResources: [
      { title: "Go Blog: Error handling", url: "https://go.dev/blog/error-handling-and-go" },
      { title: "Effective Go: Error handling", url: "https://go.dev/doc/effective_go#errors" },
      { title: "Go Blog: Errors are values", url: "https://go.dev/blog/errors-are-values" }
    ]
  },

  "error-interface": {
    slug: "error-interface",
    title: "Error Interface",
    summary: "The error interface requires a single Error() method, making any type a potential error value.",
    description: `The error interface is one of the simplest and most important interfaces in Go. It requires just one method — Error() string — which returns a human-readable description of the problem. Any type that implements this method satisfies the error interface and can be returned from functions that return error.

This minimal interface makes errors composable. You can create custom error types with additional fields like error codes, HTTP status codes, or retry hints. Standard library functions like os.PathError and sql.TxError add contextual information beyond the error message.

For backend engineers, custom error types enable sophisticated error handling. You can create domain-specific errors like ValidationError, NotFoundError, or RateLimitError that carry structured data. The caller can use type assertions or errors.As to extract this data.`,
    keyPoints: [
      "The error interface: type error interface { Error() string }",
      "Any type with Error() string satisfies the error interface",
      "Custom error types can carry additional fields for structured error data",
      "errors.New creates a simple error from a string message",
      "fmt.Errorf creates formatted errors with optional wrapping via %w",
      "Error values should be checked with errors.Is for sentinel values",
      "Custom types can implement multiple interfaces alongside error"
    ],
    codeExamples: [
      {
        title: "Custom Error Types with Structured Data",
        description: "Creating a ValidationError that carries field-level details",
        bad: [
          '// Using string matching for error handling — fragile:',
          'func handleRequest(err error) {',
          '    if err.Error() == "validation failed" {',
          '        // What if the message changes?',
          '        // What about field-specific details?',
          '    }',
          '}',
        ].join('\n'),
        good: [
          'type ValidationError struct {',
          '    Field   string',
          '    Message string',
          '    Code    int',
          '}',
          '',
          'func (e *ValidationError) Error() string {',
          '    return fmt.Sprintf("validation failed: %s - %s (code: %d)",',
          '        e.Field, e.Message, e.Code)',
          '}',
          '',
          '// Sentinel error for identity comparison:',
          'var ErrUnauthorized = errors.New("unauthorized access")',
          '',
          '// Handler that extracts structured error data:',
          'func handleRequest(err error) (int, string) {',
          '    var ve *ValidationError',
          '    if errors.As(err, &ve) {',
          '        return 400, fmt.Sprintf("Field %s: %s", ve.Field, ve.Message)',
          '    }',
          '    if errors.Is(err, ErrUnauthorized) {',
          '        return 401, "Authentication required"',
          '    }',
          '    return 500, "Internal server error"',
          '}',
        ].join('\n'),
        explanation: "Custom error types carry structured data that enables precise error handling. errors.As extracts the ValidationError and its fields. errors.Is checks for sentinel errors by identity. This is far more robust than string matching."
      }
    ],
    bestPractices: [
      "Create custom error types for domain-specific error data",
      "Use pointer receivers on error types for interface satisfaction",
      "Define sentinel errors as package-level var declarations",
      "Use errors.As to extract typed errors and errors.Is for sentinel values",
      "Include enough context in Error() messages for debugging"
    ],
    commonMistakes: [
      "Comparing errors by string content instead of using errors.Is",
      "Using value receivers on error types, which breaks errors.As for non-pointer types",
      "Creating error types without implementing the Error() method",
      "Returning error values without enough context to diagnose the problem"
    ],
    relatedTopics: [
      "error-handling-basics",
      "sentinel-errors",
      "wrappingunwrapping-errors"
    ],
    externalResources: [
      { title: "Go Spec: Error interface", url: "https://go.dev/ref/spec#Interface_types" },
      { title: "Go Blog: Error handling and Go", url: "https://go.dev/blog/error-handling-and-go" },
      { title: "Go Doc: errors package", url: "https://pkg.go.dev/errors" }
    ]
  },

  "errorsnew": {
    slug: "errorsnew",
    title: "errors.New",
    summary: "errors.New creates a simple error value from a string message with a stackless, lightweight error.",
    description: `errors.New is the simplest way to create an error value in Go. It takes a string and returns an error value that implements the error interface. The returned error captures the call site's file and line information at creation time, which helps with debugging.

errors.New is best used for creating sentinel errors (package-level variables that represent specific failure conditions) and for simple error returns that don't need formatted arguments. For errors with dynamic data, fmt.Errorf is more appropriate.

In backend services, sentinel errors defined with errors.New serve as stable identifiers for specific failure modes. They can be compared with errors.Is throughout the codebase, creating a consistent vocabulary of error conditions.`,
    keyPoints: [
      "errors.New(msg string) returns an error value",
      "Best for sentinel errors defined as package-level var declarations",
      "The error string should be lowercase, without punctuation or wrapping",
      "Captures file and line information at the call site for debugging",
      "Not for formatted messages — use fmt.Errorf for dynamic content",
      "Sentinel errors should start with 'Err' by convention",
      "errors.New errors cannot be wrapped at creation — wrap at the return site"
    ],
    codeExamples: [
      {
        title: "Sentinel Errors with errors.New",
        description: "Defining stable error sentinels that callers can check with errors.Is",
        bad: [
          '// Inconsistent error creation throughout the codebase:',
          'func validateAge(age int) error {',
          '    if age < 0 {',
          '        return errors.New("Invalid age")',
          '    }',
          '    return nil',
          '}',
          '',
          'func validateEmail(email string) error {',
          '    if email == "" {',
          '        return fmt.Errorf("Email is empty!")',
          '    }',
          '    return nil',
          '}',
          '',
          '// Callers cannot reliably compare these errors',
        ].join('\n'),
        good: [
          '// Sentinel errors at package level:',
          'var (',
          '    ErrInvalidAge   = errors.New("invalid age")',
          '    ErrInvalidEmail = errors.New("invalid email")',
          '    ErrNotFound     = errors.New("resource not found")',
          ')',
          '',
          'func validateAge(age int) error {',
          '    if age < 0 {',
          '        return fmt.Errorf("age %d: %w", age, ErrInvalidAge)',
          '    }',
          '    return nil',
          '}',
          '',
          '// Callers can check:',
          'if errors.Is(err, ErrInvalidAge) {',
          '    // Handle invalid age specifically',
          '}',
        ].join('\n'),
        explanation: "Sentinel errors defined with errors.New serve as stable identifiers. Callers use errors.Is to check them, which works even through error wrapping. The error string is lowercase and without punctuation by Go convention."
      }
    ],
    bestPractices: [
      "Define sentinel errors as package-level var declarations",
      "Name sentinel errors with the Err prefix: ErrNotFound, ErrUnauthorized",
      "Keep error strings lowercase without trailing punctuation",
      "Wrap sentinel errors with context when returning them from functions",
      "Don't create errors.New inside hot loops — define them at package level"
    ],
    commonMistakes: [
      "Creating errors with dynamic content using errors.New instead of fmt.Errorf",
      "Defining sentinel errors inside functions instead of at package level",
      "Using inconsistent error message styles across the codebase",
      "Not wrapping sentinel errors with additional context at the return site"
    ],
    relatedTopics: [
      "fmterrorf",
      "sentinel-errors",
      "error-interface"
    ],
    externalResources: [
      { title: "Go Doc: errors.New", url: "https://pkg.go.dev/errors#New" },
      { title: "Effective Go: Error handling", url: "https://go.dev/doc/effective_go#errors" },
      { title: "Go Blog: Error handling and Go", url: "https://go.dev/blog/error-handling-and-go" }
    ]
  },

  "fmterrorf": {
    slug: "fmterrorf",
    title: "fmt.Errorf",
    summary: "fmt.Errorf creates formatted error messages with optional error wrapping via the %w verb.",
    description: `fmt.Errorf combines string formatting with error creation. It works like fmt.Sprintf but returns an error value. The %w verb (added in Go 1.13) wraps an existing error, preserving the original error in the chain so it can be inspected with errors.Is and errors.As later.

Error wrapping is critical for building informative error chains. When a lower-level function returns an error, wrapping it with context at each layer creates a breadcrumb trail of what happened. For example, a database error wrapped as "fetch user 123: connection refused" tells you exactly what operation failed and why.

For backend engineers, fmt.Errorf with %w is the primary tool for creating informative, inspectable error messages. It lets you add context to errors without losing the original error information, making debugging in production significantly easier.`,
    keyPoints: [
      "fmt.Errorf(format, args...) returns an error value",
      "%w wraps an existing error — use it to preserve the error chain",
      "Without %w, %s or %v format the error but lose chain information",
      "errors.Is and errors.As unwrap the chain to find wrapped errors",
      "Multiple wrapping is supported: inner errors can be wrapped at multiple levels",
      "The error message should read left to right, describing what failed and why",
      "Use %w only for the original error — additional context uses %v or %s"
    ],
    codeExamples: [
      {
        title: "Error Wrapping with fmt.Errorf and %w",
        description: "Building contextual error chains that preserve original errors",
        bad: [
          'func getUser(id string) (*User, error) {',
          '    user, err := db.FindByID(id)',
          '    if err != nil {',
          '        // Loses the original error chain:',
          '        return nil, errors.New("database error")',
          '    }',
          '    return user, nil',
          '}',
          '',
          '// Or formatting without wrapping:',
          'func getUser(id string) (*User, error) {',
          '    user, err := db.FindByID(id)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("db error: %s", err)',
          '    }',
          '    return user, nil',
          '}',
          '// errors.Is(err, sql.ErrNoRows) returns false — chain is broken',
        ].join('\n'),
        good: [
          'func getUser(id string) (*User, error) {',
          '    user, err := db.FindByID(id)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("get user %s: %w", id, err)',
          '    }',
          '    return user, nil',
          '}',
          '',
          '// Multi-level wrapping creates a clear error chain:',
          'func GetActiveUser(ctx context.Context, id string) (*User, error) {',
          '    user, err := getUser(id)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("active user lookup: %w", err)',
          '    }',
          '    if !user.IsActive {',
          '        return nil, fmt.Errorf("user %s: %w", id, ErrInactiveUser)',
          '    }',
          '    return user, nil',
          '}',
          '',
          '// errors.Is walks the chain:',
          'if errors.Is(err, sql.ErrNoRows) { /* found */ }',
          'if errors.Is(err, ErrInactiveUser) { /* found */ }',
        ].join('\n'),
        explanation: "Using %w preserves the error chain, allowing errors.Is and errors.As to inspect any error in the chain. Each wrapping layer adds context while maintaining the full history. The error message reads naturally: 'active user lookup: get user 123: sql: no rows in result set'."
      }
    ],
    bestPractices: [
      "Use %w to wrap errors — never lose the original error information",
      "Add contextual information at each layer: what operation failed, with what input",
      "Keep error messages lowercase and readable as a sentence fragment",
      "Wrap errors at each architectural boundary (repository, service, handler)",
      "Use errors.Is and errors.As to check wrapped errors at call sites"
    ],
    commonMistakes: [
      "Using %s or %v instead of %w, which breaks the error chain",
      "Adding too much context at one layer instead of distributing it across layers",
      "Wrapping errors that are already wrapped with the same context",
      "Not checking the error return from fmt.Errorf (it returns nil on format errors, though rare)"
    ],
    relatedTopics: [
      "errorsnew",
      "wrappingunwrapping-errors",
      "sentinel-errors"
    ],
    externalResources: [
      { title: "Go Blog: Go 1.13 Error Inspection", url: "https://go.dev/blog/go1.13-errors" },
      { title: "Go Doc: fmt.Errorf", url: "https://pkg.go.dev/fmt#Errorf" },
      { title: "Go Doc: errors.Is", url: "https://pkg.go.dev/errors#Is" }
    ]
  },

  "sentinel-errors": {
    slug: "sentinel-errors",
    title: "Sentinel Errors",
    summary: "Sentinel errors are package-level error variables that callers can check with errors.Is.",
    description: `Sentinel errors are pre-defined error values that represent specific, well-known failure conditions. They are declared as package-level variables using errors.New or custom error types. Callers check for them using errors.Is, which traverses the error chain to find a match.

Sentinel errors create a shared vocabulary of error conditions across your codebase. When a repository package defines ErrNotFound, every consumer can check for it without importing the concrete type. This decouples error handling from implementation details.

For backend engineers, sentinel errors are essential for API design. They map directly to HTTP status codes: ErrNotFound becomes 404, ErrUnauthorized becomes 401. Defining clear sentinel errors at package boundaries creates clean contracts between layers.`,
    keyPoints: [
      "Declared as package-level var: var ErrNotFound = errors.New(\"not found\")",
      "Named with Err prefix by convention: ErrNotFound, ErrTimeout",
      "Checked with errors.Is(err, ErrNotFound) — works through error wrapping",
      "Wrap sentinel errors with context when returning",
      "Define sentinel errors at the package where the error condition originates",
      "Keep sentinel error strings simple — context is added at the return site",
      "For complex data, use custom error types instead of sentinel values"
    ],
    codeExamples: [
      {
        title: "Sentinel Errors for Layered Architecture",
        description: "Defining sentinel errors at the repository layer and handling them at the API layer",
        bad: [
          '// No shared error vocabulary — magic strings:',
          'func (r *UserRepo) FindByID(id string) (*User, error) {',
          '    err := r.db.QueryRow("SELECT ...", id).Scan(&user)',
          '    if err == sql.ErrNoRows {',
          '        return nil, errors.New("not found")',
          '    }',
          '    return nil, err',
          '}',
          '',
          '// API handler checks string — fragile:',
          'if err.Error() == "not found" {',
          '    w.WriteHeader(404)',
          '}',
        ].join('\n'),
        good: [
          '// Repository package defines sentinel errors:',
          'var (',
          '    ErrNotFound    = errors.New("resource not found")',
          '    ErrConflict    = errors.New("resource conflict")',
          '    ErrPermission  = errors.New("permission denied")',
          ')',
          '',
          'func (r *UserRepo) FindByID(id string) (*User, error) {',
          '    var user User',
          '    err := r.db.QueryRow("SELECT ...", id).Scan(&user.Email, &user.Name)',
          '    if err == sql.ErrNoRows {',
          '        return nil, fmt.Errorf("user %s: %w", id, ErrNotFound)',
          '    }',
          '    if err != nil {',
          '        return nil, fmt.Errorf("query user %s: %w", id, err)',
          '    }',
          '    return &user, nil',
          '}',
          '',
          '// API handler checks sentinel error:',
          'if errors.Is(err, repo.ErrNotFound) {',
          '    respondWithError(w, 404, "User not found")',
          '    return',
          '}',
        ].join('\n'),
        explanation: "Sentinel errors create a stable contract between packages. The repository defines what errors can occur, and the API handler translates them to HTTP responses. errors.Is works through the wrapping chain."
      }
    ],
    bestPractices: [
      "Define sentinel errors at the package where the error originates",
      "Use the Err prefix for all sentinel error variable names",
      "Keep sentinel error messages short and descriptive",
      "Always wrap sentinel errors with context when returning from functions",
      "Document sentinel errors in package comments for API consumers"
    ],
    commonMistakes: [
      "Defining sentinel errors inside functions instead of at package level",
      "Comparing errors by string instead of using errors.Is",
      "Not wrapping sentinel errors, losing diagnostic context",
      "Using sentinel errors for situations that need structured data"
    ],
    relatedTopics: [
      "error-interface",
      "errorsnew",
      "wrappingunwrapping-errors"
    ],
    externalResources: [
      { title: "Go Blog: Go 1.13 Errors", url: "https://go.dev/blog/go1.13-errors" },
      { title: "Effective Go: Error handling", url: "https://go.dev/doc/effective_go#errors" },
      { title: "Go Doc: errors.Is", url: "https://pkg.go.dev/errors#Is" }
    ]
  },

  "wrappingunwrapping-errors": {
    slug: "wrappingunwrapping-errors",
    title: "Wrapping/Unwrapping Errors",
    summary: "Error wrapping preserves the error chain, allowing callers to inspect underlying causes.",
    description: `Error wrapping adds contextual information to errors as they propagate up the call stack. In Go, wrapping is done with fmt.Errorf and the %w verb. The wrapped error retains a reference to the original, forming a chain that can be inspected with errors.Is (for sentinel errors) and errors.As (for typed errors).

Unwrapping is the reverse — extracting the underlying error from a wrapper. The Unwrap() method on an error returns the inner error. errors.Is and errors.As internally call Unwrap to traverse the chain. This is similar to exception chaining in other languages but is explicit and composable.

For backend engineers, the wrapping pattern is critical for debugging distributed systems. When an error passes through multiple service layers, each layer adds context. The full chain tells the story of what happened: from the initial database failure to the service-level interpretation to the API response.`,
    keyPoints: [
      "Wrap errors with fmt.Errorf(\"context: %w\", err)",
      "errors.Is walks the error chain looking for a specific sentinel value",
      "errors.As walks the chain looking for a specific error type",
      "The Unwrap() method returns the inner error in the chain",
      "errors.Is and errors.As check the entire chain, not just the outermost error",
      "You can wrap errors multiple times — each layer adds context",
      "Go 1.20 added errors.Join for combining multiple errors"
    ],
    codeExamples: [
      {
        title: "Error Chain Inspection",
        description: "Walking an error chain to find the root cause and typed errors",
        bad: [
          '// Breaking the error chain — information is lost:',
          'func process() error {',
          '    err := lowerLevelOp()',
          '    if err != nil {',
          '        return errors.New("operation failed")',
          '    }',
          '    return nil',
          '}',
          '',
          '// Caller cannot determine the cause:',
          'if errors.Is(err, sql.ErrNoRows) {',
          '    // This never matches — the chain was broken',
          '}',
        ].join('\n'),
        good: [
          '// Preserve the chain at every layer:',
          'func lowerLevelOp() error {',
          '    return sql.ErrNoRows',
          '}',
          '',
          'func middleLayer() error {',
          '    err := lowerLevelOp()',
          '    if err != nil {',
          '        return fmt.Errorf("middle layer: %w", err)',
          '    }',
          '    return nil',
          '}',
          '',
          'func process() error {',
          '    err := middleLayer()',
          '    if err != nil {',
          '        return fmt.Errorf("process: %w", err)',
          '    }',
          '    return nil',
          '}',
          '',
          '// Chain: process -> middle layer -> sql.ErrNoRows',
          'if errors.Is(err, sql.ErrNoRows) { /* works! */ }',
          '',
          '// errors.Unwrap peels one layer:',
          'inner := errors.Unwrap(err)',
        ].join('\n'),
        explanation: "Each layer wraps the error with context using %w. This creates a chain: process -> middle layer -> sql.ErrNoRows. errors.Is traverses the chain to find sql.ErrNoRows even though it's at the bottom. errors.Unwrap peels one layer at a time."
      }
    ],
    bestPractices: [
      "Always wrap errors with %w to preserve the chain",
      "Add meaningful context at each layer that describes what the layer was doing",
      "Use errors.Is for sentinel errors and errors.As for typed errors",
      "Don't double-wrap the same error with the same context",
      "Use errors.Unwrap when you need to inspect exactly one level"
    ],
    commonMistakes: [
      "Breaking the error chain by creating a new error without %w",
      "Over-wrapping errors with redundant context at every function call",
      "Using errors.Is with a type assertion instead of errors.As",
      "Not understanding that errors.Is compares by identity, not by string"
    ],
    relatedTopics: [
      "fmterrorf",
      "sentinel-errors",
      "error-interface"
    ],
    externalResources: [
      { title: "Go Blog: Go 1.13 Error Inspection", url: "https://go.dev/blog/go1.13-errors" },
      { title: "Go Doc: errors.Unwrap", url: "https://pkg.go.dev/errors#Unwrap" },
      { title: "Go 1.20: errors.Join", url: "https://go.dev/doc/go1.20#error" }
    ]
  },

  "panic-and-recover": {
    slug: "panic-and-recover",
    title: "Panic and Recover",
    summary: "Panics unwind the stack; recover catches them. Use for truly unrecoverable situations.",
    description: `A panic in Go causes the runtime to immediately stop normal execution, unwind the stack, and run any deferred functions. If the panic is not recovered, the program crashes with a stack trace. Panics are reserved for truly unrecoverable situations — programmer errors, invariant violations, and situations where continuing execution would cause data corruption.

Recover is a built-in function that catches a panic inside a deferred function and resumes normal execution. It returns the value passed to panic and can only be called directly inside a deferred function. This pattern is commonly used in HTTP middleware to prevent a single request from crashing the entire server.

For backend engineers, panic/recover is your last line of defense. HTTP server middleware should always recover from panics to keep the service running. However, using panic for regular error handling is an anti-pattern — it bypasses Go's explicit error handling model.`,
    keyPoints: [
      "panic(value) immediately stops normal execution and unwinds the stack",
      "defer functions run during the unwind — this is how recover catches panics",
      "recover() catches the panic value and resumes normal execution",
      "recover can only be called directly inside a deferred function",
      "Use panic for programmer errors and invariant violations, not expected failures",
      "HTTP middleware should recover from panics to keep the server alive",
      "If a panic escapes to main, the program exits with a stack trace",
      "Built-in functions like nil pointer dereference cause automatic panics"
    ],
    codeExamples: [
      {
        title: "Recover from Panics in HTTP Middleware",
        description: "Protecting an HTTP server from handler panics",
        bad: [
          '// A panic in any handler crashes the entire server:',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    user := getUser(r) // might panic on nil pointer',
          '    process(user)',
          '}',
          '',
          '// Server crashes on the first panic — no recovery',
        ].join('\n'),
        good: [
          '// Panic recovery middleware:',
          'func RecoveryMiddleware(next http.Handler) http.Handler {',
          '    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {',
          '        defer func() {',
          '            if rec := recover(); rec != nil {',
          '                log.Printf("panic recovered: %v", rec)',
          '                debug.PrintStack()',
          '                http.Error(w, "Internal Server Error", 500)',
          '            }',
          '        }()',
          '        next.ServeHTTP(w, r)',
          '    })',
          '}',
          '',
          '// Panic for programmer errors only:',
          'func mustParseConfig(path string) Config {',
          '    cfg, err := loadConfig(path)',
          '    if err != nil {',
          '        panic(fmt.Sprintf("invalid config at startup: %v", err))',
          '    }',
          '    return cfg',
          '}',
        ].join('\n'),
        explanation: "The RecoveryMiddleware uses defer/recover to catch any panic in downstream handlers, log it, and return a 500 response instead of crashing the server. The must* pattern uses panic for startup-time programmer errors."
      }
    ],
    bestPractices: [
      "Use panic for truly unrecoverable errors (invalid program state, startup failures)",
      "Always recover panics in goroutines and HTTP handlers",
      "Log the panic value and stack trace when recovering for debugging",
      "Never use panic/recover as a substitute for normal error handling",
      "Use the must* naming convention for functions that panic on failure"
    ],
    commonMistakes: [
      "Using panic for expected errors that should be handled with return values",
      "Forgetting to defer the recovery function, making recover ineffective",
      "Recovering but not logging the panic, making debugging impossible",
      "Catching panics without re-panicking in contexts where the caller needs to know"
    ],
    relatedTopics: [
      "error-handling-basics",
      "goroutines",
      "error-interface"
    ],
    externalResources: [
      { title: "Effective Go: Panic and Recover", url: "https://go.dev/doc/effective_go#panic" },
      { title: "Go Blog: Defer, Panic, and Recover", url: "https://go.dev/blog/defer-panic-and-recover" },
      { title: "Go Spec: Panic and recover", url: "https://go.dev/ref/spec#Handling_panics" }
    ]
  },

  "goroutines": {
    slug: "goroutines",
    title: "Goroutines",
    summary: "Goroutines are lightweight concurrent functions managed by the Go runtime scheduler.",
    description: `A goroutine is a lightweight thread of execution managed by the Go runtime. Starting a goroutine is as simple as adding the go keyword before a function call. Unlike OS threads, goroutines start with a tiny stack (~2KB) that grows and shrinks as needed, allowing millions of them to run concurrently on a single machine.

The Go runtime multiplexes goroutines onto OS threads using an M:N scheduling model. This means you don't need to manage thread pools, executors, or thread lifecycles. Just spawn goroutines and let the runtime handle the rest. Communication between goroutines is done through channels, following the CSP model.

For backend engineers, goroutines are the foundation of high-concurrency services. Web servers spawn a goroutine per request, background workers process jobs in goroutine pools, and microservices use goroutines for parallel I/O operations.`,
    keyPoints: [
      "go f() starts a new goroutine executing f concurrently",
      "Goroutines start at ~2KB stack and grow dynamically as needed",
      "Millions of goroutines can run on a single machine",
      "The Go runtime schedules goroutines onto OS threads automatically",
      "Goroutines communicate via channels (CSP model)",
      "The main goroutine must wait for child goroutines to finish",
      "sync.WaitGroup is the standard way to wait for multiple goroutines",
      "Goroutines have no built-in cancellation mechanism — use context.Context"
    ],
    codeExamples: [
      {
        title: "Goroutine Lifecycle Management",
        description: "Properly spawning goroutines and waiting for completion",
        bad: [
          '// Goroutines that may not complete before main exits:',
          'func main() {',
          '    go processOrder("order-1")',
          '    go processOrder("order-2")',
          '    go processOrder("order-3")',
          '    // Program exits immediately — goroutines may not finish!',
          '}',
          '',
          '// Race condition: loop variable capture:',
          'for i := 0; i < 5; i++ {',
          '    go func() {',
          '        fmt.Println(i) // All print 5!',
          '    }()',
          '}',
        ].join('\n'),
        good: [
          'func main() {',
          '    var wg sync.WaitGroup',
          '    orders := []string{"order-1", "order-2", "order-3"}',
          '',
          '    for _, orderID := range orders {',
          '        wg.Add(1)',
          '        go func(id string) {',
          '            defer wg.Done()',
          '            processOrder(id)',
          '        }(orderID)',
          '    }',
          '',
          '    wg.Wait()',
          '    fmt.Println("All orders processed")',
          '}',
        ].join('\n'),
        explanation: "The bad example has two problems: the program exits before goroutines complete, and the loop variable is captured by reference. The good example uses sync.WaitGroup to wait for all goroutines and passes orderID as a parameter to avoid the closure capture issue."
      }
    ],
    bestPractices: [
      "Always wait for goroutines to complete using sync.WaitGroup or channels",
      "Pass loop variables as function parameters to avoid closure capture bugs",
      "Use context.Context for cancellation and timeout propagation",
      "Don't spawn goroutines in tight loops without a semaphore to limit concurrency",
      "Recover from panics in goroutines to prevent silent crashes"
    ],
    commonMistakes: [
      "Not waiting for goroutines to finish, causing data loss or race conditions",
      "Capturing loop variables by reference instead of passing them as parameters",
      "Spawning unbounded goroutines without limiting concurrency",
      "Not recovering from panics inside goroutines"
    ],
    relatedTopics: [
      "channels",
      "waitgroups",
      "context-package"
    ],
    externalResources: [
      { title: "Effective Go: Goroutines", url: "https://go.dev/doc/effective_go#goroutines" },
      { title: "Go Blog: A Guide to the Go Memory Model", url: "https://go.dev/ref/mem" },
      { title: "Go Blog: Concurrency is not Parallelism", url: "https://go.dev/blog/waza-talk" }
    ]
  },

  "channels": {
    slug: "channels",
    title: "Channels",
    summary: "Channels are typed conduits for sending and receiving values between goroutines safely.",
    description: `Channels are Go's mechanism for communication and synchronization between goroutines. A channel is a typed pipe that allows one goroutine to send a value and another to receive it. Channels enforce data ownership transfer — once a value is sent on a channel, the sender no longer has access to it.

Channels can be unbuffered (synchronous) or buffered (asynchronous up to capacity). Unbuffered channels block the sender until the receiver is ready and vice versa, providing natural synchronization. Buffered channels allow sending without blocking until the buffer is full.

For backend engineers, channels are the primary tool for building concurrent pipelines, worker pools, and event-driven architectures. They replace shared-memory concurrency patterns with message passing, which is inherently safer.`,
    keyPoints: [
      "Created with make: ch := make(chan int) or ch := make(chan int, 10)",
      "Send: ch <- value. Receive: value := <-ch",
      "Unbuffered channels block until both sender and receiver are ready",
      "Buffered channels block only when the buffer is full or empty",
      "Close a channel with close(ch) — receive on closed channel returns zero value",
      "Range over a channel: for v := range ch { ... }",
      "A channel value is nil when not created with make — send/receive block forever",
      "Channels are first-class values — can be passed to functions and stored in structs"
    ],
    codeExamples: [
      {
        title: "Channel Communication Patterns",
        description: "Unbuffered vs buffered channels and proper closing",
        bad: [
          '// Unbuffered channel with no receiver — deadlock:',
          'ch := make(chan int)',
          'ch <- 42 // blocks forever — no goroutine is receiving',
          '',
          '// Sending on a closed channel — panic:',
          'ch := make(chan int)',
          'close(ch)',
          'ch <- 1 // panic: send on closed channel',
        ].join('\n'),
        good: [
          '// Unbuffered channel with goroutine receiver:',
          'ch := make(chan int)',
          'go func() {',
          '    val := <-ch',
          '    fmt.Println("Received:", val)',
          '}()',
          'ch <- 42 // blocks until goroutine receives',
          '',
          '// Buffered channel for async producer:',
          'ch := make(chan string, 3)',
          'ch <- "buffered" // doesn\'t block',
          'ch <- "channel"',
          'ch <- "example"',
          '',
          '// Producer closes channel, consumer ranges:',
          'func producer(ch chan<- string) {',
          '    for _, msg := range messages {',
          '        ch <- msg',
          '    }',
          '    close(ch)',
          '}',
          '',
          'func consumer(ch <-chan string) {',
          '    for msg := range ch {',
          '        fmt.Println(msg)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Unbuffered channels synchronize sender and receiver. Buffered channels allow asynchronous sends up to the buffer capacity. Always close channels from the sender side and use range to receive until the channel is closed."
      }
    ],
    bestPractices: [
      "Close channels from the sender side, never from the receiver",
      "Use range to receive values until the channel is closed",
      "Use directional channel types (chan<- or <-chan) to enforce send/receive intent",
      "Prefer unbuffered channels for synchronization, buffered for decoupling",
      "Don't send on a closed channel or close a channel twice"
    ],
    commonMistakes: [
      "Sending on a closed channel, which causes a panic",
      "Not closing a channel, causing range consumers to block forever",
      "Deadlocking by sending/receiving without a corresponding goroutine",
      "Using channels when a sync.WaitGroup or mutex would be simpler"
    ],
    relatedTopics: [
      "buffered-vs-unbuffered",
      "select-statement",
      "goroutines"
    ],
    externalResources: [
      { title: "Effective Go: Channels", url: "https://go.dev/doc/effective_go#channels" },
      { title: "Go Blog: Go Memory Model", url: "https://go.dev/ref/mem" },
      { title: "Go Spec: Channel types", url: "https://go.dev/ref/spec#Channel_types" }
    ]
  },

  "buffered-vs-unbuffered": {
    slug: "buffered-vs-unbuffered",
    title: "Buffered vs Unbuffered Channels",
    summary: "Unbuffered channels synchronize; buffered channels decouple senders from receivers.",
    description: `Unbuffered channels (make(chan T)) require both the sender and receiver to be ready at the same time. The send blocks until a receiver takes the value, and the receive blocks until a sender provides one. This makes them powerful synchronization primitives — they guarantee that both goroutines have reached a known point.

Buffered channels (make(chan T, n)) have a fixed-size internal buffer. Sends only block when the buffer is full; receives only block when the buffer is empty. This decouples the sender from the receiver.

For backend engineers, choosing between buffered and unbuffered channels directly impacts system throughput and latency. Unbuffered channels are ideal for handoff patterns where you need synchronization guarantees. Buffered channels smooth out burst traffic and prevent producers from blocking when consumers are temporarily slow.`,
    keyPoints: [
      "Unbuffered: make(chan T) — synchronous communication",
      "Buffered: make(chan T, capacity) — asynchronous up to the capacity",
      "Unbuffered channels enforce synchronization between goroutines",
      "Buffered channels decouple sender timing from receiver timing",
      "len(ch) returns the number of items in the buffer; cap(ch) returns capacity",
      "A nil channel blocks both send and receive forever (useful in select)",
      "Closing an empty unbuffered channel does not cause issues for receivers"
    ],
    codeExamples: [
      {
        title: "When to Use Buffered vs Unbuffered",
        description: "Choosing the right channel type for different concurrency patterns",
        bad: [
          '// Unbuffered channel for rate limiting — producer always blocks:',
          'ch := make(chan Request)',
          'go func() {',
          '    for {',
          '        req := <-ch // blocks until consumer is ready',
          '        process(req)',
          '    }',
          '}',
          '// If consumer is slow, producer cannot accept new requests',
        ].join('\n'),
        good: [
          '// Buffered channel for smooth traffic flow:',
          'ch := make(chan Request, 100)',
          '',
          '// Producer can send up to 100 requests without blocking:',
          'go func() {',
          '    for _, req := range incomingRequests {',
          '        ch <- req // only blocks if 100 pending',
          '    }',
          '    close(ch)',
          '}()',
          '',
          '// Consumer processes at its own pace:',
          'go func() {',
          '    for req := range ch {',
          '        process(req)',
          '    }',
          '}',
          '',
          '// Unbuffered for synchronization handoff:',
          'done := make(chan struct{})',
          'go func() {',
          '    initialize()',
          '    close(done) // signal completion',
          '}()',
          '<-done // block until initialization is complete',
        ].join('\n'),
        explanation: "The buffered channel (capacity 100) lets the producer handle bursts of up to 100 requests without blocking. The unbuffered done channel is used for synchronization — the receiver blocks until the goroutine signals completion."
      }
    ],
    bestPractices: [
      "Use unbuffered channels when you need synchronization guarantees",
      "Use buffered channels to smooth out bursty producer-consumer patterns",
      "Size buffers based on expected burst capacity — too large wastes memory",
      "Monitor channel length with len(ch) for observability in production",
      "Use nil channels in select to disable a case dynamically"
    ],
    commonMistakes: [
      "Using unbuffered channels for high-throughput pipelines, causing unnecessary blocking",
      "Over-buffering channels, leading to memory waste and delayed backpressure",
      "Assuming buffered channels prevent all blocking — they block when full",
      "Not monitoring buffer fill levels, leading to undetected backpressure"
    ],
    relatedTopics: [
      "channels",
      "select-statement",
      "worker-pools"
    ],
    externalResources: [
      { title: "Effective Go: Channel buffering", url: "https://go.dev/doc/effective_go#channels" },
      { title: "Go Blog: Go Memory Model", url: "https://go.dev/ref/mem" },
      { title: "Go Spec: Channel types", url: "https://go.dev/ref/spec#Channel_types" }
    ]
  },

  "select-statement": {
    slug: "select-statement",
    title: "Select Statement",
    summary: "Select blocks on multiple channel operations simultaneously, choosing the first ready one.",
    description: `The select statement lets a goroutine wait on multiple channel operations at once. It blocks until one of the cases can proceed, then executes that case. If multiple cases are ready, Go chooses one at random to prevent starvation. If no case is ready, the select blocks (or runs the default case if one exists).

Select is the key to building responsive concurrent programs. It enables timeout handling, non-blocking sends and receives, and dynamic channel multiplexing. Without select, you would need complex goroutine coordination to handle the same scenarios.

For backend engineers, select is essential for implementing request timeouts, context cancellation, rate limiters, and multiplexed event loops.`,
    keyPoints: [
      "select blocks until one case is ready, then executes it",
      "If multiple cases are ready, one is chosen randomly",
      "A default case makes the select non-blocking",
      "A nil channel in a case effectively disables that case",
      "A closed channel is always ready for receive (returns zero value)",
      "Empty select {} blocks forever — useful for keeping a goroutine alive",
      "Select with time.After implements timeout patterns"
    ],
    codeExamples: [
      {
        title: "Select for Timeout and Cancellation",
        description: "Using select to implement a timeout on a channel operation",
        bad: [
          '// Blocking forever if the operation takes too long:',
          'func fetchData(ch chan Result) Result {',
          '    return <-ch // blocks indefinitely',
          '}',
        ].join('\n'),
        good: [
          '// With timeout using select:',
          'func fetchData(ch chan Result) (Result, error) {',
          '    select {',
          '    case result := <-ch:',
          '        return result, nil',
          '    case <-time.After(5 * time.Second):',
          '        return Result{}, errors.New("timeout waiting for result")',
          '    }',
          '}',
          '',
          '// Non-blocking send with default:',
          'func trySend(ch chan<- Event, evt Event) bool {',
          '    select {',
          '    case ch <- evt:',
          '        return true',
          '    default:',
          '        return false // channel full, don\'t block',
          '    }',
          '}',
          '',
          '// Context cancellation:',
          'func worker(ctx context.Context, jobs <-chan Job) {',
          '    for {',
          '        select {',
          '        case <-ctx.Done():',
          '            return',
          '        case job, ok := <-jobs:',
          '            if !ok {',
          '                return',
          '            }',
          '            process(job)',
          '        }',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Select with time.After creates a timeout. The non-blocking send pattern uses a default case. Context cancellation via select is the standard pattern for graceful shutdown in Go services."
      }
    ],
    bestPractices: [
      "Use select for timeouts with time.After or context cancellation",
      "Use a default case for non-blocking operations",
      "Use context.Done() as a select case for graceful shutdown",
      "Avoid busy loops — an empty default case in a for loop creates CPU spinning",
      "Use nil channel cases to dynamically disable select branches"
    ],
    commonMistakes: [
      "Forgetting the default case when non-blocking behavior is intended",
      "Creating a new time.After inside a loop (leaks timers until they fire)",
      "Using select as a switch statement — select is only for channel operations",
      "Not handling the context cancellation case, leading to resource leaks"
    ],
    relatedTopics: [
      "channels",
      "concurrency-patterns",
      "context-package"
    ],
    externalResources: [
      { title: "Effective Go: Select", url: "https://go.dev/doc/effective_go#select" },
      { title: "Go Blog: Go Concurrency Patterns", url: "https://go.dev/blog/pipelines" },
      { title: "Go Spec: Select statements", url: "https://go.dev/ref/spec#Select_statements" }
    ]
  },

  "concurrency-patterns": {
    slug: "concurrency-patterns",
    title: "Concurrency Patterns",
    summary: "Go provides composable patterns like pipelines, fan-out/fan-in, and worker pools.",
    description: `Go's concurrency primitives — goroutines, channels, and select — compose into powerful patterns for parallel data processing. The most common patterns include pipelines (stages connected by channels), fan-out/fan-in (distributing work and collecting results), worker pools (bounded concurrency), and generator patterns (producing values on demand).

These patterns are not libraries but conventions — you build them by composing Go's basic primitives. The Go blog series "Go Concurrency Patterns" and "Pipeline" describe these patterns in detail. Understanding them is essential for writing efficient concurrent Go code.

For backend engineers, these patterns directly apply to building data pipelines, processing queues, handling concurrent requests, and building responsive services.`,
    keyPoints: [
      "Pipelines: stages connected by channels, each stage runs in a goroutine",
      "Fan-out: one goroutine feeds multiple workers for parallel processing",
      "Fan-in: multiple goroutines merge results into a single channel",
      "Worker pools: bounded number of goroutines processing from a job queue",
      "Generator: a function that returns a channel producing values on demand",
      "Or-channel: select on multiple done channels to wait for any one to finish",
      "Tee: splitting a channel's output into two copies"
    ],
    codeExamples: [
      {
        title: "Pipeline Pattern",
        description: "Building a three-stage pipeline: generate, square, print",
        bad: [
          '// Sequential processing — no parallelism:',
          'func processAll(numbers []int) {',
          '    for _, n := range numbers {',
          '        doubled := n * 2',
          '        formatted := fmt.Sprintf("Result: %d", doubled)',
          '        fmt.Println(formatted)',
          '    }',
          '}',
        ].join('\n'),
        good: [
          '// Pipeline stages connected by channels:',
          'func generate(nums ...int) <-chan int {',
          '    out := make(chan int)',
          '    go func() {',
          '        defer close(out)',
          '        for _, n := range nums {',
          '            out <- n',
          '        }',
          '    }()',
          '    return out',
          '}',
          '',
          'func square(in <-chan int) <-chan int {',
          '    out := make(chan int)',
          '    go func() {',
          '        defer close(out)',
          '        for n := range in {',
          '            out <- n * n',
          '        }',
          '    }()',
          '    return out',
          '}',
          '',
          '// Compose:',
          'func main() {',
          '    for val := range square(generate(1, 2, 3, 4, 5)) {',
          '        fmt.Println(val)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Each stage is a goroutine that reads from an input channel and writes to an output channel. The channels connect the stages, and defer close(out) ensures downstream stages terminate via range."
      }
    ],
    bestPractices: [
      "Close channels from the sender side to signal completion",
      "Use context.Context to cancel entire pipelines when errors occur",
      "Limit goroutine count in fan-out to prevent resource exhaustion",
      "Use errgroup to handle errors across pipeline stages",
      "Design each stage to be composable and independently testable"
    ],
    commonMistakes: [
      "Not closing channels, causing downstream goroutines to block forever",
      "Spawning unbounded goroutines in fan-out without resource limits",
      "Not propagating cancellation through the pipeline",
      "Ignoring errors in one stage while other stages continue processing"
    ],
    relatedTopics: [
      "fan-in",
      "fan-out",
      "pipeline",
      "worker-pools"
    ],
    externalResources: [
      { title: "Go Blog: Pipelines", url: "https://go.dev/blog/pipelines" },
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/talks/2012/concurrency.slide" },
      { title: "Go Blog: Advanced Concurrency Patterns", url: "https://go.dev/blog/io-piping" }
    ]
  },

  "fan-in": {
    slug: "fan-in",
    title: "Fan-In",
    summary: "Fan-in merges multiple input channels into a single output channel for unified processing.",
    description: `Fan-in is a concurrency pattern where multiple goroutines send results to a single channel. A dedicated merger goroutine reads from all input channels and forwards values to one output channel. This allows downstream consumers to process results from parallel workers through a single entry point.

The fan-in pattern is essential when you have multiple data sources or parallel processing stages that need to be combined. For example, fetching data from multiple APIs simultaneously and merging the responses.

For backend engineers, fan-in is commonly used in data aggregation services, parallel HTTP clients, and any scenario where multiple concurrent operations need their results combined.`,
    keyPoints: [
      "Multiple input channels are merged into one output channel",
      "A merger goroutine reads from all inputs and writes to a single output",
      "Used with fan-out to distribute work and collect results",
      "The merger must handle channel closures from all input channels",
      "Use sync.WaitGroup or done channels to know when all inputs are done",
      "Prevents consumers from needing to select on multiple channels",
      "Combines naturally with pipeline patterns"
    ],
    codeExamples: [
      {
        title: "Fan-In Merger",
        description: "Merging results from two parallel fetchers into one channel",
        bad: [
          '// Fetching sequentially — slow:',
          'func fetchAll(urls []string) []Response {',
          '    var results []Response',
          '    for _, url := range urls {',
          '        resp := fetch(url)',
          '        results = append(results, resp)',
          '    }',
          '    return results',
          '}',
        ].join('\n'),
        good: [
          '// Fan-out: multiple goroutines fetch in parallel:',
          'func fetchAll(urls []string) []Response {',
          '    ch := make(chan Response, len(urls))',
          '',
          '    for _, url := range urls {',
          '        go func(u string) {',
          '            ch <- fetch(u)',
          '        }(url)',
          '    }',
          '',
          '// Fan-in: collect all responses:',
          '    var results []Response',
          '    for range urls {',
          '        results = append(results, <-ch)',
          '    }',
          '    return results',
          '}',
          '',
          '// Reusable fan-in function:',
          'func merge(channels ...<-chan Response) <-chan Response {',
          '    var wg sync.WaitGroup',
          '    merged := make(chan Response)',
          '',
          '    for _, ch := range channels {',
          '        wg.Add(1)',
          '        go func(c <-chan Response) {',
          '            defer wg.Done()',
          '            for resp := range c {',
          '                merged <- resp',
          '            }',
          '        }(ch)',
          '    }',
          '',
          '    go func() {',
          '        wg.Wait()',
          '        close(merged)',
          '    }()',
          '',
          '    return merged',
          '}',
        ].join('\n'),
        explanation: "The fan-out spawns goroutines to fetch URLs in parallel, and the fan-in collects results through a buffered channel. The reusable merge function uses a WaitGroup to close the merged channel when all inputs are done."
      }
    ],
    bestPractices: [
      "Use a buffered channel sized to the number of expected results",
      "Close input channels from the sender side",
      "Use a WaitGroup to close the merged channel when all inputs are done",
      "Consider errgroup for error handling across fan-out goroutines",
      "Limit fan-out concurrency with a semaphore to prevent resource exhaustion"
    ],
    commonMistakes: [
      "Not closing the merged channel, causing consumers to block forever",
      "Unbounded fan-out without limiting concurrency",
      "Losing errors from individual goroutines without proper collection",
      "Assuming results arrive in order — fan-in does not guarantee ordering"
    ],
    relatedTopics: [
      "fan-out",
      "pipeline",
      "worker-pools"
    ],
    externalResources: [
      { title: "Go Blog: Pipelines and Fan-out, Fan-in", url: "https://go.dev/blog/pipelines" },
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/talks/2012/concurrency.slide" },
      { title: "Go Doc: sync.WaitGroup", url: "https://pkg.go.dev/sync#WaitGroup" }
    ]
  },

  "fan-out": {
    slug: "fan-out",
    title: "Fan-Out",
    summary: "Fan-out distributes work from one goroutine across multiple workers for parallel processing.",
    description: `Fan-out is a concurrency pattern where a single goroutine distributes work items to multiple worker goroutines. Each worker processes items independently, achieving parallelism. This is the counterpart to fan-in, where results from multiple workers are merged into a single channel.

Fan-out is ideal when a stage in your pipeline is computationally expensive or slow, and you want to parallelize it. By spawning multiple workers that read from the same input channel, you can process multiple items concurrently. The key challenge is limiting the number of workers to prevent resource exhaustion.

For backend engineers, fan-out is used to parallelize CPU-bound work, speed up batch processing, and handle concurrent requests from a shared queue.`,
    keyPoints: [
      "Multiple goroutines read from the same input channel (work distribution)",
      "Each item is processed by exactly one worker (competing consumers)",
      "Limit the number of workers to prevent goroutine and memory explosion",
      "Workers read from the same channel — Go ensures safe access",
      "Combine with fan-in to collect results from all workers",
      "Use a semaphore (buffered channel) to limit concurrent workers",
      "Context cancellation can signal all workers to stop"
    ],
    codeExamples: [
      {
        title: "Fan-Out with Bounded Workers",
        description: "Distributing work across a fixed number of worker goroutines",
        bad: [
          '// Unbounded fan-out — too many goroutines at once:',
          'func processAll(images []Image) []Result {',
          '    results := make(chan Result, len(images))',
          '    for _, img := range images {',
          '        go func(i Image) {',
          '            results <- heavyProcess(i)',
          '        }(img)',
          '    }',
          '    // 10,000 images = 10,000 goroutines processing simultaneously',
          '}',
        ].join('\n'),
        good: [
          '// Bounded fan-out with a semaphore:',
          'func processAll(ctx context.Context, images []Image) ([]Result, error) {',
          '    results := make(chan Result, len(images))',
          '    sem := make(chan struct{}, 10) // max 10 concurrent workers',
          '',
          '    var wg sync.WaitGroup',
          '    for _, img := range images {',
          '        wg.Add(1)',
          '        sem <- struct{}{} // acquire semaphore slot',
          '        go func(i Image) {',
          '            defer wg.Done()',
          '            defer func() { <-sem }() // release semaphore slot',
          '',
          '            select {',
          '            case <-ctx.Done():',
          '                return',
          '            default:',
          '                results <- heavyProcess(i)',
          '            }',
          '        }(img)',
          '    }',
          '',
          '    go func() {',
          '        wg.Wait()',
          '        close(results)',
          '    }()',
          '',
          '    var out []Result',
          '    for r := range results {',
          '        out = append(out, r)',
          '    }',
          '    return out, nil',
          '}',
        ].join('\n'),
        explanation: "The semaphore (buffered channel of size 10) limits concurrent workers to 10, preventing memory and CPU exhaustion. Context cancellation provides a way to abort processing early."
      }
    ],
    bestPractices: [
      "Always limit concurrency with a semaphore or worker pool",
      "Use context.Context for cancellation to avoid wasting work",
      "Size the results buffer to the number of items to avoid blocking",
      "Use errgroup to collect errors from worker goroutines",
      "Monitor goroutine count and memory usage in production"
    ],
    commonMistakes: [
      "Spawning unbounded goroutines, causing memory exhaustion",
      "Not using a WaitGroup to know when workers are done",
      "Losing context cancellation, leading to goroutines that never stop",
      "Assuming order of results is preserved"
    ],
    relatedTopics: [
      "fan-in",
      "worker-pools",
      "pipeline"
    ],
    externalResources: [
      { title: "Go Blog: Pipelines and Fan-out, Fan-in", url: "https://go.dev/blog/pipelines" },
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/talks/2012/concurrency.slide" },
      { title: "Go Blog: Context", url: "https://go.dev/blog/context" }
    ]
  },

  "pipeline": {
    slug: "pipeline",
    title: "Pipeline",
    summary: "Pipelines connect processing stages via channels, enabling composable concurrent data flow.",
    description: `A pipeline is a series of processing stages connected by channels. Each stage is one or more goroutines that receive values from an incoming channel, process them, and send results to an outgoing channel. This creates a data flow graph where values stream through the stages.

Pipelines naturally express sequential data transformations while allowing concurrent execution. Each stage can run in its own goroutine, and stages can operate in parallel when there are buffered channels between them.

For backend engineers, pipelines are the foundation for building ETL systems, log processing pipelines, request middleware chains, and data transformation services.`,
    keyPoints: [
      "Each stage is a goroutine reading from an input channel and writing to an output",
      "Channels connect stages — the output of one is the input of the next",
      "Close channels from the sender to signal stage completion",
      "Use context.Context to cancel the entire pipeline on errors",
      "Stages can fan-out/fan-in internally for parallelism",
      "Pipeline stages are composable — chain them together freely",
      "Use errgroup for error propagation across stages"
    ],
    codeExamples: [
      {
        title: "Multi-Stage Data Pipeline",
        description: "A pipeline that generates numbers, filters evens, squares them, and prints",
        bad: [
          '// Monolithic processing — hard to test or parallelize:',
          'func process(nums []int) []int {',
          '    var result []int',
          '    for _, n := range nums {',
          '        if n%2 == 0 {',
          '            result = append(result, n*n)',
          '        }',
          '    }',
          '    return result',
          '}',
        ].join('\n'),
        good: [
          '// Pipeline: generate -> filter -> square -> print',
          'func generate(ctx context.Context, nums ...int) <-chan int {',
          '    out := make(chan int)',
          '    go func() {',
          '        defer close(out)',
          '        for _, n := range nums {',
          '            select {',
          '            case out <- n:',
          '            case <-ctx.Done():',
          '                return',
          '            }',
          '        }',
          '    }()',
          '    return out',
          '}',
          '',
          'func filter(ctx context.Context, in <-chan int) <-chan int {',
          '    out := make(chan int)',
          '    go func() {',
          '        defer close(out)',
          '        for n := range in {',
          '            if n%2 == 0 {',
          '                select {',
          '                case out <- n:',
          '                case <-ctx.Done():',
          '                    return',
          '                }',
          '            }',
          '        }',
          '    }()',
          '    return out',
          '}',
          '',
          '// Compose:',
          'func main() {',
          '    ctx, cancel := context.WithCancel(context.Background())',
          '    defer cancel()',
          '    for val := range square(ctx, filter(ctx, generate(ctx, 1, 2, 3, 4, 5))) {',
          '        fmt.Println(val)',
          '    }',
          '}',
        ].join('\n'),
        explanation: "Each stage is a standalone function returning a read channel. The pipeline composes by nesting: square(filter(generate(...))). Context cancellation propagates to all stages."
      }
    ],
    bestPractices: [
      "Design each stage to be composable and independently testable",
      "Use context.Context for cancellation and deadline propagation",
      "Close channels from the sender side to signal completion",
      "Use errgroup to handle errors across pipeline stages",
      "Buffer channels between stages to reduce blocking"
    ],
    commonMistakes: [
      "Not closing output channels, causing downstream stages to block",
      "Not propagating context cancellation through stages",
      "Ignoring errors in individual stages",
      "Creating tight coupling between stages instead of through channels"
    ],
    relatedTopics: [
      "fan-in",
      "fan-out",
      "concurrency-patterns"
    ],
    externalResources: [
      { title: "Go Blog: Pipelines", url: "https://go.dev/blog/pipelines" },
      { title: "Go Blog: Context", url: "https://go.dev/blog/context" },
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/talks/2012/concurrency.slide" }
    ]
  },

  "worker-pools": {
    slug: "worker-pools",
    title: "Worker Pools",
    summary: "Worker pools use a fixed number of goroutines consuming from a shared job channel.",
    description: `A worker pool limits the number of concurrent goroutines processing tasks from a shared channel. Instead of spawning a new goroutine for each task, a fixed number of worker goroutines are started upfront. Each worker reads from the job channel, processes the task, and optionally sends results to a results channel.

Worker pools provide natural backpressure — when all workers are busy, the job channel blocks, preventing the producer from overwhelming the system. This makes them ideal for controlling resource usage in production services.

For backend engineers, worker pools are essential for controlling concurrency in message queue consumers, batch processing systems, and rate-limited API clients.`,
    keyPoints: [
      "A fixed number of goroutines consume from a shared job channel",
      "Provides natural backpressure when all workers are busy",
      "Jobs channel should be buffered to reduce producer blocking",
      "Workers should signal completion via a WaitGroup or results channel",
      "The number of workers should be tuned based on workload type",
      "Context cancellation can signal all workers to stop gracefully",
      "Results can be collected via a separate results channel"
    ],
    codeExamples: [
      {
        title: "HTTP Request Worker Pool",
        description: "A pool of workers fetching URLs concurrently with bounded parallelism",
        bad: [
          '// Unbounded — one goroutine per URL:',
          'func fetchAll(urls []string) {',
          '    for _, url := range urls {',
          '        go func(u string) {',
          '            resp, err := http.Get(u)',
          '            if err != nil {',
          '                log.Println(err)',
          '            }',
          '        }(url)',
          '    }',
          '    // 10,000 goroutines hitting the network at once',
          '}',
        ].join('\n'),
        good: [
          '// Worker pool with 5 concurrent workers:',
          'func fetchAll(ctx context.Context, urls []string) []Response {',
          '    jobs := make(chan string, len(urls))',
          '    results := make(chan Response, len(urls))',
          '',
          '// Start workers:',
          '    var wg sync.WaitGroup',
          '    for i := 0; i < 5; i++ {',
          '        wg.Add(1)',
          '        go func() {',
          '            defer wg.Done()',
          '            for url := range jobs {',
          '                select {',
          '                case <-ctx.Done():',
          '                    return',
          '                default:',
          '                    resp, err := http.Get(url)',
          '                    if err != nil {',
          '                        log.Printf("fetch %s: %v", url, err)',
          '                        continue',
          '                    }',
          '                    results <- Response{URL: url, Body: resp.Body}',
          '                }',
          '            }',
          '        }()',
          '    }',
          '',
          '// Send jobs and close channel:',
          '    for _, url := range urls {',
          '        jobs <- url',
          '    }',
          '    close(jobs)',
          '',
          '// Wait and close results:',
          '    go func() {',
          '        wg.Wait()',
          '        close(results)',
          '    }()',
          '',
          '    var out []Response',
          '    for r := range results {',
          '        out = append(out, r)',
          '    }',
          '    return out',
          '}',
        ].join('\n'),
        explanation: "Only 5 workers process URLs concurrently, regardless of how many URLs are in the list. The buffered jobs channel allows the producer to enqueue all URLs without blocking."
      }
    ],
    bestPractices: [
      "Size the worker count based on workload: CPU-bound = NumCPU, I/O-bound = higher",
      "Buffer the jobs channel to reduce producer blocking",
      "Use context.Context to implement graceful shutdown and cancellation",
      "Monitor worker utilization — idle workers indicate the pool is too large",
      "Handle errors within workers without crashing the pool"
    ],
    commonMistakes: [
      "Too many workers, causing resource exhaustion",
      "Too few workers, causing the job channel to back up",
      "Not closing the jobs channel, leaving workers blocked forever",
      "Not recovering from panics in worker goroutines"
    ],
    relatedTopics: [
      "fan-out",
      "fan-in",
      "goroutines"
    ],
    externalResources: [
      { title: "Go Blog: Pipelines", url: "https://go.dev/blog/pipelines" },
      { title: "Go Wiki: Worker Pools", url: "https://github.com/golang/go/wiki/WorkerPools" },
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/talks/2012/concurrency.slide" }
    ]
  },

  "mutexes": {
    slug: "mutexes",
    title: "Mutexes",
    summary: "Mutexes provide mutual exclusion for safe concurrent access to shared state.",
    description: `A mutex (mutual exclusion) is a synchronization primitive that protects shared resources from concurrent access. Go provides sync.Mutex and its read-optimized variant sync.RWMutex. A mutex locks before accessing shared data and unlocks after, ensuring only one goroutine can access the critical section at a time.

RWMutex allows multiple concurrent readers or a single writer. Use RWMutex when reads far outnumber writes, as it prevents readers from blocking each other.

For backend engineers, mutexes are often simpler than channels for protecting shared state. Caches, counters, and configuration objects are commonly protected with mutexes. The choice between mutexes and channels depends on the pattern: mutexes protect shared data, channels communicate between goroutines.`,
    keyPoints: [
      "sync.Mutex provides exclusive locking: Lock() and Unlock()",
      "sync.RWMutex allows concurrent reads: RLock() and RUnlock()",
      "Always use defer to ensure Unlock() is called, even on panic",
      "Mutexes protect data — not code. Lock around data access, not entire functions",
      "RWMutex is beneficial when reads outnumber writes",
      "Never copy a mutex — always pass by pointer",
      "Mutexes should not be embedded in structs passed by value"
    ],
    codeExamples: [
      {
        title: "Thread-Safe Counter with Mutex",
        description: "Protecting a shared counter with sync.Mutex for concurrent access",
        bad: [
          '// Race condition — concurrent writes corrupt the counter:',
          'type Counter struct {',
          '    value int',
          '}',
          '',
          'func (c *Counter) Increment() {',
          '    c.value++',
          '}',
          '',
          '// Multiple goroutines incrementing causes data race:',
          'var c Counter',
          'for i := 0; i < 1000; i++ {',
          '    go c.Increment()',
          '}',
          '// Final value is unpredictable',
        ].join('\n'),
        good: [
          '// Mutex-protected counter:',
          'type Counter struct {',
          '    mu    sync.Mutex',
          '    value int',
          '}',
          '',
          'func (c *Counter) Increment() {',
          '    c.mu.Lock()',
          '    defer c.mu.Unlock()',
          '    c.value++',
          '}',
          '',
          'func (c *Counter) Value() int {',
          '    c.mu.Lock()',
          '    defer c.mu.Unlock()',
          '    return c.value',
          '}',
          '',
          '// RWMutex for read-heavy workloads:',
          'type Cache struct {',
          '    mu   sync.RWMutex',
          '    data map[string]string',
          '}',
          '',
          'func (c *Cache) Get(key string) (string, bool) {',
          '    c.mu.RLock()',
          '    defer c.mu.RUnlock()',
          '    val, ok := c.data[key]',
          '    return val, ok',
          '}',
          '',
          'func (c *Cache) Set(key, value string) {',
          '    c.mu.Lock()',
          '    defer c.mu.Unlock()',
          '    c.data[key] = value',
          '}',
        ].join('\n'),
        explanation: "The Mutex ensures that only one goroutine can increment the value at a time. defer c.mu.Unlock() guarantees the lock is released even if a panic occurs. The RWMutex version allows multiple concurrent Get calls while ensuring Set has exclusive access."
      }
    ],
    bestPractices: [
      "Always use defer to ensure Unlock() is called after Lock()",
      "Use RWMutex when reads significantly outnumber writes",
      "Keep critical sections small — lock late, unlock early",
      "Never copy a mutex — pass structs containing mutexes by pointer",
      "Consider channels for communication and mutexes for protecting shared state"
    ],
    commonMistakes: [
      "Forgetting to call Unlock(), causing deadlocks",
      "Copying a mutex by value, creating independent lock instances",
      "Holding the lock for too long, blocking other goroutines unnecessarily",
      "Using mutex when channels would be cleaner for the communication pattern"
    ],
    relatedTopics: [
      "waitgroups",
      "sync-package",
      "race-detection"
    ],
    externalResources: [
      { title: "Effective Go: Sync", url: "https://go.dev/doc/effective_go#sync" },
      { title: "Go Doc: sync.Mutex", url: "https://pkg.go.dev/sync#Mutex" },
      { title: "Go Blog: Go Memory Model", url: "https://go.dev/ref/mem" }
    ]
  },

  "waitgroups": {
    slug: "waitgroups",
    title: "WaitGroups",
    summary: "sync.WaitGroup blocks until a counter reaches zero, waiting for all goroutines to finish.",
    description: `A WaitGroup is a synchronization primitive that waits for a collection of goroutines to finish. You add to the counter before starting a goroutine, call Done inside the goroutine when it finishes, and call Wait in the main goroutine to block until the counter reaches zero.

WaitGroups are the standard way to wait for multiple goroutines to complete. They are simpler than channels for the "wait for all" pattern and don't require managing channel closing logic.

For backend engineers, WaitGroups are used everywhere: waiting for HTTP handler goroutines to finish during shutdown, ensuring background tasks complete before exit, and coordinating parallel work.`,
    keyPoints: [
      "Add(n) increments the counter — call before starting the goroutine",
      "Done() decrements the counter — call when the goroutine finishes (use defer)",
      "Wait() blocks until the counter reaches zero",
      "Never copy a WaitGroup after first use",
      "Add must be called outside the goroutine or before it starts",
      "Done can be called as defer wg.Done() at the start of the goroutine",
      "WaitGroups do not carry data — use channels or shared state for results"
    ],
    codeExamples: [
      {
        title: "WaitGroup for Parallel Tasks",
        description: "Waiting for multiple HTTP requests to complete in parallel",
        bad: [
          '// WaitGroup added inside goroutine — race condition:',
          'func fetchAll(urls []string) {',
          '    var wg sync.WaitGroup',
          '    for _, url := range urls {',
          '        go func(u string) {',
          '            wg.Add(1) // might not execute before Wait()',
          '            defer wg.Done()',
          '            fetch(u)',
          '        }(url)',
          '    }',
          '    wg.Wait() // may return before all goroutines start',
          '}',
        ].join('\n'),
        good: [
          '// Add called before the goroutine:',
          'func fetchAll(urls []string) {',
          '    var wg sync.WaitGroup',
          '    for _, url := range urls {',
          '        wg.Add(1)',
          '        go func(u string) {',
          '            defer wg.Done()',
          '            fetch(u)',
          '        }(url)',
          '    }',
          '    wg.Wait()',
          '}',
          '',
          '// WaitGroup with context for timeout:',
          'func fetchAllWithTimeout(ctx context.Context, urls []string) error {',
          '    ctx, cancel := context.WithTimeout(ctx, 10*time.Second)',
          '    defer cancel()',
          '',
          '    var wg sync.WaitGroup',
          '    for _, url := range urls {',
          '        wg.Add(1)',
          '        go func(u string) {',
          '            defer wg.Done()',
          '            select {',
          '            case <-ctx.Done():',
          '                return',
          '            default:',
          '                fetch(u)',
          '            }',
          '        }(url)',
          '    }',
          '    wg.Wait()',
          '    return ctx.Err()',
          '}',
        ].join('\n'),
        explanation: "Add must be called before the goroutine starts to prevent a race between Add and Wait. The context-aware version adds a timeout so the function doesn't block indefinitely if a fetch hangs."
      }
    ],
    bestPractices: [
      "Call Add before launching the goroutine, never inside it",
      "Use defer wg.Done() at the start of the goroutine",
      "Don't copy WaitGroups after first use",
      "Combine with context.Context for timeout and cancellation",
      "Use WaitGroups for waiting, not for passing data between goroutines"
    ],
    commonMistakes: [
      "Calling Add inside the goroutine, creating a race condition with Wait",
      "Forgetting to call Done, causing Wait to block forever",
      "Calling Add a negative number or more times than expected",
      "Copying the WaitGroup by value after it has been used"
    ],
    relatedTopics: [
      "goroutines",
      "mutexes",
      "context-package"
    ],
    externalResources: [
      { title: "Go Doc: sync.WaitGroup", url: "https://pkg.go.dev/sync#WaitGroup" },
      { title: "Effective Go: Sync", url: "https://go.dev/doc/effective_go#sync" },
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/talks/2012/concurrency.slide" }
    ]
  },

  "sync-package": {
    slug: "sync-package",
    title: "Sync Package",
    summary: "The sync package provides Mutex, WaitGroup, Once, Pool, Map, and Cond for concurrency control.",
    description: `The sync package in Go's standard library provides synchronization primitives beyond channels. It includes Mutex and RWMutex for mutual exclusion, WaitGroup for goroutine coordination, Once for one-time initialization, Pool for reusable object pools, Map for concurrent-safe maps, and Cond for condition variable signaling.

Each primitive solves a specific concurrency problem. sync.Once ensures a function is executed exactly once, even if called from multiple goroutines — critical for lazy initialization of singletons and configuration. sync.Pool provides a cache of reusable objects to reduce garbage collection pressure. sync.Map offers a concurrent-safe map optimized for specific access patterns.

For backend engineers, understanding the sync package is essential for building high-performance concurrent systems. Choosing the right primitive depends on the specific synchronization pattern needed — channels for communication, mutexes for shared state protection, Once for initialization, and Pool for object reuse.`,
    keyPoints: [
      "sync.Mutex and sync.RWMutex provide mutual exclusion",
      "sync.WaitGroup coordinates goroutine completion",
      "sync.Once ensures a function runs exactly once across all goroutines",
      "sync.Pool provides reusable object caching to reduce GC pressure",
      "sync.Map is a concurrent-safe map optimized for specific patterns",
      "sync.Cond implements condition variables for goroutine signaling",
      "All sync primitives should be used by pointer, never copied"
    ],
    codeExamples: [
      {
        title: "sync.Once for Lazy Initialization",
        description: "Using sync.Once to safely initialize a database connection pool",
        bad: [
          '// Race condition — multiple goroutines may initialize:',
          'var db *sql.DB',
          '',
          'func getDB() *sql.DB {',
          '    if db == nil {',
          '        // Multiple goroutines may enter here simultaneously:',
          '        var err error',
          '        db, err = sql.Open("mysql", dsn)',
          '        if err != nil {',
          '            log.Fatal(err)',
          '        }',
          '    }',
          '    return db',
          '}',
        ].join('\n'),
        good: [
          '// sync.Once guarantees single initialization:',
          'var (',
          '    db   *sql.DB',
          '    once sync.Once',
          ')',
          '',
          'func getDB() *sql.DB {',
          '    once.Do(func() {',
          '        var err error',
          '        db, err = sql.Open("mysql", dsn)',
          '        if err != nil {',
          '            log.Fatal(err)',
          '        }',
          '    })',
          '    return db',
          '}',
          '',
          '// sync.Pool for object reuse:',
          'var bufferPool = sync.Pool{',
          '    New: func() any {',
          '        return new(bytes.Buffer)',
          '    },',
          '}',
          '',
          'func process(data []byte) string {',
          '    buf := bufferPool.Get().(*bytes.Buffer)',
          '    defer func() {',
          '        buf.Reset()',
          '        bufferPool.Put(buf)',
          '    }()',
          '    buf.Write(data)',
          '    return buf.String()',
          '}',
        ].join('\n'),
        explanation: "sync.Once ensures the database initialization happens exactly once, regardless of how many goroutines call getDB() simultaneously. sync.Pool reuses bytes.Buffer objects across calls, reducing memory allocation and GC pressure in hot paths."
      }
    ],
    bestPractices: [
      "Use sync.Once for lazy initialization of singletons and configuration",
      "Use sync.Pool for frequently allocated and short-lived objects",
      "Choose sync.Map only when concurrent reads vastly outnumber writes",
      "Prefer channels for communication and sync primitives for shared state protection",
      "Always use sync primitives by pointer — never copy them"
    ],
    commonMistakes: [
      "Using sync.Map as a general-purpose concurrent map — it has specific use cases",
      "Copying sync.Once or sync.WaitGroup by value",
      "Using sync.Pool without understanding that pooled objects may be garbage collected",
      "Using Cond when channels or WaitGroups would be simpler"
    ],
    relatedTopics: [
      "mutexes",
      "waitgroups",
      "race-detection"
    ],
    externalResources: [
      { title: "Go Doc: sync package", url: "https://pkg.go.dev/sync" },
      { title: "Go Blog: sync.Pool", url: "https://go.dev/blog/sync-pool" },
      { title: "Go Blog: Go Memory Model", url: "https://go.dev/ref/mem" }
    ]
  },

  "race-detection": {
    slug: "race-detection",
    title: "Race Detection",
    summary: "The race detector identifies data races at runtime using thread-sanitizer technology.",
    description: `Go includes a built-in race detector that identifies data races during program execution. A data race occurs when two goroutines access the same variable concurrently and at least one is a write, without proper synchronization. Data races cause undefined behavior — they can corrupt data, cause crashes, or produce different results on each run.

Enable the race detector with the -race flag during testing or execution: go test -race or go run -race. The detector uses thread-sanitizer technology and typically slows execution by 2-10x and uses 5-10x more memory, so it's not recommended for production use.

For backend engineers, running the race detector should be part of your standard development workflow. It catches subtle concurrency bugs that are nearly impossible to find through code review alone. Many production incidents have been traced back to data races that the race detector would have caught.`,
    keyPoints: [
      "Enable with go test -race or go run -race",
      "Detects concurrent unsynchronized read/write access to shared variables",
      "Adds 2-10x overhead — use in testing, not production",
      "Detects races on goroutine creation, channel operations, and sync primitives",
      "Reports the exact file and line number of the conflicting accesses",
      "Race detector is not exhaustive — it finds races that occur during execution",
      "Can be used with CI/CD pipelines to catch races before deployment"
    ],
    codeExamples: [
      {
        title: "Race Detector in Action",
        description: "Identifying and fixing a common data race pattern",
        bad: [
          '// Data race — concurrent map write:',
          'func main() {',
          '    m := make(map[string]int)',
          '',
          '    go func() {',
          '        for i := 0; i < 100; i++ {',
          '            m[fmt.Sprintf("key-%d", i)] = i',
          '        }',
          '    }()',
          '',
          '    for i := 0; i < 100; i++ {',
          '        _ = m[fmt.Sprintf("key-%d", i)]',
          '    }',
          '}',
          '',
          '// go test -race reports:',
          '// WARNING: DATA WRITE at main.go:8',
          '// Previous read at main.go:12',
          '// Goroutine 3 running at:',
          '// ...',
          '// Goroutine 4 running at:',
          '// ...',
        ].join('\n'),
        good: [
          '// Fixed with mutex:',
          'func main() {',
          '    var mu sync.RWMutex',
          '    m := make(map[string]int)',
          '',
          '    go func() {',
          '        for i := 0; i < 100; i++ {',
          '            mu.Lock()',
          '            m[fmt.Sprintf("key-%d", i)] = i',
          '            mu.Unlock()',
          '        }',
          '    }()',
          '',
          '    for i := 0; i < 100; i++ {',
          '        mu.RLock()',
          '        _ = m[fmt.Sprintf("key-%d", i)]',
          '        mu.RUnlock()',
          '    }',
          '}',
          '',
          '// Or using sync.Map for concurrent-safe maps:',
          'func main() {',
          '    var m sync.Map',
          '',
          '    go func() {',
          '        for i := 0; i < 100; i++ {',
          '            m.Store(fmt.Sprintf("key-%d", i), i)',
          '        }',
          '    }()',
          '',
          '    for i := 0; i < 100; i++ {',
          '        _, _ = m.Load(fmt.Sprintf("key-%d", i))',
          '    }',
          '}',
        ].join('\n'),
        explanation: "The race detector catches the concurrent map read/write. The fix uses a RWMutex to synchronize access. For simpler concurrent map patterns, sync.Map provides a built-in concurrent-safe alternative."
      }
    ],
    bestPractices: [
      "Run go test -race in your CI/CD pipeline on every commit",
      "Fix all reported races — they cause undefined behavior",
      "Use the race detector during development and testing, not in production",
      "Remember the detector only finds races that actually execute during the run",
      "Combine with go vet and golangci-lint for comprehensive static analysis"
    ],
    commonMistakes: [
      "Ignoring race detector warnings as false positives — they are real races",
      "Not running -race in CI, allowing races to reach production",
      "Assuming the race detector catches all races — it only catches executed ones",
      "Using -race in production builds, causing unacceptable performance overhead"
    ],
    relatedTopics: [
      "race-detector",
      "mutexes",
      "sync-package"
    ],
    externalResources: [
      { title: "Go Blog: Race Detector", url: "https://go.dev/blog/race-detector" },
      { title: "Go Doc: Race detector", url: "https://go.dev/doc/articles/race_detector" },
      { title: "Go Wiki: Running go tool race", url: "https://github.com/golang/go/wiki/Race-Detector" }
    ]
  },

  "race-detector": {
    slug: "race-detector",
    title: "Race Detector",
    summary: "The race detector tool catches data races during testing and provides detailed diagnostics.",
    description: `The race detector is Go's built-in tool for finding data races. When enabled with -race, it instruments the compiled binary to track all memory accesses and synchronization operations. If it detects an unsynchronized concurrent access, it reports the exact locations of the conflicting operations.

The race detector uses a happens-before analysis to determine if accesses are properly synchronized. It understands channel operations, mutex lock/unlock pairs, sync.WaitGroup calls, and other synchronization primitives. If no happens-before relationship exists between a read and write from different goroutines, it reports a race.

For backend engineers, the race detector is an indispensable debugging tool. Data races are notoriously difficult to reproduce and diagnose manually. The race detector provides precise file and line information for both conflicting accesses, making fixes straightforward.`,
    keyPoints: [
      "Invoked via go test -race, go run -race, or go build -race",
      "Reports both access locations (the read and the write)",
      "Understands happens-before relationships from channels, mutexes, WaitGroups",
      "Overhead: 2-10x slowdown, 5-10x memory increase",
      "Not suitable for production — use in testing and development only",
      "Catches races on global variables, goroutine-shared structs, and channel ops",
      "Can detect races in third-party dependencies during integration testing"
    ],
    codeExamples: [
      {
        title: "Race Detector Diagnostics",
        description: "Reading and interpreting race detector output",
        bad: [
          '// Race in a web handler — subtle and dangerous:',
          'var requestCount int',
          '',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    requestCount++ // DATA RACE with other handlers!',
          '    fmt.Fprintf(w, "Request %d", requestCount)',
          '}',
          '',
          '// Race detector output:',
          '==================',
          'WARNING: DATA RACE',
          'Write at 0x00000064a1c0 by goroutine 7:',
          '  main.handler()',
          '      /app/main.go:12 +0x4a',
          '',
          'Previous write at 0x00000064a1c0 by goroutine 6:',
          '  main.handler()',
          '      /app/main.go:12 +0x4a',
          '==================',
        ].join('\n'),
        good: [
          '// Fixed with atomic counter:',
          'var requestCount atomic.Int64',
          '',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    count := requestCount.Add(1)',
          '    fmt.Fprintf(w, "Request %d", count)',
          '}',
          '',
          '// Or fixed with mutex:',
          'var (',
          '    mu           sync.Mutex',
          '    requestCount int',
          ')',
          '',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    mu.Lock()',
          '    requestCount++',
          '    count := requestCount',
          '    mu.Unlock()',
          '    fmt.Fprintf(w, "Request %d", count)',
          '}',
          '',
          '// Or using sync/atomic for simple counters:',
          'var requestCount atomic.Uint64',
          '',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    count := requestCount.Add(1)',
          '    fmt.Fprintf(w, "Request %d", count)',
          '}',
        ].join('\n'),
        explanation: "The race detector identifies the exact lines where the concurrent write happens. For simple counters, sync/atomic is the most efficient fix. For more complex shared state, use a mutex. Both approaches establish the happens-before relationship the race detector requires."
      }
    ],
    bestPractices: [
      "Integrate -race into your CI pipeline with go test -race ./...",
      "Treat every race detector report as a real bug to fix",
      "Use atomic operations for simple counters and flags",
      "Use mutexes for complex shared state protection",
      "Run tests with -race to exercise concurrent code paths"
    ],
    commonMistakes: [
      "Assuming the race detector is slow enough to skip in CI — it's worth the wait",
      "Fixing the symptom (suppressing the report) instead of the root cause",
      "Not testing concurrent code paths, so the detector never sees the race",
      "Using atomic operations for complex structures where mutex is more appropriate"
    ],
    relatedTopics: [
      "race-detection",
      "mutexes",
      "sync-package"
    ],
    externalResources: [
      { title: "Go Blog: Race Detector", url: "https://go.dev/blog/race-detector" },
      { title: "Go Doc: sync/atomic", url: "https://pkg.go.dev/sync/atomic" },
      { title: "Go Wiki: Race Detector", url: "https://github.com/golang/go/wiki/Race-Detector" }
    ]
  },

  "common-usecases": {
    slug: "common-usecases",
    title: "Common Use Cases",
    summary: "Real-world patterns where Go's concurrency primitives shine in production backend systems.",
    description: `Go's concurrency primitives — goroutines, channels, mutexes, and the sync package — combine into patterns that solve real-world backend problems. The most common use cases include HTTP request handling with concurrent downstream calls, background job processing, real-time event streaming, rate limiting, circuit breaking, and graceful shutdown.

Each use case benefits from Go's lightweight concurrency model. A web handler can fan out to multiple databases and APIs concurrently, collecting results faster than sequential calls. Background workers process queues with bounded concurrency using worker pools. Rate limiters use channels and time.Ticker to enforce request quotas.

For backend engineers, recognizing which concurrency pattern fits each use case is a core skill. The wrong pattern can lead to deadlocks, race conditions, or resource exhaustion. Understanding these common patterns provides a toolkit for building reliable, high-performance services.`,
    keyPoints: [
      "HTTP handlers: fan out to multiple services concurrently, collect results",
      "Background workers: worker pools processing from job queues",
      "Rate limiting: time.Ticker combined with channels or semaphores",
      "Graceful shutdown: context cancellation propagating through goroutine trees",
      "Health checks: concurrent probes with timeout via select",
      "WebSocket fan-out: broadcast messages to connected clients via channels",
      "Circuit breakers: state machines protecting downstream services from cascading failures"
    ],
    codeExamples: [
      {
        title: "Concurrent HTTP Handler with Fan-Out",
        description: "Fetching data from multiple services concurrently in an HTTP handler",
        bad: [
          '// Sequential fetching — slow:',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    user := fetchUser(r.Context(), userID)',
          '    orders := fetchOrders(r.Context(), userID)',
          '    recommendations := fetchRecommendations(r.Context(), userID)',
          '    // Total latency = sum of all three calls',
          '',
          '    respond(w, combine(user, orders, recommendations))',
          '}',
        ].join('\n'),
        good: [
          '// Concurrent fetching with error collection:',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    type result struct {',
          '        data any',
          '        err  error',
          '    }',
          '',
          '    ctx := r.Context()',
          '    ch := make(chan result, 3)',
          '',
          '    go func() {',
          '        data, err := fetchUser(ctx, userID)',
          '        ch <- result{data, err}',
          '    }()',
          '    go func() {',
          '        data, err := fetchOrders(ctx, userID)',
          '        ch <- result{data, err}',
          '    }()',
          '    go func() {',
          '        data, err := fetchRecommendations(ctx, userID)',
          '        ch <- result{data, err}',
          '    }()',
          '',
          '    var user, orders, recs any',
          '    for i := 0; i < 3; i++ {',
          '        r := <-ch',
          '        if r.err != nil {',
          '            http.Error(w, "Service error", 502)',
          '            return',
          '        }',
          '        switch i {',
          '        case 0: user = r.data',
          '        case 1: orders = r.data',
          '        case 2: recs = r.data',
          '        }',
          '    }',
          '    respond(w, combine(user, orders, recs))',
          '}',
        ].join('\n'),
        explanation: "The concurrent handler fetches from all three services in parallel, reducing total latency to the slowest single call instead of the sum. The buffered channel with capacity 3 allows all goroutines to send without blocking."
      }
    ],
    bestPractices: [
      "Use context.Context for cancellation and timeout in all concurrent handlers",
      "Limit concurrency with semaphores to prevent overwhelming downstream services",
      "Implement circuit breakers to protect against cascading failures",
      "Use worker pools for background job processing, not unbounded goroutines",
      "Test concurrent code paths with go test -race to catch data races"
    ],
    commonMistakes: [
      "Not using context cancellation, leading to goroutine leaks when clients disconnect",
      "Ignoring errors from concurrent goroutines, causing silent data loss",
      "Using unbounded concurrency without resource limits",
      "Not implementing graceful shutdown, causing in-flight requests to be dropped"
    ],
    relatedTopics: [
      "concurrency-patterns",
      "fan-out",
      "worker-pools",
      "context-package"
    ],
    externalResources: [
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/talks/2012/concurrency.slide" },
      { title: "Go Blog: Advanced Concurrency Patterns", url: "https://go.dev/blog/io-piping" },
      { title: "Go Blog: Context", url: "https://go.dev/blog/context" }
    ]
  },

  "context-package": {
    slug: "context-package",
    title: "Context Package",
    summary: "context.Context carries deadlines, cancellation signals, and request-scoped values across goroutines.",
    description: `The context package provides a mechanism for passing request-scoped data, cancellation signals, and deadlines across API boundaries and goroutine trees. A context.Context is created from the parent context and forms a tree structure — canceling a parent context automatically cancels all its children.

Context is the standard way to handle timeouts and cancellation in Go. When a client disconnects or a deadline passes, the context is canceled, and all goroutines monitoring ctx.Done() can clean up and exit. This prevents goroutine leaks and wasted resources.

For backend engineers, context is pervasive. Every HTTP handler receives a context via the request, and it should be passed to all downstream operations — database queries, API calls, and goroutine work. Proper context usage is essential for building responsive, resource-efficient services.`,
    keyPoints: [
      "context.Background() creates the root context for initialization",
      "context.WithCancel returns a context and cancel function",
      "context.WithTimeout/WithDeadline add time-based cancellation",
      "context.WithValue carries request-scoped key-value data",
      "ctx.Done() returns a channel that is closed when the context is canceled",
      "ctx.Err() returns nil if not canceled, or Canceled/DeadlineExceeded",
      "Always pass context as the first parameter to functions",
      "Never store contexts in structs — pass them through function parameters"
    ],
    codeExamples: [
      {
        title: "Context for Timeouts and Cancellation",
        description: "Using context to implement request timeouts and graceful cancellation",
        bad: [
          '// No timeout — can hang forever:',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    data := fetchFromDatabase(r.URL.Query().Get("id"))',
          '    // If database is slow, this handler blocks indefinitely',
          '    // Server runs out of goroutines under load',
          '    respond(w, data)',
          '}',
        ].join('\n'),
        good: [
          '// Context with timeout — responsive under all conditions:',
          'func handler(w http.ResponseWriter, r *http.Request) {',
          '    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)',
          '    defer cancel()',
          '',
          '    data, err := fetchFromDatabase(ctx, r.URL.Query().Get("id"))',
          '    if err != nil {',
          '        if errors.Is(err, context.DeadlineExceeded) {',
          '            http.Error(w, "Request timeout", 504)',
          '            return',
          '        }',
          '        http.Error(w, "Internal error", 500)',
          '        return',
          '    }',
          '    respond(w, data)',
          '}',
          '',
          '// Passing context through layers:',
          'func fetchFromDatabase(ctx context.Context, id string) (*Data, error) {',
          '    query := "SELECT * FROM data WHERE id = $1"',
          '    var result Data',
          '    err := db.QueryRowContext(ctx, query, id).Scan(&result.Value)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("query data %s: %w", id, err)',
          '    }',
          '    return &result, nil',
          '}',
        ].join('\n'),
        explanation: "context.WithTimeout ensures the handler responds within 5 seconds even if the database is slow. The defer cancel() releases resources when the function returns. context.DeadlineExceeded allows returning a 504 Gateway Timeout to the client."
      }
    ],
    bestPractices: [
      "Pass context as the first parameter to all functions that need it",
      "Always call cancel() via defer to release resources",
      "Use context.WithTimeout for operations that must complete within a deadline",
      "Check ctx.Done() in goroutines to respond to cancellation promptly",
      "Use context.WithValue sparingly — prefer function parameters for most data"
    ],
    commonMistakes: [
      "Not calling cancel(), causing context resource leaks",
      "Storing context in a struct instead of passing it as a parameter",
      "Using context.WithValue for data that should be function parameters",
      "Ignoring ctx.Done() in long-running goroutines, causing resource leaks"
    ],
    relatedTopics: [
      "deadlines--cancellations",
      "goroutines",
      "select-statement"
    ],
    externalResources: [
      { title: "Go Blog: Context", url: "https://go.dev/blog/context" },
      { title: "Go Doc: context package", url: "https://pkg.go.dev/context" },
      { title: "Go Blog: Concurrency Patterns", url: "https://go.dev/blog/pipelines" }
    ]
  },

  "deadlines--cancellations": {
    slug: "deadlines--cancellations",
    title: "Deadlines and Cancellations",
    summary: "Context deadlines and cancellations propagate through goroutine trees to prevent wasted work.",
    description: `Deadlines and cancellations are mechanisms for telling goroutines to stop working. When a client disconnects, a request takes too long, or a system is shutting down, you need a way to signal all affected goroutines to clean up and exit. Context provides this through its deadline and cancellation features.

A deadline sets a maximum time for an operation. After the deadline passes, the context is automatically canceled, and all goroutines monitoring ctx.Done() receive the signal. Cancellation is manual — you call the cancel function to immediately terminate the context, regardless of any deadline.

For backend engineers, proper deadline and cancellation handling prevents goroutine leaks, reduces resource waste, and ensures responsive systems. Every long-running operation should check for context cancellation, and every HTTP handler should respect the client's context.`,
    keyPoints: [
      "context.WithDeadline sets an absolute time for cancellation",
      "context.WithTimeout is a convenience for relative timeouts (duration from now)",
      "context.WithCancel provides manual cancellation via the returned cancel function",
      "ctx.Done() returns a channel that closes when the context is canceled",
      "ctx.Err() returns context.Canceled or context.DeadlineExceeded",
      "Canceling a parent context cancels all derived child contexts",
      "defer cancel() is essential — it releases resources even when the operation succeeds",
      "A canceled context should cause goroutines to return early from their work"
    ],
    codeExamples: [
      {
        title: "Graceful Shutdown with Context Cancellation",
        description: "Shutting down a server and all in-flight goroutines gracefully",
        bad: [
          '// No graceful shutdown — in-flight work is lost:',
          'func main() {',
          '    http.HandleFunc("/process", processHandler)',
          '    log.Fatal(http.ListenAndServe(":8080", nil))',
          '}',
          '',
          '// Ctrl+C kills all goroutines mid-processing',
        ].join('\n'),
        good: [
          '// Graceful shutdown with context:',
          'func main() {',
          '    ctx, cancel := context.WithCancel(context.Background())',
          '    defer cancel()',
          '',
          '    srv := &http.Server{Addr: ":8080"}',
          '    http.HandleFunc("/process", processHandler)',
          '',
          '    go func() {',
          '        sigCh := make(chan os.Signal, 1)',
          '        signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)',
          '        <-sigCh',
          '        log.Println("Shutting down...")',
          '        cancel() // signal all goroutines to stop',
          '        srv.Shutdown(context.Background())',
          '    }()',
          '',
          '    log.Println("Server started on :8080")',
          '    if err := srv.ListenAndServe(); err != http.ErrServerClosed {',
          '        log.Fatal(err)',
          '    }',
          '}',
          '',
          '// Handler that respects cancellation:',
          'func processHandler(w http.ResponseWriter, r *http.Request) {',
          '    ctx := r.Context()',
          '    result, err := longRunningOperation(ctx)',
          '    if err != nil {',
          '        if errors.Is(err, context.Canceled) {',
          '            log.Println("Request canceled by client")',
          '            return',
          '        }',
          '        http.Error(w, err.Error(), 500)',
          '        return',
          '    }',
          '    respond(w, result)',
          '}',
        ].join('\n'),
        explanation: "When SIGINT/SIGTERM is received, cancel() signals all goroutines monitoring ctx.Done() to stop. The server shuts down gracefully, finishing in-flight requests before exiting. The handler checks for context.Canceled to distinguish client disconnects from real errors."
      }
    ],
    bestPractices: [
      "Always defer cancel() after creating a derived context",
      "Check ctx.Done() in long-running goroutine loops using select",
      "Return context.Canceled or context.DeadlineExceeded errors to callers",
      "Use context.WithTimeout for HTTP client requests and database queries",
      "Implement graceful shutdown in main() to drain in-flight requests"
    ],
    commonMistakes: [
      "Not calling cancel(), leaking context resources",
      "Ignoring ctx.Done() in goroutines that loop or do I/O",
      "Returning a generic error instead of the context error when context is canceled",
      "Creating context.Background() in handlers instead of using the request's context"
    ],
    relatedTopics: [
      "context-package",
      "select-statement",
      "goroutines"
    ],
    externalResources: [
      { title: "Go Blog: Context", url: "https://go.dev/blog/context" },
      { title: "Go Doc: context package", url: "https://pkg.go.dev/context" },
      { title: "Go Blog: Graceful shutdown", url: "https://go.dev/blog/server" }
    ]
  },

  "iterating-strings": {
    slug: "iterating-strings",
    title: "Iterating Strings",
    summary: "Go strings are UTF-8 byte sequences — range loops iterate runes, not bytes.",
    description: `In Go, strings are immutable sequences of bytes, typically encoded in UTF-8. When you range over a string with for i, ch := range str, the loop iterates over runes (Unicode code points), not bytes. The index i is the byte position, and ch is the rune value. This distinction is critical for correctly processing internationalized text.

The range loop handles multi-byte UTF-8 characters automatically. For example, the Chinese character "世" takes 3 bytes in UTF-8. When ranging, i will be 0 and ch will be the rune value 0x4E16. The next iteration starts at i=3, skipping the 3-byte character correctly.

For backend engineers, understanding string iteration is essential for building services that handle international text, validate input lengths, truncate strings safely, and process data from diverse sources. Incorrectly treating strings as byte slices can cause crashes, data corruption, and security vulnerabilities.`,
    keyPoints: [
      "Go strings are UTF-8 encoded byte sequences",
      "for i, ch := range str iterates over runes, not bytes",
      "i is the byte index, ch is the rune (Unicode code point)",
      "len(str) returns the byte length, not the character count",
      "Use utf8.RuneCountInString() to count actual characters",
      "Accessing str[i] returns a byte, not a character",
      "String slicing with str[i:j] operates on bytes — can split multi-byte characters",
      "Use utf8.DecodeRuneInString() for manual rune-by-rune iteration"
    ],
    codeExamples: [
      {
        title: "Correct String Iteration",
        description: "Handling multi-byte UTF-8 characters properly",
        bad: [
          '// Treating string as bytes — breaks multi-byte characters:',
          'func truncate(s string, maxLen int) string {',
          '    if len(s) > maxLen {',
          '        return s[:maxLen] // Cuts in the middle of a rune!',
          '    }',
          '    return s',
          '}',
          '',
          '// truncate("Hello世界", 7) returns "Hello世" — broken UTF-8!',
          '// The "界" character is 3 bytes, so byte index 7 is mid-character',
        ].join('\n'),
        good: [
          '// Safe truncation using range:',
          'func truncate(s string, maxLen int) string {',
          '    if maxLen <= 0 {',
          '        return ""',
          '    }',
          '    count := 0',
          '    for i := range s {',
          '        count++',
          '        if count > maxLen {',
          '            return s[:i]',
          '        }',
          '    }',
          '    return s',
          '}',
          '',
          '// Safe truncation using utf8 package:',
          'func truncateSafe(s string, maxRunes int) string {',
          '    var buf strings.Builder',
          '    count := 0',
          '    for _, r := range s {',
          '        if count >= maxRunes {',
          '            break',
          '        }',
          '        buf.WriteRune(r)',
          '        count++',
          '    }',
          '    return buf.String()',
          '}',
          '',
          '// Counting actual characters:',
          'func charCount(s string) int {',
          '    return utf8.RuneCountInString(s)',
          '}',
          '',
          '// "Hello世界" → len = 11 bytes, RuneCountInString = 7 characters',
        ].join('\n'),
        explanation: "The bad example uses byte-based slicing (s[:maxLen]) which can cut in the middle of a multi-byte UTF-8 character, producing invalid UTF-8. The good examples iterate using range (which yields complete runes) or use utf8.RuneCountInString for accurate character counting."
      }
    ],
    bestPractices: [
      "Always use range to iterate over strings when you need character-level access",
      "Use utf8.RuneCountInString() instead of len() for character count",
      "Never slice strings at arbitrary byte positions — use rune boundaries",
      "Use strings.Builder for efficient string construction in loops",
      "Be aware that rune comparison uses Unicode code points, not bytes"
    ],
    commonMistakes: [
      "Using len() to count characters instead of utf8.RuneCountInString()",
      "Slicing strings with byte indices that split multi-byte UTF-8 sequences",
      "Comparing runes with bytes using str[i] instead of ranging",
      "Assuming each character is one byte (true for ASCII only)",
      "Not handling the byte-vs-rune index distinction when processing string positions"
    ],
    relatedTopics: [
      "structs",
      "error-handling-basics",
      "context-package"
    ],
    externalResources: [
      { title: "Go Blog: Strings, bytes, runes, and characters", url: "https://go.dev/blog/strings" },
      { title: "Go Doc: unicode/utf8", url: "https://pkg.go.dev/unicode/utf8" },
      { title: "Go Spec: For range", url: "https://go.dev/ref/spec#For_range" }
    ]
  },
};
