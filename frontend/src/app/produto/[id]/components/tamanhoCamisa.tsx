'use client'
import { useState } from "react";
import { InformacoesProps } from "@/utils/types/CardProps";
import formatReal from "@/utils/funcoes/FormatReal";
import styled from './styled.module.scss';
import Quantidade from "@/components/quantidade";

interface Props {
    produto: InformacoesProps
}

export default function ValueAndSize({ produto }: Props) {

    const [tamanhoCamisa, setTamanhoCaminho] = useState("");

    function handleSelecione(tamanho: string){
        if(tamanho === tamanhoCamisa){
            setTamanhoCaminho("")
        }else{
            setTamanhoCaminho(tamanho)
        }
    }

    const selecionado = {
        background: 'transparent',
        color: 'rgb(248, 115, 37)',
        border: `1px solid rgb(248, 115, 37)`
    }

    return (
        <div className={styled.ContainerValores}>
            <div>
                <p id="valor">R$ {formatReal(produto?.value)}</p>
                {produto.tipo === 'Roupa' && (
                    <div className={styled.containerButton}>
                        <button 
                            value="PP"
                            style={tamanhoCamisa === 'PP' ? selecionado: {}} 
                            onClick={ () => handleSelecione("PP")}>PP</button>
                        <button 
                            value="P"
                            style={tamanhoCamisa === 'P' ? selecionado: {}} 
                            onClick={ () => handleSelecione("P")}>P</button>
                        <button 
                            value="M"
                            style={tamanhoCamisa === 'M' ? selecionado: {}}  
                            onClick={ () => handleSelecione("M")}>M</button>
                        <button 
                            value="G"
                            style={tamanhoCamisa === 'G' ? selecionado: {}}  
                            onClick={ () => handleSelecione("G")}>G</button>
                        <button 
                            value="GG" 
                            style={tamanhoCamisa === 'GG' ? selecionado: {}} 
                            onClick={ () => handleSelecione("GG")}>GG</button>
                    </div>
                )}

                {produto.tipo === 'Pulseira' && <span>quantidade disponivel: 200</span>}
            </div>
            <Quantidade produto={produto} />
        </div>
    )
}