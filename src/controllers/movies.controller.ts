import { Request,Response } from "express";
import { iDataMovie, iMovieUpdate } from "../interfaces/registerMovie.interface";
import { registerMovieService } from "../services/movies/registerMovie.service";
import { updateMovieService } from "../services/movies/updateMovie.service";

export const registerMovieController=async(req:Request,res:Response)=>{

    const movieData:iDataMovie=req.body
    const newMovie=await registerMovieService(movieData)

    return res.status(201).json(newMovie)

}

export const updateMovieController=async(req:Request,res:Response)=>{
const movieData:iMovieUpdate=req.body
const idMovie=parseInt(req.params.id)

const updateMovie =await updateMovieService(movieData,idMovie)

return res.json(updateMovie)

}