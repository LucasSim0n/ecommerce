import { appException } from '../../utils/appException.js'
import * as um from '../../db/users/userMethods.js'
import { deleteSuccess } from '../../utils/genericSuccess.js'

export async function getAllUsersHandler(res) {
  const result = await um.getAllUsers()
  res.send(result)
}

export async function resetUsersDBHandler(res) {
  await um.resetUsersDB()
  res.send(deleteSuccess)
}

export async function getUserByIdHandler(req, res) {
  const { id } = req.params
  const result = await um.getUserById(id)
  res.send(result)
}

export async function createUserHandler(req, res) {
  if (!req.body) {
    throw appException.invalidInsert()
  }

  const result = await um.createUser(req.body)
  res.status(201).json(result)
}

export async function updateUserHandler(req, res) {
  if (!req.body) {
    throw appException.invalidUpdate()
  }
  const { id } = req.params

  const result = await um.updateUser(id, req.body)
  console.log(result)
  res.send(result)
}

export async function updateIsAdminHandler(req, res) {
  const { id } = req.params

  if (!req.body || !req.body.is_admin) {
    throw appException.invalidUpdate()
  }

  const result = await um.updateIsAdmin(id, req.body)
  res.send(result)
}

export async function deleteUserHandler(req, res) {
  const { id } = req.params

  await um.deleteUser(id)
  res.send(deleteSuccess)
}
