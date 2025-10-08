import { Request, Response } from 'express';
import { employedZod, idZod, IEmployed } from '../../schema/employedSchema';
import { editEmployed, getAllEmployeds, getSingleEmployed, insertEmployed, removeEmployed } from './dashboardService';

export const addEmployed = async (req: Request, res: Response) => {
    const {nome,cognome}= employedZod.parse(req.body) 
    await insertEmployed(nome,cognome)
    res.status(201).json('Dipendende aggiunto con successo')
}

export const updateEmployed= async (req:Request,res:Response)=>{
    const id= idZod.parse(req.params.id)
    const {nome,cognome} = employedZod.parse(req.body)
    await editEmployed(id, nome, cognome)
    res.status(201).json('Dipendende modificato con successo')
} 

export const deleteEmployed = async (req: Request, res: Response) => {
    const id = idZod.parse(req.params.id)
    await removeEmployed(id)
    res.status(201).json('Dipendende eliminato con successo')
}


export const allEmployeds= async (req:Request,res:Response)=>{
    const employeds = await getAllEmployeds()
    res.status(200).json(employeds);
} 
export const getEmployed= async (req:Request,res:Response)=>{
    const id = idZod.parse(req.params.id)
    const employed = await getSingleEmployed(id)
    res.status(200).json(employed);
} 