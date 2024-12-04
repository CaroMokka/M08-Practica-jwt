import pkg from "pg"

const { Pool } = pkg

const conexion = new Pool({
    host: "localhost",
    port: 5432,
    database: "publicaciones",
    user: "postgres",
    password: "postgres"
})

export { conexion }