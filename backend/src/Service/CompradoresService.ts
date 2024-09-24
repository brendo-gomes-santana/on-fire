import prismaClient from "../config";

import { TypeRetornoDBUSER } from "../Utils/Types/PropsNotificacao";

class CompradoresService{


    async lista(): Promise <Error |TypeRetornoDBUSER[]> {

        try{

            const lista = await prismaClient.compradores.findMany({
                orderBy: {
                    nome: 'asc'
                }
            });
            return lista as TypeRetornoDBUSER[]

        }catch(err){
            console.log(err);
            throw new Error('Algo deu errado ao lista compradores')
        }

    }


    async ticket(id_comprador: string){
        if(!id_comprador){
            throw new Error("id do comprador não informado")
        }


        try{

            const atualizacao = await prismaClient.compradores.update({
                where: {
                    id: id_comprador
                },
                data: {
                    recebeu_ticket: true
                }
            })

            return atualizacao

        }catch(err){
            console.log(err);
            throw new Error('Usuario não achado')
        }

    }

}

export {

    CompradoresService

}