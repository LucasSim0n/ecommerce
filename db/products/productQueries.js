import { connection as db } from "../connection.js"
export const productQueries = {
  insertProduct: async (name, created_at, updated_at, stock) => {
    return await db.execute(
      "INSERT INTO `products`(`name`, `created_at`, `updated_at`, `stock`) VALUES(?, ?, ?, ?);",
      [name, created_at, updated_at, stock]
    )
  },

  updateProductName: async (name, updatedAt, id) => {
    return await db.execute(
      "UPDATE `products` SET `name` = ?, `updated_at` = ? WHERE `id` = ?;",
      [name, updatedAt, id]
    )
  },

  updateProductStock: async (stock, updatedAt, id) => {
    return await db.execute(
      "UPDATE `products` SET `stock` = ?, `updated_at` = ? WHERE `id` = ?;",
      [stock, updatedAt, id]
    )
  },

  deleteProduct: async (id) => { await db.execute("DELETE FROM `products` WHERE `id` = ?;", [id]) },

  getProductById: async (id) => { return await db.execute("SELECT * FROM `products` WHERE `id` = ?;", [id]) },

  getProductByName: async (name) => { return await db.execute("SELECT * FROM `products` WHERE `name` = ?;", [name]) },

  resetProductsDb: async () => { await db.execute("DELETE FROM `products`;") },

  getAllProducts: async () => { await db.execute("SELECT * FROM `products`;") },
}
