import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { allMoviesSchema } from "../../schemas/registerMovie.schema";

export const allMoviesService = async (page: any, perpage: any) => {
  
  if (isNaN(parseInt(page))) {
    page = 1;
  } else if (parseInt(page) < 1) {
    page = 1;
  }

  if (parseInt(perpage) < 1 || parseInt(perpage) > 5) {
    perpage = 5;
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const [moviesCount, quantity] = await movieRepository.findAndCount({});

  let count: number = moviesCount.length;

  if (!perpage) {
    perpage = 5;
    count = quantity;
  }

  let skip: number = (parseInt(page) - 1) * parseInt(perpage) || 0;
  let take: number = parseInt(perpage) || 5;

  const movies = await movieRepository.find({
    take,
    skip,
    order: {
      id: "ASC",
    },
  });

  const baseUrl: string = "http://localhost:3000/movies?page=";

  const data: Array<Movie> = allMoviesSchema.parse(movies);

  const totalPages: number = Math.ceil(quantity / take);

  const prevPage: string | null =page > 1 ? `${baseUrl}${page - 1}&perPage=${perpage}` : null;

  const nextPage: string | null =page < totalPages ? `${baseUrl}${page * 1+1}&perPage=${perpage}` : null;

  return {
    prevPage,
    nextPage,
    count,
    data,
  };
};
