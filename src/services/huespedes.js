"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const PATH = process.env.NEXT_PUBLIC_BACKEND_URL;

// Modelo de huespedes

// let Huesped = {
//     idHuesped: 0,
//     nombreHuesped: "",
//     dniHuesped: "",
//     correoHuesped: "",
//     direccionHuesped: "",
//     telefonoHuesped: "",
// };

const ITEMS_PER_PAGE = 6;

// funcion que obtiene el token en este servicio sin exportar
async function getToken() {
    const session = await getServerSession(authOptions);
    return session?.user?.token || "";
}

export async function getHuespedes(search, currentPage) {
    try {

        const token = await getToken();

        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const response = await fetch(`${PATH}/huespedes`, {
            method: "GET",
            headers: {
                "api-version": "1",
                authorization: `Bearer ${token}`
            },
        });

        const res = await response.json();

        let data = res.data || [];

        //filtrar por la búsqueda
        if (search) {
            data = data.filter((item) =>
                item.nombreHuesped.toLowerCase().includes(search.toLowerCase())
            );
        }

        const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

        const paginatedData = data.slice(offset, offset + ITEMS_PER_PAGE);

        return { paginatedData, totalPages };

    } catch (error) {
        return [];
    }
}

export async function createHuesped(formData) {

    const token = await getToken();

    const rawFormData = {
        nombreHuesped: formData.get("nombreHuesped"),
        dniHuesped: formData.get("dniHuesped"),
        direccionHuesped: formData.get("direccionHuesped"),
        telefonoHuesped: formData.get("telefonoHuesped"),
        correoHuesped: formData.get("correoHuesped"),
    }

    const response = await fetch(`${PATH}/huespedes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-version": "1",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(rawFormData)
    });

    const res = await response.json();

    if (res.success) {
        revalidatePath("/huespedes");
        redirect("/huespedes");
    } else {
        console.log(res.data);
    }
}