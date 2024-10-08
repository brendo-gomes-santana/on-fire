import { Request, Response } from "express";
import { TypeNotificaRetorno } from "../Utils/Types/PropsNotificacao";

import { NotificacaoService } from "../Service/NotificacaoService";

class NotificacaoController{
    async show(req: Request, res: Response){

        const body = req.body as TypeNotificaRetorno | any;
        
        const inic = new NotificacaoService();
        const retorno = await inic.execute(body);
        
        return res.json(retorno);
    }
}

export {
    NotificacaoController
}