import * as uqs from "./userQueries";
import { userModel, createUserModel } from "./user.model";

export async function resetUsersDB() {
  try {
    await uqs.resetUsersDB()
  } catch (err) {
    throw err
  }
}

export async function getAllUsers() {
  try {
    const [result] = await uqs.getAllUsers()
    return result
  } catch (err) {
    throw err
  }
}

export async function createUser(body) {
  const validation = createUserModel.validate(body)
  if (validation.error) {
    throw validation.error
  }
}
