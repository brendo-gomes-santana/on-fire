'use client'
import { useState } from 'react';
import { useForm,  FieldValues} from 'react-hook-form';
import api from '@/config';
import style from './styled.module.scss';
import { toast } from 'react-toastify';


export default function WorkShop({ id_produto }: { id_produto: string }){

    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, reset } = useForm();

    async function handleInscricao(dataForm: FieldValues): Promise<void>{

        const data = {
            id_produto: id_produto,
            ...dataForm
        }

        setLoading(true);

        try{

            await api.post('/inscricao/workshop', data);
            reset();
            toast.success(`Inscrição foi feita com sucesso`);

        }catch(err: any){

            console.error(err);
            toast.error(err.response.data.error)

        }finally{
            setLoading(false)
        }
    }
    return(
        <form 
        onSubmit={handleSubmit(handleInscricao)}
        className={style.Container}>
            <input 
                {...register("nome", {
                    required: "Coloque o nome completo"
                })}
                disabled={loading}
                type="text" 
                placeholder="Digite seu nome" />

            <input 
                {...register("codigo", {
                    required: "Digite o código da pulseira"
                })}
                disabled={loading}
                type="number" 
                placeholder="Código da pulseira" />

            <button type='submit' disabled={loading}>
                {loading ? 'Carregando...' : 'Cadastrar'}
            </button>
        </form>
    )
}