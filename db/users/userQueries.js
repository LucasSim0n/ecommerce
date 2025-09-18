import { connection as db } from "../connection"

export const userQueries = {
  getAllUsers: async () => { return await db.execute("SELECT * FROM users;") },
  insertUser: async (fname, lname, email, password, created_at, updated_at, is_admin) => {
    return await db.execute(
      "INSERT INTO users(fname, lname, email, password, created_at, updated_at, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?);",
      [fname, lname, email, password, created_at, updated_at, is_admin]
    )
  },

  getUserById: async (id) => { return await db.execute("SELECT * FROM users WHERE id = ?;", [id]) },

  deleteUser: async (id) => { return await db.execute("DELETE FROM users WHERE id = ?;", [id]) },

  updateUser: async (fname, lname, password, updated_at, id) => {
    return await db.execute(
      "UPDATE users SET fname = ?, lname = ?, password = ?, updated_at = ? WHERE id = ?;",
      [fname, lname, password, updated_at, id]
    )
  },
  updateUserEmail: async (id) => { return await db.execute("UPDATE users SET email = ? WHERE id = ?;", [id]) },

  promoteUserToAdmin: async (id) => { return await db.execute("UPDATE users SET is_admin = true WHERE id = ?;", [id]) },

  revokeUserAdmin: async (id) => { return await db.execute("UPDATE users SET is_admin = false WHERE id = ?;", [id]) },

  resetUsersDB: async () => { await db.execute("DELETE FROM users;") }
}
