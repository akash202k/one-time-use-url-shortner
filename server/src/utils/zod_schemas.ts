import { z } from "zod";

const urlSchema = z.object({
    longurl: z.string()
})

export { urlSchema }