import express, { response } from "express";
import jwt from "jsonwebtoken";
import { getPosts, setPost, updatePost } from "./database/posts.js";
import { auth } from "./database/users.js";

const app = express();
const port = 3000;
const secretKey = "um0987";

app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await auth(username, password);
  if (!user) {
    return response.status(401).json({ message: "Autentificación fallida." });
  }
  const token = jwt.sign(user, secretKey);
  res.json({ message: "Registro exitoso", token: token });
});

app.get("/posts", async (req, res) => {
  const isAuth = req.headers.authorization;
  if (!isAuth) {
    return res
      .status(401)
      .json({ message: "Usuario no autorizado, debe enviar token de acceso." });
  }
  const decodedToken = jwt.verify(isAuth, secretKey);
  const posts = await getPosts(decodedToken.id);

  res.json({ message: "Listar posts", data: posts });
});

app.post("/posts", async (req, res) => {
  const postData = req.body;
  const codedToken = req.headers.authorization;
  if (!codedToken) {
    return res
      .status(401)
      .json({
        message:
          "Usuario no autorizado para publicar. Debe enviar token de acceso.",
      });
  }
  const decoded = jwt.verify(codedToken, secretKey);
  const newPost = await setPost(decoded.id, postData);
  res.json({ message: "Publicación registrada con exito", data: newPost });
});

app.put("/posts", async (req, res) => {
  const dataPost = req.body;
  const idPost = req.query;
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({
        message:
          "Usuario no autorizado para modificar publicación. Debe enviar token de acceso.",
      });
  }
  const decoded = jwt.verify(token, secretKey);
  const userId = decoded.id;

  const postUpdated = await updatePost(dataPost, idPost, userId);
  res.json({ message: "Publicación actualizada exitosamente", data: postUpdated });
});

app.listen(port, () => {
  console.log(`Aplicación ejecutandose en el puerto ${port}`);
});
