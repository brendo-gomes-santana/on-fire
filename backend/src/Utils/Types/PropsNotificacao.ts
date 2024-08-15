import { TypePagamentoPix } from "./PropsPagamentoPix";

export interface TypeNotificaRetorno {
    action: string;
    api_version: string;
    data: {
        id: string; 
    };
    date_created: string; 
    id: number; 
    live_mode: boolean;
    type: string;
    user_id: string;
}

export interface TypeNotificaRetornoMinuto {
    resource: string, 
    topic: string
}


export interface TypeRetornoDBUSER extends TypePagamentoPix {
    pago: boolean,
    id: string
}