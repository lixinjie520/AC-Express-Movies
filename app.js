const express = require("express");
//console.log(`express的內容為:${express} `);
const app = express();
//console.log(`app的內容為:${app} `);
const port = 3000;
app.get("/", (req, res) => {
  res.redirect("/movies");
});

app.get("/movies", (req, res) => {
  res.send("listing movies");
});

app.get("/movie/:id", (req, res) => {
  const id = req.params.id;
  res.send(`reading movie: ${id}`);
});
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port} `);
});
