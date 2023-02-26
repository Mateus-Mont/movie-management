import { Router } from "express";
import {ensureDataIsValidMiddleware} from "../middlewares/ensureDataRegisterValid.middlewares"
import {registerMovieSchema} from "../schemas/registerMovie.schema";
import {deleteMovieController, getMoviesController, registerMovieController} from "../controllers/movies.controller";
import {ensureDataUpdateIsValidMiddleware} from "../middlewares/ensureDataUpdateValid.middlewares";
import {movieUpdateSchema} from "../schemas/registerMovie.schema";
import {updateMovieController}  from "../controllers/movies.controller";
import {ensureMovieExistsMiddleware} from "../middlewares/ensureMovieExists.middlewares";
import { ensureNameMovieExists } from "../middlewares/ensureNameMovieExists.middlewares";

export const userRoutes:Router=Router();

userRoutes.get("",getMoviesController)
userRoutes.post("",ensureDataIsValidMiddleware(registerMovieSchema),ensureNameMovieExists,registerMovieController);
userRoutes.patch("/:id",ensureMovieExistsMiddleware,ensureDataUpdateIsValidMiddleware(movieUpdateSchema),updateMovieController)
userRoutes.delete("/:id",ensureMovieExistsMiddleware,deleteMovieController)