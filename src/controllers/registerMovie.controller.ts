import { Request,Response } from "express";
import { iDataMovie } from "../interfaces/registerMovie.interface";
import { registerMovieService } from "../services/movies/registerMovie.service";

export const registerMovieController=async(req:Request,res:Response)=>{

    const movieData:iDataMovie=req.body
    const newMovie=await registerMovieService(movieData)

    return res.status(201).json(newMovie)

}