'use client'

import { QueryClient, QueryClientProvider } from "react-query";

import { createContext, ReactNode, useState, useEffect, use } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoginUserProps, InformacoesUser } from "@/utils/types/Auth";
import { ContextAuth } from "@/utils/types/Auth";
import { toast } from "react-toastify";
import api from "@/config";

const client = new QueryClient();
export const authContext = createContext({} as ContextAuth);

export default function AuthProvider({ children }: { children: ReactNode }) {

    const pathname = usePathname();
    const router = useRouter();

    const [logado, setLogado] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [user, setUser] = useState<InformacoesUser | null>(null);

    useEffect(() => {
        const UserLocalStorageString = localStorage.getItem("@user");

        if (UserLocalStorageString !== null) {

            setUser(JSON.parse(UserLocalStorageString));
            setLogado(true);
            setCarregando(false);

        } else {
            setLogado(false);
            if (pathname === '/painel' || pathname === '/painel/lista_compradores') {
                router.push('/login');
            }
            setCarregando(false);
        }
    }, [pathname, logado, router]);

    async function Logar(infor: LoginUserProps) {

        if (infor.email === "" || infor.senha === '') {
            alert('Preencha os campos');
            return;
        }

        try {
            const response = await api.post('/session', infor);

            localStorage.setItem("@user", JSON.stringify({
                email: response.data.email,
                id: response.data.id,
                nome: response.data.nome
            }));

            setLogado(true);
            router.push('/painel');
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.error)
            setLogado(false);
        }
    }


    function deslogar() {
        localStorage.removeItem('@user');
        setLogado(false);
        setUser(null);
        router.push('/');
    }
    
    if (carregando) {
        return (
            <div>
                Carregando...
            </div>
        )
    }

    return (
        <QueryClientProvider client={client}>
            <authContext.Provider
                value={{
                    Logar,
                    logado,
                    user,
                    deslogar
                }}
            >
                {children}
            </authContext.Provider>
        </QueryClientProvider>

    )
}
