import { connection as db } from "../connection.js"
import { templates as tm } from "./productQueryTemplates.js"
import { appException } from "../../utils/appException.js"

export async function deleteProduct(id) {
  try {
    await db.execute(tm.deleteProduct, [id])
  } catch (err) {
    throw err
  }
}

export async function getProductById(id) {
  try {
    const [result] = await db.execute(tm.getProductById, [id])
    return result
  } catch (err) {
    throw err
  }
}

export async function getProductByName(name) {
  try {
    const [result] = await db.execute(tm.getProductByName, [name])
    return result
  } catch (err) {
    throw err
  }
}

export async function resetProductsDb() {
  try {
    await db.execute(tm.resetProductsDb, [])
  } catch (err) {
    throw err
  }
}

export async function getAllProducts() {
  try {
    const [resultRows] = await db.execute(tm.getAllProducts)
    return resultRows
  } catch (err) {
    throw err
  }
}

export async function insertProduct(name, created_at, updated_at, stock) {
  let con
  try {
    con = await db.getConnection()
    await con.beginTransaction()

    const [exists] = await con.execute(tm.getProductByName, [name])
    if (exists[0]) {
      throw appException.productNameExists()
    }

    const [result] = await con.execute(tm.insertProduct, [name, created_at, updated_at, stock])

    const [productRows] = await con.execute(tm.getProductById, [result.insertId])
    const product = productRows[0]

    await con.commit()

    return product

  } catch (err) {
    if (con) {
      await con.rollback()
    }
    throw err

  } finally {
    if (con) {
      con.release()
    }
  }
}

export async function updateProduct(name, stock, updatedAt, id) {
  let con
  try {
    con = await db.getConnection()
    await con.beginTransaction()

    const [originalRows] = await con.execute(tm.getProductById, [id])
    const original = originalRows[0]

    if (!original) {
      throw appException.notFound()
    }

    const valid = validateProductUpdate({ id, name, stock }, original)
    if (!valid) {
      throw appException.noChangesMade()
    }

    if (original.name !== name) {
      await con.execute(tm.updateProductName, [name, updatedAt, id])
    }

    await con.execute(tm.updateProduct, [stock, updatedAt, id])

    const [resultRows] = await con.execute(tm.getProductById, [id])
    const result = resultRows[0]

    await con.commit()
    return result

  } catch (err) {
    if (con) {
      try {
        await con.rollback()
      } catch (err) {
        throw err
      }
    }
    throw err

  } finally {
    if (con) {
      con.release()
    }
  }
}

function validateProductUpdate(product, originalProduct) {
  let hasDif = false
  for (let prop in product) {
    if (product[prop] !== originalProduct[prop]) {
      hasDif = true
      break
    }
  }
  return hasDif
}
