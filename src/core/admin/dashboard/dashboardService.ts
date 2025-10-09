import { ObjectId } from "mongoose";
import { BadRequestException, NotFoundException } from "../../errors/errorException";
import { employedModel, IEmployed } from "../../schema/employedSchema";
import { ErrorCode } from "../../errors/errorEnum";
import { customerModel } from "../../schema/customerSchema";



//-----------------------CUSTOMER--------------------------------------//
export async function insertCustomer(nome: string, cognome: string, dataNascita:Date, telefono:number, email:string, sesso:string) {
    await customerModel.create({ nome, cognome, dataNascita ,telefono,email,sesso})
}

export async function editCustomer(id: string, nome: string, cognome: string, dataNascita: Date, telefono: number, email: string, sesso: string) {
    const updateted = await customerModel.findByIdAndUpdate(id, { nome, cognome, dataNascita, telefono, email, sesso }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
}

export async function removeCustomer(id: string) {
    const deleted = await customerModel.findByIdAndDelete(id);
    if (!deleted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
}

export async function getAllCustomers() {
    const customers = await customerModel.find();
    if (!customers) throw new NotFoundException('Nessun utente registrato', ErrorCode.NOT_FOUND)
    return customers;
}


//-----------------------EMPLOYED--------------------------------------//

export async function getAllEmployeds() {
    const employes = await employedModel.find();
    if (!employes) throw new NotFoundException('Nessun utente registrato', ErrorCode.NOT_FOUND)
    return employes;
}

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

