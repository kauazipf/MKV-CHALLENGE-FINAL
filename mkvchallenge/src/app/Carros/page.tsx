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
            <table className="w-[99vw] text-center h-[60vh]">
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
                    {carros.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>{p.marca}</td>
                            <td>{p.cor}</td>
                            <td>{p.ano}</td>
                            <td><Image src={p.imagem} alt="Foto de Carro" width={300} height={300}/></td>
                            <td><Link href={`/Carros/${p.id}`}><Editar className="inline text-3xl"/></Link> | 
                                <Link href="#" onClick={()=> handleDelete(p.id)}> <Excluir className="inline text-3xl"/></Link> </td>
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