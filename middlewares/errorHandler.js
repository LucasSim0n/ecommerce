import { appException } from "../utils/appException.js"

export function errorHandler(err, req, res, next) {
  console.log(err)
  res.status(500).json(appException.internalServerError)
}
