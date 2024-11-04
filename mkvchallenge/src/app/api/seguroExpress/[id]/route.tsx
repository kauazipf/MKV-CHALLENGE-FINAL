import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { CarrosProps } from "@/types/types";

export async function GET(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/database.json', 'utf-8');
        
        const carros:CarrosProps[] = JSON.parse(file);

        const carro = carros.find( p => p.id ==  params.id);

        return NextResponse.json(carro);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção do produto : "+error},{status:500});
    }

}

export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/database.json', 'utf-8');
        
        const carros:CarrosProps[] = JSON.parse(file);

        const indice = carros.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            carros.splice(indice,1);
            
            const listaJson = JSON.stringify(carros);

            await fs.writeFile(process.cwd() + '/src/data/database.json', listaJson);

            return NextResponse.json({msg:"Produto excluído com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão do produto : "+error},{status:500})
    }

}

export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/database.json', 'utf-8');

        const carros: CarrosProps[] = JSON.parse(file);

        const {nome,marca,cor,ano,imagem} = await request.json();

       const indice = carros.findIndex( p => p.id ==  params.id);
        if(indice != -1){
            const carro = {nome,marca,cor,ano,imagem} as CarrosProps;

            carro.id = params.id;

            carros.splice(indice,1,carro);
                        
            const listaJson = JSON.stringify(carros);

            await fs.writeFile(process.cwd() + '/src/data/database.json', listaJson);

            return NextResponse.json({msg:"Produto atualizado com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização do produto : " + error }, { status: 500 });
    }

}