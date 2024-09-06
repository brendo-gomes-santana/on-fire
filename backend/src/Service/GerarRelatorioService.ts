import PdfPrinter from "pdfmake";
import prismaClient from "../config";


class GerarRelatorioService {
    async execute() {

        const lista = await prismaClient.compradores.findMany();

        return lista
    }
}

export {
    GerarRelatorioService
}