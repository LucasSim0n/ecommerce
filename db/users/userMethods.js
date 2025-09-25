import * as uqs from './userQueries.js';
import { userModel, createUserModel } from './user.model.js';
import { appException } from '../../utils/appException.js';
import { hashPassword } from '../../utils/password.js'

export async function resetUsersDB() {
  try {
    await uqs.resetUsersDB()
  } catch (err) {
    throw err
  }
}

export async function getAllUsers() {
  try {
    const result = await uqs.getAllUsers()
    return { users: result }
  } catch (err) {
    throw err
  }
}

export async function createUser(body) {
  const validation = createUserModel.validate(body)
  if (validation.error) {
    throw validation.error
  }

  const hashed = await hashPassword(body.password)
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    return await uqs.insertUser(body.fname, body.lname, body.email, hashed, date, date, false)
  } catch (err) {
    throw err
  }
}

export async function deleteUser(id) {
  try {
    await uqs.deleteUser(id)
  } catch (err) {
    throw err
  }
}


export async function getUserById(id) {
  try {
    const result = await uqs.getUserById(id)
    return result
  } catch (err) {
    throw err
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await uqs.getUserByEmail(email)
    return result
  } catch (err) {
    throw err
  }
}

export async function updateUser(id, body) {
  const validation = userModel.validate(body)
  if (validation.error) {
    throw appException.invalidInsert()
  }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    return await uqs.updateUser(body.fname, body.lname, body.email, body.password, date, id)
  } catch (err) {
    throw err
  }
}

export async function updateIsAdmin(id, body) {
  try {
    return await uqs.updateIsAdmin(id, body.is_admin)
  } catch (err) {
    throw err
  }
}
