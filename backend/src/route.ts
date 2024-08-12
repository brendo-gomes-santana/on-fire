import { Router } from "express";

import { PagamentoController } from "./Controller/PagamentoController";

const route = Router();

route.post('/pagamento', new PagamentoController().pagar);

export { 
    route
}