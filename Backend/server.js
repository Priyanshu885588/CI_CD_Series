const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for basic request logging (Useful for CI/CD observability)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// 1. System Metrics Endpoint (Infrastructure Level)
app.get("/api/metrics", (req, res) => {
  try {
    const metrics = {
      platform: os.platform(),
      uptime: Math.floor(os.uptime()),
      totalMemory: (os.totalmem() / 1024 ** 3).toFixed(2), // GB
      freeMemory: (os.freemem() / 1024 ** 3).toFixed(2), // GB
      cpuCount: os.cpus().length,
      loadAverage: os.loadavg(),
      timestamp: new Date().toISOString(),
    };
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch system metrics" });
  }
});
// hello test
// 2. Process Info Endpoint (Application Level)
// Great for showing how Docker isolates the process
app.get("/api/proc", (req, res) => {
  res.status(200).json({
    pid: process.pid,
    version: process.version,
    memoryUsage: process.memoryUsage(),
    env: process.env.NODE_ENV || "development",
    cpuUsage: process.cpuUsage(),
  });
});

// 3. Simulated Error Endpoint
// USE THIS TO BREAK YOUR PIPELINE: You can write a test that checks if this
// endpoint returns a 500, simulating a dependency failure.
app.get("/api/simulate-error", (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "Simulated Dependency Failure" });
});

// Health check endpoint for CI/CD
app.get("/health", (req, res) => {
  res.status(200).send("Healthy");
});

// Listen
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Dev-Pulse running at http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/health`);
    console.log(`📊 Process Info: http://localhost:${PORT}/api/proc`);
  });
}

module.exports = app; // Exported for testing
