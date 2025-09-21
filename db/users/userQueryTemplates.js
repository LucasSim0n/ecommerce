export const templates = {
  getAllUsers: "SELECT * FROM users;",
  getUserById: "SELECT * FROM users WHERE id = ?;",
  getUserByEmail: "SELECT * FROM users WHERE email = ?;",
  insertUser: "INSERT INTO users(fname, lname, email, password, created_at, updated_at, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?);",
  deleteUser: "DELETE FROM users WHERE id = ?;",
  updateUser: "UPDATE users SET fname = ?, lname = ?, password = ?, updated_at = ? WHERE id = ?;",
  updateUserEmail: "UPDATE users SET email = ? WHERE id = ?;",
  promoteUserToAdmin: "UPDATE users SET is_admin = true WHERE id = ?;",
  revokeUserAdmin: "UPDATE users SET is_admin = false WHERE id = ?;",
  resetUsersDB: "DELETE FROM users;"
}
