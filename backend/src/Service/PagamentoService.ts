import { Payment, MercadoPagoConfig } from 'mercadopago';
import { DateTime } from 'luxon'

import admin from '../config/firebase';

import dotenv from 'dotenv';
dotenv.config();

import { v4 as uuidv4 } from 'uuid';
import { TypePagamentoPix } from "../Utils/Types/PropsPagamentoPix";


const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: process.env.TOKEN as string })
const payment = new Payment(mercadoPagoConfig);
const db = admin.firestore();


class PagamentoService {
    async execute({
        contato,
        descricao,
        email,
        nome,
        valor,
        visao,
        igreja,
        nome_lider
    }: TypePagamentoPix): Promise<Error | any> {

        const id = uuidv4();

        const expirationDate = DateTime.now().plus({ minutes: 70 });
        const timeZone = 'America/Sao_Paulo';
        const formattedExpirationDate = expirationDate.setZone(timeZone).toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");

        try {
            const result = await payment.create({
                body: {
                    transaction_amount: valor,
                    description: descricao,
                    payment_method_id: 'pix',
                    notification_url: `${process.env.NOTIFICAO}/v1/notificacao`,
                    payer: {
                        email: email,
                        first_name: nome,
                        phone: {
                            number: contato
                        }
                    },
                    date_of_expiration: formattedExpirationDate
                },
                requestOptions: { idempotencyKey: id }
            });

            // Cria ou atualiza o documento no Firestore
            const docRef = db.collection('compradores').doc(String(result.id));


            await docRef.set({
                controle: String(result.id),
                nome,
                contato,
                descricao,
                email,
                valor,
                visao,
                recebeu_ticket: false,
                igreja: igreja === "" || !igreja ? null : igreja,
                nome_lider: nome_lider === "" || !nome_lider ? null : nome_lider,
                pago: false
            });

            return result

        } catch (err) {
            console.log('Pagamento - Criar pix | cadastrar usuario')
            console.error(err);
            throw new Error('Algo deu errado');
        }
    }
}

export {
    PagamentoService
};
