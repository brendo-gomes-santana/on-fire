import { BsInstagram } from "react-icons/bs";

import styled from "./styled.module.scss";

export default function Footer(){
    return(
        <footer className={styled.container}>
            <p>On fire</p>
            <section className={styled.contato}>
                <article>
                    <a href="https://www.instagram.com/on_fire_oficial_/" target="_blank">
                        <BsInstagram size={30} color="#fff"/>
                    </a>
                </article>
                <a href="https://maps.app.goo.gl/iamRRsRt44jxP9Fx8" target="_blank">Av. 7 de Maio - Santa Etelvina, Manaus - AM, 69059-140</a>
            </section>
            <span>
                ©2024 por On fire. Orgulhosamente desenvolvido por 
                <a href="https://brendogs.com.br" target="_blank"> brendogs.com</a>
            </span>
        </footer>
    )
}