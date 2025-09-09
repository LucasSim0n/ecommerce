import express from 'express'
import { connection as db } from './database.js'

export const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hi from admin")
})

router.route("/products")
  .post((req, res) => insertProduct(req, res))
  .get((req, res) => getProducts(req, res))

async function getProducts(req, res) {
  const query = `SELECT * FROM products;`
  try {
    const [result] = await db.query(query)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

async function insertProduct(req, res) {
  const name = "camiseta"
  const stock = 4
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `
INSERT INTO products(name, created_at, updated_at, stock)
VALUES('${name}', '${date}', '${date}', ${stock});`

  try {
    const result = await db.query(query)
    res.send({ ok: "ok" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

