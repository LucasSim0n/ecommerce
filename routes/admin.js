import express from 'express'
import bodyParser from 'body-parser'
import { router as productRouter } from './products/products.js'
import { router as userRouter } from './users/users.js'

export const router = express.Router()

router.use("/products", productRouter)
router.use("/users", userRouter)

