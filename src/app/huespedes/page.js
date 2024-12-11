

import TableReservationSkeleton from "@/components/skeletons/TableReservationSkeleton";
import { Suspense } from "react";
import TableHuespedes from "@/components/huespedes/TableHuespedes";
import SearchHuespedes from "@/components/huespedes/SearchHuespedes";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

export default async function Huespedes({searchParams}) {

    const search = searchParams?.search || "";
    const currentPage = searchParams?.page || "1";

    return (
        <div className="p-4">
            <h1 className="text-center text-3xl mb-8">Reservaciones</h1>
            <div className="mb-8 flex space-x-2">
                <SearchHuespedes placeholder="Buscar Huesped..." />
                <Link href="/huespedes/create/" className="bg-green-600 text-white py-1 px-2 flex items-center justify-center rounded space-x-1 hover:bg-green-700"><IoAdd />
                <p>Crear Huesped</p></Link>
            </div>
            <Suspense key={search + currentPage} fallback={<TableReservationSkeleton />}>
                <TableHuespedes search={search} currentPage={currentPage} />
            </Suspense>
        </div>
    );
}
