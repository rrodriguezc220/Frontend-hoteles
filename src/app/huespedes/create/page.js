"use client";

import { postCreateHuesped } from "@/services/huespedes";
import { useState } from "react";

export default function CreateHuesped() {
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const data = new FormData(e.target);
        const result = await postCreateHuesped(data);
        if (result?.errors) {
            setErrors(result.errors);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="py-4" >
                    <div className="bg-[#f2f8f9] rounded-lg shadow-lg overflow-hidden mx-auto max-w-2xl lg:max-w-4xl">
                        <div className="pt-8">
                            <p className="text-xl text-center font-bold">Crear Huesped!</p>
                        </div>
                        <div className="md:flex md:p-0 p-8">
                            <div className="w-full md:w-1/2 md:p-8">
                                <div className="mt-4">
                                    <label className="block text-sm font-bold mb-2">Nombres</label>
                                    <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="nombreHuesped" type="text" />
                                    {errors?.nombreHuesped && <p className="text-red-600">{errors?.nombreHuesped}</p>}
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-bold mb-2">DNI</label>
                                    <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="dniHuesped" type="text" minLength={8} maxLength={8} />
                                    {errors?.dniHuesped && <p className="text-red-600">{errors?.dniHuesped}</p>}
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-bold mb-2">Dirección</label>
                                    <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="direccionHuesped" type="text" />
                                    {errors?.direccionHuesped && <p className="text-red-600">{errors?.direccionHuesped}</p>}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 md:p-8">
                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <label className="block text-sm font-bold mb-2">Teléfono</label>
                                    </div>
                                    <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="telefonoHuesped" type="text" minLength={9} maxLength={9}/>
                                    {errors?.telefonoHuesped && <p className="text-red-600">{errors?.telefonoHuesped}</p>}
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-bold mb-2">Correo</label>
                                    <input className="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:border-[#3c697e]" name="correoHuesped" type="email" />
                                    {errors?.correoHuesped && <p className="text-red-600">{errors?.correoHuesped}</p>}
                                </div>
                                <div>
                                    {errors?.token && <p className="text-red-600">{errors?.token}</p>}
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <button type="submit" className="btn-p h-[2.5rem] font-bold w-1/2" >Registrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div>
    );
}