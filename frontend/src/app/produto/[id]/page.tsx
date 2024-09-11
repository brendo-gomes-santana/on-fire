
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import Quantidade from "@/components/quantidade";
import styled from './styled.module.scss';

import { Produtos } from "@/utils/Produtos";
import formatReal from "@/utils/funcoes/FormatReal";
import api from "@/config";

export function generateMetadata({ params }: { params: { id: string | number } }): Metadata {

    const produto = Produtos.find((item) => item.id == params.id);

    return {
        title: `On fire | ${produto?.nome}`,
        description: produto?.nome,

        openGraph: {
            title: produto?.nome,
            images: [`${process.env.NEXT_PUBLIC_URL_IMAGEM}/${produto?.name_image}`]
        }
    }
}

async function getProduto(id: string | number): Promise<any> {

    const produto = Produtos.find((item) => item.id == id);

    if (produto?.id) {
        console.log(produto)

        return {
            id: produto.id,
            img: produto.img,
            nome: produto.nome,
            valor: produto.valor,
            cap: produto.cap,
            name_image: produto.name_image,
            quantidade: 200, 
            site: true
        }

    } else {
        try {
            const response = await api.get(`/detalhe/produto?id_produto=${id}`)
            return response.data
        } catch (err) {
            console.log(err);
            return null
        }
    }
}

export default async function Produto({ params }: { params: { id: string } }) {

    const produto = await getProduto(params.id)


    if (!produto) {
        redirect('/loja')
    }

    return (
        <section className={styled.container}>
            <article className={styled.ContainerInformacoes}>
                <Image src={produto.site ? (produto.img) : `${process.env.NEXT_PUBLIC_URL_IMAGEM}imagem/${produto.img}`} alt="testando" height={400} width={500} />
                <div className={styled.Informacoes}>
                    <h1>{produto?.nome}</h1>
                    <h2>Código do produto: {params.id}</h2>
                    <hr />

                    <div className={styled.ContainerValores}>
                        <div>
                            {produto.valor === 0 ? (
                                <p>Grátis</p>
                            ) : (
                                <p id="valor">R$ {formatReal(produto?.valor)}</p>
                            )}

                            <span>quantidade disponivel: {produto.quantidade}</span>
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