import { Request, Response } from "express";
import { ProdutosService } from '../Service/ProdutosService';

class ProdutosController{
  async cadastrar(req: Request, res: Response){

    const imagem = req.file?.filename
    const { nome, valor, descricao, qtd_disponivel, tipo } = req.body as any
    
    const init = new ProdutosService();
    const criado = await init.cadastrar({
      nome,
      qtd_disponivel,
      imagem,
      tipo,
      valor,
      descricao
    })
  
    return res.json(criado);
  }
  async lista (req: Request, res: Response){


    const tipo = req.query.tipo as string | undefined
    const init = new ProdutosService();
    
    const lista = await init.lista(tipo)

    return res.json(lista);
    
  }

}

export {
  ProdutosController
}