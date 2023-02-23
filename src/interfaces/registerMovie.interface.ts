import { z } from "zod";
import {
  registerMovieSchema,
  returnMovieSchema,
} from "../schemas/registerMovie.schema";

import { DeepPartial } from 'typeorm'

export type iDataMovie=z.infer<typeof registerMovieSchema>
export type iMovieResult=z.infer<typeof returnMovieSchema> 

export type iMovieUpdate = DeepPartial<iDataMovie>
