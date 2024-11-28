import { useState,useEffect } from "react"





export const Producto = () => {

    const API = import.meta.env.VITE_APP_API_KEY;

    
    const [productoId, setProductoId] = useState();
    const [cantStock, setCantStock] = useState();
    const [precio, setPrecio] = useState();
    
    
    let [productos, setProductos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`${API}/producto/`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                productoId,
                cantStock,
                precio
            }),
        })
            .then((r) => getProductos())
            .catch((err) => alert(err));
    };


    async function getProductos() {
        fetch(`${API}/producto/`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((r) => r.json())
            .then((r) => getProductos(r));
    }

    useEffect(() => {
        getProductos();
    }, []);

  return (
    <div className="w-1/2 ">
            <div className="flex space-x-12">
                <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Id del Producto
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 42"
                            onChange={(e) => setProductoId(e.target.value)}
                            value={productoId}
                        />
                    </div>
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Apellido"
                        >
                            Cantidad del Stock
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: Torrez"
                            onChange={(e) => setCantStock(e.target.value)}
                            value={cantStock}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Run"
                        >
                            Precio
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 4000"
                            onChange={(e) => setPrecio(e.target.value)}
                            value={precio}
                        />
                    </div>

                    
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Crear producto
                        </button>
                    </div>
                </form>


                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-4 py-2">Id</th>
                            <th className="w-1/4 px-4 py-2">Cantidad</th>
                            <th className="w-1/4 px-4 py-2">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto._id}>
                                <td className="border px-4 py-2">{producto.productoId}</td>
                                <td className="border px-4 py-2">{producto.cantStock}</td>
                                <td className="border px-4 py-2">{producto.precio}</td>
                                <td>
                                    <button
                                        /*
                                        onClick={(e) => editarProducto(producto.id)}
                                        */
                                    >
                                        Editar
                                    </button>
                                    <button
                                        /*
                                        onClick={(e) => EliminarProductp(producto.id)}
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
  )
}
