
import { getHuespedes } from "@/services/huespedes";
import Pagination from "../commons/Pagination";
import { MdDeleteOutline, MdEdit, MdFormatListBulleted  } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";

export default async function TableHuespedes({ search, currentPage }) {

    let huespedes = await getHuespedes(search, currentPage);
    let data = huespedes.paginatedData || [];
    let totalPages = huespedes.totalPages || 0;

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
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Dirección </th>
                                    <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 ">

                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index} className="bg-white transition-all duration-500 hover:bg-gray-50">
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{item.idHuesped}</td>
                                            <td className=" px-5 py-3">
                                                <div className="w-48 flex items-center gap-3">
                                                    <FaRegUser />
                                                    <div className="data">
                                                        <p className="font-normal text-sm text-gray-900">{item.nombreHuesped}</p>
                                                        <p className="font-normal text-xs leading-5 text-gray-400">{item.correoHuesped}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.dniHuesped}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.telefonoHuesped}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.direccionHuesped}</td>
                                            <td className="flex p-5 items-center gap-0.5">
                                                {/* <Link className="p-2 rounded-full group transition-all duration-500 hover:bg-yellow-500 flex item-center text-yellow-500 hover:text-white">
                                                    <MdEdit />
                                                </Link>
                                                <Link className="p-2  rounded-full group transition-all duration-500 hover:bg-indigo-600 flex item-center text-indigo-600 hover:text-white">
                                                    <MdFormatListBulleted />
                                                </Link> */}
                                                <Link className="p-2 rounded-full group transition-all duration-500 hover:bg-red-600 flex item-center text-red-600 hover:text-white" href={`/huespedes/delete/${item.idHuesped}`} >
                                                    <MdDeleteOutline />
                                                </Link>
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

