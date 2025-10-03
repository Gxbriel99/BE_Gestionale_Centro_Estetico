import { ObjectId, Schema, model, Document } from "mongoose";
import { z } from "zod";
import { emailSchema, passwordSchema } from "./loginSchema";

export enum Role {
    ADMIN = "ADMIN",
    EMPLOYED ="EMPLOYED" 
}

export interface IStaff extends Document {
    _id: ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string;
    role:Role;
    cookieJWT:string;
}

// Schema Mongoose
export const staffSchema = new Schema<IStaff>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {  enum: Object.values(Role)},
    cookieJWT:{ type:String,unique:true}
}, { collection: "staff", versionKey: false });



// Schema Zod
export const staffZod = z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: emailSchema,
    password: passwordSchema,
    role: z.enum(Role),  
    cookieJWT: z.string().nullable().default(null)
});

// ✅ Model Mongoose
export const staffModel = model<IStaff>("staff", staffSchema);

