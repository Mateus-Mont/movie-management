import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Movies } from '../entities/movie.entitie'
import { AppError } from '../errors'
 
export const ensureMovieExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const movieRepository: Repository<Movies> = AppDataSource.getRepository(Movies)
    const idMovie:number=parseInt(req.params.id)

    const findMovie = await movieRepository.findOne({
        where: {
            id:idMovie
        }
    })

    if(!findMovie){
          throw  new AppError("movie not found", 404)
    }

    return next()

}