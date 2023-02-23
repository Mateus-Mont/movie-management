import { z } from "zod";
import {
  registerMovieSchema,
  returnMovieSchema,
} from "../schemas/registerMovie.schema";

export type iDataMovie=z.infer<typeof registerMovieSchema>
export type iMovieResult=z.infer<typeof returnMovieSchema>
