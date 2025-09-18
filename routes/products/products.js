import express from 'express'
import * as ph from './productHandlers.js'

export const router = express.Router()

router.route("/")
  .get((_, res) => ph.getAllProductsHander(res))
  .post((req, res) => ph.insertProductHandler(req, res))
  .delete((_, res) => ph.resetDBHandler(res))

router.route("/:id")
  .get((req, res) => ph.getProductHandler(req, res))
  .put((req, res) => ph.updateProductHanlder(req, res))
  .delete((req, res) => ph.deleteProductHandler(req, res))

