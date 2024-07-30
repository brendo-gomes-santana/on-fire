'use client'

import { useContext } from 'react';
import { CarrinhoContext } from '@/contexts/carrinho';
import styled from './styled.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { FaShoppingBag } from "react-icons/fa";

import logo_onfire from '../../../public/LOGO-ON-FIRE-PNG.png';

export default function Header() {

    const { carrinho } = useContext(CarrinhoContext);

    return (
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
                    <button>
                        <FaShoppingBag size={25} color='#fff'/>
                    </button>
                    {
                        carrinho !== null && (
                            <span>{carrinho.length}</span>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}