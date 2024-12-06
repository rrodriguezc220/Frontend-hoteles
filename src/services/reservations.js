
const PATH = process.env.NEXT_PUBLIC_BACKEND_URL;

// Crear modelo de Reserva con usuario y habitación
let Reserva = {
    idReserva: 0,
    fechaInicio: "",
    fechaFin: "",
    estado: false,
    huesped: {
        idHuesped: 0,
        nombreHuesped: "",
        dniHuesped: "",
        correoHuesped: "",
        direccionHuesped: "",
        telefonoHuesped: "",
    },
    habitacion: [],
};

const ITEMS_PER_PAGE = 6;

export async function getReservations(search, currentPage, token) {
    try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const response = await fetch(`${PATH}/reservas`, {
            method: "GET",
            headers: {
                "api-version": "1",
                authorization: `Bearer ${token}`
            },
        });

        const res = await response.json();

        let data = [];
        let huespesMap = new Map();

        if (res && res.data.length > 0) {
            res.data = res.data.map((item) => {
                let reserva = Object.create(Reserva);
                let huesped = Object.create(Reserva.huesped);

                reserva.idReserva = item.idReserva;
                reserva.fechaInicio = item.fechaInicio;
                reserva.fechaFin = item.fechaFin;
                reserva.estado = item.estado;

                huesped = {
                    idHuesped: item.huesped.idHuesped,
                    nombreHuesped: item.huesped.nombreHuesped,
                    dniHuesped: item.huesped.dniHuesped,
                    correoHuesped: item.huesped.correoHuesped,
                    direccionHuesped: item.huesped.direccionHuesped,
                    telefonoHuesped: item.huesped.telefonoHuesped,
                }

                if (item.huesped.idHuesped != null) {
                    huespesMap.set(huesped.idHuesped, huesped);
                    reserva.huesped = huespesMap.get(item.huesped.idHuesped);
                } else {
                    reserva.huesped = huespesMap.get(item.huesped);
                }

                reserva.habitacion = item.habitacion;

                data.push(reserva);
            });
        }

        //filtrar por la búsqueda
        if (search) {
            data = data.filter((item) =>
                item.huesped.nombreHuesped.toLowerCase().includes(search.toLowerCase())
            );
        }

        const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

        const paginatedData = data.slice(offset, offset + ITEMS_PER_PAGE);

        return {paginatedData, totalPages};

    } catch (error) {
        return [];
    }
}
