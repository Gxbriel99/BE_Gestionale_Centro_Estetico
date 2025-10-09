import { ObjectId } from "mongoose";
import { BadRequestException, NotFoundException } from "../../errors/errorException";
import { employedModel, IEmployed } from "../../schema/employedSchema";
import { ErrorCode } from "../../errors/errorEnum";
import { customerModel } from "../../schema/customerSchema";
import { serviceModel } from "../../schema/serviceSchema";



//-----------------------CUSTOMER--------------------------------------//
export async function insertCustomer(nome: string, cognome: string, dataNascita: Date, telefono: number, email: string, sesso: string) {
    await customerModel.create({ nome, cognome, dataNascita, telefono, email, sesso, isDeleted: false })
}

export async function editCustomer(id: string, nome: string, cognome: string, dataNascita: Date, telefono: number, email: string, sesso: string) {
    const updateted = await customerModel.findByIdAndUpdate(id, { nome, cognome, dataNascita, telefono, email, sesso }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
}

export async function removeCustomer(id: string) {
    await customerModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}

export async function getAllCustomers() {
    const customers = await customerModel.find({ isDeleted: false });
    return customers;
}


//-----------------------EMPLOYED--------------------------------------//

export async function getAllEmployeds() {
    const employed = await employedModel.find({ isDeleted: false });
    return employed;
}


export async function insertEmployed(nome: string, cognome: string) {
    await employedModel.create({ nome, cognome, isDeleted: false })
}

export async function editEmployed(id: string, nome: string, cognome: string) {
    const updateted = await employedModel.findByIdAndUpdate(id, { nome, cognome }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
}

export async function removeEmployed(id: string) {
    await employedModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}

//-----------------------SERVICE--------------------------------------//

export async function getAllService() {
    const service = await serviceModel.find({ isDeleted: false });
    if (!service) throw new NotFoundException('Nessun servizio registrato', ErrorCode.NOT_FOUND)
    return service;
}

export async function insertService(nome: string, descrizione: string, prezzo: number, categoria: string) {
    await serviceModel.create({ nome, descrizione, prezzo, categoria, isDeleted: false })
}

export async function editService(id: string, nome: string, descrizione: string, prezzo: number, categoria: string) {
    const updateted = await serviceModel.findByIdAndUpdate(id, { nome, descrizione, prezzo, categoria }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Servizio non trovato', ErrorCode.NOT_FOUND)
    }
}

export async function removeService(id: string) {
    await serviceModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}