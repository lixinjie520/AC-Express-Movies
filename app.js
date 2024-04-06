const express = require("express");
//console.log(`express的內容為:${express} `);
const { engine } = require("express-handlebars");
const app = express();
//console.log(`app的內容為:${app} `);
const port = 3000;
// 載入模組（例如 Express、Handlebars)、設定路由
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/movies");
});

app.get("/movies", (req, res) => {
    res.render("index");
});

app.get("/movie/:id", (req, res) => {
    const id = req.params.id;
    res.send(`reading movie: ${id}`);
});
app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port} `);
});