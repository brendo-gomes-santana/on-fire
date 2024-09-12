
import prismaClient from "../config";


class GerarRelatorioService {
    async execute(lote: string) {
        //testando
        const lista = await prismaClient.compradores.findMany({
            where: {
                descricao: {
                    contains: lote
                }
            },
            orderBy: {
                nome: "asc"
            },
        });

        return lista
    }
}

export {
    GerarRelatorioService
}