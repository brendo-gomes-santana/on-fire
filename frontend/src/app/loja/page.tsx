import { Metadata } from 'next'; 

import Card from '@/components/Card';
import styled from './styled.module.scss';

import logo from '../../../public/FLYER-CONFERENCIA.png'



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
                <Card
                    name='Pulseira Conferencia 2k24'
                    image={logo}
                    value={10050}
                    id='numbeasiun'
                />
            </section>
        </main>
    )
}