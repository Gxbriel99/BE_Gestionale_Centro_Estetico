import { ObjectId, Schema, model, Document } from "mongoose";
import { z } from "zod";

export enum Role {
     ADMIN,
     EMPLOYED 
}

export interface IUser extends Document {
    _id: ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: {};
}

// Schema Mongoose
export const staffSchema = new Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String , enum: Object.values(Role)}
}, { collection: "staff", versionKey: false });


export const emailSchema = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email non valida").toLowerCase();

// Schema Zod
export const staffZod = z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: emailSchema,
    password: z.string().min(6),
    role: z.enum(Role),  
});

// ✅ Model Mongoose
export const staffModel = model<IUser>("staff", staffSchema);

