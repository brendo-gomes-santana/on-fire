import admin from "../config/firebase";

import { TypeNotificaRetorno } from "../Utils/Types/PropsNotificacao";

class NotificacaoService{
    
    async execute(body:TypeNotificaRetorno):Promise<void>{
        
        const db = admin.firestore();

        if(body.action !== 'payment.created'){
            throw new Error("pagamento nao caiu")
        }

        try{
            await db
            .collection('compradores')
            .doc(body.data.id)
            .update({
                pago: true
            });
        }catch(err){
            console.log(err);
            throw new Error("banco nao atualizado")
        }
    }
    
}

export {
    NotificacaoService
}