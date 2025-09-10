import mysql from 'mysql2/promise'
import 'dotenv/config'

export const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

export const queries = {
  PRODUCT_NAME_EXISTS: (name) => `SELECT EXISTS(SELECT 1 FROM products WHERE name = '${name}') AS \`exists\`;`,

  PRODUCT_ID_EXISTS: (id) => `SELECT EXISTS(SELECT 1 FROM products WHERE id = '${id}') AS \`exists\`;`,

  INSERT_PRODUCT: (name, date, stock) => `INSERT INTO products(name, created_at, updated_at, stock) VALUES('${name}', '${date}', '${date}', ${stock});`,

  UPDATE_PRODUCT_NAME_STOCK: (id, name, date, stock) => `UPDATE products SET name = '${name}', stock = ${stock}, updated_at = '${date}' WHERE id = ${id};`,

  UPDATE_PRODUCT_STOCK: (id, date, stock) => `UPDATE products SET stock = ${stock}, updated_at = '${date}' WHERE id = ${id};`,

  DELETE_PRODUCT: (id) => `DELETE FROM products WHERE id = ${id};`,

  GET_PRODUCT_BY_ID: (id) => `SELECT * FROM products WHERE id = ${id};`,

  RESET_PRODUCTS_DB: "DELETE FROM products;",

  GET_ALL_PRODUCTS: "SELECT * FROM products;",
}

