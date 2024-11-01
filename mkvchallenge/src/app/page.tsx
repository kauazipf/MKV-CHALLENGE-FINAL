import banner from './../../public/images/banner-porto-seguro.png'
import imgPorto from './../../public/images/image-porto-seguro.png'
import Image from "next/image";

export default function Home(){
    return(
        <>
            <main>
                <div>
                    <Image src={banner} alt='Banner da Porto Seguro'/>
                </div>

                <div>
                    <p> Nossa solução, seria a MVK Ltda, uma empresa que representa uma abordagem inovadora para otimizar o
                        processo de reparação automotiva em parceria com a Porto Seguro. Este
                        documento detalha como nossa solução pode resolver os desafios enfrentados atualmente pela Porto Seguro.
                        A MVK Ltda é uma plataforma online que
                        revoluciona o modo como a Porto Seguro lida com reparos automotivos. Utilizando tecnologias avançadas e
                        inovadoras, como inteligência artificial e
                        automação de processos, nossa solução simplifica tudo, como, o processo, desde o diagnóstico inicial até
                        a conclusão do serviço. </p>
                    <Image src={imgPorto} alt='Imagem da Porto Seguro'/>
                </div>
            </main>
        </>
    )
}