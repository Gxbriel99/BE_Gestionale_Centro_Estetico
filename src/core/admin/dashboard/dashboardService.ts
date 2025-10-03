import { employedModel } from "../../schema/employedSchema";

export async function insertEmployed(nome:string,cognome:string){
    await employedModel.create(nome,cognome)
}