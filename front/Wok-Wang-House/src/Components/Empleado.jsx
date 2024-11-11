import { useState } from "react"





export const Empleado = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [run, setRun] = useState();
    const [correo, setCorreo] = useState();
    const [contraseña, setContraseña] = useState();
    const [telefono, setTelefono] = useState();

    let [empleados, setEmpleado] = useState([]);

    /*
    const API = process.env.REACT_APP_API;
    */
    return (
        <div className="w-1/2 ">
            <div className="flex space-x-8">
                <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: Mauricio"
                            onChange={(e) => setNombre(e.target.value)}
                            value={nombre}
                        />
                    </div>
                    <div className="mb-4 display: inline-block;">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Apellido"
                        >
                            Apellido
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: Torrez"
                            onChange={(e) => setApellido(e.target.value)}
                            value={apellido}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Run"
                        >
                            Rut
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 20.820.467-K"
                            onChange={(e) => setRun(e.target.value)}
                            value={run}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="telefono"
                        >
                            Telefono
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: 20.820.467-K"
                            onChange={(e) => setTelefono(e.target.value)}
                            value={telefono}
                        />
                    </div>

                    <div className="w-full mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-state"
                        >
                            Puesto
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                            >
                                <option>cocinero</option>
                                <option>cajero</option>
                                <option>mesero</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="correo"
                        >
                            Correo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ex: example@mail.com"
                            onChange={(e) => setCorreo(e.target.value)}
                            value={correo}
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="contraseña"
                        >
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="******************"
                            onChange={(e) => setContraseña(e.target.value)}
                            value={contraseña}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Crear Empleado
                        </button>
                    </div>
                </form>


                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-4 py-2">Nombre</th>
                            <th className="w-1/4 px-4 py-2">Apelido</th>
                            <th className="w-1/4 px-4 py-2">Rut</th>
                            <th className="w-1/4 px-4 py-2">Telefono</th>
                            <th className="w-1/4 px-4 py-2">Puesto</th>
                            <th className="w-1/4 px-4 py-2">Correo</th>
                            <th className="w-1/4 px-4 py-2">Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado) => (
                            <tr key={empleado._id}>
                                <td className="border px-4 py-2">{empleado.nombre}</td>
                                <td className="border px-4 py-2">{empleado.apellido}</td>
                                <td className="border px-4 py-2">{empleado.run}</td>
                                <td className="border px-4 py-2">{empleado.telefono}</td>
                                <td className="border px-4 py-2">{empleado.puesto}</td>
                                <td className="border px-4 py-2">{empleado.contraseña}</td>
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
