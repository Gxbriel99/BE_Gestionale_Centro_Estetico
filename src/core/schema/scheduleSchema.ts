import { model, Schema, Types } from "mongoose";
import z from "zod";
import { Categoria } from "./serviceSchema";

// ENUM
export enum Status {
    PRENOTATO = 'prenotato',
    CANCELLATO = 'cancellato',
    IN_CORSO = 'in corso',
    COMPLETATO = 'completato'
}

// INTERFACCIA TYPESCRIPT
export interface ISchedule {
    _id?: string;
    giorno: string;
    oraInizio: string;
    oraFine: string;
    note: string;
    status: Status;
    service: {
        id: string;
        nome: string;
        prezzo: number;
        categoria: Categoria;
    };
    employed: {
        id: string;
        nome: string;
        cognome: string;
    };
    customer: {
        id: string;
        nome: string;
        cognome: string;
    };
    isDeleted?: boolean;
}

// SCHEMA MONGOOSE
export const scheduleSchema = new Schema<ISchedule>(
    {
        giorno: { type: String, required: true },
        oraInizio: { type: String, required: true },
        oraFine: { type: String, required: true },
        note: { type: String, required: true },
        status: { type: String, enum: Object.values(Status), required: true },
        service: {
            id: { type: String, required: true },
            nome: { type: String, required: true },
            prezzo: { type: Number, required: true },
            categoria: { type: String, required: true },
        },
        employed: {
            id: { type: String, required: true },
            nome: { type: String, required: true },
            cognome: { type: String, required: true },
        },
        customer: {
            id: { type: String, required: true },
            nome: { type: String, required: true },
            cognome: { type: String, required: true },
        },
        isDeleted: { type: Boolean, default: false },
    },
    { collection: "schedule", versionKey: false }
);

// SCHEMA ZOD
export const scheduleZod = z.object({
    giorno: z.string().min(10),
    oraInizio: z.string().min(5),
    oraFine: z.string().min(5),
    note: z.string(),
    status: z.nativeEnum(Status),
    service: z.object({
        id: z.string(),
        nome: z.string(),
        prezzo: z.number(),
        categoria: z.string()
    }),
    employed: z.object({
        id: z.string(),
        nome: z.string(),
        cognome: z.string()
    }),
    customer: z.object({
        id: z.string(),
        nome: z.string(),
        cognome: z.string()
    })
});

// MODEL MONGOOSE
export const scheduleModel = model<ISchedule>("schedule", scheduleSchema);
