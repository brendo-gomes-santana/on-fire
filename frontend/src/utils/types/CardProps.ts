import type { StaticImageData } from 'next/image';
export interface InformacoesProps {
    name: string,
    value: number,
    cap: StaticImageData,
    id: string | number
}