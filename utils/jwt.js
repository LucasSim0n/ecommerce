import 'dotenv/config'
import jwt from 'jsonwebtoken'

export function makeJWT(id) {
  const secret = process.env.TOKEN_SECRET
  const token = jwt.sign({ id: id }, secret, { expiresIn: '1h' })
  return token
}
