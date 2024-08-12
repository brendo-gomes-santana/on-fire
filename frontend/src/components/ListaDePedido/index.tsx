'use client'

import { useContext } from "react";
import { CarrinhoContext } from "@/contexts/carrinho";
import Link from "next/link";
import styled from './styled.module.scss';

import  formatReal from '@/utils/funcoes/FormatReal'

export default function ListaDeprodutos(){

    const { carrinho } = useContext(CarrinhoContext);

    return(
        <div className={styled.container}>
            {
                carrinho?.map((item) => {
                    return(
                        <div className={styled.item} key={item.id}>
                            <Link href={item.link as string}>{item.name}</Link>
                            <div className={styled.containerControle}>
                                <p>quantidade: {item.amount}</p>
                                <p>R$ {formatReal(item.value * item.amount)}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}