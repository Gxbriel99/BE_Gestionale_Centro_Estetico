import { model, Schema } from "mongoose"
import z from "zod";

//ENUM Categoria
export enum Categoria {
    CORPO = 'corpo',
    VISO = 'viso',
    CAPELLI = 'capelli',
    MANI = 'mani',
    PIEDI = 'piedi',
    ALTRO = 'altro'
}

//INTERFACCIA Service
export interface IService {
    nome: string,
    descrizione: string,
    prezzo: number
    categoria: Categoria,
    isDeleted?: boolean
}

// Schema Mongoose
export const serviceSchema = new Schema<IService>({
    nome: { type: String, required: true, unique: true },
    descrizione: { type: String, required: true },
    prezzo: { type: Number, required: true },
    categoria: { type: String, enum: Object.values(Categoria), required: true },
    isDeleted: { type: Boolean, default: false } 
}, { collection: "service", versionKey: false })


//Schema Zod
export const serviceZod = z.object({
    nome: z.string().min(4),
    descrizione: z.string().min(10),
    prezzo: z.number().min(1),
    categoria: z.nativeEnum(Categoria)
})

//✅ Model Mongoose
export const serviceModel = model<IService>("service", serviceSchema);