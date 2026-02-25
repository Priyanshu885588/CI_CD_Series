# Day 02 — Local Setup & Dockerizing the Application

## 🎯 Objective

Prepare the application for CI by creating a reproducible runtime environment using Docker.

---

## 🧭 What We Covered

- Running the Node.js app locally
- Why containers are important in CI/CD
- Writing a simple Dockerfile
- Building and running the container

---

## 🧪 Commands Used in the Video

Build Docker Image

```bash
docker build -t dev-pulse:v1 .
```

Run Container

```bash
docker run -d -p 3000:3000 dev-pulse:v1
```

Verify Container is Running

```bash
docker ps
```

Test Application

```bash
curl http://localhost:3000
```

Stop Container

```bash
docker stop ci-series
```

Remove Container

```bash
docker rm ci-series
```

---

## 🧠 Why Docker in CI/CD

Containers help ensure:

- Consistent environments across machines
- No “works on my machine” issues
- Standardized build artifacts
- Easier deployments

In our pipeline, the Docker image will become the artifact produced by CI.

---

## 🏗️ Docker Build Flow

Source Code → Docker Build → Image → Container Runtime

---

## 📌 What’s Next

In Day 03 we will:

- Design CI pipeline with best DevSecops practice
- Implement shift left model
- Hands on experience creating production grade pipeline
- Build the yaml from scratch
