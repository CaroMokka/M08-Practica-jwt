import { conexion } from "./conexion.js"

const auth = async (username, password) => {
    try{
        const response = await conexion.query("SELECT * FROM users WHERE username=$1 AND password=$2", [username, password])
    if(response.rowCount == 0){
        return null
    }
    const { password: pswd, ...user } = response.rows[0]
    return user
    } catch(err) {
        return null
    }
}

export { auth }