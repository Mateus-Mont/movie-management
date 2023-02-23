import {z} from "zod"

export const registerMovieSchema=z.object({
    name:z.string().max(50),
    description:z.string().optional().nullable(),
    duration:z.number(),
    price:z.number()
})

export const movieUpdateSchema = registerMovieSchema.partial()

export const returnMovieSchema=registerMovieSchema.extend({
    id:z.number()
})
