import express from 'express'
import bodyParser from 'body-parser'
import { connection as db } from '../db'
import { queries as qs } from '../src/queries/adminProdQueryTemplates'

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
    const [result] = await db.query(qs.getAllProducts)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

async function resetDB(res) {
  try {
    await db.query(qs.resetProductsDb)
    res.status(204).json({ ok: "Database reseted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function insertProduct(req, res) {
  //NOTE: Validación de body
  if (!req.body || !req.body.name) {
    res.sendStatus(400)
    return
  }

  //NOTE: Validación de nombre
  try {
    const exists = await db.query(qs.productNameExists(req.body.name))
    if (exists) {
      res.sendStatus(400).json({ error: "Product already exists." })
      return
    }
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  //NOTE: Generación de datos propios del modelo
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const stock = req.body.stock ? req.body.stock : 0

  let id = 0
  try {
    [id] = await db.query(qs.insertProduct(req.body.name, date, stock))
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  try {
    const [result] = await db.query(qs.getProductById(id))
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
    const found = await db.query(qs.productIdExists(id))
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
    sameName = await db.query(qs.productNameExists(req.body.name))
  } catch (err) {
    res.status(500)
    res.send({ error: err.message })
    return
  }

  const query = sameName ? qs.updateProductStock(id, date, req.body.stock) : qs.updateProductNameStock(id, req.body.name, date, req.body.stock)

  try {
    await db.query(query)
  } catch (err) {
    res.status(500)
    res.send({ error: err.message })
    return
  }

  try {
    const [result] = await db.query(qs.getProductById(id))
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
    const found = await db.query(qs.productIdExists(id))
    if (!found) {
      res.sendStatus(404)
      return
    }
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  try {
    await db.query(qs.deleteProduct(id))
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
    const found = await db.query(qs.productIdExists(id))
    if (!found) {
      res.sendStatus(404)
      return
    }
  } catch (err) {
    res.sendStatus(500).json({ error: err.message })
    return
  }

  try {
    const [result] = await db.query(qs.getProductById(id))
    res.send(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


