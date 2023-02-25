import {z} from "zod"

export const registerMovieSchema=z.object({
    name:z.string().max(50),
    description:z.string().optional().nullable(),
    duration:z.number().min(0,"Number must be greater than 0"),
    price:z.number().int()
})

export const movieUpdateSchema = registerMovieSchema.partial()

export const returnMovieSchema=registerMovieSchema.extend({
    id:z.number()
})

export const allMoviesSchema=returnMovieSchema.array()
