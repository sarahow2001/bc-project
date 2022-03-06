const db = require("../db/connection");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

const fetchArticleId = (article_id) => {
  const articleQuery = {
    text: "SELECT * FROM articles WHERE article_id = $1 ;",
    values: [article_id],
  };
  return db.query(articleQuery).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "no article with ID : ",
      });
    } else {
      return rows;
    }
  });
};

const updatedArticleId = async (articleId, body) => {
  const article = await fetchArticleId(articleId);
  const newVotes = article[0].votes + body.inc_votes;

  

  return db
    .query(
      "UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING * ; ",
      [newVotes, articleId]
    )
    .then(({ rows }) => {
      
      if (!rows.length)
        Promise.reject({
          status: 404,
          msg: "no article with ID : ",
        });
      return rows;
    });
};

module.exports = { fetchTopics, fetchArticleId, updatedArticleId };
