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
                                            pedido[1] = e.target.value;
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
                                        /*
                                        onClick={(e) => editarEmpleado(empleado.rut)}
                                        */
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                                        /*
                                        onClick={(e) => eliminarEmpleado(empleado.rut)}
                                        */
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
        </div>
    );
};
