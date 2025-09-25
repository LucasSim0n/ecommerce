import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { appException } from '../utils/appException.js'

export function validateJWT(req, res, next) {

  const secret = process.env.TOKEN_SECRET
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(401).send(appException.noJWTProvided())
    return
  }

  jwt.verify(token, secret, (err, id) => {
    if (err) {
      res.status(403).send(appException.invalidJWT())
      return
    }
    req.id = id
    next()
  })
}
