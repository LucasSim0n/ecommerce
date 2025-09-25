import express from 'express'
import { loginHandler } from './loginHandler.js'

export const router = express.Router()

router.post("/", (req, res) => loginHandler(req, res))
