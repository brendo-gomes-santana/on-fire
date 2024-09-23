import { Router } from "express";
import multer from 'multer';

import Auth from "./middleware/auth";
import storage from './middleware/multer';

import { PagamentoController } from "./Controller/PagamentoController";
import { NotificacaoController } from "./Controller/NotificacaoController";
import { UsuarioController } from "./Controller/UsuarioController";
import { CompradoresController } from "./Controller/CompradoresController";
import { GerarRelatorioController } from "./Controller/GerarRelatorioController";
import { ProdutosController } from './Controller/ProdutosController';
import { InscricaoWorkShopController } from "./Controller/WorkShopController";

const route = Router();

const upload = multer({ storage: storage });

// modelo de pagamento
route.post('/pagamento', new PagamentoController().pagar);
route.post('/notificacao', new NotificacaoController().show);

//SEM NECESSIDADE DE ESTÁ COM AUTH
route.get('/relatorio', new GerarRelatorioController().handle);
route.get('/lista/produtos', new ProdutosController().lista);
route.post('/inscricao/workshop', new InscricaoWorkShopController().inscricao);
route.get('/detalhe/produto', new InscricaoWorkShopController().detalhe);
route.get('/inscritos/workshop', new InscricaoWorkShopController().listaDeInscrito);

//Logando Usuario
route.post('/session', new UsuarioController().session);

route.use(Auth) //AS ROTAS ABAIXO SOMENTE QUEM TEM PERMISSÃO

// USUARIO
route.post('/usuario', new UsuarioController().create);
route.get('/compradores', new CompradoresController().show);
route.patch('/compradores/:id_comprador', new CompradoresController().ticketTrue);

//PRODUTOS
route.post('/cadastrar/produto', upload.single('file') ,new ProdutosController().cadastrar);
route.get('/lista/workshop', new InscricaoWorkShopController().lista);

export { 
    route
}