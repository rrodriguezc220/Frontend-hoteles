"use client";

import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import NavLinks from './NavLinks';
import ButtonAuth from '../access/ButtonAuth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#ddecf0]" >
            <div className="p-4 max-w-[1280px] mx-auto flex justify-between items-center">
                <div>
                    <a className="flex items-center" href='/'>
                        <img src="../logo_313x307.png" alt="Logo" className="h-8 w-8 mr-2" />
                        <span className="text-xl">Hotel</span>
                    </a>
                </div>
                <div className="hidden md:flex space-x-4">
                    <NavLinks />
                    <div>
                        <ButtonAuth />
                        {/* Para usar el ícono importado se usa de la manera anterior */}
                    </div>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isOpen ? <IoMdClose className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col items-center">
                    <NavLinks />
                    <div>
                        <ButtonAuth />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;