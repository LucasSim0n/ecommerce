import { genSalt, hash } from 'bcryptjs'

export async function hashPassword(password) {
  const salt = await genSalt(10)
  return await hash(password, salt)
}
