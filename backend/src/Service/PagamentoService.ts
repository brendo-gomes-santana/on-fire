import { Payment, MercadoPagoConfig } from 'mercadopago';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { TypePagamentoPix } from "../Utils/Types/PropsPagamentoPix";
dotenv.config();

// Configuração do Mercado Pago
const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: process.env.TOKEN as string })
const payment = new Payment(mercadoPagoConfig);

admin.initializeApp({
    credential: admin.credential.cert('src/Service/secury.json')
});
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
    }: TypePagamentoPix) {

        const id = uuidv4();

        try {
            const result = await payment.create({
                body: {
                    transaction_amount: valor,
                    description: descricao,
                    payment_method_id: 'pix',
                    payer: {
                        email: email,
                        first_name: nome,
                        phone: {
                            number: contato
                        }
                    }
                },
                requestOptions: { idempotencyKey: id }
            });
            console.log('passou aqui')
            // Cria ou atualiza o documento no Firestore
            const docRef = db.collection('compradores').doc(id);
            await docRef.set({
                nome,
                contato,
                descricao,
                valor,
                visao,
                igreja: igreja === "" || !igreja ? null : igreja,
                nome_lider: nome_lider === "" || !nome_lider ? null : nome_lider,
                pago: false
            });

            return result;

        } catch (err) {
            console.error(err);
            throw new Error('Algo deu errado');
        }
    }
}

export {
    PagamentoService
};
