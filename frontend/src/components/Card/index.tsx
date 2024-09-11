import Image from "next/image"
import { InformacoesProps } from "@/utils/types/CardProps"
import formatReal from "@/utils/funcoes/FormatReal"

import styled from "./styled.module.scss";
import Link from "next/link";

export default function Card({
    nome,
    valor,
    cap,
    id,
    img
}: InformacoesProps) {
    return (
        <article className={styled.container}>
            <Image
                src={!cap ? img : cap}
                alt={`Imagem do produto ${nome}`}
                width={300}
                height={200}

            />
            <Link href={`/produto/${id}`}>{nome}</Link>
            {valor === 0 ? (
                <p>Grátis</p>
            ) : (
                <p>R$ {formatReal(valor)}</p>
            )}
        </article>
    )
}