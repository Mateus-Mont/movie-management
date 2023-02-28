import { z } from "zod";
import {
  allMoviesSchema,
  registerMovieSchema,
  returnMovieSchema,
} from "../schemas/registerMovie.schema";

import { DeepPartial, Repository } from 'typeorm'
import { Movie } from "../entities";

export type iDataMovie=z.infer<typeof registerMovieSchema>
export type iMovieResult=z.infer<typeof returnMovieSchema> 
export type iMovies=z.infer<typeof allMoviesSchema>

export type iMovieUpdate = DeepPartial<iDataMovie>


export interface  iMovieRepo extends Repository<Movie>{
}
