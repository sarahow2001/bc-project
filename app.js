const express = require("express");
const app = express();
const { handle500s } = require("./errors");
const { getTopics, getArticleIds , patchArticleIds } = require("./controllers/controllers");

//get//
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleIds);

//patch//
// app.patch("/api/articles/:article_id",patchArticleIds);
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handle500s);

// app.use((err, req, res, next) => {
//   if (err.status && err.msg) {
//     res.status(err.status).send({ msg: "path not found " });
//   } else next(err);
// });

module.exports = app;
