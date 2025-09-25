import express from 'express'
import * as uh from './userHandlers.js'

export const router = express.Router()

router.route("/")
  .get((_, res) => uh.getAllUsersHandler(res))
  .post((req, res) => uh.createUserHandler(req, res))
  .delete((_, res) => uh.resetUsersDBHandler(res))

router.route("/:id")
  .get((req, res) => uh.getUserByIdHandler(req, res))
  .put((req, res) => uh.updateUserHandler(req, res))
  .delete((req, res) => uh.deleteUserHandler(req, res))

router.route("/is_admin/:id")
  .put((req, res) => uh.updateIsAdminHandler(req, res))
