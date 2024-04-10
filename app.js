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
// 設定模版引擎
app.engine(".hbs", engine({ extname: ".hbs" }));
// 使用模版引擎是hbs
app.set("view engine", ".hbs");
// 設定模版引擎的路徑
app.set("views", "./views");

// 載入靜態資料夾
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/movies");
});

app.get("/movies", (req, res) => {
  // 取得使用者搜尋的電影名稱
  // 加上trim()就不行!!!
  const keyword = req.query.search;
  //console.log(keyword);
  const matchedMovies = keyword
    ? movies.filter((mv) =>
        Object.values(mv).some((property) => {
          if (typeof property === "string") {
            return property.toLowerCase().includes(keyword.toLowerCase());
          }
          return false;
        })
      )
    : movies;
  res.render("index", { movies: matchedMovies, BASE_IMG_URL, keyword });
});

app.get("/movie/:id", (req, res) => {
  // 取得 id
  const id = req.params.id;
  const movie = movies.find((mv) => mv.id.toString() === id);
  res.render("detail", { movie, BASE_IMG_URL });
});
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port} `);
});
