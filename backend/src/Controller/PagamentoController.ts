import { Request, Response } from 'express'
import { TypePagamentoPix } from '../Utils/Types/PropsPagamentoPix'
import { PagamentoService } from '../Service/PagamentoService'

class PagamentoController{
    async pagar(req: Request, res: Response){


        const {
            contato,
            descricao,
            email,
            nome,
            valor,
            visao,
            igreja,
            nome_lider
        } = req.body as TypePagamentoPix


        const inicializado = new PagamentoService();
        
        const resposta = await inicializado.execute({
            contato,
            descricao,
            email,
            nome,
            valor,
            visao,
            igreja,
            nome_lider
        })

        return res.json(resposta);
    }
}

export { 
    PagamentoController
}