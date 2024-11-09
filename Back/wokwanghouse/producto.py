from flask import (
    Blueprint, request
)
from wokwanghouse.db import get_db

bp = Blueprint('producto', __name__, url_prefix='/producto')


@bp.route("/", methods=["GET"])
def obtener_productos():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM producto""")
    return cursor.fetchall()


@bp.route("/<int:producto_id>", methods=["GET"])
def obtener_un_producto(producto_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM producto
                   WHERE Producto_ID = %s""", (producto_id,))
    return cursor.fetchall()


@bp.route("/", methods=["POST"])
def guardar_producto():
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""INSERT INTO producto VALUES (%s, %s, %s)""",
                   (j["producto_id"], j["cant_stock"], j["precio"],))
    db.commit()
    return "OK"


@bp.route("/<int:producto_id>", methods=["PUT"])
def editar_producto(producto_id):
    j = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   SELECT * FROM producto
                   WHERE Producto_ID = %s""", (producto_id,))
    datos_producto = cursor.fetchall()[0]
    nuevos_datos_producto = datos_producto[0], j.get(
        "cant_stock"), j.get("precio"),
    nuevos_datos_producto = [(n or v) for n, v in zip(
        nuevos_datos_producto, datos_producto)]
    cursor.execute("""
                   UPDATE producto SET
                   Cant_Stock=%s, Precio=%s
                   WHERE Producto_ID = %s""", nuevos_datos_producto[1:] + [producto_id])
    db.commit()
    return "OK"


@bp.route("/<int:producto_id>", methods=["DELETE"])
def borrar_producto(producto_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
                   DELETE FROM producto
                   WHERE Producto_ID = %s""", (producto_id,))
    db.commit()
    return {"rows": cursor.rowcount}
