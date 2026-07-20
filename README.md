# GoFix — Go Backend Interview Preparation

An interactive platform for mastering Go backend engineering through hands-on debugging, security hardening, and code review. Built as an educational tool similar to Frontend Mentor / LeetCode, but focused specifically on Go backend development.

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Features

### Challenge Dashboard
- **VSCode-style interface** with file tabs, code viewer, and task sidebar
- **7 progressive tasks** with hints and solutions
- **12 security issues** to identify and fix
- **7 Go source files** with intentional bugs

### Learning Roadmap
- **172 structured topics** across 8 categories
- **Comprehensive content** for each topic with:
  - Overview and real-world examples
  - Bad vs Good code comparisons
  - Line-by-line explanations
  - Best practices and common mistakes
  - Interview questions and exercises
  - Further reading links

### Security Scanner
- **Animated vulnerability scan** with severity breakdown
- **Expandable results** with fix suggestions
- **Real security issues** from OWASP Top 10

### Admin Dashboard
- **Visitor analytics** with daily charts
- **Top pages** and recent activity
- **Registered users** table
- **System health** status

### Authentication
- **User registration** and login
- **Role-based access** (admin/user)
- **Progress tracking** per user

### Interactive Tours
- **Application tour** with spotlight overlay
- **Keyboard navigation** (arrows/Enter/Escape)
- **Persistent state** via localStorage

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, Shadcn UI |
| State | Zustand with persistence |
| Animation | Framer Motion |
| Database | PostgreSQL 16 |
| Backend | Go 1.20 |
| Deployment | Railway, Vercel |

## Project Structure

```
golang-interview/
├── cmd/
│   └── main.go                 # Go entry point
├── internal/
│   ├── user/
│   │   ├── http.go             # HTTP handler with bugs
│   │   └── service.go          # Service with SQL injection
│   └── migrations/             # Database migrations
├── frontend/
│   ├── src/
│   │   ├── app/                # Next.js pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── challenge/      # Challenge dashboard
│   │   │   ├── learn/          # Learning roadmap
│   │   │   ├── security/       # Security scanner
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── login/          # Login page
│   │   │   └── signup/         # Signup page
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities and data
│   │   │   ├── data/           # Content and configurations
│   │   │   └── content/        # Topic content (172 topics)
│   │   └── store/              # Zustand stores
│   └── public/                 # Static assets
├── docker-compose.yaml         # Local development
├── Dockerfile                  # Go backend production
└── railway.json                # Railway deployment
```

## Getting Started

### Prerequisites

- **Go** 1.20+
- **Node.js** 18+
- **PostgreSQL** 16
- **Docker** (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/golang-interview.git
   cd golang-interview
   ```

2. **Start PostgreSQL**
   ```bash
   docker-compose up -d
   ```

3. **Start the Go backend**
   ```bash
   go run ./cmd/main.go
   ```

4. **Start the Next.js frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Docker Development

```bash
# Build and start all services
docker-compose up --build

# Or build individual services
docker build -t gofix-backend .
docker build -t gofix-frontend -f frontend/Dockerfile frontend/
```

## Configuration

### Environment Variables

#### Frontend (`frontend/.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://admin:admin@localhost:5432/test_repo?sslmode=disable` |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8080` |

#### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL user | `admin` |
| `DB_PASSWORD` | PostgreSQL password | `admin` |
| `DB_NAME` | PostgreSQL database | `test_repo` |
| `PORT` | Server port | `8080` |

## API Endpoints

### Frontend API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/roadmap` | Get all roadmap topics |
| GET | `/api/progress?userId=` | Get user progress |
| POST | `/api/progress` | Update user progress |
| GET | `/api/quizzes?topic=` | Get quiz questions |
| POST | `/api/quizzes` | Submit quiz answer |
| GET | `/api/analytics` | Get visitor analytics |
| POST | `/api/visitors` | Track page visit |
| GET | `/api/health` | Health check |
| POST | `/api/setup` | Run migrations |

### Backend API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/user` | Create user |

## Database Schema

### Tables

- **roadmap_topics** - 172 learning topics
- **quizzes** - Quiz questions (62+ questions)
- **user_progress** - User completion tracking
- **quiz_attempts** - Quiz answer history
- **visitor_logs** - Page visit analytics
- **rate_limits** - API rate limiting

## Learning Topics

### Categories

| Category | Topics | Description |
|----------|--------|-------------|
| Fundamentals | 53 | Variables, types, control flow, functions |
| Intermediate | 38 | Structs, interfaces, error handling, concurrency |
| Advanced | 19 | Generics, reflection, memory management |
| Standard Library | 18 | net/http, encoding/json, io, time |
| Tools | 21 | go build, go test, pprof, linting |
| Frameworks | 14 | Gin, Echo, GORM, Zap |
| Testing | 5 | Table-driven tests, mocks, coverage |
| Projects | 5 | CLIs, web apps, gRPC |

## Deployment

### Railway

See [RAILWAY_DEPLOY.md](./RAILWAY_DEPLOY.md) for detailed instructions.

Quick start:
1. Push to GitHub
2. Connect to Railway
3. Add PostgreSQL service
4. Configure environment variables
5. Deploy

### Vercel (Frontend Only)

See [DEPLOY.md](./DEPLOY.md) for Vercel deployment.

## Development

### Adding New Topics

1. Add topic to database:
   ```sql
   INSERT INTO roadmap_topics (slug, title, category, difficulty, sort_order)
   VALUES ('topic-slug', 'Topic Title', 'fundamentals', 'beginner', 1);
   ```

2. Add content to `frontend/src/lib/data/content/<category>.ts`

3. Add quiz questions to database via `/api/setup`

### Code Style

- **Go**: Follow [Effective Go](https://go.dev/doc/effective_go) conventions
- **TypeScript**: Use ESLint with Next.js config
- **CSS**: Tailwind CSS with Shadcn components

### Testing

```bash
# Go tests
go test ./...

# Frontend lint
cd frontend && npm run lint

# Frontend build
cd frontend && npm run build
```

## Intentional Bugs

This project contains intentional security vulnerabilities for educational purposes:

### Go Backend Issues
- **SQL Injection** in `internal/user/service.go:14`
- **Hardcoded credentials** in `cmd/main.go`
- **Plaintext passwords** in `internal/user/service.go:16`
- **Panic usage** in `internal/user/service.go:18`
- **Missing error handling** in `internal/user/http.go:22`
- **No authentication** on endpoints

### Frontend Issues
These are intentionally weak patterns for learning:
- Basic validation only
- No CSRF protection (educational purpose)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Go Documentation](https://go.dev/doc/)
- [Effective Go](https://go.dev/doc/effective_go)
- [Go Blog](https://go.dev/blog/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)

## Support

If you find this project helpful, please give it a ⭐ on GitHub!
