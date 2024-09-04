
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import Quantidade from "@/components/quantidade";
import styled from './styled.module.scss';

import { Produtos } from "@/utils/Produtos";
import { InformacoesProps } from "@/utils/types/CardProps";
import formatReal from "@/utils/funcoes/FormatReal";

export function generateMetadata({ params }: { params: { id: string | number } }): Metadata {

    const produto = Produtos.find((item) => item.id == params.id);

    return {
        title: `On fire | ${produto?.name}`,
        description: produto?.name,

        openGraph: {
            title: produto?.name,
            images: [`${process.env.NEXT_PUBLIC_URL_IMAGEM}/${produto?.name_image}`]
        }
    }
}


function getProduto(id: string | number): InformacoesProps | null {
    const produto = Produtos.find((item) => item.id == id);


    if (!produto?.id) {
        return null
    }
    
    return produto
}

export default function Produto({ params }: { params: { id: string } }) {

    const produto = getProduto(params.id)


    if (!produto) {
        redirect('/loja')
    }

    return (
        <section className={styled.container}>
            <article className={styled.ContainerInformacoes}>
                <Image src={produto?.image} alt="testando" />
                <div className={styled.Informacoes}>
                    <h1>{produto?.name}</h1>
                    <h2>Código do produto: {params.id}</h2>
                    <hr />

                    <div className={styled.ContainerValores}>
                        <div>
                            <p id="valor">R$ {formatReal(produto?.value)}</p>
                            <span>quantidade disponivel: 200</span>
                        </div>
                        <Quantidade produto={produto} />
                    </div>
                </div>
            </article>
            <article className={styled.descricao}>
                
                <h2>Descrição</h2>
                
                <h3>IDADE PAGANTE</h3>
                <p>Crianças de até 8 anos de idade estarão isentas do pagamento da pulseira. Porém, em caso de lotação do evento, ficarão os pais ou responsáveis, cientes que tais crianças não terão direito a assentos no evento. Caso assim queiram, o aconselhado é que seja adquirido a pulseira.</p>
                
                <h3>CREDENCIAMENTO INFANTIL</h3>
                <p>
                    No credenciamento do evento, será obrigatório a apresentação do documento da criança, comprovando a idade do menor. Para fins de conferência, a idade que será considerada,
                    <strong> é a do dia do evento e não do dia da compra.</strong>
                </p>

                <h3>REGRAS DE REEMBOLSO</h3>
                <p>O Art. 49, da Lei 8.078/09, do Código de Defesa do Consumidor, lhe garante um prazo legal de 7 (sete) dias após a compra online, a contar do dia seguinte da aquisição, para solicitar o estorno integral do pagamento efetuado.</p>
            </article>
        </section>
    )
}