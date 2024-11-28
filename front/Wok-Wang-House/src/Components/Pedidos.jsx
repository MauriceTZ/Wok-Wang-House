import { useEffect, useState } from "react";

export const Pedidos = () => {
    const API = import.meta.env.VITE_APP_API_KEY;

    const [run_cajero, setRUNCajero] = useState("");
    const [run_cocinero, setRUNCocinero] = useState("");
    const [run_mesero, setRUNMesero] = useState("");
    const [showModal, setShowModal] = useState(false);

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
    async function agregarProducto(producto) {
        setShowModal(true);
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
                                        onClick={(e) => agregarProducto(pedido)}
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
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                    <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Delete account ?
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua.
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-400 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};
