import { z } from "zod";
import messages from "../messages";

const updateSchema = z.object({
    description: z.string()
        .min(2, messages(2).minSize)
        .max(20, messages(20).maxSize),
    transaction: z.number({
        invalid_type_error: messages().number
    }),
    category_id: z.number()
})

updateSchema.required({
    transaction: true,
    description: true,
    category_id: true
})

export default updateSchema
