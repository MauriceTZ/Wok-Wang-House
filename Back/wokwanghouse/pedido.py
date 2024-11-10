from flask import (
    Blueprint, request
)
from wokwanghouse.db import get_db

bp = Blueprint('pedido', __name__, url_prefix='/pedido')


@bp.route("/", methods=["GET"])
def obtener_pedidos():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM pedido""")
    return cursor.fetchall()


@bp.route("/<int:pedido_id>", methods=["GET"])
def obtener_un_pedido(pedido_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM pedido
                   WHERE Pedido_ID = %s""", (pedido_id,))
    return cursor.fetchall()


@bp.route("/", methods=["POST"])
def guardar_pedido():
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""INSERT INTO pedido VALUES (%s, %s, %s)""",
                   (j["pedido_id"], j["precio_total"], j["num_bol"],))
    db.commit()
    return "OK"


@bp.route("/<int:pedido_id>", methods=["PUT"])
def editar_pedido(pedido_id):
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM pedido
                   WHERE Pedido_ID = %s""", (pedido_id,))
    datos_pedido = cursor.fetchall()[0]
    nuevos_datos_pedido = datos_pedido[0], j.get(
        "precio_total"), j.get("num_bol"),
    nuevos_datos_pedido = [(n or v) for n, v in zip(
        nuevos_datos_pedido, datos_pedido)]
    cursor.execute("""
                   UPDATE pedido SET
                   Precio_Total=%s, Num_Bol=%s
                   WHERE Pedido_ID = %s""", nuevos_datos_pedido[1:] + [pedido_id])
    db.commit()
    return "OK"


@bp.route("/<int:pedido_id>", methods=["DELETE"])
def borrar_pedido(pedido_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   DELETE FROM pedido
                   WHERE Pedido_ID = %s""", (pedido_id,))
    db.commit()
    return {"rows": cursor.rowcount}
