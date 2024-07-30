'use client'

import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter  } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

import { LoginUserProps, ContextAuth } from "@/utils/types/Auth";
import { auth } from "@/firebase";

export const authContext = createContext({} as ContextAuth)


export default function AuthProvider({children}:{children:ReactNode}){

    const pathname = usePathname();
    const router = useRouter();

    const [logado, setLogado] = useState(true);

    async function Logar(infor: LoginUserProps){

        if(infor.email === "" || infor.senha === ''){
            alert('Preenchar os campos')
            return;
        }


        await signInWithEmailAndPassword(auth, infor.email, infor.senha)
        .then((value) => {
            console.log(value.user)
            
        })


    }
    
    if(pathname === '/painel'){
        if(!logado){
            return router.push('/loja')
        }
    }

    return(
        <authContext.Provider
            value={{
                Logar
            }}
        >
            {children}
        </authContext.Provider>
    )
}