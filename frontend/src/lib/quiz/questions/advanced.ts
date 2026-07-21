import type { QuizQuestion } from "../types";

export const advancedQuestions: Record<string, QuizQuestion[]> = {
  "generics": [
    {
      id: "generics-1",
      type: "multiple-choice",
      question: "Which Go version introduced generics (type parameters)?",
      options: [
        { id: "a", text: "Go 1.16" },
        { id: "b", text: "Go 1.18" },
        { id: "c", text: "Go 1.20" },
        { id: "d", text: "Go 1.21" },
      ],
      correctAnswer: "b",
      explanation: "Generics (type parameters) were introduced in Go 1.18, released in February 2022. This was one of the most anticipated features in Go's history.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "version"],
      relatedLesson: "generics",
    },
    {
      id: "generics-2",
      type: "true-false",
      question: "Go generics use monomorphization (like C++ templates) to generate type-specific code at compile time.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go generics do NOT use monomorphization. The Go compiler uses a dictionary-based approach where a single compiled version handles all types at runtime through runtime type information.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "implementation"],
      relatedLesson: "generics",
    },
    {
      id: "generics-3",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func Add[T int | float64](a, b T) T {
    return a + b
}

func main() {
    fmt.Println(Add(1, 2))
    fmt.Println(Add(1.5, 2.5))
}`,
      options: [
        { id: "a", text: "3\n4" },
        { id: "b", text: "3\n4.0" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "3\n4.000000" },
      ],
      correctAnswer: "b",
      explanation: "The generic function Add works with both int and float64. When called with integers it returns 3 (int). When called with float64, fmt.Println prints 4.0 (the default float64 format).",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "type-inference"],
      relatedLesson: "generics",
    },
    {
      id: "generics-4",
      type: "multiple-choice",
      question: "Which is a valid generic type declaration?",
      options: [
        { id: "a", text: "type Stack<T> struct { items []T }" },
        { id: "b", text: "type Stack[T any] struct { items []T }" },
        { id: "c", text: "type Stack{T any} struct { items []T }" },
        { id: "d", text: "type Stack[T] struct { items []T }" },
      ],
      correctAnswer: "b",
      explanation: "Go generics use square brackets [T any] for type parameters. Every type parameter must have a constraint; 'any' is the most permissive constraint.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "syntax"],
      relatedLesson: "generics",
    },
    {
      id: "generics-5",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func Filter[T any](s []T, f func(T) bool) []T {
    var result []T
    for _, v := range s {
        if f(v) {
            result = append(result, v)
        }
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6}
    evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    fmt.Println(evens)
}`,
      options: [
        { id: "a", text: "[1 3 5]" },
        { id: "b", text: "[2 4 6]" },
        { id: "c", text: "[1 2 3 4 5 6]" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "b",
      explanation: "Filter keeps elements where the predicate returns true. For even numbers, it keeps 2, 4, and 6.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "higher-order-function"],
      relatedLesson: "generics",
    },
    {
      id: "generics-6",
      type: "multiple-select",
      question: "Which are valid type constraint interfaces? (Select all that apply)",
      options: [
        { id: "a", text: "type Number interface { int | float64 }" },
        { id: "b", text: "type Ordered interface { ~int | ~float64 | ~string }" },
        { id: "c", text: "type StringLike interface { ~string }" },
        { id: "d", text: "type Hashable interface { comparable }" },
      ],
      correctAnswer: ["a", "b", "c", "d"],
      explanation: "All are valid. A: Union of concrete types. B: Uses ~tilde to include all types with underlying type int, float64, or string. C: All types whose underlying type is string. D: Embeds the comparable constraint.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "constraints"],
      relatedLesson: "generics",
    },
    {
      id: "generics-7",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

type Number interface {
    ~int | ~float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    ints := []int{1, 2, 3}
    floats := []float64{1.1, 2.2, 3.3}
    fmt.Println(Sum(ints))
    fmt.Println(Sum(floats))
}`,
      options: [
        { id: "a", text: "6\n6.6" },
        { id: "b", text: "6\n6.600000" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "6.6\n6" },
      ],
      correctAnswer: "a",
      explanation: "Sum works with both int and float64 slices. For integers: 1+2+3=6. For floats: 1.1+2.2+3.3=6.6. fmt.Println prints floats without trailing zeros.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "type-constraint"],
      relatedLesson: "generics",
    },
    {
      id: "generics-8",
      type: "scenario",
      question: "You need a generic data structure storing key-value pairs. Which constraint should the key type use?",
      options: [
        { id: "a", text: "any" },
        { id: "b", text: "comparable" },
        { id: "c", text: "~string" },
        { id: "d", text: "int | string" },
      ],
      correctAnswer: "b",
      explanation: "Map keys must be comparable in Go. The comparable constraint ensures only types supporting == and != can be used as keys. Using any would allow non-comparable types like slices.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "comparable", "maps"],
      relatedLesson: "generics",
    },
    {
      id: "generics-9",
      type: "multiple-choice",
      question: "Why can't you use a type assertion on a generic type parameter?",
      code: `func Process[T error](val T) {
    msg := val.(string)
    _ = msg
}`,
      options: [
        { id: "a", text: "Go generics use a dictionary-based approach and type assertions require knowing the concrete type at compile time" },
        { id: "b", text: "Type assertions only work with interface{} not with error" },
        { id: "c", text: "The error type is not an interface" },
        { id: "d", text: "This code compiles fine" },
      ],
      correctAnswer: "a",
      explanation: "Go generics use dictionaries rather than monomorphization. The compiler generates a single function body that handles all types through runtime type information. Type assertions require knowing the concrete dynamic type, which isn't directly available on generic parameters.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "type-assertion", "implementation"],
      relatedLesson: "generics",
    },
    {
      id: "generics-10",
      type: "complete-code",
      question: "Complete the generic Reduce function.",
      code: `package main

import "fmt"

func Reduce[T any, U any](s []T, init U, fn func(U, T) U) U {
    // Complete this function
    ???
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    sum := Reduce(nums, 0, func(acc, n int) int { return acc + n })
    fmt.Println(sum)
}`,
      options: [
        { id: "a", text: "acc := init; for _, v := range s { acc = fn(acc, v) }; return acc" },
        { id: "b", text: "return init" },
        { id: "c", text: "for _, v := range s { fn(init, v) }; return init" },
        { id: "d", text: "return fn(init, s[0])" },
      ],
      correctAnswer: "a",
      explanation: "The correct implementation initializes the accumulator, iterates through the slice applying the function to accumulate results, and returns the final accumulated value.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "higher-order-function"],
      relatedLesson: "generics",
    },
  ],
  "why-generics": [
    {
      id: "why-generics-1",
      type: "multiple-choice",
      question: "Before generics, how did Go developers typically implement reusable data structures?",
      options: [
        { id: "a", text: "Using macros" },
        { id: "b", text: "Using interface{} (any) with runtime type assertions" },
        { id: "c", text: "Using inheritance" },
        { id: "d", text: "It was not possible to create reusable data structures in Go" },
      ],
      correctAnswer: "b",
      explanation: "Before generics, Go used interface{} (now 'any') to create type-agnostic containers. This required runtime type assertions and type switches, leading to runtime errors and verbose code.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "history"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-2",
      type: "true-false",
      question: "Generics eliminate the need for all type assertions when writing reusable code.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Generics significantly reduce the need for type assertions but don't eliminate them entirely. Type assertions may still be needed when working with untyped interfaces or legacy code.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "type-safety"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-3",
      type: "multiple-choice",
      question: "What is a key advantage of generics over interface{} with type assertions?",
      options: [
        { id: "a", text: "Generics make code run faster in all cases" },
        { id: "b", text: "Generics catch type errors at compile time instead of runtime" },
        { id: "c", text: "Generics reduce the binary size of compiled programs" },
        { id: "d", text: "Generics eliminate the need for interfaces entirely" },
      ],
      correctAnswer: "b",
      explanation: "The primary advantage is compile-time type safety. With interface{}, type mismatches are only caught at runtime. Generics allow the compiler to verify type correctness during compilation.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "type-safety"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-4",
      type: "multiple-select",
      question: "Which problems did Go face before generics? (Select all that apply)",
      options: [
        { id: "a", text: "Code duplication for type-specific implementations" },
        { id: "b", text: "Runtime panics from type assertion failures" },
        { id: "c", text: "Inability to write any reusable code at all" },
        { id: "d", text: "Verbose boilerplate with reflect package" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "Before generics, developers duplicated code for different types (a), risked runtime panics from type assertions (b), and resorted to verbose reflect-based code (d). Go was capable of reusable code using interfaces—it was just more error-prone.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "pain-points"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-5",
      type: "code-output",
      question: "What does this pre-generics code do?",
      code: `package main

import "fmt"

func Max(a, b interface{}) interface{} {
    if a.(int) > b.(int) {
        return a
    }
    return b
}

func main() {
    result := Max(10, "20")
    fmt.Println(result)
}`,
      options: [
        { id: "a", text: "Prints 20" },
        { id: "b", text: "Prints 10" },
        { id: "c", text: "Panics with runtime type assertion error" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "c",
      explanation: "The code compiles because interface{} accepts any type, but at runtime a.(int) panics when a is a string. This is exactly the kind of runtime error generics solve.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "type-assertion", "runtime-error"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-6",
      type: "scenario",
      question: "A team has a utility library with 15 functions each existing in 4 type-specific versions. How do generics help?",
      options: [
        { id: "a", text: "Replace 60 functions with ~15 generic versions, reducing code and maintenance" },
        { id: "b", text: "Make all 60 functions run twice as fast" },
        { id: "c", text: "Allow functions to work with any type without constraints" },
        { id: "d", text: "Eliminate the need for unit tests" },
      ],
      correctAnswer: "a",
      explanation: "Generics allow writing a single generic function for multiple types, drastically reducing code duplication while maintaining type safety.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "code-reduction"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-7",
      type: "multiple-choice",
      question: "What trade-off does Go make by using dictionary-based generics instead of monomorphization?",
      options: [
        { id: "a", text: "Faster compile times and smaller binaries at the cost of potential runtime overhead" },
        { id: "b", text: "Faster runtime execution at the cost of larger binaries" },
        { id: "c", text: "Simpler syntax at the cost of less type safety" },
        { id: "d", text: "Better error messages at the cost of slower compilation" },
      ],
      correctAnswer: "a",
      explanation: "Go's dictionary approach compiles generic functions once and uses runtime type information. This keeps compile times fast and binaries small. The trade-off is potential overhead from indirect function calls at runtime.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "implementation", "trade-offs"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-8",
      type: "true-false",
      question: "Go generics support method-level type parameters (methods can have their own type parameters).",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "b",
      explanation: "Go does not support method-level type parameters. Only types and functions can have type parameters. Methods can only use the type parameters declared on the receiver type.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "limitations"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-9",
      type: "code-output",
      question: "What is the output of this generic Max function?",
      code: `package main

import "fmt"

func Max[T int | string](a, b T) T {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(Max(3, 5))
    fmt.Println(Max("hello", "world"))
}`,
      options: [
        { id: "a", text: "5\nworld" },
        { id: "b", text: "5\nhello" },
        { id: "c", text: "3\nhello" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "For integers, 5 > 3 returns '5'. For strings, 'world' > 'hello' lexicographically returns 'world'.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "comparison"],
      relatedLesson: "why-generics",
    },
    {
      id: "why-generics-10",
      type: "best-practice",
      question: "When should you use generics versus interfaces in Go?",
      options: [
        { id: "a", text: "Use generics for type-safe operations on multiple concrete types; use interfaces for behavioral polymorphism" },
        { id: "b", text: "Always prefer generics over interfaces" },
        { id: "c", text: "Interfaces are always better than generics" },
        { id: "d", text: "Use generics for methods and interfaces for functions" },
      ],
      correctAnswer: "a",
      explanation: "Generics are ideal for type-safe code operating on data structures of varying types. Interfaces define behavioral contracts. They solve different problems and are complementary.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "interfaces", "best-practices"],
      relatedLesson: "why-generics",
    },
  ],
  "generic-types--interfaces": [
    {
      id: "generic-types-interfaces-1",
      type: "multiple-choice",
      question: "What does the 'any' constraint represent in Go generics?",
      options: [
        { id: "a", text: "A constraint that only allows numeric types" },
        { id: "b", text: "An alias for interface{}, allowing any type" },
        { id: "c", text: "A constraint that requires all methods to be defined" },
        { id: "d", text: "A built-in constraint for comparable types" },
      ],
      correctAnswer: "b",
      explanation: "any is an alias for interface{} introduced in Go 1.18. As a constraint, it permits any type as a type argument with no compile-time checks on operations.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "any", "constraints"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-2",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

type Pair[T, U any] struct {
    First  T
    Second U
}

func main() {
    p := Pair[string, int]{First: "hello", Second: 42}
    fmt.Printf("%s: %d\n", p.First, p.Second)
}`,
      options: [
        { id: "a", text: "hello: 42" },
        { id: "b", text: "{hello 42}" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "42: hello" },
      ],
      correctAnswer: "a",
      explanation: "The generic struct Pair takes two type parameters T and U, both constrained to any. Here T=string and U=int. Printf formats them as 'hello: 42'.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "generic-types", "structs"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-3",
      type: "true-false",
      question: "A type parameter constrained by an interface allows you to call methods defined in that interface.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "When a type parameter is constrained by an interface, the methods of that interface are available on the type parameter.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "constraints", "methods"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-4",
      type: "multiple-choice",
      question: "What is the difference between 'interface{ ~int }' and 'interface{ int }' as a constraint?",
      options: [
        { id: "a", text: "~int allows any type whose underlying type is int; int only allows the exact int type" },
        { id: "b", text: "There is no difference" },
        { id: "c", text: "~int includes pointer types" },
        { id: "d", text: "int allows more types than ~int" },
      ],
      correctAnswer: "a",
      explanation: "The ~ operator matches all types with the given underlying type. ~int matches int and any named type whose underlying type is int. Without ~, only the exact type is matched.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "tilde", "constraints"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-5",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

type Stringer interface {
    String() string
}

type MyString string

func (m MyString) String() string {
    return string(m)
}

func PrintAll[T Stringer](items []T) {
    for _, item := range items {
        fmt.Println(item.String())
    }
}

func main() {
    items := []MyString{"hello", "world"}
    PrintAll(items)
}`,
      options: [
        { id: "a", text: "hello\nworld" },
        { id: "b", text: "Compilation error" },
        { id: "c", text: "hello world" },
        { id: "d", text: "Panics at runtime" },
      ],
      correctAnswer: "a",
      explanation: "MyString has a String() method, satisfying the Stringer interface constraint. The generic function calls String() on each element.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "constraints", "interfaces"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-6",
      type: "multiple-select",
      question: "Which operations can you perform on type T constrained by `interface{ int | string }`? (Select all)",
      options: [
        { id: "a", text: "Compare with == operator" },
        { id: "b", text: "Call the String() method" },
        { id: "c", text: "Use in a type switch" },
        { id: "d", text: "Use the + operator" },
      ],
      correctAnswer: ["a", "d"],
      explanation: "Both int and string support == and +. String() is not defined in the constraint. Type switches work on interfaces, not on type parameters directly.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "constraints", "operations"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-7",
      type: "identify-bug",
      question: "Why does this code fail to compile?",
      code: `package main

func Length[T any](val T) int {
    return len(val)
}

func main() {
    Length("hello")
}`,
      options: [
        { id: "a", text: "The any constraint doesn't guarantee the type supports len()" },
        { id: "b", text: "len() doesn't work with strings" },
        { id: "c", text: "The function needs to return a value" },
        { id: "d", text: "any is not a valid constraint" },
      ],
      correctAnswer: "a",
      explanation: "The any constraint allows any type, including types that don't support len(). The compiler cannot verify len() is valid for all possible types.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "constraints", "len"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-8",
      type: "multiple-choice",
      question: "What does the Ordered constraint ensure about its types?",
      code: `type Ordered interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
    ~float32 | ~float64 | ~string
}`,
      options: [
        { id: "a", text: "Types that support arithmetic operations" },
        { id: "b", text: "Types that support ordering comparisons (< > <= >=)" },
        { id: "c", text: "Types that can be serialized to JSON" },
        { id: "d", text: "Types that implement the comparable constraint" },
      ],
      correctAnswer: "b",
      explanation: "The Ordered constraint includes all numeric types and string—types in Go that support ordering comparisons. Notably, structs and maps are NOT ordered.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "constraints", "ordered"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-9",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

type Result[T any] struct {
    value T
    err   error
}

func Ok[T any](val T) Result[T] {
    return Result[T]{value: val, err: nil}
}

func (r Result[T]) Unwrap() (T, error) {
    return r.value, r.err
}

func main() {
    res := Ok("success")
    val, err := res.Unwrap()
    fmt.Println(val, err)
}`,
      options: [
        { id: "a", text: "success <nil>" },
        { id: "b", text: "{success <nil>}" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "success error" },
      ],
      correctAnswer: "a",
      explanation: "The Result generic type wraps a value and error. Ok creates a Result with a value and nil error. Unwrap returns them separately.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "error-handling", "result-type"],
      relatedLesson: "generic-types--interfaces",
    },
    {
      id: "generic-types-interfaces-10",
      type: "security",
      question: "What security concern arises from using 'any' as a constraint when serializing data?",
      options: [
        { id: "a", text: "Sensitive data might be inadvertently serialized if the type contains private fields" },
        { id: "b", text: "any is always safe for serialization" },
        { id: "c", text: "any causes memory leaks during serialization" },
        { id: "d", text: "Serialization with any is faster but less secure" },
      ],
      correctAnswer: "a",
      explanation: "Using any means any type can be passed, including structs with sensitive fields. Without type constraints, there's a risk of accidentally serializing sensitive data.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "security", "serialization"],
      relatedLesson: "generic-types--interfaces",
    },
  ],
  "generic-functions": [
    {
      id: "generic-functions-1",
      type: "multiple-choice",
      question: "What is the correct syntax to declare a generic function with two type parameters?",
      options: [
        { id: "a", text: "func Merge<A, B>(a A, b B) B" },
        { id: "b", text: "func Merge[A any, B any](a A, b B) B" },
        { id: "c", text: "func Merge(A any, B any)(a A, b B) B" },
        { id: "d", text: "func Merge{A any, B any}(a A, b B) B" },
      ],
      correctAnswer: "b",
      explanation: "Go generic functions use square brackets after the function name. Each type parameter must have its constraint.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "syntax", "functions"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-2",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func Map[T any, U any](slice []T, fn func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = fn(v)
    }
    return result
}

func main() {
    nums := []int{1, 2, 3}
    strs := Map(nums, func(n int) string {
        return fmt.Sprintf("%d!", n)
    })
    fmt.Println(strs)
}`,
      options: [
        { id: "a", text: "[1! 2! 3!]" },
        { id: "b", text: "[!1 !2 !3]" },
        { id: "c", text: "Compilation error" },
        { id: "d", text: "Panics at runtime" },
      ],
      correctAnswer: "a",
      explanation: "Map transforms each int to a string with '!' appended. The result is a string slice with elements '1!', '2!', '3!'.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "map-function", "higher-order"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-3",
      type: "true-false",
      question: "You can call a generic function without explicitly specifying type arguments if types can be inferred.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
      ],
      correctAnswer: "a",
      explanation: "Go supports type inference for generic functions. When the compiler can determine types from function arguments, explicit specification is unnecessary.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "type-inference"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-4",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func Reduce[T any, U any](slice []T, init U, fn func(U, T) U) U {
    acc := init
    for _, v := range slice {
        acc = fn(acc, v)
    }
    return acc
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    sum := Reduce(nums, 0, func(acc, n int) int { return acc + n })
    fmt.Println(sum)
    
    words := []string{"a", "b", "c"}
    joined := Reduce(words, "", func(acc, s string) string {
        if acc == "" { return s }
        return acc + "-" + s
    })
    fmt.Println(joined)
}`,
      options: [
        { id: "a", text: "15\na-b-c" },
        { id: "b", text: "15\nabc" },
        { id: "c", text: "15\n-a-b-c" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "Reduce accumulates: for ints it sums 1+2+3+4+5=15. For strings it concatenates with '-' separator, producing 'a-b-c'.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "reduce", "higher-order"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-5",
      type: "identify-bug",
      question: "What is wrong with this code?",
      code: `package main

func First[T any](slice []T) T {
    if len(slice) == 0 {
        var zero T
        return zero
    }
    return slice[0]
}

func Second[T any](slice []T) T {
    return slice[0]
}

func main() {
    var empty []int
    println(Second(empty))
}`,
      options: [
        { id: "a", text: "Nothing — both functions are correct" },
        { id: "b", text: "Second panics on empty slice; First handles it safely" },
        { id: "c", text: "The zero value return in First is wrong" },
        { id: "d", text: "Neither function compiles" },
      ],
      correctAnswer: "b",
      explanation: "First safely handles empty slices by returning the zero value. Second panics with 'index out of range' on an empty slice.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "zero-value", "panic"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-6",
      type: "multiple-select",
      question: "Which are valid uses of type inference? (Select all that apply)",
      options: [
        { id: "a", text: "Add(1, 2) where Add is func Add[T int | float64](a, b T) T" },
        { id: "b", text: "Map(nums, fn) where Map is func Map[T any, U any](s []T, f func(T) U) []U" },
        { id: "c", text: "Zero[T any]() where Zero has no parameters" },
        { id: "d", text: "Filter[int](slice, pred) with explicit type and inferred rest" },
      ],
      correctAnswer: ["a", "b", "d"],
      explanation: "A and B: Types inferred from arguments. D: Mixed explicit and inferred. C fails because with no parameters, the compiler cannot infer T.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "type-inference", "limitations"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-7",
      type: "multiple-choice",
      question: "What happens when you call a generic function with a type that partially satisfies a union constraint?",
      code: `package main

type Number interface {
    ~int | ~float64
}

func Double[T Number](n T) T {
    return n + n
}

type MyInt int

func main() {
    var x MyInt = 5
    println(Double(x))
}`,
      options: [
        { id: "a", text: "Prints 10 — MyInt satisfies Number because its underlying type is int" },
        { id: "b", text: "Compilation error — MyInt is not int" },
        { id: "c", text: "Panics at runtime" },
        { id: "d", text: "Prints 5" },
      ],
      correctAnswer: "a",
      explanation: "~int in the constraint means any type with underlying type int is accepted. MyInt has underlying type int, so it satisfies Number.",
      difficulty: "hard",
      points: 30,
      tags: ["generics", "tilde", "type-inference"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-8",
      type: "scenario",
      question: "Which generic function signature is best for a cache that stores any value type?",
      options: [
        { id: "a", text: "func Set(key string, value any)" },
        { id: "b", text: "func Set[T any](key string, value T)" },
        { id: "c", text: "func Set(key string, value interface{})" },
        { id: "d", text: "func Set(key string, value *any)" },
      ],
      correctAnswer: "b",
      explanation: "A generic Set preserves type information. When you later Get the value, you retrieve it as the correct type without type assertions.",
      difficulty: "medium",
      points: 20,
      tags: ["generics", "cache", "type-safety"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-9",
      type: "code-output",
      question: "What is the output of this code?",
      code: `package main

import "fmt"

func Contains[T comparable](s []T, v T) bool {
    for _, item := range s {
        if item == v {
            return true
        }
    }
    return false
}

func main() {
    fmt.Println(Contains([]int{1, 2, 3}, 2))
    fmt.Println(Contains([]string{"a", "b"}, "c"))
    fmt.Println(Contains([]bool{true, false}, true))
}`,
      options: [
        { id: "a", text: "true\nfalse\ntrue" },
        { id: "b", text: "false\ntrue\nfalse" },
        { id: "c", text: "1\n0\n1" },
        { id: "d", text: "Compilation error" },
      ],
      correctAnswer: "a",
      explanation: "Contains checks if a value exists in a slice. 2 is in [1,2,3] → true. 'c' is not in ['a','b'] → false. true is in [true,false] → true.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "comparable", "search"],
      relatedLesson: "generic-functions",
    },
    {
      id: "generic-functions-10",
      type: "best-practice",
      question: "When should you use explicit type parameters versus type inference?",
      options: [
        { id: "a", text: "Always use explicit parameters for clarity" },
        { id: "b", text: "Rely on inference when types are obvious; use explicit when inference fails or is ambiguous" },
        { id: "c", text: "Never use explicit parameters" },
        { id: "d", text: "Only use explicit parameters for single type parameter functions" },
      ],
      correctAnswer: "b",
      explanation: "Type inference is preferred when it works (keeps code concise). Use explicit parameters when the compiler can't infer, or you want a different type than inferred.",
      difficulty: "easy",
      points: 10,
      tags: ["generics", "type-inference", "best-practices"],
      relatedLesson: "generic-functions",
    },
  ],
};
