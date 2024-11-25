'use client';

import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                    <span className="text-white text-xl font-bold">Hotel</span>
                </div>
                <div className="hidden md:flex space-x-4">
                    <a href="#" className="text-white hover:text-gray-400">Home</a>
                    <a href="#" className="text-white hover:text-gray-400">About</a>
                    <a href="#" className="text-white hover:text-gray-400">Services</a>
                    <a href="#" className="text-white hover:text-gray-400">Contact</a>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? <IoMdClose className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <a href="/" className="block text-white hover:text-gray-400 p-2">Home</a>
                    <a href="/reservaciones" className="block text-white hover:text-gray-400 p-2">Reservaciones</a>
                    <a href="/huespedes" className="block text-white hover:text-gray-400 p-2">Huespedes</a>
                    <a href="/habitaciones" className="block text-white hover:text-gray-400 p-2">Habitaciones</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;