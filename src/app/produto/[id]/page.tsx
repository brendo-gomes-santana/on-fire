
import { Metadata } from "next"
import Image from "next/image"
import Quantidade from "@/components/quantidade"
import ImageTest from '../../../../public/FLYER-CONFERENCIA.png'
import styled from './styled.module.scss';

export function generateMetadata({params}: {params: {id: string}}):Metadata{
    return{
        title: `On fire | ${params.id}`
    }

}
export default function Produto({params}: {params: {id: string}}){

    return(
        <section className={styled.container}>
            <article className={styled.ContainerInformacoes}>
                <Image src={ImageTest} alt="testando" />
                <div className={styled.Informacoes}>
                    <h1>Pulseira Conferencia 2k24</h1>
                    <h2>Código do produto: 12334545</h2>
                    <hr />

                    <div className={styled.ContainerValores}>
                        <div>
                            <p id="valor">R$ 100,00</p>
                            <span>quantidade disponivel: 10000</span>
                        </div>
                        <div>
                            <Quantidade/>
                            <button style={{
                                backgroundColor: "#F28705"
                            }}>Adicionar ao carrinho</button>
                            <button style={{
                                backgroundColor: "#F25C05"
                            }}>Comprar agora</button>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}