import { NextFunction, Request,Response } from "express"
import { Repository } from "typeorm"
import { Movie } from "../entities/movie.entitie"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"

export const ensureNameMovieExists=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const { name } = req.body;
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
    if (!name) {
    return next()
    }
  
    const movie = await movieRepository.findOne({
        where:{
            name:name
        }
        
    });
  
    if (movie) {
      if (req.params.id && movie.id === parseInt(req.params.id)) {
        return next();
      }
      throw new AppError('Movie already exists.',409)
    }
  
    return next();
}