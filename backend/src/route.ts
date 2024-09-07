import { Router } from "express";

import Auth from "./middleware/auth";

import { PagamentoController } from "./Controller/PagamentoController";
import { NotificacaoController } from "./Controller/NotificacaoController";
import { UsuarioController } from "./Controller/UsuarioController";
import { CompradoresController } from "./Controller/CompradoresController";
import { GerarRelatorioController } from "./Controller/GerarRelatorioController";
const route = Router();


// modelo de pagamento
route.post('/pagamento', new PagamentoController().pagar);
route.post('/notificacao', new NotificacaoController().show);
route.get('/relatorio', new GerarRelatorioController().handle);
//Logando Usuario
route.post('/session', new UsuarioController().session);

route.use(Auth) //AS ROTAS ABAIXO SOMENTE QUEM TEM PERMISSÃO

// USUARIO
route.post('/usuario', new UsuarioController().create);
route.get('/compradores', new CompradoresController().show);
route.patch('/compradores/:id_comprador', new CompradoresController().ticketTrue);


export { 
    route
}