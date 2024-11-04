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

// GET - Obter todos os carros
export async function GET() {
    try {
        const carros = await getCarrosFromFile();
        return NextResponse.json(carros);
    } catch (error) {
        return NextResponse.json(
            { error: "Falha na obtenção da lista de carros: " + error },
            { status: 500 }
        );
    }
}

// POST - Adicionar um novo carro
export async function POST(request: Request) {
    try {
        const carros = await getCarrosFromFile();

        const { nome, marca, cor, ano, imagem } = await request.json();
        const novoId = carros.length > 0 ? carros[carros.length - 1].id + 1 : 1;

        const novoCarro: CarrosProps = {
            id: novoId,
            nome,
            marca,
            cor,
            ano,
            imagem,
        };

        carros.push(novoCarro);
        await saveCarrosToFile(carros);

        return NextResponse.json(novoCarro, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Falha na inserção do carro: " + error },
            { status: 500 }
        );
    }
}
