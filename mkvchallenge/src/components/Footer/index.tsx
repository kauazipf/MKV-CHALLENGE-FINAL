import logoGmail from './../../../public/images/gmail.png'
import logoGithub from './../../../public/images/github.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer(){
    return(
        <footer className='bg-backgroundBlue text-white text-center p-16 text-xl max-h-[30vh] '>
            <nav>
                <ul className='flex justify-center gap-8 p-8 top-6'> 
                   <li> <a href="mailto:mktltda3@gmail.com" target='_blank'> <Image src={logoGmail} alt="Icone do Gmail" className='w-16'/> </a> </li> 
                   <li> <a href="https://github.com/kauazipf/MKV-CHALLENGE-FINAL" target='_blank'> <Image src={logoGithub} alt="Icone do GitHub" className='w-16'/> </a> </li>
                </ul>
            </nav>

            <nav>
                <Link href='/'> Home </Link>
                <Link href='/Participantes'> Sobre </Link>
            </nav>
            <p>© 2024 MKV Ltda. Todos os direitos reservados.</p>
        </footer>
    )
}