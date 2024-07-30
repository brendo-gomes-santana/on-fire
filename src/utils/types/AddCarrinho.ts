import { UseFormRegister } from 'react-hook-form';

export interface PropsAddCarrinho{
    amount: number
}



interface PropsAmout{
    amount: number,
}

export interface PropsRegister {
    register: UseFormRegister<PropsAmout>
}