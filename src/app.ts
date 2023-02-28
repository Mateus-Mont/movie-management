import "express-async-errors"

import express, { Application } from 'express'
import { handleErrors } from './errors'
import { userRoutes } from './routes/movies.routes'

const app: Application = express()
app.use(express.json())
app.use("/movies",userRoutes)
app.use(handleErrors)
export default app



