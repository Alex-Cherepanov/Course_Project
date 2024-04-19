import * as pg from "pg"
const { Pool } = pg.default

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "electronics_db",
    password: "580414",
    port: 5432
})

export default pool