import { Document, model, Schema } from "mongoose";
import z, { number } from "zod";
import { emailSchema } from "./staffSchema";

//ENUM Sesso
export enum Sesso {
    UOMO='uomo',
    DONNA = 'donna',
    INCERTO = 'incert*'
}

//INTERFACCIA Customer
export interface ICustomer extends Document{
    nome:string,
    cognome:string,
    dataNascita:Date,
    telefono:number
    email:string,
    sesso:Sesso
}

// Schema Mongoose
export const customerSchema = new Schema<ICustomer>({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    dataNascita: { type: Date, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true, unique:true },
    sesso: {  enum: Object.values(Sesso)}
}, { collection: "customer", versionKey: false })


//Schema Zod

export const customerZod = z.object({
    nome: z.string().min(3),
    cognome: z.string().min(3),
    dataNascita: z.date(),
    telefono: z.number().min(1000000000),
    email: emailSchema,
    sesso: z.nativeEnum(Sesso)
});


// ✅ Model Mongoose
export const customerModel = model<ICustomer>("customer", customerSchema);