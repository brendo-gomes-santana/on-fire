import { Request, Response, NextFunction } from "express";
import prismaClient from "../config";

export default async function Auth(req: Request, res: Response, next: NextFunction){
    
    const id_usuario = req.query.id_usuario as string

    if(!id_usuario){
        return res.status(401).json({
            error: 'Usuário não logado'
        })
    }

    const usuario = await prismaClient.usuario.findUnique({
        where: {
            id: id_usuario
        }
    })

    if(!usuario){
        return res.status(401).json({
            error: 'Usuário inválido'
        })
    }

    return next()

}