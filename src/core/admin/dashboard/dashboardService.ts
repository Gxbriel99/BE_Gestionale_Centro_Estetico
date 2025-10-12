import { ObjectId } from "mongoose";
import { BadRequestException, NotFoundException } from "../../errors/errorException";
import { employedModel, IEmployed } from "../../schema/employedSchema";
import { ErrorCode } from "../../errors/errorEnum";
import { customerModel, ICustomer } from "../../schema/customerSchema";
import { IService, serviceModel } from "../../schema/serviceSchema";
import { scheduleModel, Status } from "../../schema/scheduleSchema";



//-----------------------------------CUSTOMER--------------------------------------//
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

export async function getSingleCustomer(id: string) {
    const employed= await customerModel.findById({ _id: id, isDeleted: false });
    if (!employed) throw new NotFoundException('Cliente non trovato', ErrorCode.NOT_FOUND)
    return employed;
}


//------------------------------------------EMPLOYED--------------------------------------//

export async function getAllEmployeds() {
    const employed = await employedModel.find({ isDeleted: false });
    return employed;
}

export async function getSingleEmployed(id: string) {
    const employed= await employedModel.findById({ _id: id, isDeleted: false });
    if (!employed) throw new NotFoundException('Dipendente non trovato', ErrorCode.NOT_FOUND)
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

//----------------------------------------SERVICE--------------------------------------//

export async function getAllService() {
    const service = await serviceModel.find({ isDeleted: false });
    if (!service) throw new NotFoundException('Nessun servizio registrato', ErrorCode.NOT_FOUND)
    return service;
}

export async function getSingleService(id: string) {
    const service = await serviceModel.findById({ _id: id, isDeleted: false });
    if (!service) throw new NotFoundException('Servizio non trovato', ErrorCode.NOT_FOUND);
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

//----------------------------------------SCHEDULE--------------------------------------//


export async function insertPrenotation(giorno:string, oraInizio:string, oraFine:string, note:string, status:Status, service:object, customer:object, employed:object) {
    await scheduleModel.create({giorno,oraInizio,oraFine,note,status,service,employed,customer,isDeleted: false});
}

export async function editPrenotation(id:string,giorno:string, oraInizio:string, oraFine:string, note:string, status:Status, service:object, customer:object, employed:object) {
    await scheduleModel.findByIdAndUpdate(id,{giorno, oraInizio, oraFine, note, status, service, employed, customer, isDeleted: false},{ new: true } );
}

export async function removePrenotation(id: string,status:Status) {
    await scheduleModel.findByIdAndUpdate(id, { status, isDeleted: true }, { new: true });
}

export async function getAllSchedule() {
    const schedule = await scheduleModel.find({ isDeleted: false });
    if (!schedule) throw new NotFoundException('Nessuna prenotazione registrata', ErrorCode.NOT_FOUND)
    return schedule;
}
