const db = require("../db/connection");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};
// JOIN comments ON article_id = comments.article_id
// COUNT(comment.comment_id) AS comment_count

const fetchArticleId = (article_id) => {
  const articleQuery = `SELECT  articles.* , COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`;
  return db.query(articleQuery, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `no article with ID : ${article_id}`,
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

const fetchArticles = () => {
  return db.query("SELECT * FROM articles").then(({ rows }) => {
    return rows;
  });
};

const fetchUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};

const fetchComments = (article_id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = ${article_id}`)
    .then(({ rows }) => {
      console.log("in models", rows);
      return rows;
    });
};

module.exports = {
  fetchTopics,
  fetchArticleId,
  updatedArticleId,
  fetchArticles,
  fetchUsers,
  fetchComments,
};
