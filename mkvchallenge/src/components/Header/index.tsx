'use client'

import Image from "next/image";
import logo from './../../../public/images/logo.png'
import imgMenu from './../../../public/images/menu.png'
import imgLogin from './../../../public/images/login.png'
import Link from "next/link";
import { useState } from "react";

export default function Header(){

    const [menuStyle, setMenuStyle] = useState({ display: 'none' });

    const toggleMenu = () => {
        if (menuStyle.display === 'block') {
        setMenuStyle({ display: 'none' });
        } else {
        setMenuStyle({ display: 'block' });
        }
    };

    return (
        <header className="max-h-[50vh] max-w-[100vw] bg-backgroundBlue relative p-14 text-center"> 
            <Image 
                src={imgMenu} 
                alt="Imagem de menu" 
                onClick={toggleMenu} 
                className="w-20 absolute top-16 invert cursor-pointer" 
            />
            
            <Image 
                src={logo} 
                alt="Imagem da logo" 
                className="w-28 inline-block" 
            />

            <Link href='/Login'>
                <Image 
                    src={imgLogin} 
                    alt="Imagem de login" 
                    className="w-20 right-20 absolute top-16 invert" 
                />
            </Link>

            <div style={menuStyle} className="absolute p-12 z-auto bg-backgroundBlue text-2xl">
                <Link href="/" className="p-6 font-semibold text-white text-left block"> Home </Link>
                <Link href="/Carros" className="p-6 font-semibold text-white text-left block"> Carros </Link>
                <Link href="/Chatbot" className="p-6 font-semibold text-white text-left block"> Chatbot </Link>
                <Link href="/Servicos" className="p-6 font-semibold text-white text-left block"> Serviços </Link>
                <Link href="/Integrantes" className="p-6 font-semibold text-white text-left block"> Integrantes </Link>
            </div>
        </header>
    )
}