import express, { response } from "express"
import jwt from "jsonwebtoken"
import { getPosts } from "./database/posts.js"
import { auth } from "./database/users.js"


const app = express()
const port = 3000
const secretKey = "um0987"

app.use(express.json())

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await auth(username, password)
    if(!user){
        return response.status(401).json({ message: "Autentificación fallida." })
    }
    const token = jwt.sign(user, secretKey)
    res.json({ message: "Registro exitoso", token: token})
})

app.get("/posts", async (req, res) => {

    const isAuth = req.headers.authorization
    if(!isAuth){
        return res.status(401).json({ message: "Usuario no autorizado, debe enviar token de acceso." })
    }
    const decodedToken = jwt.verify(isAuth, secretKey)
    const posts = await getPosts(decodedToken.id)

    res.json({ message: "Listar posts", data: posts })
})

app.listen(port, () => {
    console.log(`Aplicación ejecutandose en el puerto ${port}`)
})