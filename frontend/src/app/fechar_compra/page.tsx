'use client'

import { redirect } from 'next/navigation';
import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';

import styled from './styled.module.scss';
import ListaDeprodutos from '@/components/ListaDePedido';

import { CarrinhoContext } from "@/contexts/carrinho";
import { Carrinho } from '@/utils/types/carrinhoProps';
import formatReal from '@/utils/funcoes/FormatReal';

export default function Fechar_comprar() {

    const { carrinho } = useContext(CarrinhoContext)
    const [partedaVisao, setParteDaVisao] = useState('sim')

    const { register, handleSubmit } = useForm();

    if (carrinho === null) {
        redirect('/loja')
    }



    function handleCadastre(data: any) {

    }
    return (
        <section className={styled.container}>
            <h1>FINALIZANDO A COMPRAR</h1>
            <form className={styled.form} onSubmit={handleSubmit(handleCadastre)}>
                <label className={styled.Input}>
                    Nome
                    <span>*</span>
                    <input type="text"
                        placeholder="Digite o nome completo"
                    />
                </label>
                <label className={styled.Input}>
                    Número para contato
                    <span>*</span>
                    <input type="text"
                        placeholder="Somente os números"
                    />
                </label>
                <label className={styled.Input}>
                    Você é discipulo da visão celular M12?
                    <select value={partedaVisao} onChange={value => setParteDaVisao(value.target.value)}>
                        <option value="sim">sim</option>
                        <option value="não">não</option>
                    </select>
                </label>
                {partedaVisao === 'sim' && (
                    <>
                        <label className={styled.Input}>
                            Nome do líder
                            <span>*</span>
                            <input type="text"
                                placeholder="Somente os números"
                            />
                        </label>
                        <label className={styled.Input}>
                            Nome do líder
                            <span>*</span>
                            <select>
                                <option>Selecione</option>
                                <option>Sede</option>
                                <option>Setorial</option>
                                <option>Outros</option>
                            </select>
                        </label>
                    </>
                )}

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