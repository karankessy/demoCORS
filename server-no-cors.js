const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from the API server (NO CORS)!",
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
    message: "Item received (NO CORS server)!",
    received: item || null,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`  🚫 Backend (NO CORS)   → http://localhost:${PORT}`);
});
