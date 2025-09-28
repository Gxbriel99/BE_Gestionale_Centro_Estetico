import { ObjectId, Schema, model, Document } from "mongoose";

// Interfaccia per lo schema UserSchema
export interface IUser extends Document{
    _id: ObjectId;
    nome: string;
    cognome: string;
    email: string;
    password: string;
    isAdmin: boolean;
    localJWT:String|null;
    coockieJWT:string|null;
    dataLastLog:Date|null;
}

// Definizione dello schema UserSchema
const UserSchema = new Schema<IUser>({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    localJWT: { type: String},
    coockieJWT: { type: String},
    dataLastLog: { type: Date },
    
}, { collection: "utenti",versionKey: false, });
//Associazione dello schema alla collection UserModel su mongo Atlas
export const UserModel = model("utenti", UserSchema);

