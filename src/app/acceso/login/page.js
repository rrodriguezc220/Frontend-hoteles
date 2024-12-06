"use client";

import ButtonAuth from "@/components/access/ButtonAuth";
import z from "zod";
import { loginSchema } from "@/services/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const username = data.get("username");
        const password = data.get("password");

        try {

            // Intentar iniciar sesión
            const result = await signIn("credentials", { username: username, password: password, redirect: false });

            console.log(result);

            if (result.error) {
                setErrorMessage("Credenciales inválidas o error en el servidor.");
            } else {
                setErrorMessage(null);
                // Redirigir al home
                window.location.href = "/";
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
                            <img src="../logo_313x307.png" className="h-36 w-36 mx-auto" />
                            <p className="text-xl text-center">Bienvenido!</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <span className="text-xs text-center text-gray-500 uppercase">Ingresa con tu email</span>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="username" type="email" />
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block text-sm font-bold mb-2">Contraseña</label>
                                </div>
                                <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="password" type="password" />
                            </div>
                            {/* Mostrar error si existe */}
                            {errorMessage && (
                                <div className="mt-4 text-red-500 text-sm">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="mt-8 flex justify-center">
                                <button type="submit" className="btn-p h-[2.5rem] font-bold w-1/2">Ingresar</button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 md:w-1/4"></span>
                                <a href="#" className="text-xs text-gray-500 uppercase hover:text-yellow-600">o regístrate</a>
                                <span className="border-b w-1/5 md:w-1/4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}