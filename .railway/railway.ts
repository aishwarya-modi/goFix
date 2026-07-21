import { defineRailway, github, postgres, project, service } from "railway/iac";

export default defineRailway(() => {
  const db = postgres("Postgres");

  const backend = service("backend", {
    source: github("aishwarya-modi/goFix"),
    build: "CGO_ENABLED=0 go build -o server ./cmd/main.go",
    start: "./server",
    healthcheck: "/health",
    healthcheckTimeout: 10,
    env: {
      PORT: "8080",
      DB_HOST: db.env.PGHOST,
      DB_PORT: db.env.PGPORT,
      DB_USER: db.env.PGUSER,
      DB_PASSWORD: db.env.PGPASSWORD,
      DB_NAME: db.env.PGDATABASE,
    },
  });

  const frontend = service("frontend", {
    source: github("aishwarya-modi/goFix", { rootDirectory: "frontend" }),
    build: "npm run build",
    start: "node server.js",
    healthcheck: "/",
    healthcheckTimeout: 30,
    env: {
      NODE_ENV: "production",
      DATABASE_URL: db.env.DATABASE_URL,
      NEXT_PUBLIC_APP_URL: backend.env.RAILWAY_PUBLIC_DOMAIN,
    },
  });

  return project("golang-interview", {
    resources: [db, backend, frontend],
  });
});
