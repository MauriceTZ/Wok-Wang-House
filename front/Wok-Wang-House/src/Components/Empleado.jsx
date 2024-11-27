import { useEffect, useState } from "react";

export const Empleado = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [run, setRun] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [telefono, setTelefono] = useState("");
    const [puesto, setPuesto] = useState("cocinero");
    const [turno, setTurno] = useState("mañana");

    let [empleados, setEmpleado] = useState([]);

    const API = import.meta.env.VITE_APP_API_KEY;

    async function getUsers() {
        let emps = [];
        let res = await fetch(`${API}/empleado/cocinero`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        res = await res.json();
        for (let index = 0; index < res.length; index++) {
            res[index][9] = "cocinero";
        }
        emps.push(...res);

        res = await fetch(`${API}/empleado/cajero`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        res = await res.json();
        for (let index = 0; index < res.length; index++) {
            res[index][9] = "cajero";
        }
        emps.push(...res);

        res = await fetch(`${API}/empleado/mesero`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        res = await res.json();
        for (let index = 0; index < res.length; index++) {
            res[index][9] = "mesero";
        }
        emps.push(...res);
        setEmpleado(emps);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`${API}/empleado/${puesto}`, {
            method: "POST",
            body: JSON.stringify({
                nombre,
                apellido,
                run,
                correo,
                contraseña,
                telefono,
                turno,
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((r) => {
                getUsers();
            })
            .catch((err) => alert(err));
        setNombre("");
        setApellido("");
        setRun("");
        setCorreo("");
        setContraseña("");
        setTelefono("");
    };

    const eliminarEmpleado = async (emp) => {
        const userResponse = window.confirm("Seguro que quiere eliminarlo?");
        if (userResponse) {
            fetch(`${API}/empleado/${emp[9]}/${emp[2]}`, {
                method: "DELETE",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((r) => getUsers())
                .catch((err) => alert(err));
        }
    };

    const editarEmpleado = async (emp) => {
        fetch(`${API}/empleado/${emp[9]}/${emp[2]}`, {
            method: "PUT",
            body: JSON.stringify({
                nombre: emp[0],
                apellido: emp[1],
                correo: emp[3],
                contraseña: emp[4],
                telefono: emp[5],
                turno: emp[6],
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((r) => getUsers())
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getUsers();
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
                                value={puesto}
                                onChange={(e) => setPuesto(e.target.value)}
                            >
                                <option value="cocinero">Cocinero</option>
                                <option value="cajero">Cajero</option>
                                <option value="mesero">Mesero</option>
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
                            type="submit"
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
                            <th className="w-1/4 px-4 py-2">RUN</th>
                            <th className="w-1/4 px-4 py-2">Correo</th>
                            <th className="w-1/4 px-4 py-2">Contraseña</th>
                            <th className="w-1/4 px-4 py-2">Teléfono</th>
                            <th className="w-1/4 px-4 py-2">Turno</th>
                            <th className="w-1/4 px-4 py-2">Puesto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado) => (
                            <tr key={empleado}>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder={empleado[0]}
                                        onChange={(e) => {
                                            empleado[0] =
                                                e.target.value ||
                                                e.target.placeholder;
                                        }}
                                        size="10"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder={empleado[1]}
                                        onChange={(e) => {
                                            empleado[1] =
                                                e.target.value ||
                                                e.target.placeholder;
                                        }}
                                        size="10"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    {empleado[2]}
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder={empleado[3]}
                                        onChange={(e) => {
                                            empleado[3] =
                                                e.target.value ||
                                                e.target.placeholder;
                                        }}
                                        size="15"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder={empleado[4]}
                                        onChange={(e) => {
                                            empleado[4] =
                                                e.target.value ||
                                                e.target.placeholder;
                                        }}
                                        size="10"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder={empleado[5]}
                                        onChange={(e) => {
                                            empleado[5] =
                                                e.target.value ||
                                                e.target.placeholder;
                                        }}
                                        size="10"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder={empleado[6]}
                                        onChange={(e) => {
                                            empleado[6] =
                                                e.target.value ||
                                                e.target.placeholder;
                                        }}
                                        size="5"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    {empleado[9]}
                                </td>
                                <td>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                                        onClick={(e) =>
                                            editarEmpleado(empleado)
                                        }
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                                        onClick={(e) =>
                                            eliminarEmpleado(empleado)
                                        }
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
