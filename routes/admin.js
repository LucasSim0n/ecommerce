import express from 'express'
import bodyParser from 'body-parser'
import { router as productRouter } from './products/products.js'
import { router as userRouter } from './users/users.js'
import { isAdminMiddleware, loggedInMiddleware } from '../middlewares/auth.js'

export const router = express.Router()

router.use((req, res, next) => loggedInMiddleware(req, res, next))
router.use((req, res, next) => isAdminMiddleware(req, res, next))
router.use("/products", productRouter)
router.use("/users", userRouter)

