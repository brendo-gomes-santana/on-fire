'use client'

import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

import { LoginUserProps, ContextAuth } from "@/utils/types/Auth";
import { auth } from "@/firebase";

export const authContext = createContext({} as ContextAuth);

export default function AuthProvider({ children }: {children: ReactNode}) {

    const pathname = usePathname();
    const router = useRouter();

    const [logado, setLogado] = useState(false);

    useEffect(() => {
        const UserLocalStorageString = localStorage.getItem("@user");

        if (UserLocalStorageString !== null) {
            setLogado(true);
        } else {
            setLogado(false);
        }
    }, [pathname]); 
    
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

    useEffect(() => {
        if(pathname === '/painel' && !logado) {
            router.push('/loja');
        }
    }, [pathname, logado, router]);

    return (
        <authContext.Provider
            value={{
                Logar,
                logado
            }}
        >
            {children}
        </authContext.Provider>
    )
}
