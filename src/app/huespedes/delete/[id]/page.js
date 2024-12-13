import CardHuesped from "@/components/huespedes/CardHuesped";
import CardHuespedSkeleton from "@/components/skeletons/CardHuespedSkeleton";
import { Suspense } from "react";


export default async function Delete({ params }) {

    const id = (await params).id;

    return (
        <div className="p-8">
            <Suspense key={id} fallback={<CardHuespedSkeleton />}>
                <CardHuesped id={id} />
            </Suspense>
        </div>
    );
}