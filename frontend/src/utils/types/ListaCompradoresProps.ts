export interface ListaInformacoesType {
    id: string,
    nome: string,
    contato: string,

    pago: boolean,

    nome_lider: string | null,
    igreja: string | null,

    descricao: string,
    recebeu_ticket: boolean,
}