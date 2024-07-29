import { z } from "zod";
import messages from "../messages";

const updateSchema = z.object({
    name: z.string()
        .min(2, messages(2).minSize)
        .max(40, messages(40).maxSize)
})

export default updateSchema
