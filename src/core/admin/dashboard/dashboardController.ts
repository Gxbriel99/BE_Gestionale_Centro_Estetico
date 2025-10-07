import { Request, Response } from 'express';
import { employedZod, IEmployed } from '../../schema/employedSchema';
import { editEmployed, insertEmployed, removeEmployed } from './dashboardService';
import { UnprocessableEntity } from '../../errors/errorException';
import { ErrorCode } from '../../errors/errorEnum';

export const addEmployed = async (req: Request, res: Response) => {
    const data= employedZod.parse(req.body) 
    if(!data) throw new UnprocessableEntity('Dati non validi', ErrorCode.INVALID_REQUEST)
    await insertEmployed(data)
    res.status(201).json('Dipendende aggiunto con successo')
    
}


export const updateEmployed= async (req:Request,res:Response)=>{
    const data= employedZod.parse(req.body) as IEmployed
    if (!data || !data.id) throw new UnprocessableEntity('Dati non validi', ErrorCode.INVALID_REQUEST)
    await editEmployed(data)
    res.status(201).json('Dipendende modificato con successo')
} 


export const deleteEmployed = async (req: Request, res: Response) => {
    const {id} = employedZod.parse(req.body) as IEmployed
    if (!id) throw new UnprocessableEntity('Dati non validi', ErrorCode.INVALID_REQUEST)
    await removeEmployed(id)
    res.status(201).json('Dipendende eliminato con successo')
}


// export const allEmployeds= async (req:Request,res:Response)=>{
//     const {nome,cognome}= employedZod.parse(req.body)
//     await insertEmployed(nome,cognome)
//     res.status(201).json('lista'dipendendi')
// } da modificare