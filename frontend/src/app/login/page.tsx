'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';
import { usePathname, useRouter  } from "next/navigation";

import { authContext } from '@/contexts/auth';
import styled from './styled.module.scss';
import logo from '../../../public/LOGO-ON-FIRE-PNG.png';
import Image from 'next/image';

import { LoginUserProps } from '@/utils/types/Auth';

export default function login(){

    const { register, handleSubmit, reset } = useForm<LoginUserProps>();
    const pathname = usePathname();
    const router = useRouter();

    const { Logar,  logado} = useContext(authContext);

    const onSubmit: SubmitHandler<LoginUserProps> = (data) => {
        Logar(data);      
        reset();
    }

    
    if(pathname === '/login'){
        if(logado){
            return router.push('/painel')
        }
    }

    return(
        <section className={styled.container}>
            <Image src={logo} alt='logo'/>
            <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text" 
                    placeholder='Email'
                    {...register('email')}
                    />
                <input 
                    type="password" 
                    placeholder='Senha'
                    {...register('senha')}
                    />
                <button type='submit'>Logar</button>
            </form>
        </section>
    )
}