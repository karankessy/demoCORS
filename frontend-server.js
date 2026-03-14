const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/same-origin", (req, res) => {
  res.json({
    message: "This response is from the SAME origin (port 3000).",
    server: `http://localhost:${PORT}`,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`  🌐 Frontend            → http://localhost:${PORT}`);
});
