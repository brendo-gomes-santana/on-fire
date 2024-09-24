import styled from './styled.module.scss';
import BackButton from '@/components/BackButton';

import Lista_de_produtos from './components/lista_de_produtos';

async function getData(tipo: string){
  try{

      const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTER_API}/lista/produtos?tipo=${tipo}`, { cache: 'no-store' } )
      return response.json()

  }catch(err){
      console.log(err);
  }
}


export default async function ListaProdutos() {

  const data = await getData('workshop');

  return (
    <main className={styled.container}>
      <h1>
        <BackButton />
        Lista de produtos
      </h1>
      <section>
        {data?.map((item: any) => {
          return(
            <Lista_de_produtos item={item} key={item.id}/>
          )
        })}
      </section>
    </main>
  );
}
