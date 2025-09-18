import express from 'express'
import bodyParser from 'body-parser'
import { router as adminRouter } from "./routes/admin.js"
import { router as baseRouter } from "./routes/user.js"
import { errorHandler } from './middlewares/errorHandler.js'
import { appException } from './utils/appException.js'

const app = express()
const baseURL = "/api/v1"
const routers = {
  adminRouter: adminRouter,
  baseRouter: baseRouter,
  port: 3000,
}


app.use(bodyParser.json())
app.use("/admin" + baseURL, routers.adminRouter)
app.use(baseURL, routers.baseRouter)
app.use((req, res, next) => { res.status(404).json(appException.notFound) })
app.use(errorHandler)
app.listen(routers.port)
