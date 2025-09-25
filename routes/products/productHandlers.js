import * as pm from '../../db/products/productMethods.js'
import { appException } from '../../utils/appException.js'
import { deleteSuccess } from '../../utils/genericSuccess.js'


export async function getAllProductsHander(res) {
  const result = await pm.getAllProducts()
  res.send(result)
}

export async function resetDBHandler(res) {
  await pm.resetProductsDB()
  res.send(deleteSuccess)
}

export async function insertProductHandler(req, res) {
  if (!req.body) {
    throw appException.invalidInsert()
  }

  const result = await pm.insertProduct(req.body)
  res.status(201).json(result)
}

export async function updateProductHanlder(req, res) {
  const { id } = req.params
  if (!req.body) {
    throw appException.invalidUpdate()
  }

  const result = await pm.updateProduct(id, req.body)
  res.send(result)
}

export async function deleteProductHandler(req, res) {
  const { id } = req.params

  await pm.deleteProduct(id)
  res.send(deleteSuccess)
}


export async function getProductHandler(req, res) {
  const { id } = req.params

  const [result] = await pm.getProduct(id)
  res.send(result)
}
