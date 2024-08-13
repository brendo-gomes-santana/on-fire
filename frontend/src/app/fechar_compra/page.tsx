'use client'

import { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

import styled from './styled.module.scss';
import ListaDeprodutos from '@/components/ListaDePedido';

import { CarrinhoContext } from "@/contexts/carrinho";
import { Carrinho } from '@/utils/types/carrinhoProps';
import formatReal from '@/utils/funcoes/FormatReal';
import formatEnvio from "@/utils/funcoes/FormatEnvio";

export default function Fechar_comprar() {

    const router = useRouter();

    const [carregando, setCarregando] = useState(true);
    const [request, setRequest] = useState(false);

    const { carrinho } = useContext(CarrinhoContext)
    const [partedaVisao, setParteDaVisao] = useState('não')

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        (() => {
            if (carrinho?.length === 0) {
                router.push('/loja');

            }
            setCarregando(false);
        })()
    }, [])

    async function onSumit(data: any) {

        setRequest(true);

        const ComVirgula = formatReal(carrinho?.reduce((total: number, carrinho: Carrinho) => (carrinho.value * carrinho.amount) + total, 0))
        const body = {
            ...data,
            valor: formatEnvio(ComVirgula),
            descricao: `${carrinho?.map((item) => (
                `${item.amount}x - ${item.name}\n`
            ))[0]}`,
            visao: partedaVisao
        }


        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ROUTER_API}/v1/pagamento`, body);

            //FUTURAMENTE - COLOCO qr_code_base64\

            localStorage.removeItem('@carrinho-onfire')
            window.location.href = response.data.point_of_interaction.transaction_data.ticket_url;

        } catch (err) {
            console.error(err);
        } finally {
            setRequest(false);
        }

    }
    if (carregando) {
        return (
            <div>
                Carregando...
            </div>
        )
    }
    return (
        <section className={styled.container}>
            <h1>FINALIZANDO A COMPRA</h1>
            <form onSubmit={handleSubmit(onSumit)}>
                <div className={styled.form} >
                    <label className={styled.Input}>
                        Nome
                        <span>*</span>
                        <input type="text"
                            placeholder="Digite o nome completo"
                            disabled={request}
                            {...register('nome', {
                                required: true
                            })}
                        />
                    </label>
                    <label className={styled.Input}>
                        Email
                        <span>*</span>
                        <input type="email"
                            placeholder="Digite seu email"
                            disabled={request}
                            {...register('email', {
                                required: true
                            })}
                        />
                    </label>
                    <label className={styled.Input}>
                        Número para contato
                        <span>*</span>
                        <input type="text"
                            disabled={request}
                            placeholder="Somente os números"
                            {...register('contato')}
                        />
                    </label>
                    <label className={styled.Input}>
                        Você é discipulo da visão celular M12?
                        <span>*</span>
                        <select
                            disabled={request}
                            value={partedaVisao}
                            onChange={value => setParteDaVisao(value.target.value)}>
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
                                    disabled={request}
                                    {...register('nome_lider')}
                                />
                            </label>
                            <label className={styled.Input}>
                                Qual sua igreja?
                                <span>*</span>
                                <select
                                    disabled={request}
                                    {...register('igreja')}>
                                    <option value="">Selecione</option>
                                    <option value="Sede">Sede</option>
                                    <option value="Setorial">Setorial</option>
                                    <option value="Cobertura">Cobertura</option>
                                </select>
                            </label>
                        </>
                    )}
                </div>


                <hr />
                <h2
                    style={{
                        color: '#f25c05',
                        marginTop: '1em'
                    }}
                >Produtos</h2>
                <article className={styled.ContainerProdutos}>
                    <ListaDeprodutos />
                    <div className={styled.ContainerValores}>
                        <div className={styled.dados}>
                            <label>Valor dos produtos</label>
                            <label>R$
                                {formatReal(carrinho?.reduce((total: number, carrinho: Carrinho) => (carrinho.value * carrinho.amount) + total, 0))}
                            </label>
                        </div>
                        <div className={styled.dados}>
                            <label>Frete</label>
                            <label>R$
                                0
                            </label>

                        </div>

                        <hr />

                        <div className={styled.dados}>
                            <label>Total</label>
                            <label>R$
                                {formatReal(carrinho?.reduce((total: number, carrinho: Carrinho) => (carrinho.value * carrinho.amount) + total, 0))}
                            </label>
                        </div>

                        <button type="submit" disabled={request}>
                            {request ? 'Carregando' : 'Comprar'}
                        </button>
                    </div>
                </article>
            </form>
        </section>
    )
}