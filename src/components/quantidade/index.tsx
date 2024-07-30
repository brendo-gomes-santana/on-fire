'use client'
import { useContext } from "react";
import { useState, ChangeEvent } from "react"
import styled from './styled.module.scss'
import { CarrinhoContext } from "@/contexts/carrinho";
export default function Quantidade() {

    const [quantidade, setQuantidade] = useState(1);
    
    
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(e.target.value); // Converter para número usando parseInt
        setQuantidade(newValue);
    };


    const { AddItem } = useContext(CarrinhoContext);


    function handleAdd(){
        AddItem({
            id: '1111',
            name: 'Pulseira',
            amount: quantidade,
            value: 10000 * quantidade
        })
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
                </select>
            </div>
            <button 
            onClick={handleAdd}
            style={{
                backgroundColor: "#F28705"
            }}>Adicionar ao carrinho</button>
            <button style={{
                backgroundColor: "#F25C05"
            }}>Comprar agora</button>
        </div>

    )
}