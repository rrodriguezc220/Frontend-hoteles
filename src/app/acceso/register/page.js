"use client";

import { postRegister } from "@/services/access";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const data = new FormData(e.target);
            const response = await postRegister(data);
            const username = data.get("username");
            const password = data.get("password");

            if (response.token) {
                const result = await signIn("credentials", {
                    email: username,
                    password: password,
                    redirect: false
                });

                setErrorMessage(null);
                if (result.error) {
                    setErrorMessage("Credenciales inválidas o error en el servidor.");
                } else {
                    window.location.href = "/";
                }

            } else {
                // Mostrar error
                setErrorMessage("Verifique la información ingresada.");
            }
        } catch (validationError) {
            setErrorMessage("Los datos ingresados no son válidos.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="py-4" >
                    <div className="bg-[#f2f8f9] flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                        <div className="hidden lg:block lg:w-1/2 bg-cover"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}>
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <p className="text-xl text-center">Regístrate!</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <Link href="/acceso/login/" className="text-xs text-gray-500 uppercase hover:text-yellow-600">o inicia sesión</Link>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-bold mb-2">Nombres</label>
                                <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="firstname" type="text" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-bold mb-2">Apellidos</label>
                                <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="lastname" type="text" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-bold mb-2">Username</label>
                                <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="username" type="email" />
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block text-sm font-bold mb-2">Contraseña</label>
                                </div>
                                <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="password" type="password" />
                            </div>
                            <div className="mt-4">
                                <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="rol" type="hidden" value="ADMIN" />
                                {/* Mostrar error si existe */}
                                {errorMessage && (
                                    <div className="mt-4 text-red-500 text-sm">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button type="submit" className="btn-p h-[2.5rem] font-bold w-1/2">Registrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}