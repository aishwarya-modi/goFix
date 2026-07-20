import { defineRailway, project, service } from "railway/iac";

export default defineRailway(() => {
  const backend = service("backend", {
    build: {
      dockerfilePath: "Dockerfile",
    },
    deploy: {
      startCommand: "./server",
      healthcheckPath: "/health",
      healthcheckTimeout: 10,
      restartPolicyType: "ON_FAILURE",
      restartPolicyMaxRetries: 3,
    },
    env: {
      PORT: "8080",
    },
  });

  const frontend = service("frontend", {
    rootDirectory: "frontend",
    build: {
      dockerfilePath: "Dockerfile",
    },
    deploy: {
      startCommand: "node server.js",
      healthcheckPath: "/",
      healthcheckTimeout: 10,
      restartPolicyType: "ON_FAILURE",
      restartPolicyMaxRetries: 3,
    },
    env: {
      NODE_ENV: "production",
    },
  });

  return project("golang-interview", {
    resources: [backend, frontend],
  });
});
