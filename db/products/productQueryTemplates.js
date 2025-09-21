export const templates = {
  deleteProduct: "DELETE FROM `products` WHERE `id` = ?;",
  getProductById: "SELECT * FROM `products` WHERE `id` = ?;",
  getProductByName: "SELECT * FROM `products` WHERE `name` = ?;",
  resetProductsDb: "DELETE FROM `products`;",
  getAllProducts: "SELECT * FROM `products`;",
  insertProduct: "INSERT INTO `products`(`name`, `created_at`, `updated_at`, `stock`) VALUES(?, ?, ?, ?);",
  updateProductName: "UPDATE `products` SET `name` = ?, `updated_at` = ? WHERE `id` = ?;",
  updateProduct: "UPDATE `products` SET `stock` = ?, `updated_at` = ? WHERE `id` = ?;",
}
