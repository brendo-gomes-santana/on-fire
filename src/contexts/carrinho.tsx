'use client'

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Carrinho, CarrinhoContextType } from "@/utils/types/carrinhoProps";


export const CarrinhoContext = createContext<CarrinhoContextType>({
    carrinho: null,
    AddItem: () => {},
    RemoveItem: () => {}
});

export default function CarrinhoProvider({ children }: {children: ReactNode}){

    const [carrinho, setCarrinho] = useState<Carrinho[] | null>([]);

    useEffect(()=> {
        
        const carrinhoLocalStorageString = localStorage.getItem("@carrinho-onfire");
        
        if(carrinhoLocalStorageString !== null){

            const CarrinhoJSON: Carrinho[] = JSON.parse(carrinhoLocalStorageString);

            setCarrinho(CarrinhoJSON);
        }else{
            setCarrinho([]);
        }

    },[])

    function AddItem(item: Carrinho){
        if (!carrinho) return;

        // Verifica se o item já existe no carrinho com base no ID
        const index = carrinho.findIndex(i => i.id === item.id);

        if (index !== -1) {

            // Se o item existe, atualiza suas propriedades
            const novoCarrinho = [...carrinho];
            novoCarrinho[index] = {
                ...novoCarrinho[index],
                name: item.name,
                value: item.value,
                amount: item.amount,
                // Adicione outras propriedades conforme necessário
            };
            setCarrinho(novoCarrinho);
        } else {
            // Se o item não existe, adiciona ao carrinho
            setCarrinho([...carrinho, item]);
        }

        // Atualiza o localStorage com o novo estado do carrinho
        localStorage.setItem("@carrinho-onfire", JSON.stringify(carrinho));
        alert('Cadastrado no carrinho');
    }

    function RemoveItem(id: string ){
        if (!carrinho) return;

        const novoCarrinho = carrinho.filter(item => item.id !== id);
        setCarrinho(novoCarrinho);

        localStorage.setItem("@carrinho-onfire", JSON.stringify(novoCarrinho));
    }
    return(
        <CarrinhoContext.Provider
            value={{
                carrinho,
                AddItem,
                RemoveItem
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}