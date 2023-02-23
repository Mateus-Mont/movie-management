import { Router } from "express";
import {ensureDataIsValidMiddleware} from "../middlewares/ensureDataRegisterValid.middlewares"
import {registerMovieSchema} from "../schemas/registerMovie.schema"
import {registerMovieController} from "../controllers/movies.controller"
import {ensureDataUpdateIsValidMiddleware} from "../middlewares/ensureDataUpdateValid.middlewares"
import {movieUpdateSchema} from "../schemas/registerMovie.schema"
import {updateMovieController}  from "../controllers/movies.controller"

export const userRoutes:Router=Router()

userRoutes.post("",ensureDataIsValidMiddleware(registerMovieSchema),registerMovieController)
userRoutes.patch("/:id",ensureDataUpdateIsValidMiddleware(movieUpdateSchema),updateMovieController)