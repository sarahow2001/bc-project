const db = require("../db/connection");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

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

const fetchArticles = (order = "desc", sort_by = "created_at", topic) => {
  let querys = `SELECT * FROM articles`;
  if (topic) {
    querys += ` WHERE topic LIKE '${topic}'`;
  }
  querys += `  ORDER BY ${sort_by} ${order.toUpperCase()};`;

  return db.query(querys).then(({ rows }) => {
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
      return rows;
    });
};

const addComment = (article_id, username, body) => {
  console.log(article_id, username, body, "<<<<<<<<<<<<<<<<<<<<");
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES (${article_id}, '${username}', '${body}') RETURNING *;`
    )
    .then(({ rows }) => rows);
};

// const removeComment = (article_id, username, body) => {

// }

module.exports = {
  fetchTopics,
  fetchArticleId,
  updatedArticleId,
  fetchArticles,
  fetchUsers,
  fetchComments,
  addComment,
  //removeComment
};
