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
        const roles = ["cocinero", "cajero", "mesero"];
        for (const role of roles) {
            let res = await fetch(`${API}/empleado/${role}`, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            res = await res.json();
            for (let index = 0; index < res.length; index++) {
                res[index][9] = role;
            }
            emps.push(...res);
        }
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
            .catch((err) => console.log(err));
        setNombre("");
        setApellido("");
        setRun("");
        setCorreo("");
        setContraseña("");
        setTelefono("");
    };

    const eliminarEmpleado = async (emp) => {
        const userResponse = window.confirm("¿Seguro que quiere eliminarlo?");
        if (userResponse) {
            fetch(`${API}/empleado/${emp[9]}/${emp[2]}`, {
                method: "DELETE",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((r) => {
                    window.alert("Empleado borrado con éxito.");
                    getUsers();
                })
                .catch((err) => console.log(err));
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
            .then((r) => {
                getUsers();
                alert("Empleado editado con éxito.");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Encabezado */}
            <header className="bg-blue-600 text-white py-4 shadow-md mb-4">
                <h1 className="text-2xl font-bold text-center">
                    Gestión de Empleados
                </h1>
            </header>

            {/* Contenido principal */}
            <div className="container mx-auto">
                <div className="flex flex-wrap lg:flex-nowrap gap-8">
                    {/* Formulario */}
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full lg:w-1/3"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            Crear Empleado
                        </h2>
                        {/* Campos del formulario */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Nombre
                            </label>
                            <input
                                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                type="text"
                                placeholder="Ej: Mauricio"
                                onChange={(e) => setNombre(e.target.value)}
                                value={nombre}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Apellido
                            </label>
                            <input
                                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                type="text"
                                placeholder="Ej: Torrez"
                                onChange={(e) => setApellido(e.target.value)}
                                value={apellido}
                            />
                        </div>
                        {/* Campos adicionales */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Rut
                            </label>
                            <input
                                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                type="text"
                                placeholder="20.820.467-K"
                                onChange={(e) => setRun(e.target.value)}
                                value={run}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Teléfono
                            </label>
                            <input
                                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                type="text"
                                onChange={(e) => setTelefono(e.target.value)}
                                value={telefono}
                            />
                        </div>
                        {/* Select de puesto */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Puesto
                            </label>
                            <select
                                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                value={puesto}
                                onChange={(e) => setPuesto(e.target.value)}
                            >
                                <option value="cocinero">Cocinero</option>
                                <option value="cajero">Cajero</option>
                                <option value="mesero">Mesero</option>
                            </select>
                        </div>
                        {/* Botón */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Crear
                        </button>
                    </form>

                    {/* Tabla */}
                    <div className="bg-white shadow-md rounded p-4 w-full">
                        <h2 className="text-xl font-bold mb-4">
                            Lista de Empleados
                        </h2>
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Nombre</th>
                                    <th className="px-4 py-2">Apellido</th>
                                    <th className="px-4 py-2">RUN</th>
                                    <th className="px-4 py-2">Correo</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados.map((empleado, index) => (
                                    <tr key={index}>
                                        {/* Columna: Nombre */}
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                value={empleado[0]} // Nombre
                                                onChange={(e) => {
                                                    const updatedEmpleados = [...empleados];
                                                    updatedEmpleados[index][0] = e.target.value;
                                                    setEmpleado(updatedEmpleados);
                                                }}
                                                size="10"
                                                className="w-full border rounded px-2"
                                            />
                                        </td>

                                        {/* Columna: Apellido */}
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                value={empleado[1]} // Apellido
                                                onChange={(e) => {
                                                    const updatedEmpleados = [...empleados];
                                                    updatedEmpleados[index][1] = e.target.value;
                                                    setEmpleado(updatedEmpleados);
                                                }}
                                                size="10"
                                                className="w-full border rounded px-2"
                                            />
                                        </td>

                                        {/* Columna: RUN */}
                                        <td className="border px-4 py-2">
                                            <span>{empleado[2]}</span> {/* RUN no editable */}
                                        </td>

                                        {/* Columna: Correo */}
                                        <td className="border px-4 py-2">
                                            <input
                                                type="email"
                                                value={empleado[3]} // Correo
                                                onChange={(e) => {
                                                    const updatedEmpleados = [...empleados];
                                                    updatedEmpleados[index][3] = e.target.value;
                                                    setEmpleado(updatedEmpleados);
                                                }}
                                                size="15"
                                                className="w-full border rounded px-2"
                                            />
                                        </td>

                                        {/* Columna: Acciones */}
                                        <td className="border px-4 py-2 flex space-x-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                                onClick={() => editarEmpleado(empleado)}
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                                onClick={() => eliminarEmpleado(empleado)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
