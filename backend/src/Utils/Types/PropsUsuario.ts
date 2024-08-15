export interface CreateUsuarioProps {
    name: string,
    email: string,
    senha: string,
}


export interface RetornoUsuarioCreate {
    nome: string,
    email: string,
    id: string
}


export interface SessionProps {
    email: string,
    senha: string
}