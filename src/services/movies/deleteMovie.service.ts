import  {Request,Response}  from "express"
import { Movies } from "../../entities/movie.entitie";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

export const deleteMovieService=async(idMovie:number):Promise<void>=>{

    const movieRepository:Repository<Movies>=AppDataSource.getRepository(Movies)

    const movie= await movieRepository.findOneBy({
        id:idMovie
    })

    await  movieRepository.remove(movie!)

    
}