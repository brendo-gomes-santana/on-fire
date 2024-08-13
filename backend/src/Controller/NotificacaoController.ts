import { Request, Response } from "express";
import { TypeNotificaRetorno } from "../Utils/Types/PropsNotificacao";

import { NotificacaoService } from "../Service/NotificacaoService";

class NotificacaoController{
    async show(req: Request, res: Response){

        const body = req.body as TypeNotificaRetorno;
        
        const inic = new NotificacaoService();
        await inic.execute(body);
        
        return res.send();
    }
}

export {
    NotificacaoController
}