import { Router } from "express";

import { PagamentoController } from "./Controller/PagamentoController";
import { NotificacaoController } from "./Controller/NotificacaoController";
import { UsuarioController } from "./Controller/UsuarioController";
const route = Router();




// modelo de pagamento
route.post('/pagamento', new PagamentoController().pagar);
route.post('/notificacao', new NotificacaoController().show);

//Logando Usuario
route.post('/session', new UsuarioController().session);

// USUARIO
route.post('/usuario', new UsuarioController().create);

export { 
    route
}