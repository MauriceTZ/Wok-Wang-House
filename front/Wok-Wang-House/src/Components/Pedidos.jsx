import { useState } from "react"

export const Pedidos = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const [idPedido, setIdPedidos] = useState();
    const [precioTotal, setPrecioTotal] = useState();
    const [numBol, setNumBol] = useState();


    let [pedidos, setPedidos] = useState([]);


  return (
    <div className="w-1/2 ">
            <div className="flex space-x-8">
                <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Id Pedido
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: Mauricio"
                            onChange={(e) => setIdPedidos(e.target.value)}
                            value={idPedido}
                        />
                    </div>
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Apellido"
                        >
                            Precio Total
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: Torrez"
                            onChange={(e) => setPrecioTotal(e.target.value)}
                            value={precioTotal}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Run"
                        >
                            numBol
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 20.820.467-K"
                            onChange={(e) => setNumBol(e.target.value)}
                            value={numBol}
                        />
                    </div>

                    
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Crear Pedido
                        </button>
                    </div>
                </form>


                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-4 py-2">Id</th>
                            <th className="w-1/4 px-4 py-2">PrecioTotal</th>
                            <th className="w-1/4 px-4 py-2">numBol</th>
                            <th className="w-1/4 px-4 py-2">Estado</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido._id}>
                                <td className="border px-4 py-2">{pedido.idPedido}</td>
                                <td className="border px-4 py-2">{pedido.precioTotal}</td>
                                <td className="border px-4 py-2">{pedido.numBol}</td>
                                <td className="border px-4 py-2">{pedido.estado}</td>
                                <td>
                                    <button
                                        /*
                                        onClick={(e) => editarEmpleado(empleado.rut)}
                                        */
                                    >
                                        Editar
                                    </button>
                                    <button
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
  )
}
