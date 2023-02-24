import { NextFunction, Request,Response } from "express"
import { Repository } from "typeorm"
import { Movie } from "../entities/movie.entitie"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"

export const ensureNameMovieExists=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const movieRepository:Repository<Movie>=AppDataSource.getRepository(Movie)

    const nameMovie:string=req.body.name
    
    const findMovie=await movieRepository.findOne({
        where:{
            name:nameMovie
        }
    })

    if(findMovie){
          throw  new AppError("Movie already exists", 409)
    }

    return next()
}