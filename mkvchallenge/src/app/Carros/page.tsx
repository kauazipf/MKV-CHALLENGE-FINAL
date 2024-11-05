"use client";

import { CarrosProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";
import Image from "next/image";

export default function Carros() {
    const [carros, setCarros] = useState<CarrosProps[]>([]);
    const [novoCarro, setNovoCarro] = useState<CarrosProps>({
        id: 0,
        nome: "",
        marca: "",
        cor: "",
        ano: new Date().getFullYear(),
        imagem: "",
    });

    const chamadaApi = async () => {
        try {
            const response = await fetch("/api/seguroExpress");
            const data = await response.json();
            setCarros(data);
        } catch (error) {
            console.error("Erro ao analisar JSON:", error);
        }
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/seguroExpress/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Produto excluído com sucesso.");
                chamadaApi();
            } else {
                alert("Falha ao excluir o produto.");
            }
        } catch (error) {
            console.error("Falha ao remover o produto:", error);
        }
    };

    const handleAddCarro = async () => {
        try {
            const response = await fetch("/api/seguroExpress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoCarro),
            });

            if (response.ok) {
                alert("Carro adicionado com sucesso!");
                setNovoCarro({
                    id: 0,
                    nome: "",
                    marca: "",
                    cor: "",
                    ano: new Date().getFullYear(),
                    imagem: "",
                });
                chamadaApi();
            } else {
                alert("Erro ao adicionar o carro.");
            }
        } catch (error) {
            console.error("Erro ao adicionar carro:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoCarro((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <table className="w-[90vw] text-center h-[60vh] m-24 text-xl">
                <thead>
                    <tr>
                        <th className="px-4">ID</th>
                        <th className="px-4">NOME</th>
                        <th className="px-4">MARCA</th>
                        <th className="px-4">COR</th>
                        <th className="px-4">ANO</th>
                        <th className="px-4">IMAGEM</th>
                        <th className="px-6">EDITAR | EXCLUIR</th>
                    </tr>
                </thead>
                <tbody>
                    {carros.map((c) => (
                        <tr key={c.id}>
                            <td className="px-4">{c.id}</td>
                            <td className="px-4">{c.nome}</td>
                            <td className="px-4">{c.marca}</td>
                            <td className="px-4">{c.cor}</td>
                            <td className="px-4">{c.ano}</td>
                            <td className="px-96">
                                <Image src={c.imagem} alt="Foto de Carro" width={300} height={300} />
                            </td>
                            <td>
                                <Link href={`/Carros/editar/${c.id}`}>
                                    <Editar className="inline text-3xl" />
                                </Link> | 
                                <Link href="#" onClick={() => handleDelete(c.id)}>
                                    <Excluir className="inline text-3xl" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7} className="px-4 py-16">
                            <h2>Adicionar Novo Carro</h2>
                            <div className="flex gap-2 justify-center">
                                <input
                                    type="text"
                                    name="nome"
                                    value={novoCarro.nome}
                                    onChange={handleInputChange}
                                    placeholder="Nome"
                                    required
                                    className="px-2 py-1 border rounded"
                                />
                                <input
                                    type="text"
                                    name="marca"
                                    value={novoCarro.marca}
                                    onChange={handleInputChange}
                                    placeholder="Marca"
                                    required
                                    className="px-2 py-1 border rounded"
                                />
                                <input
                                    type="text"
                                    name="cor"
                                    value={novoCarro.cor}
                                    onChange={handleInputChange}
                                    placeholder="Cor"
                                    required
                                    className="px-2 py-1 border rounded"
                                />
                                <input
                                    type="number"
                                    name="ano"
                                    value={novoCarro.ano}
                                    onChange={handleInputChange}
                                    placeholder="Ano"
                                    required
                                    className="px-2 py-1 border rounded"
                                />
                                <input
                                    type="text"
                                    name="imagem"
                                    value={novoCarro.imagem}
                                    onChange={handleInputChange}
                                    placeholder="URL da Imagem"
                                    required
                                    className="px-2 py-1 border rounded"
                                />
                                <button onClick={handleAddCarro} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Adicionar Carro
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={7} className="px-4">
                            Quantidade de carros: {carros.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
