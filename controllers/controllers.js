const { get } = require("express/lib/response");
const {
  fetchTopics,
  fetchArticleId,
  updatedArticleId,
  fetchUsers,
  fetchArticles,
  fetchComments,
  addComment,
  removeComment,
} = require("../models/models");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      return res.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleIds = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleId(article_id)
    .then((articles) => {
      res.status(200).send({ article: articles[0] });
    })

    .catch((err) => {
      next(err);
    });
};

exports.patchArticleIds = (req, res, next) => {
  updatedArticleId(req.params.article_id, req.body)
    .then((articles) => {
      res.status(200).send({ articles });
    })

    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query.order, req.query.sort_by, req.query.topic)
    .then((articles) => {
      return res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      return res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  fetchComments(req.params.article_id)
    .then((comments) => {
      return res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getNewComments = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;
  addComment(article_id, username, body)
    .then((comments) => {
      return res.status(201).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((comment) => {
      console.log(comment, "here");
      return res.status(204).send("no content");
    })
    .catch((err) => {
      next(err);
    });
};
