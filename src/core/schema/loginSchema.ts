import z from "zod";

export const emailSchema = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email non valida").toLowerCase();
export const passwordSchema = z
    .string()
    .min(8, "La password deve essere lunga almeno 8 caratteri")
    .regex(/[a-z]/, "La password deve contenere almeno una lettera minuscola")
    .regex(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
    .regex(/[0-9]/, "La password deve contenere almeno un numero")
    .regex(/[\W_]/, "La password deve contenere almeno un carattere speciale");

export const loginZod = z.object({
    email: emailSchema,
    password:passwordSchema
})
