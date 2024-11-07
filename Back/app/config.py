import os

class Config:
    # Deshabilitar la modificación de seguimiento
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)  # Clave secreta para sesiones

    # Configuración de la URI de la base de datos
    # Cambia 'mi_base_de_datos' por el nombre real de tu base de datos
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root@localhost:3306/agilidad'
