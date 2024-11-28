import { useEffect, useState } from "react";

export const Pedidos = () => {
    const API = import.meta.env.VITE_APP_API_KEY;

    const [run_cajero, setRUNCajero] = useState("");
    const [run_cocinero, setRUNCocinero] = useState("");
    const [run_mesero, setRUNMesero] = useState("");

    let [pedidos, setPedidos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`${API}/pedido/`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                run_cajero,
                run_cocinero,
                run_mesero,
            }),
        })
            .then((r) => getPedidos())
            .catch((err) => alert(err));
    };

    async function getPedidos() {
        fetch(`${API}/pedido/`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((r) => r.json())
            .then((r) => setPedidos(r));
    }
    async function editarPedido(pedido) {
        fetch(`${API}/pedido/${pedido[0]}`, {
            method: "PUT",
            body: JSON.stringify({
                precio_total: pedido[1],
                estado: pedido[7],
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((r) => getPedidos())
            .catch((err) => alert(err));
    }
    async function eliminarPedido(pedido) {
        const userResponse = window.confirm("Seguro que quiere eliminarlo?");
        if (!userResponse) return;
        fetch(`${API}/pedido/${pedido[0]}`, {
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((r) => getPedidos())
            .catch((err) => alert(err));
    }
    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div className="w-1/2 ">
            <div className="flex space-x-8">
                <form
                    className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="run_cajero"
                        >
                            RUN Cajero
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 20200200-2"
                            onChange={(e) => setRUNCajero(e.target.value)}
                            value={run_cajero}
                        />
                    </div>
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="run_cocinero"
                        >
                            RUN Cocinero
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 20200200-2"
                            onChange={(e) => setRUNCocinero(e.target.value)}
                            value={run_cocinero}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="run_mesero"
                        >
                            RUN Mesero
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 20200200-2"
                            onChange={(e) => setRUNMesero(e.target.value)}
                            value={run_mesero}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Crear Pedido
                        </button>
                    </div>
                </form>

                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-4 py-2">Pedido ID</th>
                            <th className="w-1/4 px-4 py-2">Precio Total</th>
                            <th className="w-1/4 px-4 py-2">
                                Número de Boleta
                            </th>
                            <th className="w-1/4 px-4 py-2">Fecha</th>
                            <th className="w-1/4 px-4 py-2">RUN Cajero</th>
                            <th className="w-1/4 px-4 py-2">RUN Cocinero</th>
                            <th className="w-1/4 px-4 py-2">RUN Mesero</th>
                            <th className="w-1/4 px-4 py-2">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido}>
                                <td className="border px-4 py-2">
                                    {pedido[0]}
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder={pedido[1]}
                                        onChange={(e) => {
                                            pedido[1] =
                                                e.target.value ||
                                                e.target.placeholder;
                                        }}
                                        size="5"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    {pedido[2]}
                                </td>
                                <td className="border px-4 py-2">
                                    {pedido[3]}
                                </td>
                                <td className="border px-4 py-2">
                                    {pedido[4]}
                                </td>
                                <td className="border px-4 py-2">
                                    {pedido[5]}
                                </td>
                                <td className="border px-4 py-2">
                                    {pedido[6]}
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        name="EstadoPedido"
                                        id=""
                                        onChange={(e) => {
                                            pedido[7] = e.target.value;
                                        }}
                                        defaultValue={pedido[7].toString()}
                                    >
                                        <option value="0">
                                            No Listo (por defecto)
                                        </option>
                                        <option value="1">Listo</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                                        /*
                                        onClick={(e) => editarEmpleado(empleado.rut)}
                                        */
                                    >
                                        Agregar Producto
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                                        onClick={(e) => editarPedido(pedido)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                                        onClick={(e) => eliminarPedido(pedido)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-center text-gray-500 text-xs">
                ©2024 Wok-Wang-House Corp. All rights reserved.
            </p>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="fixed inset-0 bg-gray-500/75 transition-opacity"
                    aria-hidden="true"
                ></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <svg
                                            className="size-6 text-red-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3
                                            className="text-base font-semibold text-gray-900"
                                            id="modal-title"
                                        >
                                            Deactivate account
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to
                                                deactivate your account? All of
                                                your data will be permanently
                                                removed. This action cannot be
                                                undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Deactivate
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
