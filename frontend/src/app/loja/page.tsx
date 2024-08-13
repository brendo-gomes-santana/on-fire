import { Metadata } from 'next'; 

import Card from '@/components/Card';
import styled from './styled.module.scss';

import { Produtos } from '@/utils/Produtos';

export function generateMetadata():Metadata{
    return{
        title: `On fire | Loja Virtual`
    }

}

export default function Loja(){
    return(
        <main className={styled.Container}>
            <h1>LOJA VIRTUAL</h1>
            <section>
                {Produtos.map((item)=>{
                    return(
                        <Card
                        key={item.id}
                        name={item.name}
                        cap={item.cap}
                        value={item.value}
                        id={item.id}
                    />
                    )
                })}
            </section>
        </main>
    )
}