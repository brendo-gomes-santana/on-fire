import Image from 'next/image';

import desenvolvimento from '../../public/desenvolvimento.png';

import styled from './styled.module.scss'

export default function Home() {
  return (
    <main className={styled.container}>
      <section>
        <article></article>
        <p>EM DESENVOLVIMENTO</p>
       
      </section>
    </main>
  );
}
