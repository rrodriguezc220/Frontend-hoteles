"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";


const PATH = process.env.NEXT_PUBLIC_BACKEND_URL;

const huespedSchema = z.object({
    nombreHuesped: z.string().min(1, { message: "El nombre es requerido" }),
    dniHuesped: z.string().regex(/^\d{8}$/, { message: "El DNI debe tener exactamente 8 dígitos" }),
    direccionHuesped: z.string().min(1, { message: "La dirección es requerida" }),
    telefonoHuesped: z.string().regex(/^9\d{8}$/, { message: "El teléfono debe tener exactamente 9 dígitos y empezar con 9" }),
    correoHuesped: z.string().email({ message: "El correo debe ser válido" }),
});

const ITEMS_PER_PAGE = 6;

// funcion que obtiene el token en este servicio sin exportar
async function getToken() {
    const session = await auth();
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

export async function postCreateHuesped(formData) {

    const resValidation = huespedSchema.safeParse({
        nombreHuesped: formData.get("nombreHuesped"),
        dniHuesped: formData.get("dniHuesped"),
        direccionHuesped: formData.get("direccionHuesped"),
        telefonoHuesped: formData.get("telefonoHuesped"),
        correoHuesped: formData.get("correoHuesped"),
    });

    if (!resValidation.success) {
        const fieldErrors = {};
        resValidation.error.errors.forEach(error => {
            fieldErrors[error.path[0]] = error.message;
        });
        return { errors: fieldErrors };
    }

    let res = {};

    try {
        const token = await getToken();

        const response = await fetch(`${PATH}/huespedes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-version": "1",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(resValidation.data),
        });

        res = await response.json();
        if (!res.success) {
            return { errors: { token: res.message } };
        }
    } catch (error) {
        return { errors: { token: "Token expirado" } };
    }

    if (res.success) {
        revalidatePath("/huespedes");
        redirect("/huespedes");
    } else {
        return { entradas: "Verifique que los datos son corectos" }
    }
}

export async function getHuesped(id) {

    try {
        const token = await getToken();

        const response = await fetch(`${PATH}/huespedes/${id}`, {
            method: "GET",
            headers: {
                "api-version": "1",
                authorization: `Bearer ${token}`
            },
        });

        const res = await response.json();

        if (res.success) {
            return res.data;
        } else {
            console.log(res);
        }
    } catch (error) {
        return {};
    }
}

export async function deleteHuesped(formData) {
    const id = formData.get("id");
    let res = {};
    try {
        const token = await getToken();

        const response = await fetch(`${PATH}/huespedes/${id}`, {
            method: "DELETE",
            headers: {
                "api-version": "1",
                authorization: `Bearer ${token}`
            },
        });
        res = await response.json();
    } catch (error) {
        return { errors: { token: "Token expirado" } };
    }


    if (res.success) {
        revalidatePath("/huespedes");
        redirect("/huespedes");
    } else {
        return { errors: { token: res?.message } };
    }
}