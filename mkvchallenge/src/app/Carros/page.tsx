"use client"

import { CarrosProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";
import Image from "next/image";

export default function Carros() {

    
    const [carros, setProdutos] = useState<CarrosProps[]>([]);
    
    const chamadaApi = async () => {
        try {
            const response = await fetch("/api/seguroExpress");
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error("Erro ao analisar JSON:", error);
        }
    };

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`/api/seguroExpress/${id}`,{
            method: 'DELETE',
        });
        if (response.ok) {
            alert("Produto excluído com sucesso.");
            chamadaApi();
        }
} catch (error) {
    console.error("Falha ao remover o produto: ", error);
}
}

    return (
        <div>
            <table className="w-[80vw] text-center h-[60vh] m-24 text-xl">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>MARCA</th>
                        <th>COR</th>
                        <th>ANO</th>
                        <th>IMAGEM</th>
                        <th>EDITAR | EXCLUIR</th>
                    </tr>
                </thead>
                <tbody>
                    {carros.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.nome}</td>
                            <td>{c.marca}</td>
                            <td>{c.cor}</td>
                            <td>{c.ano}</td>
                            <td><Image src={c.imagem} alt="Foto de Carro" width={200} height={200}/></td>
                            <td><Link href={`/Carros/editar/${c.id}`}><Editar className="inline text-3xl"/></Link> | 
                                <Link href="#" onClick={()=> handleDelete(c.id)}> <Excluir className="inline text-3xl"/></Link> </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de carros : {carros.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}