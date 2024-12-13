import { deleteHuesped, getHuesped } from "@/services/huespedes";

export default async function CardHuesped({ id }) {

    const huesped = await getHuesped(id);
    const data = huesped || {};

    return (
        <>
            <div className="p-8">
                <div className="p-8 bg-[#f2f8f9] rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm" >
                    <h5 className="text-3xl font-bold text-center mb-4">Eliminar huesped</h5>
                    {/* Mostrar detalle del huesped */}
                    <p>Nombre</p>
                    <p className="font-bold mb-4">{data.nombreHuesped}</p>
                    <p>DNI</p>
                    <p className="font-bold mb-4">{data.dniHuesped}</p>
                    <p>Dirección</p>
                    <p className="font-bold mb-4">{data.direccionHuesped}</p>
                    <p>Teléfono</p>
                    <p className="font-bold mb-4">{data.telefonoHuesped}</p>
                    <p>Correo</p>
                    <p className="font-bold mb-4">{data.correoHuesped}</p>
                    <div className="flex justify-center">
                        <form action={deleteHuesped}>
                            <input type="hidden" name="id" value={id} />
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Eliminar</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}