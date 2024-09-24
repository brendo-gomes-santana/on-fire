import { Metadata } from 'next'; 

import Card from '@/components/Card';
import styled from './styled.module.scss';

import { Produtos } from '@/utils/Produtos';
import api from '@/config';

async function getData(tipo: string){
    try{

        const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTER_API}/lista/produtos?tipo=${tipo}`, { cache: 'no-store' } )
        return response.json()

    }catch(err){
        console.log(err);
    }
}

export function generateMetadata():Metadata{
    return{
        title: `On fire | Loja Virtual`
    }

}

export default async function Loja(){

    const dataworkshop = await getData('workshop');

    

    return(
        <main className={styled.Container}>
            <h1>LOJA VIRTUAL</h1>
            <section>
                {Produtos.map((item)=>{
                    return(
                        <Card
                        key={item.id}
                        nome={item.nome}
                        cap={item.cap}
                        valor={item.valor}
                        id={item.id}
                        img={item.img}
                    />
                    )
                })}

                {dataworkshop?.map((item: any) => {
                    return(
                        <Card
                        key={item.id}
                        nome={item.nome}
                        cap={`${process.env.NEXT_PUBLIC_URL_IMAGEM}imagem/${item.img}`}
                        valor={item.valor}
                        id={item.id}
                        img={`${process.env.NEXT_PUBLIC_URL_IMAGEM}${item.img}`}
                    /> 
                    )
                })}
            </section>
        </main>
    )
}