export interface Carrinho {
    id: string;
    
    name: string;
    value: number;
    amount: number;

    link?: string

}

export interface CarrinhoContextType {
    carrinho: Carrinho[] | null;
    AddItem: ({}: Carrinho) => void;
    RemoveItem: (id: string) => void;
}