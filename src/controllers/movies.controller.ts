import { Request, Response } from "express";
import { iDataMovie, iMovieUpdate } from "../interfaces/movies.interface";
import { allMoviesService } from "../services/movies/allMovies.service";
import { deleteMovieService } from "../services/movies/deleteMovie.service";
import { registerMovieService } from "../services/movies/registerMovie.service";
import { updateMovieService } from "../services/movies/updateMovie.service";

export const registerMovieController = async (req: Request, res: Response) => {
  const movieData: iDataMovie = req.body;
  const newMovie = await registerMovieService(movieData);

  return res.status(201).json(newMovie);
};

export const getMoviesController=async(req:Request,res:Response)=>{

  const {page,perpage}=req.query

  const movies=await allMoviesService(page,perpage)

  return  res.json(movies)
}

export const updateMovieController = async (req: Request, res: Response) => {
  const movieData: iMovieUpdate = req.body;
  const idMovie:number= parseInt(req.params.id);

  const updateMovie = await updateMovieService(movieData, idMovie);

  return res.json(updateMovie);
};

export const deleteMovieController = async (req: Request, res: Response) => {
  const idMOvie: number = parseInt(req.params.id);
  await deleteMovieService(idMOvie);

  return res.status(204).send();
};
