import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { appException } from '../utils/appException.js'
import { getUserById } from '../db/users/userMethods.js'

export function loggedInMiddleware(req, res, next) {

  const secret = process.env.TOKEN_SECRET
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    throw appException.noJWTProvided()
  }

  jwt.verify(token, secret, (err, id) => {
    if (err) {
      throw appException.invalidJWT()
    }
    req.id = id.id
    next()
  })
}

export async function isAdminMiddleware(req, res, next) {
  const user = await getUserById(req.id)
  if (!user.is_admin) {
    throw appException.noAdmin()
  }
  next()
}
