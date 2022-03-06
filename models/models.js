const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleId = (article_id) => {
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

// exports.updatedArticleId=(articleId) => {
//   return db
//   .query("UPDATE articles SET votes = 0 WHERE article_id "

//   )

