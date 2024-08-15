import admin from "../config/firebase";
import nodemailer from 'nodemailer';
import { Payment, MercadoPagoConfig } from 'mercadopago';

import dotenv from "dotenv";

dotenv.config();

import { TypeNotificaRetorno } from "../Utils/Types/PropsNotificacao";
import { TypeRetornoDBUSER } from "../Utils/Types/PropsNotificacao";


const db = admin.firestore();
const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: process.env.TOKEN as string })
const payment = new Payment(mercadoPagoConfig);


class NotificacaoService {

    async execute(body: TypeNotificaRetorno): Promise<Error | void> {



        console.log('-------------------------------------------')

        if (body.action === 'payment.created') {
            console.log('travou no created');
            return
        }



        if (!body.data.id || body.data.id === '') {
            return
        }


        const result = await payment.get({
            id: body.data.id
        })


        if (result.status === 'approved') {

            try {

                await db
                    .collection('compradores')
                    .doc(body.data.id)
                    .update({
                        pago: true
                    });

                const userRef = db.collection('compradores').doc(body.data.id);

                const userDoc = await userRef.get();

                if (!userDoc.exists) {
                    throw new Error('Documento não encontrado');
                }

                var dados = userDoc.data() as TypeRetornoDBUSER;

                this.mandarEmail(dados);


            } catch (err) {
                console.log('Notificação - ver se usuario existe e mandar email')
                console.log(err);
                throw new Error("banco nao atualizado")
            }
        } else {
            try {

                const userRef = db.collection('compradores').doc(body.data.id)

                const buscado = await userRef.get();
                console.log('-------------------------------------------')
                console.log('passou userRef');

                if (!buscado.exists) {
                    throw new Error('Documento não encontrado');
                }

                const dados = buscado.data() as TypeRetornoDBUSER;
                console.log('-------------------------------------------')
                console.log('pegou os dados')

                this.mandarEmail(dados);

                await db
                    .collection('compradores')
                    .doc(body.data.id)
                    .delete();

                console.log('-------------------------------------------')
                console.log('deletou os dados')

            } catch (err) {
                console.log('notificacao - Deletar usuario e mandar um email')
                console.log(err);
                throw new Error('Algo deu errado')
            }
        }
    }

    async mandarEmail(dados: TypeRetornoDBUSER): Promise<any | Error> {
        if (dados === undefined || !dados) {
            return
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHA,
            },
        });

        const mensagemPagamentoFeito = `
                <h2 style={{
                    textAlign: 'center'
                }}>Ticket para recebimento da pulseira</h2>
                <p>Olá, ${dados.nome}</p>
                <p>Seguem as informações de codigo para recebe seu produto: ${dados.controle}</p>
            `

        const mensagemPagamentoExpirou = `
            <h2 style={{
                    textAlign: 'center'
                }}>Pix expirado</h2>
            <p>Olá, ${dados.nome}</p>
            <p>Gostaríamos de informar que o seu Pix gerado infelizmente expirou. No entanto, gostaríamos de incentivá-lo(a) a continuar comprando em nosso site.</p>
            <a href='${process.env.SITE}'>Link do nosso site</a>
        `
        try {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: dados.email,
                subject: dados.pago ? `Ticket - ${dados.descricao}` : `Seu pix expirou - ${dados.descricao}`,
                html: dados.pago ? mensagemPagamentoFeito : mensagemPagamentoExpirou
            });
        } catch (err) {
            console.log(err);
            console.log('Email não enviado')
            throw new Error('Email não enviado!')
        }
    }

}

export {
    NotificacaoService
}