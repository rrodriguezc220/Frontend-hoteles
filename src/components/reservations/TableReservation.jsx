import { getReservations } from "@/services/reservations";
import Pagination from "./Pagination";
import { MdDeleteOutline, MdEdit, MdFormatListBulleted  } from "react-icons/md";

export default async function TableReservation({ search, currentPage, token }) {
    let reservas = await getReservations(search, currentPage, token);
    let data = reservas.paginatedData || [];
    let totalPages = reservas.totalPages || 0;

    return (
        <div className="flex flex-col">
            <div className=" overflow-x-auto pb-4">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden  border rounded-lg border-gray-300">
                        <table className="table-auto min-w-full rounded-xl">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Código </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"> Huesped &amp; Email </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> DNI </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Teléfono </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> F. Inicio </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> F. Fin </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Estado </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 ">

                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index} className="bg-white transition-all duration-500 hover:bg-gray-50">
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{item.idReserva}</td>
                                            <td className=" px-5 py-3">
                                                <div className="w-48 flex items-center gap-3">
                                                    <img src="https://pagedone.io/asset/uploads/1697536419.png" alt="Floyd image" />
                                                    <div className="data">
                                                        <p className="font-normal text-sm text-gray-900">{item.huesped.nombreHuesped}</p>
                                                        <p className="font-normal text-xs leading-5 text-gray-400">{item.huesped.correoHuesped}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.huesped.dniHuesped}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.huesped.telefonoHuesped}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.fechaInicio}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.fechaFin}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                {item.estado ? (
                                                    <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                                                        <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="2.5" cy="3" r="2.5" fill="#059669"></circle>
                                                        </svg>
                                                        <span className="font-medium text-xs text-emerald-600">Active</span>
                                                    </div>
                                                ) : (
                                                    <div className="py-1.5 px-2.5 bg-red-50 rounded-full flex justify-center w-20 items-center gap-1">
                                                        <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="2.5" cy="3" r="2.5" fill="#DC2626"></circle>
                                                        </svg>
                                                        <span className="font-medium text-xs text-red-600">Inactive</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="flex p-5 items-center gap-0.5">
                                                <button className="p-2 rounded-full group transition-all duration-500 hover:bg-yellow-500 flex item-center text-yellow-500 hover:text-white">
                                                    <MdEdit />
                                                </button>
                                                <button className="p-2  rounded-full group transition-all duration-500 hover:bg-indigo-600 flex item-center text-indigo-600 hover:text-white">
                                                    <MdFormatListBulleted />
                                                </button>
                                                <button className="p-2 rounded-full group transition-all duration-500 hover:bg-red-600 flex item-center text-red-600 hover:text-white">
                                                    <MdDeleteOutline />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center p-5 text-sm text-gray-500">
                                            No hay datos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}

