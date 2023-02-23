import express, { Application } from 'express'
import { handleErrors } from './errors'
import { userRoutes } from './routes/movies.routes'

export const app: Application = express()
app.use(express.json())
app.use("/movies",userRoutes)
app.use(handleErrors)

