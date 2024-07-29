import { z } from "zod"

const env = z.object({
    VITE_API_URL: z.string().url(),
})
    .parse(import.meta.env)

export default env
