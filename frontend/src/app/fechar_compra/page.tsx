

import styled  from './styled.module.scss';
import ListaDeprodutos from '@/components/ListaDePedido';

export default function Fechar_comprar(){
    return(
        <section className={styled.container}>
            <h1>FINALIZANDO A COMPRAR</h1>
            <form className={styled.form}>
                <label className={styled.Input}>
                    Nome
                    <span>*</span>
                    <input type="text" 
                    placeholder="Digite o nome completo"
                    />
                </label>
                <label className={styled.Input}>
                    Numero para contato
                    <span>*</span>
                    <input type="text" 
                    placeholder="Somente os números"
                    />
                </label>
            </form>
            <hr />
            <h2
            style={{
                color: '#f25c05',
                marginTop: '1em'
            }}
            >Produtos</h2>
            <article className={styled.ContainerProdutos}>
                <ListaDeprodutos/>
                <form className={styled.ContainerValores}>
                    <div className={styled.dados}>
                        <label>Valor dos produtos</label>
                        <label>R$ 20,20</label>
                    </div>

                    <hr />

                    <div className={styled.dados}>
                        <label>Total</label>
                        <label>R$ 30,30</label>
                    </div>

                    <button>Comprar</button>
                </form>
            </article>
        </section>
    )
}