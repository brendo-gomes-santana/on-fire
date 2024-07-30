'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';

import { authContext } from '@/contexts/auth';
import styled from './styled.module.scss';
import logo from '../../../public/LOGO-ON-FIRE-PNG.png';
import Image from 'next/image';

import { LoginUserProps } from '@/utils/types/Auth';

export default function login(){

    const { register, handleSubmit } = useForm<LoginUserProps>();

    const { Logar } = useContext(authContext);

    const onSubmit: SubmitHandler<LoginUserProps> = (data) => {
        Logar(data);
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