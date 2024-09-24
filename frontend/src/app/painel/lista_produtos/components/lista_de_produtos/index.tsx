import Image from "next/image"
interface Props {
  item: {
    id: string,
    nome: string,
    cap: string,
    valor: number,
    img: string
  }
}

export default function Lista_de_produtos({ item }: Props) {

  return (
    <a
    style={{
      display: 'flex',
      alignItems: 'center',
      color: '#fff'
    }}
      href={`${process.env.NEXT_PUBLIC_URL_IMAGEM}v1/inscritos/workshop?id_produto=${item.id}`}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_URL_IMAGEM}imagem/${item.img}`}
        height={50}
        width={50}
        alt={`Imagem do produto ${item.nome}`}
        unoptimized

        style={{
          borderRadius: '13px',
          marginRight: '0.5em'
        }}
      />
      {item.nome}
    </a>
  )
}