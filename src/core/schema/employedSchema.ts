import { Document, model, ObjectId, Schema } from "mongoose";
import z from "zod";


//Interface
export interface IEmployed  {
    id?:ObjectId,
    nome: string,
    cognome: string
}

// Schema Mongoose
export const employedSchema = new Schema<IEmployed>({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
},{ collection: "employed", versionKey: false })

//Schema Zod
export const employedZod = z.object({
    id: z.string().min(1).optional(), 
    nome: z.string().min(3).optional(),
    cognome: z.string().min(3).optional(),
});

// ✅ Model Mongoose
export const employedModel = model<IEmployed>("employed", employedSchema);