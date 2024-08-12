import { Payment, MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';

import { TypePagamentoPix } from "../Utils/Types/PropsPagamentoPix";
dotenv.config();


const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN as string });
const payment = new Payment(client);

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
    }: TypePagamentoPix) {


       try{

        const result = await payment.create({
            body: {
                transaction_amount: valor,
                description: descricao,
                payment_method_id: 'pix',
                notification_url: "",
                payer: {
                    email: email,
                    first_name: nome,
                    phone: {
                        number: contato
                    }
                }
            },
            requestOptions: { idempotencyKey: Math.floor(Date.now() * Math.random()).toString(36) }
        })

        return result

       }catch(err){
        console.log(err);
        throw new Error('Algo deu errado')
       }

       
    }
}

export {
    PagamentoService
}