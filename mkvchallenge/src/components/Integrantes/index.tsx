import fotoKaua from './../../image/fotoKaua.png'
import fotoMarcelo from './../../image/fotoMarcelo.png'
import fotoVictor from './../../image/fotoVictor.png'
import Image from 'next/image'

export default function Participantes(){

    return(
        <>
            <div>
                <h1>Participantes</h1>
            </div>

            <div>
                <div className="w-[380px] h-[480px] p-8 border flex flex-col gap-2 justify-center items-center border-black rounded-lg shadow-md bg-white">
                    <Image className=" max-h-[70%] rounded-full" src={fotoKaua} alt="Integrante Kauã" width={200} height={200} />
                    <h2 className="mt-2 text-lg font-semibold">Kauã Fermino Zipf</h2>
                    <h2 className="mt-2 text-lg font-semibold">RM - 558957</h2>
                    <h2 className="mt-2 text-lg font-semibold">1TDSPG</h2>
                    <h2 className="mt-2 text-lg font-semibold">Link Git</h2>
                </div>
                
                <div className="w-[380px] h-[480px] p-8 border flex flex-col gap-2 justify-center items-center border-black rounded-lg shadow-md bg-white">
                    <Image className=" max-h-[70%] rounded-full" src={fotoMarcelo} alt="Integrante Marcelo" width={200} height={200} />
                    <h2 className="mt-2 text-lg font-semibold">Marcelo Siqueira Bonfim</h2>
                    <h2 className="mt-2 text-lg font-semibold">RM - 558957</h2>
                    <h2 className="mt-2 text-lg font-semibold">1TDSPG</h2>
                    <h2 className="mt-2 text-lg font-semibold">Link Git</h2>
                </div>

                <div className="w-[380px] h-[480px] p-8 border flex flex-col gap-2 justify-center items-center border-black rounded-lg shadow-md bg-white">
                    <Image className=" max-h-[70%] rounded-full" src={fotoVictor} alt="Integrante Victor" width={200} height={200} />
                    <h2 className="mt-2 text-lg font-semibold">Victor Egidio Lira</h2>
                    <h2 className="mt-2 text-lg font-semibold">RM - 558957</h2>
                    <h2 className="mt-2 text-lg font-semibold">1TDSPG</h2>
                    <h2 className="mt-2 text-lg font-semibold">Link Git</h2>
                </div>
                
            </div>

            <div>
                <a href="https://github.com/kauazipf/MKV-CHALLENGE-FINAL" 
                target="_blank">Repositório Github</a>
            </div>
        </>
    )
}