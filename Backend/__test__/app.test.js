const request = require("supertest");
const app = require("../server");

describe("CI/CD Pipeline Critical Checks", () => {
  // 1. Health Check (Ensures Server actually starts)
  test("GET /health should return 200 OK", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Healthy");
  });

  // 2. Metrics API Test (Ensures business logic works)
  test("GET /api/metrics should return system data", async () => {
    const response = await request(app).get("/api/metrics");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("cpuCount");
    expect(response.body).toHaveProperty("totalMemory");
    expect(typeof response.body.cpuCount).toBe("number");
  });

  // 3. Security/Failure Scenario (To show "breaking" the pipeline)
  // If you want to "break" the pipeline in your video, change '200' to '404' below
  test("Verify dashboard is accessible", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
