import { z } from "zod";
import messages from "../messages";

const changePasswordSchema = z.object({
    currentPassword: z.string()
        .min(8, messages(8).minSize),
    newPassword: z.string()
        .min(8, messages(8).minSize),
    confirmPassword: z.string()
        .min(8, messages(8).minSize)
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
});

export default changePasswordSchema
