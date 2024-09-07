'use client'
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useQuery, useMutation, useQueryClient } from 'react-query';

import api from '../../../config/index';
import styled from './styled.module.scss';
import { authContext } from '@/contexts/auth';

import { ListaInformacoesType } from '@/utils/types/ListaCompradoresProps';


export default function lista_compradores() {
    const [abertoInfor, setAbertoInfor] = useState<string>('');
    const queryClient = useQueryClient();

    const { user } = useContext(authContext);

    const { data: DataCompradores, refetch } = useQuery<ListaInformacoesType[]>("compradores", (async () => {
        try {

            const response = await api.get(`/compradores?id_usuario=${user?.id}`);
            return response.data

        } catch (err) {
            console.log(err);
        }
    }))

    const { register, handleSubmit, reset } = useForm();

    async function handlePesquisar(data: any) {

        if (!data.codigo && !data.nome) {
            refetch();
            return;
        }

        const usuario = DataCompradores?.filter((dados: ListaInformacoesType) => {
            const filtraPorCodigo = data.codigo ? String(dados.id).startsWith(String(data.codigo)) : true;
            const filtraPorNome = data.nome ? dados.nome.startsWith(data.nome) : true;
            return filtraPorCodigo && filtraPorNome;
        });

        queryClient.setQueriesData("compradores", usuario);
        reset();
    }


    const mutation = useMutation({
        mutationFn: ({ id_comprador }: { id_comprador: string }) => {
            return api.patch(`/compradores/${id_comprador}?id_usuario=${user?.id}`)
                .then((res) => res.data)
                .catch((err) => err);
        },
        onSuccess: (data) => {
            toast.success(`Ticket feito com sucesso`);
            queryClient.setQueryData("compradores", (currentData: any) => currentData.map((todos: ListaInformacoesType) => todos.id === data.id ? data : todos))
        }
    })


    return (
        <section className={styled.container}>
            <h1>Lista de compradores</h1>

            <form className={styled.ContainerBuscador} onSubmit={handleSubmit(handlePesquisar)}>
                <input
                    type="text"
                    placeholder='Digite o codigo'
                    {...register('codigo')}
                />
                <input
                    type="text"
                    placeholder='Digite o nome'
                    {...register('nome')}
                />
                <button type='submit'>Pesquisar</button>

            </form>
            {DataCompradores?.length === 0 && (
                <span>Ninguem comprou ainda ...</span>
            )}
            {DataCompradores?.map((item: ListaInformacoesType) => {
                return (
                    <article key={item.id}
                        style={{
                            marginBottom: '1em'
                        }}
                    >
                        <div className={styled.InformacoesIniciais}>
                            <button
                                onClick={() => setAbertoInfor(abertoInfor === item.id ? '' : item.id)}
                            >
                                {item.nome}
                                {abertoInfor === item.id ? (
                                    <IoIosArrowDown size={20} />
                                ) : (
                                    <IoIosArrowUp size={20} />
                                )}
                            </button>
                            <span style={{
                                backgroundColor: item.pago ? '#75F55D' : '#F54D47'
                            }}>
                                {item.pago ? 'Pago' : 'Pedente'}
                            </span>
                            <span style={{
                                backgroundColor: item.recebeu_ticket ? '#75F55D' : '#F54D47'
                            }}>
                                Ticket
                            </span>
                        </div>
                        {abertoInfor === item.id && (
                            <div className={styled.InformacoesAdicionais}>
                                <p>
                                    <strong>Contato: </strong>
                                    {item.contato}
                                </p>
                                <p>
                                    <strong>Nome do líder: </strong>
                                    {item.nome_lider}
                                </p>
                                <p>
                                    <strong>Qual igreja: </strong>
                                    {item.igreja}
                                </p>
                                <p>
                                    <strong>Descrição: </strong>
                                    {item.descricao}
                                </p>
                                {!item.recebeu_ticket && (
                                    <button onClick={
                                        () => {
                                            mutation.mutate({ id_comprador: item.id })
                                        }
                                    }>Ticket</button>
                                )}
                            </div>
                        )}
                    </article>
                )
            })}

        </section>
    )
}