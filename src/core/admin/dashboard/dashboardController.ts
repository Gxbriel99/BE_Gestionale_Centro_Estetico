import { Request, Response } from 'express';
import { employedZod, idZod, IEmployed } from '../../schema/employedSchema';
import { editCustomer, editEmployed, getAllCustomers, getAllEmployeds, insertCustomer, insertEmployed, removeCustomer, removeEmployed } from './dashboardService';
import { customerZod } from '../../schema/customerSchema';



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
export const allCustomer = async (res: Response) => {
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


