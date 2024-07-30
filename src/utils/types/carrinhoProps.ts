export interface Carrinho {
    id: string;
    
    name: string;
    value: number;
    amount: number;

}

export interface CarrinhoContextType {
    carrinho: Carrinho[] | null;
    AddItem: ({}: Carrinho) => void;
    RemoveItem: (id: string) => void;
}