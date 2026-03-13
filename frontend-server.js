const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`\n🌐 Frontend server running on http://localhost:${PORT}`);
  console.log(`   Open http://localhost:${PORT} in your browser.\n`);
});
