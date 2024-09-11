import prismaClient from '../config';

interface Inscricaotype {
  codigo: string,
  id_produto: string,
  nome: string
}

class InscricaoWorkShopService {
  async inscricao({ codigo, id_produto, nome }: Inscricaotype) {
    if (codigo === '' || id_produto === '') {
      throw new Error('Informe o código de inscrição');
    }

    const [comprador, comprador_produtos, produto] = await Promise.all([
      await prismaClient.compradores.findFirst({
        where: {
          id: codigo
        }
      }),
      await prismaClient.compradores_Produtos.findMany({
        where: {
          id_comprador: codigo,
          id_produto
        }
      }),
      await prismaClient.produtos.findUnique({
        where: {
          id: id_produto,
          tipo: "workshop",
          quantidade: {
            gt: 0
          }
        }
      })
    ])

    if (!comprador) {
      throw new Error('Você não comprou sua pulseira.')
    }

    const numeroDaFrente = comprador.descricao.match(/^\d+/) as string[];

    if (comprador_produtos.length >= Number(numeroDaFrente[0])) {
      throw new Error('Todas as vagas com esse código foram preenchidos.')
    }

    if (!produto) {
      throw new Error('sem vagas ou produto não existe')
    }

    await Promise.all([
      await prismaClient.compradores_Produtos.create({
        data: {
          nome,
          id_comprador: codigo,
          id_produto
        }
      }),
      await prismaClient.produtos.update({
        where: {
          id: id_produto
        },
        data: {
          quantidade: produto.quantidade - 1 
        }
      })
    ])


    return {
      mensagem: "Esperamos você no dia."
    } 

  }

  async lista(id_produto: string){
    try{

      const lista = await prismaClient.compradores_Produtos.findMany({
        where: {
          id_produto
        },
        orderBy: {
          nome: 'asc'
        },
        include: {
          produtos: true
        }
      })

      return {
        nome_produto: lista[0].produtos.nome,
        lista: lista.map((item) => (item.nome))
      }

    }catch(err){
      console.log("Error ao lista quem se escreveu" + err);
      throw new Error('Error ao lista')
    }
  }
}

export {
  InscricaoWorkShopService
}