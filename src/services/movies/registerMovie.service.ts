import { iDataMovie,iMovieResult } from "../../interfaces/registerMovie.interface";
import { Movie } from "../../entities/movie.entitie";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {returnMovieSchema} from "../../schemas/registerMovie.schema"

export const registerMovieService = async(movieData:iDataMovie):Promise<iMovieResult>=>{

    const movieRepository:Repository<Movie>=AppDataSource.getRepository(Movie)

    const movie:Movie=movieRepository.create(movieData)

    await movieRepository.save(movie)

    const newMovie=returnMovieSchema.parse(movie)

    return newMovie

}
