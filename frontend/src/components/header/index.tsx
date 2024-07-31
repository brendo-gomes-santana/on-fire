'use client'

import { useContext, useState } from 'react';
import { CarrinhoContext } from '@/contexts/carrinho';
import { MdDeleteOutline } from "react-icons/md";


import formatReal from '@/utils/funcoes/FormatReal';

import Link from 'next/link';
import Image from 'next/image';

import styled from './styled.module.scss';
import { FaShoppingBag } from "react-icons/fa";
import logo_onfire from '../../../public/LOGO-ON-FIRE-PNG.png';
import { Carrinho } from '@/utils/types/carrinhoProps';

export default function Header() {

    const { RemoveItem, carrinho } = useContext(CarrinhoContext);

    const [carrinhoOpen, setCarrinhoOpen] = useState(false);

    function somarCarrinho(carrinho: Carrinho[] | null): number{
        const total = carrinho?.reduce((resultado, quantidade) => {
            return resultado + quantidade.value
        }, 0)

        if(!total){
            return 0
        }

        return total
    }


    const styledperso = {
        transform: 'translateY(0vh)'
    }

    return (
        <>
            <div
                className={styled.ContainerBase}
                onClick={() => setCarrinhoOpen(false)}
                style={carrinhoOpen ? styledperso : {}}
            >
                <section className={styled.ContainerProdutos} style={carrinhoOpen ? styledperso : {}}>
                    <h1>Carrinho</h1>
                    <hr />
                    <div className={styled.ContainerbaseProdutos}>
                        {carrinho !== null && carrinho.length === 0 && (
                            <p style={{textAlign: 'center'}}>Nem um item adicionado no carrinho</p>
                        )}
                        {carrinho !== null && carrinho?.map((item) => {
                            return (
                                <article className={styled.CardCarrinho} key={item.id}>
                                    <Link href={item.link as string}>{item.name}</Link>
                                    <p>R$ {formatReal(item.value)}</p>
                                    <p>{item.amount}x</p>
                                    <button onClick={() => RemoveItem(item.id)}>
                                        <MdDeleteOutline size={30} color='#f25c05' />
                                    </button>
                                </article>
                            )
                        })}
                    </div>
                    <div className={styled.containerFechaProdutos}>
                        <p>Sub-total: R$ {formatReal(somarCarrinho(carrinho))}</p>
                        <Link href="/fechar_compra">Fechar pedido</Link>
                    </div>
                </section>
            </div>

            <header className={styled.container}>
                <Link href="/">
                    <Image
                        src={logo_onfire}
                        alt='logo onfire'
                        className={styled.logo}
                        priority
                    />
                </Link>
                <nav className={styled.nav}>
                    <Link href="/">Início</Link>
                    <Link href="/loja">Loja</Link>

                    <div className={styled.container_comprar}>
                        <button onClick={() => setCarrinhoOpen(true)}>
                            <FaShoppingBag size={25} color='#fff' />
                        </button>
                        <span>{carrinho !== null && carrinho?.length}</span>
                    </div>
                </nav>
            </header>
        </>

    )
}