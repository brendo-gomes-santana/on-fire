import { Metadata } from 'next';
import Link from 'next/link';
import styled from './styled.module.scss';

export function generateMetadata():Metadata{
    return{
        title: `On fire | Configuração`
    }

}

export default function painel(){
    return(
        <section className={styled.container}>
            <h1>Configuração</h1>

            <article className={styled.navegacao}>
                <Link href="/painel/lista_compradores">Listar compradores</Link>
                <Link href="">Listar produtos</Link>
                <Link href="">Cadastrar produtos</Link>
            </article>

        </section>
    )
} 