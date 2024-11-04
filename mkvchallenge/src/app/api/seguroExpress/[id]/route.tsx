import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { CarrosProps } from "@/types/types";

const databasePath = process.cwd() + "/src/data/database.json";

async function getCarrosFromFile(): Promise<CarrosProps[]> {
    const file = await fs.readFile(databasePath, "utf-8");
    return JSON.parse(file);
}

async function saveCarrosToFile(carros: CarrosProps[]): Promise<void> {
    const listaJson = JSON.stringify(carros, null, 2);
    await fs.writeFile(databasePath, listaJson);
}

// GET - Obter carro por ID
export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
        const carros = await getCarrosFromFile();
        const carro = carros.find(p => p.id === params.id);

        if (!carro) {
            return NextResponse.json({ msg: "Carro não encontrado." }, { status: 404 });
        }

        return NextResponse.json(carro);
    } catch (error) {
        return NextResponse.json(
            { msg: "Falha na obtenção do carro: " + error },
            { status: 500 }
        );
    }
}

// DELETE - Excluir carro por ID
export async function DELETE(request: Request, { params }: { params: { id: number } }) {
    try {
        const carros = await getCarrosFromFile();
        const indice = carros.findIndex(p => p.id === params.id);

        if (indice === -1) {
            return NextResponse.json({ msg: "Carro não encontrado para exclusão." }, { status: 404 });
        }

        carros.splice(indice, 1);
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
export async function PUT(request: Request, { params }: { params: { id: number } }) {
    try {
        const carros = await getCarrosFromFile();
        const indice = carros.findIndex(p => p.id === params.id);

        if (indice === -1) {
            return NextResponse.json({ msg: "Carro não encontrado para atualização." }, { status: 404 });
        }

        const { nome, marca, cor, ano, imagem } = await request.json();
        const carroAtualizado = { id: params.id, nome, marca, cor, ano, imagem } as CarrosProps;

        carros[indice] = carroAtualizado;
        await saveCarrosToFile(carros);

        return NextResponse.json({ msg: "Carro atualizado com sucesso!" });
    } catch (error) {
        return NextResponse.json(
            { error: "Falha na atualização do carro: " + error },
            { status: 500 }
        );
    }
}
