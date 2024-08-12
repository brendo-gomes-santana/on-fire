'use client'

import { redirect } from 'next/navigation';

import styled from './styled.module.scss';
import ListaDeprodutos from '@/components/ListaDePedido';

import { useContext } from "react";
import { CarrinhoContext } from "@/contexts/carrinho";
import { Carrinho } from '@/utils/types/carrinhoProps';
import formatReal from '@/utils/funcoes/FormatReal';

export default function Fechar_comprar() {

    const { carrinho } = useContext(CarrinhoContext)

    if(carrinho === null){
        redirect('/loja')
    }

    return (
        <section className={styled.container}>
            <h1>FINALIZANDO A COMPRAR</h1>
            <form className={styled.form}>
                <label className={styled.Input}>
                    Nome
                    <span>*</span>
                    <input type="text"
                        placeholder="Digite o nome completo"
                    />
                </label>
                <label className={styled.Input}>
                    Numero para contato
                    <span>*</span>
                    <input type="text"
                        placeholder="Somente os números"
                    />
                </label>
            </form>
            <hr />
            <h2
                style={{
                    color: '#f25c05',
                    marginTop: '1em'
                }}
            >Produtos</h2>
            <article className={styled.ContainerProdutos}>
                <ListaDeprodutos />
                <form className={styled.ContainerValores}>
                    <div className={styled.dados}>
                        <label>Valor dos produtos</label>
                        <label>R$
                            {formatReal(carrinho?.reduce((total: number, carrinho: Carrinho) => (carrinho.value * carrinho.amount) + total, 0))}
                        </label>
                    </div>
                    <div className={styled.dados}>
                        <label>Frete</label>
                        <label>R$
                           00,00
                        </label>

                    </div>

                    <hr />

                    <div className={styled.dados}>
                        <label>Total</label>
                        <label>R$
                            {formatReal(carrinho?.reduce((total: number, carrinho: Carrinho) => (carrinho.value * carrinho.amount) + total, 0))}
                        </label>
                    </div>

                    <button>Comprar</button>
                </form>
            </article>
        </section>
    )
}