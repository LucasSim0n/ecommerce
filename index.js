import express from 'express'
import { router as adminRouter } from "./admin.js"
import { router as baseRouter } from "./base.js"

const app = express()
const baseURL = "/api/v1"
const routers = {
  adminRouter: adminRouter,
  baseRouter: baseRouter,
  port: 3000,
}


app.use("/admin" + baseURL, routers.adminRouter)
app.use(baseURL, routers.baseRouter)
app.listen(routers.port)

