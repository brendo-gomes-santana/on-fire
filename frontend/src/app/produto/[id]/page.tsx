
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import Quantidade from "@/components/quantidade";
import styled from './styled.module.scss';

import { Produtos } from "@/utils/Produtos";
import { InformacoesProps } from "@/utils/types/CardProps";
import formatReal from "@/utils/funcoes/FormatReal";

export function generateMetadata({params}: {params: {id: string | number}}):Metadata{

    const produto = Produtos.find((item) => item.id == params.id);

    return {
        title: `On fire | ${produto?.name}`
    }
}


function getProduto(id: string | number):InformacoesProps | null{
    const produto = Produtos.find((item) => item.id == id);


    if(!produto?.id){
        return null
    }
    return produto
}

export default function Produto({params}: {params: {id: string}}){

    const produto = getProduto(params.id)


    if(!produto){
        redirect('/loja')
    }

    return(
        <section className={styled.container}>
            <article className={styled.ContainerInformacoes}>
                <Image src={produto?.cap} alt="testando" />
                <div className={styled.Informacoes}>
                    <h1>{produto?.name}</h1>
                    <h2>Código do produto: {params.id}</h2>
                    <hr />

                    <div className={styled.ContainerValores}>
                        <div>
                            <p id="valor">R$ {formatReal(produto?.value)}</p>
                            <span>quantidade disponivel: 10000</span>
                        </div>
                        <Quantidade produto={produto}/>
                    </div>
                </div>
            </article>
        </section>
    )
}