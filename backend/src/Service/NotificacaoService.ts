import admin from "../config/firebase";
import nodemailer from 'nodemailer';

import dotenv from "dotenv";

dotenv.config();

import { TypeNotificaRetorno } from "../Utils/Types/PropsNotificacao";
import { TypeRetornoDBUSER } from "../Utils/Types/PropsNotificacao";

class NotificacaoService {

    async execute(body: TypeNotificaRetorno): Promise<Error | void> {
        
        const db = admin.firestore();

        if (body.action !== 'payment.created') {
            throw new Error("pagamento nao caiu")
        }

        if(!body.data.id || body.data.id === ''){
            throw new Error('Não tem informações necessaria')
        }

        try {
            await db
                .collection('compradores')
                .doc(body.data.id)
                .update({
                    pago: true
            });

            const userRef = db.collection('compradores').doc(body.data.id);
            const user = await userRef.get();

            const dados = user.data() as TypeRetornoDBUSER

            

            this.mandarEmail(dados);


        } catch (err) {
            console.log(err);
            throw new Error("banco nao atualizado")
        }
    }

    async mandarEmail(dados: TypeRetornoDBUSER): Promise<void | Error> {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHA,
            },
        });


        const CongifEmail = {
            from: process.env.EMAIL,
            to: dados.email,
            subject: `Ticket - ${dados.descricao}`,
            html: `
                <h2 style={{
                    textAlign: 'center'
                }}>Ticket para recebimento da pulseira</h2>
                <p>Olá, ${dados.nome}</p>
                <p>Esse é seu codigo para recebe: ${dados.controle}</p>
            `
        }
        try {
            await transporter.sendMail(CongifEmail);
        } catch (err) {
            console.log(err);
            throw new Error('Email não enviado!')
        }
    }

}

export {
    NotificacaoService
}