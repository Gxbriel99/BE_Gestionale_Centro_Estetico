import { Request, Response } from 'express';
import { employedModel, employedZod, idZod, IEmployed } from '../../schema/employedSchema';
import { editCustomer, editEmployed, editService, getAllCustomers, getAllEmployeds, getAllService, getSingleCustomer, getSingleEmployed, getSingleService, insertCustomer, insertEmployed, insertPrenotation, insertService, removeCustomer, removeEmployed, removeService } from './dashboardService';
import { customerZod } from '../../schema/customerSchema';
import { serviceZod } from '../../schema/serviceSchema';
import { ISchedule, scheduleZod } from '../../schema/scheduleSchema';




//-----------------------CUSTOMER--------------------------------------//

/**
 * Funzione per aggiungere un nuovo cliente.
 * @param req payload della richiesta contenente i dati del cliente.
 * @param res json di risposta con messaggio di successo.
 */
export const addCustomer = async (req: Request, res: Response) => {
    const data = { ...req.body, dataNascita: new Date(req.body.dataNascita) }
    const { nome, cognome, telefono, dataNascita, email, sesso } = customerZod.parse(data)
    await insertCustomer(nome, cognome, dataNascita, telefono, email, sesso)
    res.status(201).json('Cliente registrato con successo')
    //NON AGGIUNGE IL SESSO,DA CONTROLLARE
}

/**
 * Funzione per modificare i dati di un cliente esistente.
 * @param req payload della richiesta contenente l'id del cliente da modificare e i nuovi dati.
 * @param res Json di risposta con messaggio di successo.
 */
export const updateCustomer = async (req: Request, res: Response) => {
    const id = idZod.parse(req.params.id)
    const data = { ...req.body, dataNascita: new Date(req.body.dataNascita) }
    const { nome, cognome, telefono, dataNascita, email, sesso } = customerZod.parse(data)
    await editCustomer(id, nome, cognome, dataNascita, telefono, email, sesso)
    res.status(200).json('Dipendende modificato con successo')
}

/**
 * Funzione per eliminare un cliente esistente.
 * @param req payload della richiesta contenente l'id del cliente da eliminare.
 * @param res json di risposta con messaggio di successo.
 */
export const deleteCustomer = async (req: Request, res: Response) => {
    const id = idZod.parse(req.params.id)
    await removeCustomer(id)
    res.status(200).json('Dipendende eliminato con successo')
}


/**
 * Funzione per ottenere tutti i clienti registrati.
 * @res json di risposta con la lista dei clienti.
 */
export const allCustomer = async (req: Request, res: Response) => {
    const customers = await getAllCustomers()
    res.status(200).json(customers);
}


//-----------------------EMPLOYED--------------------------------------//

/**
 * Funzione per aggiungere un nuovo dipendente.
 * @param req payload della richiesta contenente i dati del dipendente.
 * @param res json di risposta con messaggio di successo.
 */
export const addEmployed = async (req: Request, res: Response) => {
    const { nome, cognome } = employedZod.parse(req.body)
    await insertEmployed(nome, cognome)
    res.status(201).json('Dipendende aggiunto con successo')
}

/**
 * Funzione per modificare i dati di un dipendente esistente.
 * @param req payload della richiesta contenente l'id del dipendente da modificare e i nuovi dati.
 * @param res Json di risposta con messaggio di successo.
 */
export const updateEmployed = async (req: Request, res: Response) => {
    const id = idZod.parse(req.params.id)
    const { nome, cognome } = employedZod.parse(req.body)
    await editEmployed(id, nome, cognome)
    res.status(200).json('Dipendende modificato con successo')
}

/**
 * Funzione per eliminare un dipendente esistente.
 * @param req payload della richiesta contenente l'id del dipendente da eliminare.
 * @param res json di risposta con messaggio di successo.
 */
export const deleteEmployed = async (req: Request, res: Response) => {
    const id = idZod.parse(req.params.id)
    await removeEmployed(id)
    res.status(200).json('Dipendende eliminato con successo')
}

/**
 * Funzione per ottenere tutti i dipendenti registrati.
 * @res json di risposta con la lista dei dipendenti.
 */
export const allEmployeds = async (req: Request, res: Response) => {
    const employeds = await getAllEmployeds()
    res.status(200).json(employeds);
}


//-----------------------SERVICE--------------------------------------//

export const addService = async (req: Request, res: Response) => {
    const { nome, descrizione, prezzo, categoria } = serviceZod.parse(req.body)
    await insertService(nome, descrizione, prezzo, categoria)
    res.status(201).json('Servizio aggiunto con successo')
}

export const updateService = async (req: Request, res: Response) => {
    const id = idZod.parse(req.params.id)
    const { nome, descrizione, prezzo, categoria } = serviceZod.parse(req.body)
    await editService(id, nome, descrizione, prezzo, categoria)
    res.status(200).json('Servizio modificato con successo')
}

export const deleteService = async (req: Request, res: Response) => {
    const id = idZod.parse(req.params.id)
    await removeService(id)
    res.status(200).json('Dipendende eliminato con successo')
}

export const allService = async (req: Request, res: Response) => {
    const service = await getAllService()
    res.status(200).json(service);
}


//-----------------------SCHEDULE--------------------------------------//

export const addPrenotaion = async (req: Request, res: Response) => {
    console.log(req.body)
    const {giorno,oraInizio,oraFine,note,status,service,customer,employed} = scheduleZod.parse(req.body);

    const servizio= await getSingleService(service)
    const cliente = await getSingleCustomer(customer)
    const dipendente = await getSingleEmployed(employed)
    
    await insertPrenotation(giorno, oraInizio, oraFine, note, status, servizio._id, servizio.nome, servizio.prezzo, servizio.categoria, cliente._id, cliente.nome, cliente.cognome, dipendente._id,dipendente.nome,dipendente.cognome)
    res.status(200).json('Prenotazione aggiunta con successo')
    
    //CONTROLLA PERCHE' GLI ID NON SONO TIPIZZATI COME STRINGA
}