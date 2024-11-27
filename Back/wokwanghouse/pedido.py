import random

from flask import (
    Blueprint, request
)
from wokwanghouse.db import get_db

bp = Blueprint('pedido', __name__, url_prefix='/pedido')


@bp.route("/agregarproducto/<int:pedido_id>", methods=["POST"])
def agregar_pedido(pedido_id):
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM pedido WHERE Pedido_ID = %s""",
                   (pedido_id,))
    pedido = cursor.fetchone()
    print(pedido)
    cursor.execute("""
        SELECT Cant_Stock, Precio FROM producto WHERE Producto_ID = %s""",
                   (j["producto_id"],))
    cant_stock_producto, precio_producto = cursor.fetchone()
    if cant_stock_producto >= j["cantidad_producto"]:
        cursor.execute("""INSERT INTO contiene VALUES (%s, %s, %s, %s)""",
                       (j["cantidad_producto"], pedido_id, pedido[2], j["producto_id"],))
        db.commit()
        cursor.execute("""UPDATE producto
                       SET Cant_Stock = %s
                       WHERE Producto_ID = %s""",
                       (cant_stock_producto - j["cantidad_producto"], j["producto_id"],))
        db.commit()
        cursor.execute("""UPDATE pedido
                       SET Precio_Total = %s
                       WHERE Pedido_ID = %s""",
                       (pedido[1] + precio_producto * j["cantidad_producto"], pedido_id,))
        db.commit()
        return "OK"
    raise ValueError


@bp.route("/", methods=["GET"])
def obtener_pedidos():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        SELECT
            p.Pedido_ID, p.Precio_Total,
            b.Num_Bol, b.Fecha, b.Run run_cajero,
            c.Run run_cocinero,
            ll.Run run_mesero
        FROM
            pedido p
        JOIN
            cocina c
        ON (
            c.Pedido_ID = p.Pedido_ID AND c.Num_Bol = p.Num_Bol
        )
        JOIN
            lleva ll
        ON (
            ll.Pedido_ID = p.Pedido_ID AND ll.Num_Bol = p.Num_Bol
        )
        JOIN
            boleta b
        ON
            b.Num_Bol = p.Num_Bol
    """)
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
    """Crea un pedidio el cual debe especificar quien genera
    la boleta (cajero) y quien lo cocina (cocinero).
    para los productos que contiene (muchos productos)
    hay que usar la ruta POST /pedido/agrergarproducto/<int:pedido_id>"""
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""INSERT INTO boleta VALUES (NULL, NOW(), %s)""",
                   (j["run_cajero"],))
    db.commit()
    num_bol = cursor.lastrowid
    cursor.execute("""INSERT INTO pedido VALUES (NULL, 0, %s)""",
                   (num_bol,))
    db.commit()
    pedido_id = cursor.lastrowid
    cursor.execute("""INSERT INTO cocina VALUES (%s, %s, %s)""",
                   (j["run_cocinero"], pedido_id, num_bol,))
    db.commit()
    cursor.execute("""INSERT INTO lleva VALUES (%s, %s, %s)""",
                   (j["run_mesero"], pedido_id, num_bol,))
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
