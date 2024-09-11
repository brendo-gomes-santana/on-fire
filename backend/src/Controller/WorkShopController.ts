import { Request, Response } from "express";
import {InscricaoWorkShopService} from '../Service/WorkShopService';

class InscricaoWorkShopController {
  async inscricao(req: Request, res: Response) {
    const {
      codigo,
      id_produto,
      nome
    } = req.body as any


    const init = new InscricaoWorkShopService();
    const inscrito = await init.inscricao({
      codigo,
      id_produto,
      nome
    })
    return res.json(inscrito)
  }
  async lista(req: Request, res: Response){

    const id_produto = req.query.id_produto as string 

    const init = new InscricaoWorkShopService();
    const inscritos = await init.lista(id_produto)

    return res.json(inscritos);
  }
  async detalhe(req: Request, res: Response){

    const id_produto = req.query.id_produto as string

    const init = new InscricaoWorkShopService();
    const inscritos = await init.detalheProduto(id_produto)

    return res.json(inscritos)
  }
}

export {
  InscricaoWorkShopController
}