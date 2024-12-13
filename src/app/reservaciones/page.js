
import { auth } from "@/auth";
import SearchReservation from "@/components/reservations/SearchReservation";
import TableReservation from "@/components/reservations/TableReservation";
import TableReservationSkeleton from "@/components/skeletons/TableReservationSkeleton";
import { Suspense } from "react";

export default async function Reservaciones({searchParams}) {

    const session = await auth();
    const search = (await searchParams)?.search || "";
    const currentPage = (await searchParams)?.page || "1";

    if (session?.user?.role !== "ADMIN") {
        return <h1>No tienes permisos para acceder a esta página</h1>;
    }

    return (
        <div className="max-w-[1280px] mx-auto p-4">
            <h1 className="text-center text-3xl mb-8">Reservaciones</h1>
            <div className="mb-8">
                <SearchReservation placeholder="Buscar Cliente..." />
            </div>
            <Suspense key={search + currentPage} fallback={<TableReservationSkeleton />}>
                <TableReservation search={search} currentPage={currentPage} />
            </Suspense>
        </div>
    );
}
