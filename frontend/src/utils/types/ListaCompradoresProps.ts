export interface ListaInformacoesType {
    id: string,
    nome: string,
    contato: string,

    pago: boolean,

    nome_do_lider: string | null,
    qual_igreja: string | null,

    descricao: string,
    recebeu_ticket: boolean,
}