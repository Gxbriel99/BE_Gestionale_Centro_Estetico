import { Request, Response } from 'express';
import { employedZod } from '../../schema/employedSchema';
import { insertEmployed } from './dashboardService';

export const addEmployed= async (req:Request,res:Response)=>{
    const {nome,cognome}= employedZod.parse(req.body)
    await insertEmployed(nome,cognome)
    res.status(201).json('Dipendende aggiunto con successo')
} //da testare


// export const editEmployed= async (req:Request,res:Response)=>{
//     const {nome,cognome}= employedZod.parse(req.body)
//     await insertEmployed(nome,cognome)
//     res.status(201).json('Dipendende modificato con successo')
// } da modificare


// export const deleteEmployed= async (req:Request,res:Response)=>{
//     const {nome,cognome}= employedZod.parse(req.body)
//     await insertEmployed(nome,cognome)
//     res.status(201).json('Dipendende rimosso con successo')
// } da modificare


// export const allEmployeds= async (req:Request,res:Response)=>{
//     const {nome,cognome}= employedZod.parse(req.body)
//     await insertEmployed(nome,cognome)
//     res.status(201).json('lista'dipendendi')
// } da modificare