from flask import (
    Blueprint, request
)
from wokwanghouse.db import get_db

bp = Blueprint('empleado', __name__, url_prefix='/empleado')


@bp.route("/cocinero", methods=["GET"])
def obtener_cocineros():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, cocinero c
                   WHERE p.Run = e.Run
                   AND e.Run = c.Run""")
    return cursor.fetchall()


@bp.route("/cocinero/<int:empleado_id>", methods=["GET"])
def obtener_un_cocinero(empleado_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, cocinero c
                   WHERE p.Run = e.Run
                   AND e.Run = c.Run
                   AND p.Run = %s""", (empleado_id,))
    return cursor.fetchall()


@bp.route("/cocinero", methods=["POST"])
def guardar_cocinero():
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""INSERT INTO persona VALUES (%s, %s, %s, %s, %s, %s)""",
                   (j["nombre"], j["apellido"], j["run"], j["correo"], j["contraseña"], j["telefono"],))
    db.commit()
    cursor.execute("""INSERT INTO empleado VALUES (%s, %s)""",
                   (j["turno"], j["run"],))
    db.commit()
    cursor.execute("""INSERT INTO cocinero VALUES (%s)""",
                   (j["run"],))
    db.commit()
    return "OK"


@bp.route("/cocinero/<int:empleado_id>", methods=["PUT"])
def editar_cocinero(empleado_id):
    j = request.json
    db = get_db()
    cursor = db.cursor()
    # print(j, empleado_id)
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, cocinero c
                   WHERE p.Run = e.Run
                   AND e.Run = c.Run
                   AND p.Run = %s""", (empleado_id,))
    datos_persona = cursor.fetchall()[0]
    # print(datos_persona)
    nuevos_datos_persona = j.get("nombre"), j.get("apellido"), datos_persona[2], j.get(
        "correo"), j.get("contraseña"), j.get("telefono"),
    nuevos_datos_empleado = j.get("turno"), datos_persona[7],
    nuevos_datos_cocinero = datos_persona[8],
    nuevos_datos_persona = [(n or v) for n, v in zip(
        nuevos_datos_persona, datos_persona[:6])]
    nuevos_datos_empleado = [(n or v) for n, v in zip(
        nuevos_datos_empleado, datos_persona[6:8])]
    nuevos_datos_cocinero = [(n or v) for n, v in zip(
        nuevos_datos_cocinero, datos_persona[8:9])]
    print(nuevos_datos_persona)
    print(nuevos_datos_empleado)
    print(nuevos_datos_cocinero)
    del nuevos_datos_persona[2]
    cursor.execute("""
                   UPDATE persona SET
                   Nombre=%s, Apellido=%s, correo=%s, contraseña=%s, telefono=%s
                   WHERE Run = %s""", nuevos_datos_persona + [datos_persona[2]])
    db.commit()
    del nuevos_datos_empleado[1]
    cursor.execute("""
                   UPDATE empleado SET
                   Turno=%s
                   WHERE Run = %s""", nuevos_datos_empleado + [datos_persona[7]])
    db.commit()
    # del nuevos_datos_cocinero[0]
    # cursor.execute("""
    #                UPDATE cocinero SET
    #                ...
    #                WHERE Run = %s""", nuevos_datos_cocinero + [datos_persona[8]])
    # db.commit()
    return "OK"


@bp.route("/cocinero/<int:empleado_id>", methods=["DELETE"])
def borrar_cocinero(empleado_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   DELETE FROM cocinero
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    cursor.execute("""
                   DELETE FROM empleado
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    cursor.execute("""
                   DELETE FROM persona
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    return "OK"


@bp.route("/cajero", methods=["GET"])
def obtener_cajeros():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, cajero c
                   WHERE p.Run = e.Run
                   AND e.Run = c.Run""")
    return cursor.fetchall()


@bp.route("/cajero/<int:empleado_id>", methods=["GET"])
def obtener_un_cajero(empleado_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, cajero c
                   WHERE p.Run = e.Run
                   AND e.Run = c.Run
                   AND p.Run = %s""", (empleado_id,))
    return cursor.fetchall()


@bp.route("/cajero", methods=["POST"])
def guardar_cajero():
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""INSERT INTO persona VALUES (%s, %s, %s, %s, %s, %s)""",
                   (j["nombre"], j["apellido"], j["run"], j["correo"], j["contraseña"], j["telefono"],))
    db.commit()
    cursor.execute("""INSERT INTO empleado VALUES (%s, %s)""",
                   (j["turno"], j["run"],))
    db.commit()
    cursor.execute("""INSERT INTO cajero VALUES (%s)""",
                   (j["run"],))
    db.commit()
    return "OK"


@bp.route("/cajero/<int:empleado_id>", methods=["PUT"])
def editar_cajero(empleado_id):
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, cajero c
                   WHERE p.Run = e.Run
                   AND e.Run = c.Run
                   AND p.Run = %s""", (empleado_id,))
    datos_persona = cursor.fetchall()[0]
    nuevos_datos_persona = j.get("nombre"), j.get("apellido"), datos_persona[2], j.get(
        "correo"), j.get("contraseña"), j.get("telefono"),
    nuevos_datos_empleado = j.get("turno"), datos_persona[7],
    nuevos_datos_cajero = datos_persona[8],
    nuevos_datos_persona = [(n or v) for n, v in zip(
        nuevos_datos_persona, datos_persona[:6])]
    nuevos_datos_empleado = [(n or v) for n, v in zip(
        nuevos_datos_empleado, datos_persona[6:8])]
    nuevos_datos_cajero = [(n or v) for n, v in zip(
        nuevos_datos_cajero, datos_persona[8:9])]
    print(nuevos_datos_persona)
    print(nuevos_datos_empleado)
    print(nuevos_datos_cajero)
    del nuevos_datos_persona[2]
    cursor.execute("""
                   UPDATE persona SET
                   Nombre=%s, Apellido=%s, correo=%s, contraseña=%s, telefono=%s
                   WHERE Run = %s""", nuevos_datos_persona + [datos_persona[2]])
    db.commit()
    del nuevos_datos_empleado[1]
    cursor.execute("""
                   UPDATE empleado SET
                   Turno=%s
                   WHERE Run = %s""", nuevos_datos_empleado + [datos_persona[7]])
    db.commit()
    # del nuevos_datos_cocinero[0]
    # cursor.execute("""
    #                UPDATE cocinero SET
    #                ...
    #                WHERE Run = %s""", nuevos_datos_cocinero + [datos_persona[8]])
    # db.commit()
    return "OK"


@bp.route("/cajero/<int:empleado_id>", methods=["DELETE"])
def borrar_cajero(empleado_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   DELETE FROM cajero
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    cursor.execute("""
                   DELETE FROM empleado
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    cursor.execute("""
                   DELETE FROM persona
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    return "OK"


@bp.route("/mesero", methods=["GET"])
def obtener_meseros():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, mesero m
                   WHERE p.Run = e.Run
                   AND e.Run = m.Run""")
    return cursor.fetchall()


@bp.route("/mesero/<int:empleado_id>", methods=["GET"])
def obtener_un_mesero(empleado_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, mesero m
                   WHERE p.Run = e.Run
                   AND e.Run = m.Run
                   AND p.Run = %s""", (empleado_id,))
    return cursor.fetchall()


@bp.route("/mesero", methods=["POST"])
def guardar_mesero():
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""INSERT INTO persona VALUES (%s, %s, %s, %s, %s, %s)""",
                   (j["nombre"], j["apellido"], j["run"], j["correo"], j["contraseña"], j["telefono"],))
    db.commit()
    cursor.execute("""INSERT INTO empleado VALUES (%s, %s)""",
                   (j["turno"], j["run"],))
    db.commit()
    cursor.execute("""INSERT INTO mesero VALUES (%s)""",
                   (j["run"],))
    db.commit()
    return "OK"


@bp.route("/mesero/<int:empleado_id>", methods=["PUT"])
def editar_mesero(empleado_id):
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM persona p, empleado e, mesero m
                   WHERE p.Run = e.Run
                   AND e.Run = m.Run
                   AND p.Run = %s""", (empleado_id,))
    datos_persona = cursor.fetchall()[0]
    nuevos_datos_persona = j.get("nombre"), j.get("apellido"), datos_persona[2], j.get(
        "correo"), j.get("contraseña"), j.get("telefono"),
    nuevos_datos_empleado = j.get("turno"), datos_persona[7],
    nuevos_datos_mesero = datos_persona[8],
    nuevos_datos_persona = [(n or v) for n, v in zip(
        nuevos_datos_persona, datos_persona[:6])]
    nuevos_datos_empleado = [(n or v) for n, v in zip(
        nuevos_datos_empleado, datos_persona[6:8])]
    nuevos_datos_mesero = [(n or v) for n, v in zip(
        nuevos_datos_mesero, datos_persona[8:9])]
    print(nuevos_datos_persona)
    print(nuevos_datos_empleado)
    print(nuevos_datos_mesero)
    del nuevos_datos_persona[2]
    cursor.execute("""
                   UPDATE persona SET
                   Nombre=%s, Apellido=%s, correo=%s, contraseña=%s, telefono=%s
                   WHERE Run = %s""", nuevos_datos_persona + [datos_persona[2]])
    db.commit()
    del nuevos_datos_empleado[1]
    cursor.execute("""
                   UPDATE empleado SET
                   Turno=%s
                   WHERE Run = %s""", nuevos_datos_empleado + [datos_persona[7]])
    db.commit()
    # del nuevos_datos_cocinero[0]
    # cursor.execute("""
    #                UPDATE cocinero SET
    #                ...
    #                WHERE Run = %s""", nuevos_datos_cocinero + [datos_persona[8]])
    # db.commit()
    return "OK"


@bp.route("/mesero/<int:empleado_id>", methods=["DELETE"])
def borrar_mesero(empleado_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   DELETE FROM mesero
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    cursor.execute("""
                   DELETE FROM empleado
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    cursor.execute("""
                   DELETE FROM persona
                   WHERE Run = %s""", (empleado_id,))
    db.commit()
    return "OK"
