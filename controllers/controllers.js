const { fetchTopics } = require("../models/models");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      return res.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    })
};
