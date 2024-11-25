import Table from "@/components/reservations/Table";
import { getReservations } from "@/services/reservations";

export default async function Reservaciones() {

    let reservaciones = await getReservations();

    console.log(reservaciones);
    return (
        <>
            <h1 className="text-center text-3xl ">Reservaciones</h1>
            <p>Reservaciones del día</p>

            <Table reservas={reservaciones}/>
        </>
    );
}
