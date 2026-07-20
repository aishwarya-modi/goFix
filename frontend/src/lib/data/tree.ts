export interface FileNode {
  name: string;
  type: "file" | "folder";
  path?: string;
  children?: FileNode[];
}

export const fileTree: FileNode[] = [
  {
    name: "cmd",
    type: "folder",
    children: [
      { name: "main.go", type: "file", path: "cmd/main.go" },
    ],
  },
  {
    name: "internal",
    type: "folder",
    children: [
      {
        name: "migrations",
        type: "folder",
        children: [
          { name: "000001_create_users_table.up.sql", type: "file", path: "internal/migrations/000001_create_users_table.up.sql" },
          { name: "000001_create_users_table.down.sql", type: "file", path: "internal/migrations/000001_create_users_table.down.sql" },
        ],
      },
      {
        name: "user",
        type: "folder",
        children: [
          { name: "http.go", type: "file", path: "internal/user/http.go" },
          { name: "service.go", type: "file", path: "internal/user/service.go" },
        ],
      },
    ],
  },
  { name: "docker-compose.yaml", type: "file", path: "docker-compose.yaml" },
  { name: "go.mod", type: "file", path: "go.mod" },
];
