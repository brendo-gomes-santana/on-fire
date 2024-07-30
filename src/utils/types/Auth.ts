export interface LoginUserProps{
    email: string,
    senha: string
}

export interface ContextAuth{
    Logar: ( infor: LoginUserProps ) => void;
}