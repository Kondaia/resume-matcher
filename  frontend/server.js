// frontend/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
// Serve static files
app.use(express.static(path.join(__dirname)));
// Expose config endpoint
app.get('/config', (req, res) => {
  res.json({ token: process.env.GITHUB_PAT, repo: process.env.REPO });
});
const port = 3000;
app.listen(port, () => console.log(`Dev server running at http://localhost:${port}`));