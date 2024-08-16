export interface LoginUserProps {
    email: string,
    senha: string
}

export interface ContextAuth {
    Logar: (infor: LoginUserProps) => void;
    deslogar: () => void;
    logado: boolean,
    user: InformacoesUser | null
}


export interface FirebaseinforUser {
    email: string,
    uid: string
}


export interface InformacoesUser {
    id: string,
    nome: string,
    email: string
}