import { ObjectId } from "mongoose";
import { BadRequestException, NotFoundException } from "../../errors/errorException";
import { employedModel, IEmployed } from "../../schema/employedSchema";
import { ErrorCode } from "../../errors/errorEnum";

export async function insertEmployed(data:object){
    await employedModel.create(data)
}

export async function editEmployed(data:IEmployed){
    const {id,nome,cognome}=data
    const updateted= await employedModel.findByIdAndUpdate(id, { nome, cognome }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
}

export async function removeEmployed(id:ObjectId){
    const deleted = await employedModel.findByIdAndDelete(id);
    if (!deleted) {
        throw new NotFoundException('Utente non trovato',ErrorCode.NOT_FOUND)
    }
}