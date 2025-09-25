import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { router as adminRouter } from './routes/admin.js'
import { router as userRouter } from './routes/user.js'
import { router as loginRouter } from './routes/login/login.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { appException } from './utils/appException.js'

const app = express()
const baseURL = "/api/v1"
const routers = {
  adminRouter: adminRouter,
  userRouter: userRouter,
  loginRouter: loginRouter,
  port: 3000,
}


app.use(morgan(("dev")))
app.use(bodyParser.json())
app.use("/admin" + baseURL, routers.adminRouter)
app.use(baseURL, routers.userRouter)
app.use(baseURL + "/login", routers.loginRouter)
app.use((req, res, next) => { res.status(404).json(appException.notFound()) })
app.use(errorHandler)
app.listen(routers.port)
