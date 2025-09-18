import { productQueries as pqs } from "./productQueries.js"
import { productModel, createProductModel } from "./product.model.js";

export async function getAllProducts() {
  try {
    return await pqs.getAllProducts()
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

// FIX: Llevar req dinámica a capa query/Agrupar las queries en una TRANSACCIÓN.
export async function createProduct(body) {
  const validation = createProductModel.validate(body)
  if (validation.error) {
    throw validation.error
  }

  try {
    const exists = await validateProductName(body.name)
    if (exists) {
      throw new Error(`Product with name ${body.name} already exists`)
    }
  } catch (err) {
    throw err
  }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let result = {}
  try {
    [result] = await pqs.insertProduct(body.name, date, date, body.stock)
  } catch (err) {
    throw err
  }

  try {
    const [product] = await pqs.getProductById(result.insertId)
    return product
  } catch (err) {
    throw err
  }
}


export async function getProduct(id) {
  try {
    const [result] = await pqs.getProductById(id)
    return result
  } catch (err) {
    throw err
  }
}

// FIX: Llevar req dinámica a capa query/Agrupar las queries en una TRANSACCIÓN.
export async function updateProduct(id, body) {
  const validation = productModel.validate(body)
  if (validation.error) {
    throw validation.error
  }

  let originalProduct = {}
  try {
    originalProduct = await pqs.getProductById(id)
    if (!originalProduct) {
      throw new Error(`Product with id ${id} not found.`)
    }
  } catch (err) {
    throw err
  }

  const valid = await validateProductUpdate(body, originalProduct)
  if (!valid) {
    throw new Error("Not valid update.")
  }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  if (originalProduct.name !== body.name) {
    try {
      await pqs.updateProductName(body.name, date, id)
    } catch (err) {
      throw err
    }
  }

  if (originalProduct.stock !== body.stock) {
    try {
      await pqs.updateProductStock(body.stock, date, id)
    } catch (err) {
      throw err
    }
  }

  try {
    return await pqs.getProductById(id)
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

async function validateProductName(name) {
  try {
    const exists = await pqs.getProductByName(name)
    return exists.id ? true : false
  } catch (err) {
    throw err
  }
}

async function validateProductUpdate(product, originalProduct) {
  let hasDif = false
  for (let prop in product) {
    if (product[prop] !== originalProduct[prop]) {
      hasDif = true
      break
    }
  }
  return hasDif
}
