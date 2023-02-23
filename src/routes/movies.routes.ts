import { Router } from "express";
import {ensureDataIsValidMiddleware} from "../middlewares/ensureDataRegisterValid.middlewares"
import {registerMovieSchema} from "../schemas/registerMovie.schema"
import {registerMovieController} from "../controllers/registerMovie.controller"

export const userRoutes:Router=Router()

userRoutes.post("",ensureDataIsValidMiddleware(registerMovieSchema),registerMovieController)