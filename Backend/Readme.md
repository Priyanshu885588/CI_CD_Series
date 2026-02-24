# Dev-Pulse | Production-Ready System Monitor

Dev-Pulse is a lightweight system monitoring dashboard designed to demonstrate a modern Software Development Lifecycle (SDLC). It focuses on the transition from _"Works on my machine"_ to a robust, containerized production environment.

---

## 🏗 System Architecture

The application follows a modular architecture to ensure clean separation of concerns:

```
[ User Browser ] <---- HTTP ----> [ Node.js Express Server ]
       ^                                      |
       |                                      |-- os (Native Module)
(Glassmorphism UI)                            |-- process (Global Object)
(Tailwind CSS)                                |
                                              +-- Jest (Testing Layer)
                                              |
                                    [ Docker Container ]
```

**Communication Flow:**

- **Frontend:** A single-page application (SPA) built with Tailwind CSS. It polls the backend every 5 seconds using the Fetch API to update infrastructure metrics.
- **Backend:** An Express.js server that acts as a bridge between the operating system and the UI.

**Internal APIs:**

- `/api/metrics` — Aggregates hardware data like CPU cores and RAM usage.
- `/api/proc` — Exposes application-level process details (PID, Uptime, Node Version).
- `/health` — A critical endpoint used by CI/CD pipelines to verify deployment success.

---

## 📂 Project Structure

```
.
├── __tests__/      # Automated Test Suite (Unit & Integration)
├── public/         # Frontend Assets (HTML/Tailwind UI)
├── server.js       # Core Express Application Logic
├── Dockerfile      # Container Definition (Production-ready)
├── package.json    # Dependencies, Metadata & Scripts
└── README.md       # Documentation
```

---

## 🛠 Installation & Setup

**Prerequisites:**

- **Node.js:** v18.x or higher
- **Docker:** For containerization demonstrations

### Local Development

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd dev-pulse
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run Tests (The CI Step):**

   ```bash
   npm test
   ```

4. **Start the Application:**
   ```bash
   npm start
   ```

The dashboard will be live at **http://localhost:3000**.

---

## 🐳 Dockerization

This app is optimized to run inside a Docker container, showcasing environment isolation.

1. **Build the Production Image:**

   ```bash
   docker build -t dev-pulse:v1 .
   ```

2. **Spin up the Container:**
   ```bash
   docker run -p 3000:3000 dev-pulse:v1
   ```

> **DevOps Tip:** Observe the Process ID (PID) in the dashboard. On your local machine, it varies; inside Docker, it will be `1`. This is a visual proof of container isolation.

---

## 🧪 CI/CD Implementation Roadmap

This project is the core of a series on **"Evolutionary Pipelines"**:

| Phase       | Description                                        |
| ----------- | -------------------------------------------------- |
| **Phase 1** | Initial setup and "Manual" deployment pains.       |
| **Phase 2** | Integrating Jest to catch "Simulated Failures."    |
| **Phase 3** | Containerizing the workflow for consistent builds. |
| **Phase 4** | Automating the push to production.                 |

---

## 🤝 Contributing

This project is an educational resource. If you have ideas for adding more "Pipeline-breaking" scenarios or improving the dashboard UI, feel free to open a Pull Request!

**Project Lead:** Priyanshu Mandani
