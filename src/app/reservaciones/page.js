"use client";

import SearchReservation from "@/components/reservations/SearchReservation";
import TableReservation from "@/components/reservations/TableReservation";
import TableReservationSkeleton from "@/components/skeletons/TableReservationSkeleton";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

export default function Reservaciones() {

    const { data: session, status } = useSession();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") || "";
    const currentPage = searchParams.get("page") || "1";
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
