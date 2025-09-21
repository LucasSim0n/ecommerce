import { appException } from "../../utils/appException"
import { connection as db } from "../connection"
import { templates as tm } from "./userQueryTemplates"

export async function getAllUsers() {
  try {
    const [resultRows] = await db.execute(tm.getAllUsers)
    return resultRows
  } catch (err) {
    throw err
  }
}

export async function insertUser(fname, lname, email, password, created_at, updated_at, is_admin) {
  let con
  try {
    con = await db.getConnection()
    await con.beginTransaction()

    const [exists] = await con.execute(tm.getUserByEmail, [email])
    if (exists[0]) {
      throw appException.accountExists()
    }

    await con.execute(tm.insertUser, [fname, lname, email, password, created_at, updated_at, is_admin])
    const [resultRows] = await con.execute(tm.getUserById, [id])
    if (!resultRows[0]) {
      throw appException.notFound()
    }

    con.commit()
    return resultRows[0]
  } catch (err) {
    if (con) await con.rollback()
    throw err
  } finally {
    if (con) con.release()
  }
}

export async function getUserById(id) {
  try {
    const [resultRows] = await db.execute(tm.getUserById, [id])
    if (!resultRows[0]) {
      throw appException.notFound()
    }
    return resultRows[0]
  } catch (err) {
    throw err
  }
}

export async function deleteUser(id) {
  try {
    await db.execute(tm.deleteUser, [id])
  } catch (err) {
    throw err
  }
}

export async function updateUser(fname, lname, email, password, updated_at, id) {
  let con
  try {
    con = await db.getConnection()
    await con.beginTransaction()

    const [originalRows] = await con.execute(tm.getUserById, [id])
    if (!originalRows[0]) {
      throw appException.notFound()
    }
    const original = originalRows[0]

    if (original.email !== email) {
      await con.execute(tm.updateUserEmail, [email, id])
    }
    await con.execute(tm.updateUser, [fname, lname, password, updated_at, id])

    const [resultRows] = con.execute(tm.getUserById, [id])

    await con.commit()
    return resultRows[0]

  } catch (err) {
    if (con) await con.rollback()
    throw err

  } finally {
    if (con) con.release()
  }
}

export async function promoteUserToAdmin(id) {
  let con
  try {
    con = await db.getConnection()
    await con.beginTransaction()
    await con.execute(tm.promoteUserToAdmin, [id])

    const [resultRows] = con.execute(tm.getUserById, [id])
    if (!resultRows[0]) {
      throw appException.notFound()
    }

    await con.commit()
    return resultRows[0]

  } catch (err) {
    if (con) await con.rollback()
    throw err
  } finally {
    if (con) con.release()
  }
}

export async function revokeUserAdmin(id) {
  let con
  try {
    con = await db.getConnection()
    await con.beginTransaction()
    await con.execute(tm.revokeUserAdmin, [id])
    const [resultRows] = await con.execute(tm.getUserById, [id])
    if (!resultRows[0]) {
      throw appException.notFound()
    }
    await con.commit()
    return resultRows[0]
  } catch (err) {
    if (con) await con.rollback()
    throw err
  } finally {
    if (con) con.release()
  }
}

export async function resetUsersDB() {
  try {
    await db.execute(tm.resetUsersDB)
  } catch (err) {
    throw err
  }

}
