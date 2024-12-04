import { conexion } from "./conexion.js"

const getPosts = async (userId) => {
    const response = await conexion.query("SELECT * FROM posts WHERE user_id=$1", [userId])
    return response.rows
}

export { getPosts }