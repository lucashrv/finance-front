import { z } from "zod";
import messages from "../messages";

const createSchema = z.object({
    name: z.string()
        .min(2, messages(2).minSize)
        .max(40, messages(20).maxSize)
})

export default createSchema
