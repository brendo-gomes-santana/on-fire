'use client'

import { useContext } from "react";
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from "react";

import { CarrinhoContext } from "@/contexts/carrinho";
import { InformacoesProps } from "@/utils/types/CardProps";

import styled from './styled.module.scss';

export default function Quantidade({produto}: {
    produto: InformacoesProps
}) {

    const router = useRouter();
    const [quantidade, setQuantidade] = useState(1);
    
    
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(e.target.value); // Converter para número usando parseInt
        setQuantidade(newValue);
    };


    const { AddItem } = useContext(CarrinhoContext);

    function handleAdd(){
        AddItem({
            id: produto.id,
            name: produto.nome,
            amount: quantidade,
            value: produto.valor,
            link: `/produto/${produto.id}`
        })
    }


    function FecharComprar(){
        AddItem({
            id: produto.id,
            name: produto.nome,
            amount: quantidade,
            value: produto.valor,
            link: `/produto/${produto.id}`
        })

        router.push('/fechar_compra')
    }

    return (
        <div className={styled.Containerfather}>
            <div className={styled.Container}>
                <div>Quantidade: {quantidade}</div>
                <select value={quantidade} onChange={handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
            </div>
            <button 
            onClick={handleAdd}
            style={{
                backgroundColor: "#F28705"
            }}>Adicionar ao carrinho</button>
            <button 
            onClick={() => FecharComprar()}
            style={{
                backgroundColor: "#F25C05"
            }}>Comprar agora</button>
        </div>

    )
}