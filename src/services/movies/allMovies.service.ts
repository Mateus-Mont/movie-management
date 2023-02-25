import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { iMovies } from "../../interfaces/movies.interface";
import { allMoviesSchema } from "../../schemas/registerMovie.schema";

export const allMoviesService=async():Promise<iMovies>=>{

    const  movieRepository:Repository<Movie>=AppDataSource.getRepository(Movie)

    const findMovies:Array<Movie>=await  movieRepository.find({

        take: 3, // Como se fosse LIMIT
        skip: 2, //Como se fosse OFFSET
        order: {
            name: 'ASC'
        }
    })

    const movies=allMoviesSchema.parse(findMovies)

    return movies
}