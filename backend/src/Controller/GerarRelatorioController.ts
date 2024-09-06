import { Request, Response } from "express";
import { GerarRelatorioService } from "../Service/GerarRelatorioService";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";

class GerarRelatorioController{
    async handle(req: Request, res: Response){


        const init = new GerarRelatorioService();
        const compradores = await init.execute();


        const print = new PdfPrinter({
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            },
        })
        
        const body = []

        for await (let comprador of compradores){

            const rows = new Array()
            rows.push(comprador.nome);
            rows.push(`${comprador.email}\n${comprador.contato}`);
            rows.push(comprador.descricao);
            rows.push(`R$ ${comprador.valor}`);
            rows.push(comprador.nome_lider);
            rows.push(comprador.igreja);

            body.push(rows)
        }

        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica" },
            content: [
              {
                table: {
                    body: [ 
                        ["Nome", "Contatos", "Descrição", "Valor", "Líder", "Igreja"],
                        ...body
                 ]
                }
              }
            ]
        }

        const pdfDoc = print.createPdfKitDocument(docDefinitions);

        const chunks: any[] = [];

        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        })

        pdfDoc.end();

        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks)
            return res.end(result)
        })
    }
}

export {
    GerarRelatorioController
}