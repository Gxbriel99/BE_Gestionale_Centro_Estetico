import { ObjectId } from "mongoose";
import { BadRequestException, NotFoundException } from "../../errors/errorException";
import { employedModel, IEmployed } from "../../schema/employedSchema";
import { ErrorCode } from "../../errors/errorEnum";
import { customerModel, ICustomer } from "../../schema/customerSchema";
import { IService, serviceModel } from "../../schema/serviceSchema";
import { scheduleModel, Status } from "../../schema/scheduleSchema";
import logger from "../../logs/logs";



//-----------------------------------CUSTOMER--------------------------------------//
export async function insertCustomer(nome: string, cognome: string, dataNascita: Date, telefono: number, email: string, sesso: string) {
    logger.info(`Cliente: ${nome} ${cognome} registrato con successo`);
    await customerModel.create({ nome, cognome, dataNascita, telefono, email, sesso, isDeleted: false })
}

export async function editCustomer(id: string, nome: string, cognome: string, dataNascita: Date, telefono: number, email: string, sesso: string) {
    const updateted = await customerModel.findByIdAndUpdate(id, { nome, cognome, dataNascita, telefono, email, sesso }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
    logger.info(`Cliente: ${id} aggiornato con successo`);
}

export async function removeCustomer(id: string) {
    logger.info(`Cliente: ${id} rimosso con successo`);
    await customerModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
}

export async function getAllCustomers() {
    const customers = await customerModel.find({ isDeleted: false });
    logger.info(`Lista clienti ottenuta correttamente`);
    return customers;
}

export async function getSingleCustomer(id: string) {
    const employed= await customerModel.findById({ _id: id, isDeleted: false });
    if (!employed) throw new NotFoundException('Cliente non trovato', ErrorCode.NOT_FOUND)
    logger.info(`Cliente: ${id} ottenuto con successo`);
    return employed;
}


//------------------------------------------EMPLOYED--------------------------------------//


export async function getAllEmployeds() {
    const employed = await employedModel.find({ isDeleted: false });
    logger.info(`Lista employed ottenuta correttamente`);
    return employed;
}

export async function getSingleEmployed(id: string) {
    const employed= await employedModel.findById({ _id: id, isDeleted: false });
    if (!employed) throw new NotFoundException('Dipendente non trovato', ErrorCode.NOT_FOUND)
    logger.info(`Employed: ${id} ottenuto con successo`);
    return employed;
}

export async function insertEmployed(nome: string, cognome: string) {
    logger.info(`Employed: ${nome} ${cognome} registrato con successo`);
    await employedModel.create({ nome, cognome, isDeleted: false })
}

export async function editEmployed(id: string, nome: string, cognome: string) {
    const updateted = await employedModel.findByIdAndUpdate(id, { nome, cognome }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)
    }
    logger.info(`Cliente: ${id} aggiornato con successo`);

}

export async function removeEmployed(id: string) {
    await employedModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    logger.info(`Employed: ${id} rimosso con successo`);

}

//----------------------------------------SERVICE--------------------------------------//

export async function getAllService() {
    const service = await serviceModel.find({ isDeleted: false });
    if (!service) throw new NotFoundException('Nessun servizio registrato', ErrorCode.NOT_FOUND)
    logger.info(`Lista service  ottenuta correttamente`);
    return service;
}

export async function getSingleService(id: string) {
    const service = await serviceModel.findById({ _id: id, isDeleted: false });
    if (!service) throw new NotFoundException('Servizio non trovato', ErrorCode.NOT_FOUND);
    logger.info(`Service: ${id} ottenuto con successo`);
    return service;
}

export async function insertService(nome: string, descrizione: string, prezzo: number, categoria: string) {
    logger.info(`service: ${nome} registrato con successo`);
    await serviceModel.create({ nome, descrizione, prezzo, categoria, isDeleted: false })
}

export async function editService(id: string, nome: string, descrizione: string, prezzo: number, categoria: string) {
    const updateted = await serviceModel.findByIdAndUpdate(id, { nome, descrizione, prezzo, categoria }, { new: true });
    if (!updateted) {
        throw new NotFoundException('Servizio non trovato', ErrorCode.NOT_FOUND)
    }
    logger.info(`Service: ${id} aggiornato con successo`);
}

export async function removeService(id: string) {
    await serviceModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    logger.info(`Service: ${id} rimosso con successo`);
}

//----------------------------------------SCHEDULE--------------------------------------//


export async function getAllSchedule() {
    const schedule = await scheduleModel.find({ isDeleted: false });
    if (!schedule) throw new NotFoundException('Nessuna prenotazione registrata', ErrorCode.NOT_FOUND)
    logger.info(`Lista schedule ottenuta correttamente`);
    return schedule;
}

export async function insertPrenotation(giorno:string, oraInizio:string, oraFine:string, note:string, status:Status, service:object, customer:object, employed:object) {
    logger.info(`prenotazione registrata con successo`);
    await scheduleModel.create({giorno,oraInizio,oraFine,note,status,service,employed,customer,isDeleted: false});
}

export async function editPrenotation(id:string,giorno:string, oraInizio:string, oraFine:string, note:string, status:Status, service:object, customer:object, employed:object) {
    logger.info(`Prenotazione: ${id} aggiornata con successo`);
    await scheduleModel.findByIdAndUpdate(id,{giorno, oraInizio, oraFine, note, status, service, employed, customer, isDeleted: false},{ new: true } );
}

export async function removePrenotation(id: string,status:Status) {
    logger.info(`Prenotazione: ${id} rimossa con successo`);
    await scheduleModel.findByIdAndUpdate(id, { status, isDeleted: true }, { new: true });
}


