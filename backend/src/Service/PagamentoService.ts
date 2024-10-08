import { Payment, MercadoPagoConfig } from 'mercadopago';
import { DateTime } from 'luxon'
import prismaClient from '../config';

import dotenv from 'dotenv';
dotenv.config();

import { v4 as uuidv4 } from 'uuid';
import { TypePagamentoPix } from "../Utils/Types/PropsPagamentoPix";


const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: process.env.TOKEN as string })
const payment = new Payment(mercadoPagoConfig);

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


            
            await prismaClient.compradores.create({
                data: {
                    id: String(result.id),
                    nome,
                    contato,
                    descricao,
                    email,
                    valor,
                    visao,

                    igreja: igreja === "" || !igreja ? null : igreja,
                    nome_lider: nome_lider === "" || !nome_lider ? null : nome_lider,

                }
            })


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
