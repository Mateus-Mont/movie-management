import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { iMovies } from "../../interfaces/movies.interface";
import { allMoviesSchema } from "../../schemas/registerMovie.schema";

export const allMoviesService=async(page:any,perpage:any):Promise<iMovies>=>{

    const  movieRepository:Repository<Movie>=AppDataSource.getRepository(Movie)

    const take:number=parseInt(perpage) || 5
    const skip:number=parseInt(page) || 1 


    const findMovies:Array<Movie>=await  movieRepository.find({
        take,
        skip:take*(skip-1),
        order: {
            name: 'ASC'
        }
    })

    const movies=allMoviesSchema.parse(findMovies)

    return movies
}