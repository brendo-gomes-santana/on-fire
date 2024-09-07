
import prismaClient from "../config";


class GerarRelatorioService {
    async execute(lote?: string) {

        const lista = await prismaClient.compradores.findMany({
            orderBy: {
                nome: "asc"
            },
            where: {
                descricao: {
                    endsWith: lote
                }
            }
        });

        return lista
    }
}

export {
    GerarRelatorioService
}