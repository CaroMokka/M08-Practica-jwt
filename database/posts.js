import { conexion } from "./conexion.js"

const getPosts = async (userId) => {
    const response = await conexion.query("SELECT * FROM posts WHERE user_id=$1", [userId])
    return response.rows
}

const setPost = async ( userId, postData ) => {
    const argumentos = {
        text: "INSERT INTO posts(user_id, title, content) VALUES($1, $2, $3) RETURNING * ;",
        values: [userId, postData.title, postData.content]
    }
    
    const post = await conexion.query(argumentos)
    if(post.rowCount == 0){
        return null
    }
    const postPublished = post.rows[0]

    return postPublished
}

export { getPosts, setPost }