'use client'
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useQuery } from 'react-query';

import api from '../../../config/index';
import styled from './styled.module.scss';
import { authContext } from '@/contexts/auth';

import { ListaInformacoesType } from '@/utils/types/ListaCompradoresProps';


export default function lista_compradores() {

    const [listaDeCompradores, setListaDeCompradores] = useState<ListaInformacoesType[] | []>([]);
    const [abertoInfor, setAbertoInfor] = useState<string>('');

    const { user  } = useContext(authContext);

    const { data } = useQuery("compradores", (async () => {
        try{

            if(!user){
                toast.error('Você não está logado no sistema');
                return
            }

            const response = await api.get(`/compradores?id_usuario=${user.id}`);
            return response.data

        }catch(err){
            console.log(err);
        }
    }))
    



    const { register, handleSubmit, reset } = useForm();
    /*
    async function handlePesquisar(data: any) {
        const Ref = query(CompradoresRef, orderBy('nome', 'asc'))
        await getDocs(Ref)
            .then((snapShot) => {

                const lista = [] as ListaInformacoesType[]

                snapShot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        contato: doc.data().contato,

                        pago: doc.data().pago,

                        nome_do_lider: doc.data().nome_lider,
                        qual_igreja: doc.data().igreja,

                        descricao: doc.data().descricao,
                        recebeu_ticket: doc.data().recebeu_ticket
                    });
                });

                const usuario = lista.filter((dados) => {
                    const filtraPorCodigo = data.codigo ? dados.id.startsWith(data.codigo) : true;
                    const filtraPorNome = data.nome ? dados.nome.startsWith(data.nome) : true;
                    return filtraPorCodigo && filtraPorNome;
                  });
                  
                setListaDeCompradores(usuario);
                reset();

            })
            .catch((err) => {
                console.error(err);
            })
    }
    */


    return (
        <section className={styled.container}>
            <h1>Lista de compradores</h1>

            <form className={styled.ContainerBuscador}>
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
                <button>Pesquisar</button>

            </form>
            
            {data?.map((item: ListaInformacoesType) => {
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
                                    {item.nome_do_lider}
                                </p>
                                <p>
                                    <strong>Qual igreja: </strong>
                                    {item.qual_igreja}
                                </p>
                                <p>
                                    <strong>Descrição: </strong>
                                    {item.descricao}
                                </p>
                                {!item.recebeu_ticket && (
                                    <button>Ticket</button>
                                )}
                            </div>
                        )}
                    </article>
                )
            })}

        </section>
    )
}