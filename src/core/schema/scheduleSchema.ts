import { model, Schema } from "mongoose"
import {idZod } from "./employedSchema"
import z from "zod";


export enum Status {
    PRENOTATO = 'prenotato',
    CANCELLATO = 'cancellato',
    IN_CORSO= 'in corso',
    COMPLETATO = 'completato'
}

export interface ISchedule {
    giorno:string
    oraInizio:string
    oraFine:string
    note:string,
    status: Status,
    service: string,
    employed: string,
    customer: string
    isDeleted?:boolean
}

// Schema Mongoose
export const scheduleSchema = new Schema<ISchedule>({
    giorno: { type: String, required: true },
    oraInizio: { type: String, required: true },
    oraFine: { type: String, required: true },
    note: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), required: true },
    service: { type: String, required: true },
    employed: { type: String, required: true },
    customer: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { collection: "schedule", versionKey: false });


//Schema Zod
export const scheduleZod = z.object({
    giorno: z.string().min(10), 
    oraInizio: z.string().min(5),
    oraFine: z.string().min(5),
    note: z.string(),
    status:z.nativeEnum(Status),
    service:idZod,
    employed:idZod,
    customer:idZod
});

// ✅ Model Mongoose
export const scheduleModel = model<ISchedule>("schedule", scheduleSchema);

