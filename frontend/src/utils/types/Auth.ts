export interface LoginUserProps{
    email: string,
    senha: string
}

export interface ContextAuth{
    Logar: ( infor: LoginUserProps ) => void;
    logado: boolean
}


export interface FirebaseinforUser {
    email: string,
    uid: string
}