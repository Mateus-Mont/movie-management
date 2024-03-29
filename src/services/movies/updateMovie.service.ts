import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entitie";
import { AppError } from "../../errors";
import { iMovieResult, iMovieUpdate } from "../../interfaces/movies.interface";
import { returnMovieSchema } from "../../schemas/registerMovie.schema";

export const updateMovieService = async (
  newMovieData: iMovieUpdate,
  idMovie: number
): Promise<iMovieResult> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData = await movieRepository.findOneBy({
    id: idMovie,
  });

  if (oldMovieData?.name === newMovieData.name) {
    throw new AppError("Movie already exists.", 409);
  }

  const movie = movieRepository.create({
    ...oldMovieData,
    ...newMovieData,
  });

  await movieRepository.save(movie);
  const updateMovie = returnMovieSchema.parse(movie);

  return updateMovie;
};
