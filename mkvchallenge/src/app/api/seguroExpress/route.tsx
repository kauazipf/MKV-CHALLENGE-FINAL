import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { CarrosProps } from "@/types/types";


export async function GET() {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/banco.json', 'utf-8');

        const carros: CarrosProps[] = JSON.parse(file);

        return NextResponse.json(carros);

    } catch (error) {
        return NextResponse.json({ error: "Falha na obtenção da lista de carros : " + error }, { status: 500 });
    }

}

export async function POST(request: Request) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco.json', 'utf-8');

        const carros: CarrosProps[] = JSON.parse(file);

        const {nome, marca, cor, ano, imagem} = await request.json();
        const carro = {nome, marca, cor, ano, imagem} as CarrosProps;


        const novoId = ( parseInt(carros[carros.length - 1].id.toString() ) + 1);

        carro.id = novoId;

        carros.push(carro);

        const listaJson = JSON.stringify(carros);

        await fs.writeFile(process.cwd() + '/src/data/banco.json', listaJson);

        return NextResponse.json(carro, { status: 201 });

    } catch (error) {
        return  NextResponse.json({ error: "Falha na inserção do produto : " + error }, { status: 500 });
    }

}