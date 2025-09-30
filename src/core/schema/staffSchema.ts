import { ObjectId, Schema, model, Document } from "mongoose";
import { z } from "zod";

export enum Role {
    ADMIN = "ADMIN",
    EMPLOYED ="EMPLOYED" 
}

export interface IUser extends Document {
    _id: ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string;
    role:Role;
}

// Schema Mongoose
export const staffSchema = new Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {  enum: Object.values(Role)}
}, { collection: "staff", versionKey: false });


export const emailSchema = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email non valida").toLowerCase();
export const passwordSchema = z
    .string()
    .min(8, "La password deve essere lunga almeno 8 caratteri")
    .regex(/[a-z]/, "La password deve contenere almeno una lettera minuscola")
    .regex(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
    .regex(/[0-9]/, "La password deve contenere almeno un numero")
    .regex(/[\W_]/, "La password deve contenere almeno un carattere speciale");

// Schema Zod
export const staffZod = z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: emailSchema,
    password: passwordSchema,
    role: z.enum(Role),  
});

// ✅ Model Mongoose
export const staffModel = model<IUser>("staff", staffSchema);

