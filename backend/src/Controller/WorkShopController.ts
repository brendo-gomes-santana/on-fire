import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";

import { InscricaoWorkShopService } from '../Service/WorkShopService';


class InscricaoWorkShopController {
  async inscricao(req: Request, res: Response) {
    const {
      codigo,
      id_produto,
      nome
    } = req.body as any


    const init = new InscricaoWorkShopService();
    const inscrito = await init.inscricao({
      codigo,
      id_produto,
      nome
    })
    return res.json(inscrito)
  }
  async lista(req: Request, res: Response) {

    const id_produto = req.query.id_produto as string

    const init = new InscricaoWorkShopService();
    const inscritos = await init.lista(id_produto)

    return res.json(inscritos);
  }
  async detalhe(req: Request, res: Response) {

    const id_produto = req.query.id_produto as string

    const init = new InscricaoWorkShopService();
    const inscritos = await init.detalheProduto(id_produto)

    return res.json(inscritos)
  }

  async listaDeInscrito(req: Request, res: Response) {

    const id_produto = req.query.id_produto as string

    const init = new InscricaoWorkShopService();
    const lista = await init.listaDeInscritos(id_produto)

    const print = new PdfPrinter({
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      },
    });

    const body = [];
    const logoPath = path.resolve(__dirname, '..', '..', 'assets', 'logo.png');
    const logoBase64 = fs.readFileSync(logoPath, 'base64');

    for await (let item of lista.data) {
      const rows = new Array();
      rows.push({text: item.nome, margin: [0, 5, 0, 5]});
      rows.push(' ')
      body.push(rows);
    }

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
          text: 'Lista de frenquência', style: "header"
        },
        {
          text: lista.nome as string, style: "header"
        },
        {
          table: {
            body: [
              [
                { text: 'Nome', style: "columsTitle",  margin: [0, 10, 0, 10] },
                { text: 'Assinatura', style: "columsTitle", margin: [120, 10, 120, 10] }
              ],
              ...body
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          marginBottom: 10,
          alignment: 'center'
        },
        columsTitle: {
          bold: true,
          fillColor: "#121212",
          color: "#fff",
          alignment: "center",
          
      },
      }
    }

    const pdfDoc = print.createPdfKitDocument(docDefinitions);

    const chunks: any[] = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      return res.end(result);
    })
  }
}

export {
  InscricaoWorkShopController
}