const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
const { handle500s } = require("./errors");
const {
  getTopics,
  getArticleIds,
  patchArticleIds,
  getArticles,
  getUsers,
  getComments,
  getNewComments,
  deleteComments,
} = require("./controllers/controllers");

app.use(bodyParser.json());

//get//
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleIds);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id/comments", getComments);

//patch//
app.patch("/api/articles/:article_id", patchArticleIds);

//post//
app.post("/api/articles/:article_id/comments", getNewComments);

//delete//
app.delete("/api/comments/:comment_id", deleteComments);

//all//
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use(handle500s);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: "path not found " });
  } else next(err);
});

module.exports = app;
