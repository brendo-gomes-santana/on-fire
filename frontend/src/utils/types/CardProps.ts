import type { StaticImageData } from 'next/image';

export interface InformacoesProps {
    nome: string,
    valor: number,
    cap?: StaticImageData | string,
    id: string | number,
    img: StaticImageData | string,
    name_image?: string
    tipo?: string
}