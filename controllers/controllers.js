const { fetchTopics, fetchArticleId,updatedArticleId } = require("../models/models");

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

// exports.updatedArticleId =()