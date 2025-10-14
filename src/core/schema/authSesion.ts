import { model, ObjectId, Schema } from "mongoose";
import { z } from "zod";

export interface IAuthSession {
    entityID: ObjectId;
    token: string;
    scadenza: Date;
}

// Schema Mongoose
export const authSessionSchema = new Schema<IAuthSession>(
    {
        entityID: { type: Schema.Types.ObjectId, required: true },
        token: { type: String, required: true },
        scadenza: { type: Date, required: true } 
    },
    { collection: "session", versionKey: false }
);

// Validazione con Zod
export const authSessionZod = z.object({
    entityID: z
        .string()
        .regex(/^[a-f\d]{24}$/i, "ID non valido"),
    token: z.string().min(1),
    scadenza: z.coerce.date() 
});

// Modello
export const authSessionModel = model<IAuthSession>("session", authSessionSchema);
