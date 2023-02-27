import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { iMovies } from "../../interfaces/movies.interface";
import { allMoviesSchema } from "../../schemas/registerMovie.schema";
import { AppError } from "../../errors";

export const allMoviesService = async (page: any, perpage: any)=> {

    if (parseInt(page) < 1) {
      page = 1
    }
  
    if (parseInt(perpage) < 1 || parseInt(perpage) > 5) {
      perpage = 5
    }
  
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    
    const take: number = parseInt(perpage)
    const skip: number = (parseInt(page) - 1) * parseInt(perpage)
    
    const [movies, quantity] = await movieRepository.findAndCount({
      take,
      skip,
      order: {
        name: 'DESC'
      }
    })


   
    const count=movies.length
   
    const data = allMoviesSchema.parse(movies)
    
    const totalPages = Math.ceil(quantity / take)
    
    const prevPage = page > 1 ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perpage}` : null
    
    const nextPage = page < totalPages ? `http://localhost:3000/movies?page=${(page * 1)+1}&perPage=${perpage}` : null
    


    return {
      prevPage,
      nextPage,
      count,
      data
    }
  }