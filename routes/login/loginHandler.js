import { compare } from 'bcryptjs';
import { getUserByEmail } from '../../db/users/userMethods.js';
import { appException } from '../../utils/appException.js';
import { makeJWT } from '../../utils/jwt.js';

export async function loginHandler(req, res) {
  if (!req.body || !req.body.email || !req.body.password) throw appException.invalidLogin()

  const user = await getUserByEmail(req.body.email)

  const valid = await compare(req.body.password, user.password)
  if (!valid) throw appException.invalidLogin()

  user.token = makeJWT(user.id)

  res.send(user)
}
