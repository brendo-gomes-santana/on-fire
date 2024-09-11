import prismaClient from '../config';
import { ProdutoCadastrarType } from '../Utils/Types/PropsProdutos';

class ProdutosService {
  async cadastrar({
    nome,
    qtd_disponivel,
    imagem,
    tipo,
    valor,
    descricao
  }: ProdutoCadastrarType) {


    try {
      const criado = await prismaClient.produtos.create({
        data: {
          nome,
          quantidade: Number(qtd_disponivel),
          img: imagem,
          tipo,
          valor: Number(valor),
          descricao
        }
      })

      return criado

    } catch (err) {
      console.log(err)
      throw new Error('Error ao cadastrar produto')
    }
  }
  async lista(tipo?: string){


    try{

      const lista = await prismaClient.produtos.findMany({
        where: {
          tipo
        }
      })

      return lista

    }catch(err){
      console.log('Error ao listar produtos' + err);
      throw new Error('Error ao listar produtos')
    }

  }
}

export {
  ProdutosService
}