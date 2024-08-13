'use client'

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Carrinho, CarrinhoContextType } from "@/utils/types/carrinhoProps";
import { toast } from "react-toastify";

export const CarrinhoContext = createContext({} as CarrinhoContextType);

export default function CarrinhoProvider({ children }: {children: ReactNode}){

    const [carrinho, setCarrinho] = useState<Carrinho[]>([]);

    useEffect(() => {
       const carrinhoLocalStorageString = localStorage.getItem("@carrinho-onfire");
        
        if (carrinhoLocalStorageString !== null) {
            const CarrinhoJSON: Carrinho[] = JSON.parse(carrinhoLocalStorageString);
            setCarrinho(CarrinhoJSON);
        }else {
            setCarrinho([]);
        }
    }, []);


    function AddItem(item: Carrinho) {

        const index = carrinho.findIndex(i => i.id === item.id);

        if (index !== -1) {
            const novoCarrinho = [...carrinho];
            novoCarrinho[index] = {
                ...novoCarrinho[index],
                name: item.name,
                value: item.value,
                amount: item.amount,
                // Adicione outras propriedades conforme necessário
            };
            setCarrinho(novoCarrinho);
            localStorage.setItem("@carrinho-onfire", JSON.stringify(novoCarrinho));
        } else {
            const novoCarrinho = [...carrinho, item];
            setCarrinho(novoCarrinho);
            localStorage.setItem("@carrinho-onfire", JSON.stringify(novoCarrinho));
        }
        toast.success('Item Cadastrado');
    }

    function RemoveItem(id: string | number):void {
        const novoCarrinho = carrinho.filter(item => item.id !== id);
        setCarrinho(novoCarrinho);
        localStorage.setItem("@carrinho-onfire", JSON.stringify(novoCarrinho));
    }

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                AddItem,
                RemoveItem
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
}
