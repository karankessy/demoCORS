const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4001;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  })
);

app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from the API server (WITH CORS)!",
    server: `http://localhost:${PORT}`,
    timestamp: new Date().toISOString(),
    items: ["Apple", "Banana", "Cherry"],
  });
});

app.get("/api/user", (req, res) => {
  res.json({
    name: "Karan",
    role: "Developer",
    email: "karan@example.com",
  });
});

app.post("/api/data", (req, res) => {
  const { item } = req.body || {};
  res.status(201).json({
    message: "Item received (WITH CORS server)!",
    received: item || null,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`  ✅ Backend (WITH CORS)  → http://localhost:${PORT}`);
});
