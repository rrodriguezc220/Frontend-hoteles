"use client";

import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { CiLogin, CiLogout, CiUser } from "react-icons/ci";
import { useState } from 'react';

export default function ButtonAuth() {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session) {

        return (

            <div className="relative">
                <button onClick={toggleMenu} className="btn-p w-12 h-8">
                    <CiUser />
                </button>

                {isMenuOpen && (
                    <ul className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                        <li className="border-b">
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg" >
                                {session.user?.email}
                            </a>
                        </li>
                        <li>
                            <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg" >
                                <CiLogout className="inline-block mr-2" /> Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        );
    }
    return (
        <>
            <Link href="/acceso/login/" className="btn-p"><CiLogin className='me-2' />  Ingresa</Link>
        </>
    );
}