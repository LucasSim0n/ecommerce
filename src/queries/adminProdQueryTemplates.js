export const queries = {
  productNameExists: (name) => `SELECT EXISTS(SELECT 1 FROM products WHERE name = '${name}') AS \`exists\`;`,

  productIdExists: (id) => `SELECT EXISTS(SELECT 1 FROM products WHERE id = '${id}') AS \`exists\`;`,

  insertProduct: (name, date, stock) => `INSERT INTO products(name, created_at, updated_at, stock) VALUES('${name}', '${date}', '${date}', ${stock});`,

  updateProductNameStock: (id, name, date, stock) => `UPDATE products SET name = '${name}', stock = ${stock}, updated_at = '${date}' WHERE id = ${id};`,

  updateProductStock: (id, date, stock) => `UPDATE products SET stock = ${stock}, updated_at = '${date}' WHERE id = ${id};`,

  deleteProduct: (id) => `DELETE FROM products WHERE id = ${id};`,

  getProductById: (id) => `SELECT * FROM products WHERE id = ${id};`,

  resetProductsDb: "DELETE FROM products;",

  getAllProducts: "SELECT * FROM products;",
}
