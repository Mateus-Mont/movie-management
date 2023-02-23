import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movies } from "../../entities/movie.entitie";
import {
  iMovieResult,
  iMovieUpdate,
} from "../../interfaces/registerMovie.interface";
import { returnMovieSchema } from "../../schemas/registerMovie.schema";

export const updateMovieService = async (
  newMovieData: iMovieUpdate,
  idMovie: number
): Promise<iMovieResult> => {
  const movieRepository: Repository<Movies> =
    AppDataSource.getRepository(Movies);

  const oldUserData = await movieRepository.findOneBy({
    id: idMovie,
  });

  const movie = movieRepository.create({
    ...oldUserData,
    ...newMovieData,
  });

  await movieRepository.save(movie)
  const updateMovie=returnMovieSchema.parse(movie)

  return updateMovie
};
