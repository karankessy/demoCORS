const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

// ✅ Enable CORS — allows requests from other origins
app.use(
  cors({
    origin: "http://localhost:3000", // allow only the frontend origin
    methods: ["GET", "POST"],        // allowed HTTP methods
    allowedHeaders: ["Content-Type"], // allowed headers
  })
);

app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from the API server!",
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

app.listen(PORT, () => {
  console.log(`\n✅ Backend server (WITH CORS) running on http://localhost:${PORT}`);
  console.log(`   CORS is enabled for origin http://localhost:3000`);
  console.log(`   Requests from port 3000 → port ${PORT} will SUCCEED.\n`);
});
