-- Roadmap topics seed data
-- Extracted from roadmap.sh Go roadmap

CREATE TABLE IF NOT EXISTS roadmap_topics (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'general',
    difficulty VARCHAR(50) NOT NULL DEFAULT 'beginner',
    description TEXT,
    resource_url VARCHAR(512),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fundamentals
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('hello-world-in-go', 'Hello World in Go', 'fundamentals', 'beginner', 1),
('variables--constants', 'Variables & Constants', 'fundamentals', 'beginner', 2),
('var-vs', 'Var vs :=', 'fundamentals', 'beginner', 3),
('zero-values', 'Zero Values', 'fundamentals', 'beginner', 4),
('data-types', 'Data Types', 'fundamentals', 'beginner', 5),
('integers-signed-unsigned', 'Integers Signed & Unsigned', 'fundamentals', 'beginner', 6),
('floating-points', 'Floating Points', 'fundamentals', 'beginner', 7),
('complex-numbers', 'Complex Numbers', 'fundamentals', 'beginner', 8),
('boolean', 'Boolean', 'fundamentals', 'beginner', 9),
('strings', 'Strings', 'fundamentals', 'beginner', 10),
('interpreted-string-literals', 'Interpreted String Literals', 'fundamentals', 'beginner', 11),
('raw-string-literals', 'Raw String Literals', 'fundamentals', 'beginner', 12),
('runes', 'Runes', 'fundamentals', 'beginner', 13),
('type-inference', 'Type Inference', 'fundamentals', 'beginner', 14),
('type-conversion', 'Type Conversion', 'fundamentals', 'beginner', 15),
('const-and-iota', 'Const and Iota', 'fundamentals', 'beginner', 16),
('conditionals', 'Conditionals', 'fundamentals', 'beginner', 17),
('if', 'If', 'fundamentals', 'beginner', 18),
('if-else', 'If Else', 'fundamentals', 'beginner', 19),
('switch', 'Switch', 'fundamentals', 'beginner', 20),
('loops', 'Loops', 'fundamentals', 'beginner', 21),
('for-loop', 'For Loop', 'fundamentals', 'beginner', 22),
('for-range', 'For Range', 'fundamentals', 'beginner', 23),
('break', 'Break', 'fundamentals', 'beginner', 24),
('continue', 'Continue', 'fundamentals', 'beginner', 25),
('goto-discouraged', 'Goto (Discouraged)', 'fundamentals', 'beginner', 26),
('functions-basics', 'Functions Basics', 'fundamentals', 'beginner', 27),
('functions', 'Functions', 'fundamentals', 'beginner', 28),
('multiple-return-values', 'Multiple Return Values', 'fundamentals', 'beginner', 29),
('named-return-values', 'Named Return Values', 'fundamentals', 'beginner', 30),
('variadic-functions', 'Variadic Functions', 'fundamentals', 'beginner', 31),
('anonymous-functions', 'Anonymous Functions', 'fundamentals', 'beginner', 32),
('closures', 'Closures', 'fundamentals', 'beginner', 33),
('scope-and-shadowing', 'Scope and Shadowing', 'fundamentals', 'beginner', 34),
('packages', 'Packages', 'fundamentals', 'beginner', 35),
('package-import-rules', 'Package Import Rules', 'fundamentals', 'beginner', 36),
('arrays', 'Arrays', 'fundamentals', 'beginner', 37),
('slices', 'Slices', 'fundamentals', 'beginner', 38),
('array-to-slice-conversion', 'Array to Slice Conversion', 'fundamentals', 'beginner', 39),
('slice-to-array-conversion', 'Slice to Array Conversion', 'fundamentals', 'beginner', 40),
('capacity-and-growth', 'Capacity and Growth', 'fundamentals', 'beginner', 41),
('maps', 'Maps', 'fundamentals', 'beginner', 42),
('iterating-maps', 'Iterating Maps', 'fundamentals', 'beginner', 43),
('make', 'Make', 'fundamentals', 'beginner', 44),
('call-by-value', 'Call by Value', 'fundamentals', 'beginner', 45),
('pointers-basics', 'Pointers Basics', 'fundamentals', 'beginner', 46),
('pointers', 'Pointers', 'fundamentals', 'beginner', 47),
('comma-ok-idiom', 'Comma Ok Idiom', 'fundamentals', 'beginner', 48)
ON CONFLICT (slug) DO NOTHING;

-- Intermediate
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('structs', 'Structs', 'intermediate', 'intermediate', 100),
('embedding-structs', 'Embedding Structs', 'intermediate', 'intermediate', 101),
('struct-tags--json', 'Struct Tags & JSON', 'intermediate', 'intermediate', 102),
('methods-vs-functions', 'Methods vs Functions', 'intermediate', 'intermediate', 103),
('value-receivers', 'Value Receivers', 'intermediate', 'intermediate', 104),
('pointer-receivers', 'Pointer Receivers', 'intermediate', 'intermediate', 105),
('pointers-with-structs', 'Pointers with Structs', 'intermediate', 'intermediate', 106),
('interfaces-basics', 'Interfaces Basics', 'intermediate', 'intermediate', 107),
('interfaces', 'Interfaces', 'intermediate', 'intermediate', 108),
('empty-interfaces', 'Empty Interfaces', 'intermediate', 'intermediate', 109),
('embedding-interfaces', 'Embedding Interfaces', 'intermediate', 'intermediate', 110),
('type-assertions', 'Type Assertions', 'intermediate', 'intermediate', 111),
('type-switch', 'Type Switch', 'intermediate', 'intermediate', 112),
('error-handling-basics', 'Error Handling Basics', 'intermediate', 'intermediate', 113),
('error-interface', 'Error Interface', 'intermediate', 'intermediate', 114),
('errorsnew', 'Errors.New', 'intermediate', 'intermediate', 115),
('fmterrorf', 'Fmt.Errorf', 'intermediate', 'intermediate', 116),
('sentinel-errors', 'Sentinel Errors', 'intermediate', 'intermediate', 117),
('wrappingunwrapping-errors', 'Wrapping/Unwrapping Errors', 'intermediate', 'intermediate', 118),
('panic-and-recover', 'Panic and Recover', 'intermediate', 'intermediate', 119),
('goroutines', 'Goroutines', 'intermediate', 'intermediate', 120),
('channels', 'Channels', 'intermediate', 'intermediate', 121),
('buffered-vs-unbuffered', 'Buffered vs Unbuffered', 'intermediate', 'intermediate', 122),
('select-statement', 'Select Statement', 'intermediate', 'intermediate', 123),
('concurrency-patterns', 'Concurrency Patterns', 'intermediate', 'intermediate', 124),
('fan-in', 'Fan In', 'intermediate', 'intermediate', 125),
('fan-out', 'Fan Out', 'intermediate', 'intermediate', 126),
('pipeline', 'Pipeline', 'intermediate', 'intermediate', 127),
('worker-pools', 'Worker Pools', 'intermediate', 'intermediate', 128),
('mutexes', 'Mutexes', 'intermediate', 'intermediate', 129),
('waitgroups', 'WaitGroups', 'intermediate', 'intermediate', 130),
('sync-package', 'Sync Package', 'intermediate', 'intermediate', 131),
('race-detection', 'Race Detection', 'intermediate', 'intermediate', 132),
('race-detector', 'Race Detector', 'intermediate', 'intermediate', 133),
('common-usecases', 'Common Use Cases', 'intermediate', 'intermediate', 134),
('context-package', 'Context Package', 'intermediate', 'intermediate', 135),
('deadlines--cancellations', 'Deadlines & Cancellations', 'intermediate', 'intermediate', 136),
('iterating-strings', 'Iterating Strings', 'intermediate', 'intermediate', 137)
ON CONFLICT (slug) DO NOTHING;

-- Advanced
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('generics', 'Generics', 'advanced', 'advanced', 200),
('why-generics', 'Why Generics', 'advanced', 'advanced', 201),
('generic-types--interfaces', 'Generic Types & Interfaces', 'advanced', 'advanced', 202),
('generic-functions', 'Generic Functions', 'advanced', 'advanced', 203),
('type-constraints', 'Type Constraints', 'advanced', 'advanced', 204),
('with-maps--slices', 'With Maps & Slices', 'advanced', 'advanced', 205),
('reflection', 'Reflection', 'advanced', 'advanced', 206),
('unsafe-package', 'Unsafe Package', 'advanced', 'advanced', 207),
('cgo-basics', 'Cgo Basics', 'advanced', 'advanced', 208),
('memory-management', 'Memory Management', 'advanced', 'advanced', 209),
('memory-mgmt-in-depth', 'Memory Management in Depth', 'advanced', 'advanced', 210),
('escape-analysis', 'Escape Analysis', 'advanced', 'advanced', 211),
('garbage-collection', 'Garbage Collection', 'advanced', 'advanced', 212),
('compiler--linker-flags', 'Compiler & Linker Flags', 'advanced', 'advanced', 213),
('cross-compilation', 'Cross Compilation', 'advanced', 'advanced', 214),
('build-constraints--tags', 'Build Constraints & Tags', 'advanced', 'advanced', 215),
('build-tags', 'Build Tags', 'advanced', 'advanced', 216),
('plugins--dynamic-loading', 'Plugins & Dynamic Loading', 'advanced', 'advanced', 217),
('goembed-for-embedding', 'Go Embed for Embedding', 'advanced', 'advanced', 218)
ON CONFLICT (slug) DO NOTHING;

-- Standard Library / Packages
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('standard-library', 'Standard Library', 'packages', 'beginner', 300),
('flag', 'Flag', 'packages', 'beginner', 301),
('io--file-handling', 'IO & File Handling', 'packages', 'intermediate', 302),
('bufio', 'Bufio', 'packages', 'intermediate', 303),
('os', 'OS', 'packages', 'intermediate', 304),
('nethttp-standard', 'net/http Standard', 'packages', 'intermediate', 305),
('encodingjson', 'Encoding/JSON', 'packages', 'intermediate', 306),
('time', 'Time', 'packages', 'intermediate', 307),
('regexp', 'Regexp', 'packages', 'intermediate', 308),
('logging', 'Logging', 'packages', 'intermediate', 309),
('slog', 'Slog', 'packages', 'intermediate', 310)
ON CONFLICT (slug) DO NOTHING;

-- Modules & Dependencies
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('modules--dependencies', 'Modules & Dependencies', 'packages', 'intermediate', 311),
('go-mod', 'Go Mod', 'packages', 'intermediate', 312),
('go-mod-init', 'Go Mod Init', 'packages', 'intermediate', 313),
('go-mod-tidy', 'Go Mod Tidy', 'packages', 'intermediate', 314),
('go-mod-vendor', 'Go Mod Vendor', 'packages', 'intermediate', 315),
('publishing-modules', 'Publishing Modules', 'packages', 'intermediate', 316),
('using-3rd-party-packages', 'Using 3rd Party Packages', 'packages', 'intermediate', 317)
ON CONFLICT (slug) DO NOTHING;

-- Frameworks & Libraries
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('gin', 'Gin', 'frameworks', 'intermediate', 400),
('echo', 'Echo', 'frameworks', 'intermediate', 401),
('fiber', 'Fiber', 'frameworks', 'intermediate', 402),
('beego', 'Beego', 'frameworks', 'intermediate', 403),
('gorm', 'GORM', 'frameworks', 'intermediate', 404),
('pgx', 'Pgx', 'frameworks', 'intermediate', 405),
('cobra', 'Cobra', 'frameworks', 'intermediate', 406),
('urfavecli', 'Urfave CLI', 'frameworks', 'intermediate', 407),
('bubbletea', 'Bubble Tea', 'frameworks', 'intermediate', 408),
('melody', 'Melody', 'frameworks', 'intermediate', 409),
('centrifugo', 'Centrifugo', 'frameworks', 'intermediate', 410),
('zap', 'Zap', 'frameworks', 'intermediate', 411),
('zerolog', 'Zerolog', 'frameworks', 'intermediate', 412),
('orms--db-access', 'ORMs & DB Access', 'frameworks', 'intermediate', 413)
ON CONFLICT (slug) DO NOTHING;

-- Tools
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('go-command', 'Go Command', 'tools', 'beginner', 500),
('go-run', 'Go Run', 'tools', 'beginner', 501),
('go-build', 'Go Build', 'tools', 'beginner', 502),
('go-install', 'Go Install', 'tools', 'beginner', 503),
('go-version', 'Go Version', 'tools', 'beginner', 504),
('go-fmt', 'Go Fmt', 'tools', 'beginner', 505),
('go-vet', 'Go Vet', 'tools', 'beginner', 506),
('go-test', 'Go Test', 'tools', 'beginner', 507),
('go-doc', 'Go Doc', 'tools', 'beginner', 508),
('go-generate', 'Go Generate', 'tools', 'beginner', 509),
('go-clean', 'Go Clean', 'tools', 'beginner', 510),
('commands--docs', 'Commands & Docs', 'tools', 'beginner', 511),
('golangci-lint', 'Golangci Lint', 'tools', 'intermediate', 512),
('goimports', 'Go Imports', 'tools', 'beginner', 513),
('staticcheck', 'Staticcheck', 'tools', 'intermediate', 514),
('revive', 'Revive', 'tools', 'intermediate', 515),
('govulncheck', 'Govulncheck', 'tools', 'intermediate', 516),
('pprof', 'Pprof', 'tools', 'advanced', 517),
('trace', 'Trace', 'tools', 'advanced', 518),
('stack-traces--debugging', 'Stack Traces & Debugging', 'tools', 'intermediate', 519),
('benchmarks', 'Benchmarks', 'tools', 'advanced', 520)
ON CONFLICT (slug) DO NOTHING;

-- Testing
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('testing-package-basics', 'Testing Package Basics', 'testing', 'intermediate', 600),
('table-driven-tests', 'Table Driven Tests', 'testing', 'intermediate', 601),
('mocks-and-stubs', 'Mocks and Stubs', 'testing', 'intermediate', 602),
('coverage', 'Coverage', 'testing', 'intermediate', 603),
('httptest--for-http-tests', 'HTTP Test for HTTP Tests', 'testing', 'intermediate', 604)
ON CONFLICT (slug) DO NOTHING;

-- Projects / Building
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('building-clis', 'Building CLIs', 'projects', 'intermediate', 700),
('building-executables', 'Building Executables', 'projects', 'intermediate', 701),
('web-development', 'Web Development', 'projects', 'intermediate', 702),
('grpc--protocol-buffers', 'gRPC & Protocol Buffers', 'projects', 'advanced', 703),
('realtime-communication', 'Realtime Communication', 'projects', 'advanced', 704)
ON CONFLICT (slug) DO NOTHING;

-- General / Introduction
INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order) VALUES
('introduction-to-go', 'Introduction to Go', 'fundamentals', 'beginner', 0),
('history-of-go', 'History of Go', 'fundamentals', 'beginner', 0),
('why-use-go', 'Why Use Go', 'fundamentals', 'beginner', 0),
('setting-up-the-environment', 'Setting Up the Environment', 'fundamentals', 'beginner', 0)
ON CONFLICT (slug) DO NOTHING;
