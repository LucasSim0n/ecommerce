import express from 'express'
import bodyParser from 'body-parser'
import { connection as db, queries as qs } from './database.js'

export const router = express.Router()
router.use(bodyParser.json())

router.get("/", (_, res) => {
  res.send("Hi from admin")
})

router.route("/products")
  .get((_, res) => getAllProducts(res))
  .post((req, res) => insertProduct(req, res))
  .delete((_, res) => resetDB(res))

router.route("/products/:id")
  .get((req, res) => getProductByID(req, res))
  .put((req, res) => updateProductByID(req, res))
  .delete((req, res) => deleteProductByID(req, res))

async function getAllProducts(res) {
  try {
    const [result] = await db.query(qs.GET_ALL_PRODUCTS)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

async function resetDB(res) {
  const query = qs.RESET_PRODUCTS_DB
  try {
    await db.query(query)
    res.status(204).json({ ok: "Database reseted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function insertProduct(req, res) {
  if (!req.body || !req.body.name) {
    res.sendStatus(400)
    return
  }

  try {
    const exists = await db.query(qs.PRODUCT_NAME_EXISTS(req.body.name))
    if (exists) {
      res.sendStatus(400).json({ error: "Product already exists." })
      return
    }
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const stock = req.body.stock ? req.body.stock : 0
  const query = qs.INSERT_PRODUCT(req.body.name, date, stock)

  let id = 0
  try {
    [id] = await db.query(query)
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  try {
    const [result] = await db.query(qs.GET_PRODUCT_BY_ID(id))
    res.send(result)
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
  }
}

async function updateProductByID(req, res) {
  if (!req.body || !req.body.name || !req.body.stock) {
    res.sendStatus(400)
    return
  }
  const { id } = req.params
  if (isNaN(id)) {
    res.sendStatus(400)
    return
  }

  try {
    const found = await db.query(qs.PRODUCT_ID_EXISTS(id))
    if (!found) {
      res.sendStatus(404)
      return
    }
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let sameName = false
  try {
    sameName = await db.query(qs.PRODUCT_NAME_EXISTS(req.body.name))
  } catch (err) {
    res.status(500)
    res.send({ error: err.message })
    return
  }

  const query = sameName ? qs.UPDATE_PRODUCT_STOCK(id, date, req.body.stock) : qs.UPDATE_PRODUCT_NAME_STOCK(id, req.body.name, date, req.body.stock)

  try {
    await db.query(query)
  } catch (err) {
    res.status(500)
    res.send({ error: err.message })
    return
  }

  try {
    const [result] = await db.query(qs.GET_PRODUCT_BY_ID(id))
    res.send(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function deleteProductByID(req, res) {
  const { id } = req.params
  if (isNaN(id)) {
    res.sendStatus(400)
    return
  }

  try {
    const found = await db.query(qs.PRODUCT_ID_EXISTS(id))
    if (!found) {
      res.sendStatus(404)
      return
    }
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  try {
    await db.query(qs.DELETE_PRODUCT(id))
    res.sendStatus(204)
  } catch (err) {
    res.status(500)
    res.send({ error: err.message })
  }
}


async function getProductByID(req, res) {
  const { id } = req.params
  if (isNaN(id)) res.sendStatus(400)

  try {
    const found = await db.query(qs.PRODUCT_ID_EXISTS(id))
    if (!found) {
      res.sendStatus(404)
      return
    }
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  try {
    const [result] = await db.query(qs.GET_PRODUCT_BY_ID(id))
    res.send(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


