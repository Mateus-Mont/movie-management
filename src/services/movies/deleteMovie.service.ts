import { Movie } from "../../entities/movie.entitie";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

export const deleteMovieService=async(idMovie:number):Promise<void>=>{

    const movieRepository:Repository<Movie>=AppDataSource.getRepository(Movie)

    const movie= await movieRepository.findOneBy({
        id:idMovie
    })

    await  movieRepository.remove(movie!)

    
}