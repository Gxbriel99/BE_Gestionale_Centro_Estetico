import { Document, model, Schema } from "mongoose";
import z from "zod";


//Interface
export interface IEmployed extends Document {
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
    nome: z.string().min(3),
    cognome: z.string().min(3),
})

// ✅ Model Mongoose
export const employedModel = model<IEmployed>("employed", employedSchema);