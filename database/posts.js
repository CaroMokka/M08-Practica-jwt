import { conexion } from "./conexion.js";

const getPosts = async (userId) => {
  const response = await conexion.query(
    "SELECT * FROM posts WHERE user_id=$1",
    [userId]
  );
  return response.rows;
};

const setPost = async (userId, postData) => {
  const argumentos = {
    text: "INSERT INTO posts(user_id, title, content) VALUES($1, $2, $3) RETURNING * ;",
    values: [userId, postData.title, postData.content],
  };

  const post = await conexion.query(argumentos);
  if (post.rowCount == 0) {
    return null;
  }
  const postPublished = post.rows[0];

  return postPublished;
};

const updatePost = async (postData, postId, userId) => {
  try {
    const argumentos = {
      text: "UPDATE posts SET title=$1, content=$2 WHERE id=$3 AND user_id=$4 RETURNING * ",
      values: [postData.title, postData.content, postId.id, userId],
    };
    const response = await conexion.query(argumentos);
    console.log(postId);
    if (response.rowCount == 0) {
      return null;
    }
    const postUpdated = response.rows[0];
    return postUpdated;
  } catch (err) {
    console.log(err);
  }
};

export { getPosts, setPost, updatePost };
