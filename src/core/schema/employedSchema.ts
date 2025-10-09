import { Document, model, ObjectId, Schema } from "mongoose";
import z from "zod";


//Interface
export interface IEmployed  {
    id?:ObjectId,
    nome: string,
    cognome: string
    isDeleted?:boolean
}

// Schema Mongoose
export const employedSchema = new Schema<IEmployed>({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
},{ collection: "employed", versionKey: false })

//Schema Zod
export const idZod = z.string().min(1, "L'id è obbligatorio");

export const employedZod = z.object({
    nome: z.string().min(3),
    cognome: z.string().min(3),
});


// ✅ Model Mongoose
export const employedModel = model<IEmployed>("employed", employedSchema);