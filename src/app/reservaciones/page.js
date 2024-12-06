

import SearchReservation from "@/components/reservations/SearchReservation";
import TableReservation from "@/components/reservations/TableReservation";
import TableReservationSkeleton from "@/components/skeletons/TableReservationSkeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

import { Suspense } from "react";

export default async function Reservaciones({searchParams}) {

    const session = await getServerSession(authOptions);
    const search = searchParams?.search || "";
    const currentPage = searchParams?.page || "1";
    const token = session?.user?.token || "";

    return (
        <div className="p-4">
            <h1 className="text-center text-3xl mb-8">Reservaciones</h1>
            <div className="mb-8">
                <SearchReservation placeholder="Buscar Cliente..." />
            </div>
            <Suspense key={search + currentPage} fallback={<TableReservationSkeleton />}>
                <TableReservation search={search} currentPage={currentPage} token={token} />
            </Suspense>
        </div>
    );
}
