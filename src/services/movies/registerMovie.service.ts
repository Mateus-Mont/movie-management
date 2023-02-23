import { iDataMovie,iMovieResult } from "../../interfaces/registerMovie.interface";
import { Movies } from "../../entities/movie.entitie";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {returnMovieSchema} from "../../schemas/registerMovie.schema"

export const registerMovieService = async(movieData:iDataMovie):Promise<iMovieResult>=>{

    const movieRepository:Repository<Movies>=AppDataSource.getRepository(Movies)

    const movie:Movies=movieRepository.create(movieData)

    await movieRepository.save(movie)

    const newMovie=returnMovieSchema.parse(movie)

    return newMovie

}
