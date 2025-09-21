import * as pqs from "./productQueries.js"
import { productModel, createProductModel } from "./product.model.js";
import { appException } from "../../utils/appException.js";

export async function getAllProducts() {
  try {
    const products = await pqs.getAllProducts()
    return { products: products }
  } catch (err) {
    throw err
  }
}

export async function resetProductsDB() {
  try {
    await pqs.resetProductsDb()
  } catch (err) {
    throw err
  }
}

export async function insertProduct(body) {
  const validation = createProductModel.validate(body)
  if (validation.error) {
    throw appException.invalidInsert()
  }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    return await pqs.insertProduct(body.name, date, date, body.stock)
  } catch (err) {
    throw err
  }
}


export async function getProduct(id) {
  try {
    return await pqs.getProductById(id)
  } catch (err) {
    throw err
  }
}

export async function updateProduct(id, body) {
  const validation = productModel.validate(body)
  if (validation.error) {
    throw appException.invalidInsert()
  }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    return await pqs.updateProduct(body.name, body.stock, date, id)
  } catch (err) {
    throw err
  }
}

export async function deleteProduct(id) {
  try {
    await pqs.deleteProduct(id)
  } catch (err) {
    throw err
  }
}
