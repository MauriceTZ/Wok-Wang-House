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
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const [isEditing, setIsEditing] = useState(false); // Estado para verificar si estamos editando un empleado
    const [empleadoToEdit, setEmpleadoToEdit] = useState(null); // Empleado que se está editando

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

        const endpoint = isEditing
            ? `${API}/empleado/${puesto}/${empleadoToEdit[2]}`
            : `${API}/empleado/${puesto}`;

        fetch(endpoint, {
            method: isEditing ? "PUT" : "POST",
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
                setIsModalOpen(false);
                setIsEditing(false);
                setEmpleadoToEdit(null);
            })
            .catch((err) => console.log(err));

        // Limpiar campos
        setNombre("");
        setApellido("");
        setRun("");
        setCorreo("");
        setContraseña("");
        setTelefono("");
    };

    const editarEmpleado = (emp) => {
        setEmpleadoToEdit(emp); // Guardar el empleado que se va a editar
        setNombre(emp[0]);
        setApellido(emp[1]);
        setRun(emp[2]);
        setCorreo(emp[3]);
        setContraseña(emp[4]);
        setTelefono(emp[5]);
        setPuesto(emp[9]);
        setIsEditing(true); // Cambiar a modo edición
        setIsModalOpen(true); // Abrir el modal
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
                <div className="flex flex-col gap-4">
                    {/* Botón para abrir el modal */}
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Crear Empleado
                    </button>

                    {/* Tabla */}
                    <div className="bg-white shadow-md rounded p-4">
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
                                        <td className="border px-4 py-2">
                                            {empleado[0]}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {empleado[1]}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {empleado[2]}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {empleado[3]}
                                        </td>
                                        <td className="border px-4 py-2 flex space-x-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                                onClick={() =>
                                                    editarEmpleado(empleado)
                                                }
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                                onClick={() =>
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
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditing ? "Editar Empleado" : "Crear Empleado"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {/* Campos del formulario */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Nombre
                                </label>
                                <input
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    type="text"
                                    placeholder="Ej: Mauricio"
                                    onChange={(e) =>
                                        setNombre(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setApellido(e.target.value)
                                    }
                                    value={apellido}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    RUN
                                </label>
                                <input
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    type="text"
                                    placeholder="Ej: 20.820.467-K"
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
                                    placeholder="Ej: 123456789"
                                    onChange={(e) =>
                                        setTelefono(e.target.value)
                                    }
                                    value={telefono}
                                />
                            </div>

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

                            {/* Botones */}
                            <div className="flex justify-end space-x-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    {isEditing ? "Actualizar" : "Guardar"}
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
