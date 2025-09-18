export const userQueries = {
  createUser: "INSERT INTO users(fname, lname, email, password, created_at, updated_at, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?);",
  getUserById: "SELECT * FROM users WHERE id = ?;",
  deleteUser: "DELETE FROM users WHERE id = ?;",
  updateUser: "UPDATE users SET fname = ?, lname = ?, password = ?, updated_at = ? WHERE id = ?;",
  updateUserEmail: "UPDATE users SET email = ? WHERE id = ?;",
  updateUserToAdmin: "UPDATE users SET is_admin = true WHERE id = ?;",
  revokeUserAdmin: "UPDATE users SET is_admin = false WHERE id = ?;",
}
