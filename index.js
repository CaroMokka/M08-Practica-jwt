import express, { response } from "express"
import jwt from "jsonwebtoken"
import { auth } from "./database/users.js"


const app = express()
const port = 3000
const secret = "um0987"

app.use(express.json())

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await auth(username, password)
    if(!user){
        return response.status(401).json({ message: "Autentificación fallida." })
    }
    const token = jwt.sign(user, secret)
    res.json({ message: "Registro exitoso", token: token})
})



app.listen(port, () => {
    console.log(`Aplicación ejecutandose en el puerto ${port}`)
})