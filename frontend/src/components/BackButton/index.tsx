'use client'

import { useRouter } from "next/navigation";
import { IoChevronBackCircleSharp } from "react-icons/io5";

export default function BackButton(){

  const router = useRouter()

  return (
    <button style={{
      padding: '0.5em',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '13px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      margin: '0.5em'
    }} onClick={() => router.back()}>
      <IoChevronBackCircleSharp size={30}/> VOLTAR
    </button>
  )
}