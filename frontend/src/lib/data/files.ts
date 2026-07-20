export interface GoFile {
  path: string;
  name: string;
  language: string;
  content: string;
  issues: string[];
}

export const goFiles: GoFile[] = [
  {
    path: "cmd/main.go",
    name: "main.go",
    language: "go",
    content: `package main

import (
	"database/sql"
	"fmt"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"

	"golang-interview-prep/internal/user"
	"log"
	"net/http"
)

func main() {

	runMigrations()

	svc, err := user.NewService("admin", "admin")
	if err != nil {
		log.Fatal(err)
	}

	h := user.Handler{Svc: *svc}

	http.HandleFunc("/user", h.AddUser)

	log.Println("starting http server")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func runMigrations() {
	// Database connection string
	dbURL := "postgres://admin:admin@localhost/test_repo?sslmode=disable"

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create a new instance of the PostgreSQL driver for migrate
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatal(err)
	}

	m, err := migrate.NewWithDatabaseInstance("file://internal/migrations", "postgres", driver)
	if err != nil {
		log.Fatal(err)
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}

	fmt.Println("Database migration complete.")
}`,
    issues: ["hardcoded-credentials", "hardcoded-connection", "multiple-db-connections"],
  },
  {
    path: "internal/user/service.go",
    name: "service.go",
    language: "go",
    content: `package user

import (
	"database/sql"
	"errors"
	"fmt"
	_ "github.com/lib/pq"
)

type service struct {
	dbUser     string
	dbPassword string
}

func NewService(dbUser, dbPassword string) (*service, error) {
	if dbUser == "" {
		return nil, errors.New("dbUser was empty")
	}
	return &service{dbUser: dbUser, dbPassword: dbPassword}, nil
}

type User struct {
	Name     string
	Password string
}

func (s *service) AddUser(u User) (string, error) {
	db, err := sql.Open("postgres", "postgres://admin:admin@localhost/test_repo?sslmode=disable")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	var id string
	q := "INSERT INTO users (username, password) VALUES ('" + u.Name + "', '" + u.Password + "') RETURNING id"

	err = db.QueryRow(q).Scan(&id)
	if err != nil {
		return "", fmt.Errorf("failed to insert: %w", err)
	}

	return id, nil
}`,
    issues: ["sql-injection", "plaintext-passwords", "multiple-db-connections", "panic-usage", "no-validation"],
  },
  {
    path: "internal/user/http.go",
    name: "http.go",
    language: "go",
    content: `package user

import (
	"encoding/json"
	"net/http"
)

type Handler struct {
	Svc service
}

func (h Handler) AddUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var u User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request body"))
		return
	}
	// Call the AddUser function
	message, err := h.Svc.AddUser(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to add user"))
	}

	// Return a success response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(message))
}`,
    issues: ["no-authentication", "missing-return-after-error", "no-content-type-header", "no-input-validation"],
  },
  {
    path: "internal/migrations/000001_create_users_table.up.sql",
    name: "000001_create_users_table.up.sql",
    language: "sql",
    content: `-- Up migration steps
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       password VARCHAR(255) NOT NULL
);`,
    issues: ["missing-unique-constraint"],
  },
  {
    path: "internal/migrations/000001_create_users_table.down.sql",
    name: "000001_create_users_table.down.sql",
    language: "sql",
    content: `-- Down migration steps
DROP TABLE users;`,
    issues: [],
  },
  {
    path: "docker-compose.yaml",
    name: "docker-compose.yaml",
    language: "yaml",
    content: `version: '3.9'
services:
  postgres:
    image: postgres:16
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: test_repo
    volumes:
      - ./data:/var/lib/postgresql/data`,
    issues: ["hardcoded-credentials-docker"],
  },
  {
    path: "go.mod",
    name: "go.mod",
    language: "go",
    content: `module golang-interview-prep

go 1.20

require (
	github.com/golang-migrate/migrate/v4 v4.16.1
	github.com/lib/pq v1.10.9
)

require (
	github.com/hashicorp/errwrap v1.1.0 // indirect
	github.com/hashicorp/go-multierror v1.1.1 // indirect
	github.com/sirupsen/logrus v1.9.3 // indirect
	github.com/stretchr/testify v1.8.3 // indirect
	go.uber.org/atomic v1.11.0 // indirect
	golang.org/x/tools v0.9.3 // indirect
)`,
    issues: ["outdated-go-version"],
  },
];

export function getFileByPath(path: string): GoFile | undefined {
  return goFiles.find((f) => f.path === path);
}

export function getFilesWithIssues(): GoFile[] {
  return goFiles.filter((f) => f.issues.length > 0);
}
