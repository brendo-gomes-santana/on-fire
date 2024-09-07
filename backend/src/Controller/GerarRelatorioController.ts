import fs from 'fs';
import path from 'path';
import { Request, Response } from "express";
import { GerarRelatorioService } from "../Service/GerarRelatorioService";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";

import dotenv from 'dotenv';
dotenv.config();

class GerarRelatorioController {
    async handle(req: Request, res: Response) {


        const lote = req.query.lote as string
        const init = new GerarRelatorioService();

        const compradores = await init.execute(lote);

        const print = new PdfPrinter({
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            },
        });

        const body = [];

        for await (let comprador of compradores) {
            const rows = new Array();
            rows.push(comprador.nome);
            rows.push(`${comprador.email}\n${comprador.contato}`);
            rows.push(comprador.descricao);
            rows.push(`R$ ${comprador.valor}`);
            rows.push(!comprador.nome_lider ? "-" : comprador.nome_lider);
            rows.push(!comprador.igreja ? "-" : comprador.igreja);

            body.push(rows);
        }

        const logoPath = path.resolve(__dirname, '..', '..', 'assets', 'logo.png');
        const logoBase64 = fs.readFileSync(logoPath, 'base64'); 
        
        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica" },
            content: [
                {
                    image: `data:image/png;base64, ${logoBase64}`, // Usando base64 para a imagem
                    width: 50,
                    height: 50,
                    alignment: "center",
                    marginBottom: 20
                },
                {
                    columns: [
                        { text: "Relatório de vendas", style: "header" },
                        { text: `${new Date()}`, style: "horario" }
                    ]
                },
                {
                    text: lote  ? `Relatório baseado no ${lote} de vendas de pulseiras.` : '' , style: "descricao" 
                },
                {
                    table: {
                        body: [
                            [
                                { text: "Nome", style: "columsTitle" },
                                { text: "Contatos", style: "columsTitle" },
                                { text: "Descrição", style: "columsTitle" },
                                { text: "Valor", style: "columsTitle" },
                                { text: "Líder", style: "columsTitle" },
                                { text: "Igreja", style: "columsTitle" },
                            ],
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 20,
                    marginBottom: 20,
                },
                horario: {
                    fontSize: 7,
                    alignment: "right"
                },
                columsTitle: {
                    bold: true,
                    fillColor: "#121212",
                    color: "#fff",
                    alignment: "center",
                },
                descricao: {
                    marginBottom: 10
                }
            }
        };

        const pdfDoc = print.createPdfKitDocument(docDefinitions);

        const chunks: any[] = [];

        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });

        pdfDoc.end();

        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks);
            return res.end(result);
        });
    }
}

export { GerarRelatorioController };
