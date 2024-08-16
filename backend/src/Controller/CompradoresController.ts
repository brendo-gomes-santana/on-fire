import { Request, Response } from "express";
import { CompradoresService } from "../Service/CompradoresService";


class CompradoresController {
    async show(req: Request, res: Response){

        const init = new CompradoresService();
        const lista = await init.lista();

        return res.json(lista);

    }

    async ticketTrue(req: Request, res:Response){

        const id_comprador = req.params.id_comprador as string;

        const init = new CompradoresService();
        const lista = await init.ticket(id_comprador);

        return res.json(lista);

    }
}


export {

    CompradoresController

}