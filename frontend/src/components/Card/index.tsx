import Image from "next/image"
import { InformacoesProps } from "@/utils/types/CardProps"
import formatReal from "@/utils/funcoes/FormatReal"

import styled from "./styled.module.scss";
import Link from "next/link";

export default function Card({
    name,
    value,
    cap,
    id
}: InformacoesProps){
    return(
        <article className={styled.container}>
            <Image
                src={cap}
                alt={`Imagem do produto ${name}`}
            />
            <Link href={`/produto/${id}`}>{name}</Link>
            <p>R$ {formatReal(value)}</p>
        </article>
    )
}