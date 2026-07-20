import { TopicContent } from "./fundamentals";

export const advancedContent: Record<string, TopicContent> = {
  "generics": {
    slug: "generics",
    title: "Generics in Go",
    summary: "Go 1.18 introduced generics (type parameters) enabling writing reusable, type-safe code without sacrificing performance.",
    description: `Generics allow you to define functions, types, and methods that work with any type while retaining compile-time type safety. Before Go 1.18, developers relied on interface{} (any) and runtime type assertions, which sacrificed both safety and performance. Generics eliminate this trade-off by letting the compiler generate type-specific code at compile time.

Generics matter because they reduce boilerplate significantly. Instead of writing separate implementations for int, string, float64, and every other type, you write one generic version. The compiler ensures type correctness, and the generated code performs identically to hand-written type-specific versions because Go uses stenciling (monomorphization) combined with GC shape stencils for efficiency.

In production, generics are used extensively in utility libraries (slices, maps packages), data structures (trees, heaps, caches), and API handlers. The Go standard library's experimental slices, maps, and cmp packages all leverage generics. Large codebases at companies like Uber and Cloudflare use generics to eliminate hundreds of duplicated helper functions.`,
    keyPoints: [
      "Type parameters are declared with [T any] syntax in function/type signatures",
      "Type constraints are interfaces that define the set of types a type parameter can accept",
      "Go uses a hybrid approach: stenciling for small type sets, dictionary-based for large sets",
      "Generics work with functions, types, methods (on receiver only), and interfaces",
      "The comparable built-in constraint restricts to types supporting == and !=",
      "Type inference allows calling generic functions without explicit type arguments",
      "Generics do not replace interfaces — they serve complementary purposes",
      "Go 1.21 added slices, maps, and cmp packages using generics in the standard library"
    ],
    codeExamples: [
      {
        title: "Generic Function with Type Constraint",
        description: "Writing a type-safe generic function that works across multiple types",
        bad: [
          '// Pre-generics: unsafe and verbose',
          'func contains(items []interface{}, target interface{}) bool {',
          '    for _, item := range items {',
          '        if item == target { // compile error: == not defined for interface{}',
          '            return true',
          '        }',
          '    }',
          '    return false',
          '}',
          '',
          '// Usage requires type assertions and loses type safety',
          'strs := []interface{}{"a", "b", "c"}',
          'found := contains(strs, "a") // works but no compile-time safety',
          'nums := []interface{}{1, 2, 3}',
          'found2 := contains(nums, "x") // compiles but semantically wrong',
        ].join('\n'),
        good: [
          'func contains[T comparable](items []T, target T) bool {',
          '    for _, item := range items {',
          '        if item == target {',
          '            return true',
          '        }',
          '    }',
          '    return false',
          '}',
          '',
          '// Usage is type-safe and concise',
          'found := contains([]string{"a", "b", "c"}, "a")   // true',
          'found2 := contains([]int{1, 2, 3}, 2)              // true',
          '// found3 := contains([]int{1, 2, 3}, "x")         // compile error: type mismatch',
        ].join('\n'),
        explanation: "The generic version uses [T comparable] to constrain T to types supporting equality comparison. This gives full type safety at compile time — you cannot accidentally compare strings with integers. The function body is identical, but the generic version works correctly for any comparable type without runtime type assertions or boxing overhead."
      },
      {
        title: "Generic Data Structure",
        description: "Implementing a generic stack type that works with any element type",
        bad: [
          '// Type-unsafe stack using interface{}',
          'type Stack struct {',
          '    items []interface{}',
          '}',
          '',
          'func (s *Stack) Push(item interface{}) {',
          '    s.items = append(s.items, item)',
          '}',
          '',
          'func (s *Stack) Pop() interface{} {',
          '    if len(s.items) == 0 {',
          '        return nil',
          '    }',
          '    item := s.items[len(s.items)-1]',
          '    s.items = s.items[:len(s.items)-1]',
          '    return item // caller must type-assert: val := s.Pop().(int)',
          '}',
        ].join('\n'),
        good: [
          'type Stack[T any] struct {',
          '    items []T',
          '}',
          '',
          'func (s *Stack[T]) Push(item T) {',
          '    s.items = append(s.items, item)',
          '}',
          '',
          'func (s *Stack[T]) Pop() (T, bool) {',
          '    var zero T',
          '    if len(s.items) == 0 {',
          '        return zero, false',
          '    }',
          '    item := s.items[len(s.items)-1]',
          '    s.items = s.items[:len(s.items)-1]',
          '    return item, true',
          '}',
          '',
          '// Usage',
          'intStack := &Stack[int]{}',
          'intStack.Push(42)',
          'val, ok := intStack.Pop() // val is int, ok is bool',
          '',
          'strStack := &Stack[string]{}',
          'strStack.Push("hello")',
          'sval, _ := strStack.Pop() // sval is string',
        ].join('\n'),
        explanation: "The generic Stack[T any] is parameterized by element type T. Push accepts T directly, Pop returns (T, bool) instead of requiring type assertions. The zero value pattern (var zero T) handles the empty-stack case without returning nil, which wouldn't work for non-pointer types. Each instantiation (Stack[int], Stack[string]) gets its own type-safe implementation."
      }
    ],
    bestPractices: [
      "Use the most specific constraint possible — avoid any when a narrower constraint exists",
      "Prefer type inference to reduce verbosity at call sites",
      "Name type parameters with short, conventional names: T, K, V, E",
      "Use the zero value pattern (var zero T) when you need a default return for empty results",
      "Don't use generics to replace every interface — interfaces are better for polymorphic behavior",
      "Check if a standard library solution (slices.Contains, maps.Keys) already exists before writing your own"
    ],
    commonMistakes: [
      "Over-constraining type parameters with unnecessary interface requirements",
      "Using generics where a simple interface would be more readable and idiomatic",
      "Forgetting that methods cannot introduce new type parameters beyond those on the receiver type",
      "Assuming generics eliminate all runtime costs — complex constraints may use dictionary dispatch",
      "Not understanding that generic functions may have different performance characteristics than hand-specialized code"
    ],
    relatedTopics: [
      "why-generics",
      "generic-functions",
      "type-constraints",
      "generic-types--interfaces"
    ],
    externalResources: [
      { title: "Go Generics Proposal", url: "https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md" },
      { title: "A Tour of Go: Generics", url: "https://go.dev/tour/generics/1" },
      { title: "Go Blog: Getting Familiar with Go Generics", url: "https://go.dev/blog/intro-generics" }
    ]
  },

  "why-generics": {
    slug: "why-generics",
    title: "Why Generics Matter in Go",
    summary: "Generics solve the tension between code reuse and type safety that plagued Go codebases for over a decade.",
    description: `Before Go 1.18, Go developers faced a fundamental dilemma: write type-safe code that duplicated logic for each type, or write reusable code using interface{} that sacrificed compile-time safety and required runtime type assertions. This trade-off led to verbose codebases with duplicated helper functions, unsafe type switches, and subtle runtime panics from incorrect type assertions.

Generics matter because they eliminate this dilemma. A single generic function provides both reusability and type safety. The compiler verifies that only compatible types are used, and the generated code performs comparably to hand-written type-specific versions. This means fewer bugs, less code to maintain, and no performance penalty.

In the real world, generics dramatically reduce code in utility packages. Before generics, many Go projects maintained separate FilterInts, FilterStrings, FilterFloats functions. With generics, a single Filter[T any] replaces all of them. The standard library's slices and maps packages (Go 1.21) demonstrate this power — functions like slices.Sort, slices.BinarySearch, and maps.Clone work with any compatible type without sacrificing performance or safety.`,
    keyPoints: [
      "Eliminates the interface{} anti-pattern for type-generic code",
      "Reduces code duplication: one function instead of N type-specific versions",
      "Compile-time type safety catches errors that previously caused runtime panics",
      "Performance matches hand-written specialized code in most cases",
      "Enables type-safe data structures (trees, heaps, caches) without reflection",
      "Reduces the cognitive load of maintaining type-assertion-heavy codebases",
      "Go's approach (constraints + stenciling) balances flexibility with performance"
    ],
    codeExamples: [
      {
        title: "Eliminating Duplicated Filter Functions",
        description: "Before generics, you needed separate functions for each type",
        bad: [
          'func filterInts(nums []int, pred func(int) bool) []int {',
          '    var result []int',
          '    for _, n := range nums {',
          '        if pred(n) {',
          '            result = append(result, n)',
          '        }',
          '    }',
          '    return result',
          '}',
          '',
          'func filterStrings(strs []string, pred func(string) bool) []string {',
          '    var result []string',
          '    for _, s := range strs {',
          '        if pred(s) {',
          '            result = append(result, s)',
          '        }',
          '    }',
          '    return result',
          '}',
          '',
          '// Must duplicate for every type: filterFloats, filterBools, filterUsers...',
        ].join('\n'),
        good: [
          'func Filter[T any](items []T, pred func(T) bool) []T {',
          '    var result []T',
          '    for _, item := range items {',
          '        if pred(item) {',
          '            result = append(result, item)',
          '        }',
          '    }',
          '    return result',
          '}',
          '',
          '// Works for any type with zero duplication',
          'evens := Filter([]int{1, 2, 3, 4}, func(n int) bool { return n%2 == 0 })',
          'shorts := Filter([]string{"a", "bb", "ccc"}, func(s string) bool { return len(s) < 3 })',
        ].join('\n'),
        explanation: "The generic Filter function replaces an infinite number of type-specific filter functions. The type parameter T is inferred from the input slice, so call sites are just as readable. One function body maintains correctness for all types — fixing a bug fixes it everywhere simultaneously."
      }
    ],
    bestPractices: [
      "Start without generics, then refactor to generics when you see duplication across types",
      "Use generics for data structures and algorithms, not to replace every interface",
      "Leverage the standard library's slices and maps packages before writing your own",
      "Keep generic function signatures readable — if they become complex, simplify the design",
      "Consider the readability cost: a simple generic function is clearer than five duplicated ones"
    ],
    commonMistakes: [
      "Prematurely adding generics to code that doesn't need them",
      "Creating overly complex generic types that are harder to understand than concrete alternatives",
      "Assuming generics replace the need for interfaces in dependency injection patterns",
      "Not considering that generics may affect code readability for team members unfamiliar with the pattern"
    ],
    relatedTopics: [
      "generics",
      "type-constraints",
      "generic-functions"
    ],
    externalResources: [
      { title: "Go Blog: Why Generics", url: "https://go.dev/blog/why-generics" },
      { title: "Go Generics FAQ", url: "https://go.dev/doc/faq#generics" },
      { title: "Type Parameters Proposal", url: "https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md" }
    ]
  },

  "generic-types--interfaces": {
    slug: "generic-types--interfaces",
    title: "Generic Types and Interfaces",
    summary: "Generic types let you parameterize structs and interfaces, while constraints (special interfaces) define valid type sets.",
    description: `Generic types extend the concept of type parameters to structs, interfaces, and type aliases. A generic type like OrderedMap[K comparable, V any] defines a blueprint that the compiler instantiates for each concrete type combination used in your program. This enables type-safe collections, result types, and domain-specific containers without runtime overhead.

Interfaces in Go serve a dual purpose with generics: they define both behavioral contracts (traditional interfaces) and type constraints (interfaces used in type parameter positions). A constraint interface lists the methods and types that a type parameter must satisfy. The predeclared any constraint accepts all types, while comparable restricts to types supporting == and !=.

Understanding the distinction between constraint interfaces and regular interfaces is crucial. Constraints are evaluated at compile time — the compiler checks that a concrete type satisfies all requirements before allowing instantiation. Regular interfaces are evaluated at runtime through method sets. This compile-time checking is what makes generic code both safe and efficient.`,
    keyPoints: [
      "Generic types are parameterized with [T Constraint] syntax on structs and interfaces",
      "Constraints are interfaces that enumerate required methods and/or type set elements",
      "The any constraint is equivalent to interface{} and accepts all types",
      "The comparable constraint restricts to types supporting == and !=",
      "Interfaces can embed type constraints to compose complex requirements",
      "Type sets in constraints allow union syntax: int | float64 | string",
      "Generic interfaces define contracts for types that operate on parameterized values",
      "Instantiation happens at compile time — no runtime reflection needed"
    ],
    codeExamples: [
      {
        title: "Generic Type with Constraint Composition",
        description: "Building a generic ordered map with composable constraints",
        bad: [
          '// No type safety: any key/value pair works',
          'type OrderedMap struct {',
          '    keys   []interface{}',
          '    values map[interface{}]interface{}',
          '    less   func(interface{}, interface{}) bool',
          '}',
          '',
          '// Error-prone: must type-assert on every access',
          'func (m *OrderedMap) Get(key interface{}) interface{} {',
          '    return m.values[key]',
          '}',
          '',
          '// Usage: val := m.Get("name").(string) // panic if wrong type',
        ].join('\n'),
        good: [
          'type Ordered interface {',
          '    ~int | ~int8 | ~int16 | ~int32 | ~int64',
          '        | ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64',
          '        | ~float32 | ~float64 | ~string',
          '}',
          '',
          'type OrderedMap[K Ordered, V any] struct {',
          '    keys   []K',
          '    values map[K]V',
          '    less   func(K, K) bool',
          '}',
          '',
          'func NewOrderedMap[K Ordered, V any](less func(K, K) bool) *OrderedMap[K, V] {',
          '    return &OrderedMap[K, V]{',
          '        values: make(map[K]V),',
          '        less:   less,',
          '    }',
          '}',
          '',
          'func (m *OrderedMap[K, V]) Get(key K) (V, bool) {',
          '    val, ok := m.values[key]',
          '    return val, ok',
          '}',
          '',
          '// Usage: fully type-safe',
          'm := NewOrderedMap[string, int](func(a, b string) bool { return a < b })',
          'm.Set("alpha", 1)',
          'val, ok := m.Get("alpha") // val is int, ok is bool',
        ].join('\n'),
        explanation: "The Ordered constraint uses type set union syntax to restrict K to ordered types. OrderedMap[K Ordered, V any] is fully type-safe — the compiler prevents using struct keys or mismatched types. The NewOrderedMap constructor uses type inference so callers don't repeat type arguments. The ~int syntax includes types whose underlying type is int, supporting custom int types."
      }
    ],
    bestPractices: [
      "Compose constraints by embedding interfaces rather than duplicating type sets",
      "Use ~T in constraints when you want to include named types based on T",
      "Prefer the comparable built-in over defining your own equality constraint",
      "Design generic types with minimal type parameters — only parameterize what varies",
      "Document constraint requirements clearly since complex constraints can be hard to read"
    ],
    commonMistakes: [
      "Confusing interface constraints with interface satisfaction (compile-time vs runtime)",
      "Using any when a more specific constraint would catch bugs earlier",
      "Not realizing that comparable includes slices and maps (they panic on == at runtime)",
      "Creating constraints so complex they become harder to satisfy than writing concrete types"
    ],
    relatedTopics: [
      "generics",
      "type-constraints",
      "generic-functions"
    ],
    externalResources: [
      { title: "Go Specification: Type Constraints", url: "https://go.dev/ref/spec#Type_constraints" },
      { title: "Go Blog: Generics Tutorial", url: "https://go.dev/blog/tutorial-generics" },
      { title: "Go Proposal: Type Sets", url: "https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md#type-sets" }
    ]
  },

  "generic-functions": {
    slug: "generic-functions",
    title: "Generic Functions in Go",
    summary: "Generic functions accept type parameters, enabling single implementations that work correctly across many concrete types.",
    description: `Generic functions are the most common use of type parameters in Go. A generic function declares one or more type parameters in square brackets before the function name, and the compiler infers or verifies the concrete types at each call site. This eliminates the need to duplicate logic for different types while maintaining full compile-time type safety.

Type inference is a key feature that makes generic functions ergonomic. When you call Max(3, 5), Go infers T = int from the arguments. You only need explicit type arguments when inference is ambiguous — such as when calling a function with no arguments or when the types need disambiguation. The compiler uses a sophisticated unification algorithm to determine type parameter values.

In production, generic functions are used for utility operations (min, max, contains, filter, map), data transformations, comparison functions, and error handling patterns like Result[T] or Option[T]. The standard library's slices.Sort, slices.BinarySearch, and cmp.Compare are prime examples of well-designed generic functions.`,
    keyPoints: [
      "Type parameters are declared in square brackets: func F[T Constraint](x T) T",
      "Go infers type arguments from function arguments when possible",
      "Multiple type parameters are comma-separated: func Merge[K comparable, V any]",
      "Type parameters can appear in arguments, return types, and function bodies",
      "Generic functions cannot have additional type parameters beyond the declared ones",
      "The compiler generates specialized code for each concrete type used at call sites",
      "Explicit type arguments are required when inference fails: Make[int](0, 1, 2)",
      "Generic methods cannot introduce new type parameters beyond those on the receiver type"
    ],
    codeExamples: [
      {
        title: "Type Inference and Explicit Arguments",
        description: "Demonstrating when Go can infer types and when you must specify them",
        bad: [
          '// Must always specify types — verbose and repetitive',
          'func MinInt(a, b int) int {',
          '    if a < b { return a }',
          '    return b',
          '}',
          '',
          'func MinFloat64(a, b float64) float64 {',
          '    if a < b { return a }',
          '    return b',
          '}',
          '',
          'func MinString(a, b string) string {',
          '    if a < b { return a }',
          '    return b',
          '}',
          '// Three functions with identical logic for three types',
        ].join('\n'),
        good: [
          'type Ordered interface {',
          '    ~int | ~int8 | ~int16 | ~int32 | ~int64',
          '        | ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64',
          '        | ~float32 | ~float64 | ~string',
          '}',
          '',
          'func Min[T Ordered](a, b T) T {',
          '    if a < b {',
          '        return a',
          '    }',
          '    return b',
          '}',
          '',
          '// Type inferred from arguments',
          'x := Min(3, 7)           // T = int',
          'y := Min("a", "z")      // T = string',
          'z := Min(1.5, 2.3)      // T = float64',
          '',
          '// Explicit type arguments when needed',
          'type Kelvin float64',
          'var temp Kelvin = 300.0',
          'result := Min[Kelvin](temp, Kelvin(280)) // explicit for custom type',
        ].join('\n'),
        explanation: "A single generic Min function replaces three (or more) type-specific functions. Type inference handles common cases automatically — Min(3, 7) infers T = int. For custom named types like Kelvin, you may need explicit type arguments. The ~float64 in the constraint includes Kelvin since its underlying type is float64."
      },
      {
        title: "Multi-Parameter Generic Functions",
        description: "Functions with multiple type parameters for key-value operations",
        bad: [
          '// Separate functions for each key-value combination',
          'func KeysStringInt(m map[string]int) []string {',
          '    keys := make([]string, 0, len(m))',
          '    for k := range m {',
          '        keys = append(keys, k)',
          '    }',
          '    return keys',
          '}',
          '',
          'func KeysIntString(m map[int]string) []int {',
          '    keys := make([]int, 0, len(m))',
          '    for k := range m {',
          '        keys = append(keys, k)',
          '    }',
          '    return keys',
          '}',
        ].join('\n'),
        good: [
          'func Keys[K comparable, V any](m map[K]V) []K {',
          '    keys := make([]K, 0, len(m))',
          '    for k := range m {',
          '        keys = append(keys, k)',
          '    }',
          '    return keys',
          '}',
          '',
          'func Values[K comparable, V any](m map[K]V) []V {',
          '    vals := make([]V, 0, len(m))',
          '    for _, v := range m {',
          '        vals = append(vals, v)',
          '    }',
          '    return vals',
          '}',
          '',
          '// Usage',
          'scores := map[string]int{"alice": 95, "bob": 87}',
          'names := Keys(scores)   // []string{"alice", "bob"}',
          'pts := Values(scores)   // []int{95, 87}',
          '',
          'lookup := map[int]string{1: "one", 2: "two"}',
          'ids := Keys(lookup)     // []int{1, 2}',
        ].join('\n'),
        explanation: "Keys[K comparable, V any] uses two type parameters — K must support map keys (comparable), V has no constraints. The compiler infers both types from the map argument. One function body handles all key-value type combinations. The comparable constraint on K is required because map keys must support equality."
      }
    ],
    bestPractices: [
      "Let type inference do the work — only use explicit type arguments when necessary",
      "Keep generic functions focused: one clear purpose per function",
      "Use the comparable constraint for map keys and equality comparisons",
      "Write benchmarks when performance matters to verify generic vs concrete performance",
      "Name type parameters meaningfully for complex signatures: T for primary, K/V for maps"
    ],
    commonMistakes: [
      "Forgetting that any includes slices and maps, which cannot be compared with ==",
      "Using too many type parameters, making function signatures hard to read",
      "Not realizing generic methods cannot have their own type parameters beyond the receiver",
      "Assuming type inference always works — sometimes explicit arguments improve clarity"
    ],
    relatedTopics: [
      "generics",
      "type-constraints",
      "generic-types--interfaces"
    ],
    externalResources: [
      { title: "A Tour of Go: Generic Functions", url: "https://go.dev/tour/generics/2" },
      { title: "Go Specification: Function Types", url: "https://go.dev/ref/spec#Function_types" },
      { title: "Go Blog: Getting Familiar with Go Generics", url: "https://go.dev/blog/intro-generics" }
    ]
  },

  "type-constraints": {
    slug: "type-constraints",
    title: "Type Constraints",
    summary: "Type constraints are interfaces that define the set of types a type parameter can accept, combining methods and type sets.",
    description: `Type constraints are the mechanism that makes Go generics type-safe. A constraint is an interface that specifies what operations and types a type parameter supports. Constraints can require methods (like String() string), specify type sets using union syntax (int | string | float64), or combine both. The compiler enforces these constraints at instantiation time.

Go's constraint system is more expressive than generics in many other languages. Type sets allow you to specify exactly which concrete types are permitted, not just which methods they must implement. The ~ operator in type sets includes all types whose underlying type matches, enabling support for custom named types. For example, ~int | ~float64 accepts int, float64, MyInt, MyFloat, etc.

The standard library provides two built-in constraints: any (accepts all types) and comparable (accepts types supporting == and !=). For ordered comparisons, you typically define your own Ordered constraint using the union of all built-in ordered types. Understanding when to use each constraint level is key to writing idiomatic generic Go code.`,
    keyPoints: [
      "Constraints are interfaces — they can require methods and/or specify type sets",
      "any accepts all types (alias for interface{})",
      "comparable accepts types supporting == and != (includes structs, excludes slices/maps)",
      "Type set union syntax: int | float64 | string",
      "The ~ operator includes types with the given underlying type: ~int includes type MyInt int",
      "Constraints can embed other constraints to compose requirements",
      "Method requirements in constraints work identically to regular interface satisfaction",
      "Go 1.21 added cmp.Ordered constraint to the standard library"
    ],
    codeExamples: [
      {
        title: "Building Composable Constraints",
        description: "Creating layered constraints that combine method and type set requirements",
        bad: [
          '// Overly broad: no type safety at all',
          'func Serialize[T any](v T) string {',
          '    // Must use reflection or type switches at runtime',
          '    switch val := any(v).(type) {',
          '    case int:',
          '        return strconv.Itoa(val)',
          '    case string:',
          '        return val',
          '    default:',
          '        return fmt.Sprintf("%v", val)',
          '    }',
          '}',
          '',
          '// Too restrictive: excludes custom types',
          'func Sum[T int | float64](nums []T) T {',
          '    var total T',
          '    for _, n := range nums {',
          '        total += n',
          '    }',
          '    return total',
          '}',
          '// Sum([]MyInt{1,2,3}) fails because MyInt is not in the type set',
        ].join('\n'),
        good: [
          'type Stringer interface {',
          '    String() string',
          '}',
          '',
          'type Numeric interface {',
          '    ~int | ~int8 | ~int16 | ~int32 | ~int64',
          '        | ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64',
          '        | ~float32 | ~float64',
          '}',
          '',
          '// ~ includes custom named types',
          'func Sum[T Numeric](nums []T) T {',
          '    var total T',
          '    for _, n := range nums {',
          '        total += n',
          '    }',
          '    return total',
          '}',
          '',
          '// Compose constraints by embedding',
          'type PrintableNumeric interface {',
          '    Numeric',
          '    Stringer',
          '}',
          '',
          'type Money float64',
          '',
          'func (m Money) String() string {',
          '    return fmt.Sprintf("$%.2f", float64(m))',
          '}',
          '',
          '// Works with Money because it satisfies both Numeric and Stringer',
          'func FormatTotal[T PrintableNumeric](items []T) string {',
          '    total := Sum(items)',
          '    return total.String()',
          '}',
        ].join('\n'),
        explanation: "The Numeric constraint uses ~ to include custom named types like Money. PrintableNumeric composes two constraints by embedding Numeric and Stringer, requiring both numeric operations and a String method. This layered approach lets you express precise requirements. Sum is usable standalone with any numeric type, while FormatTotal adds the string formatting requirement."
      }
    ],
    bestPractices: [
      "Define reusable constraints as named interfaces in a constraints or cmp package",
      "Use ~ when you want to support custom named types based on built-in types",
      "Start with any and narrow constraints only when you need specific operations",
      "Prefer comparable over custom equality constraints for == and !=",
      "Use cmp.Ordered from Go 1.21+ instead of defining your own Ordered constraint"
    ],
    commonMistakes: [
      "Using comparable on slices or maps — they panic at runtime with ==",
      "Forgetting ~ and accidentally excluding named types like type UserID int64",
      "Creating constraints with too many types, making the API confusing",
      "Not realizing that constraint satisfaction is checked at compile time, not runtime"
    ],
    relatedTopics: [
      "generics",
      "generic-functions",
      "generic-types--interfaces"
    ],
    externalResources: [
      { title: "Go Specification: Type Constraints", url: "https://go.dev/ref/spec#Type_constraints" },
      { title: "Go Blog: Comparing Semantic Version Packages", url: "https://go.dev/blog/compare" },
      { title: "Go 1.21 cmp Package", url: "https://pkg.go.dev/cmp" }
    ]
  },

  "with-maps--slices": {
    slug: "with-maps--slices",
    title: "Generics with Maps and Slices",
    summary: "The standard library slices and maps packages provide type-safe generic operations replacing hundreds of duplicated helper functions.",
    description: `Go 1.21 introduced the slices and maps packages in the standard library, providing generic functions for common slice and map operations. These packages replaced the need for third-party libraries like golang.org/x/exp/slices and eliminated the widespread practice of copy-pasting type-specific helper functions throughout codebases.

The slices package offers functions like Sort, BinarySearch, Contains, Compact, Equal, Clone, and Delete — all parameterized to work with any element type. The maps package provides Keys, Values, Clone, Copy, EqualFunc, and DeleteFunc. These functions are not just convenient; they're optimized and tested by the Go team, making them more reliable than hand-rolled alternatives.

In production, these packages significantly reduce code duplication and improve correctness. Before their introduction, many companies maintained internal utility packages with hundreds of lines of duplicated slice helpers. The standard generic versions are now the idiomatic approach, and migrating to them reduces maintenance burden while improving consistency across the Go ecosystem.`,
    keyPoints: [
      "slices.Sort replaces type-specific sort functions for any ordered slice",
      "slices.BinarySearch provides O(log n) search on sorted slices",
      "slices.Contains, slices.Index, slices.Compact replace manual loops",
      "slices.Delete safely removes elements without the common off-by-one errors",
      "maps.Keys and maps.Values extract keys or values from any map",
      "maps.Clone and maps.Copy provide shallow copies for map types",
      "All functions use type parameters for full compile-time type safety",
      "These packages replaced the experimental golang.org/x/exp versions"
    ],
    codeExamples: [
      {
        title: "Using slices and maps Packages",
        description: "Replacing manual loops and helper functions with standard generic utilities",
        bad: [
          '// Manual implementations prone to bugs',
          'func containsString(slice []string, target string) bool {',
          '    for _, s := range slice {',
          '        if s == target {',
          '            return true',
          '        }',
          '    }',
          '    return false',
          '}',
          '',
          'func removeDuplicates(sorted []int) []int {',
          '    if len(sorted) == 0 {',
          '        return sorted',
          '    }',
          '    result := sorted[:1]',
          '    for _, v := range sorted[1:] {',
          '        if v != result[len(result)-1] {',
          '            result = append(result, v)',
          '        }',
          '    }',
          '    return result',
          '}',
          '',
          'func mapKeys(m map[string]int) []string {',
          '    keys := make([]string, 0, len(m))',
          '    for k := range m {',
          '        keys = append(keys, k)',
          '    }',
          '    return keys',
          '}',
        ].join('\n'),
        good: [
          'import (',
          '    "maps"',
          '    "slices"',
          ')',
          '',
          '// Using standard library generic functions',
          'found := slices.Contains([]string{"a", "b", "c"}, "b")  // true',
          '',
          'sorted := []int{1, 1, 2, 3, 3, 3, 4}',
          'unique := slices.Compact(sorted)  // []int{1, 2, 3, 4}',
          '',
          'scores := map[string]int{"alice": 95, "bob": 87}',
          'names := maps.Keys(scores)    // []string{"alice", "bob"}',
          'pts := maps.Values(scores)    // []int{95, 87}',
          '',
          '// Safe deletion during iteration',
          's := []int{1, 2, 3, 4, 5, 6}',
          's = slices.Delete(s, 1, 3)    // removes indices 1,2: []int{1, 4, 5, 6}',
          '',
          '// Map filtering',
          'high := maps.DeleteFunc(scores, func(_ string, v int) bool {',
          '    return v < 90',
          '}) // map[string]int{"alice": 95}',
        ].join('\n'),
        explanation: "The standard library functions replace hand-written helpers with optimized, tested, generic implementations. slices.Delete avoids the common off-by-one error in manual slice deletion. maps.DeleteFunc provides a clean way to filter map entries. These functions are type-safe — the compiler ensures you're using compatible types."
      }
    ],
    bestPractices: [
      "Use slices.Sort instead of sort.Slice when possible — it's more efficient for simple types",
      "Prefer slices.Compact over manual deduplication — it handles edge cases correctly",
      "Use slices.Delete instead of manual slice manipulation to avoid off-by-one errors",
      "Leverage maps.Clone for defensive copying of map arguments",
      "Consider slices.SortFunc with a comparison function for complex sorting criteria",
      "Use maps.Collect and slices.Collect (Go 1.23) for iterator-based conversions"
    ],
    commonMistakes: [
      "Using slices.Sort on a slice that's already sorted — it still works but has overhead",
      "Forgetting that maps.Keys does not guarantee ordering",
      "Using slices.Compact on an unsorted slice — it only removes consecutive duplicates",
      "Not realizing slices.Delete modifies the original slice (use slices.Clone first if needed)"
    ],
    relatedTopics: [
      "generics",
      "generic-functions",
      "why-generics"
    ],
    externalResources: [
      { title: "slices Package", url: "https://pkg.go.dev/slices" },
      { title: "maps Package", url: "https://pkg.go.dev/maps" },
      { title: "Go 1.21 Release Notes", url: "https://go.dev/doc/go1.21" }
    ]
  },

  "reflection": {
    slug: "reflection",
    title: "Reflection in Go",
    summary: "Go's reflect package enables inspecting and manipulating types and values at runtime, but should be used sparingly.",
    description: `Reflection is the ability to examine and modify a program's structure and behavior at runtime. Go provides reflection through the reflect package, which implements the laws of reflection as described by Rob Pike. The reflect package can inspect types, read and set struct fields, call methods dynamically, and work with values when the concrete type is unknown at compile time.

Reflection matters in Go because the language's type system is static, but some problems inherently require runtime type information. Serialization/deserialization (encoding/json, protocol buffers), ORM libraries, dependency injection frameworks, and testing utilities all rely on reflection to bridge compile-time types and runtime behavior. Without reflection, these tools would be impossible to build in Go.

However, reflection comes with significant costs: it's slower than direct type operations (10-100x), harder to read and debug, bypasses compile-time type safety, and can panic unexpectedly. The Go community follows a clear principle: use reflection only when there's no compile-time alternative. With generics now available, many previously reflection-dependent patterns can be rewritten with type-safe generic code.`,
    keyPoints: [
      "reflect.TypeOf returns the reflect.Type interface representing a value's type",
      "reflect.ValueOf returns the reflect.Value struct for reading/modifying a value",
      "Reflection follows two laws: reflection goes from interface value to reflection object and back",
      "You can inspect struct tags, fields, methods, and interfaces at runtime",
      "Setting values requires passing a pointer and calling Elem() to get the settable value",
      "Reflection is 10-100x slower than direct operations — avoid in hot paths",
      "Type switches and type assertions are preferred over reflection when possible",
      "Generics have reduced the need for reflection in many common patterns"
    ],
    codeExamples: [
      {
        title: "Inspecting Struct Tags for Serialization",
        description: "Using reflection to read struct tags — a common legitimate use case",
        bad: [
          '// Hardcoding tag names: fragile and error-prone',
          'func getFieldNameManual(fieldNum int) string {',
          '    switch fieldNum {',
          '    case 0:',
          '        return "name"',
          '    case 1:',
          '        return "email"',
          '    case 2:',
          '        return "age"',
          '    default:',
          '        return ""',
          '    }',
          '}',
          '// Breaks whenever the struct changes',
        ].join('\n'),
        good: [
          'import (',
          '    "fmt"',
          '    "reflect"',
          '    "strings"',
          ')',
          '',
          'type User struct {',
          '    Name  string `json:"name"  db:"user_name"`',
          '    Email string `json:"email" db:"user_email"`',
          '    Age   int    `json:"age"   db:"user_age"`',
          '}',
          '',
          'func fieldTags(v any, tag string) map[string]string {',
          '    result := make(map[string]string)',
          '    val := reflect.ValueOf(v)',
          '    typ := val.Type()',
          '',
          '    if typ.Kind() == reflect.Ptr {',
          '        val = val.Elem()',
          '        typ = val.Type()',
          '    }',
          '',
          '    for i := 0; i < typ.NumField(); i++ {',
          '        field := typ.Field(i)',
          '        tagValue := field.Tag.Get(tag)',
          '        if tagValue != "" {',
          '            result[field.Name] = tagValue',
          '        }',
          '    }',
          '    return result',
          '}',
          '',
          'tags := fieldTags(User{}, "db")',
          'fmt.Println(tags) // map[Age:user_age Email:user_email Name:user_name]',
        ].join('\n'),
        explanation: "Reflection is the only way to read struct tags at runtime — there's no compile-time alternative. The function handles pointer receivers with Elem(), iterates fields with NumField, and reads tags with Tag.Get. This pattern is used by encoding/json, database/sql, and other standard library packages."
      }
    ],
    bestPractices: [
      "Use type switches before falling back to reflection",
      "Cache reflect.Type and reflect.Value when used repeatedly to avoid repeated lookups",
      "Validate inputs early — reflection panics on invalid operations",
      "Use reflect.DeepEqual only in tests — it's slow for production code",
      "Consider generics (Go 1.18+) to replace reflection-based utility functions",
      "Document why reflection is necessary in comments for future maintainers"
    ],
    commonMistakes: [
      "Using reflection when a type switch or generic function would work",
      "Not checking for nil pointers before calling reflect.ValueOf",
      "Forgetting that you can only set values through a pointer: reflect.ValueOf(&x).Elem().Set()",
      "Using reflect.DeepEqual in production code paths (extremely slow)",
      "Not handling the case where reflect.Kind isPtr vs the actual type"
    ],
    relatedTopics: [
      "unsafe-package",
      "generics",
      "memory-management"
    ],
    externalResources: [
      { title: "Go Blog: Laws of Reflection", url: "https://go.dev/blog/laws-of-reflection" },
      { title: "reflect Package Documentation", url: "https://pkg.go.dev/reflect" },
      { title: "Go FAQ: When to Use Reflection", url: "https://go.dev/doc/faq#conversion_vs_reflection" }
    ]
  },

  "unsafe-package": {
    slug: "unsafe-package",
    title: "The unsafe Package",
    summary: "Go's unsafe package bypasses type safety for low-level operations like pointer arithmetic and memory layout control.",
    description: `The unsafe package provides operations that step outside Go's type safety guarantees. It gives access to pointer arithmetic, arbitrary memory addresses, and the internal layout of data structures. The name is deliberate — code using unsafe is not guaranteed to be portable, safe, or compatible across Go versions.

The primary use case for unsafe is interfacing with C code, implementing high-performance data structures that need manual memory control, and accessing unexported struct fields or internal runtime data structures. The unsafe.Pointer type converts to and from any pointer type, enabling conversions that the normal type system prohibits (like converting between *[4]int and *[8]byte).

Despite its power, unsafe should be a last resort. Code using unsafe bypasses the garbage collector's assumptions, can cause memory corruption if misused, breaks Go 1 compatibility promises, and makes code harder to vet and analyze. The Go team recommends exhaustively exploring safer alternatives before resorting to unsafe. When you must use unsafe, isolate it behind well-tested, type-safe APIs.`,
    keyPoints: [
      "unsafe.Pointer is a special pointer type that can be converted to/from any pointer type",
      "Enables pointer arithmetic via uintptr (but avoid keeping uintptr values)",
      "unsafe.Sizeof returns the size in bytes of a variable's type",
      "unsafe.Offsetof returns the byte offset of a struct field from the struct start",
      "unsafe.Alignof returns the alignment requirement of a type",
      "Using unsafe invalidates many Go safety guarantees and compatibility promises",
      "The GC does not track uintptr values — they may be collected prematurely",
      "Go vet and race detector may not catch bugs in unsafe code"
    ],
    codeExamples: [
      {
        title: "Safe Wrapper Around unsafe Operations",
        description: "Using unsafe for performance while maintaining a safe public API",
        bad: [
          '// Directly exposing unsafe in the public API',
          'func StringToBytes(s string) []byte {',
          '    return unsafe.Slice(unsafe.StringData(s), len(s))',
          '}',
          '// No nil check, no length validation, no documentation',
          '// Callers can easily corrupt memory',
        ].join('\n'),
        good: [
          'import "unsafe"',
          '',
          '// StringToBytes converts a string to a byte slice without copying.',
          '// WARNING: The returned slice must not be modified.',
          'func StringToBytes(s string) []byte {',
          '    if s == "" {',
          '        return nil',
          '    }',
          '    return unsafe.Slice(unsafe.StringData(s), len(s))',
          '}',
          '',
          '// BytesToString converts a byte slice to a string without copying.',
          '// WARNING: The input slice must not be modified after this call.',
          'func BytesToString(b []byte) string {',
          '    if len(b) == 0 {',
          '        return ""',
          '    }',
          '    return unsafe.String(unsafe.SliceData(b), len(b))',
          '}',
          '',
          '// Usage (safe: original string never modified)',
          'data := []byte("hello")',
          's := BytesToString(data)',
          'copy := StringToBytes(s) // copy can be modified safely',
          '_ = copy',
        ].join('\n'),
        explanation: "Go 1.20+ provides unsafe.String, unsafe.StringData, unsafe.Slice, and unsafe.SliceData as blessed conversion functions that avoid undefined behavior. The wrapper functions add nil/empty checks, documentation, and clear contracts. The key safety rule: never modify data obtained through zero-copy conversions unless you own the original memory."
      }
    ],
    bestPractices: [
      "Always wrap unsafe operations behind a well-documented, type-safe API",
      "Use Go 1.20+ functions (unsafe.String, unsafe.Slice) instead of raw pointer casts",
      "Never store uintptr values — convert to unsafe.Pointer immediately when needed",
      "Write thorough tests for any code using unsafe, including edge cases",
      "Document safety invariants explicitly: what callers must and must not do",
      "Use go vet and static analysis tools to catch misuse"
    ],
    commonMistakes: [
      "Storing uintptr values that the GC cannot track, leading to use-after-free bugs",
      "Assuming struct layout is stable across Go versions (it is not guaranteed)",
      "Using unsafe when []byte(s) (which copies) is acceptable and safer",
      "Not handling nil slices or empty strings in unsafe conversion functions"
    ],
    relatedTopics: [
      "reflection",
      "memory-management",
      "cgo-basics"
    ],
    externalResources: [
      { title: "unsafe Package Documentation", url: "https://pkg.go.dev/unsafe" },
      { title: "Go Blog: Unsafe Pointers in Three Sketches", url: "https://go.dev/blog/unsafe-pointers-in-three-sketches" },
      { title: "Go Proposal: Add unsafe.String and unsafe.Slice", url: "https://github.com/golang/go/issues/56130" }
    ]
  },

  "cgo-basics": {
    slug: "cgo-basics",
    title: "Cgo Basics",
    summary: "Cgo allows Go programs to call C code and vice versa, enabling interoperability with C libraries and system APIs.",
    description: `Cgo is Go's foreign function interface that enables calling C libraries from Go and exposing Go functions to C. It works by embedding C code directly in Go source files using special // #cgo comment directives and the import "C" pseudo-import. The cgo tool processes these files, generating the necessary glue code for cross-language function calls.

Cgo is essential when you need to interface with existing C libraries (OpenSSL, SQLite, graphics libraries, OS-level APIs), use C-specific features like bit manipulation or SIMD intrinsics, or call system APIs not yet wrapped by Go's standard library. Many production Go systems use cgo: Docker uses it for low-level Linux operations, Kubernetes uses it for storage drivers, and databases like PostgreSQL provide cgo-based drivers.

However, cgo introduces significant complexity: it prevents Go's garbage collector from tracking C-allocated memory, creates goroutine scheduling overhead at the C boundary, complicates cross-compilation, and breaks pure-Go build simplicity. The Go community advises using cgo only when no pure-Go alternative exists, and the #cgo LDFLAGS / #cgo CFLAGS directives must be carefully managed for portability.`,
    keyPoints: [
      'Import "C" must be immediately preceded by C code comments (no blank line)',
      "#cgo directives specify compiler/linker flags: CFLAGS, LDFLAGS, pkg-config",
      "C.CBytes, C.GoBytes, C.GoString, C.GoStringN convert between Go and C types",
      "Cgo calls acquire an OS thread — they cannot be preempted by the Go scheduler",
      "Each cgo call has ~100ns overhead for the Go-to-C transition",
      "Memory passed to C must be pinned or manually managed to prevent GC collection",
      "Use go build -tags no_cgo to test pure-Go fallback behavior",
      "Cgo complicates cross-compilation — you need a C cross-compiler for each target"
    ],
    codeExamples: [
      {
        title: "Calling C Functions from Go",
        description: "Wrapping a C library function with proper memory management",
        bad: [
          'package main',
          '',
          '/*',
          '#include <stdlib.h>',
          '#include <string.h>',
          '',
          '// Leaks memory: caller must remember to free',
          'char* to_upper(const char* s) {',
          '    int len = strlen(s);',
          '    char* result = malloc(len + 1);',
          '    for (int i = 0; i <= len; i++) {',
          '        result[i] = (s[i] >= \'a\' && s[i] <= \'z\') ? s[i] - 32 : s[i];',
          '    }',
          '    return result;',
          '}',
          '*/',
          'import "C"',
          'import "fmt"',
          '',
          'func main() {',
          '    cstr := C.CString("hello")',
          '    // Memory leak: cstr is never freed',
          '    result := C.to_upper(cstr)',
          '    // Memory leak: result is never freed',
          '    fmt.Println(C.GoString(result))',
          '}',
        ].join('\n'),
        good: [
          'package main',
          '',
          '/*',
          '#include <stdlib.h>',
          '#include <string.h>',
          '',
          'static char* to_upper(const char* s) {',
          '    int len = strlen(s);',
          '    char* result = malloc(len + 1);',
          '    if (!result) return NULL;',
          '    for (int i = 0; i <= len; i++) {',
          '        result[i] = (s[i] >= \'a\' && s[i] <= \'z\') ? s[i] - 32 : s[i];',
          '    }',
          '    return result;',
          '}',
          '*/',
          'import "C"',
          'import (',
          '    "fmt"',
          '    "runtime"',
          '    "unsafe"',
          ')',
          '',
          'func ToUpper(s string) (string, error) {',
          '    cstr := C.CString(s)',
          '    defer C.free(unsafe.Pointer(cstr))',
          '',
          '    result := C.to_upper(cstr)',
          '    if result == nil {',
          '        return "", fmt.Errorf("to_upper failed")',
          '    }',
          '    defer C.free(unsafe.Pointer(result))',
          '',
          '    return C.GoString(result), nil',
          '}',
          '',
          'func main() {',
          '    upper, err := ToUpper("hello world")',
          '    if err != nil {',
          '        fmt.Println(err)',
          '        return',
          '    }',
          '    fmt.Println(upper) // HELLO WORLD',
          '    runtime.KeepAlive(nil) // ensure no premature collection',
          '}',
        ].join('\n'),
        explanation: "The good example properly manages all C memory with defer/C.free. C.CString allocates memory that must be freed. C.GoString copies the C string into Go memory before the C memory is freed. The static keyword on the C function limits its scope. runtime.KeepAlive ensures the GC doesn't collect referenced memory too early."
      }
    ],
    bestPractices: [
      "Minimize the cgo boundary — batch calls and pass bulk data, not individual values",
      "Always pair C.CString with defer C.free to prevent memory leaks",
      "Use #cgo pkg-config for portable library discovery instead of hardcoding paths",
      "Provide a pure-Go fallback for platforms where cgo is unavailable",
      "Profile cgo overhead — each call costs ~100ns for the Go/C transition"
    ],
    commonMistakes: [
      "Forgetting to free C.CString allocations, causing memory leaks",
      "Calling cgo in tight loops, destroying performance due to thread acquisition overhead",
      "Not handling NULL returns from C functions, leading to Go panics",
      "Passing Go pointers to C without pinning them with runtime.Pinner (Go 1.21+)"
    ],
    relatedTopics: [
      "unsafe-package",
      "memory-management",
      "cross-compilation"
    ],
    externalResources: [
      { title: "Cgo Command Documentation", url: "https://pkg.go.dev/cmd/cgo" },
      { title: "Go Blog: Cgo, Pointer Passing Rules", url: "https://go.dev/blog/cgo" },
      { title: "Go Effective Go: C interop", url: "https://go.dev/doc/effective_go#cgo" }
    ]
  },

  "memory-management": {
    slug: "memory-management",
    title: "Memory Management in Go",
    summary: "Go uses automatic memory management with stack allocation, escape analysis, and a concurrent garbage collector.",
    description: `Go's memory management is automatic — you don't allocate or free memory manually. The Go runtime handles allocation, garbage collection, and memory reuse transparently. Understanding how this works under the hood helps you write code that performs well without manual optimization.

Go allocates memory on the stack or the heap. Stack allocation is essentially free — it's just moving a stack pointer. The compiler decides where each variable lives through escape analysis: if a variable's lifetime is confined to the function, it stays on the stack; if it escapes (returned, captured by a closure, or stored in a global), it moves to the heap. Heap allocation triggers garbage collection pressure.

The garbage collector is a concurrent, tri-color, mark-sweep collector that runs in parallel with your application. It's designed for low latency — pause times are typically under 1ms even for large heaps. The GC is aware of goroutine stacks and only scans reachable objects, making it efficient for concurrent programs. The GOGC environment variable controls when GC runs (default: when heap doubles), and Go 1.19 introduced GOMEMLIMIT for memory-aware tuning.`,
    keyPoints: [
      "Stack allocation is automatic and essentially free (just a pointer increment)",
      "Escape analysis determines stack vs heap: confined = stack, escapes = heap",
      "The garbage collector is concurrent, tri-color, and low-latency (<1ms pauses)",
      "GOGC controls GC frequency (default 100 = run when heap grows 100%)",
      "GOMEMLIMIT (Go 1.19+) sets a soft memory limit for better GC tuning",
      "Pointers to heap objects must not outlive the goroutine that created them (in cgo)",
      "Stack size starts small and grows dynamically (up to 1GB by default)",
      "Use go build -gcflags='-m' to inspect escape analysis decisions"
    ],
    codeExamples: [
      {
        title: "Escape Analysis and Allocation",
        description: "Understanding when variables escape to the heap vs staying on the stack",
        bad: [
          '// Unnecessary heap allocation: return value escapes',
          'func createUser() *User {',
          '    u := User{Name: "Alice", Age: 30} // u escapes to heap',
          '    return &u',
          '}',
          '',
          '// Caller',
          'user := createUser() // heap allocated',
          'fmt.Println(user.Name)',
          '// GC must eventually collect this memory',
        ].join('\n'),
        good: [
          '// Option 1: Return by value (stack allocated)',
          'func createUser() User {',
          '    return User{Name: "Alice", Age: 30}',
          '}',
          '',
          '// Option 2: Pre-allocate and pass pointer in',
          'func populateUser(u *User) {',
          '    u.Name = "Alice"',
          '    u.Age = 30',
          '}',
          '',
          '// Option 3: Use sync.Pool for frequently allocated objects',
          'var userPool = sync.Pool{',
          '    New: func() any { return &User{} },',
          '}',
          '',
          'func getUser() *User {',
          '    return userPool.Get().(*User)',
          '}',
          '',
          'func putUser(u *User) {',
          '    *u = User{} // zero out for reuse',
          '    userPool.Put(u)',
          '}',
        ].join('\n'),
        explanation: "The first version allocates User on the heap because a pointer is returned. The second version returns by value, keeping it on the stack. The third uses sync.Pool to reuse heap allocations, reducing GC pressure. Check escape analysis with go build -gcflags='-m' to see which variables escape."
      }
    ],
    bestPractices: [
      "Use go build -gcflags='-m' to check escape analysis decisions",
      "Prefer returning values over returning pointers when the caller doesn't need identity",
      "Use sync.Pool for hot-path allocations that can be reused",
      "Set GOMEMLIMIT to prevent OOM in containerized environments",
      "Profile memory with go tool pprof -alloc_objects to find allocation hotspots",
      "Avoid unnecessary string-to-byte or byte-to-string conversions that cause copies"
    ],
    commonMistakes: [
      "Ignoring escape analysis output and wondering why allocations are high",
      "Setting GOGC=off to prevent GC — this causes unbounded memory growth",
      "Capturing variables in closures that extend their lifetime unnecessarily",
      "Not setting GOMEMLIMIT in production, leading to OOM kills in containers"
    ],
    relatedTopics: [
      "escape-analysis",
      "garbage-collection",
      "memory-mgmt-in-depth"
    ],
    externalResources: [
      { title: "Go Blog: Getting to Go: The Journey of Go's GC", url: "https://go.dev/blog/ismmkeynote" },
      { title: "Go Memory Model", url: "https://go.dev/ref/mem" },
      { title: "Go Blog: GOMEMLIMIT", url: "https://go.dev/blog/memory-limit" }
    ]
  },

  "memory-mgmt-in-depth": {
    slug: "memory-mgmt-in-depth",
    title: "Memory Management In Depth",
    summary: "Deep dive into Go's memory allocator, mcache/mcentral/mheap hierarchy, and how the runtime manages goroutine stacks.",
    description: `Go's memory allocator is a concurrent, thread-local allocator based on TCMalloc. When a goroutine needs memory, it first checks its local cache (mcache) for objects of the right size class. If empty, it fetches from a central pool (mcentral), which in turn pulls from the heap (mheap). This hierarchical design minimizes lock contention and maximizes allocation speed for the common case.

Size classes are critical to understanding Go's allocator. Objects are rounded up to one of ~70 size classes (8 bytes, 16 bytes, etc.), and the allocator maintains free lists for each class. This means small allocations may waste some memory (internal fragmentation) but are extremely fast. Objects larger than 32KB are allocated directly from the heap without size classes.

Goroutine stacks use a segmented approach — each goroutine starts with a small stack (typically 2-8KB) that grows and shrinks dynamically. The runtime uses copyable stack technique: when a stack grows, the runtime allocates a larger stack, copies the old stack contents, and adjusts all pointers. This allows millions of goroutines to coexist with minimal memory overhead, unlike OS threads which typically allocate 1-8MB each.`,
    keyPoints: [
      "mcache is per-P (processor) and provides lock-free allocation for small objects",
      "mcentral provides size-class-specific pooling across all Ps",
      "mheap is the global heap backing all large and overflow allocations",
      "Size classes (0-67) round up allocations for efficient free-list management",
      "Objects >32KB are allocated directly from mheap without size class rounding",
      "Goroutine stacks start small (2-8KB) and grow dynamically via stack copying",
      "Stack growth is amortized: most goroutines find their stack is already large enough",
      "The GODEBUG=gctrace=1 flag logs GC events for debugging"
    ],
    codeExamples: [
      {
        title: "Inspecting Allocation Behavior",
        description: "Using runtime metrics to understand allocation patterns",
        bad: [
          '// No visibility into memory behavior',
          'func processRequests(reqs []Request) []Response {',
          '    var responses []Response',
          '    for _, req := range reqs {',
          '        resp := handleRequest(req)',
          '        responses = append(responses, resp)',
          '    }',
          '    return responses',
          '}',
          '// How many allocations? How much memory? No way to tell.',
        ].join('\n'),
        good: [
          'import (',
          '    "runtime"',
          '    "runtime/debug"',
          '    "fmt"',
          ')',
          '',
          'func checkAllocations() {',
          '    var m1, m2 runtime.MemStats',
          '    runtime.ReadMemStats(&m1)',
          '',
          '    // ... do work ...',
          '',
          '    runtime.ReadMemStats(&m2)',
          '    fmt.Printf("Allocations: %d, Bytes: %d, GC cycles: %d\\n",',
          '        m2.Mallocs-m1.Mallocs,',
          '        m2.TotalAlloc-m1.TotalAlloc,',
          '        m2.NumGC-m1.NumGC,',
          '    )',
          '}',
          '',
          '// Pre-allocate to avoid growing slices',
          'func processRequestsOptimized(reqs []Request) []Response {',
          '    responses := make([]Response, 0, len(reqs))',
          '    for _, req := range reqs {',
          '        resp := handleRequest(req)',
          '        responses = append(responses, resp)',
          '    }',
          '    return responses',
          '}',
          '',
          '// Tune GC for production',
          'func init() {',
          '    debug.SetGCPercent(100)',
          '    debug.SetMemoryLimit(512 << 20) // 512MB',
          '}',
        ].join('\n'),
        explanation: "runtime.MemStats provides detailed allocation statistics. Pre-allocating slices with make([]T, 0, cap) prevents repeated allocations as the slice grows. debug.SetGCPercent and debug.SetMemoryLimit (Go 1.19+) let you tune GC behavior for your deployment environment. Use go test -benchmem for micro-benchmark allocation analysis."
      }
    ],
    bestPractices: [
      "Use go test -benchmem to measure allocation count and bytes per operation",
      "Pre-allocate slices when you know the approximate final size",
      "Use sync.Pool for objects allocated in tight loops that can be reused",
      "Set GOMEMLIMIT in production to prevent OOM without manual GOGC tuning",
      "Profile with go tool pprof -alloc_space to find memory allocation hotspots",
      "Consider arena-style allocation patterns for request-scoped data"
    ],
    commonMistakes: [
      "Not pre-allocating slices that grow in predictable patterns",
      "Using GOGC=off as a 'solution' to GC pressure instead of fixing allocations",
      "Ignoring internal fragmentation from size class rounding",
      "Not monitoring memory usage in production (heap profile drift)"
    ],
    relatedTopics: [
      "memory-management",
      "escape-analysis",
      "garbage-collection"
    ],
    externalResources: [
      { title: "Go Blog: Getting to Go's GC", url: "https://go.dev/blog/ismmkeynote" },
      { title: "Go Runtime Internals", url: "https://go.dev/s/runtime" },
      { title: "Go Memory Ballast", url: "https://go.dev/blog/ismmkeynote" }
    ]
  },

  "escape-analysis": {
    slug: "escape-analysis",
    title: "Escape Analysis",
    summary: "Escape analysis is the compile-time process that determines whether variables are allocated on the stack or heap.",
    description: `Escape analysis is a compile-time optimization that determines where variables should be allocated. If a variable's lifetime is entirely contained within a single function call (it doesn't escape), the compiler allocates it on the stack — which is essentially free (just a stack pointer increment). If the variable escapes (returned from a function, stored in a global, captured by a closure, or passed to an interface), it must be allocated on the heap where the garbage collector manages it.

Understanding escape analysis is crucial for writing performant Go code. Stack allocation avoids GC pressure entirely, and for high-throughput services, minimizing heap allocations can dramatically improve performance. The Go compiler's escape analysis is conservative — it may decide variables escape even when they technically don't, to guarantee correctness.

You can inspect escape analysis decisions using go build -gcflags='-m'. The output shows which variables escape and why (e.g., "moved to heap: x", "escapes to heap"). This tool is invaluable for optimizing allocation-heavy code paths, and is one of the first things to check when profiling memory usage in production.`,
    keyPoints: [
      "Stack allocation is essentially free; heap allocation triggers GC pressure",
      "Variables returned from a function escape to the heap",
      "Variables captured by closures escape to the heap",
      "Variables stored in interfaces escape because the interface value may outlive the function",
      "Variables whose address is taken may escape if the address outlives the function",
      "Use go build -gcflags='-m' to inspect escape analysis decisions",
      "The analysis is conservative — false positives are safer than false negatives",
      "Inlining can change escape behavior: inlined functions may keep variables on the stack"
    ],
    codeExamples: [
      {
        title: "Debugging Escape Analysis",
        description: "Identifying and fixing unnecessary heap allocations",
        bad: [
          '// Many hidden escapes',
          'func buildReport(data []string) string {',
          '    header := "Report:" // may escape if concatenation causes allocation',
          '    for _, item := range data {',
          '        header += " " + item // string concatenation creates new allocations',
          '    }',
          '    return header',
          '}',
          '',
          '// Interface boxing causes escape',
          'func printValue(x int) {',
          '    var fmtArg interface{} = x // x boxes into interface, escapes to heap',
          '    fmt.Println(fmtArg)',
          '}',
        ].join('\n'),
        good: [
          '// Pre-allocate with strings.Builder to avoid allocations',
          'func buildReport(data []string) string {',
          '    var b strings.Builder',
          '    b.WriteString("Report:")',
          '    for _, item := range data {',
          '        b.WriteString(" ")',
          '        b.WriteString(item)',
          '    }',
          '    return b.String()',
          '}',
          '',
          '// Use typed format verbs to avoid interface boxing',
          'func printValue(x int) {',
          '    fmt.Printf("%d\\n", x) // x stays on stack',
          '}',
          '',
          '// Verify with escape analysis:',
          '// $ go build -gcflags="-m" main.go',
        ].join('\n'),
        explanation: "strings.Builder pre-allocates its internal buffer, avoiding repeated string concatenation allocations. Using typed format verbs like %d instead of passing values as interface{} arguments prevents heap boxing. Always verify escape analysis output with -gcflags='-m' — it shows exactly what escapes and why."
      }
    ],
    bestPractices: [
      "Run go build -gcflags='-m' -m' (double -m) for detailed escape analysis",
      "Pre-allocate buffers and slices to avoid heap growth patterns",
      "Avoid passing small values as interface{} to prevent boxing escapes",
      "Use strings.Builder for string concatenation instead of += operators",
      "Consider function boundaries: smaller functions may keep more variables on the stack",
      "Profile with go test -benchmem to correlate escape decisions with allocations"
    ],
    commonMistakes: [
      "Assuming a variable stays on the stack without verifying with -gcflags='-m'",
      "Not realizing that inlining changes escape analysis results",
      "Blaming GC for allocation pressure that's actually caused by avoidable escapes",
      "Over-optimizing escape behavior in code paths that aren't performance-critical"
    ],
    relatedTopics: [
      "memory-management",
      "garbage-collection",
      "memory-mgmt-in-depth"
    ],
    externalResources: [
      { title: "Go Blog: Go Memory Model", url: "https://go.dev/ref/mem" },
      { title: "Compiler escape analysis docs", url: "https://github.com/golang/go/blob/master/src/cmd/compile/internal/escape/README.md" },
      { title: "Go Wiki: Escape Analysis", url: "https://github.com/golang/go/wiki/CompilerOptimization#escape-analysis" }
    ]
  },

  "garbage-collection": {
    slug: "garbage-collection",
    title: "Garbage Collection",
    summary: "Go uses a concurrent, tri-color, mark-sweep garbage collector designed for low latency and high throughput.",
    description: `Go's garbage collector is one of its most impressive engineering achievements. It's a concurrent, tri-color mark-sweep collector that runs mostly in parallel with your application, keeping pause times typically under 1ms. The GC was completely rewritten between Go 1.4 and 1.5, moving from a stop-the-world approach to the current concurrent design.

The tri-color marking system works by assigning objects three colors: white (not yet scanned), grey (scanned but children not yet processed), and black (scanned with children processed). The GC mutator (your application) runs concurrently with the collector, and the write barrier ensures no reachable objects are missed. When marking completes, all white objects are swept (freed).

GC tuning is controlled primarily by two settings: GOGC (default 100) controls the trade-off between memory usage and CPU overhead — lower values use less memory but collect more frequently. GOMEMLIMIT (Go 1.19+) provides a soft memory limit that works well in containerized environments where you want to use available memory efficiently but not exceed container limits.`,
    keyPoints: [
      "Concurrent tri-color mark-sweep with write barrier for correctness",
      "Pause times are typically <1ms regardless of heap size",
      "GOGC controls GC frequency: default 100 means collect when heap doubles",
      "GOMEMLIMIT (Go 1.19+) sets a soft memory limit for container-friendly tuning",
      "GC is generational in spirit — young objects are more likely to be garbage",
      "The runtime uses runtime.GC() for manual triggering (rarely needed in production)",
      "Finalizers (runtime.SetFinalizer) are unreliable for resource cleanup",
      "The debug.SetFinalizer and debug.SetGCPercent APIs provide runtime tuning"
    ],
    codeExamples: [
      {
        title: "GC Tuning for Production",
        description: "Configuring GC for containerized workloads with memory constraints",
        bad: [
          '// Disabling GC: will eventually OOM',
          'func init() {',
          '    debug.SetGCPercent(-1) // GC disabled!',
          '}',
          '// Bad: unbounded memory growth until OOM kill',
          '',
          '// Over-aggressive GC: wastes CPU',
          'func init() {',
          '    debug.SetGCPercent(10) // GC runs 10x more than default',
          '}',
          '// Bad: excessive CPU usage for marginal memory savings',
        ].join('\n'),
        good: [
          'import "runtime/debug"',
          '',
          '// Production-ready GC configuration for a 512MB container',
          'func configureGC() {',
          '    // Let GC run at default frequency',
          '    debug.SetGCPercent(100)',
          '',
          "    // Soft memory limit: use up to 512MB but don't exceed",
          '    // Leaves room for goroutine stacks and C allocations',
          '    debug.SetMemoryLimit(512 << 20)',
          '',
          '    // Optional: set a memory ballast for predictable GC behavior',
          '    // Helps when GOMEMLIMIT is not available (Go < 1.19)',
          '}',
          '',
          '// Monitor GC in production',
          'func reportGCStats() {',
          '    var stats debug.GCStats',
          '    debug.ReadGCStats(&stats)',
          '    fmt.Printf("GC runs: %d, Pause total: %v\\n",',
          '        stats.NumGC, stats.PauseTotal)',
          '}',
        ].join('\n'),
        explanation: "The production configuration sets GOMEMLIMIT to your container's memory limit, allowing Go to use all available memory before triggering GC. GOGC=100 (default) is usually fine with GOMEMLIMIT set. This combination gives you predictable memory usage without excessive GC overhead. Read debug.GCStats for production monitoring."
      }
    ],
    bestPractices: [
      "Always set GOMEMLIMIT in containerized deployments",
      "Use default GOGC (100) with GOMEMLIMIT instead of tuning GOGC alone",
      "Avoid runtime.GC() calls — let the runtime handle collection timing",
      "Don't rely on finalizers for resource cleanup — use defer or explicit Close methods",
      "Monitor GC pause times in production with runtime/metrics package",
      "Use GODEBUG=gctrace=1 in development to understand GC behavior"
    ],
    commonMistakes: [
      "Setting GOGC=-1 (GC disabled) without understanding OOM risk",
      "Using runtime.SetFinalizer for critical resource cleanup (finalizers are unreliable)",
      "Not setting GOMEMLIMIT in containers, leading to OOM kills at unpredictable times",
      "Calling runtime.GC() in hot paths, adding unnecessary pause time"
    ],
    relatedTopics: [
      "memory-management",
      "memory-mgmt-in-depth",
      "escape-analysis"
    ],
    externalResources: [
      { title: "Go Blog: Getting to Go's GC", url: "https://go.dev/blog/ismmkeynote" },
      { title: "Go Blog: GOMEMLIMIT", url: "https://go.dev/blog/memory-limit" },
      { title: "runtime/metrics Package", url: "https://pkg.go.dev/runtime/metrics" }
    ]
  },

  "compiler--linker-flags": {
    slug: "compiler--linker-flags",
    title: "Compiler and Linker Flags",
    summary: "Go build flags control optimization, debugging, race detection, and linking behavior at compile time.",
    description: `Go's compiler and linker accept various flags that control code generation, optimization levels, debugging information, and linking behavior. These flags are passed through go build using the -gcflags (compiler), -ldflags (linker), and -asmflags (assembler) options. Understanding these flags is essential for production builds, debugging, and CI/CD pipelines.

The most commonly used flags are -gcflags='-N -l' to disable optimizations for debugging, -ldflags '-s -w' to strip symbol tables and debug info for smaller binaries, and -ldflags '-X main.version=...' to inject build-time variables. The -race flag enables the race detector, which uses compiler instrumentation to detect concurrent data races at runtime.

Production builds typically combine stripped binaries (-s -w), version injection via -ldflags -X, and static linking with CGO_ENABLED=0 for pure Go binaries. Understanding how these flags interact helps you create optimized, debuggable, and portable binaries for your deployment targets.`,
    keyPoints: [
      "-gcflags passes flags to the Go compiler (e.g., -N -l to disable optimizations)",
      "-ldflags passes flags to the linker (e.g., -s -w to strip binaries)",
      "-ldflags '-X pkg.Var=val' injects build-time variables into your binary",
      "-race enables the race detector (uses ~2x memory, ~10x slower)",
      "-trimpath removes file system paths from binaries for reproducible builds",
      "-buildmode selects the output format (pie, plugin, c-shared, etc.)",
      "-tags activates build constraints for conditional compilation",
      "CGO_ENABLED=0 disables cgo for pure-Go static binaries"
    ],
    codeExamples: [
      {
        title: "Production Build Configuration",
        description: "Optimizing binary size and injecting build metadata",
        bad: [
          '// Development build: no optimizations, includes debug info',
          '// Binary is large and has all debug symbols',
          'go build -o myapp .',
          '',
          '// No way to know which version is deployed',
          'func main() {',
          '    log.Println("starting server")',
          '    // Which version is this?',
          '}',
        ].join('\n'),
        good: [
          '#!/bin/bash',
          '# build.sh: production build with version injection and stripped binary',
          'VERSION=$(git describe --tags --always)',
          'COMMIT=$(git rev-parse --short HEAD)',
          'BUILD_TIME=$(date -u +%Y-%m-%dT%H:%M:%SZ)',
          '',
          'go build \\',
          '    -ldflags "-s -w \\',
          '    -X main.version=${VERSION} \\',
          '    -X main.commit=${COMMIT} \\',
          '    -X main.buildTime=${BUILD_TIME}" \\',
          '    -trimpath \\',
          '    -o myapp .',
          '',
          '// In your code',
          'var (',
          '    version   = "dev"',
          '    commit    = "none"',
          '    buildTime = "unknown"',
          ')',
          '',
          'func main() {',
          '    if os.Args[1] == "version" {',
          '        fmt.Printf("Version: %s\\nCommit: %s\\nBuilt: %s\\n",',
          '            version, commit, buildTime)',
          '        return',
          '    }',
          '    log.Printf("starting server %s", version)',
          '}',
        ].join('\n'),
        explanation: "The build script injects git version info via -ldflags '-X', strips debug symbols with -s -w for smaller binaries (typically 20-30% reduction), and uses -trimpath to remove local filesystem paths for reproducible builds. The code declares package-level variables with defaults that get overwritten at link time."
      }
    ],
    bestPractices: [
      "Use -s -w in production builds to reduce binary size by ~25%",
      "Inject version, commit, and build time with -ldflags '-X' for traceability",
      "Use -trimpath for reproducible builds across different machines",
      "Enable -race in CI/CD but not in production (performance overhead)",
      "Set CGO_ENABLED=0 for static binaries in containers",
      "Document build flags in a Makefile or build script for consistency"
    ],
    commonMistakes: [
      "Using -gcflags='-N -l' in production (disables optimizations, much slower)",
      "Forgetting that -race uses ~2x memory and ~10x CPU — don't deploy with it",
      "Not quoting -ldflags properly in shell scripts, causing variable injection to fail",
      "Using -X with unexported variables (only works for package-level exported or command vars)"
    ],
    relatedTopics: [
      "cross-compilation",
      "build-constraints--tags",
      "build-tags"
    ],
    externalResources: [
      { title: "go build Command", url: "https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies" },
      { title: "Go Linker Flags", url: "https://github.com/golang/go/blob/master/src/cmd/link/README.md" },
      { title: "Go Blog: Static Binaries", url: "https://go.dev/blog/go1.5" }
    ]
  },

  "cross-compilation": {
    slug: "cross-compilation",
    title: "Cross-Compilation",
    summary: "Go's toolchain natively supports cross-compilation to any supported OS/architecture with simple environment variables.",
    description: `Go was designed for cross-compilation from the beginning. Unlike C/C++ where you need separate cross-compilers and toolchains for each target, Go can compile for any supported GOOS/GOARCH combination with just two environment variables. This makes it trivially easy to produce Linux binaries on macOS, ARM binaries on x86, or Windows binaries on Linux — all without any additional tools (assuming no cgo).

The GOOS variable specifies the target operating system (linux, darwin, windows, etc.) and GOARCH specifies the architecture (amd64, arm64, etc.). When CGO is not required (CGO_ENABLED=0), the Go compiler handles everything internally. This is one of Go's strongest advantages for DevOps tooling, CLI applications, and cloud-native software that needs to run across multiple platforms.

For projects that use cgo, cross-compilation requires a C cross-compiler for each target platform. Tools like zig cc or Docker-based cross-compilation environments can simplify this. However, the general recommendation is to avoid cgo when cross-compilation is important, or to provide a pure-Go fallback for unsupported platforms.`,
    keyPoints: [
      "Set GOOS and GOARCH to target any supported platform",
      "CGO_ENABLED=0 enables pure-Go cross-compilation without C toolchains",
      "Use go tool dist list to see all supported OS/architecture combinations",
      "The output binary format matches the target (ELF for Linux, PE for Windows, Mach-O for macOS)",
      "GOARM, GO386, and GOMIPS provide sub-architecture variants",
      "Use go build -o output-name to control the output binary name",
      "CGO cross-compilation requires a C cross-compiler (e.g., zig cc, musl-cross)",
      "Build scripts often use go build -o bin/${GOOS}_${GOARCH} ./... for multi-platform builds"
    ],
    codeExamples: [
      {
        title: "Multi-Platform Build Script",
        description: "Building binaries for multiple platforms from a single machine",
        bad: [
          '# Manual per-platform builds',
          'go build -o myapp-linux .',
          'go build -o myapp-mac .',
          'go build -o myapp-windows.exe .',
          '# Must run on each platform or have cgo cross-compiler',
          '# No version info, no consistency',
        ].join('\n'),
        good: [
          '#!/bin/bash',
          'set -e',
          '',
          'APP_NAME="myapp"',
          'VERSION=$(git describe --tags --always)',
          'LDFLAGS="-s -w -X main.version=${VERSION}"',
          '',
          'PLATFORMS=(',
          '    "linux/amd64"',
          '    "linux/arm64"',
          '    "darwin/amd64"',
          '    "darwin/arm64"',
          '    "windows/amd64"',
          ')',
          '',
          'for platform in "${PLATFORMS[@]}"; do',
          '    GOOS="${platform%/*}"',
          '    GOARCH="${platform#*/}"',
          '    output="bin/${APP_NAME}-${GOOS}-${GOARCH}"',
          '    if [ "$GOOS" = "windows" ]; then',
          '        output="${output}.exe"',
          '    fi',
          '    echo "Building ${GOOS}/${GOARCH}..."',
          '    CGO_ENABLED=0 GOOS=$GOOS GOARCH=$GOARCH \\',
          '        go build -ldflags "$LDFLAGS" -trimpath -o "$output" .',
          'done',
          '',
          'echo "Build complete:"',
          'ls -la bin/',
        ].join('\n'),
        explanation: "The build script iterates over target platforms, setting GOOS and GOARCH for each. CGO_ENABLED=0 ensures pure-Go compilation without needing C cross-compilers. The -ldflags inject version info, and -trimpath ensures reproducible builds. This produces static binaries for all platforms from a single machine."
      }
    ],
    bestPractices: [
      "Use go tool dist list to discover all supported target platforms",
      "Set CGO_ENABLED=0 for most cross-compilation scenarios",
      "Combine cross-compilation with version injection via -ldflags",
      "Test cross-compiled binaries before shipping (use CI for multi-platform tests)",
      "Consider using make or a build script for consistent multi-platform builds",
      "Document supported platforms in your README"
    ],
    commonMistakes: [
      "Forgetting CGO_ENABLED=0, which causes build failures when no C toolchain is available",
      "Not testing cross-compiled binaries — some runtime behaviors differ across platforms",
      "Using platform-specific syscalls without build constraints",
      "Assuming all dependencies support all platforms (check for cgo dependencies)"
    ],
    relatedTopics: [
      "compiler--linker-flags",
      "build-constraints--tags",
      "build-tags"
    ],
    externalResources: [
      { title: "Go Cross Compilation Documentation", url: "https://go.dev/doc/install/source#environment" },
      { title: "go tool dist list", url: "https://pkg.go.dev/cmd/go#hdr-Environment_variables" },
      { title: "Go Wiki: Cross Compilation", url: "https://github.com/golang/go/wiki/CrossCompilation" }
    ]
  },

  "build-constraints--tags": {
    slug: "build-constraints--tags",
    title: "Build Constraints",
    summary: "Build constraints control which source files are included during compilation based on OS, architecture, and custom tags.",
    description: `Build constraints (formerly build tags) are directives that tell the Go compiler to include or exclude source files based on build-time conditions. They enable platform-specific code, feature flags, and conditional compilation without runtime checks. Every .go file can have a build constraint that determines whether it's part of the compilation for a given build.

Constraints are specified in two ways: file names (e.g., linux.go, windows_amd64.go) and //go:build directives at the top of source files. The //go:build directive is the modern syntax (Go 1.17+), while the older // +build syntax is still supported for backward compatibility. Constraints support OS (linux, darwin, windows), architecture (amd64, arm64), and custom tags.

Build constraints are essential for writing portable Go code. They allow you to provide platform-specific implementations without runtime overhead, create feature flags for testing different configurations, and maintain clean separation between platform-specific and cross-platform code. The Go standard library uses them extensively — the os package, net package, and syscall package all have platform-specific implementations behind build constraints.`,
    keyPoints: [
      "//go:build directive at the top of a file specifies inclusion conditions",
      "File naming convention: *_linux.go, *_windows.go, *_arm64.go auto-applies constraints",
      "Use go:build ignore to exclude a file from all builds",
      "OR conditions use //go:build linux || darwin",
      "AND conditions use //go:build linux && amd64 (space-separated is OR in old syntax)",
      "Custom tags: //go:build integration activated with -tags integration",
      "The ! prefix negates a constraint: //go:build !windows",
      "Use go list -tags=integration ./... to verify which files are included"
    ],
    codeExamples: [
      {
        title: "Platform-Specific Code with Build Constraints",
        description: "Providing different implementations for different platforms",
        bad: [
          '// Runtime OS detection: inefficient and requires all platform code to compile',
          'package myapp',
          '',
          'import (',
          '    "os"',
          '    "runtime"',
          ')',
          '',
          'func createLockFile(path string) error {',
          '    if runtime.GOOS == "windows" {',
          '        // Windows-specific code compiles on all platforms',
          '        return createWindowsLock(path)',
          '    }',
          '    return createUnixLock(path)',
          '}',
          '// Both implementations always compile, even when only one is needed',
        ].join('\n'),
        good: [
          '// lock_unix.go',
          '//go:build !windows',
          '',
          'package myapp',
          '',
          'import "os"',
          '',
          'func createLockFile(path string) error {',
          '    return os.WriteFile(path, []byte("locked"), 0600)',
          '}',
          '',
          '// lock_windows.go',
          '//go:build windows',
          '',
          'package myapp',
          '',
          'import "os"',
          '',
          'func createLockFile(path string) error {',
          '    f, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0600)',
          '    if err != nil {',
          '        return err',
          '    }',
          '    return f.Close()',
          '}',
          '',
          '// platform_integration_test.go',
          '//go:build integration',
          '',
          'package myapp_test',
          '',
          'import "testing"',
          '',
          'func TestIntegration(t *testing.T) {',
          '    // only runs when -tags integration is used',
          '}',
        ].join('\n'),
        explanation: "Separate files with build constraints ensure only platform-appropriate code compiles. The !windows constraint means the Unix version excludes Windows. The integration tag creates a test file that only compiles when explicitly enabled. This is cleaner than runtime checks and produces smaller, more focused binaries."
      }
    ],
    bestPractices: [
      "Use //go:build (Go 1.17+) syntax — it's more readable than // +build",
      "Name files with platform suffixes (e.g., file_linux.go) for simple cases",
      "Use go list -f '{{.GoFiles}}' . to verify which files are included for a build",
      "Create a build/ or platform/ directory for platform-specific code",
      "Use custom tags for feature flags: //go:build debug activated with -tags debug",
      "Always provide //go:build comments explaining complex constraint logic"
    ],
    commonMistakes: [
      "Forgetting the //go:build directive and relying only on file naming",
      "Using // +build syntax in new code (use //go:build instead)",
      "Not verifying constraint combinations with go list before shipping",
      "Creating too many custom tags, making build matrix hard to understand"
    ],
    relatedTopics: [
      "build-tags",
      "cross-compilation",
      "compiler--linker-flags"
    ],
    externalResources: [
      { title: "Go Build Constraints Documentation", url: "https://pkg.go.dev/cmd/go#hdr-Build_constraints" },
      { title: "Go Reference: Build Constraints", url: "https://go.dev/reference/dist" },
      { title: "Go Blog: Build Tags Tutorial", url: "https://go.dev/blog/build-tags" }
    ]
  },

  "build-tags": {
    slug: "build-tags",
    title: "Build Tags",
    summary: "Build tags enable conditional compilation, letting you include or exclude source files based on custom flags.",
    description: `Build tags are a specific type of build constraint that uses custom strings to conditionally include source files. Unlike OS/architecture constraints that are automatic, build tags must be explicitly enabled using the -tags flag. This makes them ideal for feature flags, testing configurations, integration test suites, and separating production from development code.

The go:build directive specifies which tags must be active for a file to be included. Tags are activated with go build -tags "tag1 tag2" or go test -tags integration. Multiple tags in the directive use AND logic by default, but can be combined with || for OR logic. The ignore tag is special — it excludes a file from all builds without requiring a specific flag.

Build tags are widely used in the Go ecosystem: the standard library uses them for platform-specific implementations, test frameworks use them for integration/acceptance tests, and libraries use them for optional feature flags. They're a powerful tool for maintaining clean separation between different build configurations while keeping the codebase organized.`,
    keyPoints: [
      'Tags are enabled with -tags "tag1 tag2" at the command line',
      "The //go:build directive specifies required tags for file inclusion",
      "Use ignore tag to exclude files from all builds: //go:build ignore",
      "Tags support AND (a && b) and OR (a || b) logic",
      "Custom tags enable feature flags: //go:build debug, //go:build integration",
      "Use go list -tags=integration ./... to see which files are included",
      "Tags affect the compilation — files are literally not compiled when excluded",
      "Use go test -tags=integration -run=TestIntegration to run specific test suites"
    ],
    codeExamples: [
      {
        title: "Feature Flags and Integration Testing",
        description: "Using build tags to separate unit tests from integration tests",
        bad: [
          '// Integration tests mixed with unit tests',
          'func TestUserLogin(t *testing.T) {',
          '    // This test requires a running database',
          '    db, err := sql.Open("postgres", os.Getenv("TEST_DB_URL"))',
          '    if err != nil {',
          '        t.Fatal(err)',
          '    }',
          '    // ... test against real database ...',
          '}',
          '// This test fails without TEST_DB_URL, even when running unit tests',
          '// go test ./... will fail in CI if database is not available',
        ].join('\n'),
        good: [
          '// user_test.go (runs always)',
          'package myapp_test',
          '',
          'func TestUserValidation(t *testing.T) {',
          '    // Unit test: no external dependencies',
          '    user := &User{Name: "", Email: "bad"}',
          '    if err := user.Validate(); err == nil {',
          '        t.Error("expected validation error")',
          '    }',
          '}',
          '',
          '// user_integration_test.go',
          '//go:build integration',
          '',
          'package myapp_test',
          '',
          'import (',
          '    "database/sql"',
          '    "os"',
          '    "testing"',
          ')',
          '',
          'func TestUserLoginIntegration(t *testing.T) {',
          '    dbURL := os.Getenv("TEST_DB_URL")',
          '    if dbURL == "" {',
          '        t.Skip("TEST_DB_URL not set")',
          '    }',
          '    db, err := sql.Open("postgres", dbURL)',
          '    if err != nil {',
          '        t.Fatal(err)',
          '    }',
          '    defer db.Close()',
          '    // ... test against real database ...',
          '}',
          '',
          '// Usage:',
          '// go test ./...                       # unit tests only',
          '// go test -tags=integration ./...     # unit + integration tests',
        ].join('\n'),
        explanation: "The //go:build integration directive ensures integration tests only compile when the tag is explicitly set. go test ./... runs only unit tests (fast, no dependencies). go test -tags=integration ./... includes integration tests. The t.Skip call provides an additional safety net for the case where someone enables the tag but forgets the environment variable."
      }
    ],
    bestPractices: [
      "Name tags descriptively: integration, e2e, debug, race",
      "Always provide a skip mechanism in tagged tests (check env var or skip condition)",
      "Document required tags in your project's README and CI configuration",
      "Use go list -tags=yourtag ./... to verify which files are included",
      "Keep tag combinations minimal — each tag multiplies your test matrix",
      "Use build tags instead of runtime feature detection when possible"
    ],
    commonMistakes: [
      "Forgetting to add -tags to CI commands, causing tagged code to never run",
      "Using tags for runtime behavior instead of compile-time selection",
      "Not testing all tag combinations before shipping",
      "Creating tags that are too granular, making the build matrix unmanageable"
    ],
    relatedTopics: [
      "build-constraints--tags",
      "cross-compilation",
      "compiler--linker-flags"
    ],
    externalResources: [
      { title: "Go Build Constraints", url: "https://pkg.go.dev/cmd/go#hdr-Build_constraints" },
      { title: "Go Blog: Build Tags", url: "https://go.dev/blog/build-tags" },
      { title: "go generate Documentation", url: "https://pkg.go.dev/cmd/go#hdr-Generate_sources_by_processing_file" }
    ]
  },

  "plugins--dynamic-loading": {
    slug: "plugins--dynamic-loading",
    title: "Plugins and Dynamic Loading",
    summary: "Go supports loading shared libraries at runtime via the plugin package, enabling extensibility without recompilation.",
    description: `Go's plugin package (available on Linux and macOS since Go 1.8) allows loading Go shared libraries (.so files on Linux, .dylib on macOS) at runtime. Plugins export functions and variables that the host program can call after loading, enabling extensible architectures where functionality can be added, removed, or updated without recompiling the main binary.

Plugins are useful for building extensible systems: monitoring agents that load custom collectors, API gateways that load custom middleware, CI/CD pipelines that load custom steps, and applications that support third-party extensions. The host program defines an interface, plugins implement it, and the plugin system handles loading and symbol resolution.

However, plugins come with significant limitations: they're only supported on Linux and macOS (not Windows), both the host and plugin must be compiled with the same Go version, plugin dependencies must exactly match the host's dependencies, and there's no built-in unloading mechanism. These constraints make plugins impractical for many use cases. Alternatives like gRPC, HTTP-based extension systems, or WASM are often more portable and maintainable.`,
    keyPoints: [
      "The plugin package is only available on Linux and macOS (not Windows)",
      "Plugins are Go shared libraries built with -buildmode=plugin",
      "The host opens plugins with plugin.Open(path) and looks up symbols with Lookup",
      "Exported functions and variables can be called after type assertion",
      "Both host and plugin must use the same Go version and dependency versions",
      "There is no built-in mechanism to unload a plugin",
      "Plugins share the same process as the host — memory safety issues propagate",
      "Alternatives: gRPC, HTTP APIs, WASM, or Go's embed package for static extensions"
    ],
    codeExamples: [
      {
        title: "Creating and Loading a Plugin",
        description: "Building a plugin interface and loading plugins at runtime",
        bad: [
          '// plugin.go (compiled with -buildmode=plugin)',
          'package main',
          '',
          'type Greeter interface {',
          '    Greet(name string) string',
          '}',
          '',
          'type formalGreeter struct{}',
          '',
          'func (f formalGreeter) Greet(name string) string {',
          '    return "Good day, " + name',
          '}',
          '',
          'var Greeter Greeter = formalGreeter{}',
          '// No error handling on load',
          '// No way to check Go version compatibility',
        ].join('\n'),
        good: [
          '// greeter.go (compiled with: go build -buildmode=plugin -o greeter.so)',
          'package main',
          '',
          'import "fmt"',
          '',
          '// Greeter defines the plugin interface.',
          'type Greeter interface {',
          '    Greet(name string) string',
          '}',
          '',
          'type formalGreeter struct{}',
          '',
          'func (f formalGreeter) Greet(name string) string {',
          '    return fmt.Sprintf("Good day, %s", name)',
          '}',
          '',
          '// Version for compatibility checking',
          'var Version = "1.0.0"',
          'var GreeterInstance Greeter = formalGreeter{}',
          '',
          '// main.go (host program)',
          'package main',
          '',
          'import (',
          '    "fmt"',
          '    "log"',
          '    "os"',
          '    "plugin"',
          ')',
          '',
          'func loadPlugin(path string) (Greeter, error) {',
          '    plug, err := plugin.Open(path)',
          '    if err != nil {',
          '        return nil, fmt.Errorf("loading plugin: %w", err)',
          '    }',
          '',
          '    sym, err := plug.Lookup("GreeterInstance")',
          '    if err != nil {',
          '        return nil, fmt.Errorf("lookup GreeterInstance: %w", err)',
          '    }',
          '',
          '    greeter, ok := sym.(Greeter)',
          '    if !ok {',
          '        return nil, fmt.Errorf("plugin does not implement Greeter")',
          '    }',
          '    return greeter, nil',
          '}',
          '',
          'func main() {',
          '    g, err := loadPlugin(os.Args[1])',
          '    if err != nil {',
          '        log.Fatal(err)',
          '    }',
          '    fmt.Println(g.Greet("World"))',
          '}',
        ].join('\n'),
        explanation: "The plugin exports a typed variable GreeterInstance implementing the Greeter interface. The host program uses plugin.Open and Lookup to find the exported symbol, then type-asserts it to the expected interface. Error handling at each step ensures graceful failure. The Version variable enables compatibility checking between host and plugin."
      }
    ],
    bestPractices: [
      "Define clear interfaces for plugin contracts — keep them minimal and stable",
      "Always check errors from plugin.Open and Lookup calls",
      "Add version compatibility checks between host and plugins",
      "Consider alternatives (gRPC, WASM) for cross-platform extensibility",
      "Isolate plugin loading behind an interface for testability",
      "Document Go version and dependency requirements for plugin compatibility"
    ],
    commonMistakes: [
      "Using plugins on Windows (not supported by Go)",
      "Mismatched Go versions between host and plugin causing load failures",
      "Not handling plugin load errors gracefully in production",
      "Assuming plugins can be unloaded — they cannot be removed from memory"
    ],
    relatedTopics: [
      "goembed-for-embedding",
      "build-constraints--tags",
      "cross-compilation"
    ],
    externalResources: [
      { title: "plugin Package Documentation", url: "https://pkg.go.dev/plugin" },
      { title: "Go Reference: Plugin Package", url: "https://go.dev/ref/spec#Plugin_packages" },
      { title: "Go Proposal: Plugin System", url: "https://github.com/golang/go/issues/19281" }
    ]
  },

  "goembed-for-embedding": {
    slug: "goembed-for-embedding",
    title: "Go Embed for Embedding Files",
    summary: "Go 1.16 introduced the embed package for embedding static files directly into binaries at compile time.",
    description: `The embed package (Go 1.16+) provides the //go:embed directive to embed files and directories directly into Go binaries at compile time. This eliminates the need for separate file distribution, simplifies deployment, and ensures that static assets are always in sync with the binary. The embedded files are read-only and available through embed.FS or embed.ReadFile.

Embedding is essential for tools that need bundled data: configuration templates, SQL migrations, CA certificates, HTML/CSS/JS for embedded web servers, protocol buffer definitions, and static assets for CLI tools. Instead of requiring users to install data files alongside the binary, everything is self-contained in a single executable.

The embed package works at compile time — files are literally copied into the binary, increasing binary size. For large assets (multi-MB files), this increases build time and binary size. The directive supports wildcards (*_template.html), directory embedding, and exclusion patterns. Combined with go:generate, you can build powerful pipelines that produce self-contained, portable binaries.`,
    keyPoints: [
      "//go:embed directive is placed before a variable declaration of type embed.FS, string, or []byte",
      "Embedded files are read-only and cannot be modified at runtime",
      "Supports single files, multiple files with wildcards, and entire directories",
      "The embed.FS type provides an fs.FS interface for reading embedded files",
      "Use //go:embed all:dirname to include dotfiles and hidden files",
      "Embedded files increase binary size — consider compression for large assets",
      "The embed directive must be in the same package as the variable it populates",
      "Combined with http.FS, you can serve embedded static files via HTTP"
    ],
    codeExamples: [
      {
        title: "Embedding Static Files for a Web Server",
        description: "Bundling HTML templates and static assets into a Go binary",
        bad: [
          '// Requires external files to exist at runtime',
          'func main() {',
          '    // Template files must be distributed alongside the binary',
          '    tmpl, err := template.ParseFiles("templates/index.html")',
          '    if err != nil {',
          '        log.Fatal(err)',
          '    }',
          '    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {',
          '        tmpl.Execute(w, nil)',
          '    })',
          '    log.Fatal(http.ListenAndServe(":8080", nil))',
          '}',
          '// Binary alone is useless — must distribute templates/ directory',
        ].join('\n'),
        good: [
          'import (',
          '    "embed"',
          '    "html/template"',
          '    "log"',
          '    "net/http"',
          ')',
          '',
          '//go:embed templates/*.html',
          'var templateFS embed.FS',
          '',
          '//go:embed static/*',
          'var staticFS embed.FS',
          '',
          'func main() {',
          '    tmpl, err := template.ParseFS(templateFS, "templates/*.html")',
          '    if err != nil {',
          '        log.Fatal(err)',
          '    }',
          '',
          '    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {',
          '        tmpl.Execute(w, map[string]string{"Title": "My App"})',
          '    })',
          '',
          '    // Serve embedded static files',
          '    http.Handle("/static/", http.StripPrefix("/static/",',
          '        http.FileServer(http.FS(staticFS))))',
          '',
          '    log.Println("Server on :8080")',
          '    log.Fatal(http.ListenAndServe(":8080", nil))',
          '}',
        ].join('\n'),
        explanation: "The //go:embed templates/*.html directive copies all HTML files from the templates directory into templateFS at compile time. template.ParseFS reads directly from the embedded filesystem. http.FS adapts embed.FS for use with http.FileServer. The binary is now self-contained — no external files needed."
      },
      {
        title: "Embedding Configuration and Data Files",
        description: "Bundling SQL migrations and configuration templates into a CLI tool",
        bad: [
          '// Migration files must be distributed separately',
          'func runMigrations(db *sql.DB) error {',
          '    files, _ := filepath.Glob("migrations/*.sql")',
          '    for _, f := range files {',
          '        content, err := os.ReadFile(f)',
          '        if err != nil {',
          '            return err',
          '        }',
          '        _, err = db.Exec(string(content))',
          '        if err != nil {',
          '            return err',
          '        }',
          '    }',
          '    return nil',
          '}',
        ].join('\n'),
        good: [
          'import (',
          '    "embed"',
          '    "fmt"',
          '    "io/fs"',
          '    "sort"',
          '    "strings"',
          ')',
          '',
          '//go:embed migrations/*.sql',
          'var migrationsFS embed.FS',
          '',
          'func runMigrations(db *sql.DB) error {',
          '    entries, err := fs.ReadDir(migrationsFS, "migrations")',
          '    if err != nil {',
          '        return fmt.Errorf("reading migrations: %w", err)',
          '    }',
          '',
          '    // Sort to ensure correct execution order',
          '    sort.Slice(entries, func(i, j int) bool {',
          '        return entries[i].Name() < entries[j].Name()',
          '    })',
          '',
          '    for _, entry := range entries {',
          '        if entry.IsDir() {',
          '            continue',
          '        }',
          '        content, err := fs.ReadFile(migrationsFS,',
          '            "migrations/"+entry.Name())',
          '        if err != nil {',
          '            return fmt.Errorf("reading %s: %w", entry.Name(), err)',
          '        }',
          '        if _, err := db.Exec(string(content)); err != nil {',
          '            return fmt.Errorf("executing %s: %w", entry.Name(), err)',
          '        }',
          '        fmt.Printf("Applied: %s\\n", entry.Name())',
          '    }',
          '    return nil',
          '}',
        ].join('\n'),
        explanation: "The migrationsFS embeds all SQL files at compile time. fs.ReadDir lists entries, sort.Slice ensures alphabetical order (001_init.sql runs before 002_users.sql), and fs.ReadFile reads individual migration files. The binary is self-contained — no need to distribute migration files alongside the tool."
      }
    ],
    bestPractices: [
      "Use embed.FS with http.FileServer for embedded web applications",
      "Compress large assets before embedding to reduce binary size",
      "Use //go:embed all:dirname to include hidden files and dotfiles",
      "Combine with go:generate for automatic asset pipeline processing",
      "Keep embedded file sets focused — embed only what the binary needs",
      "Use fs.Sub to narrow the view of embedded directories"
    ],
    commonMistakes: [
      "Embedding large files that significantly increase binary size without checking",
      "Forgetting that embedded files are read-only (cannot write back to embed.FS)",
      "Using embed when runtime file loading would be more appropriate",
      "Not using the all: prefix when you need hidden files"
    ],
    relatedTopics: [
      "plugins--dynamic-loading",
      "build-constraints--tags",
      "compiler--linker-flags"
    ],
    externalResources: [
      { title: "embed Package Documentation", url: "https://pkg.go.dev/embed" },
      { title: "Go Blog: Go embed Tutorial", url: "https://go.dev/blog/embed" },
      { title: "Go Reference: go:embed Directive", url: "https://go.dev/cmd/embed" }
    ]
  },
};
