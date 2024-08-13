'use client'

import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { LoginUserProps, ContextAuth } from "@/utils/types/Auth";
import { auth } from "@/firebase";

export const authContext = createContext({} as ContextAuth);

export default function AuthProvider({ children }: {children: ReactNode}) {

    const pathname = usePathname();
    const router = useRouter();

    const [logado, setLogado] = useState(false);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const UserLocalStorageString = localStorage.getItem("@user");

        if (UserLocalStorageString !== null) {
           
            setLogado(true);
            setCarregando(false);

        } else {
            setLogado(false);
            if(pathname === '/painel' || pathname === '/painel/lista_compradores') {
                router.push('/login');
            }
            setCarregando(false);
        }
    }, [pathname, logado, router]); 

    async function Logar(infor: LoginUserProps){

        if(infor.email === "" || infor.senha === ''){
            alert('Preencha os campos');
            return;
        }

        try {
            const value = await signInWithEmailAndPassword(auth, infor.email, infor.senha);
            
            localStorage.setItem("@user", JSON.stringify({
                email: value.user.email,
                uid: value.user.uid
            }));
            setLogado(true);
            router.push('/painel');
        } catch (err) {
            console.log(err);
            setLogado(false);
        }
    }


    function deslogar(){
        signOut(auth)
        localStorage.removeItem('@user');
        setLogado(false);
        router.push('/');
    }


    if(carregando){
        return(
            <div>
                Carregando...
            </div>
        )
    }

    return (
        <authContext.Provider
            value={{
                Logar,
                logado,
                deslogar
            }}
        >
            {children}
        </authContext.Provider>
    )
}
