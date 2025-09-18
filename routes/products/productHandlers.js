import * as pm from "../../db/products/productMethods.js"
import { appException } from "../../utils/appException.js"


export async function getAllProductsHander(res) {
  const result = await pm.getAllProducts()
  res.send(result)
}

export async function resetDBHandler(res) {
  await pm.resetProductsDB()
  res.status(204).json({ ok: "Database reseted" })
}

export async function insertProductHandler(req, res) {
  if (!req.body) {
    res.status(400)
    res.send(appException.badRequest("body required"))
    return
  }

  const [result] = await pm.createProduct(req.body)
  res.send(result)
}

export async function updateProductHanlder(req, res) {
  const { id } = req.params
  if (!req.body) {
    res.status(400)
    res.send(appException.badRequest("body required"))
    return
  }

  const [result] = await pm.updateProduct(id, req.body)
  res.status(204)
  res.send(result)
}

export async function deleteProductHandler(req, res) {
  const { id } = req.params

  await pm.deleteProduct(id)
  res.status(204)
  res.send({ ok: "OK" })
}


export async function getProductHandler(req, res) {
  const { id } = req.params

  const [result] = await pm.getProduct(id)
  res.send(result)
}
