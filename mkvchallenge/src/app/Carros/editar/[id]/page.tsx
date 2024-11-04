"use client";

import { CarrosProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditarCarrosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const navigate = useRouter();

  const [Carro, setCarro] = useState<CarrosProps>({
    id: 0,
    nome: "",
    marca: "",
    cor: "",
    ano: 0,
    imagem: "",
  });


  useEffect(() => {
    const chamadaApi = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Carros/editar/${Number(id)}`
      );
      const data = await response.json();
      setCarro(data);
    };
    chamadaApi();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/Carros/editar/${Number(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Carro),
        }
      );

      if (response.ok) {
        alert("Carro atualizado com sucesso!");
        setCarro({
            id: 0,
            nome: "",
            marca: "",
            cor: "",
            ano: 0,
            imagem: "",
        });
        navigate.push("/Carros");
      }
    } catch (error) {
      console.error("Erro na atualização do Carro...", error);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-[40px] mb-8">
        Editar Carros
      </h1>
      <div className="flex flex-col justify-center items-center max-w-full">
        <form onSubmit={handleSubmit} className="w-[350px] mx-auto">
          <div className="mb-5">
            <label
              htmlFor="carroNome"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Nome
            </label>
            <input
              type="text"
              id="carroNome"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="nome"
              value={Carro.nome}
              onChange={(e) =>
                setCarro({ ...Carro, nome: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="carroMarca"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Marca
            </label>
            <input
              type="text"
              id="carroMarca"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="marca"
              value={Carro.marca}
              onChange={(e) =>
                setCarro({ ...Carro, marca: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="carroCor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Cor
            </label>
            <input
              type="text"
              id="carroCor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="cor"
              value={Carro.cor}
              onChange={(e) => setCarro({ ...Carro, cor: e.target.value })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="carroAno"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Ano
            </label>
            <input
              type="number"
              id="carroAno"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="ano"
              value={Carro.ano}
              onChange={(e) =>
                setCarro({ ...Carro, ano: Number(e.target.value) })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="carroImagem"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
            >
              Imagem
            </label>
            <input
              type="text"
              id="CarroAuthor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="imagem"
              value={Carro.imagem}
              onChange={(e) =>
                setCarro({ ...Carro, imagem: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
