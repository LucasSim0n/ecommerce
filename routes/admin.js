import express from 'express'
import bodyParser from 'body-parser'
import { router as productRouter } from './products/products.js'

export const router = express.Router()
router.use(bodyParser.json())

router.use("/products", productRouter)

