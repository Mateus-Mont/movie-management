import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { allMoviesSchema } from "../../schemas/registerMovie.schema";


export const allMoviesService = async (page: any, perpage: any) => {
  if (parseInt(page) < 1) {
    page = 1;
  }

  if (parseInt(perpage) < 1 || parseInt(perpage) > 5) {
    perpage = 5;
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let take: number = parseInt(perpage) || 5;
  let skip: number = (parseInt(page) - 1) * parseInt(perpage) || 0;
  
  const [movies, quantity] = await movieRepository.findAndCount({
    take,
    skip,
    order: {
      id: "ASC",
    },
  });
  
  
  const baseUrl: string = "http://localhost:3000/movies?page=";
  
  let count: number = movies.length;
  
  const data: Array<Movie> = allMoviesSchema.parse(movies);
  
  const totalPages: number = Math.ceil(quantity / take);
  
  
  let prevPage: string | null =
  page > 1 ? `${baseUrl}${page - 1}&perPage=${perpage}` : null;
 
  let nextPage: string | null =
  page < totalPages || !page ?  `${baseUrl}${page * 1 + 1}&perPage=${perpage}` : null;


  return {
    prevPage,
    nextPage,
    count,
    data,
  };
};
