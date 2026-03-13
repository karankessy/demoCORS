const express = require("express");
const app = express();
const PORT = 4000;

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
  console.log(`\n🚫 Backend server (NO CORS) running on http://localhost:${PORT}`);
  console.log(`   Try opening http://localhost:3000 in your browser.`);
  console.log(`   Requests from port 3000 → port ${PORT} will be BLOCKED by CORS policy.\n`);
});
