const { get } = require("express/lib/response");
const {
  fetchTopics,
  fetchArticleId,
  updatedArticleId,
  fetchUsers,
  fetchArticles,
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
  fetchArticles()
    .then((articles) => {
      console.log(articles,'<<<<')
      return res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      console.log(users,"<<<<<<");
      return res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};
