import { Request, Response } from "express";


class NotificacaoController{
    async show(req: Request, res: Response){
        
            console.log(req.body);
    }
}

export {
    NotificacaoController
}