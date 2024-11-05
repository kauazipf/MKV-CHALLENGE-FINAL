import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { CarrosProps } from "@/types/types";

// Função auxiliar para carregar carros do arquivo JSON
async function getCarrosFromFile(): Promise<CarrosProps[]> {
    const file = await fs.readFile(process.cwd() + '/src/data/database.json', 'utf-8');
    return JSON.parse(file);
}

// Função auxiliar para salvar carros no arquivo JSON
async function saveCarrosToFile(carros: CarrosProps[]) {
    const listaJson = JSON.stringify(carros, null, 2); // `null, 2` para uma formatação legível
    await fs.writeFile(process.cwd() + '/src/data/database.json', listaJson);
}

// DELETE - Excluir carro por ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const carros = await getCarrosFromFile();
        const id = parseInt(params.id); // Converte `id` para número para garantir a comparação

        const indice = carros.findIndex(p => p.id === id);

        if (indice === -1) {
            return NextResponse.json({ msg: "Carro não encontrado para exclusão." }, { status: 404 });
        }

        // Remove o carro do array
        carros.splice(indice, 1);
        // Salva o novo array atualizado no arquivo
        await saveCarrosToFile(carros);

        return NextResponse.json({ msg: "Carro excluído com sucesso!" });
    } catch (error) {
        return NextResponse.json(
            { msg: "Falha na exclusão do carro: " + error },
            { status: 500 }
        );
    }
}

// PUT - Atualizar carro por ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const carros = await getCarrosFromFile();
        const id = Number(params.id);
        const indice = carros.findIndex(p => p.id === id);

        if (indice === -1) {
            return NextResponse.json({ msg: "Carro não encontrado para atualização." }, { status: 404 });
        }

        const { nome, marca, cor, ano, imagem } = await request.json();
        if (!nome || !marca || !cor || !ano) {
            return NextResponse.json({ msg: "Dados incompletos para atualização do carro." }, { status: 400 });
        }

        const carroAtualizado = { id, nome, marca, cor, ano, imagem };
        carros[indice] = carroAtualizado;
        await saveCarrosToFile(carros);

        return NextResponse.json({ msg: "Carro atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar carro:", error);
        return NextResponse.json(
            { error: "Falha na atualização do carro: " + error },
            { status: 500 }
        );
    }
}

