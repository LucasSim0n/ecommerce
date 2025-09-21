import { AppError, appException } from "../utils/appException.js"

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    res.status(err.status).json(err.toJson())
    return
  }
  res.status(500).json(appException.internalServerError().toJson())
}
