import { ObjectId } from "mongoose";
import { BadRequestException, NotFoundException } from "../../errors/errorException";
import { employedModel, IEmployed } from "../../schema/employedSchema";
import { ErrorCode } from "../../errors/errorEnum";

export async function insertEmployed(nome:string,cognome:string){
    await employedModel.create({nome,cognome})
}

export async function editEmployed(id:string,nome:string,cognome:string){
    const updateted= await employedModel.findByIdAndUpdate(id, { nome, cognome }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
}

export async function removeEmployed(id:string){
    const deleted = await employedModel.findByIdAndDelete(id);
    if (!deleted) {
        throw new NotFoundException('Utente non trovato',ErrorCode.NOT_FOUND)
    }
}

export async function getAllEmployeds(){
    const employes = await employedModel.find();
    if(!employes) throw new NotFoundException('Nessun utente registrato',ErrorCode.NOT_FOUND)
    return employes;
}

export async function getSingleEmployed(id:string){
    const employed = await employedModel.findById(id)
    if (!employed) throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    return employed
}