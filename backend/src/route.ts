import { Router } from "express";

import { PagamentoController } from "./Controller/PagamentoController";
import { NotificacaoController } from "./Controller/NotificacaoController";
const route = Router();

route.post('/pagamento', new PagamentoController().pagar);
route.post('/notificacao', new NotificacaoController().show);

export { 
    route
}