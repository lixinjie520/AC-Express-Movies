const express = require("express");
//console.log(`express的內容為:${express} `);
const { engine } = require("express-handlebars");
const app = express();
//console.log(`app的內容為:${app} `);
// 將電影清單存入 movies 變數
const movies = require("./public/jsons/movies.json").results;
const port = 3000;
const BASE_IMG_URL = "https://movie-list.alphacamp.io/posters/";
// 載入模組（例如 Express、Handlebars)、設定路由
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/movies");
});

app.get("/movies", (req, res) => {
    res.render("index", { movies, BASE_IMG_URL });
});

app.get("/movie/:id", (req, res) => {
    const id = req.params.id;
    const movie = movies.find((mv) => mv.id.toString() === id);
    res.render("detail", { movie, BASE_IMG_URL });
});
app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port} `);
});